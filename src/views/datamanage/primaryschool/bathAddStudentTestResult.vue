<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体测成绩录入</h2>
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
                        :key="item.value"
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
                <Button type="success" @click="pageToClassList">返回</Button>
            </div>
      </div>
    </Card>
    <Card style="margin-top:20px;"  :dis-hover="true">
      <Tabs type="card" @on-click="tagClick"  v-model="schoolTestName">
        <TabPane
          v-for="(schoolTest,index) in schoolTestList"
          :key="index"
          :label="schoolTest.schoolTestName"
          :name="schoolTest.schoolTestName"
        ></TabPane>
      </Tabs>
      <Table border :loading="loading" height="500" :columns="resultColumns" :data="resultData"></Table>
    </Card>
    <div style="margin-top:10px;text-align:center">
      <Button style="width:100px" @click="baseSubmit" type="success">提交</Button>
    </div>
    <Modal v-model="submitStatus" width="360" :closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <span>提交中......</span>
        </p>
        <div style="text-align:center">
            <Progress :percent="submitPercent" :stroke-color="['#108ee9', '#87d068']" />
        </div>
        <div slot="footer">
        </div>
    </Modal>
    
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
      submitPercent:0, 
      submitStatus:false,
      loading:false,
      schoolId: "",
      gender:'',
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
      highList: [
        {
          grade: 10,
          label: "高一",
        },
        {
          grade: 11,
          label: "高二",
        },
        {
          grade: 12,
          label: "高三",
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
      schoolTestId: "",
      schoolTestName: "",
      schoolTestList:[],
      maxData:'',
      minData:'',
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
      highWeight: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit=vm.schoolTestId==1?"cm":"kg"
            return h("div",
            params.row.exemptStatus=="1"?"免试":
            [
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.highWeightChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
      ],
      vitalCapacity: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="ml"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.vitalCapacityChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
			          "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      runFifty: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="s"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runFiftyChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                
			  "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      standingJump: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="cm"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.standingJumpChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                
			  "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text); 
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
      sitAndReach: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="cm"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.sitAndReachChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  console.log(vm.resultData[params.index].resultValue)
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                
			  "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      runEightHundred: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            var vm = this;
            let unit=""
            let min=0;
            let second=0;
            return params.row.exemptStatus=="1"?"免试": h("div",[
              h('Input',{
              props: {
                value: params.row.min,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enterone"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runEightHundredChange(params.row,params.index,val,"1")
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"red":"green"
                  let className=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
			  "on-enter":function(){
                  document.getElementById(params.row.studentId+"entertwo").getElementsByTagName("input")[0].focus()
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},"分"),
            h('Input',{
              props: {
                value: params.row.second,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"entertwo"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runEightHundredChange(params.row,params.index,val,"2")
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"red":"green"
                  let className=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enterone").getElementsByTagName("input")[0].focus()
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},"秒"),
            h('Icon', {
                                    props: {
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      runThousand:  [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            var vm = this;
            let unit=""
            let min=0;
            let second=0;
            return params.row.exemptStatus=="1"?"免试": h("div",[
              h('Input',{
              props: {
                value: params.row.min,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enterone"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runThousandChange(params.row,params.index,val,"1")
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"red":"green"
                  let className=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
			  "on-enter":function(){
                  document.getElementById(params.row.studentId+"entertwo").getElementsByTagName("input")[0].focus()
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},"分"),
            h('Input',{
              props: {
                value: params.row.second,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"entertwo"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runThousandChange(params.row,params.index,val,"2")
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"red":"green"
                  let className=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enterone").getElementsByTagName("input")[0].focus()
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},"秒"),
            h('Icon', {
                                    props: {
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      oneMinuteSitUp: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="次"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.oneMinuteSitUpChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                
			  "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      pullUps: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="次"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.pullUpsChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                
			  "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      oneMinuteRopeSkipping: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let unit="次"
            return h("div",params.row.exemptStatus=="1"?"免试":[
              h('Input',{
              props: {
                value: params.row.exemptStatus=="1"?"免试":params.row.resultValue,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enter"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.oneMinuteRopeSkippingChange(params.row,params.index,val)
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"red":"green"
                  let className=vm.maxMinCheck(vm.resultData[params.index].resultValue)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                
			  "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enter").getElementsByTagName("input")[0].focus()
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
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      runFiftyEight: [
          {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            var vm = this;
            let unit=""
            let min=0;
            let second=0;
            return params.row.exemptStatus=="1"?"免试": h("div",[
              h('Input',{
              props: {
                value: params.row.min,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"enterone"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runFiftyEightChange(params.row,params.index,val,"1")
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"red":"green"
                  let className=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
			  "on-enter":function(){
                  document.getElementById(params.row.studentId+"entertwo").getElementsByTagName("input")[0].focus()
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},"分"),
            h('Input',{
              props: {
                value: params.row.second,
                size: "small",
                disabled:params.row.exemptStatus=="1"?true:false,
              },
              attrs:{
                    id:params.row.studentId+"entertwo"
              },
              style:{
                width:"80px"
              },
              on: {
                input: (val) => {
                  vm.runFiftyEightChange(params.row,params.index,val,"2")
                },
                "on-blur":function(){
                  let color=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"red":"green"
                  let className=vm.maxMinCheck(params.row.resultValue) || params.row.second>59?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                  document.getElementById(params.row.studentId).style.color=color
                  document.getElementById(params.row.studentId).className=className
                },
                "on-enter":function(){
                  let result=vm.resultData;
                  let index="";
                  for(let i=0;i<result.length;i++){
                    if(params.row.studentId==result[i].studentId){
                      index=i+1;
                      break;
                    }
                  }
                  if(index+1>result.length){
                    return
                  }
                  document.getElementById(result[index].studentId+"enterone").getElementsByTagName("input")[0].focus()
                }
              },
            }),
            h('span',
            {
              style:{
                marginLeft: '5px',
              }},"秒"),
            h('Icon', {
                                    props: {
                                        type: 'ios-close-circle-outline',
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
          title: "得分",
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
              // if(row.exemptType=="1"){
              //   text="及格"
              // }else{
              //   text="良好"
              // }
              // return h("div", text);
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
      
      standardListMan: [],
      standardListWoMan: [],
      index:'',
      errorNum:'',
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
      ]
    };
  },
  methods: {
    //返回
    pageToClassList() { 
      this.$router.go(-1);
    },
    search() {
      var vm = this;
      this.errorNum = 0
      sessionStorage.setItem("bathAddStudentTestResult-grade",vm.grade);
      sessionStorage.setItem("bathAddStudentTestResult-studentClass",vm.studentClass);
      sessionStorage.setItem("bathAddStudentTestResult-registerCode",vm.registerCode);
      sessionStorage.setItem("bathAddStudentTestResult-studentName",vm.studentName);
      sessionStorage.setItem("bathAddStudentTestResult-finishStatus",vm.finishStatus);
      sessionStorage.setItem("bathAddStudentTestResult-pageNo",vm.pageNo);
      sessionStorage.setItem("bathAddStudentTestResult-pageSize",vm.pageSize);
      vm.getTestItemAndStandardList();
    },
    tagClick(schoolTestName) {
      var vm = this;
      for (var i = 0; i < vm.schoolTestList.length; i++) {
        if (schoolTestName == vm.schoolTestList[i].schoolTestName) {
          vm.schoolTestId = vm.schoolTestList[i].schoolTestId;
          vm.maxData=vm.schoolTestList[i].dataEnd;
          vm.minData=vm.schoolTestList[i].dataStart
        }
      }
      sessionStorage.setItem("bathAddStudentTestResult-selectTabName",this.schoolTestName);
      vm.getExamItemClassStudentList(vm.schoolTestId);
    },
    getTestItemAndStandardList() {
      var vm = this;
      this.$axios.get("/v1/test/query/getTestItemAndStandardList?schoolId=1" +"&gradeId=" +(this.grade == "999" ? "" : this.grade) )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.schoolTestList = data;
            if(sessionStorage.getItem("bathAddStudentTestResult-selectTabName")){
              vm.schoolTestName = sessionStorage.getItem("bathAddStudentTestResult-selectTabName");
              for (var i = 0; i < vm.schoolTestList.length; i++) {
                if (vm.schoolTestName == vm.schoolTestList[i].schoolTestName) {
                  vm.schoolTestId = vm.schoolTestList[i].schoolTestId;
                  vm.maxData=vm.schoolTestList[i].dataEnd;
                  vm.minData=vm.schoolTestList[i].dataStart
                }
              }
              if(!vm.schoolTestId){
                vm.schoolTestId = data[0].schoolTestId;
                vm.schoolTestName = data[0].schoolTestName;
                vm.maxData=data[0].dataEnd;
                vm.minData=data[0].dataStart
              }
            }else{
              vm.schoolTestId = data[0].schoolTestId;
              vm.schoolTestName = data[0].schoolTestName;
                    vm.maxData=data[0].dataEnd;
                vm.minData=data[0].dataStart
            }
            vm.getExamItemClassStudentList(vm.schoolTestId);
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getExamItemClassStudentList(schoolTestId) {
      var vm = this;
      vm.loading=true
       vm.resultData=[]
      this.$axios
        .get(
          "/v1/test/query/getBathAddTestStudentList?schoolId=" +sessionStorage.getItem("schoolId")+
            "&gradeId=" +
            (this.grade == "999" ? "" : this.grade) +
            "&classId=" +
            (this.studentClass == "999" ? "" : this.studentClass) +
            "&yearSemester=" +
            vm.yearSemester +
            "&studentName=" +
            vm.studentName +
            "&registerCode=" +
            vm.registerCode +
            "&finishStatus=" +
            (vm.finishStatus == 999 ? "" : vm.finishStatus) +
            "&schoolTestId=" +
            schoolTestId
        )
        .then((res) => {
          vm.loading=false
          if (res.data.code == 10000) {
            let data = res.data.response;
            if(vm.schoolTestId==7 || vm.schoolTestId==10 || vm.schoolTestId==11){
              for(let i=0;i<data.length;i++){
                data[i].min=data[i].resultValue?parseInt(data[i].resultValue/60):''
                data[i].second=data[i].resultValue?data[i].resultValue%60:''
              }
            }
            vm.resultData = data;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    baseSubmit() {
      var vm=this;
      vm.errorNum=0;
      vm.index=0 
      vm.submitPercent=0;    
      vm.submitStatus=true
      vm.saveResult(vm.index);
    },
    saveResult(index){
      var vm=this;
      let result=vm.resultData;
      let per=Math.ceil(100/result.length);
      if(index+1>result.length){
        vm.submitStatus=false
        if(vm.errorNum>0){
          this.$Message.info("部分数据有误，请检查！");
        }
        this.$Message.info("提交成功！");
        vm.search()
        return;
      }
      let value = result[index].resultValue;
      if(this.maxMinCheck(value)){
          this.submitPercent+=per;
          vm.saveResult(index+1);
          return;
      }
      let params = {
          schoolId: this.schoolId,
          schoolTestId: this.schoolTestId,
          studentId:  result[index].studentId,
          resultValue: value,
          teacherId: sessionStorage.getItem("teacherId"),
          yearSemester:this.yearSemester
        };
      this.$axios.post("/v1/test/edit/saveStudentTestValue", params).then(res => {
                this.submitPercent+=per;
                vm.saveResult(index+1);
                if (res.data.code !== 10000) {
                  vm.errorNum+=1;
                }
              });
      
    },
    highWeightChange(studentInfo,index,newResultValue){
      this.resultData[index].resultValue=newResultValue;
    },
    vitalCapacityChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      console.log(standList)
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    runFiftyChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      console.log(standList)
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    sitAndReachChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    oneMinuteRopeSkippingChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    oneMinuteSitUpChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      console.log(standList)
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    runFiftyEightChange(studentInfo,index,newResultValue,type){
     var vm=this;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      if(!/^\d+$/.test(newResultValue)){
        return;
      }
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      let result=vm.resultData[index].resultValue;
      let min=Number(vm.resultData[index].min)
      let second=Number(vm.resultData[index].second)
      if(type=="1"){
        vm.resultData[index].min=newResultValue
        if(second !=null){
          vm.resultData[index].resultValue=newResultValue*60+second
        }else{
          vm.resultData[index].resultValue=newResultValue*60
        }
      }else{
        vm.resultData[index].second=newResultValue
        if(newResultValue>59){
          return
        }
        if(min !=null){
          vm.resultData[index].resultValue=min*60+Number(newResultValue)
        }else{
          vm.resultData[index].resultValue=newResultValue
        }
      }
      for (var i = 0; i < standList.length; i++) {
          if (Number(vm.resultData[index].resultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(vm.resultData[index].resultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    standingJumpChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      console.log(standList)
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    pullUpsChange(studentInfo,index,newResultValue){
      var vm=this;
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      console.log(standList)
      vm.resultData[index].resultValue=newResultValue;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      for (var i = 0; i < standList.length; i++) {
          if (Number(newResultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(newResultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    runThousandChange(studentInfo,index,newResultValue,type){
      var vm=this;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      if(!/^\d+$/.test(newResultValue)){
        return;
      }
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      let result=vm.resultData[index].resultValue;
      let min=Number(vm.resultData[index].min)
      let second=Number(vm.resultData[index].second)
      if(type=="1"){
        vm.resultData[index].min=newResultValue
        if(second !=null){
          vm.resultData[index].resultValue=newResultValue*60+second
        }else{
          vm.resultData[index].resultValue=newResultValue*60
        }
      }else{
        vm.resultData[index].second=newResultValue
        if(newResultValue>59){
          return
        }
        if(min !=null){
          vm.resultData[index].resultValue=min*60+Number(newResultValue)
        }else{
          vm.resultData[index].resultValue=newResultValue
        }
      }
      for (var i = 0; i < standList.length; i++) {
          if (Number(vm.resultData[index].resultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(vm.resultData[index].resultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    runEightHundredChange(studentInfo,index,newResultValue,type){
      var vm=this;
      vm.resultData[index].score='';
      vm.resultData[index].scoreLevel='';
      if(!/^\d+$/.test(newResultValue)){
        return;
      }
      let standList = []
      if(studentInfo.gender=="1"){
        standList = vm.standardListMan;
      }else{
        standList = vm.standardListWoMan;
      }
      let result=vm.resultData[index].resultValue;
      let min=Number(vm.resultData[index].min)
      let second=Number(vm.resultData[index].second)
      if(type=="1"){
        vm.resultData[index].min=newResultValue
        if(second !=null){
          vm.resultData[index].resultValue=newResultValue*60+second
        }else{
          vm.resultData[index].resultValue=newResultValue*60
        }
      }else{
        vm.resultData[index].second=newResultValue
        if(newResultValue>59){
          return
        }
        if(min !=null){
          vm.resultData[index].resultValue=min*60+Number(newResultValue)
        }else{
          vm.resultData[index].resultValue=newResultValue
        }
      }
      for (var i = 0; i < standList.length; i++) {
          if (Number(vm.resultData[index].resultValue)*10 >=Number(standList[i].scoringCriteriaStart) && Number(vm.resultData[index].resultValue)*10 <= Number(standList[i].scoringCriteriaEnd)) {
            vm.resultData[index].score=standList[i].score
            vm.resultData[index].scoreLevel=standList[i].scoreType
          }
        }
    },
    numCheck(num){
        var regPos =  /^-?\d+\.?\d*$/; 
        if(null == num || ""==num || undefined==num){
            return false
        }
        num=num.toString();
        if(num.indexOf(".")==-1){
            if(regPos.test(num)){
                return true;
            }else{
                return false;
            }
        }else{
            var index = num.indexOf(".") + 1; // 小数位置
            var count = num.length - index; // 获取小数点后的位数
            if(count<1){
                return false;
            }else{
                if(regPos.test(num)){
                return true;
                }else{
                    return false;
                }
            }
        }
    },
    maxMinCheck(value){
      var vm=this;
      if(isNaN(value) || ""==value || null == value || !vm.numCheck(value)){
        return true;
      }
      let result=Number(value);
      if(vm.schoolTestId==13){
        if(value.includes(".")){
          if(value.split('.')[1].length > 1){
            return true
          }
        }
        result=result*10
      }
      if(result>vm.maxData || result<vm.minData){
        return true;
      }else{
        return false;
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
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
      }
      let yearSemester = sessionStorage.getItem("queryStudentList-bathAddStudentTestResult-yearSemester");

      vm.yearSemester = yearSemester;
      if ( Number(sessionStorage.getItem("actionStaminaGrade-bathAddStudentTestResult-grade")) == 999) {
        vm.grade = vm.schoolGradeList[0].grade;
      } else {
        vm.grade = Number(sessionStorage.getItem("actionStaminaGrade-bathAddStudentTestResult-grade"));
      }
      if (Number(sessionStorage.getItem("actionStaminaGrade-bathAddStudentTestResult-studentClass")) == 999) {
        vm.studentClass = vm.classList[0].value;
      } else {
        vm.studentClass = Number(sessionStorage.getItem("actionStaminaGrade-bathAddStudentTestResult-studentClass"));
      }

      let grade = sessionStorage.getItem("bathAddStudentTestResult-grade");
      let studentClass = sessionStorage.getItem("bathAddStudentTestResult-studentClass");
      let registerCode = sessionStorage.getItem("bathAddStudentTestResult-registerCode");
      let studentName = sessionStorage.getItem("bathAddStudentTestResult-studentName");
      let finishStatus = sessionStorage.getItem("bathAddStudentTestResult-finishStatus");
      let pageNo = sessionStorage.getItem("bathAddStudentTestResult-pageNo");
      let pageSize = sessionStorage.getItem("bathAddStudentTestResult-pageSize");

      if (grade != null && grade != "" && grade != undefined && grade > 0) {
        vm.grade = Number(grade);
      }else{
        vm.grade=vm.schoolGradeList[0].grade
      }
      vm.getTestItemAndStandardList()
      if (
        studentClass != null &&
        studentClass != "" &&
        studentClass != undefined &&
        studentClass > 0
      ) {
        vm.studentClass = Number(studentClass);
      }else{
        vm.studentClass=vm.classList[0].value
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
    },
  },
  mounted() {
    this.paramsCheck();
  },
  watch: {
    schoolTestId:function(){
      var vm=this;
      vm.standardListMan=[]
      vm.standardListWoMan=[]
      for(let i=0;i<vm.schoolTestList.length;i++){
        if(vm.schoolTestId==vm.schoolTestList[i].schoolTestId){
          let standard=vm.schoolTestList[i].standList;
          for(let j=0;j<standard.length;j++){
            if(standard[j].gender=="1"){
              vm.standardListMan.push(standard[j])
            }else{
              vm.standardListWoMan.push(standard[j])
            }
          }
        }
      }
      if(vm.schoolTestId==1 || vm.schoolTestId==12){
        vm.resultColumns=vm.baseColumns.concat(vm.highWeight)
      }else if(vm.schoolTestId==2){
          vm.resultColumns=vm.baseColumns.concat(vm.vitalCapacity)
      }else if(vm.schoolTestId==3){
          vm.resultColumns=vm.baseColumns.concat(vm.runFifty)
      }else if(vm.schoolTestId==4){
          vm.resultColumns=vm.baseColumns.concat(vm.sitAndReach)
      }else if(vm.schoolTestId==5){
          vm.resultColumns=vm.baseColumns.concat(vm.oneMinuteRopeSkipping)
      }else if(vm.schoolTestId==6){
          vm.resultColumns=vm.baseColumns.concat(vm.oneMinuteSitUp)
      }else if(vm.schoolTestId==7){
          vm.resultColumns=vm.baseColumns.concat(vm.runFiftyEight)
      }else if(vm.schoolTestId==8){
          vm.resultColumns=vm.baseColumns.concat(vm.standingJump)
      }else if(vm.schoolTestId==9){
          vm.resultColumns=vm.baseColumns.concat(vm.pullUps)
      }else if(vm.schoolTestId==10){
          vm.resultColumns=vm.baseColumns.concat(vm.runThousand)
      }else if(vm.schoolTestId==11){
          vm.resultColumns=vm.baseColumns.concat(vm.runEightHundred)
      }
      
    }
  },
};
</script>
