<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按年级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>年级：</span>
                    <Select v-model="grade" style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="queryStudentScore">查询</Button>
            </div>
        </div>
      </Card>
      <br>
      <Card>
       <div style="font-size:18px;height:40px;">
            数据明细
        </div>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
       <TabPane name="first" label="第一学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" :columns="resultColumns" :data="resultDataFirst"></Table>
            </div>
          </Row>
        </div>
       </TabPane>
       <TabPane name="second" label="第二学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" :columns="resultColumns" :data="resultDataSecond"></Table>
            </div>
          </Row>
        </div>
       </TabPane>
       <TabPane name="year" label="学年">
        <div>
          <Row>
            <div style>
              <Table border max-height="550" :loading="loading" :columns="resultColumnsYear" :data="resultDataYear"></Table>
            </div>
          </Row>
        </div>
       </TabPane>
      </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
        selectTabName:'',
      loading: false,
      grade: '',
      schoolDistrict:"",
      showAll:true,
      schoolGradeList:[],
      semesterYearList:[],
      firstYearSemester:"",
      secondYearSemester:"",
      primaryList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: "1",
          label: '一年级'
        },
        {
          grade: "2",
          label: '二年级'
        },
        {
          grade: "3",
          label: '三年级'
        },
        {
          grade: "4",
          label: '四年级'
        },
        {
          grade: "5",
          label: '五年级'
        },
        {
          grade: "6",
          label: '六年级'
        }
      ],
      middleList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: "7",
          label: '七年级'
        },
        {
          grade: "8",
          label: '八年级'
        },
        {
          grade: "9",
          label: '九年级'
        }
      ],
      highList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: "10",
          label: '高一'
        },
        {
          grade: "11",
          label: '高二'
        },
        {
          grade: "12",
          label: '高三'
        }
      ],
      resultColumns: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          sortable:true, 
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "总人数",
          key: "allCount",
          align: "center",
          width:110,
          sortable:true, 
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:true,
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
         {
          title: "技能体能",
          key: "actionScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/row.allCount/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
           let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试",
          key: "testScore",
          align: "center",
          sortable: true,
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
          minWidth:100,
          sortable: true,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/100;
            text =  Math.floor(text * 10) / 10 
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
                      this.toDetail(row.grade);
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
          sortable:true, 
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "总人数",
          key: "allCount",
          align: "center",
          width:110,
          sortable:true, 
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          minWidth:100,
          sortable:true, 
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          minWidth:100,
          sortable:true, 
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore/100;
            if(row.staminaScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
           let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价平均得分",
          key: "semesterScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let learnScore = row.learnScore/100;
            let healthScore = row.healthScore/100;
            let actionScore = row.actionScore/100;
            let staminaScore = row.staminaScore/100;
            let homeworkScore = row.homeworkScore/100;
            let text = learnScore*0.1+healthScore*0.1+actionScore*0.4+staminaScore*0.3+homeworkScore*0.1;
            text =  Math.floor(text * 10) / 10 
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
            let learnScore = row.learnScore/100;
            let healthScore = row.healthScore/100;
            let actionScore = row.actionScore/100;
            let staminaScore = row.staminaScore/100;
            let homeworkScore = row.homeworkScore/100;
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
          key: "testScore",
          align: "center",
          sortable:true,
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
          key: "athleticContestScore",
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
            }else if(text > 0){
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
                      this.toDetail(row.grade);
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
          sortable:true, 
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text);
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "技能体能",
          key: "actionScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/100;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "-";
            }else{
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试",
          key: "testScore",
          align: "center",
          sortable:true,
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
          title: "学年总成绩平均分",
          key: "semesterScore",
          align: "center",
          sortable:true,
          minWidth:100, 
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore/100;
            if(row.semesterScore < 0){
                return h("span", '-');
            }else{
                text =  Math.floor(text * 10) / 10 
            }
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
                      this.toDetail(row.grade);
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
                 text =  Math.floor(text * 10) / 10 
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
                 text =  Math.floor(text * 10) / 10 
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
                 text =  Math.floor(text * 10) / 10 
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
                 text =  Math.floor(text * 10) / 10 
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
                 text =  Math.floor(text * 10) / 10 
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价平均得分",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore/100;
            text =  Math.floor(text * 10) / 10 
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
            text =  Math.floor(text * 10) / 10 
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
                      this.toDetail(row.grade);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
      sortChange(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = '';
       }
    },
      selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-selectTabName',this.selectTabName);
    },
    queryYearSemesterList(type) {
      var vm = this;
      vm.loading = true;
      let yearSemesterQuery="";
      if(type==1){
          yearSemesterQuery = "&firstYearSemester="+vm.firstYearSemester;
      }else if(type==2){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester;
      }else if(type==3){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester+"&firstYearSemester="+vm.firstYearSemester;
      }
      if(!vm.grade){
        vm.grade = '';
      }
      this.$axios.get("/v1/semesterScore/queryStudentSemesterSportsByClassGrade?studentClassSelect=0&grade="+vm.grade+yearSemesterQuery+"&pageNo=1&pageSize=15").then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          
            if(type == 1){
              vm.resultDataFirst = res.data.response;
              for(let i=0;i<vm.resultDataFirst.length;i++){
            res.data.response[i].homeworkScore=res.data.response[i].homeworkScore/res.data.response[i].allCount
            res.data.response[i].staminaScore=res.data.response[i].staminaScore/res.data.response[i].allCount
             res.data.response[i].healthScore=res.data.response[i].healthScore/res.data.response[i].allCount
              res.data.response[i].testScore=res.data.response[i].testScore/(res.data.response[i].allCount-res.data.response[i].exemptCount)
              res.data.response[i].learnScore=res.data.response[i].learnScore/res.data.response[i].allCount
                  res.data.response[i].actionScore=res.data.response[i].actionScore/res.data.response[i].allCount
                   res.data.response[i].semesterScore=res.data.response[i].semesterScore/res.data.response[i].allCount
                    }
           }else if(type==2){
             vm.resultDataSecond = res.data.response;
              for(let i=0;i<vm.resultDataSecond.length;i++){
                 res.data.response[i].homeworkScore=res.data.response[i].homeworkScore/res.data.response[i].allCount
                 res.data.response[i].staminaScore=res.data.response[i].staminaScore/res.data.response[i].allCount
                 res.data.response[i].healthScore=res.data.response[i].healthScore/res.data.response[i].allCount
                 res.data.response[i].testScore=res.data.response[i].testScore/(res.data.response[i].allCount-res.data.response[i].exemptCount)
                res.data.response[i].learnScore=res.data.response[i].learnScore/res.data.response[i].allCount
                  res.data.response[i].actionScore=res.data.response[i].actionScore/res.data.response[i].allCount
                  res.data.response[i].semesterScore=res.data.response[i].semesterScore/res.data.response[i].allCount
              }
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
    queryStudentScore(){
      let vm = this;
      if(vm.firstYearSemester != ""){
         this.queryYearSemesterList(1)
      }
      if(vm.secondYearSemester != ""){
         this.queryYearSemesterList(2);
         this.queryYearSemesterList(3);
      }
    },
    toDetail(grade){
        sessionStorage.setItem('sportsScoreClass-grade',grade)
        this.$router.push({name: 'sportsScoreClass'})
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
    
  },
  created() {},
  mounted() {
    let vm = this;
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    if ('2' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
    }
    if ('3' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
    }
    if ('4' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
    }
    vm.schoolDistrict = sessionStorage.getItem('schoolDistrict')
    if(vm.schoolDistrict == '1000'){
        vm.resultColumns=vm.resultColumnsCD;
        vm.resultColumnsYear = vm.resultColumnsYearCD;
    }
    this.selectTabName = sessionStorage.getItem('sportsScoreStudent-selectTabName');
    if(this.selectTabName == undefined){
        this.selectTabName = "";
    }
    this.getSchoolAllYearSemester();
    
  }
};
</script>