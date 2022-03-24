/**
 * 竞赛加分模块
 * 页面内一些公用的方法和字段放到mixins中维护
 * author-赵天才 2021-04-14
 */
import grade from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
const mixins = {
  data () {
    return {
      schoolId: sessionStorage.getItem('schoolId'),
      schoolYear: sessionStorage.getItem('schoolYear'),
      reviewStatus: [
        {label: '全部', value: '9999'},
        {label: '待审核', value: '2'},
        {label: '审核通过', value: '1'},
        {label: '待提交审核', value: '0'},
        {label: '审核不通过', value: '3'}
      ],
      searchByMatchColumn: [ // 按赛事查询
        { title: '赛事名称', key: 'competitionName', align: 'center' },
        {
          title: '赛事级别', key: 'levelName', width: 100, align: 'center'
        },
        { title: '比赛时间', key: '', align: 'center', render: (h, params) => {
          const {startTime, endTime} = params.row
          const text = `${startTime}~${endTime}`
          return h('div', text)
        }},
        { title: '比赛地点', key: 'competitionAddress', align: 'center' },
        { title: '比赛项目数', key: 'itemCount', align: 'center', width: 100},
        { title: '参赛人数', key: 'number', align: 'center', width: 100},
        { title: '竞赛加分人数', key: 'addScoreNumber', align: 'center', width: 100},
        {
          title: '状态', key: 'status', width: 100, align: 'center', render: (h, params) => {
            const status = params.row.status
            let text = ''
            switch (status) {
              case '0': text = '待提交审核'
                break;
              case '1': text = '审核通过'
                break;
              case '2': text = '待审核'
                break;
              case '3': text = '审核不通过'
                break;
            }
            return h('div', text)
          }
        },
        {
          title: '操作', key: '', align: 'center', minWidth: 120, render: (h, params) => {
            const status = params.row.status
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      const data = {
                        actionType: '2',
                        competitionId: params.row.competitionId
                      }
                      this.$router.push({name: 'addCompetitionBonusKM', params: data})
                    }
                  }
                },
                '详情'
              ),
              // h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'success'
              //     },
              //     style: {
              //       marginRight: '10px',
              //       display: status == '0' || status == '3' ? 'inline-block' : 'none' // 仅审核未通过、待提交审核显示该按钮
              //     },
              //     on: {
              //       click: () => {
              //         const params = {
              //           actionType: '2',
              //         }
              //         this.$router.push({name: 'addCompetitionBonusKM', params: params})
              //       }
              //     }
              //   },
              //   '编辑'
              // ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled: this.isAdmin == '1' && (status == '0' || status == '3')
                  },
                  style: {
                    marginRight: '10px',
                    display: this.isAdmin == '1' ? 'inline-block' : 'none' // 系统管理员并且状态不为待提交审核显示该按钮
                  },
                  on: {
                    click: () => {
                      this.auditModal = true
                      this.auditType = params.row.status
                      this.currentCompetitionId = params.row.competitionId
                    }
                  }
                },
                '审核'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px',
                    display: (status == '0' || status == '3') ? 'inline-block' : 'none' // 仅审核未通过、待提交审核显示该按钮
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        content: '提交审核后，赛事相关信息将无法编辑，是否确定提交审核？',
                        onOk: () => {
                          this.submitAudit(params.row.competitionId)
                        },
                        onCancel: () => {
                        },
                        render: (h, params) => {
                          return h('div', [
                            h('div', {
                              style:"margin-bottom:20px;vertical-align: middle;font-size: 16px;color: #17233d;font-weight: 700;"
                            }, '提醒'),
                            h('div', {
                              domProps: {
                                innerHTML: '提交审核后，赛事相关信息将无法编辑，是否确定提交审核？'
                              }
                            })
                          ]);
                        }
                      });
                    }
                  }
                },
                '提交审核'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px',
                    display: status == '2' ? 'inline-block' : 'none' // 仅待审核显示该按钮
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提醒',
                        content: '您提交的赛事信息正在等待管理员审核，撤回后需重新提交审核，是否确定撤回？',
                        onOk: () => {
                          this.revocationAudit(params.row.competitionId) // 撤回审核
                        },
                        onCancel: () => {
                        }
                      });
                    }
                  }
                },
                '撤回'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px',
                    display: status == '0' ? 'inline-block' : 'none' // 仅待提交审核显示该按钮
      
                  },
                  on: {
                    click: () => {
                      this.deleteCompetitionModal = true
                      this.deleteCompetitionId = params.row.competitionId
                      // this.$Modal.confirm({
                      //   title: '提醒',
                      //   content: '删除赛事后，您添加的赛事和参赛学生信息将全部删除，是否确定删除？',
                      //   onOk: () => {
                      //     const data = {
                      //       competitionId: params.row.competitionId
                      //     }
                      //     this.deleteCompetition(data)
                      //   },
                      //   onCancel: () => {
                      //   }
                      // });
                    }
                  }
                },
                '删除'
              ),
            ])
          }
        },
      ],
      searchByStudentColumn: [ // 按学生查询
        { title: '姓名', key: 'studentName', align: 'center'},
        { title: '性别', key: 'gender', width: 76, align: 'center', render: (h, params) => {
          const gender = params.row.gender
          let text = gender == 1 ? '男' : '女'
          return h('div', text)
        }},
        { title: '学籍号', key: 'registerCode', align: 'center'},
        { title: '班级', key: 'studentClass', width: 90, align: 'center', render: (h, params) => {
          const row = params.row
          let gradeList = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级', '高一', '高二', '高三']
          let text = row.grade > 0 && row.grade <13 ? gradeList[row.grade -1] : '';
          return h("span", text + row.studentClass + "班")
        }},
        { title: '赛事名称', key: 'competitionName', align: 'center'},
        { title: '赛事级别', key: 'levelName', width: 100, align: 'center' },
        { title: '比赛时间', key: '', width: 180, align: 'center', render: (h, params) => {
          const {competitionStartTime, competitionEndTime} = params.row
          const text = `${competitionStartTime}~${competitionEndTime}`
          return h('div', text)
        }},
        { title: '比赛地点', key: 'competitionAddress', align: 'center' },
        { title: '比赛项目', key: 'itemName', align: 'center' },
        { title: '成绩', key: 'competitionScore', align: 'center', width: 76},
        { title: '名次', key: 'competitionRank', align: 'center', width: 76},
        { title: '竞赛加分', key: 'addScore', align: 'center', width: 76},
        {
          title: '状态', key: 'auditStatus', width: 100, align: 'center', render: (h, params) => {
            const auditStatus  = params.row.auditStatus 
            let text = ''
            switch (auditStatus ) {
              case '0': text = '待提交审核'
                break;
              case '1': text = '审核通过'
                break;
              case '2': text = '待审核'
                break;
              case '3': text = '审核不通过'
                break;
            }
            return h('div', text)
          }
        },
        {
          title: '操作', key: '', align: 'center',  render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      // const data = {
                      //   actionType: '2',
                      //   competitionId: params.row.competitionId,
                      //   itemProperty: params.row.itemProperty,
                      //   studentName: params.row.studentName,
                      //   itemTypeId: params.row.itemTypeId,
                      //   itemId: params.row.itemId
                      // }
                      const {competitionId, itemId, teamId, scoreId, itemProperty, levelId, auditStatus} = params.row
                      const data = {
                        actionType: '2',
                        competitionId,
                        itemId,
                        teamId,
                        scoreId,
                        itemProperty,
                        levelId,
                        auditStatus
                      }
                      this.$router.push({name: 'addStudentKM', params: data})
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        },
      ],

      studentColumn: [ // 参赛学生
        { title: '姓名', key: 'studentName', align: 'center'},
        { title: '性别', key: 'gender', align: 'center', render: (h, params) => {
          const gender = params.row.gender
          const text = gender === '1' ? '男' : '女'
          return h('div', text)
        }},
        { title: '学籍号', key: 'registerCode', align: 'center'},
        { title: '班级', key: 'studentClass', align: 'center'},
        { title: '项目类型', key: 'itemProperty', align: 'center', render: (h, params) => {
          const { itemProperty } = params.row
          const text = itemProperty == 1 ? '个人赛' : '团队赛'
          return h('div', text)
        }},
        { title: '参赛项目', key: 'itemName', align: 'center' },
        { title: '比赛成绩', key: 'competitionScore', align: 'center', width: 100},
        { title: '名次', key: 'competitionRank', align: 'center', width: 100},
        { title: '成绩凭证', key: '', align: 'center', width: 100, render: (h, params) => {
          return h(
            'Button',
            {
              props: {
                type: 'success',
                icon: 'ios-add-circle-outline',
                size: 'small'
              },
              on: {
                click: () => {
                  const {competitionId, itemId, itemProperty, teamId, studentId} = params.row
                  const condition = {
                    competitionId,
                    itemId,
                    itemProperty,
                    studentId,
                    teamId: itemProperty == 1 ? '0' : teamId // 团队id,itemProperty为1时传0
                  }
                  this.previewImgList = []
                  this.getCompetitionPoves(condition) // 获取赛事凭证
                }
              }
            },
            '点击查看'
          )          
        }},
        { title: '竞赛加分', key: 'addScore', align: 'center', width: 100},
        {
          title: '操作', key: '', align: 'center', minWidth: 120, render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled: this.auditStatus == 1 || this.auditStatus == 2 // 已审核通过或者待审核不允许编辑学生
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      const {competitionId, itemId, teamId, scoreId, itemProperty, levelId} = params.row
                      const data = {
                        actionType: '2',
                        competitionId,
                        itemId,
                        teamId,
                        scoreId,
                        itemProperty,
                        levelId
                      }
                      this.$router.push({name: 'addStudentKM', params: data})
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled: this.auditStatus == 1 || this.auditStatus == 2 // 已审核通过不允许删除学生
                  },
                  style: {
                    // marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      const {itemId, scoreId} = params.row
                      const data = {
                        itemId,
                        scoreId
                      }
                      this.deleteItemStudent(data)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        },
      ],

      auditColumns: [ // 审核列表
        { title: '审核状态', key: 'auditStatus', align: 'center', render: (h, params) => {
          const status = params.row.auditStatus
          let text = ''
          switch (status) {
            case '0': text = '待提交审核'
              break;
            case '1': text = '审核通过'
              break;
            case '2': text = '待审核'
              break;
            case '3': text = '审核不通过'
              break;
          }
          return h('div', text)
        }},
        { title: '审核时间', key: 'auditTime', align: 'center'},
        { title: '审核人', key: 'name', align: 'center'},
        { title: '备注', key: 'remark', align: 'center'},
      ],

      simpleStudentColumns: [
        { title: '姓名', key: 'studentName', align: 'center'},
        { title: '性别', key: 'gender', align: 'center', render: (h, params) => {
          const gender = params.row.gender
          const text = gender === '1' ? '男' : '女'
          return h('div', text)
        }},
        { title: '学籍号', key: 'registerCode', align: 'center'},
        { title: '班级', key: 'studentClass', align: 'center'},
        {
          title: '操作', key: '', align: 'center', minWidth: 120, render: (h, params) => {
            const row = params.row
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                  },
                  on: {
                    click: () => {
                      let addedStudent = [] // 已添加的学生
                      let that = this
                      if (this.itemProperty == 2) { // 团队赛
                        this.groupList.forEach(item => {
                          item.teamStudents.forEach(val => {
                            addedStudent.push(val)
                          })
                        })
                        let index = addedStudent.findIndex(item => {
                          return item.studentId == row.studentId
                        })
                        if (index > -1) {
                          this.$Message.error('你已添加过该学生！')
                          return false
                        } else {
                          let curretGroup = this.groupList[this.groupIndex]
                          row.fileUrls = [];
                          curretGroup.teamStudents.push(row)
                          console.log('2添加成员后的团队组：', this.groupList)
                        }
                      } else { // 个人赛
                        if (this.isChangeStudent) { // 如果是更换学生，先清空之前的学生列表
                          this.groupList = []
                        }
                        this.groupList.forEach(item => {
                          addedStudent.push(item)
                        })
                        let index = addedStudent.findIndex(item => {
                          return item.studentId == row.studentId
                        })
                        if (index > -1) {
                          this.$Message.error('你已添加过该学生！')
                          return false
                        } else {
                          // 构建个人赛数据
                          this.groupList.push({
                            studentName: row.studentName,
                            addScore: '',
                            fileUrls: [],
                            rank: '',
                            score: '',
                            scoreId: that.actionType == 2 ? that.scoreId : 0, // 如果是编辑的话，使用传入的scoreId
                            studentId: row.studentId,
                          })
                        }
                      }
                      this.addStudentModal = false
                    }
                  }
                },
                '添加'
              )
            ])
          }
        },
      ],
      gradeList: [],
      classList: []
    }
  },
  mounted () {
    this.gradeList = grade.inOf( sessionStorage.getItem('schoolType'))
    this.classList = allClass
  },
}
export default mixins