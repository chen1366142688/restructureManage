<style scoped>
.configure {
  position: absolute;
  top: 9px;
  right: 740px;
}
.one {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.gradeItem {
  width: 300px;
  height: 100%;
  border: 1px solid rgba(191, 201, 206, 1);
  margin: 22px 7px;
  border-radius: 5px 5px 0px 0px;
  /* text-align: center; */
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
  box-sizing: border-box;
  padding: 18px 0;
}
.sectionNot {
  width: 100%;
  height: 296px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
}
.title {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  padding-right: 150px;
}
.itemsData {
  width: 100%;
  height: 30px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #515a6e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;

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
.text-green {
  color: #00c693;
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">技能项目配置</h2>
    </div>
    <Card>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
        <TabPane
          :name="grade.gradeId"
          :label="grade.val"
          v-for="grade in gradeList"
          :key="grade.gradeId"
          style="height:700px;overflow-y:auto;overflow-x:hidden;"
        >
          <div v-for="(examItem,indexa) in itemList" style="margin-top:10px;border: 1px solid rgba(191, 201, 206, 1);margin: 20px 0;" :dis-hover="true" :key="indexa">
            <div class="project-info-data"  v-if="itemList" style="cursor: pointer;">
              <div class="pro-l" @click="openOrCloseItem(examItem,indexa)" >
                <div class="test_project" style="width:100px;word-break:break-all;text-align: center;" >
                  {{examItem.itemName}}
                </div>
                <Icon style="margin-left:5px" size="8" color="#333" :type="examItem.open?'ios-arrow-up':'ios-arrow-down'"></Icon>
              </div>
              <div class="test_project-info">
                <template v-for="(classTestInfo,indexb) in examItem.classTestList" v-if="examItem.open">
                  <div id="border-hide">
                    <Row type="flex" align="middle">
                      <Col span="4" class="itemTitle" style="border-right: none;display:flex;align-items:flex-start;flex-direction: column;padding-left:30px;height:129px;justify-content: center">
                        <div style="height:100px;border-right:1px solid #DCDEE2;width:100%;">
                          <!-- 一级项目名称 -->
                          <div class="ball_li" style="padding-top:18px;">
                            {{classTestInfo.classTestName}}
                          </div>
                          <!-- 收起、展开 -->
                          <div class="openBtn" @click="openOrCloseFun(classTestInfo,indexa,indexb,1)">
                            {{classTestInfo.open?'收起':'展开'}}
                            <Icon style="margin-left:2px" size="16" color="#FFF" :type="classTestInfo.open ? 'md-arrow-dropdown' : 'md-arrow-dropup'"></Icon>
                          </div>
                        </div>
                      </Col>
                      <Col span="20" style="display:flex;align-items: flex-start;flex-direction: column;">
                        <div v-if="classTestInfo.showList.length>0" style="width:100%;box-sizing:border-box;padding:20px 16px;">
                          <Table  :columns="resultColumns" :data="classTestInfo.showList"></Table>
                        </div>
                        <Button size="small" type="success" style="margin:20px 16px;" @click="addClass(indexa,indexb)" v-if="classTestInfo.showList.length>0">添加学习班级</Button>
                        <Button size="small" type="success" style="margin:20px 16px;" @click="addClass(indexa,indexb)" v-else>添加学习班级</Button>
                      </Col>
                    </Row>
                  </div>
                  <Row style="margin-left:30px;" v-if="classTestInfo.open">
                    <transition name="fade">
                      <Tabs type="card" transiton="fade">
                        <TabPane
                          :name="detailInfo.examItemName"
                          :label="detailInfo.scorePercent?detailInfo.examItemName+'('+(detailInfo.scorePercent/100).toFixed(2)+'%)':detailInfo.examItemName"
                          v-for="detailInfo in classTestInfo.detail"
                          :key="detailInfo.examItemId"
                        >
                          <div>
                            <p style="margin-top:15px;font-size: 15px;color: #515A6E;" v-html="'测试场地：'+(detailInfo.testPlaceRemark?detailInfo.testPlaceRemark:'')"></p>
                            <div class="imgData" v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 1">
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
                            <div class="imgData" v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 2">
                              <video
                                width="88"
                                height="88"
                                :src="imgItem.pictureAddr"
                                v-for="imgItem in detailInfo.placeList"
                                :key="imgItem.classTestId"
                              >
                              </video>
                            </div>
                          </div>
                          <div>
                            <p style="margin-top:15px;font-size: 15px;color: #515A6E; " v-html="'测试方法：'+(detailInfo.testMethodsRemark?detailInfo.testMethodsRemark:'')"></p>
                            <div class="imgData" v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 1">
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
                            <div class="imgData" v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 2">
                              <video
                                width="88"
                                height="88"
                                :src="imgItem.pictureAddr"
                                v-for="imgItem in detailInfo.methodList"
                                :key="imgItem.classTestId"
                              >
                              </video>
                            </div>
                          </div>
                          <div>
                            <p style="margin-top:15px;font-size: 15px;color: #515A6E;" v-html="'评分标准：'+(detailInfo.testStandardRemark?detailInfo.testStandardRemark:'')"></p>
                          </div>
                        </TabPane>
                      </Tabs>
                    </transition>
                  </Row>
                </template>
                <!-- 不展开是默认显示第一条项目的数据 -->
                <div id="border-hide" v-if="!examItem.open">
                  <Row type="flex" align="middle">
                    <Col span="4" class="itemTitle" style="border-right: none;display:flex;align-items:flex-start;flex-direction: column;padding-left:30px;height:129px;justify-content: center">
                      <div style="height:100px;border-right:1px solid #DCDEE2;width:100%;">
                        <!-- 一级项目名称 -->
                        <div class="ball_li" style="padding-top:18px;">
                          {{examItem.classTestList[0].classTestName}}
                        </div>
                        <!-- 收起、展开 -->
                        <div class="openBtn" @click="openOrCloseFun(examItem.classTestList[0],indexa,0,1)">
                          {{examItem.classTestList[0].open?'收起':'展开'}}
                          <Icon style="margin-left:2px" size="16" color="#FFF" :type="examItem.classTestList[0].open ? 'md-arrow-dropdown' : 'md-arrow-dropup'"></Icon>
                        </div>
                      </div>
                    </Col>
                    <Col span="20" style="display:flex;align-items: flex-start;flex-direction: column;">
                      <div v-if="examItem.classTestList[0].showList.length>0" style="width:100%;box-sizing:border-box;padding:20px 16px;">
                        <Table  :columns="resultColumns" :data="examItem.classTestList[0].showList"></Table>
                      </div>
                      <Button size="small" type="success" style="margin:20px 16px;" @click="addClass(indexa,0)" v-if="examItem.classTestList[0].showList.length>0">添加学习班级</Button>
                      <Button size="small" type="success" style="margin:20px 16px;" @click="addClass(indexa,0)" v-else>添加学习班级</Button>
                    </Col>
                  </Row>
                </div>
                <!-- 不展开是默认显示第一条项目的数据 -->
                <div v-if="!examItem.open && examItem.classTestList[0].open" style="padding-left:30px;">
                  <transition name="fade">
                      <Tabs type="card" transiton="fade">
                        <TabPane
                          :name="detailInfo.examItemName"
                          :label="detailInfo.scorePercent ? detailInfo.examItemName+'('+(detailInfo.scorePercent/100).toFixed(2)+'%)':detailInfo.examItemName"
                          v-for="detailInfo in examItem.classTestList[0].detail"
                          :key="detailInfo.examItemId"
                        >
                          <div>
                            <p style="margin-top:15px;font-size: 15px;color: #515A6E;" v-html="'测试场地：'+(detailInfo.testPlaceRemark?detailInfo.testPlaceRemark:'')"></p>
                            <div class="imgData" v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 1">
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
                            <div class="imgData" v-if="detailInfo.placeList.length >0 && detailInfo.placeList[0].resourceType == 2">
                              <video
                                width="88"
                                height="88"
                                :src="imgItem.pictureAddr"
                                v-for="imgItem in detailInfo.placeList"
                                :key="imgItem.classTestId"
                              >
                              </video>
                            </div>
                          </div>
                          <div>
                            <p style="margin-top:15px;font-size: 15px;color: #515A6E; " v-html="'测试方法：'+(detailInfo.testMethodsRemark?detailInfo.testMethodsRemark:'')"></p>
                            <div class="imgData" v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 1">
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
                            <div class="imgData" v-if="detailInfo.methodList.length >0 && detailInfo.methodList[0].resourceType == 2">
                              <video
                                width="88"
                                height="88"
                                :src="imgItem.pictureAddr"
                                v-for="imgItem in detailInfo.methodList"
                                :key="imgItem.classTestId"
                              >
                              </video>
                            </div>
                          </div>
                          <div>
                            <p style="margin-top:15px;font-size: 15px;color: #515A6E;" v-html="'评分标准：'+(detailInfo.testStandardRemark?detailInfo.testStandardRemark:'')"></p>
                          </div>
                        </TabPane>
                      </Tabs>
                    </transition>
                </div>
              </div>
            </div>
          </div>
          <!-- 考核项目总数统计 -->
          <div class="one">
            <div
              class="gradeItem"
              v-for="item in gradeAllList"
              :value="item.sportsClassId"
              :key="item.sportsClassId"
            >
              <div class="top">{{item.sportsClassName}}</div>
              <div class="sections" v-if="item.showList.length>0" style="height:296px;overflow-y:scroll;">
                <div v-for="(exam,index) in item.showList" :key="index" style="margin-bottom:30px;">
                  <p
                    style="text-align:left;margin-left:20px;color:#00C693;font-size:16px;line-height:28px;"
                  >
                    <b>{{exam.classTestName}}</b>
                  </p>
                  <p style="text-align:left;margin-left:40px;">学习时间：{{exam.learnTime}}</p>
                  <p style="text-align:left;margin-left:40px;" v-if="exam.classTime>0">课时：{{exam.classTime}}</p>
                </div>
              </div>
              <div class="sectionNot" v-else>暂无考核项目</div>
              <div class="bottom">考核项目总数：{{item.examItemClassNum}}</div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Card>
    <!-- 返回、保存按钮 -->
    <div style="margin-top:10px;padding-left:45%">
      <Button size="large" type="success" style="margin-right:40px;" @click="goback">返回</Button>
      <Button size="large" type="success" style="margin-right:40px;" @click="baseSubmit">保存</Button>
    </div>
    <!-- 弹出框 -->
    <div id="modal" v-if="loadingStatus">
      <Spin fix>
        <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
    <!-- 弹出框 -->
    <Modal v-model="classAddModel" :closable="false" :mask-closable="false" width="460">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加学习班级</span>
      </p>
      <div>
        <h4 style="margin-left:0px;">学习班级：</h4>
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
          <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <CheckboxGroup v-model="classTestWeeks.sportsClassIds" @on-change="checkAllGroupChange">
          <Checkbox
            :label="sportsClass.sportsClassId"
            v-for="(sportsClass,index) in gradeSportsClassList" :key="index"
          >{{sportsClass.sportsClassName}}</Checkbox>
        </CheckboxGroup>
        <h4 style="margin-left:0px;margin-top:20px;">学习时间：</h4>
        <div v-for="(week,indexW) in classTestWeeks.weeks" :key="indexW" style="margin-top:20px;">
          第
          <Select v-model="week.weekStart" size="small" style="width:100px">
            <Option v-for="item in weekList" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>周~第
          <Select v-model="week.weekEnd" size="small" style="width:100px">
            <Option v-for="item in weekList" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>周
          <Button
            type="success"
            size="small"
            style="margin-left:20px;"
            v-if="indexW==0"
            @click="addWeek"
          >添加学习周</Button>
          <Button
            type="success"
            size="small"
            style="margin-left:20px;"
            v-else
            @click="deleteWeek(indexW)"
          >删除学习周</Button>
        </div>
      </div>
      <div slot="footer">
        <Button type="success" size="large" @click="cancle">取消</Button>
        <Button type="success" size="large" @click="preSave">保存</Button>
      </div>
    </Modal>
    <!-- loading -->
    <div id="modal" v-if="loadingStatus">
      <Spin fix>
        <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
export default {
  name: "skillItemConfigurationDetail",
  data() {
    
    return {
      classData: {},
      classTestId: "",
      classTestWeeks: {
        classTestId: "",
        sportsClassIds: [],
        weeks: [
          {
            weekStart: "",
            weekEnd: ""
          }
        ]
      },
      checkAll: false,
      gradeSportsClassList: [],
      classAddModel: false,
      schoolId: "",
      gradeAllList: [],
      loadingStatus: true,
      selectTabName: "",
      classTestType: "2",
      loading: false,
      gradeList: [],
      itemList: [],
      saveList: [],
      weekList: [
        {
          name: 1,
          value: 1
        },
        {
          name: 2,
          value: 2
        },
        {
          name: 3,
          value: 3
        },
        {
          name: 4,
          value: 4
        },
        {
          name: 5,
          value: 5
        },
        {
          name: 6,
          value: 6
        },
        {
          name: 7,
          value: 7
        },
        {
          name: 8,
          value: 8
        },
        {
          name: 9,
          value: 9
        },
        {
          name: 10,
          value: 10
        },
        {
          name: 11,
          value: 11
        },
        {
          name: 12,
          value: 12
        },
        {
          name: 13,
          value: 13
        },
        {
          name: 14,
          value: 14
        },
        {
          name: 15,
          value: 15
        },
        {
          name: 16,
          value: 16
        },
        {
          name: 17,
          value: 17
        },
        {
          name: 18,
          value: 18
        },
        {
          name: 19,
          value: 19
        },
        {
          name: 20,
          value: 20
        },
        {
          name: 21,
          value: 21
        },
        {
          name: 22,
          value: 22
        },
        {
          name: 23,
          value: 23
        },
        {
          name: 24,
          value: 24
        },
        {
          name: 25,
          value: 25
        },
        {
          name: 26,
          value: 26
        },
        {
          name: 27,
          value: 27
        },
        {
          name: 28,
          value: 28
        },
        {
          name: 29,
          value: 29
        },
        {
          name: 30,
          value: 30
        }
      ],
      resultColumns: [
        {
          title: "学习时间",
          key: "weekStart",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.weekStart.length > 0) {
              for (let i = 0; i < row.weekStart.length; i++) {
                let weekStart = row.weekStart[i];
                text += "第" + weekStart + "~" + row.weekEnd[i] + "周    ";
              }
            }
            return h("span", text);
          }
        },
        {
          title: "学习班级",
          key: "sportsClassName",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (row.sportsClassName.length > 0) {
              for (let i = 0; i < row.sportsClassName.length; i++) {
                if (i == 0) {
                  text += row.sportsClassName[i];
                } else {
                  text += "，" + row.sportsClassName[i];
                }
              }
            }
            return h("span", text);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.updateClass(row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.delectClass(row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      resultData: [],
      total: 0,
      addTf: false,
      otherClassTestWeeks: {},
      updateShow: {}
    };
  },

  methods: {
     isType(obj, type){
      if (typeof obj !== 'object') return false;
      // 判断数据类型的经典方法：
      const typeString = Object.prototype.toString.call(obj);
      let flag;
      switch (type) {
        case 'Array':
          flag = typeString === '[object Array]';
          break;
        case 'Date':
          flag = typeString === '[object Date]';
          break;
        case 'RegExp':
          flag = typeString === '[object RegExp]';
          break;
        default:
          flag = false;
      }
      return flag;
    },
     getRegExp (re)  {
      var flags = '';
      if (re.global) flags += 'g';
      if (re.ignoreCase) flags += 'i';
      if (re.multiline) flags += 'm';
      return flags;
    },
    clone (parent)  {
      // 维护两个储存循环引用的数组
      const parents = [];
      const children = [];

      const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;

        if (this.isType(parent, 'Array')) {
          // 对数组做特殊处理
          child = [];
        } else if (this.isType(parent, 'RegExp')) {
          // 对正则对象做特殊处理
          child = new RegExp(parent.source, this.getRegExp(parent));
          if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (this.isType(parent, 'Date')) {
          // 对Date对象做特殊处理
          child = new Date(parent.getTime());
        } else {
          // 处理对象原型
          proto = Object.getPrototypeOf(parent);
          // 利用Object.create切断原型链
          child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
          // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
          return children[index];
        }
        parents.push(parent);
        children.push(child);

        for (let i in parent) {
          // 递归
          child[i] = _clone(parent[i]);
        }

        return child;
      };
      return _clone(parent);
    },
    openOrCloseItem(examItem, indexa) {
      var vm = this;
      vm.itemList[indexa].open = !examItem.open;
    },
    addWeek() {
      var vm = this;
      let classTestWeeks = vm.classTestWeeks;
      let week = {
        weekStart: "",
        weekEnd: "",
      };
      classTestWeeks.weeks.push(week);
    },
    deleteWeek(indexW) {
      var vm = this;
      let classTestWeeks = vm.classTestWeeks;
      classTestWeeks.weeks.splice(indexW, 1);
    },
    preSave() {
      var vm = this;
      let classTestWeeks = vm.classTestWeeks;
      
      // let otherClassTestWeeks=vm.otherClassTestWeeks;
      let classData = vm.classData;
      let classTestId = classData.classTestId;
      let itemList = vm.itemList;
      if (!vm.addTf) {
        let show = vm.updateShow;
        let index = show._index;
        let weekVOlist = [];
        let chooseClassTest={};
        for(let k=0;k<itemList.length;k++){
            let item=itemList[k];
            for(let x=0;x<item.classTestList.length;x++){
              let classTest=item.classTestList[x];
                if(classTest.classTestId==classData.classTestId){
                  chooseClassTest=classTest;
                }
            }
        }
        for (let i = 0; i < show.weekMerge.length; i++) {
          let weekMerge = show.weekMerge[i];
          for (let j = 0; j < chooseClassTest.list.length; j++) {
            let otherWeek = chooseClassTest.list[j];
            if (weekMerge == otherWeek.weekMerge){
              chooseClassTest.list.splice(j,1)
            }
          }
          for (let j = 0; j < classData.list.length; j++) {
            let otherWeek = classData.list[j];
            if (weekMerge == otherWeek.weekMerge){
               classData.list.splice(j,1)
            }
          }
        }
      }
      //  classData.list=[];

      if (classTestWeeks.sportsClassIds.length < 1) {
        vm.$Message.info(
          "请选择" + classTestWeeks.classTestName + "项目的学习班级!"
        );
        return;
      }
      if (classTestWeeks.weeks.length < 1) {
        vm.$Message.info(
          "请选择" + classTestWeeks.classTestName + "项目的学习时间!"
        );
        return;
      }
      for (let i = 0; i < classTestWeeks.weeks.length; i++) {
        let week = classTestWeeks.weeks[i];
        if (!week.weekStart || !week.weekEnd) {
          vm.$Message.info("请选择上课周数！");
          return;
        }
        if (week.weekStart > week.weekEnd) {
          vm.$Message.info("起始周不能大于结束周！");
          return;
        }
        for (let j = i + 1; j < classTestWeeks.weeks.length; j++) {
          let otherWeek = classTestWeeks.weeks[j];
          if (
            (week.weekStart < otherWeek.weekStart &&
              week.weekEnd < otherWeek.weekStart) ||
            (week.weekStart > otherWeek.weekEnd &&
              week.weekEnd > otherWeek.weekEnd)
          ) {
            // if( (otherWeek.weekStart < week.weekStart &&
            //     otherWeek.weekEnd < week.weekStart) ||
            //   (otherWeek.weekStart > week.weekEnd &&
            //     otherWeek.weekEnd > week.weekEnd)){
            //       vm.$Message.info("学习时间有重叠，请重新选择");
            //       return;
            //     }
          } else {
            vm.$Message.info("学习时间有重叠，请重新选择");
            return;
          }
        }
        
      }
      for (let i = 0; i < classTestWeeks.sportsClassIds.length; i++) {
        for (let j = 0; j < classTestWeeks.weeks.length; j++) {
          let params = {
            classTestId: classTestId,
            sportsClassId: classTestWeeks.sportsClassIds[i],
            sportsClassName: classTestWeeks.sportsClassNames[i],
            weekEnd: classTestWeeks.weeks[j].weekEnd,
            weekMerge:classTestWeeks.weeks[j].weekStart +"" +classTestWeeks.weeks[j].weekEnd,
            weekStart: classTestWeeks.weeks[j].weekStart
          };
          for (let z = 0; z < classData.list.length; z++) {
            let week = classData.list[z];
              if (week.sportsClassId == params.sportsClassId) {
                if (
                  (params.weekStart < week.weekStart &&
                    params.weekEnd < week.weekStart) ||
                  (params.weekStart > week.weekEnd &&
                    params.weekEnd > week.weekEnd)
                ) {
                } else {
                  vm.$Message.info("学习时间有重叠，请重新选择");
                  return;
                }
              }
          }

          for(let k=0;k<itemList.length;k++){
            let item=itemList[k];
            for(let x=0;x<item.classTestList.length;x++){
              let classTest=item.classTestList[x];
              for(let y=0;y<classTest.list.length;y++){
                let chooseWeek=classTest.list[y];

                if (params.sportsClassId == chooseWeek.sportsClassId) {
                  if (
                    (params.weekStart < chooseWeek.weekStart &&
                      params.weekEnd < chooseWeek.weekStart) ||
                    (params.weekStart > chooseWeek.weekEnd &&
                      params.weekEnd > chooseWeek.weekEnd)
                  ) {
                   
                  } else {
                    if(classTest.classTestName==classData.classTestName){
                      vm.$Message.info("学习时间有重叠，请重新选择");
                    }else{
                      vm.$Message.info("与"+classTest.classTestName+"项目的学习时间有重叠，请重新选择");
                    }
                    return;
                  }
                }
              }
            }
        }


          if (vm.myIndexOf(classData.list, params) < 0 && vm.myTotalIndexOf(itemList,params)<0) {
            classData.list.push(params);
          } else {
            vm.$Message.info("学习时间有重叠，请重新选择");
            return;
          }
        }
      }
      
      for (let z = 0; z < classData.list.length; z++) {
        let week = classData.list[z];
        if (week.weekStart > week.weekEnd) {
          vm.$Message.info("起始周不能大于结束周！");
          return;
        }
        for (let x = z + 1; x < classData.list.length; x++) {
          let otherWeek = classData.list[x];
          if (week.sportsClassId == otherWeek.sportsClassId) {
            if (
              (week.weekStart < otherWeek.weekStart &&
                week.weekEnd < otherWeek.weekStart) ||
              (week.weekStart > otherWeek.weekEnd &&
                week.weekEnd > otherWeek.weekEnd)
            ) {
             
            } else {
               vm.$Message.info("学习时间有重叠，请重新选择");
              return;
            }
          }
        }
        for(let k=0;k<itemList.length;k++){
          let item=itemList[k];
          for(let x=0;x<item.classTestList.length;x++){
            let classTest=item.classTestList[x];
            for(let y=0;y<classTest.list.length;y++){
              let chooseWeek=classTest.list[y];

              if(classTest.classTestId==classData.classTestId && week.weekStart == chooseWeek.weekStart && week.weekEnd == chooseWeek.weekEnd
              && week.sportsClassId == chooseWeek.sportsClassId){
                continue;
              }
              if (week.sportsClassId == chooseWeek.sportsClassId) {
                if (
                  (week.weekStart < chooseWeek.weekStart &&
                    week.weekEnd < chooseWeek.weekStart) ||
                  (week.weekStart > chooseWeek.weekEnd &&
                    week.weekEnd > chooseWeek.weekEnd)
                ) {
                  // if( (chooseWeek.weekStart < week.weekStart &&
                  //   chooseWeek.weekEnd < week.weekStart) ||
                  // (chooseWeek.weekStart > week.weekEnd &&
                  //   chooseWeek.weekEnd > week.weekEnd)){
                  //     vm.$Message.info("学习时间有重叠，请重新选择");
                  //     return;
                  //   }
                } else {
                  if(classTest.classTestName==classData.classTestName){
                    vm.$Message.info("学习时间有重叠，请重新选择");
                  }else{
                    vm.$Message.info("与"+classTest.classTestName+"项目的学习时间有重叠，请重新选择");
                  }
                  return;
                }
              }
            }
          }
       }
      }
      vm.saveList = [];
      
      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        for (let j = 0; j < item.classTestList.length; j++) {
          let classTest = item.classTestList[j];
          classTest.showList = [];
          if (classData.classTestId == classTest.classTestId) {
            classTest.list = classData.list;
          }
          let weekArr = [];

          //相同周分组
          for (let k = 0; k < classTest.list.length; k++) {
            let selectClass = classTest.list[k];
            let save = {
              classTestId: classTest.classTestId,
              classTestName: classTest.classTestName,
              weekStart: selectClass.weekStart,
              weekEnd: selectClass.weekEnd,
              weekMerge: selectClass.weekMerge,
              sportsClassId: selectClass.sportsClassId,
              sportsClassName: selectClass.sportsClassName
            };
            vm.saveList.push(save);
            let show = {
              weekStart: [],
              weekEnd: [],
              weekMerge: [],
              sportsClassName: [],
              sportsClassId: [],
              sortSportsClassId: "",
              classTestId: classTest.classTestId,
              itemId: classTest.itemId,
              classTestName: classTest.classTestName
            };
            show.weekStart.push(selectClass.weekStart);
            show.weekEnd.push(selectClass.weekEnd);
            show.weekMerge.push(selectClass.weekMerge);
            show.sportsClassName.push(selectClass.sportsClassName);
            show.sportsClassId.push(selectClass.sportsClassId);
            if (weekArr.indexOf(selectClass.weekMerge) > -1) {
              continue;
            } else {
              weekArr.push(selectClass.weekMerge);
              for (let l = k + 1; l < classTest.list.length; l++) {
                let selectClassOther = classTest.list[l];
                if (
                  selectClass.weekMerge == selectClassOther.weekMerge &&
                  selectClass.sportsClassName !=
                    selectClassOther.sportsClassName
                ) {
                  show.sportsClassName.push(selectClassOther.sportsClassName);
                  show.sportsClassId.push(selectClassOther.sportsClassId);
                }
              }
            }
            show.sortSportsClassId = vm.sortAndReturn(show.sportsClassId);
            if (show.weekStart.length > 0) {
              classTest.showList.push(show);
            }
          }
          //相同班分组
          if (classTest.showList.length > 0) {
            for (let p = 0; p < classTest.showList.length; p++) {
              let show = classTest.showList[p];
              for (let q = p + 1; q < classTest.showList.length; q++) {
                let otherShow = classTest.showList[q];
                if (otherShow.sortSportsClassId == show.sortSportsClassId) {
                  show.weekStart.push(otherShow.weekStart);
                  show.weekEnd.push(otherShow.weekEnd);
                  show.weekMerge.push(otherShow.weekMerge);
                  classTest.showList.splice(q, 1);
                  q--;
                }
              }
            }
          }
        }
      }
      let gradeAllList = [];
      if (vm.saveList.length > 0) {
        for (let j = 0; j < vm.gradeSportsClassList.length; j++) {
          let gradeClss = vm.gradeSportsClassList[j];
          let params = {
            examItemClassNum: 0,
            sportsClassId: gradeClss.sportsClassId,
            sportsClassName: gradeClss.sportsClassName,
            list: []
          };
          let itemNameArr = [];
          for (let i = 0; i < vm.saveList.length; i++) {
            let weekVO = vm.saveList[i];
            if (weekVO.sportsClassId == gradeClss.sportsClassId) {
              let weekParams = {
                classTestId: weekVO.classTestId,
                classTestName: weekVO.classTestName,
                sportsClassId: weekVO.sportsClassId,
                sportsClassName: weekVO.sportsClassName,
                weekEnd: weekVO.weekEnd,
                weekMerge: weekVO.weekStart + "" + weekVO.weekEnd,
                weekStart: weekVO.weekStart
              };
              if (itemNameArr.indexOf(weekVO.classTestId) < 0) {
                itemNameArr.push(weekVO.classTestId);
                params.examItemClassNum += 1;
              }
              params.list.push(weekParams);
            }
          }
          gradeAllList.push(params);
        }
      }
      vm.dealBelowData(gradeAllList);
      vm.classAddModel = false;
      vm.itemList = itemList;
    },
    addClass(indexa, indexb) {
      var vm = this;
      vm.checkAll = false;
      vm.addTf = true;
      vm.classTestWeeks = {};
      let classData = vm.clone(vm.itemList[indexa].classTestList[indexb]);
      let classTestId = classData.classTestId;
      let classTestWeeks = {
        classTestId: classTestId,
        sportsClassIds: [],
        sportsClassNames: [],
        classTestName: classData.classTestName,
        weeks: [
          {
             weekStart: '',
            weekEnd:'',
          }
         
        ]
      };
      // for(let i=0;i<classData.list.length;i++){
      //   let week=classData.list[i];
      //   if(classTestWeeks.sportsClassIds.indexOf(week.sportsClassId)<0){
      //     classTestWeeks.sportsClassIds.push(week.sportsClassId);
      //     classTestWeeks.sportsClassNames.push(week.sportsClassName);
      //   }
      //   let startEnd={
      //       weekStart: week.weekStart,
      //       weekEnd:week.weekEnd,
      //     };
      //     classTestWeeks.weeks.push(startEnd);
      // }
      vm.classData = classData;
      vm.classTestWeeks = classTestWeeks;
      vm.classAddModel = true;
    },
    updateClass(show) {
      var vm = this;
      let classTestId = show.classTestId;
      vm.addTf = false;
      vm.updateShow = show;
      for (let i = 0; i < vm.itemList.length; i++) {
        if (vm.itemList[i].itemId == show.itemId) {
          let item = vm.itemList[i];
          for (let j = 0; j < item.classTestList.length; j++) {
            if (show.classTestId == item.classTestList[j].classTestId) {
              vm.classData =vm.clone(item.classTestList[j]) ;
            }
          }
        }
      }

      let classTestWeeks = {
        classTestId: classTestId,
        sportsClassIds: [],
        sportsClassNames: [],
        weeks: [],
        classTestName: show.classTestName
      };

      for (let j = 0; j < show.weekStart.length; j++) {
        let week = {
          weekStart: show.weekStart[j],
          weekEnd: show.weekEnd[j]
        };
        classTestWeeks.weeks.push(week);
      }
      // for(let i=0;i<vm.gradeSportsClassList.length;i++){
      //   let sportsClass=vm.gradeSportsClassList[i];
      //   for(let j=0;j<show.sportsClassId.length;j++){
      //     let sportsClassId=show.sportsClassId[j];
      //       if(sportsClassId==sportsClass.sportsClassId){
      //         classTestWeeks.sportsClassIds.push(sportsClassId)
      //         classTestWeeks.sportsClassNames.push(sportsClass.sportsClassName)
      //     }
      //   }
      // }
      for (let i = 0; i < vm.gradeSportsClassList.length; i++) {
        let sportsClass = vm.gradeSportsClassList[i];
        for (let j = 0; j < show.sportsClassId.length; j++) {
          let sportsClassId = show.sportsClassId[j];
          if (sportsClassId == sportsClass.sportsClassId) {
            classTestWeeks.sportsClassIds.push(sportsClassId);
            classTestWeeks.sportsClassNames.push(sportsClass.sportsClassName);
          }
        }
      }
      if (
        classTestWeeks.sportsClassIds.length == vm.gradeSportsClassList.length
      ) {
        vm.checkAll = true;
      } else {
        vm.checkAll = false;
      }
      vm.classTestWeeks = classTestWeeks;
      vm.classAddModel = true;
    },

    delectClass(show) {
      var vm = this;
      for (let i = 0; i < vm.itemList.length; i++) {
        if (vm.itemList[i].itemId == show.itemId) {
          let item = vm.itemList[i];
          for (let j = 0; j < item.classTestList.length; j++) {
            if (show.classTestId == item.classTestList[j].classTestId) {
              vm.classData = item.classTestList[j];
            }
          }
        }
      }
      let classData = vm.classData;
      for (let j = 0; j < classData.list.length; j++) {
        let params = classData.list[j];
        for (let i = 0; i < show.sportsClassId.length; i++) {
          let sportsClassId = show.sportsClassId[i];
          for (let k = 0; k < show.weekStart.length; k++) {
            if (
              params.classTestId == show.classTestId &&
              params.sportsClassId == sportsClassId &&
              params.weekStart == show.weekStart[k] &&
              params.weekEnd == show.weekEnd[k]
            ) {
              classData.list.splice(j, 1);
              j--;
            }
          }
        }
      }
      vm.saveList = [];
      let index = show._index;
      let itemList = vm.itemList;
      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        // if(item.itemId==classData.itemId){
        for (let j = 0; j < item.classTestList.length; j++) {
          let classTest = item.classTestList[j];
          classTest.showList = [];
          if (classData.classTestId == classTest.classTestId) {
            classTest.list = classData.list;
          }
          let weekArr = [];

          //相同周分组
          for (let k = 0; k < classTest.list.length; k++) {
            let selectClass = classTest.list[k];
            let save = {
              classTestId: classTest.classTestId,
              classTestName: classTest.classTestName,
              weekStart: selectClass.weekStart,
              weekEnd: selectClass.weekEnd,
              weekMerge: selectClass.weekMerge,
              sportsClassId: selectClass.sportsClassId,
              sportsClassName: selectClass.sportsClassName
            };
            vm.saveList.push(save);
            let show = {
              weekStart: [],
              weekEnd: [],
              weekMerge: [],
              sportsClassName: [],
              sportsClassId: [],
              sortSportsClassId: "",
              classTestId: classTest.classTestId,
              itemId: classTest.itemId,
              classTestName: classTest.classTestName
            };

            show.weekStart.push(selectClass.weekStart);
            show.weekEnd.push(selectClass.weekEnd);
            show.weekMerge.push(selectClass.weekMerge);
            show.sportsClassName.push(selectClass.sportsClassName);
            show.sportsClassId.push(selectClass.sportsClassId);
            if (weekArr.indexOf(selectClass.weekMerge) > -1) {
              continue;
            } else {
              weekArr.push(selectClass.weekMerge);
              for (let l = k + 1; l < classTest.list.length; l++) {
                let selectClassOther = classTest.list[l];
                if (
                  selectClass.weekMerge == selectClassOther.weekMerge &&
                  selectClass.sportsClassName !=
                    selectClassOther.sportsClassName
                ) {
                  show.sportsClassName.push(selectClassOther.sportsClassName);
                  show.sportsClassId.push(selectClassOther.sportsClassId);
                }
              }
            }
            show.sortSportsClassId = vm.sortAndReturn(show.sportsClassId);
            if (show.weekStart.length > 0) {
              classTest.showList.push(show);
            }
          }
          //相同班分组
          if (classTest.showList.length > 0) {
            for (let p = 0; p < classTest.showList.length; p++) {
              let show = classTest.showList[p];
              for (let q = p + 1; q < classTest.showList.length; q++) {
                let otherShow = classTest.showList[q];
                if (otherShow.sortSportsClassId == show.sortSportsClassId) {
                  show.weekStart.push(otherShow.weekStart);
                  show.weekEnd.push(otherShow.weekEnd);
                  show.weekMerge.push(otherShow.weekMerge);
                  classTest.showList.splice(q, 1);
                  q--;
                }
              }
            }
          }
        }
        // }
      }
      let gradeAllList = [];
      if (vm.saveList.length > 0) {
        for (let j = 0; j < vm.gradeSportsClassList.length; j++) {
          let gradeClss = vm.gradeSportsClassList[j];
          let params = {
            examItemClassNum: 0,
            sportsClassId: gradeClss.sportsClassId,
            sportsClassName: gradeClss.sportsClassName,
            list: []
          };
          let itemNameArr = [];
          for (let i = 0; i < vm.saveList.length; i++) {
            let weekVO = vm.saveList[i];
            if (weekVO.sportsClassId == gradeClss.sportsClassId) {
              let weekParams = {
                classTestId: weekVO.classTestId,
                classTestName: weekVO.classTestName,
                sportsClassId: weekVO.sportsClassId,
                sportsClassName: weekVO.sportsClassName,
                weekEnd: weekVO.weekEnd,
                weekMerge: weekVO.weekStart + "" + weekVO.weekEnd,
                weekStart: weekVO.weekStart
              };
              if (itemNameArr.indexOf(weekVO.classTestId) < 0) {
                itemNameArr.push(weekVO.classTestId);
                params.examItemClassNum += 1;
              }
              params.list.push(weekParams);
            }
          }
          gradeAllList.push(params);
        }
      }
      vm.dealBelowData(gradeAllList);
      vm.itemList = itemList;
    },
    cancle() {
      var vm = this;
      vm.classAddModel = false;
      
      vm.saveList = [];
      let itemList = vm.itemList;
      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        for (let j = 0; j < item.classTestList.length; j++) {
          let classTest = item.classTestList[j];
          classTest.showList = [];
          let weekArr = [];

          //相同周分组
          for (let k = 0; k < classTest.list.length; k++) {
            let selectClass = classTest.list[k];
            let save = {
              classTestId: classTest.classTestId,
              classTestName: classTest.classTestName,
              weekStart: selectClass.weekStart,
              weekEnd: selectClass.weekEnd,
              weekMerge: selectClass.weekMerge,
              sportsClassId: selectClass.sportsClassId,
              sportsClassName: selectClass.sportsClassName
            };
            vm.saveList.push(save);
            let show = {
              weekStart: [],
              weekEnd: [],
              weekMerge: [],
              sportsClassName: [],
              sportsClassId: [],
              sortSportsClassId: "",
              classTestId: classTest.classTestId,
              itemId: classTest.itemId,
              classTestName: classTest.classTestName
            };

            show.weekStart.push(selectClass.weekStart);
            show.weekEnd.push(selectClass.weekEnd);
            show.weekMerge.push(selectClass.weekMerge);
            show.sportsClassName.push(selectClass.sportsClassName);
            show.sportsClassId.push(selectClass.sportsClassId);
            if (weekArr.indexOf(selectClass.weekMerge) > -1) {
              continue;
            } else {
              weekArr.push(selectClass.weekMerge);
              for (let l = k + 1; l < classTest.list.length; l++) {
                let selectClassOther = classTest.list[l];
                if (
                  selectClass.weekMerge == selectClassOther.weekMerge &&
                  selectClass.sportsClassName !=
                    selectClassOther.sportsClassName
                ) {
                  show.sportsClassName.push(selectClassOther.sportsClassName);
                  show.sportsClassId.push(selectClassOther.sportsClassId);
                }
              }
            }
            show.sortSportsClassId = vm.sortAndReturn(show.sportsClassId);
            if (show.weekStart.length > 0) {
              classTest.showList.push(show);
            }
          }
          //相同班分组
          if (classTest.showList.length > 0) {
            for (let p = 0; p < classTest.showList.length; p++) {
              let show = classTest.showList[p];
              for (let q = p + 1; q < classTest.showList.length; q++) {
                let otherShow = classTest.showList[q];
                if (otherShow.sortSportsClassId == show.sortSportsClassId) {
                  show.weekStart.push(otherShow.weekStart);
                  show.weekEnd.push(otherShow.weekEnd);
                  show.weekMerge.push(otherShow.weekMerge);
                  classTest.showList.splice(q, 1);
                  q--;
                }
              }
            }
          }
        }
      }
      let gradeAllList = [];
      if (vm.saveList.length > 0) {
        for (let j = 0; j < vm.gradeSportsClassList.length; j++) {
          let gradeClss = vm.gradeSportsClassList[j];
          let params = {
            examItemClassNum: 0,
            sportsClassId: gradeClss.sportsClassId,
            sportsClassName: gradeClss.sportsClassName,
            list: []
          };
          let itemNameArr = [];
          for (let i = 0; i < vm.saveList.length; i++) {
            let weekVO = vm.saveList[i];
            if (weekVO.sportsClassId == gradeClss.sportsClassId) {
              let weekParams = {
                classTestId: weekVO.classTestId,
                classTestName: weekVO.classTestName,
                sportsClassId: weekVO.sportsClassId,
                sportsClassName: weekVO.sportsClassName,
                weekEnd: weekVO.weekEnd,
                weekMerge: weekVO.weekStart + "" + weekVO.weekEnd,
                weekStart: weekVO.weekStart
              };
              if (itemNameArr.indexOf(weekVO.classTestId) < 0) {
                itemNameArr.push(weekVO.classTestId);
                params.examItemClassNum += 1;
              }
              params.list.push(weekParams);
            }
          }
          gradeAllList.push(params);
        }
      }
      vm.dealBelowData(gradeAllList);
      vm.classAddModel = false;
      vm.itemList = itemList;
    },
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
              vm.itemList[indexa].classTestList[indexb].detail = params;
              vm.itemList[indexa].classTestList[indexb].open = open;
              vm.itemList = vm.itemList.slice(0);
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg);
              }
            }
            vm.loadingStatus = false;
          });
      } else {
        vm.itemList[indexa].classTestList[indexb].open = false;
        vm.itemList = vm.itemList.slice(0);
      }
    },
    handleCheckAll(e) {
      var vm = this;
      vm.checkAll = !vm.checkAll;
      let classData = vm.classData;
      let classTestId = classData.classTestId;
      let classTestWeeks = {
        classTestId: classTestId,
        sportsClassIds: [],
        sportsClassNames: [],
        weeks: vm.classTestWeeks.weeks,
        classTestName: classData.classTestName
      };
      if (vm.checkAll) {
        for (let i = 0; i < vm.gradeSportsClassList.length; i++) {
          let sportsClass = vm.gradeSportsClassList[i];
          classTestWeeks.sportsClassIds.push(sportsClass.sportsClassId);
          classTestWeeks.sportsClassNames.push(sportsClass.sportsClassName);
        }
      }
      vm.classTestWeeks = classTestWeeks;
    },
    checkGroup(classTestInfo, indexa, indexb, indexc) {
      var vm = this;

      this.$forceUpdate();
    },
    checkAllGroupChange(classIds) {
      var vm = this;
      let classData = vm.classData;
      let classTestId = classData.classTestId;
      let classTestWeeks = {
        classTestId: classTestId,
        sportsClassIds: [],
        weeks: vm.classTestWeeks.weeks,
        sportsClassNames: [],
        classTestName: classData.classTestName
      };
      if (classIds.length == vm.gradeSportsClassList.length) {
        vm.checkAll = true;
      } else {
        vm.checkAll = false;
      }
      for (let i = 0; i < vm.gradeSportsClassList.length; i++) {
        let sportsClass = vm.gradeSportsClassList[i];
        for (let j = 0; j < classIds.length; j++) {
          if (classIds[j] == sportsClass.sportsClassId) {
            classTestWeeks.sportsClassIds.push(sportsClass.sportsClassId);
            classTestWeeks.sportsClassNames.push(sportsClass.sportsClassName);
          }
        }
      }
      vm.classTestWeeks = classTestWeeks;
    },
    myIndexOf(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (
          arr[i].classTestId == el.classTestId &&
          arr[i].sportsClassId == el.sportsClassId &&
          arr[i].weekStart == el.weekStart &&
          arr[i].weekEnd == el.weekEnd
        ) {
          return i;
        }
      }
      return -1;
    },
    
    weekIndexOf(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (
          arr[i].weekStart == el.weekStart &&
          arr[i].weekEnd == el.weekEnd
        ) {
          return i;
        }
      }
      return -1;
    },
    haveWeek(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (
          (arr[i].weekStart < el.weekStart &&
                arr[i].weekEnd < el.weekStart) ||
              (arr[i].weekStart > el.weekEnd &&
                arr[i].weekEnd > el.weekEnd)
        ) {
          return -1;
        }
      }
      return 1;
    },
    myTotalIndexOf(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        for(let j=0;j<arr[i].classTestList.length;j++){
          for(let k=0;k<arr[i].classTestList[j].list.length;k++){
            if (
              arr[i].classTestList[j].list[k].sportsClassId == el.sportsClassId &&
              arr[i].classTestList[j].list[k].weekStart == el.weekStart &&
              arr[i].classTestList[j].list[k].weekEnd == el.weekEnd
            ) {
              return i;
            }
          }
        }
      }
      return -1;
    },
    selectTabs(name) {
      var vm = this;
      this.selectTabName = name;
      vm.loadingStatus = true;
      sessionStorage.setItem(
        "examItemClassList-selectTabName",
        this.selectTabName
      );
      this.getHighSchoolSkillClassTestList();
      this.getHighSchoolGradeSkillList();
      this.getGradeSportsClassList();
    },
    getHighSchoolSkillClassTestList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/cd/high/skills/getHighSchoolSkillClassTestList?schoolId=" +
            vm.schoolId +
            "&gradeId=" +
            vm.selectTabName +
            "&classTestType=2"
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            // vm.allDataDe = data ? data : [];
            if (data) {
              vm.dealData(data);
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getGradeSportsClassList() {
      var vm = this;
      this.$axios
        .get(
          "/v1/cd/high/skills/getGradeSportsClassList?schoolId=" +
            vm.schoolId +
            "&gradeId=" +
            vm.selectTabName
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.gradeSportsClassList = data;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    dealData(data) {
      var vm = this;
      let itemList = [];
      if (data && data.length > 0) {
        let itemNameArr = [];
        for (let i = 0; i < data.length; i++) {
          let classTest = data[i];
          let params = {
            open: false,
            itemId: classTest.itemId,
            itemName: classTest.itemName,
            classTestList: []
          };
          if (itemNameArr.indexOf(classTest.itemName) == -1) {
            itemNameArr.push(classTest.itemName);
            itemList.push(params);
          } else {
            continue;
          }
        }
        for (let i = 0; i < itemList.length; i++) {
          let item = itemList[i];
          for (let j = 0; j < data.length; j++) {
            let classTest = data[j];
            if (item.itemName == classTest.itemName) {
              let params = {
                itemId: classTest.itemId,
                classTestId: classTest.classTestId,
                classTestName: classTest.classTestName,
                open: false,
                select: classTest.list.length > 0 ? true : false,
                list: classTest.list,
                showList: []
              };
              item.classTestList.push(params);
            }
          }
        }
      }
      vm.showListDeal(itemList);
      vm.loadingStatus = false;
    },
    showListDeal(itemList) {
      var vm = this;
      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        for (let j = 0; j < item.classTestList.length; j++) {
          let classTest = item.classTestList[j];
          let weekArr = [];
          //相同周分组

          for (let k = 0; k < classTest.list.length; k++) {
            let selectClass = classTest.list[k];
            let save = {
              classTestId: classTest.classTestId,
              classTestName: classTest.classTestName,
              weekStart: selectClass.weekStart,
              weekEnd: selectClass.weekEnd,
              weekMerge: selectClass.weekMerge,
              sportsClassId: selectClass.sportsClassId,
              sportsClassName: selectClass.sportsClassName
            };
            vm.saveList.push(save);
            let show = {
              weekStart: [],
              weekEnd: [],
              weekMerge: [],
              sportsClassName: [],
              sportsClassId: [],
              sortSportsClassId: "",
              classTestId: classTest.classTestId,
              itemId: classTest.itemId,
              classTestName: classTest.classTestName
            };

            show.weekStart.push(selectClass.weekStart);
            show.weekEnd.push(selectClass.weekEnd);
            show.weekMerge.push(selectClass.weekMerge);
            show.sportsClassName.push(selectClass.sportsClassName);
            show.sportsClassId.push(selectClass.sportsClassId);
            if (weekArr.indexOf(selectClass.weekMerge) > -1) {
              continue;
            } else {
              weekArr.push(selectClass.weekMerge);
              for (let l = k + 1; l < classTest.list.length; l++) {
                let selectClassOther = classTest.list[l];
                if (
                  selectClass.weekMerge == selectClassOther.weekMerge &&
                  selectClass.sportsClassName !=
                    selectClassOther.sportsClassName
                ) {
                  show.sportsClassName.push(selectClassOther.sportsClassName);
                  show.sportsClassId.push(selectClassOther.sportsClassId);
                }
              }
            }
            show.sortSportsClassId = vm.sortAndReturn(show.sportsClassId);
            if (show.weekStart.length > 0) {
              classTest.showList.push(show);
            }
          }
          //相同班分组
          if (classTest.showList.length > 0) {
            for (let p = 0; p < classTest.showList.length; p++) {
              let show = classTest.showList[p];
              for (let q = p + 1; q < classTest.showList.length; q++) {
                let otherShow = classTest.showList[q];
                if (otherShow.sortSportsClassId == show.sortSportsClassId) {
                  show.weekStart.push(otherShow.weekStart[0]);
                  show.weekEnd.push(otherShow.weekEnd[0]);
                  show.weekMerge.push(otherShow.weekMerge[0]);
                  classTest.showList.splice(q, 1);
                  q--;
                }
              }
            }
          }
        }
      }
      vm.itemList = itemList;
      vm.loadingStatus = false;
    },
    getHighSchoolGradeSkillList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/cd/high/skills/getHighSchoolGradeSkillList?schoolId=" +
            vm.schoolId +
            "&gradeId=" +
            vm.selectTabName +
            "&classTestType=2"
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.dealBelowData(data);
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    dealBelowData(data) {
      var vm = this;
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let examInfo = data[i];
          examInfo.showList = [];
          let list = examInfo.list;
          let itemArr = [];
          if (list.length > 0) {
            for (let j = 0; j < list.length; j++) {
              let week = list[j];
              let show = {
                classTestName: week.classTestName,
                learnTime: [],
                classTime: ""
              };
              let learnTime = "第" + week.weekStart + "~" + week.weekEnd + "周";
              let preClassTime = week.forecastClassTimes
                ? week.forecastClassTimes
                : 0;
              let classTime = week.classTimes;
              if (itemArr.indexOf(week.classTestId) > -1) {
                continue;
              } else {
                itemArr.push(week.classTestId);
              }
              for (let k = j + 1; k < list.length; k++) {
                let otherWeek = list[k];
                if (otherWeek.classTestId == week.classTestId) {
                  learnTime +=
                    "，" + otherWeek.weekStart + "~" + otherWeek.weekEnd + "周";
                  preClassTime += otherWeek.forecastClassTimes
                    ? otherWeek.forecastClassTimes
                    : 0;
                }
              }
              show.learnTime = learnTime;
              show.classTime =
                preClassTime +
                "课时" +
                (classTime > 0 ? "(实际课时：" + classTime + "课时)" : "");
              examInfo.showList.push(show);
            }
          }
        }
        vm.gradeAllList = data;
      } else {
        vm.gradeAllList = [];
      }
    },
    baseSubmit() {
      var vm = this;
      let data = {
        list: vm.saveList,
        gradeId: vm.selectTabName
      };
      this.$axios
        .post("/v1/cd/high/skills/upsertGradeSkill", data)
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
    },
    sortAndReturn(arr) {
      // 编写方法，实现冒泡
      //外层循环，控制趟数，每一次找到一个最大值
      for (var i = 0; i < arr.length - 1; i++) {
        // 内层循环,控制比较的次数，并且判断两个数的大小
        for (var j = 0; j < arr.length - 1 - i; j++) {
          // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
          if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      let sortString = "";
      for (var i = 0; i < arr.length; i++) {
        sortString += arr[i];
      }
      return sortString;
    }
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    var vm = this;
    
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

    let selectTabNameInfo = sessionStorage.getItem(
      "examItemClassList-selectTabName"
    );
    if (
      selectTabNameInfo == null ||
      selectTabNameInfo == "" ||
      selectTabNameInfo == undefined
    ) {
      vm.selectTabName = vm.gradeList[0].gradeId;
    } else {
      vm.selectTabName = selectTabNameInfo;
    }
    vm.getHighSchoolGradeSkillList();
    vm.getHighSchoolSkillClassTestList();
    this.getGradeSportsClassList();
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
  padding-right:6px;
}
.test_project-info {
  flex: 1;
}
</style>
