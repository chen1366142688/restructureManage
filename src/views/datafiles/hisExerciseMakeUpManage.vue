<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{yearSemester%2==0?((yearSemester/10).toFixed(0))+"学年第一学期":((yearSemester/10).toFixed(0) -1)+"学年第二学期"}}课后作业补录</h2>
    </div>
    <div>
      <Card style="height: 110px;">
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span style>年级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班级：</span>
              <Select v-model="studentClass"  style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>姓名：</span>
              <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>学籍号：</span>
             <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <div style="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" style="margin-left:16px;" @click="pageToList">返回</Button>
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;width:100%;height:40px;display:flex;align-items:center;justify-content:space-between;">
          <div>数据明细</div>
          <Button type="success" :disabled = "dataSize" @click="allComplete" >一键完成</Button>
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br />
           <div style="margin-top:10px;padding-left:46%">
                <Button
                  :disabled = "dataSize"
                  style="float:left;width:100px"
                  @click="saveAllStudentCount"
                  type="success"
                >提交</Button>
              </div>
        </Row>

     </Card>
     <Modal
            v-model="modalTx"
            title="完成次数"
            :mask-closable="false"
            @on-ok="modalTxOk"
            @on-cancel="modalTxCancel"
              width = "350px">
      <div>
         完成次数：<Input v-model="allTeacherCount" :maxlength="10" type="text"    style="center;width:200px"/>
      </div>
      <div slot="footer">
        <Button type="success" @click="modalTxOk">确定</Button>
        <Button type="success" @click="modalTxCancel">取消</Button>
      </div>
    </Modal>

    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      modalTx: false,
      loading: false,
      allTeacherCount:'',
      yearSemester:'',
      dataSize:false,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      gender:"",
      genderList:[
        {
          itemId:"",
          itemName:"全部"
        },
        {
          itemId:"1",
          itemName:"男"
        },
        {
          itemId:"2",
          itemName:"女"
        }
      ],
      primaryList: [

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
      middleList: [

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
      highList: [
        {
          grade: "",
          label: "全部"
        },
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
      collegeList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 13,
          label: "大一"
        },
        {
          grade: 14,
          label: "大二"
        },
        {
          grade: 15,
          label: "大三"
        },
        {
          grade: 16,
          label: "大四"
        }
      ],
      schoolGradeList: [],
      studentClass: "",
      classList: [

        {
          value: 1,
          label: "1班"
        },
        {
          value: 2,
          label: "2班"
        },
        {
          value: 3,
          label: "3班"
        },
        {
          value: 4,
          label: "4班"
        },
        {
          value: 5,
          label: "5班"
        },
        {
          value: 6,
          label: "6班"
        },
        {
          value: 7,
          label: "7班"
        },
        {
          value: 8,
          label: "8班"
        },
        {
          value: 9,
          label: "9班"
        },
        {
          value: 10,
          label: "10班"
        },
        {
          value: 11,
          label: "11班"
        },
        {
          value: 12,
          label: "12班"
        },
        {
          value: 13,
          label: "13班"
        },
        {
          value: 14,
          label: "14班"
        },
        {
          value: 15,
          label: "15班"
        },
        {
          value: 16,
          label: "16班"
        },
        {
          value: 17,
          label: "17班"
        },
        {
          value: 18,
          label: "18班"
        },
        {
          value: 19,
          label: "19班"
        },
        {
          value: 20,
          label: "20班"
        },
        {
          value: 21,
          label: "21班"
        },
        {
          value: 22,
          label: "22班"
        },
        {
            value: 23,
            label: '23班'
        },
        {
            value: 24,
            label: '24班'
        },
        {
            value: 25,
            label: '25班'
        },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
      ],
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
          //   minWidth: 250
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
          //   width: 150
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gradeName + row.studentClass + "班";
            return h("div", text);
          }
        },
        {
          title: "学期内完成次数",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            const text = haveCount;
            return h("div", text);
          }
        },
        {
          title: "补录次数",
          key: "teacherCount",
          align: "center",
          //   minWidth: 250
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  type: 'text',
                  id:"score"+params.index,
                  value:params.row.teacherCount
                },
                style: {
                  width:"120px",
                  "text-align": "center"
                },
                on: {
                  'on-blur': (event) => {
                    var reg=/^([1-9]\d*|[0]{1,1})$/;
                    console.log(reg.test(event.target.value))
                    if(!reg.test(event.target.value)){
                          this.$Message.info("请输入整数");
                        this.resultData[params.index].teacherCount = event.target.value;
                    }else{

                      this.resultData[params.index].teacherCount = event.target.value;
                    }
                  },
                  'on-keydown':(event)=>{
                    let ivuInputLength = document.getElementsByClassName('ivu-input').length;
                    let paramsLength = params.index + 1;
                    if(event.keyCode == 38){//键盘上
                      if(params.index == 0){ return ;}
                      var reg=/^([1-9]\d*|[0]{1,1})$/;
                    if(!reg.test(event.target.value)){
                        this.$Message.info("请输入整数");
                        this.resultData[params.index].teacherCount = event.target.value;
                    }else{
                        this.resultData[params.index].teacherCount = event.target.value;
                    }
                      document.getElementsByClassName('ivu-input')[params.index-1].focus();
                    }
                    if(event.keyCode == 40 || event.keyCode == 13){//键盘下
                      if(paramsLength+1 > ivuInputLength ){ return; }
                        var reg=/^[1-9]\d*$/;
                    if(!reg.test(event.target.value)){
                          this.$Message.info("请输入整数");
                        this.resultData[params.index].teacherCount = event.target.value;
                    }else{
                        this.resultData[params.index].teacherCount = event.target.value;
                      }
                      document.getElementsByClassName('ivu-input')[params.index+1].focus();
                    }
                    // console.log(event.keyCode)
                  }

                },
              }),
            ]);

          }
        },
      ],
      collegeColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
          //   minWidth: 250
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
          //   width: 150
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "学院",
          key: "collegeName",
          align: "center"
          //   width: 150
        },
        {
          title: "专业",
          key: "majorName",
          align: "center"
          //   width: 150
        },
        {
          title: "学级",
          key: "startSchool",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.startSchool + "级";
            return h("div", text);
          }
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.studentClass + "班";
            return h("div", text);
          }
        }
      ],
      resultData: [],
      resultData1: [],
      isCollege: false,
      college: "",
      collegesList: [],
      major: "",
      majorList: [],
      chooseCollege: true,
      collegeName: "",
      semesterYear: "",
      semesterName: "",
      semesterYearList: [],
      holiday: "",
      holidayTf: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum1: 1,
      pageSize1: 10,
      total1: 0
    };
  },
  methods: {
     pageToList() {
      //返回
      this.$router.go(-1)
    },
    allComplete(){
      this.modalTx = true;
    },
    modalTxCancel(){
      this.modalTx = false;
    },
    modalTxOk(){
      let vm = this;
      let allTeacherCount = this.allTeacherCount;
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      if(allTeacherCount == '' || allTeacherCount == null){
          this.$Message.info("请输入完成次数！")
          return false;
      }
      if(!reg.test(allTeacherCount)){
          this.$Message.info("请输入整数完成次数！")
          return false;
      }
       this.modalTx = false;
       let data = {
        grade: this.grade,
        studentClass: this.studentClass,
        teacherCount: allTeacherCount,
        yearSemester:this.yearSemester
      };
       this.$axios
        .post(
          '/v1/datafiles/bathUpdateAllCount',data
        )
        .then(function(response) {
          if(response.data.response.code=='1'){
              vm.$Message.info("提交成功")
              vm.search();
          }else{
              vm.$Message.info("提交失败,请勿重复提交！")
              vm.search();
          }
        })
        .catch(function(response) {
          vm.$Message.info("提交失败")
          vm.search();
        })

    },
    saveAllStudentCount() {
      var vm = this
      let list1 = vm.resultData1;
      let list=vm.resultData;
      let data=list
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      for(let i=0;i<data.length;i++){
        data[i].yearSemester = vm.yearSemester;
        if(data[i].teacherScore){
          if (!reg.test(data[i].teacherScore)) {
            vm.$Message.info(data[i].studentName+"的完成次数输入有误！")
             //vm.submitInfo=false;
            return false;
          }
        }
      }
      let isSave = true;

      for(let i=0;i<data.length;i++){
        for(let j=0;j<list1.length;j++){
          if(i==j){
            console.log(data[i].teacherCount);
            console.log(list1[j]);
            if(data[i].teacherCount != list1[j].teacherCount){
              isSave = false;
            }
          }
        }
      }
      if(isSave){
        vm.$Message.info("没有改变数据，无需提交！！")
        return false;
      }
      this.$axios
        .post(
          '/v1/datafiles/bathUpdateCount',data
        )
        .then(function(response) {
          //vm.submitInfo=false;
            // console.log(response)
          if(response.data.response.code=='1'){
              vm.$Message.info("提交成功")
              vm.getStudentInfoList(vm.schoolId)
              //vm.$router.go(0);
          }else{
              vm.$Message.info("提交失败,请勿重复提交！")
          }
        })
        .catch(function(response) {
         // vm.submitInfo=false;
        //   console.log(response)
          //vm.$Message.info("提交失败")
        })

    },

    getStudentInfoList(schoolId) {
     var vm = this;
      sessionStorage.setItem('hisExerciseManageStudent-grade',vm.grade);
      sessionStorage.setItem('hisExerciseManageStudent-studentClass',vm.studentClass);
      sessionStorage.setItem('hisExerciseManageStudent-registerCode',vm.registerCode);
      sessionStorage.setItem('hisExerciseManageStudent-studentName',vm.studentName);
      sessionStorage.setItem('hisExerciseManageStudent-pageNum',vm.pageNum);
      sessionStorage.setItem('hisExerciseManageStudent-pageSize',vm.pageSize);

      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        // gender:vm.gender,
        yearSemester:vm.yearSemester
      };
      this.$axios
        .post("/v1/datafiles/queryHisExerciseStudentMakeUpList", data)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultData = data;
            console.log(this.resultData)
            vm.resultData1 = JSON.parse(JSON.stringify(data));
            console.log(this.resultData1)
            if(data.length == 0){
              vm.dataSize =true
            }else{
              vm.dataSize =false
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },

    querySearch() {
      this.search();
    },
    search() {
      var vm = this;
      let schoolId = vm.schoolId;
      vm.getStudentInfoList(schoolId);
    },

  },
  watch: {

  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.schoolType = schoolType;

    if ("2" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      //vm.grade = 1
    }
    if ("3" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      //vm.grade = 7
    }
    if ("4" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
    }

    let  grade = sessionStorage.getItem('hisExerciseMakeUpManage-grade');
    let  studentClass = sessionStorage.getItem('hisExerciseMakeUpManage-studentClass');
    let  registerCode = sessionStorage.getItem('hisExerciseMakeUpManage-registerCode');
    let  studentName = sessionStorage.getItem('hisExerciseMakeUpManage-studentName');


    let yearSemester = sessionStorage.getItem('hisExerciseMakeUpManage-yearSemester');
    vm.yearSemester = yearSemester;

    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = Number(grade);
    }else{

      if ("2" == schoolType) {
        vm.grade = 1
      }
      if ("3" == schoolType) {
        vm.grade = 7
      }
    }
    if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
        vm.studentClass = Number(studentClass);
    }else{
        vm.studentClass  = 1
    }
    if(registerCode != null && registerCode != "" && registerCode != undefined ){
        vm.registerCode = registerCode;
    }
    if(studentName != null && studentName != "" && studentName != undefined ){
        vm.studentName = studentName;
    }
    // vm.search()
    vm.search();
  }
};
</script>
