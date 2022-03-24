<template>
  <div style="padding-left:10px">
    <div>
        <h2 style="margin-top:15px;margin-bottom:13px;">{{titleName}}自定义项目测试</h2>
    </div>
    <div>
      <Card>
        <div class="project-name">
          <span>名称：</span>
          <Input v-model="registerCode" @on-change='changeInput' placeholder="请输入自定义项目名称" :maxlength="50" style="width:200px;"/>
        </div>
      </Card>
    </div>
    <test-classset v-if="haveData" @changeGrade='changeGrade' :activityType="activityType" :changeGradeList="changeGradeList"></test-classset>
    <div class="test-set">
      <Card>
        <div>
          <div style="margin-bottom: 16px; font-size: 18px">测试项目设置</div>
          <div class="set-content">
            <div class="set-items" v-for="(item,index) in changeGradeList" :key="index">
              <div class="set-item">
                <div class="item-name">
                  {{item.gradeName}}—统一测试项目
                </div>
                <div class="item-content" >
                  <div class="all-project" v-for="(unifyChild,unifyIndex) in item.projectList.unify" :key="unifyIndex">
                    <div class="item-project">
                      <div class="project-nameTitle">{{unifyChild.classTestName}}</div>
                      <div class="project-type"><div>{{unifyChild.itemName}}</div></div>
                    </div>
                  </div>
                  <div v-if="!item.projectList.unify.length" class="no-data">
                    请配置项目
                  </div>
                </div>
                <div class="item-footer">
                  <span>项目总数：{{item.projectList.unify.length}}</span>
                  <div class="item-btn" @click="configuration(item.gradeId,'1')">配置</div>
                </div>
              </div>
              <div class="set-item">
                <div class="item-name">
                  {{item.gradeName}}—学生自选项目
                </div>
                <div class="item-content" >
                  <div class="all-project" v-for="(optionalChild,optionalIndex) in item.projectList.optional" :key="optionalIndex">
                    <div class="item-project">
                      <div class="project-nameTitle">{{optionalChild.classTestName}}</div>
                      <div class="project-type"><div>{{optionalChild.itemName}}</div></div>
                    </div>
                  </div>
                  <div v-if="!item.projectList.optional.length" class="no-data">
                    请配置项目
                  </div>
                </div>
                <div class="item-footer">
                  <span>项目总数：{{item.projectList.optional.length}}</span>
                  <div class="item-btn" @click="configuration(item.gradeId,'2')">配置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="footer-btn">
      <Button type="success" style="margin-right:25px" @click="save">保存</Button>
      <Button type="success" @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
