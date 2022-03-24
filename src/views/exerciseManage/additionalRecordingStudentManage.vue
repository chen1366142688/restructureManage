<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">课后作业补录</h2>
    </div>
    <div>
      <Card style="height: 110px;">
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>补录类型：</span>
                    <Select v-model="optionType"  style="width:120px;">
                        <Option
                        v-for="item in optionTypeList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span style>日期：</span>
                    <DatePicker v-model="dateTime" :disabled="optionType == 2" :options="options3" :clearable="false" :editable="false" @on-change="StartTimeChange" format="yyyy-MM-dd" type="date" placeholder="日期" style="width: 120px"></DatePicker>
                </div>
                <div style="margin:5px 20px;">
                    <span>年级：</span>
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
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                    <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="querySearch">查询</Button>
                <Button type="success" @click="goBack">返回</Button>
            </div>
        </div>
      </Card>
      <br />
      <Card v-if="optionType=='1'">
        <div style="font-size:18px;width:100%;height:40px;display:flex;align-items:center;justify-content:space-between;">
            <div>数据明细</div>
            <div>
              <Button type="success" @click="allComplete" :disabled="completeDisabled">一键完成</Button>
              <Button type="success" @click="allCancle" :disabled="completeDisabled">一键取消</Button>
            </div>
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
        </Row>
     </Card>
      <Card v-if="optionType=='2'">
        <div style="font-size:18px;width:100%;height:40px;display:flex;align-items:center;justify-content:space-between;">
          <div>数据明细</div>
          <Button type="success" :disabled = "dataSize" @click="allmodalTx" >一键完成</Button>
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumnsByCount" :data="resultDataByCount"></Table>
          </div>
          <br />
           <div style="margin-top:10px;padding-left:46%">
                <Button
                  :disabled = "dataSize"
                  style="float:left;width:100px"
                  @click="saveAllStudentCount"
                  type="success"
                >提交</Button>
              </div>
        </Row>

     </Card>


    </div>
    <Modal v-model="giveStatus" :closable="false" width="420" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <!-- <Icon type="ios-information-circle"></Icon> -->
        <span>锻炼时长</span>
      </p>
      <div style="text-align:center">
          <Input style="width: 180px;" v-model="exerciseTime" placeholder="分钟" />分钟
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  :loading="changeLoading" @click="updateStudentCompleteStatus">保存</Button>
      </div>
    </Modal>

    <Modal
      v-model="modalTx"
      title="一键完成"
      :mask-closable="false"
      @on-ok="modalTxOk"
      @on-cancel="modalTxCancel"
      width= "350px">
      <div>
         完成次数：<Input v-model="allTeacherCount" :maxlength="3" type="text"  style="width:200px"/>
      </div>
      <div slot="footer">
        <Button type="success" @click="modalTxOk">确定</Button>
        <Button type="success" @click="modalTxCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import allClass from '@/libs/classList.js'
