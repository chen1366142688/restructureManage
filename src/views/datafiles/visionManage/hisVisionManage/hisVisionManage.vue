<style lang="less" scoped>
.padingL10{padding-left: 10px;}
.titleLocation{margin: 15px auto 13px auto;}
.searchItem{margin: 5px 20px;}
.w120{width: 120px;}
.tableTitle{
    font-size: 18px; 
    height: 40px;
}
</style>
<template>
  <div class="padingL10">
    <h2 class="titleLocation">{{yearSemester%2==0?((yearSemester/10).toFixed(0))+"学年第一学期":((yearSemester/10).toFixed(0) -1)+"学年第二学期"}}视力测试管理</h2>
    <Card>
        <div class="top-search">
            <div class="left-input">
            <div class="searchItem">
                <span>年级：</span>
                <Select v-model="searchInfo.grade" class="w120">
                    <Option v-for="item in gradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="searchItem">
                <span>班级：</span>
                <Select v-model="searchInfo.classId" class="w120">
                    <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="queryHisYearVisionClassList">查询</Button>
                <Button type="success" @click="visionDataInser">视力数据导入</Button>
                <Button type="success" @click="exportData">视力数据导出</Button>
                <Button type="success" @click="goBack">返回</Button>
            </div>
        </div>
    </Card>
    <br/>
    <div style="margin-top:20px">
        <Card>
            <div class="tableTitle"> 数据明细</div>
            <Table border :loading="loading" :columns="overViewColumns" :data="overViewData"></Table>
        </Card>
        <Modal
            v-model="exportModal"
            title="选择导出数据"
            @on-ok="exportVisionTestData"
            @on-cancel="exportData"
            :mask-closable="false"
            :loading="false"
            width="550px"
        >
            <CheckboxGroup
                v-model="exPortGrade"
                >
                <Checkbox
                style="width:23%;"
                v-for="item in exPortGradeList"
                :key="item.grade"
                :label="item.grade"
                size = 'large'
                >{{item.label}}
                </Checkbox>
            </CheckboxGroup>
        </Modal>
    </div>
  </div>
</template>

<script>
import gradeObj from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import Util from '@/libs/util.js'
import mixins from './hisVisionManageTable'
import api from '@/api/visionTest/studentVisionManage/visionManage'
export default {
    mixins: [ mixins ],
    data() {
        return {
            loading:false,
            exportModal:false,
            yearSemester:'',
            schoolId: sessionStorage.getItem('schoolId'),
            gradeList: [],
            classList: [],
            searchInfo:{
                grade: '9999',
                classId:'9999',
            },
            exPortGradeList:[],
            exPortGrade:[],
            overViewData:[],
    }
  },
  methods: {
        //返回
        goBack() {
            this.$router.go(-1)
        },
        //视力数据导入
        visionDataInser(){
            this.$router.push({ name: "commonImportVision",query:{yearSemester:this.yearSemester} });
        },
        //视力数据导出弹窗
        exportData(){
            this.exportModal = !this.exportModal;
            this.exPortGrade = this.exportModal ? [] : this.exPortGrade;
        },
        toDetail(gradeItem) {
            this.$router.push({ name: "hisVisionManageDetail", 
                query: {
                    grade: this.$catgoryParams(gradeItem.grade),
                    studentClass: this.$catgoryParams(gradeItem.studentClass),
                    yearSemester: this.yearSemester
                }
            });
        },
        //导出
        exportVisionTestData(){
            if(this.exPortGrade.length > 0){
                const token = sessionStorage.getItem('token');
                const gradeGroupStr = this.exPortGrade.sort().join(',');
                let gender = '',status='',studentName='',registerCode='';
                const {classId } = this.searchInfo
                const url = `${this.$axios.defaults.baseURL}/v1/visionEdit/exportStudentVisionExport?grade=${gradeGroupStr}&studentClass=${this.$catgoryParams(classId)}&schoolId=${this.schoolId}&gender=${gender}&completeStatus=${status}&studentName=${studentName}&registerCode=${registerCode}&yearSemester=${this.yearSemester}&token=${token}`
                window.open(url);
            }else{
                this.$$Message.info('请选择需要导出数据的年级')
            }
        },
        //合并查询且vuex保存筛选条件
        queryHisYearVisionClassList(){
            const params = {
                grade:this.$catgoryParams(this.searchInfo.grade),
                classId:this.$catgoryParams(this.searchInfo.classId),
                yearSemester:this.yearSemester
            }
            this.loading = true
            this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
            api.queryHisYearVisionClassList(params).then(res => {
                if(res.data.code === 10000){
                    console.log(res.data.response)
                    this.loading = false
                    this.overViewData = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        }
    },
    created() {
        //回显缓存筛选条件
        const params = Util.hasParams(this.$store, this.$route);
        if (params) {
            this.searchInfo.grade =  params.grade ? Number(params.grade) : '9999'
            this.searchInfo.classId = params.classId ? Number(params.classId) : '9999'
        }
        const schoolType = sessionStorage.getItem('schoolType');
        this.gradeList = gradeObj.inOf(schoolType)
        this.exPortGradeList = gradeObj.inOf(schoolType,1)
        this.classList = allClass
    },
    mounted() {
        this.yearSemester = this.$route.query.yearSemester
        this.queryHisYearVisionClassList()
    }
}
</script>