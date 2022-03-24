import api from '@/api/dataFiles/dataFilesHistory'
const mixins = {
    data() { 
        return {
            subCurr:[
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
                    key: 'notStudentGW',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '完成人数/测试总人数',
                    key: 'subjectFinishStudent',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { subjectFinishStudent, subjectTotalStudent} = params.row;
                        return h("span", `${subjectFinishStudent}/${subjectTotalStudent}`);
                    }
                },
                {
                    title: '平均分',
                    key: 'excellentStudent',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { subjectTotalScore, subjectTotalStudent } = params.row;
                        return h("span", `${subjectTotalStudent>0 ? (subjectTotalScore/subjectTotalStudent/100).toFixed(2) : 0}`);
                    }
                },
                {
                    title: '优良率（人数）',
                    key: 'showType',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { subjectExcellentStudent, subjectGoodStudent, subjectFinishStudent } = params.row;
                        let excellentGoodCount = subjectExcellentStudent + subjectGoodStudent;
                        return h('span',subjectFinishStudent>0 ? `${(100*excellentGoodCount/ subjectFinishStudent).toFixed(2)}%（${excellentGoodCount}人）` : '--')
                    }
                },
                {
                    title: '合格率（人数）',
                    key: 'showType',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { subjectPassStudent, subjectFinishStudent } = params.row;
                        return h('span',subjectFinishStudent>0 ? `${(100*subjectPassStudent / subjectFinishStudent).toFixed(2)}%（${subjectPassStudent}人）` : '--')
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
            subHistory:[
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
                    title: '完成人数/测试总人数',
                    key: 'finishStudent',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { reportStudentNum, finishStudent } = params.row;
                        return h('span', `${finishStudent}/${reportStudentNum}`)
                    }
                },
                {
                    title: '平均分',
                    key: 'finishStudent',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { finishStudent, totalScore } = params.row;
                        return h("span", `${finishStudent>0 ? (totalScore/finishStudent/100).toFixed(2) : 0}`);
                    }
                },
                {
                    title: '优良率（人数）',
                    key: 'excellentStudent',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { excellentStudent, goodStudent, finishStudent } = params.row;
                        let excellentGoodCount = excellentStudent + goodStudent;
                        return h('span',finishStudent>0 ? `${(100*excellentGoodCount/ finishStudent).toFixed(2)}%（${excellentGoodCount}人）` : '--')
                    }
                },
                {
                    title: '合格率（人数）',
                    key: 'passStudent',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        let { passStudent, finishStudent } = params.row;
                        return h('span',finishStudent>0 ? `${(100*passStudent / finishStudent).toFixed(2)}%（${passStudent}人）` : '--')
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
        getEducationSubjectReportInfo(){
            api.getEducationSubjectReportInfo({yearSemester:this.reportData.yearSemester}).then(res => {
                if(res.data.code === 10000){
                    this.currentData = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //获取教育局报送视力历史记录
        getEducationReportSubjectHisList(){
            api.getEducationReportSubjectHisList({yearSemester:this.reportData.yearSemester}).then(res => {
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