<style>
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体测数据监控</h2>
    </div>
    <div>
      <Card :dis-hover="true">
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>区<span style="visibility: hidden;">占位</span>域：</span>
              <Select v-model="region" style="width:120px;" disabled>
                <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>学校类型：</span>
              <Select v-model="schoolType" style="width:120px;">
                <Option v-for="item in schoolTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>性<span style="visibility: hidden;">占位</span>别：</span>
              <Select v-model="gender" style="width:120px;">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"  @click="getSchoolData">查询</Button>
          </div>
        </div>
      </Card>
      <br>
      <div>
        <Card>
          <div style="font-size:18px;height:40px;"> 数据预览</div>
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </Card> 
      </div>
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 数据预览</div>
          <Row>
            <div style="">
              <Table border :loading="loading" :columns="resultColumns1" :data="resultData1" :maxHeight="!tableHeight?'auto':'600'"></Table>
            </div>
            <br>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 数据分析</div>
          <Row>
            <div class="normalPie" style="display:flex;justify-content: space-between;padding:30px 0">
              <div id="chart1" :style="{width:'49.5%',height: '300px'}"></div>
              <div id="verticleSlot" style="width:2px;height:320px;background:#eee"></div>
              <div id="chart2" :style="{width:'49.5%',height: '300px'}"></div>
            </div>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 平均分</div>
          <Row>
              <div id="chart3" :style="{width:'100%',height: '400px'}"></div>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 优良率</div>
          <Row>
              <div id="chart4" :style="{width:'100%',height: '400px'}"></div>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 合格率</div>
          <Row>
              <div id="chart5" :style="{width:'100%',height: '400px'}"></div>
          </Row>
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
      tableHeight:false,
      loading:false,
      region:'999',
      regionList:[
        
      ],
      schoolType:'99',
      schoolTypeList:[
        {
            label:"全部",
            value:"99"
        },
        {
            label:"小学学段",
            value:"2"
        },
        {
            label:"初中学段",
            value:"3"
        },
        {
            label:"高中学段",
            value:"4"
        },
      ],
      gender:'3',
      genderList:[
          {
              label:"男",
              value:"1"
          },
          {
              label:"女",
              value:"2"
          },
          {
              label:"全部",
              value:"3"
          }
      ],
      resultColumns:[
        {
          title: '区域',
          key: 'countryName',
          align: 'center',
        },
        {
          title: '学校总数',
          key: 'schoolNum',
          align: 'center',
        },
        {
          title: '学生总人数',
          key: 'totalStudent',
          align: 'center',
        },
        {
          title: '完成测试/测试总人数',
          key: 'finishStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.finishStudent}/${params.row.totalStudent -params.row.exemptStudent }`
            return h('div', text)
          }
        },
        {
          title: '免试人数',
          key: 'exemptStudent',
          align: 'center',
        },
        {
          title: '平均分',
          key: 'totalScore',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = params.row.finishStudent == 0? params.row.finishStudent : Math.floor(params.row.totalScore/params.row.finishStudent)
            return h('div', text)
          }
        },
        {
          title: '优秀率',
          key: 'excellentStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.excellentStudent == 0? params.row.excellentStudent : Math.floor(params.row.excellentStudent/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '良好率',
          key: 'goodStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.goodStudent == 0 ? params.row.goodStudent : Math.floor(params.row.goodStudent/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '及格率',
          key: 'passCount',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.passStudent ==0?params.row.passStudent:Math.floor(params.row.passStudent/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '优良率',
          key: 'passStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.finishStudent==0?params.row.finishStudent:Math.floor((params.row.excellentStudent+params.row.goodStudent)/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '合格率',
          key: 'passStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.finishStudent==0?params.row.finishStudent:Math.floor((params.row.excellentStudent+params.row.goodStudent+params.row.passStudent)/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        }
      ],
      resultData:[],
      resultColumns1:[
        {
          title: '学校类型',
          key: 'schoolType',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text =row.schoolType == 1?'幼儿园':row.schoolType == 2?'小学':row.schoolType == 3?'初中':row.schoolType == 4?'高中':row.schoolType == 5?'大学':'全部';
            return h('div', text)
          }
        },
        {
          title: '学校名称',
          key: 'schoolName',
          align: 'center',
        },
        {
          title: '学生总人数',
          key: 'totalStudent',
          align: 'center',
        },
        {
          title: '完成测试/测试总人数',
          key: 'finishStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.finishStudent}/${params.row.totalStudent -params.row.exemptStudent }`
            return h('div', text)
          }
        },
        {
          title: '免试人数',
          key: 'exemptStudent',
          align: 'center',
        },
        {
          title: '平均分',
          key: 'totalScore',
          align: 'center',
          render: (h, params) => {
            const row = params.row
           const text = params.row.finishStudent == 0? params.row.finishStudent : Math.floor(params.row.totalScore/params.row.finishStudent)
            return h('div', text)
          }
        },
        {
          title: '优秀率',
          key: 'excellentStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.excellentStudent == 0? params.row.excellentStudent : Math.floor(params.row.excellentStudent/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '良好率',
          key: 'goodStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.goodStudent == 0 ? params.row.goodStudent : Math.floor(params.row.goodStudent/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '及格率',
          key: 'passCount',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.passStudent == 0? params.row.passStudent : Math.floor(params.row.passStudent/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '优良率',
          key: 'passCount',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.finishStudent==0?params.row.finishStudent:Math.floor((params.row.excellentStudent+params.row.goodStudent)/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
        {
          title: '合格率',
          key: 'qualifiedCount',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.finishStudent==0?params.row.finishStudent:Math.floor((params.row.excellentStudent+params.row.goodStudent+params.row.passStudent)/params.row.finishStudent*100)}%`
            return h('div', text)
          }
        },
      ],
      resultData1:[],
      colorList: ['#4fa995','#e99954','#e58467','#4abce4','#f1d776','#699bc9','#bdd685','#95c685'],
      chart1Data:{
        exemptStudent:0,
        finishStudent:0,
        notPassStudent:0,
        participateNotPass:0
      },
      chart2Data:{
        excellentStudent:0,
        goodStudent:0,
        passCount:0,
        notPassCount:0,
      },
      chart3Data:{
        xAxisData:[],
        seriesData:[]
      },
      chart4Data:{
        xAxisData:[],
        seriesData:[]
      },
      chart5Data:{
        xAxisData:[],
        seriesData:[]
      },
      count:100,
      barWidth:25
    }
  },
  methods: {
    getSchoolData(){
      let _this = this;
      this.loading=true
      this.$axios
        .get(
          `/v1/schoolUnionOrgan/getSchoolBelongSchoolStatistical?schoolType=${this.schoolType}&gender=${this.gender}`
        )
        .then(res => {
          _this.loading=false
          if(res.data.code == 10000){
            _this.resultData = res.data.response
            if(res.data.response.length>0){
              let chartData=res.data.response[0]
              
              this.regionList.push({
                  label:chartData.countryName,
                  value:'999'
              })  
              let chart1Data={
                exemptStudent:chartData.exemptStudent,
                finishStudent:chartData.finishStudent,
                notPassStudent:chartData.totalStudent-chartData.exemptStudent-chartData.joinStudent,
                participateNotPass:chartData.joinStudent-chartData.finishStudent,
              }
              let chart2Data={
                excellentStudent:chartData.excellentStudent,
                goodStudent:chartData.goodStudent,
                passCount:chartData.passStudent,
                notPassCount:chartData.notPassStudent,
              }
              _this.chart1Data = chart1Data
              _this.chart2Data = chart2Data
            }else{
              let chart1Data={
                exemptStudent:0,
                finishStudent:0,
                notPassStudent:0,
                participateNotPass:0
              };
              let chart2Data={
                excellentStudent:0,
                goodStudent:0,
                passCount:0,
                notPassCount:0,
              }
              _this.chart1Data = chart1Data
              _this.chart2Data = chart2Data
            }
            _this.chart1Fun()
            _this.chart2Fun()
            _this.getAllSchoolStatisticalList()
          }
        })
    },
    getAllSchoolStatisticalList(){
      let _this = this;
      this.loading=true
      this.$axios
        .get(
          `/v1/schoolUnionOrgan/getAllSchoolStatisticalList?schoolType=${this.schoolType}&gender=${this.gender}`
        )
        .then(res => {
          _this.loading=false
          if(res.data.code == 10000){
            _this.resultData1 = res.data.response
            let chart3Data={
                xAxisData:[],
                seriesData:[]
              };
              let chart4Data={
                xAxisData:[],
                seriesData:[]
              };
              let chart5Data={
                xAxisData:[],
                seriesData:[]
              };
              _this.count=100
              _this.barWidth= 0
            if(_this.resultData1.length>0){
              if(_this.resultData1.length>200){
                _this.count=20
              }else if(_this.resultData1.length>150){
                _this.count=30
              }else if(_this.resultData1.length>130){
                _this.count=40
              }else if(_this.resultData1.length>100){
                _this.count=60
              }else if(_this.resultData1.length>80){
                _this.count=70
              }else if(_this.resultData1.length>60){
                _this.count=80
              }else if(_this.resultData1.length>50){
                _this.count=90
              }else{
                _this.count=100
                _this.barWidth= 25
              }
              if(_this.resultData1.length>10){_this.tableHeight=true}else{_this.tableHeight=false}
              for(let val of _this.resultData1){
                val.schoolName=val.schoolName.replace('成都市','')
                chart3Data.xAxisData.push(val.schoolName )
                chart3Data.seriesData.push(val.finishStudent == 0? val.finishStudent : Math.floor(val.totalScore/val.finishStudent))
                chart4Data.seriesData.push(val.finishStudent==0?val.finishStudent:Math.floor((val.excellentStudent+val.goodStudent)/val.finishStudent*100))
                chart5Data.seriesData.push(val.finishStudent==0?val.finishStudent:Math.floor((val.excellentStudent+val.goodStudent+val.passStudent)/val.finishStudent*100))
              }
              chart4Data.xAxisData = chart3Data.xAxisData;
              chart5Data.xAxisData = chart3Data.xAxisData;
            }
            _this.chart3Data=chart3Data
            _this.chart4Data=chart4Data
            _this.chart5Data=chart5Data
            _this.chart3Fun()
            _this.chart4Fun()
            _this.chart5Fun()
          }
        })
    },
    chart1Fun(){
      let chart1 = this.$echarts.init(document.getElementById("chart1"));
      chart1.setOption({
          title : {
              text: '体测情况图形分布',
              subtext: '',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: '5%',
              data: ['免试人数','完成人数','未参加人数','已参加未完成人数']
          },
          series : [
              {
                  name: '体测情况',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:this.chart1Data.exemptStudent, name:'免试人数'},
                      {value:this.chart1Data.finishStudent, name:'完成人数'},
                      {value:this.chart1Data.notPassStudent, name:'未参加人数'},
                      {value:this.chart1Data.participateNotPass, name:'已参加未完成人数'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal: {
                          color: function (params) {
                              var colorList = [
                                  '#4fa995','#e99954','#e58467','#4abce4'
                              ];
                              return colorList[params.dataIndex];
                          }
                      }
                  },
                  label:{
                          show: true,
                          formatter:'{b} : ({d}%)'
                      },
              }
          ]
      },true);
    },
    chart2Fun(){
      let chart2 = this.$echarts.init(document.getElementById("chart2"));
      chart2.setOption({
          title : {
              text: '等级情况图形分布',
              subtext: '',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: '5%',
              data: ['优秀数','良好数','及格数','不及格数']
          },
          series : [
              {
                  name: '等级情况',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:this.chart2Data.excellentStudent, name:'优秀数'},
                      {value:this.chart2Data.goodStudent, name:'良好数'},
                      {value:this.chart2Data.passCount, name:'及格数'},
                      {value:this.chart2Data.notPassCount, name:'不及格数'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal: {
                          color: function (params) {
                              var colorList = [
                                  '#4fa995','#e99954','#e58467','#4abce4'
                              ];
                              return colorList[params.dataIndex];
                          }
                      }
                  },
                  label:{
                          show: true,
                          formatter:'{b} : ({d}%)'
                      },
              }
          ]
      },true);
    },
    chart3Fun(){
      let chart3 = this.$echarts.init(document.getElementById("chart3"));
      chart3.setOption({
          title : {
              text: '各学校平均分',
              subtext:'',
              x:'center',
              y:'top',
              textAlign:'center'
          },
          grid: {
            x: 40,
            y: 60,
            x2: 100,
            y2: 140
          },
          tooltip : {
              trigger: 'axis'
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : this.chart3Data.xAxisData,
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    show: true,
                    rotate:-45,
                    interval:0
                  },
              }
          ],
          yAxis : [
              {
                  name:'平均分',
                  nameGap:20,
                  type : 'value',
                  max:100,
                  splitLine:{
                    show:true,
                    lineStyle:{
                        type:'dashed'
                    },
                }
              }
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 0,
              end: this.count,
              orient:'horizontal',
              zoomLock:true
            }
        ],
          series : [
            {
              name:'平均分',
              type:'bar',
              barWidth:this.barWidth,
              data:this.chart3Data.seriesData,
              barGap: '50%',
              label: {
                  show: true,
                  position: 'top',
                  formatter: (params) => {
                          return params.data
                        }
              },
              itemStyle: {
                  normal: {
                      color: '#4fa995'
                  }
              }
            }
          ]
      },true);
    },
    chart4Fun(){
      let chart4 = this.$echarts.init(document.getElementById("chart4"));
      chart4.setOption({
          title : {
              text: '各学校优良率',
              subtext:'',
              x:'center',
              y:'top',
              textAlign:'center'
          },
          grid: {
            x: 40,
            y: 60,
            x2: 100,
            y2: 140
          },
          tooltip : {
              trigger: 'axis'
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : this.chart4Data.xAxisData,
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    show: true,
                    rotate:-45,
                    interval:0
                  },
              }
          ],
          yAxis : [
              {
                  name:'优良率（%）',
                  nameGap:20,
                  max:100,
                  type : 'value',
                  splitLine:{
                    show:true,
                    lineStyle:{
                        type:'dashed'
                    },
                }
              }
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 0,
              end: this.count,
              orient:'horizontal',
              zoomLock:true
            }
        ],
          series : [
            {
              name:'优良率',
              type:'bar',
              barWidth:this.barWidth,
              data:this.chart4Data.seriesData,
              barGap: '50%',
              label: {
                  show: true,
                  position: 'top',
                  formatter: (params) => {
                          return params.data
                        }
              },
              itemStyle: {
                  normal: {
                      color: '#4fa995'
                  }
              }
            }
          ]
      },true);
    },
    chart5Fun(){
      let chart5 = this.$echarts.init(document.getElementById("chart5"));
      chart5.setOption({
          title : {
              text: '各学校合格率',
              subtext:'',
              x:'center',
              y:'top',
              textAlign:'center'
          },
          grid: {
            x: 40,
            y: 60,
            x2: 100,
            y2: 140
          },
          tooltip : {
              trigger: 'axis'
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : this.chart5Data.xAxisData,
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    show: true,
                    rotate:-45,
                    interval:0
                  },
              }
          ],
          yAxis : [
              {
                  name:'合格率（%）',
                  nameGap:20,
                  max:100,
                  type : 'value',
                  splitLine:{
                    show:true,
                    lineStyle:{
                        type:'dashed'
                    },
                }
              }
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 0,
              end: this.count,
              orient:'horizontal',
              zoomLock:true
            }
        ],
          series : [
            {
              name:'合格率',
              type:'bar',
              barWidth:this.barWidth,
              data:this.chart5Data.seriesData,
              barGap: '50%',
              label: {
                  show: true,
                  position: 'top',
                  formatter: (params) => {
                          return params.data
                        }
              },
              itemStyle: {
                  normal: {
                      color: '#4fa995'
                  }
              }
            }
          ]
      },true);
    },

  },
  watch: {
  },
  created() {
  },
  mounted() {
    let vm = this;
    vm.getSchoolData();
  }
}
</script>