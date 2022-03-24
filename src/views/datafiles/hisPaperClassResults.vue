<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">
        成绩 - {{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":
        gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":
        gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":"未知"}}{{studentClass}}班
      </h2>
    </div>
    <div>
      <Card>
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>姓<span style="visibility: hidden;">占位</span>名：</span>
              <Input v-model="studentName" placeholder="姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>学籍号<span style="visibility:hidden">占</span>：</span>
              <Input v-model="registerCode" placeholder="学籍号" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>性<span style="visibility: hidden;">占位</span>别：</span>
              <Select v-model="gender"  style="width:120px;">
                <Option
                  v-for="item in genderList"
                  :value="item.itemId"
                  :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>录入状态：</span>
              <Select v-model="entryStatus" style="width:120px;">
                <Option
                  v-for="item in entryStatusList"
                  :value="item.entryStatus"
                  :key="item.entryStatus"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button style="margin-left:16px;" type="success" @click="back">返回</Button>
          </div>
        </div>
      </Card>
      <br />
      <div>
        <Row>
          <div style>
            <Table
              border
              max-height="700"
              :loading="loading"
              :columns="resultColumns"
              :data="resultData"
              @on-sort-change='handleSortChange'
            ></Table>
          </div>
          <br />
        </Row>
      </div>
    </div>
    <Modal v-model="modal1" title="编辑得分" ok-text="保存" :mask-closable="false" @on-ok="saveStudentScore">
      <div style="padding-left:10px;">
        <div>
            <div>姓名：{{oneStudentName}}</div>
            <div style="margin-left:40px;margin-top: 40px">学籍号：{{oneRegisterCode}}</div>
            <div style="margin-left:40px;margin-top: 40px">年级：
              {{oneGradeId==1?"一年级":oneGradeId==2?"二年级":oneGradeId==3?"三年级":oneGradeId==4?"四年级":oneGradeId==5?"五年级":oneGradeId==6?"六年级":
        oneGradeId==7?"七年级":oneGradeId==8?"八年级":oneGradeId==9?"九年级":
        oneGradeId==10?"高一":oneGradeId==11?"高二":oneGradeId==12?"高三":"未知"}}
            </div>
            <div style="margin-left:40px;margin-top: 40px">班级：{{oneStudentClass}}班</div>
            <div style="margin-left:40px;margin-top: 40px">
              <span>得分：</span>
              <Input v-model="oneScore" placeholder="得分" style="width: 120px;" />
            </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "paperClassResults",
  data() {
    return {
      yearSemester:"",
      subjectApplyStatus:false,
      gender:"",
      genderList:[
      {
        itemId:"0",
        itemName:"全部"
      },
      {
        itemId:"1",
        itemName:"男"
      },
      {
        itemId:"2",
        itemName:"女"
      }
      ],
      modal1:false,
      loading: false,
      gradeId: "",
      studentClass: "",
      classId: "",
      paperId: "",
      studentName: "",
      registerCode: "",
      entryStatus: 0,
      entryStatusList: [
        { entryStatus: 0, label: "全部" },
        { entryStatus: 1, label: "已完成" },
        { entryStatus: 2, label: "未完成" },
        { entryStatus: 3, label: "免试" },
      ],
      healthChoose:0,
      healthChooseList: [
        { entryStatus: 0, label: "全部" },
        { entryStatus: 1, label: "未免试" },
        { entryStatus: 2, label: "已免试" }
      ],
      oneStudentId:'',
      oneStudentName:'',
      oneRegisterCode:'',
      oneGradeId:'',
      oneStudentClass:'',
      oneScore:'',
      scoreSort:'1',
      //排序字段
        orderKey:[],
        // 排序类别（asc，desc）
        orderType:[],
        //排序的字段顺序（从0开始）（设置样式时使用）
        sortIndex:[],
         // 排序类别（asc，desc，normal）（设置样式时使用）
        sortType:[],
      resultColumns: [
        {
          title: "序号",
          key: "studentName",
          align: "center",
          width: "80px",
          render: (h, params) => {
            const row = params.row;
            return h("div", params.index + 1);
          }
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
        },
         {
          title: "性别",
          key: "gender",
          align: "center",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女")
            ]);
          }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
        },
        {
          title: "年级",
          key: "gradeId",
          align: "center",
          width:80,
          // sortable:'custom',
          sortNumber: 0 ,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.gradeId == 1
                ? "一年级"
                : row.gradeId == 2
                ? "二年级"
                : row.gradeId == 3
                ? "三年级"
                : row.gradeId == 4
                ? "四年级"
                : row.gradeId == 5
                ? "五年级"
                : row.gradeId == 6
                ? "六年级"
                : row.gradeId == 7
                ? "七年级"
                : row.gradeId == 8
                ? "八年级"
                : row.gradeId == 9
                ? "九年级"
                : row.gradeId == 10
                ? "高一"
                : row.gradeId == 11
                ? "高二"
                : row.gradeId == 12
                ? "高三"
                : "未知";
            return h("div", text);
          }
        },
        {
          title: "班级",
          width:80,
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.studentClass + "班";
            return h("div", text);

          }
        },
        {
          title: "状态",
          key: "entryStatus",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            const text = row.entryStatus == "1" ? "已完成" : "未完成";
            return h('div', ('1' != params.row.exemptHealth?text : '免试'));
          }
        },
        {
          title: "成绩",
          key: "score",
          width:80,
          align: "center",
          // sortable:'custom',
          sortNumber: 1 ,
          render: (h, params) => {
            const row = params.row;
            const text =row.score != null? row.score/100:0;
            return h('div', ('1' != params.row.exemptHealth?text : ''));
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  attrs: {
                      disabled:params.row.exemptHealth == '1'|| this.subjectApplyStatus == true?true:false
                  },
                  on: {
                    click: () => {
                      let {studentId,studentName,registerCode,gradeId,studentClass,score} = params.row
                            this.toClassStudentResults(studentId,studentName,registerCode,gradeId,studentClass,score)
                      // this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
                      //   if (res.data.code === 10000) {
                      //     let {editStatus} = res.data.response
                      //     if (editStatus === '1') {
                      //       let {studentId,studentName,registerCode,gradeId,studentClass,score} = params.row
                      //       this.toClassStudentResults(studentId,studentName,registerCode,gradeId,studentClass,score)
                      //     } else {
                      //       this.$Modal.info({
                      //         title: '提醒',
                      //         okText: '知道了',
                      //         closable: false,
                      //         content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
                      //     });
                      //     }
                      //   }
                      // })
                    }
                  }
                },
                "编辑"
              )
              // ,
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "success"
              //     },
              //     style: {
              //     },
              //     attrs: {
              //         disabled: params.row.entryStatus == "2" ||  params.row.exemptHealth == '1'?true:false
              //     },
              //     on: {
              //       click: () => {
              //         this.toDeleteResults(params.row.studentId);
              //         // this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
              //         //   if (res.data.code === 10000) {
              //         //     let {editStatus} = res.data.response
              //         //     if (editStatus === '1') {
              //         //       this.toDeleteResults(params.row.studentId);
              //         //     } else {
              //         //       this.$Modal.info({
              //         //         title: '提醒',
              //         //         okText: '知道了',
              //         //         closable: false,
              //         //         content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
              //         //     });
              //         //     }
              //         //   }
              //         // })

              //       }
              //     }
              //   },
              //   "清除成绩"
              // )
            ]);
          }
        }
      ],
      resultData: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSortChange ({column,key, order}) { // 传入的order是排序类型，升序降序默认
      var vm=this;
      console.log(column)
      console.log(key)
      if(order=="desc"){
        vm.scoreSort="2"
      }else{
        vm.scoreSort="1"
      }
      vm.getClassStudentHealthyScoreList(sessionStorage.getItem("hisPaperScoreManage-hisPaperClassResults-classId"),
      sessionStorage.getItem("hisPaperScoreManage-hisPaperClassResults-paperId"));
      //order值可能为asc，desc，normal（不排序）
        // let k = [];let t = [];
        //  k = this.orderKey
        //  t = this.orderType
        // if(k.includes(key)){
        //   let i = this.printArray(k,key);
        //   if(order==='normal'){
        //     k.splice(i,1)
        //     t.splice(i,1)
        //   }else{
        //     t.splice(i,1,order)
        //   }
        // }else{
        //   k.push(key)
        //   t.push(order)
        // }
        // this.orderKey = k
        // this.orderType = t
        // console.log(k)
        // this.handleTheadAddClass(column,order)
        // this.reload()
    },
    //返回某元素在数组中下标
      printArray(k,key){
        for(let i=0;i<k.length;i++){
          if(k[i]==key){
            return i
          }
        }
      },
      handleAddClass(){
        var vm=this;
        let orderKey=vm.orderKey;
        let orderType=vm.orderType;
        for(let i=0;i<orderKey.length;i++){

        }
      },
      // 标题行样式改变事件
      handleTheadAddClass(column,order){
        let i =[];let s = [];
        i= this.sortIndex
        s= this.sortType
        let key = column.sortNumber
        if(i.includes(key)){
          let t = this.printArray(i,key);
          s.splice(t,1,order)
        }else{
          i.push(key)
          s.push(order)
        }
        this.sortIndex = i
        this.sortType = s
        console.log(i);
        console.log(s)
        for(let a = 0; a<this.sortIndex.length; a++){

          let udom = document.getElementsByClassName("ivu-icon ivu-icon-md-arrow-dropup")[i[a]]
          let ddom = document.getElementsByClassName("ivu-icon ivu-icon-md-arrow-dropdown")[i[a]]
          console.log(udom)
          udom.removeAttribute('id');
          ddom.removeAttribute('id');
          if(s[a]==="asc"){
            udom.classList.add("on")
            // udom.id = "select-sort"
          }
          if(s[a]==="desc"){
            udom.classList.add("on")
            // ddom.id = "select-sort"
          }
          if(s[a]==="normal"){
            udom.classList.remove("on")
            // ddom.id = "select-sort"
          }
        }

      },
    querySearch() {
      var vm = this;
      vm.getClassStudentHealthyScoreList(vm.classId, vm.paperId);
    },
    toDeleteResults(studentId){
      var vm = this;
      this.$axios
        .get(
          "/v1/datafiles/updateHisStudentHealthyScoreStatus?studentId=" +studentId +"&paperId=" + vm.paperId + "&yearSemester=" + vm.yearSemester
        )
        .then(function(response) {
            vm.querySearch();
            vm.$Message.info("操作成功！")
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    saveStudentScore() {
      var vm = this;
      var reg=/^\d{0,3}.[0-9]?$/;
      if(!vm.oneScore){
        vm.$Message.info("请填写该学生成绩")
        return false;
      }
      if (!reg.test(vm.oneScore)) {
        vm.$Message.info("请输入0-100的得分,且只能是一位小数")
        return false;
      }
      if(vm.oneScore<0||vm.oneScore>100){
        vm.$Message.info("请输入0-100的得分")
        return false;
      }
      this.$axios
        .get(
          "/v1/datafiles/upsertHisStudentHealthyScore?paperId="+vm.paperId+"&studentId="+vm.oneStudentId+"&score="+vm.oneScore*100+"&yearSemester="+vm.yearSemester
        )
        .then(function(response) {
         if(response.data.response.code=='1'){
              vm.$Message.info("提交成功")
              vm.oneStudentId='';
              vm.oneStudentName='';
              vm.oneRegisterCode='';
              vm.oneGradeId='';
              vm.oneStudentClass='';
              vm.oneScore='';
              vm.querySearch()
          }else{
              vm.$Message.info("提交失败")
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getClassStudentHealthyScoreList(classId, paperId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/datafiles/getHisClassStudentHealthyScoreList?classId=" +
            classId +
            "&entryStatus=" +
            vm.entryStatus +
            "&paperId=" +
            paperId +
            "&studentName=" +
            vm.studentName +
            "&registerCode=" +
            vm.registerCode+
            "&yearSemester=" +
            vm.yearSemester+
             "&healthChoose=" +
            vm.healthChoose+
             "&gender=" +
            vm.gender
        )
        .then(function(response) {
          let data = response.data.response;
          vm.resultData = data ? data : [];
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    toClassStudentResults(studentId,studentName,registerCode,gradeId,studentClass,score) {
        var vm=this;
        vm.oneStudentId=studentId;
        vm.oneStudentName=studentName;
        vm.oneRegisterCode=registerCode;
        vm.oneGradeId=gradeId;
        vm.oneStudentClass=studentClass;
        vm.oneScore=score?score/100:null;
        vm.modal1=true;
    //   this.$router.push({ name: "paperClassStudentResults" });
    }
  },
  created() {},
  mounted() {
    var vm = this;
    vm.gradeId = sessionStorage.getItem(
      "hisPaperScoreManage-hisPaperClassResults-gradeId"
    );
    vm.studentClass = sessionStorage.getItem(
      "hisPaperScoreManage-hisPaperClassResults-studentClass"
    );
    vm.classId = sessionStorage.getItem(
      "hisPaperScoreManage-hisPaperClassResults-classId"
    );
    vm.paperId = sessionStorage.getItem(
      "hisPaperScoreManage-hisPaperClassResults-paperId"
    );
    vm.yearSemester = sessionStorage.getItem(
      "hisPaperScoreManage-hisPaperClassResults-yearSemester"
    );
    let subjectApplyStatus = sessionStorage.getItem("dataFilsManage-subjectApplyStatus");
    let subjectReportingStatus = sessionStorage.getItem("dataFilsManage-subjectReportingStatus");
    if("0" == subjectApplyStatus && "1" == subjectReportingStatus){
      this.subjectApplyStatus = true;
    }
    vm.getClassStudentHealthyScoreList(
      sessionStorage.getItem("hisPaperScoreManage-hisPaperClassResults-classId"),
      sessionStorage.getItem("hisPaperScoreManage-hisPaperClassResults-paperId")
    );

  }
};
</script>
<style lang="less" scoped>
  .top-search{
    display:flex;
    justify-content: space-between;
  }
</style>
<style lang="less">
  /* .ivu-table为ivew特定格式，cellClassName使用到的类名前面必须带着它*/
  .ivu-table .merge1 {
    border-right: 0;
  }
</style>

