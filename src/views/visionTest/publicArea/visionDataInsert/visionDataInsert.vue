<style lang="less" scoped>
    @import "../public.less";
</style>
<template>
    <div id="app" class="padingL10">
        <h2 class='titleLocation'>视力数据录入</h2>
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
                        class="width120"
                    />
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" @click="queryVisionData">查询</Button>
                    <Button type="success" @click="goBack">返回</Button>
                </div>
            </div>
        </Card>
        <Card style="margin-top:20px;">
            <Table border :loading="loading" height="500" :columns="visionColumns" :data="visionData"></Table>
        </Card>
        <Row type="flex" justify="center" style="margin-top:20px">
            <Button @click="saveStudentVision(0)" style="width:100px" type="success">提交</Button>
        </Row>
        <Modal v-model="submitStatus" width="360" :closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <span>提交中......</span>
            </p>
            <div style="text-align:center">
                <Progress :percent="submitPercent" :stroke-color="['#108ee9', '#87d068']" />
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import gradeObj from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import allGender from '@/libs/gender.js'
import mixins from './visionDataInsertTable'
import Util from '@/libs/util.js'
import api from '@/api/visionTest/studentVisionManage/visionManage'

export default {
    name: "app",
    mixins: [ mixins ],
    data() {
        return {
            loading: false,
            submitStatus:false,
            submitPercent:0,
            schoolId: sessionStorage.getItem('schoolId'),
            yearSemester: sessionStorage.getItem('yearSemester'),
            gradeList: [],
            classList: [],
            genderList:[],
            searchInfo:{
                grade: 7,
                studentClass:1,
                gender:'9999',
                status:'9999',
                studentName:'',
            },
            maxData:53,
            minData:30,
            visionData:[]
        }
    },
    methods: {
        //查询视力数据
        queryVisionData(){
            const params = {
                schoolId:this.schoolId,
                yearSemester:this.yearSemester,
                gradeId:this.$catgoryParams(this.searchInfo.grade),
                classId:this.$catgoryParams(this.searchInfo.studentClass),
                studentName:this.$catgoryParams(this.searchInfo.studentName),
                gender:this.$catgoryParams(this.searchInfo.gender),
                finishStatus:this.$catgoryParams(this.searchInfo.status),
            }
            this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
            this.loading = true
            api.getBathAddVisionStudentList(params).then(res => {
                this.loading = false
                if(res.data.code === 10000) {
                    this.visionData = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //返回
        goBack(){
            this.$router.go(-1)
        },
    },
    created() {
        //回显缓存筛选条件
        let params = Util.hasParams(this.$store, this.$route);
        if (params) {
            this.searchInfo.grade =  params.gradeId ? Number(params.gradeId) : '9999'
            this.searchInfo.studentClass = params.classId ? Number(params.classId) : '9999'
            this.searchInfo.gender = params.gender ? Number(params.gender) : '9999'
            this.searchInfo.studentName = params.studentName
            this.searchInfo.status = params.finishStatus ? Number(params.finishStatus) : '9999'
        }
        this.gradeList = gradeObj.inOf(sessionStorage.getItem('schoolType'), 1)
        let classList = JSON.parse(JSON.stringify(allClass));
        classList.shift() //删除全部这个选项
        this.classList = classList
        this.genderList = allGender
        this.searchInfo.grade = this.gradeList[0].grade;
        this.searchInfo.studentClass = this.classList[0].value;
    },
    mounted() {
        this.queryVisionData()
    }
}
</script>


