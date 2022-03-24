<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">教师管理</h2>
    </div>
    <Tabs type="card" :value="selectTabName" @on-click="selectTabs" >
      <TabPane name="operator" label="教师账号管理">
        <Card>
          <div style="display:flex;justify-content:space-between;">
            <div style="font-size:18px;height:30px;line-height:30px;margin-bottom:15px;width:62%">教师列表</div>
            <div style="width:35%;">
              <Button
                @click="addTeacherToTeacherDetail"
                type="success"
                icon="plus"
              >新增教师账户</Button>
            </div>
          </div>
          <div>
            <Row>
              <div>
                <Table border :columns="resultColumns" max-height="600" :data="resultData"></Table>
              </div>
            </Row>
          </div>
        </Card>
      </TabPane>
      <TabPane name="group" label="角色设置">
        <Card>
          <div style="display:flex;justify-content:space-between;">
            <div style="font-size:18px;height:30px;line-height:30px;margin-bottom:15px;width:62%">角色列表</div>
            <div style="width:35%;">
              <Button
                @click="addGroup"
                type="success"
                icon="plus"
              >新增角色</Button>
            </div>
          </div>
          <div>
            <Table border :columns="resultGroupColumns" max-height="600" :data="resultGroupData"></Table>
          </div>
          <br>
        </Card>
      </TabPane>
    </Tabs>
    <!-- 删除老师 -->
    <Modal v-model="deleteTeacherModal" title="提  醒" @on-ok="handleDelete">
      <p style="font-size: 16px">确定要删除该账号的数据？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      schoolName: "",
      schoolCode: "",
      adminTeacherId: "",
      adminPhone: "",
      adminName: "",
      selectTabName:"",
      deleteTeacherId: '', // 要删除的teacherid
      deleteTeacherModal: false,
      resultColumns: [
        {
          title: "登录账号",
          key: "phoneNum",
          align: "center",
          minWidth: 100
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          minWidth: 100
        },
        {
          title: "角色",
          key: "powerName",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.isAdmin == "1" ? "系统管理员" : row.powerName;
            return h('div',text)
          }
        },
        {
          title: "人员类型",
          key: "teacherType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.teacherType == "1" ? "教师" : "行政人员")
            ]);
          }
        },
        {
          title: "是否是管理员",
          key: "auditStatus",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.isAdmin == "0" ? "否" : "是")
            ]);
          }
        },
        {
          title: "账号状态",
          key: "auditStatus",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.auditStatus == "0" ? "失效" : "生效")
            ]);
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
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.pageToTeacherDetail(params.row.teacherId);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled: params.row.isAdmin == "1" ?true:false
                  },
                  style: {
                    marginRight: "0px"
                  },
                  on: {
                    click: () => {
                      var vm = this;
                      this.deleteTeacherModal = true
                      this.deleteTeacherId = params.row.teacherId
                      // vm.$Modal.confirm({
                      //   title: "提示",
                      //   content: "确定要删除该账号的数据？",
                      //   onOk: function() {
                      //     vm.deleteTeacherInfo(params.row.teacherId);
                      //   }
                      // });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      resultData: [],
      resultGroupColumns: [
        {
          title: "角色名称",
          key: "groupName",
          align: "center",
          minWidth:200,

        },
        {
          title: "拥有权限数量",
          key: "menuNum",
          align: "center",
          minWidth:200,

        },
        {
          title: "角色启用状态",
          key: "validStatus",
          align: "center",
          minWidth:200,
          render: (h, params) => {
            const param = params.row;
            return h(
              "i-switch",
              {
                props: {
                  type: "primary",
                  value: param.validStatus === "1"
                },
                slots: {
                  open: "有效",
                  close: "失效"
                },
                on: {
                  "on-change": status => {
                    let type=status?"1":"2"
                    this.updateGroupEnableStatus(param.groupId,type);
                  }
                }
              },
              [
                h("span", { props: { slot: "open" } }, "有效"),
                h("span", { props: { slot: "close" } }, "失效")
              ]
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 400,
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
                      this.pageToGroupDetail(params.row.groupId);
                    }
                  }
                },
                "编辑"
              )
              // ,
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "success"
              //     },
              //     style: {
              //       marginRight: "0px"
              //     },
              //     on: {
              //       click: () => {
              //         this.deleteGroup(params.row.groupId);
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      resultGroupData: []
    };
  },
  methods: {
    handleDelete () {
      this.deleteTeacherInfo(this.deleteTeacherId);
    },
     selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('operatorManage-teacherList-selectTabName',this.selectTabName);
     },
    getTeacherList() {
      this.$axios
        .get("/v1/school/getSchoolTeacherForManage?schoolId=" + this.schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response.teacherInfo;
            this.schoolName = res.data.response.schoolName;
            this.schoolCode = res.data.response.schoolCode;
            this.adminTeacherId = res.data.response.adminTeacherId;
            this.adminPhone = res.data.response.adminPhone;
            this.adminName = res.data.response.adminName;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    pageToTeacherDetail(teacherId) {
      //编辑
      //缓存查询条件
      sessionStorage.setItem("teacherList-teacherDetail-teacherId", teacherId);
      this.$router.push({ name: "teacherDetail" });
    },
    addTeacherToTeacherDetail() {
      //缓存查询条件
      sessionStorage.removeItem("teacherList-teacherDetail-teacherId");
      this.$router.push({ name: "teacherDetail" });
    },
    pageToSchoolList() {
      //返回
      if (sessionStorage.getItem("schoolList-queryData") != undefined) {
        sessionStorage.setItem("isSchoolDetailBack", "true");
      }
      this.$router.go(-1);
    },
    deleteTeacherInfo(teacherId) {
      //删除
      this.$axios
        .get("/v1/school/updateTeacherStatus?teacherId=" + teacherId)
        .then(res => {
          if (res.data.code == 10000) {
            this.deleteTeacherModal = false
            this.deleteTeacherId = ''
            this.$Message.info("删除成功！");
            this.getTeacherList();
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
//权限组
    getSchoolGroupList() {
      var vm = this;
      this.$axios.get("/v1/organbase/getSchoolGroupList").then(res => {
        if (res.data.code == 10000) {
          vm.resultGroupData = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    addGroup() {
      sessionStorage.removeItem("operatorManage-groupDetail-groupId");
      this.$router.push({ name: "groupDetail" });
    },
    pageToGroupDetail(groupId) {
      sessionStorage.setItem("operatorManage-groupDetail-groupId", groupId);
      this.$router.push({ name: "groupDetail" });
    },
    deleteGroup(groupId) {
      var vm = this;
      this.$axios.get("/v1/organbase/deleteGroup?groupId="+groupId).then(res => {
        if (res.data.code == 10000) {
          vm.$Message.info('删除成功');
          this.getSchoolGroupList();
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    updateGroupEnableStatus(groupId,type) {
      var vm = this;
      this.$axios.get("/v1/organbase/updateGroupEnableStatus?groupId="+groupId+"&type="+type).then(res => {
        if (res.data.code == 10000) {
          vm.$Message.info('修改成功');
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    }
  },
  watch: {
    //   provinceId:'getCityList',
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    this.selectTabName = sessionStorage.getItem('operatorManage-teacherList-selectTabName');
    if(this.selectTabName == undefined){
        this.selectTabName = "";
    }
    this.schoolId = sessionStorage.getItem("schoolId");
    this.getTeacherList();
    this.getSchoolGroupList();
  }
};
</script>