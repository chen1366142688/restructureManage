<style lang="less">
@import "./main.less";
</style>

<template>
  <div class="main" :class="{ 'main-hide-text': shrink }">
    <div class="sidebar-menu-con" :style="{ width: shrink ? '90px' : '250px'}">
      <shrinkable-menu
        ref="shrinkable"
        :shrink="shrink"
        :menu-list="sideLeftBarList"
        :open-names="openNames"
        >
        <div
          slot="top"
          :class="user.schoolName.length < 10 ? 'logo-con' : 'logo-con-more'"
          style="background-color: #fff"
          >
          <img src="../assets/img/main/schoolLogo.png" class="min-logo" />
          <div class="schoolName-tit" v-if="!shrink">{{ user.schoolName }}</div>
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
              <strong>{{learningStage(user.semesterStatus)}}
                <span v-if="user.semesterStatus == 1 || user.semesterStatus == 3">第{{ user.weekCount }}周 星期{{ weekDay }}</span>
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
                  <span class="main-user-name">{{ user.name }}</span>
                  <Icon type="md-arrow-dropdown" />
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem
                    v-if="loginSchoolList.length > 1"
                    :name="item.relationSchoolId"
                    v-for="(item, index) in loginSchoolList"
                    :key="index"
                    divided
                    style="margin-top: 0px"
                    :selected="user.schoolName === item.relationSchoolName"
                    >{{ item.relationSchoolName }}</DropdownItem
                  >
                  <DropdownItem name="loginout" divided style="margin-top: 0px"
                    >退出登录</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
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
import { getToken, setStorage } from '@/libs/token'
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
      shrink: false,
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
      oneWeekStr: '日一二三四五六'
    };
  },
  computed: {
    ...mapGetters(['shakingedRouter', 'sideLeftBarList', 'active', 'user']),
    loginAgain(){
      let loginAgainStatus = this.$store.state.loginAgain
      if(loginAgainStatus){
        this.againParams.userPhone = this.user.phoneNum
        this.againParams.againPassword = ''
        this.againParams.code = ''
        this.changeCode()
      }
      return loginAgainStatus;
    },
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
    const that = this
    this.clientWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        that.clientWidth = document.body.clientWidth
      })();
    };
  },
  methods: {
    ...mapActions(['setHistoryActive','loginOut','setUserAndState','setShakingedRouter','setLoginStatus']),
    ...mapMutations({setUserPermissions: 'SET_USER_PERMISSIONS'}),
    handleClick(name) {//展开
      this.openNames = [name];
    },
    handleChange(name) {//选中
      const activeData = this.active
      activeData.name = name
      this.setHistoryActive(activeData)
      this.$refs.shrinkable.handleChange(name);
    },
    //以下为消息通知相关函数
    fatherMethod() {
      this.$refs.mainBox.scrollTop = this.$refs.signglePage.offsetHeight;
    },
    changeMessage(e) {
      this.pageIndex = e - 1;
    },
    cancelMessageBox() {
      this.showMessageBox = false;
      sessionStorage.removeItem("showMessageBox");
    },
    clickShowMessage() {
      this.showMessageBox = true;
    },
    /**
     * @param {string} name 当前选中教师名称
    */
    handleClickUserDropdown(name) {
      if(name === "loginout"){
        this.loginOut()
      }else{
        this.status = true;
        if(name == this.user.schoolId){
          return false;
        }else{
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
          this.upDateToken(name);
        }
      }
    },
    timeCounter() {
      let nowDate = new Date();
      let fullYear = nowDate.getFullYear();
      let month = nowDate.getMonth() +1 ;
      let date = nowDate.getDate();
      let hour = nowDate.getHours();
      let minutes = nowDate.getMinutes();
      let seconds = nowDate.getSeconds();
      this.nowTime = `${fullYear}-${month < 10 ? ('0'+ month) : month}-${date < 10 ? ('0' + date) : date}:${hour < 10 ? ('0' + hour) : hour}:${minutes < 10 ? ('0' + minutes) : minutes}:${seconds < 10 ? ('0' + seconds) : seconds}`
      setTimeout(() => {this.timeCounter()}, 1000);
    },
    learningStage(status){
      return status === '1' ? "第一学期" : status === '2' ? "寒假" : status === '3' ? "第二学期" : "暑假";
    },
    async upDateToken(schoolId){
      try { 
        let params = {
          token: getToken('token'),
          schoolId: schoolId,
          schoolType: '2'
        }
        const userInfo = await User.upDateToken(params)
        if (this.status) {//切换学校
          this.status = false
          this.$Spin.hide();
        }
        setStorage(userInfo)
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
    async queryLoginSchoolList() {
      try {
        const schoolList = await User.querySchoolList()
        this.loginSchoolList = schoolList
      } catch(err){
        console.log(err)
      }
    },
    async getMessageList() {
      const MessageList = await User.getMessageList()
      if (MessageList && MessageList.length > 0) {
        for (let i = 0; i < MessageList.length; i++) {
          let item = MessageList[i];
          item.endTime = item.endTime.split(".")[0];
        }
        let lastNoticeId = Number(sessionStorage.getItem("lastNoticeId"));
        if (lastNoticeId) {
          // 从缓存中取出noticeId
          if (MessageList[MessageList.length - 1].noticeId > lastNoticeId) {
            // 如果最新的noticeId大于缓存中的noticeId则说明有消息
            this.showMessageBox = true;
          }
        }
        sessionStorage.setItem(
          "lastNoticeId",
          MessageList[MessageList.length - 1].noticeId
        );
        this.messageList = MessageList;
        this.pageTotal = MessageList.length;
        if (sessionStorage.getItem("showMessageBox")) {
          // 如果检测到是第一次登陆进来显示消息
          this.showMessageBox = true;
        }
      }else{
        this.showMessageBox = false;
        sessionStorage.removeItem("showMessageBox");
      }
    },
    async readMessage(){
      try {
        const {messageList, pageIndex} = this
        await User.teacherReadMessage(messageList[pageIndex].noticeId)
        this.getMessageList()
      } catch (err){
        console.log(err)
      }
    },
  },
  created() {
    if(Object.prototype.toString.call(getToken('token')) === '[object Null]'){
      this.loginOut()
    }else{
      this.openNames = [this.active.parentName]
      this.upDateToken(0)
      this.getMessageList();
    }
  },
  mounted() {
    this.weekDay = this.oneWeekStr.charAt(new Date().getDay());
    this.timeCounter();
    this.$parent.getSchoolWasNotice();
    this.queryLoginSchoolList();
  },
};
</script>
