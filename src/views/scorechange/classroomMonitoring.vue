<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学习态度分析</h2>
    </div>
    <div>
      <Form :label-width="100" class="function">
        <Card>
          <div class="top-search">
            <div class="left-input">
              <span>年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.gradeId"
                  :key="item.gradeId"
                >{{ item.gradeName }}</Option>
              </Select>
            </div>
            <div class="right-btns">
              <Button type="success" @click="querySearch">查询</Button>
            </div>
          </div>
          
        </Card>
        <br />
        <Card>
          <div style="font-size:18px;height:40px;">数据概览</div>
          <Row>
            <div>
              <Table
                border
                :loading="loading"
                :columns="resultColumnsTotal"
                :data="resultDataTotal"
              ></Table>
            </div>
          </Row>
        </Card>
      </Form>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">数据分析</div>
        <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">数据明细</div>
        <div :style="{backgroundColor:'#FFFFFF'}">
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </div>
      </Card>
      <div style="width:100%;height:50px"></div>
    </div>
  </div>
</template>

<script>
var gradeList = [
  "一年级",
  "二年级",
  "三年级",
  "四年级",
  "五年级",
  "六年级",
  "七年级",
  "八年级",
  "九年级",
  "高一",
  "高二",
  "高三",
  "大一",
  "大二",
  "大三",
  "大四",
];
export default {
  name: "teacherDetail",
  data() {
    return {
      semesterName: "",
      myChart1: null,
      option1: {},
      loading: false,
      resultDataTotal: [],
      resultColumnsTotal: [
        {
          title: "扣分总次数",
          key: "totalCount",
          align: "center",
          minWidth:100,
        },
        {
          title: "旷课",
          key: "truancyCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "迟到",
          key: "lateCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "早退",
          key: "earlyCount",
          align: "center",
          minWidth:120,

        },
        {
          title: "违反纪律",
          key: "violateDisciplineCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "运动着装不符",
          key: "notAccordClothing",
          align: "center",
          minWidth:100,

        },
        {
          title: "病假",
          key: "sickCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "事假",
          key: "thingCount",
          align: "center",
          minWidth:100,

        },
        // {
        //   title: '不认真',
        //   key: 'notSeriousCount',
        //   align: 'center',
        // },
        {
          title: "大课间缺席",
          key: "bigAbsentCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "大课间违反纪律",
          key: "bigViolateDisciplineCount",
          align: "center",
          minWidth:100,

        },
      ],
      resultColumns: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          minWidth:100,

          render: (h, params) => {
            return h("div", [h("span", gradeList[params.row.grade - 1])]);
          },
        },
        {
          title: "旷课",
          key: "truancyCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "迟到",
          key: "lateCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "早退",
          key: "earlyCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "违反纪律",
          key: "violateDisciplineCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "运动着装不符",
          key: "notAccordClothing",
          align: "center",
          minWidth:100,

        },
        {
          title: "病假",
          key: "sickCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "事假",
          key: "thingCount",
          align: "center",
          minWidth:100,

        },
        // {
        //   title: '不认真',
        //   key: 'notSeriousCount',
        //   align: 'center',
        // },
        {
          title: "大课间缺席",
          key: "bigAbsentCount",
          align: "center",
          minWidth:100,

        },
        {
          title: "大课间违反纪律",
          key: "bigViolateDisciplineCount",
          align: "center",
          minWidth:100,

        },
      ],
      resultData: [],
      totalCount: 0,
      earlyCount: 0,
      lateCount: 0,
      notAccordClothing: 0,
      notSeriousCount: 0,
      sickCount: 0,
      thingCount: 0,
      truancyCount: 0,
      violateDisciplineCount: 0,
      grade: 999,
      schoolGradeList: [],
      studentClass: 999,
      classList: [
        {
          value: 999,
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
    };
  },
  methods: {
    querySearch() {
      this.queryGradeSportsClassDetail();
    },
    queryGradeSportsClassDetail() {
      var vm = this;
      this.resultDataTotal = [];
      this.$axios
        .get(
          "/v1/sports/learn/queryGradeSportsClassDetail?gradeId=" +
            (vm.grade == 999 ? "" : vm.grade) +
            "&studentClass=" +
            (vm.studentClass == 999 ? "" : vm.studentClass)
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.earlyCount = 0;
            this.lateCount = 0;
            this.notAccordClothing = 0;
            this.notSeriousCount = 0;
            this.sickCount = 0;
            this.thingCount = 0;
            this.truancyCount = 0;
            this.violateDisciplineCount = 0;
            this.bigViolateDisciplineCount = 0;
            this.bigAbsentCount = 0;

            this.resultData = res.data.response;
            this.semesterName = this.resultData[0].semesterName;
            for (let val of this.resultData) {
              this.earlyCount += val.earlyCount;
              this.lateCount += val.lateCount;
              this.notAccordClothing += val.notAccordClothing;
              this.notSeriousCount += val.notSeriousCount;
              this.sickCount += val.sickCount;
              this.thingCount += val.thingCount;
              this.truancyCount += val.truancyCount;
              this.violateDisciplineCount += val.violateDisciplineCount;
              this.bigViolateDisciplineCount += val.bigViolateDisciplineCount;
              this.bigAbsentCount += val.bigAbsentCount;
            }
            this.totalCount =
              this.earlyCount +
              this.lateCount +
              this.notAccordClothing +
              this.notSeriousCount +
              this.sickCount +
              this.thingCount +
              this.truancyCount +
              this.violateDisciplineCount;
            this.drawGenSLine();
            let info = {
              totalCount: this.totalCount,
              earlyCount: this.earlyCount,
              lateCount: this.lateCount,
              notAccordClothing: this.notAccordClothing,
              notSeriousCount: this.notSeriousCount,
              sickCount: this.sickCount,
              thingCount: this.thingCount,
              truancyCount: this.truancyCount,
              violateDisciplineCount: this.violateDisciplineCount,
              bigViolateDisciplineCount: this.bigViolateDisciplineCount,
              bigAbsentCount: this.bigAbsentCount,
            };
            this.resultDataTotal.push(info);
          }
        });
    },
    drawGenSLine() {
      var vm = this;
      vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      vm.option1 = {
        title: {
          text: "",
          subtext: "",
          x: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} :  {d}%",
        },
        legend: {
          orient: "vertical",
          left: 20,
          top: 30,
          data: [
            "旷课",
            "迟到",
            "早退",
            "违反纪律",
            "运动着装不符",
            "病假",
            "事假",
            "大课间缺席",
            "大课间违反纪律",
          ],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              {
                value: (
                  (vm.truancyCount / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "旷课",
              },
              {
                value: (
                  (vm.lateCount / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "迟到",
              },
              {
                value: (
                  (vm.earlyCount / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "早退",
              },
              {
                value: (
                  (vm.violateDisciplineCount /
                    (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "违反纪律",
              },
              {
                value: (
                  (vm.notAccordClothing / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "运动着装不符",
              },
              {
                value: (
                  (vm.sickCount / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "病假",
              },
              {
                value: (
                  (vm.thingCount / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "事假",
              },
              // {value:(vm.notSeriousCount/(vm.totalCount?vm.totalCount:1)*100).toFixed(2), name:'不认真'},
              {
                value: (
                  (vm.bigAbsentCount / (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "大课间缺席",
              },
              {
                value: (
                  (vm.bigViolateDisciplineCount /
                    (vm.totalCount ? vm.totalCount : 1)) *
                  100
                ).toFixed(2),
                name: "大课间违反纪律",
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              //   normal:{
              //     color:function(params) {
              //     var colorList = [
              //             '#119670', '#f8c31d', '#ff9639', '#ff9639','#ff9639', '#b5c263', '#ed3c46'
              //         ];
              //         return colorList[params.dataIndex]
              //       }
              //   }
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      vm.myChart1.setOption(vm.option1);
    },
    getStartYearList() {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios.get("/v1/school/getStartYearList").then((res) => {
        if (res.data.code == 10000) {
          //   console.log(res);
          let data = res.data.response;
          let all = {
            gradeId: 999,
            gradeName: "全部",
          };
          this.schoolGradeList.push(all);
          this.schoolGradeList = this.schoolGradeList.concat(data);

          // this.schoolName = data.name
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
  },
  mounted() {
    this.queryGradeSportsClassDetail();
    this.getStartYearList();
  },
  watch: {},
};
</script>
