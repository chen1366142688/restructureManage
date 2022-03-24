import Main from '@/views/Main.vue';
export default [
    {
        path: '/healthknowledge',
        icon: 'md-book',
        name: 'healthknowledge',
        title: '健康知识',
        parentCode: 'top_healthknowledge',
        parentName: '健康知识',
        parentIcon: 'md-book',
        component: Main,
        children: [
            {
                path: 'paperManage',
                icon: 'ios-list-box-outline',
                name: 'paperManage',
                title: '试卷管理',
                component: resolve => {
                    require(['@/views/healthKonowledge/paperManage.vue'], resolve);
                }
            },
            {
                path: 'paperScoreManage',
                icon: 'ios-list-box-outline',
                name: 'paperScoreManage',
                title: '成绩管理',
                component: resolve => {
                    require(['@/views/healthKonowledge/paperScoreManage.vue'], resolve);
                }
            },
            {
                path: 'paperClassResults',
                icon: 'ios-list-box-outline',
                name: 'paperClassResults',
                title: '班级成绩',
                component: resolve => {
                    require(['@/views/healthKonowledge/paperClassResults.vue'], resolve);
                }
            },
            {
                path: 'paperEntryResults',
                icon: 'ios-list-box-outline',
                name: 'paperEntryResults',
                title: '录入成绩',
                component: resolve => {
                    require(['@/views/healthKonowledge/paperEntryResults.vue'], resolve);
                }
            },
            {
                path: 'paperClassStudentResults',
                icon: 'ios-list-box-outline',
                name: 'paperClassStudentResults',
                title: '修改单个学生成绩',
                component: resolve => {
                    require(['@/views/healthKonowledge/paperClassStudentResults.vue'], resolve);
                }
            },
            {
                path: 'paperManageDetail',
                icon: 'ios-list-box-outline',
                name: 'paperManageDetail',
                title: '试卷详情',
                component: resolve => {
                    require(['@/views/healthKonowledge/paperManageDetail.vue'], resolve);
                }
            }
        ]
    }
]