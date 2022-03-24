<template>
  <div class="configuration" style="padding-left:10px;">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">{{ title }}</h2>
    </div>
    <Card class="content">
      <div
        v-for="(item, index) in testTimeList"
        :key="index"
        style="padding-bottom: 10px"
      >
        <div style="padding:10px 0;" class="content-row">
          <div>
            <span>考试时间{{ numberToChina(index + 1) }}：</span>
            <DatePicker
              format="yyyy-MM-dd HH:mm"
              type="datetime"
              placeholder="开始时间"
              :value="item.startTime"
              @on-change="changeStart($event, index, 'start')"
              style="width: 200px"
            ></DatePicker>
            <span style="padding: 0 20px">至</span>
            <DatePicker
              format="yyyy-MM-dd HH:mm"
              type="datetime"
              :value="item.endTime"
              @on-change="changeStart($event, index, 'end')"
              placeholder="结束时间"
              style="width: 200px"
            ></DatePicker>
          </div>
          <div style="margin: 0 20px">
            <Button
              type="success"
              style="font-size: 14px; font-family: PingFang SC"
              @click="addTeacher(index)"
              >添加考核老师</Button
            >
          </div>
          <div class="content-col">
            <span>年级：</span>
            <CheckboxGroup
              v-model="item.teacherPitch"
              class="checkbox"
              :indeterminate="indeterminate"
              @on-change="gradeChange"
            >
              <span v-for="items in item.gradeList" :key="items.grade">
                <Checkbox :label="items.grade">{{ items.label }} </Checkbox>
              </span>
            </CheckboxGroup>
          </div>
        </div>
        <div class="addTeacher">
          <quer-teacher
            :teacherMsgList.sync="item.teachers"
            :index="index"
            @deleteTeacher="deleteTeacher(arguments)"
          ></quer-teacher>
        </div>
      </div>
      <div class="footerBtn">
        <Button
          type="success"
          @click="addTestTime"
          style="
            width: 120px;
            font-family: PingFang SC;
            font-size: 14px;
            ont-weight: bold;
          "
          >添加考试时间</Button
        >
      </div>
    </Card>
    <div class="form-btn">
      <Button
        type="success"
        style="margin-right: 50px;"
        @click="save"
        >保存</Button
      >
      <Button type="success"  @click="goback">取消</Button>
    </div>
  </div>
