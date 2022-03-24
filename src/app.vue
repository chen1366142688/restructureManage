<style scoped>
.app-main{
    width: 100%;
    height: 100%;
}

</style>
<template>
    <div id="main" class="app-main">
        <router-view></router-view>
        <Modal
        v-model="modal"
        :closable="false"
        title="提醒"
        :mask-closable="closable"
        @on-ok="modalOk"
        ok-text="去配置"
        cancel-text="稍后提醒我"
        @on-cancel="cancel">
        <p>新学期即将开始，请先设置学校基本配置。</p>
        <div slot="footer">
          <Button v-if="limitStatus != '1'" @click="basicsOk(0)">稍后提醒我</Button>
          <Button type="success" @click="modalOk">去配置</Button>
      </div>
    </Modal>
        <Modal
        v-model="modal1"
        title="学校基础配置"
        :closable="false"
        :mask-closable="closable"
        width='800'
        @on-ok="basicsOk(1)"
        ok-text="提交"
        cancel-text="取消"
        @on-cancel="cancel">
        <Form ref="unirunInfo" :model="unirunInfo">
            <FormItem label="">
              <Row style="margin-bottom:30px;">
                  <Label>学年下学期标准配置 ：</Label>
                  <Select
                    v-model="unirunInfo.firstSemesterDateStart_month"
                    placeholder="月"
                    style="width:60px"
                  >
                    <Option
                      v-for="item in months"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.name }}</Option>
                  </Select>&nbsp;&nbsp;月&nbsp;&nbsp;
                  <Select v-model="unirunInfo.firstSemesterDateStart_day" placeholder="日" style="width:60px">
                    <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>&nbsp;&nbsp;日
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Select
                    v-model="unirunInfo.firstSemesterDateEnd_month"
                    placeholder="月"
                    style="width:60px;"
                  >
                    <Option
                      v-for="item in months"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.name }}</Option>
                  </Select>&nbsp;&nbsp;月&nbsp;&nbsp;
                  <Select v-model="unirunInfo.firstSemesterDateEnd_day" placeholder="日" style="width:60px">
                    <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>&nbsp;&nbsp;日
              </Row>
              <Row style="margin-top:5px;">
                  <Label>学年下学期开始日期 ：</Label>
                  <Select v-model="unirunInfo.secondSemesterDateStart_month" placeholder="月" style="width:60px">
                    <Option
                      v-for="item in months"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.name }}</Option>
                  </Select>&nbsp;&nbsp;月&nbsp;&nbsp;
                  <Select v-model="unirunInfo.secondSemesterDateStart_day" placeholder="日" style="width:60px">
                    <Option v-for="item in days" :value="item.value" :key="item.value">{{ item.name }}</Option>
                  </Select>&nbsp;&nbsp;日
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="5">
                  <Label>学年下学期总课时数 ：</Label>
                </Col>
                <Col span="19">
                  <div v-if="schoolType=='2'">
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>一年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.oneCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>二年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.twoCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>三年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.threeCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>四年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.fourCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>五年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.fiveCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>六年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.sixCount" :maxlength="20" />
                    </div>
                  </div>
                  <div v-if="schoolType=='3'">
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>七年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.sevenCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>八年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.eightCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>九年级 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.nineCount" :maxlength="20" />
                    </div>
                  </div>
                  <div  v-if="schoolType=='4'">
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>高一 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.tenCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>高二 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.elevenCount" :maxlength="20" />
                    </div>
                    <div style="display:inline-block;margin-right:20px;margin-bottom:20px">
                      <span>高三 ：</span>
                      <Input style="width:100px;" v-model="semesterClass.twelveCount" :maxlength="20" />
                    </div>
                  </div>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <RadioGroup v-model="timetable.old" style="width:100%">
                <Row>
                  <Col span="5">
                    <Label><span style="visibility:hidden">学年下学期总课</span>课表 ：</Label>
                  </Col>
                  <Col span="8">
                    <Radio label="old">
                        <span>延用上学期课表</span>
                    </Radio>
                  </Col>
                  <Col span="8">
                    <Radio label="new">
                        <span>新课表</span>
                    </Radio>
                  </Col>
                </Row>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <RadioGroup v-model="timetable.count" style="width:100%">
              <Row>
                <Col span="5">
                  <Label><span style="visibility:hidden">学年下</span>课后作业配置 ：</Label>
                </Col>
                <Col span="8">
                  <Radio label="old">
                        <span>延用上学期课后作业次数配置</span>
                    </Radio>
                </Col>
                <Col span="8">
                  <Radio label="new">
                        <span>重新设置课后作业次数</span>
                    </Radio>
                </Col>
              </Row>
              </RadioGroup>
              <RadioGroup v-model="timetable.contentCopy" style="width:100%">
              <Row>
                <Col span="8" offset="5">
                  <Radio label="old">
                        <span>延用上学期课后作业内容配置</span>
                    </Radio>
                </Col>
                <Col span="8">
                  <Radio label="new">
                        <span>重新设置课后作业内容</span>
                    </Radio>
                </Col>
              </Row>
              </RadioGroup>
            </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" @click="basicsOk(1)">保存</Button>
      </div>
    </Modal>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
          return {
            schoolType:"",
            modal: false,
            modal1:false,
            closable:false,
            unirunInfo: {
              firstSemesterDateStart_month: "",
              firstSemesterDateStart_day: "",
              firstSemesterDateEnd_month: "",
              firstSemesterDateEnd_day: "",
              secondSemesterDateStart_month: "",
              secondSemesterDateStart_day: "",
            },
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
            semesterClass:{
              oneCount:'',
              twoCount:'',
              threeCount:'',
              fourCount:'',
              fiveCount:'',
              sixCount:'',
              sevenCount:'',
              eightCount:'',
              nineCount:'',
              tenCount:'',
              elevenCount:'',
              twelveCount:''
            },
            timetable:{
              old:'old',
              count:'old',
              contentCopy:'old',
            },
            isNextClick:false,
            limitStatus:'',
          }
        },
        mounted () {
        },
        beforeDestroy () {},
        methods: {
          cancel(){},
          modalOk(){
            this.modal = false;
            this.modal1 = true;
          },
          getSchoolWasNotice(){
            let vm = this;
            vm.schoolType=sessionStorage.getItem("schoolType");
              this.$axios.get("/v1/schoolsemesternotice/getSchoolWasNotice").then(res => {
                if (res.data.code == 10000) {
                  vm.configurationStatus =  res.data.response.configurationStatus
                  vm.limitStatus = res.data.response.limitStatus
                  if(res.data.response.secondSemesterDateStart){
                    vm.unirunInfo.firstSemesterDateStart_month=res.data.response.secondSemesterDateStart.split('-')[0];
                    vm.unirunInfo.firstSemesterDateStart_day=res.data.response.secondSemesterDateStart.split('-')[1];
                  }
                  if(res.data.response.secondSemesterDateEnd){
                    vm.unirunInfo.firstSemesterDateEnd_month=res.data.response.secondSemesterDateEnd.split('-')[0];
                    vm.unirunInfo.firstSemesterDateEnd_day=res.data.response.secondSemesterDateEnd.split('-')[1];
                  }
                  if(res.data.response.sportsClassSecondStart){
                    vm.unirunInfo.secondSemesterDateStart_month=res.data.response.sportsClassSecondStart.split('-')[0];
                  vm.unirunInfo.secondSemesterDateStart_day=res.data.response.sportsClassSecondStart.split('-')[1];
                  }
                  if(res.data.response.configurationStatus != 1 &&  res.data.response.isAdmin == '1'){
                    vm.modal = true
                  }
                }
              })
          },
          basicsOk(str){
            let vm =this;
            if(this.isNextClick){return}
            this.isNextClick = true
            let info ={}
            if(str == 1){//配置了
              if (
                this.unirunInfo.secondSemesterDateStart_month == "" ||
                this.unirunInfo.secondSemesterDateStart_day == "" ||
                this.unirunInfo.firstSemesterDateEnd_month == "" ||
                this.unirunInfo.firstSemesterDateEnd_day == "" ||
                this.unirunInfo.firstSemesterDateStart_month == "" ||
                this.unirunInfo.firstSemesterDateStart_day == ""
              ) {
                this.$Message.error("请选择学期起止日期。");
                this.isNextClick = false
                return false;
              }
              if(parseInt(this.unirunInfo.firstSemesterDateStart_month)>parseInt(this.unirunInfo.firstSemesterDateEnd_month)){
                this.$Message.error("结束时间不能小于开始时间");
                this.isNextClick = false
                return false;
              }
              if(this.unirunInfo.firstSemesterDateStart_month+this.unirunInfo.firstSemesterDateStart_day==this.unirunInfo.firstSemesterDateEnd_month+this.unirunInfo.firstSemesterDateEnd_day){
                this.$Message.error("日期不能是同一天");
                this.isNextClick = false
                return false;
              }
              if(this.schoolType == '2'){
                if(this.semesterClass.oneCount == '' || this.semesterClass.oneCount < 0 ||
                  this.semesterClass.twoCount == '' || this.semesterClass.twoCount < 0 ||
                  this.semesterClass.threeCount == '' || this.semesterClass.threeCount < 0 ||
                  this.semesterClass.fourCount == '' || this.semesterClass.fourCount < 0 ||
                  this.semesterClass.fiveCount == '' || this.semesterClass.fiveCount < 0 ||
                  this.semesterClass.sixCount == '' || this.semesterClass.sixCount < 0
                  ){
                    this.$Message.error("请输入年级课时数。");
                    this.isNextClick = false
                    return false;
                  }
              }
              if(this.schoolType == '3'){
                if(this.semesterClass.sevenCount == '' || this.semesterClass.sevenCount < 0 ||
                  this.semesterClass.eightCount == '' || this.semesterClass.eightCount < 0 ||
                  this.semesterClass.nineCount == '' || this.semesterClass.nineCount < 0
                  ){
                    this.$Message.error("请输入年级课时数。");
                    this.isNextClick = false
                    return false;
                  }
              }
              if(this.schoolType == '4'){
                if(this.semesterClass.tenCount == '' || this.semesterClass.tenCount < 0 ||
                  this.semesterClass.elevenCount == '' || this.semesterClass.elevenCount < 0 ||
                  this.semesterClass.twelveCount == '' || this.semesterClass.twelveCount < 0
                  ){
                    this.$Message.error("请输入年级课时数。");
                    this.isNextClick = false
                    return false;
                  }
              }
            }
            info ={
              "classScheduleStatus": this.timetable.old == 'old'?1:0,// 课表沿用状态1沿用0不沿用
              "classSecondStart": this.unirunInfo.secondSemesterDateStart_month + "-" + this.unirunInfo.secondSemesterDateStart_day,//开课时间 ,
              "configurationStatus": str,//是否配置1是0否 ,
              "gradeEightCount": this.semesterClass.eightCount,//八年级课时数 ,
              "gradeElevenCount": this.semesterClass.elevenCount,//高二年级课时数 ,
              "gradeFiveCount": this.semesterClass.fiveCount,//五年级课时数 ,
              "gradeFourCount": this.semesterClass.fourCount,//四年级课时数 ,
              "gradeNineCount": this.semesterClass.nineCount,//九年级课时数 ,
              "gradeOneCount": this.semesterClass.oneCount,//一年级课时数 ,
              "gradeSevenCount": this.semesterClass.sevenCount,//七年级课时数 ,
              "gradeSixCount": this.semesterClass.sixCount,// 六年级课时数 ,
              "gradeTenCount": this.semesterClass.tenCount,//高一年级课时数 ,
              "gradeThreeCount": this.semesterClass.threeCount,//三年级课时数 ,
              "gradeTwelveCount": this.semesterClass.twelveCount,//高三年级课时数 ,
              "gradeTwoCount": this.semesterClass.twoCount,//二年级课时数 ,
              "homeworkConfigurationStatus": this.timetable.contentCopy == 'old'?1:0,//家庭作业配置是否沿用1是0否 ,
              "homeworkCountStatus": this.timetable.count == 'old'?1:0,// 家庭作业次数是否沿用1是0否 ,
              "schoolId": sessionStorage.getItem("schoolId"),//学校id ,
              "secondSemesterDateEnd": this.unirunInfo.firstSemesterDateEnd_month+ "-" + this.unirunInfo.firstSemesterDateEnd_day,//学期结束时间 ,
              "secondSemesterDateStart": this.unirunInfo.firstSemesterDateStart_month+ "-" + this.unirunInfo.firstSemesterDateStart_day,//学期开始时间 ,
              "teacherId": sessionStorage.getItem('teacherId')//教师id
            }
            this.$axios.post("/v1/schoolsemesternotice/addSchoolConfiguration",info).then(res => {
              if (res.data.code == 10000) {
                vm.modal1 = false;
                vm.modal = false;
                vm.isNextClick = false
                if(str ==1){
                  this.$Message.success("配置成功");
                }
              }else{
                vm.isNextClick = false
              }
            }).catch(err =>{
              vm.$Message.success("配置失败,请稍候再试！");
              vm.isNextClick = false
            })
          },
        },
        created(){
            axios.defaults.baseURL = 'https://patriarch-tm.tanmasports.com/organ'; //探马数据测试环境
            // axios.defaults.baseURL = 'https://patriarch.tanmasports.com/organ'; //探马数据正式环境
            // axios.defaults.baseURL = 'http://192.168.3.41:8184/'; //探马数据开发环境
            axios.defaults.answerUrl = 'https://html-test.tanmasports.com/page/'; //答题系统测试环境--正式环境去掉-test
            axios.defaults.zhURL = 'https://zhschool.tanmasports.com'; //珠海
            axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
            
        }
    };
</script>


