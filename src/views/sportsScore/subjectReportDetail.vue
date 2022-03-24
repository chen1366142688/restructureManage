<template>
  <div class= "sportsScoreStudent" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生上报信息</h2>
    </div>
    <div>
      <Card style="height: 110px;">
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>年级：</span>
                    <Select v-model="gradeId"  style="width:120px;">
                        <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass"  style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：</span>
                    <Select v-model="gender"  style="width:120px;">
                        <Option
                        v-for="item in genderList"
                        :value="item.itemId"
                        :key="item.itemId"
                        >{{ item.itemName }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓名：</span>
                    <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>
                    <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="querySearch">查询</Button>
            </div>
        </div>
      </Card>
      <br/>
      <Card>
        <div>
          <Row>
            <div style>
              <Table border max-height="530"  :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;margin-top:20px;">
          <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
        loading:false,
        activityId:"",
        gender:0,
      genderList:[
        {
          itemId:0,
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
      gradeId:0,
      primaryList: [
          {
          grade: 0,
          label: '全部'
        },
        {
          grade: 1,
          label: '一年级'
        },
        {
          grade: 2,
          label: '二年级'
        },
        {
          grade: 3,
          label: '三年级'
        },
        {
          grade: 4,
          label: '四年级'
        },
        {
          grade: 5,
          label: '五年级'
        },
        {
          grade: 6,
          label: '六年级'
        }
      ],
      middleList: [
          {
          grade: 0,
          label: '全部'
        },
        {
          grade: 7,
          label: '七年级'
        },
        {
          grade: 8,
          label: '八年级'
        },
        {
          grade: 9,
          label: '九年级'
        }
      ],
      highList: [
        {
          grade: 0,
          label: '全部'
        },
        {
          grade: 10,
          label: '高一'
        },
        {
          grade: 11,
          label: '高二'
        },
        {
          grade: 12,
          label: '高三'
        }
      ],
      schoolGradeList: [],
      studentClass: '0',
      classList: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '1班'
        },
        {
          value: 2,
          label: '2班'
        },
        {
          value: 3,
          label: '3班'
        },
        {
          value: 4,
          label: '4班'
        },
        {
          value: 5,
          label: '5班'
        },
        {
          value: 6,
          label: '6班'
        },
        {
          value: 7,
          label: '7班'
        },
        {
          value: 8,
          label: '8班'
        },
        {
          value: 9,
          label: '9班'
        },
        {
          value: 10,
          label: '10班'
        },
        {
          value: 11,
          label: '11班'
        },
        {
          value: 12,
          label: '12班'
        },
        {
          value: 13,
          label: '13班'
        },
        {
          value: 14,
          label: '14班'
        },
        {
          value: 15,
          label: '15班'
        },
        {
          value: 16,
          label: '16班'
        },
        {
          value: 17,
          label: '17班'
        },
        {
          value: 18,
          label: '18班'
        },
        {
          value: 19,
          label: '19班'
        },
        {
          value: 20,
          label: '20班'
        },
        {
          value: 21,
          label: '21班'
        },
        {
          value: 22,
          label: '22班'
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
      registerCode: '',
      studentName: '',
      resultData:[],
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width:120
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width:150
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          width:60,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == '1'?"男":"女";
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "gradeId",
          align: "center",
          width:110,
          render: (h, params) => {
            const row = params.row;
            const text = row.gradeId == "1" ?'一年级':row.gradeId == "2" ?'二年级':row.gradeId == "3" ?'三年级':row.gradeId == "4" ?'四年级':row.gradeId == "5" ?'五年级':row.gradeId == "6" ?'六年级':row.gradeId == "7" ?'七年级':row.gradeId == "8" ?'八年级':row.gradeId == "9" ?'九年级':row.gradeId == "10" ?'高一':row.gradeId == "11" ?'高二':row.gradeId == "12" ?'高三':'';
            return h("span", text+row.studentClass+"班");
          }
        },
        {
          title: "体质测试",
          key: "finishCount",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/100;
            if(row.testScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.sportsScore/100;
            if(row.sportsScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore/100;
            if(row.staminaScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价总分",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/100;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
      pageToList() {
      //返回
      this.$router.go(-1);
    },
    querySearch() {
        var vm=this;
      this.pageNum = 1;
      this.pageSize = 10;
     sessionStorage.setItem('subjectReportDetail-gradeId',vm.gradeId);
     sessionStorage.setItem('subjectReportDetail-studentClass',vm.studentClass);
    sessionStorage.setItem('subjectReportDetail-registerCode',vm.registerCode);
    sessionStorage.setItem('subjectReportDetail-studentName',vm.studentName);
    sessionStorage.setItem('subjectReportDetail-pageNum',vm.pageNum);
    sessionStorage.setItem('subjectReportDetail-pageSize',vm.pageSize);
    sessionStorage.setItem('subjectReportDetail-gender',vm.gender);
      this.search();
    },
    search() {
      var vm = this;
      vm.getSubjectReportStudentList();
      vm.countSubjectReportStudentList();
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        this.search();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.search();
      }
    },
    getSubjectReportStudentList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/subjectReport/getSubjectReportStudentList?activityId="+
            vm.activityId +
            "&gradeId=" +
            (vm.gradeId==0?"":vm.gradeId)+
            "&studentClass="+
            (vm.studentClass==0?"":vm.studentClass)+
            "&gender="+
            (vm.gender==0?"":vm.gender)+
            "&studentName="+
            vm.studentName+
            "&registerCode="+
            vm.registerCode+
            "&pageNo=" +
            vm.pageNum +
            "&pageSize=" +
            vm.pageSize
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
              vm.resultData = data;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countSubjectReportStudentList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/subjectReport/countSubjectReportStudentList?activityId="+
            vm.activityId +
            "&gradeId=" +
            (vm.gradeId==0?"":vm.gradeId)+
            "&studentClass="+
            (vm.studentClass==0?"":vm.studentClass)+
            "&gender="+
            (vm.gender==0?"":vm.gender)+
            "&studentName="+
            vm.studentName+
            "&registerCode="+
            vm.registerCode
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.total = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
  },
  watch: {
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
  //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    vm.activityId=sessionStorage.getItem('subjectReport-subjectReportDetail-activityId');
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    if (schoolType) {
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList)
      }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
      }
    } else {
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList)
    }
    vm.gradeId=0;
    vm.studentClass=0;
    let  gradeId = sessionStorage.getItem('subjectReportDetail-gradeId');
    let  studentClass = sessionStorage.getItem('subjectReportDetail-studentClass');
    let  registerCode = sessionStorage.getItem('subjectReportDetail-registerCode');
    let  studentName = sessionStorage.getItem('subjectReportDetail-studentName');
    let  pageNum = sessionStorage.getItem('subjectReportDetail-pageNum');
    let  pageSize = sessionStorage.getItem('subjectReportDetail-pageSize');
    let  gender = sessionStorage.getItem('subjectReportDetail-gender');

    if(gradeId != null && gradeId != "" && gradeId != undefined && gradeId > 0){
        vm.gradeId = Number(gradeId);
    }
    if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
        vm.studentClass = Number(studentClass);
    }
    if(registerCode != null && registerCode != "" && registerCode != undefined ){
        vm.registerCode = registerCode;
    }
    if(studentName != null && studentName != "" && studentName != undefined ){
        vm.studentName = studentName;
    }
    if(gender != null && gender != "" && gender != undefined ){
        vm.gender = gender;
    }
    if(pageNum != null && pageNum != "" && pageNum != undefined && pageNum > 0){
        vm.pageNum = Number(pageNum);
    }
    if(pageSize != null && pageSize != "" && pageSize != undefined && pageSize > 0){
        vm.pageSize = Number(pageSize);
    }
    vm.search();
  }
}
</script>
