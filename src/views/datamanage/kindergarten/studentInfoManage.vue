<style scoped>
.width120 {
  width: 120px;
}
@media screen and (max-width: 1650px) {
  .width120 {
    width: 100px;
  }
}
</style>
<template>
<div style="padding-left:10px;">
  <div>
    <h2 style="margin-top:15px;margin-bottom:13px;">学生管理</h2>
  </div>
  <div>
    <Card>
      <div class="top-search" @keydown.enter="querySearch">
        <div class="left-input">
          <div style="margin:5px 20px;">
            <span>年<span style="visibility:hidden">空空</span>级：</span>
            <Select v-model="grade" class="width120" @on-change="getClassList" clearable>
              <Option v-for="item in gradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>班<span style="visibility:hidden">空空</span>级：</span>
            <Select v-model="studentClass" class="width120" clearable>
              <Option v-for="(item,index) in classList" :value="item.studentClass" :key="item.studentClass">{{ item.studentClass+'班' }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>姓<span style="visibility:hidden">空空</span>名：</span>
            <Input v-model="studentName" placeholder="学生姓名" class="width120" clearable/>
          </div>
          <div style="margin:5px 20px;">
            <span>身份证号：</span>
            <Input v-model="registerCode" placeholder="身份证号" class="width120" clearable/>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="querySearch">查询</Button>
          <Button type="success" @click="addStudent">新增学生</Button>
          <Button type="success" @click="inputStudent">学生信息导入</Button>
          <Button type="success" @click="goBack">返回</Button>
        </div>
      </div>
    </Card>
    <br>
    <div>
      <Card>
        <div style="font-size:18px;height:40px;">
          数据明细
        </div>
        <Row>
          <div>
            <Table max-height="520" border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br>
          <div style="float: right;">
            <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
          </div>
        </Row>
      </Card>
    </div>
    <Modal v-model="modal1" title="提  醒" @on-ok="ok">
      <p style="color: red;font-size: 18px">删除学生后，学生的所有数据都将清空，是否确认删除？</p>
    </Modal>
  </div>
</div>
</template>

<script>
import api from '@/api/baseApi'
export default {
  name: 'minSchool',
  data() {
    return {
      grade: '',
      gradeList: [
        {
          grade: 21,
          label: '小班'
        },
        {
          grade: 22,
          label: '中班'
        },
        {
          grade: 23,
          label: '大班'
        }
      ],
      studentClass: '',
      classList: [],
      studentName: '',
      registerCode: '',
      resultColumns: [{
          title: '姓名',
          key: 'studentName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '身份证号',
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
            return h('div', params.row.gender == '1' ? '男' : '女')
          }
        },
        {
          title: '年级',
          key: 'gradeName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', `${params.row.studentClass}班`)
          }
        },
        {
          title: '年龄',
          key: 'birthday',
          align: 'center',
          minWidth: 100,
           render: (h, params) => {
            let text = []
            if(params.row.birthday){
              let birthDay = ''
              if(params.row.birthday.indexOf('-')>=0){
                birthDay = params.row.birthday.split('-')
              }else if(params.row.birthday.indexOf('/')>=0){
                birthDay = params.row.birthday.split('/')
              }else{
                birthDay = []
              }
              birthDay.pop()
              console.log('birthDay',birthDay)
              let nowDate = this.formatTime(new Date())
              if(nowDate[1]>=birthDay[1]){//如果月份够减就直接减
                text[1] = nowDate[1]-birthDay[1]
                text[0] = nowDate[0]-birthDay[0]
              }else{//月份不够取一年也就是当前月份+12
                text[1] = nowDate[1]*1+12 - birthDay[1]
                nowDate[0] -=1
                text[0] = nowDate[0]-birthDay[0]
              }
              let age = text[0] + "." + Math.floor((text[1] / 12 * 100));
              return h('div', parseFloat(age).toFixed(2))
            }else{
              return h('div', `--`)
            }
          }
        },
        {
          title: '状态',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            let text = "正常";
            if (params.row.transferSchoolStatus == '1') {
              text = "已转学";
            } else if (params.row.transferSchoolStatus == '2') {
              text = "非学籍";
            } else if (params.row.transferSchoolStatus == '3') {
              text = "已停用";
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
                    type: 'success'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '详情'
              ),
              h(
                'Button', {
                  props: {
                    type: 'error'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true;
                      this.nowStudentId = params.row.studentId;
                    }
                  }
                },
                '删除'
              ),
            ])
          }
        }
      ],
      modal1: false,
      hasParent:'',
      hasParentList:[
        {
          name:'全部',
          value:"999"
        },
        {
          name:'是',
          value:"1"
        },
        {
          name:'否',
          value:"2"
        },
      ],
      sessionData: {
      },
      nowIndex: '',
      modal3: false,
      modal4: false,
      oldName: '',
      patriarchNew: {
        nickName: '',
        relation: '',
        phoneNum: ''
      },
      relationList: [{
          value: '02',
          label: '母亲'
        },
        {
          value: '03',
          label: '父亲'
        },
        {
          value: '04',
          label: '祖父'
        },
        {
          value: '05',
          label: '祖母'
        },
        {
          value: '06',
          label: '外祖父'
        },
        {
          value: '07',
          label: '外祖母'
        }
      ],
      addparentStates: false,
      patriarchList: [],
      modal2: false,
      loading: false,
      updateUrl: '',
      schoolId: '',
      schoolType: '',

      transferStatus: "",
      transferList: [{
          name: "全部",
          value: ""
        },
        {
          name: "正常",
          value: "0"
        },
        {
          name: "已停用",
          value: "3"
        },
      ],
      schoolGradeList: [],
      normal: [{
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
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '年级',
          key: 'gradeName',
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
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.studentClass + '班'
            return h('div', text)
          }
        },
        {
          title: '状态',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "正常";
            if (row.transferSchoolStatus == '1') {
              text = "已转学";
            } else if (row.transferSchoolStatus == '2') {
              text = "非学籍";
            } else if (row.transferSchoolStatus == '3') {
              text = "已停用";
            }
            return h('div', text)
          }
        },
        {
          title: '是否绑定家长',
          key: 'parentNum',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text =row.parentNum>0?"是":"否";
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
                    type: 'success'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button', {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true;
                      this.nowStudentId = params.row.studentId;
                    }
                  }
                },
                '删除'
              ),
              // h(
              //         'Button',
              //         {
              //           props: {
              //             type: 'success'
              //           },
              //           style: {
              //             marginLeft: '10px'
              //           },
              //           on: {
              //             click: () => {
              //               this.modal2 = true;
              //               this.nowStudentId = params.row.studentId;
              //               this.getChildAndParentInfo();
              //             }
              //           }
              //         },
              //         '家长信息'
              // )
            ])
          }
        }
      ],
      collegeColumns: [{
          title: '学生姓名',
          key: 'studentName',
          align: 'center'
          //   minWidth: 250
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center'
          //   width: 150
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '学院',
          key: 'collegeName',
          align: 'center'
          //   width: 150
        },
        {
          title: '专业',
          key: 'majorName',
          align: 'center'
          //   width: 150
        },
        {
          title: '学级',
          key: 'startSchool',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.startSchool + '级'
            return h('div', text)
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.studentClass + '班'
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          //   width: 400,
          render: (h, params) => {
            return h('div', [
              h(
                'Button', {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      resultData: [],
      isCollege: false,
      college: '',
      collegesList: [],
      major: '',
      majorList: [],
      chooseCollege: true,
      collegeName: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      nowStudentId: '',
      parentStatus: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    ok() {
      this.deleteStudent(this.nowStudentId);
    },
    async getStudentInfoList(schoolId) {
      var vm = this
      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        transferSchoolStatus: vm.transferStatus,
        hasParent:vm.hasParent=="999"?"":vm.hasParent
      }

      sessionStorage.setItem('studentInfoManage-getStudentInfoList-pageNum', vm.pageNum);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-pageSize', vm.pageSize);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-grade', vm.grade);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-studentClass', vm.studentClass);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-studentName', vm.studentName);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-registerCode', vm.registerCode);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-transferStatus', vm.transferStatus);
      sessionStorage.setItem('studentInfoManage-getStudentInfoList-hasParent', vm.hasParent);
      const result = await api.getStudentInfoList(data)
      if (result.data.code === 10000) {
        vm.loading = false
        vm.resultData = result.data.response
      } else {
        if (result.data.code > 39999) {
          vm.$Message.info(result.data.msg)
        }
      }
    },
    inputStudent(){
      this.$router.push({ name: 'exportTaskManage', query: {
          taskType: '1',
          yearSemester: ''
      }})
    },
    inputNumberReplace(){
      sessionStorage.setItem('studentInfoManage-exportTaskReplaceManage-taskType',"1")
      this.$router.push({ name: 'exportTaskReplaceManage' })
    },
    querySearch(){
      this.pageNum = 1;
      this.pageNo = 1
      this.search();
    },
    search() {
      var vm = this
      let schoolId = vm.schoolId
      vm.getStudentInfoList(schoolId)
      vm.countStudentList(schoolId)
    },

    countStudentList(schoolId) {
      var vm = this
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        transferSchoolStatus: vm.transferStatus,
         hasParent:vm.hasParent=="999"?"":vm.hasParent
      }
      this.$axios.post('/v1/studentinfo/countStudentList', data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(studentId) {
      this.$router.push({name: 'minstudentInfoDetail', params: {'studentId':studentId}})
    },
    deleteStudent() {
      var vm = this
      this.$axios
        .get('/v1/studentinfo/deleteStudentByStudentId?studentId=' + this.nowStudentId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.$Message.info(res.data.msg);
            vm.querySearch();
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    addStudent() {
      var vm = this
      sessionStorage.removeItem('studentInfoManage-studentInfoDetail-studentId')
      this.$router.push({
        name: 'studentInfoDetail'
      })
    },
    getSchoolData(schoolId) {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios
        .get('/v1/school/getSchoolDetail?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            console.log(res)
            let data = res.data.response
            this.schoolData = data
            this.schoolName = data.name
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg)
            }
          }
        })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNum = 1;
        this.search()
      }
    },

    getSchoolCollegeBySchoolId(schoolId) {
      var vm = this
      this.$axios
        .get('/v1/student/getSchoolCollegeBySchoolId?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.collegesList = res.data.response
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getSchoolMajorBySchoolId(schoolId, collegeCode) {
      var vm = this
      this.$axios
        .get(
          '/v1/student/getSchoolMajorBySchoolId?schoolId=' +
          schoolId +
          '&collegeCode=' +
          collegeCode
        )
        .then(res => {
          if (res.data.code == 10000) {
            vm.majorList = res.data.response
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    formatTime(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return [year, month].map(this.formatNumber)
    },
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    getClassList (val) {
      let _this = this;
      if (val !== '' && val !== undefined) {
        this.$axios.get('/v1/vision/classList?grade=' + val).then(res => {
          if (res.data.code === 10000) {
            _this.studentClass = '';
            _this.classList = res.data.response;
          } else {
            this.$Message.warning(res.data.msg);
          }
        });
      } else {
        _this.classList = [];
        _this.studentClass = '';
      }
    },
  },
  watch: {
    college: function () {
      var vm = this
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college)
    },
  },
  created() {
  },
  mounted() {
    sessionStorage.removeItem('studentInfoManage-getStudentInfoList-grade');
    sessionStorage.removeItem('studentInfoManage-getStudentInfoList-studentClass');
    //0 未知类型 1 幼儿园 2小学 3初中 4高中 5大学
    var vm = this
    vm.schoolId = sessionStorage.getItem('schoolId')
    vm.schoolType = sessionStorage.getItem('schoolType')
    let tempPageSize = sessionStorage.getItem('studentInfoManage-getStudentInfoList-pageSize');
    let tempgrade = sessionStorage.getItem('studentInfoManage-getStudentInfoList-grade');
    let tempstudentClass = sessionStorage.getItem('studentInfoManage-getStudentInfoList-studentClass');
    let tempstudentName = sessionStorage.getItem('studentInfoManage-getStudentInfoList-studentName');
    let tempregisterCode = sessionStorage.getItem('studentInfoManage-getStudentInfoList-registerCode');
    let temptransferStatus = sessionStorage.getItem('studentInfoManage-getStudentInfoList-temptransferStatus');
    let hasParent = sessionStorage.getItem('studentInfoManage-getStudentInfoList-hasParent');
    let classGrade = sessionStorage.getItem('sportsClass-studentInfoManage-grade');
    let classStudentClass = sessionStorage.getItem('sportsClass-studentInfoManage-studentClass');
    if (sessionStorage.getItem('sportsClass-studentInfoManage-grade')) {
      tempgrade = Number(classGrade);
    }
    if (sessionStorage.getItem('sportsClass-studentInfoManage-studentClass')) {
      tempstudentClass = Number(classStudentClass);;
    }

    if (tempPageSize != null && tempPageSize != undefined && tempPageSize > 0) {
      vm.pageNum = Number(sessionStorage.getItem('studentInfoManage-getStudentInfoList-pageNum'));
      vm.pageSize = Number(sessionStorage.getItem('studentInfoManage-getStudentInfoList-pageSize'));
      console.log(tempgrade);
      if (tempgrade != null && tempgrade != undefined && tempgrade > 0) {
        vm.grade = Number(tempgrade);
      }
      if (tempstudentClass != null && tempstudentClass != undefined && tempstudentClass > 0) {
        vm.studentClass = Number(tempstudentClass);;
      }
      if (tempstudentName != null && tempstudentName != undefined && tempstudentName != "") {
        vm.studentName = tempstudentName;
      }
      if (tempregisterCode != null && tempregisterCode != undefined && tempregisterCode != "") {
        vm.registerCode = tempregisterCode;
      }
      if (temptransferStatus != null && temptransferStatus != undefined && temptransferStatus != "") {
        vm.transferStatus = temptransferStatus;
      }
      if (hasParent != null && hasParent != undefined && hasParent != "") {
        vm.hasParent = hasParent;
      }else{
        vm.hasParent ="999"
      }
    }
    vm.search()
  }
}
</script>
