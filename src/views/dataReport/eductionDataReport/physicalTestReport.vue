<template>
  <div class="paL10">
    <CommonReport :reportData="reportData"></CommonReport>
  </div>
</template>

<script>
import CommonReport from "@/views/public/reportAggregate/index.vue";
export default {
  components: {
    CommonReport,
  },
  data () {
    return {
      reportData: {
        yearSemester: sessionStorage.getItem('yearSemester'),
        reportType: '1', // 1：体质测试  2：视力  3：学科评价
      },
    };
  }
};
</script>
<style lang="less" scoped>
.paL10 {
  padding-left: 10px;
}
</style>
