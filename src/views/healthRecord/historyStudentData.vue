<template>
  <div>
    <h2 style="margin-top:15px;margin-bottom:13px;">学生查询</h2>
    <Card style="margin-top:16px;">
      <div @keydown.enter="querySearch">
        <span>姓<span style="visibility:hidden">空</span>名：</span>
        <Input v-model="params.studentName" placeholder="学生姓名" class="width120" />
        <span class="mgl20">学籍号：</span>
        <Input v-model="params.registerCode" placeholder="学生学籍号" class="width120" />
        <span class="mgl20">性<span style="visibility:hidden">空</span>别：</span>
        <Select v-model="params.gender" class="width120">
          <Option value="ALL">全部</Option>
          <Option value="1">男</Option>
          <Option value="2">女</Option>
        </Select>
        <span class="mgl20">状<span style="visibility:hidden">空</span>态：</span>
        <Select v-model="params.status" class="width120">
          <Option v-for="item in transferList" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
        <Button type="success" @click="querySearch" style="margin-left:64px;">查询</Button>
      </div>
    </Card>

    <!-- 数据详情 -->
    <Card  style="margin-top:16px;">
      <div class="fcb">
        <div style="font-size:18px;height:40px;">
            数据详情
        </div>
        <Button type="success" @click="exportExcel" v-if="tableList.length">导出Excel</Button>
      </div>
      <Table
        border
        :columns="columns"
        :data="tableList"
        style="margin-top:16px;"
      ></Table>
    </Card>
    <div style="float: right;margin-top:16px;">
      <Page
        :total="total"
        :current="params.pageNo"
        :page-size="params.pageSize"
        max-height="520"
        @on-change='pageNumChange'
        @on-page-size-change='pageSizechange'
        show-total show-sizer
      >
      </Page>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  data() {
    return {
      params: {
        studentName: '',
        registerCode: '',
        status: '',
        pageNo: 1,
        pageSize: 10,
        gender: '',
      },
      schoolId: '',
      total: 0,
      transferList: [{
          name: "全部",
          value: "ALL"
        },
        {
          name: "在读",
          value: "1"
        },
        {
          name: "已毕业",
          value: "3"
        },
        {
          name: "已停用",
          value: "4"
        },
        
      ],
      columns: [
        {
          title: '学生姓名',
          key: 'studentName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth: 100
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '年级',
          key: 'startSchool',
          align: 'center',
          minWidth: 100
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            const text = `${row.gradeName}${row.studentClass}班`
            return h('div', text)
          }
        },
        {
          title: '状态',
          key: '',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const {status} = params.row;
            let text = "";
            if (status === '1') {
              text = "在读";
            } else if (status === '3') {
              text = "已毕业";
            } else {
              text = '已停用'
            }
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(
                'Button', {
                  props: {
                    type: 'success',
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      const query = {
                        studentId: params.row.studentId,
                        studentName: params.row.studentName,
                        registerCode: params.row.registerCode,
                        gradeName: params.row.gradeName,
                        studentClass: params.row.studentClass,
                        gender: params.row.gender,
                        grade: params.row.grade,
                        startSchool: params.row.startSchool
                      }
                      sessionStorage.setItem('historyStudentData-searchData', JSON.stringify(this.params))
                      this.$router.push({name: 'unusualData', query: query})
                    }
                  }
                }, '详情'
              ),
            ])
          }
        }
      ],
      tableList: [
      ]
    }
  },
  mounted() {
    let options = JSON.parse(sessionStorage.getItem('historyStudentData-searchData'))
    if (options) {
      this.params = options
      this.search()
    }
    this.schoolId = sessionStorage.getItem('schoolId')
    this.params.gender = !this.params.gender ? 'ALL' : this.params.gender
    this.params.status = !this.params.status ? 'ALL' : this.params.status
  },
  methods: {
    exportExcel() {
      const schoolId = this.schoolId
      const token = sessionStorage.getItem("token") || ''
      const {registerCode, gender, status, studentName} = this.params
      const params = {
        token,
        schoolId,
        registerCode,
        gender: gender === 'ALL' ? '' : gender,
        status: status === 'ALL' ? '' : status,
        studentName
      }
      const url = util.createURL(`${this.$axios.defaults.baseURL}/v1/studentinfo/exportStudentFilesHistoryInfo`, params)
      console.log('url', url)
      window.open(url);
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.params.pageNo != value) {
        this.params.pageNo = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.params.pageSize != value) {
        this.params.pageSize = value
        this.params.pageNo = 1;
        this.search()
      }
    },
    querySearch() {
      this.params.pageNo = 1;
      this.search();
    },
    search() {
      const {registerCode, gender, status, studentName, pageNo, pageSize} = this.params
      const params = {
        "gender": gender === 'ALL' ? '' : gender,
        "pageNo": pageNo,
        "pageSize": pageSize,
        "registerCode": registerCode,
        "schoolId": this.schoolId,
        "status": status === 'ALL' ? '' : status,
        "studentName": studentName
      }
      this.getHistoryStudentList(params)
      this.countHistoryStudent(params)
      sessionStorage.removeItem('historyStudentData-searchData')
    },
    countHistoryStudent(params) {
      this.$axios.post('/v1/studentinfo/countStudentFilesHistoryList', params).then(res => {
        if (res.data.code === 10000) {
          this.total = res.data.response
        }
      })
    },
    getHistoryStudentList(params) {
      this.$axios.post('/v1/studentinfo/getStudentFilesHistoryList', params).then(res => {
        if (res.data.code === 10000) {
          this.tableList = res.data.response || []
        }
      })
    }
  }
}
</script>

<style>

</style>