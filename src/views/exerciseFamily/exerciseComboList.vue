<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">作业标准配置</h2>
    </div>
    <Card style="width:1620px;">
      <h4 style="margin-left:30px;">
        当前年级：{{gradeId=="1"?"一年级":gradeId=="2"?"二年级":gradeId=="3"?"三年级":gradeId=="4"?"四年级":
        gradeId=="5"?"五年级":gradeId=="6"?"六年级":gradeId=="7"?"七年级":gradeId=="8"?"八年级":gradeId=="9"?"九年级":
        gradeId=="10"?"高一":gradeId=="11"?"高二":"高三"}}
      </h4>
      <div style="margin-top:20px;margin-left:30px;" span="20" >
                  <Label>自主训练</Label>
                    <CheckboxGroup style="margin-top:20px;" v-model="onlyClassIds">
                    <Checkbox
                      :label="item.classId"
                      v-for="(item,index) in classIds"
                      :key="item+index"
                    >{{item.studentClassName}}</Checkbox>
                    <Button style="margin-left:20px;width:120px" @click="upsertAuto" type="success">提交</Button>
                  </CheckboxGroup>
                  
      </div>
      <div v-if="comboList.length == 0" style="font-size:18px;width:1555px;height:550px;line-height:550px;text-align:center;">
            暂无考核内容
      </div>
      <div
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
              <div style="line-height:26px;height:26px;" v-for="combo in item.list" v-if="combo.gender=='1'">
                <div style="float:left;width:165px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                    {{combo.planName}}
                </div>
                <div
                  style="float:left;"
                > (单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                <div style="font-size:12px;float:right;">{{combo.planGroupNum}}组</div>
              </div>
            </div>
            <div
              style="height:150px;overflow-y:scroll;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;"
              v-if="item.list && item.manExerciseList.length>5"
            >
              <div style="line-height:26px;height:26px;"  v-for="combo in item.list" v-if="combo.gender=='1'">
                <div style="float:left;width:165px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                    {{combo.planName}}
                </div>
                <div
                  style="float:left;"
                > (单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                <div style="font-size:12px;float:right;">{{combo.planGroupNum}}组</div>
              </div>
            </div>
            <div  v-if="item.manTotalTime && item.manTotalTime > 0"
              style="padding-left:25px;color:#2E2E2E;font-size:10px;font-weight:bold;margin-top:20px;"
            >
              预估总时长：
              <font style="color:#00C693;margin-left:10px;">{{Number(item.manTotalTime)%60000>0?Math.floor(Number(item.manTotalTime)/60000)+'分'+(Number(item.manTotalTime)%60000)/1000+'秒':Number(item.manTotalTime)/60000+'分'}}</font>&nbsp;分钟
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
              <div style="line-height:26px;height:26px;"  v-for="combo in item.list" v-if="combo.gender=='2'">
                <div style="float:left;width:165px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                    {{combo.planName}}
                </div>
                <div
                  style="float:left;"
                > (单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                <div style="font-size:12px;float:right;">{{combo.planGroupNum}}组</div>
              </div>
            </div>
            <div
              style="height:150px;overflow-y:scroll;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;"
              v-if="item.list && item.womanExerciseList.length>5"
            >
              <div style="line-height:26px;height:26px;"  v-for="combo in item.list" v-if="combo.gender=='2'">
                <div style="float:left;width:165px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                    {{combo.planName}}
                </div>
                <div
                  style="float:left;"
                > (单组{{combo.eachGroupNum}}{{combo.eachGroupNumUnit}}，{{Number(combo.playGifTime)%60000>0?Math.floor(Number(combo.playGifTime)/60000)+'分'+(Number(combo.playGifTime)%60000)/1000+'秒':Number(combo.playGifTime)/60000+'分'}})</div>
                <div style="font-size:12px;float:right;">{{combo.planGroupNum}}组</div>
              </div>
            </div>
            <div  v-if="item.womanTotalTime && item.womanTotalTime > 0"
              style="padding-left:25px;color:#2E2E2E;font-size:10px;font-weight:bold;margin-top:20px;"
            >
              预估总时长：
              <font style="color:#00C693;margin-left:10px;">{{Number(item.womanTotalTime)%60000>0?Math.floor(Number(item.womanTotalTime)/60000)+'分'+(Number(item.womanTotalTime)%60000)/1000+'秒':Number(item.womanTotalTime)/60000+'分'}}</font>&nbsp;分钟
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
    </Card>
    <Row>
      <div style="margin-top:10px;padding-left:40%">
        <Button
          style="float:left;width:120px;margin-right:80px;"
          @click="toListPage"
          type="success"
        >返回</Button>
        <Button style="float:left;width:120px" @click="addCombo" type="success">新增考核内容</Button>
      </div>
    </Row>
    <Modal v-model="modal1" title="删除确认"  :mask-closable="false" @on-ok="ok" @on-cancel="cancel">
      <p>是否确定删除该标准？</p>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "test",
  data() {
    return {
      modal1: false,
      loading: false,
      submitTf: false,
      gradeId: "",
      comboList: [],
      planList: [],
      comboPlanList: [],
      strengthList: [],
      speedList: [],
      flexibleList: [],
      enduranceList: [],
      agileList: [],
      harmonizeList: [],
      strengthTf: false,
      speedTf: false,
      flexibleTf: false,
      enduranceTf: false,
      agileTft: false,
      harmonizeTf: false,
      combo: "",
      classIds: [],
      onlyClassIds: [],
    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    addCombo() {
       var vm=this;
      sessionStorage.removeItem("exerciseComboList-exerciseComboDetail-comboId");
      sessionStorage.setItem("exerciseComboList-exerciseComboDetail-gradeId",vm.gradeId);
      this.$router.push({ name: 'exerciseComboDetail' })

    },
    editor(comboId) {
      var vm=this;
      sessionStorage.setItem("exerciseComboList-exerciseComboDetail-comboId",comboId);
      sessionStorage.setItem("exerciseComboList-exerciseComboDetail-gradeId",vm.gradeId);
      this.$router.push({ name: 'exerciseComboDetail' })
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
           vm.getExerciseComboList(
      sessionStorage.getItem("exerciseFamilyStandard-exerciseComboList-gradeId")
    );
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    cancel() {},
    toListPage() {
      //返回
      this.$router.go(-1);
    },
    getExerciseComboList(gradeId) {
      var vm = this;
      let data = {
        gradeId: gradeId,
        schoolId: 0
      };
      this.$axios
        .post("/v1/exercisecombo/getExerciseComboList", data)
        .then(function(response) {
          // console.log(response);
          let data = response.data.response;
          vm.comboList = [];
          vm.comboList = data ? data : [];

          if(vm.comboList.length>0){
            for(var i=0;i<vm.comboList.length;i++){
              var combos=vm.comboList[i];
              for(var j=0;j<combos.list.length;j++){
                 vm.comboList[i].manExerciseList=[];
                  vm.comboList[i].womanExerciseList=[];
                  if(combos.list[j].gender=="1"){
                    vm.comboList[i].manExerciseList.push(combos.list[j]);
                  }else{
                    vm.comboList[i].womanExerciseList.push(combos.list[j]);
                  }
              }
            }
          }
          console.log(vm.comboList)
        })
        .catch(function(response) {
          console.log(response);
        });
    },
     getGradeClassSingleInfo(gradeId) {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/getGradeClassSingleInfo?gradeId=" + gradeId)
        .then(function(response) {
          let data = response.data.response;
          vm.classIds = data ? data : [];
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getAutoExerciseClassIds(gradeId) {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/getAutoExerciseClassIds?gradeId=" + gradeId)
        .then(function(response) {
          let data = response.data.response;
          vm.onlyClassIds = data ? data :[];
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    upsertAuto(){
      var vm=this;

      let data={
         "classIds": vm.onlyClassIds,
          "gradeId": vm.gradeId
      }
      this.$axios
        .post("/v1/exercisecombo/upsertAutoExerciseClass", data)
        .then(function(response) {
          // console.log(response);
          if (response.data.code == 10000) {
            let numCode = response.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
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
    }
  },
  mounted() {
    var vm = this;
    vm.gradeId = sessionStorage.getItem(
      "exerciseFamilyStandard-exerciseComboList-gradeId"
    );
    vm.getExerciseComboList(
      sessionStorage.getItem("exerciseFamilyStandard-exerciseComboList-gradeId")
    );
    vm.getGradeClassSingleInfo(sessionStorage.getItem("exerciseFamilyStandard-exerciseComboList-gradeId"));
    vm.getAutoExerciseClassIds(sessionStorage.getItem("exerciseFamilyStandard-exerciseComboList-gradeId"));
  },
  destroyed() {
    var vm = this;
  }
};
</script>