<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按学生查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>年级：</span>
                    <Select v-model="grade"  style="width:120px;">
                    <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                    >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass"  style="width:120px;">
                        <Option v-for="(item,i) in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：</span>
                    <Select v-model="gender"  style="width:120px;">
                        <Option
                            v-for="item in genderList"
                            :value="item.itemId"
                            :key="item.itemId"
                        >{{ item.itemName }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓名：</span>
                    <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>
                    <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="querySearch">查询</Button>
                <Button type="success" @click="exportStudentActionStaminaList">导出EXCEL</Button>
                <Button type="success" @click="pageToList">返回</Button>
            </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">
            数据明细
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br />
          <div style="float: right;">
            <Page
              :total="total"
              :current="pageNo"
              :page-size="pageSize"
              @on-change="pageNoChange"
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
export default {
  name: "schoolList",
  data() {
    return {
        yearSemester:'',
      loading: false,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      gender:"",
      genderList:[
        {
          itemId:"999",
          itemName:"全部"
        },
        {
          itemId:"1",
          itemName:"男"
        },
        {
          itemId:"2",
          itemName:"女"
        }
      ],
      primaryList: [
        {
          grade: 1,
          label: "一年级"
        },
        {
          grade: 2,
          label: "二年级"
        },
        {
          grade: 3,
          label: "三年级"
        },
        {
          grade: 4,
          label: "四年级"
        },
        {
          grade: 5,
          label: "五年级"
        },
        {
          grade: 6,
          label: "六年级"
        }
      ],
      middleList: [
        {
          grade: 7,
          label: "七年级"
        },
        {
          grade: 8,
          label: "八年级"
        },
        {
          grade: 9,
          label: "九年级"
        }
      ],
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: 999,
          label: "全部"
        },
        {
          value: 1,
          label: "1班"
        },
        {
          value: 2,
          label: "2班"
        },
        {
          value: 3,
          label: "3班"
        },
        {
          value: 4,
          label: "4班"
        },
        {
          value: 5,
          label: "5班"
        },
        {
          value: 6,
          label: "6班"
        },
        {
          value: 7,
          label: "7班"
        },
        {
          value: 8,
          label: "8班"
        },
        {
          value: 9,
          label: "9班"
        },
        {
          value: 10,
          label: "10班"
        },
        {
          value: 11,
          label: "11班"
        },
        {
          value: 12,
          label: "12班"
        },
        {
          value: 13,
          label: "13班"
        },
        {
          value: 14,
          label: "14班"
        },
        {
          value: 15,
          label: "15班"
        },
        {
          value: 16,
          label: "16班"
        },
        {
          value: 17,
          label: "17班"
        },
        {
          value: 18,
          label: "18班"
        },
        {
          value: 19,
          label: "19班"
        },
        {
          value: 20,
          label: "20班"
        },
        {
          value: 21,
          label: "21班"
        },
        {
          value: 22,
          label: "22班"
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
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          minWidth :100,
          align: "center",
          fixed: 'left'
        },
        {
          title: "性别",
          key: "gender",
          minWidth :80,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "学籍号",
          key: "registerCode",
          minWidth :100,
          align: "center",
        },
        {
          title: "班级",
          key: "sportsClassName",
          minWidth:100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
             let data=params.row.grade==1?"一年级":params.row.grade==2?"二年级":params.row.grade==3?"三年级":params.row.grade==4?"四年级":
            params.row.grade==5?"五年级":params.row.grade==6?"六年级":params.row.grade==7?"七年级":params.row.grade==8?"八年级":
            params.row.grade==9?"九年级":"--";
            data=data+params.row.studentClass+"班"
            return h("div", data);
          }
        },
         {
          title: "项目名称",
          key: "showItemTest",
          align: "center",
          minWidth :150,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                  for(let i=0;i<list.length;i++){
                      let data=list[i];
                      let itemLength=data.examList.length;
                        if(i+1==list.length){
                          text+="<div style='width:100%;height:"+30*itemLength+"px;line-height:"+30*itemLength+"px;' >"
                        }else{
                          text+="<div style='width:100%;border-bottom:1px #e8eaec solid;height:"+30*itemLength+"px;line-height:"+30*itemLength+"px;' >"
                        }
                          text+="<p>"+data.classTestName+"</p></div>"
                  }
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "考核项目",
          key: "showItemName",
          align: "center",
          minWidth :150,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                for(let i=0;i<list.length;i++){
                  let classTest=list[i]
                  for(let j=0;j<classTest.examList.length;j++){
                      let data=classTest.examList[j];
                      if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                          text+="<p>"+data.examItemName+"</p></div>"
                  }
                }
              }else{
                  text+="<p>--</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "成绩",
          key: "showItemValue",
          align: "center",
          minWidth :100,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                for(let i=0;i<list.length;i++){
                  let classTest=list[i]
                  for(let j=0;j<classTest.examList.length;j++){
                      let data=classTest.examList[j];
                      let showData=null;
                      if(data.resultValue){
                        if(data.examUnit && data.examUnit == "分.秒"){
                          showData=Number(data.resultValue)%60>0?(Math.floor(Number(data.resultValue)/60)+'\''+(Number(data.resultValue)%60)+'\"'):Number(data.resultValue)/60+'\'';
                        }else{
                            showData=data.examUnit != '99' ? data.resultValue +"("+data.examUnit+")" : data.resultValue;
                        }
                        if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(!data.exemptType){
                          text+="<p>"+(showData?showData:"--")+"</p></div>"
                        }else{
                          text+="<p>免试</p></div>"
                        }
                      }else{
                          if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(!data.exemptType){
                          text+="<p>未考核</p></div>"
                        }else{
                          text+="<p>免试</p></div>"
                        }

                      }
                  }
                }
              }else{
                  text+="<p>--</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "基础得分",
          key: "showBaseScore",
          align: "center",
          minWidth :100,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                for(let i=0;i<list.length;i++){
                  let classTest=list[i]
                  for(let j=0;j<classTest.examList.length;j++){
                      let data=classTest.examList[j];
                      if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                            if(!data.exemptType){
                            text+="<p>"+(data.baseScore?data.baseScore:"--")+"</p></div>"
                            }else{
                            text+="<p>--</p></div>"
                            }
                        }else{
                            if(data.exemptType){
                            text+="<p>--</p></div>"
                            }else{
                            text+="<p>0</p></div>"
                            }
                        }


                  }
                }
              }else{
                  text+="<p>--</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "技评得分",
          key: "showTeacherScore",
          align: "center",
          minWidth :100,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                for(let i=0;i<list.length;i++){
                  let classTest=list[i]
                  for(let j=0;j<classTest.examList.length;j++){
                      let data=classTest.examList[j];
                      if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                            if(!data.exemptType){
                            text+="<p>"+(data.teacherScore?data.teacherScore:"--")+"</p></div>"
                            }else{
                            text+="<p>--</p></div>"
                            }
                        }else{
                            if(data.exemptType){
                            text+="<p>--</p></div>"
                            }else{
                            text+="<p>0</p></div>"
                            }
                        }
                  }
                }
              }else{
                  text+="<p>--</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "总得分",
          key: "learnAttitudeScore",
          align: "center",
          minWidth :100,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                for(let i=0;i<list.length;i++){
                  let classTest=list[i]
                  for(let j=0;j<classTest.examList.length;j++){
                      let data=classTest.examList[j];
                      if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                           if(!data.exemptType){
                            text+="<p>"+(data.score!=null?data.score:"--")+"</p></div>"
                            }else{
                                if(data.exemptType=="1"){
                                    text+="<p>70</p></div>"
                                }else{
                                    text+="<p>80</p></div>"
                                }
                            }
                        }else{
                            if(!data.exemptType){
                            text+="<p>0</p></div>"
                            }else{
                            if(data.exemptType=="1"){
                                    text+="<p>70</p></div>"
                                }else{
                                    text+="<p>80</p></div>"
                                }
                            }
                        }


                  }
                }
              }else{
                  text+="<p>--</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "等级",
          key: "homeworkScore",
          align: "center",
          minWidth :100,
          render: (h, params) => {
              let row=params.row;
              let list=row.list;
              var text="";
              if(list && list.length>0){
                for(let i=0;i<list.length;i++){
                  let classTest=list[i]
                  for(let j=0;j<classTest.examList.length;j++){
                      let data=classTest.examList[j];
                      if(i+1==list.length && j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        let score=0;
                        if(!data.exemptType){
                            score=data.score?data.score:0
                        }else{
                          if(data.exemptType=="1"){
                                score=70;
                            }else{
                                score=80
                            }
                        }
                        let level=score>=90?"优秀":score>=80?"良好":score>=60?"及格":"不及格"
                        text+="<p>"+level+"</p></div>"
                  }
                }
              }else{
                  text+="<p>--</p>"
              }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "技能最终得分",
          key: "actionScore",
          align: "center",
          minWidth :80,
          render: (h, params) => {
              var vm=this;
            let data=params.row.actionScore == null?"--":params.row.actionScore/100
            return h('div', data)
          }
        },
        {
          title: "体能最终得分",
          key: "staminaScore",
          align: "center",
          minWidth :100,
          render: (h, params) => {
              var vm=this;
            let data=params.row.staminaScore == null?"--":params.row.staminaScore/100
            return h('div', data)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth :120,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '0px'
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
      ],
      resultData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
      pageToList() {
      this.$router.go(-1)
    },
    exportStudentActionStaminaList(){
      var vm=this;
      let url =
        this.$axios.defaults.baseURL +
        '/v1/actionStamina/exportStudentActionStaminaList?schoolId=1&grade='+vm.grade+'&studentClass='+(vm.studentClass=="999"?"":vm.studentClass)+'&yearSemester='+vm.yearSemester+
        '&gender='+(vm.gender==999?"":vm.gender)+'&studentName='+vm.studentName+'&registerCode='+vm.registerCode+'&token=' + sessionStorage.getItem('token')
        window.open(url)
    },
    toDetail(studentInfo){
      var vm=this;
      sessionStorage.setItem("actionStaminaStudentList-actionStaminaStudentDetail-yearSemester",vm.yearSemester);
      sessionStorage.setItem('actionStaminaStudentList-actionStaminaStudentDetail-studentInfo',JSON.stringify(studentInfo))
      this.$router.push({ name: "actionStaminaStudentDetail" });
    },
    search (yearSemester) {
                var vm = this;
                sessionStorage.setItem('actionStaminaStudentList-grade', vm.grade);
                sessionStorage.setItem('actionStaminaStudentList-studentClass', vm.studentClass);
                sessionStorage.setItem('actionStaminaStudentList-gender', vm.gender);
                sessionStorage.setItem('actionStaminaStudentList-studentStatus', vm.studentStatus);
                sessionStorage.setItem('actionStaminaStudentList-registerCode', vm.registerCode);
                sessionStorage.setItem('actionStaminaStudentList-studentName', vm.studentName);
                sessionStorage.setItem('actionStaminaStudentList-pageNo', vm.pageNo);
                sessionStorage.setItem('actionStaminaStudentList-pageSize', vm.pageSize);
                sessionStorage.setItem("actionStaminaGrade-actionStaminaStudentList-grade",vm.grade);
                sessionStorage.setItem("actionStaminaGrade-actionStaminaStudentList-studentClass",vm.studentClass);
                vm.getEducationReportStudentDetailList(yearSemester);
                vm.countEducationReportStudentDetail(yearSemester);
            },
            getActionStaminaStudentList (yearSemester) {
                this.$axios
                    .get(
                        '/v1/actionStamina/getActionStaminaStudentList?gender=' +
                        (this.gender=="999"?"":this.gender) +
                        '&registerCode=' +
                        this.registerCode +
                        '&gradeId=' +
                        (this.gradeId=="999"?"":this.grade)+
                        '&pageNo=' +
                        this.pageNo +
                        '&pageSize=' +
                        this.pageSize +
                        '&studentClass=' +
                        (this.studentClass=="999"?"":this.studentClass) +
                        '&studentName=' +
                        this.studentName +
                        '&yearSemester=' +
                        yearSemester
                    )
                    .then(res => {
                        if (res.data.code == 10000) {
                             let data= res.data.response;
                             if(data.length>0){
                                 for(let i=0;i<data.length;i++){
                                     data[i].list=[];
                                    if(data[i].examList && data[i].examList.length>0){
                                        let examList=data[i].examList;
                                        for(let j=0;j<examList.length;j++){
                                            let classItem=examList[j];
                                            let classTest={
                                                classTestName:classItem.classTestName,
                                                classTestType:classItem.classTestType,
                                                examList:[]
                                            }
                                            classTest.examList.push(classItem)
                                            for(let k=j+1;k<examList.length;k++){
                                                let otherClassItem=examList[k];
                                                if(otherClassItem.classTestName==classItem.classTestName){
                                                    classTest.examList.push(otherClassItem);
                                                    examList.splice(k,1)
                                                    k--
                                                }
                                            }
                                            data[i].list.push(classTest)
                                        }
                                    }
                                 }
                             }
                             this.resultData=data;
                             console.log(data)
                        } else {
                            if (res.data.code > 39999) {
                                this.$Message.info(res.data.msg);
                            }
                        }
                    });
            },
            countActionStaminaStudentList (yearSemester) {
                this.$axios
                    .get(
                        '/v1/actionStamina/countActionStaminaStudentList?gender=' +
                        (this.gender=="999"?"":this.gender) +
                        '&registerCode=' +
                        this.registerCode +
                        '&gradeId=' +
                        (this.grade=="999"?"":this.grade)+
                        '&studentClass=' +
                        (this.studentClass=="999"?"":this.studentClass) +
                        '&studentName=' +
                        this.studentName +
                        '&yearSemester=' +
                        yearSemester
                    )
                    .then(res => {
                        if (res.data.code == 10000) {
                            this.total = res.data.response;
                        } else {
                            if (res.data.code > 39999) {
                                this.$Message.info(res.data.msg);
                            }
                        }
                    });
            },
    querySearch() {
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      vm.getActionStaminaStudentList(vm.yearSemester);
      vm.countActionStaminaStudentList(vm.yearSemester);
    },
    restore() {
      var vm = this;
      vm.grade = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = "";
      vm.studentName = "";
      vm.gender = "";
      vm.querySearch();
    },

    pageNoChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value;
        this.search();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNo = 1;
        this.search();
      }
    },
    paramsCheck(){
        var vm=this;
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
        let yearSemester=sessionStorage.getItem("actionStaminaGrade-actionStaminaStudentList-yearSemester");

        vm.yearSemester=yearSemester;
        if(Number(sessionStorage.getItem("actionStaminaGrade-actionStaminaStudentList-grade"))==999){
            vm.grade=vm.schoolGradeList[0].grade;
        }else{
          vm.grade=Number(sessionStorage.getItem("actionStaminaGrade-actionStaminaStudentList-grade"))
        }
        if(Number(sessionStorage.getItem("actionStaminaGrade-actionStaminaStudentList-studentClass"))==999){
            vm.studentClass=vm.classList[0].value;
        }else{
          vm.studentClass=Number(sessionStorage.getItem("actionStaminaGrade-actionStaminaStudentList-studentClass"))
        }

        let grade = sessionStorage.getItem('actionStaminaStudentList-grade');
        let studentClass = sessionStorage.getItem('actionStaminaStudentList-studentClass');
        let  registerCode = sessionStorage.getItem('actionStaminaStudentList-registerCode');
        let  studentName = sessionStorage.getItem('actionStaminaStudentList-studentName');
        let  gender = sessionStorage.getItem('actionStaminaStudentList-gender');
        let  pageNo = sessionStorage.getItem('actionStaminaStudentList-pageNo');
        let  pageSize = sessionStorage.getItem('actionStaminaStudentList-pageSize');

        if(grade != null && grade != "" && grade != undefined && grade > 0){
            vm.grade = Number(grade);
        }
        if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
            vm.studentClass = Number(studentClass);
        }
        if(registerCode != null && registerCode != "" && registerCode != undefined ){
            vm.registerCode = registerCode;
        }
        if(studentName != null && studentName != "" && studentName != undefined ){
            vm.studentName = studentName;
        }
        if(gender != null && gender != "" && gender != undefined ){
            vm.gender = gender;
        }else{
            vm.gender="999"
        }
        if(pageNo != null && pageNo != "" && pageNo != undefined && pageNo > 0){
            vm.pageNo = Number(pageNo);
        }
        if(pageSize != null && pageSize != "" && pageSize != undefined && pageSize > 0){
            vm.pageSize = Number(pageSize);
        }
        vm.search();
    }
  },
  watch: {

  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    vm.paramsCheck()
  }
};
</script>
