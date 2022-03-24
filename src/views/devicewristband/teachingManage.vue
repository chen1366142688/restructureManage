<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">智能教学管理</h2>
    </div>
    <Tabs type="card" :value="selectTabName" @on-click="selectTabs" >
      <TabPane name="operator" label="配对管理">
        <Card :dis-hover="true">
          <div  @keydown.enter="querySearch">
          <span style="">年级：</span>
            <Select v-model="gradeId" class="width120">
              <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
            </Select>
            <span class="mar-l40">班级：</span>
            <Select v-model="classId"  class="width120">
              <Option v-for="item in classList" :value="item.classId" :key="item.classId">{{ item.studentClassName }}</Option>
            </Select>
        </div>
        </Card>
        <Card :dis-hover="true" style="margin-top:20px;font-size:18px;" v-if="pdgl">
          <p style='margin-bottom:20px'>数据概览</p>
          <div>
              <Row>
                <div>
                  <Table border  :columns="resultColumns"  :data="resultData"></Table>
                </div>
              </Row>
          </div>
        </Card>
         <Card :dis-hover="true" style="margin-top:20px;font-size:18px;">
            <p style='margin-bottom:20px'>数据明细</p>
          <div>
              <Row>
                <div>
                  <Table border height="400" :columns="resultColumns1" :data="resultData1"></Table>
                </div>
              </Row>
          </div>
        </Card>
      </TabPane>
      <TabPane name="group" label="设备管理">
        <Card :dis-hover="true">
          <div @keydown.enter="querySearch" class="top-search">
            <div class="left-input">
              <div style="margin:5px 20px;">
                <span>设备地址：</span>
                <Input v-model="deviceMac" placeholder="设备地址" class="width120"/>
              </div>
              <div style="margin:5px 20px;">
                <span>设备分组：</span>
                <Select v-model="groupId" class="width120">
                  <Option v-for="item in groupList" :value="item.groupId" :key="item.groupId">{{ item.groupName }}</Option>
                </Select>
              </div>
              <div style="margin:5px 20px;">
                <span>设备状态：</span>
                <Select v-model="deviceStatus" class="width120">
                  <Option v-for="item in deviceStatusList" :value="item.status" :key="item.status">{{ item.name }}</Option>
                </Select>
              </div>
              <div style="margin:5px 20px;">
                <span>绑定状态：</span>
                <Select v-model="bindingStatus" class="width120">
                  <Option v-for="item in bindingStatusList" :value="item.status" :key="item.status">{{ item.name }}</Option>
                </Select>
              </div>
            </div>
            <div class="right-btns">
              <Button type="success" @click="querySearch">查询</Button>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['xls','xlsx']"
                :max-size="20480"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :multiple="false"
                name="muFiles"
                type="select"
                :action="updateUrl"
                style="display: inline-block;"
              >
                <Button type="success">批量导入设备</Button>
              </Upload>
              <Button type="success" @click="batchGroup">手环批量分组</Button>
            </div>
          </div>
        </Card>
        <Card :dis-hover="true" style="margin-top:20px;font-size:18px;">
          <p  style='margin-bottom:20px'>数据概览</p>
          <div>
              <Row>
                <div>
                  <Table border :columns="resultDeviceColumns"  :data="resultDeviceData"></Table>
                </div>
              </Row>
          </div>
        </Card>
         <Card :dis-hover="true" style="margin-top:20px;font-size:18px;">
            <p  style='margin-bottom:20px'>数据明细</p>
          <div>
              <Row>
                <div>
                  <Table border height="420" :columns="resultDeviceColumns1" :data="resultDeviceData1"></Table>
                </div>
                <br>
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div>
              </Row>
          </div>
        </Card>
      </TabPane>
    </Tabs>
    <Modal v-model="exportStatus" :mask-closable="false" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <span style>导入中，请稍等</span>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="changeStatus" :mask-closable="false" width="360" @on-ok="changeGroup">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>调整分组</span>
      </p>
      <div style="">
            <p style="margin-left:40px;">设备地址：{{deviceMacChange}}</p>
            <span style="margin-left:40px;">设备分组：</span>
            <Select v-model="groupIdChange" style="width:120px;">
              <Option v-for="item in groupListChange" :value="item.groupId" :key="item.groupId">{{ item.groupName }}</Option>
            </Select>
      </div>
      <div slot="footer">
            <Button type="success"  @click="cancle" >取消</Button>
            <Button type="success"   :loading="changeLoading" @click="changeGroup">提交</Button>
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
      exportStatus:false,
      changeStatus:false,
      changeLoading:false,
      gradeId:'',
      classId:'',
      pdgl:true,
      primaryList: [
        // {
        //   grade: "",
        //   label: "全部"
        // },
        {
          grade: 1,
          label: "一年级"
        },
        {
          grade: 2,
          label: "二年级"
        },
        {
          grade: 3,
          label: "三年级"
        },
        {
          grade: 4,
          label: "四年级"
        },
        {
          grade: 5,
          label: "五年级"
        },
        {
          grade: 6,
          label: "六年级"
        }
      ],
      middleList: [
        // {
        //   grade: "",
        //   label: "全部"
        // },
        {
          grade: 7,
          label: "七年级"
        },
        {
          grade: 8,
          label: "八年级"
        },
        {
          grade: 9,
          label: "九年级"
        }
      ],
      highList: [
        // {
        //   grade: "",
        //   label: "全部"
        // },
        {
          grade: 10,
          label: "高一"
        },
        {
          grade: 11,
          label: "高二"
        },
        {
          grade: 12,
          label: "高三"
        }
      ],
      collegeList: [
        // {
        //   grade: "",
        //   label: "全部"
        // },
        {
          grade: 13,
          label: "大一"
        },
        {
          grade: 14,
          label: "大二"
        },
        {
          grade: 15,
          label: "大三"
        },
        {
          grade: 16,
          label: "大四"
        }
      ],
      schoolGradeList: [],
      classList:[],
      selectTabName:"",
      resultColumns: [
        {
          title: "班级个数",
          key: "classNum",
          align: "center",
          minWidth:100
        },
        {
          title: "班级总人数",
          key: "totalStudent",
          align: "center",
          minWidth:100,
        },
        {
          title: "已绑定手环人数",
          key: "bindingNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "未绑定手环人数",
          key: "notBindingNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "正常手环个数",
          key: "normalNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "异常手环个数",
          key: "abnormalNum",
          align: "center",
          minWidth:100,
        },
      ],
      resultData: [],
      resultColumns1: [
        {
          title: "年级",
          key: "gradeName",
          align: "center",
          minWidth:100,
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth:100,
           render:(h, params) => {
            return("span",params.row.studentClass+"班")
          }
        },
        {
          title: "班级人数",
          key: "totalStudent",
          align: "center",
          minWidth:100,
        },
        {
          title: "已绑定手环人数",
          key: "bindingNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "未绑定手环学生人数",
          key: "notBindingNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "异常手环个数",
          key: "abnormalNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:200,
          render: (h, params) => {
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
                       var vm = this;
                      vm.$Modal.confirm({
                        title: "提示",
                        content: "确定要清除该班绑定数据？",
                        onOk: function() {
                         vm.deleteBindingStatus(params.row.classId);
                        }
                      });
                    }
                  }
                },
                "清除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    // disabled: params.row.isAdmin == "1" ?true:false
                  },
                  style: {
                    marginRight: "0px"
                  },
                  on: {
                    click: () => {
                      var vm = this;
                          vm.pageToGiveDevice(params.row.classId,params.row.gradeId,params.row.studentClass);
                        }
                  }
                },
                "分配手环"
              )
            ]);
          }
        }
      ],
      resultData1: [],

      deviceMac:'',
      deviceId:'',
      deviceMacChange:'',
      groupId:"",
      groupIdChange:"",
      groupList:[],
      groupListChange:[],
      deviceStatus:'999',
      deviceStatusList:[
        {
          status:"999",
          name:"全部"
        },
        {
          status:"1",
          name:"正常"
        },
        {
          status:"2",
          name:"故障"
        },
        {
          status:"3",
          name:"停用"
        },
      ],
      bindingStatus:'999',
      bindingStatusList:[
        {
          status:"999",
          name:"全部"
        },
        {
          status:"1",
          name:"已绑定"
        },
        {
          status:"2",
          name:"未绑定"
        },
      ],
      resultDeviceColumns: [
        {
          title: "手环总个数",
          key: "deviceNum",
          align: "center",
          minWidth:100
        },
        {
          title: "手环组数",
          key: "deviceGroupNum",
          align: "center",
          minWidth:100
        },
        {
          title: "正常手环个数",
          key: "normalNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "停用手环个数",
          key: "stopNum",
          align: "center",
          minWidth:100
        },
        {
          title: "故障手环个数",
          key: "abnormalNum",
          align: "center",
          minWidth:100,
        },
      ],
      resultDeviceData: [],
      resultDeviceColumns1: [
        {
          title: "设备序号",
          key: "deviceOrder",
          align: "center",
          minWidth:60,
        },
        {
          title: "设备类型",
          key: "deviceType",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.deviceType == '1' ? '智能手环' : '未知'
            return h('div', text)
          }
        },
         {
          title: "设备分组",
          key: "groupName",
          align: "center",
          minWidth:80,
        },
        {
          title: "设备地址",
          key: "deviceMac",
          align: "center",
          minWidth:150,
        },
         {
          title: "设备ID",
          key: "deviceId",
          align: "center",
          minWidth:100,
        },
        {
          title: "设备启用时间",
          key: "createTime",
          align: "center",
          width:150,
        },
         {
          title: "设备已绑定学生",
          key: "list",
          align: "center",
          width:180,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.list){
              for(var i=0;i<row.list.length;i++){
                  text+="<lable>"+row.list[i].gradeName+row.list[i].studentClass+"班："+row.list[i].studentName+"</lable>"
                  text += "</br>";
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
          title: "设备状态",
          key: "deviceStatus",
          align: "center",
          minWidth:100,
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
          minWidth:200,
          render: (h, params) => {
            const row = params.row;
            let one="";
            let two="";
            let oneStatus="";
            let twoStatus="";
            if(row.deviceStatus=="1"){
              one="停用";
              two="故障";
              oneStatus="3";
              twoStatus="2";
            }
            if(row.deviceStatus=="3"){
              one="启用";
              two="故障";
              oneStatus="1";
              twoStatus="2";
            }
            if(row.deviceStatus=="2"){
              one="停用";
              two="已修复";
              oneStatus="3";
              twoStatus="1";
            }

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    margin: "5px"
                  },
                  on: {
                    click: () => {
                      var vm=this;
                      vm.deviceMacChange=params.row.deviceMac;
                      vm.deviceId=params.row.wristbandId;
                      vm.changeStatus=true;
                    }
                  }
                },
                "调整分组"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    margin: "5px"
                  },
                  on: {
                    click: () => {
                      this.updateDeviceStatus(params.row.wristbandId,oneStatus);
                    }
                  }
                },
                one
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    margin: "5px"
                  },
                  on: {
                    click: () => {
                      this.updateDeviceStatus(params.row.wristbandId,twoStatus);
                    }
                  }
                },
                two
              )
            ]);
          }
        }
      ],
      resultDeviceData1: [],
      updateUrl:'',
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
     selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('teachingManage-teachingManage-selectTabName',this.selectTabName);
     },
     getGradeClassSingleInfo(gradeId) {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/getGradeClassSingleInfo?gradeId=" + gradeId)
        .then(function(response) {
          vm.classList=[];
          vm.classId=999;
          let data = response.data.response;
          let all = {
            classId: 999,
            studentClassName: "全部"
          };
          vm.classList.push(all);
          vm.classList=vm.classList.concat(data);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getGradeStatisticalInfo(gradeId) {
      var vm=this;
      vm.resultData=[];
      this.$axios
        .get("/v1/devicewristband/getGradeStatisticalInfo?gradeId=" + gradeId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultData=[];
            vm.resultData.push(data)
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getClassStatisticalInfo() {
      var vm=this;
      vm.resultData1=[]
      let classId=vm.classId==999?'':vm.classId;
      this.$axios
        .get("/v1/devicewristband/getClassStatisticalInfo?gradeId="+vm.gradeId+"&classId=" + classId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultData1=data;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    deleteBindingStatus(classId) {
      var vm=this;
      this.$axios
        .get("/v1/devicewristband/deleteBindingStatus?classId="+ classId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            if(data.code=='1'){
              this.$Message.info("清除成功");
              vm.getSchoolDeviceGroup();
              vm.getClassStatisticalInfo()
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
    getSchoolDeviceGroup() {
      var vm=this;
      this.$axios
        .get("/v1/devicewristband/getSchoolDeviceGroup")
        .then(res => {
          vm.groupList=[];
          if (res.data.code == 10000) {
            let data = res.data.response;
            // console.log(data)
            let not=
               {
                groupId:"notGroup",
                groupName:"未分组"
              };
             let all= {
                groupId:"all",
                groupName:"全部"
              }
            vm.groupList.push(not);
            vm.groupList.push(all);
            vm.groupList=vm.groupList.concat(res.data.response)
            vm.groupId=vm.groupId?vm.groupId:"all";
            vm.groupListChange=res.data.response
            vm.search();
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getDeviceStatisticalInfo() {
      var vm=this;
      vm.resultDeviceData=[];
      let params={
        "bindingStatus":vm.bindingStatus=="999"?"":vm.bindingStatus,
        "deviceMac": vm.deviceMac,
        "deviceStatus": vm.deviceStatus=="999"?"":vm.deviceStatus,
        "groupId": vm.groupId=="notGroup"?"-1":vm.groupId=="all"?"-2":vm.groupId,
      }
      this.$axios
        .post("/v1/devicewristband/getDeviceStatisticalInfo",params)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            if(data){
               vm.resultDeviceData.push(data)
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getDeviceList() {
      var vm=this;
      vm.resultDeviceData1=[];
      console.log(vm.groupId);
      // console.log(vm.groupList);
      // return
      let params={
        "bindingStatus":vm.bindingStatus=="999"?"":vm.bindingStatus,
        "deviceMac": vm.deviceMac,
        "deviceStatus": vm.deviceStatus=="999"?"":vm.deviceStatus,
        "groupId": vm.groupId=="notGroup"?"-1":vm.groupId=="all"?"-2":vm.groupId,
        // groupId:vm.groupId,
         "pageNo": vm.pageNum,
         "pageSize": vm.pageSize
      }
      this.$axios
        .post("/v1/devicewristband/getDeviceList",params)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            if(data){
              vm.resultDeviceData1=data;
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    countDeviceList() {
      var vm = this
      // console.log(vm.groupId)
      // console.log(vm.groupId=="all")
      let params={
        "bindingStatus":vm.bindingStatus=="999"?"":vm.bindingStatus,
        "deviceMac": vm.deviceMac,
        "deviceStatus": vm.deviceStatus=="999"?"":vm.deviceStatus,
        "groupId":vm.groupId=="notGroup"?"-1":vm.groupId=="all"?"-2":vm.groupId,
        // groupId:vm.groupId,
         "pageNo": vm.pageNum,
         "pageSize": vm.pageSize
      }
      // console.log(vm.groupId)
      this.$axios.post('/v1/devicewristband/countDeviceList', params).then(res => {
        // console.log(vm.groupId)
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg)
          }
        }
      })
    },
    changeGroup(){
      var vm=this;
      vm.changeLoading=true,
      this.$axios
        .get("/v1/devicewristband/updateGroup?groupId="+vm.groupIdChange+"&deviceId="+ vm.deviceId)
        .then(res => {
          vm.changeLoading=false;
          vm.changeStatus=false;
          if (res.data.code == 10000) {
             let numCode = res.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("调整成功");
              vm.getSchoolDeviceGroup();
            } else {
              vm.$Message.error(res.data.response.msg);
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    cancle(){
      this.changeStatus=false;
    },
    updateDeviceStatus(wristbandId,status){
      var vm=this;
      vm.changeLoading=true,
      this.$axios
        .get("/v1/devicewristband/updateDeviceStatus?wristbandId="+wristbandId+"&status="+status)
        .then(res => {
          vm.changeLoading=false;
          vm.changeStatus=false;
          if (res.data.code == 10000) {
             let numCode = res.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("调整成功");
              vm.getSchoolDeviceGroup();
            } else {
              vm.$Message.error(res.data.response.msg);
            }
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
      vm.getDeviceStatisticalInfo();
      vm.getDeviceList();
      vm.countDeviceList();
    },
     pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNum = 1;
        this.querySearch()
      }
    },
    pageToGiveDevice(classId,gradeId,studentClass) {
      sessionStorage.setItem("teachingManage-giveDevice-studentClass", studentClass);
      sessionStorage.setItem("teachingManage-giveDevice-classId", classId);
      sessionStorage.setItem("teachingManage-giveDevice-gradeId", gradeId);
      this.$router.push({ name: "giveDevice" });
    },
    batchGroup() {
      //缓存查询条件
      this.$router.push({ name: "bathGroup" });
    },
    handleSuccess(res, file) {
      var vm = this;
      vm.exportStatus = false;
      if (res.code == 10000) {
        if (res.response == 1) {
          vm.$Message.info("导入成功");
          vm.exportStatus = false;
          vm.querySearch();
        } else {
          vm.$Message.info("数据有误，导入失败");
        }
      } else {
        vm.$Message.info("导入失败，请稍后再试");
      }
    },
    handleFormatError(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "格式错误",
        desc: "该文件格式错误，请检查后重试"
      });
    },
    handleMaxSize(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "文件超大",
        desc: "该文件超大了"
      });
    },
    handleBeforeUpload(file) {
      var vm = this;
      vm.exportStatus = true;
      return true;
    }
  },
  watch: {
      gradeId:function(){
        var vm=this;
        vm.getGradeClassSingleInfo(vm.gradeId);
        vm.getGradeStatisticalInfo(vm.gradeId);
        vm.getClassStatisticalInfo();
      },
      classId:function(){
        var vm=this;
        vm.getClassStatisticalInfo();
        
        if(vm.classId!=999){
          // vm.pdgl=false;
          vm.resultData=[]
        }else{
          vm.getGradeStatisticalInfo(vm.gradeId);
        }
      }
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm=this;
    if( sessionStorage.getItem('teachingManage-teachingManage-selectTabName')){
      this.selectTabName = sessionStorage.getItem('teachingManage-teachingManage-selectTabName');
    }
        
    vm.updateUrl =this.$axios.defaults.baseURL + "/v1/devicewristband/file/upload/deviceExport?token=" +sessionStorage.getItem("token");
    let height = (document.body.offsetHeight - 300) / 2;
   
    if (sessionStorage.getItem('schoolType')) {
      if ('2' == sessionStorage.getItem('schoolType')) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
      }
      if ('3' == sessionStorage.getItem('schoolType')) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
      }
      if ('4' == sessionStorage.getItem('schoolType')) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
      }
    }
    vm.gradeId=vm.schoolGradeList[0].grade;
    this.schoolId = sessionStorage.getItem("schoolId");
    vm.getSchoolDeviceGroup();
  }
};
</script>
<style scoped>
  .mar-l40{margin-left:40px;}
  .mar-l20{margin-left:20px;}
  .width120{width:120px;}
  @media screen and (max-width: 1650px) {
    .mar-l40{margin-left:15px;}
    .mar-l20{margin-left:10px;}
    .width120{width:100px;}
  }
</style>