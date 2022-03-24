<template>
  <Card>
    <Row>
      <Col span="15">
        <span>年级：</span>
        <Select v-model="params.grade" class="width120">
          <Option
            v-for="item in schoolGradeList"
            :value="item.grade"
            :key="item.grade"
            >{{ item.label }}
          </Option>
        </Select>
        <span style="margin-left: 20px">班<span style="visibility:hidden;">空</span>级：</span>
        <Select v-model="params.studentClass" class="width120">
          <Option
            v-for="item in classList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}
          </Option>
        </Select>
        <span style="margin-left: 20px">性别：</span>
        <Select v-model="params.gender" class="width120">
          <Option
            v-for="item in genderType"
            :value="item.typeId"
            :key="item.typeId"
            >{{ item.typeName }}
          </Option>
        </Select>
      </Col>
      <Col span="9">
        <Button style="margin-right:10px;" @click="search" type="success">查询</Button>
        <template v-if="isShowExportBtn">
          <Button v-on:click="toImportStudent" type="success">上报学生导入</Button>
          <Button v-on:click="createReportStudentBySchool" type="success">按学生信息生成</Button>
        </template>
        <Button class="mar-r20" @click="reset" type="success">重置查询条件</Button>
        <Button class="add-button" @click="back" type="success">返回</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <span>姓名：</span>
      <Input
        v-model="params.studentName"
        placeholder="学生姓名"
        class="width120"
      />
      <span style="margin-left: 20px">学籍号：</span>
      <Input
        v-model="params.registerCode"
        placeholder="学生学籍号"
        class="width120"
      />
      <span style="margin-left: 20px">状态：</span>
      <Select v-model="params.studentStatus" class="width120">
        <Option
          v-for="item in statusType"
          :value="item.typeId"
          :key="item.typeId"
          >{{ item.typeName }}
        </Option>
      </Select>
    </Row>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // inheritAttrs: false, // 不想继承所有父组件的内容
  props: {
    params: {
      type: Object,
      default: {}
    },
    yearSemester: {
      type: String,
      default: ''
    },
    schoolId: {
      type: [String, Number],
      default: ''
    },
    reportType: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      isShowExportBtn: state => state.pageParams.isShowExportBtn // 是否显示上报学生导入、按学生生成的按钮
    }),
    statusType() {
      if (this.reportType == 1) {
        return this.otherStatusType
      } else if (this.reportType == 2) {
        return this.visionStatusType
      } else {
        return this.otherStatusType.slice(0, 4)
      }
    }
  },
  data() {
    return {
      schoolGradeList: [],
      classList: [
        {
          value: 'ALL',
          label: "全部班级",
        },
        {
          value: 1,
          label: "1班",
        },
        {
          value: 2,
          label: "2班",
        },
        {
          value: 3,
          label: "3班",
        },
        {
          value: 4,
          label: "4班",
        },
        {
          value: 5,
          label: "5班",
        },
        {
          value: 6,
          label: "6班",
        },
        {
          value: 7,
          label: "7班",
        },
        {
          value: 8,
          label: "8班",
        },
        {
          value: 9,
          label: "9班",
        },
        {
          value: 10,
          label: "10班",
        },
        {
          value: 11,
          label: "11班",
        },
        {
          value: 12,
          label: "12班",
        },
        {
          value: 13,
          label: "13班",
        },
        {
          value: 14,
          label: "14班",
        },
        {
          value: 15,
          label: "15班",
        },
        {
          value: 16,
          label: "16班",
        },
        {
          value: 17,
          label: "17班",
        },
        {
          value: 18,
          label: "18班",
        },
        {
          value: 19,
          label: "19班",
        },
        {
          value: 20,
          label: "20班",
        },
        {
          value: 21,
          label: "21班",
        },
        {
          value: 22,
          label: "22班",
        },
        {
          value: 23,
          label: "23班",
        },
        {
          value: 24,
          label: "24班",
        },
        {
          value: 25,
          label: "25班",
        },
        {
          value: 26,
          label: "26班",
        },
        {
          value: 27,
          label: "27班",
        },
        {
          value: 28,
          label: "28班",
        },
        {
          value: 29,
          label: "29班",
        },
        {
          value: 30,
          label: "30班",
        },
        {
          value: 31,
          label: "31班",
        },
        {
          value: 32,
          label: "32班",
        },
        {
          value: 33,
          label: "33班",
        },
        {
          value: 34,
          label: "34班",
        },
        {
          value: 35,
          label: "35班",
        },
        {
          value: 36,
          label: "36班",
        },
        {
          value: 37,
          label: "37班",
        },
        {
          value: 38,
          label: "38班",
        },
        {
          value: 39,
          label: "39班",
        },
        {
          value: 40,
          label: "40班",
        },
        {
          value: 41,
          label: "41班",
        },
        {
          value: 42,
          label: "42班",
        },
        {
          value: 43,
          label: "43班",
        },
        {
          value: 44,
          label: "44班",
        },
        {
          value: 45,
          label: "45班",
        },
        {
          value: 46,
          label: "46班",
        },
        {
          value: 47,
          label: "47班",
        },
        {
          value: 48,
          label: "48班",
        },
        {
          value: 49,
          label: "49班",
        },
        {
          value: 50,
          label: "50班",
        },
        {
          value: 51,
          label: "51班",
        },
        {
          value: 52,
          label: "52班",
        },
        {
          value: 53,
          label: "53班",
        },
        {
          value: 54,
          label: "54班",
        },
        {
          value: 55,
          label: "55班",
        },
        {
          value: 56,
          label: "56班",
        },
        {
          value: 57,
          label: "57班",
        },
        {
          value: 58,
          label: "58班",
        },
        {
          value: 59,
          label: "59班",
        },
        {
          value: 60,
          label: "60班",
        },
      ],
      primaryList: [
        { grade: 'ALL', label: "全部年级" },
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      highList: [
        { grade: 'ALL', label: "全部年级" },
        {
          grade: 10,
          label: "高一",
        },
        {
          grade: 11,
          label: "高二",
        },
        {
          grade: 12,
          label: "高三",
        },
      ],
      middleList: [
        { grade: 'ALL', label: "全部年级" },
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      visionStatusType: [
        {
          typeId: 'ALL',
          typeName: "全部状态",
        },
        {
          typeId: "1",
          typeName: "已测完",
        },
        {
          typeId: "2",
          typeName: "未测试",
        },
      ],
      otherStatusType: [
        {
          typeId: 'ALL',
          typeName: "全部状态",
        },
        {
          typeId: "1",
          typeName: "未完成",
        },
        {
          typeId: "2",
          typeName: "已完成",
        },
        {
          typeId: "3",
          typeName: "不在校",
        },
        {
          typeId: "4",
          typeName: "免试",
        }
      ],
      // statusType: [],
      genderType: [
        {
          typeId: 'ALL',
          typeName: "全部性别",
        },
        {
          typeId: "1",
          typeName: "男生",
        },
        {
          typeId: "2",
          typeName: "女生",
        },
      ],
    }
  },
  mounted() {
    let schoolType = sessionStorage.getItem('schoolType')
    if (schoolType) {
      if (schoolType == '0') {
        this.schoolGradeList = this.schoolGradeList.concat(this.primaryList).concat(this.middleList).concat(this.highList);
      } else if (schoolType == '2') {
        this.schoolGradeList = this.primaryList;
      } else if (schoolType == '3') {
        this.schoolGradeList = this.middleList;
      } else if (schoolType == '4') {
        this.schoolGradeList = this.highList;
      }
    }
  },
  methods: {
    createReportStudentBySchool(){
      let url
      if (this.reportType == 1 || this.reportType == 3) {
        url = '/v1/dataReport/createReportStudentBySchool'
      } else {
        url = '/v1/vision/report/createReportStudentBySchool'
      }
      this.$axios.get(`${url}?schoolId=${this.schoolId}&yearSemester=${this.yearSemester}&wasNow=1`).then(res => {
        if (res.data.code == 10000) {
            this.$Message.info(res.data.msg)
            this.search()
        }
      })
    },
    toImportStudent() {
      if (this.reportType == 2) { // 视力的需要单独处理
        const data = {
          yearSemester: this.yearSemester,
          schoolId: this.schoolId
        }
        this.$router.push({ name: 'visionStudentReportPage', query: data})
      } else {
        this.$router.push({ name: 'importStudentInfo', query: {yearSemester: this.yearSemester, taskType: '3'}})
      }
    },
    search () {
      this.$emit('on-search')
    },
    reset () {
      this.$emit('on-reset')
    },
    back () {
      this.$emit('on-back')
    }
  }
}
</script>

<style lang="less" scoped>

</style>