<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">班级及课程管理</h2>
    </div>
    <div>
      <Card>
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>年<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="grade" class="width120">
                <Option v-for="item in gradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>班<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="studentClass" class="width120">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>授课老师：</span>
              <Input v-model="teacherName" placeholder="授课老师" class="width120"></Input>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
          </div>
        </div>
      </Card>
      <br>
      <div>
      <Card>
        <div style="font-size:18px;height:40px;">数据明细</div>
        <Row>
          <div>
            <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br>
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
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      grade:'',
      gradeList: [{
          grade: "",
          label: '全部年级'
        },
        {
          grade: 21,
          label: '小班'
        },
        {
          grade: 22,
          label: '中班'
        },
        {
          grade: 23,
          label: '大班'
        }
      ],
      studentClass:'',
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
        //   title: "学期",
        //   key: "yearSemesterName",
        //   align: "center",
        //   minWidth:100,
        // },
        {
          title: "年级名称",
          key: "gradeName",
          align: "center",
          minWidth:100,
          //   render: (h, params) => {
          //     const row = params.row;
          //     const text = row.displayType == "1" ? "通知" : "消息";
          //     return h("span", text);
          //   }
        },
        {
          title: "班级名称",
          key: "className",
          align: "center",
          minWidth:100,
        },
        {
          title: "授课教师",
          key: "teacherName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row.teacherName;
            var text="";
            if(row!=null){
              var result = row.split(",");
              for(var i=0;i<result.length;i++){
                text+=`<lable style='padding:0 0;display:inline-block'>${i<result.length-1?(result[i]+'，'):result[i]}</lable>`;
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
          title: "学生人数",
          key: "studentNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:200,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.classPlan(row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.studentManage(row);
                    }
                  }
                },
                "学生管理"
              )
            ]);
          }
        }
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      allSemester: '',
      allClassPlanStasus:false,
      schoolGradeList: [],
      teacherName:'',
      semesterYear: "",
      semesterYearList: [],
    };
  },
  methods: {
    /**获取数据明细**/
    getPrimarySportsClass() {
      var vm = this;
      vm.loading = true;
      let data = {
        "grade":vm.grade,
        "pageNo":vm.pageNum,
        "pageSize": vm.pageSize,
        "semesterYear": vm.semesterYear,
        "studentClass": vm.studentClass,
        "teacherName": vm.teacherName
      };
      this.$axios
        .post("/v1/primarysportsclass/getPrimarySportsClass", data)
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
    },
    /**获取列表count**/
    countSportsClassNum() {
      var vm = this;
       let data = {
        "grade":vm.grade,
        "pageNo":vm.pageNum,
        "pageSize": vm.pageSize,
        "semesterYear": vm.semesterYear,
        "studentClass": vm.studentClass,
        "teacherName": vm.teacherName
      };
      this.$axios
        .post("/v1/primarysportsclass/getPrimarySportsClassNum", data)
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
    showVision() {
      this.$router.push({name: 'showVision'});
    },
    search() {
      this.getPrimarySportsClass();
      this.countSportsClassNum();
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
        this.querySearch();
      }
    },
    /*编辑排课*/
    classPlan(classItem) {
      this.$store.commit('setEventNow', classItem)
      this.$router.push({ name: "mineditClass" ,params: {studentClassId: classItem.classId}});
    },
    /**学生管理**/
    studentManage(obj) {
      this.$store.commit('setEventNow', obj)
      this.$router.push({ name: "minstudentInfoManage" });
    },
  },
  watch: {},
  mounted() {
    this.search();
  }
};
</script>
<style scoped>
  .mar-l40{margin-left:40px;}
  .width120{width:120px;}
  @media screen and (max-width: 1650px) {
    .mar-l40{margin-left:15px;}
    .width120{width:100px;}
  }
</style>
