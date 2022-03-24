<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}</h2>
    </div>
    <div>
      <Card>
        <div class="top-search" @keydown.enter="queryStudentInfo">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>
                班级：{{grade == "1"
                ?'一年级':grade == "2"
                ?'二年级':grade == "3"
                ?'三年级':grade == "4"
                ?'四年级':grade == "5"
                ?'五年级':grade == "6"
                ?'六年级':grade == "7"
                ?'七年级':grade == "8"
                ?'八年级':grade == "9"
                ?'九年级':grade == "10"
                ?'高一':grade == "11"
                ?'高二':grade == "12"
                ?'高三':''}}{{studentClass}}班
              </span>
            </div>
            <div style="margin:5px 20px;">学籍号：{{registerCode}}</div>
            <div style="margin:5px 20px;">性别：{{gender == '1'?'男':'女'}}</div>
            <div style="margin:5px 20px;">时间：{{startTimeCur}} ~ {{endTimeCur}}</div>
            <div style="margin:5px 20px;">
              <span>锻炼类型：</span>
              <Select v-model="exerciseTypeId" style="width:120px;">
                <Option
                  v-for="item in exerciseTypeList"
                  :value="item.itemId"
                  :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button @click="queryStudentInfo()" type="success">查询</Button>
            <Button @click="backBt()" type="success">返回</Button>
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
      @on-ok="submitComment"
      @on-cancel="cancleShowVideo"
      :mask-closable="false"
      :loading="true"
      ok-text="提交"
      cancel-text="关闭"
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
        <div>
          <div style="width:76px;font-size:16px;margin-top:16px;">教师评语</div>
           <Input v-model="comment" type="textarea" :rows="4" :maxlength="50" style="margin-top:10px;"/>
           <div style="width:100%;text-align:right;position:relative;top:-20px;right:10px;">{{comment.length}}/50</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "schoolList",
  data() {
    return {
      comment: '',
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
      grade: "",
      gender: "",
      studentClass: "",
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
        // {
        //   title: '学生姓名',
        //   key: 'studentName',
        //   align: 'center',
        //   width: 120
        // },
        // {
        //   title: '学籍号',
        //   key: 'registerCode',
        //   align: 'center',
        //   width: 120
        // },
        // {
        //   title: "班级",
        //   key: "grade",
        //   align: "center",
        //   width:120,
        //   render: (h, params) => {
        //     const row = params.row;
        //     const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
        //     return h("span", text+row.studentClass+"班");
        //   }
        // },
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
          title: "是否上传视频",
          key: "resultValue",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text =
              row.resultValue != null && row.resultValue != "" ? "是" : "否";
            return h("div", text);
          },
          width: 150,
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
                      this.toShowVideo(row);
                    },
                  },
                },
                "查看视频"
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
    // 提交教师评论
    submitComment() {
      console.log('提交评论');
      const params = {
        comment: this.comment,
        exerciseResultId: this.exerciseResultId
      }
      this.$axios.post("/v1/exercise/family/saveStudentExerciseResultComment", params).then((res) => {
        if (res.data.code === 10000) {
          this.$Message.success('提交成功')
          this.exerciseResultId = ''
          this.showVideo = false;
          this.comment = ''
          this.getStudentRunList()
        }
      });
    },
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
      let date = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        dateStart: this.startTime,
        dateEnd: this.endTime == "" ? "" : this.endTime + " 23:59:59",
        studentName: this.studentName,
        registerCode: this.registerCode,
        gradeId: this.grade,
        studentClass: this.studentClass,
        exerciseTypeId: this.exerciseTypeId,
      };
      this.$axios
        .post("/v1/exercise/family/querySchoolStudentExerciseResultHis", date)
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
    getExerciseTypeList() {
      var vm = this;
      vm.exerciseTypeList.push({ itemId: 0, itemName: "全部" });
      this.$axios
        .get("/v1/exercise/family/getExerciseTypeList", null)
        .then((res) => {
          if (res.data.code == 10000) {
            for (let i = 0; i < res.data.response.length; i++) {
              vm.exerciseTypeList.push(res.data.response[i]);
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countStudentRun() {
      var vm = this;
      let date = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        dateStart: this.startTime,
        dateEnd: this.endTime == "" ? "" : this.endTime + " 23:59:59",
        studentName: this.studentName,
        registerCode: this.registerCode,
        gradeId: this.grade,
        studentClass: this.studentClass,
        exerciseTypeId: this.exerciseTypeId,
      };
      this.$axios
        .post(
          "/v1/exercise/family/querySchoolStudentExerciseResultHisCount",
          date
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
    toShowVideo(item) {
      const {resultValue, studentName, planName, exerciseResultId, comment} = item
      this.showVideo = true;
      this.videoUrl = resultValue;
      this.videoStudentName = studentName + "--" + planName;
      this.exerciseResultId = exerciseResultId
      this.comment = comment
      if(comment == null){
        this.comment = ''
      }
    },
    cancleShowVideo() {
      this.showVideo = false;
      this.videoUrl = "";
      this.videoStudentName = "";
      this.exerciseResultId = ''
    },
  },
  created() {
    var myDate = new Date();
    var milliseconds = myDate.getTime() - 1000 * 60 * 60 * 24 * 7;
    var startDate = new Date(milliseconds);

    this.startTime =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1 < 10
        ? "0" + (startDate.getMonth() + 1)
        : startDate.getMonth() + 1) +
      "-" +
      (startDate.getDate() < 10
        ? "0" + startDate.getDate()
        : startDate.getDate()) +
      " 00:00:00";

    this.endTime =
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1 < 10
        ? "0" + (myDate.getMonth() + 1)
        : myDate.getMonth() + 1) +
      "-" +
      (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()) +
      " 23:59:59";
  },
  watch: {},
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.startTime = sessionStorage.getItem(
      "studentExerciseHisDetailInfo-startTime"
    );
    vm.endTime = sessionStorage.getItem("studentExerciseHisDetailInfo-endTime");
    vm.registerCode = sessionStorage.getItem(
      "studentExerciseHisDetailInfo-registerCode"
    );

    vm.gender = sessionStorage.getItem("studentExerciseHisDetailInfo-gender");
    vm.studentName = sessionStorage.getItem(
      "studentExerciseHisDetailInfo-name"
    );
    vm.grade = sessionStorage.getItem("studentExerciseHisDetailInfo-grade");
    vm.studentClass = sessionStorage.getItem(
      "studentExerciseHisDetailInfo-classNum"
    );
    let typeId = sessionStorage.getItem(
      "studentExerciseHisDetailInfo-exerciseTypeId"
    );
    if (typeId != null) {
      vm.exerciseTypeId = Number(typeId);
    }
    vm.startTimeCur = vm.startTime.substring(0, 10);
    vm.endTimeCur = vm.endTime.substring(0, 10);
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
    this.runStatus = this.runStatus == null ? "" : this.runStatus;
    this.runDistance = this.runDistance == null ? "" : this.runDistance;
    this.pageSize = this.pageSize == null ? 10 : this.pageSize;
    this.pageNum = this.pageNum == null ? 1 : this.pageNum;
    this.search();
    vm.getExerciseTypeList();
  },
};
</script>
