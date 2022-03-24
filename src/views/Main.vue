<style lang="less">
@import "./main.less";
</style>

<template>
  <div class="main" :class="{ 'main-hide-text': shrink }">
    <div
      class="sidebar-menu-con"
      :style="{
        width: shrink ? '90px' : '250px',
        overflow: shrink ? 'visible' : 'auto',
      }"
    >
      <shrinkable-menu
        ref="shrinkable"
        :shrink="shrink"
        :menu-list="sideLeftBarList"
        :open-names="openNames"
      >
        <div
          slot="top"
          :class="schoolName.length < 10 ? 'logo-con' : 'logo-con-more'"
          style="background-color: white"
        >
          <img src="../images/schoolLogo.png" class="min-logo" />
          <div class="schoolName-tit" v-if="!shrink">{{ schoolName }}</div>
        </div>
      </shrinkable-menu>
    </div>
    <div
      class="main-header-con"
      :style="{ paddingLeft: shrink ? '90px' : '250px' }"
    >
      <div class="main-header">
        <div class="navicon-con">
          <topMenu
            ref="tpoMenu"
            :menu-list="shakingedRouter"
            @handleClick="handleClick"
            @handleChange="handleChange"
          ></topMenu>
        </div>
        <div class="header-avator-con">
          <div class="nowTimes">
            <p>
              <strong>
                {{
                  semesterStatus == 1
                    ? "第一学期"
                    : semesterStatus == 2
                    ? "寒假"
                    : semesterStatus == 3
                    ? "第二学期"
                    : "暑假"
                }}
                <span v-if="semesterStatus == 1 || semesterStatus == 3"
                  >第{{ weekCount }}周 星期{{ weekDay }}</span
                >
              </strong>
            </p>
            <p>{{ nowTime }}</p>
          </div>
          <div class="user-dropdown-menu-con">
            <Row
              type="flex"
              justify="end"
              align="middle"
              class="user-dropdown-innercon"
            >
              <Dropdown
                transfer
                trigger="click"
                @on-click="handleClickUserDropdown"
              >
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="md-arrow-dropdown" />
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem
                    v-if="loginSchoolList && loginSchoolList.length > 1"
                    :name="item.relationSchoolId"
                    v-for="(item, index) in loginSchoolList"
                    :key="index"
                    divided
                    style="margin-top: 0px"
                    :selected="schoolName === item.relationSchoolName"
                    >{{ item.relationSchoolName }}</DropdownItem
                  >
                  <DropdownItem name="loginout" divided style="margin-top: 0px"
                    >退出登录</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
              <!-- <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/> -->
              <Avatar
                :src="avatarUrl"
                icon="person"
                style="
                  background: #619fe7;
                  margin-left: 10px;
                  border: 1px #9ea7b4 solid;
                "
              ></Avatar>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div
      class="single-page-con"
      :style="{ left: shrink ? '90px' : '250px' }"
      ref="mainBox"
    >
      <!-- 待办事项浮窗 -->
      <div class="glob-message">
        <div
          class="circle"
          @click="clickShowMessage"
          v-if="messageList.length && messageList.length > 0"
        >
          待办 <br />
          事项
        </div>
        <div class="message-box" v-if="showMessageBox">
          <div>
            <div class="message-box-title">
              <img
                src="../images/icon_horn.png"
                alt=""
                class="icon_horn"
                v-if="messageList[pageIndex].noticeType == 2"
              />
              <img
                src="../images/icon_submit.png"
                alt=""
                class="icon_horn"
                v-else
              />
              <span>{{
                messageList[pageIndex].noticeType == 1 ? "数据报送" : messageList[pageIndex].noticeType == 2 ? "通知公告" : "审核通知"
              }}</span>
            </div>
            <div class="message-box-content">
              <div>{{ messageList[pageIndex].noticeContent }}</div>
              <div class="time">
                {{messageList[pageIndex].noticeType == 3 ? "时间：" : "截止时间："}} {{ messageList[pageIndex].endTime }}
              </div>
            </div>
            <div class="message-box-footer">
              <div class="shouqi" @click="cancelMessageBox">
                <span>收起</span>
                <img
                  src="../images/icon_arrow_top.png"
                  alt=""
                  class="icon_arrow_top"
                />
              </div>
              <div v-if="messageList[pageIndex].noticeType == 3">
                <Button style="width:100px" @click="readMessage" type="success">已读本条</Button>
              </div>
              <Page
                :current="pageIndex + 1"
                :total="pageTotal * 10"
                simple
                @on-change="changeMessage"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="single-page" ref="signglePage">
        <router-view></router-view>
      </div>
      <!-- 重新登录 -->
      <Modal v-model="loginAgain" :closable="false" :mask-closable="false" width="400">
          <p slot="header" class="userSign">
              <span> {{!loginStep?'温馨提示':'重新登录'}}</span>
          </p>
          <div class="again_content" v-if="!loginStep">由于长时间未操作，系统已自动退出登录。</div>
          <div class="formData" v-else>
            <Form ref="loginForm" :model="againParams" :rules="rules">
                <FormItem prop="userPhone" class="login-item">
                  <img src="../images/userName.png" alt />
                  <Input
                    v-model="againParams.userPhone"
                    class="login-name"
                    placeholder="请输入账号"
                    :maxlength="11"
                    disabled
                  ></Input>
                </FormItem>
                <FormItem prop="againPassword" class="login-item">
                  <img src="../images/password.png" alt />
                  <Input
                    v-model="againParams.againPassword"
                    type="password"
                    class="login-name"
                    placeholder="请输入密码"
                    :minlength="6"
                  ></Input>
                </FormItem>
                <FormItem prop="code" class="login-item">
                  <img src="../images/code.png" alt />
                  <Input v-model="againParams.code" class="login-names" placeholder="请输入验证码" :maxlength="4"></Input>
                  <img class="code-img" @click="changeCode" alt :src="againParams.codeSource" />
                  <img class="reload" @click="changeCode" alt src="../images/reload.png" />
                </FormItem>
              </Form>
          </div>
          <div slot="footer" class="footer">
              <Button type="success" @click="cancelLogin">退出</Button>
              <Button type="success" @click="isAgainLogin" v-if="!loginStep">重新登录</Button>
              <Button type="success" @click="againLogin" v-if="loginStep">登录</Button>
          </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  window.onresize
