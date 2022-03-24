const mixins = {
    data() { 
        return {
            detailVisionData: {
                leftVision: '',
                rightVision: '',
                leftBall: '',
                rightBall: '',
                leftColumn: '',
                rightColumn: '',
                leftAxis: '',
                rightAxis:'',
                glassesWearer:'0'
            },
            visionHistoryColumns: [
                {
                    title: "裸眼视力",
                    key: "resultValue",
                    align: "center",
                    render: (h, params) => {
                        let { leftVision, rightVision} = params.row;
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
                    align: "center",
                    render: (h, params) => {
                        let { leftBall, rightBall} = params.row;
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
                    render: (h, params) => {
                        let { leftColumn, rightColumn} = params.row;
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
                    render: (h, params) => {
                        let { leftAxis, rightAxis} = params.row;
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
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        let { glassesWearer } = params.row
                        return h("div", {
                            domProps: {
                                innerHTML: glassesWearer == '1' ? '是' : glassesWearer == '0' ? '否':"未测试"
                            }
                        });
                    }
                },
                {
                    title: "录入时间",
                    key: "createTime",
                    align: "center"
                },
                {
                    title: "考核老师",
                    key: "teacherName",
                    align: "center",
                    minWidth: 90
                },
                {
                    title: "考核类型",
                    key: "supplementStatus",
                    align: "center",
                    minWidth: 80,
                    render: (h, params) => {
                        let text = "正常";
                        if (params.row.supplementStatus == "2") {
                            text = "补测";
                        }
                        return h("div", text);
                    }
                }
            ],
            visionHistoryColumnsOld: [
                {
                    title: "裸眼视力",
                    key: "resultValue",
                    align: "center",
                    minWidth:100,
                    render: (h, params) => {
                        let { leftVision, rightVision} = params.row;
                        return h("div", {
                            domProps: {
                                innerHTML: this.catgoryVisionItem(leftVision, rightVision)
                            }
                        });
                    }
                },
                {
                    title: "串镜",
                    key: "createTime",
                    align: "center",
                    minWidth:100,
                    render: (h, params) => {
                        const row = params.row;
                        let text = "";
                        if (row.leftVision && row.rightVision) {
                            text += this.catMirror(row.leftVision, 'L');
                            text += this.catMirror(row.leftVision, 'R');
                        } else {
                            text = "未完成测试";
                        }
                        return h("div", {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: "屈光不正",
                    key: "createTime",
                    align: "center",
                    minWidth:100,
                    render: (h, params) => {
                        const row = params.row;
                        let text = "";
                        if (row.leftVision && row.rightVision) {
                            text += this.catRefraction(row.leftVision, 'L');
                            text += this.catRefraction(row.leftVision, 'R');;
                        } else {
                            text = "未完成测试";
                        }
                        return h("div", {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: "录入时间",
                    key: "createTime",
                    align: "center",
                    minWidth:100
                },
                {
                    title: "考核老师",
                    key: "teacherName",
                    align: "center",
                    minWidth: 90
                },
                {
                    title: "参与老师",
                    key: "joinTeacherName",
                    align: "center",
                    minWidth:100
                },
                {
                    title: "考核类型",
                    key: "supplementStatus",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        return h("div", params.row.supplementStatus == "2" ? "补测" : "正常");
                    }
                }
            ],
        }
    },
    methods: {
        //构建视力相关输出
        catgoryVisionItem(leftVis, rightVis) {
            let text = "";
            if (leftVis && rightVis) {
                text += `<span>左眼：${leftVis}</span>`;
                text += `<span style="margin-left:20px;">右眼：${rightVis}</span>`;
            } else {
                text = "未测试";
            }
            return text;
        },
        //构建2021年之前数据的串镜展示
        catMirror(mirror, direction) { 
            let html = `<div style='text-align:left;'>&nbsp;&nbsp;${direction === 'L' ? '左眼' : '右眼'}：`,text = ''
            if (mirror == '0') {
                text = '正常'
            } else if (mirror == '1') {
                text = '正片上升、负片下降'
            } else if (mirror == '-1') {
                text = '正片下降、负片上升'
            } else if (mirror == '2') {
                text = '其他'
            } else if (mirror == '9') {
                text = '未测试'
            } else { 
                text = '--'
            }
            return `${html}${text}</div>`
        },
        //构建2021年之前数据的屈光不正展示
        catRefraction(visionValue, direction) { 
            let html = `<lable ${direction === 'R' ? style="margin-left:20px;" : ''}>${direction === 'L' ? '左眼' : '右眼'}：`,text = ''
            if (visionValue == '0') {
                text = '正常'
            } else if (visionValue == '1') {
                text = '近视'
            } else if (visionValue == '2') {
                text = '远视'
            } else if (visionValue == '3') {
                text = '其他'
            } else { 
                text = '未测试'
            }
            return `${html}${text}</lable>`
        },
    }
}
export default mixins;