<template>
  <div style="padding-left:10px">
    <div>
        <h2 style="margin-top:15px;margin-bottom:13px;">{{title}}</h2>
    </div>
    <Tabs type="card" @on-click="tabsClick" v-model="tabar">
        <TabPane name="0" label="按学生查看"></TabPane>
        <TabPane name="1" label="按项目查看"></TabPane>
    </Tabs>
    <slot></slot>
    <div style='padding-top:10px'>
      <Card>
        <div>
            <div style="margin-bottom: 16px; font-size: 18px">数据明细</div>
        </div>
        <div v-if="!tableLoading">
          <Row>
            <div style>
              <Table
                border
                max-height="650"
                :columns="ColumnsList"
                :data="resultList"
              ></Table>
            </div>
            <br />
            <div style="float: right;">
                <Page
                :total="formList.total"
                :current="formList.pageNo"
                :page-size="formList.pageSize"
                @on-change="pageNumChange"
                @on-page-size-change="pageSizechange"
                show-total
                show-sizer
                ></Page>
            </div>
          </Row>
        </div>
      </Card>
    </div>
  </div>
  
</template>

<script>
export default {
  props:[
    'dataColumns',
    'dataResult',
    'propsFormList',
    'title',
    'tabarIndex',
    'gradeList',
    'myLoading'
  ],
  data() {
    return {
      // loading:false,
      tabar:sessionStorage.getItem('tabarIndex'), //默认切换数据
    }
  },
  created() {
    this.tabar = sessionStorage.getItem('tabarIndex');
    this.$emit('tabsClick',this.tabar);
  },
  watch:{
    myLoading(newVal,old) {
    },
    resultList(newVal,oldVal) {
    }
  },
  computed: {
    formList() {
      return JSON.parse(JSON.stringify(this.propsFormList));
    },
    resultList() {
      return this.dataResult
    },
    ColumnsList() {
      return this.dataColumns;
    },
    tableLoading() {
      return this.myLoading
    }
  },
  methods: {
    tabsClick(name) { //切换table
    this.$emit('tabsClick',name);
    },
    pageNumChange(val) {
      this.formList.pageNo = val;
      this.$emit('searchData',this.formList);
    },
    pageSizechange(val) {
      this.formList.pageSize = val;
      this.formList.pageNo = 1;
      this.$emit('searchData',this.formList);
    }
  }
}
</script>

<style>

</style>