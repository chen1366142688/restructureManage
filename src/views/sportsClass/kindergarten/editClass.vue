<style>
  .vis{visibility: hidden;}
</style>
<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">{{className}}</h2>
    <Card style="margin-top:15px" :dis-hover="true">
      <Form :label-width="140" class="function">
        <Row>
          <Col span="5">
            <span><span class="vis">班级</span>年级：</span>
            <Select v-model="studentGrade" style="width:120px;" disabled>
              <Option  v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
          </Col>
          <Col span="5">
            <span><span class="vis">班级</span>班级：</span>
            <Select v-model="studentClass" style="width:120px;" disabled>
              <Option  v-for="item in classList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
          </Col>
          <!-- <Col span="5">
            <span><span class="vis">班级</span>学期：</span>
            <Select v-model="semesterYear" style="width: 160px">
              <Option
                v-for="item in semesterYearList"
                :value="item.yearSemester"
                :key="item.yearSemester"
                >{{ item.semesterName }}</Option
              >
            </Select>
          </Col> -->
        </Row>
        <Row>
          <Col span="7">
            <div style="display:flex;margin-top:15px">
              <span style="margin-top:15px">授课教师：</span>
              <div>
                <div class="functionItem" v-for="(item, index) in teacherIds" :key="index" style="display:flex;margin:10px 0;">
                  <Select v-model="item.teacherId" style="width:140px;margin-left:10px;" placeholder="请选择教师">
                    <Option
                      v-for="(val, index1) in teacherList"
                      :value="val.teacherId"
                      :key="val.teacherId"
                      >{{ val.name }}</Option
                    >
                  </Select>
                  <Button
                    v-if="index != 0"
                    type="error"
                    style="margin-left: 40px"
                    @click="delTeacherNum(index)"
                    >删除教师
                  </Button>
                  <Button
                    v-else
                    type="success"
                    style="margin-left: 40px"
                    @click="addTeacherNum(item)"
                    >添加教师</Button
                  >
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 底部按钮组 -->
    <Row type="flex" justify="center" style="margin-top:20px">
        <Col span="2">
          <Button @click="pageToList" type="primary">返<span class="vis">级</span>回</Button>
        </Col>
        <Col span="2">
          <Button @click="baseSubmit" type="success">保<span class="vis">级</span>存</Button>
        </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        className:'',
        studentGrade:'',
		    studentClassId: '',
        gradeList:[
          {
            value: 21,
            label: '小班'
          },
          {
            value: 22,
            label: '中班'
          },
          {
            value: 23,
            label: '大班'
          }
        ],
        studentClass:'',
        classList: [
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
        semesterYear:'',
        semesterYearList:[],
        teacherList:[],
        teacherIds: [
          {teacherId: ''}
        ],
        classData:{}
      };
    },
    // computed:{
    //   classData:function() {
    //     return this.$store.state.eventBus;
    //   },
    // },

    methods: {
      /**获取所有学期**/
      getSemesterList() {
        let vm = this;
        console.log('vm.classData',vm.classData)
        this.$axios.get("/v1/sports/class/getSchoolAllYearSemester").then(res => {
          if (res.data.code == 10000) {
            if(res.data.response){
              vm.semesterYearList=res.data.response
              let semesterArr = res.data.response.filter((val) => {
                  return val.semesterName === vm.classData.yearSemesterName;
              });
              // if(semesterArr.length>0){
                vm.semesterYear = res.data.response[0].yearSemester
              // }
            }
          } else {
            vm.$Message.info(res.data.msg);
          }
        });
      },
      /**获取所有老师**/
      getSchoolTeacherList() {
        let vm = this;
        this.$axios.get("/v1/sports/class/getSchoolTeacherList").then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            vm.teacherList = result;
            let teacherIds = vm.teacherIds;
            let teacherData = vm.classData.teacherName?vm.classData.teacherName.split(','):vm.classData.teacherName
            if(teacherData){//一个以上
              teacherIds = []
              for(let i=0;i<result.length;i++){
                for(let j=0;j<teacherData.length;j++){
                  if(result[i].name === teacherData[j]){
                    teacherIds.push({teacherId: result[i].teacherId})
                  }
                }
              }
              vm.teacherIds = teacherIds
            }
          } else {
            vm.$Message.info(res.data.msg);
          }
        });
      },
      /**删除教师**/
      delTeacherNum(index) {
        this.teacherIds.splice(index,1);
      },
      /**添加教师**/
      addTeacherNum () {
        let count = this.teacherIds.length;
        if (count < 3) {
          this.teacherIds.push({teacherId: ''})
        }else {
          this.$Message.error("最多添加3个授课老师!");
        }
      },
      //返回
      pageToList() {
        this.$router.go(-1)
      },
      baseSubmit() {
        const vm = this;
        if (!vm.studentGrade) {
          vm.$Message.error("请选择年级");
          return false;
        }
        if (!vm.studentClass) {
          vm.$Message.error("请选择班级");
          return false;
        }
        if (vm.teacherIds[0].teacherId == '') {
          vm.$Message.error("请选择授课教师");
          return false;
        }else {
          let setTeacherArr = vm.unqie(vm.teacherIds)
          if(setTeacherArr.length != vm.teacherIds.length){
            vm.$Message.error("授课教师不能相同");
            return false;
          }
        }
        let data = {
          "remark": vm.remark,
          "schoolId": vm.schoolId,
		      "studentClassId": vm.studentClassId,
          "semesterYear": vm.semesterYear,
          "sportsClassId": vm.sportsClassId,
          "sportsClassName": vm.sportsClassName,
          "sportsClassTypeId": vm.sportsClassTypeId,
          "sportsClassTypeName": vm.sportsClassTypeName,
          "sportsClassTypeStatus": vm.sportsClassTypeStatus? "2" : "1",
          "studentNum": vm.studentNum,
          campusCode:vm.campusCode,
          sportsClassCode:vm.sportsClassCode,
          teacherId:vm.teacherId,
          startSchool:vm.startYear,
          representativeStatus: vm.representativeStatus,
          representativeName: vm.representativeStatus == '1'?vm.sportsClassName:'',
          "doubleList": vm.doubleList,
          "doubleWeek":vm.doubleWeek,
          "singleList": vm.singleStatus == '1'?vm.singleList:vm.weeklyList,
          "singleStatus": vm.singleStatus,
          "singleWeek": vm.singleStatus == '1'?vm.singleWeek:vm.weeklyWeek,
          teacherIds:vm.teacherIds,
          totalNum:vm.totalNum,
        };
        this.$axios
                .post("/v1/sports/class/upsertKindergartenSportsClass", data)
                .then(function(response) {
                  console.log(response);
                  if (response.data.code == "1") {
                    vm.$Message.info("提交成功");
                    vm.$router.go(-1);
                  } else {
                    vm.$Message.info(response.data.msg);
                  }
                })
                .catch(function(response) {
                  console.log(response);
                  vm.$Message.info("提交失败");
                });
      },
      unqie(arr){
        let obj = {};
        let peon = arr.reduce((cur,next) => {
            obj[next.teacherId] ? "" : obj[next.teacherId] = true && cur.push(next);
            return cur;
        },[])
        return peon
      },
    },
    mounted() {
      this.classData = this.$store.state.eventBus
      this.studentClassId = this.$route.params.studentClassId;
      this.getSemesterList()
      this.getSchoolTeacherList()
      console.log('this.classData',this.classData)
      this.className = this.classData.gradeName+this.classData.className
      this.studentGrade = this.classData.grade
      this.studentClass = this.classData.studentClass

    },
    destroyed() {}
  };
</script>
