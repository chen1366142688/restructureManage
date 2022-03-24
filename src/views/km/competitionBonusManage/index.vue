<template>
  <div class="competition_page" style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">竞赛加分管理</h2>
    <Tabs type="card" style="margin-top:16px;min-height:698px;" :value="activedTab" @on-click="changeTab">
      <TabPane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.label"
        :name="item.value"
        :ref="item.value"
      >
        <template v-if="activedTab === item.value">
          <component :is="component"></component>
        </template>
      </TabPane>

    </Tabs>
  </div>
</template>

<script>
import SearchCompetition from './components/searchCompetition'
import SearchStudent from './components/searchStudent'
import api from '@/api/contestBonus.js'
export default {
  data () {
    return {
      isAdmin: sessionStorage.getItem('isAdmin'), // 是否是管理员  1：是  0：否
      tabs: [
        {label: '按赛事查询', value: 'compettion'},
        {label: '按学生查询', value: 'student'}
      ],
      activedTab: '',
      component: null
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log('to', to)
    // 保存当前页面的activeTab
    if (to.name === 'addCompetitionBonusKM' || to.name === 'addStudentKM') {
      sessionStorage.setItem('activedTab', this.activedTab)
      next()
    } else {
      sessionStorage.removeItem('activedTab')
      sessionStorage.removeItem('competitionManage-searchStudent')
      sessionStorage.removeItem('competitionManage-searchCompetition')
      next()
    }
  },
  mounted () {
    if (sessionStorage.getItem('activedTab')) {
      this.activedTab = sessionStorage.getItem('activedTab')
    } else {
      this.activedTab = this.tabs[0].value
    }
    if (this.activedTab === 'compettion') {
      this.component = SearchCompetition
    } else {
      this.component = SearchStudent
    }
    this.getCompetitionLevel() // 获取赛事等级
  },
  methods: {
    changeTab (name) {
      this.activedTab = name
      sessionStorage.setItem('activedTab', name)
      if (name === 'compettion') {
        this.component = SearchCompetition
      } else {
        this.component = SearchStudent
      }
    },
    // 获取赛事等级
    async getCompetitionLevel () {
      let res = await api.getCompetitionLevel()
      if (res.data.code === 10000) {
        // this.competitionLevel = res.data.response
        this.$store.commit('setCompetitionLevel', res.data.response) // 保存赛事等级
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>