<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">中考成绩评价标准</h2>
    </div>
       <div v-if="schoolType == '3'" style="font-size:13px !important">
          <Card style="margin-bottom:20px;" >
            <div style="margin-bottom:10px;color:#333333;" >
              <div style="font-size:18px;">云南省初中学生体育安排表</div>
            </div>
            <div style="margin-bottom:20px;color:#2E2E2E;" >
              <div style="">七年级，满分<span style="color:#00C693;font-weight:bold">&nbsp;20&nbsp;</span>分</div>
            </div>
            <div style="width:80%;text-align:center;line-height:45px;border:1px solid #BFC9CE;border-radius:5px 5px 0px 0px;" >
              <div style='height:45px;background:rgba(240,240,240,1);' >
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;" >测试时间</div>
                <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;" >考试类别</div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >测试项目</div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >分值</div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >考试方式</div>
                <div style="width:32.5%;float:left;" >备注</div>
              </div>
              <div style='height:225px;border-top:1px solid #BFC9CE;'>
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:225px;" >上学期(6分)</div>
                <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;line-height:225px;" >必考</div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">50米跑</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1分钟跳绳</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1000米跑（男）/800米跑（女）</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">体重指数（BMI）</div>
                  <div>肺活量体重指数</div>
                </div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">3.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">0</div>
                  <div>0</div>
                </div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div>统一测试</div>
                </div>
                <div style="width:32.5%;float:left;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:135px;"></div>
                  <div style="line-height:90px;text-align:left;padding-left:10px;">七年级测试数据为基础数据，不计分。</div>
                </div>
              </div>
              <div style='height:247px;border-top:1px solid #BFC9CE;'>
                 <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:245px;" >下学期(14分)</div>
                 <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;" >
                    <div style="border-bottom:1px solid #BFC9CE;line-height:64px;">选考</div>
                    <div style="border-bottom:1px solid #BFC9CE;line-height:134px;">必考</div>
                    <div>选考</div>
                </div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:65px;line-height:20px;text-align:left;padding-left:10px;">
                      引体向上（男）/1分钟仰卧起坐（女）；坐位体前屈；200米游泳；立定跳远；投掷实心球；100米跑。
                  </div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">15 米×4 往返跑</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1 分钟跳绳</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1000 米跑（男）/800 米跑（女） </div>
                  <div style="height:45px;line-height:22px;text-align:left;padding-left:10px;">足球、篮球、排球、乒乓球、羽毛球、网球、武术、体操。</div>
                </div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:64px;">4.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">3.0</div>
                  <div>4.0</div>
                </div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:64px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div>预约测试</div>
                </div>
                <div style="width:32.5%;float:left;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:65px;line-height:30px;text-align:left;padding-left:10px;">6 项选 2 项，每项 2 分。<br/>200 米游泳由各学校统一测试。</div>
                  <div style="border-bottom:1px solid #BFC9CE;height:135px;"></div>
                  <div style="height:40px;line-height:20px;text-align:left;padding-left:10px;">8 项选 2 项，其中：足球、篮球、排球至少选 1 项，每项 2 分。</div>
                </div>
              </div>
              <div style='height:60px;border-top:1px solid #BFC9CE;display:flex;'>
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:60px;">竞赛加分</div>
                <div style="width:55%;float:left;border-right:1px solid #BFC9CE;height:60px;text-align:left;line-height:30px;padding-left:10px;" >根据学生在七年级阶段参加校级、县级、州市级、省级和国家级体育竞赛，根据获得的名次折算得分，计入七年级成绩。</div>
                <div style="width:30%;float:left;line-height:30px;text-align:left;padding-left:10px;" >具体折算标准详见《云南省初中学生体育竞赛成绩折算体育考分管理办法》。</div>
              </div>
            </div>
          </Card>
          <Card style="margin-bottom:20px;" >
            <div style="margin-bottom:20px;color:#2E2E2E;" >
              <div style="height:20px;">八年级，满分<span style="color:#00C693;font-weight:bold">&nbsp;40&nbsp;</span>分</div>
            </div>
            <div style="width:80%;text-align:center;line-height:45px;border:1px solid #BFC9CE;border-radius:5px 5px 0px 0px;" >
              <div style='height:45px;background:rgba(240,240,240,1);' >
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;" >测试时间</div>
                <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;" >考试类别</div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >测试项目</div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >分值</div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >考试方式</div>
                <div style="width:32.5%;float:left;" >备注</div>
              </div>
              <div style='height:200px;border-top:1px solid #BFC9CE;'>
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:200px;" >上学期（18 分）</div>
                <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;line-height:200px;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:134px;">必考</div>
                  <div style="line-height:65px;">选考</div>
                </div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">50 米跑</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1 分钟跳绳</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1000 米跑（男）/800 米跑（女）</div>
                  <div style="line-height:20px;height:65px;padding-left:10px;padding-left:10px;">引体向上（男）/1 分钟仰卧起坐（女）；坐位体前屈；200 米游泳；立定跳远；投掷实心球；100 米跑。</div>
                </div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">2.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">2.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">6.0</div>
                  <div style="line-height:65px;">8.0</div>
                </div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="line-height:65px;">预约测试</div>
                </div>
                <div style="width:32.5%;float:left;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:135px;"></div>
                  <div style="line-height:30px;text-align:left;padding-left:10px;padding-left:10px;">6 项选 2 项，每项 4 分。<br/>200 米游泳由各学校统一测试</div>
                </div>
              </div>
              <div style='height:271px;border-top:1px solid #BFC9CE;'>
                 <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:270px;" >下学期（22 分）</div>
                 <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;" >
                    <div style="border-bottom:1px solid #BFC9CE;line-height:224px;">必考</div>
                    <div>选考</div>
                </div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">15 米×4 往返跑</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1 分钟跳绳</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1000 米跑（男）/800 米跑（女）</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">体重指数（BMI） </div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">肺活量体重指数 </div>
                  <div style="height:45px;line-height:22px;text-align:left;padding-left:10px;padding-left:10px;">足球、篮球、排球、乒乓球、羽毛球、网球、武术、体操。</div>
                </div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">3.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">2.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">6.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div>8.0</div>
                </div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div>预约测试</div>
                </div>
                <div style="width:32.5%;float:left;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:225px;"></div>
                  <div style="height:40px;line-height:20px;text-align:left;padding-left:10px;">8 项选 2 项，其中足球、篮球、排球至少选 1 项，每项 4 分。</div>
                </div>
              </div>
              <div style='height:60px;border-top:1px solid #BFC9CE;display:flex;'>
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:60px;">竞赛加分</div>
                <div style="width:55%;float:left;border-right:1px solid #BFC9CE;height:60px;text-align:left;line-height:30px;padding-left:10px;" >根据学生在八年级阶段参加校级、县级、州市级、省级和国家级体育竞赛，根据获得的名次折算得分，计入八年级成绩。</div>
                <div style="width:30%;float:left;line-height:30px;text-align:left;padding-left:10px;" >具体折算标准详见《云南省初中学生体育竞赛成绩折算体育考分管理办法》。</div>
              </div>
            </div>
          </Card>
          <Card style="margin-bottom:20px;" >
            <div style="margin-bottom:20px;color:#2E2E2E;" >
              <div style="height:20px;">九年级，满分<span style="color:#00C693;font-weight:bold">&nbsp;40&nbsp;</span>分</div>
            </div>
            <div style="width:80%;text-align:center;line-height:45px;border:1px solid #BFC9CE;border-radius:5px 5px 0px 0px;" >
              <div style='height:45px;background:rgba(240,240,240,1);' >
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;" >测试时间</div>
                <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;" >考试类别</div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >测试项目</div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >分值</div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >考试方式</div>
                <div style="width:32.5%;float:left;" >备注</div>
              </div>
              <div style='height:200px;border-top:1px solid #BFC9CE;'>
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:200px;" >上学期（18 分）</div>
                <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;line-height:200px;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:134px;">必考</div>
                  <div style="line-height:65px;">选考</div>
                </div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">50 米跑</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1 分钟跳绳</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1000 米跑（男）/800 米跑（女）</div>
                  <div style="line-height:20px;height:65px;padding-left:10px;">引体向上（男）/1 分钟仰卧起坐（女）；坐位体前屈；200 米游泳；立定跳远；投掷实心球；100 米跑。</div>
                </div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">2.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">2.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">6.0</div>
                  <div style="line-height:65px;">8.0</div>
                </div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="line-height:65px;">预约测试</div>
                </div>
                <div style="width:32.5%;float:left;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:135px;"></div>
                  <div style="line-height:30px;text-align:left;padding-left:10px;">6 项选 2 项，每项 4 分。<br/>200 米游泳由各学校统一测试</div>
                </div>
              </div>
              <div style='height:271px;border-top:1px solid #BFC9CE;'>
                 <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:270px;" >下学期（22 分）</div>
                 <div style="width:7.5%;float:left;border-right:1px solid #BFC9CE;" >
                    <div style="border-bottom:1px solid #BFC9CE;line-height:224px;">必考</div>
                    <div>选考</div>
                </div>
                <div style="width:27.5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">15 米×4 往返跑</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1 分钟跳绳</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1000 米跑（男）/800 米跑（女）</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">体重指数（BMI） </div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">肺活量体重指数 </div>
                  <div style="height:45px;line-height:22px;text-align:left;padding-left:10px;">足球、篮球、排球、乒乓球、羽毛球、网球、武术、体操。</div>
                </div>
                <div style="width:5%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">3.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">2.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">6.0</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">1.5</div>
                  <div>8.0</div>
                </div>
                <div style="width:15%;float:left;border-right:1px solid #BFC9CE;" >
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">预约测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div style="border-bottom:1px solid #BFC9CE;line-height:44px;">统一测试</div>
                  <div>预约测试</div>
                </div>
                <div style="width:32.5%;float:left;" >
                  <div style="border-bottom:1px solid #BFC9CE;height:225px;"></div>
                  <div style="height:40px;line-height:20px;text-align:left;padding-left:10px;">8 项选 2 项，其中足球、篮球、排球至少选 1 项，每项 4 分。</div>
                </div>
              </div>
              <div style='height:60px;border-top:1px solid #BFC9CE;display:flex;'>
                <div style="width:12.5%;float:left;border-right:1px solid #BFC9CE;line-height:60px;">竞赛加分</div>
                <div style="width:55%;float:left;border-right:1px solid #BFC9CE;height:60px;text-align:left;line-height:30px;padding-left:10px;" >根据学生在九年级阶段参加校级、县级、州市级、省级和国家级体育竞赛，根据获得的名次折算得分，计入九年级成绩。</div>
                <div style="width:30%;float:left;line-height:30px;text-align:left;padding-left:10px;" >具体折算标准详见《云南省初中学生体育竞赛成绩折算体育考分管理办法》。</div>
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
