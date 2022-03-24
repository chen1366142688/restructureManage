<template>
    <div class="view-wrap">
        <h2 class="page-title">
            {{title}}
        </h2>
        <Card>
            <div class="condition-wrap">
                <div>
                    <div style="margin: 5px 20px">
                        <span>年<span style="visibility: hidden;">占位</span>级：</span>
                        <Select v-model="queryForm.gradeId" style="width:120px;" @on-change="getClassList" clearable>
                            <Option v-for="item in gradeList" :value="item.gradeId" :key="item.gradeId">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div style="margin: 5px 20px">
                        <span>班<span style="visibility: hidden;">占位</span>级：</span>
                        <Select v-model="queryForm.classId" style="width:120px;" clearable>
                            <Option v-for="item in classList" :value="item.studentClass" :key="item.studentClass">{{ item.studentClass +'班'}}</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <Button type="success" @click="querySearch">查询</Button>
                    <Button type="success" style="margin-left:20px;"  @click="toImportPage">幼儿视力导入</Button>
                    <Button type="success" style="margin-left:20px;"  @click="toOutportData">导出幼儿视力数据</Button>
                    <Button type="success" style="margin-left:20px;"  @click="toOutportFirstSemesterData">导出上学年第一学期视力数据</Button>
                </div>
            </div>
        </Card>
        <Card style="margin-top: 20px">
            <span class="table-desc">数据概况</span>
            <Table :loading="loading" border :columns="statisticsHeader" :data="statisticsHeaderResult"></Table>
        </Card>
        <Card style="margin-top: 20px">
            <div class="data-wrap">
                <span class="table-desc">数据明细</span>
                <Table :loading="loading" border height="520" :columns="tableHead" :data="result"></Table>
            </div>
            <div class="page-wrap">
                <Page class="page-plug" :total="resultTotal" :current="queryForm.pageNo" @on-change="changePageNum" @on-page-size-change="changePageSize" show-elevator show-sizer show-total/>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'toddlerVisionScreening',
        data () {
            return {
                title: '幼儿视力筛查',
                queryText: '查询',
                addText: '新增',
                yearSemester:"",
                showFirst:0,
                loading: false, // 加载状态
                gradeList: [
                    {
                        gradeId: 23,
                        label: '大班'
                    },
                    {
                        gradeId: 22,
                        label: '中班'
                    },
                    {
                        gradeId: 21,
                        label: '小班'
                    }
                ],
                classList: [],
                visionStatusList: [
                    {
                        visionStatus: '1',
                        label: '视力正常'
                    },
                    {
                        visionStatus: '2',
                        label: '近视'
                    },
                    {
                        visionStatus: '3',
                        label: '远视'
                    },
                    {
                        visionStatus: '4',
                        label: '散光'
                    },
                    {
                        visionStatus: '0',
                        label: '远视储备不足'
                    }
                ],
                queryForm: {
                    gradeId: '',
                    classId: '',
                    pageSize: 10,
                    pageNo: 1
                },
                statisticsHeader: [
                    {
                        title: '年级',
                        key: 'grade',
                        align: 'center'
                    },
                    {
                        title: '班级',
                        key: 'studentClass',
                        align: 'center'
                    },
                    {
                        title: '测试人数/总人数',
                        key: 'studentNumber',
                        align: 'center'
                    },
                    {
                        title: '近视人数',
                        key: 'myopiaNumber',
                        align: 'center'
                    },
                    {
                        title: '近视率',
                        key: 'myopiaRate',
                        align: 'center'
                    },
                    // {
                    //     title: '视力不良人数',
                    //     key: 'poorEyesightNumber',
                    //     align: 'center'
                    // },
                    // {
                    //     title: '视力不良率',
                    //     key: 'poorEyesightRate',
                    //     align: 'center'
                    // },
                    {
                        title: '远视储备不足人数',
                        key: 'highRiskOfMyopiaNumber',
                        align: 'center'
                    },
                    {
                        title: '远视储备不足率',
                        key: 'highRiskOfMyopiaRate',
                        align: 'center'
                    }
                ],
                statisticsHeaderResult: [],
                tableHead: [
                    {
                        title: '年级',
                        key: 'grade',
                        align: 'center',
                        render: (h, params) => {
                            let grade = params.row.grade;
                            return h('span', grade === 21 ? '小班' : grade === 22 ? '中班' : '大班');
                        }
                    },
                    {
                        title: '班级',
                        key: 'studentClass',
                        align: 'center',
                        render: (h, params) => {
                            let studentClass = params.row.studentClass;
                            let text = '';
                            if (params.row.rangeMark !== '' && params.row.rangeMark !== undefined && params.row.rangeMark !== null) {
                                text = '全部班级';
                            } else {
                                text = studentClass + '班';
                            }
                            return h('span', text);
                        }
                    },
                    {
                        title: '测试人数/总人数',
                        key: 'registerCode',
                        align: 'center',
                        render: (h, params) => {
                            let testNumber = params.row.testNumber;
                            let totalNumber = params.row.totalNumber;
                            let text = testNumber + '/' + totalNumber;
                            return h('span', text);
                        }
                    },
                    {
                        title: '近视人数',
                        key: 'myopiaNumber',
                        align: 'center'
                    },
                    {
                        title: '近视率',
                        key: 'myopiaRate',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.row.myopiaRate + '%');
                        }
                    },
                    // {
                    //     title: '视力不良人数',
                    //     key: 'poorEyesightNumber',
                    //     align: 'center'
                    // },
                    // {
                    //     title: '视力不良率',
                    //     key: 'poorEyesightRate',
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         return h('span', params.row.poorEyesightRate + '%');
                    //     }
                    // },
                    {
                        title: '远视储备不足人数',
                        key: 'highRiskOfMyopiaNumber',
                        align: 'center'
                    },
                    {
                        title: '远视储备不足率',
                        key: 'highRiskOfMyopiaRate',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.row.highRiskOfMyopiaRate + '%');
                        }
                    },
                    {
                        title: '操作',
                        key: 'agreementName',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button',
                                {
                                    props: {
                                        type: 'success'
                                    },
                                    on: {
                                        click: () => {
                                            this.toVisionDetail(params.row);
                                        }
                                    }
                                }
                            , '详情');
                        }
                    }
                ],
                resultTotal: 0, // 总数据条数
                result: []
            };
        },
        methods: {
            initQueryData () {
                this.queryForm = {
                    gradeId: '',
                    classId: '',
                    pageSize: 10,
                    pageNo: 1
                };
            },
            querySearch () {
                this.queryForm.pageSize = 10;
                this.queryForm.pageNo = 1;
                this.queryData();
            },
            getClassList (val) {
                let _this = this;
                if (val !== '' && val !== undefined) {
                    this.$axios.get('/v1/vision/classList?grade=' + val).then(function (res) {
                        if (res.data.code === 10000) {
                            _this.classList = res.data.response;
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    });
                } else {
                    _this.classList = [];
                    _this.queryForm.classId = '';
                }
            },
            queryData () {
                const request = {
                    grade: this.queryForm.gradeId,
                    classId: this.queryForm.classId,
                    pageSize: this.queryForm.pageSize,
                    pageNo: this.queryForm.pageNo
                };
                // 记录查询条件
                if (this.queryForm.gradeId !== null && this.queryForm.gradeId !== '' && this.queryForm.gradeId !== undefined) {
                    localStorage.setItem('vision_select_grade', this.queryForm.gradeId);
                }
                if (this.queryForm.classId !== null && this.queryForm.classId !== '' && this.queryForm.classId !== undefined) {
                    localStorage.setItem('vision_select_class_id', this.queryForm.classId);
                }
                const _this = this;
                this.$axios.post('/v1/vision/getClassVisionData', request).then(function (res) {
                    if (res.data.code === 10000) {
                        let statisticsData = {};
                        if (_this.queryForm.gradeId === '' || _this.queryForm.gradeId === undefined || _this.queryForm.classId === null) {
                            statisticsData.grade = '全部年级';
                            statisticsData.studentClass = '全部班级';
                        } else {
                            if (_this.queryForm.gradeId === 23) {
                                statisticsData.grade = '大班';
                            } else if (_this.queryForm.gradeId === 22) {
                                statisticsData.grade = '中班';
                            } else if (_this.queryForm.gradeId === 21) {
                                statisticsData.grade = '小班';
                            }
                            if (_this.queryForm.classId === '' || _this.queryForm.classId === undefined || _this.queryForm.classId === null) {
                                statisticsData.studentClass = '全部班级';
                            } else {
                                statisticsData.studentClass = _this.queryForm.classId + '班';
                            }
                        }
                        let testNumber = 0;
                        let totalNumber = 0;
                        res.data.response.result.map((item) => {
                            testNumber += item.testNumber;
                        });
                        res.data.response.result.map((item) => {
                            totalNumber += item.totalNumber;
                        });
                        statisticsData.studentNumber = testNumber + '/' + totalNumber;
                        let myopiaNumber = 0;
                        res.data.response.result.map((item) => {
                            myopiaNumber += item.myopiaNumber;
                        });
                        statisticsData.myopiaNumber = myopiaNumber;
                        let poorEyesightNumber = 0;
                        res.data.response.result.map((item) => {
                            poorEyesightNumber += item.poorEyesightNumber;
                        });
                        statisticsData.poorEyesightNumber = poorEyesightNumber;
                        let highRiskOfMyopiaNumber = 0;
                        res.data.response.result.map((item) => {
                            highRiskOfMyopiaNumber += item.highRiskOfMyopiaNumber;
                        });
                        statisticsData.highRiskOfMyopiaNumber = highRiskOfMyopiaNumber;
                        if (testNumber === 0) {
                            statisticsData.myopiaRate = 0 + '%';
                            statisticsData.poorEyesightRate = 0 + '%';
                            statisticsData.highRiskOfMyopiaRate = 0 + '%';
                        } else {
                            statisticsData.myopiaRate = ((myopiaNumber / testNumber).toFixed(4) * 100).toFixed(2) + '%';
                            statisticsData.poorEyesightRate = ((poorEyesightNumber / testNumber).toFixed(4) * 100).toFixed(2) + '%';
                            statisticsData.highRiskOfMyopiaRate = ((highRiskOfMyopiaNumber / testNumber).toFixed(4) * 100).toFixed(2) + '%';
                        }
                        _this.statisticsHeaderResult.splice(0, 1, statisticsData);
                        _this.result = res.data.response.result;
                        _this.resultTotal = res.data.response.total;
                    } else {
                        this.$Message.warning(res.data.msg);
                    }
                });
            },
            changePageNum (pageNum) {
                this.queryForm.pageNo = pageNum;
                this.queryData();
            },
            changePageSize (pageSize) {
                this.queryForm.pageSize = pageSize;
                this.queryData();
            },
            toImportPage () {
                this.$router.push({name: 'visionImport'});
            },
            toOutportData () {
                window.open(this.$axios.defaults.baseURL + '/v1/vision/exportClassVisionData?token=' + sessionStorage.getItem('token'));
            },
            toOutportFirstSemesterData () {
                let schoolYear = sessionStorage.getItem('schoolYear');
                let firstSemester = schoolYear*10+1;
                window.open(this.$axios.defaults.baseURL + '/v1/vision/exportClassVisionData?token=' + sessionStorage.getItem('token')+'&yearSemester='+firstSemester);
            },
            toVisionDetail (obj) {
                localStorage.setItem('to_vision_detail_grade', obj.grade);
                let classId = obj.studentClass;
                let currentGrade = localStorage.getItem('vision_select_grade');
                if (currentGrade === '' || currentGrade === undefined || currentGrade === null) {
                    classId = '';
                }
                if (obj.rangeMark !== '' && obj.rangeMark !== undefined && obj.rangeMark !== null) {
                    classId = '';
                }
                localStorage.setItem('to_vision_detail_student_class', classId);
                this.$router.push({name: 'showVision'});
            }
        },
        mounted () {
            this.yearSemester = sessionStorage.getItem('yearSemester');
            if(this.yearSemester%10==1){
                this.showFirst=1;
            }else{
                this.showFirst=0;
            }
            this.initQueryData();
            let goBackFlag = localStorage.getItem('go_back_flag');
            if (goBackFlag === '1') {
                if (localStorage.getItem('vision_select_grade') !== null) {
                    this.queryForm.gradeId = parseInt(localStorage.getItem('vision_select_grade'));
                    this.getClassList(this.queryForm.gradeId);
                }
                if (localStorage.getItem('vision_select_class_id') !== null) {
                    this.queryForm.classId = parseInt(localStorage.getItem('vision_select_class_id'));
                }
                localStorage.removeItem('go_back_flag');
            } else {
                localStorage.removeItem('vision_select_grade');
                localStorage.removeItem('vision_select_class_id');
            }
            this.queryData();
        }
    };
