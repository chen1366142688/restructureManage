<template>
  <div style="padding-left:10px;">
    <Card>
        <Table :loading="tableLoading" border :columns="resultColumns" :data="resultData"></Table>
    </Card>
    <Modal
            v-model="applyWindow"
            title="编辑权限申请"
            @on-ok="submitApply"
            @on-cancel="closeApplyWindow"
            :mask-closable="false"
            :loading="false"
            width="550px"
    >
      <div style="margin-top:10px;">
        <Row>
          <Col span="4">
            <span>编辑数据：</span>
          </Col>
          <Col span="18">
            <RadioGroup v-model="applyData.applyType" @on-change="queryStatus">
              <Radio v-for="(item,index) in typeList" :key="index" :label="item.value">
                {{item.label}}
              </Radio>
            </RadioGroup>
            <p style="color: red" v-if="!reportStatus">该数据还没有完成数据报送，现有数据编辑权限，无需向相关单位申请。</p>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span="4">
            <span>申请内容：</span>
          </Col>
          <Col span="18">
            <Input v-model="applyData.applyDescribe" placeholder="请输入申请内容" :maxlength="50"/>
          </Col>
        </Row>
      </div>
    </Modal>
    <!-- 选择报送类型 -->
    <Modal
        v-model="submittedModal"
        title="选择报送类型"
        @on-ok="submittedNext"
        @on-cancel="cancelSubmit"
        :mask-closable="false"
        :loading="false"
        width="380px"
    >
        <RadioGroup v-model="reportType">
            <Radio label="1" v-if="activeYearSemester%2 === 0"><span>体质测试</span></Radio>
            <Radio label="2"><span>视力测试</span></Radio>
            <Radio label="3"><span>学科评价</span></Radio>
        </RadioGroup>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "dataFilesManage",
  data() {
    return {
      submittedModal:false, //选择报送类型
      activeYearSemester:'',//当前选中数据的学年
      reportType:'',
      reportStatus: true,
      tableLoading:false,
      typeList: [
        {
          value: '1',
          label: '体质测试'
        },
        {
          value: '2',
          label: '学科评价'
        },
        {
          value: '3',
          label: '视力测试'
        },
      ],
      typeList1: [
        {
          value: '1',
          label: '体质测试'
        },
        {
          value: '2',
          label: '学科评价'
        },
        {
          value: '3',
          label: '视力测试'
        },
      ],
      typeList2: [
        {
          value: '2',
          label: '学科评价'
        }
      ],
      auditList: [
        {
          value: '1',
          label: '教育局'
        },
        {
          value: '2',
          label: '管理平台'
        }
      ],
      applyData:{
        auditType: '',
        applyType: '',
        applyDescribe: '',
        applyYearSemester:'',
      },
      applyWindow: false,
      schoolId: '',
      resultColumns: [
        {
          title: '学期',
          key: 'semesterName',
          align: 'center',
          minWidth:100
        },
        {
          title: '学生人数',
          key: 'studentNum',
          align: 'center',
          minWidth:100,
        },
        {
          title: '体测平均成绩',
          key: 'testAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${(params.row.yearSemester%2) == 1?'-':params.row.testAllScore <= 0? 0 : (params.row.testAllScore/(params.row.testFinishStudent*100)).toFixed(2)}`
            return h('div', text)
          }
        },
        {
          title: '体测优良率（人数）',
          key: 'testGoodRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${(params.row.yearSemester%2) == 1?'-':params.row.testGoodRate == 0? 0 + ' （' + params.row.testGoodRate + '人）' : ((params.row.testGoodRate/params.row.testFinishStudent)*100).toFixed(2)+'%' + ' （' + params.row.testGoodRate + '人）'}`
            return h('div', text)
          }
        },
        {
          title: '体测合格率（人数）',
          key: 'testPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${(params.row.yearSemester%2) == 1?'-':params.row.testPassRate == 0? 0 + ' （' + params.row.testPassRate + '人）': ((params.row.testPassRate/params.row.testFinishStudent)*100).toFixed(2)+'%' + ' （' + params.row.testPassRate + '人）'}`
            return h('div', text)
          }
        },
        {
          title: '学科评价平均成绩',
          key: 'semesterAllScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterAllScore == 0? 0 : (params.row.semesterAllScore/(params.row.semesterFinishStudent*100)).toFixed(2)}`
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率（人数）',
          key: 'semesterGoodRate',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
             const text = `${params.row.semesterGoodRate == 0? 0 : ((params.row.semesterGoodRate/params.row.semesterFinishStudent)*100).toFixed(2)}%` + ' （' + params.row.semesterGoodRate + '人）'
             return h('div', text)
           }
        },
        {
          title: '学科评价合格率（人数）',
          key: 'semesterPassRate',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = `${params.row.semesterPassRate == 0? 0 : ((params.row.semesterPassRate/params.row.semesterFinishStudent)*100).toFixed(2)}%` + ' （' + params.row.semesterPassRate + '人）'
            return h('div', text)
          }
        },
        {
          title: '状态',
          key: 'reportingStatus',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let text=""
            const {yearSemester, testReportingStatus, testApplyStatus, subjectReportingStatus, subjectApplyStatus, visionReportStatus, visionApplyStatus} = params.row
            if(yearSemester%2 == 0) {
              text = `
                <div style="margin:5px 0;">${(testReportingStatus == '1' && testApplyStatus == '1') ? '体测申请编辑中' : testReportingStatus == '1' ? '体测已上报' : '体测未上报'}</div>
                <div style="margin:5px 0;">${(visionReportStatus == '1' && visionApplyStatus == '1') ? '视力测试申请编辑中' : visionReportStatus == '1' ? '视力测试已上报' : '视力测试未上报'}</div>
                <div style="margin:5px 0;">${(subjectReportingStatus == '1' && subjectApplyStatus == '1') ? '学科评价申请编辑中' : subjectReportingStatus == '1' ? '学科评价已上报' : '学科评价未上报'}</div>

              `
            } else {
              text = `
                <div style="margin:5px 0;">${(visionReportStatus == '1' && visionApplyStatus == '1') ? '视力测试申请编辑中' : visionReportStatus == '1' ? '视力测试已上报' : '视力测试未上报'}</div>
                <div style="margin:5px 0;">${(subjectReportingStatus == '1' && subjectApplyStatus == '1') ? '学科评价申请编辑中' : subjectReportingStatus == '1' ? '学科评价已上报' : '学科评价未上报'}</div>
              `
            }
            return h("div",
             {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth:300,
          render: (h, params) => {
            return h('div', [
              h(
                      'Button',
                      {
                        props: {
                          type: 'success',
                        },
                        style: {
                          margin:'5px 10px',
                          display: ((params.row.testReportingStatus == '0') && (params.row.subjectReportingStatus == '0')) && params.row.visionReportStatus == 0 ?'none':'inline-block'

                        },
                        on: {
                          click: () => {
                            this.showApplyWindow(params.row);
                          }
                        }
                      },
                      '申请编辑权限'
              ),
              h(
                      'Button',
                      {
                        props: {
                          type: 'success',
                        },
                        style: {
                          margin:'5px 10px',
                        },
                        on: {
                          click: () => {
                            this.toDataGrade(params.row);
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
                        },
                        style: {
                          margin:'5px 10px',
                        },
                        on: {
                          click: () => {
                            this.toDataReport(params.row);
                          }
                        }
                      },
                      '报送详情'
              )
            ])
          }
        }
      ],
      resultData: [],
    };
  },
  methods: {
      toDataReport(row){
        this.submittedModal = true
        this.activeYearSemester = row.yearSemester
      },
      /**reportType
           *@1 体质测试
           *@2 视力测试
           *@3 学科评价
           **/
      submittedNext(){
          this.$router.push({ name: "educationHistoryReport",query:{
              yearSemester: this.activeYearSemester,
              reportType: this.reportType
          }});
      },
      cancelSubmit(){
        this.submittedModal = false;
        this.activeYearSemester = '';
      },
    queryStatus () {
      this.$axios.get('/v1/datafiles/querySchoolReportedStatus?dataType=' + this.applyData.applyType + '&yearSemester=' + this.applyData.applyYearSemester).then(res => {
        if (res.data.code == 10000) {
          if (res.data.response.reportedPatriarchStatus == '1') {
            this.applyData.auditType = '2';
            this.reportStatus = true;
          } else if (res.data.response.reportedOrganStatus == '1') {
            this.applyData.auditType = '1';
            this.reportStatus = true;
          } else {
            this.applyData.auditType = '';
            this.reportStatus = false;
          }
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    noticeWindow (type) {
      switch (type) {
        case '2':
          this.$Modal.info({
            title: '未上报提醒',
            content: '您还没有完成数据报送，现有数据编辑权限，无需向相关单位申请。'
          });
          break;
        case '3':
          this.$Modal.info({
            title: '重复申请提醒',
            content: '您已经申请过相同数据的编辑权限，请联系相关单位审批，无需重复申请。'
          });
          break;
      }
    },
    showApplyWindow (item) {
      this.applyWindow = true;
      this.applyData.applyYearSemester = item.yearSemester;
      if(item.yearSemester%2==0){
        this.typeList = this.typeList1
        this.applyData.applyType = ''
      }else {
        this.typeList = this.typeList2
        this.applyData.applyType = '2'
      }
    },
    closeApplyWindow () {
      this.applyWindow = false;
    },
    submitApply () {
      this.$axios.post('/v1/datafiles/saveSchoolSemesterReportedApply', this.applyData).then(res => {
        if (res.data.code == 10000) {
          if (res.data.response == '1') {
            this.applyData.applyDescribe = '';
            this.$Message.info('申请成功');
            this.getYearSemesterInfo();

          } else if (res.data.response == '2') {
            this.noticeWindow('2');
          } else if (res.data.response == '3') {
            this.noticeWindow('3');
          }
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    
    toDataGrade(item){
      sessionStorage.setItem("dataFilsManage-grade-yearSemester", item.yearSemester);
      sessionStorage.setItem("dataFilsManage-grade-semesterName", item.semesterName);
      sessionStorage.setItem("dataFilsManage-testApplyStatus", item.testApplyStatus);
      sessionStorage.setItem("dataFilsManage-subjectApplyStatus", item.subjectApplyStatus);
      sessionStorage.setItem("dataFilsManage-testReportingStatus", item.testReportingStatus);
      sessionStorage.setItem("dataFilsManage-subjectReportingStatus", item.subjectReportingStatus);
      this.$router.push({ name: "dataFilesGradeInfo" });
    },
    getYearSemesterInfo(){
      this.tableLoading=true;
      this.$axios.get('/v1/datafiles/getYearSemesterInfo?schoolId='+this.schoolId).then(res => {
        this.tableLoading=false;
        if (res.data.code == 10000) {
          this.resultData = res.data.response;
        }
      })
    },
  },
  mounted() {
    this.schoolId = sessionStorage.getItem('schoolId');
    this.getYearSemesterInfo();
  }
};
</script>
