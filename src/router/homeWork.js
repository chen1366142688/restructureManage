import Main from '@/views/Main.vue';
export default [
    {
        path: '/exerciseFamily',
        icon: 'md-basketball',
        name: 'exerciseFamily',
        title: '课后作业',
        parentCode: 'top_exercise',
        parentName: '课后作业',
        parentIcon: 'md-basketball',
        component: Main,
        children: [
            {
                path: 'exerciseFamilyStandard',
                icon: 'ios-list-box-outline',
                name: 'exerciseFamilyStandard',
                title: '课后作业标准配置',
                component: resolve => {
                    require(['@/views/exerciseFamily/exerciseFamilyStandard.vue'], resolve);
                }
            },
            {
              path: 'vacationConfiguration',
              icon: 'ios-list-box-outline',
              name: 'vacationConfiguration',
              title: '假期课后作业配置',
              component: resolve => {
                  require(['@/views/exerciseFamily/vacationConfiguration.vue'], resolve);
              }
          },
            {
                path: 'exercisePlanList',
                icon: 'ios-list-box-outline',
                name: 'exercisePlanList',
                title: '锻炼计划管理',
                component: resolve => {
                    require(['@/views/exerciseFamily/exercisePlanList.vue'], resolve);
                }
            },
            {
                path: 'exercisePlanDetail',
                icon: 'ios-list-box-outline',
                name: 'exercisePlanDetail',
                title: '锻炼计划详情',
                component: resolve => {
                    require(['@/views/exerciseFamily/exercisePlanDetail.vue'], resolve);
                }
            },
            {
                path: 'exciseSchoolDetail',
                icon: 'ios-list-box-outline',
                name: 'exciseSchoolDetail',
                title: '锻炼计划详情',
                component: resolve => {
                    require(['@/views/exerciseFamily/exciseSchoolDetail.vue'], resolve);
                }
            },
            {
                path: 'studentExerciseHis',
                icon: 'ios-list-box-outline',
                name: 'studentExerciseHis',
                title: '锻炼记录监控',
                component: resolve => {
                    require(['@/views/exerciseFamily/studentExerciseHis.vue'], resolve);
                }
            },
            {
                path: 'studentExerciseHisDetail',
                icon: 'ios-list-box-outline',
                name: 'studentExerciseHisDetail',
                title: '锻炼记录监控详情',
                component: resolve => {
                    require(['@/views/exerciseFamily/studentExerciseHisDetail.vue'], resolve);
                }
            },
            {
                path: 'studentExerciseManage',
                icon: 'ios-list-box-outline',
                name: 'studentExerciseManage',
                title: '学生锻炼管理',
                component: resolve => {
                    require(['@/views/exerciseFamily/studentExerciseManage.vue'], resolve);
                }
            },
            {
                path: 'exerciseComboList',
                icon: 'ios-list-box-outline',
                name: 'exerciseComboList',
                title: '作业标准配置',
                component: resolve => {
                    require(['@/views/exerciseFamily/exerciseComboList.vue'], resolve);
                }
            },
            {
                path: 'exerciseComboDetail',
                icon: 'ios-list-box-outline',
                name: 'exerciseComboDetail',
                title: '作业标准配置',
                component: resolve => {
                    require(['@/views/exerciseFamily/exerciseComboDetail.vue'], resolve);
                }
            },
            {
                path: 'exerciseFamilyStandardSingle',
                icon: 'ios-list-box-outline',
                name: 'exerciseFamilyStandardSingle',
                title: '课后作业标准配置',
                component: resolve => {
                    require(['@/views/exerciseFamily/exerciseFamilyStandardSingle.vue'], resolve);
                }
            },
            {
                path: 'homeworkRecord',
                icon: 'ios-list-box-outline',
                name: 'homeworkRecord',
                title: '课后作业考核录入',
                component: resolve => {
                    require(['@/views/exerciseFamily/homeworkRecord.vue'], resolve);
                }
            },
            {
                path: 'familyExerciseAnalyze',
                icon: 'ios-list-box-outline',
                name: 'familyExerciseAnalyze',
                title: '课后作业分析',
                component: resolve => {
                    require(['@/views/dataAnalyze/familyExerciseAnalyze.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/exerciseManage',
        icon: 'ios-clock-outline',
        name: 'exerciseManage',
        title: '锻炼数据管理',
        parentCode: 'top_exercise',
        parentName: '课后作业',
        parentIcon: 'ios-basketball-outline',
        component: Main,
        children: [
            {
                path: 'exerciseManageDate',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageDate',
                title: '按日期查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageDate.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageStudent',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageStudent',
                title: '按学生查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageStudent.vue'], resolve);
                }
            },
            {
                path: 'additionalRecordingStudentManage',
                icon: 'ios-list-box-outline',
                name: 'additionalRecordingStudentManage',
                title: '课后作业补录',
                component: resolve => {
                    require(['@/views/exerciseManage/additionalRecordingStudentManage.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageClass',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageClass',
                title: '按班级查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageClass.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageGrade',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageGrade',
                title: '按年级查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageGrade.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageStudentDetail',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageStudentDetail',
                title: '学生锻炼详情',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageStudentDetail.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageDateDetail',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageDateDetail',
                title: '锻炼数据管理',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageDateDetail.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageStudentSingle',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageStudentSingle',
                title: '按学生查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageStudentSingle.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageClassSingle',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageClassSingle',
                title: '按班级查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageClassSingle.vue'], resolve);
                }
            },
            {
                path: 'exerciseManageGradeSingle',
                icon: 'ios-list-box-outline',
                name: 'exerciseManageGradeSingle',
                title: '按年级查询',
                component: resolve => {
                    require(['@/views/exerciseManage/exerciseManageGradeSingle.vue'], resolve);
                }
            }
        ]
    }
]