</script>

<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import topMenu from "./main-components/shrinkable-menu/components/topMenu.vue";
import Fullscreen from "../components/main/fullscreen";
import Mixins from './MainMixin.js';
import { getToken } from '@/libs/token'
import { mapGetters, mapActions } from 'vuex'
import User from '@/models/user'
export default {
  mixins: [ Mixins ],
  components: {
    shrinkableMenu,
    topMenu,
    Fullscreen,
  },
  data() {
    return {
      schoolLogo: "../images/index_timo.png",
      schoolName: "",
      shrink: false,
      userName: "",
      phoneNo: "",
      operationCode: "",
      avatarUrl: "",
      nowTime: "",
      openNames: [],
      loginSchoolList: [],
      weekCount: "",
      semesterStatus: "",
      weekDay: "",
      isFullscreen: false,
      showMessageBox: false,
      messageList: [],
      pageIndex: 0,
      pageTotal: 3,
      schoolDistrict: "",
      menuLeftList: [],
      status: false,
      clientWidth: '',
    };
  },
  computed: {
    loginAgain(){
      let loginAgainStatus = this.$store.state.loginAgain
      if(loginAgainStatus){
        this.againParams.userPhone = sessionStorage.getItem('phoneNo')
        this.againParams.againPassword = ''
        this.againParams.code = ''
        this.changeCode()
      }
      return loginAgainStatus;
    },
    ...mapGetters(['shakingedRouter', 'sideLeftBarList', 'active']),
  },
  watch: {
    // 监听屏幕宽度，如果小于等于1440显示收缩菜单，否则显示展开菜单
    'clientWidth': {
      handler(newVal, oldVal) {
        if (newVal <= 1440) {
          this.shrink = true
        } else if (newVal > 1440) {
          this.shrink = false
        }
      },
      immediate: true
    }
  },
  beforeMount() {
    /**
     * 在挂载阶段监听浏览器尺寸，动态获取屏幕宽度
     */
    const vm = this
    this.clientWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        vm.clientWidth = document.body.clientWidth
      })();
    };
  },
  methods: {
    ...mapActions(['setHistoryActive','loginOut']),
    fatherMethod() {
      this.$refs.mainBox.scrollTop = this.$refs.signglePage.offsetHeight;
    },
    getMessageList() {
      this.$axios.get("/v1/education/queryEducationInfoList").then((res) => {
        if (res.data.code === 10000) {
          let result = res.data.response;
          if (result && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
              let item = result[i];
              item.endTime = item.endTime.split(".")[0];
            }
            let lastNoticeId = Number(sessionStorage.getItem("lastNoticeId"));
            if (lastNoticeId) {
              // 从缓存中取出noticeId
              if (result[result.length - 1].noticeId > lastNoticeId) {
                // 如果最新的noticeId大于缓存中的noticeId则说明有消息
                this.showMessageBox = true;
              }
            }
            sessionStorage.setItem(
              "lastNoticeId",
              result[result.length - 1].noticeId
            );
            this.messageList = result;
            this.pageTotal = res.data.response.length;
            if (sessionStorage.getItem("showMessageBox")) {
              // 如果检测到是第一次登陆进来显示消息
              this.showMessageBox = true;
            }
          }else{
            this.showMessageBox = false;
            sessionStorage.removeItem("showMessageBox");
          }
        }
      });
    },
    changeMessage(e) {
      this.pageIndex = e - 1;
    },
    cancelMessageBox() {
      this.showMessageBox = false;
      sessionStorage.removeItem("showMessageBox");
    },
    readMessage(){
      let vm = this
      this.$axios
              .get("/v1/education/teacherReadMessage?noticeId=" + vm.messageList[vm.pageIndex].noticeId)
              .then(function (res) {
                vm.getMessageList()
                }
              )
    },
    clickShowMessage() {
      this.showMessageBox = true;
    },
    handleClick(name) {//展开
      this.openNames = [name];
    },
    handleChange(name) {//选中
      const activeData = this.active
      activeData.name = name
      this.setHistoryActive(activeData)
      this.$refs.shrinkable.handleChange(name);
    },
    handleClickUserDropdown(name) {
      if (name != "loginout") {
        this.status = true;
        const activeSchoolId = sessionStorage.getItem("schoolId");
        if (activeSchoolId == name) {
          return false;
        } else {
          this.$Spin.show({
            render: (h) => {
              return h("div", [
                h("Icon", {
                  class: "demo-spin-icon-load",
                  props: {
                    type: "ios-loading",
                    size: 18,
                  },
                }),
                h("div", "切换中"),
              ]);
            },
          });

          const token = sessionStorage.getItem("token");
          sessionStorage.clear();
          sessionStorage.setItem("token", token);
          this.upDateToken(name);
        }
      }else{
        sessionStorage.clear();
        this.$router.push({
            name: "login",
        });
      }
    },
    showTime() {
      var myDate = new Date();
      this.nowTime =
        myDate.getFullYear() +
        "-" +
        (myDate.getMonth() + 1 < 10
          ? "0" + (myDate.getMonth() + 1)
          : myDate.getMonth() + 1) +
        "-" +
        (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()) +
        " " +
        (myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()) +
        ":" +
        (myDate.getMinutes() < 10
          ? "0" + myDate.getMinutes()
          : myDate.getMinutes()) +
        ":" +
        (myDate.getSeconds() < 10
          ? "0" + myDate.getSeconds()
          : myDate.getSeconds());
      setTimeout(() => {
        this.showTime();
      }, 1000);
    },
    
    queryLoginSchoolList() {
      let this_ = this;
      let token = sessionStorage.getItem("token");
      this_.$axios.defaults.headers.common["token"] = token;
      if (token != null && token != "") {
        this.$axios
          .get("/v1/auth/query/login/school/list?token=" + token)
          .then(function (res) {
            if (res.data.code == 10000) {
              this_.loginSchoolList = [];
              for (let i = 0; i < res.data.response.length; i++) {
                if (
                  res.data.response[i].relationSchoolId !=
                  sessionStorage.getItem("schoolId")
                ) {
                  this_.loginSchoolList.push(res.data.response[i]);
                } else {
                  this_.loginSchoolList.push(res.data.response[i]);
                }
              }
            }
          })
          .catch(function (error) {});
      } else {
      }
    },


    async upDateToken(schoolId){
      try { 
        let params = {
          token: getToken('token'),
          schoolId: schoolId,
          schoolType: '2'
        }
        const userInfo = await User.upDateToken(params)
        this.setUserAndState(userInfo)
        this.setUserPermissions(userInfo.menuList)
        this.setShakingedRouter()
        const shakingedRouter = this.$store.state.shakingedRouter
        if(shakingedRouter && shakingedRouter.length > 0){
          const [first] = shakingedRouter
          const { children } = first
          this.$router.push({ name: children[0].name });
        }else {
          const that = this
          this.$Message.info('登录中,请稍后...')
          setTimeout(()=>{//防止异步存值未完成情况
            if(shakingedRouter && shakingedRouter.length > 0){
              const [first] = shakingedRouter
              const { children } = first
              that.$router.push({ name: children[0].name });
            }else{
              that.$Message.info('未获取到您的路由权限，请联系管理员')
              that.$router.push({ name: 'login' });
            }
          },500)
        }
      } catch (e) {
        console.log(e)
      }
    },

  },
  created() {
    if(Object.prototype.toString.call(getToken('token')) === '[object Null]'){
      this.loginOut()
    }else{
      this.openNames = [this.active.parentName]
      this.upDateToken(0)
      // this.getMessageList();
    }
  },
  mounted() {
    
    // this.$parent.getSchoolWasNotice();
    // this.$store.commit("updateMenulist");
    // this.schoolLogo = sessionStorage.getItem("schoolLogo");
    // this.weekCount = sessionStorage.getItem("weekCount"); // 当前周数
    // this.semesterStatus = sessionStorage.getItem("semesterStatus"); // 当前学期
    // this.weekDay = "日一二三四五六".charAt(new Date().getDay());
    // this.showTime();
    // this.queryLoginSchoolList();
  },
};
</script>
