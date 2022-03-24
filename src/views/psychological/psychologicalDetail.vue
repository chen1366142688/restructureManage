<template>
    <div>
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">心理评测详情数据</h2>
        </div>
        <Card>
            <div class="top-search">
                <div class="left-input">
                    <div style="margin:5px 20px;">
                        <span>年<span style="visibility:hidden;">空空</span>级：</span>
                        <Select v-model="grade" v-on:on-change="classCodeListChange" style="width:120px">
                            <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>班<span style="visibility:hidden;">空空</span>级：</span>
                        <Select v-model="classCode" style="width:120px">
                            <Option v-for="item in classCodeList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>风险等级：</span>
                        <Select v-model="riskLevel" style="width:120px">
                            <Option v-for="item in riskLevelList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>抑郁倾向：</span>
                        <Select v-model="depressedWarning" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>生命价值：</span>
                        <Select v-model="lifeWarning" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>安全意识：</span>
                        <Select v-model="safetyWarning" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>抗挫力<span style="visibility:hidden;">空</span>：</span>
                        <Select v-model="setbackWarning" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                </div>
                <div class="right-btns">
                    <Button
                            v-on:click="getpsychologicalDetail(1)"
                            type="success">查询
                    </Button>
                    <Button type="success" @click="goBack">返回</Button>
                </div>
            </div>
        </Card>
        <br/>
        <Card>
            <div style="font-size:18px;height:40px;">
                数据概览
            </div>
            <div>
                <Table border :columns="summaryResultColumns" :data="summaryResultData"></Table>
            </div>
        </Card>
        <br/>
        <Card>
            <div style="font-size:18px;height:40px;">
                数据明细
            </div>
            <Row>
                <div>
                    <Table border :columns="resultColumns" :data="resultData"></Table>
                </div>
                <br/>
                <div style="float: right;">
                    <Page
                            :total="total"
                            :current="pageNum"
                            :page-size="pageSize"
                            @on-change="pageNumChange"
                            @on-page-size-change="pageSizeChange"
                            show-total
                            show-sizer
                    ></Page>
                </div>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'psychologicalDetail',
        data () {
            return {
                schoolId: '',
                schoolType: '',
                activityId: '',
                grade: '0',
                classCode: '0',
                riskLevel: '0',
                depressedWarning: '0',
                lifeWarning: '0',
                safetyWarning: '0',
                setbackWarning: '0',
                pageNum: 1,
                pageSize: 10,
                total: 0,
                schoolGradeList: [],
                primaryList: [
                    {
                        grade: '0',
                        label: '全部'
                    },
                    {
                        grade: 1,
                        label: '一年级'
                    },
                    {
                        grade: 2,
                        label: '二年级'
                    },
                    {
                        grade: 3,
                        label: '三年级'
                    },
                    {
                        grade: 4,
                        label: '四年级'
                    },
                    {
                        grade: 5,
                        label: '五年级'
                    },
                    {
                        grade: 6,
                        label: '六年级'
                    }
                ],
                middleList: [
                    {
                        grade: '0',
                        label: '全部'
                    },
                    {
                        grade: 7,
                        label: '七年级'
                    },
                    {
                        grade: 8,
                        label: '八年级'
                    },
                    {
                        grade: 9,
                        label: '九年级'
                    }
                ],
                highList: [
                    {
                        grade: '0',
                        label: '全部'
                    },
                    {
                        grade: 10,
                        label: '高一'
                    },
                    {
                        grade: 11,
                        label: '高二'
                    },
                    {
                        grade: 12,
                        label: '高三'
                    }
                ],
                collegeList: [
                    {
                        grade: '0',
                        label: '全部'
                    },
                    {
                        grade: 13,
                        label: '大一'
                    },
                    {
                        grade: 14,
                        label: '大二'
                    },
                    {
                        grade: 15,
                        label: '大三'
                    },
                    {
                        grade: 16,
                        label: '大四'
                    }
                ],
                classCodeList: [
                    {
                        value: '0',
                        label: '全部'
                    }
                ],
                classCodeListEmpty: [
                    {
                        value: '0',
                        label: '全部'
                    }
                ],
                classCodeListAll: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '1班'
                    },
                    {
                        value: 2,
                        label: '2班'
                    },
                    {
                        value: 3,
                        label: '3班'
                    },
                    {
                        value: 4,
                        label: '4班'
                    },
                    {
                        value: 5,
                        label: '5班'
                    },
                    {
                        value: 6,
                        label: '6班'
                    },
                    {
                        value: 7,
                        label: '7班'
                    },
                    {
                        value: 8,
                        label: '8班'
                    },
                    {
                        value: 9,
                        label: '9班'
                    },
                    {
                        value: 10,
                        label: '10班'
                    },
                    {
                        value: 11,
                        label: '11班'
                    },
                    {
                        value: 12,
                        label: '12班'
                    },
                    {
                        value: 13,
                        label: '13班'
                    },
                    {
                        value: 14,
                        label: '14班'
                    },
                    {
                        value: 15,
                        label: '15班'
                    },
                    {
                        value: 16,
                        label: '16班'
                    },
                    {
                        value: 17,
                        label: '17班'
                    },
                    {
                        value: 18,
                        label: '18班'
                    },
                    {
                        value: 19,
                        label: '19班'
                    },
                    {
                        value: 20,
                        label: '20班'
                    },
                    {
                        value: 21,
                        label: '21班'
                    },
                    {
                        value: 22,
                        label: '22班'
                    },
                    {
                        value: 23,
                        label: '23班'
                    },
                    {
                        value: 24,
                        label: '24班'
                    },
                    {
                        value: 25,
                        label: '25班'
                    },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
                ],
                riskLevelList: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '低风险'
                    },
                    {
                        value: '2',
                        label: '中等风险'
                    },
                    {
                        value: '3',
                        label: '中高风险'
                    },
                    {
                        value: '4',
                        label: '高风险'
                    },
                ],
                optionList: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '无预警'
                    },
                    {
                        value: '2',
                        label: '有预警'
                    },
                ],
                resultData: [],
                summaryResultData: [],
                resultColumns: [
                    {
                        title: '年级',
                        key: 'grade',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            const data = params.row;
                            const text = data.grade==1?"一年级":data.grade==2?"二年级":data.grade==3?"三年级":data.grade==4?"四年级":
            data.grade==5?"五年级":data.grade==6?"六年级":data.grade==7?"七年级":data.grade==8?"八年级":
            data.grade==9?"九年级":data.grade==10?"高一":data.grade==11?"高二":data.grade==12?"高三":'--';
                                return h('div', [
                                    h('span', text)
                                ]);

                        }
                    },
                    {
                        title: '班级',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            const data = params.row;
                            if (data.classCode == 999) {
                                return h('div', [
                                    h('span', '全部班级')
                                ]);
                            } else {
                                return h('div', [
                                    h('span', data.classCode + '班')
                                ]);
                            }
                        }
                    },

                    {
                        title: '完成测试人数/学生总人数',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', [
                                h('span', data.testStudentCount + '/' + data.allStudentCount)
                            ]);
                        }
                    },
                    {
                        title: '低风险区',
                        key: 'lowRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '中等风险区',
                        key: 'highRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '中高风险区',
                        key: 'higherRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '高风险区',
                        key: 'extremelyHighRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '抑郁预警',
                        key: 'depressedWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '生命价值预警',
                        key: 'lifeWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '安全意识预警',
                        key: 'safetyWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '抗挫力预警',
                        key: 'setbackWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                        on: {
                                            click: () => {
                                                this.gotoNext(params.row);
                                            }
                                        }
                                    },
                                    '详情'
                                )
                            ]);
                        }
                    },
                ],
                summaryResultColumns: [
                    {
                        title: '年级',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            const data = params.row;
                            if (data.grade == 999) {
                                return h('div', [
                                    h('span', '全部年级')
                                ]);
                            } else {
                                 const text = data.grade==1?"一年级":data.grade==2?"二年级":data.grade==3?"三年级":data.grade==4?"四年级":
            data.grade==5?"五年级":data.grade==6?"六年级":data.grade==7?"七年级":data.grade==8?"八年级":
            data.grade==9?"九年级":data.grade==10?"高一":data.grade==11?"高二":data.grade==12?"高三":'--';
                                return h('div', [
                                    h('span', text)
                                ]);
                            }
                        }
                    },
                    {
                        title: '班级',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            const data = params.row;
                            if (data.classCode == 999) {
                                return h('div', [
                                    h('span', '全部班级')
                                ]);
                            } else {
                                return h('div', [
                                    h('span', data.classCode + '班')
                                ]);
                            }
                        }
                    },

                    {
                        title: '完成测试人数/学生总人数',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', [
                                h('span', data.testStudentCount + '/' + data.allStudentCount)
                            ]);
                        }
                    },
                    {
                        title: '低风险区',
                        key: 'lowRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '中等风险区',
                        key: 'highRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '中高风险区',
                        key: 'higherRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '高风险区',
                        key: 'extremelyHighRisk',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '抑郁预警',
                        key: 'depressedWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '生命价值预警',
                        key: 'lifeWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '安全意识预警',
                        key: 'safetyWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '抗挫力预警',
                        key: 'setbackWarningCount',
                        align: 'center',
                        minWidth:100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        minWidth:100,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                        on: {
                                            click: () => {
                                                this.gotoNext(params.row);
                                            }
                                        }
                                    },
                                    '详情'
                                )
                            ]);
                        }
                    },
                ],
            };
        },
        methods: {
            classCodeListChange () {
                if (this.grade == '0') {
                    this.classCode = '0';
                    this.classCodeList = this.classCodeListEmpty;
                } else {
                    this.classCodeList = this.classCodeListAll;
                }
            },
            initSchoolGradeList () {
                //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
                let vm = this;
                let schoolId = sessionStorage.getItem('schoolId');
                vm.schoolId = schoolId;
                let schoolType = sessionStorage.getItem('schoolType');
                vm.schoolType = schoolType;
                if (schoolType) {
                    if ('0' == schoolType) {
                        vm.schoolGradeList = vm.schoolGradeList
                            .concat(vm.primaryList)
                            .concat(vm.middleList)
                            .concat(vm.highList)
                            .concat(vm.collegeList);
                    }
                    if ('2' == schoolType) {
                        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
                        vm.grade = '0';
                    }
                    if ('3' == schoolType) {
                        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
                        vm.grade = '0';
                    }
                    if ('4' == schoolType) {
                        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
                        vm.grade = '0';
                    }
                } else {
                    vm.schoolGradeList = vm.schoolGradeList
                        .concat(vm.primaryList)
                        .concat(vm.middleList)
                        .concat(vm.highList)
                        .concat(vm.collegeList);
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            gotoNext (data) {
                data.activityId = this.activityId;
                this.$router.push({name: 'administration', params: data});
            },
            getpsychologicalDetail (QueryMethod) {
                //查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                if (QueryMethod == 1) {
                    //查询按钮查询页码设置为1
                    this.pageNum = 1;
                }
                let paramData = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    activityId: this.activityId,
                    grade: this.grade,
                    classCode: this.classCode,
                    riskLevel: this.riskLevel,
                    depressedWarning: this.depressedWarning,
                    lifeWarning: this.lifeWarning,
                    safetyWarning: this.safetyWarning,
                    setbackWarning: this.setbackWarning,
                };

                this.$axios.post('/v1/psychological/getPsychologicalDetail', paramData).then(res => {
                    if (res.data.code == 10000) {
                        this.resultData = res.data.response.result;
                        this.pageNum = res.data.response.pageNum;
                        this.pageSize = res.data.response.pageSize;
                        this.total = res.data.response.total;
                    } else {
                        this.$Message.info(res.data.msg);
                    }
                });
                let summaryParamData = {
                    activityId: this.activityId,
                    grade: this.grade,
                    classCode: this.classCode
                };

                this.$axios.post('/v1/psychological/getPsychologicalDetailSummary', summaryParamData).then(res => {
                    if (res.data.code == 10000) {
                        this.summaryResultData = res.data.response;
                    } else {
                        this.$Message.info(res.data.msg);
                    }
                });
            },
            pageNumChange (value) {
                //页码改变方法处理
                if (this.pageNum != value) {
                    this.pageNum = value;
                    this.getpsychologicalDetail(0);
                }
            },
            pageSizeChange (value) {
                //页面大小改变方法处理
                if (this.pageSize != value) {
                    this.pageSize = value;
                    this.getpsychologicalDetail(1);
                }
            },
        },
        created () {
        },
        mounted () {
            this.initSchoolGradeList();
            this.activityId = this.$route.query.activityId;
            this.getpsychologicalDetail(1);
        }
    };
</script>

<style scoped>

</style>