</template>
<script>
import QuerTeacher from "@/views/km/examinationItemAllocation/examinationAllocation/components/selectTeacher.vue";
import grade from "@/libs/grade";
import api from "@/api/studentApi";
import util from "@/libs/util.js";
export default {
  components: {
    QuerTeacher,
  },
  data() {
    return {
      defluatGradeId: "",
      gradeList: [], // 年级列表
      gradeIdList: [], //数据返回年级数据列表
      middleItemId: "", // 单个项目
      indeterminate: false,
      title: "",
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
      },
      testTimeList: [
        {
          startTime: "",
          endTime: "",
          teachers: [
            { name: "", teacherId: "1" },
            { name: "", teacherId: "2" },
          ],
          classList: [],
        },
      ], //考试设置列表
      fruitTwo: [], // 选择完成年级列表
      classList: [
        { name: "七年级", id: "1" },
        { name: "八年级", id: "2" },
        { name: "九年级", id: "3" },
      ],
    };
  },
  mounted() {
    let schoolType = sessionStorage.getItem("schoolType");
    const arr = grade.inOf(schoolType);
    this.gradeList = this.selectGrade(arr);
    this.middleItemId = this.$route.params.middleItemId;
    this.defluatGradeId = this.$route.params.gradeId;
    this.title = this.$route.params.title;
    this.configLength = this.$route.params.configLength;
    this.queryExamConfig();
  },
  methods: {
    numberToChina(val) {
      return util.NumberToChinese(val);
    },
    //将时间字符串转为时间戳
    filterDate(value) {
      var timestamp2 = Date.parse(new Date(value));
      timestamp2 = timestamp2 / 1000;
      return timestamp2;
    },
    repetion(arr) {
      let juge = true;
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].startTime || !arr[i].endTime || !arr[i].grades.length) {
          juge = false;
          return false;
        }
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].timestamp === arr[j].timestamp) {
            juge = false;
            return false;
          }
        }
      }
      return juge;
    },
    //筛选年级去除全部
    selectGrade(arr) {
      return arr.filter((item) => item.grade != "9999");
    },
    // 重组出已选择的年级
    filterChangeGrade(arr) {
      let gradeList = this.gradeList;
      let arrNew = [];
      const mapGrade = arr.map((item) => {
        gradeList.map((prend) => {
          if (item == prend.grade) {
            arrNew.push({
              grade: prend.grade,
              gradeName: prend.label,
            });
          }
        });
      });
      return arrNew;
    },
    //获取一个
    filter(classArr, start, end) {
      let newArr = [],
        arr = [
          { id: 1, text: "1", text2: "2" },
          { id: 1, text3: "3" },
          { id: 2, text1: "4" },
          { id: 2, text2: "5" },
          { id: 3, text1: "5" },
        ];
      arr.forEach(function (item) {
        let hasPush = false;
        newArr.forEach((item2, index, thisArr) => {
          if (item.id == item2.id) {
            hasPush = true;
            thisArr[index] = { ...item, ...item2 };
            return;
          }
        });
        !hasPush && newArr.push(item);
      });
    },
    //添加年级下的开始时间和结束时间
    filterClassTime(arr, start, end) {
      arr.forEach((classItem) => {
        classItem.startTiem = start;
        classItem.endTime = end;
      });
      return arr;
    },

    //组装筛选提交数据
    filterSubmitAll(arr) {
      let child = [];
      let startTimeList = [],
        endTimeList = [];

      arr.forEach((element) => {
        const grades = this.filterChangeGrade(element.teacherPitch);
        let { endTime, startTime, teachers, schoolConfigId } = element;
        let classTimeList = this.filterClassTime(grades, startTime, endTime);
        const timestampStart = this.filterDate(startTime);
        const timestamEnd = this.filterDate(endTime);
        startTimeList.push(startTime);
        endTimeList.push(endTime);
        child.push({
          timestamp: timestampStart + timestamEnd,
          startTimeList,
          endTimeList,
          classTimeList,
          grades,
          endTime,
          startTime,
          teachers,
          schoolConfigId: schoolConfigId || "",
        });
      });
      return child;
    },

    //年级选择变化回调
    gradeChange(arr) {},
    //赛选出已经有的班级
    filterGrade(arr) {
      let teacherPi;
      const newArr = arr.map((item) => {
        const teacherPitch = item.grades;
        teacherPi = teacherPitch.map((items) => {
          return items.grade;
        });
      });
      return teacherPi;
    },
    //初始话添加数据
    addCode(arr = []) {
      // debugger;
      const _this = this;
      let teacherArr = [];
      const arrNew = arr.map((item) => {
        let gradeList = [];
        for (let grade of item.gradeId) {
          gradeList.push({ grade: grade, label: `${grade}年级` });
        }
        item.gradeList = gradeList;
        item.teacherPitch = [];
        item.grades.forEach((child) => {
          item.teacherPitch.push(child.grade);
        });
        return item;
      });
      return arrNew;
    },
    // 查询考试相关配置
    queryExamConfig() {
      api.getExamConfig({ middleItemId: this.middleItemId }).then((res) => {
        // debugger;
        let gradeIdList = [];
        let { gradeId } = res.data.response || [];
        this.testTimeList = this.addCode(res.data.response.configVOList);
        this.gradeIdList = gradeId.map((item) => {
          return { grade: item, label: `${item}年级` };
        });
      });
    },
    // 删除教师选择
    deleteTeacher(msg) {
      let teachers = this.testTimeList[msg[0]].teachers;
      let deleteTeacher = JSON.parse(JSON.stringify(teachers));
      deleteTeacher.splice(msg[1], 1);
      this.$set(this.testTimeList[msg[0]], "teachers", deleteTeacher);
    },
    addTeacher(index) {
      //添加考核老师列表
      let tcList = this.testTimeList[index].teachers || [];
      const child = this.testTimeList[index];
      let obj = {
        name: "",
        idteacherId: "",
      };
      tcList.push(obj);
      child.teachers = tcList;
      this.testTimeList.splice(index, 1, child);
    },
    addTestTime() {
      //添加考试时间
      const obj = {
        startTime: "",
        endTime: "",
        schoolConfigId: "",
        teachers: [],
        classList: [],
        gradeList: this.gradeIdList || [],
        teacherPitch: [this.defluatGradeId],
      };
      this.testTimeList.push(obj);
    },
    //获取所有年级下的开始时间和结束时间
    judge(arr) {
      let seven = { start: [], end: [] };
      let eight = { start: [], end: [] };
      let nine = { start: [], end: [] };
      arr.forEach((item) => {
        let gradeList = item.classTimeList;
        gradeList.forEach((element) => {
          if (element.grade == 7) {
            seven.start.push(element.startTiem);
            seven.end.push(element.endTime);
          } else if (element.grade == 8) {
            eight.start.push(element.startTiem);
            eight.end.push(element.endTime);
          } else if (element.grade == 9) {
            nine.start.push(element.startTiem);
            nine.end.push(element.endTime);
          }
        });
      });
      // console.log([seven,eight,nine])
      return [seven, eight, nine];
    },
    //遍历得出同年级下时间有冲突
    circulation(arr) {
      let value = false;
      try {
        arr.forEach((item) => {
          let boolen = this.rangeRepeat(item.start, item.end);
          if (!boolen) {
            value = true;
            throw "终止";
          }
        });
      } catch (e) {}
      return value;
    },
    //筛选是否有未填写的时间和班级以及开始时间小于结束时间
    screen(arr) {
      let val = false;
      try {
        arr.forEach((item) => {
          let startTime = this.filterDate(item.startTime);
          let endTiem = this.filterDate(item.endTime);
          if (!item.startTime || !item.endTime || !item.grades.length) {
            val = true;
            throw "终止";
          } else {
            if (startTime >= endTiem) {
              val = true;
              throw "终止";
            }
          }
        });
      } catch (e) {}
      return val;
    },
    //筛选是否有空教师
    judgeTeacher(arr) {
      let judgeBoolean = false;
      try {
        arr.forEach((item) => {
          let teachers = item.teachers;
          try {
            teachers.forEach((child) => {
              if (!child.teacherId) {
                judgeBoolean = true;
                throw "终止";
              }
            });
          } catch (err) {}
        });
        if (judgeBoolean) {
          throw "终止";
        }
      } catch (error) {}
      return judgeBoolean;
    },
    save() {
      // 保存
      const list = this.testTimeList;
      const formList = this.filterSubmitAll(list);
      let boole = this.circulation(this.judge(formList));
      let scennVal = this.screen(formList);
      let judgeBoolean = this.judgeTeacher(formList);
      if (boole || scennVal || judgeBoolean) {
        this.$Modal.error({
          title: "提醒",
          content: "考核配置不合理，请检查考核相关配置是否正确",
        });
        return;
      } else {
        const params = {
          configList: formList,
          middleItemId: this.middleItemId,
        };
        api.addExamConfig(params).then((res) => {
          const { code } = res.data;
          if (code == 10000) this.goback();
          else {
            this.$Message.error({
              content: res.data.msg,
            });
            this.queryExamConfig();
          }
        });
      }
    },
    goback() {
      //返回
      this.$router.go(-1);
    },
    //获取选择时间的
    changeStart(...arg) {
      let obj = this.testTimeList[arg[1]];
      if (arg[2] == "start") {
        obj.startTime = `${arg[0]}:00`;
      } else {
        obj.endTime = `${arg[0]}:00`;
      }
      this.testTimeList.splice(arg[1], 1, obj);
    },
    //判断时间区间是否有重复得
    rangeRepeat(begin, over) {
      var begin = begin.sort();
      var over = over.sort();
      for (let i = 1; i < begin.length; i++) {
        if (begin[i] <= over[i - 1]) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>
<style lang="less" scoped>
.configuration {
  width: 100%;
  // .content {
  //   width: 100%;
  //   // height: 310px;
  //   position: relative;
  //   background: #ffffff;
  //   border-radius: 5px;
  //   margin: 0 auto;
  // }
}
.content-row {
  display: flex;
  align-items: center;
}

.content-col {
  display: flex;
  align-items: center;
  align-items: center;
}
.checkbox {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  // align-items: ;
  label {
    margin-right: 15px;
    font-size: 15px;
  }
}
.footerBtn {
  padding: 30px 0 30px 20px;
}
.form-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>