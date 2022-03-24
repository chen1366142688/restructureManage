import Main from '@/views/Main.vue';
export default [
    {
        path: '/psychological',
        icon: 'md-trending-up',
        name: 'psychological',
        title: '心理评测',
        parentCode: 'top_psychological',
        parentName: '心理评测',
        parentIcon: 'md-trending-up',
        component: Main,
        children: [
            {
                path: 'psychologicalSummary',
                icon: 'ios-list-box-outline',
                name: 'psychologicalSummary',
                title: '心理评测汇总数据',
                component: resolve => {
                    require(['@/views/psychological/psychologicalSummary.vue'], resolve);
                }
            },
            {
                path: 'psychologicalDetail',
                icon: 'ios-list-box-outline',
                name: 'psychologicalDetail',
                title: '心理评测详情数据',
                component: resolve => {
                    require(['@/views/psychological/psychologicalDetail.vue'], resolve);
                }
            },
            {
                path: 'administration',
                icon: 'ios-list-box-outline',
                name: 'administration',
                title: '心理测试管理',
                component: resolve => { require(['@/views/psychological/psychologicalAdministration.vue'], resolve); }
            },
            {
                path: 'psychologicalAside',
                icon: 'ios-list-box-outline',
                name: 'psychologicalAside',
                title: '心理测评详情',
                component: resolve => { require(['@/views/psychological/psychologicalTest.vue'], resolve); }
            }
        ]
    }
]