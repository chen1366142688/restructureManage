<template>
  <div class="studentMsg">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生详情</h2>
    </div>
    <div>
      <Card>
        <div class="student-top">
          <span>姓名 ：{{studentMsgList.studentName}}</span>
          <span>性别 ：{{studentMsgList.gender=='2'?'女':'男'}}</span>
          <span>学籍号 ：{{studentMsgList.registerCode}}</span>
          <span>班级 ：{{studentMsgList.className}}</span>
          <span>测试得分：{{studentMsgList.testSumSource?`${studentMsgList.testSumSource}分`:''}}</span>
          <div v-if="studentMsgList.testLevel" class="hierarchy" :style="{color:`rgba(${hierarchyColor[studentMsgList.testLevel-1]},1)`,background:`rgba(${hierarchyColor[studentMsgList.testLevel-1]},0.2)`}">{{studentMsgList.testLevel=='1'?'优秀':studentMsgList.testLevel=='2'?'良好':studentMsgList.testLevel=='3'?'及格':studentMsgList.testLevel=='4'?'不及格':''}}</div>
          <Button type="success" @click="goback">返回</Button>
        </div>
      </Card>
    </div>
    <div class="project-content" v-for="(item,index) in studentMsgList.list" :key="index">
      <Card>
        <div class="project-name" style="font-weight: bold;" v-if="item.littles.length>1">
          <div>{{item.classTestName}}</div>
          <div>得分：{{item.score}}</div>
          <div>等级：{{item.testLevel == 1?'优秀':item.testLevel==2?'良好':item.testLevel==3?'及格':item.testLevel==4?'不及格':''}} </div>
        </div>
        <div v-for="(little,littleIndex) in item.littles" :key="littleIndex" style="padding-bottom:20px">
          <div class="project-name">
            <div>{{item.littles.length==1?item.classTestName:`${little.examItemName}：`}}{{item.littles.length!=1?calculateScore(little.resultValue,little.examUnit):''}}</div>
            <div>得分：{{item.littles.length==1?item.score:little.score}}</div>
            <div>等级：{{item.littles.length!=1?(little.scoreLevel == 1?'优秀':little.scoreLevel==2?'良好':little.scoreLevel==3?'及格':little.scoreLevel==4?'不及格':''):(item.testLevel == 1?'优秀':item.testLevel==2?'良好':item.testLevel==3?'及格':item.testLevel==4?'不及格':'')}}</div>
          </div>
          <Table
            border
            max-height="650"
            :columns="dataColumns"   
            :data="little.examItemScores?little.examItemScores:dataResult"
          ></Table>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import api from '@/api/testProject.js'
export default {
  data() {
    return {

      dataColumns:[
        {
          title: "测试值",
          key: "resultValue",
          align: "center",
          render:(h,parmas) =>{
            let row = parmas.row,text,mine,sconed;;
            if(row.resultValue) {
              if(row.examUnit == "分.秒") {
                mine = parseInt(Number(row.resultValue)/60);
                sconed = row.resultValue%60;
                text = `${mine}'${sconed}`
              }else {
                text = `${row.resultValue}${row.examUnit}`
              }
            }else {
              text = ''
            };
            return h('div',text)
          }
        },
        {
          title: "得分",
          key: "score",
          align: "center",
          render:(h,parmas) =>{
            let text ='';
            if(parmas.row.score) {
              text = `${parmas.row.score}分`
            }else text = '';
            return h('div',text);
          }
        },
        {
          title: "录入时间",
          key: "createtime",
          align: "center",
        },
        {
          title: "考核教师",
          key: "teacherName",
          align: "center",
        },
      ],
      hierarchyColor:['0, 198, 147','240, 133, 18','239, 185, 0','218, 71, 101'],
      dataResult:[],
      studentMsgList:[],//
      calculateScore(val,name) {//计算成绩
        let text,mine,sconed;
        if(val) {
          let text = `${val}${name}`;
          if(name == "分.秒") {
            mine = parseInt(Number(val)/60);
            sconed = val%60;
            text = `${mine}'${sconed}`
          };
          return text
        }else {
          return ''
        }
      },
    }
  },
  created() {
    this.queryStudentMsg();
  },
  methods: {
    // calculateScore(val,name) {//计算成绩
    //   let text = `${val}${name}`;
    //   if(name == "分.秒") {
    //     mine = parseInt(Number(val)/60);
    //     sconed = val%60;
    //     text = `${mine}'${sconed}`
    //   };
    //   return text
    // },
    async queryStudentMsg() {//查询学生详情
      let parmas = {
        activityId:this.$route.query.activityId,
        studentId:this.$route.query.studentId,
      };
      let res = await api.getTestDataExamineByStudentDetails(parmas);
      if(res.data.code == 10000) {
        this.studentMsgList = res.data.response;
      }
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .studentMsg{
    padding-left:10px;
  }
  .project-content{
    margin-top:20px;
  }
  .student-top {
    display:flex;
    align-items:center;
    span {
      margin-right:70px;
    }
    .hierarchy{
      min-width: 60px;
      height: 30px;
      background-color:rgba(0, 198, 147,0.2);
      border-radius: 4px;
      text-align: center;
      line-height: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #00C693;
      margin:0 100px 0 -50px;
    }
  }
  .project-name{
    display:flex;
    align-items:center;
    margin-bottom: 18px;
    div{
      margin-right:59px;
    }
  }
</style>