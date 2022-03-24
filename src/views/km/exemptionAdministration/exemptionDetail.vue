

<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentInfo.name}}</h2>
    <!-- 学生信息 -->
    <Card >
      <span>性别：{{studentInfo.gender=='1'?'男':'女'}}</span>
      <span style="margin-left:100px;">学籍号：{{studentInfo.registerCode}}</span>
      <span style="margin-left:100px;">班级：{{getGrade}}{{studentInfo.sportsClassName}}</span>
    </Card>
    <Card style="margin-top:20px;">
      <Form class="function">
        <!-- 免试状态 -->
        <FormItem label="免试状态：" class="functionItem">
          <RadioGroup v-model="exemptStatus">
            <Radio label="1">{{schoolDistrict == 2000 ?'免考':"免试"}}</Radio>
            <Radio label="0">{{schoolDistrict == 2000 ?'不免考':"不免试"}}</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 免试类型 -->
        <FormItem label="免试类型：" class="functionItem" v-if="exemptStatus == 1">
          <RadioGroup v-model="exemptType">
            <Radio label="0">年度{{schoolDistrict == 2000 ?'免考':"免试"}}</Radio>
            <Radio label="1">三年连续{{schoolDistrict == 2000 ?'免考':"免试"}}</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 免试类型 -->
        <FormItem :label="schoolDistrict == 2000 ?'免考原因:':'免试原因:'" class="functionItem" v-if="exemptStatus == 1">
          <Select v-model="exemptReason" size="small" style="width:180px;">
            <Option
              v-for="item in exemptTypeList"
              :value="item.type"
              :key="item.type"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <!-- 免试说明 -->
        <FormItem :label="schoolDistrict == 2000 ?'免考说明':'免试说明'" class="functionItem" v-if="exemptStatus == 1">
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
            <Col span="20">
              <div class="demo-upload-list" v-for="item in photos">
                <img :src="item" />
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </div>
              <div class="oss_file" >
                <Button icon="ios-cloud-upload-outline" @click="logoClick">点击上传</Button>
                <input type="file" id="logoUrl" @change="doUpload('logoUrl')"  style="display: none;"/>
              </div>
              <img :src="logoUrl" alt="" style="height: 44pt;margin-top:5px;">
              <font v-if="percentage > 0 && percentage < 100.00" style="color:#F87D00;">上传中({{percentage}}%)</font>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Card>
    <div class="m30" style="width:100%;text-align:center;">
      <Button @click="pageToList" type="success" style="margin-right:50px;">返回</Button>
      <Button @click="baseSubmit" type="success">保存</Button>
    </div>
    <Modal title="查看大图" v-model="visible">
      <img :src="visiUrl" v-if="visible" style="width: 100%" />
      <div slot="footer">
        <Button type="text" size="large"></Button>
        <Button type="primary" size="large" @click="visible = false">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal1" title="温馨提示" @on-ok="deleteFileImg">
      <p>是否删除该图片？</p>
    </Modal>
  </div>
