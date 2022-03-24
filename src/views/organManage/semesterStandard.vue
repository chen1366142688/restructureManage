<style scoped>
.codeGeting{
    background: #cdcdcd;
    border-color: #cdcdcd;
}
</style>
<template>
  <div class="semesterStandard" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学期标准配置</h2>
    </div>
    <div>
      <Form ref="unirunInfo" :model="unirunInfo" :label-width="97" label-position="left" v-if="schoolConfigType !== ''">
        <Card style="margin-bottom:20px;" v-if="schoolConfigType=='1'">
            <div style="display:flex;">
                <div style="text-align:left">学期标准配置：</div>
                <div style="margin-left:16px;">
                    <p>学年上学期：&nbsp;&nbsp;{{secondSemesterDateStart_month}}月{{secondSemesterDateStart_day}}日&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;{{secondSemesterDateEnd_month}}月{{secondSemesterDateEnd_day}}日{{showyear}}</p>
                    <br/>
                    <p>学年下学期：&nbsp;&nbsp;{{firstSemesterDateStart_month}}月{{firstSemesterDateStart_day}}日&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;{{firstSemesterDateEnd_month}}月{{firstSemesterDateEnd_day}}日</p>
                </div>
            </div>
          </Card>
          <Card style="margin-bottom:20px;"  v-if="schoolConfigType=='1'">
            <div style="display:flex;">
                <div>上课开始时间：</div>
                <div style="margin-left:16px;">
                    <p>学年上学期：&nbsp;&nbsp;{{sportsClassSecondStart_month}}月{{sportsClassSecondStart_day}}日</p>
                    <br/>
                    <p>学年下学期：&nbsp;&nbsp;{{sportsClassFirstStart_month}}月{{sportsClassFirstStart_day}}日</p>
                </div>
            </div>
        </Card>
        <Card style="margin-bottom:20px;" :dis-hover="true" v-if="schoolConfigType!='1'">
          <FormItem label="学期标准配置:" style="margin-bottom:0px;">
            <Row style="margin-top:1px;">
              <Col span="20">
                <Label>学年上学期：</Label>
                <Select
                  v-model="secondSemesterDateStart_month"
                  @on-change="semesterDateEndChange"
                  placeholder="月"
                  style="width:60px"
                >
                  <Option
                    v-for="item in months"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>月
                <Select v-model="secondSemesterDateStart_day"
                        @on-change="semesterDateEndChange"
                        placeholder="日" style="width:60px">
                  <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>日
                <font style="color:red;">{{showyearS}}</font>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至
                <Select
                  v-model="secondSemesterDateEnd_month"
                  @on-change="semesterDateEndChange"
                  placeholder="月"
                  style="width:60px;margin-left:20px;"
                >
                  <Option
                    v-for="item in months"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>月
                <Select v-model="secondSemesterDateEnd_day"
                        @on-change="semesterDateEndChange"
                        placeholder="日" style="width:60px">
                  <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>日
                <font style="color:red;">{{showyear}}</font>
                <font style="color:red;">{{semesterWarn}}</font>
              </Col>
            </Row>
            <Row style="margin-top:20px;">
              <Col span="20">
                <Label>学年下学期：</Label>
                <Select v-model="firstSemesterDateStart_month"
                        @on-change="semesterDateEndChange"
                        placeholder="月" style="width:60px">
                  <Option
                    v-for="item in months"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>月
                <Select v-model="firstSemesterDateStart_day"
                        @on-change="semesterDateEndChange"
                        placeholder="日" style="width:60px">
                  <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>日
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至
                <Select
                  v-model="firstSemesterDateEnd_month"
                  @on-change="semesterDateEndChange"
                  placeholder="月"
                  style="width:60px;margin-left:20px;"
                >
                  <Option
                    v-for="item in months"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>月
                <Select v-model="firstSemesterDateEnd_day"
                        @on-change="semesterDateEndChange"
                        placeholder="日" style="width:60px">
                  <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>日
              </Col>
            </Row>
          </FormItem>
        </Card>

        <Card style="margin-bottom:20px;font-size:13px" :dis-hover="true" v-if="schoolConfigType!='1'">
          <!-- <FormItem label="学期开始日期：" style="margin-bottom:0px;"> -->

          <Row style="margin-top:1px;">
              <Col span="20">
                <span>上课开始日期:</span><Label style="margin-left:20px">学年上学期：</Label>
                <Select v-model="sportsClassSecondStart_month" placeholder="月" @on-change="semesterDateEndChange" style="width:60px">
                  <Option
                    v-for="item in months"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>月
                <Select v-model="sportsClassSecondStart_day" placeholder="日" @on-change="semesterDateEndChange" style="width:60px">
                  <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>日
                <font style="color:red;">{{showyearS}}</font>
                <font style="color:red;">{{classWarnS}}</font>
              </Col>
          </Row>
          <Row style="margin-top:20px;">
              <Col span="20">
                <span>上课开始日期:</span><Label style="margin-left:20px">学年下学期：</Label>
                <Select v-model="sportsClassFirstStart_month" placeholder="月" @on-change="semesterDateEndChange" style="width:60px">
                  <Option
                    v-for="item in months"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>月
                <Select v-model="sportsClassFirstStart_day" placeholder="日" @on-change="semesterDateEndChange" style="width:60px">
                  <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>日
                <font style="color:red;">{{classWarn}}</font>
              </Col>
            </Row>
          <!-- </FormItem> -->
        </Card>

        <Card style="margin-bottom:20px;" v-if="false" :dis-hover="true">
          <FormItem label="手环教学模式配置：" style="margin-bottom:0px;">
            <Row style="margin-top:1px;">
              <Col span="20">
                <RadioGroup v-model="wristbandTypeShow" @on-change="wristbandTypeChange">
                  <Radio label="不开展手环教学模式"></Radio>
                  <Radio label="仅用于校内教学监测"></Radio>
                  <Radio label="用于校外家长和校内教学监测"></Radio>
                </RadioGroup>
              </Col>
            </Row>
          </FormItem>
        </Card>

       <Card style="margin-bottom:20px;" :dis-hover="true" v-if="schoolType!='1'">
          <FormItem label="学期总课时数:" style="margin-bottom:0px;">
            <div v-if="schoolType=='2'">
              <p>
                <span>一年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.oneCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>二年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.twoCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>三年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.threeCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>四年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.fourCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>五年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.fiveCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>六年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.sixCount" :maxlength="20" />
              </p>
            </div>
            <div v-if="schoolType=='3'">
              <p>
                <span>七年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.sevenCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>八年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.eightCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>九年级</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.nineCount" :maxlength="20" />
              </p>
            </div>
            <div v-if="schoolType=='4'">
              <p>
                <span>高一</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.tenCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>高二</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.elevenCount" :maxlength="20" />
              </p>
              <p style="margin-top:20px;">
                <span>高三</span>
                <Input style="width:150px;margin-left:20px;" v-model="semesterClass.twelveCount" :maxlength="20" />
              </p>
            </div>
          </FormItem>
        </Card>
        <Row>
          <div style="margin-top:10px;text-align:center">
            <!-- <Button style="float:left;width:100px" @click="smsSend" type="success">保存</Button> -->
            <Button @click="saveSchoolStandard" type="success">保存</Button>
          </div>
        </Row>
      </Form>
    </div>
    <Modal v-model="smsModalStatus" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>短信验证</span>
      </p>
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
        <Button type="success"  :loading="changeLoading" @click="saveSchoolStandard" :disabled="dataTf">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "organInfo",
  data() {
    return {
      schoolConfigType:'',
      getCode:'获取验证码',
          isGeting:false,
          count:300,
          disable:false,
      smsModalStatus:false,
      dataTf:true,
      changeLoading:false,
      smsCode:'',
      sendStatus:false,
      errorMsg:'',
      unirunInfo: {
        schoolId: "",

        firstSemesterDateStart: "",
        firstSemesterDateEnd: "",
        secondSemesterDateStart: "",
        secondSemesterDateEnd: "",
        wristbandType: ""
      },
      schoolType:'',
      wristbandTypeShow: "",
      months: [
        { name: "1", value: "01" },
        { name: "2", value: "02" },
        { name: "3", value: "03" },
        { name: "4", value: "04" },
        { name: "5", value: "05" },
        { name: "6", value: "06" },
        { name: "7", value: "07" },
        { name: "8", value: "08" },
        { name: "9", value: "09" },
        { name: "10", value: "10" },
        { name: "11", value: "11" },
        { name: "12", value: "12" }
      ],
      days: [
        { name: "1", value: "01" },
        { name: "2", value: "02" },
        { name: "3", value: "03" },
        { name: "4", value: "04" },
        { name: "5", value: "05" },
        { name: "6", value: "06" },
        { name: "7", value: "07" },
        { name: "8", value: "08" },
        { name: "9", value: "09" },
        { name: "10", value: "10" },
        { name: "11", value: "11" },
        { name: "12", value: "12" },
        { name: "13", value: "13" },
        { name: "14", value: "14" },
        { name: "15", value: "15" },
        { name: "16", value: "16" },
        { name: "17", value: "17" },
        { name: "18", value: "18" },
        { name: "19", value: "19" },
        { name: "20", value: "20" },
        { name: "21", value: "21" },
        { name: "22", value: "22" },
        { name: "23", value: "23" },
        { name: "24", value: "24" },
        { name: "25", value: "25" },
        { name: "26", value: "26" },
        { name: "27", value: "27" },
        { name: "28", value: "28" },
        { name: "29", value: "29" },
        { name: "30", value: "30" },
        { name: "31", value: "31" }
      ],
      firstSemesterDateStart_month: "",
      firstSemesterDateStart_day: "",
      firstSemesterDateEnd_month: "",
      firstSemesterDateEnd_day: "",
      secondSemesterDateStart_month: "",
      secondSemesterDateStart_day: "",
      secondSemesterDateEnd_month: "",
      secondSemesterDateEnd_day: "",
      showyear: "",
      showyearS: "",
      classWarn: '',
      classWarnS: '',
      semesterWarn: '',

      sportsClassFirstStart_month: "",
      sportsClassFirstStart_day: "",
      sportsClassSecondStart_month: "",
      sportsClassSecondStart_day: "",
      semesterClass: {}
    };
  },
  methods: {
    querySchoolConfigType(){
      this.$axios
              .get("/v1/school/querySchoolConfigType?schoolId="+sessionStorage.getItem("schoolId")).then(res => {
        if (res.data.code == 10000) {
          this.schoolConfigType = res.data.response;
        }
      });
    },
    getVerifyCode(){
          var countDown = setInterval(()=>{
            if(this.count < 1){
              this.isGeting = false;
              this.disable = false;
              this.getCode = '获取验证码';
              this.count = 300;
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
          this.sendSmsCode();
        },
    cancle(){
      var vm=this;
      vm.smsModalStatus=false;
    },
    smsSend(){
      var vm=this;
      vm.smsModalStatus=true;
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
    semesterDateEndChange() {
      let fsm = this.firstSemesterDateStart_month;
      let fem = this.firstSemesterDateEnd_month;
      let ssm = this.secondSemesterDateStart_month;
      let sem = this.secondSemesterDateEnd_month;
      let fsd = this.firstSemesterDateStart_day;
      let fed = this.firstSemesterDateEnd_day;
      let ssd = this.secondSemesterDateStart_day;
      let sed = this.secondSemesterDateEnd_day;
      let sfsm = this.sportsClassFirstStart_month;
      let sfsd = this.sportsClassFirstStart_day;
      let sssm = this.sportsClassSecondStart_month;
      let sssd = this.sportsClassSecondStart_day;
      if (
        this.secondSemesterDateEnd_month < this.secondSemesterDateStart_month ||
        this.secondSemesterDateEnd_month < this.firstSemesterDateEnd_month
      ) {
        this.showyear = "(次年)";
      } else {
        this.showyear = "";
      }
      if (
        this.secondSemesterDateStart_month < this.firstSemesterDateEnd_month
      ) {
        this.showyearS = "(次年)";
      } else {
        this.showyearS = "";
      }

        if (
            sssm >= sem && sssm <= ssm || sssm <= ssm && sem > ssm || sssm >= sem && sem > ssm
        ) {
            if (sssm == sem && sssd <= sed || sssm == ssm && sssd >= ssd) {
                this.classWarnS = '';
            } else {
                this.classWarnS = '超出学期时间范围';
            }
        } else {
            this.classWarnS = '';
        }
        if (
            sfsm >= fem && sfsm <= fsm || sfsm <= fsm && fem > fsm || sfsm >= fem && fem > fsm
        ) {
            if (sfsm == fem && sfsd <= fed || sfsm == fsm && sfsd >= fsd) {
                this.classWarn = '';
            } else {
                this.classWarn = '超出学期时间范围';
            }
        } else {
            this.classWarn = '';
        }
        if (ssm == sem || fsm == fem) {
            this.semesterWarn = '学期开始月份与结束月份不能相同';
        } else {
            this.semesterWarn = '';
        }

      if (ssm < sem) {
        if (ssm >= fem && fsm <= fem || ssm >= fem && sem <= fsm) {
          // this.semesterWarn = '不重合';
          if (fsm == sem && fsd < sed || fem == ssm && fed > ssd) {
            this.semesterWarn = '上下学期时间段不可重合';
          }
        } else {
          this.semesterWarn = '上下学期时间段不可重合';
        }
      }
      if (ssm > sem) {
        if (ssm >= fem && sem <= fsm) {
          // this.semesterWarn = '不重合';
          if (ssm == fem && fed > ssd || fsm == sem && sed > fsd) {
            this.semesterWarn = '上下学期时间段不可重合';
          }
        } else {
          this.semesterWarn = '上下学期时间段不可重合';
        }
      }
    },
    wristbandTypeChange(val) {},
    querySchoolStandard() {
      this.$axios
        .get(
          "/v1/school/query/school/semester?schoolId=" +
            sessionStorage.getItem("schoolId")
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.unirunInfo = res.data.response;
            if (this.unirunInfo.firstSemesterDateStart != null) {
              if (
                this.unirunInfo.firstSemesterDateStart.split("-").length > 1
              ) {
                this.firstSemesterDateStart_month = this.unirunInfo.firstSemesterDateStart.split(
                  "-"
                )[0];
                this.firstSemesterDateStart_day = this.unirunInfo.firstSemesterDateStart.split(
                  "-"
                )[1];
              }
              if (this.unirunInfo.firstSemesterDateEnd.split("-").length > 1) {
                this.firstSemesterDateEnd_month = this.unirunInfo.firstSemesterDateEnd.split(
                  "-"
                )[0];
                this.firstSemesterDateEnd_day = this.unirunInfo.firstSemesterDateEnd.split(
                  "-"
                )[1];
              }
              if (
                this.unirunInfo.secondSemesterDateStart.split("-").length > 1
              ) {
                this.secondSemesterDateStart_month = this.unirunInfo.secondSemesterDateStart.split(
                  "-"
                )[0];
                this.secondSemesterDateStart_day = this.unirunInfo.secondSemesterDateStart.split(
                  "-"
                )[1];
              }
              if (this.unirunInfo.secondSemesterDateEnd.split("-").length > 1) {
                this.secondSemesterDateEnd_month = this.unirunInfo.secondSemesterDateEnd.split(
                  "-"
                )[0];
                this.secondSemesterDateEnd_day = this.unirunInfo.secondSemesterDateEnd.split(
                  "-"
                )[1];
              }
              if (
                this.unirunInfo.sportsClassSecondStart.split("-").length > 1
              ) {
                this.sportsClassSecondStart_month = this.unirunInfo.sportsClassSecondStart.split(
                  "-"
                )[0];
                this.sportsClassSecondStart_day = this.unirunInfo.sportsClassSecondStart.split(
                  "-"
                )[1];
              }
              if (this.unirunInfo.sportsClassFirstStart.split("-").length > 1) {
                this.sportsClassFirstStart_month = this.unirunInfo.sportsClassFirstStart.split(
                  "-"
                )[0];
                this.sportsClassFirstStart_day = this.unirunInfo.sportsClassFirstStart.split(
                  "-"
                )[1];
              }

              if (this.unirunInfo.wristbandType == "1") {
                this.wristbandTypeShow = "仅用于校内教学监测";
              } else if (this.unirunInfo.wristbandType == "2") {
                this.wristbandTypeShow = "用于校外家长和校内教学监测";
              } else {
                this.wristbandTypeShow = "不开展手环教学模式";
              }
            }
            this.semesterDateEndChange();
            this.querySchoolConfigType();
          }
        });
    },
    saveSchoolStandard() {
      if (
        this.firstSemesterDateStart_month == "" ||
        this.firstSemesterDateStart_day == "" ||
        this.firstSemesterDateEnd_month == "" ||
        this.firstSemesterDateEnd_day == "" ||
        this.secondSemesterDateStart_month == "" ||
        this.secondSemesterDateStart_day == "" ||
        this.secondSemesterDateEnd_month == "" ||
        this.secondSemesterDateEnd_day == "" ||
        this.sportsClassFirstStart_month == "" ||
        this.sportsClassFirstStart_day == "" ||
        this.sportsClassSecondStart_month == "" ||
        this.sportsClassSecondStart_day == ""
      ) {
        this.$Message.error("请选择学期起止日期。");
        return false;
      }

      if (this.wristbandTypeShow == "仅用于校内教学监测") {
        this.unirunInfo.wristbandType = "1";
      } else if (this.wristbandTypeShow == "用于校外家长和校内教学监测") {
        this.unirunInfo.wristbandType = "2";
      } else {
        this.unirunInfo.wristbandType = "0";
      }

      this.unirunInfo.firstSemesterDateStart =
        this.firstSemesterDateStart_month +
        "-" +
        this.firstSemesterDateStart_day;
      this.unirunInfo.firstSemesterDateEnd =
        this.firstSemesterDateEnd_month + "-" + this.firstSemesterDateEnd_day;
      this.unirunInfo.secondSemesterDateStart =
        this.secondSemesterDateStart_month +
        "-" +
        this.secondSemesterDateStart_day;
      this.unirunInfo.secondSemesterDateEnd =
        this.secondSemesterDateEnd_month + "-" + this.secondSemesterDateEnd_day;

      this.unirunInfo.sportsClassFirstStart =
        this.sportsClassFirstStart_month + "-" + this.sportsClassFirstStart_day;
      this.unirunInfo.sportsClassSecondStart =
        this.sportsClassSecondStart_month +
        "-" +
        this.sportsClassSecondStart_day;
        this.unirunInfo.classVO=this.semesterClass;
        this.unirunInfo.smsCode=this.smsCode;
        // this.unirunInfo.saveType = "1";
        this.unirunInfo.saveType = "2";

      this.$axios
        .post("/v1/school/save/school/semester", this.unirunInfo)
        .then(res => {
          this.errorMsg=""
          if (res.data.code == 10000) {
            this.$Message.success("保存成功！");
            // this.smsModalStatus=false;
            this.querySchoolStandard();
            this.getSchoolSemesterClass()
          } else {
            this.$Message.success(res.data.msg);
            // this.errorMsg=res.data.msg
            this.querySchoolStandard();
            this.getSchoolSemesterClass()
          }
        });
    },
     getSchoolSemesterClass() {
      this.$axios
        .get("/v1/school/getSchoolSemesterClass").then(res => {
          if (res.data.code == 10000) {
            this.semesterClass = res.data.response? res.data.response:{};

          }
        });
    },
  },
  mounted() {
    var vm=this;
    vm.schoolType=sessionStorage.getItem("schoolType");
    vm.querySchoolStandard();
    vm.getSchoolSemesterClass();
  }
};
</script>
