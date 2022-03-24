<style>
    .schoolDataManageAdmin .ivu-form .ivu-form-item-label  {
        text-align: left;
        font-size: 15px;
    }
    .schoolDataManageAdmin .ivu-radio-wrapper{
        font-size: 15px;
    }
    .schoolDataManageAdmin .ivu-form-item-content{
        font-size: 15px;
    }
</style>
<template>
  <div class="schoolDataManageAdmin" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">数据清除管理</h2>
    </div>
        <Card style="margin-bottom:20px;">
        <Form ref="unirunInfo" :model="pageTitle" :label-width="100">
            <FormItem label="数据清除 ：" style="margin-bottom:0px;">
                <Row style="margin-top:1px;">
                    <Col span="20">
                        <RadioGroup v-model="cleranType" >
                            <Radio label="1">全部</Radio>
                            <Radio label="2">课堂监控</Radio>
                            <Radio label="3">体测数据</Radio>
                            <Radio label="4">技能/体能</Radio>
                            <Radio label="5">课后作业</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </FormItem>
          </Form>
        </Card>
        <div style="margin-top:10px;text-align:center">
            <Button style="width:100px" @click="smsSend" type="success">保存</Button>
        </div>
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
                <Button type="success"  :loading="changeLoading" @click="saveOrUpdateSchool" :disabled="dataTf">保存</Button>
            </div>
        </Modal>
  </div>
</template>

<script>
export default {
  name: "schoolDetail",
  data() {
    return {
        phoneNum: '',
        phoneNumList: '',
      pageTitle: {},
      getCode:'获取验证码',
      smsModalStatus:false,
      changeLoading:false,
      isGeting:false,
      count:60,
      disable:false,
      dataTf:true,
      errorMsg:"",
      sendStatus:false,
      smsCode:'',
      schoolId: "",
      test:"0",
      exam:"0",
      learn:"0",
      cleranType:"",
      familyHomework:"0",
      schoolData: {
        schoolId: "",
        experimentType: "",
        schoolType: "5",
        name: "",
        schoolCode: "",
        postalCode: "",
        principal: "",
        vicePrincipal: "",
        dataDepartment: "",
        dataCharge: "",
        phone: "",
        mail: ""
      },
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
      sendSmsCodeByphoneNum(){
          var vm = this;
          vm.sendStatus=true;
          this.$axios
              .get("/v1/common/sendSmsForUpdateSensitiveDataByphoneNum?name=clreanData"+'&phoneNum='+vm.phoneNum)
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
    },
    smsSend(){
        if(this.cleranType==""){
            this.$Message.info("请选择需要清除的数据类型！");
            return;
        }
        var vm=this;
        vm.smsModalStatus=true;
        vm.getSystemPhoneNumAll();
    },
    sendSmsCode(){
      var vm = this;
      vm.sendStatus=true;
      this.$axios
        .get("/v1/common/sendSmsForUpdateSensitiveData?name=clreanData")
        .then(function(response) {
          // console.log(response)
          if (response.data.code == 10000) {
             vm.$Message.info("发送成功，请注意接收");
             vm.errorMsg="发送成功，请注意接收"
             vm.dataTf=false;
          } else {
            vm.$Message.info(response.data.msg);
            vm.dataTf=true;
              vm.errorMsg=response.data.msg
          }
        })
        .catch(function(response) {
        });
    },
    saveOrUpdateSchool(){
        if(this.smsCode == ""){
            this.$Message.info("请输入验证码！");
            return false;
        }
        this.smsModalStatus=false;
        if(this.cleranType=='1'){
            this.test = "1";
            this.exam = "1";
            this.learn = "1";
            this.familyHomework = "1";
        }else if(this.cleranType=='2'){
            this.test = "0";
            this.exam = "0";
            this.learn = "1";
            this.familyHomework = "0";
        }else if(this.cleranType=='3'){
            this.test = "1";
            this.exam = "0";
            this.learn = "0";
            this.familyHomework = "0";
        }else if(this.cleranType=='4'){
            this.test = "0";
            this.exam = "1";
            this.learn = "0";
            this.familyHomework = "0";
        }else if(this.cleranType=='5'){
            this.test = "0";
            this.exam = "0";
            this.learn = "0";
            this.familyHomework = "1";
        }
        let vm = this;
        vm.$Modal.confirm({
          title: '提示',
          content: '数据清除后，将无法恢复，是否确定清除？？',
          onOk: function() {
            this.$axios
              .get("/v1/semesterScore/cleanSchoolData?schoolId=" + vm.schoolId+"&phoneNum="+vm.phoneNum+"&test="+vm.test+"&exam="+vm.exam+"&learn="+vm.learn+"&familyHomework="+vm.familyHomework+"&smsCode="+vm.smsCode)
              .then(res => {
                if (res.data.code == 10000) {
                    this.$Message.info("操作成功！");
                } else {
                  this.$Message.info(res.data.msg);
                }
              });
          }
        })
    },
    getSchoolData() {
      this.$axios
        .get("/v1/school/getSchoolDetail?schoolId=" + this.schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.schoolData = data;
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },
  },
  mounted() {
    this.schoolId = sessionStorage.getItem('schoolId');
    this.getSchoolData();
  },
};
</script>
