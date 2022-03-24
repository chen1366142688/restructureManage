import Main from '@/views/Main.vue';
export default [
    {
        path: '/sportsTotalScore',
        icon: 'md-pulse',
        name: 'sportsTotalScore',
        title: '综合评价管理',
        parentCode: 'top_sports_score',
        parentName: '综合评价',
        parentIcon: 'md-pulse',
        component: Main,
        children: [
            {
                path: 'sportsScoreStudentKM',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreStudentKM',
                title: '学生数据管理',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreStudentKM.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreStudent',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreStudent',
                title: '按学生查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreStudent.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreStudentDetail',
                title: '学生详情',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreStudentDetail.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreStudentDetailCD',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreStudentDetailCD',
                title: '学生详情',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreStudentDetailCD.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreStudentDetailKM',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreStudentDetailKM',
                title: '学生详情',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreStudentDetailKM.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreClass',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreClass',
                title: '按班级查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreClass.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreGrade',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreGrade',
                title: '按年级查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreGrade.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreClassYN',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreClassYN',
                title: '班级数据查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreClassYN.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreGradeYN',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreGradeYN',
                title: '年级数据查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreGradeYN.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreYear',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreYear',
                title: '体育分值查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreYear.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreYearKM',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreYearKM',
                title: '中考成绩查询',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreYearKM.vue'], resolve);
                }
            },
            {
                path: 'sportsScoreYearDetail',
                icon: 'ios-list-box-outline',
                name: 'sportsScoreYearDetail',
                title: '分值详情',
                component: resolve => {
                    require(['@/views/sportsScore/sportsScoreYearDetail.vue'], resolve);
                }
            },
            {
                path: 'subjectReport',
                icon: 'ios-list-box-outline',
                name: 'subjectReport',
                title: '学生成绩上报',
                component: resolve => {
                    require(['@/views/sportsScore/subjectReport.vue'], resolve);
                }
            },
            {
                path: 'lessonReport',
                icon: 'ios-list-box-outline',
                name: 'lessonReport',
                title: '学课报告',
                component: resolve => {
                    require(['@/views/sportsScore/lessonReport.vue'], resolve);
                }
            },
            {
                path: 'subjectReportDetail',
                icon: 'ios-list-box-outline',
                name: 'subjectReportDetail',
                title: '学生上报信息',
                component: resolve => {
                    require(['@/views/sportsScore/subjectReportDetail.vue'], resolve);
                }
            },
            {
                path: 'highSportsScoreStudent',
                icon: 'ios-list-box-outline',
                name: 'highSportsScoreStudent',
                title: '按学生查询',
                component: resolve => {
                    require(['@/views/cd/highSchool/sportsScore/sportsScoreStudent.vue'], resolve);
                }
            },
            {
                path: 'sportsYearSemesterScoreStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'sportsYearSemesterScoreStudentDetail',
                title: '按学生查询',
                component: resolve => {
                    require(['@/views/cd/highSchool/sportsScore/sportsYearSemesterScoreStudentDetail.vue'], resolve);
                }
            }
        ]
    }
]