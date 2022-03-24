<style scoped>
.one {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.gradeItem {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(191, 201, 206, 1);
  margin: 22px 7px;
  border-radius: 5px 5px 0px 0px;
  /* text-align: center; */
}
.top {
  width: 100%;
  height: 41px;
  background: rgba(240, 240, 240, 1);
  border-bottom: 1px solid rgba(191, 201, 206, 1);
  border-radius: 5px 5px 0px 0px;
  line-height: 42px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.sections {
  width: 100%;
  height: 217px;
  overflow-y: auto;
}
.sectionNot {
  width: 100%;
  height: 217px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
}
.title {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  padding-right: 150px;
}
.itemsData {
  width: 100%;
  height: 30px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #515a6e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
}
.bottom {
  width: 100%;
  height: 40px;
  background: rgba(240, 240, 240, 1);
  border-top: 1px solid rgba(191, 201, 206, 1);
  line-height: 41px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.text-green {
  color: #00c693;
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">考核项目配置</h2>
    </div>
    <Card style="margin-top:20px;">
      <div style="position:absolute;right:39%;top:9px;z-index:99;">
        <Button type="success" @click="goConfigure">配置</Button>
        <Button type="success" @click="dataChoose" style="margin-left:10px;">同步体测成绩</Button>
      </div>
      <div>
        <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
          <TabPane
            :name="grade.gradeId"
            :label="grade.val"
            v-for="grade in gradeList"
            :key="grade.gradeId"
          >
            <div class="one">
              <div
                class="gradeItem"
                v-for="item in gradeAllList"
                :value="item.classId"
                :key="item.classId"
              >
                <div class="top">{{item.gradeName}}{{item.studentClass}}班</div>
                <div class="sections" v-if="item.itemsNum>0">
                  <!-- <p class="title">已选择考核项目</p> -->
                  <interview-list
                    title="运动技能"
                    :actionList="item.actionList"
                    titleClass="text-green"
                  ></interview-list>
                  <interview-list title="体能" :actionList="item.staminaList" titleClass="text-green" :isExamTips="false"></interview-list>
                </div>
                <div class="sectionNot" v-else>暂无考核项目</div>
                <div class="bottom">考核项目总数：{{item.actionList.length+item.staminaList.length}}</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Card>
    <Modal v-model="itemCheckStatus" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <!-- <Icon type="ios-information-circle"></Icon> -->
        <span>同步体测成绩</span>
      </p>
      <div style="">
          <div v-for="item,index in schoolTestList" style="margin-top:20px;margin-bottom: 20px">
            <p>{{item.gradeName}}：</p>
             <CheckboxGroup v-model="item.chooseList" style="margin-top:20px;">
                <Checkbox :label="test.schoolTestId" v-for="(test,index) in item.list" :key="index">{{test.schoolTestName}}</Checkbox>
             </CheckboxGroup>
          </div>
        <hr/>
        <div style="margin-bottom: 10px;margin-top: 10px">历史同步记录:</div>
        <div style="margin-top: 10px;height: 200px;overflow-x:hidden;" >
          <Table border :loading="loading" :columns="historyColumns" :data="historyData"></Table>
        </div>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  @click="tixing" >同步</Button>
      </div>
    </Modal>
    <Modal v-model="modal1" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <span>提醒</span>
      </p>
      <div style="">
          <p>同步体测成绩后，学生的原有成绩将被覆盖，是否确定同步？</p>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  :loading="listCheck" @click="smsSend" >同步</Button>
      </div>
    </Modal>
    <!-- <div class="modalIview" v-if="modal2">
      <Modal v-model="modal2" :closable ="false":mask-closable="false" width="420" >
        <p slot="header" style="color:#f60;text-align:center">
          <span>提醒</span>
        </p>
        <div style="">
            <p>正在同步体测数据中，暂时不能执行任何操作。</p>
        </div>
        <div slot="footer">
          <Button type="success"  @click="cancle" >关闭</Button>
        </div>
      </Modal>
    </div> -->
<!--    <modalData :showModal="modal2"></modalData>-->

    <Modal v-model="smsModalStatus" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>短信验证</span>
      </p>
      <div style="">
        <p style="margin-left:40px;margin-top:10px;"><span >管理员账号：</span>
          <Select v-model="phoneNum"  style="width:200px;">
            <Option
                    v-for="item in phoneNumList"
                    :value="item"
                    :key="item"
            >{{ item.substring(0,3)}}****{{item.substring(7,11)}}</Option>
          </Select>
        </p>
      </div>
      <div style="">
          <p style="margin-left:40px;margin-top:10px;"><span >短信验证码：</span>
          <Input v-model="smsCode" size="small" placeholder="请输入短信验证码" style="width: 180px;"/>
          <!-- <Button type="success" size="small"   style="margin-left:10px;" :disabled="sendStatus"  @click="sendSmsCode" >发送</Button> -->
          <Button type="success" size="small"  :disabled="disable" :class="{ codeGeting:isGeting }" @click="getVerifyCode">{{getCode}}</Button>
          </p>
          <span style="margin-left:40px;color:red">{{errorMsg}}</span>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  :loading="changeLoading" @click="getSmsIsOk" :disabled="dataTf">保存</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" :closable ="false":mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <span>提醒</span>
      </p>
      <div style="">
        <p>
          系统预计此次同步操作五分钟，请于五分钟后查看同步结果。</p>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >知道了</Button>
      </div>
    </Modal>
    <Modal v-model="modal3" :closable ="false":mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <span>提醒</span>
      </p>
      <div style="">
        <p>
          正在同步进行中，请稍后查看。</p>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle1" >知道了</Button>
      </div>
    </Modal>
  </div>
</template>


<script>
import InterviewList from "./common/interviewList";
import modalData from './common/modalData';
export default {
  name: "examItemClassList",
  components: {
    InterviewList,
    modalData
  },
  data() {
    return {
      phoneNum: '',
      phoneNumList: '',
      schoolId: '',
      arryGradeList: [],
      historyColumns: [
        {
          title: '时间',
          key: 'createTime',
          align: 'center',
        },{
          title: '年级',
          key: 'gradeName',
          align: 'center',
        },{
          title: '项目',
          key: 'examName',
          align: 'center',
        },{
          title: '老师',
          key: 'teacherName',
          align: 'center',
        },{
          title: '状态',
          key: 'examStatus',
          align: 'center',
        }
      ],
      historyData: [],
      modal1:false,
      modal2:false,
      modal3:false,
      getCode:'获取验证码',
      isGeting:false,
      count:60,
      disable:false,
      smsModalStatus:false,
      dataTf:true,
      changeLoading:false,
      smsCode:'',
      sendStatus:false,
      errorMsg:'',
      itemCheckStatus:false,
      listCheck:false,
      schoolTestList:[],
      selectTabName: "",
      loading: false,
      gradeList: [],
      gradeAllList: [],
      classTestType: 2,
      notExcuteNum:0
    };
  },
  methods: {
    getSystemPhoneNumAll(){
      var vm = this;
      this.$axios
              .get("/v1/school/getSystemPhoneNumAll")
              .then(function(response) {
                if (response.data.code == 10000) {
                 vm.phoneNumList = response.data.response
                  if(vm.phoneNumList.length>0){
                    vm.phoneNum = vm.phoneNumList[0]
                  }
                } else {
                  vm.$Message.info(response.data.msg);
                }
              })
              .catch(function(response) {
              });
    },
    getVerifyCode(){
          var countDown = setInterval(()=>{
            if(this.count < 1){
              this.isGeting = false;
              this.disable = false;
              this.getCode = '获取验证码';
              this.count = 60;
              clearInterval(countDown);
              // console.log(this.count)
            }else{
              this.isGeting = true;
              this.disable = true;
              this.getCode = this.count-- + 's后重发';
              // console.log(this.count)
            }
          },1000);
          this.$once('hook:beforeDestroy', () => {
        clearInterval(countDown);
      })
          // this.sendSmsCode();
      this.sendSmsCodeByphoneNum();
        },
    cancle(){
      var vm=this;
      vm.smsModalStatus=false;
      vm.itemCheckStatus=false;
      vm.modal1=false;
      vm.modal2=false;
      vm.smsCode='';
    },
    cancle1(){
      var vm=this;
      vm.smsModalStatus=false;
      vm.itemCheckStatus=false;
      vm.modal1=false;
      vm.modal2=false;
      vm.modal3=false;
    },
    tixing(){
      var vm=this;
      let have=false;
      if(vm.schoolTestList && vm.schoolTestList.length>0){
        for(var i=0;i<vm.schoolTestList.length;i++){
          if(vm.schoolTestList[i].chooseList && vm.schoolTestList[i].chooseList.length>0){
            have=true;
          }
        }
      }
      if(have){
        vm.itemCheckStatus=false;
        vm.modal1=true;
      }else{
        vm.$Message.error("请选择需要同步的项目");
      }

    },
    dataChoose(){
      var vm=this;
      this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
        if (res.data.code === 10000) {
          let {editStatus} = res.data.response
          if (editStatus === '1') {
            vm.countNotExcute();
          } else {
            this.$Modal.info({
              title: '提醒',
              okText: '知道了',
              closable: false,
              content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
          });
          }
        }
      })
    },
    smsSend(){
      var vm=this;
      vm.modal1=false;
      vm.smsModalStatus=true;
      vm.getSystemPhoneNumAll();
    },
    sendSmsCode(){
      var vm = this;
      vm.sendStatus=true;
      this.$axios
        .get("/v1/common/sendSmsForUpdateSensitiveData?name=semesterUpdate")
        .then(function(response) {
          // console.log(response)
          if (response.data.code == 10000) {
            vm.$Message.info("发送成功，请注意接收");
            vm.dataTf=false;
            vm.errorMsg="发送成功，请注意接收"
          } else {
            vm.$Message.info(response.data.msg);
             vm.dataTf=true;
            vm.errorMsg=response.data.msg
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    sendSmsCodeByphoneNum(){
      var vm = this;
      vm.sendStatus=true;
      this.$axios
              .get("/v1/common/sendSmsForUpdateSensitiveDataByphoneNum?name=semesterUpdate"+'&phoneNum='+vm.phoneNum)
              .then(function(response) {
                // console.log(response)
                if (response.data.code == 10000) {
                  vm.$Message.info("发送成功，请注意接收");
                  vm.dataTf=false;
                  vm.errorMsg="发送成功，请注意接收"
                } else {
                  vm.$Message.info(response.data.msg);
                  vm.dataTf=true;
                  vm.errorMsg=response.data.msg
                }
              })
              .catch(function(response) {
                console.log(response);
              });
    },
    getSchoolExamTestList(){
      var vm = this;
      this.$axios
        .get("/v1/testToExam/getSchoolExamTestList")
        .then(function(response) {
          // console.log(response)
          if (response.data.code == 10000) {
            vm.schoolTestList=response.data.response
            vm.itemCheckStatus=true;
          } else {
            vm.$Message.info(response.data.msg);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getHistoryExamList(){
      var vm = this;
      var gradeArry = [];
      for (let i = 0; i <vm.gradeList.length; i++) {
        gradeArry[i] = vm.gradeList[i].gradeId;
      }
      var schoolId = vm.schoolId;
      this.$axios
              .get("/v1/testToExam/getHistoryExamList?schoolId="+schoolId+'&gradeArry='+gradeArry)
              .then(function(response) {
                vm.historyData = response.data.response;
              })
              .catch(function(response) {
                console.log(response);
              });
    },
    countNotExcute(){
      var vm = this;
      this.$axios
        .get("/v1/testToExam/countNotExcute")
        .then(function(response) {
          if (response.data.code == 10000) {
            vm.notExcuteNum = response.data.response;
              if(response.data.response>0){
                vm.modal3=true;
              }else{
                vm.getSchoolExamTestList();
                vm.getHistoryExamList();
              }
          } else {
            vm.$Message.info(response.data.msg);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSmsIsOk(){
      var vm = this;
      vm.sendStatus=true;
      this.$axios
              .get("/v1/common/getSmsCode?name=semesterUpdate"+'&phoneNum='+vm.phoneNum+'&smsCode='+vm.smsCode)
              .then(function(response) {
                if (response.data.code == 10000) {
                  vm.addTestToExamTask();
                } else {
                  vm.$Message.info(response.data.msg);
                }
              })
              .catch(function(response) {
                console.log(response);
              });
    },
    addTestToExamTask(){
      var vm = this;
      vm.sendStatus=true;
      let data=vm.schoolTestList;
      vm.smsCode='';
      this.$axios
        .post("/v1/testToExam/addTestToExamTask",data)
        .then(function(response) {
          if (response.data.code == 10000) {
            if(response.data.response.code=='1'){
               vm.$Message.info("保存成功");
               vm.smsModalStatus=false;
               vm.modal2=true;
            }else{
              vm.modal2=true;
              vm.smsModalStatus=false;
              //  vm.$Message.info(response.data.response.msg);
            }
            vm.dataTf=true;
            vm.errorMsg=""
          } else {
            vm.$Message.info(response.data.msg);
             vm.dataTf=true;
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    querySchoolReportedStatus(){
      var vm = this;
      this.$axios
              .get("/v1/actionStamina/querySchoolReportedStatus?dataType=2&yearSemester="+vm.yearSemester)
              .then(function(response) {
                if(response.data.code==10000){
                    if(response.data.response.editStatus==1){
                        vm.disabled=false;
                    }
                }
              })
              .catch(function(response) {
                console.log(response);
              });
    },
    selectTabs(name) {
      this.selectTabName = name;
      sessionStorage.setItem("examItemClassList-selectTabName",this.selectTabName);
      this.getexamItemList();
    },
    goConfigure() {
      var vm=this;
      vm.countNotExcute();
      if(vm.notExcuteNum<1){
        sessionStorage.setItem("examItemClassList-selectTabName",this.selectTabName);
        this.$router.push({ name: "examItemconfigure" });
      }
    },
    getexamItemList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          `/v1/examtest/getExamClassList2?gradeId=${vm.selectTabName}&classTestType=${vm.classTestType}`
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            // console.log(data);
            if (data) {
              for (let i = 0; i < data.length; i++) {
                let examInfo = data[i];
                examInfo.actionList = [];
                examInfo.staminaList = [];
                let list = examInfo.list;
                let nameList = [];
                if (list) {
                  for (let j = 0; j < list.length; j++) {
                    let classTestName = list[j].classTestName;
                    if (nameList.indexOf(classTestName) == -1) {
                      nameList.push(classTestName);
                      let param = {
                        classTestName: classTestName,
                        examType: list[j].examType,
                        enableStatus:list[j].enableStatus,
                        examItem: []
                      };
                      if (list[j].classTestType == "2") {
                        examInfo.actionList.push(param);
                      } else {
                        examInfo.staminaList.push(param);
                      }
                    }
                  }
                }
              }

              for (let i = 0; i < data.length; i++) {
                let examInfo = data[i];
                let list = examInfo.list;
                let actionList = examInfo.actionList;
                let staminaList = examInfo.staminaList;
                if (list) {
                  for (let j = 0; j < list.length; j++) {
                    const tempExamItem = list[j];
                    let classTestName = tempExamItem.classTestName;
                    const examItem = `${
                      tempExamItem.examItemName? tempExamItem.examItemName:""
                    }
                    (${tempExamItem.examItemPercent?tempExamItem.examItemPercent/100+"%":""})`;
                    if (tempExamItem.classTestType == "2") {
                      for (let k = 0; k < actionList.length; k++) {
                        if (classTestName == actionList[k].classTestName) {
                          examInfo.actionList[k].examItem.push(examItem);
                        }
                        // break;
                      }
                    } else {
                      for (let k = 0; k < staminaList.length; k++) {
                        if (classTestName == staminaList[k].classTestName) {
                          examInfo.staminaList[k].examItem.push(examItem);
                        }
                        // break;
                      }
                    }
                  }
                }
              }

              console.log(data);
              vm.gradeAllList = data;
            } else {
              vm.gradeAllList = [];
            }
            // vm.gradeAllList = res.data.response
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    }
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    var vm = this;
    // vm.countNotExcute();
    let type = sessionStorage.getItem("schoolType");
    /**1 幼儿园 2小学 3初中 4高中 5大学 6教育局'**/
    if (type == 2) {
      vm.gradeList = [
        { val: "一年级", gradeId: "1" },
        { val: "二年级", gradeId: "2" },
        { val: "三年级", gradeId: "3" },
        { val: "四年级", gradeId: "4" },
        { val: "五年级", gradeId: "5" },
        { val: "六年级", gradeId: "6" }
      ];
    } else if (type == 3) {
      vm.gradeList = [
        { val: "七年级", gradeId: "7" },
        { val: "八年级", gradeId: "8" },
        { val: "九年级", gradeId: "9" }
      ];
    } else if (type == 4) {
      vm.gradeList = [
        { val: "高一", gradeId: "10" },
        { val: "高二", gradeId: "11" },
        { val: "高三", gradeId: "12" }
      ];
    } else {
      console.log("学校类型有误");
    }
    let selectTabNameInfo = sessionStorage.getItem("examItemClassList-selectTabName");
    if(selectTabNameInfo == null || selectTabNameInfo  == "" || selectTabNameInfo == undefined){
        vm.selectTabName = vm.gradeList[0].gradeId;
    }else{
        vm.selectTabName = selectTabNameInfo;
    }
    sessionStorage.setItem("examItemClassList-selectTabName", vm.selectTabName);
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.getexamItemList();
  }
};
</script>
