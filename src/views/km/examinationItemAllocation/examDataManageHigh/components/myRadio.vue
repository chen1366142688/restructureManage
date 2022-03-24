<template>
  <div>
    <div class="radio_title">
      请选择得分：
    </div>
    <div class="radio">
      <div  v-for="(item,index) in radioList" :key="index+item" class="radio_button" :class="indexDisabel == index?'checked':''" @click="checked(index,item)">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['arrData','scoreValue'],
  data() {
    return {
      radioValue:'',
      indexDisabel:this.activeIndex,
    }
  },
  computed:{
    radioList() {
      this.changeIndex(this.arrData);
      return this.arrData
    }
  },
  created() {
    this.changeIndex();
  },
  methods:{
    //选择数值
    checked(index,value) {
      this.indexDisabel = index;
      this.radioValue = value;
      this.$emit('changeScore',value)
    },
    //初始数值回显
    changeIndex(arr) {
      let newIndex = 0;
      arr.forEach((element,index) => {
        if(arr[index] == this.scoreValue) newIndex = index;
      }); 
      this.indexDisabel = newIndex
    }
  }
}
</script>
<style lang="less" scoped>
  .radio {
    display:flex;
    // justify-content: space-between;
    flex-wrap:wrap;
  }
  .radio_title{
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #515A6E;
    line-height: 40px;
  }
  .radio_button{
    width: 35px;
    height: 48px;
    background: #E9E9E9;
    border-radius: 4px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #515A6E;
    line-height: 40px;
    margin:10px 10px 10px 0;
    text-align: center;
  }
  .checked{
    background: #00C693;
    color: #FFFFFF;
  }
</style>