import _ from 'lodash'
import testClassset from '@/components/testTable/testClassset.vue'
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
    testClassset,
  },
  data() {
    return {
      haveData:false,//是否应该渲染年级选择组件
      activityType:1,//测试类型 1：自定义测试 2：中考模拟测试
      registerCode:this.storeRegisterCode,//搜索条件
      changeGradeList:[],//选择的年级
      Activity:[], //选择了的配置项目
      activeGrades:[],//已选择的年级
      activeItems:[],//已选择的项目
      // titleName:'新增',
    }
  },
  created() {

  },
  computed: {
		...mapState({
			gradeState: state => state.pageParams.gradeList,
      ActivityItem: state => state.pageParams.ActivityItem,
      currentGrade: state => state.pageParams.currentGrade,
      storeRegisterCode: state => state.pageParams.registerCode,
		}),
    titleName() {
      return this.$route.query.title
    }
	},
   beforeRouteEnter(to, from, next) {
    next(vm => {
    // 通过 `vm` 访问组件实例
    let toPath = to.name,fromPath = from.name;
    if(fromPath == 'customTest') {
      if(vm.$route.query.activityId) {
        vm.getExamItemActivity();
      }else vm.haveData = true;
    }
    else vm.queryActivityItem();
  })
  },
  beforeRouteLeave(to,from,next) {
    if(to.name !='customConfig') {
      this.setGradeList([]);
      this.setActivity([]);
      this.setCurrentGrade({});
      this.setreGisterCode('');
    };
    next();
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    ...mapMutations('pageParams', ['setGradeList','setActivity','setCurrentGrade','setreGisterCode']),
    queryActivityItem() { //复现是否有选择的数据
      let Activity = this.ActivityItem||[];
      let gradeList = this.gradeState||[];
      if(gradeList) {
        this.changeGradeList = gradeList;
        let newList = gradeList.map((item)=>{
          let arrUnify = [],arrOptional=[],objList ={
            type:'',
            grade:'',
            arr:[],
          };
          Activity.map((activitChild)=>{
            if(activitChild.testType == '1') {
              arrUnify.push(activitChild);
              objList.type = '1';
              objList.grade = activitChild.grade
              objList.arr = arrUnify;
            }
            else {
              arrOptional.push(activitChild);
              objList.type = '2';
              objList.grade = activitChild.grade
              objList.arr = arrOptional;
            }
          });
          if(!Activity.length) {
            objList.type = this.currentGrade.type;
            objList.grade = this.currentGrade.gradeId;
            objList.arr = []
          }
          if(item.gradeId == objList.grade) {
            if(objList.type == '1') item.projectList.unify = objList.arr;
            else item.projectList.optional = objList.arr;
          }
          // item.projectList.unify = _.uniqBy(item.projectList.unify,'classTestId');
          // item.projectList.optional = _.uniqBy(item.projectList.optional,'classTestId ·')
          return item;
        });
        this.changeGradeList = newList;
      }
      this.registerCode = this.storeRegisterCode;
      this.haveData = true;
    },
    selectDataGrade(gradeList,activeItems) {//重组学校数据
      let newGradeList = gradeList.map((item)=>{
        let gradeItem = {
          gradeId: '',
          gradeName: "七年级",
          classIds:[],
          projectList:{
            optional:[],
            unify:[],
          },
        };
        let classIds = item.classVOS.map(classId => classId.classId);
        gradeItem.gradeId = item.grade;
        gradeItem.gradeName = `${this.transitionCn(item.grade)}年级`;
        gradeItem.classIds = classIds;
        activeItems.map((activityParent) => {
          let activityChild = activityParent.activityVOS;
          activityChild.map((child) => {
            if(child.grade == item.grade) {
              if(child.testType == '1') gradeItem.projectList.unify.push(child);
              else gradeItem.projectList.optional.push(child);
            }
          })
        });
        return gradeItem
      });
      this.changeGradeList = newGradeList;
      this.registerCode = this.storeRegisterCode;
      this.setGradeList(newGradeList);
      this.haveData = true;
    },
    async getExamItemActivity() {//查询活动详情
      let activityId = this.$route.query.activityId;
      let res = await api.getExamItemActivity({activityId:activityId});
      if(res.data.code == 10000) {
        this.setreGisterCode(res.data.response.activityName);
        this.activeGrades = res.data.response.grades;
        this.activeItems = res.data.response.items;
        this.selectDataGrade(this.activeGrades,this.activeItems);
      };
      this.registerCode = this.storeRegisterCode;
    },
    changeInput(val) {//名字修改回调
      this.setreGisterCode(this.registerCode);
    },
    querySearch() { //查询数据

    },
    changeGrade(val) {//获取选择的年级
      this.changeGradeList = val;
      this.setGradeList(val);
    },
    juge(arr) {//
      let booleanVal = false;
      try {
        arr.forEach((item)=>{
          if(item.activityVOS.length) {
            booleanVal = true;
            throw '存在项目，退出程序'
          }
        })
      } catch (error) {
        
      };
      return booleanVal;
    },
    async save() { //保存
      let parmas,parmasList = this.changeGradeList,grades=[],items=[];
      parmasList.forEach((item)=>{
        let classIds = item.classIds.map((classId)=>{
          return {
            classId:classId
          }
        })
        grades.push({
          classVOS:classIds,
          grade:item.gradeId
        });
        items.push({
          grade:item.gradeId,
          testType:'1',
          activityVOS:item.projectList.unify
        },{
          grade:item.gradeId,
          testType:'2',
          activityVOS:item.projectList.optional
        })
      })
      parmas = {
        activityId:this.$route.query.activityId || '',
        activityName:this.registerCode,
        activityType:this.activityType,
        grades:grades,
        items:items,
      };
      if(!parmas.activityName) {
        this.$Message.error('测试项目名称不能为空');
        return
      }
      if(!parmas.grades.length) {
        this.$Message.error('请配置自定义项目测试的测试班级');
        return
      }
      if(!this.juge(parmas.items)) {
        this.$Message.error('请配置自定义项目测试的测试项目');
        return
      }
      let res = await api.insertUpdateExamItem(parmas);
      if(res.data.code == 10000) {
        this.$Message.info('提交成功');
        this.cancel();
      }
      else this.$Message.info(res.data.msg);
    },
    cancel() { //取消保存
      this.setGradeList('');
      this.setActivity('');
      this.setreGisterCode('');
      this.$router.go(-1)
    },
    returnedProject(gradeId,examType) { //回显已经查出来的数据
      let list = this.gradeState,activityActiveList=[];
      list.forEach((item)=>{
        if(item.gradeId == gradeId) {
          if(examType == '1') activityActiveList = item.projectList.unify;
          else activityActiveList = item.projectList.optional;
        }
      });
      this.setActivity(activityActiveList);
    },
    configuration(gradeId,examType) {//跳转到选择项目
      let idsList = this.selectActiveItemIds(gradeId,examType); 
      // let deletIds = encodeURIComponent(idsList);
      this.setCurrentGrade({
        type:examType,
        gradeId:gradeId,
      });
      this.returnedProject(gradeId,examType);
      this.$router.push({name:'customConfig',query:{grade:gradeId,examType,deletIds:idsList.join(',')}});
    },
    selectActiveItemIds(gradeId,examType) { //筛选需要删除的数据
      let list = this.changeGradeList,idSlist =[];
      list.forEach((item)=>{
        let projectList = item.projectList;
        if(item.gradeId == gradeId) {
          if(examType == '1') idSlist = projectList.optional.map(child => child.classTestId);
          else idSlist = projectList.unify.map(child => child.classTestId);
        }
      });
      return idSlist;
    },
  }
}
</script>

