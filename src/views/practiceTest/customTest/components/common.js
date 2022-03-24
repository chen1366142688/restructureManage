import grade from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import api from '@/api/studentApi'
import util from '@/libs/util.js'
import { size } from 'lodash'
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
              minWidth: 120,
              render: (h, params) => {
                  let row = params.row;
                  const number = this.queryNumber(row.maxItems)
                  if(!row.maxItems.length) {
                    return h('div', '')
                  } else {
                    return h('div',[
                      h('div', row.maxItems.map((item,index) => {
                          let text = item.classTestName;
                          // if(row.testStatus == 1&&!row.maxItems.length) text = '--'
                          const number = item.minItems.length;
                          let length = row.maxItems.length;
                          return h('div', { 
                            // class:['white_class'],
                            style:{
                              height:`${(number*30)}px`,
                              textAlign:'center',
                              borderBottom:`${index!= length-1?'1px solid #e8eaec' :''}`,
                              whiteSpace: 'nowrap',
                              lineHeight:`${(number*30)}px`,
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
            title: '考核项目',
            key: 'name',
            align: 'center',
            minWidth: 120,
            render: (h, params) => {
              let row = params.row
              if (!row.maxItems.length) {
                return h('div', '')
              } else {
                return h('div', [
                  h('div', row.maxItems.map((item,index) => {
                    const number = item.minItems.length;
                    let length = row.maxItems.length;
                    return h('div', {
                      style:{
                        height:`${number*30}px`,
                        // padding:'1px 0',
                        
                        borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                      }
                    }, [
                    h('div', item.minItems.map((items,indexs) => {
                      let text = item.examItemName;
                      return h('div', {
                        style: {
                          height:'30px',
                          // padding:'3px 0',
                          borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                          lineHeight:`30px`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          textAlign:'center',
                        }
                      }, items.examItemName)
                    }))
                  ])
                  }))
                ]);
              }
            }
          },
          {
            title: '成绩',
            key: 'name',
            align: 'center',
            minWidth: 60,
            render: (h, params) => {
                let row = params.row;
                if (!row.maxItems.length) {
                  return h('div', '')
                } else {
                  return h('div', [
                    h('div', row.maxItems.map((item,index) => {
                      const number = item.minItems.length;
                      let length = row.maxItems.length;
                        return h('div', {
                          style:{
                            height:`${number*30}px`,
                            borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                          }
                        }, [
                    h('div', item.minItems.map((items,indexs) => {
                        let number = item.minItems.length;
                        let mine,sconed,text;
                        text = text = `${items.resultValue}${items.examUnit}`;
                        //修改内容
                        if(row.testStatus == 1) {
                          if(!items.resultValue && typeof(items.resultValue)!='undefined' && items.resultValue!=0) text = '免考'
                          else {
                            if(items.examUnit == "分.秒") {
                              mine = parseInt(Number(items.resultValue)/60);
                              sconed = items.resultValue%60;
                              text = `${mine}'${sconed}`
                            }
                          }
                        }else {
                          if(!items.score && typeof(items.score)!='undefined' && items.score!=0) text = '22'
                          else {
                            if(items.examUnit == "分.秒") {
                              mine = parseInt(Number(items.resultValue)/60);
                              sconed = items.resultValue%60;
                              text = `${mine}'${sconed}`
                            }
                          }
                        }
                        return h('div',{
                            style: {
                              height:'30px',
                              // padding:'3px 0',
                              borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                              lineHeight:`30px`,
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              textAlign:'center',
                            }
                          }, [
                           h('span', {
                            style: {
                              height:'30px',
                              // padding:'3px 0',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              lineHeight:`30px`,
                              overflow: 'hidden',
                              textAlign:'center',
                              visibility:`${text == '22'?'hidden':'visible'}`
                            }
                          }, text)
                        ])
                    }))
                ])
                    }))
                ]);
                }
                
            }
        },
          {
            title: '基础得分',
            key: 'name',
            align: 'center',
            minWidth: 60,
            render: (h, params) => {
              let row = params.row;
                  if (!row.maxItems.length) {
                    return h('div', '')
                  } else {
                    return h('div', [
                      h('div', row.maxItems.map((item,index) => {
                        const number = item.minItems.length;
                        let length = row.maxItems.length;
                          return h('div', {
                            style:{
                              height:`${number*30}px`,
                              borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                              lineHeight:`30px`,
                            }
                          }, [
                      h('div', item.minItems.map((items,indexs) => {
                          let number = item.minItems.length;
                          let text = items.baseScore?items.baseScore:'22';
                          return h('div', {
                            attrs:{class:"clearfix"},
                            style: {
                              height:'30px',
                              // padding:'3px 0',
                              borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              textAlign:'center',
                              overflow: 'hidden',
                              lineHeight:`30px`,
                            }
                          }, [
                             h('span', {
                              style: {
                                height:'30px',
                                // padding:'3px 0',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                textAlign:'center',
                                visibility:`${text == '22'?'hidden':'visible'}`,
                                lineHeight:`30px`,
                              }
                            }, text)
                          ])
                      }))
                  ])
                      }))
                  ]);
                  }
                  
              }
        },
          {
              title: '技评得分',
              key: 'name',
              align: 'center',
              minWidth: 60,
              render: (h, params) => {
                let row = params.row;
                if (!row.maxItems.length) {
                  return h('div', '')
                } else {
                  return h('div', [
                    h('div', row.maxItems.map((item,index) => {
                      const number = item.minItems.length;
                      let length = row.maxItems.length;
                        return h('div', {
                          style:{
                            height:`${number*30}px`,
                            borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                          }
                        }, [
                    h('div', item.minItems.map((items,indexs) => {
                        let number = item.minItems.length;
                        let text = items.teacherScore ?items.teacherScore:'22';
                        return h('div', {
                          attrs:{class:"clearfix"},
                          style: {
                            height:'30px',
                            lineHeight:`30px`,
                            // padding:'3px 0',
                            borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            textAlign:'center',
                            overflow: 'hidden',
                          }
                        }, [
                           h('span', {
                            style: {
                              height:'30px',
                              // padding:'3px 0',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              lineHeight:`30px`,
                              textAlign:'center',
                              visibility:`${text == '22'?'hidden':'visible'}`
                            }
                          }, text)
                        ])
                    }))
                ])
                    }))
                ]);
                }
                
            }
          },
          {
              title: '项目得分',
              key: 'name',
              align: 'center',
              minWidth: 60,
              render: (h, params) => {
                let row = params.row;
                if (!row.maxItems.length) {
                  return h('div', '')
                } else {
                  return h('div', [
                    h('div', row.maxItems.map((item,index) => {
                      const number = item.minItems.length;
                      let length = row.maxItems.length;
                        return h('div', {
                          style:{
                            height:`${number*30}px`,
                            borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                          }
                        }, [
                    h('div', item.minItems.map((items,indexs) => {
                        let number = item.minItems.length;
                        let text = items.score ?items.score:'22';
                        return h('div', {
                          attrs:{class:"clearfix"},
                          style: {
                            height:'30px',
                            // padding:'3px 0',
                            borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            textAlign:'center',
                            lineHeight:`30px`,
                          }
                        }, [
                           h('span', {
                            style: {
                              height:'30px',
                              // padding:'3px 0',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              textAlign:'center',
                              overflow: 'hidden',
                              lineHeight:`30px`,
                              visibility:`${text == '22'?'hidden':'visible'}`
                            }
                          }, text)
                        ])
                    }))
                ])
                    }))
                ]);
                } 
            }
          },
          {
            title: '等级',
            key: 'name',
            align: 'center',
            minWidth: 60,
            render: (h, params) => {
              let row  = params.row;
              if (!row.maxItems.length) {
                return h('div', '')
              } else {
                return h('div', [
                  h('div', row.maxItems.map((item,index) => {
                    const number = item.minItems.length;
                    let length = row.maxItems.length;
                      return h('div', {
                        style:{
                          height:`${number*30}px`,
                          borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                        }
                      }, [
                  h('div', item.minItems.map((items,indexs) => {
                      let number = item.minItems.length;
                      let text = items.scoreLevel==1?'优秀':items.scoreLevel==2?'良好':items.scoreLevel==3?'及格':items.scoreLevel==4?'不及格':items.scoreLevel==5?'':'22';
                      return h('div', {
                        attrs:{class:"clearfix"},
                        style: {
                          height:'30px',
                          // padding:'3px 0',
                          borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          textAlign:'center',
                          lineHeight:`30px`,
                        }
                      }, [
                         h('span', {
                          style: {
                            height:'30px',
                            // padding:'3px 0',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            textAlign:'center',
                            lineHeight:`30px`,
                            overflow: 'hidden',
                            visibility:`${text == '22'?'hidden':'visible'}`
                          }
                        }, text)
                      ])
                  }))
              ])
                  }))
              ]);
              } 
          }
        },
          {
              title: '测试总得分',
              key: 'physicalScore',
              align: 'center',
              minWidth: 60,
              render:(h,params) =>{
                let row = params.row;
                let text = row.sumScore;
                return h('div',{
                  style:{
                    visibility:`${text == '22'?'hidden':'visible'}`
                  }
                },text)
              }
          },
          {
              title: '测试等级',
              key: 'skillScore',
              align: 'center',
              minWidth: 60,
              render:(h,params) =>{
                const {row} = params;
                let text = row.level==1?'优秀':row.level==2?'良好':row.level==3?'及格':row.level==4?'不及格':row.level==5?'':'22';
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
                  let row = params.row;
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
            title: "年级",
            key: "gradeName",
            align: "center",
            minWidth: 120,
          },
          {
            title: "项目编号",
            key: "orderIndex",
            align: "center",
            minWidth: 120,
          },
          {
            title: '项目',
            key: 'name',
            align: 'center',
            minWidth: 120,
            render: (h, params) => {
               let row = params.row;
              if (row.examCount<=1) {
                return h('div', row.classTestName);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                          minHeight:'30px',
                          padding:'3px 0',
                          lineHeight:`30px`,
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                      }
                    },item.itemName)
                  }))
                ]);
              }
            }
          },
          {
            title: "完成人数/测试总人数",
            key: "createTime",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row;
              if (row.examCount<=1) {
                return h('div', `${row.finishNumber}/${row.testNumberCount}`);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          lineHeight:`30px`,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                      }
                    },item.dataType == 2? `${item.finishNumber}/${item.testNumberCount?item.testNumberCount:0}`:'--')
                  }))
                ]);
              }
            }
          },
          {
            title: "平均成绩",
            key: "avgResultValue",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row,text='',mine,sconed;
              text = `${row.avgResultValue?Number(row.avgResultValue).toFixed(1):''}${row.examUnit&&row.avgResultValue?row.examUnit:''}`;
              if(row.examUnit == "分.秒"&&row.avgResultValue) {
                let val = Math.round(Number(row.avgResultValue));
                mine = parseInt(val/60);
                sconed = val%60;
                text = `${mine}'${sconed}`
              };
              if (row.examCount<=1) {
                return h('div', text);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    let text='',mine,sconed;
                    text = `${item.avgResultValue?Number(item.avgResultValue).toFixed(1):item.dataType==1?'--':'22'}${item.examUnit&&item.avgResultValue?item.examUnit:''}`;
                    if(item.examUnit == "分.秒"&&item.avgResultValue) {
                      let val = Math.round(Number(row.avgResultValue));
                      mine = parseInt(val/60);
                      sconed = val%60;
                      text = `${mine}'${sconed}`
                    };
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          lineHeight:`30px`,
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          // visibility:`${text == '22' ? 'hidden':'visible'}`
                      }
                    },
                    [
                      h('span', {
                       style: {
                        //  minHeight:'20px',
                        //  padding:'3px 0',
                        //  whiteSpace: 'nowrap',
                        //  textOverflow: 'ellipsis',
                        //  overflow: 'hidden',
                        lineHeight:`30px`,
                         visibility:`${text == '22'?'hidden':'visible'}`
                       }
                     }, item.dataType == 2?text:'--'),
                   ]
                    )
                  }))
                ]);
              }
            },
          },
          {
            title: "平均得分",
            key: "avgScore",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row;
              if (row.examCount<=1) {
                return h('div', row.avgScore.toFixed(2));
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    let text = item.avgScore ? item.avgScore.toFixed(2):'22';
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          lineHeight:`30px`,
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          // visibility:`${text == '22'?'hidden':'visible'}`
                      }
                    },[
                      h('span', {
                       style: {
                        //  minHeight:'20px',
                        //  padding:'3px 0',
                        //  whiteSpace: 'nowrap',
                        //  textOverflow: 'ellipsis',
                        //  overflow: 'hidden',
                        lineHeight:`30px`,
                         visibility:`${text == '22'?'hidden':'visible'}`
                       }
                     }, text)
                   ])
                  }))
                ]);
              }
            }
          },
          {
            title: "优秀率（人数）",
            key: "excellentNumber",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row;
              if (row.examCount<=1) {
                return h('div', `${row.excellentProbability?row.excellentProbability:0}% (${row.excellentNumber?row.excellentNumber:0}人)`);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          lineHeight:`30px`,
                          overflow: 'hidden',
                      }
                    },`${item.excellentProbability?item.excellentProbability:0}% (${item.excellentNumber?item.excellentNumber:0}人)`)
                  }))
                ]);
              }
            }
          },
          {
            title: "良好率（人数）",
            key: "fineProbability",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row;
              if (row.examCount<=1) {
                return h('div', `${row.fineProbability?row.fineProbability:0}% (${row.fineNumber?row.fineNumber:0}人)`);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          lineHeight:`30px`,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                      }
                    },`${item.fineProbability?item.fineProbability:0}% (${item.fineNumber?item.fineNumber:0}人)`)
                  }))
                ]);
              }
            },
          },
          {
            title: "及格率（人数）",
            key: "createTime",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row;
              if (row.examCount<=1) {
                return h('div', `${row.marginalProbability?row.marginalProbability:0}% (${row.marginalNumber?row.marginalNumber:0}人)`);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          lineHeight:`30px`,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                      }
                    },`${item.marginalProbability?item.marginalProbability:0}% (${item.marginalNumber?item.marginalNumber:0}人)`)
                  }))
                ]);
              }
            }
          },
          {
            title: "不及格率（人数）",
            key: "createTime",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              let row = params.row;
              if (row.examCount<=1) {
                return h('div', `${row.notMarginalProbability?row.notMarginalProbability:0}% (${row.notMarginalNumber?row.notMarginalNumber:0}人)`);
              } else {
                return h('div', [
                  h('div', row.detailList.map((item,index) => {
                    const number = row.detailList.length;
                    return h('div', {
                      style:{
                        minHeight:'30px',
                          padding:'3px 0',
                          borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                          whiteSpace: 'nowrap',
                          lineHeight:`30px`,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                      }
                    },`${item.notMarginalProbability?item.notMarginalProbability:0}% (${item.notMarginalNumber?item.notMarginalNumber:0}人)`)
                  }))
                ]);
              }
            }
          },
          {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            if (row.examCount<=1) {
              return  h('div', [
                h(
                    "Button",
                    {
                    props: {
                        type: "success",
                        disabled: false,
                    },
                    on: {
                        click: () => {
                          this.details('project',row);
                        },
                    },
                    },
                    "详情"
                ),
            ]);
            } else {
              return h('div', [
                h('div', row.detailList.map((item,index) => {
                  const number = row.detailList.length;
                  return h('div', {
                    style:{
                      minHeight:'30px',
                        padding:'3px 0',
                        borderBottom:`${index!=number-1?'1px solid #e8eaec':''}`,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }
                  },[
                    h(
                      "Button",
                      {
                        style:{
                          height:'30px',
                          lineHeight:'10px',
                          fontSize:'12px',
                          padding:'1px 15px'
                        },
                        props:{
                          type:'success',
                          disabled:item.dataType == 1?true:false
                        },
                        on: {
                          click: () => {
                            item.grade = row.grade
                            this.details('project',item);
                          }
                        }
                      },
                      "详情"
                    ),
                  ])
                }))
              ]);
            }
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
        let name = 'studentCustomTestDataMsg';
        if(val == 'project') {
          name = 'lookcustomtestdetail';
          this.$router.push({name:name,query:{activityId:this.formList.activityId,classTestId:row.classTestId,examItemId:row.examItemId,grade:row.grade,disabled:true,}})
        }else {
          this.$router.push({name:name,query:{
            studentId:row.studentId,
            activityId:this.formList.activityId,
            disabled:false,
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