<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{semesterName}}</h2>
    </div>
    <div>
      <Card>
       <div class="top-search">
           <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>年级：</span>
                    <Select  v-model="grade" style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass" class="width120">
                        <Option
                                v-for="item in classList"
                                :value="item.value"
                                :key="item.value"
                        >{{ item.label }}
                        </Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="querySearch">查询</Button>
                <Button type="success" @click="toStudentDetail" >学生管理</Button>
                <Button type="success" @click="toExempt">免试管理</Button>
                <Button type="success" @click="tolearn">学习态度管理</Button>
                <Button type="success" @click="toActivity" v-if="yearSemester%2 == 0">体质测试管理</Button>
                <Button type="success" @click="toVisionManage" v-if="yearSemester > 2019">视力测试管理</Button>
                <Button type="success" @click="toHealth">健康知识管理</Button>
                <Button type="success" @click="toActionAndStamina">技能/体能管理</Button>
                <Button type="success" @click="toAfterWork">课后作业管理</Button>
                <Button type="success" @click="batchScore">重新计算成绩</Button>
                <Button type="success" @click="exportGradeInfo">导出</Button>
                <Button type="success" @click="exportStudentScorePre">导出学生成绩单</Button>
                <Button type="success" @click="pageToList">返回</Button>
            </div>
        </div>
      </Card>
      <br>
      <div>
        <Card>
          <div style="font-size:18px;height:40px;"> 数据概览</div>
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumn" :data="resultData"></Table>
            </div>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 数据明细</div>
          <Row>
            <div style="">
              <Table border :loading="loading" :columns="overViewColumn" :data="overViewData"></Table>
            </div>
            <br>
             <div style="float: right;">
              <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
            </div>
          </Row>
        </Card>
      </div>
    </div>
    <Modal
            title="成绩计算中"
            v-model="createSemesterScore"
            :closable="false"
            cancel-text=""
            :mask-closable="false">
      <p><Progress :percent="typeScore" status="active"></Progress></p>
    </Modal>
    <Modal v-model="exportTf" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <span>年级选择</span>
      </p>
      <div style="">
         <span style="margin-left:20px;">年级：</span>
                   <Select  v-model="gradeExport" style="width:120px;">
                        <Option v-for="item in schoolGradeListExport" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  @click="exportStudentScore" >导出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
      exportTf:false,
      typeScore: 0,
      createSemesterScore: false,
      reportingStatus: '',
      semesterName: '',
      yearSemester: '',
      schoolYear:'',
      schoolId:'',
      loading:false,
      grade:0,
      gradeExport:'',
      schoolGradeList: [],
      schoolGradeListExport: [],
      classId: '',
      studentClass: '0',
      semesterStatus:"0",
      classList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: 1,
          label: '1班'
        },
        {
          value: 2,
          label: '2班'
        },
        {
          value: 3,
          label: '3班'
        },
        {
          value: 4,
          label: '4班'
        },
        {
          value: 5,
          label: '5班'
        },
        {
          value: 6,
          label: '6班'
        },
        {
          value: 7,
          label: '7班'
        },
        {
          value: 8,
          label: '8班'
        },
        {
          value: 9,
          label: '9班'
        },
        {
          value: 10,
          label: '10班'
        },
        {
          value: 11,
          label: '11班'
        },
        {
          value: 12,
          label: '12班'
        },
        {
          value: 13,
          label: '13班'
        },
        {
          value: 14,
          label: '14班'
        },
        {
          value: 15,
          label: '15班'
        },
        {
          value: 16,
          label: '16班'
        },
        {
          value: 17,
          label: '17班'
        },
        {
          value: 18,
          label: '18班'
        },
        {
          value: 19,
          label: '19班'
        },
        {
          value: 20,
          label: '20班'
        },
        {
          value: 21,
          label: '21班'
        },
        {
          value: 22,
          label: '22班'
        },
        {
          value: 23,
          label: '23班'
        },
        {
          value: 24,
          label: '24班'
        },
        {
          value: 25,
          label: '25班'
        },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
      ],
      primaryList: [
        {grade: 0, label: '全部'},
        {grade: 1, label: '一年级'},
        {grade: 2, label: '二年级'},
        {grade: 3, label: '三年级'},
        {grade: 4, label: '四年级'},
        {grade: 5, label: '五年级'},
        {grade: 6, label: '六年级'},
      ],
      middleList: [
        {grade: 0, label: '全部'},
        {grade: 7, label: '七年级'},
        {grade: 8, label: '八年级'},
        {grade: 9, label: '九年级'},
      ],
      highList: [
        {grade: 0, label: '全部'},
        {grade: 10, label: '高一'},
        {grade: 11, label: '高二'},
        {grade: 12, label: '高三'},
      ],
      primaryListExport: [
        {grade: 1, label: '一年级'},
        {grade: 2, label: '二年级'},
        {grade: 3, label: '三年级'},
        {grade: 4, label: '四年级'},
        {grade: 5, label: '五年级'},
        {grade: 6, label: '六年级'},
      ],
      middleListExport: [
        {grade: 7, label: '七年级'},
        {grade: 8, label: '八年级'},
        {grade: 9, label: '九年级'},
      ],
      highListExport: [
        {grade: 10, label: '高一'},
        {grade: 11, label: '高二'},
        {grade: 12, label: '高三'},
      ],
      resultColumn: [],
      resultColumns:[
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = this.nowGrade== 0 ? '全部班级':row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4"
                    ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8"
                            ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'全部班级'
            const text1 = this.nowGrade== 0 ? '': row.schoolOver == '0'?('('+row.startSchool+'级)'):'('+row.startSchool+'级,已毕业)'
            return h("span", text+text1);
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', this.nowStudentClass == '0'?'全部班级':(this.studentClass)+'班')
          }
        },
        {
          title: '总人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,
        },
        {
          title: '学习态度',
          key: 'learnScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.learnScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '健康知识',
          key: 'healthScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.healthScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '运动技能',
          key: 'actionScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.actionScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '体能',
          key: 'staminaScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.staminaScore<0?'0.00':(params.row.staminaScore/(100*params.row.semesterFinishStudent)).toFixed(2))))
          }
        },
        {
          title: '课后作业',
          key: 'homeworkScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.homeworkScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '学科评价平均得分',
          key: 'semesterAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.semesterAllScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '学科评价合格率',
          key: 'semesterPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterPassRate == 0? params.row.semesterPassRate : ((params.row.semesterPassRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率',
          key: 'semesterGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterGoodRate == 0? params.row.semesterGoodRate : ((params.row.semesterGoodRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '体质测试平均分',
          key: 'testAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.testFinishStudent <= 0 ?'0.00':(params.row.testAllScore/(100*params.row.testFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '体质测试合格率',
          key: 'testPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.testPassRate == 0? params.row.testPassRate : ((params.row.testPassRate/params.row.testFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '体质测试优良率',
          key: 'testGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.testGoodRate == 0? params.row.testGoodRate : ((params.row.testGoodRate/params.row.testFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        }
      ],
      notTestresultColumns:[
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = this.nowGrade== 0 ? '全部班级':row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4"
                    ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8"
                            ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'全部班级'
            const text1 = this.nowGrade== 0 ? '': row.schoolOver == '0'?('('+row.startSchool+'级)'):'('+row.startSchool+'级,已毕业)'
            return h("span", text+text1);
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', this.nowStudentClass == '0'?'全部班级':(this.studentClass)+'班')
          }
        },
        {
          title: '总人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,
        },
        {
          title: '学习态度',
          key: 'learnScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.learnScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '健康知识',
          key: 'healthScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.healthScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '运动技能',
          key: 'actionScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.actionScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '体能',
          key: 'staminaScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.staminaScore<0?'0.0':(params.row.staminaScore/(100*params.row.semesterFinishStudent)).toFixed(2))))
          }
        },
        {
          title: '课后作业',
          key: 'homeworkScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.homeworkScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '学科评价平均得分',
          key: 'semesterAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.semesterAllScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '学科评价合格率',
          key: 'semesterPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterPassRate == 0? params.row.semesterPassRate : ((params.row.semesterPassRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率',
          key: 'semesterGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterGoodRate == 0? params.row.semesterGoodRate : ((params.row.semesterGoodRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        }
      ],
      resultData:[],
      overViewColumn: [],
      overViewColumns:[
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4"
                    ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8"
                            ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'全部班级'
            const text1 =  row.schoolOver == '0'?('('+row.startSchool+'级)'):'('+row.startSchool+'级,已毕业)'
            // if(row.grade == 0){
            //   return h("span", text);
            // }
            return h("span", text+text1);
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            // if(params.row.studentClass == 0){
            //   return h('div', '-')
            // }
            return h('div', this.nowGrade == '0'?'全部班级':(params.row.studentClass)+'班')
          }
        },
        {
          title: '总人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,
        },
        {
          title: '学习态度',
          key: 'learnScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.learnScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '健康知识',
          key: 'healthScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.healthScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '运动技能',
          key: 'actionScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.actionScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '体能',
          key: 'staminaScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.staminaScore<0?'0.00':(params.row.staminaScore/(100*params.row.semesterFinishStudent)).toFixed(2))))
          }
        },
        {
          title: '课后作业',
          key: 'homeworkScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.homeworkScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '学科评价平均得分',
          key: 'semesterAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.semesterAllScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '学科评价合格率',
          key: 'semesterPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterPassRate == 0? params.row.semesterPassRate : ((params.row.semesterPassRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率',
          key: 'semesterGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterGoodRate == 0? params.row.semesterGoodRate : ((params.row.semesterGoodRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '体质测试平均分',
          key: 'testAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.testFinishStudent<=0?'0.00':(params.row.testAllScore/(100*params.row.testFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '体质测试合格率',
          key: 'testPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.testPassRate == 0? params.row.testPassRate : ((params.row.testPassRate/params.row.testFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '体质测试优良率',
          key: 'testGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = `${params.row.testGoodRate == 0? params.row.testGoodRate : ((params.row.testGoodRate/params.row.testFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth:200,
          fixed:"right",
          render: (h, params) => {
              if (params.row.yearSemester % 10 === 1) {
                  return h('div', [
                      h(
                          'Button',
                          {
                              props: {
                                  type: 'success'
                              },
                              style: {
                              },
                              on: {
                                  click: () => {
                                      this.toDetail(params.row)
                                  }
                              }
                          },
                          '详情'
                      ),h(
                          'Button',
                          {
                              props: {
                                  type: 'success'
                              },
                              style: {
                                  marginLeft: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.exportData(params.row)
                                  }
                              }
                          },
                          '导出综合评价成绩'
                      )
                  ])
              } else {
                  return h('div', [
                      h(
                          'Button',
                          {
                              props: {
                                  type: 'success'
                              },
                              style: {
                              },
                              on: {
                                  click: () => {
                                      this.toDetail(params.row)
                                  }
                              }
                          },
                          '详情'
                      )
                  ])
              }
          }
        }
      ],
      notTestoverViewColumns:[
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4"
                    ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8"
                            ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'全部班级'
            const text1 =  row.schoolOver == '0'?('('+row.startSchool+'级)'):'('+row.startSchool+'级,已毕业)'
            return h("span", text+text1);
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', this.nowGrade == '0'?'全部班级':(params.row.studentClass)+'班')
          }
        },
        {
          title: '总人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,
        },
        {
          title: '学习态度',
          key: 'learnScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.learnScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '健康知识',
          key: 'healthScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.healthScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '运动技能',
          key: 'actionScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.actionScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '体能',
          key: 'staminaScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.staminaScore<0?'0.0':(params.row.staminaScore/(100*params.row.semesterFinishStudent)).toFixed(2))))
          }
        },
        {
          title: '课后作业',
          key: 'homeworkScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.homeworkScore/(100*params.row.semesterFinishStudent)).toFixed(2)))

          }
        },
        {
          title: '学科评价平均得分',
          key: 'semesterAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.semesterFinishStudent == 0 ?'0.00':(params.row.semesterAllScore/(100*params.row.semesterFinishStudent)).toFixed(2)))
          }
        },
        {
          title: '学科评价合格率',
          key: 'semesterPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterPassRate == 0? params.row.semesterPassRate : ((params.row.semesterPassRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率',
          key: 'semesterGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterGoodRate == 0? params.row.semesterGoodRate : ((params.row.semesterGoodRate/params.row.semesterFinishStudent)*100).toFixed(2)}%`
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth:200,
          fixed:"right",
          render: (h, params) => {
            if (params.row.yearSemester % 10 === 1) {
                return h('div', [
                    h(
                        'Button',
                        {
                            props: {
                                type: 'success'
                            },
                            style: {
                            },
                            on: {
                                click: () => {
                                    this.toDetail(params.row)
                                }
                            }
                        },
                        '详情'
                    ),h(
                        'Button',
                        {
                            props: {
                                type: 'success'
                            },
                            style: {
                                marginLeft: '5px'
                            },
                            on: {
                                click: () => {
                                    this.exportData(params.row)
                                }
                            }
                        },
                        '导出综合评价成绩'
                    )
                ])
            } else {
                return h('div', [
                    h(
                        'Button',
                        {
                            props: {
                                type: 'success'
                            },
                            style: {
                            },
                            on: {
                                click: () => {
                                    this.toDetail(params.row)
                                }
                            }
                        },
                        '详情'
                    )
                ])
            }
          }
        }
      ],
      overViewData:[],
      passSeriesData:[],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      nowGrade: 0,
      nowStudentClass: '0'
    }
  },
  methods: {
    cancle(){
      this.exportTf=false;
    },
    exportStudentScorePre(){
      this.exportTf=true;
    },
    exportGradeInfo(){
      var vm = this;
      let url =this.$axios.defaults.baseURL +
              '/v1/datafiles/exportGradeDataFilsList?schoolId='+
              this.schoolId +
              '&grade=' +
              (this.grade==0?"":this.grade)+
              '&yearSemester=' +
              this.yearSemester +
              '&studentClass=' +
              (this.studentClass=="0"?"":this.studentClass) +
              '&token=' +sessionStorage.getItem("token")
      window.open(url);
    },
    exportStudentScore(){
      var vm=this;
      let url =
        this.$axios.defaults.baseURL +
        '/v1/semesterScore/exportStudentScorePdf?grade='+vm.gradeExport+'&yearSemester='+vm.yearSemester+
        '&token=' +
        sessionStorage.getItem('token')
        window.open(url)
        this.exportTf=false;
    },
    toActionAndStamina(){
      sessionStorage.setItem("dataFilesGradeInfo-actionStaminaGrade-yearSemester", this.yearSemester);
      this.$router.push({ name: "actionStaminaGrade" });
    },
    toAfterWork(){
      sessionStorage.setItem("hisExerciseManageClass-yearSemester", this.yearSemester);
      this.$router.push({ name: "hisExerciseManageClass" });
    },
    toExempt(){
      sessionStorage.setItem("hisStudentExempt-getStudentInfoList-yearSemester", this.yearSemester);
      this.$router.push({ name: "hisStudentExempt" });
    },
    toActivity(){
      sessionStorage.setItem("hisActivityClassList-yearSemester", this.yearSemester);
      this.$router.push({ name: "hisActivityClassList" });
    },
    //去视力测试管理管理页面
    toVisionManage(){
        this.$router.push({name:'hisVisionManage',query:{yearSemester: this.yearSemester}})
    },
    tolearn(){
      sessionStorage.setItem("hisStudyLearningManage-yearSemester", this.yearSemester);
      this.$router.push({ name: "hisStudyLearningManage" });
    },
    toHealth(){
      sessionStorage.setItem("hisPaperScoreManage-yearSemester", this.yearSemester);
      this.$router.push({ name: "hisPaperScoreManage" });
    },
    batchScore(){
      this.typeScore=0;
      this.createSemesterScore = true;
      this.$axios.get("/v1/datafiles/insertNewStudent?yearSemester="+this.yearSemester).then(res => {
        if (res.data.code == 10000) {
          this.batchScore1();
          this.typeScore = 20;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore1(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsExamScore?yearSemester="+this.yearSemester).then(res => {
        if (res.data.code == 10000) {
          this.batchScore2();
          this.typeScore = 40;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore2(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsHomeworkScore?yearSemester="+this.yearSemester).then(res => {
        if (res.data.code == 10000) {
          this.batchScore3();
          this.typeScore = 60;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore3(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsLearnScore?yearSemester="+this.yearSemester).then(res => {
        if (res.data.code == 10000) {
          this.batchScore4();
          this.typeScore = 80;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore4(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsScore?yearSemester="+this.yearSemester).then(res => {
        if (res.data.code == 10000) {
            this.querySearch();
            this.typeScore = 100;
            this.createSemesterScore = false;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    pageToList() {
      this.$router.go(-1)
    },
    toStudentDetail(){
      var vm = this;
      sessionStorage.setItem("dataFiles-sportsScoreStudent-yearSemester", this.yearSemester);
      sessionStorage.setItem("dataFiles-sportsScoreStudent-grade", this.grade);
      sessionStorage.setItem("dataFiles-sportsScoreStudent-studentClass", this.studentClass);
      sessionStorage.setItem("dataFiles-sportsScoreStudent-reportingStatus", this.reportingStatus);
      sessionStorage.setItem("dataFiles-sportsScoreStudent-semesterName", this.semesterName);
      this.$router.push({ name: "dataFilesScoreStudent" });
    },
    toDetail(item) {
      var vm = this;
      sessionStorage.setItem("dataFiles-sportsScoreStudent-yearSemester", this.yearSemester);
      sessionStorage.setItem("dataFiles-sportsScoreStudent-grade", item.grade);
      if(this.grade==0){
        sessionStorage.setItem("dataFiles-sportsScoreStudent-studentClass", 0);
      }else {
        sessionStorage.setItem("dataFiles-sportsScoreStudent-studentClass", item.studentClass);
      }
      sessionStorage.setItem("dataFiles-sportsScoreStudent-semesterName", this.semesterName);
      sessionStorage.setItem("dataFiles-sportsScoreStudent-reportingStatus", this.reportingStatus);
      this.$router.push({ name: "dataFilesScoreStudent" });
    },

    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.search();
        this.searchNum();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageNum = 1;
        this.pageSize = value
        this.search();
        this.searchNum();
      }
    },
    querySearch(){
      if(this.studentClass!='0'){
        if(this.grade==0){
          this.$Message.error("请选择年级！");
          return
        }
      }
      this.searchsurvey();
      this.search();
      this.searchNum();

    },
    toDetail1(){
      this.$router.push({ name: "hisActivityClassList" });
    },
      addHomeWorkSemesterInfo(){
          this.$axios
              .get(
                  '/v1/datafiles/addHomeWorkSemesterInfo?schoolId='+
                  this.schoolId +
                  '&yearSemester=' +
                  this.yearSemester
              )
              .then(res => {
                  if (res.data.code == 10000) {
                  }
              })
      },
    searchsurvey(){
      this.$axios
        .get(
          '/v1/datafiles/getGradeDataFils?schoolId='+
                this.schoolId +
                '&grade=' +
                (this.grade=="0"?"":this.grade)+
                '&yearSemester=' +
                this.yearSemester +
                '&studentClass=' +
                (this.studentClass=="0"?"":this.studentClass)
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.nowGrade = this.grade;
            this.nowStudentClass = this.studentClass
            this.resultData = res.data.response
          }
        })
    },
    search(){
      this.$axios
        .get(
          '/v1/datafiles/getGradeDataFilsList?schoolId='+
                this.schoolId +
                '&grade=' +
                (this.grade==0?"":this.grade)+
                '&pageNum=' +
                this.pageNum +
                '&pageSize=' +
                this.pageSize +
                '&yearSemester=' +
                this.yearSemester +
                '&studentClass=' +
                (this.studentClass=="0"?"":this.studentClass)
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response
            if(data.length == 1){
                if(data[0].grade==0||data[0].studentClass==0){
                  this.overViewData = []
                  return;
                }
            }
            this.overViewData = res.data.response
          }
        })
    },
    searchNum(){
      this.$axios
        .get(
          '/v1/datafiles/getGradeDataFilsListNum?schoolId='+
                this.schoolId +
                '&grade=' +
                (this.grade==0?"":this.grade)+
                '&yearSemester=' +
                this.yearSemester +
                '&studentClass=' +
                (this.studentClass=="0"?"":this.studentClass)
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.total = res.data.response;
          }
        })
    },
    exportData (item) {
        let yearSemester = item.yearSemester;
        if (yearSemester % 10 === 2) {
            yearSemester = (Math.floor(yearSemester / 10) + 1) * 10 + 1;
        }
        let url =
            `${this.$axios.defaults.baseURL}/v1/semesterScore/exportStudentListV2?grade=${item.grade}&selectYear=3&token=${sessionStorage.getItem('token')}&yearSemester=` + yearSemester + '&schoolDistrict=1000';
        window.open(url)
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {
    let vm = this;
    let schoolType = sessionStorage.getItem('schoolType');
    if (schoolType) {
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
                .concat(vm.primaryList)
                .concat(vm.middleList)
                .concat(vm.highList);
      }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.primaryList;
        vm.schoolGradeListExport=vm.primaryListExport
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.middleList;
        vm.schoolGradeListExport=vm.middleListExport;
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.highList;
        vm.schoolGradeListExport=vm.highListExport
      }
      vm.gradeExport=vm.schoolGradeListExport[0].grade;
    }
    
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    vm.yearSemester = Number(sessionStorage.getItem("dataFilsManage-grade-yearSemester"));
    vm.semesterName = sessionStorage.getItem("dataFilsManage-grade-semesterName");
    vm.reportingStatus = sessionStorage.getItem("dataFilsManage-grade-reportingStatus");
    if(this.yearSemester%2 == 1){
     this.overViewColumn = this.notTestoverViewColumns;
     this.resultColumn = this.notTestresultColumns;
    }else {
      this.overViewColumn = this.overViewColumns;
      this.resultColumn = this.resultColumns;
    }
      this.addHomeWorkSemesterInfo();
    this.querySearch();
  }
}
</script>
