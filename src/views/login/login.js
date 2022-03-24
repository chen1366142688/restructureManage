const userNameFirstCheck = (rule, value, callback) => {
  const { formType, registerForm } = rule.context
  if (!formType) { callback();}
  let regExps = new RegExp(/^1[34578]\d{9}$/);
  if (value == null || value.length < 11) {
    callback(new Error("账号不能少于11位"));
  } else if (!regExps.test(registerForm.userName)) {
    callback(new Error("账号格式不正确"));
  } else {
    callback();
  }
};

const passwordFirstCheck = (rule, value, callback) => {
  const { formType } = rule.context
  if (!formType) { callback();}
  let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
  if (value == null || value.length < 6) {
    callback(new Error("密码至少6位,同时包含字母和数字"));
  } else if (!reg.test(value)) {
    callback(new Error("密码至少6位,同时包含字母和数字"));
  } else {
    callback();
  }
};

const codeFirstCheck = (rule, value, callback) => {
  const { formType } = rule.context
  if (!formType) { callback(); }
  if (!value) {
    callback(new Error("验证码不能为空"));
  } else {
    callback();
  }
};

const userNameCheck = (rule, value, callback) => {
  const { formType, registerForm } = rule.context
  if (formType) { callback();}
  let str = value;
  let regExps = new RegExp(/^1[34578]\d{9}$/);
  if (str == null || str.length < 11) {
    callback(new Error("手机号不能少于11位"));
  } else if (!regExps.test(registerForm.userNameAgain)) {
    callback(new Error("手机号格式不正确"));
  } else {
    callback();
  }
};
const pwdCheck = (rule, value, callback) => {
  const { formType } = rule.context
  if (formType) { callback();}
  let str = value;
  let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
  if (str == null || str.length < 6) {
    callback(new Error("密码至少6位,同时包含字母和数字"));
  } else if (!reg.test(str)) {
    callback(new Error("密码至少6位,同时包含字母和数字"));
  } else {
    callback();
  }
};
const codeCheck = (rule, value, callback) => {
  const { formType } = rule.context
  if (formType) { callback(); }
  if (value == null || value.length < 6) {
    callback(new Error("验证码格式不正确"));
  } else {
    callback();
  }
};
const pwdCheckValidate = (rule, value, callback) => {
  const { formType, registerForm } = rule.context
  if (formType) { callback();}
  let str = value;
  if (str == null || str.length < 6) {
    callback(new Error("密码至少6位,同时包含字母和数字"));
  } else if (registerForm.newPassword != registerForm.passWordAgain) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
};
const mixins = {
  data() {
    return {
      rules: {
        userName: [
          {
            required: true,
            validator: userNameFirstCheck,
            context: this,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: passwordFirstCheck,
            context: this,
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            validator: codeFirstCheck,
            context: this,
            trigger: "blur",
          },
        ],
        userNameAgain: [
          {
            required: true,
            validator: userNameCheck,
            context: this,
            trigger: "blur",
          },
        ],
        codeAgain: [
          {
            required: true,
            validator: codeCheck,
            context: this,
            trigger: "blur"
          },
        ],
        newPassword: [
          {
            required: true,
            validator: pwdCheck,
            context: this,
            trigger: "blur",
          },
        ],
        passWordAgain: [
          {
            required: true,
            validator: pwdCheckValidate,
            context: this,
            trigger: "blur",
          },
        ],
      },
    }
  }
}

export default mixins;