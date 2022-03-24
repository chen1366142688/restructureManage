

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">有误成绩修正</h2>
    </div>
    <Card>
      <div class="top-search">
          <div class="left-input">
            </div>
            <div class="right-btns">
                <Button type="success" @click="pageToClassList">返回</Button>
            </div>
      </div>
    </Card>
    <Card style="margin-top:20px;"  :dis-hover="true">
      <!-- <Tabs type="card" @on-click="tagClick"  v-model="schoolTestName">
        <TabPane
          v-for="(schoolTest,index) in schoolTestList"
          :key="index"
          :label="schoolTest.name"
          :name="schoolTest.name"
        ></TabPane>
      </Tabs> -->
      <Table border :loading="loading" max-height="500" :columns="resultColumns" :data="resultData">
        <template slot-scope="{ row, index }" slot="newResultValue">
          <div v-if="row.schoolTestId== 7 || row.schoolTestId== 10 || row.schoolTestId== 11">
            <input autocomplete="off" style="width:80px;" v-on:blur="onblurFunction(row,index)" :id="row.resultId+'one'" v-on:input="minSecondInput(row,index,'1')" type="text" />分
            <input autocomplete="off" style="width:80px;" v-on:blur="onblurFunction(row,index)" :id="row.resultId+'two'" v-on:input="minSecondInput(row,index,'2')" type="text" />秒
            <Icon type="ios-close-circle-outline" style="color:rgb(255,255,255);cursor:pointer;marginLeft:5px;fontSize:18px" :id="row.resultId+'pic'" />
          </div>
          <div v-else>
            <input autocomplete="off" style="width:80px;" v-on:blur="onblurFunction(row,index)" :id="row.resultId" v-on:input="inputFunction(row,index)" type="text" />
            <Icon type="ios-close-circle-outline" style="color:rgb(255,255,255);cursor:pointer;marginLeft:5px;fontSize:18px" :id="row.resultId+'pic'" />
          </div>
        </template>
      </Table>
      <p style="margin-top:10px;text-align:center">共计{{totalNum}}条数据</p>
    </Card>
    <div style="margin-top:10px;text-align:center">
      <Button style="width:100px" @click="baseSubmit" type="success">提交</Button>
    </div>
    <Modal v-model="submitStatus" width="360" :closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <span>提交中......</span>
        </p>
        <div style="text-align:center">
            <Progress :percent="submitPercent" :stroke-color="['#108ee9', '#87d068']" />
        </div>
        <div slot="footer">
        </div>
    </Modal>
    
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
        submitPercent:0,
        submitStatus:false,
        loading:false,
        dateType: "",
      schoolTestName: "",
      schoolTestList:[
          {
              name:"体测项目",
              value:'1'
          },
          {
              name:"视力",
              value:'2'
          },
      ],
      resultData: [],
      resultColumns: [],
      baseColumns: [
        {
          title: "序号",
          type: "index",
          minWidth: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "studentName",
          minWidth: 100,
          align: "center",
        },
        {
          title: "性别",
          key: "gender",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          minWidth: 100,
          align: "center",
        },
        {
          title: "班级",
          key: "gradeId",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.gradeId == 1 ? "一年级" :row.gradeId == 2 ? "二年级" :row.gradeId == 3 ? "三年级" :row.gradeId == 4 ? "四年级" :
            row.gradeId == 5 ? "五年级" :row.gradeId == 6 ? "六年级" :row.gradeId == 7 ? "七年级" :row.gradeId == 8 ? "八年级" :
            row.gradeId == 9 ? "九年级" :row.gradeId == 10 ? "高一" :row.gradeId == 11 ? "高二" :row.gradeId == 12 ? "高三" : "";
            text+=row.studentClass+"班"
            return h("div", text);
          },
        },
        {
          title: "项目",
          key: "schoolTestId",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.schoolTestId == 1 ? "身高" :row.schoolTestId == 2 ? "肺活量" :row.schoolTestId == 3 ? "50米跑" :row.schoolTestId == 4 ? "坐位体前屈" :
            row.schoolTestId == 5 ? "一分钟跳绳" :row.schoolTestId == 6 ? "一分钟仰卧起坐" :row.schoolTestId == 7 ? "50米X8往返跑" :row.schoolTestId == 8 ? "立定跳远" :
            row.schoolTestId == 9 ? "引体向上" :row.schoolTestId == 10 ? "1000米跑" :row.schoolTestId == 11 ? "800米跑" :row.schoolTestId == 12 ? "体重" : "";
            return h("div", text);
          },
        },
        {
          title: "错误成绩",
          key: "resultValue",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text="";
            if(row.schoolTestId== 7 || row.schoolTestId== 10 || row.schoolTestId== 11 ){
             let min=row.resultValue?parseInt(row.resultValue/60):''
                let second=row.resultValue?row.resultValue%60:''
              text=min+"'"+second+"''"
            }else{
              text=row.resultValue
            }
            return h("div", text);
          },
        },
        {
          title: "错误提示",
          key: "text",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = this.getTextBySchoolTestIdAndResultValue(row.schoolTestId,row.resultValue)
            return h("div", text);
          },
        },
          {
          title: "成绩",
          slot: "newResultValue",
          minWidth: 200,
          align: "center",
        },
      ],
      vision: [
        {
          title: "序号",
          type: "index",
          minWidth: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "studentName",
          minWidth: 100,
          align: "center",
        },
        {
          title: "性别",
          key: "gender",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          minWidth: 100,
          align: "center",
        },
        {
          title: "班级",
          key: "gradeId",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.gradeId == 1 ? "一年级" :row.gradeId == 2 ? "二年级" :row.gradeId == 3 ? "三年级" :row.gradeId == 4 ? "四年级" :
            row.gradeId == 5 ? "五年级" :row.gradeId == 6 ? "六年级" :row.gradeId == 7 ? "七年级" :row.gradeId == 8 ? "八年级" :
            row.gradeId == 9 ? "九年级" :row.gradeId == 10 ? "高一" :row.gradeId == 11 ? "高二" :row.gradeId == 12 ? "高三" : "";
            text+=row.studentClass+"班"
            return h("div", text);
          },
        },
        {
          title: "左眼裸眼视力",
          key: "leftVision",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            return h("div",[
              h('Input',{
              props: {
                value: params.row.leftVision,
                size: "small",
              },
              attrs:{
                    id:params.row.resultId+"enter"+"left"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.visionChange(params.row,params.index,val,"1")
                },
                // "on-blur":function(){
                //   let color=!vm.numCheck(vm.resultData[params.index].leftVision)?"red":"green"
                //   let className=!vm.numCheck(vm.resultData[params.index].leftVision)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                //   document.getElementById(params.row.resultId+"1").style.color=color
                //    document.getElementById(params.row.resultId+"1").className=className
                // },
                // "on-enter":function(){
                //   document.getElementById(params.row.resultId+"enterright").getElementsByTagName("input")[0].focus()
                // }
              },
            }),
            ]
            );
          },
        },
         {
          title: "右眼裸眼视力",
          key: "rightVision",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            return h("div",[
              h('Input',{
              props: {
                value: params.row.rightVision,
                size: "small",
              },
              attrs:{
                    id:params.row.resultId+"enter"+"right"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.visionChange(params.row,params.index,val,"2")
                },
                // "on-blur":function(){
                //   let color=!vm.numCheck(vm.resultData[params.index].rightVision)?"red":"green"
                //   let className=!vm.numCheck(vm.resultData[params.index].rightVision)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                //   document.getElementById(params.row.resultId+"2").style.color=color
                //    document.getElementById(params.row.resultId+"2").className=className
                // },
                // "on-enter":function(){
                //   let result=vm.resultData;
                //   let index="";
                //   for(let i=0;i<result.length;i++){
                //     if(params.row.resultId==result[i].resultId){
                //       index=i+1;
                //       break;
                //     }
                //   }
                //   if(index+1>result.length){
                //     return
                //   }
                //   document.getElementById(result[index].resultId+"enterleft").getElementsByTagName("input")[0].focus()
                // }
              },
            }),
            ]
            );
          },
        },
         {
          title: "左眼串镜",
          key: "leftMirror",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            var vm = this;
            return h("div",[
              h('Select',{
              props: {
                value: params.row.leftMirror,
                size: "small",
                transfer:true
              },
              style:{
                width:"160px"
              },
              on: {
                'on-change': (event) => {
                  vm.mirrorChange(params.row,params.index,event,"1")
                },
              },
            },
            vm.mirrorList.map((item) =>{
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.name
                                        }
                                    })
                                })
            ),
            ]
            );
          },
        },
         {
          title: "右眼串镜",
          key: "rightMirror",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            var vm = this;
            return h("div",[
              h('Select',{
              props: {
                value: params.row.rightMirror,
                size: "small",
                transfer:true
              },
              style:{
                width:"160px"
              },
              on: {
                'on-change': (event) => {
                  vm.mirrorChange(params.row,params.index,event,"2")
                },
              },
            },vm.mirrorList.map((item) =>{
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.name
                                        }
                                    })
                                })),
            ]
            );
          },
        },
        {
          title: "左眼屈光不正",
          key: "leftLight",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            var vm = this;
            return h("div",[
               !vm.numCheck(params.row.leftVision)?"":
              h('Select',{
              props: {
                value: params.row.leftLight,
                size: "small",
                transfer:true
              },
              style:{
                width:"160px"
              },
              on: {
                'on-change': (event) => {
                  vm.lightChange(params.row,params.index,event,"1")
                },
              },
              
            },vm.lightList.map((item) =>{
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.name
                                        }
                                    })
                                })),
            ]
            );
          },
        },
        {
          title: "右眼屈光不正",
          key: "leftLight",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            var vm = this;
            return h("div",[
               !vm.numCheck(params.row.rightVision)?"":
              h('Select',{
              props: {
                value: params.row.rightLight,
                size: "small",
                transfer:true
              },
              style:{
                width:"160px"
              },
              on: {
                'on-change': (event) => {
                  vm.lightChange(params.row,params.index,event,"2")
                },
              },
              
            },vm.lightList.map((item) =>{
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.name
                                        }
                                    })
                                })),
            ]
            );
          },
        },
        {
          title: "错误提示",
          key: "registerCode",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = this.getVisionText(row)
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
      ],
      totalNum:'',
      mirrorList: [
         {
          name: "0",
          value: "0"
        },
        {
          name: "-1",
          value: "-1"
        },
         {
          name: "1",
          value: "1"
        },
        {
          name: "2",
          value: "2"
        },
        {
          name: "9",
          value: "9"
        }
      ],
      lightList: [
        {
          name: "0",
          value: "0"
        },
        {
          name: "1",
          value: "1"
        },
        {
          name: "2",
          value: "2"
        },
        {
          name: "3",
          value: "3"
        },
        {
          name: "9",
          value: "9"
        }
      ],
    };
  },
  methods: {
    inputFunction(row,index){
      var vm=this;
      let newResultValue=document.getElementById(row.resultId).value;
      vm.resultData[index].newResultValue=newResultValue;
    },
    minSecondInput(row,index,type){
     var vm=this;
     let newResultValue=document.getElementById(row.resultId+(type=="1"?"one":"two")).value;
      if(!vm.numCheck(newResultValue)){
        if(type=="1"){
           vm.resultData[index].min=0
           document.getElementById(row.resultId+"one").value=0
        }else{
           vm.resultData[index].second=0
           document.getElementById(row.resultId+"two").value=0
        }
        this.$Message.info("请输入正确的数字");
        return;
      }
      newResultValue=Number(newResultValue)
      let min=Number(vm.resultData[index].min)
      let second=Number(vm.resultData[index].second)
      if(type=="1"){
        vm.resultData[index].min=newResultValue
        document.getElementById(row.resultId+"one").value=newResultValue
        if(second !=null){
          vm.resultData[index].newResultValue=newResultValue*60+second
        }else{
          vm.resultData[index].newResultValue=newResultValue*60
        }
      }else{
        vm.resultData[index].second=newResultValue
        document.getElementById(row.resultId+"two").value=newResultValue
        if(newResultValue>59){
          vm.resultData[index].second=0
          document.getElementById(row.resultId+"two").value=0
          this.$Message.info("秒数不能大于59");
          return
        }
        if(min !=null){
          vm.resultData[index].newResultValue=min*60+Number(newResultValue)
        }else{
          vm.resultData[index].newResultValue=newResultValue
        }
      }
    },
    onblurFunction:function(row,index){
      var vm=this;
      let color=vm.checkBySchoolTestIdAndResultValue(row.schoolTestId,vm.resultData[index].newResultValue)|| row.second>59?"red":"green"
      let className=vm.checkBySchoolTestIdAndResultValue(row.schoolTestId,vm.resultData[index].newResultValue)|| row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
      document.getElementById(row.resultId+'pic').style.color=color
      document.getElementById(row.resultId+'pic').className=className
    },
    pageToClassList() { 
      //返回 <Icon type="ios-close-circle" /> <Icon type="ios-close-circle-outline" /> <Icon type="ios-close-circle-outline" />
      this.$router.go(-1);
    },
    search(schoolIds) {
      var vm = this;
      vm.resultData=[]
      vm.getNationReportResultErrorList(schoolIds);
      vm.countNationReportResultErrorList(schoolIds);
    },
    tagClick(schoolTestName) {
      var vm = this;
      for (var i = 0; i < vm.schoolTestList.length; i++) {
        if (schoolTestName == vm.schoolTestList[i].name) {
          vm.dateType = vm.schoolTestList[i].value;
        }
      }
      sessionStorage.setItem("fixErrorData-selectTabName",this.schoolTestName);
      vm.search(vm.schoolIds);
    },
    inputChange(studentInfo,index,newResultValue){
      var vm=this;
      vm.resultData[index].newResultValue=newResultValue;
    },
    minSecondChange(studentInfo,index,newResultValue,type){
     var vm=this;
      if(!vm.numCheck(newResultValue)){
        if(type=="1"){
           vm.resultData[index].min=0
        }else{
           vm.resultData[index].second=0
        }
        this.$Message.info("请输入正确的数字");
        return;
      }
      newResultValue=Number(newResultValue)
      let min=Number(vm.resultData[index].min)
      let second=Number(vm.resultData[index].second)
      if(type=="1"){
        vm.resultData[index].min=newResultValue
        if(second !=null){
          vm.resultData[index].newResultValue=newResultValue*60+second
        }else{
          vm.resultData[index].newResultValue=newResultValue*60
        }
      }else{
        vm.resultData[index].second=newResultValue
        if(newResultValue>59){
          vm.resultData[index].second=0
          this.$Message.info("秒数不能大于59");
          return
        }
        if(min !=null){
          vm.resultData[index].newResultValue=min*60+Number(newResultValue)
        }else{
          vm.resultData[index].newResultValue=newResultValue
        }
      }
    },
    getNationReportResultErrorList(schoolIds) {
      var vm = this;
      this.$axios.get("/v1/dataReport/getNationReportResultErrorList?dateType="+vm.dateType+"&pageSize=40&schoolIds="+schoolIds)
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            
            for(let i=0;i<data.length;i++){
                data[i].newResultValue='';
                if(data[i].schoolTestId==7 || data[i].schoolTestId==10 || data[i].schoolTestId==11){
                  data[i].mine=data[i].resultValue?parseInt(data[i].resultValue/60):''
                  data[i].seconde=data[i].resultValue?data[i].resultValue%60:''
                  data[i].min=''
                  data[i].second=''
                }
            }
            vm.resultData=data
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    countNationReportResultErrorList(schoolIds) {
      var vm = this;
      this.$axios.get("/v1/dataReport/countNationReportResultErrorList?dateType="+vm.dateType+"&schoolIds="+schoolIds)
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.totalNum=data;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getTextBySchoolTestIdAndResultValue(schoolTestId,resultValue){
        var vm=this;
        let text='';
        resultValue=resultValue
        // 格式有误，请输入xx~xx范围内数值，且保留x位小数
        if(schoolTestId==1){
            if(vm.numCheck(resultValue)){
                if(resultValue<50 || resultValue>200){
                    text="超出范围，值必须在50~200范围内"
                }else{
                    if(vm.decemalCheck(resultValue,1)){

                    }else{
                        text="格式有误，保留一位有效数字"
                    }
                }
            }else{
                text="格式有误，请输入50~200范围内数值，且保留一位小数"
            }
        }else if(schoolTestId==12){
            if(vm.numCheck(resultValue)){
                if(resultValue<10 || resultValue>200){
                    text="超出范围，值必须在10~200范围内"
                }else{
                    if(vm.decemalCheck(resultValue,2)){

                    }else{
                        text="格式有误，保留二位有效数字"
                    }
                }
            }else{
                text="格式有误，请输入10~200范围内数值，且保留二位小数"
            }
        }else if(schoolTestId==2){
            if(vm.numCheck(resultValue)){
                if(resultValue<500 || resultValue>9999){
                    text="超出范围，值必须在500~9999范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入500~9999范围内数值，且保留整数"
            }
        }else if(schoolTestId==3){
            if(vm.numCheck(resultValue)){
                if(resultValue<5 || resultValue>20){
                    text="超出范围，值必须在5~20范围内"
                }else{
                    if(vm.decemalCheck(resultValue,2)){

                    }else{
                        text="格式有误，保留二位有效数字"
                    }
                }
            }else{
                text="格式有误，请输入5~20范围内数值，且保留二位小数"
            }
        }else if(schoolTestId==4){
            if(vm.numCheck(resultValue)){
                if(resultValue<-30 || resultValue>40){
                    text="超出范围，值必须在-30~40范围内"
                }else{
                    if(vm.decemalCheck(resultValue,1)){

                    }else{
                        text="格式有误，保留一位有效数字"
                    }
                }
            }else{
                text="格式有误，请输入-30~40范围内数值，且保留一位小数"
            }
        }else if(schoolTestId==5){
            if(vm.numCheck(resultValue)){
                if(resultValue<0 || resultValue>300){
                    text="超出范围，值必须在0~300范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入0~300范围内数值，且保留整数"
            }
        }else if(schoolTestId==6){
            if(vm.numCheck(resultValue)){
                if(resultValue<0 || resultValue>99){
                    text="超出范围，值必须在0~99范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
               text="格式有误，请输入0~99范围内数值，且保留整数"
            }
        }else if(schoolTestId==7){
            if(vm.numCheck(resultValue)){
                if(resultValue<60 || resultValue>420){
                    text="超出范围，值必须在1'00''~7'00''范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入1'00''~7'00''范围内数值"
            }
        }else if(schoolTestId==8){
            if(vm.numCheck(resultValue)){
                if(resultValue<50 || resultValue>400){
                    text="超出范围，值必须在50~400范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入50~400范围内数值,且保留整数"
            }
        }else if(schoolTestId==9){
            if(vm.numCheck(resultValue)){
                if(resultValue<0 || resultValue>99){
                    text="超出范围，值必须在0~99范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入0~99范围内数值,且保留整数"
            }
        }else if(schoolTestId==10){
            if(vm.numCheck(resultValue)){
                if(resultValue<60 || resultValue>600){
                    text="超出范围，值必须在1'00''~10'00''范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入1'00''~10'00''范围内数值"
            }
        }else if(schoolTestId==11){
            if(vm.numCheck(resultValue)){
                if(resultValue<60 || resultValue>600){
                    text="超出范围，值必须在1'00''~10'00''范围内"
                }else{
                    if(vm.decemalCheck(resultValue,0)){

                    }else{
                        text="格式有误，保留整数"
                    }
                }
            }else{
                text="格式有误，请输入1'00''~10'00''范围内数值"
            }
        }
        return text;
    },
    getVisionText(row){
      var vm=this;
      let leftVision=row.leftVision;
      let leftMirror=row.leftMirror;
      let leftLight=row.leftLight;
      let rightVision=row.rightVision;
      let rightMirror=row.rightMirror;
      let rightLight=row.rightLight;
      let text="";
      let leftVisionList=[];
      let leftMirrorList=[];
      let leftLightList=[];
      let rightVisionList=[];
      let rightMirrorList=[];
      let rightLightList=[];
      if(vm.numCheck(leftVision)){
                if(leftVision<3 || leftVision>5.3){
                    leftVisionList.push("超出范围，值必须在3.0~5.3范围内")
                  }else{
                      if(vm.decemalCheck(leftVision,1)){

                      }else{
                          leftVisionList.push("格式有误，保留一位有效数字")
                      }
                  }
      }else{
            leftVisionList.push("格式有误,数值范围在3.0~5.3之间，且保留一位有效数字")
      }
      if(vm.numCheck(rightVision)){
                if(rightVision<3 || rightVision>5.3){
                    rightVisionList.push("超出范围，值必须在3.0~5.3范围内")
                  }else{
                      if(vm.decemalCheck(rightVision,1)){

                      }else{
                          rightVisionList.push("格式有误，保留一位有效数字")
                      }
                  }
      }else{
            rightVisionList.push("格式有误,数值范围在3.0~5.3之间，且保留一位有效数字")
      }
      if(vm.numCheck(leftVision)){
        if(vm.numCheck(leftMirror)){
          if(leftVision>=5){
            if(leftMirror!="0"){
              leftMirrorList.push("只能选0")
            }
          }else{
            if(leftMirror != "1" && leftMirror != "-1" && leftMirror != "2" && leftMirror != "9" ){
              leftMirrorList.push("请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，未测试：9")
            }
          }
        }else{
          leftMirrorList.push("格式有误,请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，未测试：9")
        }
      }else{
        leftMirrorList.push("请先填写视力")
      }
      if(vm.numCheck(rightVision)){
        if(vm.numCheck(rightMirror)){
          if(rightVision>=5){
            if(rightMirror!="0"){
              rightMirrorList.push("只能选0")
            }
          }else{
            if(rightMirror != "1" && rightMirror != "-1" && rightMirror != "2" && rightMirror != "9" ){
              rightMirrorList.push("请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，未测试：9")
            }
          }
        }else{
          rightMirrorList.push("格式有误,请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，未测试：9")
        }
      }else{
        rightMirrorList.push("请先填写视力")
      }

      if(vm.numCheck(leftMirror)){
        if(vm.numCheck(leftLight)){
          if(leftMirror=="1" && leftLight !="2"){
            leftLightList.push("只能选2")
          }
          if(leftMirror=="-1" && leftLight !="1"){
            leftLightList.push("只能选1")
          }
          if(leftMirror=="0" && leftLight !="0"){
            leftLightList.push("只能选0")
          }
          if(leftMirror=="2" && leftLight !="3"){
            leftLightList.push("只能选3")
          }
          if(leftMirror=="9" && leftLight !="9"){
            leftLightList.push("只能选9")
          }
        }else{
          leftLightList.push("格式有误,请选择以下数字编码中的一个：正常：0；近视：1；远视：2；其他：3；未测试：9")
        }
      }else{
        leftLightList.push("请先选择串镜")
      }

      if(vm.numCheck(rightMirror)){
        if(vm.numCheck(rightLight)){
          if(rightMirror=="1" && rightLight !="2"){
            rightLightList.push("只能选2")
          }
          if(rightMirror=="-1" && rightLight !="1"){
            rightLightList.push("只能选1")
          }
          if(rightMirror=="0" && rightLight !="0"){
            rightLightList.push("只能选0")
          }
          if(rightMirror=="2" && rightLight !="3"){
            rightLightList.push("只能选3")
          }
          if(rightMirror=="9" && rightLight !="9"){
            rightLightList.push("只能选9")
          }
        }else{
          rightLightList.push("格式有误,请选择以下数字编码中的一个：正常：0；近视：1；远视：2；其他：3；未测试：9")
        }
      }else{
        leftMirrightLightListrorList.push("请先选择串镜")
      }
      if(leftVisionList.length>0){
        text+="<p>左眼裸眼视力:"
        for(let aa of leftVisionList){
          text+=aa;
        }
         text+="</p>"
      }
      if(rightVisionList.length>0){
        text+="<p>右眼裸眼视力:"
        for(let aa of rightVisionList){
          text+=aa;
        }
         text+="</p>"
      }
      if(leftMirrorList.length>0){
        text+="<p>左眼串镜:"
        for(let aa of leftMirrorList){
          text+=aa;
        }
         text+="</p>"
      }
      if(rightMirrorList.length>0){
        text+="<p>右眼串镜:"
        for(let aa of rightMirrorList){
          text+=aa;
        }
         text+="</p>"
      }
      if(leftLightList.length>0){
        text+="<p>左眼屈光:"
        for(let aa of leftLightList){
          text+=aa;
        }
         text+="</p>"
      }
      if(rightLightList.length>0){
        text+="<p>右眼屈光:"
        for(let aa of rightLightList){
          text+=aa;
        }
         text+="</p>"
      }
      return text
    },
    checkVisionValuet(row){
      var vm=this;
      let leftVision=row.leftVision;
      let leftMirror=row.leftMirror;
      let leftLight=row.leftLight;
      let rightVision=row.rightVision;
      let rightMirror=row.rightMirror;
      let rightLight=row.rightLight;
      let leftVisionList=[];
      let leftMirrorList=[];
      let leftLightList=[];
      let rightVisionList=[];
      let rightMirrorList=[];
      let rightLightList=[];
      if(vm.numCheck(leftVision)){
                if(leftVision<3 || leftVision>5.3){
                    leftVisionList.push("超出范围，值必须在3.0~5.3范围内")
                  }else{
                      if(vm.decemalCheck(leftVision,1)){

                      }else{
                          leftVisionList.push("格式有误，保留一位有效数字")
                      }
                  }
      }else{
            leftVisionList.push("格式有误,数值范围在3.0~5.3之间，且保留一位有效数字;")
      }
      if(vm.numCheck(rightVision)){
                if(rightVision<3 || rightVision>5.3){
                    rightVisionList.push("超出范围，值必须在3.0~5.3范围内；")
                  }else{
                      if(vm.decemalCheck(rightVision,1)){

                      }else{
                          rightVisionList.push("格式有误，保留一位有效数字；")
                      }
                  }
      }else{
            rightVisionList.push("格式有误,数值范围在3.0~5.3之间，且保留一位有效数字;")
      }
      if(vm.numCheck(leftVision)){
        if(vm.numCheck(leftMirror)){
          if(leftVision>=5){
            if(leftMirror!="0"){
              leftMirrorList.push("只能选0；")
            }
          }else{
            if(leftMirror != "1" && leftMirror != "-1" && leftMirror != "2" && leftMirror != "9" ){
              leftMirrorList.push("请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，正常：0，未测试：9")
            }
          }
        }else{
          leftMirrorList.push("格式有误,请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，未测试：9")
        }
      }else{
        leftMirrorList.push("请先填写视力;")
      }
      if(vm.numCheck(rightVision)){
        if(vm.numCheck(rightMirror)){
          if(rightVision>=5){
            if(rightMirror!="0"){
              rightMirrorList.push("只能选0；")
            }
          }else{
            if(rightMirror != "1" && rightMirror != "-1" && rightMirror != "2" && rightMirror != "9" ){
              rightMirrorList.push("请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，正常：0，未测试：9")
            }
          }
        }else{
          rightMirrorList.push("格式有误,请选择以下数字编码中的一个：上升：1，下降：-1，其他：2，未测试：9")
        }
      }else{
        rightMirrorList.push("请先填写视力；")
      }

      if(vm.numCheck(leftMirror)){
        if(vm.numCheck(leftLight)){
          if(leftMirror=="1" && leftLight !="2"){
            leftLightList.push("只能选2；")
          }
          if(leftMirror=="-1" && leftLight !="1"){
            leftLightList.push("只能选1；")
          }
          if(leftMirror=="0" && leftLight !="0"){
            leftLightList.push("只能选0；")
          }
          if(leftMirror=="2" && leftLight !="3"){
            leftLightList.push("只能选3；")
          }
          if(leftMirror=="9" && leftLight !="9"){
            leftLightList.push("只能选9；")
          }
        }else{
          leftLightList.push("格式有误,请选择以下数字编码中的一个：正常：0；近视：1；远视：2；其他：3；未测试：9")
        }
      }else{
        leftLightList.push("请先选择串镜；")
      }

      if(vm.numCheck(rightMirror)){
        if(vm.numCheck(rightLight)){
          if(rightMirror=="1" && rightLight !="2"){
            rightLightList.push("只能选2；")
          }
          if(rightMirror=="-1" && rightLight !="1"){
            rightLightList.push("只能选1；")
          }
          if(rightMirror=="0" && rightLight !="0"){
            rightLightList.push("只能选0；")
          }
          if(rightMirror=="2" && rightLight !="3"){
            rightLightList.push("只能选3；")
          }
          if(rightMirror=="9" && rightLight !="9"){
            rightLightList.push("只能选9；")
          }
        }else{
          rightLightList.push("格式有误,请选择以下数字编码中的一个：正常：0；近视：1；远视：2；其他：3；未测试：9")
        }
      }else{
        leftMirrightLightListrorList.push("请先选择串镜；")
      }
      if(leftVisionList.length>0){
        return false
      }
      if(rightVisionList.length>0){
        return false
      }
      if(leftMirrorList.length>0){
        return false
      }
      if(rightMirrorList.length>0){
        return false
      }
      if(leftLightList.length>0){
       return false
      }
      if(rightLightList.length>0){
       return false
      }
      return true
    },
    checkBySchoolTestIdAndResultValue(schoolTestId,resultValue){
        var vm=this;
        if(schoolTestId==1){
            if(vm.numCheck(resultValue)){
                if(resultValue<50 || resultValue>200){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,1)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==12){
            if(vm.numCheck(resultValue)){
                if(resultValue<10 || resultValue>200){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,2)){
                        return false
                    }else{
                       return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==2){
            if(vm.numCheck(resultValue)){
                if(resultValue<500 || resultValue>9999){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
               return true
            }
        }else if(schoolTestId==3){
            if(vm.numCheck(resultValue)){
                if(resultValue<5 || resultValue>20){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,2)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==4){
            if(vm.numCheck(resultValue)){
                if(resultValue<-30 || resultValue>40){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,1)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                 return true
            }
        }else if(schoolTestId==5){
            if(vm.numCheck(resultValue)){
                if(resultValue<0 || resultValue>300){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==6){
            if(vm.numCheck(resultValue)){
                if(resultValue<0 || resultValue>99){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==7){
            if(vm.numCheck(resultValue)){
                if(resultValue<60 || resultValue>420){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==8){
            if(vm.numCheck(resultValue)){
                if(resultValue<50 || resultValue>400){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==9){
            if(vm.numCheck(resultValue)){
                if(resultValue<0 || resultValue>99){
                   return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                       return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==10){
            if(vm.numCheck(resultValue)){
                if(resultValue<60 || resultValue>600){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }else if(schoolTestId==11){
            if(vm.numCheck(resultValue)){
                if(resultValue<60 || resultValue>600){
                    return true
                }else{
                    if(vm.decemalCheck(resultValue,0)){
                        return false
                    }else{
                        return true
                    }
                }
            }else{
                return true
            }
        }
        return true
    },
    baseSubmit() {
      var vm=this;
      vm.submitStatus=true
      let result=vm.resultData;
      vm.errorNum=0;
      vm.index=0 
      vm.submitPercent=0;    
      if(vm.dateType==2){
        vm.saveStudentVision(vm.index);
      }else{
        vm.saveResult(vm.index);
      }
      
    },
    saveResult(index){
      var vm=this;
      let result=vm.resultData;
      let per=Math.ceil(100/result.length);
      if(index+1>result.length){
        vm.submitStatus=false
        if(vm.errorNum>0){
          this.$Message.info("部分数据有误，请检查！");
        }
        vm.search(vm.schoolIds)
        return;
      }
      let value = result[index].newResultValue;
      let schoolTestId=result[index].schoolTestId;
      if(this.checkBySchoolTestIdAndResultValue(schoolTestId,value)){
          this.submitPercent+=per;
          vm.saveResult(index+1);
          return;
      }
      let params = {
          schoolId:result[index].schoolId,
          schoolTestId: schoolTestId,
          studentId:  result[index].studentId,
          resultValue: value,
          teacherId: sessionStorage.getItem("teacherId"),
          yearSemester:sessionStorage.getItem('yearSemester')
        };
      this.$axios.post("/v1/test/edit/saveStudentTestValue", params).then(res => {
                this.submitPercent+=per;
                if (res.data.code == 10000) {

                } else {
                  vm.errorNum+=1;
                }
                vm.saveResult(index+1);
              });
      
    },
    saveStudentVision(index) {
      var vm = this;
      let result=vm.resultData;
      let per=Math.ceil(100/result.length);

      if(index+1>result.length){
        vm.submitStatus=false
        if(vm.errorNum>0){
          this.$Message.info("部分数据有误，请检查！");
        }
        vm.search(vm.schoolIds)
        return;
      }
      let student = result[index];

      if (student.exemptStatus=="1") {
        this.submitPercent+=per;
          vm.saveStudentVision(index+1);
          return;
      }

      if (!vm.checkVisionValuet(student)) {
        this.submitPercent+=per;
          vm.saveStudentVision(index+1);
          return;
      }
      
      let paramData = {
        "glassesWearer": '',
        "leftAxis": '',
        "leftBall": '',
        "leftColumn": '',
        "leftLight": student.leftLight,
        "leftMirror": student.leftMirror,
        "leftVision": student.leftVision,
        "rightAxis": '',
        "rightBall": '',
        "rightColumn": '',
        "rightLight": student.rightLight,
        "rightMirror": student.rightMirror,
        "rightVision": rightVision,
        "schoolId": '',
        "schoolTestId": 13,
        "visionId": 0,
        "studentId": student.studentId,
        "teacherId": '',
        "yearSemester": sessionStorage.getItem('yearSemester')
      };
      
        api.addVisionResult(paramData).then(res => {
            this.submitPercent+=per;
            if (res.data.code == 10000) {
              } else {
                vm.errorNum+=1;
              }
              vm.saveStudentVision(index+1);
        })
    },
    
    numCheck(num){
      num=num.toString()
        var regPos =  /^-?\d+\.?\d*$/; 
        if(null == num || ""==num || undefined==num){
            return false
        }
        if(num.indexOf(".")==-1){
            if(regPos.test(num)){
                return true;
            }else{
                return false;
            }
        }else{
            var index = num.indexOf(".") + 1; // 小数位置
            var count = num.length - index; // 获取小数点后的位数
            if(count<1){
                return false;
            }else{
                if(regPos.test(num)){
                return true;
                }else{
                    return false;
                }
            }
        }
    },
    decemalCheck(resultValue,num){
      resultValue=resultValue.toString()
        if(resultValue.indexOf(".")==-1){
            return true;
        }
        var index = resultValue.indexOf(".") + 1; // 小数位置
        var count = resultValue.length - index; // 获取小数点后的位数
                // 判断是不是大于num位小数
                if(count > num){
                  return false;
                }else{
                   return true;
                }
    },
    visionChange(studentInfo,index,newResultValue,type){
      var vm=this;
      let standList = []
      if(type=="1"){
        vm.resultData[index].leftVision=newResultValue;
      }else{
        vm.resultData[index].rightVision=newResultValue;
      }
      this.$forceUpdate();
    },
    mirrorChange(studentInfo,index,newResultValue,type){
      var vm=this;
      if(type=="1"){
        vm.resultData[index].leftMirror=newResultValue;
      }else{
        vm.resultData[index].rightMirror=newResultValue;
      }
      this.$forceUpdate();
    },
    lightChange(studentInfo,index,newResultValue,type){
      var vm=this;
      if(type=="1"){
        vm.resultData[index].leftLight=newResultValue;
      }else{
        vm.resultData[index].rightLight=newResultValue;
      }
      this.$forceUpdate();
    },
    paramsCheck() {
      var vm = this;
      let schoolIds = JSON.parse(sessionStorage.getItem("nationReportDetail-fixErrorData-schoolIds"));
      vm.schoolIds = JSON.parse(sessionStorage.getItem("nationReportDetail-fixErrorData-schoolIds"));
      vm.schoolTestName = sessionStorage.getItem("fixErrorData-selectTabName");
      if(vm.schoolTestName){
          for (var i = 0; i < vm.schoolTestList.length; i++) {
                if (vm.schoolTestName == vm.schoolTestList[i].name) {
                vm.dateType = vm.schoolTestList[i].value;
                }
            }
      }else{
          vm.schoolTestName="体测项目";
          vm.dateType="1"
      }
      vm.submitPercent=0
      vm.search(JSON.parse(sessionStorage.getItem("nationReportDetail-fixErrorData-schoolIds")))
     
    },
  },
  mounted() {
    var vm = this;
    vm.paramsCheck();
  },
  watch: {
    dateType:function(){
      var vm=this;
      if(vm.dateType=="1"){
          vm.resultColumns=vm.baseColumns
      }else{
          vm.resultColumns=vm.vision
      }
        
      
    }
  },
};
</script>
