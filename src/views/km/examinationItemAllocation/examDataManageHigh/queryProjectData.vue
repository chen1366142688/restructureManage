<template>
    <div class="query-class">
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">项目数据查询</h2>
        </div>
        <div>
            <Card>
                <div class="top-search addClass" @keydown.enter="querySearch">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                        <span>年级：</span>
                        <Select v-model="formList.grade" style="width:120px;" @on-change="selectChange">
                            <Option
                            v-for="(item,i) in schoolGradeList"
                            :value="item.grade"
                            :key="item.grade+i"
                            >{{ item.label }}</Option>
                        </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>性别：</span>
                            <Select v-model="formList.gender" style="width:120px;">
                                <Option
                                v-for="(item,i) in sexList"
                                :value="item.id"
                                :key="item.id+i"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div  class="right-btns addClass">
                        <Button type="success" @click="querySearch">查询</Button>
                        <Button type="success" @click="output">导出EXCEL</Button>
                    </div>
                </div>
            </Card>
        </div>
        <div class="tabs_style" v-if="projectList.length">
          <Tabs type="card" @on-click="tabsClick" v-model="formList.middleItemId">
            <TabPane
              v-for="(item,index) in projectList" :key="index+item.middleItemId"
              :label="item.middleItemName"
              :name="String(item.middleItemId)"
            >
            </TabPane>
          </Tabs>
        </div>
        <div v-for="(item,index) in projectList" :key="index+item.middleItemId">
          <div v-if="item.middleItemId == changeIndexCore">
            <div style="margin-top:20px;">
              <Card>
                <div>
                      <div style="margin-bottom:16px;font-size:18px;">数据概括</div>
                  </div> 
                  <div>
                      <Row>
                          <div style>
                              <Table
                              border
                              max-height="650"
                              :columns="DataSummaryResultData"
                              :data="projectManageList.summaryVO"
                              ></Table>
                          </div>
                      </Row>
                  </div>
              </Card>
            </div>
            <div style="margin-top:20px;">
              <Card>
                <div>
                  <div style="margin-bottom:16px;font-size:18px;">数据明细</div>
                  </div> 
                  <div>
                      <Row>
                          <div style>
                              <Table
                              border
                              max-height="650"
                              :columns="DataDetailsResultData"
                              :data="projectManageList.detailsVOS"
                              ></Table>
                          </div>
                      </Row>
                  </div>
              </Card>
            </div>

          <div style="min-width=592px;margin-top:20px">
              <Card>
                  <div>
                      <div style="margin-bottom:16px;font-size:18px;">数据分析</div>
                  </div>
                  <div :class="analyseVOS.length<=2?'flex':'gride'">
                      <div  v-for="(analyItem,i) in analyseVOS"
                              :key="analyItem.id+i"
                              class="data_analyst"
                      >
                          <my-echarts :id='analyItem.id' width='500px' height='400px' :options="analyItem"></my-echarts>
                      </div>
                  </div>
              </Card>
          </div>

            <div style="min-width=592px;margin-top:20px" v-for="(itemsbar,index) in barDataAvgVOS" :key="index">
                <Card>
                    <div>
                        <div style="margin-bottom:16px;font-size:18px;">{{`各班级${itemsbar.name}平均得分`}}</div>
                    </div>
                    <div  class="bar_class">
                        <div style="width:90%;height:100%" >
                            <my-echarts :id='`${itemsbar.id}de`' width="100%" height="100%" :options="itemsbar.barComponent"></my-echarts>
                        </div>
                    </div>
                </Card>
            </div>
          </div>
        </div>  
        <!-- <test-classset></test-classset> -->
    </div>
