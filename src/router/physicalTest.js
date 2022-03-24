import Main from '@/views/Main.vue';
export default [
    {
        path: '/dataManage',
        icon: 'md-git-branch',
        name: 'dataManage',
        title: '体质测试',
        parentCode: 'top_test',
        parentName: '体质测试',
        parentIcon: 'md-stats',
        component: Main,
        children: [
          {
            path: 'queryStudentList',
            icon: 'ios-list-box-outline',
            name: 'queryStudentList',
            title: '按学生查询',
            component: resolve => {
                require(['@/views/datamanage/primaryschool/queryStudentList.vue'], resolve);
            }
          },
          {
              path: 'classTestDetail',
              icon: 'ios-list-box-outline',
              name: 'classTestDetail',
              title: '学生测试详情',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/classTestDetail.vue'], resolve);
              }
          },
          {
              path: 'queryClassList',
              icon: 'ios-list-box-outline',
              name: 'queryClassList',
              title: '按班级查询',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/queryClassList.vue'], resolve);
              }
          },
          {
              path: 'queryGradeList',
              icon: 'ios-list-box-outline',
              name: 'queryGradeList',
              title: '按年级查询',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/queryGradeList.vue'], resolve);
              }
          },
          {
              path: 'queryProjectList',
              icon: 'ios-list-box-outline',
              name: 'queryProjectList',
              title: '按项目查询',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/queryProjectList.vue'], resolve);
              }
          },
          {
              path: 'queryHistoryData',
              icon: 'ios-list-box-outline',
              name: 'queryHistoryData',
              title: '历史数据查询',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/queryHistoryData.vue'], resolve);
              }
          },
          {
              path: 'bathAddStudentTestResult',
              icon: 'ios-list-box-outline',
              name: 'bathAddStudentTestResult',
              title: '学生体测成绩录入',
              component: resolve => {
                  require(['@/views/datamanage/primaryschool/bathAddStudentTestResult.vue'], resolve);
              }
          },
          {
              path: 'testTeacherWorkload',
              icon: 'ios-list-box-outline',
              name: 'testTeacherWorkload',
              title: '体测工作量分析',
              component: resolve => {
                  require(['@/views/schoolTest/testTeacherWorkload.vue'], resolve);
              }
          }
        ]
    }
]