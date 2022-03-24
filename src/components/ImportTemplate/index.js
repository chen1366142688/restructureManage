const mixins = {
    data() { 
        return {
            TableColumns: [
                {
                  title: "任务名称",
                  key: "taskName",
                  align: "center"
                },
                {
                  title: "导入人员",
                  key: "teacherName",
                  align: "center"
                },
                {
                  title: "导入数量",
                  key: "exportNum",
                  align: "center"
                },
                {
                  title: "已处理数量",
                  key: "dealNum",
                  align: "center"
                },
                {
                  title: "错误数据数量",
                  key: "errorNum",
                  align: "center"
                },
                {
                  title: "导入状态",
                  key: "taskStatus",
                  align: "center",
                  render: (h, params) => {
                      const { taskStatus } = params.row;
                      const taskData = this.catgoryTaskStatus(taskStatus)
                    return h(
                      "Tag",
                      {
                        props: {
                          type: "dot",
                          color: taskData.color
                        }
                      },
                      taskData.text
                    );
                  }
                },
                {
                  title: "导入时间",
                  key: "createTime",
                  align: "center"
                },
                {
                  title: "操作",
                  key: "action",
                  align: "center",
                    width: 400,
                  render: (h, params) => {
                     const row = params.row;
                    return h("div", [
                      h(
                        "Button",
                        {
                          props: {
                            type: "success",
                            disabled:(row.taskStatus=='2' && row.errorNum>0) ?false:true
                          },
                          style: {
                            marginRight: "5px",
                            width:"120px",
                          },
                          on: {
                            click: () => {
                              this.exporTemplate(params.row.taskId);
                            }
                          }
                        },
                        "导出错误数据"
                      ),h(
                        "Button",
                        {
                          props: {
                            type: "success",
                          },
                          style: {
                            width:"120px",
                          },
                          on: {
                            click: () => {
                              this.search();
                            }
                          }
                        },
                        "刷新任务状态"
                      )
                    ]);
                  }
                }
            ]
        }
    },
    methods: {
        catgoryTaskStatus(status) {
            const taskJson = {
                color: '',
                text: ''
            };
            if (status == "0") {
                taskJson.color = "red";
                taskJson.text = "未执行";
            } else if (status == "1") {
                taskJson.color = "yellow";
                taskJson.text = "执行中";
            } else if (status == "2") {
                taskJson.color = "green";
                taskJson.text = "执行完成";
            } else { 
                taskJson.color = "black";
                taskJson.text = "数据出错";
            }
            return taskJson;
        }
    }
}
export default mixins;