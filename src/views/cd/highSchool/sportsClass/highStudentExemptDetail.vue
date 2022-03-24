<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}</h2>
    <!-- 学生信息 -->
    <Card>
      <div style="display:flex;justify-content:flex-start;flex-wrap:wrap">
        <span style="margin:5px 30px;">性别：{{gender=='1'?'男':'女'}}</span>
        <span style="margin:5px 30px;">学籍号：{{registerCode}}</span>
        <span style="margin:5px 30px;">班级：{{getGrade}}{{studentClass}}班</span>
        <span style="margin:5px 30px;">学年：{{yearSemester%2==0?((yearSemester/10).toFixed(0))+"学年第一学期":((yearSemester/10).toFixed(0) -1)+"学年第二学期"}}</span>
      </div>
    </Card>
    <!-- 表单 -->
    <Card style="margin-top:20px;">
      <Form :label-width="100" class="function">
        <!-- 免试状态 -->
        <FormItem label="免试状态：" class="functionItem">
          <RadioGroup v-model="exemptStatus">
            <Radio label="1">免试</Radio>
            <Radio label="0">未免试</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 免试类型 -->
        <FormItem label="免试类型：" class="functionItem" v-if="exemptStatus == 1">
          <Select v-model="exemptType" size="small" style="width:180px;">
            <Option
              v-for="item in exemptTypeList"
              :value="item.type"
              :key="item.type"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <!-- 免试说明 -->
        <FormItem label="免试说明：" class="functionItem" v-if="exemptStatus == 1">
          <Input
            v-model="remark"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 8}"
            style="width:70%;"
          />
        </FormItem>
        <!-- 相关证明 -->
        <FormItem label="相关证明：" class="functionItem" v-if="exemptStatus == 1">
          <div class="demo-upload-list" v-for="(item,index) in photos" :key="index">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            name="muFiles"
            :action="updateUrl"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title v-model="visible" width="900">
            <img :src="visiUrl" v-if="visible" style="width: 100%" />
            <div slot="footer">
              <Button type="text" size="large"></Button>
              <Button type="primary" size="large" @click="submitFP">确定</Button>
            </div>
          </Modal>
        </FormItem>
        <!-- 免试项目 -->
        <FormItem label="免试项目：" class="functionItem" v-if="exemptStatus == 1">
          <Checkbox :value="checkAllNoTest" @click.prevent.native="handleCheckAllIitem()">全部免试</Checkbox><br>
          <div style="margin-left:24px;">
            <div v-if="semesterStatus == 1">
            <Checkbox  :value="studentInfo.activityExempt == 1 ? true : false" @click.prevent.native="handleTestActivityExempt()" >体质测试</Checkbox><br>
            </div>
            <Checkbox :value="studentInfo.healthExempt == 1? true : false" @click.prevent.native="handleHealthExempt()">健康知识</Checkbox><br>
            <Checkbox :value="studentInfo.staminaExempt == 1 ? true : false" @click.prevent.native="handleStaminaExempt()">体能</Checkbox><br>
            <Checkbox :value="allClassTestExempt" @click.prevent.native="handleCheckAllTest()" :disabled="classTests.length <= 0">运动技能</Checkbox>
            <!-- 运动技能下的二级项目 -->
            <div
              style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;margin-left:20px;"
              v-for="(test,aindex) in classTests"
              :key="aindex"
            >
              <!-- 二级 -->
              <Checkbox :value="test.selectStatus" @click.prevent.native="handleCheckItemAll(test.classTestId)">{{test.classTestName}}</Checkbox><br/>
              <!-- 三级 -->
              <Checkbox
                :value="item.selectStatus" style="margin-left:20px;"
                v-for="(item,bindex) in test.itemList" :key="bindex"
                @click.prevent.native="handleCheckOne(test.classTestId,item.exemptId,item.exemptType)"
              >
                {{item.exemptName}}
              </Checkbox>
            </div>
          </div>
        </FormItem>
      </Form>
    </Card>
    <div style="margin:10px auto;text-align:center">
      <Button @click="pageToList" style="margin-right:50px;width:100px" type="success">返回</Button>
      <Button style="width:100px" @click="baseSubmit" type="success">保存</Button>
    </div>
    <Modal v-model="modal1" title="温馨提示" @on-ok="ok" @on-cancel="cancel">
      <p>是否删除该图片？</p>
    </Modal>
  </div>

