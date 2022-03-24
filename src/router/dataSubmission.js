import Main from '@/views/Main.vue';
export default [
  {
    path: '/dataReport',
    icon: 'md-mail',
    name: 'dataReport',
    title: '国网数据报送',
    parentCode: 'top_dataReport',
    parentName: '数据报送',
    parentIcon: 'md-mail',
    component: Main,
    children: [
      {
        path: 'reportStudentManage',
        icon: 'ios-list-box-outline',
        name: 'reportStudentManage',
        title: '国网学生管理',
        component: resolve => {
          require(['@/views/dataReport/reportStudentManage.vue'], resolve);
        }
      },
      {
        path: 'nationReport',
        icon: 'ios-list-box-outline',
        name: 'nationReport',
        title: '体质健康数据上报',
        component: resolve => {
          require(['@/views/dataReport/nationReport.vue'], resolve);
        }
      },
      {
        path: 'importStudentInfo',
        icon: 'ios-list-box-outline',
        name: 'importStudentInfo',
        title: '初始数据导入',
        component: resolve => {
          require(['@/views/dataReport/importStudentInfo.vue'], resolve);
        }
      },
      {
        path: 'importStudentInfoNow',
        icon: 'ios-list-box-outline',
        name: 'importStudentInfoNow',
        title: '初始数据导入',
        component: resolve => {
          require(['@/views/dataReport/importStudentInfoNow.vue'], resolve);
        }
      },
      {
        path: 'nationReportDetail',
        icon: 'ios-list-box-outline',
        name: 'nationReportDetail',
        title: '体质健康数据上报详情',
        component: resolve => {
          require(['@/views/dataReport/nationReportDetail.vue'], resolve);
        }
      },
      {
        path: 'studentSubjectReportDetail',
        icon: 'ios-list-box-outline',
        name: 'studentSubjectReportDetail',
        title: '学生成绩详情',
        component: resolve => {
          require(['@/views/dataReport/studentSubjectReportDetail.vue'], resolve);
        }
      },
      {
        path: 'semesterReportedBaseDetail',
        icon: 'ios-list-box-outline',
        name: 'semesterReportedBaseDetail',
        title: '基础数据上报详情',
        component: resolve => {
          require(['@/views/dataReport/semesterReportedBaseDetail.vue'], resolve);
        }
      },
      {
        path: 'parentReportChangeStudent',
        icon: 'ios-list-box-outline',
        name: 'parentReportChangeStudent',
        title: '成绩变动学生',
        component: resolve => {
          require(['@/views/dataReport/parentReportChangeStudent.vue'], resolve);
        }
      },
      {
        path: 'fixErrorData',
        icon: 'ios-list-box-outline',
        name: 'fixErrorData',
        title: '有误成绩修正',
        component: resolve => {
          require(['@/views/dataReport/fixErrorData.vue'], resolve);
        }
      },
      {
        path: 'parentReportYN',
        icon: 'ios-list-box-outline',
        name: 'parentReportYN',
        title: '家长端成绩推送',
        component: resolve => {
          require(['@/views/dataReport/parentReportYN.vue'], resolve);
        }
      },
      {
        path: 'parentReportStudentDetailYN',
        icon: 'ios-list-box-outline',
        name: 'parentReportStudentDetailYN',
        title: '家长端成绩推送成绩详情',
        component: resolve => {
          require(['@/views/dataReport/parentReportStudentDetailYN.vue'], resolve);
        }
      }

    ]
  },
  {
    path: '/eductionDataReport',
    icon: 'ios-mail-open-outline',
    name: 'eductionDataReport',
    title: '教育局数据报送',
    parentCode: 'top_dataReport',
    parentName: '数据报送',
    parentIcon: 'ios-mail-open-outline',
    component: Main,
    children: [
      {
        path: 'ecucationReport',
        icon: 'ios-list-box-outline',
        name: 'ecucationReport',
        title: '老教育局上报',
        component: resolve => {
          require(['@/views/dataReport/educationReport.vue'], resolve);
        }
      },
      {
        path: 'physicalTestReport',
        icon: 'ios-list-box-outline',
        name: 'physicalTestReport',
        title: '体质测试上报',
        component: resolve => {
          require(['@/views/dataReport/eductionDataReport/physicalTestReport.vue'], resolve);
        }
      },
      {
        path: 'physicalTestStudentDetail',
        icon: 'ios-list-box-outline',
        name: 'physicalTestStudentDetail',
        title: '学生体测成绩详情',
        component: resolve => {
          require(['@/views/dataReport/studentResultDetail/physicalTestStudentDetail.vue'], resolve);
        }
      },
      {
        path: 'visionTestReport',
        icon: 'ios-list-box-outline',
        name: 'visionTestReport',
        title: '视力测试上报',
        component: resolve => {
          require(['@/views/dataReport/eductionDataReport/visionTestReport.vue'], resolve);
        }
      },
      {
        path: 'visionTestStudentDetail',
        icon: 'ios-list-box-outline',
        name: 'visionTestStudentDetail',
        title: '学生视力成绩详情',
        component: resolve => {
          require(['@/views/dataReport/studentResultDetail/visionTestStudentDetail.vue'], resolve);
        }
      },
      {
        path: 'subjectEvaluationReport',
        icon: 'ios-list-box-outline',
        name: 'subjectEvaluationReport',
        title: '学科评价上报',
        component: resolve => {
          require(['@/views/dataReport/eductionDataReport/subjectEvaluationReport.vue'], resolve);
        }
      },
      {
        path: 'subjectEvaluationStudentDetail',
        icon: 'ios-list-box-outline',
        name: 'subjectEvaluationStudentDetail',
        title: '学生学科评价成绩详情',
        component: resolve => {
          require(['@/views/dataReport/studentResultDetail/subjectEvaluationStudentDetail.vue'], resolve);
        }
      },
      {
        path: 'baseDataReport',
        icon: 'ios-list-box-outline',
        name: 'baseDataReport',
        title: '基础数据上报',
        component: resolve => {
          require(['@/views/dataReport/eductionDataReport/baseDataReport.vue'], resolve);
        }
      },
      {
        path: 'parentReport',
        icon: 'ios-list-box-outline',
        name: 'parentReport',
        title: '家长端成绩推送',
        component: resolve => {
          require(['@/views/dataReport/parentReport.vue'], resolve);
        }
      },
      {
        path: 'editAuthority',
        icon: 'ios-list-box-outline',
        name: 'editAuthority',
        title: '编辑权限申请',
        component: resolve => {
          require(['@/views/dataReport/editAuthority/editAuthority.vue'], resolve);
        }
      },
      {
        path: 'visionStudentReportPage',
        icon: 'ios-list-box-outline',
        name: 'visionStudentReportPage',
        title: '上报学生导入',
        component: resolve => {
          require(['@/views/dataReport/visionStudentReportPage.vue'], resolve);
        }
      },
    ]
  }
]