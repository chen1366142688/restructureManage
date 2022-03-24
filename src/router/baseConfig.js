import Main from '@/views/Main.vue';
export default [
  {
      path: '/group',
      icon: 'md-cog',
      name: 'baseConfig',
      title: '系统配置',
      parentCode: 'top_config',
      parentName: '基础配置',
      parentIcon: 'md-cog',
      component: Main,
      children: [
        {
            path: 'systemBaseConfig',
            icon: 'ios-list-box-outline',
            name: 'systemBaseConfig',
            title: '系统标准配置',
            component: resolve => {
                require(['@/views/organManage/systemBaseConfig.vue'], resolve);
            }
        },
        {
            path: 'semesterStandard',
            icon: 'ios-list-box-outline',
            name: 'semesterStandard',
            title: '学期标准配置',
            component: resolve => {
                require(['@/views/organManage/semesterStandard.vue'], resolve);
            }
        },
        {
            path: 'schoolSportsStandard',
            icon: 'ios-list-box-outline',
            name: 'schoolSportsStandard',
            title: '体育素质综合评价考核配置',
            component: resolve => {
                require(['@/views/sportconfig/schoolSportsStandard.vue'], resolve);
            }
        },
        {
            path: 'schoolSportsStandardCD',
            icon: 'ios-list-box-outline',
            name: 'schoolSportsStandardCD',
            title: '体育素质综合评价考核配置',
            component: resolve => {
                require(['@/views/sportconfig/schoolSportsStandardCD.vue'], resolve);
            }
        },
        {
            path: 'schoolSportsStandardKM',
            icon: 'ios-list-box-outline',
            name: 'schoolSportsStandardKM',
            title: '中考成绩评价标准',
            component: resolve => {
                require(['@/views/sportconfig/schoolSportsStandardKM.vue'], resolve);
            }
        },
        {
            path: 'schoolDataManageAdmin',
            icon: 'ios-list-box-outline',
            name: 'schoolDataManageAdmin',
            title: '数据清除管理',
            component: resolve => {
                require(['@/views/sportconfig/schoolDataManageAdmin.vue'], resolve);
            }
        },
        {
            path: 'appraisalDescription',
            icon: 'ios-list-box-outline',
            name: 'appraisalDescription',
            title: '体育素质综合评价考核说明',
            component: resolve => {
                require(['@/views/sportconfig/appraisalDescription.vue'], resolve);
            }
        },
        {
            path: 'uploadAndDownload',
            icon: 'ios-list-box-outline',
            name: 'uploadAndDownload',
            title: '文件传输管理',
            component: resolve => {
                require(['@/views/sportconfig/uploadAndDownload.vue'], resolve);
            }
        }
      ]
  },
  {
      path: '/schoolManage',
      icon: 'ios-home',
      name: 'schoolManage',
      title: '学校管理',
      parentCode: 'top_config',
      parentName: '基础配置',
      parentIcon: 'ios-settings-outline',
      component: Main,
      children: [
          {
              path: 'organManage',
              icon: 'ios-list-box-outline',
              name: 'organManage',
              title: '学校信息',
              component: resolve => {
                  require(['@/views/organManage/organInfo.vue'], resolve);
              }
          },
          {
              path: 'organInfoOrgan',
              icon: 'ios-list-box-outline',
              name: 'organInfoOrgan',
              title: '机构首页',
              component: resolve => {
                  require(['@/views/organManage/organInfoOrgan.vue'], resolve);
              }
          },
          {
              path: 'primarySportsClass',
              icon: 'ios-list-box-outline',
              name: 'primarySportsClass',
              title: '班级及课程管理',
              component: resolve => {
                  require(['@/views/sportsClass/sportsClass.vue'], resolve);
              }
          },
          {
              path: 'minSportsClass',
              icon: 'ios-list-box-outline',
              name: 'minSportsClass',
              title: '班级及课程管理',
              component: resolve => {
                  require(['@/views/sportsClass/kindergarten/sportsClass.vue'], resolve);
              }
          },
          {
              path: 'mineditClass',
              icon: 'ios-list-box-outline',
              name: 'mineditClass',
              title: '幼儿园编辑',
              component: resolve => {
                  require(['@/views/sportsClass/kindergarten/editClass.vue'], resolve);
              }
          },
          {
              path: 'primarySportsClassConfig',
              icon: 'ios-list-box-outline',
              name: 'primarySportsClassConfig',
              title: '班级及课程管理',
              component: resolve => {
                  require(['@/views/cd/highSchool/sportsClass/primarySportsClassConfig.vue'], resolve);
              }
          },
          {
              path: 'sportsStudentManage',
              icon: 'ios-list-box-outline',
              name: 'sportsStudentManage',
              title: '导入体育课分班',
              component: resolve => {
                  require(['@/views/cd/highSchool/sportsClass/sportsStudentManage.vue'], resolve);
              }
          },
          {
              path: 'classPlanExportCDHigh',
              icon: 'ios-list-box-outline',
              name: 'classPlanExportCDHigh',
              title: '导入体育课分班',
              component: resolve => {
                  require(['@/views/cd/highSchool/sportsClass/classPlanExportCDHigh.vue'], resolve);
              }
          },
          {
              path: 'sportsStudentClassManage',
              icon: 'ios-list-box-outline',
              name: 'sportsStudentClassManage',
              title: '体育课成员分班',
              component: resolve => {
                  require(['@/views/cd/highSchool/sportsClass/sportsStudentClassManage.vue'], resolve);
              }
          },
          {
              path: 'classPlanCDHigh',
              icon: 'ios-list-box-outline',
              name: 'classPlanCDHigh',
              title: '体育课排课',
              component: resolve => {
                  require(['@/views/cd/highSchool/sportsClass/classPlan.vue'], resolve);
              }
          },
          {
              path: 'classPlan',
              icon: 'ios-list-box-outline',
              name: 'classPlan',
              title: '体育课排课',
              component: resolve => {
                  require(['@/views/sportsClass/classPlan.vue'], resolve);
              }
          },
          {
              path: 'classPlanExport',
              icon: 'ios-list-box-outline',
              name: 'classPlanExport',
              title: '班级排课信息导入',
              component: resolve => {
                  require(['@/views/sportsClass/classPlanExport.vue'], resolve);
              }
          },
          {
              path: 'classPlanExportV2',
              icon: 'ios-list-box-outline',
              name: 'classPlanExportV2',
              title: '班级排课信息导入',
              component: resolve => {
                  require(['@/views/sportsClass/classPlanExportV2.vue'], resolve);
              }
          },
          {
              path: 'classTestInfo',
              icon: 'ios-list-box-outline',
              name: 'classTestInfo',
              title: '考试项目',
              component: resolve => {
                  require(['@/views/sportsClass/classTestInfo.vue'], resolve);
              }
          },
          {
              path: 'teachingManage',
              icon: 'ios-list-box-outline',
              name: 'teachingManage',
              title: '智能教学管理',
              component: resolve => {
                  require(['@/views/devicewristband/teachingManage.vue'], resolve);
              }
          },
          {
              path: 'bathGroup',
              icon: 'ios-list-box-outline',
              name: 'bathGroup',
              title: '批量分组',
              component: resolve => {
                  require(['@/views/devicewristband/bathGroup.vue'], resolve);
              }
          },
          {
              path: 'giveDevice',
              icon: 'ios-list-box-outline',
              name: 'giveDevice',
              title: '分配手环',
              component: resolve => {
                  require(['@/views/devicewristband/giveDevice.vue'], resolve);
              }
          },
          {
              path: 'curriculumAdministrationKM',
              icon: 'ios-list-box-outline',
              name: 'curriculumAdministrationKM',
              title: '班级管理',
              component: resolve => {
                  require(['@/views/km/schoolAdministration/curriculumAdministration.vue'], resolve);
              }
          },
          {
              path: 'teacherEdit',
              icon: 'ios-list-box-outline',
              name: 'teacherEdit',
              title: '教师设置',
              component: resolve => {
                  require(['@/views/km/schoolAdministration/teacherEdit.vue'], resolve);
              }
          }
      ]
  },
  {
      path: '/roleManage',
      icon: 'md-people',
      name: 'roleManage',
      title: '人员管理',
      parentCode: 'top_config',
      parentName: '基础配置',
      parentIcon: 'ios-settings-outline',
      component: Main,
      children: [
          {
              path: 'studentInfoManage',
              icon: 'ios-list-box-outline',
              name: 'studentInfoManage',
              title: '学生管理',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/studentInfoManage.vue'], resolve);
              }
          },
          {
              path: 'studentInfoDetail',
              icon: 'ios-list-box-outline',
              name: 'studentInfoDetail',
              title: '学生详情',
              props: true,
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/studentInfoDetail.vue'], resolve);
              }
          },
          {
              path: 'minstudentInfoManage',
              icon: 'ios-list-box-outline',
              name: 'minstudentInfoManage',
              title: '学生管理',
              component: resolve => {
                  require(['@/views/datamanage/kindergarten/studentInfoManage.vue'], resolve);
              }
          },
          {
              path: 'minstudentInfoDetail',
              icon: 'ios-list-box-outline',
              name: 'minstudentInfoDetail',
              title: '幼儿园学生详情',
              props: true,
              component: resolve => {
                  require(['@/views/datamanage/kindergarten/studentInfoDetail.vue'], resolve);
              }
          },
          {
              path: 'operatorManage',
              icon: 'ios-list-box-outline',
              name: 'operatorManage',
              title: '教师管理',
              component: resolve => {
                  require(['@/views/operatorManage/teacherList.vue'], resolve);
              }
          },
          {
              path: 'teacherDetail',
              icon: 'ios-list-box-outline',
              name: 'teacherDetail',
              title: '人员明细',
              component: resolve => {
                  require(['@/views/operatorManage/teacherDetail.vue'], resolve);
              }
          },
          {
              path: 'groupDetail',
              icon: 'ios-list-box-outline',
              name: 'groupDetail',
              title: '权限组详情',
              component: resolve => {
                  require(['@/views/operatorManage/groupDetail.vue'], resolve);
              }
          },
          {
              path: 'exportTaskManage',
              icon: 'ios-list-box-outline',
              name: 'exportTaskManage',
              title: '学生信息导入管理',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/exportTaskManage.vue'], resolve);
              }
          },
          {
              path: 'exportTaskReplaceManage',
              icon: 'ios-list-box-outline',
              name: 'exportTaskReplaceManage',
              title: '学生信息导入管理',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/exportTaskReplaceManage.vue'], resolve);
              }
          },
          {
            path: 'detectRegisterCodeRepeat',
            icon: 'ios-list-box-outline',
            name: 'detectRegisterCodeRepeat',
            title: '异常数据明细',
            component: resolve => {
                require(['@/views/datamanage/primaryschool/detectRegisterCodeRepeat.vue'], resolve);
            }
        },
          {
            path: 'unusualData',
            icon: 'ios-list-box-outline',
            name: 'unusualData',
            title: '异常数据明细',
            component: resolve => {
                require(['@/views/datamanage/primaryschool/unusualData.vue'], resolve);
            }
        }
      ]
  },
  {
      path: '/StudentExempt',
      icon: 'ios-home',
      name: 'StudentExempt',
      title: '免试管理',
      parentCode: 'top_config',
      parentName: '基础配置',
      parentIcon: 'ios-settings-outline',
      component: Main,
      children: [
          {
              path: 'StudentExemptCD',
              icon: 'ios-list-box-outline',
              name: 'StudentExemptCD',
              title: '免试管理',
              component: resolve => {
                  require(['@/views/StudentExempt/StudentExempt.vue'], resolve);
              }
          },
          {
              path: 'exemptionAdministrationKM',
              icon: 'ios-list-box-outline',
              name: 'exemptionAdministrationKM',
              title: '免考管理',
              component: resolve => {
                  require(['@/views/km/exemptionAdministration/exemption.vue'], resolve);
              }
          },
          {
              path: 'exemptionDetail',
              icon: 'ios-list-box-outline',
              name: 'exemptionDetail',
              title: '免试管理详情',
              component: resolve => {
                  require(['@/views/km/exemptionAdministration/exemptionDetail.vue'], resolve);
              }
          }
      ]
  },
  {
      path: '/highStudentExempt',
      icon: 'ios-home',
      name: 'highStudentExempt',
      title: '免试管理',
      parentCode: 'top_config',
      parentName: '基础配置',
      parentIcon: 'ios-settings-outline',
      component: Main,
      children: [
          {
              path: 'highStudentExempt',
              icon: 'ios-list-box-outline',
              name: 'highStudentExempt',
              title: '免试管理',
              component: resolve => {
                  require(['@/views/cd/highSchool/sportsClass/highStudentExempt.vue'], resolve);
              }
          }
      ]
  }
]