<template>
  <Menu
    ref="sideMenu"
    :active-name="active.name"
    :open-names="openNames"
    :theme="menuTheme"
    width="auto"
    @on-select="changeMenu"
  >
    <Submenu v-for="(child, childIndex) in menuList" :key="childIndex" :name="child.name">
        <template slot="title">
            <Icon :type="child.icon" size="20"/>
            {{child.title}}
        </template>
        <MenuItem v-for="(childrenNode,childrenNodeIndex) in child.children" :key="childrenNodeIndex" :name="childrenNode.name">{{childrenNode.title}}</MenuItem>
    </Submenu>
  </Menu>
</template>
<style lang="less">
@import "../styles/menu.less";
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "sidebarMenu",
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: "dark",
    },
    openNames: {
      type: Array,
    }
  },
  computed: {
    ...mapGetters(['active']),
  },
  data() {
    return {};
  },
  
  methods: {
    changeMenu(active) {
      this.$emit("on-change", active);
    },
  },
  created() {},
  mounted(){},
  updated() {
      
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
        this.$refs.sideMenu.updateActiveName()
      }
    });
  },
};
</script>
