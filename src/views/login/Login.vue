<style lang="less">
@import "./Login.less";
</style>
<template>
  <div class="login">
    <div class="form-box">
      <div class="title"><h2 title="智慧体育教育SaaS云平台">智慧体育教育SaaS云平台</h2></div>
      <div class="login-box">
        <img class="form-left" :src="teamInfo.welcome" alt="欢迎登录" />
        <Form class="login-form" ref="loginForm" :model="registerForm" :rules="rules">
          <div class="login-form-title">{{formType ? '用户登录' : '找回密码'}}</div>
          <div class="form-data-box">
              <div class="form-data" v-show="formType">
                  <FormItem prop="userName" class="form-item">
                    <img src="../../assets/img/login/userName.png" alt />
                    <Input
                    v-model="registerForm.userName"
                    class="form-item-input"
                    placeholder="请输入账号"
                    :maxlength="11"
                    ></Input>
                  </FormItem>
                  <FormItem prop="password" class="form-item">
                      <img src="../../assets/img/login/password.png" alt />
                      <Input
                      v-model="registerForm.password"
                      type="password"
                      class="form-item-input"
                      placeholder="请输入密码"
                      :minlength="6"
                      ></Input>
                  </FormItem>
                  <FormItem prop="code" class="form-item">
                      <img src="../../assets/img/login/code.png" alt />
                      <Input v-model="registerForm.code" class="form-item-input verification" placeholder="请输入验证码" :maxlength="4"></Input>
                      <img class="code-img" @click="changeCode" alt :src="codeUrl" />
                      <img class="reload" @click="changeCode" alt src="../../assets/img/login/reload.png" />
                  </FormItem>
              </div>
              <div class="form-data" v-show="!formType">
                <FormItem prop="userNameAgain" class="form-item marB20">
                    <img src="../../assets/img/login/userName.png" alt />
                    <Input
                    v-model="registerForm.userNameAgain"
                    class="form-item-input w200"
                    placeholder="请输入账号"
                    :maxlength="11"
                    ></Input>
                    <div class="forget-sendCode" @click="changePhoneCode" :style="codeStyle">{{codeTxt}}</div>
                  </FormItem>
                  <FormItem prop="codeAgain" class="form-item marB20">
                      <img src="../../assets/img/login/code.png" alt />
                      <Input
                      type="text"
                      v-model="registerForm.codeAgain"
                      class="form-item-input"
                      placeholder="请输入验证码"
                      :minlength="6"
                      ></Input>
                  </FormItem>
                  <FormItem prop="newPassword" class="form-item marB20">
                      <img src="../../assets/img/login/password.png" alt />
                      <Input
                      v-model="registerForm.newPassword"
                      type="password"
                      class="form-item-input w130"
                      placeholder="请输入密码"
                      :minlength="6"
                      ></Input>
                      <span class="password-aside">密码至少6位,包含字母和数字</span>
                  </FormItem>
                  <FormItem prop="passWordAgain" class="form-item marB20">
                      <img src="../../assets/img/login/password.png" alt />
                      <Input
                      v-model="registerForm.passWordAgain"
                      type="password"
                      class="form-item-input"
                      placeholder="请输入密码"
                      :minlength="6"
                      ></Input>
                  </FormItem>
              </div>
              <div class="minProgram-data">
                <img src="../../assets/img/login/sCode.png" alt="二维码" />
                <div class="goWechart">微信扫一扫</div>
                <div class="goWechart">进入教师移动端</div>
              </div>
          </div>
          <div class="forget-password">
            <span @click="checkFormType">{{formType ? '忘记密码？' : '返回登录'}}</span>
          </div>
          <FormItem class="form-footer">
            <Button class="login-button" @click="handleSubmit" type="success" long>登 录</Button>
          </FormItem>
        </Form>
      </div>

      <footer>
        <div>技术支持：{{teamInfo.computerPhone}}</div>
        <div class="footer_name">{{teamInfo.asideTxt}}</div>
        <div>( 推荐浏览器：谷歌浏览器Google Chrome | 推荐分辨率：1920*1080 )</div>
      </footer>
    </div>
  </div>
</template>

