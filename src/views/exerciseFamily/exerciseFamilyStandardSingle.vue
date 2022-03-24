<style>
    
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">课后作业标准配置</h2>
    </div>
    <div style="font-size:15px;">
                <Form ref="unirunInfo" :model="standard" :label-width="14">
                  <Card>
                    <div style="width:600px;padding:10px;" >
                       简易模式<br/>
                       采用课后作业簿方式完成课后作业考核。<br/>
                        流程为：<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;1、按年级设定课后作业学期考核次数(不低于区教育局规定次数)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;2、老师布置日常课后作业<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;3、学生记录课后作业内容<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;4、家长监督学生完成作业并签字确认<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;5、老师在系统中根据作业簿录入课后作业考核完成次数<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;6、系统自动计算考核成绩<br/>
                    </div>
                    
                    <FormItem label="" style="margin-bottom:0px;">
                        <div>当前学期：{{yearSemesterName}}<span v-if="holiday" >({{holiday}})</span><span v-if="haveTf" style="margin-left:20px;">未设置</span></div>
                        <Row style="margin-top:5px;"> 
                            <Col v-if="schoolType == '2'" style="margin-top:5px;" span="20"> 
                                <Label>一年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_1"  :maxlength="20" />&nbsp;次
                               
                            </Col>
                            <Col v-if="schoolType == '2'"  style="margin-top:5px;" span="20"> 
                                <Label>二年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_2"  :maxlength="20" />&nbsp;次
                               
                            </Col>
                            <Col v-if="schoolType == '2'"  style="margin-top:5px;" span="20"> 
                                <Label>三年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_3"  :maxlength="20" />&nbsp;次
                                
                            </Col>
                            <Col v-if="schoolType == '2'"  style="margin-top:5px;" span="20"> 
                                <Label>四年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_4"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '2'"  style="margin-top:5px;" span="20"> 
                                <Label>五年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_5"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '2'"  style="margin-top:5px;" span="20"> 
                                <Label>六年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_6"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '3'"  style="margin-top:5px;" span="20"> 
                                <Label>七年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_7"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '3'"  style="margin-top:5px;" span="20"> 
                                <Label>八年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_8"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '3'"  style="margin-top:5px;" span="20"> 
                                <Label>九年级：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_9"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '4'"  span="20"> 
                                <Label>高一：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_10"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '4'"  style="margin-top:5px;" span="20"> 
                                <Label>高二：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_11"  :maxlength="20" />&nbsp;次
                            </Col>
                            <Col v-if="schoolType == '4'"  style="margin-top:5px;" span="20"> 
                                <Label>高三：</Label>
                                <Label style="margin-left:30px;">总次数：</Label><Input style="width:80px;"  v-model="standard.count_grade_12"  :maxlength="20" />&nbsp;次
                            </Col>
                        </Row>
                    </FormItem>     
                     </Card>
                    <Row>
                        <div style="margin-top:10px;padding-left:46%">
                            <Button  style="float:left;width:100px" @click="saveSchoolStandard"  type="success">保存</Button>
                        </div>    
                    </Row>                                                                                                        
            </Form>
    </div>
</div>
</template>

<script>

import md5 from 'js-md5';

