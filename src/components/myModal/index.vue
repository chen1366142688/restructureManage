<template>
  <Modal
    v-model="myDisable"
    @on-cancel="cancel"
  >
  <p slot="header" style="text-align:center">{{modal.title}}</p>
  <div v-if="modal.existingData">
    系统检测到该学生已经存在，且按时间推算，当前学期为八年级，是否继续添加该学生？
  </div>
  <Form
    v-else
    ref="formValidate"
    :model="formList"
    :rules="ruleValidate"
  >
    <Form-item
      label="学籍号"
      prop="id"
    >
       <Input v-model="formList.id" placeholder="请输入学生学籍号" style="width:70%;"></Input>
    </Form-item>
  </Form>
  <div slot="footer" class="footer-style">
    <Button type="success" @click="add">
      {{modal.affirmName}}
    </Button>
    <Button type="success" @click="cancel">
      取消
    </Button>
  </div>    
  </Modal>
</template>
<script>
export default {
  name:'myModal',
  props:{
    modal: {
        type: Object,
        default: () => ({
          visable: false,
          title: '',
          existingData: false,//该学生数据是否存在
          affirmName:'新增'
        })
      }
  },
  computed: {
    myDisable() {
      console.log('daadad')
      return this.modal.visable
    }
  },
  // watch:{
  //   modal: {
  //     handler(newVal,oldVal) {
  //       console.log(newVal,oldVal)
  //     },  
  //     deep:true,
  //   }
  // },
  data() {
    return {
      formList:{
        studentName:'',
        id:''
      },
      ruleValidate:{
        studentName:[
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        id:[
          { required: true, message: '学籍号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    add () {
      this.$refs.formValidate.validate((valid) => {
          if (valid) {
              this.$Message.success('提交成功!');
          } else {
              this.$Message.error('学籍号不能为空!');
          }
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped>
  .footer-style{
    display:flex;
    align-items: content;
    justify-content: center;
  }
</style>