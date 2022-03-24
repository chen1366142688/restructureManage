<style>
.openBtn {
  width: 60px;
  height: 20px;
  background: rgba(0, 198, 147, 1);
  border-radius: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px 0;
}

.imgData {
  display: flex;
  flex-wrap: wrap;
  padding-left: 60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.one {
  display: flex;
  flex-wrap: wrap;
}

.gradeItem {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(191, 201, 206, 1);
  margin: 22px 7px;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
}

.top {
  width: 100%;
  height: 41px;
  background: rgba(240, 240, 240, 1);
  border-bottom: 1px solid rgba(191, 201, 206, 1);
  border-radius: 5px 5px 0px 0px;
  line-height: 42px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}

.sections {
  width: 100%;
  height: 217px;
  overflow-y: auto;
}

.title {
  width: 100%;
  /* height: 36px; */
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
}

.bottom {
  width: 100%;
  height: 40px;
  background: rgba(240, 240, 240, 1);
  border-top: 1px solid rgba(191, 201, 206, 1);
  line-height: 41px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}

.run_title {
  font-size: 22px;
  color: #515a6e;
}
.interview-item__sec {
  padding: 10px 0 10px 28px;
  text-align: left;
  color: #515a6e;
  font-size: 14px;
}
.interview-item__sec > h4 {
  font-size: 16px;
}
.interview-item__sec > ul {
  margin-left: 15px;
}
.interview-item__sec .intervier-content {
  margin-left: 22px;
}
.interview-required__icon {
  font-size: 12px;
  padding: 0 8px;
  font-style: normal;
  vertical-align: middle;
  height: 18px;
  line-height: 16px;
  display: inline-block;
  border: 1px solid rgba(191, 201, 206, 1);
  border-radius: 3px;
  margin-left:8px;
}
.interview-item__name > span {
  vertical-align: middle;
}
.interview-item__sec > ul > li,
.intervier-content li {
  margin: 6px 0;
}



.test_project {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.project-info-data {
  display: flex;
  background: rgba(255, 255, 255, 1);
}
/* .test_project-info > .ivu-row:last-child {
  border-bottom: none !important;
}
.ivu-row {
  border-bottom: 1px solid #dcdee2;
} */
.test_project-info > #border-hide:first-child {
  border-top: none !important;
}
#border-hide {
  border-top: 1px solid #dcdee2;
}
.itemTitle {
  border-right: none !important;
}

