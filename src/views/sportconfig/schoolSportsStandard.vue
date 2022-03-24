<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体育素质综合评价考核配置</h2>
    </div>
        <Card style="margin-bottom:20px;" >
          <div style="margin-top:12px;margin-left:20px;margin-bottom:20px;" >
            <p>评价考核成绩按照百分制计算，单个结构按照百分制计算；</p><br/>
            <p>1.学期成绩=学期考核项目分数相加（单个考核项目分数=考核项目得分*占比）</p><br/>
            <p>学年成绩=两个学期成绩的平均分</p><br/>
            <p>2.各校可根据学年、学期计划及考核安排制定学期考核项目，并执行考核。结构如下：</p><br/>
          </div>
          </Card>
          <Card v-for="(grade,index) in gradeStandardList" :key="index" style="margin-bottom:20px;" >
              <div style="font-size:17px;font-weight:600;line-height:40px;padding-left:5px;">
                  {{grade.grade==1?"一年级":grade.grade==2?"二年级":grade.grade==3?"三年级":grade.grade==4?"四年级":grade.grade==5?"五年级":grade.grade==6?"六年级":grade.grade==7?"七年级":grade.grade==8?"八年级":grade.grade==9?"九年级":grade.grade==10?"高一":grade.grade==11?"高二":grade.grade==12?"高三":""}}
              </div>
              <div style="height:80px;" >
                <Form :label-width="10">
                  <div style="float:left;width:350px;" >
                        <FormItem label="" style="height:10px;" >
                              <Checkbox :value="grade.learnPercentCheck" @on-change="handleCheck('learnPercentCheck',grade.grade)"></Checkbox>
                              <font style="margin-left:5px;"  >学习态度： 配置占比 <Input type="number" v-model="grade.learnPercent"  placeholder="占比" style="width:80px;"></Input> %</font>
                        </FormItem>
                        <FormItem label="" style="height:10px;" >
                              <Checkbox :value="grade.homeworkPercentCheck"  @on-change="handleCheck('homeworkPercentCheck',grade.grade)"></Checkbox>
                              <font style="margin-left:5px;"  >课后作业： 配置占比 <Input type="number"  v-model="grade.homeworkPercent"  placeholder="占比" style="width:80px;"></Input> %</font>
                        </FormItem>
                  </div>
                  <div style="float:left;width:350px;" >
                        <FormItem label="" style="height:10px;" >
                              <Checkbox :value="grade.testPercentCheck"  @on-change="handleCheck('testPercentCheck',grade.grade)"></Checkbox>
                              <font style="margin-left:5px;"  >体质测试： 配置占比 <Input type="number"  v-model="grade.testPercent"  placeholder="占比" style="width:80px;"></Input> %</font>
                        </FormItem>
                        <FormItem label="" style="height:10px;" >
                              <Checkbox :value="grade.actionPercentCheck"  @on-change="handleCheck('actionPercentCheck',grade.grade)"></Checkbox>
                              <font style="margin-left:5px;"  >技能体能： 配置占比 <Input type="number"  v-model="grade.actionPercent"  placeholder="占比" style="width:80px;"></Input> %</font>
                        </FormItem>
                  </div>
                  <div style="float:left;width:350px;" >
                        <FormItem label="" style="height:10px;" >
                              <Checkbox :value="grade.healthPercentCheck"  @on-change="handleCheck('healthPercentCheck',grade.grade)"></Checkbox>
                              <font style="margin-left:5px;" >健康知识： 配置占比 <Input type="number"  v-model="grade.healthPercent"  placeholder="占比" style="width:80px;"></Input> %</font>
                        </FormItem>
                        <FormItem label="" style="height:10px;" v-show="false" >
                              <Checkbox :value="grade.athleticContestScoreCheck"  @on-change="handleCheck('athleticContestScoreCheck',grade.grade)"></Checkbox>
                              <font style="margin-left:5px;" v-if="grade.athleticContestScoreCheck == true" >体育竞赛： 最大加分 <Input type="number"  v-model="grade.athleticContestScore"  placeholder="分" style="width:80px;"></Input> 分</font>
                        </FormItem>
                  </div>
                </Form>
              </div>
          <div style="font-size:15px;line-height:50px;width:100%;clear:both">
              <div style="padding-left:15px;padding-right:15px;float:left;border-bottom:1px solid rgba(240,240,240,1);border-top:1px solid rgba(220,222,226,1);border-left:1px solid rgba(220,222,226,1);border-right:1px solid rgba(220,222,226,1);">第一学期考核项目：</div>
              <div style="height:51px;border-top: 1px solid #e9e9e9;border-right: 1px solid #e9e9e9;width:85%;">
                    <font v-if="grade.learnPercentCheck == true" style="margin-left:40px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('firstHaveLearn',grade.grade)" :value="grade.firstHaveLearn">&nbsp;学习态度</Checkbox></font>
                    <font v-if="grade.homeworkPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('firstHaveHomework',grade.grade)" :value="grade.firstHaveHomework">&nbsp;课后作业</Checkbox></font>
                    <font v-if="grade.testPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('firstHaveTest',grade.grade)" :value="grade.firstHaveTest">&nbsp;体质测试</Checkbox></font>
                    <font v-if="grade.actionPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('firstHaveAction',grade.grade)" :value="grade.firstHaveAction">&nbsp;技能体能</Checkbox></font>
                    <font v-if="grade.healthPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('firstHaveHealth',grade.grade)" :value="grade.firstHaveHealth">&nbsp;健康知识</Checkbox></font>
