import Main from '@/views/Main.vue';
const VisionTestRouter = [
    {
        path: '/visionDataManage',
        icon: 'md-ionitron',
        name: 'visionDataManage',
        title: '视力测试',
        parentCode: 'top_vision',
        parentName: '视力测试',
        parentIcon: 'md-ionitron',
        component: Main,
        children: [
            {
                path: 'dataStatistics',
                icon: 'ios-list-box-outline',
                name: 'dataStatistics',
                title: '学生视力管理',
                component: resolve => {
                    require(['@/views/visionTest/publicArea/dataStatistics/dataStatistics.vue'], resolve);
                }
            },
            {
                path: 'studentVisionDetail',
                icon: 'ios-list-box-outline',
                name: 'studentVisionDetail',
                title: '学生视力详情',
                component: resolve => {
                    require(['@/views/visionTest/publicArea/studentVisionDetail/studentVisionDetail.vue'], resolve);
                }
            },
            {
                path: 'visionDataInsert',
                icon: 'ios-list-box-outline',
                name: 'visionDataInsert',
                title: '视力数据录入',
                component: resolve => {
                    require(['@/views/visionTest/publicArea/visionDataInsert/visionDataInsert.vue'], resolve);
                }
            },
            {
                path: 'historicalDataQuery',
                icon: 'ios-list-box-outline',
                name: 'historicalDataQuery',
                title: '数据统计',
                component: resolve => {
                    require(['@/views/visionTest/publicArea/historicalDataQuery/historicalDataQuery.vue'], resolve);
                }
            },
            {
                path: 'commonImportVision',
                icon: 'ios-list-box-outline',
                name: 'commonImportVision',
                title: '视力数据导入',
                component: resolve => {
                    require(['@/views/public/commonImport/visionIndex.vue'], resolve);
                }
            },
            
        ]
    }
];
export default VisionTestRouter;