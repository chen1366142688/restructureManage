const mixins = {
    data() { 
        return {
            visionColumns:[
                {
                    title: '姓名',
                    key: 'studentName',
                    align: 'center',
                    minWidth: 120,
                },
                {
                    title: '性别',
                    key: 'gender',
                    align: 'center',
                    minWidth: 60,
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.gender == '1' ? '男' : '女')
                        ]);
                    }
                },
                {
                    title: '学籍号',
                    key: 'registerCode',
                    align: 'center',
                    minWidth: 160
                },
                {
                    title: '裸眼视力',
                    key: 'resultValue',
                    align: 'center',
                    minWidth: 80,
                    render: (h, params) => {
                        let {leftVision, rightVision} = params.row
                        return h('div', {
                            domProps: {
                                innerHTML: this.catgoryVisionItem(leftVision, rightVision)
                            }
                        });
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        return h('div', [ h(
                            'Button',
                            {
                                props: {
                                    type: 'success',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.toStudentVisionDetail(params.row.studentId);
                                    }
                                }
                            },
                            '编辑'
                        )]);
                    }
                }
            ],
            oldVison: [
                {
                    title: '串镜',
                    key: 'createTime',
                    minWidth: 200,
                    align: 'center',
                    render: (h, params) => {
                        const row = params.row;
                        let text = '';
                        if (row.leftVision && row.rightVision) {
                            text += this.catMirror(row.leftMirror, 'L');
                            text += this.catMirror(row.rightMirror, 'R');
                        } else {
                            text = '未测试';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                },
                {
                    title: '屈光不正',
                    key: 'createTime',
                    align: 'center',
                    minWidth: 150,
                    render: (h, params) => {
                        const row = params.row;
                        let text = '';
                        if (row.leftVision && row.rightVision) {
                            text += this.catRefraction(row.leftVision, 'L');
                            text += this.catRefraction(row.rightVision, 'R');
                        } else {
                            text = '未测试';
                        }
                        return h('div', {
                            domProps: {
                                innerHTML: text
                            }
                        });
                    }
                }
            ],
            newVison: [
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
                }
            ]
        }
    },
    methods: {
        //构建视力相关输出
        catgoryVisionItem(leftVis, rightVis) {
            let text = "";
            if (leftVis && rightVis) {
                text += `<div>左眼：${leftVis}</div>`;
                text += `<div>右眼：${rightVis}</div>`;
            } else {
                text = "未测试";
            }
            return text;
        },
        //构建2021年之前数据的串镜展示
        catMirror(mirror, direction) { 
            let html = `<div>${direction === 'L' ? '左眼' : '右眼'}：`, text = ''
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
            let html = `<div>${direction === 'L' ? '左眼' : '右眼'}：`,text = ''
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
            return `${html}${text}</div>`
        },
    }
}
export default mixins;