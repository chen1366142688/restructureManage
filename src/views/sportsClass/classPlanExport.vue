
<template>
  <div  style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">导入教学班排课信息</h2>
    </div>
    <div>
      <Card style="height:60px;margin-top:2px">
        <div >
            <span>导入数量：</span><span>{{exportPlanAllNum}}</span>
          <span style="margin-left:30px">成功数量：</span><span>{{exportPlanSuccessNum}}</span>
          <span style="margin-left:30px">错误数量：</span><span style="color:red">{{exportPlanFailNum}}</span>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleClassPlanSuccess"
          :format="['xls','xlsx']"
          :max-size="20480"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :multiple="false"
          name="muFiles"
          type="select"
          :action="updateUrl"
          style="display: inline-block;margin-left:50px;"
        >
        <Button type="success">导入教学班排课信息</Button>
        </Upload>
        <!-- <Button style="margin-left:50px;" type="success"  @click="exportAllClassPlanPre">导出教学班排课信息</Button> -->
        <Button style="margin-left:50px;" type="success"  @click="exportClassPlan">导出模板</Button>
          <Button style="margin-left:50px;" type="success" :disabled="failTf" @click="exportSportsClassPlanErrorData">导出错误数据</Button>

        <Button @click="pageToList" style="float:right; margin-right:50px;width:100px"  type="success" >返回</Button>
        </div>
      </Card>
    </div>
      <Modal v-model="allClassPlanStasus" :mask-closable="false" width="360" @on-ok="exportAllClassPlan"
        @on-cancel="cancelexportAllStudent">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>温馨提示</span>
        </p>
        <div style="text-align:center">
          <span>导出的学期：</span>
          <Select v-model="allSemester" size="small" style="width:120px;">
                <Option v-for="item in semesterYearList" :value="item.yearSemester" :key="item.yearSemester">{{ item.semesterName }}</Option>
              </Select>
        </div>
      </Modal>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      loading2: false,
      isCollege: true,
      allStudentStasus:false,
      allClassPlanStasus:false,
      allSemester:'',
      semesterYear:'',
      semesterYearList:[],
      schoolId: "",
      exportPlanAllNum:0,
      exportPlanSuccessNum:0,
      exportPlanFailNum:0,
      failTf:true,

      exportStatus:false,
      updateUrl:'',

    };
  },
  methods: {
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    handleClassPlanSuccess(res, file) {
      var vm = this;
      // console.log(res)
      vm.exportStatus = false;
      if (res.code == 10000) {
        if (res.response == 1) {
          vm.$Message.info("导入成功");
          vm.modal2 = false;
          vm.getClassPlanExportInfo();
        } else {
          vm.$Message.info("文件为空，导入失败");
        }
      } else {
        vm.$Message.info("导入失败，请稍后再试");
      }
    },
    handleFormatError(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "格式错误",
        desc: "该文件格式错误，请检查后重试"
      });
    },
    handleMaxSize(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "文件超大",
        desc: "该文件超大了"
      });
    },
    handleBeforeUpload(file) {
      // console.log(file)
      // const check = this.uploadList.length < 5;
      // if (!check) {
      //     this.$Notice.warning({
      //         title: 'Up to five pictures can be uploaded.'
      //     });
      // }
      // return check;
      var vm = this;
      vm.exportStatus = true;
      return true;
    },

    getClassPlanExportInfo() {
      var vm=this;
      this.$axios.get("/v1/sports/class/getClassPlanExportInfo").then(res => {
        if (res.data.code == 10000) {
          let data=res.data.response;
          vm.exportPlanAllNum=data.exportNum;
          vm.exportPlanSuccessNum=data.dealSuccessNum;
          vm.exportPlanFailNum=data.dealFailNum ;
          if(data.dealFailNum>0){
            vm.failTf=false
          }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    exportClassPlan(){
      var vm = this;
      let url =this.$axios.defaults.baseURL +
              "/v1/primarysportsclass/exportClassPlan?token=" +
              sessionStorage.getItem("token");
      window.open(url);
    },
    exportSportsClassPlanErrorData() {
      var vm = this;
      let url =this.$axios.defaults.baseURL +
        "/v1/primarysportsclass/exportSportsClassPlanErrorData?token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    exportAllClassPlanPre(){
        var vm=this;
        vm.allClassPlanStasus=true;
    },
    exportAllClassPlan(){
      var vm = this;
      let url =this.$axios.defaults.baseURL +
        "/v1/primarysportsclass/exportAllSportsClassPlan?token=" +
        sessionStorage.getItem("token")+'&semesterYear='+vm.allSemester;
      window.open(url);
    },
    cancelexportAllStudent(){

    },

    getRecentSemester() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getRecentSemester").then(res => {
        if (res.data.code == 10000) {
          vm.semesterYearList.push(res.data.response) ;
          if(res.data.response){
            vm.semesterYear=res.data.response.yearSemester
            vm.semesterName=res.data.response.semesterName
          }
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
  created() {},
  mounted() {
    var vm = this;

    vm.getClassPlanExportInfo();
    vm.getRecentSemester();
    vm.updateUrl =
      this.$axios.defaults.baseURL +
      "/v1/primarysportsclass/file/upload/primarySportsClassPlanExportNew?schoolId=" +
      sessionStorage.getItem("schoolId") +
      "&token=" +
      sessionStorage.getItem("token");
  }
};
</script>