.ball_li {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体能项目配置</h2>
    </div>
    <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
      <TabPane
        :name="grade.gradeId"
        :label="grade.val"
        v-for="grade in gradeList"
        :key="grade.gradeId"
        style="max-height:700px;overflow-y:auto;overflow-x:hidden;"
      >
        <div v-if="gradeData.gradeId==grade.gradeId" v-for="gradeData,indexa in allData">
          <div>
            <div
              v-if="gradeData.actionList.dataList"
              v-for="examItem in gradeData.actionList.dataList"
              style="margin-top:10px;border: 1px solid rgba(191, 201, 206, 1);margin: 20px 0;"
              :dis-hover="true"
            >
              <div v-if="gradeData.actionList.dataList">
                <div class="project-info-data">
                  <div class="pro-l">
                    <div class="test_project" style="width:100px;word-break:break-all;text-align: center" >{{examItem.itemName}}</div>
                  </div>
                  <div class="test_project-info">
                    <template v-for="(classTestInfo,indexb) in examItem.list">
                      <div id="border-hide">
                        <Row>
                          <Col
                            span="4"
                            class="itemTitle"
                            style="padding-left:57px;border-right: none"
                          >
                            <div
                              class="ball_li"
                              style="padding-top:18px"
                            >{{classTestInfo.classTestName}}</div>
                            <div
                              class="openBtn"
                              @click="openOrCloseFun(classTestInfo,indexa,indexb,1)"
                            >
                              {{classTestInfo.open?'收起':'展开'}}
                              <Icon
                                style="margin-left:5px"
                                size="8"
                                color="#FFF"
                                :type="classTestInfo.open?'arrow-up-b':'arrow-down-b'"
                              ></Icon>
                            </div>
                          </Col>
                          <div style="padding:15px 0;">
                            <Col
                              span="20"
                              style="display:flex;height: 70px;
                                     border-left: 1px solid #DCDEE2;
                                     align-items: center;
                                     "
                            >
                              <Checkbox
                                :value="classTestInfo.checkAll"
                                 :disabled="classTestInfo.disabled"
                                @click.prevent.native="handleCheckAll(classTestInfo,indexa,indexb)"
                                style="border:1px solid #DCDEE2;padding:3px 0 0 5px;margin:10px;display:inline-block;min-width:60px;height:27px"
                              >全部</Checkbox>
                              <CheckboxGroup
                                :disabled="classTestInfo.disabled"
                                v-model="classTestInfo.classIds"
                                style="display:inline-block"
                              >
                                <span
                                  style="border:1px solid #DCDEE2;padding:0 0 3px 10px;margin:10px;display:inline-block;"
                                  v-for="(item,indexc) in classTestInfo.list"
                                  :key="item.classId"
                                >
                                  <Checkbox
                                    :label="item.classId"
                                    :value="item.selectTf"
                                    :disabled="item.disabled"
                                    @click.prevent.native="checkGroup(classTestInfo,indexa,indexb,indexc)"
                                  >{{item.studentClass}}班</Checkbox>
                                </span>
                              </CheckboxGroup>
                            </Col>
                          </div>
                        </Row>
                      </div>
                      <Row style="margin-left:60px;" v-if="classTestInfo.open">
                        <transition name="fade">
                          <Tabs type="card" transiton="fade">
                            <TabPane
                              :name="detailInfo.examItemName"
                              :label="detailInfo.scorePercent?detailInfo.examItemName+'('+(detailInfo.scorePercent/100).toFixed(2)+'%)':detailInfo.examItemName"
                              v-for="detailInfo in classTestInfo.detail"
                              :key="detailInfo.examItemId"
                            >
                              <div>
                                <p
                                  style="margin-top:15px;
                                        font-size: 15px;
                                        color: #515A6E;"
                                  v-html="'测试场地：'+(detailInfo.testPlaceRemark?detailInfo.testPlaceRemark:'')"
                                ></p>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 1"
                                >
                                  <img
                                    width="88"
                                    height="88"
                                    style="margin:10px 15px"
                                    :src="imgItem.pictureAddr"
                                    alt
                                    v-for="imgItem in detailInfo.placeList"
                                    :key="imgItem.classTestId"
                                  />
                                </div>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 2"
                                >
                                  <video
                                    width="88"
                                    height="88"
                                    :src="imgItem.pictureAddr"
                                    v-for="imgItem in detailInfo.placeList"
                                    :key="imgItem.classTestId"
                                  ></video>
                                </div>
                              </div>
                              <div>
                                <p
                                  style="margin-top:15px;
                                        font-size: 15px;
                                        color: #515A6E;
                                  "
                                  v-html="'测试方法：'+(detailInfo.testMethodsRemark?detailInfo.testMethodsRemark:'')"
                                ></p>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 1"
                                >
                                  <img
                                    width="88"
                                    height="88"
                                    style="margin:10px 15px"
                                    :src="imgItem.pictureAddr"
                                    alt
                                    v-for="imgItem in detailInfo.methodList"
                                    :key="imgItem.classTestId"
                                  />
                                </div>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 2"
                                >
                                  <video
                                    width="88"
                                    height="88"
                                    :src="imgItem.pictureAddr"
                                    v-for="imgItem in detailInfo.methodList"
                                    :key="imgItem.classTestId"
                                  ></video>
                                </div>
                              </div>
                              <div>
                                <p
                                  style="margin-top:15px;
                                        font-size: 15px;
                                        color: #515A6E;
                                  "
                                  v-html="'评分标准：'+(detailInfo.testStandardRemark?detailInfo.testStandardRemark:'')"
                                ></p>
                              </div>
                            </TabPane>
                          </Tabs>
                        </transition>
                      </Row>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top:20px;">
            <h2 class="run_title">体能</h2>
            <div
              v-if="gradeData.staminaList.dataList"
              v-for="examItem in gradeData.staminaList.dataList"
              style="margin-top:10px;border: 1px solid rgba(191, 201, 206, 1);"
              :dis-hover="true"
            >
              <div v-if="gradeData.staminaList.dataList">
                <div class="project-info-data">
                  <div class="pro-l">
                    <div class="test_project" style="width:100px;word-break:break-all;text-align: center">体能</div>
                  </div>
                  <div class="test_project-info">
                    <template v-for="(classTestInfo,indexb) in examItem.list">
                      <div id="border-hide" style="border-bottom:none;">
                        <Row>
                          <Col
                            span="4"
                            class="itemTitle"
                            style="padding-left:57px;border-right: none"
                          >
                            <div
                              class="ball_li"
                              style="padding-top:18px"
                            >{{classTestInfo.classTestName}}</div>
                            <div
                              class="openBtn"
                              @click="openOrCloseFun(classTestInfo,indexa,indexb,2)"
                            >
                              {{classTestInfo.open?'收起':'展开'}}
                              <Icon
                                style="margin-left:5px"
                                size="8"
                                color="#FFF"
                                :type="classTestInfo.open?'arrow-up-b':'arrow-down-b'"
                              ></Icon>
                            </div>
                          </Col>
                          <div style="padding:34px 0;">
                            <Col span="20" style="display:flex;border-left:1px solid #F0F0F0">
                              <Checkbox
                                :value="classTestInfo.checkAll"
                                :disabled="classTestInfo.disabled"
                                @click.prevent.native="handleCheckAll(classTestInfo,indexa,indexb)"
                                style="border:1px solid #DCDEE2;padding:3px 0 0 5px;margin:10px;display:inline-block;min-width:60px;height:27px"
                              >全部</Checkbox>
                              <CheckboxGroup
                                :disabled="classTestInfo.disabled"
                                v-model="classTestInfo.classIds"
                                style="display:inline-block"
                              >
                                <span
                                  style="border:1px solid #DCDEE2;padding:0 0 3px 10px;margin:10px;display:inline-block;"
                                  v-for="(item,indexc) in classTestInfo.list"
                                  :key="item.classId"
                                >
                                  <Checkbox
                                    :label="item.classId"
                                    :value="item.selectTf"
                                    :disabled="item.disabled"
                                    @click.prevent.native="checkGroup(classTestInfo,indexa,indexb,indexc)"
                                  >{{item.studentClass}}班</Checkbox>
                                </span>
                              </CheckboxGroup>
                            </Col>
                          </div>
                        </Row>
                      </div>
                      <Row style="margin-left:60px;">
                        <transition name="fade">
                          <Tabs type="card" transiton="fade" v-if="classTestInfo.open">
                            <TabPane
                              :name="detailInfo.examItemName"
                              :label="detailInfo.examItemName"
                              v-for="detailInfo in classTestInfo.detail"
                              :key="detailInfo.examItemId"
                            >
                              <div>
                                <p
                                  style="margin-top:15px;
                                        font-size: 15px;
                                        color: #515A6E;
                                  "
                                  v-html="'测试场地：'+detailInfo.testPlaceRemark"
                                ></p>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 1"
                                >
                                  <img
                                    width="88"
                                    height="88"
                                    style="margin:10px 15px"
                                    :src="imgItem.pictureAddr"
                                    alt
                                    v-for="imgItem in detailInfo.placeList"
                                    :key="imgItem.classTestId"
                                  />
                                </div>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 2"
                                >
                                  <video
                                    width="88"
                                    height="88"
                                    :src="imgItem.pictureAddr"
                                    v-for="imgItem in detailInfo.placeList"
                                    :key="imgItem.classTestId"
                                  ></video>
                                </div>
                              </div>
                              <div>
                                <p
                                  style="margin-top:15px;
                                        font-size: 15px;
                                        color: #515A6E;
                                  "
                                  v-html="'测试方法：'+detailInfo.testMethodsRemark"
                                ></p>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 1"
                                >
                                  <img
                                    width="88"
                                    height="88"
                                    style="margin:10px 15px"
                                    :src="imgItem.pictureAddr"
                                    alt
                                    v-for="imgItem in detailInfo.methodList"
                                    :key="imgItem.classTestId"
                                  />
                                </div>
                                <div
                                  class="imgData"
                                  v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 2"
                                >
                                  <video
                                    width="88"
                                    height="88"
                                    :src="imgItem.pictureAddr"
                                    v-for="imgItem in detailInfo.methodList"
                                    :key="imgItem.classTestId"
                                  ></video>
                                </div>
                              </div>
                              <div>
                                <p
                                  style="margin-top:15px;
                                        font-size: 15px;
                                        color: #515A6E;
                                  "
                                  v-html="'评分标准：'+detailInfo.testStandardRemark"
                                ></p>
                              </div>
                            </TabPane>
                          </Tabs>
                        </transition>
                      </Row>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card style="margin-top:20px;" :dis-hover="true" v-if="gradeData.selectList.length>0">
            <div class="name" v-if="gradeData.selectList.length>0">已选择班级考核项目</div>
            <div class="one">
              <div class="gradeItem" v-for="(item,indexd) in gradeData.selectList" :key="indexd">
                <div class="top">{{item.gradeName}}</div>
                <div class="sections">
                  <!-- <div class="title">已选择考核项目</div> -->
                  <div class="interview-item__sec">
                    <!-- <h4>运动技能</h4> -->
                    <ul>
                      <li v-for="(selectedItem,sindex) in item.actionList" :key="sindex">
                        <div class="interview-item__name">
                          <span>{{selectedItem.classTestName}}</span>
                          <i
                            class="interview-required__icon"
                          >{{selectedItem.examType * 1 === 1 ? "必考" : "选考"}}</i>
                        </div>
                        <ul class="intervier-content" v-if="selectedItem.examItem.length>1">
                          <li v-for="exam in selectedItem.examItem" :key="exam">{{exam}}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div class="interview-item__sec">
                    <h4>体能</h4>
                    <ul>
                      <li v-for="(selectedItem,sindex) in item.staminaList" :key="sindex">
                        <div class="interview-item__name">
                          <span>{{selectedItem.classTestName}}</span>
                          <!-- <i
                            class="interview-required__icon"
                          >{{selectedItem.examType * 1 === 1 ? "必考" : "选考"}}</i> -->
                        </div>
                        <ul class="intervier-content" v-if="selectedItem.examItem.length>1">
                          <li v-for="exam in selectedItem.examItem" :key="exam">{{exam}}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <!-- <interview-list title="运动技能" :actionList="item.actionList"></interview-list> -->
                  <!-- <interview-list title="体能" :actionList="item.staminaList"></interview-list> -->
                </div>
                <div class="bottom">考核项目数量：{{item.actionList.length+item.staminaList.length}}</div>
                <!-- <p v-for="xxx in item.actionList ">{{xxx.classTestName}}</p> -->
              </div>
            </div>
          </Card>
        </div>
        <Spin size="large" fix v-if="loading"></Spin>
      </TabPane>
    </Tabs>
    <div style="margin-top:10px;text-align:center">
      <Button size="large" type="success" style="margin-right:40px;" @click="goback">返回</Button>
      <Button size="large" type="success" @click="baseSubmit">保存</Button>
    </div>
    <div id="modal" v-if="loadingStatus">
        <Spin fix>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
  </div>
</template>

<script>
// import InterviewList from "./common/interviewList";
export default {
  name: "examItemConfigure",
  data() {
    return {
      loadingStatus:true,
      selectTabName: "",
      classTestType: "3",
      loading: false,
      gradeList: [],
      allDataDe: [],
      allData: [],
      allSelectList: []
    };
  },
  // components: {
  //   InterviewList
  // },
  methods: {
    openOrCloseFun(data, indexa, indexb, type) {
      let vm = this;
      let open = data.open;
      open = !open;
      if (open) {
        vm.loadingStatus = true;
        this.$axios
          .get(
            "/v1/examtest/getExamItemsByClassTestId?classTestId=" +
              data.classTestId
          )
          .then(res => {
            if (res.data.code == 10000) {
              let params = res.data.response;
              vm.allData[indexa].list[
                vm.allData[indexa].list.indexOf(data)
              ].detail = params;
              vm.allData[indexa].list[
                vm.allData[indexa].list.indexOf(data)
              ].open = open;
              vm.allData = vm.allData.slice(0);
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg);
              }
            }
            vm.loadingStatus = false
          });
      } else {
        vm.allData[indexa].list[
          vm.allData[indexa].list.indexOf(data)
        ].open = false;
        vm.allData = vm.allData.slice(0);
      }
    },
    handleCheckAll(classTestInfo, indexa, indexb) {
      var vm = this;
      if(classTestInfo.disabled){
          return;
      }
      let indexc = vm.allData[indexa].list.indexOf(classTestInfo);
      let allData = vm.allData;
      let tf = classTestInfo.checkAll;
      tf = !tf;
      classTestInfo.classIds = [];
      classTestInfo.checkAll = tf;
      for (let i = 0; i < classTestInfo.list.length; i++) {
        if(classTestInfo.list[i].disabled){
          continue;
        }
        classTestInfo.list[i].selectTf = tf;
        if (tf) {
          classTestInfo.classIds.push(classTestInfo.list[i].classId);
          for (let x = 0; x < allData[indexa].selectList.length; x++) {
            if (
              classTestInfo.list[i].classId ==
              allData[indexa].selectList[x].classId
            ) {
              let param = {
                classTestId: classTestInfo.classTestId,
                classTestName: classTestInfo.classTestName,
                examType: classTestInfo.examType,
                enableStatus:classTestInfo.enableStatus,
                examItem: classTestInfo.examItem
                  ? classTestInfo.examItem
                      .replace(/\B(?=(\d{2})(?!\d)\%\))/g, ".")
                      .split(",")
                  : []
              };
              if (classTestInfo.classTestType == "2") {
                if (
                  vm.myIndexOf(
                    allData[indexa].selectList[x].actionList,
                    param
                  ) == -1
                ) {
                  allData[indexa].selectList[x].actionList.push(param);
                }
                // allData[indexa].selectList[x].actionList.push(param);
              } else {
                if (
                  vm.myIndexOf(
                    allData[indexa].selectList[x].staminaList,
                    param
                  ) == -1
                ) {
                  allData[indexa].selectList[x].staminaList.push(param);
                }
                // allData[indexa].selectList[x].staminaList.push(param);
              }
            }
          }
        } else {
          for (let x = 0; x < allData[indexa].selectList.length; x++) {
            if (
              classTestInfo.list[i].classId ==
              allData[indexa].selectList[x].classId
            ) {
              let param = {
                classTestId: classTestInfo.classTestId,
                classTestName: classTestInfo.classTestName,
                examType: classTestInfo.examType,
                examItem: classTestInfo.examItem
                  ? classTestInfo.examItem
                      .replace(/\B(?=(\d{2})(?!\d)\%\))/g, ".")
                      .split(",")
                  : []
              };
              if (classTestInfo.classTestType == "2") {
                allData[indexa].selectList[x].actionList.splice(
                  vm.myIndexOf(allData[indexa].selectList[x].actionList, param),
                  1
                );
              } else {
                allData[indexa].selectList[x].staminaList.splice(
                  vm.myIndexOf(
                    allData[indexa].selectList[x].staminaList,
                    param
                  ),
                  1
                );
              }
            }
          }
        }
      }
      vm.allData[indexa].list.splice(indexc, 1, classTestInfo);
      this.$forceUpdate();
    },
    checkGroup(classTestInfo, indexa, indexb, indexc) {
      var vm = this;
      if(classTestInfo.list[indexc].disabled){
        return;
      }
      let indexd = vm.allData[indexa].list.indexOf(classTestInfo);
      let allData = vm.allData;
      let tf = classTestInfo.list[indexc].selectTf;
      tf = !tf;
      if (tf) {
        classTestInfo.classIds.push(classTestInfo.list[indexc].classId);
        for (let x = 0; x < allData[indexa].selectList.length; x++) {
          if (
            classTestInfo.list[indexc].classId ==
            allData[indexa].selectList[x].classId
          ) {
            let param = {
              classTestId: classTestInfo.classTestId,
              classTestName: classTestInfo.classTestName,
              examType: classTestInfo.examType,
              enableStatus:classTestInfo.enableStatus,
              examItem: classTestInfo.examItem
                ? classTestInfo.examItem
                    .replace(/\B(?=(\d{2})(?!\d)\%\))/g, ".")
                    .split(",")
                : []
            };
            if (classTestInfo.classTestType == "2") {
              if (
                vm.myIndexOf(allData[indexa].selectList[x].actionList, param) ==
                -1
              ) {
                allData[indexa].selectList[x].actionList.push(param);
              }
            } else {
              if (
                vm.myIndexOf(
                  allData[indexa].selectList[x].staminaList,
                  param
                ) == -1
              ) {
                allData[indexa].selectList[x].staminaList.push(param);
              }
            }
          }
        }
      } else {
        classTestInfo.classIds.remove(classTestInfo.list[indexc].classId);

        for (let x = 0; x < allData[indexa].selectList.length; x++) {
          if (
            classTestInfo.list[indexc].classId ==
            allData[indexa].selectList[x].classId
          ) {
            let param = {
              classTestId: classTestInfo.classTestId,
              classTestName: classTestInfo.classTestName,
              examType: classTestInfo.examType,
              enableStatus:classTestInfo.enableStatus,
              examItem: classTestInfo.examItem
                ? classTestInfo.examItem
                    .replace(/\B(?=(\d{2})(?!\d)\%\))/g, ".")
                    .split(",")
                : []
            };
            if (classTestInfo.classTestType == "2") {
              allData[indexa].selectList[x].actionList.splice(
                vm.myIndexOf(allData[indexa].selectList[x].actionList, param),
                1
              );
            } else {
              allData[indexa].selectList[x].staminaList.splice(
                vm.myIndexOf(allData[indexa].selectList[x].staminaList, param),
                1
              );
            }
          }
        }
      }
      classTestInfo.list[indexc].selectTf = tf;
      if (classTestInfo.classIds.length == classTestInfo.list.length) {
        classTestInfo.checkAll = true;
      } else {
        classTestInfo.checkAll = false;
      }
      vm.allData[indexa].list.splice(indexd, 1, classTestInfo);
      this.$forceUpdate();
    },
    checkAllGroupChange(classIds) {
      var vm = this;
    },
    myIndexOf(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].classTestName == el.classTestName) {
          return i;
        }
      }
      return -1;
    },
    selectTabs(name) {
      this.selectTabName = name;
      sessionStorage.setItem("physicalFitnessItemList-selectTabName",this.selectTabName);
      // this.getexamItemList(this.selectTabName)
    },
    getAllGradeClassTestList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          `v1/examtest/getAllGradeClassTestList?classTestType=${vm.classTestType}`
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.allDataDe = data ? data : [];
            if (data) {
              vm.dealData();
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    dealData() {
      var vm = this;

      for (let i = 0; i < vm.allDataDe.length; i++) {
        let gradeInfo = vm.allDataDe[i];
        gradeInfo.selectList = [];
        // gradeInfo.selectList.actionList=[];
        //  gradeInfo.selectList.staminaList=[];
        gradeInfo.actionList = {};
        gradeInfo.staminaList = {};
        gradeInfo.actionList.list = [];
        gradeInfo.actionList.items = [];
        gradeInfo.staminaList.list = [];
        gradeInfo.staminaList.items = [];
        gradeInfo.actionList.dataList = [];
        gradeInfo.staminaList.dataList = [];
        if (gradeInfo.list) {
          if (
            gradeInfo.list.length > 0 &&
            gradeInfo.list[0].list != null &&
            gradeInfo.list[0].list.length > 0
          ) {
            for (let k = 0; k < gradeInfo.list[0].list.length; k++) {
              let classInfo = gradeInfo.list[0].list[k];
              let selectInfo = {
                classId: classInfo.classId,
                gradeName:
                  (classInfo.grade == 1
                    ? "一年级"
                    : classInfo.grade == 2
                    ? "二年级"
                    : classInfo.grade == 3
                    ? "三年级"
                    : classInfo.grade == 4
                    ? "四年级"
                    : classInfo.grade == 5
                    ? "五年级"
                    : classInfo.grade == 6
                    ? "六年级"
                    : classInfo.grade == 7
                    ? "七年级"
                    : classInfo.grade == 8
                    ? "八年级"
                    : classInfo.grade == 9
                    ? "九年级"
                    : classInfo.grade == 10
                    ? "高一"
                    : classInfo.grade == 11
                    ? "高二"
                    : classInfo.grade == 12
                    ? "高三"
                    : "") +
                  classInfo.studentClass +
                  "班",
                actionList: [],
                staminaList: []
              };
              gradeInfo.selectList.push(selectInfo);
            }
          }
          for (let q = 0; q < gradeInfo.list.length; q++) {
            
            let classTestInfo = gradeInfo.list[q];
            
            if (classTestInfo.classTestType == "2") {
              gradeInfo.actionList.list.push(classTestInfo);
              if (
                gradeInfo.actionList.items.indexOf(classTestInfo.itemName) == -1
              ) {
                gradeInfo.actionList.items.push(classTestInfo.itemName);
                let datas = {
                  itemName: classTestInfo.itemName,
                  list: []
                };
                gradeInfo.actionList.dataList.push(datas);
              }
            } else {
              gradeInfo.staminaList.list.push(classTestInfo);
              if (
                gradeInfo.staminaList.items.indexOf(classTestInfo.itemName) ==
                -1
              ) {
                gradeInfo.staminaList.items.push(classTestInfo.itemName);
                let datas = {
                  itemName: classTestInfo.itemName,
                  list: []
                };
                gradeInfo.staminaList.dataList.push(datas);
              }
            }
          }
          
          //运动技能
          for (let j = 0; j < gradeInfo.actionList.list.length; j++) {
            let classTestInfo = gradeInfo.actionList.list[j];
            for (let w = 0; w < gradeInfo.actionList.dataList.length; w++) {
              if (
                classTestInfo.itemName ==
                gradeInfo.actionList.dataList[w].itemName
              ) {
                gradeInfo.actionList.dataList[w].list.push(classTestInfo);
              }
            }
            classTestInfo.open = false;
            classTestInfo.disabled = false;
            classTestInfo.classIds = [];
            classTestInfo.listLast = [];
            if (classTestInfo.list) {
              for (let h = 0; h < classTestInfo.list.length; h++) {
                let classInfo = classTestInfo.list[h];
                if (classInfo.selectStatus == "1") {
                  classInfo.selectTf = true;
                  classTestInfo.classIds.push(classInfo.classId);
                  for (let x = 0; x < gradeInfo.selectList.length; x++) {
                    if (classInfo.classId == gradeInfo.selectList[x].classId) {
                      let param = {
                        classTestId: classTestInfo.classTestId,
                        classTestName: classTestInfo.classTestName,
                        examType: classTestInfo.examType,
                        enableStatus:classTestInfo.enableStatus,
                        examItem: classTestInfo.examItem
                          ? classTestInfo.examItem
                              .replace(/\B(?=(\d{2})(?!\d)\%\))/g, ".")
                              .split(",")
                          : []
                      };

                      if (classTestInfo.classTestType == "2") {
                        gradeInfo.selectList[x].actionList.push(param);
                      } else {
                        gradeInfo.selectList[x].staminaList.push(param);
                      }
                    }
                  }
                } else {
                  classInfo.selectTf = false;
                }
                if (classInfo.selectStatusLast == "1") {
                  classInfo.disabled = true;
                  classTestInfo.listLast.push(classInfo.classId);
                } else {
                  classInfo.disabled = false;
                }
              }
              if (classTestInfo.classIds.length == classTestInfo.list.length) {
                classTestInfo.checkAll = true;
              } else {
                classTestInfo.checkAll = false;
              }
              if (classTestInfo.listLast.length == classTestInfo.list.length) {
                classTestInfo.disabled = true;
              } else {
                classTestInfo.disabled = false;
              }
            }
          }
          //体能
          for (let j = 0; j < gradeInfo.staminaList.list.length; j++) {
            let classTestInfo = gradeInfo.staminaList.list[j];

            for (let w = 0; w < gradeInfo.staminaList.dataList.length; w++) {
              if (
                classTestInfo.itemName ==
                gradeInfo.staminaList.dataList[w].itemName
              ) {
                gradeInfo.staminaList.dataList[w].list.push(classTestInfo);
              }
            }
            classTestInfo.open = false;
            classTestInfo.disabled = false;
            classTestInfo.classIds = [];
            classTestInfo.listLast = [];

            if (classTestInfo.list) {
              for (let k = 0; k < classTestInfo.list.length; k++) {
                let classInfo = classTestInfo.list[k];

                if (classInfo.selectStatus == "1") {
                  classInfo.selectTf = true;
                  classTestInfo.classIds.push(classInfo.classId);
                  for (let x = 0; x < gradeInfo.selectList.length; x++) {
                    if (classInfo.classId == gradeInfo.selectList[x].classId) {
                      let param = {
                        classTestId: classTestInfo.classTestId,
                        classTestName: classTestInfo.classTestName,
                        examType: classTestInfo.examType,
                        enableStatus:classTestInfo.enableStatus,
                        examItem: classTestInfo.examItem
                          ? classTestInfo.examItem
                              .replace(/\B(?=(\d{2})(?!\d)\%\))/g, ".")
                              .split(",")
                          : []
                      };
                      if (classTestInfo.classTestType == "2") {
                        gradeInfo.selectList[x].actionList.push(param);
                      } else {
                        gradeInfo.selectList[x].staminaList.push(param);
                      }
                    }
                  }
                } else {
                  classInfo.selectTf = false;
                }
                if (classInfo.selectStatusLast == "1") {
                  classInfo.disabled = true;
                  classTestInfo.listLast.push(classInfo.classId);
                } else {
                  classInfo.disabled = false;
                }
              }
              if (classTestInfo.classIds.length == classTestInfo.list.length) {
                classTestInfo.checkAll = true;
              } else {
                classTestInfo.checkAll = false;
              }
              if (classTestInfo.listLast.length == classTestInfo.list.length) {
                classTestInfo.disabled = true;
              } else {
                classTestInfo.disabled = false;
              }
            }
          }
        }
        vm.allData.push(vm.allDataDe[i]);
      }
      vm.loadingStatus=false;
    },
    baseSubmit() {
      let vm = this;
      let list = [];
      let classList=[];
      if (vm.allData) {
        for (let i = 0; i < vm.allData.length; i++) {
          let gradeInfo = vm.allData[i];
          if (gradeInfo) {
            for (let j = 0; j < gradeInfo.selectList.length; j++) {
              let classInfo = gradeInfo.selectList[j];
              if(classInfo){
                let classChoose={
                  classId:classInfo.classId,
                  list:[]
                }
                if(classInfo.actionList && classInfo.actionList.length>0){
                  for(let k=0;k<classInfo.actionList.length;k++){
                    classChoose.list.push(classInfo.actionList[k].classTestId)
                  }
                }
                if(classInfo.staminaList && classInfo.staminaList.length>0){
                   for(let k=0;k<classInfo.staminaList.length;k++){
                    classChoose.list.push(classInfo.staminaList[k].classTestId)
                  }
                }
                classList.push(classChoose)
              }
            }
            for (let j = 0; j < gradeInfo.list.length; j++) {
              let classInfo = gradeInfo.list[j];
              let aa = {
                classTestId: classInfo.classTestId,
                classIds: classInfo.classIds
              };
              list.push(aa);
            }
          }
        }
      }
      let data = classList;
      this.$axios
          .post("v1/examtest/checkExamAndTestRelation", data)
          .then(res => {
            if (res.data.code == 10000) {
              if (res.data.response.code == "1") {
                vm.save(list);
              } else {
                vm.$Message.info("与体测相同项目出现重复选择，请检查");
              }
            } else {
              vm.$Message.info("与体测相同项目出现重复选择，请检查");
            }
          });
    },
    save(list){
      var vm=this;
      let data = {
        list: list,
        schoolId: sessionStorage.getItem("schoolId")
      };
      this.$axios
          .post("v1/examtest/upsertStudentClassSelect", data)
          .then(res => {
            if (res.data.code == 10000) {
              if (res.data.response.code == "1") {
                vm.$Message.info("保存成功！");
                vm.goback();
              } else {
                vm.$Message.info(res.data.response.msg);
              }
            } else {
              vm.$Message.info("保存失败！");
            }
          });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    var vm = this;
    let type = sessionStorage.getItem("schoolType");
      vm.gradeList = [
        {
          val: "高一",
          gradeId: "10"
        },
        {
          val: "高二",
          gradeId: "11"
        },
        {
          val: "高三",
          gradeId: "12"
        }
      ];
    
    let selectTabNameInfo = sessionStorage.getItem("physicalFitnessItemList-selectTabName");
    if(selectTabNameInfo == null || selectTabNameInfo  == "" || selectTabNameInfo == undefined){
        vm.selectTabName = vm.gradeList[0].gradeId;
    }else{
        vm.selectTabName = selectTabNameInfo;
    }
    vm.getAllGradeClassTestList();
  }
};
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
</script>
<style scoped>
.pro-l {
  width: 100px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(191, 201, 206, 1);
  border-radius: 5px 0px 0px 5px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.test_project-info {
  flex: 1;
}
</style>
