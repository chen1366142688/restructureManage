import Main from '@/views/Main.vue';
export default [
  {
    path: '/physicalFitnessManage',
    icon: 'logo-python',
    name: 'physicalFitnessManage',
    title: '体能配置管理',
    parentCode: 'physicalFitnessManage',
    parentName: '体能',
    parentIcon: 'logo-python',
    component: Main,
    children: [
        {
            path: 'physicalFitnessItemList',
            icon: 'ios-list-box-outline',
            name: 'physicalFitnessItemList',
            title: '体能项目配置',
            component: resolve => {
                require(['@/views/cd/highSchool/physicalFitnessManage/physicalFitnessItemList.vue'], resolve);
            }
        },
        {
            path: 'physicalFitnessData',
            icon: 'ios-list-box-outline',
            name: 'physicalFitnessData',
            title: '体能数据统计',
            component: resolve => {
                require(['@/views/cd/highSchool/physicalFitnessManage/physicalFitnessData.vue'], resolve);
            }
        },
        {
            path: 'physicalFitnessItemConfige',
            icon: 'ios-list-box-outline',
            name: 'physicalFitnessItemConfige',
            title: '体能项目配置',
            component: resolve => {
                require(['@/views/cd/highSchool/physicalFitnessManage/physicalFitnessItemConfige.vue'], resolve);
            }
        }
    ]
},
]