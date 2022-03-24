<template>
    <div class="title-msg">
        <div class="flex">
        
            <span style="padding-right:5px">{{titleData.middleItemName}}</span>
            <div class="exam-status">{{titleData.testType == 1?'选考':'必考'}}</div>
            <p v-if="titleData.physicalScoreVOS.length > 0" style="padding-right:25px">项目最好成绩：{{maxNumber}}</p>
            <p v-if="titleData.physicalScoreVOS.length > 0 ">项目最终得分：{{titleData.maxScore|| 0}}分</p>
            <p v-if="titleData.physicalScoreVOS.length == 0 && testStatus == 1">免考</p>
           
        </div>
    </div>
</template>
<script>
export default {
    props:[
        'titleMsg',
        'testStatus',
    ],
    data() {
        return {
            titleData:this.titleMsg,
            maxNumber:this.computedCore(this.titleMsg),
        }
    },
    created() {

    },
    methods:{
      computedCore(obj) {
        let text,mine,sconed;
        if(obj.unit == "分.秒") {
          if(!obj.maxAchievementValue && typeof(obj.maxAchievementValue)!='undefined' && obj.maxAchievementValue!=0) {
            text = '';
          }else {
            mine = parseInt(Number(obj.maxAchievementValue)/60);
            sconed = obj.maxAchievementValue%60;
            text = `${mine}'${sconed}"`
          }
        }else {
          text = `${obj.maxAchievementValue}${obj.unit}`
        };
        return text;
      }
    }
}
</script>
<style lang="less" scoped>
    .title-msg{
        width: 100%;
        margin-top:15px;
    }
    .flex {
        width: 100%;
        display: flex;
        align-items: center;
    }
    .exam-status{
        width: 50px;
        height: 18px;
        margin-right: 10px;
        background: #00C693;
        border-radius: 3px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        // line-height: 26px;
    }
</style>