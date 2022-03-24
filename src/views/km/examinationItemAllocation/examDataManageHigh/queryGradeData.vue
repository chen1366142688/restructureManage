<template>
    <div class="query-class">
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">年级数据查询</h2>
        </div>
        <div>
            <Card>
                <div class="top-search addClass" @keydown.enter="querySearch">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                        <span>年<span style="visibility:hidden">年级</span>级：</span>
                        <Select v-model="gradeId" style="width:120px;" :disabled="true">
                            <Option
                            v-for="(item,i) in schoolGradeList"
                            :value="item.grade"
                            :key="item.grade+i"
                            >{{ item.label }}</Option>
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
                            :loading="loading"
                            :columns="DataSummaryResultData"
                            :data="dataResult.getDataSummaryVO"
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
                            :loading="loading"
                            :columns="DataDetailsResultData"
                            :data="dataResult.dataDetailsVOS"
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
                <div class="data_analyst">
                    <div v-if="dataResult.getDataAnalyseVO">
                        <my-echarts id='basics' width='600px' height='500px' :options="BasicsDataAnalyseVO" title="基础体能考核情况图形分布"></my-echarts>
                    </div>
                    <div v-if="dataResult.getDataAnalyseVO">
                        <my-echarts id='testid' width='600px' height='500px' :options="SpecialDataAnalyseVO" title="专项技能考核情况图形分布"></my-echarts>
                    </div>
                </div>
            </Card>
        </div>
        <div style="min-width=592px;margin-top:20px">
            <Card>
                <div>
                    <div style="margin-bottom:16px;font-size:18px;">各年级基础体能平均得分</div>
                </div>
                <div  class="bar_class">
                    <div style="width:90%;height:100%" v-if="dataResult.physicalAvg">
                        <my-echarts id='basics_info' width="100%" height="100%" :options="barBasicsOptions" title="基础体能考核情况图形分布"></my-echarts>
                    </div>
                </div>
            </Card>
        </div>
        <div style="min-width=592px;margin-top:20px">
            <Card>
                <div>
                    <div style="margin-bottom:16px;font-size:18px;">各年级专项技能平均得分</div>
                </div>
                <div  class="bar_class">
                    <div style="width:90%;height:100%" v-if="dataResult.skillAvg">
                        <my-echarts id='special_info' width="100%" height="100%" :options="barSpecialOptions" title="基础体能考核情况图形分布"></my-echarts>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import ProjectTable from '@/views/km/examinationItemAllocation/examDataManageHigh/components/projectTable.vue'
import myEcharts from '@/views/km/examinationItemAllocation/examDataManageHigh/components/myEcharts.vue'
import api from '@/api/studentApi.js';
import gradeData from '@/libs/grade';
import comon from  './components/comon.js'
let routeDisable = true;
export default {
    mixins:[comon],
    components: {
      ProjectTable,  
      myEcharts
    },
    data() {

        return {
           title:'年级',
            routeDisable:false,
            loading:false,
            dataResult:'',
            schoolId:'',
            schoolGradeList:[],
            schoolGradeList: [],
            gradeId:'9999',
        } 
    },
    methods: {
        //获取年级数据
        async queryGradeData() {
          let res = await api.getGradeData();
          let arr = [];
          let {physicalAvg,skillAvg} = res.data.response;
          arr.push(res.data.response.getDataSummaryVO);
          res.data.response.getDataSummaryVO = arr;
          if(res.data.code == 10000) this.dataResult = res.data.response;
          let pieObj = this.selectGradeData(this.dataResult.getDataAnalyseVO);
          let barBasics = this.selectAverageData(physicalAvg);
          let BarSpecialData = this.selectAverageData(skillAvg);
          this.$set(this.BasicsDataAnalyseVO,'series',pieObj.basicsData);
          this.$set(this.SpecialDataAnalyseVO,'series',pieObj.specialData);
          this.$set(this.barBasicsOptions,'series',barBasics);
          this.$set(this.barSpecialOptions,'series',BarSpecialData);
        },
        //跳转页面
        toDetail(val) {
          this.$router.push({ name: "queryClassDataKM",params:{
            grade:val.grade
          } });
        },
        querySearch() { // 查询
            this.queryGradeData();
        },
        output() { //导出数据
          let token = sessionStorage.getItem('token');
          let url = `${this.$axios.defaults.baseURL}/v1/middleData/exportMiddleGradeData?token=${token}`;
          window.open(url);
        }
    },
    mounted() {
        let schoolType = sessionStorage.getItem('schoolType');
        this.schoolId = sessionStorage.getItem('schoolId');
        this.schoolGradeList = gradeData.inOf(schoolType);
        this.queryGradeData();
    }
}
</script>
<style lang="less" scoped>
    .data_analyst{
        width: 100%;
        height: 600px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div{
           width: 100%;
            height: 100%;
        }
    }
    .bar_class{
        width: 100%;
        height: 500px;
    }
</style>