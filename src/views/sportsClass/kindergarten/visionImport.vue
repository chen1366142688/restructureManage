<template>
    <div class="view-wrap">
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;font-size: 19.5px">{{title}}</h2>
        </div>
        <div>
            <Card>
                <div>
                    <div class="top-search">
                        <div class="left-input">
                            <div style="margin:5px 10px;">
                                <span>任务名称：</span>
                                <Input v-model="queryForm.importFileName" placeholder="任务名称" style="width:120px;" clearable></Input>
                                <Button type="success" class="search-btn" @click="querySearch">查询</Button>
                            </div>
                        </div>
                        <div class="right-btns">
                            <Button type="success" @click="getTemplate">导出模板</Button>
                            <Upload
                                    ref="upload"
                                    :show-upload-list="false"
                                    :on-success="handleSuccess"
                                    :format="['xls','xlsx']"
                                    :max-size="20480"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload"
                                    :multiple="false"
                                    name="muFiles"
                                    type="select"
                                    :action="importUrl"
                                    style="display: inline-block;"
                            >
                                <Button type="success">导入视力</Button>
                            </Upload>
                            <Button type="success" @click="goBack">返回</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <br>
        <div>
            <Card>
                <Row>
                    <div>
                        <Table border :loading="loading" height="520" :columns="tableHead" :data="result"></Table>
                    </div>
                    <br>
                    <div style="float: right;">
                        <Page
                                :total="resultTotal"
                                :current="queryForm.pageNo"
                                :page-size="queryForm.pageSize"
                                @on-change="changePageNum"
                                @on-page-size-change="changePageSize"
                                show-total
                                show-sizer
                        ></Page>
                    </div>
                </Row>
            </Card>
        </div>
        <Modal v-model="exportStatus" :mask-closable="false" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>温馨提示</span>
            </p>
            <div style="text-align:center">
                <span style>导入中，请稍等</span>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'competitionScoreImport',
        data () {
            return {
                loading: false,
                title: '幼儿视力导入',
                exportStatus: false,
                resultTotal: 0,
                importUrl: '',
                queryForm: {
                    importFileName: '', // 任务名称
                    pageNo: 1,
                    pageSize: 10
                },
                result: [],
                tableHead: [
                    {
                        title: '任务名称',
                        key: 'importFileName',
                        align: 'center'
                    },
                    {
                        title: '导入人员',
                        key: 'staffName',
                        align: 'center'
                    },
                    {
                        title: '导入数量',
                        key: 'totalCount',
                        align: 'center'
                    },
                    {
                        title: '已处理数量',
                        key: 'successCount',
                        align: 'center'
                    },
                    {
                        title: '错误数据数量',
                        key: 'failCount',
                        align: 'center'
                    },
                    {
                        title: '导入状态',
                        key: 'infoStatus',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'span',
                                    {
                                        style: {}
                                    },
                                    '执行完成'
                                )
                            ]);
                        }
                    },
                    {
                        title: '导入时间',
                        key: 'createTime',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'option',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                            const _this = this;
                            if (params.row.infoStatus === '1') {
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            style: {
                                                cursor: 'pointer',
                                                display: 'inline-block',
                                                marginRight: '5px'
                                            },
                                            props: {
                                                disabled: params.row.failCount === 0,
                                                type: 'success'
                                            },
                                            on: {
                                                click: () => {
                                                    _this.exportFailData(params.row);
                                                }
                                            }
                                        },
                                        '导出错误数据'
                                    )
                                ]);
                            }
                        }
                    }
                ]
            };
        },
        mounted () {
            this.importUrl = this.$axios.defaults.baseURL + '/v1/vision/file/upload/importVisionData?token=' + sessionStorage.getItem('token');
            this.initQueryData();
            this.queryData();
        },
        methods: {
            initQueryData () {
                this.queryForm = {
                    importFileName: '',
                    pageSize: 10,
                    pageNo: 1
                };
            },
            exportFailData (object) {
                window.open(this.$axios.defaults.baseURL + '/v1/vision/getErrorDate?token=' + sessionStorage.getItem('token') + '&importCode=' + object.importCode);
            },
            handleSuccess (res, file) {
                let _this = this;
                _this.exportStatus = false;
                if (res.code === 10000) {
                    if (res.response === '1') {
                        _this.$Message.info('导入成功');
                        _this.querySearch();
                    } else {
                        _this.$Message.info('文件为空，导入失败');
                    }
                } else {
                    _this.$Message.info('导入失败，请稍后再试');
                }
            },
            handleFormatError (file) {
                this.exportStatus = false;
                this.$Notice.warning({
                    title: '格式错误',
                    desc: '该文件格式错误，请检查后重试'
                });
            },
            handleMaxSize (file) {
                this.exportStatus = false;
                this.$Notice.warning({
                    title: '文件超大',
                    desc: '该文件超大了'
                });
            },
            handleBeforeUpload (file) {
                this.exportStatus = true;
                return true;
            },
            querySearch () {
                this.queryForm.pageSize = 10;
                this.queryForm.pageNo = 1;
                this.queryData();
            },
            queryData () {
                this.loading = true;
                const request = {
                    importFileName: this.queryForm.importFileName,
                    pageSize: this.queryForm.pageSize,
                    pageNo: this.queryForm.pageNo
                };
                const _this = this;
                this.$axios.post('/v1/vision/visionDataImportList', request).then(res => {
                    _this.loading = false;
                    if (res.data.code === 10000) {
                        _this.result = res.data.response.result;
                        _this.resultTotal = res.data.response.total;
                    } else {
                        _this.$Message.warning(res.data.msg);
                    }
                });
            },
            getTemplate () {
                window.open(this.$axios.defaults.baseURL + '/v1/vision/getVisionImportTemplate?token=' + sessionStorage.getItem('token'));
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
        }
    };
</script>

<style scoped>
    .view-wrap {
        width: calc( 100% - 10px );
        height: 100%;
        position: relative;
        background: #f3f3f3;
        font-size: 16px;
        padding: 0 10px 10px;
    }
    .search-btn{
        margin-left: 20px;
    }
    .top-search{
        position: relative;
    }
    .right-btns{
        position: absolute;
        top: 0px;
        right: 16px;
    }
</style>
