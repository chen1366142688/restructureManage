/**
 * 体测视力模块
 */
import api from '@/api/visionTest/studentVisionManage/visionManage'
const mixins = {
    data () {
    return {
      errorCount: 0,//错误的数量
      noDataCount:0,//没有填写的数量
      successCount:0,//提交成功的数量
        volumeTypes: [
          {value: '0', lable: '否'},
          {value: '1', lable: '是'}
        ],
            //体测成绩录入页面
        vision: [
            {
              title: "右眼裸眼视力",
              key: "rightVision",
              align: "center",
              minWidth: 100,
              render: (h, params) => {
                var vm = this;
                let unit=""
                return h("div",params.row.exemptStatus=="1"?"免试":[
                  h('Input',{
                  props: {
                    value: params.row.exemptStatus=="1"?"免试":params.row.rightVision,
                    size: "small",
                    type:'number',
                    disabled:params.row.exemptStatus=="1"?true:false,
                  },
                  attrs:{
                        id: `${params.row.studentId}enterright`
                  },
                  style:{
                    width:"80px"
                  },
                  on: {
                    input: (val) => {
                      vm.visionChange(params.row,params.index,val,"2")
                    },
                    "on-blur":function(){
                      let color=vm.maxMinCheck(vm.resultData[params.index].rightVision)?"red":"#00c693"
                      let className=vm.maxMinCheck(vm.resultData[params.index].rightVision)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                      document.getElementById(params.row.studentId+"1").style.color=color
                      document.getElementById(params.row.studentId+"1").className=className
                    },
                    "on-enter":function(){
                      document.getElementById(params.row.studentId+"enterleft").getElementsByTagName("input")[0].focus()
                    }
                  },
                }),
                h('span',
                {
                  style:{
                    marginLeft: '5px',
                  }},unit),
                h('Icon', {
                      props: {
                          type: 'ios-close-circle-outline',
                      },
                      attrs:{
                        id:params.row.studentId+"1"
                    },
                      style:{
                        color:"rgb(255,255,255)",
                        cursor: 'pointer',
                        marginLeft: '5px',
                        fontSize:'18px'
                      },

                  }),
                ]
                );
              },
            },
            {
              title: "左眼裸眼视力",
              key: "leftVision",
              align: "center",
              minWidth: 100,
              render: (h, params) => {
                var vm = this;
                let unit=""
                return h("div",params.row.exemptStatus=="1"?"免试":[
                  h('Input',{
                    props: {
                      value: params.row.exemptStatus=="1"?"免试":params.row.leftVision,
                      size: "small",
                      type:'number',
                      disabled:params.row.exemptStatus=="1"?true:false,
                    },
                    attrs:{
                          id: `${params.row.studentId}enterleft`
                    },
                    style:{
                      width:"80px"
                    },
                    on: {
                      input: (val) => {
                        vm.visionChange(params.row,params.index,val,"1")
                      },
                      "on-blur":function(){
                        let color=vm.maxMinCheck(vm.resultData[params.index].leftVision)?"red":"#00c693"
                        let className=vm.maxMinCheck(vm.resultData[params.index].leftVision)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                        document.getElementById(params.row.studentId+"2").style.color=color
                        document.getElementById(params.row.studentId+"2").className=className
                      },
                      "on-enter":function(){
                        document.getElementById(params.row.studentId+"Benterright").getElementsByTagName("input")[0].focus()
                      }
                    },
                  }),
                  h('span',
                    {
                      style:{
                        marginLeft: '5px',
                      }
                    },unit),
                  h('Icon', {
                    props: {
                      type: 'ios-close-circle-outline',
                    },
                    attrs:{
                      id:params.row.studentId+"2"
                    },
                    style:{
                      color:"rgb(255,255,255)",
                      cursor: 'pointer',
                      marginLeft: '5px',
                      fontSize:'18px'
                    },
                  }),
                ]
                );
              },
            },
            {
              title: '右眼屈光球镜S',
              key: 'rightBall',
              align: 'center',
              minWidth: 100,
              render: (h, params) => {
                  var vm = this;
                  let unit = '';
                  return h("div", params.row.exemptStatus == "1" ? "免试" : [
                      h('Input', {
                          props: {
                              value: params.row.exemptStatus == "1" ? "免试" : params.row.rightBall,
                              size: "small",
                              type: 'number',
                              disabled: params.row.exemptStatus == "1" ? true : false
                          },
                          attrs: {
                              id: params.row.studentId + "Benterright"
                          },
                          style: {
                              width: "80px"
                          },
                          on: {
                              input: (val) => {
                                  vm.axisChange(params.index, val, "rightBall", '1');
                              },
                              "on-blur": function () {
                                  let color = vm.axisMaxMinCheck(vm.resultData[params.index].rightBall, '1') ? "red" : "#00c693";
                                  let className = vm.axisMaxMinCheck(vm.resultData[params.index].rightBall, '1') ? "ivu-icon ivu-icon-ios-close-circle-outline" : "ivu-icon ivu-icon-ios-checkmark-circle-outline";
                                  document.getElementById(params.row.studentId + "3").style.color = color;
                                  document.getElementById(params.row.studentId + "3").className = className;
                              },
                              "on-enter": function () {
                                  document.getElementById(params.row.studentId + "Centerright").getElementsByTagName("input")[0].focus();
                              }
                        }
                      }),
                      h('span',
                          {
                              style: {
                                  marginLeft: '5px'
                              }
                          }, unit),
                      h('Icon', {
                          props: {
                              type: 'ios-close-circle-outline'
                          },
                          attrs: {
                              id: `${params.row.studentId}3`,
                              class: params.row.rightBall ? (vm.axisMaxMinCheck(params.row.rightBall, '1') ? 'ivu-icon ivu-icon-ios-close-circle-outline' : 'ivu-icon ivu-icon-ios-checkmark-circle-outline') : ''
                          },
                          style: {
                              color: params.row.rightBall ? (vm.axisMaxMinCheck(params.row.rightBall, '1') ? "red" : "#00c693") : 'rgb(255, 255, 255)',
                              cursor: 'pointer',
                              marginLeft: '5px',
                              fontSize: '18px'
                          }
                      })
                  ]
                );
              }
            },
            {
              title: "右眼屈光柱镜C",
              key: "rightColumn",
              align: "center",
              minWidth: 100,
              render: (h, params) => {
                var vm = this;
                let unit=""
                return h("div",params.row.exemptStatus=="1"?"免试":[
                  h('Input',{
                    props: {
                      value: params.row.exemptStatus=="1"?"免试":params.row.rightColumn,
                      size: "small",
                      type: 'number',
                      disabled:params.row.exemptStatus=="1"?true:false,
                    },
                    attrs:{
                      id:params.row.studentId+"Centerright"
                    },
                    style:{
                      width:"80px"
                    },
                    on: {
                      input: (val) => {
                        vm.axisChange(params.index,val,"rightColumn",'1')
                      },
                      "on-blur":function(){
                        let color=vm.axisMaxMinCheck(vm.resultData[params.index].rightColumn, '2')?"red":"#00c693"
                        let className=vm.axisMaxMinCheck(vm.resultData[params.index].rightColumn, '2')?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                        document.getElementById(params.row.studentId+"5").style.color=color
                        document.getElementById(params.row.studentId+"5").className=className
                      },
                      "on-enter": function () {
                        document.getElementById(params.row.studentId+"Aenterright").getElementsByTagName("input")[0].focus()
                      }
                    },
                  }),
                  h('span',
                    {
                      style:{
                        marginLeft: '5px',
                      }
                    },unit),
                  h('Icon', {
                    props: {
                      type: 'ios-close-circle-outline',
                    },
                    attrs: {
                        id: `${params.row.studentId}5`,
                        class: params.row.rightColumn ? (vm.axisMaxMinCheck(params.row.rightColumn, '1') ? 'ivu-icon ivu-icon-ios-close-circle-outline' : 'ivu-icon ivu-icon-ios-checkmark-circle-outline') : ''
                    },
                    style: {
                        color: params.row.rightColumn ? (vm.axisMaxMinCheck(params.row.rightColumn, '1') ? "red" : "#00c693") : 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        marginLeft: '5px',
                        fontSize: '18px'
                    }
                  }),
                ]
                );
              }
            },
            {
              title: "右眼屈光轴位A",
              key: "rightAxis",
              align: "center",
              minWidth: 100,
              render: (h, params) => {
                var vm = this;
                let unit=""
                return h("div",params.row.exemptStatus=="1"?"免试":[
                  h('Input',{
                    props: {
                      value: params.row.exemptStatus=="1"?"免试":params.row.rightAxis,
                      size: "small",
                      type: 'number',
                      disabled:params.row.exemptStatus=="1"?true:false,
                    },
                    attrs:{
                      id:params.row.studentId+"Aenterright"
                    },
                    style:{
                      width:"80px"
                    },
                    on: {
                      input: (val) => {
                        vm.axisChange(params.index,val,"rightAxis",'')
                      },
                      "on-blur":function(){
                        let color=vm.axisMaxMinCheck(vm.resultData[params.index].rightAxis)?"red":"#00c693"
                        let className=vm.axisMaxMinCheck(vm.resultData[params.index].rightAxis)?"ivu-icon ivu-icon-ios-close-circle-outline":"ivu-icon ivu-icon-ios-checkmark-circle-outline"
                        document.getElementById(params.row.studentId+"11").style.color=color
                        document.getElementById(params.row.studentId+"11").className=className
                      },
                      "on-enter":function(){
                        document.getElementById(params.row.studentId+"Benterleft").getElementsByTagName("input")[0].focus()
                      }
                    },
                  }),
                  h('span',
                    {
                      style:{
                        marginLeft: '5px',
                      }
                    },unit),
                  h('Icon', {
                    props: {
                      type: 'ios-close-circle-outline',
                    },
                    attrs: {
                        id: `${params.row.studentId}11`,
                        class: params.row.rightAxis ? (vm.axisMaxMinCheck(params.row.rightAxis, '3') ? 'ivu-icon ivu-icon-ios-close-circle-outline' : 'ivu-icon ivu-icon-ios-checkmark-circle-outline') : ''
                    },
                    style: {
                        color: params.row.rightAxis ? (vm.axisMaxMinCheck(params.row.rightAxis, '3') ? "red" : "#00c693") : 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        marginLeft: '5px',
                        fontSize: '18px'
                    }
                  }),
                ]
                );
              }
            },
            {
              title: '左眼屈光球镜S',
              key: 'leftBall',
              align: 'center',
              minWidth: 100,
              render: (h, params) => {
                  var vm = this;
                  let unit = '';
                  return h("div", params.row.exemptStatus == "1" ? "免试" : [
                      h('Input', {
                          props: {
                              value: params.row.exemptStatus == "1" ? "免试" : params.row.leftBall,
                              size: "small",
                              type: 'number',
                              disabled: params.row.exemptStatus == "1" ? true : false
                          },
                          attrs: {
                              id: params.row.studentId + "Benterleft"
                          },
                          style: {
                              width: "80px"
                          },
                          on: {
                              input: (val) => {
                                  vm.axisChange(params.index, val, "leftBall", '1');
                              },
                              'on-blur': function () {
                                  let color = vm.axisMaxMinCheck(vm.resultData[params.index].leftBall, '1') ? "red" : "green";
                                  let className = vm.axisMaxMinCheck(vm.resultData[params.index].leftBall, '1') ? "ivu-icon ivu-icon-ios-close-circle-outline" : "ivu-icon ivu-icon-ios-checkmark-circle-outline";
                                  document.getElementById(params.row.studentId + "4").style.color = color;
                                  document.getElementById(params.row.studentId + "4").className = className;
                              },
                              'on-enter': function () {
                                  document.getElementById(params.row.studentId+"Centerleft").getElementsByTagName("input")[0].focus()
                              }
                          }
                      }),
                      h('span',
                          {
                              style: {
                                  marginLeft: '5px'
                              }
                          }, unit),
                      h('Icon', {
                          props: {
                              type: 'ios-close-circle-outline'
                          },
                          attrs: {
                              id: `${params.row.studentId}4`,
                              class: params.row.leftBall ? (vm.axisMaxMinCheck(params.row.leftBall, '1') ? 'ivu-icon ivu-icon-ios-close-circle-outline' : 'ivu-icon ivu-icon-ios-checkmark-circle-outline') : ''
                          },
                          style: {
                              color: params.row.leftBall ? (vm.axisMaxMinCheck(params.row.leftBall, '1') ? "red" : "#00c693") : 'rgb(255, 255, 255)',
                              cursor: 'pointer',
                              marginLeft: '5px',
                              fontSize: '18px'
                          }
                      })
                  ]
                );
              }
            },
          {
            title: "左眼屈光柱镜C",
            key: "leftColumn",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              var vm = this;
              let unit=""
              return h("div",params.row.exemptStatus=="1"?"免试":[
                h('Input',{
                  props: {
                    value: params.row.exemptStatus=="1"?"免试":params.row.leftColumn,
                    size: "small",
                    type: 'number',
                    disabled:params.row.exemptStatus=="1"?true:false,
                  },
                  attrs:{
                    id:params.row.studentId+"Centerleft"
                  },
                  style:{
                    width:"80px"
                  },
                  on: {
                    input: (val) => {
                      vm.axisChange(params.index,val,"leftColumn",'1')
                    },
                    "on-blur": function () {
                      let color=vm.axisMaxMinCheck(vm.resultData[params.index].leftColumn, '2')?"red":"#00c693"
                      let className = vm.axisMaxMinCheck(vm.resultData[params.index].leftColumn, '2') ? "ivu-icon ivu-icon-ios-close-circle-outline" : "ivu-icon ivu-icon-ios-checkmark-circle-outline"
                      document.getElementById(params.row.studentId+"6").style.color=color
                      document.getElementById(params.row.studentId+"6").className=className
                    },
                    "on-enter":function(){
                      document.getElementById(params.row.studentId+"Aenterleft").getElementsByTagName("input")[0].focus()
                    }
                  },
                }),
                h('span',
                  {
                    style:{
                      marginLeft: '5px',
                    }
                  },unit),
                h('Icon', {
                  props: {
                    type: 'ios-close-circle-outline',
                  },
                  attrs: {
                      id: `${params.row.studentId}6`,
                      class: params.row.leftColumn ? (vm.axisMaxMinCheck(params.row.leftColumn, '1') ? 'ivu-icon ivu-icon-ios-close-circle-outline' : 'ivu-icon ivu-icon-ios-checkmark-circle-outline') : ''
                  },
                  style: {
                      color: params.row.leftColumn ? (vm.axisMaxMinCheck(params.row.leftColumn, '1') ? "red" : "#00c693") : 'rgb(255, 255, 255)',
                      cursor: 'pointer',
                      marginLeft: '5px',
                      fontSize: '18px'
                  }
                }),
              ]
              );
            }
          },
          {
            title: "左眼屈光轴位A",
            key: "leftAxis",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              var vm = this;
              let unit=""
              return h("div",params.row.exemptStatus=="1"?"免试":[
                h('Input',{
                  props: {
                    value: params.row.exemptStatus=="1"?"免试":params.row.leftAxis,
                    size: "small",
                    type: 'number',
                    disabled:params.row.exemptStatus=="1"?true:false,
                  },
                  attrs:{
                    id:params.row.studentId+"Aenterleft"
                  },
                  style:{
                    width:"80px"
                  },
                  on: {
                    input: (val) => {
                      vm.axisChange(params.index,val,"leftAxis",'')
                    },
                    "on-blur": function () {
                      let color=vm.axisMaxMinCheck(vm.resultData[params.index].leftAxis)?"red":"#00c693"
                      let className = vm.axisMaxMinCheck(vm.resultData[params.index].leftAxis) ? "ivu-icon ivu-icon-ios-close-circle-outline" : "ivu-icon ivu-icon-ios-checkmark-circle-outline"
                      document.getElementById(params.row.studentId+"22").style.color=color
                      document.getElementById(params.row.studentId+"22").className=className
                    },
                    "on-enter": function () {
                      let result=vm.resultData;
                      let index="";
                      for(let i=0;i<result.length;i++){
                        if(params.row.studentId==result[i].studentId){
                          index=i+1;
                          break;
                        }
                      }
                      if(index+1>result.length){
                        return
                      }
                      document.getElementById(result[index].studentId + "enterright").getElementsByTagName("input")[0].focus()
                    }
                  },
                }),
                h('span',
                  {
                    style:{
                      marginLeft: '5px',
                    }
                  },unit),
                h('Icon', {
                  props: {
                    type: 'ios-close-circle-outline',
                  },
                  attrs: {
                      id: `${params.row.studentId}22`,
                      class: params.row.leftAxis ? (vm.axisMaxMinCheck(params.row.leftAxis, '3') ? 'ivu-icon ivu-icon-ios-close-circle-outline' : 'ivu-icon ivu-icon-ios-checkmark-circle-outline') : ''
                  },
                  style: {
                      color: params.row.leftAxis ? (vm.axisMaxMinCheck(params.row.leftAxis, '3') ? "red" : "#00c693") : 'rgb(255, 255, 255)',
                      cursor: 'pointer',
                      marginLeft: '5px',
                      fontSize: '18px'
                  }
                }),
              ]
              );
            }
          },
          {
            title: "是否为角膜塑形镜（OK镜）佩戴者",
            key: "glassesWearer",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              const row = params.row;
              return h("div",params.row.exemptStatus=="1"?"免试":
                [h('Select',{
                  props: {
                    value: params.row.exemptStatus=="1" ? "0" : (params.row.glassesWearer || '0'),
                    // disabled:params.row.exemptStatus=="1"?true:false,
                  },
                  style:{
                    width:"80px"
                  },
                  on: {
                    'on-change': (event) => {
                      this.visionLastChange(row._index, event)
                    }
                  },
                },
                  this.volumeTypes.map(function (item) {
                    return h('Option', {  
                        props: {value: item.value}  
                    }, item.lable);  
                })
              )]);
            }
          }
        ]
      }
    },
  methods: {
    /**是否为角膜塑形镜（OK镜）佩戴者录入
     * val - 选中的值1是0否**/
    visionLastChange(index, val) {
      this.resultData[index].glassesWearer = val
    },
    /**监听录入时
     * index-当前行下标
     * val-输入的值
     * filed-1左眼2右眼
     * type-判断是否可以输入小数
     * **/
    axisChange(index, val, filed, type) {
        val = val.toString();
        if (val.indexOf(".") >= 0) {//是否包含小数点，小数点后两位给予提示
          if (type === '1') {
            if (val.split('.')[1].length > 2) this.$Message.info('小数点后只能输入两位');
          } else {
            this.$Message.info('只能输入0~180的正整数');
          }
      }
      this.resultData[index][filed] = val
    },
    /**失去焦点后处理
     * value-值
     * type- 1 球镜 -30.00~30.00 
     *     - 2 柱镜 -15.00~15.00
     *     - 3 轴位 限制0~180之前包含首尾，正整数
     * return 不正确的值返回true
     *  - 正确的值返回false**/
    axisMaxMinCheck(value, type) {
      let that = this
      if (type === '1') {
        if (isNaN(value) || "" == value || null == value || !that.axisNumCheck(value, type)) return true;
      } else if (type === '2') {
        if (isNaN(value) || "" == value || null == value || !that.axisNumCheck(value, type)) return true;
      } else {
        if (isNaN(value) || "" == value || null == value || !that.axisNumCheck(value, type)) return true;
      }
    },
    //判断数值范围
    axisNumCheck(num, type) {
        if (num == null || num == "" || num == undefined) return false
        num = num.toString()
        if (num.indexOf(".") == -1) {//不包含小数点
          if (type === '1') {//球镜和柱镜 可以输入两位小数点 球镜 -30.00~30.00  柱镜 -15.00~15.00
            if (num < 30.01 && num >= (-30)) {//是否在正负30之间包含正负30
              return true;
            } else {
              return false;
            }
          } else if (type === '2') {
            if (num < 15.01 && num >= (-15)) {//是否在正负15之间包含正负15
              return true;
            } else {
              return false;
            }
          } else {//轴位 0-180的正整数
            if(num>180 || num<0){
              return false;
            }else{
              return true;
            }
          }
        } else {//包含小数点
          if (type === '1') {
            if ((num < 30.01 && num >= (-30)) && num.split('.')[1].length < 3) {//是否在正负30之间包含正负30且小数点后只能有两位小数
              return true;
            } else {
              return false;
            }
          } else if (type === '2') {
            if ((num < 15.01 && num >= (-15)) && num.split('.')[1].length < 3) {//是否在正负15之间包含正负15且小数点后只能有两位小数
              return true;
            } else {
              return false;
            }
          }else {
              return false;
          }
        }
    },
    //错误提示
    confirm() {
      let that = this
      this.$Modal.confirm({
          title: '提示',
          content: '<p>部分数据有误，请检查后重新提交！</p>',
        onOk: () => {
          that.errorCount = 0
          that.noDataCount = 0
          that.successCount = 0
        },
        onCancel: () => {
          that.errorCount = 0
          that.noDataCount = 0
          that.successCount = 0
        }
      });
    },
      //提交视力
      saveStudentVision(index) {
        const vm = this;
        let result= vm.resultData;
        let per = Math.ceil(100 / result.length);
        if (index + 1 > result.length) {
          vm.submitStatus = false
          if (vm.errorCount > 0) {
            vm.confirm()
          }
          return;
        }
        /**
         * 逻辑更改：原始-只要有一个学生未正确填写就暂停提交并给出提示，球镜柱镜添加两位小数后提交并自动刷新
         * 现在：提交所有填写正确信息的学生，错误的学生跳过，球镜和柱镜添加两位小数点但不自动提交，为了保存用户填写的错误数据
         * **/
        let student = result[index];
        if (!student.leftVision && !student.rightVision && !student.leftBall && !student.rightBall && !student.leftColumn && !student.rightColumn && !student.leftAxis && !student.rightAxis) {
          vm.noDataCount += 1;
          this.submitPercent+=per;
          vm.saveStudentVision(index+1);
          return;
        }
        //免测的话提交下一个
        if (student.exemptStatus=="1") {
          this.submitPercent += per;
          vm.noDataCount += 1;//免测就当空白处理
          vm.saveStudentVision(index+1);
          return;
        }
        //如果当前学生其中一项没有填写完成就跳过 
        if (student.leftVision == null || student.rightVision == null || vm.axisMaxMinCheck(student.leftBall,'1') || vm.axisMaxMinCheck(student.rightBall,'1')
          || vm.axisMaxMinCheck(student.leftColumn, '1') || vm.axisMaxMinCheck(student.rightColumn, '1') || vm.axisMaxMinCheck(student.leftAxis) || vm.axisMaxMinCheck(student.rightAxis)) {
          // this.submitPercent = 0;
          // this.submitStatus = false
          // this.$Message.error('学生视力未填写完整，请核对后重新提交')
          // return
          this.submitPercent += per;
          vm.errorCount += 1;
          vm.saveStudentVision(index+1);
          return;
        }
        //左眼裸眼视力是否在配置范围值之内
        if (student.leftVision * 10 > vm.maxData || student.leftVision * 10 < vm.minData) {
          this.submitPercent += per;
          vm.errorCount += 1;
          vm.saveStudentVision(index+1);
          return;
        } else {
          if (student.leftVision.indexOf('.') >= 0) {//判断小数点位数
            let leftVisionLen = student.leftVision.split('.')[1]
            if (leftVisionLen.length > 1) {
              this.submitPercent += per;
              vm.errorCount += 1;
              vm.saveStudentVision(index+1);
              return;
            }
          }
        }
        //右眼裸眼视力是否在配置范围值之内
        if (student.rightVision * 10 > vm.maxData || student.rightVision * 10 < vm.minData) {
          this.submitPercent += per;
          vm.errorCount += 1;
          vm.saveStudentVision(index+1);
          return;
        } else {
          if (student.rightVision.indexOf('.') >= 0) {//判断小数点位数
            let rightVisionLen = student.rightVision.split('.')[1]
            if (rightVisionLen.length > 1) {
              this.submitPercent += per;
              vm.errorCount += 1;
              vm.saveStudentVision(index+1);
              return;
            }
          }
        }
        
        let paramData = {
          "glassesWearer": student.glassesWearer,
          "leftAxis": student.leftAxis,
          "leftBall": Number(student.leftBall).toFixed(2),
          "leftColumn": Number(student.leftColumn).toFixed(2),
          "leftVision": student.leftVision,
          "rightAxis": student.rightAxis,
          "rightBall": Number(student.rightBall).toFixed(2),
          "rightColumn": Number(student.rightColumn).toFixed(2),
          "rightLight":'',
          "leftLight":'',
          "rightMirror":'',
          "leftMirror":'',
          "rightVision": student.rightVision,
          "schoolId": vm.schoolId,
          "schoolTestId": 13,
          "schoolTestVisionId": 0,
          "studentId": student.studentId,
          "teacherId": sessionStorage.getItem('teacherId'),
          "visionId": '',
          "yearSemester": sessionStorage.getItem('yearSemester')
          }
        api.addVisionResult(paramData).then(res => {
            this.submitStatus = true
            this.submitPercent += per;
            vm.successCount += 1;
            vm.saveStudentVision(index+1);
            if (res.data.code != 10000) { vm.errorNum+=1;}
        })
      },
    },
    mounted() {},
}
 export default mixins