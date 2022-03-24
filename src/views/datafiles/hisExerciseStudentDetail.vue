<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生锻炼视频详情</h2>
    </div>
    <div>
      <Card>
        <div class="top-search" @keydown.enter="queryStudentInfo">
          <div class="left-input">
            <div style="margin:5px 20px;">姓名：{{studentName}}</div>
            <div style="margin:5px 20px;">性别：{{gender == '1'?'男':'女'}}</div>
            <div style="margin:5px 20px;">
              <span>
                班级：{{studentClassName}}班
              </span>
            </div>
            <div style="margin:5px 20px;">学籍号：{{registerCode}}</div>
            <Button style="margin:5px 20px;" type="success"  @click="backBt">返回</Button>
            
          </div>
        </div>
      </Card>
      <br />
      <div>
        <Card>
          <div style="font-size:18px;height:40px;">数据明细</div>
          <Row>
            <div style>
              <Table
                border
                :loading="loading"
                max-height="600"
                :columns="resultColumns"
                :data="resultData"
              ></Table>
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
    <Modal
      v-model="showVideo"
      :title="videoStudentName"
      @on-ok="cancleShowVideo"
      @on-cancel="cancleShowVideo"
      :mask-closable="false"
      :loading="false"
      ok-text="关闭"
      cancel-text
      width="700px"
    >
      <div style="margin-top:10px;">
        <video
          :src="videoUrl"
          v-if="videoUrl!=''"
          style="width: 500px;height:300px"
          autoplay="true"
          controls="controls"
        />
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "schoolList",
  data() {
    return {
      startTimeCur: "",
      endTimeCur: "",
      exerciseTypeList: [],
      exerciseTypeId: "",
      loading: false,
      startTime: "",
      endTime: "",
      showVideo: false,
      videoUrl: "",
      videoStudentName: "",
      initPage: false,
      registerCode: "",
      studentName: "",
      studentId: "", 
      semesterOver: "",
      yearSemester: "",
      grade: "",
      gender: "",
      studentClassName: "",
      exType: "",
      primaryList: [
        {
          grade: "",
          label: "全部",
        },
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
          grade: "",
          label: "全部",
        },
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
          grade: "",
          label: "全部",
        },
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
      collegeList: [
        {
          grade: "",
          label: "全部",
        },
        {
          grade: 13,
          label: "大一",
        },
        {
          grade: 14,
          label: "大二",
        },
        {
          grade: 15,
          label: "大三",
        },
        {
          grade: 16,
          label: "大四",
        },
      ],
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: "",
          label: "全部",
        },
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
      resultColumns: [
        {
          title: "锻炼时间",
          key: "createTime",
          align: "center",
          width: 200,
        },
        {
          title: "锻炼计划名称",
          key: "planName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "类型",
          key: "itemOrientationName",
          align: "center",
          width: 150,
        },
        {
          title: "难度",
          key: "itemLevelName",
          align: "center",
          width: 150,
        },
        {
          title: "锻炼时长(分钟)",
          key: "runTime",
          align: "center",
          width: 170,
          render: (h, params) => {
            const row = params.row;
            let time = row.timeDuration == null ? 0 : row.timeDuration;
            const text = (time / 1000 / 60).toFixed(2);
            return h("div", text);
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled:
                      row.resultValue != null && row.resultValue != ""
                        ? false
                        : true,
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.toShowVideo(
                        row.resultValue,
                        row.studentName,
                        row.planName
                      );
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],

      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    backBt() {
      this.$router.go(-1);
    },
    startTimeChange(time) {
      this.startTime = time;
    },
    endTimeChange(time) {
      this.endTime = time;
    },

    getStudentRunList() {
      var vm = this;
      vm.loading = true;
      let data = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        studentId: vm.studentId,
        yearSemester:vm.yearSemester,
        semesterOver:vm.semesterOver
      };
      this.$axios
        .post("/v1/datafiles/queryHisSchoolStudentExerciseResult", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.resultData = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countStudentRun() {
      var vm = this;
      let data = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        studentId: vm.studentId,
        yearSemester:vm.yearSemester,
        semesterOver:vm.semesterOver
      };
      this.$axios
        .post(
          "/v1/datafiles/queryHisSchoolStudentExerciseResultCount",
          data
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.total = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    queryStudentInfo() {
      this.pageNum = 1;
      this.search();
    },
    search() {
      this.pageSize = this.pageSize == null ? 10 : this.pageSize;
      this.pageNum = this.pageNum == null ? 1 : this.pageNum;
      this.getStudentRunList();
      this.countStudentRun();
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
    toShowVideo(resultValueUrl, studentName, planName) {
      this.showVideo = true;
      this.videoUrl = resultValueUrl;
      this.videoStudentName = studentName + "--" + planName;
    },
    cancleShowVideo() {
      this.showVideo = false;
      this.videoUrl = "";
      this.videoStudentName = "";
    },
  },
  created() {
    // var myDate = new Date();
    // var milliseconds = myDate.getTime() - 1000 * 60 * 60 * 24 * 7;
    // var startDate = new Date(milliseconds);

    // this.startTime =
    //   startDate.getFullYear() +
    //   "-" +
    //   (startDate.getMonth() + 1 < 10
    //     ? "0" + (startDate.getMonth() + 1)
    //     : startDate.getMonth() + 1) +
    //   "-" +
    //   (startDate.getDate() < 10
    //     ? "0" + startDate.getDate()
    //     : startDate.getDate()) +
    //   " 00:00:00";

    // this.endTime =
    //   myDate.getFullYear() +
    //   "-" +
    //   (myDate.getMonth() + 1 < 10
    //     ? "0" + (myDate.getMonth() + 1)
    //     : myDate.getMonth() + 1) +
    //   "-" +
    //   (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()) +
    //   " 23:59:59";
  },
  watch: {},
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");
    // vm.startTime = sessionStorage.getItem(
    //   "studentExerciseHisDetailInfo-startTime"
    // );
    // vm.endTime = sessionStorage.getItem("studentExerciseHisDetailInfo-endTime");
    // vm.registerCode = sessionStorage.getItem(
    //   "studentExerciseHisDetailInfo-registerCode"
    // );
 
    // vm.gender = sessionStorage.getItem("studentExerciseHisDetailInfo-gender");
    vm.studentId = sessionStorage.getItem("hisExerciseStudentDetail-studentId");
    vm.studentName = sessionStorage.getItem("hisExerciseStudentDetail-studentName");
    vm.semesterOver = sessionStorage.getItem("hisExerciseStudentDetail-semesterOver");
    vm.yearSemester = sessionStorage.getItem("hisExerciseStudentDetail-yearSemester");
    vm.registerCode = sessionStorage.getItem("hisExerciseStudentDetail-registerCode");
    vm.studentClassName = sessionStorage.getItem("hisExerciseStudentDetail-studentClass");
    vm.gender = sessionStorage.getItem("hisExerciseStudentDetail-gender");
    vm.schoolType = schoolType;
    // if ("2" == schoolType) {
    //   vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
    // }
    // if ("3" == schoolType) {
    //   vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
    // }
    // if ("4" == schoolType) {
    //   vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
    // }
    this.initPage = true;
    this.showVideo = false;
    this.pageSize = this.pageSize == null ? 10 : this.pageSize;
    this.pageNum = this.pageNum == null ? 1 : this.pageNum;
    this.search();
  },
};
</script>
