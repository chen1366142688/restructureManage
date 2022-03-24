<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按班级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style="" >年级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass" style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="queryStudentScore">查询</Button>
            </div>
         </div>
      </Card>
      <br/>
      <Card>
       <div style="font-size:18px;height:40px;">
            数据明细
        </div>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
      <TabPane name="first" label="第一学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" @on-sort-change='sortChange' :columns="resultColumns" :data="resultDataFirst"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;">
          <Page :total="totalFirst" :current="pageNumFirst" :page-size="pageSizeFirst" @on-change='pageNumChangeFirst' @on-page-size-change='pageSizechangeFirst' show-total show-sizer></Page>
        </div>
       </TabPane>
       <TabPane name="second" label="第二学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" @on-sort-change='sortChange2' :columns="resultColumns" :data="resultDataSecond"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;">
          <Page :total="totalSecond" :current="pageNumSecond" :page-size="pageSizeSecond" @on-change='pageNumChangeSecond' @on-page-size-change='pageSizechangeSecond' show-total show-sizer></Page>
        </div>
       </TabPane>
        <TabPane  name="year" label="学年">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" @on-sort-change='sortChange3' :columns="resultColumnsYear" :data="resultDataYear"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;">
          <Page :total="totalYear" :current="pageNumYear" :page-size="pageSizeYear" @on-change='pageNumChangeYear' @on-page-size-change='pageSizechangeYear' show-total show-sizer></Page>
        </div>
       </TabPane>
      </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
        selectTabName:'',
      loading:false,
      pageNumYear: 1,
      pageSizeYear: 10,
      totalYear: 0,
      pageNumSecond: 1,
      pageSizeSecond: 10,
      totalSecond: 0,
      pageNumFirst: 1,
      pageSizeFirst: 10,
      totalFirst: 0,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '',
      orderType:"",
      semesterYearList:[],
      firstYearSemester:"",
      secondYearSemester:"",
      orderField:"student_class",
      orderSort:"asc",
      schoolDistrict:"",
      resultColumns: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let text = row.studentClass+"班"
            return h("span", text);
          }
        },
        {
          title: "总人数",
          key: "allCount",
          align: "center",
          sortable:'custom',
          width:110,
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/row.allCount/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/row.allCount/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "技能体能",
          key: "actionScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/row.allCount/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/row.allCount/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试",
          key: "finishCount",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/row.allCount/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-";
              }else{
                  text = text.toFixed(1);
              }
            }
            return h("span", text);
          }
        },
        {
          title: "学期总成绩平均分",
          key: "semesterScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/row.allCount/100;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(row.grade,row.studentClass);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      resultColumnsCD: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let text = row.studentClass+"班"
            return h("span", text);
          }
        },
        {
          title: "总人数",
          key: "allCount",
          align: "center",
          width:110,
          sortable:'custom',
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/row.allCount/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/row.allCount/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/row.allCount/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore/row.allCount/100;
            if(row.staminaScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/row.allCount/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价平均分数",
          key: "semesterScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let learnScore = row.learnScore/row.allCount/100;
            let healthScore = row.healthScore/row.allCount/100;
            let actionScore = row.actionScore/row.allCount/100;
            let staminaScore = row.staminaScore/row.allCount/100;
            let homeworkScore = row.homeworkScore/row.allCount/100;
            let text = learnScore*0.1+healthScore*0.1+actionScore*0.4+staminaScore*0.3+homeworkScore*0.1;
            text = text.toFixed(1);
            if(learnScore>0 && healthScore>0 && actionScore>0 && staminaScore>0 && homeworkScore>0){
              return h("span", text);
            }else{
              return h("span", "--");
            }
          }
        },
        {
          title: "学科评价平均等级",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let learnScore = row.learnScore/row.allCount/100;
            let healthScore = row.healthScore/row.allCount/100;
            let actionScore = row.actionScore/row.allCount/100;
            let staminaScore = row.staminaScore/row.allCount/100;
            let homeworkScore = row.homeworkScore/row.allCount/100;
            let text = learnScore*0.1+healthScore*0.1+actionScore*0.4+staminaScore*0.3+homeworkScore*0.1;
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else{
              showInfo="不及格";
            }
            if(learnScore>0 && healthScore>0 && actionScore>0 && staminaScore>0 && homeworkScore>0){
              return h("span", showInfo);
            }else{
              return h("span", "--");
            }
          }
        },
        {
          title: "体质测试平均得分",
          key: "finishCount",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/(row.allCount-row.exemptCount)/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-";
              }else{
                  text = text.toFixed(1);
              }
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试平均等级",
          key: "athleticContestScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/(row.allCount-row.exemptCount)/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-1";
              }else{
                  text = text.toFixed(1);
              }
            }
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else if(text >= 0){
              showInfo="不及格";
            }else{
              showInfo="-";
            }
            return h("span", showInfo);
          }
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(row.grade,row.studentClass);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      resultDataYear:[],
      resultDataSecond: [],
      resultDataFirst: [],
      resultColumnsYear: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let text = row.studentClass+"班"
            return h("span", text);
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "技能体能",
          key: "actionScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试",
          key: "testScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-";
              }else{
                  text = text.toFixed(1);
              }
            }
            return h("span", text);
          }
        },
        {
          title: "学期总成绩平均分",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/100;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(row.grade,row.studentClass);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      resultColumnsYearCD: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let text = row.studentClass+"班"
            return h("span", text);
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore/100;
            if(row.staminaScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价平均分数",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/100;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "学科评价平均等级",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/100;
            text = text.toFixed(1);
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else{
              showInfo="不及格";
            }
            return h("span", showInfo);
          }
        },
        {
          title: "体质测试平均得分",
          key: "testScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-";
              }else{
                  text = text.toFixed(1);
              }
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试平均等级",
          key: "testScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-1";
              }else{
                  text = text.toFixed(1);
              }
            }
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else{
              showInfo="不及格";
            }
            return h("span", showInfo);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(row.grade,row.studentClass);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      orderTypeList:[
        {
          value: "1",
          label: '降序'
        },
        {
          value: "2",
          label: '升序'
        }
      ],
      primaryList: [
        {
          grade: 1,
          label: '一年级'
        },
        {
          grade: 2,
          label: '二年级'
        },
        {
          grade: 3,
          label: '三年级'
        },
        {
          grade: 4,
          label: '四年级'
        },
        {
          grade: 5,
          label: '五年级'
        },
        {
          grade: 6,
          label: '六年级'
        }
      ],
      middleList: [
        {
          grade: 7,
          label: '七年级'
        },
        {
          grade: 8,
          label: '八年级'
        },
        {
          grade: 9,
          label: '九年级'
        }
      ],
      highList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: 10,
          label: '高一'
        },
        {
          grade: 11,
          label: '高二'
        },
        {
          grade: 12,
          label: '高三'
        }
      ],
      collegeList: [
        {
          grade: 13,
          label: '大一'
        },
        {
          grade: 14,
          label: '大二'
        },
        {
          grade: 15,
          label: '大三'
        },
        {
          grade: 16,
          label: '大四'
        }
      ],
      schoolGradeList: [],
      studentClass: '',
      classList: [
        {
          value: "",
          label: '全部'
        },
        {
          value: 1,
          label: '1班'
        },
        {
          value: 2,
          label: '2班'
        },
        {
          value: 3,
          label: '3班'
        },
        {
          value: 4,
          label: '4班'
        },
        {
          value: 5,
          label: '5班'
        },
        {
          value: 6,
          label: '6班'
        },
        {
          value: 7,
          label: '7班'
        },
        {
          value: 8,
          label: '8班'
        },
        {
          value: 9,
          label: '9班'
        },
        {
          value: 10,
          label: '10班'
        },
        {
          value: 11,
          label: '11班'
        },
        {
          value: 12,
          label: '12班'
        },
        {
          value: 13,
          label: '13班'
        },
        {
          value: 14,
          label: '14班'
        },
        {
          value: 15,
          label: '15班'
        },
        {
          value: 16,
          label: '16班'
        },
        {
          value: 17,
          label: '17班'
        },
        {
          value: 18,
          label: '18班'
        },
        {
          value: 19,
          label: '19班'
        },
        {
          value: 20,
          label: '20班'
        },
        {
          value: 21,
          label: '21班'
        },
        {
          value: 22,
          label: '22班'
        },
        {
            value: 23,
            label: '23班'
        },
        {
            value: 24,
            label: '24班'
        },
        {
            value: 25,
            label: '25班'
        },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
      ],
      registerCode: '',
      studentName: '',
      isCollege: false,
      college: '',
      collegesList: [],
      major: '',
      majorList: [],
      chooseCollege:true,
      collegeName:'',
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
      selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-selectTabName',this.selectTabName);
    },
    sortChange(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
      
       this.search(1);
    },
    sortChange2(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
      
       this.search(2);
    },
    sortChange3(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
      
       this.search(3);
    },
    search(type) {
      var vm = this
      let schoolId = vm.schoolId
      vm.queryYearSemesterList(type)
     //vm.getExerciseListCount(schoolId)
    },
    queryYearSemesterList(type) {
      var vm = this;
      vm.loading = true;
      let yearSemesterQuery="";
      let  pageNum = 0;
      let  pageSize = 0;
     let orderField=vm.orderField;
      let orderSort=vm.orderSort

      if(type==1){
          yearSemesterQuery = "&firstYearSemester="+vm.firstYearSemester;
          pageNum = vm.pageNumFirst;
          pageSize = vm.pageSizeFirst;
         
      }else if(type==2){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester;
          pageNum = vm.pageNumSecond;
          pageSize = vm.pageSizeSecond;
          
      }else if(type==3){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester+"&firstYearSemester="+vm.firstYearSemester;
          pageNum = vm.pageNumYear;
          pageSize = vm.pageSizeYear;
      }
      let grade = vm.grade;
      let studentClass = vm.studentClass;
      if(!grade){
        vm.grade = '';
      }
      if(!studentClass){
        vm.studentClass = '';
      }
      this.$axios.get("/v1/semesterScore/queryStudentSemesterSportsByClassGrade?studentClassSelect=1&grade="+vm.grade+yearSemesterQuery+"&pageNo="+pageNum+"&pageSize="+pageSize+"&studentClass="+vm.studentClass+"&orderField="+orderField+"&orderSort="+orderSort).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
           if(type == 1){
              vm.resultDataFirst = res.data.response;
           }else if(type==2){
             vm.resultDataSecond = res.data.response;
           }else if(type==3){
             vm.resultDataYear = res.data.response;
           }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    queryYearSemesterListCount(type) {
      var vm = this
      let studentClass = vm.studentClass;
      if(!vm.grade){
        vm.grade = '';
      }
      if(!studentClass){
        vm.studentClass = '';
      }
      let yearSemesterQuery="";
      if(type==1){
          yearSemesterQuery = "&yearSemester="+vm.firstYearSemester;
      }else if(type==2){
          yearSemesterQuery = "&yearSemester="+vm.secondYearSemester;
      }else if(type==3){
          yearSemesterQuery = "&yearSemester="+vm.secondYearSemester;
      }
      
      this.$axios.get('/v1/semesterScore/queryStudentSemesterSportsByClassGradeCount?studentClassSelect=1&grade='+vm.grade+"&studentClass="+vm.studentClass+yearSemesterQuery).then(res => {
        if (res.data.code == 10000) {
              if(type==1){
                  this.totalFirst = res.data.response
              }else if(type==2){
                  this.totalSecond = res.data.response
              }else if(type==3){
                  this.totalYear = res.data.response
              }
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(grade,studentClass) {
      sessionStorage.setItem('sportsScoreStudent-grade',grade)
      sessionStorage.setItem('sportsScoreStudent-studentClass',studentClass)
      sessionStorage.setItem('sportsScoreStudent-registerCode',"")
      sessionStorage.setItem('sportsScoreStudent-gender',"")
      sessionStorage.setItem('sportsScoreStudent-studentName',"")
      sessionStorage.setItem('sportsScoreStudent-pageNum',"")
      sessionStorage.setItem('sportsScoreStudent-pageSize',"")
      this.$router.push({ name: 'sportsScoreStudent' })
    },
    pageNumChangeFirst(value) {
      //页码改变方法处理
      if (this.pageNumFirst != value) {
          this.pageNumFirst = value
          this.queryYearSemesterList(1)
      }
    },
    pageSizechangeFirst(value) {
      //页面大小改变方法处理
      if (this.pageSizeFirst != value) {
          this.pageSizeFirst = value
          this.pageNumFirst = 1;
          this.queryYearSemesterList(1)
      }
    },

    pageNumChangeSecond(value) {
      //页码改变方法处理
      if (this.pageNumSecond != value) {
        this.pageNumSecond = value
        this.queryYearSemesterList(2)
      }
    },
    pageSizechangeSecond(value) {
      //页面大小改变方法处理
      if (this.pageSizeSecond != value) {
        this.pageSizeSecond = value
        this.pageNumSecond = 1;
        this.queryYearSemesterList(2)
      }
    },


    pageNumChangeYear(value) {
      //页码改变方法处理
      if (this.pageNumYear != value) {
        this.pageNumYear = value
        this.queryYearSemesterList(3)
      }
    },
    pageSizechangeYear(value) {
      //页面大小改变方法处理
      if (this.pageSizeYear != value) {
        this.pageSizeYear = value
        this.pageNumYear = 1;
        this.queryYearSemesterList(3)
      }
    },

    queryStudentScore(){
      let vm = this;
      if(vm.firstYearSemester != ""){
         this.queryYearSemesterList(1)
         this.queryYearSemesterListCount(1);
      }
      if(vm.secondYearSemester != ""){
         this.queryYearSemesterList(2);
         this.queryYearSemesterListCount(2);
         this.queryYearSemesterList(3);
         this.queryYearSemesterListCount(3);
      }
    },
    getSchoolAllYearSemester() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getSchoolAllYearSemester").then(res => {
        if (res.data.code == 10000) {
          vm.semesterYearList =res.data.response ;
          if(res.data.response){
              let yearSemester=res.data.response[0].yearSemester;
              if(yearSemester%2 == 1){
                 vm.secondYearSemester = yearSemester;
                 vm.firstYearSemester = (yearSemester-10+1);
              }else{
                 vm.firstYearSemester = yearSemester;
                 vm.secondYearSemester = "";
              }
            vm.queryStudentScore()
          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },


  },
  watch: {
    college: function() {
      var vm = this
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college)
    },
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
  //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    if(vm.orderType == ""){
       vm.orderType = "1";
    }
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    // vm.updateUrl =this.$axios.defaults.baseURL + '/v1/file/upload?type=excel';
    if (schoolType) {
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList)
      }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
        vm.grade = 1
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
        vm.grade = 7
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
        vm.grade = 10
      }
    } else {
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList)
    }
    this.selectTabName = sessionStorage.getItem('sportsScoreStudent-selectTabName');
    if(this.selectTabName == undefined){
        this.selectTabName = "";
    }
    let grade = sessionStorage.getItem('sportsScoreClass-grade');
    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = Number(grade);
    }
    vm.schoolDistrict = sessionStorage.getItem('schoolDistrict')
    if(vm.schoolDistrict == '1000'){
        vm.resultColumns=vm.resultColumnsCD;
        vm.resultColumnsYear = vm.resultColumnsYearCD;
    }
    vm.getSchoolAllYearSemester()
  }
}
</script>
