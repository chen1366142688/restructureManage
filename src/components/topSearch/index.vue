<template>
  <Card >
        <div class="top-search">
          <div class="left-inputs">
            <div class="item" v-for="(data, index) in searchData">
              <span v-if="data.label.length == 2">{{data.label.substr(0, 1)}}&emsp;&emsp;{{data.label.substr(1, 2)}}：</span>
              <span v-else-if="data.label.length == 3">{{data.label.substr(0, 1)}}&ensp;{{data.label.substr(1, 1)}}&ensp;{{data.label.substr(2, 3)}}：</span>
              <span v-else>{{data.label}}：</span>
              <Input v-if="data.inputType === 'input'" v-model="data.value" style="width:120px;" :placeholder="data.placeholder"/>
              <Select v-model="data.value" style="width:120px;" v-if="data.inputType === 'select'">
                <Option
                  v-for="(item, index) in data.selectData"
                  :value="item.value"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
              <DatePicker
                v-if="data.inputType === 'date'"
                :value="data.value"
                format="yyyy-MM-dd"
                type="date"
                placeholder="日期"
                style="width: 200px"
                @on-change="($event) => changeDate(data, $event)"
              ></DatePicker>
              <DatePicker
                v-if="data.inputType === 'daterange'"
                :value="data.value"
                format="yyyy-MM-dd"
                :type="data.inputType"
                placeholder="日期"
                style="width: 200px"
                @on-change="($event) => changeDate(data, $event)"
              ></DatePicker>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="_search">查询</Button>
            <slot name="rightBtn"></slot>
          </div>
        </div>
      </Card>
</template>

<script>
  export default {
    props: {
      data: Array,
      default: []
    },
    data () {
      return {
      }
    },
    computed:{
      searchData() {
        return this.data
      }
    },
    mounted() {
      this._search()
    },
    methods: {
      _search () {
        let searchData = JSON.parse(JSON.stringify(this.searchData))
        const params = {}
        searchData.forEach(data => {
          if (data.value == 999 || data.value == 9999) {
            data.value = ''
          }
          params[data.props] = data.value || ''
        })
        this.$emit('on-search', params)
      },
      changeDate (item, e) {
        item.value = e
      }
    }
  }
</script>

<style lang="less" scoped>
.top-search{
  display:flex;
  justify-content: space-between;
  // 左边输入框
  .left-inputs{
    width:62%;
    display:flex;
    flex-wrap:wrap;
    align-items:flex-start;
    .item{
      margin:5px 20px;
    }
  }
  // 右边的操作按钮
  .right-btns{
    text-align:left;
    width:38%;
    Button{
      margin:5px;
    }
  }
  
}
</style>