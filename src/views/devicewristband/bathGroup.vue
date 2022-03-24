<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">分组</h2>
    </div>
        <Card :dis-hover="true">
          <div  @keydown.enter="querySearch" class="top-search">
            <div class="left-input">
              <div>
                <span style="">创建分组名称：</span>
                <Input v-model="groupName" size="small" placeholder="分组名称" style="width: 120px;"/>
              </div>
            </div>
            <div class="right-btns">
              <Button type="success" @click="submit">保存</Button>
              <Button type="success" @click="pageBack">返回</Button>
              <Button type="success" @click="restore">重选</Button>
            </div>
          </div>
        </Card>
        <Card :dis-hover="true" style="margin-top:20px;">
          <div>
              <Row>
                <div>
                  <Table border ref="selection" :columns="resultDeviceColumns1" :data="resultDeviceData1" @on-selection-change="selectChange" ></Table>
                </div>
                <br>
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange'   show-total show-sizer></Page>
                    </div>
              </Row>
          </div>
        </Card>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      groupName:'',
      deviceList:[],
      resultDeviceColumns1: [
           {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
        {
          title: "设备序号",
          key: "deviceOrder",
          align: "center"
        },
        {
          title: "设备类型",
          key: "deviceType",
          align: "center",
          render: (h, params) => {
            const row = params.row
            const text = row.deviceType == '1' ? '智能手环' : '未知'
            return h('div', text)
          }
        },
         {
          title: "设备分组",
          key: "groupName",
          align: "center"
        },
        {
          title: "设备地址",
          key: "deviceMac",
          align: "center"
        },
        {
          title: "设备状态",
          key: "deviceStatus",
          align: "center",
          render: (h, params) => {
            const row = params.row
            const text = row.deviceStatus == '1' ? '正常' :row.deviceStatus == '2' ? '故障' : '停用'
            return h('div', text)
          }
        },
      ],
      resultDeviceData1: [],
      updateUrl:'',
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
       handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            restore(){
                this.$refs.selection.selectAll(false);
            },
            pageBack(){
                this.$router.go(-1);
            },
    getDeviceList() {
      var vm=this;
      vm.resultDeviceData1=[];
      let params={
        "groupId": -1,
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
      let params={
        "groupId": -1,
         "pageNo": vm.pageNum,
         "pageSize": vm.pageSize
      }
      this.$axios.post('/v1/devicewristband/countDeviceList', params).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg)
          }
        }
      })
    },
    selectChange(selection){
      var vm=this;
        // console.log(selection)
        vm.deviceList=[];
        if(selection){
            for(let i=0;i<selection.length;i++){
                vm.deviceList.push(selection[i].wristbandId)
            }
        }
    },
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
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
    submit(){
        var vm = this;
        if(!vm.groupName){
            vm.$Message.error("请输入分组名称");
            return
        }
      let data = {
        "groupName": vm.groupName,
        "list": vm.deviceList
        };
      this.$axios
        .post("/v1/devicewristband/bathGroup", data)
        .then(function(response) {
          if (response.data.code == 10000) {
            let numCode = response.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
              vm.pageBack();
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
    }
  },
  watch: {
      
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm=this;
    let height = (document.body.offsetHeight - 300) / 2;
    this.schoolId = sessionStorage.getItem("schoolId");
    vm.search();
    
  }
};
</script>