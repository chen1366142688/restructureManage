<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">考核项目列表</h2>
    </div>
    <div>
      <Card  >
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>项目名称：</span>
              <Input v-model="classTestName"  placeholder="项目名称"  style="width:120px;"></Input>
            </div>
            <div style="margin:5px 20px;">
              <span>项目类型：</span>
              <Select v-model="itemId"  style="width:120px">
                <Option
                  v-for="item in itemList"
                  :value="item.itemId"
                  :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>年<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="gradeId"   style="width:120px;">
                  <Option
                  v-for="item in schoolGradeList"
                  :value="item.gradeId"
                  :key="item.gradeId"
                  >{{ item.gradeName }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"   @click="querySearch">查询</Button>
            <Button type="success" @click="exportExamTestList">导出EXCEL</Button>
          </div>
        </div>
      </Card>
      <br>
      <div>
        <Row>
          <div style>
            <Table border max-height="650" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br>
          <div style="float: right;">
            <Page
              :total="total"
              :current="pageNum"
              :page-size="pageSize"
              @on-change="pageNumChange"
              @on-page-size-change="pageSizechange"
              show-total
              show-sizer
            ></Page>
          </div>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      classTestName: "",
      "classTestType": '2',
        "gradeId": 999,
        "itemId": 999,
        examTypeList: [
          {
          name: "全部",
          value: "999"
          },
          {
            name: "健康知识",
            value: "1"
          },
          {
            name: "运动技能",
            value: "2"
          }
      ],
      itemList: [],
      schoolGradeList: [],
      resultColumns: [
        {
          title: "项目大类",
          key: "classTestType",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.classTestType == "1" ? "健康知识" :row.classTestType == "2" ? "运动技能" : "体能";
            return h("span",
              text
              );
          }
        },
         {
          title: "项目类型",
          key: "itemName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text =  row.itemName;
            if(row.classTestType == "3"){
                text='--'
            }
            return h("span",
              text
              );
          }
        },
        {
          title: "考核项目",
          key: "classTestName",
          align: "center",
          minWidth: 100,
        },
         {
          title: "是否必考",
          key: "examType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.examType == "1" ? "必考" : "选考";
            if(row.classTestType == "3"){
                text='--'
            }
            return h("span",
              text
              );
          }
        },
        {
          title: "考核内容",
          key: "examItemNames",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.examItemNames){
              for(var i=0;i<row.examItemNames.length;i++){
                 if(i==0){
                     text+="<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >"+row.examItemNames[i]+"</div>";
                 }else{
                     text+="<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >"+row.examItemNames[i]+"</div>";
                 }
              }
            }
            return h("div", {
                domProps: {
                  innerHTML: text
                }
              });
          }
        },
        {
          title: "适用年级",
          key: "gradeNames",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.gradeNames){
              for(var i=0;i<row.gradeNames.length;i++){
                if(i>0){
                  text += "</br>";
                }
                  text+="<lable style='display:inline-block;padding:5px 0;'>"+row.gradeNames[i]+"</lable>"

              }
            }
            console.log(text)
            return h("div", {
                domProps: {
                  innerHTML: text
                }
              });
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 200,
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
                      this.toDetail(row.classTestId);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    getClassTestList() {
      var vm = this;
      vm.loading = true;
      let data = {
        "classTestName": vm.classTestName,
        "classTestType":vm.classTestType==999?'':vm.classTestType,
        "gradeId": vm.gradeId==999?'':vm.gradeId,
        "itemId": vm.itemId==999?'':vm.itemId,
        "pageNo": vm.pageNum,
        "pageSize": vm.pageSize,
        "enableStatus": '1',
      };
      this.$axios.post("/v1/examtest/getClassTestList", data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    countClassTestList() {
      var vm = this;

       let data = {
        "classTestName": vm.classTestName,
        "classTestType":vm.classTestType==999?'':vm.classTestType,
        "gradeId": vm.gradeId==999?'':vm.gradeId,
        "itemId": vm.itemId==999?'':vm.itemId,
        "pageNo": vm.pageNum,
        "pageSize": vm.pageSize,
        "enableStatus": '1',
      };
      this.$axios.post("/v1/examtest/countClassTestList", data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response;
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getExamItemList() {
      var vm = this;
      this.$axios
        .get("/v1/examtest/getExamItemList")
        .then(function(response) {
          // console.log(response);
          let all = {
            itemId: 999,
            itemName: "全部"
          };
          vm.itemList.push(all);
          vm.itemList =vm.itemList.concat(response.data.response) ;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      vm.getClassTestList();
      vm.countClassTestList();
    },
    restore() {
      var vm = this;
      vm.pushType = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
     vm.classTestName='';
     vm.classTestType='';
     vm.gradeId=999;
     vm.itemId='';
      vm.querySearch();
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        this.search();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.querySearch();
      }
    },
    toDetail(classTestId) {
      var vm = this;
      sessionStorage.setItem("examItemManage-examItemDetail-classTestId", classTestId);
      this.$router.push({ name: "examItemDetail" });
    },
    exportExamTestList() {
      var vm=this;
       if(typeof(vm.itemId) == "undefined"){
                    vm.itemId="";
                }
                 if(typeof(vm.gradeId) == "undefined"){
                    vm.gradeId="";
                }
                if(typeof(vm.classTestName) == "undefined"){
                    vm.classTestName="";
                }

                if(typeof(vm.classTestType) == "undefined"){
                    vm.classTestType="";
                }

      let url =
        this.$axios.defaults.baseURL +
        '/v1/examtest/exportExamTestList?itemId='+(vm.itemId==999?'':vm.itemId)+'&gradeId='+(vm.gradeId==999?'':vm.gradeId)+
        '&classTestName='+vm.classTestName+'&classTestType='+(vm.classTestType==999?'':vm.classTestType)+
        '&token=' +
       sessionStorage.getItem('token')
      window.open(url)
    },
    getStartYearList() {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios.get("/v1/school/getStartYearList").then(res => {
        if (res.data.code == 10000) {
          //   console.log(res);
          let data = res.data.response;
          let all = {
            gradeId: 999,
            gradeName: "全部"
          };
          this.schoolGradeList.push(all);
          this.schoolGradeList = this.schoolGradeList.concat(data);

          // this.schoolName = data.name
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
  },
  watch: {

  },
  created() {
    var vm = this
  },
  beforeDestroy() {
  },
  mounted() {
    var vm = this;
    vm.search();
    vm.getStartYearList();
    vm.getExamItemList();
  }
};
</script>
