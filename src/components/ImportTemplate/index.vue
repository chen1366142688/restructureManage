<style lang="less" scoped>
.demo-spin-icon-load {
    animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.marR10{margin-right:10px;}
.titleLocation{margin: 15px auto 13px auto;}
.searchItem{margin: 5px 20px;}
</style>
<template>
    <div>
        <h2 class="titleLocation">{{importData.title}}导入</h2>
        <Card>
            <div class="top-search">
                <div class="left-input">
                    <div class="searchItem">
                        <span>任务名称：</span>
                        <Input v-model="taskName" placeholder="任务名称" style="width: 160px;"/>
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" class="marR10" @click="querySearch">查询</Button>
                    <Button type="success" class="marR10" @click="exporTemplate()">导出模板</Button>
                    <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['xls','xlsx']"
                    :max-size="20480"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    :multiple="false"
                    name="muFiles"
                    type="select"
                    :action="updateUrl"
                    style="display:inline-block;"
                    >
                    <Button type="success">导入{{importData.title}}</Button>
                    </Upload>
                    <Button type="success" class="marR10" @click="goBack">返回</Button>
                </div>
            </div>
        </Card>
        <br/>
        <Card>
            <Table border :loading="loading" :columns="TableColumns" :data="TableData"></Table>
            <br/>
            <Row type="flex" justify="end">
                <Page
                :total="pageInfo.total"
                :current="pageInfo.pageNum"
                :page-size="pageInfo.pageSize"
                @on-change="pageNumChange"
                @on-page-size-change="pageSizechange"
                show-total
                show-sizer
                ></Page>
            </Row>
        </Card>
        <Modal v-model="importModal" :mask-closable="false" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>温馨提示</span>
            </p>
            <div style="text-align:center">
                <span style>导入中，请稍等</span>
            </div>
            <div slot="footer"></div>
        </Modal>
  </div>
</template>

<script>
import mixins from './index'
export default {
  name: "ImportTemplate",
  mixins: [ mixins ],
  props: {
      importData: Object,
      default: {}
  },
  data() {
    return {
        updateUrl:'',
        taskName: "",
        importModal: false,
        loading: false,
        pageInfo:{
            total:0,
            pageNum:1,
            pageSize:10,
        },
        TableData: [], 
    };
  },
  methods: {
    //返回
    goBack() {
      this.$router.go(-1)
    },
    //查询
    querySearch() {
      this.pageInfo.pageNum = 1;
      this.search();
    },
    search() {
        const {schoolId, taskType} = this.importData;
        const params = {
            "activityId": this.importData.activityId,
            "collegeCode": "",
            "pageNo": this.pageInfo.pageNum,
            "pageSize": this.pageInfo.pageSize,
            "schoolId": schoolId,
            "schoolType": this.importData.schoolType,
            "taskName": this.taskName,
            "taskType": taskType || '',
            "teacherId": this.importData.teacherId,
            "yearSemester": this.importData.yearSemester
        };
      this.getTaskList(params);
      this.countTaskListNum(params);
    },
    //导出模板和错误数据
    exporTemplate(taskId) {
      const token = sessionStorage.getItem('token');
      const url = `${this.$axios.defaults.baseURL}${taskId? this.importData.exportErrorDataUrl:this.importData.exportTemplateUrl}?token=${token}&${taskId? 'taskId=':'yearSemester='}${taskId?taskId:this.importData.yearSemester}&taskType=${this.importData.taskType}`
      window.open(url);
    },
    //页码改变
    pageNumChange(value) {
      if (this.pageInfo.pageNum != value) {
        this.pageInfo.pageNum = value;
        this.search();
      }
    },
    //页码大小改变
    pageSizechange(value) {
      if (this.pageInfo.pageSize != value) {
        this.pageInfo.pageSize = value;
        this.pageInfo.pageNum = 1;
        this.search();
      }
    },
    handleBeforeUpload(file) {
      this.importModal = true;
      return true;
    },
    //导入成功
    handleSuccess(res, file) {
      this.importModal = false;
      if (res.code === 10000) {
        if (res.response === '1') {
          this.$Message.info("导入成功");
          this.search();
        } else {
          this.$Message.info("文件为空，导入失败");
        }
      } else {
        this.$Message.info("导入失败，请稍后再试");
      }
    },
    handleFormatError(file) {
      this.importModal = false;
      this.$Notice.warning({
        title: "格式错误",
        desc: "该文件格式错误，请检查后重试"
      });
    },
    handleMaxSize(file) {
      this.importModal = false;
      this.$Notice.warning({
        title: "文件超大",
        desc: "该文件超大了"
      });
    },
    //获取导入任务列表
    getTaskList(params) {
        this.loading = true;
        this.$axios.post(this.importData.importTaskListUrl, params).then(res => {
            this.loading = false;
            if (res.data.code == 10000) {
                this.TableData = res.data.response;
            } else {
                this.$Message.info(res.data.msg);
            }
        });
    },
    countTaskListNum(params) {
        this.$axios.post(this.importData.importTaskListCountUrl, params).then(res => {
            if (res.data.code == 10000) {
                this.pageInfo.total = res.data.response;
            } else {
                this.$Message.info(res.data.msg);
            }
        });
    },
  },
  mounted() {
    console.log('son:',this.importData)
    const token = sessionStorage.getItem('token');
    const {schoolId, schoolYear, yearSemester, teacherId} = this.importData;
    if (this.importData.completeImportUrl) {
      this.updateUrl = this.importData.completeImportUrl
    } else {
     this.updateUrl = `${this.$axios.defaults.baseURL}${this.importData.importDataUrl}?schoolId=${schoolId}&yearSemester=${yearSemester}&schoolYear=${schoolYear}&teacherId=${teacherId}&token=${token}`
    }
    this.search();
  }
};
</script>
