<template>
  <div style="padding-left: 10px">
    <h2 style="margin-top: 15px; margin-bottom: 13px">
      教育局上报-基础数据报送
    </h2>
    <Card style="margin-top: 20px" :dis-hover="true">
      <Row type="flex" justify="end" align="middle">
        <Button
          class="add-button"
          style="margin: 0 20px"
          @click="toSemesterReportedBaseDetail"
          type="success"
          >基础数据报送</Button
        >
      </Row>
    </Card>
    <Card style="margin-top: 20px">
      <div>
        <div style="font-size: 18px; height: 40px">基础数据</div>
        <div>
          <Row>
            <div>
              <Table border :columns="resultColumnsBase" :data="resultDataBase"></Table>
            </div>
          </Row>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "baseDataReport",
  data() {
    return {
      schoolId: "",
      yearSemester: sessionStorage.getItem("yearSemester"),
      resultColumnsBase:[
        {
          title: '报送学期',
          key: 'yearSemester',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let text= row.schoolYear+"学年";
            return h('div', text)
          }
        },
        {
          title: '学校名称',
          key: 'yearSemester',
          align: 'center',
          width:150,
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.list;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                let data = list[i].name;
                let heightS = 30;
                if(i==itemLength-1){
                  text += "<span style='height:"+heightS+"px;line-height:"+heightS+"px'>" + data+ "</span>";
                }else{
                  text += "<span style='height:"+heightS+"px;line-height:"+heightS+"px'>" + data+ "</span></br>";
                }
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '教师人数',
          key: 'teacherNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.teacherNum == null?0:row.teacherNum);
          }
        },
        {
          title: '学生人数',
          key: 'studentNum',
          align: 'center'
        },
        {
          title: '田径场个数',
          key: 'athleticsNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", (row.athleticsNumTwo == null?0:row.athleticsNumTwo)+(row.athleticsNumThree == null?0:row.athleticsNumThree)+(row.athleticsNumThreeFour == null?0:row.athleticsNumThreeFour)+(row.athleticsNumFour == null?0:row.athleticsNumFour));
          }
        },
        {
          title: '球场个数',
          key: 'ballNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", (row.basketballNum == null?0:row.basketballNum)+(row.volleyballNum == null?0:row.volleyballNum));
          }
        },
        {
          title: '体育馆个数',
          key: 'gymNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.gymNum == null?0:row.gymNum);
          }
        },
        {
          title: '游泳馆个数',
          key: 'natatoriumNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.natatoriumNum == null?0:row.natatoriumNum);
          }
        },
         {
          title: '器械体操/游戏区面积',
          key: 'gameArea',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.gameArea == null?0:row.gameArea);
          }
        },
        {
          title: '学生体质测试教室',
          key: 'studentTestClassNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.studentTestClassNum == null?0:row.studentTestClassNum);
          }
        },
         {
          title: '体育器材是否达标',
          key: 'sportsEquipment',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.sportsEquipment == '1'?"是":row.sportsEquipment == '0'?"否":"");
          }
        },
        {
          title: '报送时间',
          key: 'createTime',
          align: 'center',

        },
        {
          title: '报送人',
          key: 'teacherName',
          align: 'center',
           render: (h, params) => {
            var vm=this;
            let row=params.row;
            let teacherName = row.teacherName
            if(teacherName == null){
              return h("div", "");
            }
            if(row.schoolId != row.nowSchoolId){
              teacherName = teacherName +'('+row.schoolName+')'
            }
            return h("div", teacherName);
          }
        },
        {
          title: '状态',
          key: 'yearSemester',
          align: 'center',
          width:150,
          render: (h, params) => {
            const row = params.row;

              return h('div',[
                h(
                  'Button',
                  {
                    props: {
                      type: 'default',
                    },
                    style: {
                      marginRight: '10px',
                      padding:'5px',
                      display: row.baseId !=null ? 'inline-block' : 'none'
                    },
                  },
                  '报送成功'
                ),
                 h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      disabled:row.schoolType==4?true:false
                    },
                    style: {
                      padding:'5px',
                      marginRight:0
                    },
                    on: {
                      click: () => {
                        this.toSemesterReportedBaseDetail();
                      }
                    }
                  },
                  '详情'
                )
              ])
          }
        },
      ],
      resultDataBase:[]
    };
  },
  mounted() {
    this.schoolId = sessionStorage.getItem("schoolId");
    this.getSemesterReportedBaseInfo();
  },
  methods: {
    toSemesterReportedBaseDetail(){
      this.$router.push({ name: 'semesterReportedBaseDetail' })
    },
    // 跳转体测-学生详情
    toDetailInfo() {
      this.$router.push({ name: "physicalTestStudentDetail" });
    },
    getSemesterReportedBaseInfo() {
      this.$axios.get(`/v1/dataReport/getSemesterReportedBaseInfo?yearSemester=${this.yearSemester}`).then((res) => {
        if (res.data.code == 10000) {
          this.resultDataBase = res.data.response;
        }
      });
    },
  },
  
};
</script>
