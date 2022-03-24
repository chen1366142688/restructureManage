<template>
    <div style="padding-left:10px">
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">自定义项目测试</h2>
        </div>
        <div>
            <Card>
                <div class="top-search addClass" @keydown.enter="querySearch">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>名称：</span>
                            <Select v-model="formList.activityId" style="width:120px">
                                <Option
                                v-for="(item,index) in projectList"
                                :value="item.activityId"
                                :key="item.activityId+index"
                                >{{item.activityName}}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>年级：</span>
                            <Select v-model="formList.grade" style="width:120px">
                                <Option
                                v-for="(item,index) in gradeList"
                                :value="item.value"
                                :key="item.value+index"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <!-- <div style="margin:5px 20px;">
                            <span>状<span style="visibility:hidden">太</span>态：</span>
                            <Select v-model="formList.status" style="width:120px;">
                                <Option
                                v-for="(item,i) in statusList"
                                :value="item.value"
                                :key="item.value+i"
                                >{{ item.name }}</Option>
                            </Select>
                        </div> -->
                    </div>
                    <div  class="right-btns addClass">
                        <Button type="success" @click="querySearch">查询</Button>
                        <Button type="success" @click="addTest">新增测试</Button>
                    </div>
                </div>
            </Card>
        </div>
        <test-table :weirdTitle="weirdTitle" :generalize="generalize" :dataDetail="dataDetail" @getDataDetail="getDataDetail" :dataDetailTotal="dataDetailTotal" :formList="formList" :routerName="routerName"></test-table>
        <Modal
            width="552"
            v-model="remindDsiable"
            title="提醒"
            @on-ok="succse"
            @on-cancel="testCancel($event)"
            ok-text="新增"
            cancel-text="取消"
          >
            <p style="color: #515a6e; font-size: 16px">新增项目测试后，当前测试将自动结束，无法编辑测试内容和学生成绩，是否确认新增？</p>
        </Modal>
    </div>
</template>

<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
import _ from 'lodash'
import testTable from '@/components/testTable/testTable.vue'
export default {
  components: {
    testTable,
  },
  data() {  
    return {
      generalize:[],//数据概括
      dataDetail:[],//数据明细
      dataDetailTotal:0,//数据明细总条数
      routerName:{//路由跳转名称
        addTest:'addcustomtest',
        studentMsg:'customStudentmanage',
        dataExamine:'lookcustomtest'
      },
      weirdTitle:'测试内容编辑',
      remindDsiable:false,//弹窗disable
      formList:{
        activityId:'',
        grade:'9999',
        pageNum:1,
        pageSize:10,
        type:false,//是否是新增页面进入的
        pageName:'数据概览'
      },
      gradeList:[
        {name:'七年级',value:7},
        {name:'八年级',value:8}
      ],
      projectList: [//项目名称列表
        
      ],
    }
  },
  beforeRouteLeave(to,from,next) {
    if(to.name =='addcustomtest') {
      this.formList.type=true
    }else{
      this.formList.type = false;
    }
    next();
  },
  
  created() {
    let params = util.hasParams(this.$store, this.$route);
    if(params) this.formList = params;
    this.queryGradeList();
    // this.queryAcivityDropDownList();
    sessionStorage.setItem("tabarIndex",0);
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    async queryGradeList() {//查询学校所有年级
      let res = await api.queryGradeClass({activityType:'1'});
      if(res.data.code == 10000) {
        let resData = res.data.response,newGrade;
        newGrade = resData.map((item)=>{
          return {
            name:`${this.transitionCn(item.grade)}年级`,
            value:item.grade,
          }
        });
        newGrade.unshift({
          name:'全部年级',
          value:'9999'
        })
        this.gradeList = newGrade;
        await this.queryAcivityDropDownList();
      }
    },
    async queryAcivityDropDownList() {//查询下拉框活动列表
      let res = await api.getActivityDropDownBoxList({activityType:'1'});
      if(res.data.code == 10000) {
        this.projectList = res.data.response;
        if(!res.data.response.length) {
          this.projectList.push({activityId:'9999',activityName:'暂无数据'});
          this.formList.activityId = '9999'
        }else {
          this.projectList = res.data.response;
          this.formList.activityId = this.projectList[this.projectList.length-1].activityId;
          let params = util.hasParams(this.$store, this.$route);
          if(params) this.formList = params;
          await this.getDataDetail(this.formList);
          await this.getDataSummary();
        }
      }
    },
    async getDataDetail(dataObj) {//查询数据明细
      this.formList.pageNum =dataObj.pageNum || 1;
      this.formList.pageSize = dataObj.pageSize || 10;
      let parmas = {
        ...this.formList,
        grade:this.formList.grade == '9999' ? '':this.formList.grade,
        pageNo:dataObj.pageNum || 1,
        pageSize:dataObj.pageSize || 10,
        // activityId:this.formList.activityId='9999'?'':this.formList.activityId
      };
      delete parmas.pageName;
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: this.formList});
      let res = await api.getDataDetailsList(parmas);
      if(res.data.code == 10000) {
        this.dataDetail = res.data.response.list;
        this.dataDetailTotal = res.data.response.totalCount
      }
    },
    async getDataSummary() {//查询数据概括
    let parmas = {
      ...this.formList,
      grade:this.formList.grade == '9999' ? '':this.formList.grade,
      // activityId:this.formList.activityId='9999'?'':this.formList.activityId
    }
      delete parmas.pageName;
      let res = await api.getDataSummary(parmas);
      if(res.data.code == 10000) {
        let arr = [];
        arr.push(res.data.response);
       arr = _.uniqBy(arr,'activityName');
        this.generalize = arr;
      }
    },
    async querySearch() { //搜索
      this.formList.pageNum = 1;
      if(this.formList.activityId != '9999') {
        this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: this.formList});
        await this.getDataDetail(this.formList);
        await this.getDataSummary();
      }
    },
    addTest() {//新增自定义测试
    if(this.formList.activityId=='9999') {
      this.succse();
    }else {
      this.remindDsiable = true;
    }
      // if(this.projectList.length&&this.formList.activityId!='9999') this.remindDsiable = true;
      // else this.succse();
      
    },
    succse() {//新增自定义测试
      this.formList.type = true;
      this.$router.push({ name: "addcustomtest" ,query:{title:'新增'}});
    },
    testCancel() {//取消测试
      this.remindDsiable = false;
    }
  }
}
</script>

<style>

</style>