<template>
  <Modal
    :closable="modal.closable"
    v-model="myDisable"
    @on-cancel="cancel"
    :loading="modal.loading"
  >
  <p slot="header" style="text-align:center">{{modal.title}}</p>
  <slot></slot>
  <div slot="footer" class="footer-style">
    <Button type="success" @click="add" style="margin-right:20px">
      {{modal.affirmName}}
    </Button>
    <Button v-if="modal.cancelDsiable" type="success" @click="cancel">
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
          affirmName:'新增',
          onclickName:'cancel',
          closable:true,
          cancelDsiable:true,
          loading:false,
        })
      }
  },
  computed: {
    myDisable() {
      return this.modal.visable
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    add () {
      this.$emit('save',{name:this.modal.onclickName,data:{}});
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