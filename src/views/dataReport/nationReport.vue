


<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体质健康数据报送</h2>
    </div>
        <Card>
          <div >
              <div>
                  <Row>
                      <div>
                          <Table max-height="800" border :columns="resultColumns" :data="resultData"></Table>
                      </div>
                  </Row>
              </div>
          </div>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'teacherList',
  data() {
    return {
        loading:false,
      resultColumns: [
        {
          title: '测试学年',
          key: 'schoolYear',
          align: 'center',
          minWidth:80,
          render: (h, params) => {
            return h('div', [h('span', params.row.schoolYear+"年")])
          }
        },
        {
          title: '学校',
          key: 'reportStudentNum',
          align: 'center',
          minWidth:200,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p>" + data.schoolName + "</p></div>";
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
          title: '报送学生总数',
          key: 'reportStudentNum',
          align: 'center',
          minWidth:40,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p>" + (data.reportStudentNum?data.reportStudentNum:"" ) + "</p></div>";
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
          title: '合格率（人数）',
          key: 'activityExplain',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                if(!data.finishStudent){
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p></p></div>";
                }else{
                  let all=data.excellentStudent+data.goodStudent+data.passStudent;
                  let pass=(all*100/data.finishStudent).toFixed(2);
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p>" + pass + "% （" + all + "人）</p></div>";
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
          title: '优良率（人数）',
          key: 'activityExplain',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                if(!data.finishStudent){
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p></p></div>";
                }else{
                  let excellentCount = data.excellentStudent + data.goodStudent;
                  let excellent=(data.excellentStudent*100/data.finishStudent).toFixed(2);
                  let good=(data.goodStudent*100/data.finishStudent).toFixed(2);
                  let all=Number(excellent)+Number(good)
                  all=all.toFixed(2)
                  all=all>100?100:all;
                  // const text = all+"%"
                  // let all=data.excellentStudent+data.goodStudent;
                  // let pass=(all*100/data.finishStudent).toFixed(2);
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p>" + all + "% （"+ excellentCount +"人）</p></div>";
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
          title: '报送状态',
          key: 'reportStatus',
          align: 'center',
          minWidth:60,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p>" + (data.reportStatus=='1'?"已上报":"未上报") + "</p></div>";
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
          title: '报送日期',
          key: 'reportTime',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<p>" +(data.reportTime?data.reportTime:"")  + "</p></div>";
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
          title: '报送人',
          key: 'teacherName',
          align: 'center',
          minWidth:200,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if(list && list.length>0){
              let itemLength=list.length;
              itemLength=1
              for(let i=0;i<list.length;i++){
                let data = list[i];
                text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      48 * itemLength +
                      "px;line-height:" +
                      48 * itemLength +
                      "px;' >";
                 text += "<span>" + (data.teacherName?data.teacherName:"") + "</span></div>";
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
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      disabled:params.row.commonYear=="1"?false:true
                    },
                    style: {
                      marginRight:'10px',
                      padding:'5px'
                    },
                    on: {
                      click: () => {
                          this.toDetailInfo(params.row);
                      }
                    }
                  },
                  '报送详情'
                ),
              ])
          }
        }
      ],
      resultData: [],
    }
  },
  methods: {
    getCountryReportHisList(){
      var vm = this;
      vm.loading=true;
      this.$axios
        .get("/v1/dataReport/getCountryReportHisList")
        .then(function(response) {
          vm.loading=false;
          if (response.data.code == 10000) {
            vm.dealData(response.data.response);
          } else {
            vm.$Message.info(response.data.msg);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    dealData(list){
      var vm=this;
      let data=[];
      if(list && list.length>0){
        let yearList=[];
        for(let i=0;i<list.length;i++){
          let yearData=list[i];
          if(yearList.indexOf(yearData.schoolYear)==-1){
            yearList.push(yearData.schoolYear)
          }
        }
        for(let i=0;i<yearList.length;i++){
          let yearData=yearList[i];
          let param={
            schoolYear:yearData,
            commonYear:'0',
            list:[]
          }
          for(let j=0;j<list.length;j++){
            let yearDataOther=list[j];
            if(yearDataOther.schoolYear==yearData){
              param.commonYear=yearDataOther.commonYear
              param.list.push(yearDataOther);
            }
          }
          data.push(param)
        }
      }
      vm.resultData=data;
      console.log(this.resultData)
    },

    toDetailInfo(testActivity){
        sessionStorage.setItem('nationReport-nationReportDetail-schoolYear',testActivity.schoolYear)
        this.$router.push({ name: 'nationReportDetail', query: {schoolYear: testActivity.schoolYear}})
    },
  },
  created() {
  },
  mounted() {
     this.schoolId=sessionStorage.getItem('schoolId');
     this.getCountryReportHisList();
  }
}
</script>
