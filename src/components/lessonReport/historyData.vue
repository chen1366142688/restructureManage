<template>
  <div class="current-semster">
    <div class="kong"></div>
    <!------ 学校基本情况 ------>
    <Card>
      <div>
        <h2 style="font-size:20px;margin-top:16px;">学校基本情况</h2>
        <Table border :columns="columns1" :data="schoolType === '2' ? data1Small : data1Middle" style="margin-top:16px;"></Table>
      </div>
    </Card>
    <div class="kong"></div>
    <!------ 体质健康 ------>
    <Card>
      <div>
        <h2 style="font-size:20px;">体质健康</h2>
        <div class="data-title" style="margin-top:16px;"><i class="title-icon"></i>各年级学年数据对比</div>
        <Table border :columns="columns2" :data="schoolType === '2' ? data2Small : data2Middal" style="margin-top:16px;"></Table>
        <!-- 数据统计 -->
        <Row style="margin-top:16px;" :gutter="20">
          <!-- 学年平均分对比 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>学年平均分对比</div>
              <div
                id="myChart1"
                :style="{width: '100%', height: '340px',display: 'inline-block',marginTop:'30px'}"
              ></div>
            </div>
          </Col>
          <!-- 平均分走势 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>平均分走势</div>
              <div
                id="myChart2"
                :style="{width: '100%', height: '340px',display: 'inline-block',marginTop:'30px'}"
              ></div>
            </div>
          </Col>
          <!-- 合格率/优良率走势 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>合格率/优良率走势</div>
              <div id="myChart3" :style="{width:'100%', height: '340px',display: 'inline-block',marginTop:'30px'}"></div>
            </div>
          </Col>
        </Row>
        <Row :gutter="20" style="margin-top:16px;">
          <!-- 各项目平均分 -->
          <Col span="16">
            <div style="width:100%;height:480px;">
              <div class="data-title2"><i class="title-icon"></i>各项目平均分</div>
              <div id="myChart4" :style="{width:'100%', height: '400px',display: 'inline-block',marginTop:'30px'}"></div>
            </div>
          </Col>
          <!-- 成绩上升项目 -->
          <Col span="8">
            <div style="width:100%;height:480px;">
              <div class="data-title3"><i class="title-icon"></i>成绩上升项目</div>
              <div class="best-result-table">
                <div class="item">
                  <p style="font-weight:bold;">项目</p>
                  <p v-for="(item, index) in (schoolType === '2' ? bestResultProjectSmall : bestResultProjectMiddle)" :key="index + 'a'">{{item}}</p>
                </div>
                <div class="item">
                  <p style="font-weight:bold;">平均成绩</p>
                  <p v-for="(item, index) in (schoolType === '2' ? averageResultSmall : averageResultMiddle)" :key="index + 'b'">{{item}}</p>
                </div>
                <div class="item">
                  <p style="font-weight:bold;">平均得分</p>
                  <p v-for="(item, index) in (schoolType === '2' ? averageScoreSmall : averageScoreMiddle)" :key="index + 'c'">
                    <span>{{item[0]}}</span>
                    <Icon type="md-arrow-up" style="font-size:16px;color:red;"/>
                    <span style="color:red;">{{item[1]}}</span>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <!-- 体质健康总结报告 -->
      <div style="margin-top:16px;">
        <div class="data-title"><i class="title-icon"></i>体质健康总结报告</div>
        <div class="summary">
          {{schoolType === '2' ? tzcsReportSmall : tzcsReportMiddle}}
        </div>
      </div>
    </Card>
    
    <div class="kong"></div>
    <!------ 运动技能/体能 ------>
    <Card>
      <h2 style="font-size:20px;margin-top:16px;">运动技能/体能</h2>
      <div class="data-title" style="margin-top:30px;"><i class="title-icon"></i>各年级学期数据对比</div>
      <!-- 注意：和各年级学年数据对比表格共用columns -->
      <Table border :data="schoolType === '2' ? data3Small : data3Middle" :columns="columns3" style="margin-top:30px;"></Table>
      <div style="height:30px;"></div>
      <!-- 数据统计 -->
      <div style="height:30px;"></div>
      <Row style="margin-top:40px;" :gutter="20">
        <!-- 学期平均分对比 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>学期平均分对比</div>
            <div style="height:30px;"></div>
            <div
              id="myChart5"
              :style="{width: '100%', height: '350px',display: 'inline-block',marginTop:'30px'}"
            ></div>
          </div>
        </Col>
        <!-- 合格率/优良率走势 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>合格率/优良率走势</div>
            <div style="height:30px;"></div>
            <div id="myChart6" :style="{width:'100%', height: '350px',display: 'inline-block',marginTop:'30px'}"></div>
          </div>
        </Col>
        <!-- 学期项目类型分布 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>学期项目类型分布</div>
            <div style="height:30px;"></div>
            <div id="myChart7" :style="{width:'100%', height: '350px',display: 'inline-block',marginTop:'30px'}"></div>
          </div>
        </Col>
      </Row>
      <!-- 运动技能/体能总结报告 -->
      <div style="margin-top:30px;">
        <div class="data-title"><i class="title-icon"></i>运动技能/体能总结报告</div>
        <div class="summary">
          {{schoolType === '2' ? ydjnReportSmall : ydjnReportMiddle}}
        </div>
      </div>
    </Card>
    <div class="kong"></div>
    <!------ 健康知识 ------>
    <Card>
      <h2 style="font-size:20px;margin-top:16px;">健康知识</h2>
        <!-- 各年级健康知识对比 -->
        <div class="data-title" style="margin-top:30px;"><i class="title-icon"></i>各年级学期数据对比</div>
        <Table border :data="schoolType === '2' ? data4Small : data4Middle" :columns="columns3" style="margin-top:30px;"></Table>
        <Row :gutter="20" style="margin-top:30px;">
          <!-- 学期平均分对比 -->
          <Col span="16">
            <div class="data-title"><i class="title-icon"></i>学期平均分对比</div>
            <div style="display:flex;align-items:center;">
              <div id="myChart8" :style="{width:'70%', height: '350px',display: 'inline-block',marginTop:'20px'}"></div>
              <div class="healthy-knowledge-score">
                <div style="height:30%">
                  <p>2019学年第二学期平均得分：</p>
                  <p style="text-align:center;">
                    <span>{{schoolType === '2' ? 84.33 : 93.5}}</span>
                    <Icon type="md-arrow-up" style="color:red;font-size:18px;"/>
                    <span style="color:red;">{{schoolType === '2' ? '1.13' : '0.9'}}</span>
                  </p>
                </div>
                <div style="height:30%">
                  <p>2019学年第一学期平均得分：</p>
                  <p style="text-align:center;">{{schoolType === '2' ? '83.20' : '92.6'}}</p>
                </div>
              </div>
            </div>
          </Col>
          <!-- 合格率/优良率走势 -->
          <Col span="8">
            <div class="data-title3"><i class="title-icon"></i>合格率/优良率走势</div>
            <div id="myChart9" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
          </Col>
        </Row>
        <!-- 健康知识总结报告 -->
        <div style="margin-top:30px;">
          <div class="data-title"><i class="title-icon"></i>健康知识总结报告</div>
          <div class="summary">
            {{schoolType === '2' ? jkzsReportSmall : jkzsReportMiddle}}
          </div>
        </div>
    </Card>
    <div class="kong"></div>
    <!------ 学习态度 ------>
    <Card>
      <h2 style="font-size:20px;margin-top:16px;">学习态度</h2>
        <Row :gutter="20" style="margin-top:30px;">
          <!-- 平均分 -->
          <Col span="24">
            <div class="data-title"><i class="title-icon"></i>扣分项目学期对比</div>
          <div style="height:50px;" v-if="schoolType === '2'"></div>
            <div style="display:flex;align-items:center;">
              <div id="myChart10" :style="{width:'70%', height: '350px',display: 'inline-block',marginTop:'40px'}"></div>
              <div class="healthy-knowledge-score">
                <div style="height:30%">
                  <p>2019学年第二学期平均得分：</p>
                  <p style="text-align:center;">
                    <span>{{schoolType === '2' ? 97.64 : 99.98}}</span>
                    <Icon type="md-arrow-up" style="color:red;font-size:18px;"/>
                    <!-- <Icon type="md-arrow-down" style="color:green;font-size:18px;" v-else/>  v-if="schoolType === '2'-->
                    <span style="color:red;" v-if="schoolType === '2'">0.77</span>
                    <span style="color:red" v-else>0.05</span>
                  </p>
                </div>
                <div style="height:30%">
                  <p>2019学年第一学期平均得分：</p>
                  <p style="text-align:center;">{{schoolType === '2' ? '96.87' : '99.93'}}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <!-- 学习态度总结报告 -->
        <div style="margin-top:30px;">
          <div class="data-title"><i class="title-icon"></i>学习态度总结报告</div>
          <div class="summary">
            {{schoolType === '2' ? xxtdReportSmall : xxtdReportMiddle}}
          </div>
        </div>
    </Card>
    <div class="kong"></div>
    <!------ 课后作业 ------>
    <Card>
      <h2 style="font-size:20px;margin-top:16px;">课后作业</h2>
      <div class="data-title" style="margin-top:30px;"><i class="title-icon"></i>各年级学期数据对比</div>
      <Table border :data="schoolType === '2' ? data5SmallSchool : data5MiddleSchool" :columns="columns5" style="margin-top:30px;"></Table>
      <Row :gutter="20" style="margin-top:40px;">
        <!-- 学期平均分对比 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>学期平均分对比</div>
            <div
              id="myChart12"
              :style="{width: '100%', height: '350px',display: 'inline-block'}"
            ></div>
          </div>
        </Col>
        <!-- 平均分走势 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>平均分走势</div>
            <div id="myChart13" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
          </div>
        </Col>
        <!-- 学期锻炼类型分布 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>学期锻炼类型分布</div>
            <div id="myChart14" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
          </div>
        </Col>
      </Row>
      <!-- 课后作业总结报告 -->
      <div style="margin-top:30px;">
        <div class="data-title"><i class="title-icon"></i>课后作业总结报告</div>
        <div class="summary">
          {{schoolType === '2' ? khzyReportSmall : khzyReportMiddle}}
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      schoolType: sessionStorage.getItem('schoolType'),
      tzcsReportSmall: '2019学年体测完成后，与2018学年体测成绩形成对比，从各年级的平均分，合格率和优良率看，整体体质健康水平有所提高，其中体质健康平均分由76.4上升至86.05，合格率不变，均为98%，优良率由61%上升至73%；体测项目中，共有6个计算成绩的项目，其中五个项目的平均成绩提高，肺活量平均分由78到82，增长4分，50米跑由81分到92分，增长11分，一分钟跳绳由78到84，增长6分，一分钟仰卧起坐由79到82，增长3分，50米x8往返跑由79到80，增长1分。',
      tzcsReportMiddle: '2019年同比2018年体质健康测试数据，整体水平有所提升，其中体质健康平均得分由75分提升至76分，两学期的合格率基本持平，优良率由34%提升至38%；2019年体质测试达到优秀等级的人数有39人，优秀率为4%，同比2018年，增长3%；达到良好等级的人数有295人，良好率为30%，同比2018年，增长1%；达到及格等级的人数有531人，及格率为54%，同比2018年，降低3%；达到优秀和良好等级的人数有334人，优良率为38%，同比增长4%；达到合格等级的人数有865人，合格率为92%，与2018年呈持平状态；在各个体测项目中，有5个项目的平均成绩得到了较大的提升，其中肺活量平均分由69分提升至70分，增长1分，一分钟仰卧起坐由77分提升至80分，增长3分，引体向上由30分提升至31分，增长1分，1000米跑由66分提升至71分，增长5分，800米跑由77分提升至80分，增长3分。',
      ydjnReportSmall:'2019学年运动技能/体能考核完成后，上下学期数据形成对比，各年级的合格率第一学期和第二学期相比，基本为增长趋势，学校合格率持平稳，优良率持降低走势；第二学期的合格率，除四年级和六年级外，其他年级合格率增长至100%；技能项目方面，第一学期的田径类和新兴体育类项目成绩较优，第二学期球类和体操类项目成绩较优。',
      ydjnReportMiddle:'2019年第一学期和第二学期运动技能/体能共1个年级（七年级），8个班，384人参与考核，其中第二学期同比2019年第一学期技能/体能数据，整体水平有所提升，其中运动技能平均分由84.7分提升至92分，合格率和优良率基本持平；体能平均分由77.1分提升至85.5分，合格率和优良率基本持平；2019年第二学期运动技能/体能达到合格等级的人数有384人，合格率为100%，与第一学期持平；达到优良等级的人数有227人，优良率为59%，与第一学期基本持平；在技能项目中，第一学期的优势项目为田径类和新兴体育类，第二学期的优势项目为球类和体操类。',
      jkzsReportSmall: '2019学年健康知识考核完成后，上下学期数据形成对比，除四年级和六年级外，其他年级的合格率，优良率均持增长趋势，且第二学期中健康知识各年级的合格率均达到80%以上，六年级的合格率达到90%以上；学校平均分由第一学期的83.2增长至84.33，平均分上升1.13分，合格率由第一学期的88.35%增长至89%，优良率由第一学期的65.91%增长至76%。',
      jkzsReportMiddle: '2019年第二学期和2019年第一学期，共1个年级（七年级），8个班级，384人完成考核；2019年第二学期同比2019年第一学期整体水平有所提高，学校平均分由第一学期的92.6分提升至93.5分，平均分提升0.9分，第一学期和第二学期达到合格等级的人数基本相同，合格率呈持平状态，达到优秀和良好等级的人数基本相同，优良率呈持平状态。',
      xxtdReportSmall: '2019学年学习态度考核完成后，上下学期的平均分形成对比，第二学期的平均分为97.64，相比第一学期的96.87，增长0.77分；两学期的扣分项目对比上，第一学期的各项目扣分数均大于第二学期的扣分数，其中相差较大的为违反纪律，第一学期扣分11次，第二学期仅扣分4次；随着体育课程的开展，课堂纪律由老师的约束性逐渐转向学生的自觉性。',
      xxtdReportMiddle: '2019年第二学期同比2019年第一学期，整体水平有所提高，第二学期的平均分为99.98分，相比第一学期，提升0.05分；两学期的扣分数据相比，第一学期扣分项集中在违反纪律和病假，其中违反纪律扣分21次，病假扣分30次；旷课，早退，大课间缺席和大课间违反纪律表现较好，无被扣分学生；第二学期扣分项集中在病假和事假，其中病假47次，事假7次；旷课，早退和运动着装不符表现较好，无被扣分学生。',
      khzyReportSmall: '2019学年课后作业考核完成后，各年级课后作业平均得分均有所降低，第一学期中，除一年级平均分为89.1，其他年级的课后作业均达到100分，第二学期课后作业中，四年级平均分为57.14，未达到合格水平；两学期比较中，男生平均分由第一学期的98.42降低为95.94，女生的平均分由第一学期的97.91降低为95.93。',
      khzyReportMiddle: '2019年第二学期和2019年第一学期中，仅七年级，8个班，384人参与课后作业考核；2019年第二学期同比2019年第一学期，整体水平持平，七年级的第二学期平均成绩为99.9分，与第一学期基本持平，第二学期男生平均每天锻炼时长为22.65分钟，与第一学期相比，增长1.54分钟；第二学期女生平均每天锻炼时长为22.66分钟，与第一学期相比，增长1.33分钟。',
      columns1: [
        // 学校基本情况
        { title: "学期", key: "yearSemester", align: "center" },
        { title: "教师人数", key: "teacherCount", align: "center" },
        { title: "学生人数", key: "studentCount", align: "center" },
        { title: "体质健康平均分", key: "tzjkScore", align: "center" },
        { title: "学期学科评价平均分", key: "xnxkpjpjf", align: "center" },
        { title: "学期体育素质综合评价平均成绩", key: "xntyszResult", align: "center" },
        {title: "体育素质综合评价在本区内的排名",key: "areaRanking",align: "center", render: (h, params) => {
          let data = params.row.areaRanking
          if (params.index === 1&&params.row.status == 1) {
            return h('div',
              {
                style: {display:'flex', justifyContent:'center',alignItems:'center'}
              },
              data
            )
          } else {
            return h('div',
              {
                style: {display:'flex', justifyContent:'center',alignItems:'center'}
              },
              [
                h('div', data[0]),
                h('Icon', {
                  props: {
                    type: 'md-arrow-up'
                  },
                  style: {marginLeft:'8px', color: 'red',fontWeight:'bold'}
                }),
                h('div', {style: {color: 'red'}},data[1])
              ]
            )
          }
        }},
        {title: "体育素质综合评价在本市内的排名",key: "cityRanking",align: "center",render: (h, params) => {
          let data = params.row.cityRanking
          if (params.index === 1&&params.row.status == 1) {
            return h('div',
              {
                style: {display:'flex', justifyContent:'center',alignItems:'center'}
              },
              data
            )
          } else {
            return h('div',
              {
                style: {display:'flex', justifyContent:'center',alignItems:'center'}
              },
              [
                h('div', data[0]),
                h('Icon', {
                  props: {
                    type: 'md-arrow-up'
                  },
                  style: {marginLeft:'8px', color: 'red',fontWeight:'bold'}
                }),
                h('div', {style: {color: 'red'}},data[1])
              ]
            )
          }
        }},
      ],
      data1Small: [
        // 学校基本情况-小学
        {
          yearSemester: "2019学年第二学期",
          teacherCount: 5,
          studentCount: 352,
          tzjkScore: 86.05,
          xnxkpjpjf: "84.27",
          xntyszResult: "85.39",
          areaRanking: [26, 8],
          cityRanking: [329, 37],
          status:1
        },
        {
          yearSemester: "2019学年第一学期",
          teacherCount: 5,
          studentCount: 352,
          tzjkScore: 86.05,
          xnxkpjpjf: "72.1",
          xntyszResult: "74.8",
          areaRanking: [34],
          cityRanking: [366],
          status:1
        }
      ],
      data1Middle: [
        // 学校基本情况-初中
        {
          yearSemester: "2019学年第二学期",
          teacherCount: 8,
          studentCount: 1062,
          tzjkScore: 75.64,
          xnxkpjpjf: "37.23",
          xntyszResult: "56.43",
          areaRanking: [52, 8],
          cityRanking: [518, 37],
          status:2
        },
        {
          yearSemester: "2019学年第一学期",
          teacherCount: 8,
          studentCount: 1062,
          tzjkScore: 75.63,
          xnxkpjpjf: "40.22",
          xntyszResult: "57.92",
          areaRanking: [49, 5],
          cityRanking: [501, 4],
          status:2
        }
      ],
      data2Small: [ // 体质测试 - 各年级学年数据对比 - 小学
        {
          grade: "一年级",
          khrs1: 60,
          khrs2: 59,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 88,
          pfdf2: 82,
          yxl1: '36%',
          yxl2: '32%',
          lhv1:'50%',
          lhv2: '27%',
          jgl1: '11%',
          jgl2: '35%',
          yllv1: '86%',
          yllv2: '59%',
          hglv1: '98%',
          hglv2:'94%'
        },
        {
          grade: "二年级",
          khrs1: 59,
          khrs2: 60,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 90,
          pfdf2: 90,
          yxl1: '45%',
          yxl2: '45%',
          lhv1:'40%',
          lhv2: '41%',
          jgl1: '13%',
          jgl2: '11%',
          yllv1: '86%',
          yllv2: '86%',
          hglv1: '100%',
          hglv2:'98%'
        },
        {
          grade: "三年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 85,
          pfdf2: 92,
          yxl1: '21%',
          yxl2: '50%',
          lhv1:'51%',
          lhv2: '44%',
          jgl1: '26%',
          jgl2: '5%',
          yllv1: '73%',
          yllv2: '94%',
          hglv1: '100%',
          hglv2:'100%'
        },
        {
          grade: "四年级",
          khrs1: 58,
          khrs2: 60,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 81,
          pfdf2: 86,
          yxl1: '6%',
          yxl2: '25%',
          lhv1:'55%',
          lhv2: '53%',
          jgl1: '37%',
          jgl2: '21%',
          yllv1: '62%',
          yllv2: '78%',
          hglv1: '100%',
          hglv2:'100%'
        },
        {
          grade: "五年级",
          khrs1: 60,
          khrs2: 58,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 78,
          pfdf2: 83,
          yxl1: '5%',
          yxl2: '15%',
          lhv1:'38%',
          lhv2: '50%',
          jgl1: '53%',
          jgl2: '34%',
          yllv1: '43%',
          yllv2: '65%',
          hglv1: '96%',
          hglv2:'100%'
        },
        {
          grade: "六年级",
          khrs1: 92,
          khrs2: 60,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 76,
          pfdf2: 81,
          yxl1: '1%',
          yxl2: '13%',
          lhv1:'31%',
          lhv2: '43%',
          jgl1: '64%',
          jgl2: '41%',
          yllv1: '32%',
          yllv2: '56%',
          hglv1: '96%',
          hglv2:'98%'
        },
      ],
      columns2: [ // 体质测试 - 各年级学年数据对比
        { title: "年级", key: "grade", align: "center" },
        { title: "考核人数", align: "center", children: [
          {title: '2018学年', key: 'khrs1', align: 'center'},
          {title: '2019学年', key: 'khrs2', align: 'center'}
        ]},
        { title: "免试人数", align: "center", children: [
          {title: '2018学年', key: 'noTest1', align: 'center'},
          {title: '2019学年', key: 'noTest2', align: 'center'}
        ]},
        { title: "平均得分",align: "center", children: [
          {title: '2018学年', key: 'pfdf1', align: 'center'},
          {title: '2019学年', key: 'pfdf2', align: 'center'}
        ]},
        { title: "优秀率", align: "center",children: [
          {title: '2018学年', key: 'yxl1', align: 'center'},
          {title: '2019学年', key: 'yxl2', align: 'center'}
        ]},
        { title: "良好率", align: "center", children: [
          {title: '2018学年', key: 'lhv1', align: 'center'},
          {title: '2019学年', key: 'lhv2', align: 'center'}
        ]},
        { title: "及格率", align: "center", children: [
          {title: '2018学年', key: 'jgl1', align: 'center'},
          {title: '2019学年', key: 'jgl2', align: 'center'}
        ]},
        { title: "优良率", align: "center",children: [
          {title: '2018学年', key: 'yllv1', align: 'center'},
          {title: '2019学年', key: 'yllv2', align: 'center'}
        ]},
        { title: "合格率",  align: "center",children: [
          {title: '2018学年', key: 'hglv1', align: 'center'},
          {title: '2019学年', key: 'hglv2', align: 'center'}
        ]},
      ],
      columns3: [ // 体质测试 - 各年级学年数据对比
        { title: "年级", key: "grade", align: "center" },
        { title: "考核人数", align: "center", children: [
          {title: '2019学年第一学期', key: 'khrs1', align: 'center'},
          {title: '2019学年第二学期', key: 'khrs2', align: 'center'}
        ]},
        { title: "免试人数", align: "center", children: [
          {title: '2019学年第一学期', key: 'noTest1', align: 'center'},
          {title: '2019学年第二学期', key: 'noTest2', align: 'center'}
        ]},
        { title: "平均得分",align: "center", children: [
          {title: '2019学年第一学期', key: 'pfdf1', align: 'center'},
          {title: '2019学年第二学期', key: 'pfdf2', align: 'center'}
        ]},
        { title: "优秀率", align: "center",children: [
          {title: '2019学年第一学期', key: 'yxl1', align: 'center'},
          {title: '2019学年第二学期', key: 'yxl2', align: 'center'}
        ]},
        { title: "良好率", align: "center", children: [
          {title: '2019学年第一学期', key: 'lhv1', align: 'center'},
          {title: '2019学年第二学期', key: 'lhv2', align: 'center'}
        ]},
        { title: "及格率", align: "center", children: [
          {title: '2019学年第一学期', key: 'jgl1', align: 'center'},
          {title: '2019学年第二学期', key: 'jgl2', align: 'center'}
        ]},
        { title: "优良率", align: "center",children: [
          {title: '2019学年第一学期', key: 'yllv1', align: 'center'},
          {title: '2019学年第二学期', key: 'yllv2', align: 'center'}
        ]},
        { title: "合格率",  align: "center",children: [
          {title: '2019学年第一学期', key: 'hglv1', align: 'center'},
          {title: '2019学年第二学期', key: 'hglv2', align: 'center'}
        ]},
      ],
      data2Middal: [ // 体质测试 - 各年级学年数据对比 - 中学
        {
          grade: "七年级",
          khrs1: 390,
          khrs2: 384,
          noTest1: 0,
          noTest2: 3,
          pfdf1: 73,
          pfdf2: 77.21,
          yxl1: '4%',
          yxl2: '11.02%',
          lhv1:'23%',
          lhv2: '33.55%',
          jgl1: '60%',
          jgl2: '53.02%',
          yllv1: '27%',
          yllv2: '43.57%',
          hglv1: '87%',
          hglv2:'96.59%'
        },
        {
          grade: "八年级",
          khrs1: 288,
          khrs2: 390,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 75,
          pfdf2: 73.95,
          yxl1: '4%',
          yxl2: '5.53%',
          lhv1:'27%',
          lhv2: '24.21%',
          jgl1: '63%',
          jgl2: '58.42%',
          yllv1: '31%',
          yllv2: '29.74%',
          hglv1: '94%',
          hglv2:'88.16%'
        },
        {
          grade: "九年级",
          khrs1: 319,
          khrs2: 288,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 78,
          pfdf2: 77.63,
          yxl1: '6%',
          yxl2: '6.94%',
          lhv1:'41%',
          lhv2: '35.76%',
          jgl1: '50%',
          jgl2: '51.4%',
          yllv1: '47%',
          yllv2: '42.7%',
          hglv1: '97%',
          hglv2:'94.1%'
        },
      ],
      data3Small: [ // 运动技能/体能 - 各年级学期数据对比 - 小学
        {
          grade: "一年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 83.2,
          pfdf2: 81.15,
          yxl1: '10%',
          yxl2: '6%',
          lhv1:'74%',
          lhv2: '81%',
          jgl1: '15%',
          jgl2: '11%',
          yllv1: '85%',
          yllv2: '77%',
          hglv1: '100%',
          hglv2:'100%'
        },
        {
          grade: "二年级",
          khrs1: 60,
          khrs2: 60,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 82.7,
          pfdf2: 80.68,
          yxl1: '16%',
          yxl2: '3%',
          lhv1:'70%',
          lhv2: '86%',
          jgl1: '11%',
          jgl2: '10%',
          yllv1: '86%',
          yllv2: '86%',
          hglv1: '98%',
          hglv2:'100%'
        },
        {
          grade: "三年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 82.62,
          pfdf2: 83.28,
          yxl1: '20%',
          yxl2: '16%',
          lhv1:'62%',
          lhv2: '72%',
          jgl1: '15%',
          jgl2: '10%',
          yllv1: '82%',
          yllv2: '94%',
          hglv1: '98%',
          hglv2:'100%'
        },
        {
          grade: "四年级",
          khrs1: 56,
          khrs2: 56,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 81.38,
          pfdf2: 81.14,
          yxl1: '14%',
          yxl2: '12%',
          lhv1:'69%',
          lhv2: '82%',
          jgl1: '12%',
          jgl2: '3%',
          yllv1: '83%',
          yllv2: '78%',
          hglv1: '96%',
          hglv2:'98%'
        },
        {
          grade: "五年级",
          khrs1: 58,
          khrs2: 58,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 81.66,
          pfdf2: 81.27,
          yxl1: '6%',
          yxl2: '8%',
          lhv1:'84%',
          lhv2: '74%',
          jgl1: '6%',
          jgl2: '17%',
          yllv1: '90%',
          yllv2: '65%',
          hglv1: '98%',
          hglv2:'100%'
        },
        {
          grade: "六年级",
          khrs1: 60,
          khrs2: 60,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 82.73,
          pfdf2: 77.08,
          yxl1: '1%',
          yxl2: '3%',
          lhv1:'90%',
          lhv2: '63%',
          jgl1: '8%',
          jgl2: '26%',
          yllv1: '91%',
          yllv2: '56%',
          hglv1: '100%',
          hglv2:'93%'
        },
      ],
      data3Middle: [ // 运动技能/体能 - 各年级学期数据对比 - 初中
        {
          grade: "七年级",
          khrs1: 384,
          khrs2: 384,
          noTest1: 4,
          noTest2: 2,
          pfdf1: 82.86,
          pfdf2: 90.43,
          yxl1: '16%',
          yxl2: '59%',
          lhv1:'74%',
          lhv2: '39%',
          jgl1: '10%',
          jgl2: '2%',
          yllv1: '88%',
          yllv2: '98%',
          hglv1: '100%',
          hglv2:'100%'
        },
        // {
        //   grade: "八年级",
        //   khrs1: 136,
        //   khrs2: 136,
        //   noTest1: 0,
        //   noTest2: 0,
        //   pfdf1: 81.83,
        //   pfdf2: 81.11,
        //   yxl1: '13%',
        //   yxl2: '18%',
        //   lhv1:'70%',
        //   lhv2: '61%',
        //   jgl1: '16%',
        //   jgl2: '14%',
        //   yllv1: '83%',
        //   yllv2: '79%',
        //   hglv1: '100%',
        //   hglv2:'94%'
        // },
        // {
        //   grade: "九年级",
        //   khrs1: 12,
        //   khrs2: 12,
        //   noTest1: 0,
        //   noTest2: 0,
        //   pfdf1: 86.87,
        //   pfdf2: 74.02,
        //   yxl1: '50%',
        //   yxl2: '16%',
        //   lhv1:'41%',
        //   lhv2: '33%',
        //   jgl1: '8%',
        //   jgl2: '50%',
        //   yllv1: '91%',
        //   yllv2: '49%',
        //   hglv1: '100%',
        //   hglv2:'100%'
        // },
      ],
      data4Small: [ // 健康知识 - 各年级学期数据对比 -小学
        {
          grade: "一年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 75.1,
          pfdf2: 82,
          yxl1: '35.59%%',
          yxl2: '35.59%%',
          lhv1:'13.56%%',
          lhv2: '25.42%%',
          jgl1: '28.81%%',
          jgl2: '23.73%%',
          yllv1: '49.15%%',
          yllv2: '61.01%%',
          hglv1: '77.96%%',
          hglv2:'84.74%%'
        },
        {
          grade: "二年级",
          khrs1: 60,
          khrs2: 60,
          noTest1: 0,
          noTest2: 7,
          pfdf1: 75.6,
          pfdf2: 82.7,
          yxl1: '31.67%',
          yxl2: '36.67%',
          lhv1:'25%',
          lhv2: '36.67%',
          jgl1: '18.33%',
          jgl2: '13.33%',
          yllv1: '56.67%',
          yllv2: '73.34%',
          hglv1: '70%',
          hglv2:'86.67%'
        },
        {
          grade: "三年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 5,
          pfdf1: 81.2,
          pfdf2: 83.9,
          yxl1: '28.81%',
          yxl2: '40.68%',
          lhv1:'25.42%',
          lhv2: '35.59%',
          jgl1: '32.20%',
          jgl2: '11.86%',
          yllv1: '54.23%',
          yllv2: '76.27%',
          hglv1: '86.43%',
          hglv2:'88.13%'
        },
        {
          grade: "四年级",
          khrs1: 56,
          khrs2: 56,
          noTest1: 0,
          noTest2: 6,
          pfdf1: 85.7,
          pfdf2: 81.1,
          yxl1: '58.93%',
          yxl2: '41.07%',
          lhv1:'23.21%',
          lhv2: '28.57%',
          jgl1: '10.71%',
          jgl2: '19.64%',
          yllv1: '82.12%',
          yllv2: '69.64%',
          hglv1: '92.85%',
          hglv2:'89.28%'
        },
        {
          grade: "五年级",
          khrs1: 58,
          khrs2: 58,
          noTest1: 0,
          noTest2: 6,
          pfdf1: 86,
          pfdf2: 84.1,
          yxl1: '39.66%',
          yxl2: '41.38%',
          lhv1:'27.59%',
          lhv2: '25.86%',
          jgl1: '32.76%',
          jgl2: '22.41%',
          yllv1: '67.25%',
          yllv2: '67.24%',
          hglv1: '100%',
          hglv2:'89.65%'
        },
        {
          grade: "六年级",
          khrs1: 60,
          khrs2: 60,
          noTest1: 0,
          noTest2: 12,
          pfdf1: 87.6,
          pfdf2: 86.2,
          yxl1: '43.33%',
          yxl2: '68.33%',
          lhv1:'43.33%',
          lhv2: '15.00%',
          jgl1: '11.67%',
          jgl2: '8.33%',
          yllv1: '86.66%',
          yllv2: '83.33%',
          hglv1: '98.33%',
          hglv2:'91.66%'
        },
      ],
      data4Middle: [ // 健康知识 - 各年级学期数据对比 -初中
        {
          grade: "七年级",
          khrs1: 384,
          khrs2: 384,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 92.6,
          pfdf2: 93.5,
          yxl1: '73.95%',
          yxl2: '79.43%',
          lhv1:'25.78%',
          lhv2: '16.93%',
          jgl1: '0.27%',
          jgl2: '3.12%',
          yllv1: '99.73%',
          yllv2: '96.36%',
          hglv1: '100%',
          hglv2:'99.48%'
        },
        // {
        //   grade: "八年级",
        //   khrs1: 136,
        //   khrs2: 136,
        //   noTest1: 0,
        //   noTest2: 0,
        //   pfdf1: 87,
        //   pfdf2: 89.2,
        //   yxl1: '41.17%',
        //   yxl2: '46.33%',
        //   lhv1:'39.70%',
        //   lhv2: '53.67%',
        //   jgl1: '11.02%',
        //   jgl2: '0%',
        //   yllv1: '80.87%',
        //   yllv2: '100%',
        //   hglv1: '91.89%',
        //   hglv2:'100%'
        // },
        // {
        //   grade: "九年级",
        //   khrs1: 12,
        //   khrs2: 12,
        //   noTest1: 0,
        //   noTest2: 0,
        //   pfdf1: 89.2,
        //   pfdf2: 94.3,
        //   yxl1: '50%',
        //   yxl2: '100%',
        //   lhv1:'33.33%',
        //   lhv2: '0%',
        //   jgl1: '8.33%',
        //   jgl2: '0%',
        //   yllv1: '83.33%',
        //   yllv2: '100%',
        //   hglv1: '91.66%',
        //   hglv2:'100%'
        // },
      ],
      columns5: [
        { title: "年级", key: "grade", align: "center" },
        { title: "考核人数", align: "center", children: [
          {title: '2019学年第一学期', key: 'khrs1', align: 'center'},
          {title: '2019学年第二学期', key: 'khrs2', align: 'center'}
        ]},
        { title: "免试人数", align: "center", children: [
          {title: '2019学年第一学期', key: 'noTest1', align: 'center'},
          {title: '2019学年第二学期', key: 'noTest2', align: 'center'}
        ]},
        { title: "平均得分",align: "center", children: [
          {title: '2019学年第一学期', key: 'pfdf1', align: 'center'},
          {title: '2019学年第二学期', key: 'pfdf2', align: 'center'}
        ]},
        { title: "男生平均每天锻炼时长（分钟）", align: "center",children: [
          {title: '2019学年第一学期', key: 'boyExerciseTime1', align: 'center'},
          {title: '2019学年第二学期', key: 'boyExerciseTime2', align: 'center'}
        ]},
        { title: "女生平均每天锻炼时长（分钟）", align: "center",children: [
          {title: '2019学年第一学期', key: 'girlExerciseTime1', align: 'center'},
          {title: '2019学年第二学期', key: 'girlExerciseTime2', align: 'center'}
        ]},
      ],
      data5SmallSchool: [ // 课后作业 - 各年级学期数据对比 - 小学
        {
          grade: "一年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 0,
          pfdf1: 89.1,
          pfdf2: 89.15,
          boyExerciseTime1: '35.61',
          boyExerciseTime2: '38.02',
          girlExerciseTime1: '35.61',
          girlExerciseTime2: '38.18'
        },
        {
          grade: "二年级",
          khrs1: 60,
          khrs2: 60,
          noTest1: 0,
          noTest2: 7,
          pfdf1: 100,
          pfdf2: 88.33,
          boyExerciseTime1: '28.54',
          boyExerciseTime2: '29.11',
          girlExerciseTime1: '28.68',
          girlExerciseTime2: '28.66'
        },
        {
          grade: "三年级",
          khrs1: 59,
          khrs2: 59,
          noTest1: 0,
          noTest2: 6,
          pfdf1: 100,
          pfdf2: 89.83,
          boyExerciseTime1: '28.75',
          boyExerciseTime2: '28.97',
          girlExerciseTime1: '28.24',
          girlExerciseTime2: '29.01'
        },
        {
          grade: "四年级",
          khrs1: 56,
          khrs2: 56,
          noTest1: 0,
          noTest2: 6,
          pfdf1: 100,
          pfdf2: 57.14,
          boyExerciseTime1: '29.61',
          boyExerciseTime2: '28.70',
          girlExerciseTime1: '29.82',
          girlExerciseTime2: '28.70'
        },
        {
          grade: "五年级",
          khrs1: 58,
          khrs2: 58,
          noTest1: 0,
          noTest2: 6,
          pfdf1: 100,
          pfdf2: 89.66,
          boyExerciseTime1: '28.34',
          boyExerciseTime2: '28.89',
          girlExerciseTime1: '28.46',
          girlExerciseTime2: '28.89'
        },
        {
          grade: "六年级",
          khrs1: 60,
          khrs2: 60,
          noTest1: 0,
          noTest2: 3,
          pfdf1: 100,
          pfdf2: '95.00',
          boyExerciseTime1: '29.81',
          boyExerciseTime2: '29.09',
          girlExerciseTime1: '29.62',
          girlExerciseTime2: '29.13'
        },
      ],
      data5MiddleSchool: [
        {
          grade: "七年级",
          khrs1: 384,
          khrs2: 384,
          noTest1: 0,
          noTest2: 1,
          pfdf1: 100,
          pfdf2: 99.9,
          boyExerciseTime1: '21.12',
          boyExerciseTime2: '22.65',
          girlExerciseTime1: '21.33',
          girlExerciseTime2: '22.66'
        },
        // {
        //   grade: "八年级",
        //   khrs1: 136,
        //   khrs2: 136,
        //   noTest1: 0,
        //   noTest2: 0,
        //   pfdf1: 100,
        //   pfdf2: 90.2,
        //   boyExerciseTime1: '65.11',
        //   boyExerciseTime2: '68.91',
        //   girlExerciseTime1: '64.95',
        //   girlExerciseTime2: '68.14'
        // },
        // {
        //   grade: "九年级",
        //   khrs1: 12,
        //   khrs2: 12,
        //   noTest1: 0,
        //   noTest2: 0,
        //   pfdf1: 100,
        //   pfdf2: 85.19,
        //   boyExerciseTime1: '26.21',
        //   boyExerciseTime2: '27.37',
        //   girlExerciseTime1: '25.77',
        //   girlExerciseTime2: '26.52'
        // },
      ],
      bestResultProjectSmall: ['肺活量','50米跑', '一分钟跳绳','一分钟仰卧起坐', '50米X8往返跑'], // 成绩上升项目 - 小学
      bestResultProjectMiddle: ['肺活量','一分钟仰卧起坐', '引体向上', '1000米跑', '800米跑'], // 成绩上升项目 - 初中
      averageResultSmall: ['1683ml', '10.87s', '91次','35次','1′49″'],// 成绩上升项目-平均成绩 - 小学
      averageResultMiddle: ['2534ml', '41次', '3次','4′32″','3′8″'],// 成绩上升项目-平均成绩 - 初中
      averageScoreSmall: [[89,4],[92,11],[84,6],[82,3],[80,1]], // 成绩上升项目-平均得分 - 小学
      averageScoreMiddle: [[70,1],[80,3],[31,1],[71,5],[80,3]] // 成绩上升项目-平均得分 - 初中
    };
  },
  mounted() {
    let vm = this
    vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
    vm.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
    vm.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
    vm.myChart4 = this.$echarts.init(document.getElementById("myChart4"));
    vm.myChart5 = this.$echarts.init(document.getElementById("myChart5"));
    vm.myChart6 = this.$echarts.init(document.getElementById("myChart6"));
    vm.myChart7 = this.$echarts.init(document.getElementById("myChart7"));
    vm.myChart8 = this.$echarts.init(document.getElementById("myChart8"));
    vm.myChart9 = this.$echarts.init(document.getElementById("myChart9"));
    vm.myChart10 = this.$echarts.init(document.getElementById("myChart10"));
    vm.myChart12 = this.$echarts.init(document.getElementById("myChart12"));
    vm.myChart13 = this.$echarts.init(document.getElementById("myChart13"));
    vm.myChart14 = this.$echarts.init(document.getElementById("myChart14"));

    /** 体质测试 */
    this.initChart1(); // 学年平均分对比 - 柱形图
    this.initChart2(); //平均分走势 - 折线图
    this.initChart3() // 合格率/优良率走势 - 折线图
    this.initChart4(); // 各项目平均分 - 柱形图

    /** 运动技能/体能 */
    this.initChart5(); // 学期平均分对比 - 饼图
    this.initChart6(); // 合格率/优良率走势 - 折线图
    this.initChart7(); // 学期项目类型分布 - 雷达图

    /** 健康知识 */
    this.initChart8() // 健康知识 —— 学期平均分对比 - 柱形图
    this.initChart9(); // 健康知识 —— 合格率/优良率走势 - 折线图

    // /** 学习态度 */
    this.initChart10() // 学习态度 —— 扣分项目学期对比 - 柱形图
    // this.initChart11(); // 学习态度 —— 学习态度扣分明细 - 饼图

    // /** 课后作业 */
    this.initChart12() // 课后作业 —— 学期平均分对比 - 柱状图
    this.initChart13() // 课后作业 —— 平均分走势 - 折线图
    this.initChart14() // 课后作业 —— 学期锻炼类型分布 - 雷达
  },
  methods: {
    /** 体质测试 —— 学年平均分对比 - 柱形图 */
    initChart1() {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolBoy = [82,86]
      const smallSchoolGirl = [82,85]
      //初中
      const middleSchoolBoy = [71,72]
      const middleSchoolGirl = [80,79]
      vm.myChart1.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          legend: {
            type: 'plain',
            show: true,
            right: 20,
            top:20,
            itemWidth:14,
            itemHeight:14,
            data: ["女生", "男生"],
          },
          xAxis: [
            {
              type: "category",
              data:['2018学年', '2019学年'],
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                interval: 0,
              },
            },
          ],
          yAxis: [
            {
              name: "平均分",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: [
            {
              name: '女生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
            {
              name: '男生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
              itemStyle: {
                color: '#6FB595'
              },
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
          ],
        },
        true
      );
    },
    /** 体质测试 —— 平均分走势图 - 折线图 */
    initChart2() {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolBoy = [82,86]
      const smallSchoolGirl = [82,85]
      //初中
      const middleSchoolBoy = [71,72]
      const middleSchoolGirl = [80,79]
      vm.myChart2.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: '25%'
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            data: ['女生', "男生",],
          },
          yAxis: {
              name: "平均分",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
          },
          xAxis: {
            type: 'category',
            data: ['2018学年','2019学年']
          },
          series: [
            {
              name: '女生',
              type: 'line',
              data: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
            {
              name: '男生',
              type: 'line',
              data: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
              itemStyle: {color: '#6FB595'},
              barWidth:20,
              label: {
                show: true,
                position: 'bottom',
                formatter: (params) => {
                  return params.data
                }
              }
            }
          ]
        },
        true
      );
    },
    /** 体质测试 —— 合格率/优良率走势 - 折线 */
    initChart3() {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolHglv = [98,98] // 合格率
      const smallSchoolYllv = [61,73] // 优良率
      //初中
      const middleSchoolHglv = [92,92]
      const middleSchoolYllv = [34,38]
      vm.myChart3.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: '25%'
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            data: ['合格率', "优良率",],
          },
          yAxis: {
              name: "百分比（%）",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
          },
          xAxis: {
            type: 'category',
            data: ['2018学年','2019学年'],
          },
          series: [
            {
              name: '合格率',
              type: 'line',
              data: schoolType === '2' ? smallSchoolHglv : middleSchoolHglv,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data + '%'
                }
              }
            },
            {
              name: '优良率',
              type: 'line',
              data: schoolType === '2' ? smallSchoolYllv : middleSchoolYllv,
              itemStyle: {color: '#6FB595'},
              barWidth:20,
              label: {
                show: true,
                position: 'bottom',
                formatter: (params) => {
                  return params.data + '%'
                }
              }
            }
          ]
        },
        true
      );
    },
    /** 体质测试 —— 各项目平均分 - 柱形图 */
    initChart4() {
      let vm = this
      let {schoolType} = vm
      const firstYearSmall = [78,81,78,78,79,79] // 2018学年 -小学
      const nextYearSmall = [82,92,76,84,82,80] // 2019学年 -小学

      const firstYearMiddle = [69,78,75,77,75,30,66,77] // 2018学年 -初中
      const nextYearMiddle = [70,77,75,80,72,31,71,80] // 2019学年 -初中

      const projectSmall = ["肺活量","50米跑","坐位体前屈","一分钟跳绳","一分钟仰卧起坐","50米x8往返跑",] // 初中项目
      const projectMiddle = ["肺活量","50米跑","坐位体前屈","一分钟仰卧起坐","立定跳远","引体向上","1000米跑","800米跑"]
      vm.myChart4.setOption({
        tooltip: {
          show:true,
          trigger: "axis",
        },
        legend: {
          type: 'plain',
          show: true,
          right: 20,
          top:20,
          itemWidth:14,
          itemHeight:14,
          data: ["2018学年", "2019学年"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data:schoolType === '2' ? projectSmall : projectMiddle,
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              interval: 0,
              // rotate:-20,
            },
          },
        ],
        yAxis: [
          {
            name: "平均分",
            nameGap: 20,
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: '2018学年',
            type: 'bar',
            data: schoolType === '2' ? firstYearSmall : firstYearMiddle,
            itemStyle: {color: '#EA7E53'},
            barWidth:20,
            label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                return params.data
              }
            }
          },
          {
            name: '2019学年',
            type: 'bar',
            data: schoolType === '2' ? nextYearSmall : nextYearMiddle,
            itemStyle: {
              color: '#6FB595'
            },
            barWidth:20,
            label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                return params.data
              }
            }
          },
        ],
      },true);
    },
    /** 运动技能/体能 —— 学期平均分对比 - 柱形图 */
    initChart5() {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolBoy = [80.94,80.85]
      const smallSchoolGirl = [82.87,83.03]
      //初中
      const middleSchoolBoy = [83.1,90.64]
      const middleSchoolGirl = [82.6,90.21]
      vm.myChart5.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          legend: {
            type: 'plain',
            show: true,
            right: 20,
            top:20,
            itemWidth:14,
            itemHeight:14,
            data: ["女生", "男生"],
          },
          xAxis: [
            {
              type: "category",
              data:['2019学年第一学期', '2019学年第二学期'],
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                interval: 0,
              },
            },
          ],
          yAxis: [
            {
              name: "平均分",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: [
            {
              name: '女生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
            {
              name: '男生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
              itemStyle: {
                color: '#6FB595'
              },
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
          ],
        },
        true
      );
    },
    /** 运动技能/体能 —— 合格率/优良率走势 - 折线 */
    initChart6() {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolHglv = [98,98] // 合格率
      const smallSchoolYllv = [86,84] // 优良率
      //初中
      const middleSchoolHglv = [100,100]
      const middleSchoolYllv = [88,97]
      vm.myChart6.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: '25%'
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            data: ['合格率', "优良率",],
          },
          yAxis: {
              name: "百分比（%）",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
          },
          xAxis: {
            type: 'category',
            data: ['2019年第一学期','2019年第二学期'],
          },
          series: [
            {
              name: '合格率',
              type: 'line',
              data: schoolType === '2' ? smallSchoolHglv : middleSchoolHglv,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data + '%'
                }
              }
            },
            {
              name: '优良率',
              type: 'line',
              data: schoolType === '2' ? smallSchoolYllv : middleSchoolYllv,
              itemStyle: {color: '#6FB595'},
              barWidth:20,
              label: {
                show: true,
                position: 'bottom',
                formatter: (params) => {
                  return params.data + '%'
                }
              }
            }
          ]
        },
        true
      );
    },
    /** 运动技能/体能 —— 技能/体能项目分布 - 雷达图 */
    initChart7 () {
      let vm = this
      let {schoolType} = vm

      const firstSemesterSmall = [76.51, 72.95, 76.59, 80.37, 74.13, 79.24] // 第一学期 - 小学
      const secondSemesterSmall = [83.24, 84.29, 0, 75.55, 79.9, 74.57] // 第二学期 - 小学

      const firstSemesterMiddle = [73.12, 82.25, 77.74, 81.32, 71.46, 75.34] // 第一学期 - 初中
      const secondSemesterMiddle = [79.84, 84.83, 0, 84.32, 78.87, 78.97] // 第二学期 - 初中
      vm.myChart7.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'item'
          },
          color: ['#EA7E53', '#6FB595'],
          legend: {
            orient: "horizontal",
            right: 20,
            top:20,
            itemWidth:14,
            itemHeight:14,
            data: ["第一学期", "第二学期"],
          },
          radar: {
            center: ['50%', '50%'],
            radius: '50%',
            name: {
              textStyle: {
                color: '#333',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              {name: '球类',max:100},
              { name: '体操类',max:100},
              { name: '游泳类',max:100},
              { name: '新兴体育类',max:100},
              { name: '民族传统体育类',max:100},
              { name: '田径类',max:100}
            ]
          },
          series: [{
            type: 'radar',
            data: [
              {
                value: schoolType === '2' ? firstSemesterSmall : firstSemesterMiddle,
                name: '第一学期',
                //在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    formatter: (params) => {
                      return params.value
                    },
                  },
                },
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: '#EA7E53' // 填充的颜色。[ default: "#000" ]
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#EA7E53',
                    borderWidth: 3,
                  }
                },
                lineStyle: { // 单项线条样式。
                  normal: {
                    color: '#EA7E53',
                    opacity: 0.5 // 图形透明度
                  }
                },
              },
              {
                value: schoolType === '2' ? secondSemesterSmall : secondSemesterMiddle,
                name: '第二学期',
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: '#6FB595' // 填充的颜色。[ default: "#000" ]
                  }
                },
                label: {
                  normal: {
                    show: true,
                    formatter: (params) => {
                      return params.value
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    borderColor: '#6FB595',
                    borderWidth: 3,
                  }
                },
                lineStyle: { // 单项线条样式。
                  normal: {
                    color: '#6FB595',
                    opacity: 0.5 // 图形透明度
                  }
                },
              }
            ]
          }]
        },
        true
      );
    },
    /** 健康知识 - 学期平均分对比 - 柱形图 */
    initChart8 () {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolBoy = [82.62, 83.77]
      const smallSchoolGirl = [81.01, 84.82]
      //初中
      const middleSchoolBoy = [92.06, 92.29]
      const middleSchoolGirl = [93.3, 94.87]
      vm.myChart8.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          legend: {
            type: 'plain',
            show: true,
            right: 20,
            top:20,
            itemWidth:14,
            itemHeight:14,
            data: ["女生", "男生"],
          },
          xAxis: [
            {
              type: "category",
              data:['2019学年第一学期', '2019学年第二学期'],
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                interval: 0,
              },
            },
          ],
          yAxis: [
            {
              name: "平均分",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: [
            {
              name: '女生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
            {
              name: '男生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
              itemStyle: {
                color: '#6FB595'
              },
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
          ],
        },
        true
      );
    },
    /** 健康知识 - 合格率/优良率走势 - 折线图 */
    initChart9 () {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolHglv = [88.35,89] // 合格率
      const smallSchoolYllv = [65.91,76] // 优良率
      //初中
      const middleSchoolHglv = [100,99.48]
      const middleSchoolYllv = [99.73,96.36]
      vm.myChart9.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: '25%'
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            data: ['合格率', "优良率",],
          },
          yAxis: {
              name: "百分比（%）",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
          },
          xAxis: {
            type: 'category',
            data: ['2019年第一学期','2019年第二学期'],
          },
          series: [
            {
              name: '合格率',
              type: 'line',
              data: schoolType === '2' ? smallSchoolHglv : middleSchoolHglv,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data + '%'
                }
              }
            },
            {
              name: '优良率',
              type: 'line',
              data: schoolType === '2' ? smallSchoolYllv : middleSchoolYllv,
              itemStyle: {color: '#6FB595'},
              barWidth:20,
              label: {
                show: true,
                position: 'bottom',
                formatter: (params) => {
                  return params.data + '%'
                }
              }
            }
          ]
        },
        true
      );
    },
    /** 学习态度 - 扣分项目学期对比 - 柱形图 */
    initChart10 () {
      let vm = this
      let {schoolType} = vm
      const firstYearSmall = [8, 10, 9, 11, 7, 4, 5, 1, 2] // 第一学期 -小学
      const nextYearSmall = [5, 6, 5, 4, 3, 3, 3, 0 ,0] // 第二学期 -小学

      const firstYearMiddle = [0,7,0,21,2, 30, 1,0,0] // 第一学期 -初中
      const nextYearMiddle = [0,3,0,5,0,47,7, 2, 4] // 第二学期 -初中

      vm.myChart10.setOption({
        tooltip: {
          show:true,
          trigger: "axis",
        },
        legend: {
          type: 'plain',
          show: true,
          right: 20,
          top:20,
          itemWidth:14,
          itemHeight:14,
          data: ["第一学期", "第二学期"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ['旷课', '迟到', '早退', '违反纪律', '运动着装不符', '病假', '事假', '大课间缺席', '大课间违反纪律'],
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              interval: 0,
              // rotate:-20,
            },
          },
        ],
        yAxis: [
          {
            name: "平均分",
            nameGap: 20,
            type: "value",
            // max:15,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: '第一学期',
            type: 'bar',
            data: schoolType === '2' ? firstYearSmall : firstYearMiddle,
            itemStyle: {color: '#EA7E53'},
            barWidth:20,
            label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                return params.data
              }
            }
          },
          {
            name: '第二学期',
            type: 'bar',
            data: schoolType === '2' ? nextYearSmall : nextYearMiddle,
            itemStyle: {
              color: '#6FB595'
            },
            barWidth:20,
            label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                return params.data
              }
            }
          },
        ],
      },true);
    },
    /** 学习态度 - 学习态度扣分明细 - 饼图 */
    initChart11 () {
      let myChart = this.$echarts.init(document.getElementById("myChart11"));
      let {schoolType} = this
      const smallSchool = [
        { value: 5, name: "早退",max:30},
        { value: 6, name: "迟到",max:30 },
        { value: 0, name: "大课间缺席",max:30 },
        { value: 3, name: "病假",max:30},
        { value: 4, name: "事假",max:30},
        { value: 0, name: "大课间违反纪律",max:30},
        { value: 5, name: "旷课",max:30},
        { value: 4, name: "违反纪律",max:30},
        { value: 3, name: "运动着装不符",max:30},
      ]
      const middleSchool = [
        { value: 0, name: "早退",max:9},
        { value: 2, name: "迟到",max:9 },
        { value: 0, name: "大课间缺席",max:9 },
        { value: 1, name: "病假",max:9},
        { value: 1, name: "事假",max:9},
        { value: 0, name: "大课间违反纪律",max:9},
        { value: 2, name: "旷课",max:9},
        { value: 3, name: "违反纪律",max:9},
        { value: 0, name: "运动着装不符",max:9},
      ]
      myChart.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            width:280,
            itemWidth:14,
            itemHeight:14,
            align:'auto',
            data: ["早退", "迟到", "大课间缺席", "病假","事假","大课间违反纪律", "旷课","违反纪律","运动着装不符"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['20%','35%'],
              center: ['50%', '60%'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                normal: {
                  color: function (params) {
                    var colorList = [
                      "#4CA390",
                      "#E9D176",
                      "#DC8065",
                      "#47B2D7",
                      "#6594C0",
                      "#E48129",
                      "#B8CE83",
                      "#90BF82",
                      "#AE60A8"
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? smallSchool : middleSchool,
              label: {
                show: true,
                formatter: "{b} : ({d}%)",
              },
            },
          ],
        },
        true
      );
    },
    /** 课后作业 —— 学期平均分对比 - 柱状图 */
    initChart12 () {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolBoy = [98.42, 95.49]
      const smallSchoolGirl = [97.91, 95.93]
      //初中
      const middleSchoolBoy = [100, 100]
      const middleSchoolGirl = [100, 99.83]
      vm.myChart12.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          legend: {
            type: 'plain',
            show: true,
            right: 20,
            top:20,
            itemWidth:14,
            itemHeight:14,
            data: ["女生", "男生"],
          },
          grid: {
            top: '35%'
          },
          xAxis: [
            {
              type: "category",
              data:['2019学年第一学期', '2019学年第二学期'],
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                interval: 0,
              },
            },
          ],
          yAxis: [
            {
              name: "平均分",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: [
            {
              name: '女生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
            {
              name: '男生',
              type: 'bar',
              data: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
              itemStyle: {
                color: '#6FB595'
              },
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
          ],
        },
        true
      );
    },
    /** 课后作业 —— 平均分走势 - 折线图 */
    initChart13 () {
      let vm = this
      let {schoolType} = vm
      // 小学
      const smallSchoolGirl = [97.91,95.93] // 女生 - 小学
      const smallSchoolBoy = [98.42,95.94] // 男生 - 小学
      //初中
      const middleSchoolGirl = [100,99.83] // 女生 - 初中 
      const middleSchoolBoy = [100, 100]  // 男生 - 初中
      vm.myChart13.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: '25%'
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            data: ['女生', "男生",],
          },
          yAxis: {
              name: "平均分",
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
          },
          xAxis: {
            type: 'category',
            data: ['2019学年第一学期','2019学年第二学期'],
          },
          series: [
            {
              name: '女生',
              type: 'line',
              data: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
              itemStyle: {color: '#EA7E53'},
              barWidth:20,
              label: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.data
                }
              }
            },
            {
              name: '男生',
              type: 'line',
              data: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
              itemStyle: {color: '#6FB595'},
              barWidth:20,
              label: {
                show: true,
                position: 'bottom',
              }
            }
          ]
        },
        true
      );
    },
    /** 课后作业 —— 学期锻炼类型分布 - 雷达图 */
    initChart14 () {
      let vm = this
      let {schoolType} = vm
      const firstSemesterSmall = [84, 79, 75,83, 78,85] // 第一学期 - 小学
      const secondSemesterSmall = [80, 87, 87,77, 84,81] // 第二学期 - 小学

      const firstSemesterMiddle = [86, 72, 79,81, 75,81] // 第一学期 - 初中
      const secondSemesterMiddle = [81, 79, 81,82, 74,85] // 第二学期 - 初中
      vm.myChart14.setOption(
        {
          tooltip: {
            show: true,
            trigger: 'item'
          },
          color: ['#EA7E53', '#6FB595'],
          legend: {
            orient: "horizontal",
            right: 20,
            top:20,
            itemWidth:14,
            itemHeight:14,
            data: ["第一学期","第二学期"],
          },
          radar: {
            center: ['50%', '50%'],
            radius: '50%',
            name: {
              textStyle: {
                color: '#333',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              {
                name: '力量',max:100
              },
              { name: '协调',max:100},
              { name: '耐力',max:100},
              { name: '速度',max:100},
              { name: '柔韧',max:100},
              { name: '敏捷',max:100}
            ]
          },
          series: [{
            type: 'radar',
            data: [
              {
                value: schoolType === '2' ? firstSemesterSmall : firstSemesterMiddle,
                name: '第一学期',
                //在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    formatter: (params) => {
                      return params.value
                    },
                  },
                },
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: '#EA7E53' // 填充的颜色。[ default: "#000" ]
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#EA7E53',
                    borderWidth: 3,
                  }
                },
                lineStyle: { // 单项线条样式。
                  normal: {
                    color: '#EA7E53',
                    opacity: 0.5 // 图形透明度
                  }
                },
              },
              {
                value: schoolType === '2' ? secondSemesterSmall : secondSemesterMiddle,
                name: '第二学期',
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: '#6FB595' // 填充的颜色。[ default: "#000" ]
                  }
                },
                label: {
                  normal: {
                    show: true,
                    formatter: (params) => {
                      return params.value
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    borderColor: '#6FB595',
                    borderWidth: 3,
                  }
                },
                lineStyle: { // 单项线条样式。
                  normal: {
                    color: '#6FB595',
                    opacity: 0.5 // 图形透明度
                  }
                },
              },
            ]
          }]
        },
        true
      );
    }
  },
  destroyed () {
    let vm = this
    vm.myChart1 = null
    vm.myChart2 = null
    vm.myChart3 = null
    vm.myChart4 = null
    vm.myChart5 = null
    vm.myChart6 = null
    vm.myChart7 = null
    vm.myChart8 = null
    vm.myChart9 = null
    vm.myChart10 = null
    vm.myChart12 = null
    vm.myChart13 = null
    vm.myChart14 = null
  }
};
</script>
<style lang="less" scoped>
.kong{
  width:100%;
  height:20px;
  background: #f0f0f0;
}
.current-semster{
  .data-title,.data-title2,.data-title3 {
    width: 100%;
    height: 40px;
    background-size:cover;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 16px;
  }
  .data-title{background: url('../../images/title_line1.png') no-repeat;}
  .data-title2{background: url('../../images/title_line2.png') no-repeat;}
  .data-title3{background: url('../../images/title_line3.png') no-repeat;}
  .title-icon{
    display:inline-block;
    width:10px;
    margin-right:10px;
    height:10px;
    border:3px solid rgba(0,198,147,1);
    border-radius:50%;
  }
  .best-result-table{
    display:flex;
    margin-top:60px;
    .item{
      width:35%;
      text-align:center;
      p{
        height:56px;
      }
    }
  }
  .summary{
    min-height:86px;
    margin-top:20px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(191,201,206,1);
    border-radius:5px;
    display:flex;
    align-items:center;
    box-sizing: border-box;
    padding:10px 16px;
    font-size:14px;
  }
  .healthy-knowledge-score{
    width:300px;
    height:262px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(240,240,240,1);
    border-radius:5px;
    display:flex;
    align-items:space-around;
    justify-content: center;
    flex-direction: column;
    font-size:18px;
    p{
      text-align:center;
    }
  }
}
</style>
