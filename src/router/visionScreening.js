import Main from '@/views/Main.vue';
export default [
    {
        path: '/showVisionManage',
        icon: 'ios-eye-outline',
        name: 'showVisionManage',
        title: '幼儿视力筛查',
        parentCode: 'top_vision',
        parentName: '幼儿视力筛查',
        parentIcon: 'ios-eye-outline',
        component: Main,
        children: [
            {
                path: 'toddlerVisionScreening',
                icon: 'ios-list-box-outline',
                name: 'toddlerVisionScreening',
                title: '幼儿视力筛查',
                component: resolve => {
                    require(['@/views/sportsClass/kindergarten/toddlerVisionScreening.vue'], resolve);
                }
            },
            {
                path: 'showVision',
                icon: 'ios-list-box-outline',
                name: 'showVision',
                title: '幼儿视力筛查',
                component: resolve => {
                    require(['@/views/sportsClass/kindergarten/showVision.vue'], resolve);
                }
            },
            {
                path: 'visionImport',
                icon: 'ios-list-box-outline',
                name: 'visionImport',
                title: '视力导入',
                component: resolve => {
                    require(['@/views/sportsClass/kindergarten/visionImport.vue'], resolve);
                }
            }
        ]
    }
]