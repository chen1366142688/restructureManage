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
                    <div style="margin: 5px 20px">
                        <span>姓<span style="visibility: hidden;">占位</span>名：</span>
                        <Input v-model="queryForm.studentName" placeholder="学生姓名" style="width:120px;" clearable></Input>
                    </div>
                    <div style="margin: 5px 20px">
                        <span>身份证号：</span>
                        <Input v-model="queryForm.studentCode" placeholder="身份证号" style="width:120px;" clearable></Input>
                    </div>
                    <div style="margin: 5px 20px">
                        <span>状<span style="visibility: hidden;">占位</span>态：</span>
                        <Select v-model="queryForm.visionStatus" style="width:120px;" clearable>
                            <Option v-for="item in visionStatusList" :value="item.visionStatus" :key="item.visionStatus">{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <Button type="success" @click="querySearch">查询</Button>
                    <Button type="success" style="margin-left:20px;"  @click="goBack">返回</Button>
                </div>
            </div>
        </Card>
        <Card style="margin-top: 15px">
            <div class="data-wrap">
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
    name: 'showVision',
    data () {
        return {
            title: '幼儿视力筛查',
            queryText: '查询',
            addText: '新增',
            loading: false, // 加载状态
            gradeList: [
                {
                    gradeId: 21,
                    label: '小班'
                },
                {
                    gradeId: 22,
                    label: '中班'
                },
                {
                    gradeId: 23,
                    label: '大班'
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
                studentName: '',
                studentCode: '',
                visionStatus: '',
                pageSize: 10,
                pageNo: 1
            },
            tableHead: [
                {
                    title: '姓名',
                    key: 'studentName',
                    align: 'center'
                },
                {
                    title: '性别',
                    key: 'agreementName',
                    align: 'center',
                    width: 80,
                    render: (h, params) => {
                        return h('span', params.row.gender === '1' ? '男' : '女');
                    }
                },
                {
                    title: '身份证号',
                    key: 'registerCode',
                    align: 'center'
                },
                {
                    title: '班级',
                    key: 'className',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.row.gradeName + params.row.studentClass + '班');
                    }
                },
                {
                    title: '裸眼视力',
                    key: 'agreementName',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let leftText = '';
                        let rightText = '';
                        let text = '';
                        if (params.row.leftUncorrectedFarVision === '' || params.row.leftUncorrectedFarVision === null) {
                            leftText = '-';
                        } else {
                            leftText = params.row.leftUncorrectedFarVision;
                        }
                        if (params.row.rightUncorrectedFarVision === '' || params.row.rightUncorrectedFarVision === null) {
                            rightText = '-';
                        } else {
                            rightText = params.row.rightUncorrectedFarVision;
                        }
                        if (leftText === '-' && rightText === '-') {
                            text += '-';
                        } else {
                            text += '<div>左眼：' + leftText + '</div>';
                            text += '<div>右眼：' + rightText + '</div>';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: '戴镜视力',
                    key: 'agreementName',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let leftText = '';
                        let rightText = '';
                        let text = '';
                        if (params.row.leftWithGlassesVision === '' || params.row.leftWithGlassesVision === null) {
                            leftText = '-';
                        } else {
                            leftText = params.row.leftWithGlassesVision;
                        }
                        if (params.row.rightWithGlassesVision === '' || params.row.rightWithGlassesVision === null) {
                            rightText = '-';
                        } else {
                            rightText = params.row.rightWithGlassesVision;
                        }
                        if (leftText === '-' && rightText === '-') {
                            text += '-';
                        } else {
                            text += '<div>左眼：' + leftText + '</div>';
                            text += '<div>右眼：' + rightText + '</div>';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: '球镜',
                    key: 'agreementName',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let leftText = '';
                        let rightText = '';
                        let text = '';
                        if (params.row.leftSphericalMirror === '' || params.row.leftSphericalMirror === null) {
                            leftText = '-';
                        } else {
                            leftText = params.row.leftSphericalMirror;
                        }
                        if (params.row.rightSphericalMirror === '' || params.row.rightSphericalMirror === null) {
                            rightText = '-';
                        } else {
                            rightText = params.row.rightSphericalMirror;
                        }
                        if (leftText === '-' && rightText === '-') {
                            text += '-';
                        } else {
                            text += '<div>左眼：' + (leftText / 1).toFixed(2) + '</div>';
                            text += '<div>右眼：' + (rightText / 1).toFixed(2) + '</div>';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: '驻镜',
                    key: 'agreementName',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let leftText = '';
                        let rightText = '';
                        let text = '';
                        if (params.row.leftStandingMirror === '' || params.row.leftStandingMirror === null) {
                            leftText = '-';
                        } else {
                            leftText = params.row.leftStandingMirror;
                        }
                        if (params.row.rightStandingMirror === '' || params.row.rightStandingMirror === null) {
                            rightText = '-';
                        } else {
                            rightText = params.row.rightStandingMirror;
                        }
                        if (leftText === '-' && rightText === '-') {
                            text += '-';
                        } else {
                            text += '<div>左眼：' + (leftText / 1).toFixed(2) + '</div>';
                            text += '<div>右眼：' + (rightText / 1).toFixed(2) + '</div>';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: '轴位',
                    key: 'agreementName',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let leftText = '';
                        let rightText = '';
                        let text = '';
                        if (params.row.leftAxialPosition === '' || params.row.leftAxialPosition === null) {
                            leftText = '-';
                        } else {
                            leftText = params.row.leftAxialPosition;
                        }
                        if (params.row.rightAxialPosition === '' || params.row.rightAxialPosition === null) {
                            rightText = '-';
                        } else {
                            rightText = params.row.rightAxialPosition;
                        }
                        if (leftText === '-' && rightText === '-') {
                            text += '-';
                        } else {
                            text += '<div>左眼：' + leftText + '</div>';
                            text += '<div>右眼：' + rightText + '</div>';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: '状态',
                    key: 'agreementName',
                    align: 'center',
                    render: (h, params) => {
                        let text = '';
                        if (params.row.visionStatus === null) {
                            text = '-';
                        } else {
                            if (params.row.visionStatus.substring(0, 1)[0] === '0') {
                                text = '远视储备不足';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '1') {
                                text = '视力正常';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '2') {
                                text = '远视未矫正';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '3') {
                                text = '未完成录入';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '4') {
                                text = '近视欠矫';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '5') {
                                text = '近视足矫';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '6') {
                                text = '近视未矫正';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '7') {
                                text = '远视欠矫';
                            } else if (params.row.visionStatus.substring(0, 1)[0] === '8') {
                                text = '远视足矫';
                            }
                            if (params.row.visionStatus.length > 1) {
                                if (params.row.visionStatus.substring(0, 1)[0] === '1') {
                                    text = '散光';
                                } else {
                                    text += '+散光';
                                }
                            }
                        }
                        return h('div', text);
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
                studentName: '',
                studentCode: '',
                visionStatus: '',
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
                gradeId: this.queryForm.gradeId,
                classId: this.queryForm.classId,
                studentName: this.queryForm.studentName,
                studentCode: this.queryForm.studentCode,
                visionStatus: this.queryForm.visionStatus,
                pageSize: this.queryForm.pageSize,
                pageNo: this.queryForm.pageNo
            };
            const _this = this;
            this.$axios.post('/v1/vision/getStudentVisionInfo', request).then(function (res) {
                if (res.data.code === 10000) {
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
        goBack () {
            this.$router.go(-1);
            localStorage.setItem('go_back_flag', '1');
        }
    },
    mounted () {
        this.initQueryData();
        let currentGrade = localStorage.getItem('to_vision_detail_grade');
        let currentStudentClass = localStorage.getItem('to_vision_detail_student_class');
        if (currentGrade !== null && currentGrade !== undefined && currentGrade !== '') {
            this.queryForm.gradeId = parseInt(currentGrade);
            this.getClassList(this.queryForm.gradeId);
            localStorage.removeItem('to_vision_detail_grade');
        }
        if (currentStudentClass !== null && currentStudentClass !== undefined && currentStudentClass !== '') {
            this.queryForm.classId = parseInt(currentStudentClass);
            localStorage.removeItem('to_vision_detail_student_class');
        }
        this.queryData();
    }
};
</script>

<style scoped>
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
</style>
