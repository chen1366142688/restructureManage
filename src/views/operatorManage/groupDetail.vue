<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{titleName}}</h2>
    </div>
        <Card>
          <Form
            :label-width="80"
            class="baseInfo"
            style="margin-top:20px;"
          >
            <FormItem
              label="角色状态："
              class="baseInfoitem"
            >
              <RadioGroup v-model="roleStatus">
                <Radio label="1">开启</Radio>
                <Radio label="0">停用</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="角色名称："
              class="baseInfoitem"
            >
              <Input
                v-model="roleName"
                placeholder="请输入角色名称"
                style="width:180px;"
              />
            </FormItem>
            <FormItem
              label="授权菜单："
              class="address"
            >

              <CheckboxGroup
                style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
                v-for="(menu,aindex) in menuList"
                :key="aindex"
              >
                <Checkbox
                  :value="menu.checkStatus"
                  :label="menu.menuId"
                  @click.prevent.native="handleCheckAll(menu.menuId)"
                >{{menu.menuName}}</Checkbox>
                <CheckboxGroup>
                  <Checkbox
                    :value="menut.checkStatus"
                    v-for="(menut,bindex) in menu.childMenu"
                    :key="bindex"
                    :label="menut.menuId"
                    v-if="menut.parentCode==menu.menuCode"
                    @click.prevent.native="handleCheckOne(menut.menuId)"
                  >{{menut.menuName}}</Checkbox>
                </CheckboxGroup>
              </CheckboxGroup>
            </FormItem>
          </Form>
        </Card>
        <div style="margin-top:20px;padding-right:20px;text-align:center" >
          <Button
              @click="pageToTeacherList"
              style="margin-right:50px;width:100px"
              type="success"
            >返回</Button>
          <Button
            type="success"
            style="width:100px"
            @click="baseSubmit"
          >保存</Button>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "test",
  data() {
    return {
      // indeterminate:true,
      titleName: "新增角色",
      schoolId: "",
      roleId: "",
      roleStatus: "1",
      roleName: "",
      ids: [],
      cids: [],
      defaultId: "",
      menuList: [],
    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    pageToTeacherList() {
      //返回
      this.$router.go(-1);
    },
    getAllMenuGroupList(groupId) {
      var vm = this;
      this.$axios.get(
          "/v1/organbase/getAllMenuGroupList"
        )
        .then(function(response) {
          // console.log(response);
          vm.menuList = response.data.response;
          if (groupId) {
            vm.getRoleInfoByRoleId(groupId);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getRoleInfoByRoleId(groupId) {
      var vm = this;
      this.$axios.get("/v1/organbase/getRoleInfoByRoleId?groupId=" + groupId)
        .then(function(response) {
          // console.log(response);
          var data = response.data.response;
          vm.defaultId = data.defaultId;
          vm.roleName = data.roleName;
          vm.roleStatus = data.roleStatus;

          var menuIds = data.menuIds;
          var list = vm.menuList;

          for (var i = 0; i < menuIds.length; i++) {
            for (var j = 0; j < list.length; j++) {
              // console.log(menuIds[i])
              // console.log(list[j].menuId)
              if (menuIds[i] == list[j].menuId) {
                list[j].checkStatus = true;
              }
              var child = list[j].childMenu;
              for (var k = 0; k < child.length; k++) {
                // console.log(menuIds[i] == child[k].menuId)
                if (menuIds[i] == child[k].menuId) {
                  child[k].checkStatus = true;
                }
              }
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    baseSubmit() {
      var vm = this;

      if (!vm.roleName) {
        this.$Message.error("请填写权限组名称");
        return false;
      }
      var list = vm.menuList;
      for (var i = 0; i < list.length; i++) {
        if (list[i].checkStatus) {
          vm.ids.push(list[i].menuId);
          var child = list[i].childMenu;

          var cids = [];
          for (var j = 0; j < child.length; j++) {
            if (child[j].checkStatus) {
              cids.push(child[j].menuId);
              vm.ids.push(child[j].menuId);
            }
          }
        //   if (cids.length < 1) {
        //     vm.$Message.info("权限选择有误，请检查");
        //     return;
        //   }
        }
      }
      if (vm.ids.length < 1) {
        this.$Message.error("请选择授权菜单");
        return false;
      }

      let data = {
        menuIds: vm.ids,
        groupId: vm.groupId,
        schoolId: vm.schoolId,
        roleName: vm.roleName,
        roleStatus: vm.roleStatus
      };
      // console.log(data);
      // return;
      this.$axios.post("/v1/organbase/upsertRole", data)
        .then(function(response) {
          if (response.data.code == 10000) {
            let numCode = response.data.response;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
              vm.$router.go(-1);
            }
          } else {
            if (30002 == response.data.code) {
              vm.$Message.info("参数有误，请检查");
            } else {
              vm.$Message.info("保存失败！");
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    handleCheckAll(menuId) {
      var vm = this;
      // console.log(menuId);
      var list = vm.menuList;
      for (var i = 0; i < list.length; i++) {
        if (list[i].menuId == menuId) {
          list[i].checkStatus = list[i].checkStatus ? false : true;
          var child = list[i].childMenu;
          for (var j = 0; j < child.length; j++) {
            if (list[i].checkStatus) {
              child[j].checkStatus = true;
            } else {
              child[j].checkStatus = false;
            }
          }
        }
      }
    },
    handleCheckOne(menuId) {
      var vm = this;
      // console.log(menuId);
      var list = vm.menuList;
      for (var i = 0; i < list.length; i++) {
        var child = list[i].childMenu;
        var count = 0;
        for (var j = 0; j < child.length; j++) {
          if (child[j].menuId == menuId) {
            child[j].checkStatus = child[j].checkStatus ? false : true;
          }
          if (child[j].checkStatus) {
            count++;
          }
        }
        if (count < 1) {
          list[i].checkStatus = false;
        } else {
          list[i].checkStatus = true;
        }
      }
    }
  },
  mounted() {
    var vm = this;
    vm.groupId = sessionStorage.getItem("operatorManage-groupDetail-groupId");
    vm.getAllMenuGroupList(sessionStorage.getItem("operatorManage-groupDetail-groupId"));
    // vm.getAllLevelTwoMenuInfoList();
    if (sessionStorage.getItem("operatorManage-groupDetail-groupId")) {
      vm.titleName = "编辑角色";
    } else {
    }
  },
  destroyed() {
    var vm = this;
  }
};
</script>