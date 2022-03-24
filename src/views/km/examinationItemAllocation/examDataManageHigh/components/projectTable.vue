<template>
    <div class="project-table">
        <div>
            <Row>
                <div style>
                    <Table
                    border
                    max-height="650"
                    :loading="loading"
                    :columns="resultColumns"
                    :data="resultData"
                    ></Table>
                </div>
            </Row>
        </div>
    </div>
</template>
<script>
import api from '@/api/studentApi.js';
export default {
  props:['table','changeReportDisable','submitObj',
  'scoringMethod','smallCode'],
    data() {
        return {
          tableList:this.table,
            loading: false,
            disableModal:this.changeReportDisable,
            resultColumns: [
                {
                    title: '考试时间',
                    key: 'createTime',
                    align: 'center',
                    minWidth: 300,
                    render:(h,params) => {
                      const {row} = params;
                      let time = '';
                      if(row.startTime&&row.endTime) {
                        time = `${row.startTime}~${row.endTime}`
                      }
                      return h('div',time)
                    }
                },
                {
                    title: '成绩',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                    render: (h,params) =>{
                      const {row} = params;
                      let text,mine,sconed;
                      if(row.unit == "分.秒") {
                      if(!row.achievementValue && typeof(row.achievementValue)!='undefined' && row.achievementValue!=0) {
                        text = ' ';
                      }else {
                        mine = parseInt(Number(row.achievementValue)/60);
                        sconed = row.achievementValue%60;
                        text = `${mine}'${sconed}"`
                      }
                    }else {
                      text = `${row.achievementValue}${row.unit}`
                    }
                      return h('div',text)
                    }
                },
                {
                    title: '得分',
                    key: 'score',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '录入教师',
                    key: 'teacherName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '录入时间',
                    key: 'createTime',
                    align: 'center',
                    minWidth: 100,
                },
                {
                title: "操作",
                key: "action",
                align: "center",
                minWidth: 200,
                render: (h, params) => {
                    const row = params.row;
                    return h("div", {

                        style:{
                            display: "flex",
                            justifyContent: "space-around",
                        }
                        },[
                        h(
                            "Button",
                            {
                            props: {
                                type: "success",
                                disabled: false,
                            },
                            style: {
                                marginRight: "10px",
                            },
                            on: {
                                click: () => {
                                this.toDetail(row);
                                },
                            },
                            },
                            "修改"
                        )
                        ]);
                    },
                },
                {
                    title: '备注',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                },
            ],
            resultData: this.table,

        }
    },
    mounted() {
      
    },
    methods: {
        //计算得分
        async calculateCore(data) {
          let {studentScoreId,achievementValue} = data; 
          let params = {studentScoreId,achievementValue}
          let res = await api.queryStudentScore(params);
        },
        toDetail(row){
          let value = this.disableModal;
          let submitObj = this.submitObj;
          submitObj.studentScoreId = row.studentScoreId;
          submitObj.achievementValue = row.achievementValue;
          submitObj.score = row.score
          submitObj.unit = row.unit;
          submitObj.scoringMethod = this.scoringMethod;
          submitObj.schoolConfigId = row.schoolConfigId;
          submitObj.smallCode = this.smallCode;
          this.calculateCore(submitObj);
          this.$emit('update:changeReportDisable',!value);
          this.$emit('update:submitObj',submitObj);
            }
    }
}
</script>
<style lang="less" scoped>
    .project-table {
        width: 100%;
        height:100%;
        margin-top:20px;
    }
</style>