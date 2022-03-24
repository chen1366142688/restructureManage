import grade from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import api from '@/api/studentApi'
const mixins = {
    data() {
      return {
        itemList:[],//所有项目
        classList:[],//所有班级
        gradeList:[], //所有年级
        examStatus:[
          {name:'全部',id:0},
          {name:'未考核',id:1},
          {name:'已考核',id:2},
        ],
        genderList:[
          {name:'全部',id:'22'},
          {name:'男',id:1},
          {name:'女',id:2},
        ],
        DataSummaryResultData:[
          {
              title: '总人数',
              key: 'totalNumber',
              align: 'center',
              minWidth: 100,
          },
          {
            title: '基础体能完成人数/考核总人数',
            key: 'basicsNumber',
            align: 'center',
            minWidth: 100,
            render:(h,params) =>{
              let {row} = params;
              if(row.basicsCompleteNumber==null || row.basicsNumber==null){
                return h('div','')
              }
              return h('div',`${row.basicsCompleteNumber}/${row.basicsNumber}`)
            }
          },
          {
            title: '基础体能平均得分',
            key: 'basicsAvgScore',
            align: 'center',
            minWidth: 100,
          },
          {
            title: '专项技能完成人数/考核总人数',
            key: 'specialCompleteNumber',
            align: 'center',
            minWidth: 100,
            render:(h,params) =>{
              let {row} = params;
              if(row.specialCompleteNumber==null || row.specialNumber==null){
                return h('div','')
              }
              return h('div',`${row.specialCompleteNumber}/${row.specialNumber}`)
            }
          },
          {
            title: '专项技能平均得分',
            key: 'specialAvgScore',
            align: 'center',
            minWidth: 100,
          },
        ],
        DataDetailsResultData:[
          {
              title: '年级',
              key: 'gradeName',
              align: 'center',
              minWidth: 100,
          },
          {
            title: '总人数',
            key: 'gradeNumber',
            align: 'center',
            minWidth: 100,
          },
          {
            title: '基础体能完成人数/考核总人数',
            key: 'basicsNumber',
            align: 'center',
            minWidth: 100,
            render:(h,params) =>{
              let {row} = params;
              return h('div',`${row.basicsCompleteNumber}/${row.basicsNumber}`)
            }
          },
          {
            title: '基础体能平均得分',
            key: 'basicsAvgScore',
            align: 'center',
            minWidth: 100,
          },
          {
            title: '专项技能完成人数/考核总人数',
            key: 'createTime',
            align: 'center',
            minWidth: 100,
            render:(h,params) =>{
              let {row} = params;
              return h('div',`${row.specialCompleteNumber}/${row.specialNumber}`)
            }
          },
          {
            title: '专项技能平均得分',
            key: 'specialAvgScore',
            align: 'center',
            minWidth: 100,
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            minWidth: 200,
            render: (h, params) => {
                const row = params.row;
                return h("div", {

                    style:{
                        display: "flex",
                        justifyContent: "space-around",
                    }
                    },[
                    h(
                        "Button",
                        {
                        props: {
                            type: "success",
                            disabled: false,
                        },
                        style: {
                            marginRight: "10px",
                        },
                        on: {
                            click: () => {
                            this.toDetail(row);
                            },
                        },
                        },
                        "详情"
                    )
                    ]);
                },
            },
        ],
        PieSeriesComponent:{
          type:"pie",
          radius : '55%',
          center: ['50%', '60%'],
          label:"pie",
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
          }
        },
        barSeriesComponent:{
              type:'bar',
              itemStyle:{
                  color:'#00BA8A'
              },
              label:'bar',
        },
        BasicsDataAnalyseVO:{
          color:['#EFCE54','#E48129','#28957B','#DB465F'],
          title:'基础体能考核情况图形分布',
          legendData:['完成人数','已参加未完成人数','未参加人数',],
          series:{
            type:'pie'
          },
        },
        SpecialDataAnalyseVO:{
          color:['#EFCE54','#E48129','#28957B','#DB465F'],
          title:'专项技能考核情况图形分布',
          legendData:['完成人数','已参加未完成人数','未参加人数',],
          series:{
            type:'pie'
          },
        },
        barBasicsOptions:{
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
          series:{
            type:'bar'
          },
        },
        barSpecialOptions:{
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
        },
        //修改表格表头
        changeTable(title) {
          let name = {
            title: title,
            key: 'studentClass',
            align: 'center',
            minWidth: 100,
            render:(h,params) =>{
              let text = `${params.row.studentClass}班`;
              return h('span',text);
            }
          };
          let numberAll = {
            title: '总人数',
            key: 'studentClassNumber',
            align: 'center',
            minWidth: 100,
          };
          if(title == '班级') {
            this.DataDetailsResultData.splice(0,1,name);
            this.DataDetailsResultData.splice(1,1,numberAll);
          }
        }
      }
    },
    mounted () {
      this.gradeList = grade.inOf( sessionStorage.getItem('schoolType'))
      this.classList = allClass;
      let title = this.title;
      this.changeTable(title)
    },
    methods: {
      //查询所有项目
      queryProject() { //dadad
        api.getExamItem().then((res)=>{
          const { response } = res.data;
          this.itemList = response;
        })
      },
      //筛选数据分析数据
      selectGradeData(obj) {
        let objBacise = this.PieSeriesComponent;
        let basicsDataAnalyseArr = [],specialDataAnalyseArr = [],getObj = {};
        for(let i in obj) {
          if(i == 'basicsDataAnalyse') {
            basicsDataAnalyseArr = [
              {name:'完成人数',value:obj[i].basicsCompleteNumber},
              {name:'已参加未完成人数',value:obj[i].basicsUnfinishedNumber },
              {name:'未参加人数',value:obj[i].notParticipationBasicsNumber},
            ]
          }else {
            specialDataAnalyseArr = [
              {name:'完成人数',value:obj[i].specialCompleteNumber },
              {name:'已参加未完成人数',value:obj[i].specialUnfinishedNumber },
              {name:'未参加人数',value:obj[i].notParticipationSpecialNumber },
            ]
          }
        };
        getObj.basicsData = {...objBacise,data:basicsDataAnalyseArr,type:'pie'};
        getObj.specialData = {...objBacise,data:specialDataAnalyseArr,type:'pie'};
        return getObj;
      },
      //筛选平均分数据
      selectAverageData(data) {
        let defaultData = this.barSeriesComponent;
        let averageData = data.map((item) => item.avgScore);
        return {...defaultData,data:averageData,type:'bar'};
      },
    }
}
export default mixins





