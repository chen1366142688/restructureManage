<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体质健康监测</h2>
    </div>
    <div>
      <Card>
        <div @keydown.enter="querySearch"
             class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>年<span style="visibility: hidden;">占</span>级：</span>
              <Select v-model="grade"
                      class="width120">
                <Option v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>班<span style="visibility: hidden;">占</span>级：</span>
              <Select v-model="studentClass"
                      class="width120">
                <Option v-for="item in classList"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>状<span style="visibility: hidden;">占</span>态：</span>
              <Select v-model="status"
                      class="width120">
                <Option v-for="item in statusList"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>姓<span style="visibility: hidden;">占</span>名：</span>
              <Input v-model="studentName"
                     placeholder="学生姓名"
                     class="width120"></Input>
            </div>
            <div style="margin: 5px 20px">
              <span>学籍号：</span>
              <Input v-model="registerCode"
                     placeholder="学生学籍号"
                     class="width120"></Input>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"
                    @click="querySearch">查询</Button>
            <Button type="success"
                    @click="synchronizationbodyMonitor()">同步学生体测成绩</Button>
            <!-- <Upload ref="upload"
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
                    style="display: inline-block;">
              <Button type="success">导入</Button>
            </Upload> -->
            <Button type="success" @click="exportData">导入</Button>
            <Button type="success"
                    @click="exportbodyMonitor()">导出Excel</Button>
          </div>
        </div>
      </Card>
      <br>
      <Card>
        <Row>
          <div>
            <Table border
                   :loading="loading"
                   :columns="resultColumns"
                   :data="resultData"></Table>
          </div>
          <br>
          <div style="float: right;">
            <Page :total="total"
                  :current="pageNum"
                  :page-size="pageSize"
                  @on-change="pageNumChange"
                  @on-page-size-change="pageSizechange"
                  show-total
                  show-sizer></Page>
          </div>
        </Row>
      </Card>
      <!-- 同步 -->
      <Modal v-model="submitStatus"
             width="360"
             :closable="false">
        <p slot="header"
           style="color:#f60;text-align:center">
          <span>同步中......</span>
        </p>
        <div style="text-align:center">
          <Progress :percent="submitPercent"
                    :stroke-color="['#108ee9', '#87d068']" />
        </div>
        <div slot="footer">
        </div>
      </Modal>
      <!-- 导入 -->
      <Modal v-model="exportStatus"
             :mask-closable="false"
             width="360">
        <p slot="header"
           style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>提醒</span>
        </p>
        <div style="text-align:center">
          <span style>导入中，请稍等</span>
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>

