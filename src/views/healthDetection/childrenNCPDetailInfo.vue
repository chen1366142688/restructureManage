<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{studentName}}健康监测报告</h2>
    </div>
    <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
      <TabPane name="one" label="基本情况">
        <div>
            <Card>
                <div>
                    <p>
                        1、孩子近期每天接触人员有哪些？
                    </p>
                    <CheckboxGroup  v-model="familyContact" style="margin-left:20px;margin-top:20px;">
                        <Checkbox :disabled="disabled" label="1">爸爸</Checkbox>
                        <Checkbox :disabled="disabled" label="2">妈妈</Checkbox>
                        <Checkbox :disabled="disabled" label="3">爷爷</Checkbox>
                        <Checkbox :disabled="disabled" label="4">奶奶</Checkbox>
                        <Checkbox :disabled="disabled" label="5">姥爷</Checkbox>
                        <Checkbox :disabled="disabled" label="6">姥姥</Checkbox>
                        <Checkbox :disabled="disabled" label="7">兄弟姐妹</Checkbox>
                        <Checkbox :disabled="disabled" label="8">其他亲人</Checkbox>
                    </CheckboxGroup>
                </div>
                <div style="margin-top:20px;">
                    <p>
                        2、孩子及家人近期（1月8日）以来是否接触过从湖北、重庆来蓉人员？ 
                    </p>
                    <RadioGroup  v-model="contactHbcq" style="margin-left:20px;margin-top:20px;">
                        <Radio :disabled="disabled" label="1">是</Radio >
                        <Radio :disabled="disabled"  label="0">否</Radio >
                    </RadioGroup >
                </div>
                <div style="margin-top:20px;">
                    <p>
                        3、孩子及家人近期（1月29日）以来是否接触过从成都市范围以外来蓉人员？
                    </p>
                    <RadioGroup  v-model="contactNotChengdu" style="margin-left:20px;margin-top:20px;">
                        <Radio :disabled="disabled" label="1">是</Radio >
                        <Radio :disabled="disabled" label="0">否</Radio >
                    </RadioGroup >
                </div>
                <div style="margin-top:20px;">
                    <p>
                        4、1月8日后是否去过成都市外（未去过下一题不用答）？ 
                    </p>
                    <RadioGroup  v-model="leaveChengdu" style="margin-left:20px;margin-top:20px;">
                        <Radio :disabled="disabled" label="1">是</Radio >
                        <Radio :disabled="disabled" label="0">否</Radio >
                    </RadioGroup >
                </div>
                <div style="margin-top:20px;">
                    <p>
                        5、若您去过成都市外，具体是那里？往返时间及方式（自驾，航班，列车，大巴） 
                    </p>
                     <Input :disabled="disabled" v-model="leaveChengduDetail" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="请输入具体地点、往返时间及方式" />
                </div>
                <div style="margin-top:20px;">
                    <p>
                        6、孩子及家人是否了解防控新型冠状病毒感染肺炎的方法？
                    </p>
                    <RadioGroup  v-model="controlInfo" style="margin-left:20px;margin-top:20px;">
                        <Radio :disabled="disabled" label="1">是</Radio >
                        <Radio :disabled="disabled" label="0">否</Radio >
                    </RadioGroup >
                </div>
                <div style="margin-top:20px;">
                    <p>
                        7、您所在小区或者周边1公里范围内是否有疑似或者感染人员？
                    </p>
                    <RadioGroup  v-model="haveUnusualCondition" style="margin-left:20px;margin-top:20px;">
                        <Radio :disabled="disabled" label="1">是</Radio >
                        <Radio :disabled="disabled" label="0">否</Radio >
                    </RadioGroup >
                </div>
                <div style="margin-top:20px;">
                    <p>
                        8、孩子及家人目前身体状况？
                    </p>
                    <RadioGroup  v-model="healthStatus" style="margin-left:20px;margin-top:20px;" vertical>
                        <Radio :disabled="disabled" label="1">身体健康无异常</Radio >
                        <Radio :disabled="disabled"  label="2">自我隔离观察中</Radio >
                        <Radio :disabled="disabled" label="3">医院隔离观察中</Radio >
                        <Radio :disabled="disabled" label="4">确认患病</Radio >
                        <Radio :disabled="disabled" label="5">其他</Radio >
                    </RadioGroup >
                    </br>
                    <Input :disabled="disabled" v-if="healthStatus==5" v-model="healthStatusOther" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
             
            </Card>
        </div>
      </TabPane>
      <TabPane name="two" label="健康状况">
          <div>
            <Card>
              <div >
                    <p>
                        1、{{studentName}}目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="studentCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox :disabled="disabled"  label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="studentFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox  :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="studentRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="studentHospitalStautus">
                    <p>
                        2、{{studentName}}是否去医院就医？
                    </p>
                    <RadioGroup  v-model="studentHospitalStautus" style="margin-left:20px;margin-top:20px;" >
                        <Radio :disabled="disabled" label="1">是</Radio >
                        <Radio :disabled="disabled" label="0">否</Radio >
                    </RadioGroup >
                    </br>
                    <Input :disabled="disabled" v-model="studentHospitalRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;" v-if="fatherTf">
                    <p>
                        {{one}}、{{studentName}}爸爸目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="fatherCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox  :disabled="disabled" label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="fatherFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="fatherRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="motherTf">
                    <p>
                       {{two}}、{{studentName}}妈妈目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="motherCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox  :disabled="disabled" label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="motherFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled"  v-model="motherRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="grandpaTf">
                    <p>
                        {{three}}、{{studentName}}爷爷目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="grandpaCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox :disabled="disabled"  label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="grandpaFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="grandpaRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="grandmaTf">
                    <p>
                        {{four}}、{{studentName}}奶奶目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="grandmaCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox  :disabled="disabled" label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="grandmaFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="grandmaRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="grandpamaTf">
                    <p>
                        {{five}}、{{studentName}}姥爷目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="grandpaMaCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox  :disabled="disabled" label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="grandpaMaFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="grandpaMaRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="grandmamaTf">
                    <p>
                        {{six}}、{{studentName}}姥姥目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="grandmaMaCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox  :disabled="disabled" label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="grandmaMaFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="grandmaMaRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="brotherTf">
                    <p>
                        {{seven}}、{{studentName}}兄弟姐妹目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="brotherSisterCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox :disabled="disabled"  label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="brotherSisterFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="brotherSisterRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
                <div style="margin-top:20px;"  v-if="otherTf">
                    <p>
                       {{eight}}、{{studentName}}其他亲戚目前身体健康状况？
                    </p>
                    <CheckboxGroup   v-model="otherRelativesCheck" style="margin-left:20px;margin-top:20px;" >
                        <Checkbox :disabled="disabled"  label="1">正常</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="2">发烧</Checkbox  >
                        <Input :disabled="disabled" v-model="otherRelativesFever" size="small" style="width:60px;"  placeholder="度数" />
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="3">咳嗽</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="4">感冒</Checkbox  >
                        <Checkbox :disabled="disabled" style="margin-left:20px;" label="5">其他</Checkbox  >
                    </CheckboxGroup  >
                    </br>
                    <Input :disabled="disabled" v-model="otherRelativesRemark" style="margin-left:20px;margin-top:20px;width:600px;" type="textarea" :rows="4" placeholder="详情" />
                </div>
            </Card>
          </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      selectTabName:'',
      studentId:'',
      childrenId:'',
      dayId:'',
      studentName:'',
      familyContact:[],
      contactHbcq:'',
      contactNotChengdu:'',
      leaveChengdu:'',
      leaveChengduDetail:'',
      healthStatus:'',
      healthStatusOther:'',
      haveUnusualCondition:'',
      controlInfo:'',

        twoFamily:'',
      brotherSisterAbnormalStatus: "",
        brotherSisterFever: "",
        brotherSisterCheck: [],
        brotherSisterRemark: "",
        fatherAbnormalStatus: "",
        fatherFever: "",
        fatherCheck: [],
        fatherRemark: "",
        grandmaAbnormalStatus: "",
        grandmaFever: "",
        grandmaCheck: [],
        grandmaMaAbnormalStatus: "",
        grandmaMaFever: "",
        grandmaMaCheck: [],
        grandmaMaRemark: "",
        grandmaRemark: "",
        grandpaAbnormalStatus: "",
        grandpaFever: "",
        grandpaCheck: [],
        grandpaMaAbnormalStatus: "",
        grandpaMaFever: "",
        grandpaMaCheck: [],
        grandpaMaRemark: "",
        grandpaRemark: "",
        motherAbnormalStatus: "",
        motherFever: "",
        motherCheck: [],
        motherRemark: "",
        otherRelativesAbnormalStatus: "",
        otherRelativesFever: "",
        otherRelativesCheck: [],
        otherRelativesRemark: "",
        studentAbnormalStatus: "",
        studentFever: "",
        studentCheck: [],
        studentHospitalRemark: "",
        studentHospitalStautus: "",
        studentRemark: "",
        studentHealthStatusOther:'',
        fatherHealthStatusOther:'',
        motherHealthStatusOther:'',
        grandpaHealthStatusOther:'',
        grandmaHealthStatusOther:'',
        grandpaMaHealthStatusOther:'',
        grandmaMaHealthStatusOther:'',
        brotherSisterHealthStatusOther:'',
        otherRelativesHealthStatusOther:'',
        one:'',
        two:'',
        three:'',
        four:'',
        five:'',
        six:'',
        seven:'',
        eight:'',
        fatherTf:false,
        motherTf:false,
        grandpaTf:false,
        grandmaTf:false,
        grandpamaTf:false,
        grandmamaTf:false,
        brotherTf:false,
        otherTf:false,
        disabled:true,
    };
  },
  methods: {
      selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('healthDetection-healthDetection-selectTabName',this.selectTabName);
     },
    getChildrenNCPBaseInfo(childrenId){
      var vm=this;
        this.$axios.get("/v1/healthDetection/getChildrenNCPBaseInfo?childrenId="+childrenId).then(res => {
        if (res.data.code == 10000) {
            console.log(res.data.response)
            let data=res.data.response;
            let string=data.familyContact;
            vm.twoFamily=data.familyContact;
            let arr=[];
            if(string.substring(0,1)=="1"){
                arr.push("1")
            }
            if(string.substring(1,2)=="1"){
                arr.push("2")
            }
            if(string.substring(2,3)=="1"){
                arr.push("3")
            }
            if(string.substring(3,4)=="1"){
                arr.push("4")
            }
            if(string.substring(4,5)=="1"){
                arr.push("5")
            }
            if(string.substring(5,6)=="1"){
                arr.push("6")
            }
            if(string.substring(6,7)=="1"){
                arr.push("7")
            }
            if(string.substring(7,8)=="1"){
                arr.push("8")
            }
            vm.familyContact=arr,
            vm.contactHbcq=data.contactHbcq;
            vm.contactNotChengdu=data.contactNotChengdu;
            vm.leaveChengdu=data.leaveChengdu;
            vm.leaveChengduDetail=data.leaveChengduDetail;
            vm.healthStatus=data.healthStatus;
            vm.healthStatusOther=data.healthStatusOther;
            vm.haveUnusualCondition=data.haveUnusualCondition;
            vm.controlInfo=data.controlInfo;
            if(sessionStorage.getItem("dayList-childrenNCPDetailInfo-dayId")){
                vm.getChildrenNCPDayInfo(sessionStorage.getItem("dayList-childrenNCPDetailInfo-dayId"));
            }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getChildrenNCPDayInfo(dayId){
      var vm=this;
        this.$axios.get("/v1/healthDetection/getChildrenNCPDayInfo?dayId="+dayId).then(res => {
        if (res.data.code == 10000) {
            console.log(res.data.response)
            let data=res.data.response;
            let arr=[];
            let string=vm.twoFamily;
            let lengths=vm.studentHospitalStautus?2:1;
            if(string.substring(0,1)=="1"){
                vm.one=(arr.length+lengths) +1
                vm.fatherTf=true;
                arr.push("1")
            }
            if(string.substring(1,2)=="1"){
               vm.two=(arr.length+lengths)  +1
                vm.motherTf=true
                arr.push("2")
            }
            if(string.substring(2,3)=="1"){
                vm.three=(arr.length+lengths)  +1
                vm.grandpaTf=true
                arr.push("3")
            }
            if(string.substring(3,4)=="1"){
                vm.four=(arr.length+lengths)  +1
                vm.grandmaTf=true
                arr.push("4")
            }
            if(string.substring(4,5)=="1"){
                vm.five=(arr.length+lengths)  +1
                vm.grandpamaTf=true
                arr.push("5")
            }
            if(string.substring(5,6)=="1"){
                vm.six=(arr.length+lengths)  +1
                vm.grandmamaTf=true
                arr.push("6")
            }
            if(string.substring(6,7)=="1"){
                vm.seven=(arr.length+lengths)  +1
                vm.brotherTf=true
                arr.push("7")
            }
            if(string.substring(7,8)=="1"){
                vm.eight=(arr.length+lengths)  +1
                vm.otherTf=true
                arr.push("8")
            }
            vm.studentFever=data.studentFever;
            vm.studentRemark=data.studentRemark;
            vm.studentHospitalRemark=data.studentHospitalRemark;
            vm.studentHospitalStautus=data.studentHospitalStautus;
            if(data.studentHealthStatusNormal=='1'){
                vm.studentCheck.push("1")
            }
            if(data.studentHealthStatusFever=='1'){
                vm.studentCheck.push("2")
            }
            if(data.studentHealthStatusCough=='1'){
                vm.studentCheck.push("3")
            }
            if(data.studentHealthStatusCold=='1'){
                vm.studentCheck.push("4")
            }
            if(data.studentHealthStatusOther=='1'){
                vm.studentCheck.push("5")
            }

            vm.fatherFever=data.fatherFever;
            vm.fatherRemark=data.fatherRemark;
            if(data.fatherHealthStatusNormal=='1'){
                vm.fatherCheck.push("1")
            }
            if(data.fatherHealthStatusFever=='1'){
                vm.fatherCheck.push("2")
            }
            if(data.fatherHealthStatusCough=='1'){
                vm.fatherCheck.push("3")
            }
            if(data.fatherHealthStatusCold=='1'){
                vm.fatherCheck.push("4")
            }
            if(data.fatherHealthStatusOther=='1'){
                vm.fatherCheck.push("5")
            }

            vm.motherFever=data.motherFever;
            vm.motherRemark=data.motherRemark;
            if(data.motherHealthStatusNormal=='1'){
                vm.motherCheck.push("1")
            }
            if(data.motherHealthStatusFever=='1'){
                vm.motherCheck.push("2")
            }
            if(data.motherHealthStatusCough=='1'){
                vm.motherCheck.push("3")
            }
            if(data.motherHealthStatusCold=='1'){
                vm.motherCheck.push("4")
            }
            if(data.motherHealthStatusOther=='1'){
                vm.motherCheck.push("5")
            }

            vm.grandpaFever=data.grandpaFever;
            vm.grandpaRemark=data.grandpaRemark;
            if(data.grandpaHealthStatusNormal=='1'){
                vm.grandpaCheck.push("1")
            }
            if(data.grandpaHealthStatusFever=='1'){
                vm.grandpaCheck.push("2")
            }
            if(data.grandpaHealthStatusCough=='1'){
                vm.grandpaCheck.push("3")
            }
            if(data.grandpaHealthStatusCold=='1'){
                vm.grandpaCheck.push("4")
            }
            if(data.grandpaHealthStatusOther=='1'){
                vm.grandpaCheck.push("5")
            }

            vm.grandmaFever=data.grandmaFever;
            vm.grandmaRemark=data.grandmaRemark;
            if(data.grandmaHealthStatusNormal=='1'){
                vm.grandmaCheck.push("1")
            }
            if(data.grandmaHealthStatusFever=='1'){
                vm.grandmaCheck.push("2")
            }
            if(data.grandmaHealthStatusCough=='1'){
                vm.grandmaCheck.push("3")
            }
            if(data.grandmaHealthStatusCold=='1'){
                vm.grandmaCheck.push("4")
            }
            if(data.grandmaHealthStatusOther=='1'){
                vm.grandmaCheck.push("5")
            }

            vm.grandpaMaFever=data.grandpaMaFever;
            vm.grandpaMaRemark=data.grandpaMaRemark;
            if(data.grandpaMaHealthStatusNormal=='1'){
                vm.grandpaMaCheck.push("1")
            }
            if(data.grandpaMaHealthStatusFever=='1'){
                vm.grandpaMaCheck.push("2")
            }
            if(data.grandpaMaHealthStatusCough=='1'){
                vm.grandpaMaCheck.push("3")
            }
            if(data.grandpaMaHealthStatusCold=='1'){
                vm.grandpaMaCheck.push("4")
            }
            if(data.grandpaMaHealthStatusOther=='1'){
                vm.grandpaMaCheck.push("5")
            }

            vm.grandmaMaFever=data.grandmaMaFever;
            vm.grandmaMaRemark=data.grandmaMaRemark;
            if(data.grandmaMaHealthStatusNormal=='1'){
                vm.grandmaMaCheck.push("1")
            }
            if(data.grandmaMaHealthStatusFever=='1'){
                vm.grandmaMaCheck.push("2")
            }
            if(data.grandmaMaHealthStatusCough=='1'){
                vm.grandmaMaCheck.push("3")
            }
            if(data.grandmaMaHealthStatusCold=='1'){
                vm.grandmaMaCheck.push("4")
            }
            if(data.grandmaMaHealthStatusOther=='1'){
                vm.grandmaMaCheck.push("5")
            }

            vm.brotherSisterFever=data.brotherSisterFever;
            vm.brotherSisterRemark=data.brotherSisterRemark;
            if(data.brotherSisterHealthStatusNormal=='1'){
                vm.brotherSisterCheck.push("1")
            }
            if(data.brotherSisterHealthStatusFever=='1'){
                vm.brotherSisterCheck.push("2")
            }
            if(data.brotherSisterHealthStatusCough=='1'){
                vm.brotherSisterCheck.push("3")
            }
            if(data.brotherSisterHealthStatusCold=='1'){
                vm.brotherSisterCheck.push("4")
            }
            if(data.brotherSisterHealthStatusOther=='1'){
                vm.brotherSisterCheck.push("5")
            }

            vm.otherRelativesFever=data.otherRelativesFever;
            vm.otherRelativesRemark=data.otherRelativesRemark;
            if(data.otherRelativesHealthStatusNormal=='1'){
                vm.otherRelativesCheck.push("1")
            }
            if(data.otherRelativesHealthStatusFever=='1'){
                vm.otherRelativesCheck.push("2")
            }
            if(data.otherRelativesHealthStatusCough=='1'){
                vm.otherRelativesCheck.push("3")
            }
            if(data.otherRelativesHealthStatusCold=='1'){
                vm.otherRelativesCheck.push("4")
            }
            if(data.otherRelativesHealthStatusOther=='1'){
                vm.otherRelativesCheck.push("5")
            }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
  },
  watch: {},
  created() {},
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let selectTabNameInfo = sessionStorage.getItem("healthDetection-healthDetection-selectTabName");
    if(selectTabNameInfo == null || selectTabNameInfo  == "" || selectTabNameInfo == undefined){
        vm.selectTabName = "one";
    }else{
        vm.selectTabName = selectTabNameInfo;
    }
    vm.studentId=sessionStorage.getItem("dayList-childrenNCPDetailInfo-studentId");
    vm.studentName=sessionStorage.getItem("dayList-childrenNCPDetailInfo-studentName");
    vm.childrenId=sessionStorage.getItem("dayList-childrenNCPDetailInfo-childrenId");
    vm.dayId=sessionStorage.getItem("dayList-childrenNCPDetailInfo-dayId");
    // console.log(sessionStorage.getItem("dayList-childrenNCPDetailInfo-childrenId")=="null")
    if(sessionStorage.getItem("dayList-childrenNCPDetailInfo-childrenId") && sessionStorage.getItem("dayList-childrenNCPDetailInfo-childrenId")!="null"){
        vm.getChildrenNCPBaseInfo(sessionStorage.getItem("dayList-childrenNCPDetailInfo-childrenId"));
    }
}
};
</script>