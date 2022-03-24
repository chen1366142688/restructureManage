<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{schoolYear}}年度体测工作量数据明细</h2>
    </div>
        <Card>
          <div >
              <div>
                  <Row>
                      <div>
                          <Table v-if="schoolType=='2'" max-height="500" border :columns="resultColumns" :data="resultData"></Table>
                          <Table v-else max-height="500" border :columns="resultColumns1" :data="resultData"></Table>
                      </div>
                  </Row>
              </div>
          </div>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'teacherList',
  data() {
    return {
      schoolYear:"",
      schoolType:"",
      resultColumns: [
        {
          title: '老师姓名',
          key: 'teacherName',
          align: 'center',
          minWidth:100
        },
        {
          title: '身高',
          key: 'heightCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '体重',
          key: 'weightCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '肺活量',
          key: 'vitalCapacityCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '50米跑',
          key: 'runFiftyCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '坐位体前屈',
          key: 'sitAndReachCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '一分钟仰卧起坐',
          key: 'oneMinuteSitUpCount',
          align: 'center',
          minWidth:100

        },
         {
          title: '一分钟跳绳',
          key: 'oneMinuteRopeSkippingCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '50米X8往返跑',
          key: 'runFiftyEightCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '合计',
          key: 'visionCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let count = row.heightCount+row.weightCount+row.vitalCapacityCount+row.runFiftyCount+row.sitAndReachCount+row.oneMinuteRopeSkippingCount
            +row.oneMinuteSitUpCount+row.runFiftyEightCount;
            return h('div', [h('span', count)])
          }
        },
      ],
       resultColumns1: [
        {
          title: '老师姓名',
          key: 'teacherName',
          align: 'center',
          minWidth:100
        },
        {
          title: '身高',
          key: 'heightCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '体重',
          key: 'weightCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '肺活量',
          key: 'vitalCapacityCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '50米跑',
          key: 'runFiftyCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '立定跳远',
          key: 'standingJumpCount',
          align: 'center',
          minWidth:100
        },
        {
          title: '坐位体前屈',
          key: 'sitAndReachCount',
          align: 'center',
          minWidth:100

        },
         {
          title: '800米跑',
          key: 'runEightHundredCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '一分钟仰卧起坐',
          key: 'oneMinuteSitUpCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '1000米跑',
          key: 'runThousandCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '引体向上',
          key: 'pullUpsCount',
          align: 'center',
          minWidth:100

        },
        {
          title: '合计',
          key: 'visionCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let count = row.heightCount+row.weightCount+row.vitalCapacityCount+row.runFiftyCount+row.sitAndReachCount
            +row.oneMinuteSitUpCount+row.standingJumpCount+row.pullUpsCount+row.runThousandCount+row.runEightHundredCount;
            return h('div', [h('span', count)])
          }
        },
      ],
      resultData: [],
    }
  },
  methods: {
    queryTestActivityTeacherStudentList(){
        this.$axios.get('/v1/test/query/queryTestActivityTeacherStudentList').then(res => {
            if (res.data.code == 10000) {
                this.resultData = res.data.response.list;
                this.schoolYear = res.data.response.schoolYear;
            }
        })
    },
    
  },
  created() {
  },
  mounted() {
     this.queryTestActivityTeacherStudentList();
     let schoolType = sessionStorage.getItem("schoolType");
     this.schoolType = schoolType;
  }
}
</script>