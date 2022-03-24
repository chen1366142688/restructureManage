<template>
    <div class="student-manage">
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">学生数据管理</h2>
        </div>
        <div>
            <Card>
                <div class="top-search addClass" @keydown.enter="querySearch">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>年<span style="visibility:hidden">年</span>级：</span>
                            <Select v-model="formList.grade" style="width:120px">
                                <Option
                                v-for="(item,index) in gradeList"
                                :value="item.grade"
                                :key="item.grade+index"
                                >{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>班<span style="visibility:hidden">班</span>级：</span>
                            <Select v-model="formList.studentClass" style="width:120px">
                                <Option
                                v-for="(item,index) in classList"
                                :value="item.value"
                                :key="item.value+index"
                                >{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>性<span style="visibility:hidden">性</span>别：</span>
                            <Select v-model="formList.gender" style="width:120px;">
                                <Option
                                v-for="(item,i) in genderList"
                                :value="item.id"
                                :key="item.id+i"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="margin: 5px 20px">
                            <span>姓<span style="visibility: hidden;">占</span>名：</span>
                            <Input v-model="formList.studentName" placeholder="学生姓名" class="width120"></Input>
                        </div>
                        <div style="margin: 5px 20px">
                            <span>学籍号：</span>
                            <Input v-model="formList.registerCode" placeholder="学生学籍号" class="width120"></Input>
                        </div>
                    </div>
                    <div  class="right-btns addClass">
                        <Button type="success" @click="querySearch">查询</Button>
                        <Button type="success" @click="restSearch">重置查询条件</Button>
                        <Button type="success" @click="exportbodyMonitor">导出EXCEL</Button>
                    </div>
                </div>
            </Card>
        </div>
        <div style="margin-top:20px">
            <Card>
                <Row>
                    <div class="table-title">数据明细</div>
                    <div style>
                        <Table
                            border
                            max-height="800"
                            :loading="loading"
                            :columns="resultColumns"
                            :data="resultData"
                            id="project"
                            style="margin-top:16px;"
                        >

                        </Table>
                    </div>
                    <br />
                    <div style="float: right;">
                        <Page
                        :total="formList.total"
                        :current="formList.pageNum"
                        :page-size="formList.pageSize"
                        @on-change="pageNumChange"
                        @on-page-size-change="pageSizechange"
                        show-total
                        show-sizer
                        ></Page>
                    </div>
                </Row>
            </Card>
        </div>
    </div>
</template>
<script>
import api from '@/api/studentApi.js';
import comon from  './components/comon.js'
import util from "@/libs/util.js";
export default {
  mixins:[comon],
    data() {
        return {
            gradeList:[], //年级列表
            sexList:[], // 性别列表
            formList: { //搜索参数列表
                grade: '',
                studentClass: '',
                gender: '',
                studentName: '',
                registerCode: '',
                total: 1,
                pageSize:10,
                pageNum:1,
            },
            loading: false,
            resultColumns: [
                {
                    title: '姓名',
                    key: 'studentName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '性别',
                    key: 'name',
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
                    minWidth: 100,
                },
                {
                    title: '班级',
                    key: 'studentClass',
                    align: 'center',
                    minWidth: 100,
                    render:(h,params) =>{
                      const {row} = params;
                      return h('div',`${row.gradeName}${row.studentClass?row.studentClass:''}班`)
                    }
                },
                {
                    title: '项目名称',
                    key: 'name',
                    align: 'center',
                    minWidth: 200,
                    render: (h, params) => {
                        const {row} = params;
                        const number = this.queryNumber(row.studentDataItems)
                        if(row.testStatus == 1&&!row.studentDataItems.length) {
                          return h('div', '--')
                        } else {
                          return h('div',[
                            h('div',row.studentDataItems.map((item,index) => {
                                let text = item.middleItemName;
                                const number = item.smallVOS.length;
                                let length = row.studentDataItems.length;
                                return h('div', { 
                                  class:['white_class'],
                                  style:{
                                    width:'100%',
                                    height:`${number*20}px`, //height:`${number*20+number*3*2+(number*1-1)}px`,
                                    boxSizing:'content-box',
                                    borderBottom:`${index!= length-1?'1px solid #e8eaec' :''}`,
                                    // lineHeight:`${number*20}px`,
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                  }
                                }, [
                                   h('span', {
                                    style: {
                                    boxSizing:'content-box',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    }
                                  }, text)
                                ])
                            }))
                          ]);
                        }
                        
                    }
                },
                {
                  title: '考核项目',
                  key: 'name',
                  align: 'center',
                  minWidth: 200,
                  render: (h, params) => {
                    const {row} = params;
                    if (row.testStatus == 1&&!row.studentDataItems.length) {
                      return h('div', '--')
                    } else {
                      return h('div', [
                        h('div', row.studentDataItems.map((item,index) => {
                          const number = item.smallVOS.length;
                          let length = row.studentDataItems.length;
                          return h('div', {
                            style:{
                              height:`${number*20}px`,
                              boxSizing:'content-box',
                              // padding:'1px 0',
                              borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                            }
                          }, [
                          h('div', item.smallVOS.map((items,indexs) => {
                            let text = item.smallItemName;
                            return h('div', {
                              style: {
                                height:'20px',
                                borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                              }
                            }, items.smallItemName)
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
                        const {row} = params;
                        if (row.testStatus == 1&&!row.studentDataItems.length) {
                          return h('div', '免考')
                        } else {
                          return h('div', [
                            h('div', row.studentDataItems.map((item,index) => {
                              const number = item.smallVOS.length;
                              let length = row.studentDataItems.length;
                                return h('div', {
                                  style:{
                                    height:`${number*20}px`,
                                    borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                                    boxSizing:'content-box',
                                  }
                                }, [
                            h('div', item.smallVOS.map((items,indexs) => {
                                let number = item.smallVOS.length;
                                let mine,sconed,text;
                                text = text = `${items.achievementValue}${items.unit}`;
                                //修改内容
                                if(row.testStatus == 1) {
                                  if(!items.achievementValue && typeof(items.achievementValue)!='undefined' && items.achievementValue!=0) text = '免考'
                                  else {
                                    if(items.unit == "分.秒") {
                                      mine = parseInt(Number(items.achievementValue)/60);
                                      sconed = items.achievementValue%60;
                                      text = `${mine}'${sconed}`
                                    }
                                  }
                                }else {
                                  if(!items.score && typeof(items.score)!='undefined' && items.score!=0) text = '22'
                                  else {
                                    if(items.unit == "分.秒") {
                                      mine = parseInt(Number(items.achievementValue)/60);
                                      sconed = items.achievementValue%60;
                                      text = `${mine}'${sconed}`
                                    }
                                  }
                                }
                                return h('div',{
                                    style: {
                                      height:'20px',
                                      borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                                      whiteSpace: 'nowrap',
                                      textOverflow: 'ellipsis',
                                      overflow: 'hidden',
                                    }
                                  }, [
                                   h('span', {
                                    style: {
                                      height:'20px',
                                      whiteSpace: 'nowrap',
                                      textOverflow: 'ellipsis',
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
                    title: '项目得分',
                    key: 'name',
                    align: 'center',
                    minWidth: 60,
                    render: (h, params) => {
                        const {row} = params;
                        if (row.testStatus == 1&&!row.studentDataItems.length) {
                          return h('div', '--')
                        } else {
                          return h('div', [
                            h('div', row.studentDataItems.map((item,index) => {
                              const number = item.smallVOS.length;
                              let length = row.studentDataItems.length;
                                return h('div', {
                                  style:{
                                    height:`${number*20}px`,
                                    borderBottom:`${index!=length-1?'1px solid #e8eaec':''}`,
                                    boxSizing:'content-box',
                                  }
                                }, [
                            h('div', item.smallVOS.map((items,indexs) => {
                                let number = item.smallVOS.length;
                                let text = items.score;
                                if(row.testStatus == 1) {
                                  if(!items.score && typeof(items.score)!='undefined' && items.score!=0) text = '--'
                                }else {
                                  if(!items.score && typeof(items.score)!='undefined' && items.score!=0) text = '22'
                                }
                                return h('div', {
                                  attrs:{class:"clearfix"},
                                  style: {
                                    height:'20px',
                                    borderBottom:`${indexs!=number-1?'1px solid #e8eaec':''}`,
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                  }
                                }, [
                                   h('span', {
                                    style: {
                                      height:'20px',
                                      whiteSpace: 'nowrap',
                                      textOverflow: 'ellipsis',
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
                    title: '基础体能得分',
                    key: 'physicalScore',
                    align: 'center',
                    minWidth: 60,
                    render:(h,params) =>{
                      const {row} = params;
                      let text = row.physicalScore;
                      if(row.testStatus == 1) {
                        if(!row.physicalScore && typeof(row.physicalScore)!='undefined' && row.physicalScore!=0) text = '--';
                        else {
                          let val = this.dateTest(row.studentDataItems);
                          if(val) {
                            text = '22'
                          }
                        }
                      }
                      return h('div',{
                        style:{
                          visibility:`${text == '22'?'hidden':'visible'}`
                        }
                      },text)
                    }
                },
                {
                    title: '专项技能得分',
                    key: 'skillScore',
                    align: 'center',
                    minWidth: 60,
                    render:(h,params) =>{
                      const {row} = params;
                      let text = row.skillScore;
                      if(row.testStatus == 1) {
                        if(!row.skillScore && typeof(row.skillScore)!='undefined' && row.skillScore!=0) text = '--'
                        else {
                          let val = this.dateTest(row.studentDataItems);
                          if(val) {
                            text = '22'
                          }
                        }
                      }
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
                                style: {
                                    marginRight: "10px",
                                },
                                on: {
                                    click: () => {
                                    this.toDetail(row.studentId);
                                    },
                                },
                                },
                                "详情"
                            ),
                        ])
                    }
                },
            ],
            resultData: [],
            schoolId:'',
            schoolGradeList:[],
        }
    },
    created() {
    let params = util.hasParams(this.$store, this.$route);
      if (params) {
        this.formList = {
          ...params,
          gender:params.gender == ""?"22":params.gender,
          grade:params.grade == ""?"9999":params.grade,
          studentClass:params.studentClass == ""?"9999":params.studentClass,
        };
      }
    },
    mounted() {
      this.queryStudentList();
    },
    methods:{
        //计算是否全部考完
        dateTest(arr) {
          let judgeBoolean = false;
          try {
            arr.forEach((item) => {
              let smallVos = item.smallVOS;
              try {
                smallVos.forEach((child)=>{
                  if(!child.score && typeof(child.score)!='undefined' && child.score!=0) {
                    judgeBoolean = true;
                    throw "终止";
                  }
                })
              } catch (error) {
                
              }
              if(judgeBoolean) throw "终止";
            });
          } catch (e) {}
          return judgeBoolean;
        },
        //导出excel
        exportbodyMonitor() {
          let {grade,studentClass,gender,studentName,registerCode} = this.formList
          let url = `${this.$axios.defaults.baseURL}/v1/middleData/exportMiddleItemStudent?token=${sessionStorage.getItem("token")}&gradeId=${grade}&studentClass=${studentClass}&gender=${gender}&studentName=${studentName}&registerCode=${registerCode}`
          window.open(url);
        },
        queryNumber(Arr = []) {
          const parentNum = Arr.length;
          let child = 0;
          Arr.forEach((item,index,Arr) => {
            const {smallVOS} = item;
            child += smallVOS.length;
          });
          return child
        },
        queryStudentList() { //获取学生数据列表
            const data = this.formList;
            let params = {
                ...data,
                grade:data.grade == '9999'? '':data.grade,
                studentClass:data.studentClass == '9999'? '':data.studentClass,
                gender:data.gender == '22'? '':data.gender,
                pageNo: this.formList.pageNum,
                pageSize: this.formList.pageSize,
            }
            this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
            api.getStudentData(params).then((res)=>{
              const {pageNum, pageSize, total, result } = res.data.response;
              this.formList.pageNum = pageNum;
              this.formList.pageSize = pageSize;
              this.formList.total = total;
              this.resultData = result;
            });
        },
        querySearch() { // 搜索查询数据
          this.formList.pageNum = 1;
          this.formList.pageSize = 10;
          this.queryStudentList();
        },
        //重置搜索条件
        restSearch() {
          this.formList = { //搜索参数列表
                grade: '',
                studentClass: '',
                gender: '',
                studentName: '',
                registerCode: '',
            };
            this.queryStudentList();
        },
        toDetail(id) { //查询详情
            this.$router.push({ name: "studentMsgKM",params:{
              studentId:id
            } });
        },
        pageNumChange(val) {// 
          this.formList.pageNum = val;
          this.queryStudentList();
        },
        pageSizechange(val) {
          this.formList.pageSize = val;
          this.queryStudentList();
        }
    }
}
</script>
<style lang="less" scoped>
  .white_class {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .clearfix:after {
		  content: " ";
		  display: block;
		  clear: both;
		  height: 0;
		}
		.clearfix {
		  zoom: 1;
		}
    .table-title{
      font-size:20px;
    }
</style>