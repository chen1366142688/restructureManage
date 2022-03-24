<style>
.demo-upload-list {
  display: inline-block;
  width: 160px;
  height: 160px;
  text-align: center;
  line-height: 160px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <div style="padding-left:10px;">
  <div>
    <h2 style="margin-top:15px;margin-bottom:13px;">考核项目详情</h2>
  </div>
  <!-- <Card  :dis-hover="true"> 
      <div >
          <div style="height:46px;width:100%;line-height:46px;font-size:16px;">
              选择适用班级
              <Button type="success" style="float:right;margin-right:240px;" @click="goback" >返回</Button>
              <Button type="success" style="float:right;margin-right:20px;" @click="baseSubmit" >保存</Button>
          </div>
              <div style="padding-top:10px;">
                <div  style="line-height:40px;"  v-for="grade in gradeList">
                  <div style="float:left;text-align:right;width:60px;" v-if="grade.classList != null && grade.classList.length>0" >{{grade.gradeName}}：</div>
                  <div style="margin-left:60px;">
                    <CheckboxGroup @on-change="changeClassIds" v-model="classIds" v-if="grade.classList != null && grade.classList.length>0" >
                      <div style="height:168px;width:340px;display:inline-table;margin-left:30px;border:1px #BFC9CE solid;margin-bottom:20px;border-radius:5px 5px 0px 0px;" v-for="(item,indexc) in grade.classList">
                        <div style="height:40px;width:340px;background-color: #F0F0F0;font-size:18px;">
                            <Checkbox :label="item.classId"  style="margin-left:20px;font-size:18px;">{{item.studentClass}}班 </Checkbox>
                        </div>
                        <div style="width:340px;font-size:15px;border-top:1px #BFC9CE solid;">
                            <div style="height:128px;float:left;width:50%;text-align:center;border-right:1px #BFC9CE solid;overflow-y:auto;">
                                <div>男生</div>
                                <div style="text-align:center;width:100%;" >
                                    <div style="line-height:25px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" v-for="join in grade.list" v-if="join.classId==item.classId && join.gender==1 && join.showSelect==1">{{join.classTestName}}</div>
                                </div>
                            </div>
                            <div style="height:128px;float:right;width:50%;text-align:center;overflow-y:auto;">
                                <div>女生</div>
                                <div style="text-align:center;width:100%;">
                                    <div style="line-height:25px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" v-for="join in grade.list" v-if="join.classId==item.classId && join.gender==2 && join.showSelect==1">{{join.classTestName}}</div>
                                </div>
                            </div>
                        </div>
                        <br v-if="indexc==3 || indexc==7 || indexc==11"/>
                      </div>
                    </CheckboxGroup>
                  </div>
                </div>
              </div>
          </div>
    </Card> -->
    <Card :dis-hover="true" style="margin-top:20px;">
      <div style='font-size:20px;line-height:40px;margin-bottom:10px;'  >项目名称：{{classTestName}}</div>
      <Tabs type="card">
        <TabPane :label="item.examItemName" v-for="(item,index) in examList" :key="index">
          <Form :label-width="150" >
            <!-- <FormItem label="项目类型：" >
              <p style="width:700px;">{{item.examItemType==1?"按成绩得分":item.examItemType==2?"直接打分":item.examItemType==3?"占比打分":"等级得分"}}</p>
            </FormItem>
            <FormItem label="考核占比：" v-if="item.examItemType==3">
              <p style="width:700px;">{{item.examItemPercent}} %</p>
            </FormItem> -->
            <FormItem v-if="(item.testPlaceRemark != null && item.testPlaceRemark != '' ) || (item.placeList != null && item.placeList.length > 0 )" label="测试场地：" >
              <!-- <p v-if="item.testPlaceRemark != null && item.testPlaceRemark != ''" style="width:700px;">{{item.testPlaceRemark}}</p> -->
              <div v-if="item.testPlaceRemark != null && item.testPlaceRemark != ''"  v-html="item.testPlaceRemark"></div>
              <div v-if="item.placeList != null && item.placeList.length > 0">
                <div v-for="image ,indexm in item.placeList" :key="indexm" style="display: inline-block;margin:10px 80px 10px 0;">
                    <div class="demo-upload-list">
                      <img :src="image.pictureAddr" v-if="image.resourceType==1" />
                      <video :src="image.pictureAddr" v-else controls="controls"></video>
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(image)"></Icon>
                      </div>
                    </div>
                    <p style="text-align: center;">{{image.pictureRemark}}</p>
                </div>
              </div>
            </FormItem>
            <FormItem v-if="(item.testMethodsRemark != null && item.testMethodsRemark != '' ) || (item.methodList != null && item.methodList.length > 0 )" label="测试方法：" >
              <!-- <p v-if="item.testMethodsRemark != null && item.testMethodsRemark != ''" style="width:700px;">{{item.testMethodsRemark}}</p> -->
              <div v-if="item.testMethodsRemark != null && item.testMethodsRemark != ''"  v-html="item.testMethodsRemark"></div>
              <div v-if="item.methodList != null && item.methodList.length > 0">
                <div v-for="image ,indexm in item.methodList" :key="indexm" style="display: inline-block;margin:10px 80px 10px 0;">
                  <div>
                    <div class="demo-upload-list">
                      <img :src="image.pictureAddr" v-if="image.resourceType==1" />
                      <video :src="image.pictureAddr" v-else controls="controls"></video>
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(image)"></Icon>
                      </div>
                    </div>
                  </div>
                  <p style="text-align: center;">{{image.pictureRemark}}</p>
                </div>
              </div>
            </FormItem>
            <FormItem v-if="(item.testRequireRemark != null && item.testRequireRemark != '') || (item.requireList != null && item.requireList.length >0)" label="测试要求：" >
              <!-- <p v-if="item.testRequireRemark != null && item.testRequireRemark != ''" style="width:700px;">{{item.testRequireRemark}}</p> -->
              <div v-if="item.testRequireRemark != null && item.testRequireRemark != ''"  v-html="item.testRequireRemark"></div>
              <div v-if="item.requireList != null && item.requireList.length >0" >
                <div v-for="image ,indexm in item.requireList" :key="indexm" style="display: inline-block;margin:10px 80px 10px 0;">
                  <div>
                    <div class="demo-upload-list">
                      <img :src="image.pictureAddr" v-if="image.resourceType==1" />
                      <video :src="image.pictureAddr" v-else controls="controls"></video>
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(image)"></Icon>
                      </div>
                    </div>
                  </div>
                  <p style="text-align: center;">{{image.pictureRemark}}</p>
                </div>
              </div>
            </FormItem>
            <FormItem v-if="(item.testStandardRemark != '' && item.testStandardRemark != null)" label="达标测试评分标准：" >
              <!-- <p v-if="item.testStandardRemark != '' && item.testStandardRemark != null" style="width:700px;">{{item.testStandardRemark}}</p> -->
              <div v-if="item.testStandardRemark != null && item.testStandardRemark != ''"  v-html="item.testStandardRemark"></div>
              <!--   <div v-if=" item.standardVOS.length > 0" >
              <Row>
                  <div style>
                    <Table border  :columns="resultColumns" :data="item.standardVOS"></Table>
                  </div>
                </Row>
              </div> -->
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
   
        <div style="margin-top:10px;padding-left:45%">
                 <Button type="success" style="margin-right:40px;" @click="goback" >返回</Button>
                <!-- <Button type="success" style="margin-right:40px;" @click="baseSubmit" >保存</Button> -->
        </div>   
    <Modal title="预览" v-model="visible">
      <img :src="viewUrl" v-if="resourceType==1" style="width: 100%" />
                    <video :src="viewUrl" v-else controls="controls"  style="width: 100%">
                    </video>
    </Modal>
    <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <span>{{modal2Title}}</span>
        </p>
        <div v-if="testClassListTf">
              <h4 style="margin-left:0px;">运动技能</h4>
                    <div style="margin-left:20px;margin-top:20px;" v-if="skillTf">
                      <div style="width:60px;float:left;text-align:right">男生：</div>
                      <div  style="margin-left:60px">
                          <div style="margin-left:20px;" v-for="(item,index) in testClassList" :key="index"><div  v-if="item.gender == 1 && item.classTestType==2">{{item.classTestName}}</div></div>
                      </div>
                    </div>
                    <div style="margin-left:20px;margin-top:20px;" v-if="!skillTf">
                      <span>暂无考试内容</span>
                    </div>
                    <div style="margin-left:20px;margin-top:20px;" v-if="skillTf">
                      <div style="width:60px;float:left;text-align:right">女生：</div>
                      <div  style="margin-left:60px">
                          <div style="margin-left:20px;" v-for="(item,index) in testClassList" :key="index" ><div v-if="item.gender == 2 && item.classTestType==2">{{item.classTestName}}</div></div>
                      </div>
                      
                    </div>
                    <h4 style="margin-left:0px;margin-top:20px;">健康知识</h4>
                     <div style="margin-left:20px;margin-top:20px;" v-if="knowledgeTf">
                      <div style="width:60px;float:left;text-align:right">男生：</div>
                      <div  style="margin-left:60px">
                        <div style="margin-left:20px;" v-for="(item,index) in testClassList" :key="index" ><div v-if="item.gender == 1 && item.classTestType==1">{{item.classTestName}}</div></div>
                      </div>
                    </div>
                    <div style="margin-left:20px;margin-top:20px;" v-if="knowledgeTf">
                      <div style="width:60px;float:left;text-align:right">女生：</div>
                      <div  style="margin-left:60px">
                        <div style="margin-left:20px;" v-for="(item,index) in testClassList" :key="index" ><div v-if="item.gender == 2 && item.classTestType==1">{{item.classTestName}}</div></div>
                      </div>
                    </div>
                     <p style="margin-left:20px;margin-top:20px;" v-if="!knowledgeTf">
                      <span>暂无考试内容</span>
                    </p>
        </div>
        <div v-if="!testClassListTf">
              <h4 style="margin-left:20px;">运动技能</h4>
                    <p style="margin-left:20px;margin-top:20px;">
                      <span>暂无考试内容</span>
                    </p>
                    
            <h4 style="margin-left:20px;margin-top:20px;">健康知识</h4>
                     <p style="margin-left:20px;margin-top:20px;">
                      <span>暂无考试内容</span>
                    </p>
                   
        </div>
        <div slot="footer">
            <Button type="success" size="large" long @click="cancle">关闭</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "test",
  data() {
    return {
      modal2:false,
      modal2Title:'',
      visible: false,
      viewUrl: "",
      classTestId: "",
      classTestName: "",
      disabled: false,
      examList: [],
      classIds: [],
      gradeList: [],
      resourceType:'1',
      primary:[
        {
          title: "得分等级",
          key: "standardName",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "一年级男",
          key: "x1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "一年级女",
          key: "x1g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "二年级男",
          key: "x2b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "二年级女",
          key: "x2g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "三年级男",
          key: "x3b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "三年级女",
          key: "x3g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "四年级男",
          key: "x4b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "四年级女",
          key: "x4g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "五年级男",
          key: "x5b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "五年级女",
          key: "x5g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "六年级男",
          key: "x6b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "六年级女",
          key: "x6g",
          align: "center",
          width: 140,
          type: "html"
        },
      ],
      middle:[
        {
          title: "得分等级",
          key: "standardName",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "七年级男",
          key: "c1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "七年级女",
          key: "c1g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "八年级男",
          key: "c2b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "八年级女",
          key: "c2g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "九年级男",
          key: "c3b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "九年级女",
          key: "c3g",
          align: "center",
          width: 140,
          type: "html"
        },
      ],
      high:[
        {
          title: "得分等级",
          key: "standardName",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "高一男",
          key: "g1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "高一女",
          key: "g1g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "高二男",
          key: "g2b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "高二女",
          key: "g2g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "高三男",
          key: "g3b",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "高三女",
          key: "g3g",
          align: "center",
          width: 140,
          type: "html"
        },
      ],
      college:[
        {
          title: "得分等级",
          key: "standardName",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "大学男",
          key: "d1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "大学女",
          key: "d1g",
          align: "center",
          width: 140,
          type: "html"
        },
      ],
      resultColumns: [],
      testClassList:[],
      testClassListTf:false,
      skillTf:false,
       knowledgeTf:false,
       joinList:[],
       detailInfo:{},
       showOver:false,
    };
  },
  watch: {

  }, //以V-model绑定数据时使用的数据变化监测

  methods: {
    changeClassIds(){
        var vm = this;
        let mapObj = new Map();
        for(let i=0;i<vm.classIds.length;i++){
            mapObj.set(vm.classIds[i],'1');
        }
        vm.showResponseInfo(mapObj,1);
    },
     handleView (file) {
                var vm=this;
                // console.log(file)
                vm.viewUrl=file.pictureAddr;
                vm.resourceType=file.resourceType;
                vm.visible=true;
            },
    getClassTestDetail(classTestId) {
      var vm = this;
      this.$axios
        .get("/v1/examtest/getClassTestDetail?classTestId=" + classTestId)
        .then(function(response) {
          // console.log(response);
          let detailInfo = response.data.response;
          vm.classTestName = detailInfo.classTestName;
          vm.examList = detailInfo.examList ? detailInfo.examList : [];
          vm.detailInfo = detailInfo;
          let map = null;
          vm.showResponseInfo(map,0);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    showResponseInfo(map,type){
          let vm = this;
          let tempMapObj = new Map();
          vm.classIds = [];
          vm.showOver = false;
          let detailInfo = vm.detailInfo;
          vm.gradeList = [];
          let lastGradeId = 0;
          if(detailInfo.gscoList != null && detailInfo.gscoList.length > 0){
            let tempGradeId = detailInfo.gscoList[0].gradeId;
            let tempGradeName = detailInfo.gscoList[0].gradeName;
            let classId = detailInfo.gscoList[0].classId;
            let studentClass = detailInfo.gscoList[0].studentClass;
            let selectStudent =  '0';
            
            let tempList = [];
            let joinList = [];
            let tempClassList=[];
            for(let i=0;i<detailInfo.gscoList.length;i++){
                 let gradeInfo = {
                        gradeName:tempGradeName,
                        gradeId:tempGradeId,
                        list:[],
                        classList:[]
                  }
                 lastGradeId = tempGradeId;
               if(type == 1 && vm.classTestId==detailInfo.gscoList[i].classTestId){
                  if(map.get(detailInfo.gscoList[i].classId) == '1'){
                      selectStudent = '1'
                      detailInfo.gscoList[i].showSelect='1'
                      if(tempMapObj.get(detailInfo.gscoList[i].classId) == '1'){
                         
                      }else{
                         tempMapObj.set(detailInfo.gscoList[i].classId,'1');
                         vm.classIds.push(detailInfo.gscoList[i].classId);
                      }
                  }else{
                      selectStudent = '0'
                      detailInfo.gscoList[i].showSelect='0'
                  }
                }else{
                  if(detailInfo.gscoList[i].selectInstanceTest == '1'){
                      selectStudent = '1'
                      if(tempMapObj.get(detailInfo.gscoList[i].classId) == '1'){
                         
                      }else{
                         tempMapObj.set(detailInfo.gscoList[i].classId,'1');
                         vm.classIds.push(detailInfo.gscoList[i].classId);
                      }
                  }
                }
                 if(classId == detailInfo.gscoList[i].classId){
                 }else{
                    let classInfo = {
                        classId:classId,
                        studentClass:studentClass,
                        selectStudent:selectStudent
                    }
                    tempClassList.push(classInfo);
                    selectStudent = '0'
                    classId = detailInfo.gscoList[i].classId;
                    studentClass = detailInfo.gscoList[i].studentClass;
                 }
                if(tempGradeId ==  detailInfo.gscoList[i].gradeId){
                   tempList.push(detailInfo.gscoList[i]);
                }else{
                    gradeInfo.list = tempList;
                    gradeInfo.classList = tempClassList;
                    vm.gradeList.push(gradeInfo);
                    tempList = [];
                    tempClassList=[];
                    tempList.push(detailInfo.gscoList[i]);
                    tempGradeId =  detailInfo.gscoList[i].gradeId;
                    tempGradeName = detailInfo.gscoList[i].gradeName;
                }
            }

            let gradeInfo = {
                  gradeName:tempGradeName,
                  gradeId:tempGradeId,
                  list:tempList,
                  classList:[]
            }
            if(lastGradeId == tempGradeId){
                gradeInfo.classList = tempClassList;
            }
            let classInfo = {
                classId:classId,
                studentClass:studentClass,
                selectStudent:selectStudent
            }
            gradeInfo.classList.push(classInfo);
            tempList = [];
            vm.gradeList.push(gradeInfo);
          }
          vm.showOver = true;
          console.log(vm.classIds)
    },

    getClassTestClassInfo(classId) {
      var vm = this;
      this.$axios
        .get("/v1/examtest/getClassTestClassInfo?classId=" + classId)
        .then(function(response) {
          let detailInfo = response.data.response;
          vm.testClassList = detailInfo ? detailInfo : [];
          if(detailInfo && detailInfo.length>0){
            vm.testClassListTf=true;
            vm.skillTf=false;
             vm.knowledgeTf=false;
            for(var i=0;i<detailInfo.length;i++){
                if(detailInfo[i].classTestType==2){
                  vm.skillTf=true
                }else{
                  vm.knowledgeTf=true;
                }
            }
          }else{
            vm.testClassListTf=false
          }
          vm.modal2=true
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    viewDetail(gradeName,studentClass,classId){
      var vm=this;
      vm.testClassList=[];
      vm.modal2Title=gradeName+'、'+studentClass+'班考核项目';
      vm.getClassTestClassInfo(classId);
    },
    cancle(){
      var vm=this;
      vm.modal2=false;
    },
    baseSubmit() {
      var vm = this;
      let data = {
        "classIds": vm.classIds,
        "classTestId": vm.classTestId
      };
      this.$axios
        .post("/v1/examtest/upsertTestClassIds", data)
        .then(function(response) {
          // console.log(response);
          if (response.data.code == 10000) {
            let numCode = response.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
              vm.goback();
            } else {
              vm.$Message.error(response.data.response.msg);
            }
          } else {
            vm.$Message.info("保存失败！");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    var vm = this;
    if(sessionStorage.getItem("schoolType")==2){
      vm.resultColumns=vm.primary;
    }
    if(sessionStorage.getItem("schoolType")==3){
      vm.resultColumns=vm.middle;
    }
    if(sessionStorage.getItem("schoolType")==4){
      vm.resultColumns=vm.high;
    }
    if(sessionStorage.getItem("schoolType")==5){
      vm.resultColumns=vm.college;
    }
    vm.classTestId = sessionStorage.getItem(
      "examItemManage-examItemDetail-classTestId"
    );
    vm.getClassTestDetail(
      sessionStorage.getItem("examItemManage-examItemDetail-classTestId")
    );
  },
  destroyed() {
    var vm = this;
  }
};
</script>