</template>
<script>
import OSS from 'ali-oss'
import api from '@/api/baseApi'
import util from '@/libs/util'
export default {
  data() {
    return {
      updateUrl: "",
      exemptStatus: "",//是否免试
      exemptReason:'',//免试类型
      exemptType: "",//免试原因
      schoolDistrict: '',
      exemptTypeList: [
        {
          type: "0",
          name: "疾病"
        },
        {
          type: "1",
          name: "残疾"
        }
      ],
      remark: "",//免试说明
      modal1: false,
      photos: [],
      visible: false,
      visiUrl: "",
      deleteFile: {},
      studentInfo: {},
      percentage: 0,
      id: 'upload',
      logoUrl:'',
      schoolId:''
    };
  },
  watch: {},
  created(){
    this.schoolDistrict = sessionStorage.getItem('schoolDistrict')
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
        case 7: text = '七年级'
        break;
        case 8: text = '八年级'
        break;
        case 9: text = '九年级'
        break;
      }
      return text
    },
  },
  methods: {
    /**点击触发上传文件**/
    logoClick(){
      document.getElementById('logoUrl').value='';
      document.getElementById('logoUrl').click();
    },
    //返回
    pageToList() {
      this.$router.go(-1);
    },
    /** 获取学生详情 */
    async getStudentExamExemptDetail(studentId) {
      let that = this;
      let res = await api.getExemptInfById(studentId)
      let result = res.data.response
      if(result){
        that.exemptReason = result.exemptionReason
        that.exemptType = result.exemptionType
        that.remark = result.exemptionRemark;
        that.photos = result.photos ? result.photos.map(val=>val.annexUrl) : []
      }
    },
    /**保存，确认是不是需要查看是否是可编辑状态**/
    async baseSubmit() {
      let that = this;
      let {yearSemester,studentId} = this.studentInfo
      let photoArr = [];
      if (this.photos) {
        for (let i = 0; i < this.photos.length; i++) {
          photoArr.push(this.photos[i]);
        }
      }
      if (this.exemptStatus == "1") { // 免试
        if (that.exemptReason == "" || that.exemptReason == null) {
          that.$Message.info(`请选择${schoolDistrict == 2000 ?'免考':'免试'}类型！`);
          return false;
        }
        if (that.exemptType == "" || that.exemptType == null) {
          that.$Message.info("请选择免试原因！");
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
      }
      //新接口需提交的数据
      let params = {
        "isExempt": this.exemptStatus,
        "exemptionReason": this.exemptReason,
        "exemptionRemark": this.remark,
        "exemptionType": this.exemptType,
        "photos": photoArr,
        "schoolId": this.schoolId,
        "studentId": studentId,
        "yearSemester": yearSemester
      }
      let res = await api.upsertExemptInfo(params)
      if (res.data.code === 10000) {
        that.$Message.info("提交成功");
        that.$router.go(-1);
      } else {
        that.$Message.info("提交失败");
      }
    },
    handleView(item) {
      this.visible = true;
      this.visiUrl = item;
    },
    handleRemove(file) {
      this.deleteFile = file;
      this.modal1 = true;
    },
    /**确认删除图片**/
    deleteFileImg() {
      var vm = this;
      let photos = vm.photos;
      photos.splice(photos.indexOf(vm.deleteFile), 1);
      document.getElementById('logoUrl').value='';
    },
    /**上传**/
    async doUpload (id) {
      const vm = this;
      if(vm.photos && vm.photos.length>10){
        this.$Modal.info({
            title: '图片数量过多',
            okText: '知道了',
            closable: false,
            content:  "最多只能上传十张照片"
          });
          return
      }
      let result = await api.getOssFileUploadToken()
      this.overTimes = result.data.response.overTimes;
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
        for (let i = 0; i < fileLen.length; i++) {
          const file = fileLen[i]
          if(file.size > 10*1024*1024){
              vm.$Message.info("大小不能超过10M！");
              return false;
          }
          let random_name = util.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
          client.multipartUpload(random_name, file, {
            progress: function (percentage, cpt) {
              vm.percentage = (percentage*100).toFixed(2);
            }
          }).then(() => {
              if(id=="logoUrl"){
                let logoUrl = 'https://tanma-teacher-video-online.oss-cn-chengdu.aliyuncs.com/'+random_name
                vm.photos.push(logoUrl);
              }
          }).catch((err) => { console.log(err) })
        }
      }
    },
  },
  mounted() {
    this.updateUrl = this.$axios.defaults.baseURL + "/v1/file/upload?type=manage_img";
    this.studentInfo = this.$route.params.studentInfo;
    this.schoolId = sessionStorage.getItem('schoolId')
    this.exemptStatus = String(this.studentInfo.isExempt)
    this.getStudentExamExemptDetail(this.studentInfo.studentId);
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
