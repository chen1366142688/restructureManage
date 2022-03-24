<style lang="less" scoped>
    @import "../public.less";
</style>
<template>
    <div id="app"  class="padingL10">
        <h2 class='titleLocation'>数据统计</h2>
        <Card>
            <div class="top-search">
                <div class="left-input">
                    <div style="margin: 5px 20px">
                        <span>年级：</span>
                        <Select v-model="searchInfo.grade" class="w120">
                            <Option
                            v-for="item in gradeList"
                            :value="item.grade"
                            :key="item.grade"
                            >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div style="margin: 5px 20px">
                        <span>性别：</span>
                        <Select v-model="searchInfo.gender" class="w120">
                            <Option
                            v-for="item in genderList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" @click="querySearch">查询</Button>
                </div>
            </div>
        </Card>

        <Card style="margin-top:16px;">
            <div class="tableTitle">数据总览</div>
            <Table
            border
            :columns="eyesResultColumns"
            style="width: 100%"
            :data="eyesResultData"
            ></Table>
        </Card>

        <Card style="margin-top:16px;">
            <div class="tableTitle">数据明细</div>
            <Table
            border
            :columns="eyesOverViewColumns"
            style="width: 100%"
            :data="eyesOverViewData"
            ></Table>
        </Card>

        <Card style="margin-top:16px;">
            <div class="tableTitle">数据分析</div>
            <div :style="{ backgroundColor: '#FFFFFF' }">
                <Row :style="{ textAlign: 'center' }">
                    <div
                    id="myChartEyes"
                    :style="{
                        width: '40%',
                        height: '400px',
                        marginTop: '50px',
                        display: 'inline-block',
                    }"
                    ></div>
                </Row>
            </div>
        </Card>
    </div>
</template>

<script type="text/javascript">
import gradeObj from '@/libs/grade.js'
import allGender from '@/libs/gender.js'
import mixins from './historicalDataQuery'
import api from '@/api/visionTest/studentVisionManage/visionManage'
export default {
    name: "app",
    mixins: [ mixins ],
    data() {
        return {
            gradeList: [],
            genderList:[],
            searchInfo:{
                grade: 7,
                gender:'9999',
            },
            eyesResultData:[],
            eyesOverViewData:[],
            myChartEyes: null,
            optionEyes: {},
        }
    },
    methods: {
        querySearch(){
            this.queryGradeActivityEyesProjectList()
            this.queryClassActivityEyesProjectList()
        },
        //数据总览
        queryGradeActivityEyesProjectList(){
            let params = {
                grade:this.$catgoryParams(this.searchInfo.grade),
                gender:this.$catgoryParams(this.searchInfo.gender)
            }
            api.queryGradeActivityEyesProjectList(params).then(res => {
                if(res.data.code === 10000) {
                    this.eyesResultData = res.data.response
                    this.drawGenSLineEyes()
                }else {
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //数据明细
        queryClassActivityEyesProjectList(){
            let params = {
                grade:this.$catgoryParams(this.searchInfo.grade),
                gender:this.$catgoryParams(this.searchInfo.gender)
            }
            api.queryClassActivityEyesProjectList(params).then(res => {
                if(res.data.code === 10000) {
                    this.eyesOverViewData = res.data.response
                }else {
                    this.$Message.info(res.data.msg)
                }
            })
        },
    },
    created() {
        this.gradeList = gradeObj.inOf(sessionStorage.getItem('schoolType'),1);
        this.searchInfo.grade = this.gradeList[0].grade;
        this.genderList = allGender;
    },
    mounted() {
        this.myChartEyes = null;
        this.optionEyes = null;
        this.querySearch()
    }
}
</script>
