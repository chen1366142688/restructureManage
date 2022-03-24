import grade from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import api from '@/api/studentApi'
import util from '@/libs/util.js'
const mixins = {
    data() {
      return {
        itemList:[],//所有项目
        // classList:[],//所有班级
        // gradeList:[], //所有年级
        examStatus:[
          {name:'全部',id:0},
          {name:'未考核',id:1},
          {name:'已考核',id:2},
        ],
        studentColumns:[
          {
              title: '姓名',
              key: 'studentName',
              align: 'center',
              minWidth: 100,
          },
          {
              title: '性别',
              key: 'gender',
              align: 'center',
              minWidth: 100,
              render: (h,params) => {
                const {row} = params;
                return h('div', row.gender == '1'?'男':'女')
              }
          },
          {
              title: '学籍号',
              key: 'registerCode',
              align: 'center',
              minWidth: 150,
          },
          {
              title: '班级',
              key: 'className',
              align: 'center',
              minWidth: 100,
              render:(h,parmas) =>{
                let row = parmas.row;
                return h('div',row.className)
              }
          },
          {
              title: '项目',
              key: 'name',
              align: 'center',
              minWidth: 200,
              render: (h, params) => {
                  const {row} = params;
                  const number = this.queryNumber(row.maxItems)
                  if(row.testStatus == 1&&!row.maxItems.length) {
                    return h('div', '--')
                  } else {
                    return h('div',[
                      h('ul', row.maxItems.map((item,index) => {
                          let text = item.classTestName;
                          // if(row.testStatus == 1&&!row.maxItems.length) text = '--'
                          const number = item.minItems.length;
                          let length = row.maxItems.length;
                          return h('li', { 
                            class:['white_class'],
                            style:{
                              minHeight:`${number*30+number*3*2-1}px`, //minHeight:`${number*20+number*3*2+(number*1-1)}px`,
                              // padding:'3px 0',
                              borderBottom:`${index!= length-1?'1px solid #e8eaec' :''}`,
                              lineHeight:`${number*30+number*3*2-1}px`,
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                            }
                          },text)
                      }))
                    ]);
                  }
                  
              }
          },
          {
            title: '成绩',
            key: 'name',
            align: 'center',
            minWidth: 100,
            render: (h, params) => {
                const {row} = params;
                const number = this.queryNumber(row.maxItems)
                if(row.testStatus == 1&&!row.maxItems.length) {
                  return h('div', '--')
                } else {
                  return h('div',[
                    h('ul', row.maxItems.map((item,index) => {
                      let text,mine,sconed;
                      if(!item.resultValue && typeof(item.resultValue)!='undefined' && item.resultValue!=0) text = ''
                      else {
                        if(item.examUnit == "分.秒") {
                          mine = parseInt(Number(item.resultValue)/60);
                          sconed = item.resultValue%60;
                          text = `${mine}'${sconed}`
                        }else {
                          text = `${item.resultValue}${item.examUnit}`;
                        }
                      }
                        // if(row.testStatus == 1&&!row.maxItems.length) text = '--'
                        const number = item.minItems.length;
                        let length = row.maxItems.length;
                        return h('li', { 
                          class:['white_class'],
                          style:{
                            minHeight:`${number*30+number*3*2-1}px`, //minHeight:`${number*20+number*3*2+(number*1-1)}px`,
                            // padding:'3px 0',
                            borderBottom:`${index!= length-1?'1px solid #e8eaec' :''}`,
                            lineHeight:`${number*30+number*3*2-1}px`,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }
                        },text)
                    }))
                  ]);
                }
                
            }
        },
        {
          title: '项目得分',
          key: 'name',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
              const {row} = params;
              const number = this.queryNumber(row.maxItems)
              if(row.testStatus == 1&&!row.maxItems.length) {
                return h('div', '--')
              } else {
                return h('div',[
                  h('ul', row.maxItems.map((item,index) => {
                      let text = item.score;
                      // if(row.testStatus == 1&&!row.maxItems.length) text = '--'
                      const number = item.minItems.length;
                      let length = row.maxItems.length;
                      return h('li', { 
                        class:['white_class'],
                        style:{
                          minHeight:`${number*30+number*3*2-1}px`, //minHeight:`${number*20+number*3*2+(number*1-1)}px`,
                          // padding:'3px 0',
                          borderBottom:`${index!= length-1?'1px solid #e8eaec' :''}`,
                          lineHeight:`${number*30+number*3*2-1}px`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }
                      },text)
                  }))
                ]);
              }
              
          }
      },
        {
            title: '状态',
            key: 'skillScore',
            align: 'center',
            minWidth: 150,
            render:(h,params) =>{
              const {row} = params;
              let text = row.maxItems.length<4?'项目配置不足':row.sumScore == null?'未考核完成':'考核完成';
              return h('div',{
                style:{
                  visibility:`${text == '22'?'hidden':'visible'}`
                }
              },text)
            }
        },
        {
            title: '中考模拟总得分',
            key: 'sumScore',
            align: 'center',
            minWidth: 100,
            render:(h,params) =>{
              const {row} = params;
              let text = row.maxItems.length<4?'':row.sumScore == null?'':row.sumScore; 
              return h('div',{
                style:{
                  visibility:`${text == '22'?'hidden':'visible'}`
                }
              },text)
            }
          },
          {
              title: '操作',
              key: "action",
              align: "center",
              minWidth: 100,
              render: (h, params) => {
                  const row = params.row;
                  return h('div', [
                      h(
                          "Button",
                          {
                          props: {
                              type: "success",
                              disabled: false,
                          },
                          on: {
                              click: () => {
                              this.details('student',row);
                              },
                          },
                          },
                          "详情"
                      ),
                  ])
              }
          },
      ],
        projectColumns: [
          {
            title: "项目编号",
            key: "orderIndex",
            align: "center"
          },
          {
            title: "项目名称",
            key: "examItemName",
            align: "center"
          },
          {
            title: "完成人数/测试总人数",
            key: "createTime",
            align: "center",
            render:(h,params) =>{
              let row = params.row;
              return h('div',`${row.finishNumber ?row.finishNumber:0}/${row.testNumberCount?row.testNumberCount:0 }`)
            }
          },
          {
            title: "平均成绩",
            key: "avgResultValue",
            align: "center",
            render:(h,parmas) => {
              let row = parmas.row,text='',mine,sconed;
              text = `${row.avgResultValue?Number(row.avgResultValue).toFixed(1):''}${row.examUnit&&row.avgResultValue?row.examUnit:''}`;

              if(row.examUnit == "分.秒"&&row.avgResultValue) {
                let val = Math.round(Number(row.avgResultValue));
                mine = parseInt(val/60);
                sconed = val%60;
                text = `${mine}'${sconed}`
              };
              return h('div',text);
            }
          },
          {
            title: "平均得分",
            key: "avgScore",
            align: "center",
            render:(h,parmas)=>{
              return h('div',parmas.row.avgScore.toFixed(2))
            } 
          },
          {
            title: "优秀率（人数）",
            key: "excellentNumber",
            align: "center",
            render:(h,params) =>{
              return h('div',`${params.row.excellentProbability?params.row.excellentProbability:0}% (${params.row.excellentNumber?params.row.excellentNumber:0})`)
            }
          },
          {
            title: "良好率（人数）",
            key: "fineProbability",
            align: "center",
            render:(h,params) =>{
              return h('div',`${params.row.fineProbability?params.row.fineProbability:0}% (${params.row.fineNumber?params.row.fineNumber:0})`)
            }
          },
          {
            title: "及格率（人数）",
            key: "createTime",
            align: "center",
            render:(h,params) =>{
              return h('div',`${params.row.marginalProbability?params.row.marginalProbability:0}% (${params.row.marginalNumber?params.row.marginalNumber:0})`)
            }
          },
          {
            title: "不及格率（人数）",
            key: "createTime",
            align: "center",
            render:(h,params) =>{
              return h('div',`${params.row.notMarginalProbability?params.row.notMarginalProbability:0}% (${params.row.notMarginalNumber?params.row.notMarginalNumber:0})`)
            }
          },
          {
          title: "操作",
          key: "action",
          align: "center",
            width: 400,
          render: (h, params) => {
             const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props:{
                    type:'success'
                  },
                  on: {
                    click: () => {
                      this.details('project',row);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
        ],
        resultsData:[{name:'1',id:1}],
      }
    },
    methods: {
      transitionCn(val) {//转换中文文字
        return util.NumberToChinese(val);
      },
      details(val,row) {//跳转详情页面
        sessionStorage.setItem('tabarIndex',this.tabarIndex);
        sessionStorage.setItem("lookMiddleTest-classId", this.formList.classId);
        let name = 'studentCustomTestDataMsg';
        if(val == 'project') {
          name = 'lookcustomtestdetail';
          this.$router.push({name:name,query:{activityId:this.formList.activityId,classTestId:row.classTestId,examItemId:row.examItemId,grade:row.grade||this.formList.grade,disabled:false,}})
        }else {
          this.$router.push({name:name,query:{
            disabled:false,
            studentId:row.studentId,
            activityId:this.formList.activityId,
          }})
        }
      },
      queryNumber(Arr = []) { //获取子项目的个数
        const parentNum = Arr.length;
        let child = 0;
        Arr.forEach((item,index,Arr) => {
          const {minItems} = item;
          child += minItems.length;
        });
        return child
      },
    },
}
export default mixins