<script>
import welcome from '@/assets/img/login/welcome.png'
import guangzhou from '@/assets/img/login/guangzhou.png'
import User from '@/models/user'
import Mixins from './login'
import { setStorage } from '@/libs/token'
import { mapActions, mapMutations } from 'vuex'
import Config from '@/config'
export default {
  mixins: [ Mixins ],
  data() {
    return {
      formType: true, // true-登录 !-找回密码
      baseURL: Config.baseURL,
      teamInfo:{
        welcome:welcome,
        computerPhone:'400-666-1816',
        asideTxt:'copyright© 2021 TMNETWORK 成都探马网络科技有限公司',
      },
      codeStyle: {
        background: "#2DB394",
      },
      countdown: 60,
      codeTxt: "发送验证码",
      schoolType: 2,
      registerForm: {
        userName: "",
        password: "",
        code: "",
        userNameAgain: '',
        codeAgain: '',
        newPassword: '',
        passWordAgain: ''
      },
      codeUrl: "",
      userCode: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.registerUser()
        }else{
          this.$Message.info('登录信息不正确')
        }
      });
    },
    async registerUser(){
      try {
        let {userCode, schoolType, registerForm, formType} = this
        let params = {};
        if(formType){
          params = {
            userPhone: registerForm.userName,
            password: registerForm.password,
            code: registerForm.code,
            userCode: userCode,
            schoolType: schoolType,
            type: "1"
          }
        }else{
          params = {
            code: registerForm.codeAgain,
            passWord: registerForm.passWordAgain,
            phoneNum: registerForm.userNameAgain,
            schoolType: schoolType,
            teacherId: ""
          }
        }
        const userInfo = await User.registerOrForgetPassWord(params, formType)
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
            }
          },500)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async organLogin(ortanToken, loginSchoolId){
      try { 
        let params = {
          token: ortanToken,
          schoolId: loginSchoolId
        }
        const userInfo = await User.loginSchoolByOrgantoken(params)
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
    async changePhoneCode() {
      const regExp = /^1[34578]\d{9}$/
      let {registerForm, schoolType, countdown} = this
      if (countdown < 60) { return }
      try {
        const params = {
          phoneNum: registerForm.userNameAgain,
          schoolType: schoolType
        }
        if(regExp.test(registerForm.userNameAgain)){
          await User.sendSMS(params)
          this.codeStyle.background = "#999999";
          this.computedCountDown();
        }
      } catch(e) {
        console.log('验证码发送失败，原因如下：',e)
      }
    },
    computedCountDown() {
      const that = this
      if (this.countdown <= 0) {
        this.codeStyle.background = "#2DB394";
        this.countdown = 60;
        this.codeTxt = "发送验证码";
        return;
      } else {
        this.codeTxt = `已发送${this.countdown}s`;
        this.countdown--;
      }
      setTimeout(function () {
        that.computedCountDown();
      }, 1000);
    },
    checkFormType() {
      this.formType = !this.formType
    },
    changeCode() {
      this.userCode = new Date().getTime();
      this.codeUrl = User.getCheckCode(this.userCode)
    },
    directLogin(){
      let {href} = window.location;
      let tokenIndex = href.indexOf("token=");
      let schoolIdIndex = href.indexOf("schoolid=");
      let keyIndex = href.indexOf("key=");
      if (href.indexOf("token=") > 0) {//教育局过来的有token就直接登录
          let organToken = href.substring(tokenIndex + 6,href.indexOf("&"));
          let loginSchool = href.substring(schoolIdIndex + 9,keyIndex - 1);
          this.organLogin(organToken, loginSchool);
      }
    },
    /**如果是广州的域名换图**/
    isGuangZhou(){
      if(window.location.origin === Config.zhURL){
        this.teamInfo.welcome = guangzhou
        this.teamInfo.computerPhone='020-38939139'
        this.teamInfo.asideTxt = 'copyright© 2018-2021 广州蔚来体育科技有限公司'
      }
    },
    ...mapActions(['setUserAndState','setShakingedRouter']),
    ...mapMutations({
      setUserPermissions: 'SET_USER_PERMISSIONS',
    }),
    
  },
  mounted() {
    this.directLogin();//是否是教育局到系统直接登录的
    this.isGuangZhou();//广州域名需要更换企业信息
    this.changeCode();//获取动态验证码
  },
};
</script>

