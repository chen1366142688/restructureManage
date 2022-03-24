<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">教师设置</h2>
    <Tabs :value="activeGrade" type="card" @on-click="selectTabs">
        <TabPane :label="item.label" :name="item.value" v-for="item in gradeList" :key="item.label"></TabPane>
    </Tabs>
    <Card>
      <Form :label-width="108">
        <div class="classItemData" v-for="(classItem,index) in classData" :key="index">
          <Row>
            <Col span="2">
              <span>{{activeGradeFun()}}{{classItem.sportsClassName}}：</span>
            </Col>
            <Col span="6">
              <FormItem label="班主任：">
                  <Select v-model="classItem.headmaster" style="width:140px">
                      <Option :value="headma.value" v-for="(headma,indexheadma) in teacherInfo" :key="indexheadma">{{headma.label}}</Option>
                  </Select>
              </FormItem>
            </Col>
          </Row>
          <Row v-for="(teacher,i) in classItem.teacherList" :key="teacher+i">
            <Col span="6" offset="2">
              <FormItem label="体育任课教师：">
                  <Select v-model="teacher.teacherId" style="width:140px">
                      <Option :value="teacherDetail.value" v-for="(teacherDetail,idx) in teacherInfo" :key="idx">{{teacherDetail.label}}</Option>
                  </Select>
              </FormItem>
            </Col>
            <Col span="2">
               <Button type="success" v-if="i == classItem.teacherList.length-1" @click="addTeacher(index)">添加任课教师</Button>
               <Button type="error" v-if="i !== classItem.teacherList.length-1" @click="deleteTeacher(index,i)">删除任课教师</Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Card>
    <div style="text-align:center;width:100%;" class="fcc m30">
      <Button  @click="goBack" type="success" style="margin-right:50px;">返回</Button>
      <Button  :loading="saveLoading" @click="saveTeacher" type="success">提交</Button>
    </div>
  </div>
</template>

<script>
import api from '@/api/baseApi'
export default {
  name: "teacherEdit",
  data() {
    return {
      saveLoading:false,
      teacherInfo:[],//所有任课老师
      classData:[],//当前表单数据
      studentClassId:'',
      activeGrade:'7',
      gradeList:[
        {value:'7',label:'七年级'},
        {value:'8',label:'八年级'},
        {value:'9',label:'九年级'},
      ]
    };
  },
  computed:{
    
  },
  methods: {
    activeGradeFun(){
      return this.activeGrade == '7' ? '七年级' : this.activeGrade == '8' ? '八年级' : this.activeGrade == '9' ? '九年级' : '';
    },
    selectTabs(grade){
        this.activeGrade = grade;
        this.studentClassId = ''
        this.getKunmingTeacher()
     },
    //添加任课教师
    addTeacher(i){
      this.classData[i].teacherList.push({
              "teacherId": '',
              "teacherType": "2"
            })
    },
    //删除任课教师
    deleteTeacher(index,i){
      this.classData[index].teacherList.splice(i, 1)
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //保存昆明老师配置
    async saveTeacher(){
      debugger;
      this.saveLoading = true;
      let params = this.classData
      //判断是否有添加的空老师
      for(let val of params){
        for(let [key,el] of val.teacherList.entries()){
          if(el.teacherId == ''){
            val.teacherList.splice(key, 1)
          }
        }
        if(val.teacherList.length !== this.factorySomeTeacher(val.teacherList).length){//有重复老师
          this.$Message.info(`${this.activeGradeFun()}${val.sportsClassName}请勿添加重复的任课教师。`)
          this.saveLoading = false;
          return
        }
      }
      //构建提交数据类型
      let paramsCopy = JSON.stringify(params)
      paramsCopy = JSON.parse(paramsCopy)
      let paramsData = paramsCopy.map(val=>{
        let json = {};
        val.teacherList.push({//添加班主任老师
              "teacherId": val.headmaster,
              "teacherType": "1"
            })
        json.studentClassId = val.studentClassId?val.studentClassId:''
        json.teacherIds = val.teacherList
        return json
      })
      let res = await api.upsertKunmingTeacher(paramsData)
      if (res.data.code == 10000) {
        this.saveLoading = false;
        this.$Message.info('提交成功!');
        this.goBack()
      } else {
        this.saveLoading = false;
        if (res.data.code > 39999) {
          this.$Message.info(res.data.msg);
        }
      }
      console.log('paramsData',paramsData)
    },
    /**获取所有老师列表**/
    async getSchoolTeacherForManage(){
      let res = await api.getSchoolTeacherForManage(this.schoolId)
      if (res.data.code == 10000) {
        let {teacherInfo} = res.data.response;
        let newArr = teacherInfo.map(val => {
          let json = {}
          json.label = val.name
          json.value = val.teacherId
          return json;
        });
        this.teacherInfo = newArr;
      } else {
        if (res.data.code > 39999) {
          this.$Message.info(res.data.msg);
        }
      }
    },
    /**获取昆明老师配置**/
    async getKunmingTeacher() {
      let res = await api.getKunmingTeacher(this.studentClassId,this.activeGrade)
      if (res.data.code == 10000) {
        let result = res.data.response;
        this.classData = this.factoryTeacherConfig(result)
      } else {
        if (res.data.code > 39999) {
          this.$Message.info(res.data.msg);
        }
      }
    },
    /**构建展示数据**/
    factoryTeacherConfig(result){
      if(result&&result.length>0){
        for(let val of result){
          val.teacherList = []
          if(!val.teachers || val.teachers.length<=0){
            val.teachers = [       
              {
                "teacherId": '',
                "teacherType": "1"
              },
              {
                "teacherId": '',
                "teacherType": "2"
              }
            ]
          }else if(val.teachers.length == 1){
            let newArr = val.teachers.filter((item) => {
                return item.teacherType == '1';//如果只有一个老师且是配置的班主任
            });
            if(newArr.length>0){//说明配置了一个班主任，就添加一个任课教师
              val.teachers.push({
                "teacherId": '',
                "teacherType": "2"
              })
            }else{//说明配置了一个任课教师，就添加一个班主任
              val.teachers.unshift({
                "teacherId": '',
                "teacherType": "1"
              })
            }
          }
          for(let ele of val.teachers){//过滤班主任和任课老师
            if(ele.teacherType == '1'){
              val.headmaster = ele.teacherId
              continue;
            }else{
              delete ele.teacherName 
              val.teacherList.push(ele)
            }
          }
        }
      }
      return result;
    },
    /***是否有多个相同的任课老师**/
    factorySomeTeacher(arr){
      return arr.reduce((acc, cur) => {
        !acc.some(v => v.teacherId === cur.teacherId && v.teacherType === cur.teacherType) && acc.push(cur);
        return acc;
      }, []);
    },
  },
  watch: {
  },
  mounted() {
    this.schoolId = sessionStorage.getItem('schoolId')
    let classId = this.$route.query.classId
    let grade = this.$route.query.grade
    if(classId&&grade){//编辑
      this.studentClassId = classId
      this.activeGrade = String(grade)
    }
    this.getSchoolTeacherForManage()
    this.getKunmingTeacher()
  }
};
</script>
<style scoped lang="less"></style>