<style lang="less" scoped>
  .project-name {
    display: flex;
    align-items: center;
  }
  .test-set{
    margin-top:20px;
  }
  .set-content{
    display:flex;
    flex-wrap: wrap;
    align-items:center;
    .set-items {
      display:flex;
      .set-item{
        margin:0 22px 22px 0;
        width:300px;
        border: 1px solid #BFC9CE;
        border-radius: 5px;
        font-size:20px;
        // font-family: PingFang SC;
        // font-weight: bold;
        // color: #515A6E;
        .item-name,.item-footer{
          width:100%;
          height:41px;
          line-height:41px;
          background-color: #F0F0F0;
          text-align: center;
          font-weight: bold;
          font-size:18px;
        }
        .item-footer{
          font-weight: normal;
          font-size:16px;
        }
        .item-content{
          min-height:274px;
          overflow-x:hidden;
          overflow-y:auto;
          .no-data{
              width:100%;
              min-height:274px;
              text-align: center;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(0, 198, 147, 1);
              // line-height:234px;
              padding-top:0;
            }
            .all-project{
              width:100%;
              // min-height:274px;
              .item-project{
                display:flex;
                align-items:center;
                margin:20px 0 0 30px;
                .project-nameTitle{
                  font-size:14px;
                  margin-right: 10px;
                  max-width:200px;
                }
                
              }
            }
          
        }
        .project-type{
          width: 58px;
          height: 18px;
          border: 1px solid #BFC9CE;
          border-radius: 3px;
          overflow: hidden;/*超出部分隐藏*/
          white-space: nowrap;/*不换行*/
          text-overflow:ellipsis;/*超出部分文字以...显示*/
          div{
            width:100%;
            line-height:18px;
            padding:0 10px;
            text-align: center;
            font-size:12px;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
          }
        }
        .item-footer{
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            margin-left:30px;
          }
          .item-btn{
            margin-right: 30px;
            width: 70px;
            height: 30px;
            background: #00c693;
            border-radius: 5px;
            line-height: 30px;
            color: #FFFFFF;
            text-align: center;
            cursor: pointer;
            font-size:12px;
          }
        }
      }
    }
  }
  .footer-btn{
    width:100%;
    margin-top:15px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>