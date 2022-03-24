<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体育素质综合评价考核配置</h2>
    </div>
       <div v-if="schoolType == '3'">
        <Card style="margin-bottom:20px;" >
          <div style="margin-top:12px;margin-left:20px;margin-bottom:5px;color:#2E2E2E;font-size:15px;" >
            包括《体育与健康》学科评价考核和《国家学生体质健康标准》测试两个部分。<br/><br/>
              <div style="margin-bottom:10px;height:20px;">《国家学生体质健康标准》测试</div>
              1.《国家学生体质健康标准》测试为第一学期固定考核项目；<br/>
              2.《国家学生体质健康标准》测试分值4分,其中七年级1分,八年级1分,九年级2分学校上报教育部学生体质健康网的<br/>
              学生学年总得分按等级(90.0分及以上为优秀,80.0—89.9分为良好,60.0-79.9分为及格,59.9分及以下为不及格)计为学年《国家学生体质健康标准》测试成绩<br/>
              (七、八年级优秀1分,良好0.75分,及格0.5分,不及格0.25分;九年级优秀2分,良好1.5分,及格1分,不及格0.5分)
          </div>
          </Card>

          <Card style="margin-bottom:20px;" >
            <div style="margin-top:12px;margin-left:20px;margin-bottom:20px;color:#2E2E2E;font-size:15px;" >
              <div style="margin-bottom:10px;height:20px;">《体育与健康》学科评价考核</div>
              1.体育与健康学科评价考核成绩按照百分制计算，单个结构按照百分制计算；<br/>
              学期成绩=学期考核项目分数相加（单个考核项目分数=”考核项目得分*占比“）<br/>
              学年成绩=两个学期成绩的平均分<br/>
              2.《体育与健康》学科评价考核分值6分,其中七年级2分,八年级2分,九年级2分。学生每学年两学期学科考试的平均分按等级<br/>
              (90.0分及以上为优秀,80.0—89.9分为良好,60.0—79.9分为及格,59.9分及以下为不及格)计为学年学科评价考核成绩<br/>
              (优秀2分,良好1.5分,及格1分,不及格0.5分)<br/>
              3.体育与健康学科评价考核结构如下：
            </div>
            <div style="width:80%;margin-left:20px;text-align:center;line-height:45px;border:1px solid #BFC9CE;border-radius:5px 5px 0px 0px;" >
              <div style='height:45px;background:rgba(240,240,240,1);' >
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >评价考核内容</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >占比</div>
                <div style="width:33%;float:left;" >分数</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >学习态度</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >10%</div>
                <div style="width:33%;float:left;" >10</div>
              </div>
              <div  style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >健康教育知识</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >10%</div>
                <div style="width:33%;float:left;" >10</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >运动技能</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >40%</div>
                <div style="width:33%;float:left;" >40</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >体能</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >30%</div>
                <div style="width:33%;float:left;" >30</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >体育课后作业</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >10%</div>
                <div style="width:33%;float:left;" >10</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >合计</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >100%</div>
                <div style="width:33%;float:left;" >100</div>
              </div>
            </div>
          </Card>
      </div>
     <div v-if="schoolType == '2'">
        <Card style="margin-bottom:20px;" >
          <div style="margin-top:12px;margin-left:20px;margin-bottom:5px;color:#2E2E2E;font-size:15px;" >
            包括《体育与健康》学科评价考核和《国家学生体质健康标准》测试两个部分。<br/><br/>
            《国家学生体质健康标准》测试<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;1、《国家学生体质健康标准》测试为每学年第一学期固定测试项目；<br/><br/>
          </div>
          </Card>

          <Card style="margin-bottom:20px;" >
            <div style="margin-top:12px;margin-left:20px;margin-bottom:20px;color:#2E2E2E;font-size:15px;" >
                            <div style="margin-bottom:10px;height:100px;">
              《体育与健康》学科评价考核<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;1、体育与健康学科评价考核成绩按照百分制计算，单个结构按照百分制计算；<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;2、学期成绩=学期考核项目分数相加（单个考核项目分数=”考核项目得分*占比“）<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学年成绩=两个学期成绩的平均分<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;3、体育与健康学科评价考核结构如下：<br/>
              </div>

            </div>
            <div style="width:80%;margin-left:20px;text-align:center;line-height:45px;border:1px solid #BFC9CE;border-radius:5px 5px 0px 0px;" >
              <div style='height:45px;background:rgba(240,240,240,1);' >
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >评价考核内容</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >占比</div>
                <div style="width:33%;float:left;" >分数</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >学习态度</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >10%</div>
                <div style="width:33%;float:left;" >10</div>
              </div>
              <div  style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >健康教育知识</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >10%</div>
                <div style="width:33%;float:left;" >10</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >运动技能</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >30%</div>
                <div style="width:33%;float:left;" >30</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >体能</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >40%</div>
                <div style="width:33%;float:left;" >40</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >体育课后作业</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >10%</div>
                <div style="width:33%;float:left;" >10</div>
              </div>
              <div style='height:45px;border-top:1px solid #BFC9CE;'>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >合计</div>
                <div style="width:33%;float:left;border-right:1px solid #BFC9CE;" >100%</div>
                <div style="width:33%;float:left;" >100</div>
              </div>
            </div>
          </Card>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      gradeStandardList:[
      ],
      schoolType:'',
    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  created: function() {

  },
  methods: {
  },
  mounted() {
    this.schoolType = sessionStorage.getItem('schoolType');
  },
};
</script>
