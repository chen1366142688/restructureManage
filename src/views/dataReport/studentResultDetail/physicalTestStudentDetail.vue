
<template>
  <div style="padding-left: 10px">
    <h2 style="margin-top: 15px; margin-bottom: 13px">学生体测成绩详情</h2>
    <common-tables
      :reportType="reportType" 
      :yearSemester="yearSemester" 
      :schoolId="schoolId"
      :isShowEdit="isShowEdit"
    >
    </common-tables>
  </div>
</template>

<script>
import CommonTables from './components/common-tables'
export default {
  name: "visionTestStudentDetail",
  components: {
    CommonTables
  },
  data() {
    return {
      yearSemester: "",
      schoolId: "",
      reportType: '',
      schoolGradeList: [],
      resultData: [],
      isShowEdit: false, // type 1: 国网体测数据上报 2：教育局体测数据上报
    };
  },
  
  created() {
    const { isShowEdit, yearSemester, reportType, schoolId} = this.$route.query
    this.isShowEdit = Boolean(isShowEdit) // type 1: 国网体测数据上报 2：教育局体测数据上报
    this.schoolId = schoolId
    this.yearSemester = String(yearSemester)
    this.reportType = reportType
  },
};
</script>
<style scoped>
.mar-r40 {
  margin-right: 40px;
}
.width120 {
  width: 120px;
}
@media screen and (max-width: 1650px) {
  .mar-r40 {
    margin-right: 15px;
  }
  .width120 {
    width: 100px;
  }
}
</style>