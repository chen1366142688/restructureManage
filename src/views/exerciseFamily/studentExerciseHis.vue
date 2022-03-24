<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">锻炼记录监控</h2>
    </div>
    <div>
      <Card>
        <div  class="top-search" @keydown.enter="queryStudentInfo">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>开始时间：</span>
                    <DatePicker  :value="startTime" @on-change="startTimeChange" :clearable="true" format="yyyy-MM-dd" type="datetime" placeholder="起始时间" style="width: 120px" on-clear="dateClear"></DatePicker>
                </div>
                <div style="margin:5px 20px;">
                    <span>截止时间：</span>
                    <DatePicker  :value="endTime" @on-change="endTimeChange" :clearable="true" format="yyyy-MM-dd" type="datetime" placeholder="截止时间" style="width: 120px" on-clear="dateClear"></DatePicker>
                </div>
                <div style="margin:5px 20px;">
                    <span>学生姓名：</span>
                    <Input  style="width:120px;" v-model="studentName" :maxlength="20"/>
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号<span style="visibility:hidden">占</span>：</span>
                    <Input  style="width:120px;" v-model="registerCode" :maxlength="20"/>
                </div>
                <div style="margin:5px 20px;">
                    <span>年<span style="visibility:hidden">班级</span>级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班<span style="visibility:hidden">班级</span>级：</span>
                    <Select v-model="studentClass"  style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>锻炼类型：</span>
                    <Select v-model="exerciseTypeId"  style="width:120px;">
                        <Option
                                v-for="item in exerciseTypeList"
                                :value="item.itemId"
                                :key="item.itemId"
                        >{{ item.itemName }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button @click="queryStudentInfo()"  type="success">查询</Button>
            </div>
        </div>
      </Card>
      <br>
      <div>
       <Card>
        <div style="font-size:18px;height:40px;">
            数据明细
        </div>
        <Row>
          <div style="">
            <Table border :loading="loading" max-height="600"  :columns="resultColumns" :data="resultData"></Table>
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
      v-model="showVideo"
      :title="videoStudentName"
      @on-ok="cancleShowVideo"
      @on-cancel="cancleShowVideo"
      :mask-closable="false"
      :loading="false"
      ok-text="关闭"
      cancel-text=""
      width="700px"
    >
      <div style="margin-top:10px;">
        <video :src="videoUrl" v-if="videoUrl!=''" style="width: 500px;height:300px" autoplay="true" controls="controls" />
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'schoolList',
  data() {
    return {
        exerciseTypeList: [],
        exerciseTypeId: null,
      loading:false,
      startTime:"",
      endTime:"",
      showVideo:false,
      videoUrl:"",
      videoStudentName:"",
      initPage:false,
      registerCode: '',
      studentName:"",
      grade:'',
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
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: "",
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
      // resultColumns: [
      //   {
      //     title: '学生姓名',
      //     key: 'studentName',
      //     align: 'center',
      //     width: 120
      //   },
      //   {
      //     title: '学籍号',
      //     key: 'registerCode',
      //     align: 'center',
      //     width: 120
      //   },
      //   {
      //     title: "班级",
      //     key: "grade",
      //     align: "center",
      //     width:120,
      //     render: (h, params) => {
      //       const row = params.row;
      //       const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
      //       return h("span", text+row.studentClass+"班");
      //     }
      //   },
      //   {
      //     title: '锻炼计划名称',
      //     key: 'planName',
      //     align: 'center'
      //   },
      //   {
      //     title: '类型',
      //     key: 'itemOrientationName',
      //     align: 'center',
      //     width: 100
      //   },
      //   {
      //     title: '难度',
      //     key: 'itemLevelName',
      //     align: 'center',
      //     width: 100
      //   },
      //   {
      //     title: '锻炼时长(分钟)',
      //     key: 'runTime',
      //     align: 'center',
      //     width: 120,
      //     render: (h, params) => {
      //       const row = params.row
      //       let time = row.timeDuration==null?0:row.timeDuration;
      //       const text = (time/1000/60).toFixed(2);
      //       return h('div', text)
      //     },
      //   },
      //   {
      //     title: '是否上传视频',
      //     key: 'resultValue',
      //     align: 'center',
      //     render: (h, params) => {
      //       const row = params.row
      //       const text = row.resultValue != null && row.resultValue !=""?"是":"否";
      //       return h('div', text)
      //     },
      //     width: 120
      //   },
      //   {
      //     title: '锻炼时间',
      //     key: 'createTime',
      //     align: 'center',
      //     width: 200
      //   },
      //   {
      //     title: '操作',
      //     key: 'action',
      //     align: 'center',
      //     width: 120,
      //     render: (h, params) => {
      //      const row = params.row
      //       return h('div', [
      //         h(
      //           'Button',
      //           {
      //             props: {
      //               type: 'success',
      //               disabled: row.resultValue != null && row.resultValue != ""  ?false:true
      //             },
      //             style: {
      //               marginRight: '5px'
      //             },
      //             on: {
      //               click: () => {
      //                 this.toShowVideo(row.resultValue,row.studentName,row.planName)
      //               }
      //             }
      //           },
      //           '查看视频'
      //         )
      //       ])
      //     }
      //   },
      // ],
        resultColumns: [
          {
            title: '学生姓名',
            key: 'studentName',
            align: 'center',
            minWidth:100
          },
          {
            title: '学籍号',
            key: 'registerCode',
            align: 'center',
            minWidth:100
          },
          {
            title: "班级",
            key: "grade",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
              return h("span", text+row.studentClass+"班");
            }
          },
          // {
          //   title: '锻炼计划名称',
          //   key: 'planName',
          //   align: 'center'
          // },
          {
            title: '锻炼类型',
            key: 'totalName',
            align: 'center',
            minWidth:100
          },
          // {
          //   title: '锻炼时长(分钟)',
          //   key: 'itemLevelName',
          //   align: 'center',
          //   width: 100
          // },
          {
            title: '锻炼时长(分钟)',
            key: 'totalTime',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
              const row = params.row
              let time = row.totalTime==null?0:row.totalTime;
              const text = (time/1000/60).toFixed(2);
              return h('div', text)
            },
          },
          {
            title: '视频数量',
            key: 'videoNum',
            align: 'center',
            render: (h, params) => {
              const row = params.row
              const text = row.videoNum != null ?row.videoNum:0;
              return h('div', text)
            },
            minWidth:100
          },
          {
            title: '最新锻炼时间',
            key: 'createTime',
            align: 'center',
            minWidth:100
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
             const row = params.row
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        // this.toShowVideo(row.resultValue,row.studentName,row.planName)
                        this.toDetail(row.registerCode,row.studentName,row.grade,row.studentClass,row.gender)
                      }
                    }
                  },
                  '详情'
                )
              ])
            }
          },
        ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
      toDetail(registerCode,studentName,grade,studentClass,gender){
          var vm = this;
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-startTime",
              vm.startTime
          );
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-endTime",
              vm.endTime
          );
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-registerCode",
              registerCode
          );

          // sessionStorage.setItem(
          //     "studentExerciseHisDetail-startTime",
          //     vm.startTime
          // );
          // sessionStorage.setItem(
          //     "studentExerciseHisDetail-endTime",
          //     vm.endTime
          // );
          // sessionStorage.setItem(
          //     "studentExerciseHisDetail-registerCode",
          //     vm.registerCode
          // );
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-gender",
              gender
          );
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-name",
              studentName
          );
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-grade",
              grade
          );
          sessionStorage.setItem(
              "studentExerciseHisDetailInfo-classNum",
              studentClass
          );
          sessionStorage.setItem("studentExerciseHisDetailInfo-exerciseTypeId",vm.exerciseTypeId);

          this.$router.push({ name: "studentExerciseHisDetail" });
      },
     startTimeChange(time){
        this.startTime = time;
     },
     endTimeChange(time){
        this.endTime = time;
     },
      getExerciseTypeList() {
          var vm = this

          vm.exerciseTypeList.push({itemId: 0, itemName: "全部"})
          this.$axios.get('/v1/exercise/family/getExerciseTypeList',null).then(res => {
              if (res.data.code == 10000) {
                  for (let i = 0; i < res.data.response.length; i++) {
                      vm.exerciseTypeList.push(res.data.response[i])
                  }
              } else {
                  if (res.data.code > 39999) {
                      vm.$Message.info(res.data.msg)
                  }
              }
          })
      },
    getStudentRunList() {
      var vm = this
      vm.loading=true;
      let date={
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        dateStart:this.startTime,
        dateEnd:this.endTime==""?"":this.endTime,
        studentName:this.studentName,
        registerCode:this.registerCode,
        gradeId:this.grade == 0?null:this.grade,
        studentClass:this.studentClass == 0 ?null:this.studentClass,
        exerciseTypeId:this.exerciseTypeId== 0 ?null:this.exerciseTypeId
      }
      this.$axios.post('/v1/exercise/family/querySchoolStudentExerciseInfoHis',date).then(res => {
        vm.loading=false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response
        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    countStudentRun() {
      var vm = this;
      let date={
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        dateStart:this.startTime,
        dateEnd:this.endTime==""?"":this.endTime,
        studentName:this.studentName,
        registerCode:this.registerCode,
          gradeId:this.grade == 0?null:this.grade,
          studentClass:this.studentClass == 0 ?null:this.studentClass,
          exerciseTypeId:this.exerciseTypeId== 0 ?null:this.exerciseTypeId
      }
      this.$axios.post('/v1/exercise/family/querySchoolStudentExerciseInfoHisCount',date).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    queryStudentInfo() {
        var vm=this;
        sessionStorage.setItem(
            "studentExerciseHisDetail-startTime",
            vm.startTime
        );
        sessionStorage.setItem(
            "studentExerciseHisDetail-endTime",
            vm.endTime
        );
        sessionStorage.setItem(
            "studentExerciseHisDetail-registerCode1",
            vm.registerCode
        );
        sessionStorage.setItem(
            "studentExerciseHisDetail-name",
            vm.studentName
        );
        sessionStorage.setItem(
            "studentExerciseHisDetail-grade",
            vm.grade
        );
        sessionStorage.setItem(
            "studentExerciseHisDetail-classNum",
            vm.studentClass
        );
        sessionStorage.setItem(
            "studentExerciseHisDetail-exerciseTypeId",
            vm.exerciseTypeId
        );

        this.pageNum = 1;
      this.search();
    },
    search() {
      this.pageSize = this.pageSize==null?10:this.pageSize;
      this.pageNum = this.pageNum==null?1:this.pageNum;
      this.getStudentRunList()
      this.countStudentRun()
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNum = 1;
        this.search()
      }
    },
    toShowVideo(resultValueUrl,studentName,planName){
        this.showVideo = true;
        this.videoUrl= resultValueUrl;
        this.videoStudentName=studentName+"--"+planName;
    },
    cancleShowVideo(){
        this.showVideo = false;
        this.videoUrl= "";
        this.videoStudentName= "";
    }
  },
  created() {
        var myDate = new Date();
        // var milliseconds=myDate.getTime()-1000*60*60*24*7;
        var milliseconds=myDate.getTime()-1000*60*60*24*1;
        var startDate= new Date(milliseconds);

        // this.startTime = startDate.getFullYear() + "-"
        // +((startDate.getMonth()+1)<10 ?'0'+(startDate.getMonth()+1):(startDate.getMonth()+1))
        // + "-"
        // +(startDate.getDate()<10 ?'0'+startDate.getDate():startDate.getDate())
        // + " 00:00:00" ;

        this.endTime = myDate.getFullYear() + "-"
        +((myDate.getMonth()+1)<10 ?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1))
        + "-"
        +(myDate.getDate()<10 ?'0'+myDate.getDate():myDate.getDate())
        + " 23:59:59"
  },
  watch: {
  },
  mounted() {
    var vm=this;
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
      this.initPage = true;
      this.showVideo = false;
      this.runStatus = this.runStatus==null?"":this.runStatus;
      this.runDistance = this.runDistance==null?"":this.runDistance;
      this.pageSize = this.pageSize==null?10:this.pageSize;
      this.pageNum = this.pageNum==null?1:this.pageNum;

      vm.getExerciseTypeList();

      let startTime = sessionStorage.getItem("studentExerciseHisDetail-startTime")==null?"":sessionStorage.getItem("studentExerciseHisDetail-startTime");
      let endTime = sessionStorage.getItem("studentExerciseHisDetail-endTime")==null?"":sessionStorage.getItem("studentExerciseHisDetail-endTime");
      vm.registerCode = sessionStorage.getItem("studentExerciseHisDetail-registerCode1")==null?"":sessionStorage.getItem("studentExerciseHisDetail-registerCode1");
      vm.studentName = sessionStorage.getItem("studentExerciseHisDetail-name")==null?"":sessionStorage.getItem("studentExerciseHisDetail-name");
      vm.grade = sessionStorage.getItem("studentExerciseHisDetail-grade")==null?"":Number(sessionStorage.getItem("studentExerciseHisDetail-grade"));
      vm.studentClass = sessionStorage.getItem("studentExerciseHisDetail-classNum")==null?"":Number(sessionStorage.getItem("studentExerciseHisDetail-classNum"));
      vm.exerciseTypeId = sessionStorage.getItem("studentExerciseHisDetail-exerciseTypeId")==null?"":Number(sessionStorage.getItem("studentExerciseHisDetail-exerciseTypeId"));
      if(startTime!=null&&startTime!=''){
          vm.startTime = startTime;
          vm.endTime = endTime;
      }
      this.search();
  }
}
</script>
