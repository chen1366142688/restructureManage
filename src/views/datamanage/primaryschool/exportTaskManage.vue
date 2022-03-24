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
                title:'学生信息',
                schoolId:'',
                activityId:'',
                schoolType: '',
                teacherId:'',
                yearSemester: '',
                taskType: '1',
                schoolYear:'',
                exportTemplateUrl:'/v1/studentinfo/exportPrimaryModel',//获取导入模板
                exportErrorDataUrl:'/v1/studentinfo/exportPrimaryData',//导出错误数据
                importTaskListUrl:'/v1/studentinfo/getTaskList', //获取导入任务列表
                importTaskListCountUrl:'/v1/studentinfo/countTaskListNum', //获取导入任务列表数量
                importDataUrl:'/v1/student/edit/file/upload/importStudentInfo', //学生数据导入
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
        let {schoolId, activityId, schoolType, teacherId, yearSemester, schoolYear,taskType} = this.$route.query;
        const token = this.getStorage('token');
        this.importData.schoolId = schoolId || this.getStorage('schoolId');
        this.importData.activityId = activityId || this.getStorage('activityId');
        this.importData.schoolType = schoolType || this.getStorage('schoolType');
        this.importData.teacherId = teacherId || this.getStorage('teacherId');
        this.importData.schoolYear = schoolYear || this.getStorage('schoolYear');
        //没传就为空，否则用传过来的值
        this.importData.yearSemester = yearSemester === undefined ? '' : yearSemester;
        this.importData.taskType = taskType === undefined ? '' : taskType;
        this.importData.completeImportUrl = `${this.$axios.defaults.baseURL}/v1/student/edit/file/upload/importStudentInfo?yearSemester=${yearSemester}&token=${token}`
    },
    mounted() {
        this.isShowImportComponent = true;
    }
}
</script>
