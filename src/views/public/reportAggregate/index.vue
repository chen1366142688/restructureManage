<style lang="less" scoped>
.paL10{padding-left:10px}
.reportTitle{margin:15px auto 15px auto;}
.maT20{margin-top:20px}
.tableTitle{font-size: 18px; height: 40px}
.marR20{margin-right:20px}
</style>
<template>
    <div id="app" class='paL10'>
        <h2 class="reportTitle">教育局上报-{{reportObj.title}}数据报送</h2>
        <Card class="maT20">
            <Row type="flex" justify="end" align="middle">
                <Button type="success" @click="commonReport" class="marR20">{{reportObj.title}}数据报送</Button>
                <Button type="success" @click="goBack" v-if="isNeedBack">返回</Button>
            </Row>
        </Card>
        <Card class="maT20">
            <div class="tableTitle">当前数据</div>
            <Table border :columns="reportObj.currentColumns" :data="currentData"></Table>
        </Card>
        <Card class="maT20">
            <div class="tableTitle">历史报送记录</div>
            <Table border :columns="reportObj.historyColumns" :data="historyData" max-height="520"></Table>
        </Card>
        <!-- 选择报送学校 -->
        <Modal v-model="reoprtSchoolModal" :mask-closable="false">
            <p slot="header" style="color: #f60; text-align: center">
                <Icon type="ios-information-circle"></Icon>
                <span>选择报送学校</span>
            </p>
            <div style="text-align: center">
                <CheckboxGroup v-model="selectedSchoolIds">
                    <Checkbox
                        :label="school.schoolId"
                        v-for="(school, index) in reportSchoolList"
                        :key="index"
                        >{{ school.name }}</Checkbox
                    >
                </CheckboxGroup>
            </div>
            <div slot="footer">
                <Button type="success" @click="selectedReport" >报送</Button>
                <Button type="success" contenteditable=""@click="commonCancel" >取消</Button>
            </div>
        </Modal>
        <!-- 没有完成所有学生的成绩 -->
        <Modal v-model="reportNotAllFinishModal" :title="`${reportObj.title}数据报送`">
            <div>请完成所有报送学生的{{reportObj.title}}成绩。</div>
            <div slot="footer">
                <Button type="success" size="large" @click="commonCancel">知道了</Button>
            </div>
        </Modal>
        <!-- 报送确认 -->
        <Modal v-model="reportSureModal" :title="`${reportObj.title}数据报送`">
            <div>{{reportObj.title}}数据报送给教育局端后，系统数据将被锁定，无法更改，若需更改，需教育局端开启编辑权限，是否确定报送。</div>
            <div slot="footer">
                <Button type="success" @click="suerReport" :loading="reportLoading">提交</Button>
                <Button type="success" @click="commonCancel">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script type="text/javascript">
import physicalTest from './physicalTestTable';
import subject from './subjectTable';
import visionTest from './visionTestTable';
import report from './report';

export default {
    name: "app",
    mixins: [ physicalTest, subject, visionTest, report ],
    props: {
        reportData: {
            type: Object,
            default: {},
        },
        isNeedBack: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            reportObj: {
                title: '',
                currentColumns: [],
                historyColumns: []
            },
            currentData:[],
            historyData:[],
            
        }
    },
    methods: {
        //获取体测相关数据
        getPhyReportList(){
            this.getAllSchoolTestInfoForReport()
            this.getEducationTestReportHisList()
        },
        //获取视力相关数据
        getVisionReportList(){
            this.getEducationNowAndHisVisionInfo()
            this.getEducationVisionHisList()
        },
        //获取学科评价相关数据
        getSubReportList(){
            this.getEducationSubjectReportInfo()
            this.getEducationReportSubjectHisList()
        },
        //去详情页面
        toDetailInfo(info) {
            const {reportType} = this.reportData;
            if (reportType === '1') {
                const data = {
                    reportType,
                    yearSemester: String(info.yearSemester),
                    schoolId: String(info.schoolId)
                }
                this.$router.push({name: 'physicalTestStudentDetail', query: data})
            } else if (reportType === '2') { // 跳转-学生视力测试详情
                const data = {
                    schoolYear: info.schoolYear,
                    yearSemester: info.yearSemester,
                    reportType,
                    schoolId: String(info.schoolId)
                }
                this.$router.push({name: 'visionTestStudentDetail', query: data})
            } else {
                const data = {
                    reportType,
                    yearSemester: String(info.yearSemester),
                    schoolId: String(info.schoolId)
                }
                this.$router.push({name: 'subjectEvaluationStudentDetail', query: data})
            }
            console.log('当前数据',info)
        },
        //构建对象
        catReportObj(reportType){
            if(reportType < 1){
                throw new Error('请传入报送类型');
            }
            let reportObj = {
                title: '',
                currentColumns: [],
                historyColumns: []
            }
            if(reportType === '1'){
                reportObj.title = '体质测试';
                reportObj.currentColumns = this.phyCurr;
                reportObj.historyColumns = this.phyHistory;
            } else if (reportType === '2') {
                reportObj.title = '视力测试';
                reportObj.currentColumns = this.visCurr;
                reportObj.historyColumns = this.visHistory;
            } else {
                reportObj.title = '学科评价';
                reportObj.currentColumns = this.subCurr;
                reportObj.historyColumns = this.subHistory;
            }
            return reportObj;
        },
        goBack(){
            this.$router.go(-1);
        },
        commonCreated(){
            const {reportType} = this.reportData;
            this.reportObj = this.catReportObj(reportType)
            if(reportType === '1'){ //体测
                this.getPhyReportList()
            } else if(reportType === '2'){//视力
                this.getVisionReportList()
            } else {//学科评价
                this.getSubReportList()
            }
        },
    },
    created() {
        this.commonCreated()
        this.getTeacherSchoolList()
    },
    mounted() {
        // 根据路由动态设置是否显示上报学生导入、按学生生成的按钮
        const routeName = this.$route.name
        this.$store.dispatch('pageParams/setExportBtn', routeName === 'educationHistoryReport' ? true : false)
    }
}
</script>
