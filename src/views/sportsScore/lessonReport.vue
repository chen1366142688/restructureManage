<template>
  <div class="subject-report">
    <h2 style="margin-top: 15px;margin-bottom: 13px;">体育与健康学课报告</h2>
    <div>
      <div class="top-select">
        <div class="btns" style="font-size:14px;">
          <div :class="['left', selectIndex == 0 ? 'checked' : '']" @click="changeTab(0)">当前学期</div>
          <div :class="['right', selectIndex == 1 ? 'checked' : '']" @click="changeTab(1)">历史数据对比</div>
        </div>
        <div>
          <Button type="primary" @click="goBack" style="margin-right:10px;">返回</Button>
          <Button type="primary" @click="download">导出PDF</Button>
        </div>
      </div>
    </div>
    <!-- 当前学期 -->
    <current-semester id="pdfDom" v-if="selectIndex === 0"></current-semester>
    <!-- 历史数据对比 -->
    <history-data id="pdfDom2" v-else></history-data>
  </div>
</template>
<script>
import CurrentSemester from '@/components/lessonReport/currentSemester' // 当前学期
import HistoryData from '@/components/lessonReport/historyData' // 历史数据对比
export default {
  props: {},
  data() {
    return {
      selectIndex: 0,
      htmlTitle: "学课报告",
    };
  },
  components: {
    CurrentSemester,
    HistoryData
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    /** 导出PDF */
    download () {
      let pageName = this.selectIndex === 1 ? 'pdfDom2' : 'pdfDom'
      this.getPdf(pageName, this.htmlTitle);
    },
    changeTab(index) {
      this.selectIndex = index;
    },
    
  },
};
</script>
<style lang="less" scoped>
.top-select {
  display: flex;
  width:100%;
  background:#fff;
  box-sizing:border-box;
  justify-content: space-between;
  align-items:center;
  height:60px;
  padding:0 16px;
  .btns {
    display: flex;
    .left,
    .right {
      width: 120px;
      height: 33px;
      text-align: center !important;
      cursor: pointer;
      line-height: 33px;
      border-radius: 5px 0px 0px 5px;
      border: 1px solid rgba(220, 222, 226, 1);
      background: rgba(248, 248, 249, 1);
      color: #515a6e;
    }
    .right {
      border-radius: 0px 5px 5px 0px;
    }
    .checked {
      background: #00c693;
      color: #fff;
      border-color: #00c693;
    }
  }
}
.content {
  margin-top: 16px;
}
.history-data{
  padding-right:16px;
}
</style>