export default {
    name: 'organInfo'
    ,data(){
        return {
            standard:{
                count_grade_1:"",
                count_grade_2:"",
                count_grade_3:"",
                count_grade_4:"",
                count_grade_5:"",
                count_grade_6:"",
                count_grade_7:"",
                count_grade_8:"",
                count_grade_9:"",
                count_grade_10:"",
                count_grade_11:"",
                count_grade_12:"",
                
                time_grade_1:"",
                time_grade_2:"",
                time_grade_3:"",
                time_grade_4:"",
                time_grade_5:"",
                time_grade_6:"",
                time_grade_7:"",
                time_grade_8:"",
                time_grade_9:"",
                time_grade_10:"",
                time_grade_11:"",
                time_grade_12:"",

                comboCount_1:"",
                comboCount_2:"",
                comboCount_3:"",
                comboCount_4:"",
                comboCount_5:"",
                comboCount_6:"",
                comboCount_7:"",
                comboCount_8:"",
                comboCount_9:"",
                comboCount_10:"",
                comboCount_11:"",
                comboCount_12:"",

                describe_1:"",
                describe_2:"",
                describe_3:"",
                describe_4:"",
                describe_5:"",
                describe_6:"",
                describe_7:"",
                describe_8:"",
                describe_9:"",
                describe_10:"",
                describe_11:"",
                describe_12:"",


            },
            schoolType:"",
            yearSemesterName:"",
            holiday:'',
            haveTf:false
        }
    }
    ,methods:{
        querySchoolStandard(){
            this.$axios.get("/v1/exercise/family/querySchoolExerciseFamilyStandard?schoolId="+sessionStorage.getItem('schoolId')+"&schoolType="+sessionStorage.getItem('schoolType')).then(res => {
               if(res.data.code==10000){
                   var vm=this;
                    let list = res.data.response;
                    if(list != null && list.length== 1 && !list[0].familyStandardId){
                        vm.haveTf=true
                    }
                    if(list != null && list.length > 0){
                        this.yearSemesterName = list[0].yearSemesterName;
                        let yearSemester=list[0].yearSemester;
                        let semesterOver=list[0].semesterOver;

                        // console.log(semesterOver==="0")
                        if(semesterOver==="0"){
                            let semester=(yearSemester+"").substr(4,1);
                            //  console.log(semester)
                            if(semester=="1"){
                                this.holiday="暑假"
                            }else{
                                this.holiday="寒假"
                            }
                        }
                        for(let i=0;i<list.length;i++){
                                if(list[i].grade == 1){
                                    this.standard.count_grade_1=list[i].exerciseCount;
                                    this.standard.time_grade_1=list[i].exerciseTime;
                                    this.standard.comboCount_1=list[i].comboCount;
                                    this.standard.describe_1=list[i].exerciseDescribe;
                                }else if(list[i].grade == 2){
                                    this.standard.count_grade_2=list[i].exerciseCount;
                                    this.standard.time_grade_2=list[i].exerciseTime;
                                    this.standard.comboCount_2=list[i].comboCount;
                                    this.standard.describe_2=list[i].exerciseDescribe;
                                }else if(list[i].grade == 3){
                                    this.standard.count_grade_3=list[i].exerciseCount;
                                    this.standard.time_grade_3=list[i].exerciseTime;
                                    this.standard.comboCount_3=list[i].comboCount;
                                    this.standard.describe_3=list[i].exerciseDescribe;
                                }else if(list[i].grade == 4){
                                    this.standard.count_grade_4=list[i].exerciseCount;
                                    this.standard.time_grade_4=list[i].exerciseTime;
                                    this.standard.comboCount_4=list[i].comboCount;
                                    this.standard.describe_4=list[i].exerciseDescribe;
                                }else if(list[i].grade == 5){
                                    this.standard.count_grade_5=list[i].exerciseCount;
                                    this.standard.time_grade_5=list[i].exerciseTime;
                                    this.standard.comboCount_5=list[i].comboCount;
                                    this.standard.describe_5=list[i].exerciseDescribe;
                                }else if(list[i].grade == 6){
                                    this.standard.count_grade_6=list[i].exerciseCount;
                                    this.standard.time_grade_6=list[i].exerciseTime;
                                    this.standard.comboCount_6=list[i].comboCount;
                                    this.standard.describe_6=list[i].exerciseDescribe;
                                }else if(list[i].grade == 7){
                                    this.standard.count_grade_7=list[i].exerciseCount;
                                    this.standard.time_grade_7=list[i].exerciseTime;
                                    this.standard.comboCount_7=list[i].comboCount;
                                    this.standard.describe_7=list[i].exerciseDescribe;
                                }else if(list[i].grade == 8){
                                    this.standard.count_grade_8=list[i].exerciseCount;
                                    this.standard.time_grade_8=list[i].exerciseTime;
                                    this.standard.comboCount_8=list[i].comboCount;
                                    this.standard.describe_8=list[i].exerciseDescribe;
                                }else if(list[i].grade == 9){
                                    this.standard.count_grade_9=list[i].exerciseCount;
                                    this.standard.time_grade_9=list[i].exerciseTime;
                                    this.standard.comboCount_9=list[i].comboCount;
                                    this.standard.describe_9=list[i].exerciseDescribe;
                                }else if(list[i].grade == 10){
                                    this.standard.count_grade_10=list[i].exerciseCount;
                                    this.standard.time_grade_10=list[i].exerciseTime;
                                    this.standard.comboCount_10=list[i].comboCount;
                                    this.standard.describe_10=list[i].exerciseDescribe;
                                }else if(list[i].grade == 11){
                                    this.standard.count_grade_11=list[i].exerciseCount;
                                    this.standard.time_grade_11=list[i].exerciseTime;
                                    this.standard.comboCount_11=list[i].comboCount;
                                    this.standard.describe_11=list[i].exerciseDescribe;
                                }else if(list[i].grade == 12){
                                    this.standard.count_grade_12=list[i].exerciseCount;
                                    this.standard.time_grade_12=list[i].exerciseTime;
                                    this.standard.comboCount_12=list[i].comboCount;
                                    this.standard.describe_12=list[i].exerciseDescribe;
                                }
                        }
                    }
               }
             });
        },
        saveSchoolStandard(){
            let saveList = [];
            let standar = {};
            if(this.schoolType == '2'){
                standar={
                    itemLevelCode:1,
                    grade:1,
                    exerciseCount:this.standard.count_grade_1==null || this.standard.count_grade_1==""?0:this.standard.count_grade_1,
                    exerciseTime:this.standard.time_grade_1==null || this.standard.time_grade_1==""?0:this.standard.time_grade_1,
                    exerciseDescribe:this.standard.describe_1==null || this.standard.describe_1==""?" ":this.standard.describe_1
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:2,
                    exerciseCount:this.standard.count_grade_2==null || this.standard.count_grade_2==""?0:this.standard.count_grade_2,
                    exerciseTime:this.standard.time_grade_2==null || this.standard.time_grade_2==""?0:this.standard.time_grade_2,
                    exerciseDescribe:this.standard.describe_2==null || this.standard.describe_2==""?" ":this.standard.describe_2
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:3,
                    exerciseCount:this.standard.count_grade_3==null || this.standard.count_grade_3==""?0:this.standard.count_grade_3,
                    exerciseTime:this.standard.time_grade_3==null || this.standard.time_grade_3==""?0:this.standard.time_grade_3,
                    exerciseDescribe:this.standard.describe_3==null || this.standard.describe_3==""?" ":this.standard.describe_3
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:4,
                    exerciseCount:this.standard.count_grade_4==null || this.standard.count_grade_4==""?0:this.standard.count_grade_4,
                    exerciseTime:this.standard.time_grade_4==null || this.standard.time_grade_4==""?0:this.standard.time_grade_4,
                    exerciseDescribe:this.standard.describe_4==null || this.standard.describe_4==""?" ":this.standard.describe_4
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:5,
                    exerciseCount:this.standard.count_grade_5==null || this.standard.count_grade_5==""?0:this.standard.count_grade_5,
                    exerciseTime:this.standard.time_grade_5==null || this.standard.time_grade_5==""?0:this.standard.time_grade_5,
                    exerciseDescribe:this.standard.describe_5==null || this.standard.describe_5==""?" ":this.standard.describe_5
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:6,
                    exerciseCount:this.standard.count_grade_6==null || this.standard.count_grade_6==""?0:this.standard.count_grade_6,
                    exerciseTime:this.standard.time_grade_6==null || this.standard.time_grade_6==""?0:this.standard.time_grade_6,
                    exerciseDescribe:this.standard.describe_6==null || this.standard.describe_6==""?" ":this.standard.describe_6
                }
                saveList.push(standar);
            }else if(this.schoolType == '3'){
                standar={
                    itemLevelCode:1,
                    grade:7,
                    exerciseCount:this.standard.count_grade_7==null || this.standard.count_grade_7==""?0:this.standard.count_grade_7,
                    exerciseTime:this.standard.time_grade_7==null || this.standard.time_grade_7==""?0:this.standard.time_grade_7,
                    exerciseDescribe:this.standard.describe_7==null || this.standard.describe_7==""?" ":this.standard.describe_7
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:8,
                    exerciseCount:this.standard.count_grade_8==null || this.standard.count_grade_8==""?0:this.standard.count_grade_8,
                    exerciseTime:this.standard.time_grade_8==null || this.standard.time_grade_8==""?0:this.standard.time_grade_8,
                    exerciseDescribe:this.standard.describe_8==null || this.standard.describe_8==""?" ":this.standard.describe_8
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:9,
                    exerciseCount:this.standard.count_grade_9==null || this.standard.count_grade_9==""?0:this.standard.count_grade_9,
                    exerciseTime:this.standard.time_grade_9==null || this.standard.time_grade_9==""?0:this.standard.time_grade_9,
                    exerciseDescribe:this.standard.describe_9==null || this.standard.describe_9==""?" ":this.standard.describe_9
                }
                saveList.push(standar);
            }else if(this.schoolType == '4'){
                standar={
                    itemLevelCode:1,
                    grade:10,
                    exerciseCount:this.standard.count_grade_10==null || this.standard.count_grade_10==""?0:this.standard.count_grade_10,
                    exerciseTime:this.standard.time_grade_10==null || this.standard.time_grade_10==""?0:this.standard.time_grade_10,
                    exerciseDescribe:this.standard.describe_10==null || this.standard.describe_10==""?" ":this.standard.describe_10
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:11,
                    exerciseCount:this.standard.count_grade_11==null || this.standard.count_grade_11==""?0:this.standard.count_grade_11,
                    exerciseTime:this.standard.time_grade_11==null || this.standard.time_grade_11==""?0:this.standard.time_grade_11,
                    exerciseDescribe:this.standard.describe_11==null || this.standard.describe_11==""?" ":this.standard.describe_11
                }
                saveList.push(standar);
                standar={
                    itemLevelCode:1,
                    grade:12,
                    exerciseCount:this.standard.count_grade_12==null || this.standard.count_grade_12==""?0:this.standard.count_grade_12,
                    exerciseTime:this.standard.time_grade_12==null || this.standard.time_grade_12==""?0:this.standard.time_grade_12,
                    exerciseDescribe:this.standard.describe_12==null || this.standard.describe_12==""?" ":this.standard.describe_12
                }
                saveList.push(standar);
            }
            this.$axios.post("/v1/exercise/family/saveSchoolExerciseFamilyStandardStatus",saveList).then(res => {
                this.$Message.destroy()
               if(res.data.code==10000){
                    this.$Message.success('保存成功！');
                    this.querySchoolStandard();
               }else{
                    this.$Message.success(res.data.msg);
                    this.querySchoolStandard();
               }
             });
        },
        addCombo(gradeId){
            var vm=this;
            sessionStorage.setItem(
        'exerciseFamilyStandard-exerciseComboList-gradeId',
        gradeId
      )
      this.$router.push({ name: 'exerciseComboList' })
        }          
    }    
    ,mounted(){
         this.schoolType = sessionStorage.getItem('schoolType');
         this.querySchoolStandard();
    }  
};
</script>