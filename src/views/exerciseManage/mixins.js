/**
 * 课后作业相关
 */
const mixins = {
  data () {
    return {
      resultColumns: [],
      firstObj: {
        title: "日期",
        key: "dayTime",
        align: "center",
        type:'html',
        minWidth: 110,
      },
      lastObj: {
        title: "当日锻炼情况",
        key: "overPlan",
        align: "center",
        type:'html',
        minWidth: 110,
      },
    }
  },
  mounted () {
  },
  methods: {
    structureColumn(count) { 
      let resultColumns = []
      for (let i = 0; i < count; i++) { 
        resultColumns.push({
          title: `计划${i+1}`,
          key: `plan${i+1}`,
          align: "center",
          minWidth:200,
          render: (h, params) => {
            const row = params.row
            return h('div', [
              h('div',
                {
                  props: { type: 'success' },
                  style: {
                    margin: 'auto',
                    marginTop: '5px',
                    width: '200px',
                    fontSize: '5px'
                  }
                },
                (i > 0 ?
                  (row.exerciseType === "2" ? "" : (row.completeStatus == '1' && row.completeType == '2') ? "" : row[`plan${i + 1}`]) :
                  (row.completeStatus == '1' && row.completeType == '2') ? "已完成 无视频" : row[`plan${i + 1}`])
              ),
              h('Button',
                {
                  props: {
                    type: 'success',
                  },
                  style: {
                    display: row[`videoCount${i + 1}`] > 0 ? '' : 'none',
                    marginTop: '10px',
                    marginBottom: '5px',
                    fontSize: '5px',
                    font: '1px'
                  },
                  on: {
                    click: () => {
                      this.toshowVideo1(row[`totailVideo${i + 1}`], row.dayTime, row[`plan${i + 1}`])
                    }
                  }
                },
                '查看视频'
              ),
              h('div',
                {
                  props: {
                    type: 'success',
                  },
                  style: {
                    display: row[`videoCount${i + 1}`] == 0 ? '' : 'none',
                    margin: 'auto',
                    marginTop: '5px',
                    width: '200px',
                    fontSize: '5px',
                  },
                },// 备注：第一个计划和后面的计划判断有差异，因为会显示一堆已完成-由教师完成
                (i > 0 ? (row.exerciseType == "2" ? "" : (row.completeStatus == '1' && row.completeType == '2') ? "" : row[`allTimeDuration${i+1}`] > 0 && row[`videoCount${i+1}`] == 0 ? '已完成 无视频' : row[`plan${i+1}`] != '' && row[`allTimeDuration${i+1}`] == 0 ? '未完成作业' : '') : row.exerciseType == '2' ?
                    ( (row.completeStatus=='1' && row.completeType=='1') ? '家长自行布置(已完成作业)' : (row.completeStatus=='1' && row.completeType=='2') ? '由教师完成' : '家长自行布置(未完成作业)') : (row.completeStatus=='1' && row.completeType=='2') ? '由教师完成' : row[`allTimeDuration${i+1}`] > 0 && row[`videoCount${i+1}`] == 0 ? '已完成 无视频' : row[`plan${i+1}`] != '' && row[`allTimeDuration${i+1}`] == 0 ? '未完成作业' : '')
              )
            ])
          }
        })
      }
      return [this.firstObj, ...resultColumns, this.lastObj];
    }
  }
}
export default mixins