<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":""}}{{studentClass}}班</h2>
    </div>
        <Card :dis-hover="true">
          <div  @keydown.enter="querySearch" class="top-search">
            <div class="left-input">
              <div style="margin:5px 10px;">
                <span>姓名：</span>
                <Input v-model="studentName" size="small" placeholder="姓名" style="width: 50%;"/>
              </div>
              <div style="margin:5px 10px;">
                <span>学籍号：</span>
                <Input v-model="registerCode" size="small" placeholder="学籍号" style="width: 50%;"/>
              </div>
            </div>
            <div class="right-btns">
              <Button type="success" @click="querySearch">查询</Button>
              <Button type="success" @click="pageToLast">返回</Button>
              <Button type="success" @click="batchGroup">批量分配手环</Button>
              <Button type="success" @click="exporttList">导出EXCEL</Button>
            </div>
          </div>
        </Card>
        <Card :dis-hover="true" style="margin-top:20px;font-size:18px;">
          <p>数据概览</p>
          <div>
              <Row>
                <div>
                  <Table border :columns="resultColumns"  :data="resultData"></Table>
                </div>
              </Row>
          </div>
        </Card>
         <Card :dis-hover="true" style="margin-top:20px;font-size:18px;">
            <p>数据明细</p>
          <div>
              <Row>
                <div>
                  <Table border max-height="520" :columns="resultColumns1" :data="resultData1"></Table>
                </div>
                <!-- <br>
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div> -->
              </Row>
          </div>
        </Card>
    <Modal v-model="giveStatus" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>{{macStatus=="1"?"更换手环":"分配手环"}}</span>
      </p>
      <div style="">
          <p style="margin-left:40px;">分配学生信息：{{studentNameGive}}</p>
          <p style="margin-left:40px;margin-top:10px;"><span >输入手环设备MAC：</span>
          <Input v-model="deviceMac" size="small" placeholder="请输入设备MAC" style="width: 180px;"/>
          <Button type="success" size="small"   style="margin-left:10px;"  @click="searchDevice" >查询</Button>
          </p>
          <div style="margin-left:40px;" v-if="haveData">
            <p>已选择手环信息</p>
            <p>手环分组:{{deviceInfo.groupName}}</p>
            <p>手环序号:{{deviceInfo.deviceOrder}}</p>
            <p>手环已绑定学生:{{studentNameString}}</p>
            <p>设备状态:{{deviceInfo.deviceStatus=="1"?"正常":deviceInfo.deviceStatus=="2"?"故障":deviceInfo.deviceStatus=="3"?"停用":"未知"}}</p>
            <p>设备启用时间：{{deviceInfo.createTime}}</p>
          </div>
          <span v-if="dataTf" style="margin-left:40px;color:red">输入地址有误，请核对后重新输入</span>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  :loading="changeLoading" @click="changeGroup" :disabled="!haveData">保存</Button>
      </div>
    </Modal>
    <Modal v-model="bathStatus" :mask-closable="false" width="360" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>批量分配手环</span>
      </p>
      <div style="">
            <p style="margin-left:40px;">分配班级信息：{{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":""}}{{studentClass}}班</p>
            <p style="margin-left:40px;">分配班级学生人数：{{studentNum}}</p>
            <span style="margin-left:40px;">分配手环组设备选择：</span>
            <Select v-model="groupIdChange" style="width:120px;">
              <Option v-for="item in groupListChange" :value="item.groupId" :key="item.groupId">{{ item.groupName }}</Option>
            </Select>
            <div style="margin-left:40px;">
            <p>已选择{{groupName}}组手环设备</p>
            <p>共计手环:{{groupStatistical.totalNum}}个</p>
            <p>设备正常:{{groupStatistical.normalNum}}个</p>
            <p>设备故障:{{groupStatistical.abnormalNum}}个</p>
            <p>已停用：{{groupStatistical.stopNum}}个</p>
          </div>
          <span v-if="studentMore" style="margin-left:40px;color:red">提示：该组手环数量不够，部分学生可能配对不成功</span>
          <span v-if="deviceMore" style="margin-left:40px;color:red">提示：该组手环数量超过班级人数，部分手环无法配对学生</span>
      </div>
      <div slot="footer">
            <Button type="success"  @click="cancle" >取消</Button>
            <Button type="success"   :loading="changeLoading" @click="changeBathGroup" :disabled="bathGroupSubmit">提交</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      giveStatus:false,
      bathStatus:false,
      changeLoading:false,
      haveData:false,
      dataTf:false,
      deviceMore:false,
      studentMore:false,
      bathGroupSubmit:true,
      gradeId:'',
      classId:'',
      studentId:'',
      studentClass:'',
      studentName:'',
      studentNum:'',
      studentNameGive:'',
      registerCode:'',
      groupIdChange:'',
      groupName:'',
      groupListChange:[],
      groupStatistical:{},
      macStatus:'1',
      deviceMac:'',
      deviceInfo:{},
      studentNameString:'',
      resultColumns: [
        {
          title: "班级总人数",
          key: "totalStudent",
          align: "center",
        },
        {
          title: "已绑定手环人数",
          key: "bindingStudent",
          align: "center",
        },
        {
          title: "未绑定手环人数",
          key: "notBindingStudent",
          align: "center",
        },
        {
          title: "正常手环个数",
          key: "normalStudent",
          align: "center",
        },
        {
          title: "异常手环个数",
          key: "abnormalNum",
          align: "center",
        },
      ],
      resultData: [],
      resultColumns1: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth: 120,
        },
        {
          title: "年级",
          key: "gradeName",
          align: "center",
          minWidth: 120,

        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth: 120,

        },
        {
          title: "绑定手环地址",
          key: "deviceMac",
          align: "center",
          minWidth: 120,

          render:(h, params) => {
            return("span",params.row.deviceMac?params.row.deviceMac:"未绑定")
          }
        },
        {
          title: "绑定手环ID",
          key: "wristbandDeviceId",
          align: "center",
          minWidth: 120,

        },
        {
          title: "手环分组",
          key: "groupName",
          align: "center",
          minWidth: 120,

        },
        {
          title: "手环序号",
          key: "wristbandOrder",
          align: "center",
          minWidth: 120,

        },
        {
          title: "手环状态",
          key: "deviceStatus",
          align: "center",
          minWidth: 120,

          render: (h, params) => {
            const row = params.row
            const text = row.deviceStatus == '1' ? '正常' :row.deviceStatus == '2' ? '故障' :row.deviceStatus == '3' ? '停用' : ''
            return h('div', text)
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "0px"
                  },
                  on: {
                    click: () => {
                      var vm = this;
                      vm.giveDevice(params.row.studentId,params.row.deviceMac)
                        }
                  }
                },
                params.row.deviceMac?"更换手环":"分配手环"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled:params.row.deviceMac?false:true
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                       var vm = this;
                      vm.$Modal.confirm({
                        title: "提示",
                        content: "确定要解除绑定？",
                        onOk: function() {
                         vm.deleteStudentBindingStatus(params.row.studentId);
                        }
                      });
                    }
                  }
                },
                "解除绑定"
              ),
            ]);
          }
        }
      ],
      resultData1: [],
    };
  },
  methods: {
    pageToLast() {
      var vm = this;
      this.$router.go(-1)
    },
     getGroupStatisticalInfo() {
      var vm = this;
      this.$axios
        .get("/v1/devicewristband/getGroupStatisticalInfo?groupId=" + vm.groupIdChange)
        .then(function(response) {
          let data=response.data.response;
         vm.groupStatistical=data;
         if(data.normalNum>0){
           vm.bathGroupSubmit=false;
         }
         if(data.normalNum>vm.studentNum){
           vm.deviceMore=true
         }
         if(data.normalNum<vm.studentNum){
           vm.studentMore=true
         }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getGiveDeviceStatisticalInfo(classId) {
      var vm=this;
      let params={
        "classId":classId
      }
      this.$axios
        .post("/v1/devicewristband/getGiveDeviceStatisticalInfo",params)
        .then(res => {
          if (res.data.code == 10000) {
            vm.resultData=[];
            let data = res.data.response;
            if(data){
              vm.resultData.push(data);
              vm.studentNum=data.totalStudent
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getGiveDeviceStudentList(classId) {
      var vm = this
      let params={
        "classId": classId,
        "registerCode": vm.registerCode,
        "studentName": vm.studentName
      }
      this.$axios.post('/v1/devicewristband/getGiveDeviceStudentList', params).then(res => {
        if (res.data.code == 10000) {
          this.resultData1 = res.data.response
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg)
          }
        }
      })
    },
    deleteStudentBindingStatus(studentId) {
      var vm=this;
      this.$axios
        .get("/v1/devicewristband/deleteStudentBindingStatus?studentId="+ studentId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            if(data.code=='1'){
              this.$Message.info("清除成功");
              vm.getGiveDeviceStudentList(sessionStorage.getItem("teachingManage-giveDevice-classId"));
              vm.getGiveDeviceStatisticalInfo(sessionStorage.getItem("teachingManage-giveDevice-classId"));
            }else{
              this.$Message.error(data.msg);
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
   searchDevice(){
     var vm = this;
      this.$axios
        .get("/v1/devicewristband/getDeviceInfoByMac?deviceMac=" + vm.deviceMac.replace(/\s*/g,""))
        .then(function(response) {
          let data=response.data.response;
          vm.studentNameString="";
          vm.deviceInfo={};
          if(data){
            vm.deviceInfo=data;
            for(var i=0;i<data.list.length;i++){
              vm.studentNameString+=(data.list[i].studentName+" ")
            }
            vm.haveData=true;
            vm.dataTf=false
          }else{
            vm.haveData=false;
            vm.dataTf=true
          }

        })
        .catch(function(response) {
          console.log(response);
        });
   },
   getSchoolDeviceGroup() {
      var vm=this;
      this.$axios
        .get("/v1/devicewristband/getSchoolDeviceGroup")
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.groupListChange=res.data.response
            vm.groupIdChange=res.data.response[0].groupId
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      vm.getGiveDeviceStudentList(vm.classId);
      vm.getGiveDeviceStatisticalInfo(vm.classId);
    },
    giveDevice(studentId,deviceMac){
      var vm=this;
      vm.studentId=studentId;
      for(var i=0;i<vm.resultData1.length;i++){
        if(studentId==vm.resultData1[i].studentId){
          vm.studentNameGive=vm.resultData1[i].studentName
        }
      }
      if(deviceMac){
        vm.macStatus="1"
      }else{
        vm.macStatus="2"
      }
      vm.giveStatus=true;
    },
    batchGroup(){
      var vm=this;
      vm.getSchoolDeviceGroup();
      vm.bathStatus=true;
    },
    changeGroup(){
      var vm = this;
      vm.changeLoading=true;
      this.$axios
        .get("/v1/devicewristband/upsertDevice?wristbandId="+vm.deviceInfo.wristbandId+"&studentId=" + vm.studentId)
        .then(function(response) {
          vm.changeLoading=false;
          vm.giveStatus=false;
          if (response.data.code == 10000) {
            let numCode = response.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
              vm.search();
            } else {
              vm.$Message.error(response.data.response.msg);
            }
          } else {
            vm.$Message.info("保存失败！");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    changeBathGroup(){
      var vm = this;
      vm.changeLoading=true;
      this.$axios
        .get("/v1/devicewristband/bathUpsertDevice?groupId="+vm.groupIdChange+"&classId="+ vm.classId)
        .then(function(response) {
          vm.changeLoading=false;
          vm.bathStatus=false;
          if (response.data.code == 10000) {
            let numCode = response.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
              vm.search();
            } else {
              vm.$Message.error(response.data.response.msg);
            }
          } else {
            vm.$Message.info("保存失败！");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    cancle(){
      var vm=this;
      vm.giveStatus=false;
      vm.bathStatus=false;
    },
    exporttList() {
      var vm=this;
      let url =
        this.$axios.defaults.baseURL +
        '/v1/devicewristband/exportDeviceStudentList?classId='+vm.classId+
        '&token=' +
       sessionStorage.getItem('token')
      window.open(url)
    },

  },
  watch: {
    groupIdChange:function(){
      var vm=this;
      vm.bathGroupSubmit=false;
      vm.getGroupStatisticalInfo();
    }
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm=this;
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.classId=sessionStorage.getItem("teachingManage-giveDevice-classId");
    vm.gradeId=sessionStorage.getItem("teachingManage-giveDevice-gradeId");
    vm.studentClass=sessionStorage.getItem("teachingManage-giveDevice-studentClass");
    vm.getGiveDeviceStudentList(sessionStorage.getItem("teachingManage-giveDevice-classId"));
    vm.getGiveDeviceStatisticalInfo(sessionStorage.getItem("teachingManage-giveDevice-classId"));

  }
};
</script>
