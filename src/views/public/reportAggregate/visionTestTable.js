import api from '@/api/visionTest/studentVisionManage/visionManage'
const mixins = {
    data() { 
        return {
            visCurr:[
                {
                    title: '报送学期',
                    key: 'yearSemester',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { yearSemester } = params.row;
                        let yearSemesterText = yearSemester % 2 === 1 ? '第二学期' : '第一学期';
                        return h('span', `${Math.floor(yearSemester/10)}${yearSemesterText}`)
                    }
                },
                {
                    title: '报送学校',
                    key: 'schoolName',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { schoolName, schoolType } = params.row;
                        return h('span', `${schoolName || ''}${schoolType == '1' ? '（幼儿园）' : schoolType == '2' ? '（小学）' : schoolType == '3' ? '（初中）' : '（高中）'}`)
                    }
                },
                {
                    title: '学生总人数',
                    key: 'totalStudent',
                    align: 'center',
                    minWidth:100,
                },
                 {
                    title: '系统无学籍学生数',
                    key: 'notSchoolStudent',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '国网无学籍学生数',
                    key: 'notNationStudent',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '完成人数',
                    key: 'visionFinishStudent',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '视力不良率（人数）',
                    key: 'showType',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { visionPoorStudent, visionFinishStudent } = params.row;
                        return h('span', visionFinishStudent > 0  ?`${(100 * visionPoorStudent / visionFinishStudent ).toFixed(2)}%（${visionPoorStudent || 0}人）`:'--')
                    }
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
                                    type: 'success'
                                },
                                on: {
                                    click: () => {
                                        this.toDetailInfo(params.row);
                                    }
                                }
                            },
                            '查看详情'
                            )
                        ])
                    }
                }
            ],
            visHistory:[
                {
                    title: '报送学期',
                    key: 'totalStudent',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        let { yearSemester } = params.row;
                        let yearSemesterText = yearSemester % 2 === 1 ? '第二学期' : '第一学期';
                        return h('span', `${Math.floor(yearSemester/10)}${yearSemesterText}`)
                    }
                },
                {
                    title: '报送学校',
                    key: 'schoolName',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { schoolName, schoolType } = params.row;
                        return h('span', `${schoolName || ''}${schoolType == '1' ? '（幼儿园）' : schoolType == '2' ? '（小学）' : schoolType == '3' ? '（初中）' : '（高中）'}`)
                    }
                },
                {
                    title: '报送学生',
                    key: 'reportStudentNum',
                    align: 'center',
                    minWidth:100,
                },
                 {
                    title: '完成人数',
                    key: 'finishStudent',
                    align: 'center',
                    minWidth:100
                },
                {
                    title: '视力不良率（人数）',
                    key: 'showType',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { visionPoorStudent, finishStudent } = params.row;
                        return h('span', visionPoorStudent > 0  ?`${(100 * visionPoorStudent / finishStudent ).toFixed(2)}%（${visionPoorStudent}人）`:"--")
                    }
                },
                {
                    title: '报送时间',
                    key: 'reportTime',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '报送人',
                    key: 'teacherName',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '状态',
                    key: 'reportStatus',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        return h("span", "报送成功");
                    }
                }
            ],
        }
    },
    methods: {
        //获取该校当前视力信息
        getEducationNowAndHisVisionInfo() {
            api.getEducationNowVisionInfo({yearSemester:this.reportData.yearSemester}).then(res => {
                if(res.data.code === 10000){
                    this.currentData = res.data.response;
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //获取教育局报送视力历史记录
        getEducationVisionHisList(){
            api.getEducationVisionHisList({yearSemester:this.reportData.yearSemester}).then(res => {
                if(res.data.code === 10000){
                    this.historyData = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
    }
}

export default mixins;