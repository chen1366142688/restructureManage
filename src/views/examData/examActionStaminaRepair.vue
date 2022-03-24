<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">技能/体能成绩录入</h2>
    </div>
    <Card>
      <div class="top-search">
          <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>年级：</span>
                    <Select v-model="grade" style="width:120px;">
                        <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass" style="width:120px;">
                        <Option
                        v-for="(item,i) in classList"
                        :value="item.value"
                        :key="item.value + i"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓名：</span>
                    <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>
                    <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                    <span>状态：</span>
                    <Select v-model="finishStatus" style="width:120px;">
                    <Option v-for="item in finishList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="search">查询</Button>
                <!-- <Button type="success" @click="restore">重置查询条件</Button> -->
                <Button type="success" @click="pageToClassList">返回</Button>
            </div>
      </div>
    </Card>
    <Card style="margin-top:20px;"  :dis-hover="true">
      <Tabs type="card" @on-click="tagClick"  v-model="examItemName">
        <TabPane
          v-for="(examItem,index) in examItemList"
          :key="index"
          :label="examItem.examItemName"
          :name="examItem.examItemName"
        ></TabPane>
      </Tabs>
      <Table border :loading="loading" max-height="500" :columns="resultColumns" :data="resultData"></Table>
    </Card>
    <div style="margin-top:10px;text-align:center">
      <Button style="width:100px" @click="baseSubmit" type="success">提交</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
      isDisable: true,
      loading:false,
      schoolId: "",
      gender:'',
      examItemList: [],
      examItemId: "",
      examItemName: "",
      examItemType: "",
      schoolType: "",
      yearSemester: "",
      grade: "",
      primaryList: [
        {
          grade: 1,
          label: "一年级",
        },
        {
          grade: 2,
          label: "二年级",
        },
        {
          grade: 3,
          label: "三年级",
        },
        {
          grade: 4,
          label: "四年级",
        },
        {
          grade: 5,
          label: "五年级",
        },
        {
          grade: 6,
          label: "六年级",
        },
      ],
      middleList: [
        {
          grade: 7,
          label: "七年级",
        },
        {
          grade: 8,
          label: "八年级",
        },
        {
          grade: 9,
          label: "九年级",
        },
      ],
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: 1,
          label: "1班",
        },
        {
          value: 2,
          label: "2班",
        },
        {
          value: 3,
          label: "3班",
        },
        {
          value: 4,
          label: "4班",
        },
        {
          value: 5,
          label: "5班",
        },
        {
          value: 6,
          label: "6班",
        },
        {
          value: 7,
          label: "7班",
        },
        {
          value: 8,
          label: "8班",
        },
        {
          value: 9,
          label: "9班",
        },
        {
          value: 10,
          label: "10班",
        },
        {
          value: 11,
          label: "11班",
        },
        {
          value: 12,
          label: "12班",
        },
        {
          value: 13,
          label: "13班",
        },
        {
          value: 14,
          label: "14班",
        },
        {
          value: 15,
          label: "15班",
        },
        {
          value: 16,
          label: "16班",
        },
        {
          value: 17,
          label: "17班",
        },
        {
          value: 18,
          label: "18班",
        },
        {
          value: 19,
          label: "19班",
        },
        {
          value: 20,
          label: "20班",
        },
        {
          value: 21,
          label: "21班",
        },
        {
          value: 22,
          label: "22班",
        },
        {
          value: 23,
          label: "23班",
        },
        {
          value: 24,
          label: "24班",
        },
        {
          value: 25,
          label: "25班",
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
      registerCode: "",
      studentName: "",
      finishStatus: "",
      finishList: [
        {
          name: "全部",
          value: "999",
        },
        {
          name: "已完成",
          value: "1",
        },
        {
          name: "未完成",
          value: "2",
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
      ],
      resultScore: [
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
              if(params.row.resultValue){
                  params.row.resultValue1 = parseInt(params.row.resultValue/60)
                  params.row.resultValue2 = params.row.resultValue%60
              }
            var vm = this;
            let unit=""
            if (params.row.examUnit== "分.秒") {
               unit="秒";
               let unit1="分";
               return h("div",[
                        h('Input',{
                            props: {
                                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue1,
                                size: "small",
                                disabled:params.row.exemptStatus=="1"?true:false,
                            },
                            style:{
                                width:"80px"
                            },
                            on: {
                                input: (val) => {
                                    vm.resultScoreChange(params.row,params.index,val,1)
                                },
                                "on-blur":function(){
                                    let color=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != "" && vm.resultData[params.index].score!=""?"green":"red"
                                    let className=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""  && vm.resultData[params.index].score!="" ?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                                    if (vm.resultData[params.index].resultValue != null && Number(vm.resultData[params.index].resultValue) == 0) {
                                        color = "green";
                                        className = "ivu-icon ivu-icon-ios-checkmark-circle-outline";
                                    }
                                    let examUnit = vm.resultData[params.index].examUnit;
                                    let value = vm.resultData[params.index].resultValue;
                                    if (examUnit === '分.秒' && !/^[0-9]+$/.test(value)) {
                                        color = 'red';
                                        className = 'ivu-icon ivu-icon-ios-alert-outline';
                                    }
                                    document.getElementById(params.row.studentId).style.color=color
                                    document.getElementById(params.row.studentId).className=className
                                }
                            },
                        }),
                        h('span',
                            {
                                style:{
                                    marginLeft: '5px',
                                }},unit1),
                   h('Input',{
                       props: {
                           value: params.row.exemptStatus=="1"?"免试":params.row.resultValue2,
                           size: "small",
                           disabled:params.row.exemptStatus=="1"?true:false,
                       },
                       style:{
                           width:"80px"
                       },
                       on: {
                           input: (val) => {
                               vm.resultScoreChange(params.row,params.index,val,2)
                           },
                           "on-blur":function(){
                               let color=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""&& vm.resultData[params.index].score!=""?"green":"red"
                               let className=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""&& vm.resultData[params.index].score!=""?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                               if (vm.resultData[params.index].resultValue != null && Number(vm.resultData[params.index].resultValue) == 0) {
                                   color = "green";
                                   className = "ivu-icon ivu-icon-ios-checkmark-circle-outline";
                               }
                               let examUnit = vm.resultData[params.index].examUnit;
                               let value = vm.resultData[params.index].resultValue;
                               if (examUnit === '分.秒' && !/^[0-9]+$/.test(value)) {
                                   color = 'red';
                                   className = 'ivu-icon ivu-icon-ios-alert-outline';
                               }
                               document.getElementById(params.row.studentId).style.color=color
                               document.getElementById(params.row.studentId).className=className
                           }
                       },
                   }),
                   h('span',
                       {
                           style:{
                               marginLeft: '5px',
                           }},unit),
                        h('Icon', {
                            props: {
                                type: 'ios-alert-outline',
                            },
                            attrs:{
                                id:params.row.studentId
                            },
                            style:{
                                color:"rgb(255,255,255)",
                                cursor: 'pointer',
                                marginLeft: '5px',
                                fontSize:'18px'
                            },

                        }),
                    ]
                );
              } else if (params.row.examUnit == "99") {
                unit="分";
              } else if (params.row.examUnit == "个数") {
               unit= "个";
              } else {
                unit = params.row.examUnit;
              }
            return h("div",[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.resultScoreChange(params.row,params.index,val,0)
                },
                "on-blur":function(){
                  let color=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"green":"red"
                  let className=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  let examUnit = vm.resultData[params.index].examUnit;
                  let value = vm.resultData[params.index].resultValue;
                  if (examUnit === '分.秒' && !/^[0-9]+$/.test(value)) {
                      color = 'red';
                      className = 'ivu-icon ivu-icon-ios-alert-outline';
                  }
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},unit),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
          },
        },
        {
          title: "最终得分",
          key: "score",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.score;
            if (row.exemptStatus == "1") {
              if(row.exemptType=="1"){
                text="70"
              }else{
                text="80"
              }
              return h("div", text);
            } else {
              return h("div", text);
            }
          },
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            var text = row.scoreLevel;
            if (row.exemptStatus == "1") {
              if(row.exemptType=="1"){
                text="及格"
              }else{
                text="良好"
              }
              return h("div", text);
            } else {
              text =
                text == "1"
                  ? "优秀"
                  : text == "2"
                  ? "良好"
                  : text == "3"
                  ? "及格"
                  : text == "4"
                  ? "不及格"
                  : "";
              return h("div", text);
            }
          },
        },
      ],
      onlyScore: [
        {
          title: "最终得分",
          key: "score",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            return h("div",[
              h('Input',{
             props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.onlyScoreChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.resultData[params.index].score != null && vm.resultData[params.index].score != ""
                  && vm.resultData[params.index].score <= 100 && vm.resultData[params.index].score >= 0 ?"green":"red"
                  let className=vm.resultData[params.index].score != null && vm.resultData[params.index].score != ""
                  && vm.resultData[params.index].score <= 100 && vm.resultData[params.index].score >= 0 ?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  document.getElementById(params.row.studentId).style.color=color
                   document.getElementById(params.row.studentId).className=className
                }
              },
            }),
             h('span', {
              style:{
                marginLeft: '5px',
              }},"分"),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
          },
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            var text = row.scoreLevel;
            if (row.exemptStatus == "1") {
              if(row.exemptType=="1"){
                text="及格"
              }else{
                text="良好"
              }
              return h("div", text);
            } else {
              text =
                text == "1"
                  ? "优秀"
                  : text == "2"
                  ? "良好"
                  : text == "3"
                  ? "及格"
                  : text == "4"
                  ? "不及格"
                  : "";
              return h("div", text);
            }
          },
        },
      ],
      percentScore: [
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit=""
            if (params.row.examUnit== "分.秒") {
               unit="秒";
              } else if (params.row.examUnit == "99") {
                unit="分";
              } else if (params.row.examUnit == "个数") {
               unit= "个";
              } else {
                unit = params.row.examUnit;
              }

            return h("div",[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.percentScoreChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"green":"red"
                  let className=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  console.log(vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != "")
                  document.getElementById(params.row.studentId).style.color=color
                   document.getElementById(params.row.studentId).className=className
                }
              },
            }),
               h('span',
            {
              style:{
                marginLeft: '5px',
              }},unit),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
          },
        },
        {
          title: "成绩得分",
          key: "baseScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            const text = row.baseScore;
            if (row.exemptStatus=="1") {
              return h("div", [h("span", "")]);
            } else {
              return h("div", text);
            }
          },
        },
        {
          title: "技评得分",
          key: "teacherScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            const text = row.teacherScore;
            if (row.exemptStatus=="1") {
              return h("div", [h("span", "")]);
            } else {
              return h("div",[
                h('Select',{
                      props:{
                                                  size:"small",
                                                  value: params.row.exemptStatus=="1"?"": Number(params.row.teacherScore),
                                                  transfer:true,

                                        },
                style:{
                  width:"80px"
                },
                on: {
                  'on-change':(event) => {
                                              this.percentScoreTeacherChange(params.row,params.index,event);
                                            },

                },
            },
               !this.scoreRemarkList?[]:this.scoreRemarkList.map((item) =>{
                                      return h('Option', {
                                          props: {
                                              value: item.testScore,
                                              label: item.testScore
                                          }
                                      })
                                  })

            ),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId+"ppp"
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
            }
          },
        },
        {
          title: "总得分",
          key: "score",
          align: "center",
          minWidth: 100,
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            var text = row.scoreLevel;
            if (row.exemptStatus == "1") {
              if(row.exemptType=="1"){
                text="及格"
              }else{
                text="良好"
              }
              return h("div", text);
            } else {
              text =
                text == "1"
                  ? "优秀"
                  : text == "2"
                  ? "良好"
                  : text == "3"
                  ? "及格"
                  : text == "4"
                  ? "不及格"
                  : "";
              return h("div", text);
            }
          },
        },
      ],
      levelScore: [
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit=""
            if (params.row.examUnit== "分.秒") {
               unit="秒";
              } else if (params.row.examUnit == "99") {
                unit="分";
              } else if (params.row.examUnit == "个数") {
               unit= "个";
              } else {
                unit = params.row.examUnit;
              }

            return h("div",[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.levelScoreChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"green":"red"
                  let className=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  console.log(vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != "")
                  document.getElementById(params.row.studentId).style.color=color
                   document.getElementById(params.row.studentId).className=className
                }
              },
            }),
              h('span',
            {
              style:{
                marginLeft: '5px',
              }},unit),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
          },
        },
        {
          title: "最终得分",
          key: "score",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.teacherScore;
            if (row.exemptStatus=="1") {
              if(row.exemptType=="1"){
                text="70"
              }else{
                text="80"
              }
              return h("div", text);
            } else {

              return h("div",[
                h('Select',{
                      props:{
                                                  size:"small",
                                                  value: params.row.exemptStatus=="1"?"":Number(params.row.score),
                                                  transfer:true,

                                        },
                style:{
                  width:"80px"
                },
                on: {
                  'on-change':(event) => {
                                              this.levelScoreTeacherChange(params.row,params.index,event);
                                            },

                },
            },
               !params.row.scoreList?[]:params.row.scoreList.map((item) =>{
                                      return h('Option', {
                                          props: {
                                              value: item.value,
                                              label: item.name
                                          }
                                      })
                                  })

            ),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId+"ppp"
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
            }
          },
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            var text = row.scoreLevel;
            if (row.exemptStatus == "1") {
              if(row.exemptType=="1"){
                text="及格"
              }else{
                text="良好"
              }
              return h("div", text);
            } else {
              text =
                text == "1"
                  ? "优秀"
                  : text == "2"
                  ? "良好"
                  : text == "3"
                  ? "及格"
                  : text == "4"
                  ? "不及格"
                  : "";
              return h("div", text);
            }
          },
        },
      ],
      doubleScore: [
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit=""
            if (params.row.examUnit== "分.秒") {
               unit="秒";
              } else if (params.row.examUnit == "99") {
                unit="分";
              } else if (params.row.examUnit == "个数") {
               unit= "个";
              } else {
                unit = params.row.examUnit;
              }
            return h("div",[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.doubleScoreResultChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"green":"red"
                  let className=vm.resultData[params.index].resultValue != null && vm.resultData[params.index].resultValue != ""?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  document.getElementById(params.row.studentId).style.color=color
                   document.getElementById(params.row.studentId).className=className
                }
              },
            }),
              h('span',
            {
              style:{
                marginLeft: '5px',
              }},unit),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
          },
        },
        {
          title: "成绩得分",
          key: "baseScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            const text = row.baseScore;
            if (row.exemptStatus=="1") {
              return h("div", [h("span", "")]);
            } else {
              return h("div", text);
            }
          },
        },
        {
          title: "技评得分",
          key: "teacherScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            const text = row.teacherScore;
            if (row.exemptStatus=="1") {
              return h("div", [h("span", "")]);
            } else {
              return h("div",[
              h('Input',{
              props: {
                  value: params.row.exemptStatus=="1"?"":params.row.teacherScore,
                  size: "small",
                  disabled:params.row.exemptStatus=="1"?true:false
                },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.doubleScoreTeacherScoreChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  console.log(vm.resultData[params.index].teacherScore)
                  let color=vm.resultData[params.index].teacherScore != null && vm.resultData[params.index].teacherScore != ""
                  && vm.resultData[params.index].teacherScore <= 100 && vm.resultData[params.index].teacherScore >= 0 ?"green":"red"
                  let className=vm.resultData[params.index].teacherScore != null && vm.resultData[params.index].teacherScore != ""
                  && vm.resultData[params.index].teacherScore <= 100 && vm.resultData[params.index].teacherScore >= 0 ?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  document.getElementById(params.row.studentId+"ppp").style.color=color
                   document.getElementById(params.row.studentId+"ppp").className=className
                }
              },
            }),
            h('Icon', {
                                    props: {
                                        type: 'ios-alert-outline',
                                    },
                                    attrs:{
                                      id:params.row.studentId+"ppp"
                                  },
                                    style:{
                                      color:"rgb(255,255,255)",
                                      cursor: 'pointer',
                                      marginLeft: '5px',
                                      fontSize:'18px'
                                    },

                                }),
            ]
            );
            }
          },
        },
        {
          title: "总得分",
          key: "score",
          align: "center",
          minWidth: 100,
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            var text = row.scoreLevel;
            if (row.exemptStatus == "1") {
              if(row.exemptType=="1"){
                text="及格"
              }else{
                text="良好"
              }
              return h("div", text);
            } else {
              text =
                text == "1"
                  ? "优秀"
                  : text == "2"
                  ? "良好"
                  : text == "3"
                  ? "及格"
                  : text == "4"
                  ? "不及格"
                  : "";
              return h("div", text);
            }
          },
        },
      ],
      examUnit: "",
      examItemPercent: "",
      scoreRemarkList: [],
      standardListMan: [],
      standardListWoMan: [],
      index:'',
      baseStandard:[
        {
          start:10,
          end:59,
          level:"4"
        },
        {
          start:60,
          end:74,
          level:"3"
        },
        {
          start:75,
          end:89,
          level:"2"
        },
        {
          start:90,
          end:100,
          level:"1"
        },
      ],
      excellentScoreList:[],
      goodScoreList:[],
      passScoreList:[],
      notPassScoreList:[],
      excellentScoreListWomen:[],
      goodScoreListWomen:[],
      passScoreListWomen:[],
      notPassScoreListWomen:[],
      scoreList:[],
      preResultData:[],
      maxStandardMan:{},//最优秀的规则
      minStandardMan:{},
      maxStandardWoMan:{},//最优秀的规则
      minStandardWoMan:{}
    };
  },
  methods: {
    pageToClassList() {
      //返回
      this.$router.go(-1);
    },
    search() {
      var vm = this;
      vm.examItemList = [];
      vm.getStudentClassSelectExamItemList();
    },
    tagClick(examItemName) {
      var vm = this;
      for (var i = 0; i < vm.examItemList.length; i++) {
        if (examItemName == vm.examItemList[i].examItemName) {
          vm.examItemId = vm.examItemList[i].examItemId;
          vm.examItemType = vm.examItemList[i].examItemType;
        }
      }
      sessionStorage.setItem("examActionStaminaRepair-selectTabName",this.examItemName);
      vm.getExamItemClassStudentList(vm.examItemId);
    },
    getStudentClassSelectExamItemList() {
      var vm = this;
      this.$axios
        .get(
          "/v1/actionStamina/getStudentClassSelectExamItemList?schoolId=1" +
            "&gradeId=" +
            (this.grade == "999" ? "" : this.grade) +
            "&studentClass=" +
            (this.studentClass == "999" ? "" : this.studentClass) +
            "&yearSemester=" +
            vm.yearSemester
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.examItemList = data;
            if(sessionStorage.getItem("examActionStaminaRepair-selectTabName")){
              vm.examItemName = sessionStorage.getItem("examActionStaminaRepair-selectTabName");
              let isExamId = true;
              for (var i = 0; i < vm.examItemList.length; i++) {
                if (vm.examItemName == vm.examItemList[i].examItemName) {
                  isExamId = false;
                  vm.examItemId = vm.examItemList[i].examItemId;
                  vm.examItemType = vm.examItemList[i].examItemType;
                  sessionStorage.setItem("examActionStaminaRepair-selectTabName",vm.examItemList[i].examItemName);
                }
              }
              if (isExamId && data.length > 0) {
                  vm.examItemId = data[0].examItemId;
                  vm.examItemName = data[0].examItemName;
                  vm.examItemType = data[0].examItemType;
                  sessionStorage.setItem("examActionStaminaRepair-selectTabName",data[0].examItemName);
              }
            }else{
                if(data.length > 0){
                    vm.examItemId = data[0].examItemId;
                    vm.examItemName = data[0].examItemName;
                    vm.examItemType = data[0].examItemType;
                    sessionStorage.setItem("examActionStaminaRepair-selectTabName",data[0].examItemName);
                }
            }
            if(data.length > 0){
                vm.getExamItemClassStudentList(vm.examItemId);
            }else{
                vm.resultData=[]
            }
          } else {
            if (res.data.code > 39999) {
                vm.examItemList = [];
                vm.resultData = [];
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getExamItemClassStudentList(examItemId) {
      var vm = this;
      vm.loading=true
      vm.studentName = vm.studentName.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
      vm.registerCode = vm.registerCode.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
      vm.resultData=[]
      this.$axios
        .get(
          "/v1/actionStamina/getExamItemClassStudentList?schoolId=1" +
            "&gradeId=" +
             this.grade +
            "&studentClass=" +
            this.studentClass +
            "&yearSemester=" +
            vm.yearSemester +
            "&studentName=" +
            vm.studentName +
            "&registerCode=" +
            vm.registerCode +
            "&finishStatus=" +
            (vm.finishStatus == 999 ? "" : vm.finishStatus) +
            "&examItemId=" +
            examItemId
        )
        .then((res) => {

          if (res.data.code == 10000) {
            let data = res.data.response;
            if(res.data.response.length != 0){
                vm.preResultData = data;
                vm.getTestUpdateRule(
                    data[0].grade,
                    data[0].gender,
                    data[0].classId,
                    examItemId
                );
            }else{
                vm.resultData = [];
                vm.loading=false
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },

    getTestUpdateRule(gradeId, gender, classId, examItemId) {
      var vm = this;
      vm.excellentScoreList = [];
      vm.goodScoreList = [];
      vm.passScoreList = [];
      vm.notPassScoreList = [];
      vm.excellentScoreListWomen = [];
      vm.goodScoreListWomen = [];
      vm.passScoreListWomen = [];
      vm.notPassScoreListWomen = [];
      vm.standardList = [];
      vm.standardListMan = [];
      vm.standardListWoMan = [];
      vm.maxStandardMan = {};
      vm.minStandardMan = {};
      vm.maxStandardWoMan = {};
      vm.minStandardWoMan = {};
      this.$axios
        .get(
          "/v1/studentexam/getTestUpdateRule?grade=" +
            gradeId +
            "&gender=" +
            gender +
            "&classId=" +
            classId +
            "&schoolType=" +
            vm.schoolType +
            "&examItemId=" +
            examItemId+
             "&yearSemester=" +
            vm.yearSemester
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.examUnit = data.examUnit;
            vm.examItemPercent = data.examItemPercent;
            vm.scoreRemarkList = data.scoreRemarkList;
            if (vm.scoreRemarkList) {
                for (var j = 0; j < vm.scoreRemarkList.length; j++) {
                    vm.scoreRemarkList[j].testScore = Math.floor(vm.scoreRemarkList[j].testScore  * (100 - vm.examItemPercent)/100);
                }
            }
            if (data.standardVOS) {
              for (let i = 0; i < data.standardVOS.length; i++) {
                if ("1" == data.standardVOS[i].gender) {
                  vm.standardListMan.push(data.standardVOS[i]);
                  if(vm.maxStandardMan && vm.maxStandardMan.scoringCriteriaEnd){
                    if(Number(vm.maxStandardMan.scoringCriteriaEnd) < Number(data.standardVOS[i].scoringCriteriaEnd)){
                      vm.maxStandardMan=data.standardVOS[i]
                    }
                  }else{
                    vm.maxStandardMan=data.standardVOS[i]
                  }
                  if(vm.minStandardMan && vm.minStandardMan.scoringCriteriaEnd){
                    if(Number(vm.minStandardMan.scoringCriteriaEnd) > Number(data.standardVOS[i].scoringCriteriaEnd)){
                      vm.minStandardMan=data.standardVOS[i]
                    }
                  }else{
                    vm.minStandardMan=data.standardVOS[i]
                  }
                } else {
                  vm.standardListWoMan.push(data.standardVOS[i]);
                  if(vm.maxStandardWoMan && vm.maxStandardWoMan.scoringCriteriaEnd){
                    if(Number(vm.maxStandardWoMan.scoringCriteriaEnd) < Number(data.standardVOS[i].scoringCriteriaEnd)){
                      vm.maxStandardWoMan=data.standardVOS[i]
                    }
                  }else{
                    vm.maxStandardWoMan=data.standardVOS[i]
                  }
                  if(vm.minStandardWoMan && vm.minStandardWoMan.scoringCriteriaEnd){
                    if(Number(vm.minStandardWoMan.scoringCriteriaEnd) > Number(data.standardVOS[i].scoringCriteriaEnd)){
                      vm.minStandardWoMan=data.standardVOS[i]
                    }
                  }else{
                    vm.minStandardWoMan=data.standardVOS[i]
                  }
                }
              }
            }
        if(vm.examItemType=="4"){

          let standList=vm.standardListMan;
          let scoreOne = 0;
            let scoreTwo = 0;
            let scoreThree = 0;
            let scoreFour = 0;
            vm.scoreStart = 0;
            vm.scoreEnd = 0;
            for (var i = 0; i < standList.length; i++) {
              if (standList[i].scoreLevel == 1) {
                scoreOne = standList[i].score;
              }
              if (standList[i].scoreLevel == 2) {
                scoreTwo = standList[i].score;
              }
              if (standList[i].scoreLevel == 3) {
                scoreThree = standList[i].score;
              }
              if (standList[i].scoreLevel == 4) {
                scoreFour = standList[i].score;
              }
            }
              vm.scoreStart = scoreOne;
              vm.scoreEnd = 100;
              let length = vm.scoreEnd - vm.scoreStart + 1;
            for (var j = 0; j < length; j++) {
              let num = Number(vm.scoreStart) + Number(j);
              let data = {
                name: num,
                value: num,
              };
              vm.excellentScoreList.push(data);
            }
              vm.scoreStart = scoreTwo;
              vm.scoreEnd = scoreOne - 1;
              length = vm.scoreEnd - vm.scoreStart + 1;
              for (var j = 0; j < length; j++) {
                let num = Number(vm.scoreStart) + Number(j);
                let data = {
                  name: num,
                  value: num,
                };
              vm.goodScoreList.push(data);
              }
              vm.scoreStart = scoreThree;
              vm.scoreEnd = scoreTwo - 1;
              length = vm.scoreEnd - vm.scoreStart + 1;
              for (var j = 0; j < length; j++) {
                let num = Number(vm.scoreStart) + Number(j);
                let data = {
                  name: num,
                  value: num,
                };
                vm.passScoreList.push(data);
              }
              vm.scoreStart = scoreFour;
              vm.scoreEnd = scoreThree - 1;
              length = vm.scoreEnd - vm.scoreStart + 1;
              for (var j = 0; j < length; j++) {
                let num = Number(vm.scoreStart) + Number(j);
                let data = {
                  name: num,
                  value: num,
                };
                vm.notPassScoreList.push(data);
              }
              standList = vm.standardListWoMan;

              for (var i = 0; i < standList.length; i++) {
              if (standList[i].scoreLevel == 1) {
                scoreOne = standList[i].score;
              }
              if (standList[i].scoreLevel == 2) {
                scoreTwo = standList[i].score;
              }
              if (standList[i].scoreLevel == 3) {
                scoreThree = standList[i].score;
              }
              if (standList[i].scoreLevel == 4) {
                scoreFour = standList[i].score;
              }
            }
              vm.scoreStart = scoreOne;
              vm.scoreEnd = 100;
               length = vm.scoreEnd - vm.scoreStart + 1;
            for (var j = 0; j < length; j++) {
              let num = Number(vm.scoreStart) + Number(j);
              let data = {
                name: num,
                value: num,
              };
              vm.excellentScoreListWomen.push(data);
            }
              vm.scoreStart = scoreTwo;
              vm.scoreEnd = scoreOne - 1;
              length = vm.scoreEnd - vm.scoreStart + 1;
              for (var j = 0; j < length; j++) {
                let num = Number(vm.scoreStart) + Number(j);
                let data = {
                  name: num,
                  value: num,
                };
              vm.goodScoreListWomen.push(data);
              }
              vm.scoreStart = scoreThree;
              vm.scoreEnd = scoreTwo - 1;
              length = vm.scoreEnd - vm.scoreStart + 1;
              for (var j = 0; j < length; j++) {
                let num = Number(vm.scoreStart) + Number(j);
                let data = {
                  name: num,
                  value: num,
                };
                vm.passScoreListWomen.push(data);
              }
              vm.scoreStart = scoreFour;
              vm.scoreEnd = scoreThree - 1;
              length = vm.scoreEnd - vm.scoreStart + 1;
              for (var j = 0; j < length; j++) {
                let num = Number(vm.scoreStart) + Number(j);
                let data = {
                  name: num,
                  value: num,
                };
                vm.notPassScoreListWomen.push(data);
              }

          for(let i=0;i<vm.preResultData.length;i++){
            if(vm.preResultData[i].gender=="1"){
              if(vm.preResultData[i].scoreLevel==1){
                vm.preResultData[i].scoreList=vm.excellentScoreList;
              }
              if(vm.preResultData[i].scoreLevel==2){
                vm.preResultData[i].scoreList=vm.goodScoreList;
              }
              if(vm.preResultData[i].scoreLevel==3){
                vm.preResultData[i].scoreList=vm.passScoreList;
              }
              if(vm.preResultData[i].scoreLevel==4){
                vm.preResultData[i].scoreList=vm.notPassScoreList;
              }
            }else{
              if(vm.preResultData[i].scoreLevel==1){
                vm.preResultData[i].scoreList=vm.excellentScoreListWomen;
              }
              if(vm.preResultData[i].scoreLevel==2){
                vm.preResultData[i].scoreList=vm.goodScoreListWomen;
              }
              if(vm.preResultData[i].scoreLevel==3){
                vm.preResultData[i].scoreList=vm.passScoreListWomen;
              }
              if(vm.preResultData[i].scoreLevel==4){
                vm.preResultData[i].scoreList=vm.notPassScoreListWomen;
              }
            }
          }
        }
        console.log(vm.preResultData)
        vm.resultData=vm.preResultData
        vm.loading=false
          } else {
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },

    baseSubmit() {
      var vm = this;
      if(!vm.isDisable){
          return;
      }
      vm.isDisable = false;
      let data={ 
        yearSemester:vm.yearSemester,
        examItemId:vm.examItemId,
        list:vm.resultData
      }
      if(!vm.resultData || vm.resultData.length==0){
          vm.isDisable = true;
        return
      }
      for(let i=0;i<vm.resultData.length;i++){
        let studentInfo=vm.resultData[i];
        if(vm.examItemType==1){
          if((studentInfo.resultValue!=null && studentInfo.resultValue!="" && (studentInfo.score==null || studentInfo.score=="")) ||
          (studentInfo.score!=null && studentInfo.score!="" && (studentInfo.resultValue===null || studentInfo.resultValue===""))){
            this.$Message.info(studentInfo.studentName+"的成绩尚未录入完成");
              vm.isDisable = true;
            return
          }
        }
        if(vm.examItemType==2){
          if((studentInfo.resultValue!=null && studentInfo.resultValue!="" && (studentInfo.score==null || studentInfo.score=="")) ||
          (studentInfo.score!=null && studentInfo.score!="" && (studentInfo.resultValue==null || studentInfo.resultValue==""))){
            this.$Message.info(studentInfo.studentName+"的成绩尚未录入完成");
              vm.isDisable = true;
            return
          }
        }
        if(vm.examItemType==3){
          if((studentInfo.resultValue!=null && studentInfo.resultValue!="" && (studentInfo.teacherScore==null || studentInfo.teacherScore=="")) ||
          (studentInfo.teacherScore!=null && studentInfo.teacherScore!="" && (studentInfo.resultValue==null || studentInfo.resultValue==""))){
            this.$Message.info(studentInfo.studentName+"的成绩尚未录入完成");
              vm.isDisable = true;
            return
          }
        }
        if(vm.examItemType==4){
          if((studentInfo.resultValue!=null && studentInfo.resultValue!="" && (studentInfo.score==null || studentInfo.score=="")) ||
          (studentInfo.score!=null && studentInfo.score!="" && (studentInfo.resultValue==null || studentInfo.resultValue==""))){
            this.$Message.info(studentInfo.studentName+"的成绩尚未录入完成");
              vm.isDisable = true;
            return
          }
        }
        if(vm.examItemType==5){
          if((studentInfo.resultValue!=null && studentInfo.resultValue!="" && (studentInfo.teacherScore==null || studentInfo.teacherScore=="")) ||
          (studentInfo.teacherScore!=null && studentInfo.teacherScore!="" && (studentInfo.resultValue==null || studentInfo.resultValue==""))){
            this.$Message.info(studentInfo.studentName+"的成绩尚未录入完成");
              vm.isDisable = true;
            return
          }
        }
      }
      this.$axios.post("/v1/actionStamina/addStudentRepairScore",data)
        .then((res) => {
          if (res.data.code == 10000) {
            if(res.data.response.code==1){
              this.$Message.info("保存成功");
            }else{
              this.$Message.info("保存失败");
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
          vm.isDisable = true;
        });
    },
    resultScoreChange(studentInfo,index,newResultValue,type){
      var vm=this;
      if(isNaN(newResultValue)){
        return;
      }
      if(type == 2 && newResultValue>59){
          vm.resultData[index].score='';
          vm.resultData[index].scoreLevel='';
          return;
      }
      let value = ''
      if (type === 1) {
          vm.resultData[index].resultValue1 = newResultValue;
          if (isNaN(studentInfo.resultValue2)) {
              value = Number(newResultValue) * 60;
          } else {
              value = Number(newResultValue) * 60 + Number(studentInfo.resultValue2);
          }
      }
      if (type === 2) {
          vm.resultData[index].resultValue2 = newResultValue;
          if (isNaN(studentInfo.resultValue1)) {
              value = Number(newResultValue);
          } else {
              value = Number(newResultValue) + Number(studentInfo.resultValue1) * 60;
          }
      }
      if (type === 0) {
          value = newResultValue;
      }
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      vm.resultData[index].resultValue = value;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      let numberResult=Number(value);
      if(studentInfo.gender=="1"){
        if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
            vm.resultData[index].score=vm.maxStandardMan.score
            vm.resultData[index].scoreLevel=vm.maxStandardMan.scoreLevel
        }
        if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
            vm.resultData[index].score=vm.minStandardMan.score
            vm.resultData[index].scoreLevel=vm.minStandardMan.scoreLevel
        }
      }else{
        if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
            vm.resultData[index].score=vm.maxStandardWoMan.score
            vm.resultData[index].scoreLevel=vm.maxStandardWoMan.scoreLevel
        }
        if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
            vm.resultData[index].score=vm.minStandardWoMan.score
            vm.resultData[index].scoreLevel=vm.minStandardWoMan.scoreLevel
        }
      }

      for (var i = 0; i < standList.length; i++) {
          if (Number(value) >=Number(standList[i].scoringCriteriaStart) && Number(value) <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreLevel
          }
        }
    },
    onlyScoreChange(studentInfo,index,newResultValue){
      var vm=this;
      if(isNaN(newResultValue)){
        return;
      }
      let standList = [];
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      let numberResult=Number(newResultValue);
      if(studentInfo.gender=="1"){
        if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
            vm.resultData[index].score=vm.maxStandardMan.score
            vm.resultData[index].scoreLevel=vm.maxStandardMan.scoreLevel
        }
        if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
            vm.resultData[index].score=vm.minStandardMan.score
            vm.resultData[index].scoreLevel=vm.minStandardMan.scoreLevel
        }
      }else{
        if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
            vm.resultData[index].score=vm.maxStandardWoMan.score
            vm.resultData[index].scoreLevel=vm.maxStandardWoMan.scoreLevel
        }
        if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
            vm.resultData[index].score=vm.minStandardWoMan.score
            vm.resultData[index].scoreLevel=vm.minStandardWoMan.scoreLevel
        }
      }
      for(var i=0;i<standList.length;i++){
          if(Number(newResultValue)>=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.resultData[index].score=standList[i].score;
            vm.resultData[index].scoreLevel=standList[i].scoreLevel;
          }
        }
    },
    percentScoreChange(studentInfo,index,newResultValue){
       var vm=this;
       if(isNaN(newResultValue)){
          return;
        }
        let standList = []
        if(studentInfo.gender=="1"){
          standList = vm.standardListMan;
        }else{
          standList = vm.standardListWoMan;
        }
        let examItemPercent = vm.examItemPercent;
        vm.resultData[index].resultValue=newResultValue;
        vm.resultData[index].baseScore ='';
        vm.resultData[index].score='';
        vm.resultData[index].scoreLevel='';
        let numberResult=Number(newResultValue);
        if(studentInfo.gender=="1"){
        if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
            vm.resultData[index].baseScore = Math.round(vm.maxStandardMan.score * examItemPercent/100);
        }
        if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
            vm.resultData[index].baseScore = Math.round(vm.minStandardMan.score * examItemPercent/100);
        }
      }else{
        if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
            vm.resultData[index].baseScore= Math.round(vm.maxStandardWoMan.score * examItemPercent/100);
        }
        if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
            vm.resultData[index].baseScore= Math.round(vm.minStandardWoMan.score * examItemPercent/100);
        }
      }
        for (var i = 0; i < standList.length; i++) {
          if ( Number(newResultValue) >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue) <= Number(standList[i].scoringCriteriaEnd)) {
              vm.resultData[index].baseScore = Math.round(standList[i].score * examItemPercent/100);
          }
        }
        if ((vm.resultData[index].baseScore==null || vm.resultData[index].baseScore=='') && vm.resultData[index].baseScore != 0) {
          vm.resultData[index].score='';
          vm.resultData[index].scoreLevel='';
          return;
        }
        let mScore = vm.resultData[index].baseScore;
        if(vm.resultData[index].teacherScore==null ){
          let color=vm.resultData[index].teacherScore != null?"green":"red"
                  let className=vm.resultData[index].teacherScore != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
                  document.getElementById(studentInfo.studentId+"ppp").style.color=color
                   document.getElementById(studentInfo.studentId+"ppp").className=className
          return;
        }
        vm.resultData[index].score= (Number(mScore) + Number(vm.resultData[index].teacherScore ? vm.resultData[index].teacherScore : 0)).toFixed(1);
        if (vm.resultData[index].score < 10) {
           vm.resultData[index].score = 10;
        }
        for (var i = 0; i < vm.baseStandard.length; i++) {
          if (vm.resultData[index].score >= vm.baseStandard[i].start && vm.resultData[index].score <= vm.baseStandard[i].end) {
            vm.resultData[index].scoreLevel=vm.baseStandard[i].level
          }
        }
    },
    percentScoreTeacherChange(studentInfo,index,newResultValue){
      var vm=this;
      if(isNaN(newResultValue)){
        return;
      }
      let examItemPercent = vm.examItemPercent;
      vm.resultData[index].teacherScore=newResultValue;

      let color=vm.resultData[index].teacherScore != null?"green":"red"
      let className=vm.resultData[index].teacherScore != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
      document.getElementById(studentInfo.studentId+"ppp").style.color=color
      document.getElementById(studentInfo.studentId+"ppp").className=className

      if((vm.resultData[index].baseScore==null || vm.resultData[index].baseScore=="") && vm.resultData[index].baseScore != 0){
           color=vm.resultData[index].resultValue != null?"green":"red"
           className=vm.resultData[index].resultValue != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
          document.getElementById(studentInfo.studentId).style.color=color
          document.getElementById(studentInfo.studentId).className=className
          return;
      }
      let mScore = vm.resultData[index].baseScore;
        vm.resultData[index].score = Number(mScore) + Number(newResultValue ? newResultValue : 0);
        if (vm.resultData[index].score < 10) {
           vm.resultData[index].score = 10;
        }
        for (var i = 0; i < vm.baseStandard.length; i++) {
          if (vm.resultData[index].score >= vm.baseStandard[i].start && vm.resultData[index].score <= vm.baseStandard[i].end) {
            vm.resultData[index].scoreLevel=vm.baseStandard[i].level
          }
        }

    },
    levelScoreChange(studentInfo,index,newResultValue){
      var vm=this;
      if(isNaN(newResultValue)){
        return;
      }
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      vm.resultData[index].resultValue=newResultValue;

      if(newResultValue==null || newResultValue==""){
        let color=vm.resultData[index].score != null?"green":"rgb(255,255,255)"
        let className=vm.resultData[index].score != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
        document.getElementById(studentInfo.studentId+"ppp").style.color=color
        document.getElementById(studentInfo.studentId+"ppp").className=className
        return;
      }
      vm.resultData[index].score = null
      let color=vm.resultData[index].score != null?"green":"red"
      let className=vm.resultData[index].score != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
      document.getElementById(studentInfo.studentId+"ppp").style.color=color
      document.getElementById(studentInfo.studentId+"ppp").className=className

      vm.resultData[index].scoreList=[];
      vm.resultData[index].scoreLevel='';
      let numberResult=Number(newResultValue);
      if(studentInfo.gender=="1"){
        if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
            vm.resultData[index].scoreLevel=vm.maxStandardMan.scoreLevel
        }
        if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
            vm.resultData[index].scoreLevel=vm.minStandardMan.scoreLevel
        }
      }else{
        if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
            vm.resultData[index].scoreLevel=vm.maxStandardWoMan.scoreLevel
        }
        if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
            vm.resultData[index].scoreLevel=vm.minStandardWoMan.scoreLevel
        }
      }
      for(var i=0;i<standList.length;i++){
          if(Number(newResultValue)>=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.resultData[index].scoreLevel=standList[i].scoreLevel;
          }
      }
      if(studentInfo.gender=="1"){
        if(vm.resultData[index].scoreLevel==1){
          vm.resultData[index].scoreList=vm.excellentScoreList;
        }
        if(vm.resultData[index].scoreLevel==2){
          vm.resultData[index].scoreList=vm.goodScoreList;
        }
        if(vm.resultData[index].scoreLevel==3){
          vm.resultData[index].scoreList=vm.passScoreList;
        }
        if(vm.resultData[index].scoreLevel==4){
          vm.resultData[index].scoreList=vm.notPassScoreList;
        }
      }else{
        if(vm.resultData[index].scoreLevel==1){
          vm.resultData[index].scoreList=vm.excellentScoreListWomen;
        }
        if(vm.resultData[index].scoreLevel==2){
          vm.resultData[index].scoreList=vm.goodScoreListWomen;
        }
        if(vm.resultData[index].scoreLevel==3){
          vm.resultData[index].scoreList=vm.passScoreListWomen;
        }
        if(vm.resultData[index].scoreLevel==4){
          vm.resultData[index].scoreList=vm.notPassScoreListWomen;
        }
      }

    },
    levelScoreTeacherChange(studentInfo,index,newResultValue){
      var vm=this;
      if(isNaN(newResultValue)){
        return;
      }
      vm.resultData[index].score=newResultValue;

      let color=vm.resultData[index].score != null?"green":"red"
      let className=vm.resultData[index].score != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
      document.getElementById(studentInfo.studentId+"ppp").style.color=color
      document.getElementById(studentInfo.studentId+"ppp").className=className

      if(vm.resultData[index].resultValue==null || vm.resultData[index].resultValue==""){
        color=vm.resultData[index].resultValue != null?"green":"red"
           className=vm.resultData[index].resultValue != null?"ivu-icon ivu-icon-ios-checkmark-circle-outline":"ivu-icon ivu-icon-ios-alert-outline"
          document.getElementById(studentInfo.studentId).style.color=color
          document.getElementById(studentInfo.studentId).className=className
      }
    },
    doubleScoreResultChange(studentInfo,index,newResultValue){
      var vm=this;
      if(isNaN(newResultValue)){
        return;
      }
      let standList = []
      let examItemPercent=vm.examItemPercent;
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].baseScore='';
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';

      let numberResult=Number(newResultValue);
      if(studentInfo.gender=="1"){
        if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
            vm.resultData[index].baseScore=vm.maxStandardMan.score
        }
        if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
            vm.resultData[index].baseScore=vm.minStandardMan.score
        }
      }else{
        if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
            vm.resultData[index].baseScore=vm.maxStandardWoMan.score
        }
        if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
            vm.resultData[index].baseScore=vm.minStandardWoMan.score
        }
      }
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue) >=Number(standList[i].scoringCriteriaStart) &&Number(newResultValue) <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].baseScore=standList[i].score
          }
        }
        if(vm.resultData[index].baseScore==null || vm.resultData[index].baseScore==""){
          return;
        }
        if(vm.resultData[index].teacherScore==null || vm.resultData[index].teacherScore==""
        || vm.resultData[index].teacherScore>100 ||  vm.resultData[index].teacherScore<0){
          document.getElementById(studentInfo.studentId+"ppp").style.color='red'
          document.getElementById(studentInfo.studentId+"ppp").className='ivu-icon ivu-icon-ios-alert-outline'
          return;
        }
        let mScore=vm.resultData[index].baseScore*examItemPercent/100;
        vm.resultData[index].score=(mScore+(vm.resultData[index].teacherScore?vm.resultData[index].teacherScore:0)*(100-examItemPercent)/100).toFixed(1);
        if(vm.resultData[index].score<10){
          vm.resultData[index].score=10;
        }
        for(var i=0;i<vm.baseStandard.length;i++){
          if(vm.resultData[index].score>=vm.baseStandard[i].start && vm.resultData[index].score<=vm.baseStandard[i].end ){
            vm.resultData[index].scoreLevel=vm.baseStandard[i].level;
          }
        }
    },
    doubleScoreTeacherScoreChange(studentInfo,index,newResultValue){
      var vm=this;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      if(isNaN(newResultValue)){
        vm.resultData[index].teacherScore='';
        return;
      }
      newResultValue=Number(newResultValue)
      if(Number(newResultValue)>100 ||  Number(newResultValue)<0){
        document.getElementById(studentInfo.studentId+"ppp").style.color='red'
          document.getElementById(studentInfo.studentId+"ppp").className='ivu-icon ivu-icon-ios-alert-outline';
          vm.resultData[index].teacherScore='';
        return;
      }
      let examItemPercent=vm.examItemPercent;
      vm.resultData[index].teacherScore=newResultValue;
      if(vm.resultData[index].baseScore==null || vm.resultData[index].baseScore==""){
        document.getElementById(studentInfo.studentId).style.color='red'
          document.getElementById(studentInfo.studentId).className='ivu-icon ivu-icon-ios-alert-outline';
          return;
        }
      let mScore=vm.resultData[index].baseScore*examItemPercent/100;
        vm.resultData[index].score=(mScore+(vm.resultData[index].teacherScore?vm.resultData[index].teacherScore:0)*(100-examItemPercent)/100).toFixed(1);
        if(vm.resultData[index].score<10){
          vm.resultData[index].score=10;
        }
        for(var i=0;i<vm.baseStandard.length;i++){
          if(vm.resultData[index].score>=vm.baseStandard[i].start && vm.resultData[index].score<=vm.baseStandard[i].end ){
            vm.resultData[index].scoreLevel=vm.baseStandard[i].level;
          }
        }
    },
    paramsCheck() {
      var vm = this;
      let schoolId = sessionStorage.getItem("schoolId");
      vm.schoolId = schoolId;
      let schoolType = sessionStorage.getItem("schoolType");
      vm.schoolType = schoolType;
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      }
      let yearSemester = sessionStorage.getItem(
        "examActionStaminaGrade-actionStaminaRepair-yearSemester"
      );

      vm.yearSemester = yearSemester;
      if (
        Number(
          sessionStorage.getItem("examActionStaminaGrade-actionStaminaRepair-grade")
        ) == 999 ||
          sessionStorage.getItem("examActionStaminaGrade-actionStaminaRepair-grade") == ''
      ) {
        vm.grade = vm.schoolGradeList[0].grade;
      } else {
        vm.grade = Number(
          sessionStorage.getItem("examActionStaminaGrade-actionStaminaRepair-grade")
        );
      }
      if (
        Number(
          sessionStorage.getItem(
            "examActionStaminaGrade-actionStaminaRepair-studentClass"
          )
        ) == 999 ||
          sessionStorage.getItem(
              "examActionStaminaGrade-actionStaminaRepair-studentClass"
          ) == ''
      ) {
        vm.studentClass = vm.classList[0].value;
      } else {
        vm.studentClass = Number(
          sessionStorage.getItem(
            "examActionStaminaGrade-actionStaminaRepair-studentClass"
          )
        );
      }

      let grade = sessionStorage.getItem('examQueryStudent-grade');
      let studentClass = sessionStorage.getItem('examQueryStudent-studentClass');
      let registerCode = sessionStorage.getItem('examQueryStudent-registerCode');
      let studentName = sessionStorage.getItem('examQueryStudent-studentName');
      let finishStatus = sessionStorage.getItem(
        "examQueryStudent-finishStatus"
      );
      let pageNo = sessionStorage.getItem("examQueryStudent-pageNo");
      let pageSize = sessionStorage.getItem("examQueryStudent-pageSize");

      if (grade != null && grade != "" && grade != undefined && grade > 0) {
        vm.grade = Number(grade);
      } else {
          vm.grade = vm.schoolGradeList[0].grade;
      }
      if (
        studentClass != null &&
        studentClass != "" &&
        studentClass != undefined &&
        studentClass > 0
      ) {
        vm.studentClass = Number(studentClass);
      } else {
          vm.studentClass = vm.classList[0].value;
      }
      if (
        registerCode != null &&
        registerCode != "" &&
        registerCode != undefined
      ) {
        vm.registerCode = registerCode;
      }
      if (
        studentName != null &&
        studentName != "" &&
        studentName != undefined
      ) {
        vm.studentName = studentName;
      }
      if (
        finishStatus != null &&
        finishStatus != "" &&
        finishStatus != undefined
      ) {
        vm.finishStatus = finishStatus;
      } else {
        vm.finishStatus = "999";
      }
      if (pageNo != null && pageNo != "" && pageNo != undefined && pageNo > 0) {
        vm.pageNo = Number(pageNo);
      }
      if (
        pageSize != null &&
        pageSize != "" &&
        pageSize != undefined &&
        pageSize > 0
      ) {
        vm.pageSize = Number(pageSize);
      }
      vm.search();
    },
  },
  mounted() {
    var vm = this;
    vm.paramsCheck();
  },
  watch: {
    examItemType:function(){
      var vm=this;
      if(vm.examItemType==1){
        vm.resultColumns=vm.baseColumns.concat(vm.resultScore)
      }
      if(vm.examItemType==2){
        vm.resultColumns=vm.baseColumns.concat(vm.onlyScore)
      }
      if(vm.examItemType==3){
        vm.resultColumns=vm.baseColumns.concat(vm.percentScore)
      }
      if(vm.examItemType==4){
        vm.resultColumns=vm.baseColumns.concat(vm.levelScore)
      }
      if(vm.examItemType==5){
        vm.resultColumns=vm.baseColumns.concat(vm.doubleScore)
      }
    }
  },
};
</script>
