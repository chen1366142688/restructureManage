<template>
  <div class="appraisal-description-page">
    <div class="header_title">体育综合评价考核说明</div>
    <Card style="margin-top:20px;">
      <div>
        高中学生在三年的体育与健康课程学习中需上满216课时，修完12个模块，获得12个学分；12个模块包含体能1个模块，健康知识1个模块，运动技能系列10个模块。每个模块学习完成后，需通过考核和评定，最终成绩大于等于60，可获得1学分。
      </div>
      <div style="margin-top:36px;">
        <!-- 单模块等第换算方法： -->
        <div><b>单模块等第换算方法：</b></div>
        <div class="table-1">
          <!-- 总分 -->
          <div class="table-item">
            <div class="name">总分</div>
            <div v-for="(item, index) in total" :key="index">{{item}}</div>
          </div>
          <!-- 等第 -->
          <div class="table-item">
            <div class="name">等第</div>
            <div v-for="(item, index) in level" :key="index">{{item}}</div>
          </div>
          <!-- 积分 -->
          <div class="table-item border-bottom">
            <div class="name">计分</div>
            <div v-for="(item, index) in score" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
      <div style="margin-top:36px;">
        <!-- 高中阶段体育与健康学业水平成绩评定： -->
        <div><b>高中阶段体育与健康学业水平成绩评定：</b></div>
        <div class="table-1">
          <!-- 总分 -->
          <div class="table-item">
            <div class="name">学业水平</div>
            <div v-for="(item, index) in academicLevel" :key="index">{{item}}</div>
          </div>
          <!-- 等第 -->
          <div class="table-item">
            <div class="name">各模块总积分</div>
            <div v-for="(item, index) in moduleTotalIntegral" :key="index">{{item}}</div>
          </div>
          <!-- 积分 -->
          <div class="table-item border-bottom">
            <div class="name">最终等第</div>
            <div v-for="(item, index) in lastLevel" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
    </Card>
    <Card style="margin-top:20px;">
      <div style="font-size:20px;font-weight:bold;">体能</div>
      <div style="margin-top:20px;">体能模块共1个学分，需高一、高二上下学期以及高三上学期，共5个学期完成。</div>
      <div>体能模块的成绩累计取平均计算：学年成绩 = （上学期成绩 + 下学期成绩） / 2 ； 最终成绩 = （高一第一学期成绩 + 高一第二学期成绩 + 高二第一学期成绩 + 高二第二学期成绩 + 高三第一学期成绩） / 5。</div>
    </Card>
    <Card style="margin-top:20px;">
      <div style="font-size:20px;font-weight:bold;">运动技能</div>
      <div style="margin-top:20px;">运动技能模块共10个学分，需在高中三年的六个学期中完成。</div>
      <div>运动技能成绩 = 各考核项目成绩相加（单个考核项目成绩 = 考核项目得分 * 占比）。</div>
      <div style="margin-top:40px;">
        <div style="font-weight:bold;">运动技能考核评价结构：</div>
        <Table :columns="columns1" :data="data1" border style="margin-top:20px;"></Table>
      </div>
      <div style="margin-top:40px;">
        <div style="font-weight:bold;">学习态度：</div>
        <div style="margin-top:20px;">学习态度成绩按照100分计算考核；评分采用扣分制，根据每项所扣分数和扣分次数，计算最后成绩；缺席课堂教学次数占实际总授课课时数三分之一及以上（含旷课、病假、事假），学习态度成绩直接记为0。</div>
        <Table :columns="columns2" :data="data2" border style="margin-top:20px;"></Table>
      </div>
      <div style="margin-top:40px;">
        <div style="font-weight:bold;">课外锻炼：</div>
        <div style="margin-top:20px;">每周一次20分，每周2次40分，每周3次60分，每周4次80分，每周5次及以上100分（每次不低于1小时）。</div>
      </div>
    </Card>
    <Card style="margin-top:20px;">
      <div style="font-weight:bold;" class="health-knowledge">健康知识</div>
        <div style="margin-top:20px;">健康知识共1个学分，需高一、高二上下学期以及高三上学期，共5个学期完成。</div>
        <div>健康知识的成绩累计取平均计算：学年成绩 = （上学期成绩 + 下学期成绩） / 2 ； 最终成绩 = （高一第一学期成绩 + 高一第二学期成绩 + 高二第一学期成绩 + 高二第二学期成绩 + 高三第一学期成绩）/ 5。</div>
    </Card>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
     total: ['∑ ≧ 90', '80 ≦  ∑﹤ 90', '70  ≦ ∑﹤80', '60 ≦ ∑﹤70', '∑﹤60'],
     level: ['A', 'B', 'C', 'D', 'E'],
     score: [5, 4, 3, 2, 1],
     academicLevel: ['优秀', '良好', '中', '及格', '不及格'], // 学业水平
     moduleTotalIntegral: ['∑ ≧ 60', '48 ≦ ∑﹤60', '36 ≦ ∑﹤48', '24 ≦ ∑﹤36', '∑﹤24'], // 各模块总积分
     lastLevel: ['A', 'B', 'C', 'D', 'E'], // 最终等第
     data1: [
      {content: '定量考核', proportion: '30%', score: 30},
      {content: '定性考核', proportion: '50%', score: 50},
      {content: '学习态度', proportion: '10%', score: 10},
      {content: '课外锻炼', proportion: '10%', score: 10},
      {content: '合计', proportion: '100%', score: 100},
     ],
     columns1: [
      {title: '评价考核内容', key: 'content', align: 'center',minWidth:100},
      {title: '占比', key: 'proportion', align: 'center',minWidth:100},
      {title: '分数', key: 'score', align: 'center',minWidth:100}
     ],
     data2: [
      {
        largeClassPerformance: ['违反纪律  2分', '缺席  2分'],
        classPerformance: [
          '旷课单次扣分  6分',
          '迟到单次扣分  1分',
          '早退单次扣分  1分',
          '违反纪律单次扣分  1分',
          '运动着装不符单次扣分  2分',
          '病假单次扣分  0分',
          '事假单次扣分  0分'
        ]
      },
     ],
     columns2: [
      {title: '大课间表现（扣分制）', key: 'largeClassPerformance', align: 'center',   width:400, render: (h, params) => {
        let list = params.row.largeClassPerformance || []
        return h('div', [
          h('ul',
            {
              style: {
                width:'400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            },
            list.map((item, index) => {
              if (index != 1) {
                return h('li', {
                  style: {
                    width:'200px',
                    listStyle:'none',
                    height:'45px',
                    lineHeight:'45px',
                    borderRight:'1px solid #e8eaec'
                  }
                }, item)
              } else {
                return h('li', {
                  style: {
                    width:'200px',
                    listStyle:'none',
                    height:'45px',
                    lineHeight:'45px',
                  }
                }, item)
              }
          }))
        ])
      }},
      {title: '课堂表现（扣分制）', key: 'classPerformance', align: 'center', render: (h, params) => {
        let list = params.row.classPerformance || []
        return h('div', [
          h('ul',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            },
            list.map((item, index) => {
              if (index != 6) {
                return h('li', {
                  style: {
                    width:'100%',
                    listStyle:'none',
                    height:'45px',
                    lineHeight:'45px',
                    borderRight:'1px solid #e8eaec'
                  }
                }, item)
              } else {
                return h('li', {
                  style: {
                    width:'100%',
                    listStyle:'none',
                    height:'45px',
                    lineHeight:'45px',
                  }
                }, item)
              }
          }))
        ])
      }},
     ]
    };
  },
  computed: {},
  created() {},
  mounted() {
    let myDom = document.querySelector('.single-page')
    console.log('myDom', myDom)
    myDom.addEventListener('scroll', this.innerHeight)
  },
  watch: {},
  methods: {
    innerHeight () {
      console.log('2222')
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.border-bottom{
  border-bottom:1px solid  rgba(191, 201, 206, 1);
}
.ivu-table td.no-border{
  border-right:none !important;
}
.appraisal-description-page{
  .header_title{
    font-size:22px;
    font-family:PingFang SC;
    font-weight:bold;
    color:#333333;
  }
  .table-1{
    margin-top:20px;
    .table-item{
      display:flex;
      div{
        width:296px;
        height:45px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(191, 201, 206, 1);
        border-right:none;
        border-bottom:none;
        line-height:45px;
        text-align:center;
        &:nth-of-type(1){
          background:#F0F0F0;
        }
        &:last-of-type{
          border-right:1px solid rgba(191, 201, 206, 1);
          
        }
      }
    }
  }
}
</style>
