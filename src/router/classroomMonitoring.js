import Main from '@/views/Main.vue';
export default [
    {
        path: '/sportsClassMonitoring',
        icon: 'logo-instagram',
        name: 'sportsClassMonitoring',
        title: '学习态度',
        parentCode: 'top_sportsClass',
        parentName: '课堂监控',
        parentIcon: 'logo-python',
        component: Main,
        children: [
            {
                path: 'sportsClassStandard',
                icon: 'ios-list-box-outline',
                name: 'sportsClassStandard',
                title: '评分标准',
                component: resolve => {
                    require(['@/views/sportsClass/sportsClassStandard.vue'], resolve);
                }
            },
            {
                path: 'sportsClassManage',
                icon: 'ios-list-box-outline',
                name: 'sportsClassManage',
                title: '学习态度管理',
                component: resolve => {
                    require(['@/views/sportsClass/sportsClassManage.vue'], resolve);
                }
            },
            {
                path: 'sportsClassStudentHis',
                icon: 'ios-list-box-outline',
                name: 'sportsClassStudentHis',
                title: '学习态度记录',
                component: resolve => {
                    require(['@/views/sportsClass/sportsClassStudentHis.vue'], resolve);
                }
            },
            {
                path: 'sportsClassAnalyze',
                icon: 'ios-list-box-outline',
                name: 'sportsClassAnalyze',
                title: '学习态度分析',
                component: resolve => {
                    require(['@/views/scorechange/classroomMonitoring.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/sportsHealthData',
        icon: 'md-bicycle',
        name: 'sportsHealthData',
        title: '运动与健康数据',
        parentCode: 'top_sportsClass',
        parentName: '课堂监控',
        parentIcon: 'logo-python',
        component: Main,
        children: [
            {
                path: 'dataStatistical',
                icon: 'ios-list-box-outline',
                name: 'dataStatistical',
                title: '数据概况',
                component: resolve => {
                    require(['@/views/sportsHealthData/dataStatistical.vue'], resolve);
                }
            },
            {
                path: 'studentSportsData',
                icon: 'ios-list-box-outline',
                name: 'studentSportsData',
                title: '学生运动数据',
                component: resolve => {
                    require(['@/views/sportsHealthData/studentSportsData.vue'], resolve);
                }
            },
            {
                path: 'classMonitoringData',
                icon: 'ios-list-box-outline',
                name: 'classMonitoringData',
                title: '课程监控数据',
                component: resolve => {
                    require(['@/views/sportsHealthData/classMonitoringData.vue'], resolve);
                }
            },
            {
                path: 'classMonitoringStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'classMonitoringStudentDetail',
                title: '学生课堂心率走势详情',
                component: resolve => {
                    require(['@/views/sportsHealthData/classMonitoringStudentDetail.vue'], resolve);
                }
            },
            {
                path: 'studentSportsDataDetail',
                icon: 'ios-list-box-outline',
                name: 'studentSportsDataDetail',
                title: '学生详情',
                component: resolve => {
                    require(['@/views/sportsHealthData/studentSportsDataDetail.vue'], resolve);
                }
            }
        ]
    }
]