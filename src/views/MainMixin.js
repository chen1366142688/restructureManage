import md5 from "js-md5"; 
const mixins = {
   data () {
     return {
      //重新登录相关属性
       againParams: {
        userPhone:'',
        againPassword:'',
        code:'',
        userCode:'',
        codeSource:''
      },
      rules: {
        userPhone: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        againPassword: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ]
      },
      loginStep:false,//是否重新登录
     }
   },
   methods: {
    isAgainLogin(){
       this.loginStep = true;
    },
    againLogin(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const password = md5(this.againParams.againPassword);
          const userPhone = sessionStorage.getItem('phoneNo');
          const schoolId = sessionStorage.getItem('schoolId');
          const params = {
            userPhone: userPhone,
            password: password,
            code: this.againParams.code,
            userCode: this.againParams.userCode,
            schoolId: schoolId,
            schoolType: 2,
            type: '1'
          };
          this.$axios.post("/v1/auth/login/password", params).then((res) => {
            if(res.data.code === 10000){
              let { response } = res.data;
              sessionStorage.setItem("token", response.oAuthTokenVO.token);
              this.loginStep = false;
              this.setLoginStatus(false)
            }else{
              this.$Message.info(res.data.msg);
            }
          })
        }
      })
    },
    changeCode() {
      const myDate = new Date();
      this.againParams.userCode = myDate.getTime();
      this.againParams.codeSource = `${this.$axios.defaults.baseURL}/v1/auth/login/getCheckCode?userCode=${this.againParams.userCode}`;
    },
    cancelLogin(){
      this.setLoginStatus(false)
      this.loginStep = false;
      this.$router.push({ name: 'login' });
    },
   }
 }
export default mixins;