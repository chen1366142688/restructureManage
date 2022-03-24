<style>
.class-photo-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 115px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.class-photo-list img {
  width: 100%;
  height: 100%;
}
.class-photo-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.class-photo-list:hover .class-photo-list-cover {
  display: block;
}
.class-photo-list-cover i {
  color: #fff;
  font-size: 25px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<style scoped>
  .oss_file{
    width:100%;
    height:100%;
  }
  .oss_file input{
    width:100%;
    height:100%;
  }
  .oss_file img{
    width:200px;
    height:200px;
  }
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">锻炼计划</h2>
    </div>
          <Card>
            <Form ref="planData"  :label-width="120">
              <FormItem label="计划名称：">
                <Row>
                  <Col span="24">
                    <Input :disabled="disabled"
                      v-model="planName"
                      :maxlength="255"
                      style="width: 300px"
                      placeholder="请输入计划名称"
                    />
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="适用范围：">
                <Row>
                  <Col>
                    <Select :disabled="disabled" v-if="editTf" v-model="gender" style="width:150px" placeholder="性别">
                      <Option
                        v-for="item in sexList"
                        :value="item.itemCode"
                        :key="item.itemCode"
                      >{{ item.itemName }}</Option>
                    </Select>
                    <CheckboxGroup v-if="!editTf" v-model="genders">
                        <Checkbox label="1" :disabled="disabled">男</Checkbox>
                        <Checkbox label="2" :disabled="disabled">女</Checkbox>
                    </CheckboxGroup>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="计划类型：">
                <Row>
                  <Col span="4">
                    <Select :disabled="disabled"
                      v-model="itemOrientationCode"
                      placeholder="请选择训练类型"
                      style="width: 150px"
                      clearable
                    >
                      <Option
                        v-for="item in orientationList"
                        :value="item.itemCode"
                        :key="item.itemCode"
                      >{{ item.itemName }}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="是否共享：">
                <Row>
                  <Col span="12">
                     <RadioGroup v-model="sharedStatus">
                        <Radio label="1" :disabled="disabled">共享</Radio>
                        <Radio label="0" :disabled="disabled">不共享</Radio>
                    </RadioGroup>
                    <p style="color:#F87D00;">注意：请保证您所上传的视频为本人所有，若产生版权纠纷，与平台无关。</p>
                  </Col>
                </Row>  
              </FormItem>
              <FormItem label="演示视频：">
                <Row>
                  <Col span="18">
                   <div class="oss_file">
                    <input :disabled="disabled" type="file" :id="id" @change="doUpload"  multiple="multiple"/>
                  </div>
                  <p style="color:#F87D00;">注意：不得上传任何有违国家法律法规、具有色情内容、内容低俗，格调不高、具有色情诱导性内容的视频。视频大小不超过50m，视频格式(mp4  rmvb  avi 3GP flv)</p>
                  <video
                      :src="url"
                      width="150px"
                      height="150px"
                      style="width: 150px,height:150px;"
                      controls="controls"
                    />
                    <font v-if="percentage > 0 && percentage < 100.00" style="color:#F87D00;">上传中({{percentage}}%)</font>
                    <font v-if="percentage == 100.00" style="color:#F87D00;">上传成功</font>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="计划简介：">
                <Row>
                  <Col span="24">
                    <Input
                    :disabled="disabled"
                      v-model="detailPresentation"
                      placeholder="请输入计划简介"
                      style="width: 600px"
                      type="textarea"
                      :maxlength="500"
                    />
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="训练时长：">
                <Row>
                  <Col span="24">
                    <Input
                    :disabled="disabled"
                      v-model="planDuration"
                      :maxlength="3"
                      style="width: 150px"
                      placeholder="训练时长"
                    />分
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="单组时间：">
                <Row>
                  <Col span="24">
                    <Input
                    :disabled="disabled"
                      v-model="playGifTime"
                      :maxlength="5"
                      style="width: 150px"
                      placeholder="单组时间"
                    />秒
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="单组数量：">
                <Row>
                  <Col span="24">
                    <Input
                    :disabled="disabled"
                      v-model="eachGroupNum"
                      :maxlength="2"
                      style="width: 150px"
                      placeholder="单组数量"
                    />
                    <Select
                      placeholder="请选择单位"
                      v-model="eachGroupNumUnit"
                      style="width:200px"
                      :disabled="disabled"
                    >
                      <Option
                        v-for="item in unitList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Card>
          <div style="margin-top:20px;text-align:center;margin-bottom:80px;">
            <Button @click="pageToExercisePlanList" style="margin-right:50px;width:100px" type="success">返回</Button>
            <Button :disabled="disabled" style="width:100px" :loading="saveLoading" @click="saveOrUpdateExercisePlan" type="success">保存</Button>
          </div>
        <Modal v-model="confirmModel" width="360" :closable="false">
          <p slot="header" style="color:#f60;text-align:center">
            <span>提醒</span>
          </p>
          <div style="text-align:left">
            <span>锻炼计划提交成功，请等待平台审核，平台预计将于1个工作日内完成审核，请耐心等待。</span>
          </div>
          <div slot="footer">
            <Button type="success" @click="clickConfirm">知道了</Button>
          </div>
        </Modal>
    </div>
</template>
<script>
import OSS from 'ali-oss'
export default {
  name: "exercisePlanDetail",
  data() {
    return {
      confirmModel: false,
      disabled:true,
      pageTitle: "计划新增",
      planId:'',
      saveLoading:false,
      client: null,
      overTimes:0,
      percentage: 0,
      id: 'upload',
      url:'',
      editTf:false,
      planName: "",
      itemOrientationCode: "",
      detailPresentation: "",
      teachingVideo: "",
      playGifTime: "",
      eachGroupNum: "",
      eachGroupNumUnit: "",
      planDuration:'',
      sharedStatus:'',
      sexList: [
        {
          itemCode: "1",
          itemName: "男"
        },
        {
          itemCode: "2",
          itemName: "女"
        }
      ],
      gender:'',
      genders:[],
      orientationList:[],
      unitList: [
        {
          value: "分.秒",
          label: "分.秒"
        },
        {
          value: "秒",
          label: "秒"
        },
        {
          value: "次",
          label: "次"
        },
        {
          value: "次/分钟",
          label: "次/分钟"
        },
        {
          value: "个",
          label: "个"
        },
        {
          value: "分米",
          label: "分米"
        },
        {
          value: "厘米",
          label: "厘米"
        },
        {
          value: "kg",
          label: "kg"
        }
      ]
    };
  },
  methods: {
    getSchoolExcisePlan(planId) {
      //编辑时获取计划信息
      var vm=this;
      this.pageTitle = "计划编辑";
      this.$axios
        .get("/v1/exercise/family/getSchoolExcisePlan?planId=" + planId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.planName=data.planName;
            vm.gender=data.gender;
            vm.genders=data.genders;
            vm.itemOrientationCode=data.planType;
            vm.sharedStatus=data.sharedStatus;
            vm.url=data.teachingVideo;
            vm.detailPresentation=data.planDescribe;
            vm.playGifTime=data.playGifTime/1000;
            vm.eachGroupNum=data.eachGroupNum;
            vm.eachGroupNumUnit=data.eachGroupNumUnit;
            vm.planDuration=data.planDuration;
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },
    
    getOrientationList() {
      //根据类型信息
      this.$axios
        .get(
          "/v1/exercise/family/getExerciseConfigByItemType?itemType=plan_orientation"
        )
        .then(res => {
          this.orientationList = res.data.response;
        });
    },
    delPlanStep(index) {
      //删除项目
      this.planData.planStepList.splice(index, 1);
    },
    addPlanStep() {
      //添加项目
      this.planData.planStepList.push({ stepDetail: "" });
    },
    pageToExercisePlanList() {
      //返回
      sessionStorage.setItem("isExercisePlanDetailBack", "true");
      this.$router.go(-1);
    },
    clickConfirm(){
      console.log("come in")
      this.confirmModel = false
      sessionStorage.setItem("isExercisePlanDetailBack", "true"); //返回列表
      this.$router.go(-1);
    },
    saveOrUpdateExercisePlan() {
      //保存处理
      var vm=this;
      if(!vm.planName){
          this.$Message.error("请填写计划名称");
          return false;
      } 
      if(!vm.editTf && vm.genders.length<1){
          this.$Message.error("请选择适用范围");
          return false;
      } 
      if(!vm.itemOrientationCode){
          this.$Message.error("请选择计划类型");
          return false;
      }
      if(!vm.sharedStatus){
          this.$Message.error("请选择是否共享");
          return false;
      }
      if(!vm.url){
          this.$Message.error("请添加视频");
          return false;
      }
      if(!vm.detailPresentation){
          this.$Message.error("请填写计划简介");
          return false;
      }
      if(vm.detailPresentation.length>500){
          this.$Message.error("计划简介不能大于500字");
          return false;
      }
      if(!vm.planDuration){
          this.$Message.error("请输入训练时长");
          return false;
      }
      if(vm.planDuration<1){
          this.$Message.error("训练时长必须大于0");
          return false;
      }
      if(!vm.playGifTime){
          this.$Message.error("请输入单组时间");
          return false;
      }
      if(vm.playGifTime<1){
          this.$Message.error("单组时间必须大于0");
          return false;
      }
      if(!vm.eachGroupNum){
          this.$Message.error("请输入单组数量");
          return false;
      }
      if(vm.eachGroupNum<1){
          this.$Message.error("单组数量必须大于0");
          return false;
      }
      if(!vm.eachGroupNumUnit){
          this.$Message.error("请选择单位");
          return false;
      }

      this.saveLoading = true;
      var vm=this;
      if(vm.editTf){
        vm.genders=[];
        vm.genders.push(vm.gender)
      }
      let data={
        "eachGroupNum": vm.eachGroupNum,
        "eachGroupNumUnit": vm.eachGroupNumUnit,
        "gender":vm.gender,
        "genders": vm.genders,
        "planDescribe": vm.detailPresentation,
        "planId":vm.planId,
        "planName": vm.planName,
        "planType": vm.itemOrientationCode,
        "playGifTime": vm.playGifTime*1000,
        "sharedStatus": vm.sharedStatus,
        "teachingVideo": vm.url,
        planDuration:vm.planDuration
      }
      //return;
      //保存
      this.$axios
              .post("/v1/exercise/family/addSchoolExcisePlan", data)
              .then(res => {
                if (res.data.code == 10000) {
                  this.saveLoading = false;
                  this.confirmModel = true
                } else {
                  this.saveLoading = false;
                  this.$Message.info(res.data.msg);
                }
              });
    },
   
    doUpload () {
        const _this = this;
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
         _this.percentage = 0;
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              let fileShow = file.name.split('.').pop();
              if(fileShow == 'mp4' || fileShow == 'MP4' ||  fileShow == 'rmvb' ||  fileShow == 'RMVB' || fileShow == 'avi' || fileShow == 'AVI' || fileShow == '3GP' || fileShow == '3gp' || fileShow == 'flv' || fileShow == 'FLV' ){

              }else{
                  _this.$Message.info("您选择的文件格式不支持！");
                  return false;
              }
              if(file.size > 50*1024*1024){
                  _this.$Message.info("视频大小不能超过50M！");
                  return false;
              }
              // 随机命名
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              // 上传
              client.multipartUpload(random_name, file, {
                progress: function (percentage, cpt) {
                  // 上传进度
                  _this.percentage = (percentage*100).toFixed(2);
                }

              }).then((results) => {
                  console.log(results);
                  this.url = 'https://tanma-teacher-video-online.oss-cn-chengdu.aliyuncs.com/'+random_name
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
    vm.getOrientationList();
    if (sessionStorage.getItem("exercisePlanList-exercisePlanDetail-planId")) {
      vm.disabled=sessionStorage.getItem("exercisePlanList-exercisePlanDetail-schoolId")==sessionStorage.getItem("schoolId")?false:true
      vm.editTf=true
      vm.planId=sessionStorage.getItem("exercisePlanList-exercisePlanDetail-planId");
      vm.getSchoolExcisePlan(sessionStorage.getItem("exercisePlanList-exercisePlanDetail-planId")); 
    }else{
      vm.disabled=false;
      vm.editTf=false;
    }
  },
  watch: {
  },
  destroyed() {
    var vm = this;
  }
};
</script>