<style lang="less" scoped>
.padingL10{padding-left: 10px;}
.titleLocation{margin: 15px auto 13px auto;}
.searchItem{margin: 5px 20px;}
.vis{visibility: hidden;}
.w120{width: 120px;}
.tableTitle{
    font-size: 18px; 
    height: 40px;
}
</style>
<template>
    <div id="app" class='padingL10'>
        <h2 class="titleLocation">{{yearSemester%2==0?((yearSemester/10).toFixed(0))+"学年第一学期":((yearSemester/10).toFixed(0) -1)+"学年第二学期"}}视力测试管理</h2>
        <Card style="margin-top:20px;">
            <div class="top-search">
                <div class="left-input">
                    <div class="searchItem">
                        <span>年<span class="vis">空</span>级：</span>
                        <Select v-model="searchInfo.grade" class="w120">
                            <Option
                            v-for="item in gradeList"
                            :value="item.grade"
                            :key="item.grade"
                            >{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div class="searchItem">
                        <span>班<span class="vis">空</span>级：</span>
                        <Select v-model="searchInfo.studentClass" class="w120">
                            <Option
                            v-for="item in classList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div class="searchItem">
                        <span>性<span class="vis">空</span>别：</span>
                        <Select v-model="searchInfo.gender" class="w120">
                            <Option
                            v-for="item in genderList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div class="searchItem">
                        <span>姓<span class="vis">空</span>名：</span>
                        <Input v-model="searchInfo.studentName" placeholder="学生姓名" class="w120"/>
                    </div>
                    <div class="searchItem">
                        <span>学籍号：</span>
                        <Input v-model="searchInfo.registerCode" placeholder="学生学籍号" class="w120"/>
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" @click="getHitStudentData">查询</Button>
                    <Button type="success" @click="goBack">返回</Button>
                </div>
            </div>
        </Card>
        <Card style="margin-top:20px;">
            <div class="tableTitle">数据明细</div>
            <Table border width="100%" :loading="loading" max-height="570" :columns="visionColumns" :data="visionData"></Table>
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
    </div>
</template>

<script type="text/javascript">
import gradeObj from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import allGender from '@/libs/gender.js'
import mixins from './hisVisionManageDetailTable'
import Util from '@/libs/util.js'
import api from '@/api/visionTest/studentVisionManage/visionManage'
export default {
  mixins: [ mixins ],
  data() {
    return {
        loading:false,
        schoolId: sessionStorage.getItem('schoolId'),
        yearSemester: sessionStorage.getItem('yearSemester'),
        gradeList: [],
        classList: [],
        genderList:[],
        searchInfo:{
            grade: '9999',
            studentClass:'9999',
            gender:'9999',
            studentName:'',
            registerCode:'',
        },
        pageInfo:{
            total:0,
            pageNum:1,
            pageSize:10,
        },
        visionData:[]
    }
  },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        //查询年级学生列表和数量
        getHitStudentData(){
            const params = {
                token: sessionStorage.getItem('token'),
                grade:this.$catgoryParams(this.searchInfo.grade),
                pageNo:this.$catgoryParams(this.pageInfo.pageNum),
                pageSize:this.$catgoryParams(this.pageInfo.pageSize),
                studentClass:this.$catgoryParams(this.searchInfo.studentClass),
                schoolId:this.schoolId,
                gender:this.$catgoryParams(this.searchInfo.gender),
                studentName:this.$catgoryParams(this.searchInfo.studentName),
                registerCode:this.$catgoryParams(this.searchInfo.registerCode),
                yearSemester:this.yearSemester
            }
            this.loading = true
            this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
            this.getHisStudentVisionList(params)
            this.getHisStudentVisionListCount(params)
        },
        getHisStudentVisionList(params){
            api.getHisStudentVisionList(params).then(res => {
                if(res.data.code === 10000){
                    this.loading = false
                    this.visionData = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        getHisStudentVisionListCount(params){
            api.getHisStudentVisionListCount(params).then(res => {
                if(res.data.code === 10000){
                    this.loading = false
                    this.pageInfo.total = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //改变页码
        pageNumChange(value){
            if (this.pageInfo.pageNum != value) {
                this.pageInfo.pageNum = value;
                this.getHitStudentData()
            }
        },
        //改变单页展示数量
        pageSizechange(value){
            if (this.pageInfo.pageSize != value) {
                this.pageInfo.pageSize = value
                this.pageInfo.pageNum = 1;
                this.getHitStudentData()
            }
        },
        //去学生视力详情页面
        toStudentVisionDetail(studentId){
            this.$router.push({name:'studentVisionDetail',query:{
                studentId: studentId,
                yearSemester: this.yearSemester
            }})
        },
    },
    created() {
        //回显缓存筛选条件
        let params = Util.hasParams(this.$store, this.$route);
        if (params) {
            this.searchInfo.grade =  params.grade ? Number(params.grade) : '9999'
            this.searchInfo.studentClass = params.studentClass ? Number(params.studentClass) : '9999'
            this.searchInfo.gender = params.gender ? Number(params.gender) : '9999'
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
        let { grade, studentClass, yearSemester } = this.$route.query
        const [ firstGrade ] = this.gradeList
        const [ firstClass ] = this.classList
        this.searchInfo.grade = grade ? Number(grade) : firstGrade.grade
        this.searchInfo.studentClass = studentClass ? Number(studentClass) : firstClass.value
        this.yearSemester = yearSemester
        let visionColumns = [...this.visionColumns]
        if(yearSemester < 20212){//老视力规则数据
            visionColumns.splice(4,0,...this.oldVison)
        }else{//新视力规则数据
            visionColumns.splice(4,0,...this.newVison)
        }
        this.visionColumns = visionColumns
        this.getHitStudentData()
    }
}
</script>
