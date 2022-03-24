<style lang="less" scoped>
    @import "../public.less";
</style>
<template>
    <div id="app" class="padingL10">
        <h2 class='titleLocation'>学生视力数据管理</h2>
        <Card>
            <div class="top-search">
                <div class="left-input">
                    <div class="searchItem">
                        <span>年<span class="vis">空</span>级：</span>
                        <Select v-model="searchInfo.grade" class="w120">
                            <Option
                            v-for="item in gradeList"
                            :value="item.grade"
                            :key="item.grade"
                            >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="searchItem">
                    <span>班<span class="vis">空</span>级：</span>
                    <Select v-model="searchInfo.studentClass" class="w120">
                        <Option
                        v-for="item in classList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                        >
                    </Select>
                    </div>
                    <div class="searchItem">
                    <span>性<span class="vis">空</span>别：</span>
                    <Select v-model="searchInfo.gender" class="w120">
                        <Option
                        v-for="item in genderList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                        >
                    </Select>
                    </div>
                    <div class="searchItem">
                    <span>状<span class="vis">空</span>态：</span>
                    <Select v-model="searchInfo.status" class="w120">
                        <Option
                        v-for="item in statusList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                        >
                    </Select>
                    </div>
                    <div class="searchItem">
                    <span>姓<span class="vis">空</span>名：</span>
                    <Input
                        v-model="searchInfo.studentName"
                        placeholder="学生姓名"
                        class="w120"
                    />
                    </div>
                    <div class="searchItem">
                        <span>学籍号：</span>
                        <Input
                            v-model="searchInfo.registerCode"
                            placeholder="学生学籍号"
                            class="w120"
                        />
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" @click="queryVisionData">查询</Button>
                    <Button
                    type="success"
                    :disabled="editStatus"
                    @click="visionDataInsert"
                    >视力数据录入</Button>
                    <Button
                    type="success"
                    :disabled="editStatus"
                    @click="visionDataImport"
                    >视力数据导入</Button
                    >
                    <Button
                    type="success"
                    @click="visionDataExport"
                    >视力数据导出</Button>
                </div>
            </div>
        </Card>
        <Card style="margin-top: 20px">
            <div class="tableTitle">数据明细</div>
            <Table
                border
                width="100%"
                max-height="570"
                :columns="visionColumns"
                :data="visionData"
            ></Table>
            <br />
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
    </div>
</template>

<script type="text/javascript">
import gradeObj from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import allGender from '@/libs/gender.js'
import mixins from './dataStatisticsTable'
import Util from '@/libs/util.js'
import api from '@/api/visionTest/studentVisionManage/visionManage'

export default {
    name: "app",
    mixins: [ mixins ],
    data() {
        return {
            schoolId: sessionStorage.getItem('schoolId'),
            yearSemester: sessionStorage.getItem('yearSemester'),
            gradeList: [],
            classList: [],
            genderList:[],
            searchInfo:{
                grade: '9999',
                studentClass:'9999',
                gender:'9999',
                status:'9999',
                studentName:'',
                registerCode:'',
                orderField: "student_name",
                orderSort: "",
            },
            pageInfo:{
               total:0,
               pageNum:1,
               pageSize:10,
            },
            visionData:[],
            editStatus:false
        }
    },
    methods: {
        //去详情页编辑
        goStudentVisionDetail(studentId){
            this.$router.push({name:'studentVisionDetail',query:{studentId:studentId}})
        },
        //合并查询且vuex保存筛选条件
        queryVisionData(){
            const params = {
                grade:this.$catgoryParams(this.searchInfo.grade),
                pageNo:this.$catgoryParams(this.pageInfo.pageNum),
                pageSize:this.$catgoryParams(this.pageInfo.pageSize),
                studentClass:this.$catgoryParams(this.searchInfo.studentClass),
                schoolId:this.schoolId,
                gender:this.$catgoryParams(this.searchInfo.gender),
                completeStatus:this.$catgoryParams(this.searchInfo.status),
                registerCode:this.$catgoryParams(this.searchInfo.registerCode),
                studentName:this.$catgoryParams(this.searchInfo.studentName),
                yearSemester:this.yearSemester,
                orderField:this.searchInfo.orderField,
                orderSort:this.searchInfo.orderSort,
            }
            this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
            this.queryVisionList(params) 
            this.queryVisionDataCount(params) 
        },
        //查询视力数据
        queryVisionList(params){
            api.getStudentVisionList(params).then(res => {
                if(res.data.code === 10000){
                    this.visionData = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //查询视力数据数量
        queryVisionDataCount(params){
            api.getStudentVisionCount(params).then(res => {
                if(res.data.code === 10000){
                    this.pageInfo.total = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //视力成绩录入
        visionDataInsert(){
            this.$router.push({name:'visionDataInsert'})
        },
        //视力数据导入
        visionDataImport(){
            this.$router.push({ name: "commonImportVision" });
        },
        //视力数据导出
        visionDataExport(){
            const token = sessionStorage.getItem('token');
            const {grade, studentClass, gender, status, studentName, registerCode} = this.searchInfo
            const url = `${this.$axios.defaults.baseURL}/v1/visionEdit/exportStudentVisionExport?grade=${this.$catgoryParams(grade)}&studentClass=${this.$catgoryParams(studentClass)}&schoolId=${this.schoolId}&gender=${this.$catgoryParams(gender)}&completeStatus=${this.$catgoryParams(status)}&studentName=${this.$catgoryParams(studentName)}&registerCode=${this.$catgoryParams(registerCode)}&yearSemester=${this.yearSemester}&token=${token}`
            window.open(url);
        },
        //改变页码
        pageNumChange(value){
            if (this.pageInfo.pageNum != value) {
                this.pageInfo.pageNum = value;
                this.queryVisionData()
            }
        },
        //改变单页展示数量
        pageSizechange(value){
            if (this.pageInfo.pageSize != value) {
                this.pageInfo.pageSize = value
                this.pageInfo.pageNum = 1;
                this.queryVisionData()
            }
        },
        //是否上报教育局
        async querySchoolReportedStatus(){
            let res = await api.querySchoolReportedStatus({dataType:3});
            if(res.data.code === 10000) {
                if(res.data.response.editStatus !== '1'){// 不可编辑
                    this.editStatus = true;
                }
            }
        },
        
    },
    created() {
        //回显缓存筛选条件
        let params = Util.hasParams(this.$store, this.$route);
        if (params) {
            this.searchInfo.grade =  params.grade ? Number(params.grade) : '9999'
            this.searchInfo.studentClass = params.studentClass ? Number(params.studentClass) : '9999'
            this.searchInfo.gender = params.gender ? Number(params.gender) : '9999'
            this.searchInfo.status = params.completeStatus ? Number(params.completeStatus) : '9999'
            this.searchInfo.registerCode = params.registerCode
            this.searchInfo.studentName = params.studentName
            this.pageInfo.pageNum = Number(params.pageNo)
            this.pageInfo.pageSize = Number(params.pageSize)
        }
        this.gradeList = gradeObj.inOf(sessionStorage.getItem('schoolType'))
        this.classList = allClass
        this.genderList = allGender
    },
    mounted() {
       this.queryVisionData() 
       this.querySchoolReportedStatus()
    }
}
</script>


