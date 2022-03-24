<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">项目数据查询</h2>
    </div>
    <div>
      <Card :dis-hover="true">
       <div class="top-search">
         <div class="left-input">
           <div>
             <span>年级：</span>
              <Select  v-model="gradeId"   style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.gradeId" :key="item.gradeId">{{ item.label }}</Option>
              </Select>
           </div>
           <div>
              <span style="margin-left:20px;" >性别：</span>
              <Select  v-model="gender"   style="width:120px;">
                <Option v-for="item in genderList" :value="item.gender" :key="item.gender">{{ item.name }}</Option>
              </Select>
           </div>
            
         </div>
          <div class="right-btns">
            <Button type="success" style=""  @click="getGradeExamItemClassTestList">查询</Button>
              <Button type="success"   @click="exportSchoolTestData">导出EXCEL</Button>
          </div>
        </div>
      </Card>
      <br>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
          <TabPane :name="classTest.classTestName" :label="classTest.classTestName" v-for="classTest in classTestList" :key="classTest.classTestId">
          </TabPane>
        </Tabs>
      <div>
        <Card :dis-hover="true">
          <div style="font-size:18px;height:40px;"> 数据概览</div>
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card :dis-hover="true">
          <div style="font-size:18px;height:40px;"> 数据明细</div>
          <Row>
            <div style="">
              <Table border max-height="400" :loading="loading" :columns="classColumns" :data="classData"></Table>
            </div>
          </Row>
        </Card>
      </div>
      <div :style="{marginTop:'20px'}">
        <Card>
          <div style="font-size:20px;height:40px;">
              数据分析
          </div>
          <div :style="{backgroundColor:'#FFFFFF'}">
            <Row :style="{textAlign:'center'}">
              <div v-if="classTestId>0" id="myChart1" :style="{width: '40%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div>
              <!-- <div id="myChart2" :style="{width: '40%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div> -->
            </Row>
          </div>
        </Card>
      </div>
      <div :style="{marginTop:'10px'}">
        <Card :dis-hover="true">
          <div style="font-size:20px;height:40px;">
              平均成绩
          </div>
          <div v-if="classTestId>0" id="myChart3" :style="{width: '100%', height: '400px'}"></div>
        </Card>
      </div>
      <div :style="{marginTop:'10px'}">
        <Card :dis-hover="true">
          <div style="font-size:20px;height:40px;">
              平均得分
          </div>
          <div v-if="classTestId>0" id="myChart5" :style="{width: '100%', height: '400px'}"></div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
        selectTabName:'',
      schoolId:'',
      loading:false,
      myChart1:null,
      option1:{},
      myChart2:null,
      option2:{},
      myChart3:null,
      option3:{},
      option4:{},
      myChart5:null,
      option5:{},
      primaryList:[
        {gradeId: 1,label:'一年级'},
        {gradeId: 2,label:'二年级'},
        {gradeId: 3,label:'三年级'},
        {gradeId: 4,label:'四年级'},
        {gradeId: 5,label:'五年级'},
        {gradeId: 6,label:'六年级'},
      ],
      middleList:[
        {gradeId: 7,label:'七年级'},
        {gradeId: 8,label:'八年级'},
        {gradeId: 9,label:'九年级'},
      ],
      highList:[
        {gradeId:10,label:'高一'},
        {gradeId: 11,label:'高二'},
        {gradeId: 12,label:'高三'},
      ],
      gradeId:'',
      schoolGradeList:[],
      gender:"3",
      genderList:[
          {
              gender:"1",
              name:"男"
          },
           {
              gender:"2",
              name:"女"
          },
           {
              gender:"3",
              name:"全部"
          },
      ],
      classTestList:[],
      classTestId:'',
      resultColumns:[
        {
          title: '总人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,
        },
        {
          title: '考核项目',
          key: 'classTestName',
          align: 'center',
                    minWidth:100,

        },
        {
          title: '已完成/考核总人数',
          key: 'examOverCount',
          align: 'center',
                    minWidth:100,

          render: (h, params) => {
            return h('div', params.row.finishStudent+'/'+params.row.examStudentNum)
          }
        },
        {
          title: '免试人数',
          key: 'exemptStudent',
          align: 'center',
          minWidth:100,

        },
        {
          title: '平均成绩',
          key: 'averageResult',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            if(params.row.examUnit && params.row.averageResult && params.row.examUnit == "分.秒"){
                let datashow = params.row.averageResult;
                datashow = Number(datashow).toFixed(0);
                let temp  = Number(datashow)%60>0?(Math.floor(Number(datashow)/60)+'\''+(Number(datashow)%60)+'\"'):Number(datashow)/60+'\'';
                return h('div', temp)
            }else{
                return h('div', params.row.averageResult)
            }
          }
        },
        {
          title: '平均得分',
          key: 'averageScore',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            let temp = params.row.averageScore;
            if(temp != null){
              temp = Number(temp).toFixed(2);
            }
            return h('div', temp)
          }
        },
      ],
      resultData:[],
      classColumns:[
        {
          title: '总人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,

        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,

           render: (h, params) => {
            return h('div', params.row.studentClass+'班')
          }
        },
        {
          title: '考核项目',
          key: 'classTestName',
          align: 'center',
                    minWidth:100,

          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list.length>0){
                  for(let i=0;i<list.length;i++){
                      let data=list[i];
                        text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                          text+="<p>"+data.classTestName+"</p></div>"
                  }
              }else{
                  text+="<p>"+row.classTestName+"</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: '已完成/考核总人数',
          key: 'examOverCount',
          align: 'center',
                    minWidth:100,

          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list.length>0){
                  for(let i=0;i<list.length;i++){
                      let data=list[i];
                        text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                          text+="<p>"+data.finishStudent+"/"+data.examStudent+"</p></div>"
                  }
              }else{
                  text+="<p>"+row.finishStudent+"/"+row.examStudent+"</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: '免试人数',
          key: 'exemptStudent',
          align: 'center',
          minWidth:100,


        },
        {
          title: '平均成绩',
          key: 'averageResult',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list.length>0){
                  for(let i=0;i<list.length;i++){
                      let data=list[i];
                        text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        let temp = data.averageResultShow==undefined?"":data.averageResultShow;
                        text+="<p>"+temp+"</p></div>"
                  }
              }else{
                  let temp = row.averageResultShow;
                  text+="<p>"+temp+"</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: '平均得分',
          key: 'averageScore',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list.length>0){
                  for(let i=0;i<list.length;i++){
                      let data=list[i];
                        text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                          text+="<p>"+data.averageScore+"</p></div>"
                  }
              }else{
                  text+="<p>"+row.averageScore+"</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
      ],
      classData:[],
      scorexAxisData:[],
      scoreseriesData:[],
      passSeriesData:[],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
      selectTabs(name){
      this.selectTabName = name;
      sessionStorage.setItem('examQueryExamClassTest-selectTabName',this.selectTabName);
      this.getGradeExamItemClassTestList()
    },
    pageToList() {
      this.$router.go(-1)
    },
    drawGenSLine(data) {
      var vm = this;
      vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      vm.myChart1.setOption(vm.option1)
      let exemptStudent=0;
      let finishStudent=0;
      let notJoinStudent=0;
      let notFinishStudent=0;

      if(data){
         exemptStudent=data.exemptNum;
       finishStudent=data.finishNum;
       notJoinStudent=data.notJoinNum;
       notFinishStudent=data.notFinishNum;
      }

      vm.option1 = {
          title : {
              text: '考试情况图形分布',
              subtext: '',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} :  {d}%"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['免试人数','完成人数','未参加人数','已参加未完成人数']
          },
          series : [
              {
                  name: '占比',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:exemptStudent, name:'免试人数'},
                      {value:finishStudent, name:'完成人数'},
                      {value:notJoinStudent, name:'未参加人数'},
                      {value:notFinishStudent, name:'已参加未完成人数'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal:{
                            color:function(params) {
                            var colorList = [
                                    '#4fa995', '#f1d776', '#e99954','red',
                                ];
                                return colorList[params.dataIndex]
                              }
                          }
                  },
                  label:{
                      show: true,
                      formatter:'{b} : ({d}%)'
                  },
              }
          ]
      };
      vm.myChart1.setOption(vm.option1,true)
    },
    // drawGenSLine2(data) {
    //   var vm = this;
    //   vm.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
    //   vm.myChart2.setOption(vm.option2)
    //   let excellentNum=0;
    //   let goodNum=0;
    //   let passNum=0;
    //   let notPassNum=0;
    //   if(data){
    //      excellentNum=data.excellentNum;
    //       goodNum=data.goodNum;
    //       passNum=data.passNum;
    //       notPassNum=data.notPassNum;
    //   }


    //   vm.option2 = {
    //       title : {
    //           text: '等级情况图形分布',
    //           subtext: '',
    //           x:'center'
    //       },
    //       tooltip : {
    //           trigger: 'item',
    //           formatter: "{a} <br/>{b} : {d}%"
    //       },
    //       legend: {
    //           orient: 'vertical',
    //           left: 'left',
    //           data: ['优秀数','良好数','及格数','不及格数']
    //       },
    //       series : [
    //           {
    //               name: '占比',
    //               type: 'pie',
    //               radius : '55%',
    //               center: ['50%', '60%'],
    //               data:[
    //                   {value:excellentNum , name:'优秀数',itemStyle:{}},
    //                   {value:goodNum , name:'良好数'},
    //                   {value:passNum , name:'及格数'},
    //                   {value:notPassNum, name:'不及格数'}
    //               ],
    //               itemStyle: {
    //                   emphasis: {
    //                       shadowBlur: 10,
    //                       shadowOffsetX: 0,
    //                       shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                   },
    //                   normal:{
    //                     color:function(params) {
    //                     var colorList = [
    //                            '#4abce4','#699bc9','#bdd685','#95c685'
    //                         ];
    //                         return colorList[params.dataIndex]
    //                       }
    //                   }
    //               },
    //               label:{
    //                   show: true,
    //                   formatter:'{b} : ({d}%)'
    //               },
    //           }
    //       ]
    //   };
    //   vm.myChart2.setOption(vm.option2)
    // },
    drawBar1() {
      var vm = this;
      vm.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      vm.myChart3.setOption(vm.option3)
      let data=vm.classData;
      let chartData=[];
      let leftData=[];
      let legend=[];
      let serieData=[];
      if(data){
        for(var j=0;j<data.length;j++){
          let classInfo=data[j];
          leftData.push(classInfo.studentClass+''+'班')

          if(classInfo.list.length==0){
            let yname= "";
            if(classInfo.examUnit=="分.秒"){
                yname='m\'s\"'
            }
            if(j==0){
                let chart={
                      name: "",
                      type: 'bar',
                      barWidth:30,
                      label: {
                          normal: {
                              show: true,
                              position: 'top',
                              formatter: (params) => {
                                if(yname=='m\'s\"'){
                                    return String(params.data).replace('.','\'')+'\"';
                                }else{
                                    return String(params.data) + classInfo.examUnit;
                                }
                              }
                          }
                      },
                      data:[],
                  };
                chart.name=classInfo.classTestName;
                chart.data.push(classInfo.averageResult?classInfo.averageResult:0)
                serieData.push(chart);
                legend.push(classInfo.classTestName)
            }else{
                for(let k=0;k<serieData.length;k++){
                  let charts=serieData[k];
                  if(charts.name==classInfo.classTestName){
                    charts.data.push(classInfo.averageResult?classInfo.averageResult:0)
                  }
                }
            }
          }else{
            for(var i =0;i<classInfo.list.length;i++){
            let examInfo=classInfo.list[i];
            let yname= "";
            if(examInfo.examUnit=="分.秒"){
                yname='m\'s\"'
            }
              if(j==0){
                let chart={
                      name: "",
                      type: 'bar',
                      barWidth:30,
                      label: {
                          normal: {
                              show: true,
                              position: 'top',
                              formatter: (params) => {
                                if(yname=='m\'s\"'){
                                    return String(params.data).replace('.','\'')+'\"';
                                }else{
                                    params.data;
                                }
                              }
                          }
                      },
                      data:[],
                  };
                chart.name=examInfo.classTestName;
                chart.data.push(examInfo.averageResult?examInfo.averageResult:0)
                serieData.push(chart);
                legend.push(examInfo.classTestName)
              }else{
                for(let k=0;k<serieData.length;k++){
                  let charts=serieData[k];
                  if(charts.name==examInfo.classTestName){
                    charts.data.push(examInfo.averageResult?examInfo.averageResult:0)
                  }
                }
              }
            }
          }
        }

      }
      vm.option3 = {
            title: {
                text: '',
            },
              legend: {
                  data: legend.length>0?legend:[],
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      data :  leftData.length>0?leftData:[],
                      name:'班级'
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      name:''
                  },
              ],
              series : serieData.length>0?serieData:[],
          };
      vm.myChart3.setOption(vm.option3,true)
    },
    drawBar2() {
      var vm = this;
      vm.myChart5 = this.$echarts.init(document.getElementById("myChart5"));
      vm.myChart5.setOption(vm.option5)
      let data=vm.classData;
      let chartData=[];
      let leftData=[];
      let legend=[];
      let serieData=[];
      if(data){
        for(var j=0;j<data.length;j++){
          let classInfo=data[j];
          leftData.push(classInfo.studentClass+''+'班')

          if(classInfo.list.length==0){
            if(j==0){
                let chart={
                      name: '',
                      type: 'bar',
                      barWidth:30,
                      label: {
                          normal: {
                              show: true,
                              position: 'top'
                          }
                      },
                      data:[],
                  };
                chart.name=classInfo.classTestName;
                chart.data.push(classInfo.averageScore?classInfo.averageScore:0)
                serieData.push(chart);
                legend.push(classInfo.classTestName)
            }else{
                for(let k=0;k<serieData.length;k++){
                  let charts=serieData[k];
                  if(charts.name==classInfo.classTestName){
                    charts.data.push(classInfo.averageScore?classInfo.averageScore:0)
                  }
                }
            }
          }else{
            for(var i =0;i<classInfo.list.length;i++){
            let examInfo=classInfo.list[i];
              if(j==0){
                let chart={
                      name: '',
                      type: 'bar',
                      barWidth:30,
                      label: {
                          normal: {
                              show: true,
                              position: 'top'
                          }
                      },
                      data:[],
                  };
                chart.name=examInfo.classTestName;
                chart.data.push(examInfo.averageScore?examInfo.averageScore:0)
                serieData.push(chart);
                legend.push(examInfo.classTestName)
              }else{
                for(let k=0;k<serieData.length;k++){
                  let charts=serieData[k];
                  if(charts.name==examInfo.classTestName){
                    charts.data.push(examInfo.averageScore?examInfo.averageScore:0)
                  }
                }
              }

            }
          }

        }

      }
      vm.option5 = {
            title: {
                text: '',
            },
              legend: {
                  data:legend.length>0?legend:[]
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      data :  leftData.length>0?leftData:[],
                      name:'班级'
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      name:''
                  }
              ],
              series :  serieData.length>0?serieData:[],
          };
      vm.myChart5.setOption(vm.option5,true)
    },
    

    getGradeExamItemClassTestList() {
      var vm = this;
      vm.selectTabName=""
      vm.loading = true;
      this.$axios.get('/v1/examItemTest/getGradeExamItemClassTestList?gradeId='+vm.gradeId+'&gender='+vm.gender)
        .then(res => {
          vm.loading = false;
        if (res.data.code == 10000) {
          let data=res.data.response
          vm.classTestList=data;
          if(data && data.length>0){
            if(sessionStorage.getItem('examQueryExamClassTest-selectTabName')){
                vm.selectTabName=sessionStorage.getItem('examQueryExamClassTest-selectTabName')
            }else{
                vm.selectTabName=data[0].classTestName
            }
          }
          console.log(vm.selectTabName)
          this.search()

        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getChartTotalInfo() {
      var vm = this;
      vm.loading = true;
      this.$axios.get('/v1/examItemTest/getChartTotalInfo?gradeId='+vm.gradeId+'&classTestId='+vm.classTestId+'&gender='+vm.gender)
        .then(res => {
          vm.loading = false;
        if (res.data.code == 10000) {
          let data=res.data.response
          vm.drawGenSLine(data);
          //  vm.drawGenSLine2(data);
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    exportSchoolTestData(){
      var vm=this;
      if(typeof(vm.gradeId) == "undefined"){
                    vm.gradeId="";
                }
                 if(typeof(vm.classTestId) == "undefined"){
                    vm.classTestId="";
                }
                if(typeof(vm.gender) == "undefined"){
                    vm.gender="";
                }
      let url =
        this.$axios.defaults.baseURL +
        '/v1/examItemTest/exportClassTestData?gradeId='+vm.gradeId+'&classTestId='+vm.classTestId+'&gender='+vm.gender+
        '&token=' +
        sessionStorage.getItem('token')
      window.open(url)
    },
    search(){
     var vm=this;
     vm.resultData=[];vm.classData=[]
     vm.option1={};
     vm.option2={};
     vm.option3={};
     vm.option4={};
     vm.option5={};

     vm.myChart1=null;
     vm.myChart2=null;
     vm.myChart3=null;
     vm.myChart5=null;
     vm.classTestId=''
    for(let i=0;i<this.classTestList.length;i++){
          if(this.selectTabName==this.classTestList[i].classTestName){
              vm.classTestId=this.classTestList[i].classTestId
          }
      }
      console.log(vm.classTestId)
      if(!vm.classTestId){
        return
      }

     vm.getChartTotalInfo();

      this.$axios.get('/v1/examItemTest/getClassTestDetailList?gradeId='+vm.gradeId+'&classTestId='+vm.classTestId+'&gender='+vm.gender)
      .then(res => {
       if (res.data.code == 10000) {
           
           let data= res.data.response
           if(data.length>0){
               let examItemNum=data[0].list?data[0].list.length:1;
                //总数据
                    let totalData={};
                    totalData.studentNum=0;
                    totalData.exemptStudent=0;
                    let averageScore=0;
                    let excellentStudent=0;
                    let goodStudent=0;
                    let passStudent=0;
                    let finishStudent=0;
                    let averageResult=0;
                    let examUnit="";
                    for(let i=0;i<data.length;i++){
                        let params=data[i];
                        totalData.studentNum+=(params.studentNum?params.studentNum:0);
                        totalData.classTestName=params.classTestName;
                        totalData.exemptStudent+=(params.exemptStudent?params.exemptStudent:0);
                        excellentStudent+=(params.excellentStudent?params.excellentStudent:0);
                        goodStudent+=(params.goodStudent?params.goodStudent:0);
                        passStudent+=(params.passStudent?params.passStudent:0);

                        let totalSingleFinish=(params.finishStudent?params.finishStudent:0);
                        finishStudent+=totalSingleFinish;
                        averageResult+=(params.averageResult?params.averageResult*totalSingleFinish:0);
                        averageScore+=(params.averageScore?params.averageScore*totalSingleFinish:0);

                        //详情数据
                        let classData={};
                        classData.studentNum=0;
                        classData.exemptStudent=0;
                        classData.averageScore=0;
                        classData.excellentStudent=0;
                        classData.goodStudent=0;
                        classData.passStudent=0;
                        classData.finishStudent=0;

                        classData.studentNum=params.studentNum?params.studentNum:0;
                        classData.studentClass=params.studentClass;
                        classData.exemptStudent=params.exemptStudent;
                        classData.list=[];

                        if(examItemNum>1){
                            let classList=params.list;
                            let classTotal={
                                classTestName:params.classTestName,
                                examUnit:params.examUnit,
                                finishStudent:params.finishStudent,
                                examStudent:params.studentNum-params.exemptStudent,
                                exemptStudent:params.exemptStudent,
                                averageScore:params.averageScore?params.averageScore:'',
                                averageResult:'',
                                excellentPercent:(params.finishStudent?(100*params.excellentStudent/params.finishStudent).toFixed(2):0),
                                goodPercent:params.finishStudent?(100*params.goodStudent/params.finishStudent).toFixed(2):0,
                                passPercent:params.finishStudent?(100*params.passStudent/params.finishStudent).toFixed(2):0,
                                allPassPercent:params.finishStudent?((100*(params.excellentStudent+params.goodStudent+params.passStudent))/params.finishStudent).toFixed(2):0
                            }
                            classData.list.push(classTotal)

                            for(let j=0;j<classList.length;j++){
                                let examItemInfo=classList[j];
                                let temp = examItemInfo.averageResult?examItemInfo.averageResult.toFixed(2):0;
                                let titleShow = examItemInfo.averageResult?examItemInfo.averageResult.toFixed(2):0;
                                if(examItemInfo.averageResult && examItemInfo.examUnit && examItemInfo.examUnit=="分.秒"){
                                     let showInfo = Number(temp).toFixed(0);
                                      titleShow  = Number(showInfo)%60>0?(Math.floor(Number(showInfo)/60)+'\''+(Number(showInfo)%60)+'\"'):Number(showInfo)/60+'\'';
                                      temp = Math.floor(showInfo/60) +'.'+ (Math.floor((showInfo)%60));
                                }
                                let exam={
                                    classTestName:examItemInfo.examItemName+''+'('+examItemInfo.scorePercent/100+'%)',
                                    finishStudent:examItemInfo.finishStudent?examItemInfo.finishStudent:0,
                                    examUnit:examItemInfo.examUnit,
                                    examStudent:examItemInfo.totalStudent-params.exemptStudent,
                                    exemptStudent:params.exemptStudent?params.exemptStudent:0,
                                    averageResult:examItemInfo.averageResult?temp:'',
                                    averageResultShow:examItemInfo.averageResult?titleShow:'',
                                    averageScore:examItemInfo.averageScore?examItemInfo.averageScore.toFixed(2):'',
                                    excellentPercent:(examItemInfo.finishStudent?(100*examItemInfo.excellentStudent/examItemInfo.finishStudent).toFixed(2):0),
                                    goodPercent:examItemInfo.finishStudent?(100*examItemInfo.goodStudent/examItemInfo.finishStudent).toFixed(2):0,
                                    passPercent:examItemInfo.finishStudent?(100*examItemInfo.passStudent/examItemInfo.finishStudent).toFixed(2):0,
                                    allPassPercent:examItemInfo.finishStudent?((100*(examItemInfo.excellentStudent+examItemInfo.goodStudent+examItemInfo.passStudent))/examItemInfo.finishStudent).toFixed(2):0
                                }
                                classData.list.push(exam)
                            }
                        }else{
                            classData.classTestName=params.classTestName;
                            classData.examUnit = params.examUnit;
                            examUnit = params.examUnit;
                            classData.examStudent=params.studentNum-params.exemptStudent,
                            classData.exemptStudent=params.exemptStudent?params.exemptStudent:0;
                            classData.averageScore=params.averageScore?params.averageScore.toFixed(2):0;
                            classData.excellentStudent=params.excellentStudent?params.excellentStudent:0;
                            classData.goodStudent=params.goodStudent?params.goodStudent:0;
                            classData.passStudent=params.passStudent?params.passStudent:0;
                            classData.finishStudent=params.finishStudent?params.finishStudent:0;

                            let temp = params.averageResult?params.averageResult.toFixed(2):0;
                            let titleShow = params.averageResult?params.averageResult.toFixed(2):0;
                            if(params.averageResult && params.examUnit && params.examUnit=="分.秒"){
                                  let showInfo = Number(temp).toFixed(0);
                                  titleShow  = Number(showInfo)%60>0?(Math.floor(Number(showInfo)/60)+'\''+(Number(showInfo)%60)+'\"'):Number(showInfo)/60+'\'';
                                  temp = Math.floor(showInfo/60) +'.'+ (Math.floor((showInfo)%60));
                            }
                            classData.averageResult=params.averageResult?temp:'';
                            classData.averageResultShow=params.averageResult?titleShow:'';
                            classData.excellentPercent=classData.finishStudent?(100*classData.excellentStudent/classData.finishStudent).toFixed(2):0;
                            classData.goodPercent=classData.finishStudent?(100*classData.goodStudent/classData.finishStudent).toFixed(2):0;
                            classData.passPercent=classData.finishStudent?(100*classData.passStudent/classData.finishStudent).toFixed(2):0;
                            classData.allPassPercent=classData.finishStudent?((100*(classData.excellentStudent+classData.goodStudent+classData.passStudent))/classData.finishStudent).toFixed(2):0;
                        }
                        vm.classData.push(classData)
                    }
                    let examStudentNum=totalData.studentNum-totalData.exemptStudent;
                    totalData.examStudentNum=examStudentNum;
                    totalData.finishStudent=finishStudent;
                    if(examItemNum==1){
                      totalData.averageResult=finishStudent?(averageResult/finishStudent).toFixed(2):0;
                      totalData.examUnit=examUnit;
                    }
                    totalData.averageScore=finishStudent?(averageScore/finishStudent).toFixed(2):0;
                    totalData.excellentPercent=finishStudent?(100*excellentStudent/finishStudent).toFixed(2):0;
                    totalData.goodPercent=finishStudent?(100*goodStudent/finishStudent).toFixed(2):0;
                    totalData.passPercent=finishStudent?(100*passStudent/finishStudent).toFixed(2):0;
                    totalData.allPassPercent=finishStudent?((100*(excellentStudent+goodStudent+passStudent))/finishStudent).toFixed(2):0;
                    vm.resultData.push(totalData)
                if(examItemNum>1){
                    for(let j=0;j<examItemNum;j++){
                        let examItemData={};
                        examItemData.studentNum=0;
                        examItemData.exemptStudent=0;
                        let averageScore1=0;
                        let excellentStudent1=0;
                        let goodStudent1=0;
                        let passStudent1=0;
                        let finishStudent1=0;
                        let averageResult1=0;

                        for(let i=0;i<data.length;i++){
                            let params=data[i];
                                examItemData.studentNum+=params.studentNum?params.studentNum:0;
                                examItemData.classTestName=params.list[j].examItemName+''+'('+params.list[j].scorePercent/100+'%)';
                                examItemData.scorePercent=params.list[j].scorePercent/100;
                                examItemData.exemptStudent+=(params.exemptStudent?params.exemptStudent:0);

                                let childFinish=(params.list[j].finishStudent?params.list[j].finishStudent:0);
                                finishStudent1+=childFinish;
                                averageScore1+=(params.list[j].averageScore?params.list[j].averageScore*childFinish:0);
                                averageResult1+=(params.list[j].averageResult?params.list[j].averageResult*childFinish:0);
                                excellentStudent1+=(params.list[j].excellentStudent?params.list[j].excellentStudent:0);
                                goodStudent1+=(params.list[j].goodStudent?params.list[j].goodStudent:0);
                                passStudent1+=(params.list[j].passStudent?params.list[j].passStudent:0);

                        }
                        let examStudentNum1=examItemData.studentNum-examItemData.exemptStudent;
                        examItemData.examStudentNum=examStudentNum1;
                        examItemData.examUnit=data[0].list[j].examUnit;
                        examItemData.finishStudent=finishStudent1;
                        examItemData.averageScore=finishStudent1?(averageScore1/finishStudent1).toFixed(2):0;
                        examItemData.averageResult=finishStudent1?(averageResult1/finishStudent1).toFixed(2):0;
                        examItemData.excellentPercent=finishStudent1?(100*excellentStudent1/finishStudent1).toFixed(2):0;
                        examItemData.goodPercent=finishStudent1?(100*goodStudent1/finishStudent1).toFixed(2):0;
                        examItemData.passPercent=finishStudent1?(100*passStudent1/finishStudent1).toFixed(2):0;
                        examItemData.allPassPercent=finishStudent1?((100*(excellentStudent1+goodStudent1+passStudent1))/finishStudent1).toFixed(2):0;
                        vm.resultData.push(examItemData)
                    }
                }
           }else{
               //无数据的处理
           }
           vm.drawBar1()
           vm.drawBar2()
          //  vm.drawBar3()

        }
     })
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {
    let vm = this;
    let schoolType = sessionStorage.getItem('schoolType')
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
      }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.primaryList
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.middleList
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.highList
      }
      vm.gradeId=vm.schoolGradeList[0].gradeId;
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    vm.getGradeExamItemClassTestList();
  }
}
</script>
