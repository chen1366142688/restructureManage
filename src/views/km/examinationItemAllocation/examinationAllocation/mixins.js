const mixins = {
  data () {
      return {
          examTypeList: [ // 运动类型
              {
                  name: '全部',
                  value: '999'
              },
              {
                  name: '健康知识',
                  value: '1'
              },
              {
                  name: '运动技能',
                  value: '2'
              }
          ],
          projectType: [ // 体能类型
              {value: '22', label: '全部' },
              {value: '1', label: '基础体能'},
              {value: '2', label: '专项技能'}
          ],

          resultColumns: [ // 列表columns项
              {
                  title: '年级',
                  key: 'grade',
                  align: 'center',
                  minWidth: 60
              },
              {
                  title: '项目名称',
                  key: 'middleItemName',
                  align: 'center',
                  minWidth: 100
              },
              {
                  title: '项目编号',
                  key: 'middleItemCode',
                  align: 'center',
                  minWidth: 70
              },
              {
                  title: '项目类型',
                  key: 'middleItemType',
                  align: 'center',
                  minWidth: 80,
                  render: (h, params) => {
                      const { row } = params;
                      let text = row.middleItemType == '1' ? '基础体能' : (row.middleItemType == '2' ? '专项技能' : '');
                      return h('div', text);
                  }
              },
              {
                  title: '考试类别',
                  key: 'examinationCategory',
                  align: 'center',
                  minWidth: 50,
                  render: (h, parmas) => {
                      const { row } = parmas;
                      let text = row.testType == '1' ? '选考' : (row.testType == '2' ? '必考' : '');
                      return h('div', text);
                  }
              },
              {
                  title: '状态',
                  key: 'validStatus',
                  align: 'center',
                  minWidth: 70,
                  render: (h, params) => {
                      const param = params.row;
                      return h(
            'i-switch',
                          {
                              props: {
                                  type: 'primary',
                                  value: param.infoStatus == '1'
                              },
                              slots: {
                                  open: '有效',
                                  close: '失效'
                              },
                              on: {
                                  'on-change':
                 status => {
                     let type = status ? '1' : '2';
                     this.updateItemStatus(status, param);
                  // this.updateGroupEnableStatus(param.groupId,type);
                 }
                              }
                          }
          );
                  }
              },
              {
                  title: '分值',
                  key: 'score',
                  align: 'center',
                  minWidth: 50
              },
              {
                  title: '考试方式',
                  key: 'testWay',
                  align: 'center',
                  minWidth: 80,
                  render: (h, params) => {
                      const { row } = params;
                      let text = row.testWay == '1' ? '预约考试' : (row.testWay == '2' ? '统一考试' : '');
                      return h('span', text);
                  }
              },
              {
                  title: '考核人数',
                  key: 'studentNum',
                  align: 'center',
                  minWidth: 50,
                  render: (h, parmas) => {
                      const { row } = parmas;
                      let text = row.studentNum ? row.studentNum : 0;
                      return h('div', text);
                  }
              },
              {
                  title: '考试相关配置',
                  key: 'configList',
                  align: 'center',
                  minWidth: 300,
                  render: (h, params) => {
                      let _this = this;
                      return h('div', {class: 'analysisState clearfix'}, [
                          params.row.configList.map(function (item, index) {
                              let teacherVal = '';
                              if (item.teachers.length) {
                                  let val = item.teachers.map((items) => {
                                    return items.name;
                                }).join(',');
                                teacherVal = `(${val})`
                              }
                              return h('div', {
                                  class: 'divCores clearfix'
                              }, [
                                  h('div', {class: 'divright'}, [
                                      h('div', {
                                          class: 'spreadName'
                                      }, `${item.startTime}~${item.endTime}`),
                                      h('div', {
                                          class: 'spreadCount'
                                      }, teacherVal)
                                  ])
                              ]);
                          })
                      ]);
                  }
              },
              {
                  title: '操作',
                  key: 'action',
                  align: 'center',
                  minWidth: 500,
                  render: (h, params) => {
                      const row = params.row;
                      return h('div', {

                          style: {
                              display: 'flex',
                              justifyContent: 'space-around'
                          }
                      }, [
                          h(
              'Button',
                              {
                                  props: {
                                      type: 'success',
                                      disabled: row.infoStatus == '0'
                                  },
                                  style: {
                                      marginRight: '10px'
                                  },
                                  on: {
                                      click: () => {
                                          this.toDetail(row);
                                      }
                                  }
                              },
              '详情'
            ),
                          h(
              'Button',
                              {
                                  props: {
                                      type: 'success',
                                      disabled: row.infoStatus == '0'
                                  },
                                  style: {
                                      marginRight: '10px'
                                  },
                                  on: {
                                      click: () => {
                                          this.addChild(row.middleItemId,row.gradeId);
                                      }
                                  }
                              },
              '添加学生'
            ),
                          h(
              'Button',
                              {
                                  props: {
                                      type: 'success',
                                      disabled: row.infoStatus == '0'
                                  },
                                  style: {
                                      marginRight: '10px'
                                  },
                                  on: {
                                      click: () => {
                                          this.configuration(row);
                                      }
                                  }
                              },
              '考试相关配置'
            ),
                          h(
              'Button',
                              {
                                  props: {
                                      type: 'success',
                                      disabled: row.infoStatus == '0'
                                  },
                                  style: {
                                      marginRight: '10px'
                                  },
                                  on: {
                                      click: () => {
                                          this.ecportCall(row)
                                      }
                                  }
                              },
              '导出学生名单'
            )
                      ]);
                  }
              }
          ],
          formList: { // 搜索提交数据
              grade: '9999',
              middleItemName: '全部',
              middleItemType: '22',
              pageNum: 1,
              pageSize: 10,
          }
      };
  }
};
export default mixins;
