<style>
    .sportsClassStandard .ivu-form .ivu-form-item-label {
        text-align: left;
        font-size: 15px;
        font-weight:bold;
    }
    .sportsClassStandard .ivu-form-item-content {
        font-size: 15px;
    }
    .sportsClassStandard .ivu-input {
        font-size: 15px;
    }
    .formitemrow{
        margin-left: -190px;
    }
    .formitemrow2{
        margin-left: -180px;
    }

</style>

<template>
  <div class="sportsClassStandard" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">评分标准</h2>
    </div>
    <div v-if="schoolDistrict != '1000'">
                 <Card style='margin-bottom:20px;'>
                   <p style="margin-top:30px;margin-left:5px;margin-bottom:30px;" >
                        <p>学习态度分值按照100分计算考核。</p></br>
                        <p>评分采用扣分制，配置单项所需扣的分值即可。</p></br>
                        <!-- 单次扣分，最多保留两位小数。 -->
                    </p>
                </Card>
                <Form ref="sportsStandard" :model="sportsStandard" :label-width="150">
                    <Card style='margin-bottom:20px;'>
                    <FormItem label="出勤（扣分制）：" style="margin-bottom:0px;">
                        <br/>
                        <Row>
                            <Col span="24" class="formitemrow">
                            <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;旷课单次扣分：</Label>
                            <Input v-model="sportsStandard.truancyScore" placeholder="旷课单次扣分"  style="width:120px;margin-right:30px;" :maxlength="255" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;病假单次扣分：
                            <Input v-model="sportsStandard.sickScore" placeholder="病假单次扣分"  style="width:120px;margin-right:30px;" :maxlength="255" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事假单次扣分：
                                <Input v-model="sportsStandard.thingScore" placeholder="事假单次扣分"  style="width:120px;margin-right:30px;" :maxlength="255" />
                            </Col>
                        </Row>
                        <Row style="margin-top:5px;" >
                            <Col span="24" class="formitemrow">
                            <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;迟到单次扣分：</Label>
                                <Input v-model="sportsStandard.lateScore" placeholder="迟到单次扣分"  style="width:120px;margin-right:30px;" :maxlength="255" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;早退单次扣分：
                                <Input v-model="sportsStandard.earlyScore" placeholder="早退单次扣分"  style="width:120px;" :maxlength="255" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大课间缺席单次扣分：
                                <Input v-model="sportsStandard.bigAbsentScore" placeholder="大课间缺席单次扣分"  style="width:120px;" :maxlength="255" />
                            </Col>
                        </Row>
                    </FormItem>
                    </Card>
                     <Card style='margin-bottom:20px;'>
                    <FormItem label="课堂表现(扣分制)：" style="margin-bottom:0px;">
                        <br/>
                       <Row>
                            <Col span="24" class="formitemrow2">
                            <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
<!--                            <Input v-model="sportsStandard.notSeriousScore" placeholder="不认真单次扣分"  style="width:120px;margin-right:30px;" :maxlength="255" />-->
                            违反纪律单次扣分：
                            <Input v-model="sportsStandard.violateDisciplineScore" placeholder="违反纪律单次扣分"  style="width:120px;margin-right:30px;" :maxlength="255" />
                                运着装不符单次扣分：
                                <Input v-model="sportsStandard.notAccordClothingScore" placeholder="运着装不符单次扣分"  style="width:120px;" :maxlength="255" />
                                &nbsp;&nbsp;大课间违反纪律单次扣分：
                                <Input v-model="sportsStandard.bigViolateDisciplineScore" placeholder="大课间违反纪律单次扣分"  style="width:150px;" :maxlength="255" />
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
    <div v-if="schoolDistrict == '1000'">
        <Card style='margin-bottom:20px;'>
            <p style="margin-top:5px;margin-left:5px;margin-bottom:5px;" >
                学习态度成绩按照100分计算考核</br>
                评分采用扣分制，根据每项所扣分数和扣分次数，计算最后成绩。</br>
                缺席课堂教学次数占实际总授课课时数三分之一及以上（含旷课、病假、事假），学习态度成绩直接记为0</br>
            </p>
        </Card>
        <Card style='margin-bottom:20px;'>
            <p style="margin-top:5px;margin-left:5px;margin-bottom:5px;" >
                大课间表现（扣分制）：</br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                缺席：2分
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;违反纪律：2分
            </p>
        </Card>
        <Card style='margin-bottom:10px;'>
            <p style="margin-top:10px;margin-left:5px;margin-bottom:10px;" >
                课堂表现（扣分制）：</br></br>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    旷课单次扣分：6分
                    &nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    迟到单次扣分：1分
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    早退单次扣分：1分
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    违反纪律单次扣分：1分</br></br>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    运动着装不符单次扣分：2分
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    病假单次扣分：0分
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    事假单次扣分：0分
<!--                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--                    不认真单次扣分：0分-->
            </p>
        </Card>
    </div>
</div>
</template>

<script>

import md5 from 'js-md5';

