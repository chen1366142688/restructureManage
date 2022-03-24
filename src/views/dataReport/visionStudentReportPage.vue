<template>
    <div id="app" style='padding-left:10px'>
      <ImportTemplate :importData="importData" v-if="isShowImportComponent"></ImportTemplate>
    </div>
</template>

<script type="text/javascript">
import ImportTemplate from '@/components/ImportTemplate/index.vue'
export default {
    name: "app",
    components: {
        ImportTemplate
    },
    data() {
        return {
            isShowImportComponent: false,
            token: sessionStorage.getItem('token'),
            importData:{
                title:'上报学生',
                schoolId:'',
                activityId:'',
                schoolType: '',
                teacherId:'',
                yearSemester: '',
                taskType: '3',
                schoolYear:'',
                exportTemplateUrl:'/v1/schoolteststudent/exportPrimarySchoolTestModel',//获取导入模板
                exportErrorDataUrl:'/v1/vision/report/exportVisionErrorData',//导出错误数据
                importTaskListUrl:'/v1/vision/report/getVisionStudentTaskList', //获取导入任务列表
                importTaskListCountUrl:'/v1/vision/report/countVisionStudentTaskList', //获取导入任务列表数量
                importDataUrl:'', //学生数据导入
                completeImportUrl: ''
            }
        }
    },
    created() {
        this.importData.schoolId = this.$route.query.schoolId
        this.importData.yearSemester = this.$route.query.yearSemester
        this.importData.schoolType = sessionStorage.getItem('schoolType');
        this.importData.teacherId = sessionStorage.getItem('teacherId') || '';
        this.importData.schoolYear = sessionStorage.getItem('schoolYear') || '';
        this.importData.completeImportUrl = `${this.$axios.defaults.baseURL}/v1/vision/report/importVisionStudentInfoNow?yearSemester=${this.importData.yearSemester}&token=${this.token}&schoolId=${this.importData.schoolId}`
        console.log('father:',this.importData)
    },
    mounted() {
        this.isShowImportComponent = true;
    }
}
</script>
