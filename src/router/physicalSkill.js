import Main from '@/views/Main.vue';
export default [
  {
    path: '/examManage',
    icon: 'md-clipboard',
    name: 'examManage',
    title: '技能/体能',
    parentCode: 'top_skills',
    parentName: '技能/体能',
    parentIcon: 'md-clipboard',
    component: Main,
    children: [
        {
            path: 'examExemptStudent',
            icon: 'ios-list-box-outline',
            name: 'examExemptStudent',
            title: '免试管理',
            component: resolve => {
                require(['@/views/exam/examExemptStudent.vue'], resolve);
            }
        },
        {
            path: 'examExemptDetail',
            icon: 'ios-list-box-outline',
            name: 'examExemptDetail',
            title: '中小学免试详情',
            component: resolve => {
                require(['@/views/exam/examExemptDetail.vue'], resolve);
            }
        },
        {
            path: 'highStudentExemptDetail',
            icon: 'ios-list-box-outline',
            name: 'highStudentExemptDetail',
            title: '高中免试详情',
            component: resolve => {
                require(['@/views/cd/highSchool/sportsClass/highStudentExemptDetail.vue'], resolve);
            }
        },
        {
            path: 'examItemManage',
            icon: 'ios-list-box-outline',
            name: 'examItemManage',
            title: '考核项目列表',
            component: resolve => {
                require(['@/views/exam/examItemManage.vue'], resolve);
            }
        },
        {
            path: 'examItemClassList',
            icon: 'ios-list-box-outline',
            name: 'examItemClassList',
            title: '考核项目配置',
            component: resolve => {
                require(['@/views/examManage/examItemClassList.vue'], resolve);
            }
        },
        {
            path: 'examItemDetail',
            icon: 'ios-list-box-outline',
            name: 'examItemDetail',
            title: '项目详情',
            component: resolve => {
                require(['@/views/exam/examItemDetail.vue'], resolve);
            }
        },
        {
            path: 'examStandardDetail',
            icon: 'ios-list-box-outline',
            name: 'examStandardDetail',
            title: '项目标准详情',
            component: resolve => {
                require(['@/views/exam/examStandardDetail.vue'], resolve);
            }
        },
        {
            path: 'examSupplement',
            icon: 'ios-list-box-outline',
            name: 'examSupplement',
            title: '补考管理',
            component: resolve => {
                require(['@/views/examManage/examSupplement.vue'], resolve);
            }
        },
        {
            path: 'classExamManage',
            icon: 'ios-list-box-outline',
            name: 'classExamManage',
            title: '班级学生成绩',
            component: resolve => {
                require(['@/views/examManage/classExamManage.vue'], resolve);
            }
        },
        {
            path: 'studentExamDetail',
            icon: 'ios-list-box-outline',
            name: 'studentExamDetail',
            title: '学生测试成绩详情',
            component: resolve => {
                require(['@/views/examManage/studentExamDetail.vue'], resolve);
            }
        },
        {
            path: 'studentExamDetail1',
            icon: 'ios-list-box-outline',
            name: 'studentExamDetail1',
            title: '学生测试成绩详情',
            component: resolve => {
                require(['@/views/healthKonowledge/studentExamDetail.vue'], resolve);
            }
        },
        {
            path: 'studentExamDetailYN',
            icon: 'ios-list-box-outline',
            name: 'studentExamDetailYN',
            title: '学生测试成绩详情',
            component: resolve => {
                require(['@/views/healthKonowledge/studentExamDetailYN.vue'], resolve);
            }
        },
        {
            path: 'examItemconfigure',
            icon: 'ios-list-box-outline',
            name: 'examItemconfigure',
            title: '配置考核项目',
            component: resolve => {
                require(['@/views/examManage/examItemconfigure.vue'], resolve);
            }
        },
        {
            path: 'examManageAnalyze',
            icon: 'ios-list-box-outline',
            name: 'examManageAnalyze',
            title: '技能/体能分析',
            component: resolve => {
                require(['@/views/scorechange/skillsAssessment.vue'], resolve);
            }
        }

    ]
},
{
    path: '/examinationItemAllocationKM',
    icon: 'md-clipboard',
    name: 'examinationItemAllocationKM',
    title: '考试项目配置',
    parentCode: 'top_skills',
    parentName: '技能/体能',
    parentIcon: 'md-clipboard',
    component: Main,
    children: [
        {
            path: 'examinationAllocationKM',
            icon: 'ios-list-box-outline',
            name: 'examinationAllocationKM',
            title: '考试管理',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examinationAllocation/index.vue'], resolve);
            }
        },
        {
            path: 'administrationManageKM',
            icon: 'ios-list-box-outline',
            name: 'administrationManageKM',
            title: '项目详情',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examinationAllocation/administrationManage.vue'], resolve);
            }
        },
        {
            path: 'configurationKM',
            icon: 'ios-list-box-outline',
            name: 'configurationKM',
            title: '考试时间管理',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examinationAllocation/configuration.vue'], resolve);
            }
        }
    ]
},
{
    path: '/examinationItemManagesKM',
    icon: 'md-paper',
    name: 'examinationItemManagesKM',
    title: '运动技能数据管理',
    parentCode: 'top_skills',
    parentName: '技能/体能',
    parentIcon: 'md-clipboard',
    component: Main,
    children: [
        {
            path: 'studentDataManageKM',
            icon: 'ios-list-box-outline',
            name: 'studentDataManageKM',
            title: '学生数据管理',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examDataManageHigh/studentDataManage.vue'], resolve);
            }
        },
        {
            path: 'queryClassDataKM',
            icon: 'ios-list-box-outline',
            name: 'queryClassDataKM',
            title: '班级数据查询',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examDataManageHigh/queryClassData.vue'], resolve);
            }
        },
        {
            path: 'queryGradeDataKM',
            icon: 'ios-list-box-outline',
            name: 'queryGradeDataKM',
            title: '年级数据查询',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examDataManageHigh/queryGradeData.vue'], resolve);
            }
        },
        {
            path: 'queryProjectDataKM',
            icon: 'ios-list-box-outline',
            name: 'queryProjectDataKM',
            title: '项目数据查询',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examDataManageHigh/queryProjectData.vue'], resolve);
            }
        },
        {
            path: 'studentMsgKM',
            icon: 'ios-list-box-outline',
            name: 'studentMsgKM',
            title: '学生数据详情',
            component: resolve => {
                require(['@/views/km/examinationItemAllocation/examDataManageHigh/studentMsg.vue'], resolve);
            }
        },
        {
          path: 'exportDataKM',
          icon: 'ios-list-box-outline',
          name: 'exportDataKM',
          title: '导入配置',
          component: resolve => {
              require(['@/components/exportsProject/index.vue'], resolve);
          }
        }
    ]
},
{
  path: '/practice',
  icon: 'md-copy',
  name: 'practice',
  title: '模拟考试管理',
  parentCode: 'top_skills',
  parentName: '技能/体能',
  parentIcon: 'md-clipboard',
  component: Main,
  children: [
      {
          path: 'customTest',
          icon: 'ios-list-box-outline',
          name: 'customTest',
          title: '自定义项目测试',
          component: resolve => {
              require(['@/views/practiceTest/customTest/customTest.vue'], resolve);
          }
      },
      {
          path: 'studentCustomTestDataMsg',
          icon: 'ios-list-box-outline',
          name: 'studentCustomTestDataMsg',
          title: '学生详情',
          component: resolve => {
              require(['@/views/practiceTest/customTest/studentDataMsg.vue'], resolve);
          }
      },
      {
          path: 'customConfig',
          icon: 'ios-list-box-outline',
          name: 'customConfig',
          title: '自定义项目配置',
          component: resolve => {
              require(['@/views/practiceTest/customTest/customConfig.vue'], resolve);
          }
      },
      {
          path: 'addcustomtest',
          icon: 'ios-list-box-outline',
          name: 'addcustomtest',
          title: '新增自定义项目测试',
          component: resolve => {
              require(['@/views/practiceTest/customTest/addCustomTest.vue'], resolve);
          }
      },
      {
          path: 'customStudentmanage',
          icon: 'ios-list-box-outline',
          name: 'customStudentmanage',
          title: '项目学生管理',
          component: resolve => {
              require(['@/views/practiceTest/customTest/studentManage.vue'], resolve);
          }
      },
      {
          path: 'customStudentitemmanage',
          icon: 'ios-list-box-outline',
          name: 'customStudentitemmanage',
          title: '具体项目学生管理',
          component: resolve => {
              require(['@/views/practiceTest/customTest/studentItemManage.vue'], resolve);
          }
      },
      {
          path: 'lookcustomtest',
          icon: 'ios-list-box-outline',
          name: 'lookcustomtest',
          title: '测试数据查看',
          component: resolve => {
              require(['@/views/practiceTest/customTest/lookCustomTest.vue'], resolve);
          }
      },
      {
          path: 'lookcustomtestdetail',
          icon: 'ios-list-box-outline',
          name: 'lookcustomtestdetail',
          title: '测试数据查看详情',
          component: resolve => {
              require(['@/views/practiceTest/customTest/lookCustomTestDetail.vue'], resolve);
          }
      },
      
      {
        path: 'middleTest',
        icon: 'ios-list-box-outline',
        name: 'middleTest',
        title: '中考模拟',
        component: resolve => {
            require(['@/views/practiceTest/middleTest/middleTest.vue'], resolve);
        }
    },
    {
      path: 'middleTestStudentDataMsg',
      icon: 'ios-list-box-outline',
      name: 'middleTestStudentDataMsg',
      title: '学生详情',
      component: resolve => {
          require(['@/views/practiceTest/middleTest/studentDataMsg.vue'], resolve);
      }
  },
    {
        path: 'addmiddletest',
        icon: 'ios-list-box-outline',
        name: 'addmiddletest',
        title: '新增中考模拟',
        component: resolve => {
            require(['@/views/practiceTest/middleTest/addMiddleTest.vue'], resolve);
        }
    },
    
    {
        path: 'middleStudentmanage',
        icon: 'ios-list-box-outline',
        name: 'middleStudentmanage',
        title: '项目学生管理',
        component: resolve => {
            require(['@/views/practiceTest/middleTest/studentManage.vue'], resolve);
        }
    },
    {
        path: 'middleStudentitemmanage',
        icon: 'ios-list-box-outline',
        name: 'middleStudentitemmanage',
        title: '具体项目学生管理',
        component: resolve => {
            require(['@/views/practiceTest/middleTest/studentItemManage.vue'], resolve);
        }
    },
    {
        path: 'lookmiddletest',
        icon: 'ios-list-box-outline',
        name: 'lookmiddletest',
        title: '测试数据查看',
        component: resolve => {
            require(['@/views/practiceTest/middleTest/lookMiddleTest.vue'], resolve);
        }
    },
    {
        path: 'lookmiddleTestdetail',
        icon: 'ios-list-box-outline',
        name: 'lookmiddleTestdetail',
        title: '测试数据查看详情',
        component: resolve => {
            require(['@/views/practiceTest/middleTest/lookMiddleTestDetail.vue'], resolve);
        }
    },
  ]
},
{
  path: '/examDataManage',
  icon: 'md-paper',
  name: 'examDataManage',
  title: '技能/体能数据管理',
  parentCode: 'top_skills',
  parentName: '技能/体能',
  parentIcon: 'md-clipboard',
  component: Main,
  children: [
      {
          path: 'examQueryStudent',
          icon: 'ios-list-box-outline',
          name: 'examQueryStudent',
          title: '按学生查询',
          component: resolve => {
              require(['@/views/examData/examQueryStudent.vue'], resolve);
          }
      },
      {
          path: 'examActionStaminaRepair',
          icon: 'ios-list-box-outline',
          name: 'examActionStaminaRepair',
          title: '技能体能成绩录入',
          component: resolve => {
              require(['@/views/examData/examActionStaminaRepair.vue'], resolve);
          }
      },
      {
          path: 'examQueryClass',
          icon: 'ios-list-box-outline',
          name: 'examQueryClass',
          title: '按班级查询',
          component: resolve => {
              require(['@/views/examData/examQueryClass.vue'], resolve);
          }
      },
      {
          path: 'examQueryGrade',
          icon: 'ios-list-box-outline',
          name: 'examQueryGrade',
          title: '按年级查询',
          component: resolve => {
              require(['@/views/examData/examQueryGrade.vue'], resolve);
          }
      },
      {
          path: 'examQueryExamClassTest',
          icon: 'ios-list-box-outline',
          name: 'examQueryExamClassTest',
          title: '按考核项目查询',
          component: resolve => {
              require(['@/views/examData/examQueryExamClassTest.vue'], resolve);
          }
      },
      {
          path: 'examQueryStudentYN',
          icon: 'ios-list-box-outline',
          name: 'examQueryStudentYN',
          title: '学生数据管理',
          component: resolve => {
              require(['@/views/examData/examQueryStudentYN.vue'], resolve);
          }
      },
      {
          path: 'examQueryClassYN',
          icon: 'ios-list-box-outline',
          name: 'examQueryClassYN',
          title: '班级数据查询',
          component: resolve => {
              require(['@/views/examData/examQueryClassYN.vue'], resolve);
          }
      },
      {
          path: 'examQueryGradeYN',
          icon: 'ios-list-box-outline',
          name: 'examQueryGradeYN',
          title: '年级数据查询',
          component: resolve => {
              require(['@/views/examData/examQueryGradeYN.vue'], resolve);
          }
      },
      {
          path: 'examQueryExamClassTestYN',
          icon: 'ios-list-box-outline',
          name: 'examQueryExamClassTestYN',
          title: '项目数据查询',
          component: resolve => {
              require(['@/views/examData/examQueryExamClassTestYN.vue'], resolve);
          }
      }
  ]
  },
  {
    path: '/examManageCD',
    icon: 'md-clipboard',
    name: 'examManageCD',
    title: '运动技能',
    parentCode: 'top_skills',
    parentName: '运动技能',
    parentIcon: 'md-clipboard',
    component: Main,
    children: [
        {
            path: 'skillItemListManage',
            icon: 'ios-list-box-outline',
            name: 'skillItemListManage',
            title: '技能项目列表',
            component: resolve => {
                require(['@/views/cd/highSchool/skills/skillItemListManage.vue'], resolve);
            }
        },
        {
            path: 'skillItemConfiguration',
            icon: 'ios-list-box-outline',
            name: 'skillItemConfiguration',
            title: '技能项目配置',
            component: resolve => {
                require(['@/views/cd/highSchool/skills/skillItemConfiguration.vue'], resolve);
            }
        },
        {
            path: 'skillItemConfigurationDetail',
            icon: 'ios-list-box-outline',
            name: 'skillItemConfigurationDetail',
            title: '技能项目配置',
            component: resolve => {
                require(['@/views/cd/highSchool/skills/skillItemConfigurationDetail.vue'], resolve);
            }
        },
        {
            path: 'learningAttitudeManage',
            icon: 'ios-list-box-outline',
            name: 'learningAttitudeManage',
            title: '学习态度管理',
            component: resolve => {
                require(['@/views/cd/highSchool/learningAttitude/learningAttitudeManage.vue'], resolve);
            }
        },
        {
            path: 'schoolExerciseManage',
            icon: 'ios-list-box-outline',
            name: 'schoolExerciseManage',
            title: '课外锻炼管理',
            component: resolve => {
                require(['@/views/cd/highSchool/skills/afterSchool/schoolExerciseManage.vue'], resolve);
            }
        },
        {
            path: 'schoolExerciseManageDetail',
            icon: 'ios-list-box-outline',
            name: 'schoolExerciseManageDetail',
            title: '课外锻炼管理详情',
            component: resolve => {
                require(['@/views/cd/highSchool//skills/afterSchool/schoolExerciseManageDetail.vue'], resolve);
            }
        },
        {
            path: 'schoolExerciseRecordingManage',
            icon: 'ios-list-box-outline',
            name: 'schoolExerciseRecordingManage',
            title: '课外锻炼录入',
            component: resolve => {
                require(['@/views/cd/highSchool//skills/afterSchool/schoolExerciseRecordingManage.vue'], resolve);
            }
        },
        {
            path: 'learningAttitudeHis',
            icon: 'ios-list-box-outline',
            name: 'learningAttitudeHis',
            title: '学习态度记录',
            component: resolve => {
                require(['@/views/cd/highSchool/learningAttitude/learningAttitudeHis.vue'], resolve);
            }

        }

    ]
},
{
    path: '/examDataManageHigh',
    icon: 'md-paper',
    name: 'examDataManageHigh',
    title: '运动技能数据管理',
    parentCode: 'top_skills',
    parentName: '运动技能',
    parentIcon: 'md-clipboard',
    component: Main,
    children: [
        {
            path: 'examQueryStudentHigh',
            icon: 'ios-list-box-outline',
            name: 'examQueryStudentHigh',
            title: '按学生查询',
            component: resolve => {
                require(['@/views/cd/highSchool/skillData/examQueryStudent.vue'], resolve);
            }
        },
        {
            path: 'studentExamDetailHighCD',
            icon: 'ios-list-box-outline',
            name: 'studentExamDetailHighCD',
            title: '学生详情',
            component: resolve => {
                require(['@/views/cd/highSchool/skillData/studentExamDetail.vue'], resolve);
            }
        },
        {
            path: 'examQueryExamClassTestHigh',
            icon: 'ios-list-box-outline',
            name: 'examQueryExamClassTestHigh',
            title: '按项目查询',
            component: resolve => {
                require(['@/views/cd/highSchool/skillData/examQueryExamClassTest.vue'], resolve);
            }
        }
    ]
}
]