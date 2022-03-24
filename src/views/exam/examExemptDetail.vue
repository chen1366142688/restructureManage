

<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentInfo.studentName}}</h2>
    <!-- 学生信息 -->
    <Card >
      <span>性别：{{studentInfo.gender=='1'?'男':'女'}}</span>
      <span style="margin-left:100px;">学籍号：{{studentInfo.registerCode}}</span>
      <span style="margin-left:100px;">班级：{{getGrade}}{{studentInfo.studentClass}}班</span>
      <span style="margin-left:100px;">学年：{{studentInfo.yearSemester%2==0?((studentInfo.yearSemester/10).toFixed(0))+"学年第一学期":((studentInfo.yearSemester/10).toFixed(0) -1)+"学年第二学期"}}</span>
    </Card>
    <Card style="margin-top:20px;">
      <Form :label-width="100" class="function">
        <!-- 免试状态 -->
        <FormItem label="免试状态：" class="functionItem">
          <RadioGroup v-model="exemptStatus">
            <Radio label="1">免试</Radio>
            <Radio label="0">不免试</Radio>
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
          <Row>
            <Col span="24">
            <div class="demo-upload-list" v-for="(item,index) in photos" :key="index">
                  <img :src="item" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                  </div>
              <div class="oss_file" >
                <!-- <img style="width: 56px;height:56px;" :src="uploadPic" > -->
                  <Button icon="ios-cloud-upload-outline" @click="logoClick">点击上传</Button>
              <input  type="file" id="logoUrl" @change="doUpload('logoUrl')"  style="display: none;"/>
            </div>
              <img :src="logoUrl" alt="" style="height: 44pt;margin-top:5px;">
              <font v-if="percentage > 0 && percentage < 100.00" style="color:#F87D00;">上传中({{percentage}}%)</font>
            </Col>
          </Row>
          <!-- <div class="demo-upload-list" v-for="item in photos">
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
            :max-size="10240"
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
          </Upload> -->
          <Modal title v-model="visible" width="900">
            <img :src="visiUrl" v-if="visible" style="width: 100%" />
            <div slot="footer">
              <Button type="text" size="large"></Button>
              <Button type="primary" size="large" @click="submitFP">确定</Button>
            </div>
          </Modal>
        </FormItem>
        <!-- 免试项目 -->
        <FormItem label="免试项目：" class="functionItem" v-if="exemptStatus == '1'">
          <Checkbox :value="checkAllNoTest" @click.prevent.native="handleCheckAllIitem()">全部免试</Checkbox>
          <div style="margin-left:24px;">
            <div v-if="semesterStatus == 1">
            <Checkbox :value="studentInfo.activityExempt == 1 ? true : false" @click.prevent.native="handleTestActivityExempt()" >体质测试</Checkbox><br>
            </div>
            <!-- 运动技能 -->
            <Checkbox :value="allClassTestExempt"  @click.prevent.native="handleCheckAllTest()">运动技能/体能</Checkbox><br>
            <!-- 运动技能体能/二级 -->
            <div style="margin-left:24px;">
            <Checkbox v-for="(item ,index) in classTests" :key="index" :value="item.exemptStatus == 1" @click.prevent.native="handleCheckOne(item.classTestId, item.exemptStatus)">{{item.classTestName}}</Checkbox>
            </div>
            <Checkbox :value="studentInfo.healthExempt == 1? true : false" @click.prevent.native="handleHealthExempt()">健康知识</Checkbox><br>
            <Checkbox :value="studentInfo.learnExempt == 1? true : false" @click.prevent.native="handleLearnExempt()">课堂监控</Checkbox><br>
            <Checkbox :value="studentInfo.homeworkExempt == 1? true : false" @click.prevent.native="handleHomeworkExempt()">课后作业</Checkbox><br>
          </div>
        </FormItem>
      </Form>
    </Card>
    <div style="width:100%;text-align:center;margin-top:20px;">
      <Button
        @click="pageToList"
        style=" margin-right:16px;"
        type="success"
      >返回</Button>
      <Button @click="baseSubmit" type="success">保存</Button>
    </div>
    <Modal v-model="modal1" title="温馨提示" @on-ok="ok" @on-cancel="cancel">
      <p>是否删除该图片？</p>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
