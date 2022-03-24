import Main from '@/views/Main.vue';
import Login from '@/views/login/Login.vue';
import Home from '@/views/home/home.vue';
import Index from '@/views/index/index.vue';
import Error404 from '@/views/error-page/404.vue';
import Error403 from '@/views/error-page/403.vue';
import Error500 from '@/views/error-page/500.vue';

import baseConfig from './baseConfig';//基础配置
import physicalTest from './physicalTest';//体质测试
import visionTest from './visionTest';//视力测试
import dataMonitoring from './dataMonitoring';//数据监控
import physicalSkill from './physicalSkill';//技能/体能
import physical from './physical';//体能
import physicalHealth from './physicalHealth';//体质健康
import competitionBonusKM from './competitionBonusKM';//竞赛加分
import healthknowledge from './healthknowledge';//健康知识
import classroomMonitoring from './classroomMonitoring';//课堂监控
import homeWork from './homeWork';//课后作业
import comprehensiveEvaluation from './comprehensiveEvaluation';//综合评价
import dataFiles from './dataFiles';//数据档案
import dataSubmission from './dataSubmission';//数据报送
import psychologicalAssessment from './psychologicalAssessment';//心理评测
import visionScreening from './visionScreening';//幼儿视力筛查

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: Login
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: Error404
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: Error403
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: Error500
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        {
            path: 'home',
            title: {i18n: 'home'},
            name: 'home_index',
            component: Home
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/page',
        icon: 'ios-paper',
        title: '首页',
        name: 'indexManage',
        component: Main,
        children: [
            {
                path: 'index',
                title: 'Page',
                name: 'page_index',
                component: Index
            }
        ]
    },
    ...baseConfig,
    ...physicalTest,
    ...visionTest,
    ...dataMonitoring,
    ...physicalSkill,
    ...physical,
    ...physicalHealth,
    ...competitionBonusKM,
    ...healthknowledge,
    ...classroomMonitoring,
    ...homeWork,
    ...comprehensiveEvaluation,
    ...dataFiles,
    ...dataSubmission,
    ...psychologicalAssessment,
    ...visionScreening,
];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
