<style scoped>
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
  margin-left: 8px;
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
.test_project-info > .border-all:first-child>#border-hide {
  border-top: none !important;
}
#border-hide {
  border-top: 1px solid #dcdee2;
}
.itemTitle {
  width:100%;
  display:flex;
  align-items:center;
  border-right: none !important;
}

.ball_li {
  /* width:100%; */
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
  margin-right:19px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">项目配置</h2>
    </div>
    <div v-for="(item,index) in gradeList" :key="index" class="project-table" v-if="item.items.length">
                <div class="project-info-data">
                  <div class="pro-l">
                    <div
                      class="test_project"
                      style="
                        width: 100px;
                        word-break: break-all;
                        text-align: center;
                      "
                    >
                      {{item.itemTypeName}}
                    </div>
                  </div>
                  <div class="test_project-info" >
                    <div v-for="(projectChild,proIndex) in item.items" :key="proIndex" class="border-all">
                      <template>
                      <div id="border-hide">
                        <Row>
                          <Col
                            span="3"
                            class="itemTitle"
                            style="padding-left: 57px; border-right: none"
                          >
                            <div class="ball_li" >
                              <Checkbox v-model="projectChild.single">{{selectTabName}}</Checkbox>{{projectChild.classTestName}}
                            </div>
                            <div
                              class="openBtn"
                              @click="unfold(index,proIndex)"
                            >
                              {{ projectChild.open ? "收起" : "展开" }}
                              <Icon
                                style="margin-left: 5px"
                                size="8"
                                color="#FFF"
                                :type="
                                  projectChild.open
                                    ? 'arrow-up-b'
                                    : 'arrow-down-b'
                                "
                              ></Icon>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Row style="margin-left: 60px" v-if="projectChild.open">
                        <transition name="fade">
                          <Tabs type="card" transiton="fade">
                            <TabPane
                              :name="detailInfo.examItemName"
                              :label="
                                detailInfo.scorePercent
                                  ? detailInfo.examItemName +
                                    '(' +
                                    (detailInfo.scorePercent / 100).toFixed(2) +
                                    '%)'
                                  : detailInfo.examItemName
                              "
                              v-for="detailInfo in detailInfoList"
                              :key="detailInfo.examItemId"
                            >
                              <div>
                                <p
                                  style="
                                    margin-top: 15px;
                                    font-size: 15px;
                                    color: #515a6e;
                                  "
                                  v-html="
                                    '测试场地：' +
                                    (detailInfo.testPlaceRemark
                                      ? detailInfo.testPlaceRemark
                                      : '')
                                  "
                                ></p>
                                <div
                                  class="imgData"
                                  v-if="
                                    detailInfo.placeList.length > 0 &&
                                    detailInfo.placeList[0].resourceType == 1
                                  "
                                >
                                  <img
                                    width="88"
                                    height="88"
                                    style="margin: 10px 15px"
                                    :src="imgItem.pictureAddr"
                                    alt
                                    v-for="imgItem in detailInfo.placeList"
                                    :key="imgItem.classTestId"
                                  />
                                </div>
                                <div
                                  class="imgData"
                                  v-if="
                                    detailInfo.placeList.length > 0 &&
                                    detailInfo.placeList[0].resourceType == 2
                                  "
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
                                  style="
                                    margin-top: 15px;
                                    font-size: 15px;
                                    color: #515a6e;
                                  "
                                  v-html="
                                    '测试方法：' +
                                    (detailInfo.testMethodsRemark
                                      ? detailInfo.testMethodsRemark
                                      : '')
                                  "
                                ></p>
                                <div
                                  class="imgData"
                                  v-if="
                                    detailInfo.methodList.length > 0 &&
                                    detailInfo.methodList[0].resourceType == 1
                                  "
                                >
                                  <img
                                    width="88"
                                    height="88"
                                    style="margin: 10px 15px"
                                    :src="imgItem.pictureAddr"
                                    alt
                                    v-for="imgItem in detailInfo.methodList"
                                    :key="imgItem.classTestId"
                                  />
                                </div>
                                <div
                                  class="imgData"
                                  v-if="
                                    detailInfo.methodList.length > 0 &&
                                    detailInfo.methodList[0].resourceType == 2
                                  "
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
                                  style="
                                    margin-top: 15px;
                                    font-size: 15px;
                                    color: #515a6e;
                                  "
                                  v-html="
                                    '评分标准：' +
                                    (detailInfo.testStandardRemark
                                      ? detailInfo.testStandardRemark
                                      : '')
                                  "
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
    <div style="margin-top: 10px; text-align: center">
      <Button size="large" type="success" style="margin-right: 40px" @click="baseSubmit">保存</Button>
      <Button
        size="large"
        type="success"
        
        @click="goback"
        >返回</Button
      >
    </div>
    <div id="modal" v-if="loadingStatus">
      <Spin fix>
        <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
import api from '@/api/testProject.js'
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex';
export default {
  name: "examItemConfigure",
  data() {
    return {
      detailInfoList:[],
      queryPramas:{
        grade:7,
        examType:'1'
      },
      loadingStatus: false,
      selectTabName: "",
      classTestType: "2",
      loading: false,
      single:false,
      gradeList: [],
      deletIds:[],//需要删除的项目
    };
  },
  computed: {
		...mapState({
			gradeState: state => state.pageParams.gradeList,
      ActivityItem: state => state.pageParams.ActivityItem,
		})
	},
  created() {
    this.queryProject();
    // if(this.$route.query.deletIds) {
    //   this.deletIds = this.$route.query.deletIds.split(',');
    // }
    // sessionStorage.setItem('ActivityItem', '');
    // this.setActivity('');
  },
  methods: {
    deleteExistProject(arr) {//删除已有数据
      if(this.$route.query.deletIds) {
        this.deletIds = this.$route.query.deletIds.split(',');
      };
      arr.map((item)=>{
        let projectList = item.items,newProject = [];
        projectList.forEach((proChild,index)=>{
          this.deletIds.forEach((deleId)=>{
            if(proChild.classTestId == deleId) projectList.splice(index,1);
          })
        });
        item.items = projectList;
        return item;
      })
    },
    ...mapMutations('pageParams', ['setGradeList','setActivity']),
    async queryProject() { //查询特定年级下的项目
      let res;
      res = await api.getExamItemActivityItem(this.$route.query);
      if(res.data.code == 10000) {
        let items = this.assembleData(res.data.response);
        this.deleteExistProject(items);
        this.gradeList = items;
      }
    },
    async queryTestAllProject(classTestId) { //查询该测试的所有项目
      let res = await api.getExamItemsByClassTestId({classTestId:classTestId});
      if(res.data.code == 10000) {
        this.detailInfoList = res.data.response;
      }
    },
    unfold(index,proIndex) {//展开方法
      let list = JSON.parse(JSON.stringify(this.gradeList)),open = this.gradeList[index].items[proIndex].open;
      list[index].items[proIndex].open = !open;
      this.gradeList = list;
      if(list[index].items[proIndex].open) this.queryTestAllProject(list[index].items[proIndex].classTestId);
    },
    assembleData(arr) {//组装项目数据
      let newProject = arr.map((item) => {
        let items = item.items.map((child)=> {
          child.single = false;
          child.open = false;
          child.testType = this.$route.query.examType;
          let selectChild = this.reproductionData(child);
          return selectChild;
        });
        item.items = _.uniqBy(items,'classTestId');
        return item;
      });
      return newProject
    },
    reproductionData(arr) {//复现数据
      let selectData = this.ActivityItem;
      if(selectData.length) {
        selectData.forEach(activityChild => {
          if(activityChild.classTestId == arr.classTestId&&activityChild.testType == arr.testType) {
             activityChild.single = true;
            activityChild.open = false;
            arr = activityChild
          }
        });
      }
      return arr
    },
    assemble(arr) {//组装保存的数据
      let parmas = [];
      arr.map((item)=>{
        let childs = item.items;
        childs.map((child) => {
          if(child.single) {
            parmas.push({
              ...child,
              grade:this.$route.query.grade,
              testType:this.$route.query.examType,
            })
          }
        })
      })
      return parmas;
    },
    async baseSubmit() {
      let arr = this.assemble(this.gradeList);
      await this.setActivity(arr);
      this.$router.go(-1);
    },
    goback() {
      this.$router.go(-1);
    },
  },
  watch: {},
  beforeDestroy() {},
  mounted() {

  },
};
</script>
<style scoped lang="less">
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
.project-table{
  margin: 20px 0px;
  border: 1px solid rgb(191, 201, 206);
}
.border-all>#border-hide:first-child {
  color:red;
}
</style>
