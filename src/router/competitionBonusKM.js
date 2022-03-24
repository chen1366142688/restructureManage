import Main from '@/views/Main.vue';
export default [
    {
        path: '/competitionBonusKM',
        icon: 'md-trending-up',
        name: 'competitionBonusKM',
        title: '竞赛加分',
        parentCode: 'top_competitionBonusKM',
        parentName: '竞赛加分',
        parentIcon: 'md-trending-up',
        component: Main,
        children: [
            {
                path: 'competitionBonusManageKM',
                icon: 'ios-list-box-outline',
                name: 'competitionBonusManageKM',
                title: '竞赛加分管理',
                component: resolve => {
                    require(['@/views/km/competitionBonusManage/index.vue'], resolve);
                }
            },
            {
                path: 'addCompetitionBonusKM',
                icon: 'ios-list-box-outline',
                name: 'addCompetitionBonusKM',
                title: '添加学生竞赛加分',
                component: resolve => {
                    require(['@/views/km/competitionBonusManage/addCompetitionBonus.vue'], resolve);
                }
            },
            {
                path: 'addStudentKM',
                icon: 'ios-list-box-outline',
                name: 'addStudentKM',
                title: '添加参赛学生',
                component: resolve => {
                    require(['@/views/km/competitionBonusManage/addStudent.vue'], resolve);
                }
            }
        ]
    }
]