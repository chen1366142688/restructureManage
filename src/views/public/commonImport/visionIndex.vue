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
                title:'视力信息',
                schoolId:'',
                activityId:'',
                schoolType: '',
                teacherId:'',
                yearSemester: '',
                taskType: '3',
                schoolYear:'',
                exportTemplateUrl:'/v1/visionEdit/getVisionImportTemplate',//获取导入模板
                exportErrorDataUrl:'/v1/visionEdit/exportErrorVisionExport',//导出错误数据
                importTaskListUrl:'/v1/visionEdit/getVisionTaskList', //获取导入任务列表
                importTaskListCountUrl:'/v1/visionEdit/countTaskListNum', //获取导入任务列表数量
                importDataUrl:'/v1/visionEdit/visionImport', //学生数据导入
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
        this.importData.schoolId = schoolId || this.getStorage('schoolId');
        this.importData.activityId = activityId || this.getStorage('activityId');
        this.importData.schoolType = schoolType || this.getStorage('schoolType');
        this.importData.teacherId = teacherId || this.getStorage('teacherId');
        this.importData.yearSemester = yearSemester || this.getStorage('yearSemester');
        this.importData.schoolYear = schoolYear || this.getStorage('schoolYear');
    },
    mounted() {
        this.isShowImportComponent = true;
    }
}
</script>
