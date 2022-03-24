const mixins = {
    data () {
        return {
            statusList:[
                {value:'9999',label:'全部'},
                {value:1,label:'已完成'},
                {value:2,label:'未完成'}
            ],
            visionColumns: [
                {
                    title: "姓名",
                    key: "studentName",
                    align: "center",
                    minWidth: 100
                },
                {
                    title: "性别",
                    key: "gender",
                    align: "center",
                    minWidth: 60,
                    render: (h, params) => {
                        return h("div", [
                            h("span", params.row.gender == "1" ? "男" : "女"),
                        ]);
                    }
                },
                {
                    title: "学籍号",
                    key: "registerCode",
                    align: "center",
                    minWidth: 120
                },
                {
                    title: "班级",
                    key: "studentClass",
                    align: "center",
                    minWidth: 90,
                    render: (h, params) => {
                        return h("div", [
                            h("span", `${params.row.gradeName || ''}${params.row.studentClass || ''}班`),
                        ]);
                    }
                },
                {
                    title: "裸眼视力",
                    key: "resultValue",
                    align: "center",
                    minWidth: 100,
                    render: (h, params) => {
                        let {leftVision, rightVision} = params.row;
                        return h("div", {
                            domProps: {
                                innerHTML: this.catgoryVisionItem(leftVision, rightVision)
                            }
                        });
                    }
                },
                {
                    title: "屈光球镜S",
                    key: "createTime",
                    minWidth: 150,
                    align: "center",
                    render: (h, params) => {
                        let {leftBall, rightBall} = params.row;
                        return h("div", {
                            domProps: {
                                innerHTML: this.catgoryVisionItem(leftBall, rightBall)
                            }
                        });
                    }
                },
                {
                    title: "屈光柱镜C",
                    key: "createTime",
                    align: "center",
                    minWidth: 150,
                    render: (h, params) => {
                        let {leftColumn, rightColumn} = params.row;
                        return h("div", {
                            domProps: {
                                innerHTML: this.catgoryVisionItem(leftColumn, rightColumn)
                            }
                        });
                    }
                },
                {
                    title: "屈光轴位A",
                    key: "createTime",
                    align: "center",
                    minWidth: 150,
                    render: (h, params) => {
                        let {leftAxis, rightAxis} = params.row;
                        return h("div", {
                            domProps: {
                                innerHTML: this.catgoryVisionItem(leftAxis, rightAxis)
                            }
                        });
                    }
                },
                {
                    title: "是否为角膜塑形镜（OK镜）佩戴者",
                    key: "glassesWearer",
                    align: "center",
                    minWidth: 150,
                    render: (h, params) => {
                        const row = params.row;
                        let text = row.glassesWearer == '1' ? '是' : row.glassesWearer == '0' ?  '否' : "未测试";
                        return h("div", {
                            domProps: {
                                innerHTML: row.haveExempt == "1" ? "" : text
                            }
                        });
                    },
                },
                {
                    title: "状态",
                    key: "visionStatus",
                    align: "center",
                    minWidth: 70,
                    render: (h, params) => {
                        let visionStatus = params.row.testOver == 1 ? '已完成' : '未完成'
                        return h("span", visionStatus);
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    minWidth: 100,
                    render: (h, params) => {
                        const that = this
                        return h( "Button",
                            {
                                props: {
                                    type: "success",
                                    disabled: that.editStatus
                                },
                                on: {
                                    click: () => {
                                        this.goStudentVisionDetail(params.row.studentId);
                                    }
                                }
                            },
                            "编辑"
                        )
                    }
                }
            ]
        };
    },
    methods: {
        //构建视力相关输出
        catgoryVisionItem(leftVis, rightVis) {
            let text = "";
            if (leftVis && rightVis) {
                text += `<div style='text-align:center;'>&nbsp;&nbsp;左眼：${leftVis}</div>`;
                text += `<div style='text-align:center;'>&nbsp;&nbsp;右眼：${rightVis}</div>`;
            } else {
                text = "未测试";
            }
            return text;
        }
    },
    mounted () {
        
    }
};
export default mixins;