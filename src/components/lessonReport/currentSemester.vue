<template>
  <div class="current-semster">
    <div class="kong"></div>
     <!------ 学校基本情况 ------>
    <Card>
      <div>
        <h2 style="font-size:20px;">学校基本情况</h2>
        <Table border :columns="columns1" :data="schoolType === '2' ? data1Small : data1Middle" style="margin-top:16px;"></Table>
      </div>
    </Card>
    <div class="kong"></div>
    <!------ 体质健康 ------>
    <Card>
      <div>
        <h2 style="font-size:20px;">体质健康</h2>
        <div class="data-title" style="margin-top:16px;"><i class="title-icon"></i>各年级体质健康平均成绩</div>
        <Table border :columns="schoolType === '2' ? columns2Small : columns2Middal" :data="schoolType === '2' ? data2Small : data2Middal" style="margin-top:16px;"></Table>
        <!-- 数据统计 -->
        <Row style="margin-top:16px;" :gutter="20">
          <!-- 男生/女生平均分 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>男生/女生平均分</div>
              <div
                id="myChart1"
                :style="{width: '100%', height: '400px',display: 'inline-block'}"
              ></div>
            </div>
          </Col>
          <!-- 男生等级图形分布 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>男生等级图形分布</div>
              <div
                id="myChart2"
                :style="{width: '100%', height: '320px',display: 'inline-block'}"
              ></div>
              <div style="display:flex;width:90%;justify-content: space-around;margin:0 auto;font-size:18px;">
                <p>合格率：88%</p>
                <p>优良率：{{schoolType === '2' ? '68%' : '27%'}}</p>
              </div>
            </div>
          </Col>
          <!-- 女生等级图形分布 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>女生等级图形分布</div>
              <div id="myChart3" :style="{width:'100%', height: '320px',display: 'inline-block'}"></div>
              <div style="display:flex;width:90%;justify-content: space-around;margin:0 auto;font-size:18px;">
                <p>合格率：{{schoolType === '2' ? '97%' : '97%'}}</p>
                <p>优良率：{{schoolType === '2' ? '78%' : '50%'}}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row :gutter="20">
          <!-- 各项目平均分 -->
          <Col span="16">
            <div style="width:100%;">
              <div class="data-title2"><i class="title-icon"></i>各项目平均分</div>
              <div id="myChart4" :style="{width:'100%', height: '400px',display: 'inline-block'}"></div>
            </div>
          </Col>
          <!-- 成绩优异项目 -->
          <Col span="8">
            <div style="width:100%;">
              <div class="data-title3"><i class="title-icon"></i>成绩优异项目（比其他学校）</div>
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
                  <p v-for="(item, index) in (schoolType === '2' ? averageScoreSmall : averageScoreMiddle)" :key="index + 'c'">{{item}}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <!-- 体质健康总结报告 -->
      <div>
        <div class="data-title"><i class="title-icon"></i>体质健康总结报告</div>
        <div class="summary">
          {{schoolType === '2' ? tzjkReportSmall : tzjkReportMiddle}}
        </div>
      </div>
    </Card>
    <div class="kong"></div>
    <!------ 运动技能/体能 ------>
    <Card>
      <h2 style="font-size:20px;">运动技能/体能</h2>
      <div class="data-title" style="margin-top:30px;"><i class="title-icon"></i>各年级运动技能/体能平均成绩</div>
      <Table border :data="schoolType === '2' ? data3Small : data3Middle" :columns="schoolType === '2' ? columns3Small : columns3Middle" style="margin-top:16px;"></Table>
      <!-- 数据统计 -->
      <Row style="margin-top:30px;" :gutter="20">
        <!-- 男生等级图形分布 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>男生等级图形分布</div>
            <div
              id="myChart5"
              :style="{width: '100%', height: '350px',display: 'inline-block'}"
            ></div>
            <div style="display:flex;width:90%;justify-content: space-around;margin:0 auto;font-size:18px;">
              <p>合格率：{{schoolType === '2' ? '97%' : '100%'}}</p>
              <p>优良率：{{schoolType === '2' ? '58%' : '95.97%'}}</p>
            </div>
          </div>
        </Col>
        <!-- 女生等级图形分布 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>女生等级图形分布</div>
            <div id="myChart6" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
            <div style="display:flex;width:90%;justify-content: space-around;margin:0 auto;font-size:18px;">
              <p>合格率：{{schoolType === '2' ? '98%' : '100%'}}</p>
              <p>优良率：{{schoolType === '2' ? '60%' : '98.91%'}}</p>
            </div>
          </div>
        </Col>
        <!-- 技能/体能项目分布 -->
        <Col span="8">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>技能/体能项目分布</div>
            <div id="myChart7" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
            <div style="display:flex;width:90%;justify-content:space-around;margin:0 auto;font-size:18px;">
              <p>特长项目：{{schoolType === '2' ? '小篮球' : '足球'}}</p>
              <p>特色项目：{{schoolType === '2' ? '徒手操' : '肩肘倒立前滚成蹲立'}}</p>
            </div>
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
      <h2 style="font-size:20px;">健康知识</h2>
        <!-- 各年级健康知识成绩 -->
        <div class="data-title" style="margin-top:16px;"><i class="title-icon"></i>各年级健康知识平均成绩</div>
        <Table border :data="schoolType === '2' ? data4Small : data4Middle" :columns="columns4" style="margin-top:16px;"></Table>
        <Row :gutter="20" style="margin-top:16px;">
          <!-- 平均分 -->
          <Col span="16">
            <div class="data-title"><i class="title-icon"></i>平均分</div>
            <div style="display:flex;align-items:center;">
              <div id="myChart8" :style="{width:'70%', height: '350px',display: 'inline-block',marginTop:'20px'}"></div>
              <div class="healthy-knowledge-score">
                <p>学校健康知识平均得分</p>
                <p>{{schoolType === '2' ? 83.33 : 93.58}}分</p>
              </div>
            </div>
          </Col>
          <!-- 等级图形分布 -->
          <Col span="8">
            <div class="data-title3"><i class="title-icon"></i>等级图形分布</div>
            <div id="myChart9" :style="{width:'100%', height: '300px',display: 'inline-block'}"></div>
            <div style="display:flex;width:90%;justify-content:space-around;margin:0 auto;font-size:18px;">
              <p>合格率：{{schoolType === '2' ? '89%' : '99.48%'}}</p>
              <p>优良率：{{schoolType === '2' ? '76%' : '96.36%'}}</p>
            </div>
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
      <h2 style="font-size:20px;">学习态度</h2>
        <Row :gutter="20" style="margin-top:16px;">
          <!-- 平均分 -->
          <Col span="16">
            <div class="data-title"><i class="title-icon"></i>平均分</div>
            <div style="display:flex;align-items:center;">
              <div id="myChart10" :style="{width:'70%', height: '350px',display: 'inline-block',marginTop:'20px'}"></div>
              <div class="healthy-knowledge-score">
                <p>学校学习态度平均得分</p>
                <p>{{schoolType === '2' ? 97.64 : 99.95}}分</p>
              </div>
            </div>
          </Col>
          <!-- 学习态度扣分明细 -->
          <Col span="8">
            <div class="data-title3"><i class="title-icon"></i>学习态度扣分明细</div>
            <div id="myChart11" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
          </Col>
        </Row>
        <!-- 学习态度总结报告 -->
        <div>
          <div class="data-title"><i class="title-icon"></i>学习态度总结报告</div>
          <div class="summary">
            {{schoolType === '2' ? xxtdReportSmall : xxtdReportMiddle}}
          </div>
        </div>
    </Card>
    <div class="kong"></div>
    <!------ 课后作业 ------>
    <Card>
      <h2 style="font-size:20px;">课后作业</h2>
      <div class="data-title" style="margin-top:16px;"><i class="title-icon"></i>各年级课后作业平均成绩</div>
      <Table border :data="schoolType === '2' ? data5SmallSchool : data5MiddleSchool" :columns="columns5" style="margin-top:16px;"></Table>
      <Row :gutter="20" style="margin-top:40px;">
        <!-- 男生等级图形分布 -->
        <Col :span="schoolType === '2'?8:12">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>男生等级图形分布</div>
            <div
              id="myChart12"
              :style="{width: '100%', height: '350px',display: 'inline-block'}"
            ></div>
            <div style="display:flex;width:90%;justify-content: space-around;margin:0 auto;font-size:18px;">
              <p>合格率：100%</p>
              <p>优良率：{{schoolType === '2' ? '94.62%' : '100%'}}</p>
            </div>
          </div>
        </Col>
        <!-- 女生等级图形分布 -->
        <Col :span="schoolType === '2'?8:12">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>女生等级图形分布</div>
            <div id="myChart13" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
            <div style="display:flex;width:90%;justify-content: space-around;margin:0 auto;font-size:18px;">
              <p>合格率：100%</p>
              <p>优良率：{{schoolType === '2' ? '96.38%' : '99.45%'}}</p>
            </div>
          </div>
        </Col>
        <!-- 运动能力分布 -->
        <Col span="8" v-if="schoolType === '2'">
          <div style="width:100%;">
            <div class="data-title3"><i class="title-icon"></i>运动能力分布</div>
            <div id="myChart14" :style="{width:'100%', height: '350px',display: 'inline-block'}"></div>
            <div style="display:flex;width:90%;justify-content:space-around;margin:0 auto;font-size:18px;">
              <p>男生优势：速度、力量</p>
              <p>女生优势：柔韧、{{schoolType === '2' ? '敏捷' : '协调'}}</p>
            </div>
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
      tzjkReportSmall: '2019学年体质健康测试中，共有六个年级，352个学生，男生186人，女生166人完成测试；体质健康全校平均得分为86.05，合格率为98.58%，优良率为73.58%，完成成都市教育局体育与健康教学要求；本校相比其他学校，成绩优异的项目有50米跑，一分钟跳绳和肺活量，其中50米跑平均成绩为8.96s，平均得分为89分，一分钟跳绳平均成绩为117个，平均得分为83分，肺活量平均成绩为1767ml，平均得分为82分。',
      tzjkReportMiddle: '2019学年体质健康测试中，共有3个年级1062个学生，男生567人，女生495人；体质健康全校平均得分为76分，达到优秀等级的人数有75人，优秀率为7%，达到良好等级的人数有319人，良好率为30%，达到及格等级的人数有574人，及格率为54%；全校共达到合格等级的人数有968人，合格率为92%，达到优秀和良好等级的人数有394人，优良率为37%；七年级的平均成绩为77.21分，达到合格等级的人数有370人，合格率为96.59%；达到优秀和良好等级的人数有168人，优良率为43.57%；八年级的平均成绩为73.95分，达到合格等级的人数有343人，合格率为88.16%，达到优秀和良好等级的人数有114人，优良率为29.74%；九年级的平均成绩为77.63分，达到合格等级的人数有271人，合格率为94.10%，达到优秀和良好等级的人数有124人，优良率为42.7%；相比本区域其他学校，优势项目有800米跑，50米跑和一分钟仰卧起坐，其中800米跑平均成绩为3分8秒，平均得分为80分，50米跑平均成绩为8.69s，平均得分为77分，一分钟仰卧起坐平均成绩为40次，平均得分为80分。',
      ydjnReportSmall:'2019学年第二学期运动技能/体能考核中，共组织18个不同的项目进行考核，其中技能项目有14个，体能项目4个；运动技能/体能全校的考核平均成绩为81.23分，优秀率为8%，良好率为76%，及格率为13，优良率为84%，合格率为98%，完成成都市教育局体育与健康对运动技能/体能的教学要求；相比其他学校，特长项目为小篮球，特色项目为徒手操。',
      ydjnReportMiddle:'2019学年第二学期运动技能/体能考核中，共组织4个不同类别项目进行考核，其中技能项目3个，包含足球运球，肩肘倒立前滚成蹲立，50米跑；体能项目1个，为立定跳远；运动技能/体能考核中，仅对七年级8个班级，共384人进行考核，七年级平均成绩为90.43分，达到优秀等级的人数有227人，优秀率为59%，达到良好等级的人数有146人，良好率为38%，达到及格等级的人数有8人，及格率为2%，达到优秀和良好等级的人数有373，优良率为84%，达到合格等级的人数有384人，合格率为100%；相比其他学校，优势项目为足球，共有384人参与学习，平均成绩为96.15分；特色项目为肩肘倒立前滚成蹲立，共有384人参与学习，平均成绩为93.55分。',
      jkzsReportSmall: '2019学年第二学期健康知识考核中，组织全校学生进行开卷健康知识考试，就考试情况来看，各年级平均分差异偏大，其中年级平均分最高的为六年级，六年级男生平均分为88.12，女生平均分为87.1；年级平均分最低的为一年级，一年级男生的平均分为76.59，女生平均分为86.62；全校健康知识平均分为83.34，其中合格率为98%，优良率为68.08%，完成成都市教育局体育与健康—健康知识的教学要求。',
      jkzsReportMiddle: '2019学年第二学期健康知识考核中，全校共一个年级（七年级），8个班，384人完成考核，免试0人，平均考核成绩为93.5分，达到优秀等级的人数有303人，优秀率为79.43%，达到良好等级的人数有65人，良好率为16.93%，达到及格等级的人数有12人，及格率为3.12%，达到优秀和良好的人数有368人，优良率为96.36%；达到合格等级的人数有380人，合格率为99.48%。',
      xxtdReportSmall: '2019学年第二学期学习态度考核中，全校整体得分较高，只有少量的缺勤、违反纪律学生；其中学习态度成绩最好的为一年级学生，全年级仅有4次扣分，一次迟到，一次早退，一次违反纪律和一次事假，年级平均分为99.95；学习态度扣分明细中，迟到占较大比例，为20%。',
      xxtdReportMiddle: '2019学年第二学期学习态度考核中，全校学生学习态度表现良好，但仍有少量缺勤和违反纪律的学生；全校共2个年级（七年级和八年级）有学习态度扣分，其中有3次迟到，5次课堂违反纪律和4次大课间违反纪律，主要集中在七年级，有2次大课间缺席，主要集中在八年级，有7次事假，其中七年级5次，八年级2次，以及47次病假，七年级27次，八年级20次。',
      khzyReportSmall: '2019学年第二学期课后作业考核中，学校为每个年级设置不同锻炼项目，学校总体完成率较高，完成成都市教育局体育与健康对课后作业的教学要求；根据学生锻炼情况统计，学生大致每天锻炼时长为半小时，锻炼项目为4个。',
      khzyReportMiddle: '2019学年第二学期课后作业考核中，仅七年级，8个班级，384人（1人免试），均由教师通过系统完成考核，七年级平均成绩为100分，学生课后作业完成率为100%；据统计，七年级的男生平均每天锻炼时长为22.65分钟，女生平均每天锻炼时长为22.65分钟。',
      columns1: [
        // 学校基本情况
        { title: "学期", key: "yearSemester", align: "center" },
        { title: "教师人数", key: "teacherCount", align: "center" },
        { title: "学生人数", key: "studentCount", align: "center" },
        { title: "体质健康平均分", key: "tzjkScore", align: "center" },
        { title: "体质健康合格率", key: "tzcsPassRate", align: "center" },
        { title: "体质健康优良率", key: "tzcsylv", align: "center" },
        { title: "学科评价平均分", key: "xkpjScore", align: "center" },
        { title: "学科评价合格率", key: "xkpjhgv", align: "center" },
        { title: "学科评价优良率", key: "xkpylv", align: "center" },
        {title: "学年体育素质综合评价平均成绩",key: "zhpjScore",align: "center",},
        {title: "体育素质综合评价在本区内的排名",key: "areaRanking",align: "center", render: (h, params) => {
          let data = params.row.areaRanking
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
        }},
        {title: "体育素质综合评价在本市内的排名",key: "cityRanking",align: "center",render: (h, params) => {
          let data = params.row.cityRanking
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
        }},
      ],
      data1Small: [
        // 学校基本情况-小学
        {
          yearSemester: "2019学年第二学期",
          teacherCount: 5,
          studentCount: 352,
          tzjkScore: 86.05,
          tzcsPassRate: "98.58%",
          tzcsylv: "73.58%",
          xkpjScore: 84.27,
          xkpjhgv: "99.15%",
          xkpylv: "77.56%",
          zhpjScore: 85.16,
          areaRanking: [26, 8],
          cityRanking: [329, 37],
        },
      ],
      data1Middle: [
        // 学校基本情况-初中
        {
          yearSemester: "2019学年第二学期",
          teacherCount: 8,
          studentCount: 1064,
          tzjkScore: 76.14,
          tzcsPassRate: "92.85%",
          tzcsylv: "38.32%",
          xkpjScore: 40.22,
          xkpjhgv: "36.09%",
          xkpylv: "13.63%",
          zhpjScore: 58.18,
          areaRanking: [58, 8],
          cityRanking: [518, 37],
        },
      ],
      data2Small: [ // 各年级体质测试平均成绩 - 小学
        {grade: "一年级",tzcsCount: 59,noTestCount: 0,bmipjcj: 16.83,bmipjdf: '89.15',fhlpjcj: "1331ml",fhlpjdf: 83.92,fiftypjcj: "10.87s",fiftypjdf: 77.9,zwtqqpjcj: "8.78cm",zwtqqpjdf: 71.49,oneminywqzpjcj: "—",oneminywqzpjdf: "—",onemintspjcj: "91次",onemintspjdf: 84.73,backAndForthpjcj: "—",backAndForthpjdf: "—"},
        {grade: "二年级",tzcsCount: 60,noTestCount: 0,bmipjcj: 19.41,bmipjdf: '80.00',fhlpjcj: "1501ml",fhlpjdf: 83.73,fiftypjcj: "8.52s",fiftypjdf: 98.08,zwtqqpjcj: "8.53cm",zwtqqpjdf: 72.23,oneminywqzpjcj: "—",oneminywqzpjdf: "—",onemintspjcj: "122次",onemintspjdf: 97.97,backAndForthpjcj: "—",backAndForthpjdf: "—"},
        {grade: "三年级",tzcsCount: 59,noTestCount: 0,bmipjcj: 16.38,bmipjdf: 91.86,fhlpjcj: "1683ml",fhlpjdf: 84.75,fiftypjcj: "8.42s",fiftypjdf: 97,zwtqqpjcj: "9.68cm",zwtqqpjdf: 75.37,oneminywqzpjcj: "48次",oneminywqzpjdf: 89.27, onemintspjcj: "126次",onemintspjdf: 94.44,backAndForthpjcj: "—",backAndForthpjdf: "—"},
        {grade: "四年级",tzcsCount: 56,noTestCount: 0,bmipjcj: 19.97,bmipjdf: 86.07,fhlpjcj: "1856ml",fhlpjdf: 83.52,fiftypjcj: "8.52s",fiftypjdf: 92.61,zwtqqpjcj: "11.05cm",zwtqqpjdf: 79.82,oneminywqzpjcj: "40次",oneminywqzpjdf: 83.82,onemintspjcj: "114次",onemintspjdf: 81.2,backAndForthpjcj: "—",backAndForthpjdf: "—"},
        {grade: "五年级",tzcsCount: 58,noTestCount: 0,bmipjcj: 18.92,bmipjdf: 93.45,fhlpjcj: "2027ml",fhlpjdf: 81.03,fiftypjcj: "8.75s",fiftypjdf: 86.5,zwtqqpjcj: "10.82cm",zwtqqpjdf: 78.59,oneminywqzpjcj: "35次",oneminywqzpjdf: 76.57,onemintspjcj: "123次",onemintspjdf: 82.02,backAndForthpjcj: "1’49”",backAndForthpjdf: 84.62},
        {grade: "六年级",tzcsCount: 60,noTestCount: 0,bmipjcj: 17.17,bmipjdf: 93.67,fhlpjcj: "2204ml",fhlpjdf: 77.45,fiftypjcj: "8.66s",fiftypjdf: 83.67,zwtqqpjcj: "9.94cm",zwtqqpjdf: 75.48,oneminywqzpjcj: "39次",oneminywqzpjdf:79.93,onemintspjcj: "124次",onemintspjdf: 74.97,backAndForthpjcj: "1’51”",backAndForthpjdf: 76.3},
      ],
      columns2Small: [ // 各年级体质测试平均成绩 - 小学
        { title: "年级", key: "grade", align: "center" },
        { title: "体质测试总人数", key: "tzcsCount", align: "center" },
        { title: "免试人数", key: "noTestCount", align: "center" },
        { title: "BMI平均成绩", key: "bmipjcj", align: "center" },
        { title: "BMI平均得分", key: "bmipjdf", align: "center" },
        { title: "肺活量平均成绩", key: "fhlpjcj", align: "center" },
        { title: "肺活量平均得分", key: "fhlpjdf", align: "center" },
        { title: "50米跑平均成绩", key: "fiftypjcj", align: "center" },
        { title: "50米跑平均得分", key: "fiftypjdf", align: "center" },
        { title: "坐位体前屈平均成绩", key: "zwtqqpjcj", align: "center" },
        { title: "坐位体前屈平均得分", key: "zwtqqpjdf", align: "center" },
        {
          title: "一分钟仰卧起坐平均成绩",
          key: "oneminywqzpjcj",
          align: "center",
        },
        {
          title: "一分钟仰卧起坐平均得分",
          key: "oneminywqzpjdf",
          align: "center",
        },
        { title: "一分钟跳绳平均成绩", key: "onemintspjcj", align: "center" },
        { title: "一分钟跳绳平均得分", key: "onemintspjdf", align: "center" },
        {
          title: "50米X8往返跑平均成绩",
          key: "backAndForthpjcj",
          align: "center",
        },
        {
          title: "50米X8往返跑平均得分",
          key: "backAndForthpjdf",
          align: "center",
        },
      ],
      data2Middal: [ // 各年级体质测试平均成绩 - 中学
        {
          grade: "七年级",
          tzcsCount: 384, // 体质测试总人数
          noTestCount: 3, // 免试人数
          bmipjcj: 19.61, // BMI平均成绩
          bmipjdf: 93.43, // BMI平均得分
          fhlpjcj: "2342ml", // 肺活量平均成绩
          fhlpjdf: 72.91, // 肺活量平均得分
          fiftypjcj: "8.81s", // 50米跑平均成绩
          fiftypjdf: 78.97, // 50米跑平均得分
          ldtypjcj:'177cm', // 立定跳远平均成绩
          ldtypjdf:75.33, // 立定跳远平均得分
          zwtqqpjcj: "11.2cm", // 坐位体前屈平均成绩
          zwtqqpjdf: 78.03, // 坐位体前屈平均得分
          eightpjcj: '4’3”', // 800米平均成绩
          eightpjdf: 81.18, // 800米平均得分
          oneminywqzpjcj: "43次", // 一分钟仰卧起坐平均成绩
          oneminywqzpjdf: 85.68, // 一分钟仰卧起坐平均得分
          onethousandpjcj: "4’49”",// 1000米平均成绩
          onethousandpjdf: 71.57, // 1000米平均得分
          ytxspjcj: "3次", // 引体向上平均成绩
          ytxspjdf: 31.96 // 引体向上平均得分
        },
        {
          grade: "八年级",
          tzcsCount: 390, // 体质测试总人数
          noTestCount: 0, // 免试人数
          bmipjcj: '20.28', // BMI平均成绩
          bmipjdf: 91.79, // BMI平均得分
          fhlpjcj: "2472ml", // 肺活量平均成绩
          fhlpjdf: 68.92, // 肺活量平均得分
          fiftypjcj: "8.92s", // 50米跑平均成绩
          fiftypjdf: 75.13, // 50米跑平均得分
          ldtypjcj:'180cm', // 立定跳远平均成绩
          ldtypjdf:69.12, // 立定跳远平均得分
          zwtqqpjcj: "11.3cm", // 坐位体前屈平均成绩
          zwtqqpjdf: 75.62, // 坐位体前屈平均得分
          eightpjcj: '3’58”', // 800米平均成绩
          eightpjdf: 80.62, // 800米平均得分
          oneminywqzpjcj: "38次", // 一分钟仰卧起坐平均成绩
          oneminywqzpjdf: 77.06, // 一分钟仰卧起坐平均得分
          onethousandpjcj: "4’35”",// 1000米平均成绩
          onethousandpjdf: 70.3, // 1000米平均得分
          ytxspjcj: "3次", // 引体向上平均成绩
          ytxspjdf: 28.87 // 引体向上平均得分
        },
        {
          grade: "九年级",
          tzcsCount: 288, // 体质测试总人数
          noTestCount: 0, // 免试人数
          bmipjcj: 20.12, // BMI平均成绩
          bmipjdf: 94.1, // BMI平均得分
          fhlpjcj: "2790ml", // 肺活量平均成绩
          fhlpjdf:70.9, // 肺活量平均得分
          fiftypjcj: "8.35s", // 50米跑平均成绩
          fiftypjdf: 80.98, // 50米跑平均得分
          ldtypjcj:'201cm', // 立定跳远平均成绩
          ldtypjdf:77.31, // 立定跳远平均得分
          zwtqqpjcj: "12.6cm", // 坐位体前屈平均成绩
          zwtqqpjdf: 75.58, // 坐位体前屈平均得分
          eightpjcj: '3’52”', // 800米平均成绩
          eightpjdf: 81.6, // 800米平均得分
          oneminywqzpjcj: "42次", // 一分钟仰卧起坐平均成绩
          oneminywqzpjdf:81.18, // 一分钟仰卧起坐平均得分
          onethousandpjcj: "4’14”",// 1000米平均成绩
          onethousandpjdf: 76.13, // 1000米平均得分
          ytxspjcj: "4次", // 引体向上平均成绩
          ytxspjdf: 34.54 // 引体向上平均得分
        },
      ],
      columns2Middal: [ // 各年级体质测试平均成绩 - 中学
        { title: "年级", key: "grade", align: "center" },
        { title: "体质测试总人数", key: "tzcsCount", align: "center" },
        { title: "免试人数", key: "noTestCount", align: "center" },
        { title: "BMI平均成绩", key: "bmipjcj", align: "center" },
        { title: "BMI平均得分", key: "bmipjdf", align: "center" },
        { title: "肺活量平均成绩", key: "fhlpjcj", align: "center" },
        { title: "肺活量平均得分", key: "fhlpjdf", align: "center" },
        { title: "50米跑平均成绩", key: "fiftypjcj", align: "center" },
        { title: "50米跑平均得分", key: "fiftypjdf", align: "center" },
        { title: "立定跳远平均成绩", key: "ldtypjcj", align: "center" },
        { title: "立定跳远平均得分", key: "ldtypjdf", align: "center" },
        { title: "坐位体前屈平均成绩", key: "zwtqqpjcj", align: "center" },
        { title: "坐位体前屈平均得分", key: "zwtqqpjdf", align: "center" },
        { title: "800米平均成绩", key: "eightpjcj", align: "center" },
        { title: "800米平均得分", key: "eightpjdf", align: "center" },
        {title: "一分钟仰卧起坐平均成绩",key: "oneminywqzpjcj",align: "center"},
        {title: "一分钟仰卧起坐平均得分",key: "oneminywqzpjdf",align: "center",},
        { title: "1000米平均成绩", key: "onethousandpjcj", align: "center" },
        {title: "1000米平均得分",key: "onethousandpjdf",align: "center",},
        {title: "引体向上平均成绩",key: "ytxspjcj",align: "center",},
        {title: "引体向上平均得分",key: "ytxspjdf",align: "center",},
      ],
      data3Small: [ // 各年级运动技能/体能平均成绩 - 小学
        {
          id: 1,
          grade: '一年级',
          type: ['运动技能', '体能'],
          project: ['连续前滚翻', '徒手操', '30米跑'],
          content: ['连续前滚翻', '徒手操', '30米跑'],
          count: [59,59,59],
          noTest: [0,0,0],
          pjdf: [82.53,80.97,79.95],
          hglv: ['98.31%', '100%', '96.61%'],
          yllv: ['74.57%', '74.58%', '64.24%']
        },
        {
          id: 2,
          grade: '二年级',
          type: ['运动技能', '体能'],
          project: ['连续前滚翻', '徒手操', '30米跑'],
          content: ['连续前滚翻', '徒手操', '30米跑'],
          count: [60,60,60],
          noTest: [0,0,0],
          pjdf: [80.66,86.22,78.42],
          hglv: ['96.61%', '100%', '94.92%'],
          yllv: ['61.11%', '75%', '45.76%']
        },
        {
          id: 3,
          grade: '三年级',
          type: ['运动技能', '体能'],
          project: ['50米跑', '跪跳起', '原地运球（小篮球）', '400米跑'],
          content: ['50米跑', '跪跳起', '原地运球（小篮球）', '400米跑'],
          count: [59,59,59, 59],
          noTest: [0,0,0,0],
          pjdf: [86.83,82.24,84.49,79.58],
          hglv: ['96.61%', '100%', '100%', '91.53%'],
          yllv: ['74.57%', '71.18%', '79.66%', '66.1%']
        },
        {
          id: 4,
          grade: '四年级',
          type: ['运动技能', '体能'],
          project: ['跳上成支撑，前翻下', '一分钟跳绳', '行进间运球（小篮球）', '50米跑'],
          content: ['跳上成支撑，前翻下', '一分钟跳绳', '行进间运球（小篮球）', '50米跑'],
          count: [56 ,56,56,56],
          noTest: [0,0,0,0],
          pjdf: [83.29,82.36,84.54,86.39],
          hglv: ['96.43%', '100%', '98.21%', '96.43%'],
          yllv: ['75%', '58.93%', '69.64%','66.07%']
        },
        {
          id: 5,
          grade: '五年级',
          type: ['运动技能', '体能'],
          project: ['跳远', '篮球运球（小篮球）', '前滚翻两腿交叉转体180°-后滚翻成跪立-跪跳起','20秒立卧撑'],
          content: ['跳远', '篮球运球（小篮球）', '前滚翻两腿交叉转体180°-后滚翻成跪立-跪跳起','20秒立卧撑'],
          count: [58,58,58,58],
          noTest: [0,0,0,0],
          pjdf: [78.95,85.12,79.72,81.29],
          hglv: ['89.66%', '96.55%', '94.83%','94.83%'],
          yllv: ['53.45%', '74.13%', '53.44%', '58.62%']
        },
        {
          id: 6,
          grade: '六年级',
          type: ['运动技能', '体能'],
          project: ['单杠仰卧悬垂臂屈伸', '篮球运球（小篮球）', '50米X8往返跑', '50米跑'],
          content: ['单杠仰卧悬垂臂屈伸', '篮球运球（小篮球）', '50米X8往返跑', '50米跑'],
          count: [60,60,60,60],
          noTest: [0,0,0,0],
          pjdf: [87.83,75.55,77.15,74.93],
          hglv: ['100%', '88.33%', '100%','98.33%'],
          yllv: ['75.86%','51.67%','33.33%','30%']
        }
      ],
      data3Middle: [ // 各年级运动技能/体能平均成绩 - 初中
        {
          id: 1,
          grade: '七年级',
          type: ['运动技能', '体能'],
          project: ['足球运球', '肩肘倒立前滚成蹲立', '50米跑','立定跳远'],
          content: ['足球运球', '肩肘倒立前滚成蹲立', '50米跑','立定跳远'],
          count: [384,384,384,384],
          noTest: [2,2,2,2],
          pjdf: [96.15,93.55,86.82,85.63],
          hglv: ['100%', '100%', '100%','99.21%'],
          yllv: ['97.03%', '98.17%', '68.58%','77.22%']
        },
        // {
        //   id: 2,
        //   grade: '八年级',
        //   type: ['运动技能', '体能'],
        //   project: ['篮球全场绕杆上篮4次', '健美操', '立定跳远','掷实心球'],
        //   content: ['篮球全场绕杆上篮4次', '健美操', '立定跳远','掷实心球'],
        //   count: [136,136,136,136],
        //   noTest: [0,0,0,0],
        //   pjdf: [86.32,84.68,72.93,80.54],
        //   hglv: ['91.18%', '96.32%', '86.76%','90.44%'],
        //   yllv: ['84.56%', '69.85%', '40.44%','58.83%']
        // },
        // {
        //   id: 3,
        //   grade: '九年级',
        //   type: ['运动技能', '体能'],
        //   project: ['发球技术', '体操-成套动作', '跳远', '50米跑'],
        //   content: ['发球技术', '体操-成套动作', '跳远', '50米跑'],
        //   count: [12,12,12, 12],
        //   noTest: [0,0,0,0],
        //   pjdf: [83.75,82,82.42,47.92],
        //   hglv: ['100%', '100%','100%','58.33%'],
        //   yllv: ['91.67%','50%','66.67%','16.66%']
        // }
      ],
      columns3Small: [ // 各年级运动技能/体能平均成绩 - 小学
        {title: '年级', key: 'grade', align: 'center'},
        {title: '类型', key: 'type', align: 'center',width: 140, render: (h, params) => {
          let typeList = params.row.type
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              typeList.map((item, index) => {
                if (index === 1) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec',width:'140px'}
                  }, item)
                } else {
                  return h('div', {
                    style: {
                      minHeight: params.row.id == 1 ||params.row.id == 2 ? '100px' : '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '项目', key: 'project', align: 'center',width: 250, render: (h, params) => {
          let projectList = params.row.project
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              projectList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '考核内容', key: 'content', align: 'center',width: 250,  render: (h, params) => {
          let contentList = params.row.content
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              contentList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '考核人数', key: 'count', align: 'center', render: (h, params) => {
          let countList = params.row.count
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              countList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '免试人数', key: 'noTest', align: 'center', render: (h, params) => {
          let noTestList = params.row.noTest
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              noTestList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '平均得分', key: 'pjdf', align: 'center', render: (h, params) => {
          let pjdfList = params.row.pjdf
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              pjdfList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '合格率', key: 'hglv', align: 'center', render(h, params) {
          let hglvList = params.row.hglv
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              hglvList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '优良率', key: 'yllv', align: 'center', render(h, params) {
          let yllvList = params.row.yllv
          return h('div',
            {
              style: {
                height: params.row.id == 1 || params.row.id == 2 ? '150px' : '200px',
              }
            },
            [
              yllvList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }}
      ],
      columns3Middle: [ // 各年级运动技能/体能平均成绩
        {title: '年级', key: 'grade', align: 'center'},
        {title: '类型', key: 'type', align: 'center',width: 140, render: (h, params) => {
          let typeList = params.row.type
          return h('div',
            {
              style: {
                height: '200px',
              }
            },
            [
              typeList.map((item, index) => {
                if (index === 1) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec',width:'140px'}
                  }, item)
                } else {
                  return h('div', {
                    style: {
                      minHeight:'150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '项目', key: 'project', align: 'center',width: 250, render: (h, params) => {
          let projectList = params.row.project
          return h('div',
            {
              style: {
                height: '200px',
              }
            },
            [
              projectList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '考核内容', key: 'content', align: 'center',width: 250,  render: (h, params) => {
          let contentList = params.row.content
          return h('div',
            {
              style: {
                height:'200px',
              }
            },
            [
              contentList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '考核人数', key: 'count', align: 'center', render: (h, params) => {
          let countList = params.row.count
          return h('div',
            {
              style: {
                height:'200px',
              }
            },
            [
              countList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '免试人数', key: 'noTest', align: 'center', render: (h, params) => {
          let noTestList = params.row.noTest
          return h('div',
            {
              style: {
                height: '200px',
              }
            },
            [
              noTestList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '平均得分', key: 'pjdf', align: 'center', render: (h, params) => {
          let pjdfList = params.row.pjdf
          return h('div',
            {
              style: {
                height:'200px',
              }
            },
            [
              pjdfList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '合格率', key: 'hglv', align: 'center', render(h, params) {
          let hglvList = params.row.hglv
          return h('div',
            {
              style: {
                height:'200px',
              }
            },
            [
              hglvList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }},
        {title: '优良率', key: 'yllv', align: 'center', render(h, params) {
          let yllvList = params.row.yllv
          return h('div',
            {
              style: {
                height:'200px',
              }
            },
            [
              yllvList.map((item, index) => {
                if (index === 0) {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}
                  }, item)
                } else {
                  return h('div', {
                    style: {minHeight:'50px',display: 'flex',alignItems: 'center',justifyContent: 'center',borderTop: '1px solid #e8eaec'}
                  }, item)
                }
              })
            ]
          )
        }}
      ],
      data4Small: [ // 各年级健康知识成绩-小学
        {grade: '一年级',testCount: 59,noTest:0,pjf:82,yxlv:'35.59%',lhlv: '25.42%',jglv: '23.73%',bjglv: '15.26%',hglv:'84.74%',yllv:'61.01%'},
        {grade: '二年级',testCount: 60,noTest:7,pjf:82.7,yxlv:'36.67%',lhlv: '36.67%',jglv: '13.33%',bjglv: '13.33%',hglv:'86.67%',yllv:'73.34%'},
        {grade: '三年级',testCount: 59,noTest:5,pjf:83.9,yxlv:'40.68%',lhlv: '35.59%',jglv: '11.86%',bjglv: '11.87%',hglv:'88.13%',yllv:'76.27%'},
        {grade: '四年级',testCount: 56,noTest:6,pjf:81.1,yxlv:'41.07%',lhlv: '28.57%',jglv: '19.64%',bjglv: '10.72%',hglv:'89.28%',yllv:'69.64%'},
        {grade: '五年级',testCount: 58,noTest:6,pjf:84.1,yxlv:'41.38%',lhlv: '25.86%',jglv: '22.41%',bjglv: '10.35%',hglv:'89.65%',yllv:'67.24%'},
        {grade: '六年级',testCount: 60,noTest:12,pjf:86.2,yxlv:'68.33%',lhlv: '15.00%',jglv: '8.33%',bjglv: '8.34%',hglv:'91.66%',yllv:'83.33%'}
      ],
      data4Middle: [ // 各年级健康知识成绩-初中
        {grade: '七年级',testCount: 384,noTest:0,pjf:93.5,yxlv:'79.43%',lhlv: '16.93%',jglv: '3.12%',bjglv: '0.52%',hglv:'99.48%',yllv:'96.36%'},
        // {grade: '八年级',testCount: 136,noTest:0,pjf:89.2,yxlv:'46.33%',lhlv: '53.67%',jglv: '0%',bjglv: '0%',hglv:'100%',yllv:'100%'},
        // {grade: '九年级',testCount: 12,noTest:0,pjf:94.3,yxlv:'100%',lhlv: '0%',jglv: '0%',bjglv: '0%',hglv:'100%',yllv:'100%'}
      ],
      columns4: [
        {title: '年级', key: 'grade', align:'center'},
        {title: '考核人数', key: 'testCount', align:'center'},
        {title: '免试人数', key: 'noTest', align:'center'},
        {title: '平均分', key: 'pjf', align:'center'},
        {title: '优秀率', key: 'yxlv', align:'center'},
        {title: '良好率', key: 'lhlv', align:'center'},
        {title: '及格率', key: 'jglv', align:'center'},
        {title: '不及格率', key: 'bjglv', align:'center'},
        {title: '合格率', key: 'hglv', align:'center'},
        {title: '优良率', key: 'yllv', align:'center'},
      ],
      data5SmallSchool: [
        {grade: '一年级',testCount: 59,noTest:0,pjdf:89.15,boyExerciseTime:38.02,girlExerciseTime: 38.18,boyExerciseCount: 3,girlExerciseCount: 4},
        {grade: '二年级',testCount: 53,noTest:7,pjdf:88.33,boyExerciseTime:29.11,girlExerciseTime: 28.66,boyExerciseCount: 4,girlExerciseCount: 4},
        {grade: '三年级',testCount: 53,noTest:6,pjdf:89.83,boyExerciseTime:28.97,girlExerciseTime: 29.01,boyExerciseCount: 4,girlExerciseCount: 3},
        {grade: '四年级',testCount: 50,noTest:6,pjdf:57.14,boyExerciseTime:28.70,girlExerciseTime: '28.70',boyExerciseCount: 4,girlExerciseCount: 3},
        {grade: '五年级',testCount: 52,noTest:6,pjdf:89.66,boyExerciseTime:28.89,girlExerciseTime: 28.89,boyExerciseCount: 4,girlExerciseCount: 4},
        {grade: '六年级',testCount: 57,noTest:3,pjdf:'95.00',boyExerciseTime:29.09,girlExerciseTime: 29.13,boyExerciseCount: 4,girlExerciseCount: 4}
      ],
      data5MiddleSchool: [
        {grade: '七年级',testCount: 384,noTest:1,pjdf:99.9,boyExerciseTime:'22.65',girlExerciseTime:22.66,boyExerciseCount: 4,girlExerciseCount: 3},
        // {grade: '八年级',testCount: 136,noTest:0,pjdf:'90.20',boyExerciseTime:68.19,girlExerciseTime:68.14,boyExerciseCount: 4,girlExerciseCount: 4},
        // {grade: '九年级',testCount: 12,noTest:0,pjdf:85.19,boyExerciseTime:27.37,girlExerciseTime:26.52,boyExerciseCount: 4,girlExerciseCount: 5},
      ],
      columns5: [
        {title: '年级', key: 'grade', align:'center'},
        {title: '考核人数', key: 'testCount', align:'center'},
        {title: '免试人数', key: 'noTest', align:'center'},
        {title: '平均得分', key: 'pjdf', align:'center'},
        {title: '男生平均每天锻炼时长（分钟）', key: 'boyExerciseTime', align:'center'},
        {title: '女生平均每天锻炼时长（分钟）', key: 'girlExerciseTime', align:'center'},
        {title: '男生平均每天锻炼项目个数', key: 'boyExerciseCount', align:'center'},
        {title: '女生平均每天锻炼项目个数', key: 'girlExerciseCount', align:'center'}
      ],
      bestResultProjectSmall: ['50米跑','1分钟跳绳', '肺活量'], // 成绩优异项目 - 小学
      bestResultProjectMiddle: ['50米跑','800米跑','一分钟仰卧起坐'], // 成绩优异项目 - 初中
      averageResultSmall: ['8.96s', '117个', '1767ml'],// 成绩优异项目-平均成绩 - 小学
      averageResultMiddle: ['8.69s','3′8″',  '40次'],// 成绩优异项目-平均成绩 - 初中
      averageScoreSmall: ['89分', '83分', '82分'], // 成绩优异项目-平均得分 - 小学
      averageScoreMiddle: ['77分', '80分', '80分'] // 成绩优异项目-平均得分 - 初中
    };
  },
  mounted() {
    /** 体质健康 */
    this.initChart1(); // 男生/女生平均分 - 柱形图
    this.initChart2(); // 男生等级图形分布 - 饼图
    this.initChart3(); // 女生等级图形分布 - 饼图
    this.initChart4(); // 各项目平均分 - 柱形图

    /** 运动技能/体能 */
    this.initChart5(); // 男生等级图形分布 - 饼图
    this.initChart6(); // 女生等级图形分布 - 饼图
    this.initChart7(); // 技能/体能项目分布 - 雷达图

    /** 健康知识 */
    this.initChart8() // 健康知识 —— 平均分 - 柱形图
    this.initChart9(); // 健康知识 —— 等级图形分布 - 饼图

    /** 学习态度 */
    this.initChart10() // 学习态度 —— 平均分 - 柱形图
    this.initChart11(); // 学习态度 —— 学习态度扣分明细 - 饼图

    /** 课后作业 */
    this.initChart12() // 课后作业 —— 男生等级图形分布 - 饼图
    this.initChart13() // 课后作业 —— 女生等级图形分布 - 饼图
    this.initChart14() // 课后作业 —— 运动能力分布 - 雷达
  },
  methods: {
    /** 体质健康 —— 男生/女生平均分 - 柱形图 */
    initChart1() {
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let {schoolType} = this
      myChart1.setOption(
        {
          title: {
            text: "",
            x: "center",
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          color: "#6FB595",
          xAxis: {
            type: "category",
            data: ["男生", "女生"],
          },
          yAxis: {
            name:'平均分',
            type: "value",
          },
          series: [
            {
              data: schoolType === '2' ? [86, 85] : [72,79],
              type: "bar",
              barCategoryGap: "50%", //柱图间距
              barWidth: 50, //柱图宽度
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        },
        true
      );
    },
    /** 体质健康 —— 男生图形等级分布 - 饼图 */
    initChart2() {
      var myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let {schoolType} = this
      let dataSmall = [
        { value: 31, name: "优秀数" },
        { value: 37, name: "良好数" },
        { value: 30, name: "及格数" },
        { value: 2, name: "不及格数" },
      ]
      let dataMiddle = [
        { value: 5, name: "优秀数" },
        { value: 22, name: "良好数" },
        { value: 61, name: "及格数" },
        { value: 12, name: "不及格数" },
      ]
      myChart2.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? dataSmall : dataMiddle,
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
    /** 体质健康 —— 女生图形等级分布 - 饼图 */
    initChart3() {
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      let {schoolType} = this
      let dataSmall = [
        { value: 29, name: "优秀数" },
        { value: 49, name: "良好数" },
        { value: 19, name: "及格数" },
        { value: 3, name: "不及格数" },
      ]
      let dataMiddle = [
        { value: 11, name: "优秀数" },
        { value: 39, name: "良好数" },
        { value: 47, name: "及格数" },
        { value: 3, name: "不及格数" },
      ]
      myChart.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? dataSmall : dataMiddle,
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
    /** 体质健康 —— 各项目平均分 - 柱形图 */
    initChart4() {
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      let {schoolType} = this
      let girlSmall = [76, 87, 79, 84, 80, 77]
      let boySmall = [88, 91, 71, 82, 84, 83]
      let girlMiddle = [71,75,74,78,80,80,'','']
      let boyMiddle = [69,79,71,73,'','',71, 31]
      let projectSmall = ["肺活量","50米跑","坐位体前屈","一分钟跳绳","一分钟仰卧起坐","50米x8往返跑",] // 初中项目
      let projectMiddle = ["肺活量","50米跑","立定跳远","坐位体前屈","800米跑(女)","一分钟仰卧起坐(女)","1000米跑(男)","引体向上(男)"]
      myChart.setOption({
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
          data: ["女生", "男生"],
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
            data: schoolType === '2' ? girlSmall : girlMiddle,
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
            data: schoolType === '2' ? boySmall : boyMiddle,
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
    /** 运动技能/体能 —— 男生图形等级分布 - 饼图 */
    initChart5() {
      var myChart5 = this.$echarts.init(document.getElementById("myChart5"));
      let {schoolType} = this
      let dataSmall = [
        { value: 27, name: "优秀数" },
        { value: 31, name: "良好数" },
        { value: 39, name: "及格数" },
        { value: 3, name: "不及格数" },
      ]
      let dataMiddle =  [
        { value: 61.8, name: "优秀数" },
        { value: 34.17, name: "良好数" },
        { value: 4.03, name: "及格数" },
        { value: 0, name: "不及格数" },
      ]
      myChart5.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? dataSmall : dataMiddle,
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
    /** 运动技能/体能 —— 女生图形等级分布 - 饼图 */
    initChart6() {
      let myChart = this.$echarts.init(document.getElementById("myChart6"));
      let {schoolType} = this
      let dataSmall = [
        { value: 19, name: "优秀数" },
        { value: 41, name: "良好数" },
        { value: 38, name: "及格数" },
        { value: 2, name: "不及格数" },
      ]
      let dataMiddle =  [
        { value: 56.21, name: "优秀数" },
        { value: 42.7, name: "良好数" },
        { value: 1.09, name: "及格数" },
        { value: 0, name: "不及格数" },
      ]
      myChart.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? dataSmall : dataMiddle,
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
    /** 运动技能/体能 —— 技能/体能项目分布 - 雷达图 */
    initChart7 () {
      let myChart = this.$echarts.init(document.getElementById("myChart7"));
      let {schoolType} = this
      let girlSmall = [72.36, 87.29, 0, 76.62, 81.37, 67.57]
      let boySmall = [83.24,72.95,0,74.48,78.43,81.56]
      let girlMiddle = [72.36, 87.29, 0, 76.62, 81.37, 67.57]
      let boyMiddle = [83.24, 72.95, 0, 74.48, 74.43, 81.56]
      myChart.setOption(
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
            data: ["女生", "男生"],
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
                value: schoolType === '2' ? girlSmall : girlMiddle,
                name: '女生',
                //在拐点处显示数值
                label: {
                  normal: {
                    position: 'left',
                    show: true,
                    distance: 20,
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
                value: schoolType === '2' ? boySmall : boyMiddle,
                name: '男生',
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: '#6FB595' // 填充的颜色。[ default: "#000" ]
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    distance: 20,
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
    /** 健康知识 - 平均分 - 柱形图 */
    initChart8 () {
      let myChart = this.$echarts.init(document.getElementById("myChart8"));
      let {schoolType} = this
      let dataSmall = [83.77, 84.82]
      let dataMiddle = [92.29,94.87]
      myChart.setOption(
        {
          title: {
            text: "",
            x: "center",
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          color: "#6FB595",
          xAxis: {
            type: "category",
            data: ["男生", "女生"],
          },
          yAxis: {
            name:'平均分',
            type: "value",
          },
          series: [
            {
              data: schoolType === '2' ? dataSmall : dataMiddle,
              type: "bar",
              barCategoryGap: "50%", //柱图间距
              barWidth: 50, //柱图宽度
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        },
        true
      );
    },
    /** 健康知识 - 等级图形分布 - 饼图 */
    initChart9 () {
      let myChart = this.$echarts.init(document.getElementById("myChart9"));
      let {schoolType} = this
      const dataSmall = [
        { value: 35, name: "优秀数" },
        { value: 41, name: "良好数" },
        { value: 11, name: "及格数" },
        { value: 13, name: "不及格数" }
      ]
      const dataMiddle = [
        { value: 79.43, name: "优秀数" },
        { value: 16.93, name: "良好数" },
        { value: 3.12, name: "及格数" },
        { value: 0.52, name: "不及格数" }
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
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? dataSmall : dataMiddle,
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
    /** 学习态度 - 平均分 - 柱形图 */
    initChart10 () {
      let myChart = this.$echarts.init(document.getElementById("myChart10"));
      let {schoolType} = this
      const smallSchool = [97.57, 97.70]
      const middleSchool = [99.93, 99.98]
      myChart.setOption(
        {
          title: {
            text: "",
            x: "center",
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          color: "#6FB595",
          xAxis: {
            type: "category",
            data: ["男生", "女生"],
          },
          yAxis: {
            name:'平均分',
            type: "value",
          },
          series: [
            {
              data: schoolType === '2' ? smallSchool : middleSchool,
              type: "bar",
              barCategoryGap: "50%", //柱图间距
              barWidth: 50, //柱图宽度
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        },
        true
      );
    },
    /** 学习态度 - 学习态度扣分明细 - 饼图 */
    initChart11 () {
      let myChart = this.$echarts.init(document.getElementById("myChart11"));
      let {schoolType} = this
      const smallSchool = [
        { value: 5, name: "早退",max:30},
        { value: 6, name: "迟到",max:30 },
        { value: 5, name: "旷课",max:30},
        { value: 0, name: "大课间缺席",max:30 },
        { value: 3, name: "运动着装不符",max:30},
        { value: 3, name: "病假",max:30},
        { value: 4, name: "事假",max:30},
        { value: 4, name: "违反纪律",max:30},
        { value: 0, name: "大课间违反纪律",max:30},
      ]
      const middleSchool = [
        { value: 0, name: "早退",max:9},
        { value: 4.41, name: "迟到",max:9 },
        { value: 0, name: "旷课",max:9},
        { value: 2.95, name: "大课间缺席",max:9 },
        { value: 0, name: "运动着装不符",max:9},
        { value: 69.12, name: "病假",max:9},
        { value: 10.29, name: "事假",max:9},
        { value: 7.35, name: "违反纪律",max:9},
        { value: 5.88, name: "大课间违反纪律",max:9},

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
            right:0,
            itemWidth:14,
            itemHeight:14,
            width:380,
            itemGap: 15,
            align:'auto',
            data: ["早退", "迟到", "旷课", "大课间缺席","运动着装不符","病假", "事假","违反纪律","大课间违反纪律"],
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
    /** 课后作业 —— 男生图形等级分布 - 饼图 */
    initChart12 () {
      var myChart = this.$echarts.init(document.getElementById("myChart12"));
      let {schoolType} = this
      const smallShool = [
        { value: 83.37, name: "优秀数",max:100},
        { value: 10.75, name: "良好数",max:100 },
        { value: 5.88, name: "及格数",max:100 },
        { value: 0, name: "不及格数",max:100 },
      ]
      const middleSchool = [
        { value: 100, name: "优秀数" },
        { value: 0, name: "良好数" },
        { value: 0, name: "及格数" },
        { value: 0, name: "不及格数" },
      ]
      myChart.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? smallShool : middleSchool,
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
    /** 课后作业 —— 女生图形等级分布 - 饼图 */
    initChart13 () {
      let myChart = this.$echarts.init(document.getElementById("myChart13"));
      let {schoolType} = this
      const smallShool = [
        { value: 83.73, name: "优秀数" },
        { value: 12.65, name: "良好数" },
        { value: 3.62, name: "及格数" },
        { value: 0, name: "不及格数" },
      ]
      const middleSchool = [
        { value: 99.45, name: "优秀数" },
        { value: 0, name: "良好数" },
        { value: 0.55, name: "及格数" },
        { value: 0, name: "不及格数" },
      ]
      myChart.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} :  {d}%",
          },
          legend: {
            orient: "horizontal",
            top: 20,
            right:20,
            itemWidth:14,
            itemHeight:14,
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "占比",
              type: "pie",
              radius:['25%','45%'],
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
                      "#73A373",
                      "#EA7E53",
                      "#8DC1A9",
                      "#588D93",
                    ];
                    return colorList[params.dataIndex];
                  },
                },
              },
              labelLine: {
                show: true,
              },
              data: schoolType === '2' ? smallShool : middleSchool,
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
    /** 课后作业 —— 技能/体能项目分布 - 雷达图 */
    initChart14 () {
      let myChart = this.$echarts.init(document.getElementById("myChart14"));
      let {schoolType} = this
      const smallSchoolBoy = [83, 78, 82,82, 71,79]
      const smallSchoolGirl = [72,84,73,71,85,81]
      const middleSchoolBoy = [85,80,84,84,73,82]
      const middleSchoolGirl = [74,88,75,74,86,81]
      myChart.setOption(
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
            data: ["女生","男生"],
            itemWidth:14,
            itemHeight:14,
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
                value: schoolType === '2' ? smallSchoolGirl : middleSchoolGirl,
                name: '女生',
                //在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    position: 'left',
                    distance: 15,
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
                value: schoolType === '2' ? smallSchoolBoy : middleSchoolBoy,
                name: '男生',
                areaStyle: { // 单项区域填充样式
                  normal: {
                    color: '#6FB595' // 填充的颜色。[ default: "#000" ]
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    distance: 15,
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
};
</script>
<style lang="less" scoped>
.kong{
  width:100%;
  height:16px;
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
  .data-title{background: url('../../images/title_line1.png') no-repeat;background-size:cover;}
  .data-title2{background: url('../../images/title_line2.png') no-repeat;background-size:cover;}
  .data-title3{background: url('../../images/title_line3.png') no-repeat;background-size:cover;}
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
        height:80px;
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
    width:240px;
    height:240px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(240,240,240,1);
    border-radius:5px;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    font-size:20px;
  }
}
</style>
