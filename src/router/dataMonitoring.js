import Main from '@/views/Main.vue';
export default [
    {
        path: '/dataMonitoring',
        icon: 'md-stats',
        name: 'dataMonitoring',
        title: '体质测试数据管理',
        parentCode: 'top_data',
        parentName: '数据监控',
        parentIcon: 'md-stats',
        component: Main,
        children: [
            {
                path: 'monitoring',
                icon: 'ios-list-box-outline',
                name: 'monitoring',
                title: '体育数据监控',
                component: resolve => {
                    require(['@/views/dataMonitoring/monitoring.vue'], resolve);
                }
            }
        ]
    }
]