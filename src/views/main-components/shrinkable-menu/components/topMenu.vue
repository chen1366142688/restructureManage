<style lang="less" scoped>
    .topMenuItem{
        min-width: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 15px !important;
    }
</style>
<template>
  <div>
    <Menu
      ref="topMenu"
      mode="horizontal"
      theme="light"
      :active-name="active.parentCode+'/'+active.parentName"
      @on-select="changeMenu"
    >
      <MenuItem
        v-for="(item, index) in menuList"
        :name="item.parentCode + '/' + item.name"
        :key="index + item"
        :id="item.name"
        class="topMenuItem"
      >
        <Icon
          :type="item.parentIcon"
          size="26"
          style="margin-bottom:9px"
        />
        <span>{{ item.parentName }}</span>
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "topMenu",
  props: {
    menuList: Array,
  },
  computed: {
    ...mapGetters(['active','permissionStageConfig']),
  },
  methods: {
    ...mapActions(['setHistoryActive']),
    changeMenu(activeParent) {
      const activeParentArray = activeParent.split('/')
      const fliterRouter = (permissionStageConfig) => {
        let activeName = '';
        permissionStageConfig.forEach(router => {
          if(router.name === activeParentArray[1]){
            if(router.children && router.children.length > 0){
              activeName = router.children[0].name
            }
          }
        });
        return activeName;
      }
      
      const activeName = fliterRouter(this.permissionStageConfig)
      const activeMenuItem = {
        name: activeName,
        parentCode: activeParentArray[0],
        parentName: activeParentArray[1]
      }
      this.setHistoryActive(activeMenuItem)
      this.$emit('handleClick', activeParentArray[1])
      this.$emit('handleChange', activeName)//取出大菜单的第一个子元素
    }
  },
  mounted() {
    
  },
};
</script>



