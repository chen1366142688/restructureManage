const mixins = {
    data() { 
        return {
            overViewColumns:[
                {
                    title: '年级',
                    key: 'grade',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        const row = params.row;
                        const gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三']
                        const text = `${gradeList[+row.grade-1]}（${row.startSchool}级）`;
                        return h('div',text)
                    }
                },
                {
                    title: '班级',
                    key: 'studentClass',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        return h('div', (params.row.studentClass==null || params.row.studentClass=='') ?"全部班级":params.row.studentClass+'班')
                    }
                },
                {
                    title: '总人数',
                    key: 'studentTotalCount',
                    align: 'center',
                    minWidth:100,
                },
                {
                    title: '已完成/测试总人数',
                    key: 'overTestCount',
                    align: 'center',
                    minWidth:100,
                    render: (h, params) => {
                        return h('div', params.row.overTestCount+'/'+params.row.studentTotalCount)
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
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.toDetail(params.row)
                                    }
                                }
                                },
                                '详情'
                            )
                        ])
                    }
                }
            ],
        }
    }
}
export default mixins;