<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体能数据统计</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>年<span style="visibility:hidden">空</span>级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option
                            v-for="item in schoolGradeList"
                            :value="item.grade"
                            :key="item.grade"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班<span style="visibility:hidden">空</span>级：</span>
                    <Select v-model="studentClass"  style="width:120px;">
                        <Option v-for="(item,i) in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>性<span style="visibility:hidden">空</span>别：</span>
                    <Select v-model="gender"  style="width:120px;">
                        <Option
                            v-for="item in genderList"
                            :value="item.itemId"
                            :key="item.itemId"
                        >{{ item.itemName }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓<span style="visibility:hidden">空</span>名：</span>
                    <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>
                    <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
                </div>
            </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="restore">重置查询条件</Button>
            <Button type="success" @click="exportSchoolTestData1">导出EXCEL</Button>
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
              :current="pageNum"
              :page-size="pageSize"
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
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      gender:"",
      genderList:[
        {
          itemId:"",
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
          grade: "",
          label: "全部"
        },
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
          grade: "",
          label: "全部"
        },
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
      highList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 10,
          label: "高一"
        },
        {
          grade: 11,
          label: "高二"
        },
        {
          grade: 12,
          label: "高三"
        }
      ],
      collegeList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 13,
          label: "大一"
        },
        {
          grade: 14,
          label: "大二"
        },
        {
          grade: 15,
          label: "大三"
        },
        {
          grade: 16,
          label: "大四"
        }
      ],
      classList: [
            {
                value: '',
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
            },
            {
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
      schoolGradeList: [],
      studentClass: "",
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          fixed: 'left',
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          minWidth:100,
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
          minWidth:100,
          align: "center"
        },
        {
          title: "班级",
          key: "studentClass",
          minWidth:100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.gradeName+ row.studentClass + "班";
            return h("div", text);
          }
        },
         {
          title: "项目名称",
          key: "showItemTest",
          align: "center",
          type:"html",
          width:250,
        },
        {
          title: "考核项目",
          key: "showItemName",
          align: "center",
          type:"html",
          width:250,
        },
        {
          title: "成绩",
          key: "showItemValue",
          align: "center",
          type:"html",
          minWidth:100,
        },
        {
          title: "基础得分",
          key: "showBaseScore",
          align: "center",
          type:"html",
          minWidth:100,
        },
        {
          title: "技评得分",
          key: "showTeacherScore",
          align: "center",
          type:"html",
          minWidth:100,
        },
        {
          title: "总得分",
          key: "showScore",
          align: "center",
          type:"html",
          minWidth:100,
        },
        {
          title: "等级",
          key: "showScoreLevel",
          align: "center",
          type:"html",
          minWidth:100,
        },
        {
          title: "是否签名",
          key: "signatureStatus",
          align: "center",
          width:80,
          fixed: 'right',
          render: (h, params) => {
            const row = params.row;
            const text = row.signatureStatus=="1"?"已签名":"未签名";
            return h("div", text);
          }
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   align: 'center',
        //   width:120,
        //   fixed: 'right',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'success'
        //           },
        //           style: {
        //             marginRight: '0px'
        //           },
        //           on: {
        //             click: () => {
        //               this.toDetail(params.row)
        //             }
        //           }
        //         },
        //         '详情'
        //       )
        //     ])
        //   }
        // }
      ],
      resultData: [],
      resultData1: [],
      isCollege: false,
      college: "",
      collegesList: [],
      major: "",
      majorList: [],
      chooseCollege: true,
      collegeName: "",
      semesterYear: "",
      semesterName: "",
      semesterYearList: [],
      holiday: "",
      holidayTf: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum1: 1,
      pageSize1: 10,
      total1: 0
    };
  },
  methods: {
    exportSchoolTestData(){
      var vm=this;
       if(typeof(vm.grade) == "undefined"){
                    vm.grade="";
                }
                 if(typeof(vm.studentClass) == "undefined"){
                    vm.studentClass="";
                }
                if(typeof(vm.gender) == "undefined"){
                    vm.gender="";
                }

                if(typeof(vm.studentName) == "undefined"){
                    vm.studentName="";
                }
                if(typeof(vm.registerCode) == "undefined"){
                    vm.registerCode="";
                }
      let url =
        this.$axios.defaults.baseURL +
        '/v1/exam/exportExamStudentData?schoolId=1&grade='+vm.grade+'&studentClass='+vm.studentClass+'&gender='+vm.gender+'&studentName='+vm.studentName+'&registerCode='+vm.registerCode+'&token=' + sessionStorage.getItem('token')
        window.open(url)
    },
    exportSchoolTestData1(){
      var vm=this;
      if(typeof(vm.grade) == "undefined"){
        vm.grade="";
      }
      if(typeof(vm.studentClass) == "undefined"){
        vm.studentClass="";
      }
      if(typeof(vm.gender) == "undefined"){
        vm.gender="";
      }

      if(typeof(vm.studentName) == "undefined"){
        vm.studentName="";
      }
      if(typeof(vm.registerCode) == "undefined"){
        vm.registerCode="";
      }
      let url =
              this.$axios.defaults.baseURL +
              '/v1/exam/exportExamStudentDataNew?schoolId=1&grade='+vm.grade+'&studentClass='+vm.studentClass+'&gender='+
              vm.gender+'&studentName='+vm.studentName+'&registerCode='+vm.registerCode+'&classTestType='+vm.classTestType+
              '&token=' + sessionStorage.getItem('token')
      window.open(url)
    },
    toDetail(studentInfo){
      sessionStorage.setItem("classExamManage1-studentExamDetail1-studentId",studentInfo.studentId);
      sessionStorage.setItem('classExamManage1-studentExamDetail1-studentName',studentInfo.studentName)
      sessionStorage.setItem('classExamManage1-studentExamDetail1-examItemId',"")
      sessionStorage.setItem("classExamManage1-studentExamDetail1-gradeId",studentInfo.grade);
      sessionStorage.setItem('classExamManage1-studentExamDetail1-gender',studentInfo.gender)
      sessionStorage.setItem('classExamManage1-studentExamDetail1-studentClass',studentInfo.studentClass)
      sessionStorage.setItem('classExamManage1-studentExamDetail1-classId',studentInfo.classId)
      sessionStorage.setItem( 'classExamManage1-studentExamDetail1-classTestType',"2")
      this.$router.push({ name: "studentExamDetail1" });
    },
    getExerciseStudentList(schoolId) {
     var vm = this;
      sessionStorage.setItem('physicalFitnessData-grade',vm.grade);
      sessionStorage.setItem('physicalFitnessData-studentClass',vm.studentClass);
      sessionStorage.setItem('physicalFitnessData-registerCode',vm.registerCode);
      sessionStorage.setItem('physicalFitnessData-studentName',vm.studentName);
      sessionStorage.setItem('physicalFitnessData-gender',vm.gender);
      sessionStorage.setItem('physicalFitnessData-pageNum',vm.pageNum);
      sessionStorage.setItem('physicalFitnessData-pageSize',vm.pageSize);
      vm.resultData=[];
      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        gender:vm.gender,
        classTestType:"3"
      };
      this.$axios
        .post("/v1/exam/getExamStudentList", data)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let result = res.data.response;
              if(result != null && result.length > 0){
                for(let j=0;j<result.length;j++){
                  let examList = result[j].examList;
                  let showTest = "";
                  let showItemName = "";
                  let showItemValue = "";
                  let showBaseScore = "";
                  let showTeacherScore = "";
                  let showScore = "";
                  let showScoreLevel = "";
                  let showSignatureStatus = "";
                    if(examList && examList.length > 0){
                      let selectItemId = examList[0].classTestId;


                      showTest = "<div>";
                      showItemName = "<div>";
                      showItemValue = "<div>";
                      showBaseScore = "<div>";
                      showTeacherScore = "<div>";
                      showScore = "<div>";
                      showScoreLevel = "<div>";
                      showSignatureStatus = "<div>";


                      let tempHeightCount=0;
                      let tempName="";
                      let sigHeight=30;
                      let testAlllScore=0;
                      let testAlllScoreCount=0;
                      for(let i=0;i<examList.length;i++){
                          examList[i].classTestNameShow = examList[i].classTestName;
                          if(examList[i].signatureStatus == '1'){
                              examList[i].signatureStatus="已签名";
                          }else{
                              examList[i].signatureStatus="未签名";
                          }
                          if(examList[i].resultValue == null){
                              examList[i].resultValue = "--";
                              examList[i].baseScore = "--";
                              examList[i].teacherScore = "--";
                              examList[i].score = "--";
                              examList[i].scoreLevel = "--";
                          }else{
                              if(examList[i].examUnit && examList[i].examUnit == "分.秒"){
                                  let data = examList[i].resultValue;
                                  examList[i].resultValue=Number(data)%60>0?(Math.floor(Number(data)/60)+'\''+(Number(data)%60)+'\"'):Number(data)/60+'\'';
                              }else{
                                  examList[i].resultValue=examList[i].examUnit != '99' ? examList[i].resultValue +"("+examList[i].examUnit+")" : "--";
                              }
                              examList[i].baseScore = examList[i].baseScore==null? "--":examList[i].baseScore;
                              examList[i].teacherScore = examList[i].teacherScore==null? "--":examList[i].teacherScore;
                              examList[i].score = examList[i].score==null? "--":examList[i].score;
                              if(examList[i].scoreLevel == '1'){
                                 examList[i].scoreLevel="优秀";
                              }else if(examList[i].scoreLevel == '2'){
                                 examList[i].scoreLevel="良好";
                              }else if(examList[i].scoreLevel == '3'){
                                 examList[i].scoreLevel="及格";
                              }else{
                                  examList[i].scoreLevel="不及格";
                              }
                          }

                          if(examList[i].exemptType=='1' || examList[i].exemptType=='2'){
                             examList[i].classTestName = examList[i].classTestName+"(免试)";
                             examList[i].resultValue = "--";
                             examList[i].score=examList[i].exemptType=='1'?70:examList[i].exemptType=='2'?80:0;
                             examList[i].scoreLevel = examList[i].score>=90?"优秀":examList[i].score>=80?"良好":examList[i].score>=60?"及格":examList[i].score>=0?"不及格":"";
                          }

                          let borderStyle="border-top:1px #DFD9DE solid;";
                          if(showTest == "<div>"){
                              borderStyle="";
                          }else{
                              borderStyle="border-top:1px #DFD9DE solid;";
                          }
                          if(selectItemId != examList[i].classTestId){
                              showTest = showTest + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+tempHeightCount*sigHeight+"px;line-height:"+tempHeightCount*sigHeight+"px;' >"+tempName+"</div>"
                              selectItemId = examList[i].classTestId
                              tempHeightCount = 1;
                              if(examList.length > i+1 && examList[i].classTestId == examList[i+1].classTestId){
                                  tempHeightCount = tempHeightCount+1;
                                  borderStyle="border-top:1px #DFD9DE solid;";


                                  let average = "--";
                                  let averageLevel= "--";
                                  testAlllScore=0;
                                  testAlllScoreCount=0;
                                  for(let k=0;k<examList.length;k++){
                                      if(examList[k].classTestId == examList[i].classTestId){
                                          if(examList[k].score == '--' || examList[k].score == null){
                                              testAlllScore = -1;
                                              testAlllScoreCount = 0;
                                              break;
                                          }else{
                                              testAlllScore = examList[k].score*(examList[k].scorePercent/10000)+testAlllScore;
                                              testAlllScoreCount=testAlllScoreCount+1;
                                          }
                                      }
                                  }
                                  if(testAlllScore >= 0){
                                      average=testAlllScore.toFixed(1);
                                      averageLevel = average>=90?"优秀":average>=80?"良好":average>=60?"及格":average>=0?"不及格":"";
                                  }
                                  if(examList[i].exemptType=='1' || examList[i].exemptType=='2'){
                                      average=examList[0].exemptType=='1'?70:examList[0].exemptType=='2'?80:0;
                                      averageLevel = average>=90?"优秀":average>=80?"良好":average>=60?"及格":average>=0?"不及格":"";
                                  }

                                  showItemName = showItemName + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].classTestNameShow+"(合计)</div>"
                                  showItemValue = showItemValue + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"
                                  showBaseScore = showBaseScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"
                                  showTeacherScore = showTeacherScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"
                                  showScore = showScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+average+"</div>"
                                  showScoreLevel = showScoreLevel + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+averageLevel+"</div>"
                                  showSignatureStatus = showSignatureStatus + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"

                              }
                              tempName = examList[i].classTestName;
                          }else{
                              if(i==0 && examList.length>1 && examList[0].classTestId == examList[1].classTestId){
                                  tempHeightCount=tempHeightCount+1;
                                  borderStyle="border-bottom:1px #DFD9DE solid;";

                                  let average = "--";
                                  let averageLevel= "--";
                                  testAlllScore=0;
                                  testAlllScoreCount=0;
                                  for(let k=0;k<examList.length;k++){
                                      if(examList[k].classTestId == examList[0].classTestId){
                                          if(examList[k].score == '--' || examList[k].score == null){
                                              testAlllScore = -1;
                                              testAlllScoreCount = 0;
                                              break;
                                          }else{
                                              testAlllScore = examList[k].score*(examList[k].scorePercent/10000)+testAlllScore;
                                              testAlllScoreCount=testAlllScoreCount+1;
                                          }
                                      }
                                  }
                                  if(testAlllScore >= 0){
                                      average=testAlllScore.toFixed(1);
                                      averageLevel = average>=90?"优秀":average>=80?"良好":average>=60?"及格":average>=0?"不及格":"";
                                  }
                                  if(examList[i].exemptType=='1' || examList[i].exemptType=='2'){
                                      average=examList[0].exemptType=='1'?70:examList[0].exemptType=='2'?80:0;
                                      averageLevel = average>=90?"优秀":average>=80?"良好":average>=60?"及格":average>=0?"不及格":"";
                                  }

                                  showItemName = showItemName + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].classTestNameShow+"(合计)</div>"
                                  showItemValue = showItemValue + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"
                                  showBaseScore = showBaseScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"
                                  showTeacherScore = showTeacherScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"
                                  showScore = showScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+average+"</div>"
                                  showScoreLevel = showScoreLevel + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+averageLevel+"</div>"
                                  showSignatureStatus = showSignatureStatus + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >--</div>"

                              }
                              tempHeightCount=tempHeightCount+1;
                              tempName = examList[i].classTestName;
                          }
                          if(i==examList.length-1){
                             tempName = examList[i].classTestName;
                            if(examList.length>1){
                                showTest = showTest + "<div style='text-align:center;width:100%;border-top:1px #DFD9DE solid;height:"+tempHeightCount*sigHeight+"px;line-height:"+tempHeightCount*sigHeight+"px;' >"+tempName+"</div>"
                             }else{
                                showTest = showTest + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+tempHeightCount*sigHeight+"px;line-height:"+tempHeightCount*sigHeight+"px;' >"+tempName+"</div>"
                             }
                          }
                          if(i == 0){
                              borderStyle="";
                          }else{
                              borderStyle="border-top:1px #DFD9DE solid;";
                          }
                          let scorePercent = "";
                          if(examList[i].scorePercent != null && examList[i].scorePercent > 0 && examList[i].scorePercent < 10000){
                              examList[i].scorePercent = examList[i].scorePercent/100;
                              scorePercent = " ("+examList[i].scorePercent+"%)"
                          }

                          showItemName = showItemName + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].examItemName+scorePercent+"</div>"
                          showItemValue = showItemValue + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].resultValue+"</div>"
                          showBaseScore = showBaseScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].baseScore+"</div>"
                          showTeacherScore = showTeacherScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].teacherScore+"</div>"
                          showScore = showScore + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].score+"</div>"
                          showScoreLevel = showScoreLevel + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].scoreLevel+"</div>"
                          showSignatureStatus = showSignatureStatus + "<div style='text-align:center;width:100%;"+borderStyle+"height:"+sigHeight+"px;line-height:"+sigHeight+"px;' >"+examList[i].signatureStatus+"</div>"

                      }
                      showTest = showTest+ "</div>"
                      showItemName = showItemName+ "</div>"
                      showItemValue = showItemValue+ "</div>"
                      showBaseScore = showBaseScore+ "</div>"
                      showTeacherScore = showTeacherScore+ "</div>"
                      showScore = showScore+ "</div>"
                      showScoreLevel = showScoreLevel+ "</div>"
                      showSignatureStatus = showSignatureStatus+ "</div>"

                }
                result[j].showItemTest=showTest;
                result[j].showItemName=showItemName;
                result[j].showItemValue=showItemValue;
                result[j].showBaseScore=showBaseScore;
                result[j].showTeacherScore=showTeacherScore;
                result[j].showScore=showScore;
                result[j].showScoreLevel=showScoreLevel;
                result[j].showSignatureStatus=showSignatureStatus;
              }
              vm.resultData = result;
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countExerciseStudentList(schoolId) {
      var vm = this;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        gender:vm.gender,
      };
      this.$axios
        .post("/v1/exam/countExamStudentList", data)
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
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      let schoolId = vm.schoolId;
      vm.getExerciseStudentList(schoolId);
      vm.countExerciseStudentList(schoolId);
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

    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        this.search();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.search();
      }
    },
  },
  watch: {

  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
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

    let grade = sessionStorage.getItem('physicalFitnessData-grade');
    let studentClass = sessionStorage.getItem('physicalFitnessData-studentClass');
    let  registerCode = sessionStorage.getItem('physicalFitnessData-registerCode');
    let  studentName = sessionStorage.getItem('physicalFitnessData-studentName');
    let  gender = sessionStorage.getItem('physicalFitnessData-gender');
    let  pageNum = sessionStorage.getItem('physicalFitnessData-pageNum');
    let  pageSize = sessionStorage.getItem('physicalFitnessData-pageSize');

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
    }
    if(pageNum != null && pageNum != "" && pageNum != undefined && pageNum > 0){
        vm.pageNum = Number(pageNum);
    }
    if(pageSize != null && pageSize != "" && pageSize != undefined && pageSize > 0){
        vm.pageSize = Number(pageSize);
    }
    vm.search();
  }
};
</script>