export default {
    name: 'organInfo'
    ,data(){
        return {
            schoolDistrict:'',
            sportsStandard:{
                classStandardId:'',
                schoolId:"",
                truancyScore:"",
                sickScore:"",
                thingScore:"",
                lateScore:"",
                earlyScore:"",
                notSeriousScore:"",
                violateDisciplineScore:"",
                notAccordClothingScore:"",
                bigViolateDisciplineScore:"",
                bigAbsentScore:"",
            },
        }
    }
    ,methods:{
        querySchoolStandard(){
            this.$axios.get("/v1/sports/learn/querySportsClassStandard").then(res => {
               if(res.data.code==10000){
                    this.sportsStandard = res.data.response;
                    if(this.sportsStandard.truancyScore != null){
                        this.sportsStandard.truancyScore =this.sportsStandard.truancyScore/100;
                    }
                    if(this.sportsStandard.sickScore != null){
                        this.sportsStandard.sickScore =this.sportsStandard.sickScore/100;
                    }
                    if(this.sportsStandard.thingScore != null){
                        this.sportsStandard.thingScore =this.sportsStandard.thingScore/100;
                    }
                    if(this.sportsStandard.lateScore != null){
                        this.sportsStandard.lateScore =this.sportsStandard.lateScore/100;
                    }
                    if(this.sportsStandard.earlyScore != null){
                        this.sportsStandard.earlyScore =this.sportsStandard.earlyScore/100;
                    }
                    if(this.sportsStandard.notSeriousScore != null){
                        this.sportsStandard.notSeriousScore =this.sportsStandard.notSeriousScore/100;
                    }
                    if(this.sportsStandard.violateDisciplineScore != null){
                        this.sportsStandard.violateDisciplineScore =this.sportsStandard.violateDisciplineScore/100;
                    }
                    if(this.sportsStandard.notAccordClothingScore != null){
                        this.sportsStandard.notAccordClothingScore =this.sportsStandard.notAccordClothingScore/100;
                    }
                    if(this.sportsStandard.bigViolateDisciplineScore != null){
                        this.sportsStandard.bigViolateDisciplineScore =this.sportsStandard.bigViolateDisciplineScore/100;
                    }
                    if(this.sportsStandard.bigAbsentScore != null){
                        this.sportsStandard.bigAbsentScore =this.sportsStandard.bigAbsentScore/100;
                    }
                    if(this.sportsStandard.learnPercent == null){
                        this.sportsStandard.learnPercent=0;
                    }
               }
             });
        },

        saveSchoolStandard(){
            var regs = /^[0-9]+(.[0-9]{1,2})?$/;
            console.log(this.sportsStandard)
            if(!regs.test(this.sportsStandard.truancyScore )
               || !regs.test(this.sportsStandard.sickScore)
               || !regs.test(this.sportsStandard.thingScore)
               || !regs.test(this.sportsStandard.lateScore)
               || !regs.test(this.sportsStandard.earlyScore)
            //    || !regs.test(this.sportsStandard.notSeriousScore)
               || !regs.test(this.sportsStandard.bigViolateDisciplineScore)
               || !regs.test(this.sportsStandard.bigAbsentScore)
               || !regs.test(this.sportsStandard.violateDisciplineScore)
               || !regs.test(this.sportsStandard.notAccordClothingScore)){
                this.$Message.error("请完成扣分配置，单次扣分最多填写2位小数！");
                return false;
            }
            let savesportsStandard={
                classStandardId:this.sportsStandard.classStandardId,
                schoolId:this.sportsStandard.schoolId,
                truancyScore:(this.sportsStandard.truancyScore*100).toFixed(),
                sickScore:(this.sportsStandard.sickScore*100).toFixed(),
                thingScore:(this.sportsStandard.thingScore*100).toFixed(),
                lateScore:(this.sportsStandard.lateScore*100).toFixed(),
                earlyScore:(this.sportsStandard.earlyScore*100).toFixed(),
                // notSeriousScore:(this.sportsStandard.notSeriousScore*100).toFixed(),
                violateDisciplineScore:(this.sportsStandard.violateDisciplineScore*100).toFixed(),
                bigViolateDisciplineScore:(this.sportsStandard.bigViolateDisciplineScore*100).toFixed(),
                bigAbsentScore:(this.sportsStandard.bigAbsentScore*100).toFixed(),
                notAccordClothingScore:(this.sportsStandard.notAccordClothingScore*100).toFixed(),
            }
            this.$axios.post("/v1/sports/learn/upsertSportsClassStandard",savesportsStandard).then(res => {
               if(res.data.code==10000){
                    this.$Message.success('保存成功！');
                    this.querySchoolStandard();
               }else{
                    this.$Message.success(res.data.msg);
                    this.querySchoolStandard();
               }
             });
        }
    }
    ,mounted(){
        this.querySchoolStandard();
        let schoolType = sessionStorage.getItem('schoolType');
        let schoolDistrict = sessionStorage.getItem('schoolDistrict');
        if (schoolType == '2' || schoolType == '3') {
            if(schoolDistrict == '1000'){
                this.schoolDistrict = schoolDistrict;
            }
        }
    }
};
</script>