</template>
<script>
import ProjectTable from '@/views/km/examinationItemAllocation/examDataManageHigh/components/projectTable.vue'
import myEcharts from '@/views/km/examinationItemAllocation/examDataManageHigh/components/myEcharts.vue'
import api from '@/api/studentApi.js';
import gradeData from '@/libs/grade';
import testClassset from '@/components/testTable/testClassset.vue'
export default {
    components: {
      ProjectTable,  
      myEcharts,
      testClassset
    },
    data() {

        return {
            formList:{
              middleItemId:'',
              grade:7,
              gender:'22',
            },
            changeIndexCore:'',
            projectList:[],
            projectIndex:'',
            schoolGradeList: [],
            projectManageList:{},
            gradeId:'',
            sexList:[
                {name:'全部',id:'22'},
                {name:'男',id:'1'},
                {name:'女',id:'2'},
            ],
            DataSummaryResultData:[
              {
                  title: '考核内容',
                  key: 'smallItemName',
                  align: 'center',
                  minWidth: 100,
              },
              {
                title: '总人数',
                  key: 'totalNumber',
                  align: 'center',
                  minWidth: 100,
              },
              {
                title: '已完成考核/考核总人数',
                  key: 'totalNumber',
                  align: 'center',
                  minWidth: 100,
                  render:(h,parmas) =>{
                    let {row} = parmas;
                    return h('div',`${row.completeNumber}/${row.studentNumber}`)
                  }
              },
              {
                title: '平均成绩',
                  key: 'avgAchievement',
                  align: 'center',
                  minWidth: 100,
              },
              {
                title: '平均分',
                  key: 'avgScore',
                  align: 'center',
                  minWidth: 100,
              },
            ],
            DataDetailsResultData:[
              {
                title: '考核内容',
                  key: 'smallItemName',
                  align: 'center',
                  minWidth: 100,
              },
              {
                title: '班级',
                  key: 'studentClass',
                  align: 'center',
                  minWidth: 100,
                  render:(h,params) =>{
                    return h('span',`${params.row.studentClass}班`)
                  }
              },
              {
                title: '总人数',
                  key: 'totalNumber',
                  align: 'center',
                  minWidth: 100,
              },
              {
                title: '已完成考核/考核总人数',
                  key: 'totalNumber',
                  align: 'center',
                  minWidth: 100,
                  render:(h,parmas) =>{
                    let {row} = parmas;
                    return h('div',`${row.completeNumber}/${row.studentNumber}`)
                  }
              },
              {
                title: '平均成绩',
                  key: 'avgAchievement',
                  align: 'center',
                  minWidth: 100,
              },
              {
                title: '平均分',
                  key: 'avgScore',
                  align: 'center',
                  minWidth: 100,
              },
              // ...this.DataSummaryResultData
            ],
            PieSeriesComponent:{ //饼状图默认信息
              type:"pie",
              radius : '55%',
              center: ['50%', '60%'],
              label:"pie",
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            },
            analyseVOS:[],//饼状图数据
            barDataAvgVOS:[],//柱状图数据
            barSeriesComponent:{//柱状图默认信息
                  type:'bar',
                  itemStyle:{
                      color:'#00BA8A'
                  },
                  label:'bar',
            },
        }


        
    },
    mounted() {
      let schoolType = sessionStorage.getItem('schoolType');
      this.schoolId = sessionStorage.getItem('schoolId');
      let arr = gradeData.inOf(schoolType);
      let newArr = arr.filter((item)=>{
        return item.grade!='9999';
      })
      this.schoolGradeList = newArr;
      this.formList.grade = this.$route.params.grade||7;
      this.queryProjectList();
      this.changeIndexCore = this.formList.middleItemId;
    },
    methods: {
      //查询所有项目
      async queryProjectList() {
        let res = await api.getItem({grade:this.formList.grade});
        if(res.data.code == 10000) this.projectList = res.data.response;
        if(this.projectList.length) this.formList.middleItemId = String(this.projectList[0].middleItemId);
        this.changeIndexCore = String(this.projectList[0].middleItemId);
        await this.queryProjectManage();
      },
      //根据项目id查询项目详情
      async queryProjectManage() {
        let params = {...this.formList,gender:this.formList.gender=='22'?'':this.formList.gender};
        let res = await api.getItemData(params);
        if(res.data.code == 10000) {

          this.projectManageList = res.data.response;
          let data = this.selectDataAnalyse(this.projectManageList.analyseVOS);
          this.analyseVOS = data;
          let barDataAvgVOS = this.selectAverageData(this.projectManageList.dataAvgVOS);
          this.barDataAvgVOS = barDataAvgVOS;
        }
      },
      //重组数据分析数据
      selectDataAnalyse(data) {
        let componentSerice = this.PieSeriesComponent;
        let analyseArr = data.map((item)=>{
          let obj = {};
          let componentObj = {
            color:['#EFCE54','#E48129','#28957B','#DB465F'],
            title:`${item.smallItemName}考核情况图形分布`,
            legendData:['完成人数','未完成人数',],
            id:`pie${item.basicsCompleteNumber}${item.smallItemName}`,
            series:{
              type:'pie'
            },
          };
          let itemArr = [
            {
              name:'完成人数',
              value:item.basicsCompleteNumber,
            },
            {
              name:'未完成人数',
              value:item.notParticipationBasicsNumber ,
            }
          ];
          obj = {...componentSerice,data:itemArr,type:'pie'};
          componentObj.series = obj;
          return componentObj;
        });
        return analyseArr;
      },
      //筛选平均分数据
      selectAverageData(data) {
          let arr = data.map((item)=>{
          let barComponent = {
            color:['#00BA8A'],
            xAxis:{
                name:'年级',
                data: ['七年级','八年级','九年级'],
            },
            yAxis:{
                name:'分 平均分',
                max:20,
                interval:2,
            },
            series:{type:'bar'}
          };
          let avgScoreVOS = item.avgScoreVOS;
          let defaultData = this.barSeriesComponent;
          let averageData = avgScoreVOS.map((itemChild) => itemChild.avgScore);
          let classNameList = this.selectClass(avgScoreVOS)
          barComponent.xAxis = classNameList;
          barComponent.series = {...defaultData,data:averageData,type:'bar'};
          return {name:item.smallItemName,barComponent,id:`bar${item.smallItemName}23`,};
        });
        return arr;
      },
      //获取平均分班级名
      selectClass(data) {
          let arr = data.map((item,index)=>{
            return `${item.studentClass}班`
          });
          return {
            name:'班级',
            data:arr,
          }
        },
      //导航切换数据
        tabsClick(val) {
          this.formList.middleItemId = val;
          this.changeIndexCore = val;
          this.queryProjectManage();
        },
        querySearch() { // 查询
            this.formList.middleItemId = '';
            this.queryProjectList();
        },
        output() { //导出数据
          let token = sessionStorage.getItem('token');
          let {grade,gender,middleItemId} = this.formList;
          if(gender == '22') gender = '';
          let url = `${this.$axios.defaults.baseURL}/v1/middleData/exportMiddleItemData?token=${token}&grade=${grade}&gender=${gender}&middleItemId=${middleItemId}`;
          window.open(url);
        },
        selectChange() {
          // this.formList.middleItemId = '';
        } 
    }
}
</script>
<style lang="less" scoped>
    .data_analyst{
        // min-width: 700px;
        // height: 420px;
        // margin:30px 50px 0 0;
        // margin-right:100px;
    }
    .pie_style{
      // min-width:550px;
      display:flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items:center
    }
    .bar_class{
        width: 100%;
        height: 500px;
    }
    .tabs_style{
      width:100%;
      overflow-x:auto;
      margin-top:21px;
    }
    .flex {
      display:flex;
      justify-content: space-around;
      align-items:center,
    }
    .gride{
      display: grid;
      justify-content: space-around;
      grid-template-columns: 500px 500px 500px;
      // grid-template-rows: 400px 400px 400px;
    }
</style>