import OSS from 'ali-oss'
export default {
  data() {
    return {
      activityExempt1:"",
      semesterStatus:"0",
      updateUrl: "",
      studentId: "",
      exemptStatus: "",
      exemptName: "",
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
      allExempt: "",
      activityExempt: "",
      healthExempt: "",
      learnExempt: "",
      homeworkExempt: "",
      remark: "",

      modal1: false,
      exemptType: "",

      photos: [],
      defaultList: [],
      visible: false,
      visiUrl: "",
      canSubmit: false,
      deleteFile: {},
      classIds: '',

      /** 6.17修改新增变量by赵天才 */
      studentInfo: {},
      classTests: [],
      checkAllNoTest: false, // 是否为全部免试
      allClassTestExempt: false, // 运动技能全选
      
      percentage: 0,
      id: 'upload',
      logoUrl:'',
    };
  },
  watch: {
    'classTests': {
      handler:function(newVal, oldval){
        console.log('newval', newVal)
        if (newVal && newVal.length > 0) {
          // 全部项目的exemptStatus为1时即为全选
          this.allClassTestExempt = newVal.every(item => {
            return item.exemptStatus == 1
          })
        }
      },
      deep: true
    },
    /** 监听免试技能选项 */
    'mergeItemList': {
      handler(newValue, oldValue) {
        /** 同时监听运动技能和其他项目的状态，全部为1时即为全选 */
        let {activityExempt, healthExempt, homeworkExempt, learnExempt} = newValue.studentInfo
        let allClassTestExempt = newValue.allClassTestExempt
        if (activityExempt == 1 && healthExempt == 1 &&  homeworkExempt == 1 && learnExempt == 1 && allClassTestExempt) {
          this.checkAllNoTest = true
        } else {
          this.checkAllNoTest = false
        }
      },
      deep: true
　　}
  },
  computed: {
    /** 计算年级 */
    getGrade () {
      let grade = this.studentInfo.grade
      let text = ''
      switch(grade) {
        case 1: text = '一年级'
        break;
        case 2: text = '二年级'
        break;
        case 3: text = '三年级'
        break;
        case 4: text = '四年级'
        break;
        case 5: text = '五年级'
        break;
        case 6: text = '六年级'
        break;
        case 7: text = '初一'
        break;
        case 8: text = '初二'
        break;
        case 9: text = '初三'
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
  methods: {
    logoClick(){
      document.getElementById('logoUrl').value='';
          document.getElementById('logoUrl').click();
      },
    submitFP() {
      var vm = this;
      vm.visible = false;
    },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    /** 全部免试 */
    handleCheckAllIitem() {
      this.checkAllNoTest = !this.checkAllNoTest
      // let {activityExempt, healthExempt, staminaExempt} = this.studentInfo
      this.studentInfo.activityExempt = this.checkAllNoTest ? 1 : 0 // 体质测试免试
      this.studentInfo.healthExempt = this.checkAllNoTest ? 1 : 0 // 健康知识免试
      this.studentInfo.learnExempt = this.checkAllNoTest ? 1 : 0 // 课堂监控
      this.studentInfo.homeworkExempt = this.checkAllNoTest ? 1 : 0 // 课后作业
      this.allClassTestExempt = this.checkAllNoTest == true ? true : false; // 运动技能全部免试
      if (this.classTests && this.classTests.length > 0) {
        for(let i=0;i<this.classTests.length;i++){
          this.classTests[i].exemptStatus = this.allClassTestExempt ? 1 : 0;
        }
      }
    },
    /** 选择全部运动技能 */
    handleCheckAllTest(){
      this.allClassTestExempt = this.allClassTestExempt == true ? false : true;
      if (this.classTests && this.classTests.length > 0) {
        for(let i=0;i<this.classTests.length;i++){
          this.classTests[i].exemptStatus = this.allClassTestExempt ? 1 : 0;
        }
      }
    },
    /** 单个运动技能选择 */
    handleCheckOne (id, status) {
      if (this.classTests && this.classTests.length > 0) {
        for (let i = 0; i < this.classTests.length; i++) {
          let item = this.classTests[i]
          if(item.classTestId == id){
            console.log('当前项', item)
            item.exemptStatus = status == 1 ? 0 : 1
          }
        }
      }
    },
    /** 体质测试选择 */
    handleTestActivityExempt(){
      this.studentInfo.activityExempt = this.studentInfo.activityExempt == 1 ? 0 : 1
    },
    /** 健康知识选择 */
    handleHealthExempt(type){
      this.studentInfo.healthExempt = this.studentInfo.healthExempt == 1 ? 0 : 1
    },
    /** 课堂监控选择 */
    handleLearnExempt (type) {
      this.studentInfo.learnExempt = this.studentInfo.learnExempt == 1 ? 0 : 1
    },
    /** 课后作业 */
    handleHomeworkExempt (type) {
      this.studentInfo.homeworkExempt = this.studentInfo.homeworkExempt == 1 ? 0 : 1
    },
    /** 获取学生详情 */
    getStudentExamExemptDetail(studentId) {
      let that = this;
      this.$axios.get("/v1/examitemexempt/getStudentExamExemptDetail?studentId=" + studentId).then(function(res) {
          let result = res.data.response
          that.studentInfo = result;
          that.exemptStatus = result.exemptStatus
          that.activityExempt = result.activityExempt;
          that.activityExempt1 = result.activityExempt;
          that.healthExempt = result.healthExempt;
          that.learnExempt = result.learnExempt;
          that.homeworkExempt = result.homeworkExempt;
          that.remark = result.remark;
          that.photos = result.photos ? result.photos : [];
          that.classTests = result.itemList
           that.exemptType = result.exemptType
           
          // if (that.photos) {
          //   var list=[];
          //   for(let i=0;i<that.photos.length;i++){
          //     let param={
          //       name:new Date().getTime(),
          //       url:that.photos[i],
          //       status:"finished"
          //     }
          //     list.push(param);
          //   }
          //   that.photos=list;
          // }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    baseSubmit() {
      let that = this;
      let classTests = JSON.parse(JSON.stringify(this.classTests)) // 免试技能列表
      let {activityExempt,healthExempt,homeworkExempt,learnExempt} = this.studentInfo
      let testList = []
      let photoArr = [];
      if (this.photos) {
        for (let i = 0; i < this.photos.length; i++) {
          photoArr.push(this.photos[i]);
        }
      }
      if (this.exemptStatus == "1") { // 免试
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
        if (classTests && classTests.length > 0) {
          classTests = classTests.filter(val => { // 只保留selectStatus=true的数据
            return val.exemptStatus == 1
          })
          for (let i = 0; i < classTests.length; i++) {
            let data = classTests[i]
            testList.push({
              classTestId: data.classTestId,
            })
          }
        }
        if (testList.length <= 0 && activityExempt != 1 && healthExempt != 1 && homeworkExempt != 1 && learnExempt != 1) {
          that.$Message.info("请选择免试项目！");
          return false;
        }
      }
      let params = {
        activityExempt: this.semesterStatus == 0?this.activityExempt1:activityExempt ? String(activityExempt) : '0', // 体质测试
        exemptStatus: this.exemptStatus, // 免测状态 1是0否
        exemptType: this.exemptType, // 免测类型
        healthExempt: healthExempt ? String(healthExempt) : '0', // 健康知识
        photos: photoArr,
        remark: this.remark,
        homeworkExempt: homeworkExempt  ? String(homeworkExempt) : '0', // 中小学-课后作业
        learnExempt: learnExempt ? String(learnExempt) : '0', // 课堂监控
        studentId: this.studentId,
        testList: testList.length ? testList : []
      };
      this.$axios.get(`/v1/subjectReport/querySchoolReportedStatus?dataType=2`).then(res => {
        if (res.data.code === 10000) {
          let {editStatus} = res.data.response
          if (editStatus === '1') { // 可编辑
            this.$axios.post("/v1/examitemexempt/saveStudentSemesterExempt", params).then(function(res) {
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
          } else { // 不可编辑
            this.$Modal.info({
              title: '提醒',
              okText: '知道了',
              closable: false,
              content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>',
            });
            return false
          }
        }
      })
    },
    handleView(imgUrl) {
      var vm = this;
      vm.visible = true;
      vm.visiUrl = imgUrl;
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
      document.getElementById('logoUrl').value='';
    },
    cancel() {},
    handleSuccess(res, file) {
      var vm = this;
      file.url = res.response[0];

      vm.photos.push(file);
    },
    handleFormatError(file) {
      this.$Modal.info({
              title: '图片格式错误',
              okText: '知道了',
              closable: false,
              content:  "图片 " + file.name + " 格式错误, 请检查"
            });
      // this.$Notice.warning({
      //   title: "图片格式错误",
      //   desc: "图片 " + file.name + " 格式错误, 请检查"
      // });
    },
    handleMaxSize(file) {
      this.$Modal.info({
              title: '图片大小超出限制',
              okText: '知道了',
              closable: false,
              content:  "图片  " + file.name + "大小超出限制"
            });
      // this.$Notice.warning({
      //   title: "图片大小超出限制",
      //   desc: "图片  " + file.name + "大小超出限制"
      // });
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
    },
    doUpload (id) {
        const vm = this;
        console.log(vm.photos)
        if(vm.photos && vm.photos.length>10){
          this.$Modal.info({
              title: '图片数量过多',
              okText: '知道了',
              closable: false,
              content:  "最多只能上传十张照片"
            });
            return
        }
        const urls = [];
        var timestamp = (new Date()).valueOf();
        //上次请求STS的时间和当前时间的时间差
        let second = parseInt((timestamp - localStorage.getItem('overTimes')) / 1000/60);
        this.$axios.get('/v1/file/getOssFileUploadToken',).then((result) => {
          this.overTimes = result.data.response.overTimes;
          localStorage.setItem('overTimes',result.data.response.overTimes)
          this.bucket = result.data.response.bucket;
          let info = {
              region: result.data.response.region,
              accessKeyId: result.data.response.accessKeyId,
              accessKeySecret: result.data.response.accessKeySecret,
              stsToken: result.data.response.securityToken,
              bucket: result.data.response.bucket,
              secure:true
          }
        
          let client = new OSS(info);
         vm.percentage = 0;
          const files = document.getElementById(id)
          if (files.files) {
            const fileLen = document.getElementById(id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              let fileShow = file.name.split('.').pop();
              //上传的类型 后缀名
              if(file.size > 10*1024*1024){
                  vm.$Message.info("大小不能超过10M！");
                  return false;
              }
              // 随机命名
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              // 上传
              client.multipartUpload(random_name, file, {
                progress: function (percentage, cpt) {
                  // 上传进度
                  vm.percentage = (percentage*100).toFixed(2);
                }

              }).then((results) => {
                  console.log(results);
                  if(id=="logoUrl"){
                      let logoUrl = 'https://tanma-teacher-video-online.oss-cn-chengdu.aliyuncs.com/'+random_name
                      vm.photos.push(logoUrl);
                  }
                 }).catch((err) => { console.log(err) })
                 }
          }
      })
    },
    // 随机生成文件名
    random_string(len) { 　　
      len = len || 32; 　　
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 　　
      var maxPos = chars.length; 　　
      var pwd = ''; 　　
      for (let i = 0; i < len; i++) { 　　
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
  },
  mounted() {
    var vm = this;
    vm.updateUrl =
      this.$axios.defaults.baseURL + "/v1/file/upload?type=manage_img";
    vm.studentId = sessionStorage.getItem(
      "examExemptStudent-examExemptDetail-studentId"
    );
    vm.getYearSemester();
    vm.getStudentExamExemptDetail(vm.studentId);
  },
  destroyed() {}
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
