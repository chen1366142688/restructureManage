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
            importData:{
                title:'体测信息',
                schoolId:'',
                activityId:'',
                schoolType: '',
                teacherId:'',
                yearSemester: '',
                taskType: '2',
                schoolYear:'',
                exportTemplateUrl:'/v1/test/edit/exportTestModel',//获取导入模板
                exportErrorDataUrl:'/v1/test/edit/exportTestErrorData',//导出错误数据
                importTaskListUrl:'/v1/test/edit/getTestTaskList', //获取导入任务列表
                importTaskListCountUrl:'/v1/test/edit/countTestTaskListNum', //获取导入任务列表数量
                importDataUrl:'/v1/test/edit/file/upload/inportStudentTestFile', //学生数据导入
                completeImportUrl:'',//学生数据导入-自定义的导入地址
            }
        }
    },
    methods: {
        getStorage(storageName){
            return sessionStorage.getItem(storageName) || '';
        }
    },
    created() {
        let {schoolId, activityId, schoolType, teacherId, yearSemester, schoolYear} = this.$route.query;
        const token = this.getStorage('token');
        this.importData.schoolId = schoolId || this.getStorage('schoolId');
        this.importData.activityId = activityId || this.getStorage('activityId');
        this.importData.schoolType = schoolType || this.getStorage('schoolType');
        this.importData.teacherId = teacherId || this.getStorage('teacherId');
        this.importData.yearSemester = yearSemester || this.getStorage('yearSemester');
        this.importData.schoolYear = schoolYear || this.getStorage('schoolYear');
        this.importData.completeImportUrl = `${this.$axios.defaults.baseURL}/v1/test/edit/file/upload/inportStudentTestFile?yearSemester=${this.importData.yearSemester}&token=${token}`
    },
    mounted() {
        this.isShowImportComponent = true;
    }
}
</script>
