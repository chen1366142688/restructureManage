<template>
    <div>
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">心理评测汇总数据</h2>
        </div>
        <Card>
            <div class="top-search">
                <div class="left-input">
                    <div style="margin:5px 20px;">
                        <span>中等风险：</span>
                        <Select v-model="highRisk" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>中高风险：</span>
                        <Select v-model="higherRisk" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>高风险<span style="visibility:hidden;">空</span>：</span>
                        <Select v-model="extremelyHighRisk" style="width:120px">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}
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
                            v-on:click="getPsychologicalSummary(1)"  disabled
                            type="success">查询
                    </Button>
                </div>
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
        name: 'psychologicalSummary',
        data () {
            return {
                highRisk: '0',
                higherRisk: '0',
                extremelyHighRisk: '0',
                depressedWarning: '0',
                lifeWarning: '0',
                safetyWarning: '0',
                setbackWarning: '0',
                pageNum: 1,
                pageSize: 10,
                total: 0,
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
                resultColumns: [
                    {
                        title: '名称',
                        key: 'activityName',
                        align: 'center',
                        minWidth:100
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
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '中等风险区',
                        key: 'highRisk',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '中高风险区',
                        key: 'higherRisk',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '高风险区',
                        key: 'extremelyHighRisk',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '抑郁预警',
                        key: 'depressedWarningCount',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '生命价值预警',
                        key: 'lifeWarningCount',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '安全意识预警',
                        key: 'safetyWarningCount',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '抗挫力预警',
                        key: 'setbackWarningCount',
                        align: 'center',
                        minWidth:90,
                        render: (h, params) => {
                            const data = params.row;
                            return h('div', '--');
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        minWidth:200,
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
                                                let row = params.row;
                                                this.gotoNext(row.activityId);
                                            }
                                        }
                                    },
                                    '详情'
                                ),
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
                                                let row = params.row;
                                                this.getActivityOnline(row.activityId);
                                            }
                                        }
                                    },
                                    '获取在线评估网址'
                                )
                            ]);
                        }
                    },
                ],
            };
        },
        methods: {
            gotoNext (activityId) {
                sessionStorage.setItem('psychologicalAdministration-activityId',activityId);
                this.$router.push({path: '/psychological/administration', query: {activityId: activityId}});
            },
            getActivityOnline(activityId){
                let vm = this;
                let schoolId = sessionStorage.getItem('schoolId');
                window.open(
                    `${this.$axios.defaults.answerUrl}mentalityTest2/login.html?activityId=${activityId}&schoolId=${schoolId}`
                );
            },
            getPsychologicalSummary (QueryMethod) {
                //查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                if (QueryMethod == 1) {
                    //查询按钮查询页码设置为1
                    this.pageNum = 1;
                }
                let paramData = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    highRisk: this.highRisk,
                    higherRisk: this.higherRisk,
                    extremelyHighRisk: this.extremelyHighRisk,
                    depressedWarning: this.depressedWarning,
                    lifeWarning: this.lifeWarning,
                    safetyWarning: this.safetyWarning,
                    setbackWarning: this.setbackWarning,
                };
                this.$axios.post('/v1/psychological/getPsychologicalSummary', paramData).then(res => {
                    if (res.data.code == 10000) {
                        this.resultData = res.data.response.result;
                        this.pageNum = res.data.response.pageNum;
                        this.pageSize = res.data.response.pageSize;
                        this.total = res.data.response.total;
                    } else {
                        this.$Message.info(res.data.msg);
                    }
                });
            },
            pageNumChange (value) {
                //页码改变方法处理
                if (this.pageNum != value) {
                    this.pageNum = value;
                    this.getPsychologicalSummary(0);
                }
            },
            pageSizeChange (value) {
                //页面大小改变方法处理
                if (this.pageSize != value) {
                    this.pageSize = value;
                    this.getPsychologicalSummary(1);
                }
            },
        },
        created () {
        },
        mounted () {
            this.getPsychologicalSummary(1);
        }
    };
</script>

<style scoped>

</style>