</script>

<style lang="less" scoped>
    *{
        box-sizing: border-box;
    }
    .view-wrap {
        width: calc( 100% - 10px );
        height: 100%;
        position: relative;
        background: #f3f3f3;
        font-size: 16px;
        padding: 0 10px 10px;
        text-align: left;
    }
    .view-wrap>.page-title{
        margin-top: 15px;
        margin-bottom: 13px;
        font-size: 19.5px;
    }
    .condition-wrap{
        display: flex;
        flex-wrap: wrap;
        position: relative;
        flex-direction: column;
    }
    .condition-wrap>div{
        position: relative;
        display: flex;
        flex-direction: row;
    }
    .condition-wrap>div:last-child {
        position: absolute;
        right: 20px;
        top: 5px;
    }
    .query-wrap{
        position: relative;
        display: inline-block;
        background: #fff;
        width: 100%;
        height: 60px;
    }
    .ivu-form-item{
        margin-bottom: 0!important;
    }
    .query-form{
        height: 60px;
    }
    .query-form-row {
        position: relative;
        top: 15px;
    }
    .query-btn-group {
        position: absolute;
        right: 10px;
    }
    .data-wrap,.page-wrap,.query-wrap{
    }
    .data-wrap{
        position: relative;
    }
    .page-wrap{
        display: inline-block;
        height: 40px;
        line-height: 60px;
    }
    .page-plug{
        position: absolute;
        right: 16px;
    }
    .table-desc{
        display: inline-block;
        margin-bottom: 10px;
    }
</style>