<!--                    <font v-if="grade.athleticContestScoreCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('firstHaveContest',grade.grade)" :value="grade.firstHaveContest">体育竞赛</Checkbox></font>-->
               </div>
          </div>
           <div style="font-size:15px;line-height:50px;height:50px;width:100%;clear:both">
              <div style="padding-left:15px;padding-right:15px;line-height:51px;float:left;border-top:1px solid rgba(220,222,226,1);border-bottom:1px solid rgba(220,222,226,1);border-left:1px solid rgba(220,222,226,1);border-right:1px solid rgba(220,222,226,1);">第二学期考核项目：</div>
              <div style="height:53px;border: 1px solid #e9e9e9;border: 1px solid #e9e9e9;border-left: 0px solid rgba(240,240,240,1);width:85%;">
                    <font v-if="grade.learnPercentCheck == true" style="margin-left:40px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('secondHaveLearn',grade.grade)" :value="grade.secondHaveLearn">&nbsp;学习态度</Checkbox></font>
                    <font v-if="grade.homeworkPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('secondHaveHomework',grade.grade)" :value="grade.secondHaveHomework">&nbsp;课后作业</Checkbox></font>
                    <font v-if="grade.testPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox disabled @on-change="handleCheckGrade('secondHaveTest',grade.grade)" :value="grade.secondHaveTest">&nbsp;体质测试</Checkbox></font>
                    <font v-if="grade.actionPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('secondHaveAction',grade.grade)" :value="grade.secondHaveAction">&nbsp;技能体能</Checkbox></font>
                    <font v-if="grade.healthPercentCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('secondHaveHealth',grade.grade)" :value="grade.secondHaveHealth">&nbsp;健康知识</Checkbox></font>