</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      activityExempt:"",
      semesterStatus:"0",
      checked: false,
      yearSemester: '', // 学年
      checkedname: [],
      modal1: false,
      updateUrl: "",
      activityId: "",
      studentId: "",
      studentName: "",
      registerCode: "",
      activityName: "",
      gradeName: "",
      startSchool: "",
      studentClass: "",
      majorName: "",
      gender: "",
      twoexamItemName: [],
      twoexamItemId: "",
      exemptStatus: "",
      exemptTf: false,
      exemptTypeList: [
        {
          type: "1",
          name: "疾病"
        },
        {
          type: "2",
          name: "残疾"
        }
      ],
      exemptType: "1",
      remark: "",
      photos: [],
      defaultList: [],
      visible: false,
      visiUrl: "",
      canSubmit: false,
      deleteFile: {},
      classIds: [],
      classList: [],
      exemptId: "",
      twoexemptId:"",
      date:[],
      classTests:[], // 免考项目列表
      healthExempt:false,
      staminaExempt:false,
      testActivityExempt:false,

      /** 6.17修改所增加的变量-by赵天才 */
      checkAllNoTest: false, // 是否全部免试
      allCheckedItemList: [], // 全部免试列表
      studentInfo: '', // 学生信息
      allClassTestExempt:false,
    };
  },
  watch: {
    /** 监听免试技能选项 */
    'mergeItemList': {
      handler(newValue, oldValue) {
        /** 同时监听运动技能和其他项目的状态，全部为1时即为全选 */
        let {activityExempt, healthExempt, staminaExempt } = newValue.studentInfo
        let allClassTestExempt = newValue.allClassTestExempt
        if (activityExempt == 1 && healthExempt == 1 && staminaExempt == 1 && allClassTestExempt) {
          this.checkAllNoTest = true
        } else {
          this.checkAllNoTest = false
        }
      },
      deep: true
　　}
  }, //以V-model绑定数据时使用的数据变化监测
  computed: {
    /** 计算年级 */
    getGrade () {
      let grade = this.studentInfo.grade
      let text = ''
      switch(grade) {
        case 10: text = '高一'
        break;
        case 11: text = '高二'
        break;
        case 12: text = '高三'
        break;
      }
      return text
    },
    /** 合并运动技能免试和其他免试的数据 */
    mergeItemList () {
      const {studentInfo, allClassTestExempt} = this
      return {studentInfo, allClassTestExempt}
    }
  },
  mounted() {
    this.activityId = sessionStorage.getItem("studentManage-studentExemptDetail-activityId");
    this.updateUrl = this.$axios.defaults.baseURL + "/v1/file/upload?type=manage_img";
    this.studentId = sessionStorage.getItem("examExemptStudent-examExemptDetail-studentId");
    this.getYearSemester();
    this.queryHighStudentSemesterExamExemptDetail(this.studentId);
    this.getStudentExamExemptDetail(this.studentId) // 获取学生详情数据
  },
  methods: {
    /** 选择单个 */
    handleCheckOne(classTestId,exemptId,exemptType){
      this.allClassTestExempt = true;
      for(let i=0;i<this.classTests.length;i++){
        if(this.classTests[i].classTestId == classTestId){
          let allSelect = true;
          for(let j=0;j<this.classTests[i].itemList.length;j++){
            if(this.classTests[i].itemList[j].exemptId == exemptId && this.classTests[i].itemList[j].exemptType == exemptType){
              this.classTests[i].itemList[j].selectStatus = this.classTests[i].itemList[j].selectStatus==true?false:true;
            }
            if(this.classTests[i].itemList[j].selectStatus == false){
              allSelect = false;
            }
          }
          this.classTests[i].selectStatus = allSelect;
          if (allSelect == false) {
            this.allClassTestExempt = false;
          }
        }else{
          let allSelect = true;
          for(let j=0;j<this.classTests[i].itemList.length;j++){
            if(this.classTests[i].itemList[j].selectStatus == false){
              allSelect = false;
            }
          }
          this.classTests[i].selectStatus = allSelect;
          if (allSelect == false) {
            this.allClassTestExempt = false;
          }
        }
      }
    },
    /** 二级全选 */
    handleCheckItemAll(classTestId){
      this.allClassTestExempt = true;
        for(let i=0;i<this.classTests.length;i++){
            if(this.classTests[i].classTestId == classTestId){
                let allSelect = this.classTests[i].selectStatus==true?false:true;
                for(let j=0;j<this.classTests[i].itemList.length;j++){
                    if(allSelect == false){
                        this.classTests[i].itemList[j].selectStatus=false;
                    }else{
                        this.classTests[i].itemList[j].selectStatus=true;
                    }
                }
                this.classTests[i].selectStatus = allSelect;
                if(allSelect == false){
                   this.allClassTestExempt = false;
                }
            }else{
                let allSelect = true;
                for(let j=0;j<this.classTests[i].itemList.length;j++){
                    if(this.classTests[i].itemList[j].selectStatus == false){
                        allSelect = false;
                    }
                }
                this.classTests[i].selectStatus = allSelect;
                if(allSelect == false){
                   this.allClassTestExempt = false;
                }
            }
        }
    },
    /** 选择全部运动技能 */
    handleCheckAllTest(){
      if (this.classTests.length <= 0) {
        this.$Message.info('未配置项目！')
        return false
      }
      this.allClassTestExempt = this.allClassTestExempt == true ? false : true;
      for(let i=0;i<this.classTests.length;i++){
        for(let j=0;j<this.classTests[i].itemList.length;j++){
            this.classTests[i].itemList[j].selectStatus=this.allClassTestExempt;
        }
        this.classTests[i].selectStatus = this.allClassTestExempt;
      }
    },
    /** 全部免试 */
    handleCheckAllIitem() {
      this.checkAllNoTest = !this.checkAllNoTest
      // let {activityExempt, healthExempt, staminaExempt} = this.studentInfo
      this.studentInfo.activityExempt = this.checkAllNoTest == 1 ? 1 : 2 // 体质测试免试
      this.studentInfo.healthExempt = this.checkAllNoTest == 1 ? 1 : 2 // 健康知识免试
      this.studentInfo.staminaExempt = this.checkAllNoTest == 1 ? 1 : 2 // 体能免试
      this.allClassTestExempt = this.checkAllNoTest == true ? true : false; // 运动技能全部免试
      for(let i=0;i<this.classTests.length;i++){
        for(let j=0;j<this.classTests[i].itemList.length;j++){
          this.classTests[i].itemList[j].selectStatus = this.checkAllNoTest;
        }
        this.classTests[i].selectStatus = this.checkAllNoTest;
      }
    },
    /** 体质测试选择 */
    handleTestActivityExempt(){
      this.studentInfo.activityExempt = this.studentInfo.activityExempt == 1 ? 2 : 1
    },
    /** 健康知识选择 */
    handleHealthExempt(type){
      this.studentInfo.healthExempt = this.studentInfo.healthExempt == 1 ? 2 : 1
    },
    /** 体能选择 */
    handleStaminaExempt(){
      this.studentInfo.staminaExempt = this.studentInfo.staminaExempt == 1 ? 2 : 1
    },
    submitFP() {
      var vm = this;
      vm.visible = false;
    },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    /** 高中 根据学生查询 学生学期技能 免测情况 */
    queryHighStudentSemesterExamExemptDetail(studentId) {
      let vm = this
      let url = `/v1/cd/high/exempt/queryHighStudentSemesterExamExemptDetail?studentId=${studentId}`
      this.$axios.get(url).then(function(response) {
        let data = response.data.response;
        if (data && data.length > 0) {
          let classTests = []
          let testMap = new Map()
          for (let i = 0; i<data.length; i++) {
            let itemList = [];
            //判断是否已经存在 一级项目
            if(testMap.get(data[i].classTestId) == null){ // 不存在一级项目
              let testInfo={
                classTestId:data[i].classTestId,
                classTestName:data[i].classTestName,
                selectStatus:false,
                itemList:[],
              }
              classTests.push(testInfo);
              let learn = {//学习态度
                exemptType:'1',
                exemptId:1,
                exemptName:'学习态度',
                selectStatus:data[i].learnExempt == '1' ? true : false
              }
              let home = {//课外锻炼
                exemptType:'2',
                exemptId:2,
                exemptName:'课后锻炼',
                selectStatus:data[i].homeworkExempt == '1' ? true : false
              }
              itemList.push(learn);
              itemList.push(home);
            } else {//存在则获取之前的二级项目
              itemList = testMap.get(data[i].classTestId);
            }
            let item = {
              exemptType:'3',
              exemptId:data[i].examItemId,
              exemptName:data[i].examItemName,
              selectStatus:data[i].itemExamExempt=='1'?true:false
            }
            itemList.push(item);
            testMap.set(data[i].classTestId,itemList)
          }
          for(let i=0;i<classTests.length;i++){
            classTests[i].itemList = testMap.get(classTests[i].classTestId)
            vm.classTests.push(classTests[i]);
          }
          vm.handleCheckItemAll(0);
        }
      })
      .catch(function(response) {
        console.log(response);
      });
    },
    /** 获取学生详情数据 */
    getStudentExamExemptDetail(studentId) {
      let that = this;
      let url = `/v1/examitemexempt/getStudentExamExemptDetail?studentId=${studentId}`
      this.$axios.get(url).then(function(response) {
          let data = response.data.response;
          that.studentInfo = data || {}
          //把初始的体测免试数据保存
          that.activityExempt = that.studentInfo.activityExempt;
          that.yearSemester = data.yearSemester ? data.yearSemester : '' // 学年
          that.studentName = data.studentName ? data.studentName : "";
          that.registerCode = data.registerCode ? data.registerCode : "";
          that.gradeName = data.gradeName ? data.gradeName : "";
          that.startSchool = data.startSchool ? data.startSchool : "";
          that.studentClass = data.studentClass ? data.studentClass : "";
          that.gender = data.gender ? data.gender : "";
          that.exemptType = data.exemptType ? data.exemptType : "";
          that.exemptStatus = data.exemptStatus
          that.remark = data.remark;
          that.exemptId = data.exemptId;
          that.photos = data.photos ? data.photos : [];
          that.classIds = data.classTestIds ? data.classTestIds : [];
          that.checkedname = data.checkedname ? data.checkedname : [];
          that.date=data.twoclassTestIds ? data.twoclassTestIds :[];
          that.de=data.de?data.de:[];
          if(that.photos){
             var list=[];
              for(let i=0;i<that.photos.length;i++){
                  let param={
                      name:new Date().getTime(),
                      url:that.photos[i],
                      status:"finished"
                  }
                  list.push(param);
              }
              that.photos=list;

          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    /** 保存免试信息 */
    baseSubmit() {
      let that = this;
      let classTests = JSON.parse(JSON.stringify(this.classTests)) // 免试技能列表
      let {activityExempt,healthExempt,staminaExempt} = this.studentInfo
      let testList = []
      let photoArr = []; // 上传的图片
      if (this.photos) {
        for (let i = 0; i < this.photos.length; i++) {
          photoArr.push(this.photos[i].url);
        }
      }
      if (this.exemptStatus == "1") {
        if (that.exemptType == "" || that.exemptType == null) {
          that.$Message.info("请选择免试类型！");
          return false;
        }
        if (that.remark == "" || that.remark == null) {
          that.$Message.info("请填写免试说明！");
          return false;
        }
        if (photoArr.length <= 0) {
          that.$Message.info("请上传相关证明材料图片！");
          return false;
        }
        for (let i = 0; i < classTests.length; i++) {
          let data = classTests[i]
          let homeworkExempt = '0'
          let learnExempt = '0'
          let newList = []
          data.itemList = data.itemList.filter(val => { // 只保留selectStatus=true的数据
            return val.selectStatus
          })
          data.itemList.forEach(value => { // 重组itemList
            if (value.exemptType === '1') { // 学习态度
              learnExempt = '1'
            } else if (value.exemptType === '2') { // 课后锻炼
              homeworkExempt = '1'
            } else {
              return newList.push({examItemId: value.exemptId})
            }
          })
          // 判断：如果发现学习态度和课后锻炼不为1同时itemList为空时提示用户选择免试项目
          // if (data.itemList.length <= 0 && learnExempt != 1 && homeworkExempt != 1) {
          //   canNotSubmit = true
          // }
          testList.push({
            classTestId: data.classTestId,
            itemList: newList,
            homeworkExempt: homeworkExempt,
            learnExempt: learnExempt
          })
        }
        // homeworkExempt-课后锻炼 learnExempt-学习态度都未选择时，并且其他项未选择时不能提交
        let canNotSubmit = testList.every(val => {
          return val.itemList.length <= 0 && val.homeworkExempt != 1 && val.learnExempt != 1
        })
        // 体质测试、健康知识、体能测试都不为1时说明未选中免试-不可提交
        // 如果运动技能下的三级项目未选中任何一项时-不可提交 canNotSubmit = true时
        if (canNotSubmit && activityExempt != 1 && staminaExempt != 1 && healthExempt != 1) {
          that.$Message.info("请选择免试项目！");
          return false;
        }
      }
      let params = {
        activityExempt:this.semesterStatus == 0?this.activityExempt :activityExempt ? String(activityExempt) : '0', // 体质测试
        exemptStatus: this.exemptStatus, // 免测状态 1是0否
        exemptType: this.exemptType, // 免测类型
        healthExempt: healthExempt ? String(healthExempt) : '0', // 健康知识
        photos: photoArr,
        remark: this.remark,
        staminaExempt: staminaExempt ? String(staminaExempt) : '0', // 高中-体能免测
        studentId: this.studentId,
        testList: testList
      };
      const url = '/v1/cd/high/exempt/saveStudentSemesterExempt'
      this.$axios.post(url, params).then(function(res) {
        if (res.data.code === 10000) {
          that.$Message.info("提交成功");
          that.$router.go(-1);
        } else {
          that.$Message.info("提交失败");
        }
      })
      .catch(function(response) {
        console.log(response);
        that.$Message.info("提交失败");
      });
    },
    handleView(item) {
      var vm = this;
      vm.visible = true;
      vm.visiUrl = item.url;
    },
    handleRemove(file) {
      var vm = this;
      vm.deleteFile = file;
      vm.modal1 = true;
    },
    ok() {
      var vm = this;
      const photos = vm.photos;
      photos.splice(photos.indexOf(vm.deleteFile), 1);
    },
    cancel() {},
    handleSuccess(res, file) {
      var vm = this;
      file.url = res.response[0];

      vm.photos.push(file);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "图片格式错误",
        desc: "图片 " + file.name + " 格式错误, 请检查"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超出限制",
        desc: "图片  " + file.name + "大小超出限制"
      });
    },
    getYearSemester () {
    this.$axios
        .get(
            '/v1/schoolsemesternotice/getYearSemester'
        )
        .then(res => {
            if (res.data.code == 10000) {
                this.semesterStatus = res.data.response;
            } else {
                if (res.data.code > 39999) {
                    this.$Message.info(res.data.msg);
                }
            }
        });
    },
    handleBeforeUpload() {
      const check = this.photos.length < 10;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传十张照片"
        });
      }
      return check;
    }
  },
};
</script>
<style scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
