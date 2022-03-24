<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">班级管理</h2>
    </div>
    <div>
      <Card>
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>年<span style="visibility: hidden;">占</span>级：</span>
              <Select v-model="grade" class="width120">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>班<span style="visibility: hidden;">占</span>级：</span>
              <Select v-model="studentClass" class="width120">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>授课老师：</span>
              <Input v-model="teacherName" placeholder="授课老师" class="width120"></Input>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button  type="success" @click="teacherEdit()">教师设置</Button>
          </div>
        </div>
      </Card>
      <br>
      <div>
      <Card>
        <div style="font-size:18px;height:40px;">数据明细</div>
        <Row>
          <div>
            <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
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
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import gradeData from '@/libs/grade'//年级
import classList from '@/libs/classList'//班级
import api from '@/api/baseApi'
export default {
  name: "curriculumAdministration",
  data() {
    return {
      loading: false,
      grade:'9999',
      studentClass:'',
      classList: classList,
      schoolGradeList: [],
      teacherName:'',
      semesterYear: "",
      schoolId:'',
      resultColumns: [
        {
          title: "年级名称",
          key: "gradeName",
          align: "center",
          minWidth:100,
        },
        {
          title: "班级名称",
          key: "className",
          align: "center",
          minWidth:100,
        },
        {
          title: "授课老师",
          key: "teacherName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row.teacherName;
            var text="";
            if(row!=null){
              var result = row.split(",");
              for(var i=0;i<result.length;i++){
                text+="<lable style='padding:5px 0;display:inline-block'>"+result[i]+"</lable>"+"</br>";
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
          title: "班主任",
          key: "headmasterName",
          align: "center",
          minWidth:100,
        },
        {
          title: "学生人数",
          key: "studentNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:200,
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
                      this.studentManage(row.grade,row.studentClass);
                    }
                  }
                },
                "学生管理"
              ),
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
                      this.teacherEdit(row.classId,row.grade);
                    }
                  }
                },
                "教师设置"
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
    /**回车查询**/
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.getPrimarySportsClass();
    },
    /**修改页码**/
    pageNumChange(value) {
      if (this.pageNum != value) {
        this.pageNum = value;
        this.getPrimarySportsClass();
      }
    },
    /**修改每页数量**/
    pageSizechange(value) {
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.querySearch();
      }
    },
    /**去教师管理**/
    teacherEdit(classId,grade) {
      this.$router.push({ name: "teacherEdit",query:{classId:classId,grade:grade}});
    },
    /**去学生管理**/
    studentManage(grade,studentClass) {
      this.$router.push({ name: "studentInfoManage",query:{grade:grade,studentClass:studentClass}});
    },
    /**获取所有学期**/
    async getRecentSemester() {
      let vm = this;
      let res = await api.getSchoolAllYearSemester()
      if (res.data.code == 10000) {
        let data = res.data.response
        if(data && data.length>0){
          vm.semesterYear=data[0].yearSemester
        }
      } else {
        vm.$Message.info(res.data.msg);
      }
    },
    /**获取列表数据和数量**/
    async getPrimarySportsClass() {
      console.log(this.semesterYear)
      this.loading = true;
      let data = {
        "grade":this.grade == '9999'?'':this.grade,
        "pageNo":this.pageNum,
        "pageSize": this.pageSize,
        "schoolId": this.schoolId,
        "semesterYear": this.semesterYear,
        "studentClass": this.studentClass == '9999'?'':this.studentClass,
        "teacherName": this.teacherName
      };
      let res = await api.getKunmingPrimarySportsClass(data)
      if (res.data.code == 10000) {
        this.loading = false;
        this.resultData = res.data.response;
      } else {
        this.loading = false;
        this.$Message.info(res.data.msg);
      }
      let res1 = await api.getKunmingPrimarySportsClassNum(data)
      if (res1.data.code == 10000) {
        this.total = res1.data.response;
      } else {
        this.$Message.info(res1.data.msg);
      }
    },
  },
  watch: {},
  mounted() {
    this.getRecentSemester();
    this.schoolType = sessionStorage.getItem('schoolType')
    this.schoolId = sessionStorage.getItem('schoolId')
    this.schoolGradeList = gradeData.inOf(this.schoolType)
    let queryData = this.$store.state.kmSession
    if(queryData){//数据回显
      this.grade = queryData.grade
      this.studentClass = queryData.studentClass
      this.teacherName = queryData.teacherName
    }
    this.getPrimarySportsClass();
  },
  beforeDestroy(){
    let queryData ={
      grade:this.grade,
      studentClass:this.studentClass,
      teacherName:this.teacherName
    }
    this.$store.dispatch('setSessionFun',queryData)
  },
};
</script>
<style scoped>
</style>