<!--                    <font v-if="grade.athleticContestScoreCheck == true" style="margin-left:6px;margin-right:40px;" ><Checkbox @on-change="handleCheckGrade('secondHaveContest',grade.grade)" :value="grade.secondHaveContest">体育竞赛</Checkbox></font>-->
              </div>
          </div>
        </Card>
        <div style="margin-top:10px;padding-left:48%;margin-bottom:80px;">
          <div style="width:20px;"></div>
          <Button style="float:left;width:100px" @click="baseSubmit" type="success">保存</Button>
        </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      gradeStandardList:[
      ],

    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  created: function() {

  },
  methods: {
    handleCheck(type,selecGrade){
      for(let i=0;i<this.gradeStandardList.length;i++){
          if(this.gradeStandardList[i].grade == selecGrade){
            if(type == 'learnPercentCheck'){
                this.gradeStandardList[i].learnPercentCheck = this.gradeStandardList[i].learnPercentCheck == true?false:true;
                if(this.gradeStandardList[i].learnPercentCheck == false){
                      this.gradeStandardList[i].learnPercent="";
                      this.gradeStandardList[i].firstHaveLearn=false;
                      this.gradeStandardList[i].secondHaveLearn=false;
                }
            }else if(type == 'homeworkPercentCheck'){
                this.gradeStandardList[i].homeworkPercentCheck = this.gradeStandardList[i].homeworkPercentCheck == true?false:true;
                if(this.gradeStandardList[i].homeworkPercentCheck == false){
                      this.gradeStandardList[i].homeworkPercent="";
                      this.gradeStandardList[i].firstHaveHomework=false;
                      this.gradeStandardList[i].secondHaveHomework=false;
                }
            }else if(type == 'testPercentCheck'){
                this.gradeStandardList[i].testPercentCheck = this.gradeStandardList[i].testPercentCheck == true?false:true;
                if(this.gradeStandardList[i].testPercentCheck == false){
                      this.gradeStandardList[i].testPercent="";
                      this.gradeStandardList[i].firstHaveTest=false;
                      this.gradeStandardList[i].secondHaveTest=false;
                }
            }else if(type == 'actionPercentCheck'){
                this.gradeStandardList[i].actionPercentCheck = this.gradeStandardList[i].actionPercentCheck == true?false:true;
                if(this.gradeStandardList[i].actionPercentCheck == false){
                      this.gradeStandardList[i].actionPercent="";
                      this.gradeStandardList[i].firstHaveAction=false;
                      this.gradeStandardList[i].secondHaveAction=false;
                }
            }else if(type == 'healthPercentCheck'){
                this.gradeStandardList[i].healthPercentCheck = this.gradeStandardList[i].healthPercentCheck == true?false:true;
                if(this.gradeStandardList[i].healthPercentCheck == false){
                      this.gradeStandardList[i].healthPercent="";
                      this.gradeStandardList[i].firstHaveHealth=false;
                      this.gradeStandardList[i].secondHaveHealth=false;
                }
            }else if(type == 'athleticContestScoreCheck'){
                this.gradeStandardList[i].athleticContestScoreCheck = this.gradeStandardList[i].athleticContestScoreCheck == true?false:true;
                if(this.gradeStandardList[i].athleticContestScoreCheck == false){
                      this.gradeStandardList[i].athleticContestScore="";
                      this.gradeStandardList[i].firstHaveContest=false;
                      this.gradeStandardList[i].secondHaveContest=false;
                }
            }
          }
      }

    },
    handleCheckGrade(type,selecGrade){
      for(let i=0;i<this.gradeStandardList.length;i++){
          if(this.gradeStandardList[i].grade == selecGrade){
                if(type == 'firstHaveTest'){
                    this.gradeStandardList[i].firstHaveTest = this.gradeStandardList[i].firstHaveTest == true?false:true;
                }else if(type == 'firstHaveLearn'){
                    this.gradeStandardList[i].firstHaveLearn = this.gradeStandardList[i].firstHaveLearn == true?false:true;
                }else if(type == 'firstHaveExercise'){
                    this.gradeStandardList[i].firstHaveExercise = this.gradeStandardList[i].firstHaveExercise == true?false:true;
                }else if(type == 'firstHaveHomework'){
                    this.gradeStandardList[i].firstHaveHomework = this.gradeStandardList[i].firstHaveHomework == true?false:true;
                }else if(type == 'firstHaveAction'){
                    this.gradeStandardList[i].firstHaveAction = this.gradeStandardList[i].firstHaveAction == true?false:true;
                }else if(type == 'firstHaveHealth'){
                    this.gradeStandardList[i].firstHaveHealth = this.gradeStandardList[i].firstHaveHealth == true?false:true;
                }else if(type == 'firstHaveContest'){
                    this.gradeStandardList[i].firstHaveContest = this.gradeStandardList[i].firstHaveContest == true?false:true;
                }else if(type == 'secondHaveTest'){
                    this.gradeStandardList[i].secondHaveTest = this.gradeStandardList[i].secondHaveTest == true?false:true;
                }else if(type == 'secondHaveLearn'){
                    this.gradeStandardList[i].secondHaveLearn = this.gradeStandardList[i].secondHaveLearn == true?false:true;
                }else if(type == 'secondHaveExercise'){
                    this.gradeStandardList[i].secondHaveExercise = this.gradeStandardList[i].secondHaveExercise == true?false:true;
                }else if(type == 'secondHaveHomework'){
                    this.gradeStandardList[i].secondHaveHomework = this.gradeStandardList[i].secondHaveHomework == true?false:true;
                }else if(type == 'secondHaveAction'){
                    this.gradeStandardList[i].secondHaveAction = this.gradeStandardList[i].secondHaveAction == true?false:true;
                }else if(type == 'secondHaveHealth'){
                    this.gradeStandardList[i].secondHaveHealth = this.gradeStandardList[i].secondHaveHealth == true?false:true;
                }else if(type == 'secondHaveContest'){
                    this.gradeStandardList[i].secondHaveContest = this.gradeStandardList[i].secondHaveContest == true?false:true;
                }
          }
      }
    },
    pageToList() {
      //返回
      this.$router.go(-1);
    },

    getSchoolSportConfig() {
      var vm = this;
      this.gradeStandardList = [];
      this.$axios.get("/v1/sports/learn/querySchoolSportstandard").then(res => {
        if (res.data.code == 10000) {
            let response =  res.data.response;
            for(let i=0;i<response.length;i++){
              let showInfo={
                  grade:response[i].grade,
                  learnPercent: response[i].learnPercent,
                  homeworkPercent: response[i].homeworkPercent,
                  testPercent: response[i].testPercent,
                  actionPercent: response[i].actionPercent,
                  healthPercent: response[i].healthPercent,
                  athleticContestScore: response[i].athleticContestScore,
                  learnPercentCheck: response[i].learnPercent==null?false:true,
                  homeworkPercentCheck: response[i].homeworkPercent==null?false:true,
                  testPercentCheck: response[i].testPercent==null?false:true,
                  actionPercentCheck: response[i].actionPercent==null?false:true,
                  healthPercentCheck: response[i].healthPercent==null?false:true,
                  athleticContestScoreCheck: response[i].athleticContestScore==null?false:true,
                  firstHaveTest:response[i].firstHaveTest=="2"?false:true,
                  firstHaveLearn:response[i].firstHaveLearn=="2"?false:true,
                  firstHaveExercise:response[i].firstHaveExercise=="2"?false:true,
                  firstHaveHomework:response[i].firstHaveHomework=="2"?false:true,
                  firstHaveAction:response[i].firstHaveAction=="2"?false:true,
                  firstHaveHealth:response[i].firstHaveHealth=="2"?false:true,
                  firstHaveContest:response[i].firstHaveContest=="2"?false:true,
                  secondHaveTest:response[i].secondHaveTest=="2"?false:true,
                  secondHaveLearn:response[i].secondHaveLearn=="2"?false:true,
                  secondHaveExercise:response[i].secondHaveExercise=="2"?false:true,
                  secondHaveHomework:response[i].secondHaveHomework=="2"?false:true,
                  secondHaveAction:response[i].secondHaveAction=="2"?false:true,
                  secondHaveHealth:response[i].secondHaveHealth=="2"?false:true,
                  secondHaveContest:response[i].secondHaveContest=="2"?false:true
              }
              this.gradeStandardList.push(showInfo);
            }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    baseSubmit() {
      var vm = this;
      let standardList = this.gradeStandardList;
      console.log(standardList);
      let saveList = [];
      for(let i=0;i<standardList.length;i++){
         let gradeName = standardList[i].grade==1?"一年级":standardList[i].grade==2?"二年级":standardList[i].grade==3?"三年级":standardList[i].grade==4?"四年级":standardList[i].grade==5?"五年级":standardList[i].grade==6?"六年级":standardList[i].grade==7?"七年级":standardList[i].grade==8?"八年级":standardList[i].grade==9?"九年级":standardList[i].grade==10?"高一":standardList[i].grade==11?"高二":standardList[i].grade==12?"高三":""
         gradeName = "("+gradeName+")  ";
         let total = 0;
         if(standardList[i].learnPercentCheck==true && (!standardList[i].learnPercent || standardList[i].learnPercent <= 0) ){
              vm.$Message.info(gradeName+"选定的考核项目，得分配置不能为空和负数！");
              return false;
         }
         if(standardList[i].homeworkPercentCheck==true && (!standardList[i].homeworkPercent || standardList[i].homeworkPercent <= 0) ){
              vm.$Message.info(gradeName+"选定的考核项目，得分配置不能为空和负数！");
              return false;
         }
         if(standardList[i].testPercentCheck==true && (!standardList[i].testPercent || standardList[i].testPercent <= 0) ){
              vm.$Message.info(gradeName+"选定的考核项目，得分配置不能为空和负数！");
              return false;
         }
         if(standardList[i].actionPercentCheck==true && (!standardList[i].actionPercent || standardList[i].actionPercent <= 0) ){
              vm.$Message.info(gradeName+"选定的考核项目，得分配置不能为空和负数！");
              return false;
         }
         if(standardList[i].healthPercentCheck==true && (!standardList[i].healthPercent || standardList[i].healthPercent <= 0) ){
              vm.$Message.info(gradeName+"选定的考核项目，得分配置不能为空和负数！");
              return false;
         }
         if(standardList[i].athleticContestScoreCheck==true && (!standardList[i].athleticContestScore || standardList[i].athleticContestScore <= 0) ){
              vm.$Message.info(gradeName+"选定的考核项目，得分配置不能为空和负数！");
              return false;
         }

        if(standardList[i].learnPercentCheck==true){
                total = total + Number(standardList[i].learnPercent);
        }else{
            standardList[i].firstHaveLearn=false;
            standardList[i].secondHaveLearn=false;
        }
        if(standardList[i].homeworkPercentCheck==true){
                total = total + Number(standardList[i].homeworkPercent);
        }else{
            standardList[i].firstHaveHomework=false;
            standardList[i].secondHaveHomework=false;
        }
        if(standardList[i].testPercentCheck==true){
                total = total + Number(standardList[i].testPercent);
        }else{
            standardList[i].firstHaveTest=false;
            standardList[i].secondHaveTest=false;
        }
        if(standardList[i].actionPercentCheck==true){
                total = total + Number(standardList[i].actionPercent);
        }else{
            standardList[i].firstHaveAction=false;
            standardList[i].secondHaveAction=false;
        }
        if(standardList[i].healthPercentCheck==true){
                total = total + Number(standardList[i].healthPercent);
        }else{
            standardList[i].firstHaveHealth=false;
            standardList[i].secondHaveHealth=false;
        }
        if(standardList[i].athleticContestScoreCheck == false){
            standardList[i].firstHaveContest=false;
            standardList[i].secondHaveContest=false;
        }
        if(total != 0 && total != 100){
            vm.$Message.info(gradeName+"选定的考核项目，得分配置总和必须为100%");
            return false;
        }
          let showInfo={
              grade:standardList[i].grade,
              learnPercent:standardList[i].learnPercent,
              homeworkPercent:standardList[i].homeworkPercent,
              testPercent:standardList[i].testPercent,
              actionPercent:standardList[i].actionPercent,
              healthPercent:standardList[i].healthPercent,
              athleticContestScore:standardList[i].athleticContestScore,
              firstHaveTest:standardList[i].firstHaveTest==true?"1":"2",
              firstHaveLearn:standardList[i].firstHaveLearn==true?"1":"2",
              firstHaveExercise:standardList[i].firstHaveExercise==true?"1":"2",
              firstHaveHomework:standardList[i].firstHaveHomework==true?"1":"2",
              firstHaveAction:standardList[i].firstHaveAction==true?"1":"2",
              firstHaveHealth:standardList[i].firstHaveHealth==true?"1":"2",
              firstHaveContest:standardList[i].firstHaveContest==true?"1":"2",
              secondHaveTest:standardList[i].secondHaveTest==true?"1":"2",
              secondHaveLearn:standardList[i].secondHaveLearn==true?"1":"2",
              secondHaveExercise:standardList[i].secondHaveExercise==true?"1":"2",
              secondHaveHomework:standardList[i].secondHaveHomework==true?"1":"2",
              secondHaveAction:standardList[i].secondHaveAction==true?"1":"2",
              secondHaveHealth:standardList[i].secondHaveHealth==true?"1":"2",
              secondHaveContest:standardList[i].secondHaveContest==true?"1":"2",
          }
          saveList.push(showInfo);
      }
      this.$axios.post("/v1/sports/learn/saveSchoolSportstandard", saveList)
        .then(function(response) {
          if (response.data.code == 10000) {
            vm.$Message.info("保存成功");
            vm.getSchoolSportConfig();
          } else {
            vm.$Message.info("保存失败");
          }
        })
        .catch(function(response) {
          vm.$Message.info("保存失败");
        });
    },
  },
  mounted() {
    var vm = this;
    vm.getSchoolSportConfig();
  },
  destroyed() {}
};
</script>
