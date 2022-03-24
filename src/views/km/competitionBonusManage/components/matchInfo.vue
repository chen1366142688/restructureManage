<template>
  <Card>
    <div style="font-weight:bold;font-size:16px;">赛事信息</div>
    <div class="top-search">
      <div class="left-input">
        <div style="margin: 5px 20px">
          <span>赛事名称：</span>
          <Input v-model="params.competitionName" style="width: 340px" placeholder="请输入赛事名称"></Input>
        </div>
        <div style="margin: 5px 20px">
          <span>赛事级别：</span>
          <Select v-model="params.levelId" style="width: 340px">
            <Option
              v-for="item in cometitionLevel"
              :value="item.levelId"
              :key="item.levelId"
              placeholder="请选择赛事级别"
              >{{ item.levelName }}</Option
            >
          </Select>
        </div>
        <div style="margin: 5px 20px">
          <span>比赛时间：</span>
          <DatePicker
            type="daterange"
            placement="bottom-end"
            placeholder="请选择比赛时间"
            style="width: 340px"
            @on-change="changeDate"
          ></DatePicker>
        </div>
        <div style="margin: 5px 20px">
          <span>比赛地点：</span>
          <Input v-model="params.competitionAddress" style="width: 340px" placeholder="请输入比赛地点"></Input>
        </div>
      </div>
      <div class="right-btns">
        <Button type="success" @click="submit">保存</Button>
        <Button type="success" @click="goBack">返回</Button>
      </div>
    </div>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      params : {
        competitionName: '',
        levelId: '9999', // 赛事级别
        competitionStartTime: '',
        competitionEndTime : '',
        competitionAddress: ''
      },
    }
  },
  computed: {
    ...mapState(['cometitionLevel']) // 获取赛事等级
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$emit('on-submit', this.params)
    },
    goBack () {
      this.$emit('on-back')
    },
    changeDate (date) {
      let [competitionStartTime, competitionEndTime ] = date
      this.params.competitionStartTime = competitionStartTime
      this.params.competitionEndTime  = competitionEndTime 
    },

  }
};
</script>

<style lang="less" scoped>
</style>