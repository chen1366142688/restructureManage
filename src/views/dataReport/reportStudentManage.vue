<style lang="less" scoped>
  .width120 {
    width: 120px;
  }
  .student-edit-model{
    span {
      display: inline-block;
      width: 60px;
      text-align:right;
    }
  }
</style>
<template>
  <div style="padding-left:10px;" class="student-info-manage">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">国网学生管理</h2>
    </div>
    <div>
      <Card>
        <div class="top-search" @keydown.enter="querySearch">
          <div class="left-input">
            <!-- <div style="margin:5px 20px;">
                    <span style="" >所属学校：</span>
                    <Select v-model="schoolIdSelect" class="width120">
                        <Option v-for="item in schoolList" :value="item.schoolId" :key="item.schoolId">{{ item.name }}</Option>
                    </Select>
                </div> -->
            <div style="margin:5px 20px;">
              <span style="">年<span style="visibility:hidden">空空</span>级：</span>
              <Select v-model="gradeCode" class="width120" :disabled="gradeClassDisabled">
                <Option v-for="item in gradeCodeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班级名称：</span>
              <Select v-model="classCode" class="width120" :disabled="gradeClassDisabled">
                <Option v-for="(item,index) in classCodeList" :value="item.classCode" :key="item.classCode">
                  {{ item.className }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>姓<span style="visibility:hidden">空空</span>名：</span>
              <Input v-model="studentName" placeholder="学生姓名" class="width120" />
            </div>
            <div style="margin:5px 20px;">
              <span>性<span style="visibility:hidden">空空</span>别：</span>
              <Select v-model="gender" class="width120">
                <Option v-for="(item,index) in genderList" :value="item.value" :key="item.value">{{ item.name }}
                </Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>学籍状态：</span>
              <Select v-model="studentStatus" class="width120">
                <Option v-for="item in innerSchoolList" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <!-- <Button type="success"  @click="createReportStudentBySchool">按系统当前数据生成</Button> -->
            <Button type="success" @click="importStudent">导入国网体测学生表</Button>
            <Button type="success" @click="importStudentVision">导入国网视力测试学生表</Button>
            <Button type="success" v-if="haveNotNationStudent" @click="exportNorNationStudentData">导出国网无学籍学生</Button>
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
              <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNoChange'
                @on-page-size-change='pageSizechange' show-total show-sizer></Page>
            </div>
          </Row>
        </Card>
      </div>
      <Modal v-model="deleteModel" title="提  醒" @on-ok="delectOk">
        <p style="color: red;font-size: 18px">确认删除该学生？</p>
      </Modal>

      <Modal v-model="studentEditModel" title="学生信息编辑" width="400px" @on-cancel="cancel" class="student-edit-model">
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>姓名:</span>
          <Input v-model="changeStudentName" placeholder="姓名" style="width:70%" />
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>学籍号:</span>
          <Input v-model="changeRegisterCode" placeholder="学籍号" style="width:70%" />
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>性别:</span>
          <Select v-model="changeGender" style="width:70%">
            <Option v-for="(item,index) in genderListChange" :value="item.value" :key="item.value">{{ item.name }}
            </Option>
          </Select>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>出生日期:</span>
          <DatePicker v-model="changeBirthday" :clearable="false" :editable="false" @on-change="sportStartTimeChange"
            format="yyyy-MM-dd" type="date" placeholder="出生日期" style="width:70%"></DatePicker>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>民族编号:</span>
          <Select v-model="changeNationCode" style="width:70%">
            <Option v-for="(item,index) in nationList" :value="item.nationalityCode" :key="item.nationalityCode">
              {{ item.nationalityName }}</Option>
          </Select>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>年级编号:</span>
          <Select v-model="changeGradeCode" style="width:70%">
            <Option v-for="(item,index) in gradeCodeListChange" :value="item.grade" :key="item.grade">{{ item.label }}
            </Option>
          </Select>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>班级编号:</span>
          <Select v-model="changeClassCode" style="width:70%">
            <Option v-for="(item,index) in classCodeListChange" :value="item.classCode" :key="item.classCode">
              {{ item.classCode }}</Option>
          </Select>
          </col>
        </Row>
        <div slot="footer">
          <Button type="default" @click="cancel">取消</Button>
          <Button type="primary" @click="editOk">提交</Button>
        </div>
      </Modal>
      <Modal v-model="addModel" title="添加学生至学校" width="400px" @on-cancel="cancel" class="student-edit-model">
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>姓名:</span>
          <Input :disabled="true" v-model="changeStudentName" placeholder="姓名" style="width:70%" />
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>学籍号:</span>
          <Input :disabled="true" v-model="changeRegisterCode" placeholder="学籍号" style="width:70%" />
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>性别:</span>
          <Input :disabled="true" v-model="changeGender" placeholder="学籍号" style="width:70%" />
          <!-- <Select v-model="changeGender" class="width120">
              <Option :disabled="true" v-for="(item,index) in genderListChange" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select> -->
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>出生日期:</span>
          <DatePicker :disabled="true" v-model="changeBirthday" :clearable="false" @on-change="sportStartTimeChange"
            format="yyyy-MM-dd" type="date" placeholder="出生日期" style="width:70%"></DatePicker>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>民族编号:</span>
          <Select :disabled="true" v-model="changeNationCode" style="width:70%">
            <Option :disabled="true" v-for="(item,index) in nationList" :value="item.nationalityCode"
              :key="item.nationalityCode">{{ item.nationalityName }}</Option>
          </Select>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>年级:</span>
          <Select v-model="changeGradeId" style="width:70%">
            <Option v-for="(item,index) in gradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
          </Select>
          </col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
          <span>班级:</span>
          <Select v-model="changeStudentClass" style="width:70%">
            <Option v-for="(item,index) in classList" :value="item.classId" :key="item.classId">
              {{ item.studentClassName }}</Option>
          </Select>
          </col>
        </Row>
        <div slot="footer">
          <Button type="default" @click="cancel">取消</Button>
          <Button type="primary" @click="addOk">提交</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'schoolList',
    data() {
      return {
        deleteModel: false,
        studentEditModel: false,
        addModel: false,
        studentInfo: {},
        changeStudentName: '',
        changeRegisterCode: '',
        changeGender: '',
        changeBirthday: '',
        changeNationCode: '',
        changeGradeCode: '',
        changeClassCode: '',
        changeGradeId: '',
        changeStudentClass: '',
        changeSchoolId: '',
        loading: false,
        schoolId: '',
        schoolType: '',
        gradeCode: '',
        gradeCodeList: [],
        gradeCodeListChange: [],
        primaryList: [

          {
            grade: '11',
            label: '一年级'
          },
          {
            grade: '12',
            label: '二年级'
          },
          {
            grade: '13',
            label: '三年级'
          },
          {
            grade: '14',
            label: '四年级'
          },
          {
            grade: '15',
            label: '五年级'
          },
          {
            grade: '16',
            label: '六年级'
          }
        ],
        middleList: [

          {
            grade: '21',
            label: '七年级'
          },
          {
            grade: '22',
            label: '八年级'
          },
          {
            grade: '23',
            label: '九年级'
          }
        ],
        highList: [
          {
            grade: '31',
            label: '高一'
          },
          {
            grade: '32',
            label: '高二'
          },
          {
            grade: '33',
            label: '高三'
          }
        ],
        primaryListChange: [
          {
            grade: '11',
            label: '11'
          },
          {
            grade: '12',
            label: '12'
          },
          {
            grade: '13',
            label: '13'
          },
          {
            grade: '14',
            label: '14'
          },
          {
            grade: '15',
            label: '15'
          },
          {
            grade: '16',
            label: '16'
          }
        ],
        middleListChange: [
          {
            grade: '21',
            label: '21'
          },
          {
            grade: '22',
            label: '22'
          },
          {
            grade: '23',
            label: '23'
          }
        ],
        highListChange: [
          {
            grade: '31',
            label: '31'
          },
          {
            grade: '32',
            label: '32'
          },
          {
            grade: '33',
            label: '33'
          }
        ],
        classCode: '',
        classCodeList: [],
        classCodeListChange: [],
        studentName: '',
        gender: '',
        genderList: [
          {
            name: '全部',
            value: '999'
          },
          {
            name: '男',
            value: '1'
          },
          {
            name: '女',
            value: '2'
          },
        ],
        genderListChange: [

          {
            name: '男',
            value: '1'
          },
          {
            name: '女',
            value: '2'
          },
        ],
        studentStatus: '',
        innerSchoolList: [
          // {
          //   name: '全部',
          //   value: '999'
          // },
          {
            name: '完全匹配',
            value: '1'
          },
          {
            name: '系统无数据',
            value: '2'
          },
          {
            name: '国网无数据',
            value: '3'
          },
        ],
        resultColumns: [],
        normal: [
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
              const row = params.row;
              let text = row.gender == '1' ? "男" : row.gender == '2' ? "女" : row.gender;
              return h('div', text)
            }
          },
          {
            title: '出生日期',
            key: 'birthday',
            align: 'center',
            minWidth: 100
          },
          {
            title: '民族编号',
            key: 'nationCode',
            align: 'center',
            minWidth: 100
          },
          {
            title: '年级编号',
            key: 'gradeCode',
            align: 'center',
            minWidth: 100
          },
          {
            title: '班级编号',
            key: 'classCode',
            align: 'center',
            minWidth: 100,
          },
          {
            title: '班级名称',
            key: 'className',
            align: 'center',
            minWidth: 100,
          },
          {
            title: '学籍状态',
            key: 'innerSchool',
            align: 'center',
            minWidth: 100,
            render: (h, params) => {
              const row = params.row;
              let text = "";
              if (row.innerSchool == '1') {
                text = "完全匹配";
              } else if (row.innerSchool == '2'){
                text = "系统无数据";
              }else{
                text = "国网无数据";
              }
              return h('div', text)
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 350,
            render: (h, params) => {
              const row = params.row;
              return h('div', row.innerSchool == '1' ? [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success'
                    },
                    style: {
                      marginLeft: '10px'
                    },
                    on: {
                      click: () => {
                        this.editStudent(params.row)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'success'
                    },
                    style: {
                      marginLeft: '10px'
                    },
                    on: {
                      click: () => {
                        this.deleteStudent(params.row)
                      }
                    }
                  },
                  '删除'
                ),
              ] : row.innerSchool == '2' ?[
                  h(
                    'Button',
                    {
                      props: {
                        type: 'success'
                      },
                      style: {
                        marginLeft: '10px'
                      },
                      on: {
                        click: () => {
                          this.addStudent(params.row)
                        }
                      }
                    },
                    '添加到学校'
                  ),
                  h(
                  'Button',
                  {
                      props: {
                        type: 'success'
                      },
                      style: {
                        marginLeft: '10px'
                      },
                      on: {
                        click: () => {
                          this.deleteStudent(params.row)
                        }
                      }
                    },
                    '删除'
                  ),
                ]:[]

              )
            }
          }
        ],
        resultData: [],
        pageNo: 1,
        pageSize: 10,
        total: 0,
        primaryGradeList: [
          {
            grade: 1,
            label: "一年级"
          },
          {
            grade: 2,
            label: "二年级"
          },
          {
            grade: 3,
            label: "三年级"
          },
          {
            grade: 4,
            label: "四年级"
          },
          {
            grade: 5,
            label: "五年级"
          },
          {
            grade: 6,
            label: "六年级"
          }
        ],

        middleGradeList: [
          {
            grade: 7,
            label: "七年级"
          },
          {
            grade: 8,
            label: "八年级"
          },
          {
            grade: 9,
            label: "九年级"
          }
        ],
        highGradeList: [
          {
            grade: 10,
            label: "高一"
          },
          {
            grade: 11,
            label: "高二"
          },
          {
            grade: 12,
            label: "高三"
          }
        ],
        gradeId: '',
        gradeList: [],
        nationList: [],
        classList: [],
        schoolIdSelect: '',
        schoolList: [],
        gradeClassDisabled:false,
        haveNotNationStudent:false
      }
    },
    methods: {
      exportNorNationStudentData(){
         var vm=this;
        let url =
        this.$axios.defaults.baseURL +'/v1/dataReport/exportNorNationStudentData?token=' +sessionStorage.getItem('token')
        window.open(url)
      },
      editStudent(student) {
        var vm = this;
        vm.studentInfo = student;
        console.log(student)
        vm.changeStudentName = student.studentName;
        vm.changeRegisterCode = student.registerCode;
        vm.changeGender = student.gender;
        vm.changeBirthday = student.birthday;
        vm.changeNationCode = student.nationCode;
        vm.changeGradeCode = student.gradeCode;
        vm.changeClassCode = student.classCode;
        vm.changeSchoolId = student.schoolId;
        let schoolType = student.schoolType;
        vm.getReportStudentClassCodeList(vm.changeGradeCode, "2", vm.changeSchoolId)
        vm.gradeList = []
        // vm.gradeCodeList = []
        vm.gradeCodeListChange = []
        if ('2' == schoolType) {
          vm.gradeList = vm.gradeList.concat(vm.primaryGradeList)
          // vm.gradeCodeList = vm.gradeCodeList.concat(vm.primaryList)
          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.primaryListChange)
        }
        if ('3' == schoolType) {
          vm.gradeList = vm.gradeList.concat(vm.middleGradeList)
          // vm.gradeCodeList = vm.gradeCodeList.concat(vm.middleList)
          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.middleListChange)
        }
        if ('4' == schoolType) {
          vm.gradeList = vm.gradeList.concat(vm.highGradeList)
          // vm.gradeCodeList = vm.gradeCodeList.concat(vm.highList)
          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.highListChange)
        }
        vm.studentEditModel = true
      },
      deleteStudent(student) {
        var vm = this
        vm.studentInfo = student;
        vm.deleteModel = true;
      },
      addStudent(student) {
        var vm = this;
        vm.studentInfo = student;
        vm.changeStudentName = student.studentName;
        vm.changeRegisterCode = student.registerCode;
        vm.changeGender = student.gender;
        vm.changeBirthday = student.birthday;
        vm.changeNationCode = student.nationCode;
        vm.changeGradeCode = student.gradeCode;
        vm.changeClassCode = student.classCode;
        vm.changeSchoolId = student.schoolId;
        vm.getReportStudentClassCodeList(vm.changeGradeCode, "2", vm.changeSchoolId)
        let schoolType = student.schoolType;
        vm.gradeList = []
        vm.gradeCodeList = []
        vm.gradeCodeListChange = []
        if ('2' == schoolType) {
          vm.gradeList = vm.gradeList.concat(vm.primaryGradeList)
          // vm.gradeCodeList = vm.gradeCodeList.concat(vm.primaryList)
          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.primaryListChange)
        }
        if ('3' == schoolType) {
          vm.gradeList = vm.gradeList.concat(vm.middleGradeList)
          // vm.gradeCodeList = vm.gradeCodeList.concat(vm.middleList)
          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.middleListChange)
        }
        if ('4' == schoolType) {
          vm.gradeList = vm.gradeList.concat(vm.highGradeList)
          // vm.gradeCodeList = vm.gradeCodeList.concat(vm.highList)
          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.highListChange)
        }
        vm.addModel = true
      },
      cancel() {
        var vm = this;
        vm.deleteModel = false;
        vm.studentEditModel = false;
        vm.addModel = false;
      },
      ok() {
        this.deleteStudent(this.nowStudentId);
      },
      delectOk() {
        var vm = this;
        vm.deleteStudentFunction();
      },
      editOk() {
        var vm = this;
        vm.updateReportStudentInfo()
      },
      addOk() {
        var vm = this;
        let student = vm.studentInfo;
        vm.changeStudentName = student.studentName;
        vm.changeRegisterCode = student.registerCode;
        vm.changeGender = student.gender;
        vm.changeBirthday = student.birthday;
        vm.changeNationCode = student.nationCode;
        vm.changeSchoolId = student.schoolId;
        vm.updateStudentInfo();
      },
      sportStartTimeChange(date, type) {
        var vm = this;
        vm.changeBirthday = date
      },
      getReportStudentList() {
        var vm = this
        vm.loading = true;
        sessionStorage.setItem('reportStudentManage-schoolIdSelect', vm.schoolIdSelect);
        sessionStorage.setItem('reportStudentManage-studentName', vm.studentName);
        sessionStorage.setItem('reportStudentManage-gradeCode', vm.gradeCode);
        sessionStorage.setItem('reportStudentManage-gender', vm.gender);
        sessionStorage.setItem('reportStudentManage-classCode', vm.classCode);
        sessionStorage.setItem('reportStudentManage-studentStatus', vm.studentStatus);
        sessionStorage.setItem('reportStudentManage-pageNo', vm.pageNo);
        sessionStorage.setItem('reportStudentManage-pageSize', vm.pageSize);
        this.$axios
          .get('/v1/dataReport/getReportStudentList?schoolId=' + (vm.schoolIdSelect == 999 ? "" : vm.schoolIdSelect) + '&studentName=' + vm.studentName + '&gradeCode=' + (vm.gradeCode == '999' ? '' : vm.gradeCode) +
            '&gender=' + (vm.gender == '999' ? '' : vm.gender) + '&classCode=' + (vm.classCode == '999' ? '' : vm.classCode) +
            '&studentStatus=' + (vm.studentStatus == '999' ? '' : vm.studentStatus) + '&pageNo=' + vm.pageNo + '&pageSize=' + vm.pageSize)
          .then(res => {
            vm.loading = false;
            if (res.data.code == 10000) {
              this.resultData = res.data.response
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      countReportStudentList() {
        var vm = this
        this.$axios
          .get('/v1/dataReport/countReportStudentList?schoolId=' + (vm.schoolIdSelect == 999 ? "" : vm.schoolIdSelect) + '&studentName=' + vm.studentName + '&gradeCode=' + (vm.gradeCode == '999' ? '' : vm.gradeCode) +
            '&gender=' + (vm.gender == '999' ? '' : vm.gender) + '&classCode=' + (vm.classCode == '999' ? '' : vm.classCode) +
            '&studentStatus=' + (vm.studentStatus == '999' ? '' : vm.studentStatus))
          .then(res => {
            if (res.data.code == 10000) {
              this.total = res.data.response
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      getNotNationStudentNum() {
        var vm = this
        this.$axios
          .get('/v1/dataReport/countReportStudentList?studentStatus=3' )
          .then(res => {
            if (res.data.code == 10000) {
             let num = res.data.response
             if(num>0){
               vm.haveNotNationStudent=true
             }else{
               vm.haveNotNationStudent=false
             }
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      getReportStudentClassCodeList(gradeCode, type, schoolId) {
        var vm = this
        this.$axios
          .get('/v1/dataReport/getReportStudentClassCodeList?schoolId=' + schoolId + '&gradeCode=' + gradeCode)
          .then(res => {
            this.classCodeList = []
            if (res.data.code == 10000) {
              let data = res.data.response;
              if (type == "1") {
                let all = {
                  classCode: '999',
                  className: '全部',
                };
                this.classCodeList.push(all);
                for (let i = 0; i < data.length; i++) {
                  data[i].className = Number(data[i].classCode.substring(data[i].classCode.length - 2, data[i].classCode.length)) + "班"
                }
                this.classCodeList = this.classCodeList.concat(data)
                this.classCode = "999"
              } else {
                this.classCodeListChange = data
              }

            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      getGradeClassSingleInfo(gradeId) {
        var vm = this;
        this.$axios
          .get("/v1/exercisecombo/getGradeClassSingleInfo?gradeId=" + gradeId)
          .then(function (response) {
            vm.classList = [];
            let data = response.data.response;
            vm.classList = data
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      getNationList() {
        var vm = this;
        this.$axios
          .get("/v1/common/getNationList")
          .then(function (response) {
            let data = response.data.response;
            vm.nationList = data
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "y+": date.getFullYear().toString(),        // 年
          "M+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
        };
        return fmt;
      },
      updateReportStudentInfo() {
        var vm = this
        console.log(vm.changeBirthday)
        console.log(typeof vm.changeBirthday)
        let data = {
          "birthday": typeof vm.changeBirthday == "string" ? vm.changeBirthday.replace("-", "/") : vm.dateFormat("yyyy/MM/dd", vm.changeBirthday),
          "classCode": vm.changeClassCode,
          "gender": vm.changeGender,
          "gradeCode": vm.changeGradeCode,
          "nationCode": vm.changeNationCode,
          "registerCode": vm.changeRegisterCode,
          "reportStudentId": vm.studentInfo.reportStudentId,
          "studentId": vm.studentInfo.studentId,
          "studentName": vm.changeStudentName,
          schoolId: vm.changeSchoolId
        }
        console.log(data)
        // return
        this.$axios.post('/v1/dataReport/updateReportStudentInfo', data)
          .then(res => {
            if (res.data.code == 10000) {
              vm.$Message.info(res.data.msg)
              vm.studentEditModel = false;
              vm.search()
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      deleteStudentFunction() {
        var vm = this
        this.$axios
          .get('/v1/dataReport/deleteStudent?reportStudentId=' + vm.studentInfo.reportStudentId)
          .then(res => {
            if (res.data.code == 10000) {
              vm.$Message.info(res.data.msg)
              vm.deleteModel = false;
              vm.search()
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      getTeacherSchoolList() {
        var vm = this
        this.$axios
          .get('/v1/dataReport/getTeacherSchoolList?schoolId=1&menuType=1')
          .then(res => {
            if (res.data.code == 10000) {
              let data = res.data.response;
              let all = {
                grade: '999',
                label: '全部'
              }
          
              vm.gradeCodeList = vm.gradeCodeList.concat(all)
              if(data.length == 1){
                vm.isMore = true;
                vm.notSchoolType = data[0].schoolType
              }
              let primaryChange = true;
              let middleChange = true;
              let highChange = true;
              for(let i =0;i<data.length;i++){
                  vm.resultColumns = vm.normal
                  let schoolType = data[i].schoolType;
                    if (schoolType) {
                      if ('2' == schoolType && primaryChange) {
                          vm.gradeCodeList = vm.gradeCodeList.concat(vm.primaryList)
                          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.primaryListChange)
                          primaryChange = false;
                      }
                      if ('3' == schoolType && middleChange) {
                          vm.gradeCodeList = vm.gradeCodeList.concat(vm.middleList)
                          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.middleListChange)
                          middleChange = false;
                      }
                      if ('4' == schoolType && highChange) {
                          vm.gradeCodeList = vm.gradeCodeList.concat(vm.highList)
                          vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.highListChange)
                          highChange = false;
                      }
                  } 
              }
              // if(data.length==1){
              //   vm.schoolList=data
              // }else{
              //   let all={
              //     schoolId:999,
              //     name:"全部学校"
              //   }
              //   vm.schoolList.push(all);
              //   vm.schoolList=vm.schoolList.concat(data)
              // }
              // if(sessionStorage.getItem('reportStudentManage-schoolIdSelect')){
              //     vm.schoolIdSelect = Number(sessionStorage.getItem('reportStudentManage-schoolIdSelect'));;
              // }else{
              //   vm.schoolIdSelect=vm.schoolList[0].schoolId
              // }
              vm.parmasCheck()
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
                vm.parmasCheck()
              }
            }
          })
      },
      updateStudentInfo() {
        var vm = this;
        if (
          !vm.changeStudentName ||
          vm.changeStudentName == null ||
          vm.changeStudentName == "" ||
          vm.changeStudentName.trim() == ""
        ) {
          vm.$Message.info("学生姓名不能为空！");
          return false;
        }
        if (
          !vm.changeRegisterCode ||
          vm.changeRegisterCode == null ||
          vm.changeRegisterCode == "" ||
          vm.changeRegisterCode.trim() == ""
        ) {
          vm.$Message.info("学生学籍号不能为空！");
          return false;
        }

        if (vm.changeGender == null || vm.changeGender == "") {
          vm.$Message.info("请选择性别！");
          return false;
        }
        if (vm.changeGradeId == null || vm.changeGradeId == "") {
          vm.$Message.info("请选择年级！");
          return false;
        }
        if (vm.changeStudentClass == null || vm.changeStudentClass == "") {
          vm.$Message.info("请选择班级！");
          return false;
        }
        vm.changeStudentName = vm.changeStudentName.trim();
        vm.changeRegisterCode = vm.changeRegisterCode.trim();
        let data = {
          auditStatus: "1",
          birthday: vm.changeBirthday,
          classId: vm.changeStudentClass,
          gender: vm.changeGender,
          grade: vm.changeGradeId,
          nationCode: vm.changeNationCode,
          registerCode: vm.changeRegisterCode,
          studentName: vm.changeStudentName,
          transferSchoolStatus: "0",
          schooolId: vm.changeSchoolId
        };
        this.$axios.get(`/v1/subjectReport/querySchoolReportedStatus?dataType=2`).then(res => {
          if (res.data.code === 10000) {
            let { editStatus } = res.data.response
            if (editStatus === '1') { // 可编辑
              this.$axios.post("/v1/studentinfo/updateStudentInfo", data).then(function (res) {
                if (res.data.code == 10000) {
                  if (res.data.response.code == 1) {
                    vm.$Message.info(res.data.response.msg);
                    vm.addModel = false;
                    vm.search();
                  } else {
                    vm.$Message.info(res.data.response.msg);
                  }
                } else {
                  if (res.data.code > 39999) {
                    vm.$Message.info(res.data.msg);
                  }
                }
              })
                .catch(function (response) {
                  console.log(response);
                });
            } else { // 不可编辑
              this.$Modal.info({
                title: '提醒',
                okText: '知道了',
                closable: false,
                content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>',
              });
              return false
            }
          }
        })
      },
      querySearch() {
        this.pageNo = 1;
        this.pageNo = 1
        this.search();
      },
      search() {
        var vm = this
        vm.resultData=[]
        vm.getNotNationStudentNum()
        vm.getReportStudentList()
        vm.countReportStudentList()
      },
      createReportStudentBySchool() {
        var vm = this
        this.$axios
          .get('/v1/dataReport/createReportStudentBySchool?schoolId=1&yearSemester=' + sessionStorage.getItem('yearSemester') + '&wasNow=0')
          .then(res => {
            if (res.data.code == 10000) {
              vm.$Message.info(res.data.msg)
              vm.search()
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
              }
            }
          })
      },
      //导入国网体测学生表
      importStudent() {
        let yearSemester = sessionStorage.getItem('yearSemester')
        this.$router.push({ name: 'importStudentInfoNow',query:{yearSemester: yearSemester,taskType:'3'} })
      },
      //导入国网视力测试学生表
      importStudentVision() {
        let yearSemester = sessionStorage.getItem('yearSemester')
        this.$router.push({ name: 'importStudentInfoNow',query:{yearSemester: yearSemester,taskType:'4'} })
      },

      pageNoChange(value) {
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
      parmasCheck() {
        var vm = this
        let schoolId = sessionStorage.getItem('schoolId')
        vm.schoolId = schoolId
        // let schoolType = sessionStorage.getItem('schoolType')
        // vm.schoolType=schoolType;
        // console.log(schoolType)
        // if (schoolType) {
        //   vm.resultColumns = vm.normal
        //   if ('0' == schoolType) {
        //     vm.gradeCodeList = vm.gradeCodeList
        //       .concat(vm.primaryList)
        //       .concat(vm.middleList)
        //   }
        //   if ('2' == schoolType) {
        //       vm.gradeList = vm.gradeList.concat(vm.primaryGradeList)
        //     vm.gradeCodeList = vm.gradeCodeList.concat(vm.primaryList)
        //     vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.primaryListChange)
        //   }
        //   if ('3' == schoolType) {
        //       vm.gradeList = vm.gradeList.concat(vm.middleGradeList)
        //     vm.gradeCodeList = vm.gradeCodeList.concat(vm.middleList)
        //     vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.middleListChange)
        //   }
        //   if ('4' == schoolType) {
        //       vm.gradeCodeList = vm.gradeCodeList.concat(vm.highList)
        //       vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.highListChange)
        //   }
        // } else {
        //   vm.resultColumns = vm.normal
        //   vm.schoolGradeList = vm.schoolGradeList
        //     .concat(vm.primaryList)
        //     .concat(vm.middleList)
        //     .concat(vm.highList)
        //     .concat(vm.collegeList)
        // }

        let schoolIdSelect = sessionStorage.getItem('reportStudentManage-schoolIdSelect');
        let studentName = sessionStorage.getItem('reportStudentManage-studentName');
        let gradeCode = sessionStorage.getItem('reportStudentManage-gradeCode');
        let gender = sessionStorage.getItem('reportStudentManage-gender');
        let classCode = sessionStorage.getItem('reportStudentManage-classCode');
        let studentStatus = sessionStorage.getItem('reportStudentManage-studentStatus');
        let pageNo = sessionStorage.getItem('reportStudentManage-pageNo');
        let pageSize = sessionStorage.getItem('reportStudentManage-pageSize');

        if (schoolIdSelect != null && schoolIdSelect != undefined && schoolIdSelect > 0) {
          vm.schoolIdSelect = Number(schoolIdSelect);;
        }
        if (studentName != null && studentName != undefined && studentName != "") {
          vm.studentName = studentName;
        }
        if (gradeCode != null && gradeCode != undefined && gradeCode != "") {
          vm.gradeCode = gradeCode;
        } else {
          vm.gradeCode = '999'

        }
        if (gender != null && gender != undefined && gender != "") {
          vm.gender = gender;
        } else {
          vm.gender = '999'
        }
        if (classCode != null && classCode != undefined && classCode != "") {
          vm.classCode = classCode;
        } else {
          vm.classCode = '999'
        }
        if (studentStatus != null && studentStatus != undefined && studentStatus != "") {
          vm.studentStatus = studentStatus;
        } else {
          vm.studentStatus = '1'
        }
        if (pageNo != null && pageNo != undefined && pageNo > 0) {
          vm.pageNo = Number(pageNo);;
        }
        if (pageSize != null && pageSize != undefined && pageSize > 0) {
          vm.pageSize = Number(pageSize);;
        }

        vm.search()
        vm.getNationList();
      }
    },
    watch: {
      gradeCode: function () {
        var vm = this;
        //  vm.classCode='全部';
        if (vm.gradeCode && vm.gradeCode != '999') {

          vm.getReportStudentClassCodeList(vm.gradeCode, "1", vm.schoolIdSelect)
        } else {
          let data = [
            {
              classCode: '999',
              className: '全部',
            }
          ]
          this.classCodeList = data;
          this.classCode = "999";
          console.log(this.classCodeList)
        }
      },
      changeGradeCode: function () {
        var vm = this;
        //    vm.changeClassCode='';
        vm.getReportStudentClassCodeList(vm.changeGradeCode, "2", vm.schooolId)
      },
      changeGradeId: function () {
        var vm = this;
        vm.getGradeClassSingleInfo(vm.changeGradeId);
      },
      studentStatus:function(){
        var vm=this;
        if(vm.studentStatus=="3"){
          vm.gradeClassDisabled=true
          vm.gradeCode='999'
        }else{
          vm.gradeClassDisabled=false;
        }
      }
      //  schoolIdSelect:function(){
      //    var vm=this;
      //    vm.gradeCodeList=[]
      //       vm.gradeCodeListChange =[]
      //    if(vm.schoolIdSelect!=999){
      //      let schoolType="";
      //      for(let i=0;i<vm.schoolList.length;i++){
      //        if(vm.schoolIdSelect==vm.schoolList[i].schoolId){
      //          schoolType=vm.schoolList[i].schoolType
      //        }
      //      }
      //      console.log(schoolType)
      //      if (schoolType) {
      //       vm.resultColumns = vm.normal
      //       if ('2' == schoolType) {
      //           vm.gradeCodeList = vm.gradeCodeList.concat(vm.primaryList)
      //           vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.primaryListChange)
      //       }
      //       if ('3' == schoolType) {
      //           vm.gradeCodeList = vm.gradeCodeList.concat(vm.middleList)
      //           vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.middleListChange)
      //       }
      //       if ('4' == schoolType) {
      //           vm.gradeCodeList = vm.gradeCodeList.concat(vm.highList)
      //           vm.gradeCodeListChange = vm.gradeCodeListChange.concat(vm.highListChange)
      //       }
      //     } 
      //    }
      //    vm.gradeCode="999"
      //  }

    },
    created() {
      //  this.getProvinceList();
    },
    mounted() {
      //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
      this.getTeacherSchoolList()
    }
  }
</script>