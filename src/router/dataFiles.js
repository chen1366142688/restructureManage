import Main from '@/views/Main.vue';
export default [
    {
        path: '/healthRecordManage',
        icon: 'md-paper',
        name: 'healthRecordManage',
        title: '数据档案',
        parentCode: 'top_healthrecord',
        parentName: '数据档案',
        parentIcon: 'md-paper',
        component: Main,
        children: [
            {
                path: 'historyStudentData',
                icon: 'ios-list-box-outline',
                name: 'historyStudentData',
                title: '历史学生数据',
                component: resolve => {
                    require(['@/views/healthRecord/historyStudentData.vue'], resolve);
                }
            },
            {
                path: 'healthRecordStudent',
                icon: 'ios-list-box-outline',
                name: 'healthRecordStudent',
                title: '学生档案',
                component: resolve => {
                    require(['@/views/healthRecord/healthRecordStudent.vue'], resolve);
                }
            },
            {
                path: 'healthRecordDetail',
                icon: 'ios-list-box-outline',
                name: 'healthRecordDetail',
                title: '健康档案详情',
                component: resolve => {
                    require(['@/views/healthRecord/healthRecordDetail.vue'], resolve);
                }
            },
            {
                path: 'healthRecordDetailYN',
                icon: 'ios-list-box-outline',
                name: 'healthRecordDetailYN',
                title: '健康档案详情',
                component: resolve => {
                    require(['@/views/healthRecord/healthRecordDetailYN.vue'], resolve);
                }
            },
            {
                path: 'healthDetection',
                icon: 'ios-list-box-outline',
                name: 'healthDetection',
                title: '学生健康监测',
                component: resolve => {
                    require(['@/views/healthDetection/healthDetection.vue'], resolve);
                }
            },
            {
                path: 'dayList',
                icon: 'ios-list-box-outline',
                name: 'dayList',
                title: '学生健康监测列表',
                component: resolve => {
                    require(['@/views/healthDetection/dayList.vue'], resolve);
                }
            },
            {
                path: 'schoolDataReport',
                icon: 'ios-list-box-outline',
                name: 'schoolDataReport',
                title: '学校数据报告',
                component: resolve => {
                    require(['@/views/healthDetection/schoolDataReport.vue'], resolve);
                }
            },
            {
                path: 'childrenNCPDetailInfo',
                icon: 'ios-list-box-outline',
                name: 'childrenNCPDetailInfo',
                title: '学生健康监测报告',
                component: resolve => {
                    require(['@/views/healthDetection/childrenNCPDetailInfo.vue'], resolve);
                }
            },
            {
                path: 'dataFilesManage',
                icon: 'ios-list-box-outline',
                name: 'dataFilesManage',
                title: '历史数据',
                component: resolve => {
                    require(['@/views/healthDetection/dataFilesManage.vue'], resolve);
                }
            },
            {
                path: 'dataFilesGradeInfo',
                icon: 'ios-list-box-outline',
                name: 'dataFilesGradeInfo',
                title: '历史学期信息',
                component: resolve => {
                    require(['@/views/healthDetection/dataFilesGradeInfo.vue'], resolve);
                }
            },
            {
                path: 'hisStudentExempt',
                icon: 'ios-list-box-outline',
                name: 'hisStudentExempt',
                title: '历史学期免试列表',
                component: resolve => {
                    require(['@/views/datafiles/hisStudentExempt.vue'], resolve);
                }
            },
            {
                path: 'hisStudentExemptDetail',
                icon: 'ios-list-box-outline',
                name: 'hisStudentExemptDetail',
                title: '历史学期免试详情',
                component: resolve => {
                    require(['@/views/datafiles/hisStudentExemptDetail.vue'], resolve);
                }
            },
            {
                path: 'dataFilesScoreStudent',
                icon: 'ios-list-box-outline',
                name: 'dataFilesScoreStudent',
                title: '数据档案学生列表',
                component: resolve => {
                    require(['@/views/healthDetection/dataFilesScoreStudent.vue'], resolve);
                }
            },
            {
                path: 'dataFilesScoreStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'dataFilesScoreStudentDetail',
                title: '数据档案学生详情',
                component: resolve => {
                    require(['@/views/healthDetection/dataFilesScoreStudentDetail.vue'], resolve);
                }
            },
            {
                path: 'exportDataFilesStudnetTaskManage',
                icon: 'ios-list-box-outline',
                name: 'exportDataFilesStudnetTaskManage',
                title: '数据档案导入学生',
                component: resolve => {
                    require(['@/views/healthDetection/exportDataFilesStudnetTaskManage.vue'], resolve);
                }
            },
            {
                path: 'educationHistoryReport',
                icon: 'ios-list-box-outline',
                name: 'educationHistoryReport',
                title: '历史数据报送',
                component: resolve => {
                    require(['@/views/healthDetection/educationHistoryReport.vue'], resolve);
                }
            },
            {
                path: 'studentSubjectHisReportDetail',
                icon: 'ios-list-box-outline',
                name: 'studentSubjectHisReportDetail',
                title: '历史数据报送学生数据',
                component: resolve => {
                    require(['@/views/healthDetection/studentSubjectHisReportDetail.vue'], resolve);
                }
            },
            {
                path: 'actionStaminaGrade',
                icon: 'ios-list-box-outline',
                name: 'actionStaminaGrade',
                title: '技能体能历史年级数据',
                component: resolve => {
                    require(['@/views/healthDetection/actionStaminaGrade.vue'], resolve);
                }
            },
            {
                path: 'actionStaminaStudentList',
                icon: 'ios-list-box-outline',
                name: 'actionStaminaStudentList',
                title: '技能体能历史学生列表',
                component: resolve => {
                    require(['@/views/healthDetection/actionStaminaStudentList.vue'], resolve);
                }
            },
            {
                path: 'actionStaminaStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'actionStaminaStudentDetail',
                title: '技能体能历史学生详情',
                component: resolve => {
                    require(['@/views/healthDetection/actionStaminaStudentDetail.vue'], resolve);
                }
            },
            {
                path: 'actionStaminaRepair',
                icon: 'ios-list-box-outline',
                name: 'actionStaminaRepair',
                title: '技能体能历史学生补录',
                component: resolve => {
                    require(['@/views/healthDetection/actionStaminaRepair.vue'], resolve);
                }
            },
            {
                path: 'actionStaminaHisConfige',
                icon: 'ios-list-box-outline',
                name: 'actionStaminaHisConfige',
                title: '技能体能历史配置',
                component: resolve => {
                    require(['@/views/healthDetection/actionStaminaHisConfige.vue'], resolve);
                }
            },
            {
                path: 'actionStaminaConfigeChoose',
                icon: 'ios-list-box-outline',
                name: 'actionStaminaConfigeChoose',
                title: '技能体能历史配置选择',
                component: resolve => {
                    require(['@/views/healthDetection/actionStaminaConfigeChoose.vue'], resolve);
                }
            },
            {
                path: 'hisExerciseManageClass',
                icon: 'ios-list-box-outline',
                name: 'hisExerciseManageClass',
                title: '历史学期课后作业按班级管理',
                component: resolve => { require(['@/views/datafiles/hisExerciseManageClass.vue'], resolve); }
            },
            {
                path: 'hisExerciseManageStudent',
                icon: 'ios-list-box-outline',
                name: 'hisExerciseManageStudent',
                title: '历史学期课后作业按学生管理',
                component: resolve => { require(['@/views/datafiles/hisExerciseManageStudent.vue'], resolve); }
            },
            {
                path: 'hisExerciseStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'hisExerciseStudentDetail',
                title: '历史学期课后作业学生详情',
                component: resolve => { require(['@/views/datafiles/hisExerciseStudentDetail.vue'], resolve); }
            },
            {
                path: 'hisExerciseMakeUpManage',
                icon: 'ios-list-box-outline',
                name: 'hisExerciseMakeUpManage',
                title: '历史学期课后作业按学生补录',
                component: resolve => { require(['@/views/datafiles/hisExerciseMakeUpManage.vue'], resolve); }
            },
            {
                path: 'hisStudyLearningManage',
                icon: 'ios-list-box-outline',
                name: 'hisStudyLearningManage',
                title: '历史学期课后作业按学生补录',
                component: resolve => { require(['@/views/datafiles/hisStudyLearningManage.vue'], resolve); }
            },
            {
                path: 'hisStudyLearningStudent',
                icon: 'ios-list-box-outline',
                name: 'hisStudyLearningStudent',
                title: '历史学期课后作业学习态度详情',
                component: resolve => { require(['@/views/datafiles/hisStudyLearningStudent.vue'], resolve); }
            },
            {
                path: 'hisPaperScoreManage',
                icon: 'ios-list-box-outline',
                name: 'hisPaperScoreManage',
                title: '历史学期健康知识管理',
                component: resolve => { require(['@/views/datafiles/hisPaperScoreManage.vue'], resolve); }
            },
            {
                path: 'hisPaperClassResults',
                icon: 'ios-list-box-outline',
                name: 'hisPaperClassResults',
                title: '历史学期健康知识详情',
                component: resolve => { require(['@/views/datafiles/hisPaperClassResults.vue'], resolve); }
            },
            {
                path: 'hisHealthScoreTaskManage',
                icon: 'ios-list-box-outline',
                name: 'hisHealthScoreTaskManage',
                title: '健康知识导入',
                component: resolve => { require(['@/views/datafiles/hisHealthScoreTaskManage.vue'], resolve); }
            },
            {
                path: 'hisPaperEntryResults',
                icon: 'ios-list-box-outline',
                name: 'hisPaperEntryResults',
                title: '历史学期健康知识详情',
                component: resolve => { require(['@/views/datafiles/hisPaperEntryResults.vue'], resolve); }
            },
            {
                path: 'hisActivityClassList',
                icon: 'ios-list-box-outline',
                name: 'hisActivityClassList',
                title: '历史学期体质测试班级管理',
                component: resolve => { require(['@/views/datafiles/hisActivityClassList.vue'], resolve); }
            },
            {
                path: 'hisActivityStudentList',
                icon: 'ios-list-box-outline',
                name: 'hisActivityStudentList',
                title: '历史学期体质测试学生管理',
                component: resolve => { require(['@/views/datafiles/hisActivityStudentList.vue'], resolve); }
            },
            {
                path: 'hisActivityClassTestDetail',
                icon: 'ios-list-box-outline',
                name: 'hisActivityClassTestDetail',
                title: '历史学期体质测试学生管理',
                component: resolve => { require(['@/views/datafiles/hisActivityClassTestDetail.vue'], resolve); }
            },
            {
                path: 'hisVisionManage',
                icon: 'ios-list-box-outline',
                name: 'hisVisionManage',
                title: '视力测试管理',
                component: resolve => { require(['@/views/datafiles/visionManage/hisVisionManage/hisVisionManage.vue'], resolve); }
            },
            {
                path: 'hisVisionManageDetail',
                icon: 'ios-list-box-outline',
                name: 'hisVisionManageDetail',
                title: '视力测试管理列表',
                component: resolve => { require(['@/views/datafiles/visionManage/hisVisionManageDetail/hisVisionManageDetail.vue'], resolve); }
            },
            {
                path: 'hisPhysicalTestImport',
                icon: 'ios-list-box-outline',
                name: 'hisPhysicalTestImport',
                title: '数据档案-历史数据-体测信息导入',
                component: resolve => { require(['@/views/public/commonImport/dataFiles/physicalTest.vue'], resolve); }
            }
        ]
    }
]