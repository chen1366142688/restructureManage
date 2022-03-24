<template>
  <div class="class-set">
    <Card>
      <div>
        <div style="margin-bottom: 16px; font-size: 18px">{{activityType=='1'?'测试':'考核'}}班级设置</div>
        <div :class="gradeAllMessage.length-1==index?'checkbox-all check-last-child':'checkbox-all'" v-for="(item,index) in gradeAllMessage" :key="index">
            <div class="grade-check">
                <Checkbox
                    :value="item.checkAll"
                    @on-change="allCheck=>handleCheckAll(allCheck,index)">{{item.grade.gradeName}}</Checkbox>
            </div>
            <div class="class-check">
              <CheckboxGroup v-model="item.checkAllGroup" @on-change="checked=>checkAllGroupChange(checked,index)">
                <Checkbox class="checked-item" :label="classItem.classId" v-for="(classItem,classIndex) in item.classVOS" :key="classIndex">{{classItem.studentClass}}班</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
      </div>
    </Card>
  </div>
</template>
<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
export default {
  props:[
    'activityType',
    'changeGradeList'
  ],
  data() {
    return {
      gradeAllMessage:[
        {
          checkAll:false,//年级全选
          checkAllGroup: [],//选择的班级
          grade:{gradeName:'七年级',id:7},
          class:[
            {className:'七年级1班',id:71},
            {className:'七年级2班',id:72},
            {className:'七年级3班',id:73},
            {className:'七年级4班',id:74},
          ]
        },
        {
          checkAll:false,//年级全选
          checkAllGroup: [],//选择的班级
          grade:{gradeName:'八年级',id:8},
          class:[
            {className:'八年级1班',id:81},
            {className:'八年级2班',id:82},
            {className:'八年级3班',id:83},
            {className:'八年级4班',id:84},
          ]
        },
        {
          checkAll:false,//年级全选
          checkAllGroup: [],//选择的班级
          grade:{gradeName:'九年级',id:9},
          class:[
            {className:'九年级1班',id:91},
            {className:'九年级2班',id:92},
            {className:'九年级3班',id:93},
            {className:'九年级4班',id:94},
          ]
        },
      ]
    }
  },
  created() {
    this.queryGradeList()
  },
  watch:{
    activityType(newVal,old) {
    },
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    async queryGradeList() { //查询年级班级列表
      let res = await api.queryGradeClass({activityType:this.activityType});
      if(res.data.code == 10000) {
        this.gradeAllMessage = this.addMsgGradeList(res.data.response);
      }
    },
    reproductionData(arr) {//进来页面复现数据
      let changeGradeList = this.changeGradeList,newArr;
      if(changeGradeList.length) {
        newArr = arr.map((item)=>{
          let classList = item.classVOS;
          changeGradeList.map((changeItem)=>{
            if(item.grade.id == changeItem.gradeId) {
              changeItem.classIds.forEach((chassId)=>{
                item.checkAllGroup.push(chassId);
              });
            }
          });
          if(item.checkAllGroup.length == classList.length) item.checkAll = true;
          return item;
        })
      }else {
        newArr = arr;
      };
      return newArr;
    },
    addMsgGradeList(arr) {//查询回来的年级班级数据添加额外的参数信息
      let newGrade = arr.map((item) => {
        item.checkAll = false;//年级全选
        item.checkAllGroup = [];//选择的班级 
        item.grade = {gradeName:`${this.transitionCn(item.grade)}年级`,id:item.grade};
        return item;
      });
      return this.reproductionData(newGrade)
      
    },
    selectClassId(arr) {//筛选重组班级id
      let arrId = arr.map((item)=>{
        return item.classId
      });
      return arrId
    },
    handleCheckAll(allCheck,index) { //选择当前全部年级
      let gradeAll = this.gradeAllMessage,currentGrade = this.gradeAllMessage[index];
      if(allCheck) {
        currentGrade.checkAllGroup = this.selectClassId(currentGrade.classVOS);
      }else {
        currentGrade.checkAllGroup = [];
      }
      currentGrade.checkAll = allCheck;
      gradeAll[index] = currentGrade;
      this.gradeAllMessage = gradeAll;
      this.selectedClass();
    },
    checkAllGroupChange(checkedIds,classIndex) { //班级的多选项
      let gradeAll = this.gradeAllMessage,currentGrade = this.gradeAllMessage[classIndex];
      let classIds = this.selectClassId(currentGrade.classVOS);
      if(classIds.length == checkedIds.length) {
        currentGrade.checkAll = true;
      }else currentGrade.checkAll = false;
      gradeAll[classIndex] = currentGrade;
      this.gradeAllMessage = gradeAll;
      this.selectedClass();
    },
    selectedClass() {//已选择班级集合
      let gradeList = this.gradeAllMessage,classObj={},parameter =[];
      gradeList.forEach(element => {
        if(element.checkAllGroup.length) {
          classObj = {
            gradeName:element.grade.gradeName,
            gradeId: element.grade.id,
            classIds: element.checkAllGroup,
            projectList:{
              unify:[],
              optional:[],
            },
          };
          parameter.push(classObj)
        }
      });
      let newParameter = [];
      if(this.changeGradeList.length) {
        newParameter = parameter.map((item)=>{
          this.changeGradeList.map((child)=>{
            if(item.gradeId == child.gradeId) {
              child.classIds = item.classIds;
              item = child;
            }
          });
          return item;
        });
      }else {
        newParameter = parameter
      }
      this.$emit('changeGrade',newParameter);
    }
  }
}
</script>
<style lang="less" scoped>
  .class-set{
    margin-top:20px;
  }
  .checkbox-all{
    min-height:120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #DCDEE2;
    .class-check{
      margin:31px 0 0 26px;
      .checked-item{
        margin-right:40px;
      }
    }
  }
  .check-last-child{
    border-bottom:none;
  }
</style>