export default {
  name: "schoolList",
  data() {
    return {
      allTeacherCount:'',
      modalTx:false,
      optionType:'1',
      optionTypeList:[
        {
          id: '1',
          label: "按日期补录"
        },
         {
          id: '2',
          label: "按次数补录"
        },
      ],
      changeStudent:'',
       options3: {
                    disabledDate (date) {
                        return date && date.valueOf() >(Date.now() - 86400000) ;
                    }
                },
      giveStatus:false,
      changeLoading:false,
      loading: false,
      schoolId: "",
      schoolType: "",
      dateTime:'',
      grade: "",
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
      highList: [
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
      schoolGradeList: [],
      studentClass:1,
      classList: [],
      studentName: "",
      resultColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gradeName + row.studentClass + "班";
            return h("div", text);
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 240,
          render: (h, params) => {
            const param = params.row;
            if(param.afterClassChoose == '1'){
                return h("div", "免试");
            }else{
              return h('i-switch',
                    {
                        props: {
                        type: 'primary',
                        value:param.completeStatus === '1',
                        disabled:this.completeDisabled
                        }
                        ,slots:{
                            open:'有效',
                            close:'无效'
                        }
                        ,on: {
                            'on-change': (status) => {
                                if(status){
                                    param.completeStatus= '1'
                                }else{
                                    param.completeStatus= '0'
                                }
                                this.changeOperatorStatus(param);
                            }
                        }
                    }
                    ,[
                        h('span',{props: {slot: 'open'}},'有效'),
                        h('span',{props: {slot: 'close'}},'无效')
                    ]
                );
            }
          }
        }
      ],
      resultData: [],
      resultDataByCount:[],
      resultDataByCountOld:[],
      resultColumnsByCount:[
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const text = row.gradeName + row.studentClass + "班";
            return h("div", text);
          }
        },
        {
          title: "课后作业完成次数/总次数",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            const text = haveCount+'/'+row.needExerciseCount;
            return h("div", text);
          }
        },
        {
          title: "补录次数",
          key: "teacherCount",
          align: "center",
          render: (h, params) => {
            let that = this
            let reg = /^([1-9]\d*|[0]{1,1})$/;
            return h("div", [
              h("Input", {
                props: {
                  type: 'text',
                  value:params.row.teacherCount
                },
                attrs:{
                  id: `score${params.index}`,
                },
                style: {
                  width:"120px",
                  "text-align": "center"
                },
                on: {
                  'on-blur': (event) => {
                    if(!reg.test(event.target.value)){//浮点数
                      this.$Message.info("完成次数输入有误，请重新输入");
                      this.resultDataByCount[params.index].teacherCount = event.target.value;
                    }else{ //正整数
                      if(event.target.value>100 || event.target.value < 1){
                        this.$Message.info("完成次数输入有误，请重新输入");
                      }
                      this.resultDataByCount[params.index].teacherCount = event.target.value;
                    }
                  },
                  'on-keydown':(event)=>{
                    let ivuInputLength = that.resultDataByCount.length;
                    let paramsLength = params.index + 1;
                    if(event.keyCode == 38){//键盘上切换上一个输入框
                      if(params.index == 0){ return ;}
                      document.getElementById(`score${params.index-1}`).getElementsByTagName("input")[0].focus()
                    }
                    if(event.keyCode == 40 || event.keyCode == 13){//键盘下切换下一个输入框
                      if(paramsLength+1 > ivuInputLength ){ 
                        document.getElementById(`score${params.index}`).getElementsByTagName("input")[0].blur()
                        return; 
                      }
                      document.getElementById(`score${params.index+1}`).getElementsByTagName("input")[0].focus()
                    }
                  }
                },
              }),
            ]);
          }
        },
      ],
      exerciseTime:'',
      studentList:[],
      completeType:'1',
      completeDisabled:true,
      oneKeyFinish:false,
      dataSize:false,
      yearSemester:"",
    };
  },
  methods: {
    //返回
    goBack() { this.$router.go(-1);},
    getAdditionalRecordingStudentByDay() {
      var vm = this;
      sessionStorage.setItem('additionalRecordingStudentManage-grade',vm.grade);
      sessionStorage.setItem('additionalRecordingStudentManage-studentClass',vm.studentClass);
      sessionStorage.setItem('additionalRecordingStudentManage-dateTime',vm.dateTime);
      sessionStorage.setItem('additionalRecordingStudentManage-studentName',vm.studentName);
      vm.loading = true;
      if(this.optionType=='2'){
            let data = {
              grade: vm.grade,
              pageNo: 1,
              pageSize: 10000,
              registerCode: '',
              schoolId: vm.schoolId,
              studentClass: vm.studentClass,
              studentName: vm.studentName,
              yearSemester:vm.yearSemester
            };
            this.$axios
              .post("/v1/datafiles/queryHisExerciseStudentMakeUpList", data)
              .then(res => {
                vm.loading = false;
                if (res.data.code == 10000) {
                  let data = res.data.response;
                  vm.resultDataByCount = data;
                  vm.resultDataByCountOld = JSON.parse(JSON.stringify(data));
                  if(data.length == 0){
                    vm.dataSize =true
                  }else{
                    vm.dataSize =false
                  }
                } else {
                  if (res.data.code > 39999) {
                    vm.$Message.info(res.data.msg);
                  }
                }
              });
      }else{
          this.$axios
          .get("/v1/familyexerciseanalyze/getAdditionalRecordingStudentByDay?dateTime="+vm.dateFormat("yyyy-mm-dd",vm.dateTime)+"&gradeId="+vm.grade+"&studentClass="+vm.studentClass+
          "&studentName="+vm.studentName)
          .then(res => {
            vm.loading = false;
            if (res.data.code == 10000) {
              vm.resultData = res.data.response;
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg);
              }
            }
          });
      }
    },
    cancle(){
      var vm=this;
      this.giveStatus=false;
      if(vm.studentList.length==1 && !vm.oneKeyFinish){
        for(let i=0;i<vm.studentList.length;i++){
        vm.studentList[i].completeStatus=vm.studentList[i].completeStatus=="1"?"0":"1"
      }
      }
    },
    changeOperatorStatus(student){
      var vm=this;
      vm.oneKeyFinish=false;
      vm.completeType=student.completeStatus=="1"?"1":"2"
      if(vm.completeType=="1"){
        vm.studentList=[];
        vm.studentList.push(student);
        vm.exerciseTime='';
        vm.giveStatus=true;
      }else{
        vm.studentList=[];
        vm.studentList.push(student);
        vm.updateStudentCompleteStatus()
      }

    },
    allmodalTx(){
      this.modalTx = true;
      this.allTeacherCount = this.resultDataByCount[0].teacherCount
    },
    modalTxCancel(){
      this.modalTx = false;
    },
    modalTxOk(){
      let vm = this;
      let allTeacherCount = this.allTeacherCount;
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      if(allTeacherCount == '' || allTeacherCount == null){
          this.$Message.info("请输入完成次数")
          return false;
      }
      if(!reg.test(allTeacherCount)){
          this.$Message.info("完成次数输入有误，请重新输入")
          return false;
      }
      if(allTeacherCount>100 ||allTeacherCount < 1){
        this.$Message.info("完成次数输入有误，请重新输入");
        return false;
      }
       this.modalTx = false;
       let data = {
        grade: this.grade,
        studentClass: this.studentClass,
        teacherCount: allTeacherCount,
        yearSemester:this.yearSemester
      };
       this.$axios
        .post(
          '/v1/datafiles/bathUpdateAllCount',data
        )
        .then(function(response) {
          if(response.data.response.code=='1'){
              vm.$Message.info("提交成功")
              vm.search();
          }else{
              vm.$Message.info("提交失败,请勿重复提交！")
              vm.search();
          }
        })
        .catch(function(response) {
          vm.$Message.info("提交失败")
          vm.search();
        })

    },
    allComplete(){
      var vm=this;
      vm.exerciseTime='';
      vm.completeType="1";
      vm.studentList=vm.resultData;
      vm.oneKeyFinish=true;
      vm.giveStatus=true;
    },
    allCancle(){
      var vm=this;
      vm.completeType="2";
      vm.studentList=vm.resultData;
      vm.updateStudentCompleteStatus()
      // vm.giveStatus=true;
    },
    updateStudentCompleteStatus() {
     var vm = this;
     var re = /^\d+(?=\.{0,1}\d+$|$)/;
      if(vm.completeType=="1" && (!vm.exerciseTime || !re.test(vm.exerciseTime))){
        vm.$Message.info("请输入正确的锻炼时长！");
        return;
      }
      if(vm.studentList.length<1){
        vm.$Message.info("当前没有学生需要补录！");
        return;
      }

      vm.changeLoading=true;
      vm.loading = true;
      let data={
        "exerciseTime":vm.exerciseTime? vm.exerciseTime*1000*60:0,
        completeType:vm.completeType,
        "list": vm.studentList}
      this.$axios
        .post("/v1/familyexerciseanalyze/updateStudentCompleteStatus",data)
        .then(res => {
          vm.loading = false;
          vm.search();
          vm.giveStatus=false;
          vm.changeLoading=false;
          if (res.data.code == 10000) {
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
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
      vm.getAdditionalRecordingStudentByDay();
    },
    StartTimeChange(e){

    },
   dateFormat(fmt, date) {
      let ret;
      const opt = {
          "y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
      };
      return fmt;
  },
  saveAllStudentCount() {
      var vm = this
      let list1 = vm.resultDataByCountOld;
      let list=vm.resultDataByCount;
      let data=list
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      for(let i=0;i<data.length;i++){
        data[i].yearSemester = vm.yearSemester;
        if(data[i].teacherScore){
          if (!reg.test(data[i].teacherScore)) {
            vm.$Message.info(data[i].studentName+"的完成次数输入有误！")
             //vm.submitInfo=false;
            return false;
          }
        }
      }
      let isSave = true;

      for(let i=0;i<data.length;i++){
        for(let j=0;j<list1.length;j++){
          if(i==j){
            console.log(data[i].teacherCount);
            console.log(list1[j]);
            if(data[i].teacherCount != list1[j].teacherCount){
              isSave = false;
            }
          }
        }
      }
      if(isSave){
        vm.$Message.info("没有改变数据，无需提交！！")
        return false;
      }
      this.$axios
        .post(
          '/v1/datafiles/bathUpdateCount',data
        )
        .then(function(response){
          if(response.data.response.code=='1'){
              vm.$Message.info("提交成功")
              vm.querySearch();
          }else{
              vm.$Message.info("提交失败,请勿重复提交！")
          }
        })
        .catch(function(response) {
         // vm.submitInfo=false;
        //   console.log(response)
          //vm.$Message.info("提交失败")
        })
    },
  },
  watch: {
    dateTime:function(){
      var vm=this;
      console.log(vm.dateTime)
      console.log(new Date)
      if(vm.dateFormat("yyyy-mm-dd",new Date(vm.dateTime))>=vm.dateFormat("yyyy-mm-dd",new Date)){
        vm.completeDisabled=true
      }else{
        if(vm.resultData.length<1){
          vm.completeDisabled=true
        }else{
          vm.completeDisabled=false
        }
      }
    },
    resultData:function(){
      var vm=this;
      if(vm.dateFormat("yyyy-mm-dd",new Date(vm.dateTime))>=vm.dateFormat("yyyy-mm-dd",new Date)){
        vm.completeDisabled=true
      }else{
        if(vm.resultData.length<1){
          vm.completeDisabled=true
        }else{
          vm.completeDisabled=false
        }
      }
    },
    optionType:function(){
        this.querySearch();
    }
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    vm.dateTime=new Date- 86400000;
    vm.dateTime =new Date(vm.dateTime);
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.yearSemester = sessionStorage.getItem("yearSemester");
    vm.schoolType = schoolType;
    if ("2" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      vm.grade=1
    }
    if ("3" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      vm.grade=7
    }
    if ("4" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
      vm.grade=10
    }
    this.classList = allClass.slice(1,allClass.length)
    let  grade = sessionStorage.getItem('additionalRecordingStudentManage-grade');
    let  studentClass = sessionStorage.getItem('additionalRecordingStudentManage-studentClass');
    let  studentName = sessionStorage.getItem('additionalRecordingStudentManage-studentName');
    let dateTime=sessionStorage.getItem('additionalRecordingStudentManage-dateTime');
    // console.log(dateTime)

    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = Number(grade);
    }
    // if(dateTime != null && dateTime != "" && dateTime != undefined ){
    //     vm.dateTime =new Date(dateTime);
    // }
    if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
        vm.studentClass = Number(studentClass);
    }

    if(studentName != null && studentName != "" && studentName != undefined ){
        vm.studentName = studentName;
    }
    vm.search();
  }
};
</script>
