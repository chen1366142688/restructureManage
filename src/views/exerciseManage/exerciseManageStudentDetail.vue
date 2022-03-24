<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}-{{registerCode}}</h2>
    </div>
    <div>
      <Tabs type="card">
        <TabPane name="operator" label="完成情况">
          <div>
           <Card>
            <div class="top-search">
                <div class="left-input">
                    <div style="margin:5px 20px;">
                        <span>开始日期：</span>
                        <DatePicker :value="startTime" @on-change="startTimeChange" :clearable="true" format="yyyy-MM-dd" type="datetime" placeholder="起始时间" style="width: 120px" on-clear="dateClear"></DatePicker>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>截止日期：</span>
                        <DatePicker :value="endTime" @on-change="endTimeChange" :clearable="true" format="yyyy-MM-dd" type="datetime" placeholder="截止时间" style="width: 120px" on-clear="dateClear"></DatePicker>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>完成状态：</span>
                        <Select v-model="completeStatus"  style="width:120px;">
                            <Option
                            v-for="item in completeStatusList"
                            :value="item.itemId"
                            :key="item.itemId"
                            >{{ item.itemName }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" @click="querySearch()">查询</Button>
                    <Button type="success" @click="goback()">返回</Button>
               </div>
            </div>
          </Card>
          <br/>
          <h4>线下完成</h4>
          <Card>
            <span>线下完成{{offLineCount || 0}}次</span>
          </Card>
          <br/>
          <h4>线上完成</h4>
          <Card>
              <Table border max-height="580"  :loading="loading" :columns="resultColumns" :data="resultData"></Table>
              <Row type="flex" justify="end" align="middle" style="margin-top:20px">
                <Page
                  :total="total"
                  :current="pageNum"
                  :page-size="pageSize"
                  @on-change="pageNumChange"
                  @on-page-size-change="pageSizechange"
                  show-total
                  show-sizer
                ></Page>
              </Row>
          </Card>
          </div>
        </TabPane>
        <TabPane name="group" label="锻炼记录">
          <div>
            <Card>
              <div class="top-search">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>开始日期：</span>
                            <DatePicker :value="startTime1" @on-change="startTimeChange1" :clearable="true" format="yyyy-MM-dd" type="datetime" placeholder="起始时间" style="width: 120px" on-clear="dateClear"></DatePicker>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>截止日期：</span>
                            <DatePicker :value="endTime1" @on-change="endTimeChange1" :clearable="true" format="yyyy-MM-dd" type="datetime" placeholder="截止时间" style="width: 120px" on-clear="dateClear"></DatePicker>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>是否上传视频：</span>
                            <Select v-model="upLoadVideo"  style="width:120px;">
                            <Option
                                v-for="item in upLoadVideoList"
                                :value="item.itemId"
                                :key="item.itemId"
                            >{{ item.itemName }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="right-btns">
                        <Button @click="querySearch1()" type="success">查询</Button>
                        <Button @click="goback()" type="success">返回</Button>
                    </div>
              </div>
            </Card>
            <br>
            <Row>
              <div style>
                <Table border max-height="600" :loading="loading" :columns="resultColumnsj" :data="resultDatasj"></Table>
              </div>
              <br />
              <div style="float: right;">
                <Page
                  :total="total1"
                  :current="pageNum1"
                  :page-size="pageSize1"
                  @on-change="pageNumChange1"
                  @on-page-size-change="pageSizechange1"
                  show-total
                  show-sizer
                ></Page>
              </div>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <Modal
            v-model="showVideo1"
            :title="videoName"
            @on-ok="cancleShowVideo1"
            @on-cancel="cancleShowVideo1"
            :mask-closable="false"
            :loading="false"
            ok-text="关闭"
            cancel-text=""
            width="1200px"
    >
      <div>
      <div style="margin-top:10px;display: inline-block" v-for="(item,key) in videoUrlList">
        <div style="margin-top: 20px">{{curTime}}</div>
        <video :src="item" v-if="item!=''" style="width: 500px;height:300px; margin-left: 20px;margin-top: 20px" :autoplay="isAuto" controls="controls" />
      </div>
      </div>
    </Modal>
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
import api from '@/api/exerciseManage';
import Mixins from './mixins.js'
export default {
  name: "studentExercise",
  mixins: [ Mixins ],
  data() {
    return {
      videoName: '',
      curTime: '',
      isAuto: false,
      loading: false,
      schoolId: "",
      schoolType: "",
      registerCode: "",
      studentName: "",
      studentId:"",
      showVideo:false,
      videoUrl:"",
      showVideo1:false,
      videoUrlList:"",
      videoStudentName:"",
      nowDay:"",
      resultColumns:[],
      resultColumnsj: [
        {
          title: '锻炼计划名称',
          key: 'planName',
          align: 'center',
          minWidth:100
        },
        {
          title: '类型',
          key: 'itemOrientationName',
          align: 'center',
          minWidth:100,
        },
        {
          title: '难度',
          key: 'itemLevelName',
          align: 'center',
          minWidth:100,
        },
        {
          title: '锻炼时长(分钟)',
          key: 'runTime',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            let time = row.timeDuration==null?0:row.timeDuration;
            const text = (time/1000/60).toFixed(1);
            return h('div', text)
          },
        },
        {
          title: '是否上传视频',
          key: 'resultValue',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.resultValue != null && row.resultValue !=""?"是":"否";
            return h('div', text)
          },
        },
        {
          title: '锻炼时间',
          key: 'createTime',
          align: 'center',
          minWidth:100,
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
                    disabled: row.resultValue != null && row.resultValue != ""  ?false:true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toShowVideo(row.resultValue,row.studentName,row.planName)
                    }
                  }
                },
                '查看视频'
              )
            ])
          }
        },
      ],
      resultData: [],
      resultDatasj: [],
      holiday: "",
      holidayTf: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum1: 1,
      pageSize1: 10,
      total1: 0,
      startTime:"",
      endTime:"",
      startTime1:"",
      endTime1:"",
      completeStatus:"",
      semesterOver:"",
      yearSemester:"",
      completeStatusList:[
        {
          itemId:"",
          itemName:"全部",
        },
        {
          itemId:"1",
          itemName:"已完成",
        },
        {
          itemId:"0",
          itemName:"未完成",
        }
      ],
      upLoadVideo:"",
      upLoadVideoList:[
        {
          itemId:"",
          itemName:"全部",
        },
        {
          itemId:"1",
          itemName:"是",
        },
        {
          itemId:"0",
          itemName:"否",
        }
      ],
      offLineCount:0,//现在完成次数
    };
  },
  methods: {
    //获取线下完成次数
    async getOfflineCount () {
      let params = {
        semesterOver: sessionStorage.getItem('semesterOver'),//是否假期
        yearSemester: sessionStorage.getItem('yearSemester'),//学期
        studentId: this.studentId
      }
      let res = await api.getStudentExercise(params)
      if(res.data.code === 10000 ) {
        this.offLineCount = res.data.response.teacherCount
      }
    },
    toshowVideo1(videoUrlList,dayTime,planName){
      this.showVideo1 = true;
      this.videoUrlList= videoUrlList.split(',');
      // this.videoUrlList= [1]
      if(videoUrlList.length == 1){
        this.isAuto = true
        };
      this.videoName = planName;
      this.curTime = dayTime.substring(0,10);
    },
     startTimeChange(time){
        this.startTime = time;
     },
     endTimeChange(time){
        this.endTime = time;
     },
     startTimeChange1(time){
        this.startTime1 = time;
     },
     endTimeChange1(time){
        this.endTime1 = time;
     },
     goback(){ //返回
        this.$router.go(-1);
     },
    getStudentInfoList() {
      var vm = this;
      vm.loading = true;
      let data = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        studentId: vm.studentId,
        completeStatus:vm.completeStatus,
        startTime:vm.startTime,
        endTime:(vm.endTime==""||vm.endTime==null)?"":vm.endTime+' 23:29:25',
        semesterOver:vm.semesterOver,
        yearSemester:vm.yearSemester,
      };
      this.$axios
        .post("/v1/familyexerciseanalyze/queryStudentExerciseByDateAndStudent", data)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let resultList = res.data.response;
            let maxCount = 0;
            var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
            if(resultList != null && resultList.length > 0){
                for(let i=0;i<resultList.length;i++){
                    if(resultList[i].planCount > maxCount){
                        maxCount = resultList[i].planCount;
                    }
                    if(resultList[i].dayTime == vm.nowDay){
                       resultList[i].dayTime = resultList[i].dayTime+"</br><font style='color:#00BA8A'>今天</font>"
                    }else{
                      var week = weekArray[new Date(resultList[i].dayTime).getDay()];
                      resultList[i].dayTime = resultList[i].dayTime+"</br>星期"+week
                    }
                     let overPlanCount = 0 ;
                     if(resultList[i].allTimeDuration1){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration2){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration3){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration4){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration5){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration6){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration7){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration8){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration9){overPlanCount = overPlanCount +1;}
                     if(resultList[i].allTimeDuration10){overPlanCount = overPlanCount +1;}
                     if(resultList[i].completeStatus == '1'){
                       if(resultList[i].exerciseType=='1' && resultList[i].completeType=='1'){
                         resultList[i].overPlan='已完成</br>'+resultList[i].planCount+'个计划全部完成'
                       }else{
                        resultList[i].overPlan='已完成</br>'
                       }
                     }else{
                       if(resultList[i].exerciseType=='1' && resultList[i].completeType=='1'){
                          resultList[i].overPlan="<font style='color:#00BA8A'>未完成</font></br>有<font style='color:#00BA8A' >"+(resultList[i].planCount-overPlanCount)+"</font>个计划未完成"
                       }else{
                        resultList[i].overPlan="<font style='color:#00BA8A'>未完成</font></br>"
                       }
                     }
                }
            }
            vm.resultColumns = vm.structureColumn(maxCount);
            vm.resultData = resultList;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
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
    },
    cancleShowVideo1(){
        this.showVideo1 = false;
        this.videoUrlList = [];
    },
    getShowString(planName,allTimeDuration,videoCount){
        if(planName == "" || planName == null){
          return "";
        }
        let video = "未上传";
        let flishInfo="<font style='color:#00C693;' >未完成作业</font>"
        if(videoCount > 0){
            video = "已经上传";
        }
        if(planName != "" && planName != null && allTimeDuration !=null && allTimeDuration > 0 ){
            let duration = allTimeDuration/1000/60;
            if(videoCount == 0){
              flishInfo="<font>"+"已完成&nbsp;&nbsp;&nbsp;"+"无视频</font>"
            }else {
              flishInfo="<Button style='color:#00C693;' @click='showVideo1()'  type='success'>查看视频</Button>"
            }
            // flishInfo="<font>"+duration.toFixed(2)+"分钟&nbsp;&nbsp;&nbsp;"+videoCount+"个视频</font>"
        }

        return  "<div style='margin-top:8px;margin-bottom:5px;width:175px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;' >"+planName+"</div>"+
              "<div style='margin-bottom:8px;width:175px;'>"+flishInfo+"</div>";
    },
    countStudentList(schoolId) {
      var vm = this;
      let data = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        studentId: vm.studentId,
        completeStatus:vm.completeStatus,
        startTime:vm.startTime,
        endTime:(vm.endTime==""||vm.endTime==null)?"":vm.endTime+' 23:29:25',
        semesterOver:vm.semesterOver,
        yearSemester:vm.semesterOver
      };
      this.$axios
        .post("/v1/familyexerciseanalyze/queryStudentExerciseByDateAndStudentCount", data)
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
    getStudentInfoListHoliday(schoolId) {
      var vm = this
      vm.loading=true;
      let date={
        pageNo: vm.pageNum1,
        pageSize: vm.pageSize1,
        dateStart:vm.startTime1,
        dateEnd: (vm.endTime1=="" || vm.endTime1==null)?"":vm.endTime1+' 23:29:25',
        studentId:vm.studentId,
        upLoadVideo:vm.upLoadVideo,
        semesterOver:vm.semesterOver,
        yearSemester:vm.semesterOver
      }
      this.$axios.post('/v1/exercise/family/querySchoolStudentExerciseResultHis',date).then(res => {
        vm.loading=false;
        if (res.data.code == 10000) {
          vm.resultDatasj = res.data.response
        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    countStudentListHoliday(schoolId) {
      var vm = this;
      let date={
        pageNo: vm.pageNum1,
        pageSize: vm.pageSize1,
        dateStart:vm.startTime1,
        dateEnd: (vm.endTime1=="" || vm.endTime1==null)?"":vm.endTime1+' 23:29:25',
        studentId:vm.studentId,
        upLoadVideo:vm.upLoadVideo,
        semesterOver:vm.semesterOver,
        yearSemester:vm.semesterOver
      }
      this.$axios.post('/v1/exercise/family/querySchoolStudentExerciseResultHisCount',date).then(res => {
        if (res.data.code == 10000) {
          this.total1 = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    querySearch() {
      this.pageNum = 1;
      this.search();
    },
    querySearch1() {
      this.pageNum1 = 1;
      this.search1();
    },
    search() {
      var vm = this;
      let schoolId = vm.schoolId;
      vm.getStudentInfoList(schoolId);
      vm.countStudentList(schoolId);
    },
     search1() {
      var vm = this;
      let schoolId = vm.schoolId;
      vm.getStudentInfoListHoliday(schoolId);
      vm.countStudentListHoliday(schoolId);
      this.getOfflineCount()
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
        this.pageNum = 1;
        this.pageSize = value;
        this.search();
      }
    },
    pageNumChange1(value) {
      //页码改变方法处理
      if (this.pageNum1 != value) {
        this.pageNum1 = value;
        this.search1();
      }
    },
    pageSizechange1(value) {
      //页面大小改变方法处理
      if (this.pageSize1 != value) {
        this.pageNum1 = 1;
        this.pageSize1 = value;
        this.search1();
      }
    }
  },
  mounted() {
    //schoolType 0 未知类型 1 幼儿园 2小学 3初中 4高中 5大学
    var vm = this;
    vm.resultColumns = vm.structureColumn(1);
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.schoolType = schoolType;
    vm.studentId =  sessionStorage.getItem('exerciseManageStudent-exerciseManageStudentDetail-studentId');
    vm.studentName =  sessionStorage.getItem('exerciseManageStudent-exerciseManageStudentDetail-studentName');
    vm.registerCode =  sessionStorage.getItem('exerciseManageStudent-exerciseManageStudentDetail-registerCode');

    vm.yearSemester =  sessionStorage.getItem('exerciseManageStudent-exerciseManageStudentDetail-yearSemester');
    vm.semesterOver =  sessionStorage.getItem('exerciseManageStudent-exerciseManageStudentDetail-semesterOver');

    let date=new Date;
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
    vm.nowDay = nowDay;
    vm.search();
    vm.search1();
  }
};
</script>
