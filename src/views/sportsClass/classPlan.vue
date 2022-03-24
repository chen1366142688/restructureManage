<template>
  <div style="margin-left:15px;">
    <div>
      <h1>体育课排课</h1>
    </div>
    <Card style="margin-top:15px">
      <Form :label-width="140" class="function">
        <!-- <FormItem label="是否是单双周：" class="functionItem">
          <RadioGroup v-model="singleStatus">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem> -->
        <FormItem label="日期选择：" class="functionItem" v-if="!singleTf">
          <CheckboxGroup v-model="singleWeek" @on-change="singleChange">
            <Checkbox :label="1">星期一</Checkbox>
            <Checkbox :label="2">星期二</Checkbox>
            <Checkbox :label="3">星期三</Checkbox>
            <Checkbox :label="4">星期四</Checkbox>
            <Checkbox :label="5">星期五</Checkbox>
            <Checkbox :label="6">星期六</Checkbox>
            <Checkbox :label="7">星期天</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="单周：" class="functionItem" v-if="singleTf">
          <CheckboxGroup v-model="singleWeek" @on-change="singleChange">
            <Checkbox :label="1">星期一</Checkbox>
            <Checkbox :label="2">星期二</Checkbox>
            <Checkbox :label="3">星期三</Checkbox>
            <Checkbox :label="4">星期四</Checkbox>
            <Checkbox :label="5">星期五</Checkbox>
            <Checkbox :label="6">星期六</Checkbox>
            <Checkbox :label="7">星期天</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="双周：" class="functionItem" v-if="singleTf">
          <CheckboxGroup v-model="doubleWeek" @on-change="doubleChange">
            <Checkbox :label="1">星期一</Checkbox>
            <Checkbox :label="2">星期二</Checkbox>
            <Checkbox :label="3">星期三</Checkbox>
            <Checkbox :label="4">星期四</Checkbox>
            <Checkbox :label="5">星期五</Checkbox>
            <Checkbox :label="6">星期六</Checkbox>
            <Checkbox :label="7">星期天</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem
                :label="item.weekDayName"
                class="functionItem"
                v-for="(item, index) in getSingleList"
                :key="index"
        >
            <span style="margin-left: 40px">节数：</span>
          <Select v-model="item.lessonInfo" size="small" style="width:120px;">
            <Option
                    v-for="lession in lessonList"
                    :value="lession.value"
                    :key="lession.value"
            >{{ lession.name }}
            </Option>
          </Select>
          <span style="margin-left: 40px">授课老师：</span>

          <Select v-model="item.teacherId" size="small" style="width:120px;" :label-in-value="true" @on-change="selectTeacher($event,index)">
            <Option
                    v-for="item1 in teacherList"
                    :value="item1.teacherId"
                    :key="item1.teacherId"
            >{{item1.name}}</Option>
          </Select>
          <Button v-if="item.weekDayName==''" type="success" style="margin-left: 40px"
                  @click="delClassNum(item)">删除节数
          </Button>
          <Button v-else type="success" style="margin-left: 40px" @click="addClassNum(item)">添加节数</Button>
        </FormItem>

        <FormItem
          :label="'单周'+item.weekDayName+'：'"
          class="functionItem"
          v-for="(item,index) in singleList"
          :key="index"
          v-if="singleTf"
        >
          <Select v-model="item.lessonInfo" size="small" style="width:120px;">
            <Option
              v-for="lession in lessonList"
              :value="lession.value"
              :key="lession.value"
            >{{ lession.name }}</Option>
          </Select>
        </FormItem>
        <FormItem
          :label="'双周'+item.weekDayName+'：'"
          class="functionItem"
          v-for="(item,index) in doubleList"
          :key="index"
          v-if="singleTf"
        >
          <Select v-model="item.lessonInfo" size="small" style="width:120px;">
            <Option
              v-for="lession in lessonList"
              :value="lession.value"
              :key="lession.value"
            >{{ lession.name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Card>
    <div style="width:100%;text-align:center;display:flex;justify-content:center;margin-top:20px;">
      <Button @click="pageToList" style="margin-right:50px;width:100px" type="success">返回</Button>
      <Button style="width:100px" @click="baseSubmit" type="success">保存</Button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

Array.prototype.delete = function (index) {
  this.splice(index, 1);
};
export default {
  data() {
    return {
      weekNum:0,
      teacherName:'',
      studentClassId: "",
      singleStatus: "0",
      singleTf: false,
      singleWeek: [],
      doubleWeek: [],
      singleList: [],
      oldSingleList:[],
      doubleList: [],
      lessonList: [
        {
          value: "1",
          name: "第一节"
        },
        {
          value: "2",
          name: "第二节"
        },
        {
          value: "3",
          name: "第三节"
        },
        {
          value: "4",
          name: "第四节"
        },
        {
          value: "5",
          name: "第五节"
        },
        {
          value: "6",
          name: "第六节"
        },
        {
          value: "7",
          name: "第七节"
        },
        {
          value: "8",
          name: "第八节"
        },
        {
          value: "9",
          name: "第九节"
        },
        {
          value: "10",
          name: "第十节"
        }
      ],
      first: false,
      // teacherId: "",
      teacherList: []
    };
  },
  watch: {
    singleStatus: function() {
      var vm = this;

      if (!vm.first) {
        vm.singleWeek = [];
        vm.doubleWeek = [];
        vm.singleList = [];
        vm.doubleList = [];
      }
      vm.first = true;
      if (vm.singleStatus == "1") {
        vm.singleTf = true;
      } else {
        vm.singleTf = false;
      }
    }
  }, //以V-model绑定数据时使用的数据变化监测
  created: function() {},
  computed: {
    getSingleList () {
      let lastDay = null;
      let ret = this.singleList.map(value => {
        if (lastDay != null && value.weekDay == lastDay) {
          value.weekDayName = '';
          return value;
        }
        lastDay = value.weekDay;
        return value;
      });
      return ret;
    }
  },
  methods: {
    selectTeacher(item,index){
      this.singleList[index].teacherName = item.label;
    },
    addClassNum (item) {
      // let o = {};
      // Object.assign(o, item);
      let count = 0;
      for (let v in this.singleList) {
        if (this.singleList[v].weekDay == item.weekDay) {
          count++;
        }
      }

      if (count < 2) {
        this.singleList.insert(this.singleList.indexOf(item) + 1, {
          weekDayName: item.weekDayName,
          weekDay: item.weekDay
        });
      }else {
        this.$Message.error("无法添加大于2节课!");
      }
    },
    delClassNum (item) {
      this.singleList.delete(this.singleList.indexOf(item));
    },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    singleChange(e) {
      var vm = this;
      var list = [];
      for (var i = 0; i < e.length; i++) {
        let weekDay = e[i];
        let lessonInfo = "1";
        let teacherId = -1;
        let teacherName = '';
        let hasInfo = '';
        let name =
          e[i] == 1
            ? "星期一"
            : e[i] == 2
            ? "星期二"
            : e[i] == 3
            ? "星期三"
            : e[i] == 4
            ? "星期四"
            : e[i] == 5
            ? "星期五"
            : e[i] == 6
            ? "星期六"
            : "星期天";
        if(vm.oldSingleList != null && vm.oldSingleList.length > 0){
            for(var j=0;j<vm.oldSingleList.length;j++){
                if(vm.oldSingleList[j].weekDay==weekDay){
                    lessonInfo=vm.oldSingleList[j].lessonInfo;
                   teacherId = vm.oldSingleList[j].teacherId;
                   teacherName = vm.oldSingleList[j].teacherName;
                  let vo = {
                    weekDayName: name,
                    weekDay: weekDay,
                    lessonInfo: lessonInfo,
                    teacherId: teacherId,
                    teacherName: teacherName
                  };
                  list.push(vo);
                  hasInfo = '1';
                }
            }
          let vo = {
            weekDayName: name,
            weekDay: weekDay,
            lessonInfo: lessonInfo
          };
            if('1'!=hasInfo){
              list.push(vo);
            }
        }else {
          let vo = {
            weekDayName: name,
            weekDay: weekDay,
            lessonInfo: lessonInfo
          };
            list.push(vo);
        }
      }
      list.sort((a,b)=>{return a.weekDay-b.weekDay})
      vm.oldSingleList = list;
      vm.singleList = list;
    },
    doubleChange(e) {
      var vm = this;
      var list = [];
      for (var i = 0; i < e.length; i++) {
        let weekDay = e[i];
        let name =
          e[i] == 1
            ? "星期一"
            : e[i] == 2
            ? "星期二"
            : e[i] == 3
            ? "星期三"
            : e[i] == 4
            ? "星期四"
            : e[i] == 5
            ? "星期五"
            : e[i] == 6
            ? "星期六"
            : "星期天";

        let vo = {
          weekDayName: name,
          weekDay: weekDay,
          lessonInfo: "1"
        };
        list.push(vo);
      }
      vm.doubleList = list;
    },
    getClassPlanInfo(studentClassId) {
      var vm = this;
      vm.first = true;
      this.$axios
        .get(
          "/v1/primarysportsclass/getClassPlanInfo?studentClassId=" +
            studentClassId
        )
        .then(function(response) {
          // console.log(response)
          if (response.data.code == 10000) {
            let data = response.data.response;
            vm.singleStatus = "0";
            vm.doubleList = data.doubleList ? data.doubleList : [];
            vm.doubleWeek = data.doubleWeek ? data.doubleWeek : [];
            vm.singleList = data.singleList ? data.singleList : [];
            vm.oldSingleList = data.singleList ? data.singleList : [];
            let hash= [];
            if(null!=data.singleWeek&&data.singleWeek.length>0){
              data.singleWeek.forEach(item=>{
                if(hash.indexOf(item) == '-1'){
                  hash.push(item);
                }
              })
            }
            vm.singleWeek = data.singleWeek ? hash : [];
            vm.studentClassId = data.sportsClassId;
            // vm.teacherId=data.teacherId
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSchoolTeacherList() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getSchoolTeacherList").then(res => {
        if (res.data.code == 10000) {
          vm.teacherList = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },

    baseSubmit() {
      var vm = this;

      for(let i=0;i<vm.singleList.length;i++){
        if(null == vm.singleList[i].teacherId){
          vm.$Message.info("请选择授课老师！");
          return
        }
        if(null == vm.singleList[i].lessonInfo){
          vm.$Message.info("请选择节数！");
          return
        }
      }
      for(let i=0;i<vm.doubleList.length;i++){
        if(null == vm.doubleList[i].teacherId){
          vm.$Message.info("请选择授课老师！");
          return
        }
        if(null == vm.doubleList[i].lessonInfo){
          vm.$Message.info("请选择节数！");
          return
        }
      }

      let data = {
        doubleList: vm.doubleList,
        doubleWeek: vm.doubleWeek,
        singleList: vm.singleList,
        singleStatus: vm.singleStatus,
        singleWeek: vm.singleWeek,
        sportsClassId: vm.classId,
        // teacherId:vm.teacherId
      };
      console.log(data);
      // return
      this.$axios
        .post("/v1/primarysportsclass/upsertClassPlan", data)
        .then(function(response) {
        //   console.log(response);
          if (response.data.response.code == "1") {
            vm.$Message.info("提交成功");
            vm.$router.go(-1);
          } else {
            vm.$Message.info("提交失败");
          }
        })
        .catch(function(response) {
          console.log(response);
          vm.$Message.info("提交失败");
        });
    }
  },
  mounted() {
    var vm = this;
    let classId = sessionStorage.getItem("sportsClass-classPlan-classId");
    vm.classId = classId;
    if (sessionStorage.getItem("sportsClass-classPlan-classId")) {
      vm.getClassPlanInfo(
        sessionStorage.getItem("sportsClass-classPlan-classId")
      );
    }
    vm.getSchoolTeacherList();
  },
  destroyed() {}
};
</script>
