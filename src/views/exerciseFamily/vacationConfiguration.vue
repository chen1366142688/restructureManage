<style lang="less" scoped>
  .configuration{
    position: absolute;
    right:100px;
    margin-top:-6px;
  }
  .Title{
    display:flex;
    // justify-content: space-around;
    align-items:center;
    Button {
      position: absolute;
      right:60px;
    }
  }
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">假期作业配置</h2>
    </div>
    <div style="font-size:15px;">
      <Form ref="unirunInfo" :label-width="140">
        <Card>
          <div class="Title">
            <div style="width:600px;padding:10px;line-height:30px;" >
              <span>假期作业不计入学生中考成绩中</span>
            </div>
            <Button type="success" @click="goBack">返回</Button>
          </div>
        </Card>
        <div style="position:relative;">
          <Card style="margin-top:20px;">
            <!-- <div class="configuration" v-if="vacationDisable"><Button type="success">假期作业配置</Button></div> -->
            <Tabs type="card" @on-click="selectTabs" v-model="tittleTabs">
              <TabPane
                v-model="grade"
                :name="gradeitem.gradeId"
                :label="gradeitem.val"
                v-for="(gradeitem,index) in schoolGradeList"
                :key="gradeitem.gradeId"
                :value="gradeitem.gradeId"
                :index="index+1"
              >
                <Col style="margin-top:5px;" span="24">
                  <FormItem label="总次数：">
                    <Row>
                      <Input 
                        @on-blur="onBlur"
                        style="width:100px;"
                        v-model="schoolStandardInfo.exerciseCount"
                        :maxlength="20"
                        :disabled="disabledInput"
                      />
                    </Row>
                  </FormItem>
                  <FormItem label="锻炼模式：">
                    <Row>
                      <RadioGroup v-model="schoolStandardInfo.exerciseMode" @on-change="radioChange">
                        <Radio label="1">教师布置锻炼计划</Radio>
                        <!-- <Radio label="2" disabled="disabled">多形式自主锻炼</Radio> -->
                        <Radio label="3" >家长自行安排</Radio>
                      </RadioGroup>
                    </Row>
                  </FormItem>
                  <FormItem v-if="schoolStandardInfo.exerciseMode == '2'" label="课后作业内容模式：">
                    <Row>
                      <CheckboxGroup v-model="schoolStandardInfo.boxInfo">
                        <Checkbox label="1">自选锻炼方式</Checkbox>
                        <!-- <Checkbox label="2">教师推荐锻炼套餐</Checkbox> -->
                        <Checkbox label="3">家长自行配置锻炼套餐</Checkbox>
                      </CheckboxGroup>
                    </Row>
                  </FormItem>
                  <FormItem
                    v-if="schoolStandardInfo.exerciseMode == '1'||schoolStandardInfo.exerciseMode == '2'"
                    label="课后作业内容："
                  >
                    <Row>
                      <Button style="float:left;width:100px" @click="addCombo" type="success">作业配置</Button>
                    </Row>
                  </FormItem>

                  <FormItem v-if="schoolStandardInfo.exerciseMode == '3'" label="体育课后作业描述：">
                    <Row>
                      <Input 
                      type="textarea"
                        @on-blur="onBlur"
                        class="tinymce-textarea"
                        v-model="schoolStandardInfo.exerciseDescribe"
                        id="remark"
                        placeholder="这里输入描述(最多不超过200个字)..........."
                        style="width:900px;height:300px;margin-left:10px;margin-top:5px;line-height:18px;"
                        :maxlength="200"
                      ></Input >
                    </Row>
                  </FormItem>
                  <div style="overflowX:auto">
                      <div v-if="schoolStandardInfo.exerciseMode == '1'" 
                            style="height:255px;border:1px #BFC9CE solid;margin-left:30px;width:1555px;margin-top:20px;"
                            v-for="(item,index) in comboList"
                        >
                        <div
                        style="float:left;font-size:14px;background-color:#F0F0F0;height:253px;width:100px;text-align:center;white-space:normal;word-wrap:break-word;word-break:break-all;padding-top:110px;"
                        >
                        <font>
                            每日作业
                            <br />
                            考核内容{{index+1}}
                        </font>
                        </div>
                        <div style="float:left;width:400px;border-left:1px #BFC9CE solid;height:255px;">
                        <div
                            style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;"
                        >男生标准</div>
                        <div>
                            <div
                            style="height:150px;font-size:12px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;"
                            v-if="item.list && item.manExerciseList.length<=5"
                            >
                            <div
                                style="line-height:26px;height:26px;"
                                v-for="combo in item.list"
                                v-if="combo.gender=='1'"
                            >
                                <div
                                style="float:left;width:60px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"
                                >{{combo.planName}}</div>
                                <div
                                style="float:left;"
                                >(单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                <p>
                                    <span style="margin-right:20px;">{{combo.planGroupNum}}组</span>
                                    <span style>
                                    排序序号：
                                    <Input
                                        style="width:40px;"
                                        size="small"
                                        :disabled="true"
                                        v-model="combo.sortIndex"
                                        :maxlength="20"
                                    />
                                    </span>
                                </p>
                                </div>
                            </div>
                            </div>
                            <div
                            style="height:150px;overflow-y:scroll;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;"
                            v-if="item.list && item.manExerciseList.length>5"
                            >
                            <div
                                style="line-height:26px;height:26px;"
                                v-for="combo in item.list"
                                v-if="combo.gender=='1'"
                            >
                                <div
                                style="float:left;width:60px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;"
                                >{{combo.planName}}</div>
                                <div
                                style="float:left;"
                                >(单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                    <p>
                                    <span style="margin-right:20px;">{{combo.planGroupNum}}组</span>
                                    <span style>
                                    排序序号：
                                    <Input
                                        style="width:40px;"
                                        size="small"
                                        :disabled="true"
                                        v-model="combo.sortIndex"
                                        :maxlength="20"
                                    />
                                    </span>
                                </p>
                                </div>
                            </div>
                            </div>
                            <div
                            v-if="item.manTotalTime && item.manTotalTime > 0"
                            style="padding-left:25px;color:#2E2E2E;font-size:10px;font-weight:bold;margin-top:20px;"
                            >
                            预估总时长：
                            <font
                                style="color:#00C693;margin-left:10px;"
                            >{{Number(item.manTotalTime)%60000>0?Math.floor(Number(item.manTotalTime)/60000)+'分'+(Number(item.manTotalTime)%60000)/1000+'秒':Number(item.manTotalTime)/60000+'分'}}</font>&nbsp;分钟
                            </div>
                        </div>
                        </div>
                        <div style="float:left;width:400px;border-left:1px #BFC9CE solid;height:255px;">
                        <div
                            style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;"
                        >女生标准</div>
                        <div>
                            <div
                            style="height:150px;font-size:12px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;"
                            v-if="item.list && item.womanExerciseList.length<=5"
                            >
                            <div
                                style="line-height:26px;height:26px;"
                                v-for="combo in item.list"
                                v-if="combo.gender=='2'"
                            >
                                <div
                                style="float:left;width:60px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;"
                                >{{combo.planName}}</div>
                                <div
                                style="float:left;"
                                >(单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                    <p>
                                    <span style="margin-right:20px;">{{combo.planGroupNum}}组</span>
                                    <span style>
                                    排序序号：
                                    <Input
                                        style="width:40px;"
                                        size="small"
                                        :disabled="true"
                                        v-model="combo.sortIndex"
                                        :maxlength="20"
                                    />
                                    </span>
                                </p>
                                </div>
                            </div>
                            </div>
                            <div
                            style="height:150px;overflow-y:scroll;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;"
                            v-if="item.list && item.womanExerciseList.length>5"
                            >
                            <div
                                style="line-height:26px;height:26px;"
                                v-for="combo in item.list"
                                v-if="combo.gender=='2'"
                            >
                                <div
                                style="float:left;width:60px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;"
                                >{{combo.planName}}</div>
                                <div
                                style="float:left;"
                                >(单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                    <p>
                                    <span style="margin-right:20px;">{{combo.planGroupNum}}组</span>
                                    <span style>
                                    排序序号：
                                    <Input
                                        style="width:40px;"
                                        size="small"
                                        :disabled="true"
                                        v-model="combo.sortIndex"
                                        :maxlength="20"
                                    />
                                    </span>
                                </p>
                                </div>
                            </div>
                            </div>
                            <div
                            v-if="item.womanTotalTime && item.womanTotalTime > 0"
                            style="padding-left:25px;color:#2E2E2E;font-size:10px;font-weight:bold;margin-top:20px;"
                            >
                            预估总时长：
                            <font
                                style="color:#00C693;margin-left:10px;"
                            >{{Number(item.womanTotalTime)%60000>0?Math.floor(Number(item.womanTotalTime)/60000)+'分'+(Number(item.womanTotalTime)%60000)/1000+'秒':Number(item.womanTotalTime)/60000+'分'}}</font>&nbsp;分钟
                            </div>
                        </div>
                        </div>
                        <div style="float:left;width:250px;border-left:1px #BFC9CE solid;height:255px;">
                        <div
                            style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;"
                        >适用班级</div>
                        <div style="padding-top:10px;">
                            <div
                            style="float:left;margin-left:20px;padding-top:10px;"
                            v-for="studentClass in item.studentClasses"
                            >{{studentClass}}班</div>
                        </div>
                        </div>
                        <div style="float:left;width:240px;border-left:1px #BFC9CE solid;height:255px;">
                        <div
                            style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;"
                        >描述</div>
                        <div style="padding-top:10px;font-size:12px;">{{item.comboDescribe}}</div>
                        </div>
                        <div style="float:left;width:160px;border-left:1px #BFC9CE solid;height:255px;">
                        <div
                            style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;"
                        >操作</div>
                        <div>
                            <Button
                            style="margin-left:45px;width:80px;margin-top:50px;"
                            @click="editor(item.comboId)"
                            type="success"
                            >编辑</Button>
                            <Button
                            style="margin-left:45px;width:80px;margin-top:50px;"
                            @click="deleteCombo(item.comboId)"
                            type="success"
                            >删除</Button>
                        </div>
                        </div>
                    </div>
                  </div>
                  
                    <!-- <div style="margin-top:10px;text-align:center">
                        <Button
                        @click="saveSchoolStandard"
                        type="success"
                        >保存</Button>
                    </div> -->
                </Col>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <!--                    <Row>-->
        <!--                        <div style="margin-top:10px;padding-left:46%">-->
        <!--                            <Button  style="float:left;width:100px" @click="saveSchoolStandard"  type="success">保存</Button>-->
        <!--                        </div>-->
        <!--                    </Row>-->
      </Form>
    </div>
    <Modal v-model="modal1" title="删除确认" :mask-closable="false" @on-ok="ok" @on-cancel="cancel">
      <p>是否确定删除该标准？</p>
    </Modal>
    <Modal v-model="showModal" width="360" :styles="{top: '20%', fontSize: 18 + 'px'}">
      <p slot="header" style="color:#f60;text-align:center">
        提醒
      </p>
      <div style="text-align:center">
        <span>您所提交的作业内容中包含敏感字：</span>
        <span v-for="(item, index) in fieldList" :key="index" style="color: rgb(255, 102, 0);">{{item}}<i v-if="fieldList.length > 1 && index != fieldList.length -1">、</i></span>
        <span v-if="fieldList.length > 1">等</span>
        <span>，请修改后提交。</span>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="primary"  @click="showModal = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import md5 from "js-md5";
import api from '@/api/baseApi.js'
export default {
  name: "organInfo",
  data() {
    return {
      vacationDisable: false, //是否显示假期
      modal1: false,
      schoolStandardInfo: {
        exerciseMode:'',
      },
      grade: "",
      standard: "",
      disabledInput: false, // 输入框disabled状态
      comboList: [],
      tittleTabs: "",
      schoolType: "",
      yearSemesterName: "",
      holiday: "",
      haveTf: false,
      schoolGradeList: [],
      primaryList: [
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" }
      ],
      middleList: [
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" }
      ],
      highList: [
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" }
      ],
      showModal: false, // 敏感词提示框
      fieldList: [] // 敏感词列表
    };
  },
    beforeRouteLeave(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    this.saveSchoolStandard();
    next()
  },
  methods: {
    goBack(){//返回上一页面
      this.$router.go(-1);
    },
    queryDate() {
      let date = new Date();
      
      // 获取当前月份
      let nowMonth = date.getMonth() + 1;
      // 获取当前是几号
      let strDate = date.getDate();
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let nowDate = `${date.getFullYear()}-${nowMonth}-${strDate}`;
      let firstSemester = `${date.getFullYear}-01-01`,
      twoSemester = `${date.getFullYear}-06-01`;
      return {
        nowDate,
        firstSemester,
        twoSemester,
      }
    },

    setVacation() { //text:1为第二学期，0为第一学期
      let yearSemester = sessionStorage.getItem('yearSemester'),text=0;
      let dates = this.queryDate();
      let Nowtimestamp = new Date(dates.nowDate).getTime();
      let firstTimestamp = new Date(dates.firstSemester).getTime();
      let twoTimestamp = new Date(dates.twoSemester).getTime();
      if(yearSemester%2==0){
          text=0;
          if(Nowtimestamp>=firstTimestamp) {
            console.log('是假期')
            this.vacationDisable = true;
          }      
      }else{
          if(Nowtimestamp>=twoTimestamp) {
              console.log('是假期')
              this.vacationDisable = true;
            }
          text=1
      };
    },

    deleteCombo(comboId) {
      var vm = this;
      vm.comboId = comboId;
      vm.modal1 = true;
    },
    ok() {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/deleteComo?comboId=" + vm.comboId)
        .then(function(response) {
          let numCode = response.data.response.code;
          if (numCode == "1") {
            vm.$Message.info("删除成功");
          } else {
            vm.$Message.error(response.data.response.msg);
          }
          vm.getExerciseComboList(vm.grade);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    cancel() {
      var vm = this;
      vm.modal1 = false;
    },
    selectTabs(name) {
      this.saveSchoolStandard();
      this.grade = name;
      this.querySchoolStandard();
      this.getExerciseComboList(name);
    },
    addCombo() {
      var vm = this;
      sessionStorage.removeItem(
        "exerciseComboList-exerciseComboDetail-comboId"
      );
      sessionStorage.setItem(
        "exerciseComboList-exerciseComboDetail-gradeId",
        vm.grade
      );
      sessionStorage.setItem("exerciseComboList-exerciseComboDetail-semesterOver","0");
      this.$router.push({ name: "exerciseComboDetail" });
    },
    querySchoolStandard() {
      this.$axios
        .get(
          "/v1/exercise/family/querySchoolExerciseFamilyStandardByGrade?schoolId=" +
            sessionStorage.getItem("schoolId") +
            "&schoolType=" +
            sessionStorage.getItem("schoolType") +
            "&grade=" +
            this.grade +
            "&semesterOver=0"
        )
        .then(res => {
          if (res.data.code == 10000) {
            
            var vm = this;
            let schoolStandardInfo = res.data.response;
            if (
              schoolStandardInfo != null &&
              !schoolStandardInfo.familyStandardId
            ) {
              vm.haveTf = true;
            } else {
              vm.haveTf = false;
            }
            if (schoolStandardInfo != null) {
              this.yearSemesterName = schoolStandardInfo.yearSemesterName;
              let yearSemester = schoolStandardInfo.yearSemester;
              let semesterOver = schoolStandardInfo.semesterOver;

              // console.log(semesterOver==="0")
              if (semesterOver === "0") {
                let semester = (yearSemester + "").substr(4, 1);
                //  console.log(semester)
                if (semester == "1") {
                  this.holiday = "暑假";
                } else {
                  this.holiday = "寒假";
                }
              }
            }
            let selfWay = schoolStandardInfo.selfWay == "1" ? "1" : "0";
            let teacherWay = schoolStandardInfo.teacherWay == "1" ? "2" : "0";
            let parentWay = schoolStandardInfo.parentWay == "1" ? "3" : "0";
            schoolStandardInfo.boxInfo = [selfWay, teacherWay, parentWay];
            // schoolStandardInfo.exerciseMode = "1";
            vm.schoolStandardInfo = schoolStandardInfo;
            if(vm.schoolStandardInfo.exerciseCount == null) {
              vm.schoolStandardInfo.exerciseCount = 36;
            }
            if(!vm.schoolStandardInfo.exerciseMode) {
              vm.schoolStandardInfo.exerciseMode = '3'
            }
          }
        });
    },

    onBlur() {//输入框失去焦点时回调
      // this.saveSchoolStandard();
    },
    radioChange() { //多选框change回调
      // this.saveSchoolStandard();
    },
    async saveSchoolStandard() {
      let params = [];
      let standar = {};

      this.schoolStandardInfo.selfWay = "";
      this.schoolStandardInfo.teacherWay = "";
      this.schoolStandardInfo.parentWay = "";
      if (this.schoolStandardInfo.exerciseMode == "2") {
        for (let i = 0; i < this.schoolStandardInfo.boxInfo.length; i++) {
          if (this.schoolStandardInfo.boxInfo[i] == "1") {
            this.schoolStandardInfo.selfWay = "1";
          } else if (this.schoolStandardInfo.boxInfo[i] == "2") {
            this.schoolStandardInfo.teacherWay = "1";
          } else if (this.schoolStandardInfo.boxInfo[i] == "3") {
            this.schoolStandardInfo.parentWay = "1";
          }
        }
      }
      standar = {
        itemLevelCode: 1,
        grade: this.grade,
        exerciseCount:
          this.schoolStandardInfo.exerciseCount == null ||
          this.schoolStandardInfo.exerciseCount == ""
            ? 0
            : this.schoolStandardInfo.exerciseCount,
        exerciseTime:
          this.schoolStandardInfo.exerciseTime == null ||
          this.schoolStandardInfo.exerciseTime == ""
            ? 0
            : this.schoolStandardInfo.exerciseTime,
        exerciseDescribe:
          this.schoolStandardInfo.exerciseDescribe == null ||
          this.schoolStandardInfo.exerciseDescribe == ""
            ? " "
            : this.schoolStandardInfo.exerciseDescribe,
        exerciseMode: this.schoolStandardInfo.exerciseMode,
        selfWay: this.schoolStandardInfo.selfWay == "1" ? "1" : "0",
        teacherWay: this.schoolStandardInfo.teacherWay == "1" ? "1" : "0",
        parentWay: this.schoolStandardInfo.parentWay == "1" ? "1" : "0",
        semesterOver:0
      };
      params.push(standar);
      let checkText = { // 体育课后作业描述
        fieldOne: this.schoolStandardInfo.exerciseDescribe
      }
      const result = await api.querySensitiveWord(checkText) // 体育课后作业描述-关键词验证
      if (result.data.code === 10000) {
        this.fieldList = result.data.response.fieldOne ? result.data.response.fieldOne.split(',') : []
        if (this.fieldList.length > 0) {
          this.showModal = true
        } else {
          this.$axios.post( "/v1/exercise/family/saveSchoolExerciseFamilyStandardStatus",params).then(res => {
            if (res.data.code == 10000) {
              //  this.$Message.success("保存成功！");
              this.querySchoolStandard();
            } else {
              this.$Message.success(res.data.msg);
              this.querySchoolStandard();
            }
          });
        }
      }
    },
    getExerciseComboList(gradeId) {
      var vm = this;
      let data = {
        gradeId: gradeId,
        schoolId: 0,
        semesterOver:0
      };
      this.$axios
        .post("/v1/exercisecombo/getExerciseComboList", data)
        .then(function(response) {
          // console.log(response);
          let data = response.data.response;
          vm.comboList = [];
          vm.comboList = data ? data : [];

          if (vm.comboList.length > 0) {
            for (var i = 0; i < vm.comboList.length; i++) {
              var combos = vm.comboList[i];
              for (var j = 0; j < combos.list.length; j++) {
                vm.comboList[i].manExerciseList = [];
                vm.comboList[i].womanExerciseList = [];
                if (combos.list[j].gender == "1") {
                  vm.comboList[i].manExerciseList.push(combos.list[j]);
                } else {
                  vm.comboList[i].womanExerciseList.push(combos.list[j]);
                }
              }
            }
          }
          console.log(vm.comboList);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    editor(comboId) {
      var vm = this;
      sessionStorage.setItem(
        "exerciseComboList-exerciseComboDetail-comboId",
        comboId
      );
      sessionStorage.setItem(
        "exerciseComboList-exerciseComboDetail-gradeId",
        vm.grade
      );
      this.$router.push({ name: "exerciseComboDetail" });
    }
    //   addCombo(gradeId){
    //       var vm=this;
    //       sessionStorage.setItem(
    //   'exerciseFamilyStandard-exerciseComboList-gradeId',
    //   gradeId
    // )
    // this.$router.push({ name: 'exerciseComboList' })
    //   }
  },
  async mounted() {
    let vm = this;
    this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
      if (res.data.code === 10000) {
        let {editStatus} = res.data.response
        if (editStatus != '1') {
          this.disabledInput = true;
        }
        if(res.data.response.semesterOver == '0'){
          this.disabledInput = false;
        }
      }
    })
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let SchoolYear = sessionStorage.getItem("historyData_SchoolYear");
    this.schoolYear = SchoolYear;
    let type = sessionStorage.getItem("schoolType");
    /**1 幼儿园 2小学 3初中 4高中 5大学 6教育局'**/
    if (type == 2) {
      vm.schoolGradeList = [
        { val: "一年级", gradeId: "1" },
        { val: "二年级", gradeId: "2" },
        { val: "三年级", gradeId: "3" },
        { val: "四年级", gradeId: "4" },
        { val: "五年级", gradeId: "5" },
        { val: "六年级", gradeId: "6" }
      ];
    } else if (type == 3) {
      vm.schoolGradeList = [
        { val: "七年级", gradeId: "7" },
        { val: "八年级", gradeId: "8" },
        { val: "九年级", gradeId: "9" }
      ];
    } else if (type == 4) {
      vm.schoolGradeList = [
        { val: "高一", gradeId: "10" },
        { val: "高二", gradeId: "11" },
        { val: "高三", gradeId: "12" }
      ];
    } else {
      console.log("学校类型有误");
    }
    // this.search();
    this.grade = sessionStorage.getItem(
      "exerciseComboList-exerciseComboDetail-gradeId"
    );
    if (this.grade != null && this.grade != "") {
      // this.grade = vm.schoolGradeList[0].gradeId;
      this.tittleTabs = this.grade;
      this.getExerciseComboList(this.grade);
      await this.querySchoolStandard();
      this.schoolStandardInfo.exerciseMode = '3';
      sessionStorage.setItem(
        "exerciseComboList-exerciseComboDetail-gradeId",
        ""
      );
    } else {
      this.grade = vm.schoolGradeList[0].gradeId;
      this.getExerciseComboList(this.grade);
      await this.querySchoolStandard();
      this.schoolStandardInfo.exerciseMode = '3';
    }
  }
};
</script>