<script>
import gradeData from '@/libs/grade'
import classList from '@/libs/classList'
import api from '@/api/baseApi'
export default {
  name: "curriculumAdministration",
  data () {
    return {
      exportStatus:false,
      submitStatus: false,
      submitPercent: 0,
      loading: false,
      grade: '9999',
      studentClass: '',
      classList: classList,
      schoolGradeList: [],
      status: '9999',
      statusList: [
        {
          value: '9999',
          label: '全部',
        },
        {
          value: '1',
          label: '已完成',
        },
        {
          value: '0',
          label: '未完成',
        },
        {
          value: '2',
          label: '无上学年成绩',
        },
        {
          value: '3',
          label: '免考',
        }
      ],
      studentName: '',
      registerCode: '',
      resultColumns: [
        {
          title: "姓名",
          key: "name",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = row.gender === '1' ? '男' : '女';
            return h("span", text);
          }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 100,
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth: 100,
        },
        {
          title: "上学年体重指数",
          key: "lastSchoolYearBmiValue",
          align: "center",
          minWidth: 100,
        },
        {
          title: "上学年肺活量体重指数",
          key: "lastSchoolYearVitalCapacityExponent",
          align: "center",
          minWidth: 100,
        },
        {
          title: "本学年体重指数",
          key: "bmiValue",
          align: "center",
          minWidth: 150,
        },
        {
          title: "本学年肺活量体重指数",
          key: "vitalCapacityExponent",
          align: "center",
          minWidth: 150,
        },
        {
          title: "体重指数得分",
          key: "bmiScore",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            const row = params.row;
            var text = row.grade === 7 ? '-' : (row.bmiScore || row.bmiScore === 0) ? row.bmiScore : '';
            return h("span", text);
          }
        },
        {
          title: "肺活量体重指数得分",
          key: "vitalCapacityScore",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            const row = params.row;
            var text = row.grade === 7 ? '-' : (row.vitalCapacityScore || row.vitalCapacityScore === 0) ? row.vitalCapacityScore : '';
            return h("span", text);
          }
        },
        {
          title: "体质健康监测得分",
          key: "monitorScore",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            const row = params.row;
            var text = row.grade === 7 ? '-' : (row.monitorScore || row.monitorScore === 0) ? row.monitorScore : '';
            return h("span", text);
          }
        },
        {
          title: "状态",
          key: "monitorStatus",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            const {monitorStatus, isExempt} = params.row;
            let text = ''
            if (isExempt === 1) {
              text = '免考'
            } else {
              text = monitorStatus === '1' ? '已完成' : monitorStatus === '0' ? '未完成' : monitorStatus === '2' ? '无上学年成绩' : '';
            }
            return h("span", text);
          }
        }
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    /** 导入 **/
    exportData() {
      const obj = {
        title:'体质健康监测',
        import:{
          importUrl:'/v1/bodymonitorstudent/file/upload/bodyMonitorExport',//导入url地址
          params:{ //请求参数设置
            schoolId:sessionStorage.getItem('schoolId'),
            schoolYear:sessionStorage.getItem('schoolYear'),
            yearSemester:sessionStorage.getItem('yearSemester'),
            teacherId:sessionStorage.getItem('teacherId'),
            token:sessionStorage.getItem('token'),
            },
        },
        exportTemplate:{
          exportTemplateUrl:'/v1/bodymonitorstudent/getVisionImportTemplate',//导出模板url地址
          params:{ //请求参数设置
            token:sessionStorage.getItem('token'),
          },
        },
        exportError:{
          exportErrorUrl:'/v1/bodymonitorstudent/exportErrorbodyMonitor',//导出错误数据url地址
          params:{//请求参数设置
            token:sessionStorage.getItem('token'),
          },
        },
        queryTaskNum:{
          queryTaskNumUrl:'/v1/bodymonitorstudent/countTaskListNum',//查询导出列表数据条数的地址
          params:{ //请求参数设置

          },
        },
        getImportList:{
          getImportListUrl:'/v1/bodymonitorstudent/getTaskList',//获取导入列表
          params:{//请求参数设置

          },
        }
      };
      this.$router.push({
        name:'exportDataKM',
        params:{
          obj:obj,
        }
      })
    },
    /**回车查询**/
    querySearch () {
      this.pageNum = 1;
      this.pageNo = 1;
      this.getPrimarySportsClass();
    },
    /**修改页码**/
    pageNumChange (value) {
      if (this.pageNum != value) {
        this.pageNum = value;
        this.getPrimarySportsClass();
      }
    },
    /**修改每页数量**/
    pageSizechange (value) {
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.querySearch();
      }
    },
    /**获取列表数据**/
    async getPrimarySportsClass () {
      let that = this;
      that.loading = true;
      let data = {
        "classId": that.studentClass == '9999' ? '' : that.studentClass,
        "grade": that.grade == '9999' ? '' : that.grade,
        "monitorStatus": that.status === '9999' ? '' : that.status,
        "pageNo": that.pageNum,
        "pageSize": that.pageSize,
        "registerCode": that.registerCode,
        "schoolId": that.schoolId,
        "schoolYear": sessionStorage.getItem('schoolYear'),
        "studentName": that.studentName
      };
      try {
        let res = await api.getBodyMonitorList(data)
        that.loading = false;
        that.errorInfo(res)
        that.resultData = res.data.response;
      } catch (error) {
        that.loading = false;
        console.log(error)
      }
      try {
        let res1 = await api.countBodyMonitorList(data)
        that.errorInfo(res1)
        that.total = res1.data.response;
      } catch (error) {
        console.log(error)
      }
    },
    /**同步学生体测成绩**/
    async synchronizationbodyMonitor () {
      let that = this;
      that.submitStatus = true
      let res = await api.synchronizationbodyMonitor()
      that.errorInfo(res)
      that.selectComplateNumAndTotalNum(res.data.response)
    },
    /**查询同步体测成绩进度**/
    async selectComplateNumAndTotalNum (response) {
      let that = this;
      let res1 = await api.selectComplateNumAndTotalNum(response)
      that.errorInfo(res1)
      if (that.submitPercent < 100) {
        that.submitPercent = parseInt(res1.data.response.complateNum / res1.data.response.totalNum * 100)
        that.selectComplateNumAndTotalNum(response)
      } else {
        that.submitStatus = false
        that.submitPercent = 0
        that.getPrimarySportsClass()
      }
    },
    /**导入**/
    async bodyMonitorExport (file) {
      let params = {
        schoolId: sessionStorage.getItem('schoolId'),
        muFiles: file
      }
      let res = await api.bodyMonitorExport(params)
      that.errorInfo(res)
    },
    /**导入成功**/
    handleSuccess (res, file) {
      let that = this;
      that.exportStatus = false;
      that.bodyMonitorExport(file)
      if (res.code == 10000) {
        if (res.response == 1) {
          that.$Message.info("导入成功");
          that.modal2 = false;
          that.search();
        } else {
          that.$Message.info("文件为空，导入失败");
        }
      } else {
        that.$Message.info("导入失败，请稍后再试");
      }
    },
    /**导入错误**/
    handleFormatError (file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "格式错误",
        desc: "该文件格式错误，请检查后重试"
      });
    },
    /**导入异常**/
    handleMaxSize (file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "文件超大",
        desc: "该文件超大了"
      });
    },
    /**导入中**/
    handleBeforeUpload (file) {
      let that = this;
      that.exportStatus = true;
      return true;
    },
    /**导出**/
    exportbodyMonitor () {
      let url = `${this.$axios.defaults.baseURL}/v1/bodymonitorstudent/exportbodyMonitor?token=${sessionStorage.getItem("token")}`
      window.open(url);
    },
    /**错误统一提示**/
    errorInfo (res) {
      if (res.data && res.data.code != 10000) {
        this.$Message.info(res.data.msg)
        return;
      }
    }
  },
  watch: {},
  mounted () {
    let schoolType = sessionStorage.getItem('schoolType')
    this.schoolId = sessionStorage.getItem('schoolId')
    this.schoolGradeList = gradeData.inOf(schoolType)
    this.getPrimarySportsClass();
  }
};
</script>
<style scoped>
</style>
