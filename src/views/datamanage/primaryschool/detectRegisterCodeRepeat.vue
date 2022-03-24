<template>
  <div>
    <div class="fcb" style="margin-bottom:13px;">
      <h2>异常数据明细</h2>
      <Button type="success" @click="exportExcel" v-if="tableList.length">导出Excel</Button>
    </div>
    <Card>
      <Table
        border
        :columns="columns"
        :data="tableList"
        no-data-text="无学籍号重复数据"
      ></Table>
      
    </Card>
    <div style="float: right;margin-top:16px;">
      <Page
        :total="total"
        :current="pageNo"
        :page-size="pageSize"
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
      pageNo:1,
      pageSize: 10,
      total: 0,
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
    this.search()
    
  },
  methods: {
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNo = 1;
        this.search()
      }
    },
    search() {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      this.getRepeatStudentList(params) // 获取学籍号重复的学生列表
      this.countRepeatStudentList(params)
    },
    countRepeatStudentList(params) {
      this.$axios.get(`${util.createURL('/v1/studentinfo/countRepeatStudentList', params)}`).then(res => {
        if (res.data.code === 10000) {
          this.total = res.data.response
        }
      })
    },
    getRepeatStudentList(params) {
      this.$axios.get(`${util.createURL('/v1/studentinfo/getRepeatStudentList', params)}`).then(res => {
        if (res.data.code === 10000) {
          this.tableList = res.data.response || []
        }
      })
    },
    exportExcel() {
      const schoolId = sessionStorage.getItem("schoolId") || ''
      const token = sessionStorage.getItem("token") || ''
      const url = `${this.$axios.defaults.baseURL}/v1/studentinfo/exportRepeatStudentInfo?token=${token}&schoolId=${schoolId}`
      window.open(url);
    }
  }
}
</script>

<style>

</style>