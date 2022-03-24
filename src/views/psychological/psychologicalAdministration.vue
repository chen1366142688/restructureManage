<template>
  <div id="app"  style='padding-left:10px'>
     <h2 style='margin-top:15px;margin-bottom:13px;'>心理测评管理</h2>
     <Card style="margin-bottom:20px">
         <div class="top-search">
             <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>年<span style="visibility:hidden;">选择</span>级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班<span style="visibility:hidden;">选择</span>级：</span>
                    <Select v-model="studentClass"  style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓<span style="visibility:hidden;">选择</span>名：</span>
                    <Input style="width:120px;" v-model="userInfo.studentName"></Input>
                </div>
                <div style="margin:5px 20px;"  @keydown.enter="querySearch">
                    <span>学籍号<span style="visibility:hidden">占</span>：</span>
                    <Input style="width:120px;" v-model="userInfo.registerCode"></Input>
                </div>
                 <div style="margin:5px 20px;">
                    <span>提交状态：</span>
                    <Select v-model="submitStatus"  style="width:120px;">
                        <Option v-for="item in submitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
             </div>
             <div class="right-btns">
                 <Button type="success" @click="querySearch">查询</Button>
<!--                 <Button type="success" @click="oneComplate = true">一键推送报告给家长</Button>-->
                 <Button type="success" @click="goBack">返回</Button>
             </div>
         </div>
      </Card>
      <Card>
        <div>
            <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            <div style="text-align:right;margin-top:10px;">
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
        </div>
      </Card>
      <Modal v-model="oneComplate" :mask-closable="false" width="420" >
        <p slot="header" style="color:#f60;text-align:center">
            <span>请选择推送项</span>
        </p>
        <div style="">
            <CheckboxGroup v-model="fruit">
                <Checkbox :label="item.value" :value="item.value" v-for="(item,index) in fruits" :key="index">{{item.label}}</Checkbox>
            </CheckboxGroup>
        </div>
        <div slot="footer">
            <Button type="success"  @click="cancel" >取消</Button>
            <Button type="success"  :loading="listCheck" @click="pushPsychologicalToPatriarch" >推送</Button>
        </div>
        </Modal>
        <!-- <Modal
            v-model="oneComplate"
            title="请选择推送项"
            @on-ok="pushPsychologicalToPatriarch"
            @on-cancel="cancel">
            <CheckboxGroup v-model="fruit">
                <Checkbox :label="item.label" :value="item.value" v-for="item in fruits"></Checkbox>
            </CheckboxGroup>
        </Modal> -->
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app",
  data() {
    return {
        loading:false,
        listCheck:false,
        grade:'',//年级
        schoolGradeList:[],
        primaryList: [
            {
            grade: 1,
            label: '一年级'
            },
            {
            grade: 2,
            label: '二年级'
            },
            {
            grade: 3,
            label: '三年级'
            },
            {
            grade: 4,
            label: '四年级'
            },
            {
            grade: 5,
            label: '五年级'
            },
            {
            grade: 6,
            label: '六年级'
            }
        ],
        middleList: [
            {
            grade: 7,
            label: '七年级'
            },
            {
            grade: 8,
            label: '八年级'
            },
            {
            grade: 9,
            label: '九年级'
            }
        ],
        highList: [
            {
            grade: 10,
            label: '高一'
            },
            {
            grade: 11,
            label: '高二'
            },
            {
            grade: 12,
            label: '高三'
            }
        ],
        collegeList: [
            {
            grade: 13,
            label: '大一'
            },
            {
            grade: 14,
            label: '大二'
            },
            {
            grade: 15,
            label: '大三'
            },
            {
            grade: 16,
            label: '大四'
            }
        ],
        studentClass:'',//班级
        classList: [
            {
            value: "999",
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
        submitList:[
            {value:'999',label:'全部'},
            {value:"0",label:'未提交'},
            {value:"1",label:'已提交'}
        ],
        submitStatus:"",
        dangerLevel:'',//危险等级
        dangerLevelList:[
            {value:'999',label:'全部'},
            {value:0,label:'低风险'},
            {value:1,label:'中等风险'},
            {value:2,label:'中高风险'},
            {value:3,label:'高风险'},
        ],
        depressed:'',//抑郁倾向
        depressedList:[
            {value:"999",label:'全部'},
            {value:0,label:'正常'},
            {value:1,label:'预警'}
        ],
        life:'',//生命价值
        lifeList:[
            {value:'999',label:'全部'},
            {value:0,label:'正常'},
            {value:1,label:'预警'},
        ],
        security:'',//安全意识
        securityList:[
            {value:'999',label:'全部'},
            {value:0,label:'正常'},
            {value:1,label:'预警'},
        ],
        setback:'',//抗挫力
        setbackList:[
            {value:'999',label:'全部'},
            {value:0,label:'正常'},
            {value:1,label:'预警'},
        ],
        userInfo:{
            studentName:'',
            registerCode:''
        },
        resultColumns:[
            {
                title: '姓名',
                key: 'studentName',
                align: 'center',
            },
            {
                title: '学籍号',
                key: 'registerCode',
                align: 'center',
                width:200,
            },
            {
                title: '性别',
                key: 'gender',
                align: 'center',
                render: (h, params) => {
                    let text=params.row.gender=="1"?"男":"女"
                    return h('div', text)
                }
            },
            {
            title: '班级',
            key: 'grade',
            align: 'center',
            render: (h, params) => {
                    return h('div', params.row.grade == 1 ? `一年级${params.row.studentClass}班`:
                    params.row.grade==2? `二年级${params.row.studentClass}班`:
                    params.row.grade ==3?`三年级${params.row.studentClass}班`:
                    params.row.grade ==4?`四年级${params.row.studentClass}班`:
                    params.row.grade ==5?`五年级${params.row.studentClass}班`:
                    params.row.grade ==6?`六年级${params.row.studentClass}班`:
                    params.row.grade ==7?`七年级${params.row.studentClass}班`:
                    params.row.grade ==8?`八年级${params.row.studentClass}班`:
                    params.row.grade ==9?`九年级${params.row.studentClass}班`:
                    params.row.grade ==10?`高一${params.row.studentClass}班`:
                    params.row.grade ==11?`高二${params.row.studentClass}班`:
                    params.row.grade ==12?`高三${params.row.studentClass}班`:'全校')
                }
            },
            {
            title: '提交状态',
            key: 'submitStatus',
            align: 'center',
            render: (h, params) => {
                    return h('div', params.row.submitStatus == '1' ? '已提交':"未提交")
                }
            },
            // {
            // title: '风险等级',
            // key: 'dangerLevel',
            // align: 'center',
            // render: (h, params) => {
            //         return h('div', params.row.dangerLevel == 0 ? '低':
            //         params.row.dangerLevel==1? '中':
            //         params.row.dangerLevel ==2?'中高':
            //         params.row.dangerLevel ==3?'高':'——')
            //     }
            // },
            // {
            // title: '预警维度',
            // key: 'depressedWarning',
            // align: 'center',
            // render: (h, params) => {
            //     const row = params.row;
            //     var text="";
            //     if(row.depressedWarning == 1){
            //         text+="<lable style='display:block;padding:5px 0;'>抑郁预警</lable>"
            //     }
            //     if(row.lifeWarning == 1){
            //         // if(row.depressedWarning==1){
            //         //     text += "</br>";
            //         // }
            //         text+="<lable style='display:block;padding:5px 0;'>生命预警</lable>"
            //     }
            //     if(row.safetyWarning == 1){
            //         //  if(row.depressedWarning==1 || row.lifeWarning == 1){
            //         //     text += "</br>";
            //         // }
            //         text+="<lable style='display:block;padding:5px 0;'>安全预警</lable>"
            //     }
            //     if(row.setbackWarning  == 1){
            //         //  if(row.depressedWarning==1 || row.lifeWarning == 1 || row.safetyWarning==1){
            //         //     text += "</br>";
            //         // }
            //         text+="<lable style='display:block;padding:5px 0;'>挫折预警</lable>"
            //     }
            //     /*一个风险都没有*/
            //     if(row.depressedWarning != 1&&row.lifeWarning != 1&&row.safetyWarning != 1&&row.setbackWarning != 1){
            //         text+="<lable style='display:block;padding:5px 0;'>——</lable>"
            //     }
            //     return h("div", {
            //         domProps: {
            //         innerHTML: text
            //         }
            //     });
            // }
            // },
            // {
            // title: '报告在家长端可见',
            // key: 'submitStatus',
            // align: 'center',
            // render: (h, params) => {
            //     const param = params.row;
            //     return h('i-switch',{
            //                 props: {
            //                     type: 'primary',
            //                     value:param.submitStatus === '2',
            //                     disabled:param.submitStatus=== '0'
            //                 }
            //                 ,slots:{
            //                     open:'有效',
            //                     close:'无效'
            //                 }
            //                 ,on: {
            //                     'on-change': (status) => {
            //                         if(status){
            //                             param.submitStatus= '2'
            //                         }else{
            //                             param.submitStatus= '1'
            //                         }
            //                         this.changesubmitStatus(param);
            //                     }
            //                 }
            //             }
            //             ,[
            //                 h('span',{props: {slot: 'open'}},'有效'),
            //                 h('span',{props: {slot: 'close'}},'无效')
            //             ]
            //         );
            // }
            // },
            // {
            // title: '操作',
            // key: 'submitStatus',
            // align: 'center',
            // render: (h, params) => {
            //     const param = params.row;
            //     return h("div", [
            //     h(
            //         "Button",
            //         {
            //         props: {
            //             type: "success",
            //             disabled:param.submitStatus=== '0'
            //         },
            //         style: {
            //             marginRight: "10px"
            //         },
            //         on: {
            //             click: () => {
            //                 param.activityId = this.activityId;
            //                 this.toDetail(param);
            //             }
            //         }
            //         },
            //         "详情"
            //     )
            //     ]);
            // }
            // }
        ],
        lowLevel:0,
        highLevel:0,
        relativelyLevel:0,
        veryLevel:0,
        resultData:[],
        activityId:3,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        oneComplate:false,
        fruit:[],
        fruits:[
            {label:'低风险',value:1},
            {label:'中等风险',value:2},
            {label:'中高风险',value:3},
            {label:'高风险',value:4},
        ]
    }
  },
  components: {},
  mounted() {
    let vm =this;
    // 0 未知类型 1 幼儿园 2小学 3初中 4高中 5大学
    let schoolId = sessionStorage.getItem('schoolId')
    this.schoolId = schoolId;
      /*根据学校类型选择对应的数据*/
    let schoolType = sessionStorage.getItem('schoolType')
    this.schoolType=schoolType || '';
    if (schoolType) {
      if ('0' == schoolType) {
        this.schoolGradeList = this.schoolGradeList
          .concat(this.primaryList)
          .concat(this.middleList)
          .concat(this.highList)
          .concat(this.collegeList)
      }
      if ('2' == schoolType) {
        this.schoolGradeList = this.schoolGradeList.concat(this.primaryList)
        this.schoolGradeList.unshift({grade:'999',label:'全部'})
      }
      if ('3' == schoolType) {
        this.schoolGradeList = this.schoolGradeList.concat(this.middleList)
        this.schoolGradeList.unshift({grade:'999',label:'全部'})
      }
      if ('4' == schoolType) {
        this.schoolGradeList = this.schoolGradeList.concat(this.highList)
        this.schoolGradeList.unshift({grade:'999',label:'全部'})
      }
    } else {
      this.schoolGradeList = this.schoolGradeList
        .concat(this.primaryList)
        .concat(this.middleList)
        .concat(this.highList)
        .concat(this.collegeList)
    }
    this.grade = '999';
    this.studentClass = '999';
    this.dangerLevel = '999';
    this.depressed = '999';
    this.life = '999';
    this.security = '999';
    this.setback = '999';
    /*获取上一个页面的选择内容做对应的渲染*/
    let  grade = sessionStorage.getItem('psychologicalAdministration-grade');
    let  activityId = sessionStorage.getItem('psychologicalAdministration-activityId');
    let  studentClass = sessionStorage.getItem('psychologicalAdministration-studentClass');
    let  registerCode = sessionStorage.getItem('psychologicalAdministration-registerCode');
    let  studentName = sessionStorage.getItem('psychologicalAdministration-studentName');
    let  pageNum = sessionStorage.getItem('psychologicalAdministration-pageNum');
    let  pageSize = sessionStorage.getItem('psychologicalAdministration-pageSize');
    let  dangerLevel = sessionStorage.getItem('psychologicalAdministration-dangerLevel');
    let  depressed = sessionStorage.getItem('psychologicalAdministration-depressed');
    let  life = sessionStorage.getItem('psychologicalAdministration-life');
    let  security = sessionStorage.getItem('psychologicalAdministration-security');
    let  setback = sessionStorage.getItem('psychologicalAdministration-setback');

    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = grade == '999'?'999':Number(grade);
    }
    if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
        vm.studentClass = studentClass == '999'?'999':Number(studentClass);
    }
    if(registerCode != null && registerCode != "" && registerCode != undefined ){
        vm.userInfo.registerCode = registerCode;
    }
    if(studentName != null && studentName != "" && studentName != undefined ){
        vm.userInfo.studentName = studentName;
    }
    if(pageNum != null && pageNum != "" && pageNum != undefined && pageNum > 0){
        vm.pageNum = Number(pageNum);
    }
    if(pageSize != null && pageSize != "" && pageSize != undefined && pageSize > 0){
        vm.pageSize = Number(pageSize);
    }
    if(dangerLevel != null && dangerLevel != "" && dangerLevel != undefined ){
        vm.dangerLevel = dangerLevel == '999'?'999':Number(dangerLevel);
    }
    if(depressed != null && depressed != "" && depressed != undefined ){
        vm.depressed = depressed == '999'?'999':Number(depressed);
    }
    if(life != null && life != "" && life != undefined ){
        vm.life = life == '999'?'999':Number(life);
    }
    if(security != null && security != "" && security != undefined ){
        vm.security = security == '999'?'999':Number(security);
    }
    if(setback != null && setback != "" && setback != undefined ){
        vm.setback = setback == '999'?'999':Number(setback);
    }
    if(activityId != null && activityId != "" && activityId != undefined ){
        vm.activityId = activityId;
    }
    if(this.$route.params.activityId){
        vm.activityId = this.$route.params.activityId;
    }
    if(this.$route.params.grade){
        vm.grade = this.$route.params.grade;
    }
    vm.querySchoolPsychologicalStudentList();
  },
  methods: {
    /*返回上级页面*/
    goBack() {
      this.$router.go(-1);
    },
    querySearch() {
        this.pageNum = 1;
        this.pageNo = 1;
        this.search();
    },
    search() {
        this.querySchoolPsychologicalStudentList();
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
    cancel(){this.oneComplate = false;},
    /*去详情*/
    toDetail(data){
        sessionStorage.setItem('psychologicalAdministration-grade',this.grade);
        sessionStorage.setItem('psychologicalAdministration-studentClass',this.studentClass);
        sessionStorage.setItem('psychologicalAdministration-registerCode',this.userInfo.registerCode);
        sessionStorage.setItem('psychologicalAdministration-studentName',this.userInfo.studentName);
        sessionStorage.setItem('psychologicalAdministration-pageNum',this.pageNum);
        sessionStorage.setItem('psychologicalAdministration-pageSize',this.pageSize);
        sessionStorage.setItem('psychologicalAdministration-dangerLevel',this.dangerLevel);
        sessionStorage.setItem('psychologicalAdministration-depressed',this.depressed);
        sessionStorage.setItem('psychologicalAdministration-life',this.life);
        sessionStorage.setItem('psychologicalAdministration-security',this.security);
        sessionStorage.setItem('psychologicalAdministration-setback',this.setback);
        sessionStorage.setItem('psychologicalAdministration-activityId',this.activityId);
        this.$router.push({ name: 'psychologicalAside',params:data})
    },
    /*单个学生推送*/
    changesubmitStatus(data){
        let vm=this;
        vm.loading = true
        this.$axios.get(`/v1/psychological/updateStudentPushStatus?activityId=${vm.activityId}&submitStatus=${data.submitStatus}&studentId=${data.studentId}`).then(res => {
        if (res.data.code == 10000) {
            vm.loading = false;
            vm.$Message.info('推送报告给家长完成');
            vm.querySearch()
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    /*获取心理测评学生列表*/
    querySchoolPsychologicalStudentList(){
        let vm=this;
        vm.loading = true
        let paramsData = {
            "activityId":  vm.activityId,
            "dangerLevel": vm.dangerLevel == '999'?'':vm.dangerLevel,
            "depressedWarning": vm.depressed == '999'?'':vm.depressed,
            "grade": vm.grade == '999'?'':vm.grade,
            "lifeWarning": vm.life == '999'?'':vm.life,
            "pageNo":  vm.pageNum,
            "pageSize": vm.pageSize,
            "pageStart": 0,
            "registerCode": vm.userInfo.registerCode,
            "safetyWarning": vm.security == '999'?'':vm.security,
            "schoolId": vm.schoolId,
            "setbackWarning": vm.setback == '999'?'':vm.setback,
            "studentClass": vm.studentClass == '999'?'':vm.studentClass,
            "studentName": vm.userInfo.studentName,
            "submitStatus": vm.submitStatus,
        }
        this.$axios.post("/v1/psychological/querySchoolPsychologicalStudentList",paramsData).then(res => {
        if (res.data.code == 10000) {
            vm.loading = false;
            vm.resultData =res.data.response;
            vm.querySchoolPsychologicalStudentListCount()
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    /*获取心理测评学生列表数量*/
    querySchoolPsychologicalStudentListCount(){
        let vm=this;
        vm.loading = true
        let paramsData = {
            "activityId": vm.activityId,
            "dangerLevel": vm.dangerLevel == '999'?'':vm.dangerLevel,
            "depressedWarning": vm.depressed == '999'?'':vm.depressed,
            "grade": vm.grade == '999'?'':vm.grade,
            "lifeWarning": vm.life == '999'?'':vm.life,
            "pageNo":  vm.pageNum,
            "pageSize": vm.pageSize,
            "pageStart": 0,
            "registerCode": vm.userInfo.registerCode,
            "safetyWarning": vm.security == '999'?'':vm.security,
            "schoolId": vm.schoolId,
            "setbackWarning": vm.setback == '999'?'':vm.setback,
            "studentClass": vm.studentClass == '999'?'':vm.studentClass,
            "studentName": vm.userInfo.studentName,
            "submitStatus": vm.submitStatus,
        }
        this.$axios.post("/v1/psychological/querySchoolPsychologicalStudentListCount",paramsData).then(res => {
        if (res.data.code == 10000) {
            vm.loading = false;
            vm.total =res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    /*一键推送报告给家长*/
    pushPsychologicalToPatriarch(){
        let vm=this;
        if(!vm.fruit || vm.fruit.length<1){
            vm.$Message.info('请选择推送项！');
            return
        }
        console.log(vm.fruit);
        for(let val of vm.fruit){
            if(val == '低风险'){vm.lowLevel = 1;}
            if(val == '中等风险'){vm.highLevel = 1;}
            if(val == '中高风险'){vm.relativelyLevel = 1;}
            if(val == '高风险'){vm.veryLevel = 1;}
        }
        for(let val of vm.fruit){
            if(val == '1'){vm.lowLevel = 1;}
            if(val == '2'){vm.highLevel = 1;}
            if(val == '3'){vm.relativelyLevel = 1;}
            if(val == '4'){vm.veryLevel = 1;}
        }
        this.$Message.loading({content: '推送中...',duration: 0})
        this.$axios.get(`/v1/psychological/pushPsychologicalToPatriarch?activityId=${vm.activityId}&lowLevel=${vm.lowLevel}&highLevel=${vm.highLevel}&relativelyLevel=${vm.relativelyLevel}&veryLevel=${vm.veryLevel}`).then(res => {
        if (res.data.code == 10000) {
            vm.oneComplate=false
            vm.$Message.destroy()
            vm.$Message.info('推送报告给家长完成');
            vm.oneComplate = false;
            vm.lowLevel = 0;
            vm.highLevel = 0;
            vm.relativelyLevel = 0;
            vm.veryLevel = 0;
            vm.fruit=[];
            vm.querySearch()
        } else {
            vm.oneComplate = false;
            vm.$Message.destroy()
          if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg);
          }
        }
      });
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
</style>
