import Main from '@/views/Main.vue';
export default [
    {
        path: '/second_physicalHealthKM',
        icon: 'ios-sync',
        name: 'second_physicalHealthKM',
        title: '体质健康监测',
        parentCode: 'top_physicalHealthKM',
        parentName: '体质健康监测',
        parentIcon: 'ios-sync',
        component: Main,
        children: [
            {
                path: 'physicalHealthKM',
                icon: 'ios-list-box-outline',
                name: 'physicalHealthKM',
                title: '体质健康监测',
                component: resolve => {
                    require(['@/views/km/physicalHealth/physicalHealthMotion.vue'], resolve);
                }
            },
        ]
    }
]