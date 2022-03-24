<style>
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{pageTitle}}</h2>
    </div>
    <div>
          <Card>
            <Form ref="teacherData" :model="teacherData">
              <FormItem label="账号状态：" v-if="teacherData.isAdmin=='0'">
                <Row>
                  <Col span="4">
                    <RadioGroup v-model="teacherData.auditStatus">
                      <Radio label="0">失效</Radio>
                      <Radio label="1">生效</Radio>
                    </RadioGroup>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="人员类型：">
                <Row>
                  <Col span="4">
                    <Select v-model="teacherData.teacherType" style="width:150px">
                      <Option
                        v-for="item in teacherTypeList"
                        :value="item.itemId"
                        :key="item.itemId"
                      >{{ item.itemName }}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="人员名称：">
                <Row>
                  <Col span="4">
                    <Input v-model="teacherData.name" :maxlength="255"/>
                  </Col>
                </Row>
              </FormItem>
              <FormItem v-if="teacherData.isAdmin=='0'" label="角色权限：" >
                <Row>
                  <Col span="4">
                    <Select v-model="groupId" style="width:150px">
                      <Option
                        v-for="item in groupList"
                        :value="item.groupId"
                        :key="item.groupId"
                      >{{ item.groupName }}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="登录手机：">
                <Row>
                  <Col span="4">
                    <Input v-model="teacherData.phoneNum" :maxlength="11"/>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="登录密码：">
                <Row>
                  <Col span="4">
                    <Input type="password" v-model="teacherData.passWord" :maxlength="20"/>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Card>
          <div style="width:100%;text-align:center;margin-top:30px;">
            <Button
              @click="pageToTeacherList"
              type="success"
              style="margin-right:50px;"
            >返回</Button>
            <Button
              @click="saveOrUpdateTeacher"
              :loading="saveLoading"
              type="success"
            >提交结果</Button>
          </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "teacherDetail",
  data() {
    return {
      pageTitle: "新增教师账户",
      teacherData: {
        schoolId: "",
        teacherId: "",
        teacherType: "1",
        name: "",
        phoneNum: "",
        passWord: "",
        passWordOld: "",
        auditStatus: "1",
        isAdmin: "0"
      },
      teacherTypeList: [
        { itemId: "1", itemName: "教师" },
        { itemId: "2", itemName: "行政人员" }
      ],
      saveLoading: false,
      groupList:[],
      groupId:'',
      schoolType: '',
    };
  },
  methods: {
    getTeacherData(teacherId) {
      //编辑时获取场馆数据
      this.pageTitle = "编辑教师账户";
      this.$axios
        .get("/v1/school/getTeacherDetail?teacherId=" + teacherId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.teacherData = data;
            this.groupId=data.groupId;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getSchoolEnableGroupList() {
      var vm = this;
      this.$axios.get("/v1/organbase/getSchoolEnableGroupList").then(res => {
        if (res.data.code == 10000) {
          vm.groupList = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    pageToTeacherList() {
      //返回
      this.$router.go(-1);
    },
    checkPass(s){
      if(s.length < 8 || s.length>30){
            return 0;
      }
      var ls = 0;
      if(s.match(/([a-z])+/)){
          ls++;
        }

      if(s.match(/([0-9])+/)){
            ls++;  
      }
      if(s.match(/([A-Z])+/)){
              ls++;
        }
      if(s.match(/[^a-zA-Z0-9]+/)){
            ls++;
        }
          return ls
    },
    saveOrUpdateTeacher() {
      //保存处理
      this.saveLoading = true;
      this.teacherData.groupId=this.groupId;
      var paramData = JSON.parse(JSON.stringify(this.teacherData));
      if (paramData.name == "") {
        this.$Message.error("请输入人员名称！");
        this.saveLoading = false;
        return false;
      }
      if(this.teacherData.isAdmin == '0'){
         if (!this.groupId || this.groupId == "") {
            this.$Message.error("请选择该教师的权限！");
            this.saveLoading = false;
            return false;
          }
      }
      if (paramData.phoneNum == "") {
        this.$Message.error("请输入登录手机！");
        this.saveLoading = false;
        return false;
      }
      let reg = /^[1][0-9]{10}$/;
      if (!reg.test(paramData.phoneNum)) {
        this.$Message.info("请输入正确的手机号！");
        this.saveLoading = false;
        return;
      }
      if(paramData.passWord=='-------------------'){
      }else{
        if (paramData.passWord == "") {
          this.$Message.error("请输入登录密码！");
          this.saveLoading = false;
          return false;
        }
        var int=this.checkPass(paramData.passWord);
        if(int==0){
          this.$Message.error("登录密码为8至20位由数字、大小写字母、特殊字符中的两种进行组合！");
          this.saveLoading = false;
            return false;
        }
        if(int <2){
          this.$Message.error("您的密码复杂度太低（密码中必须包含数字、大小写字母、特殊字符中的两种），请从新输入密码！");
          this.saveLoading = false;
            return false;
        }
        paramData.passWord = md5(paramData.passWord);
      }
      
      // let passWordReg = /^[A-Za-z0-9]{6,20}$/;
      // if (paramData.teacherId == "") {
      //   if (!passWordReg.test(paramData.passWord)) {
      //     this.$Message.error("登录密码为6至20位的数字或字符！");
      //     this.saveLoading = false;
      //     return false;
      //   }
      //   paramData.passWord = md5(paramData.passWord);
      // } else {
      //   if (paramData.passWord != paramData.passWordOld) {
      //     if (!passWordReg.test(paramData.passWord)) {
      //       this.$Message.error("登录密码为6至20位的数字或字符！");
      //       this.saveLoading = false;
      //       return false;
      //     }
      //     paramData.passWord = md5(paramData.passWord);
      //   }
      // }
      paramData.schoolType = this.schoolType;
      //保存
      this.$axios.post("/v1/school/saveSchoolTeacher", paramData).then(res => {
        if (res.data.code == 10000) {
          this.$Message.info("保存成功！");
          this.$router.go(-1);
        } else {
          this.saveLoading = false;
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getRanNum(length) {
      var ranNum = "";
      for (var i = 0; i < length; i++) ranNum += Math.floor(Math.random() * 10);
      return ranNum;
    }
  },
  mounted() {
    this.schoolType = sessionStorage.getItem("schoolType");
    if(this.schoolType == '' || this.schoolType == null){
      this.schoolType = '2';
    }
    if (sessionStorage.getItem("teacherList-teacherDetail-teacherId") != null) {
      this.getTeacherData(
        sessionStorage.getItem("teacherList-teacherDetail-teacherId")
      );
    } else {
      // this.teacherData.passWord=this.getRanNum(6);
      this.teacherData.schoolId = sessionStorage.getItem(
        "teacherList-schoolId"
      );
    }
    this.getSchoolEnableGroupList();
  },
  watch: {}
};
</script>
