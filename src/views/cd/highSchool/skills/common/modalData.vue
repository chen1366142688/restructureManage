<template>
  <div class="modalData" v-if="showModal">
    <div class="modal-box">
      <div class="modal-title">提示</div>
      <div class="modal-footer">
        <Spin fix size="large">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>同步中...</div>
            </Spin>
      </div>
      <div class="modal-section"><span>正在同步体测数据中，暂时不能执行任何操作。</span><Button type="success" @click="upLoadData">刷新</Button></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modalDatacd",
  props: {
    showModal: {
      type: Boolean,
      default: ""
    }
  },
  watch: {
  },
  methods:{
    cancle(){
      this.$parent.cancle();
    },
    upLoadData(){
      this.$parent.countNotExcute();
    }
  }
};
</script>
<style scoped>
.modalData{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background: rgba(0,0, 0,0.65);
}
.modal-box{
  position: relative;
  width:420px;
  background: rgb(255,255,255);
  min-height: 100px;
  top:20%;
  left:50%;
  transform: translateX(-30%);
  border-radius: 20px;
}
.modal-title{
  border-bottom: 1px solid #e8eaec;
  padding: 14px 16px;
  color: rgb(255, 102, 0);
  text-align: center;
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-section{
  padding: 16px;
  font-size: 12px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e8eaec;
}
.modal-footer{
  height:80px;
  padding: 12px 18px 12px 18px;
  text-align: center;
  position: relative;
  
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.ivu-spin-fix{
  background-color: rgba(255, 255, 255, 0);
}
</style>
