<template>
  <div class="interview-item__sec">
    <h4 :class="titleClass">{{title}}</h4>
    <ul>
      <li v-for="(selectedItem,sindex) in actionList" :key="sindex">
        <div class="interview-item__name">
          <span>{{selectedItem.classTestName}}</span>
          <i class="interview-required__icon" v-if="isExamTips">{{selectedItem.examType * 1 === 1 ? "必考" : "选考"}}</i>
        </div>
        <ul class="intervier-content" v-if="selectedItem.examItem.length>1">
          <li v-for="exam in selectedItem.examItem" :key="exam">{{exam}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "interviewListcd",
  props: {
    title: {
      type: String,
      default: ""
    },
    titleClass: {
      type: String,
      default: ""
    },
    isExamTips: {
      type: Boolean,
      default: true
    },
    actionList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    actionList: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log("action list : ", val);
      }
    }
  }
};
</script>
<style scoped>
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
  margin-left:8px;
}
.interview-item__name > span {
  vertical-align: middle;
}
.interview-item__sec > ul > li,
.intervier-content li {
  margin: 6px 0;
}
</style>
