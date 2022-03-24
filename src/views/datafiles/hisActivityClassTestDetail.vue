<style>
.show-spin-container {
  top: 0px;
  position: absolute;
  bottom: 0px;
  border: 1px solid #eee;
  overflow: auto;
}
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}</h2>
    </div>
    <div class="show-spin-container" v-if="loadingInfo==1 && 1==2">
      <Spin fix></Spin>
    </div>
    <div style="margin-top:15px;">
      <Card style="margin-bottom:20px;">
        <div style="height:30px;line-height:30px;">
          <font >性别：{{gender=="1"?"男":"女"}}</font>
          <font style="margin-left:40px;">班级：{{startSchool}}级{{gradeName}}</font>
          <font style="margin-left:40px;">学籍号：{{registerCode}}</font>
          <font style="margin-left:40px;">学期：{{
          yearSemester % 2 == 0
            ? (yearSemester / 10).toFixed(0) + "学年第一学期"
            : (yearSemester / 10).toFixed(0) - 1 + "学年第二学期"
        }}</font>
          <font style="margin-left:40px;">得分：{{userData.totalScore ?userData.totalScore:"--"}}</font>
          <Button @click="pageToClassList" style="margin-left:30%;" type="success">返回</Button>
        </div>
      </Card>
      <Form class="function">
        <Card style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >身高：{{userData.height == null?"--":userData.height+" cm"}}</div>
              <div style="float:left;width:160px;">BMI值：{{userData.bmiValue?userData.bmiValue:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >BMI得分：{{userData.bmiScore!=null?userData.bmiScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.bmiLevel=="1"?"优秀":userData.bmiLevel=="2"?"良好":userData.bmiLevel=="3"?"及格":userData.bmiLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="height" placeholder="请输入测量值(cm)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(heightList && heightList.length>0) || !isEdit"
                @click="saveStudentTestInfo('1')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="heightList"></Table>
            </Col>
          </Row>
        </Card>
        <Card style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >体重：{{userData.weight == null?"--":userData.weight+" kg"}}</div>
              <div style="float:left;width:160px;">BMI值：{{userData.bmiValue?userData.bmiValue:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >BMI得分：{{userData.bmiScore!=null?userData.bmiScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.bmiLevel=="1"?"优秀":userData.bmiLevel=="2"?"良好":userData.bmiLevel=="3"?"及格":userData.bmiLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="weight" placeholder="请输入测量值(kg)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(weightList && weightList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('12')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="weightList"></Table>
            </Col>
          </Row>
        </Card>
        <Card style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >肺活量：{{userData.vitalCapacityValue == null?"--":userData.vitalCapacityValue+" ml"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.vitalCapacityScore!=null?userData.vitalCapacityScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.vitalCapacityLevel=="1"?"优秀":userData.vitalCapacityLevel=="2"?"良好":userData.vitalCapacityLevel=="3"?"及格":userData.vitalCapacityLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="vitalCapacityValue" placeholder="请输入测量值(ml)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(vitalCapacityValueList && vitalCapacityValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('2')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="vitalCapacityValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >50米跑：{{userData.runFiftyValue == null?"--":userData.runFiftyValue}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.runFiftyScore!=null?userData.runFiftyScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.runFiftyLevel=="1"?"优秀":userData.runFiftyLevel=="2"?"良好":userData.runFiftyLevel=="3"?"及格":userData.runFiftyLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="runFiftyValue" placeholder="请输入测量值(秒)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(runFiftyValueList && runFiftyValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('3')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col >
              <Table border :columns="resultColumns" :data="runFiftyValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="schoolType != '2'" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >立定跳远：{{userData.standingJumpValue == null?"--":userData.standingJumpValue+" cm"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.standingJumpScore!=null?userData.standingJumpScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.standingJumpLevel=="1"?"优秀":userData.standingJumpLevel=="2"?"良好":userData.standingJumpLevel=="3"?"及格":userData.standingJumpLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="standingJumpValue" placeholder="请输入测量值(cm)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(standingJumpValueList && standingJumpValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('8')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="standingJumpValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >坐位体前屈：{{userData.sitAndReachValue == null?"--":userData.sitAndReachValue+" cm"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.sitAndReachScore!=null?userData.sitAndReachScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.sitAndReachLevel=="1"?"优秀":userData.sitAndReachLevel=="2"?"良好":userData.sitAndReachLevel=="3"?"及格":userData.sitAndReachLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="sitAndReachValue" placeholder="请输入测量值(cm)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(sitAndReachValueList && sitAndReachValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('4')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="sitAndReachValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="gender == '2' && schoolType != '2'" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >800米跑：{{userData.runEightHundredValue == null?"--":userData.runEightHundredValue}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.runEightHundredScore!=null?userData.runEightHundredScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.runEightHundredLevel=="1"?"优秀":userData.runEightHundredLevel=="2"?"良好":userData.runEightHundredLevel=="3"?"及格":userData.runEightHundredLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="runEightHundredValue" placeholder="请输入测量值(分'秒“)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(runEightHundredValueList && runEightHundredValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('11')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col >
              <Table border :columns="resultColumns" :data="runEightHundredValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="gender == '1' && schoolType != '2'" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >1000米跑：{{userData.runThousandValue == null?"无":userData.runThousandValue}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.runThousandScore!=null?userData.runThousandScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.runThousandLevel=="1"?"优秀":userData.runThousandLevel=="2"?"良好":userData.runThousandLevel=="3"?"及格":userData.runThousandLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="runThousandValue" placeholder="请输入测量值(分'秒“)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(runThousandValueList && runThousandValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('10')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="runThousandValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="schoolType == '2'" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >一分钟跳绳：{{userData.oneMinuteRopeSkippingValue == null?"--":userData.oneMinuteRopeSkippingValue+" 次"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.oneMinuteRopeSkippingScore!=null?userData.oneMinuteRopeSkippingScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.oneMinuteRopeSkippingLevel=="1"?"优秀":userData.oneMinuteRopeSkippingLevel=="2"?"良好":userData.oneMinuteRopeSkippingLevel=="3"?"及格":userData.oneMinuteRopeSkippingLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="oneMinuteRopeSkippingValue" placeholder="请输入测量值(次)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(oneMinuteRopeSkippingValueList && oneMinuteRopeSkippingValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('5')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="oneMinuteRopeSkippingValueList"></Table>
            </Col>
          </Row>
        </Card>

        <Card v-if="schoolType == '2' && gradeId>2" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >一分钟仰卧起坐：{{userData.oneMinuteSitUpValue == null?"--":userData.oneMinuteSitUpValue+" 次"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.oneMinuteSitUpScore!=null?userData.oneMinuteSitUpScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.oneMinuteSitUpLevel=="1"?"优秀":userData.oneMinuteSitUpLevel=="2"?"良好":userData.oneMinuteSitUpLevel=="3"?"及格":userData.oneMinuteSitUpLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="oneMinuteSitUpValue" placeholder="请输入测量值(次)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(oneMinuteSitUpValueList && oneMinuteSitUpValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('6')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="oneMinuteSitUpValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="schoolType == '2' && gradeId>4" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >50米X8往返跑：{{userData.runFiftyEightValue == null?"--":userData.runFiftyEightValue}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.runFiftyEightScore!=null?userData.runFiftyEightScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.runFiftyEightLevel=="1"?"优秀":userData.runFiftyEightLevel=="2"?"良好":userData.runFiftyEightLevel=="3"?"及格":userData.runFiftyEightLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="runFiftyEightValue" placeholder="请输入测量值(分'秒)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(runFiftyEightValueList && runFiftyEightValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('7')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="runFiftyEightValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="gender == '2' && schoolType != '2'" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >一分钟仰卧起坐：{{userData.oneMinuteSitUpValue == null?"--":userData.oneMinuteSitUpValue+" 次"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.oneMinuteSitUpScore!=null?userData.oneMinuteSitUpScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.oneMinuteSitUpLevel=="1"?"优秀":userData.oneMinuteSitUpLevel=="2"?"良好":userData.oneMinuteSitUpLevel=="3"?"及格":userData.oneMinuteSitUpLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="oneMinuteSitUpValue" placeholder="请输入测量值(次)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(oneMinuteSitUpValueList && oneMinuteSitUpValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('6')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="oneMinuteSitUpValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card v-if="gender == '1' && schoolType != '2'" style="margin-bottom:20px;">
          <Row>
            <Col span="17" style="padding-top:5px;">
              <div
                style="float:left;width:160px;"
              >引体向上：{{userData.pullUpsValue == null?"--":userData.pullUpsValue+" 次"}}</div>
              <div
                style="float:left;width:160px;"
              >得分：{{userData.pullUpsScore!=null?userData.pullUpsScore:"--"}}</div>
              <div
                style="float:left;width:160px;"
              >等级：{{userData.pullUpsLevel=="1"?"优秀":userData.pullUpsLevel=="2"?"良好":userData.pullUpsLevel=="3"?"及格":userData.pullUpsLevel=="4"?"不及格":"--"}}</div>
            </Col>
            <Col span="5">
              <Input v-model="pullUpsValue" placeholder="请输入测量值(次)" :maxlength="11" />
            </Col>
            <Col span="2">
              <Button
                style="margin-left:10px;"
                :disabled="!(pullUpsValueList && pullUpsValueList.length>0 ) || !isEdit"
                @click="saveStudentTestInfo('9')"
                type="success"
              >保存</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px;">
            <Col>
              <Table border :columns="resultColumns" :data="pullUpsValueList"></Table>
            </Col>
          </Row>
        </Card>
        <Card style="margin-bottom:20px;margin-top: 10px">
          <Row>
            <Col span="3" style="width:100px;padding-top:5px;">
              <div style="float:left;width:100px;">学生签名：</div>
            </Col>
            <Col span="8">
              <div
                style="width: 255px;height:705px;border:1px solid rgba(211,211,211,1);line-height:390px;text-align:center;"
              >
                <img :src="signatureAddr" v-if="signatureAddr" style="width: 250px;height:700px" />
                <span v-else>暂无学生签名数据</span>
              </div>
            </Col>
            <Col span="3" style="width:100px;padding-top:5px;">
              <Button
                :disabled="signatureYearSemester=='' || !isEdit"
                @click="cancelSignature"
                style="margin-left:80%;"
                type="success"
              >取消签名</Button>
            </Col>
          </Row>
        </Card>
      </Form>
      <Modal v-model="clearAutographModal" title="清除签名" @on-ok="clearAutograph">
        <div style="font-size: larger;color: red">执行此操作后，将清除学生签名，是否确定开启学生重新签名？</div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
      semesterStatus: '0', //第二学期不能取消签名
      isEdit: true,//是否可以编辑
      clearAutographModal: false,
      yearSemester:"",
      testApplyStatus:false,
      signatureAddr: "",
      loadingInfo: "0",
      teacherId: "",
      activityId: "",
      classId: "",
      gradeId: "",
      studentId: "",
      schoolId: "",
      collegeName: "",
      majorName: "",
      gradeName: "",
      startSchool: "",
      studentData: "",
      studentName: "",
      registerCode: "",
      gender: "",
      height: "",
      weight: "",
      vitalCapacityValue: "",
      runFiftyValue: "",
      standingJumpValue: "",
      sitAndReachValue: "",
      runEightHundredValue: "",
      runThousandValue: "",
      oneMinuteSitUpValue: "",
      pullUpsValue: "",
      totalScoreLevelName: "",
      totalScore: "",
      userData: {},
      heightList: [],
      weightList: [],
      vitalCapacityValueList: [],
      runFiftyValueList: [],
      standingJumpValueList: [],
      sitAndReachValueList: [],
      runEightHundredValueList: [],
      runThousandValueList: [],
      oneMinuteSitUpValueList: [],
      pullUpsValueList: [],
      oneMinuteRopeSkippingValueList: [],
      runFiftyEightValueList: [],
      schoolType: sessionStorage.getItem("schoolType"),
      oneMinuteRopeSkippingValue: "",
      runFiftyEightValue: "",
      resultColumns: [
        {
          title: "测试值",
          key: "resultValue",
          align: "center"
        },
        {
          title: "录入时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "考核老师",
          key: "name",
          align: "center"
        },
        {
          title: "参与老师",
          key: "joinTeacherName",
          align: "center"
        },
        {
          title: "考核类型",
          key: "supplementStatus",
          align: "center",
          render: (h, params) => {
            let text = "正常";
            if (params.row.supplementStatus == "2") {
              text = "补测";
            }
            return h("div", text);
          }
        }
      ],
      resultColumns3: [
        {
          title: "测试值",
          key: "resultValue",
          align: "center"
        },
        {
          title: "录入时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "考核老师",
          key: "name",
          align: "center"
        },
        {
          title: "考核类型",
          key: "supplementStatus",
          align: "center",
          render: (h, params) => {
            let text = "正常";
            if (params.row.supplementStatus == "2") {
              text = "补测";
            }
            return h("div", text);
          }
        }
      ],
      signatureYearSemester: "",
    };
  },
  methods: {
    /** 取消签名 */
    cancelSignature () {
      this.clearAutographModal = true
    },
    /**清除签名**/
    clearAutograph() {
        this.loadingInfo = "1";
        const {studentId, yearSemester, schoolId} = this;
        this.$axios.get(`/v1/test/edit/cancelActivityTestSign?studentId=${studentId}&yearSemester=${yearSemester}&schoolId=${schoolId}`).then(() => {
            this.loadingInfo = "0";
            this.signatureAddr = "";
            this.$Message.info("删除成功");
        });
    },
    queryStudentTestInfo() {
      this.loadingInfo = "1";
      //编辑时获取场馆数据
      this.$axios
        .get(
          "/v1/test/query/queryStudentResult?studentId=" +
            this.studentId +
            "&activityId=" +
            this.activityId +
            "&schoolId=" +
            this.schoolId
        )
        .then(res => {
          this.loadingInfo = "0";
          if (res.data.code == 10000) {
            this.userData = res.data.response.resultStatical
              ? res.data.response.resultStatical
              : {};

            if (
              res.data.response.resultStatical &&
              res.data.response.resultStatical.runEightHundredValue != null
            ) {
              this.userData.runEightHundredValue =
                Math.floor(
                  res.data.response.resultStatical.runEightHundredValue / 60
                ) +
                "'" +
                (res.data.response.resultStatical.runEightHundredValue % 60);
            }
            if (
              res.data.response.resultStatical &&
              res.data.response.resultStatical.runThousandValue != null
            ) {
              this.userData.runThousandValue =
                Math.floor(
                  res.data.response.resultStatical.runThousandValue / 60
                ) +
                "'" +
                (res.data.response.resultStatical.runThousandValue % 60);
            }

            if (
              res.data.response.resultStatical &&
              res.data.response.resultStatical.runFiftyEightValue != null
            ) {
              this.userData.runFiftyEightValue =
                Math.floor(
                  res.data.response.resultStatical.runFiftyEightValue / 60
                ) +
                "'" +
                (res.data.response.resultStatical.runFiftyEightValue % 60);
            }

            if (this.userData.totalScoreLevel == "1") {
              this.totalScoreLevelName = "优秀";
              this.userData.totalScore = this.userData.totalScore.toFixed(1);
            } else if (this.userData.totalScoreLevel == "2") {
              this.totalScoreLevelName = "良好";
              this.userData.totalScore = this.userData.totalScore.toFixed(1);
            } else if (this.userData.totalScoreLevel == "3") {
              this.totalScoreLevelName = "及格";
              this.userData.totalScore = this.userData.totalScore.toFixed(1);
            } else if (this.userData.totalScoreLevel == "4") {
              this.totalScoreLevelName = "不及格";
              this.userData.totalScore = this.userData.totalScore.toFixed(1);
            } else if (this.userData.totalScoreLevel == "5") {
              this.totalScoreLevelName = "未测试完成";
              this.userData.totalScore = 0;
            }
            let vualueList = res.data.response.testList
              ? res.data.response.testList
              : [];
            this.heightList = [];
            this.weightList = [];
            this.vitalCapacityValueList = [];
            this.runFiftyValueList = [];
            this.standingJumpValueList = [];
            this.sitAndReachValueList = [];
            this.runEightHundredValueList = [];
            this.runThousandValueList = [];
            this.oneMinuteSitUpValueList = [];
            this.pullUpsValueList = [];
            this.oneMinuteRopeSkippingValueList = [];
            this.runFiftyEightValueList = [];
            this.testVision = res.data.response.visionVO
              ? res.data.response.visionVO
              : {};
            this.historyVision = res.data.response.visionHistory
              ? res.data.response.visionHistory
              : [];
            for (let i = 0; i < vualueList.length; i++) {
              if (vualueList[i].sign == 1) {
                this.signatureAddr = vualueList[i].signatureAddr;
                //下学期不能取消签名
                if (this.yearSemester % 2 == 1) {
                  this.signatureYearSemester = "";
                } else {
                  this.signatureYearSemester = "1";
                }
              }
              if (vualueList[i].schoolTestId == "1") {
                vualueList[i].resultValue =
                  vualueList[i].resultValue != null
                    ? vualueList[i].resultValue
                    : 0 + "cm";
                this.heightList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "2") {
                vualueList[i].resultValue = vualueList[i].resultValue + "ml";
                this.vitalCapacityValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "3") {
                vualueList[i].resultValue = vualueList[i].resultValue + "s";
                this.runFiftyValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "4") {
                vualueList[i].resultValue = vualueList[i].resultValue + "cm";
                this.sitAndReachValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "5") {
                vualueList[i].resultValue = vualueList[i].resultValue + "次";
                this.oneMinuteRopeSkippingValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "6") {
                vualueList[i].resultValue = vualueList[i].resultValue + "次";
                this.oneMinuteSitUpValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "7") {
                vualueList[i].resultValue =
                  Math.floor(vualueList[i].resultValue / 60) +
                  "'" +
                  (vualueList[i].resultValue % 60);
                this.runFiftyEightValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "8") {
                vualueList[i].resultValue = vualueList[i].resultValue + "cm";
                this.standingJumpValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "9") {
                vualueList[i].resultValue = vualueList[i].resultValue + "次";
                this.pullUpsValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "10") {
                vualueList[i].resultValue =
                  Math.floor(vualueList[i].resultValue / 60) +
                  "'" +
                  (vualueList[i].resultValue % 60);
                this.runThousandValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "11") {
                vualueList[i].resultValue =
                  Math.floor(vualueList[i].resultValue / 60) +
                  "'" +
                  (vualueList[i].resultValue % 60);
                this.runEightHundredValueList.push(vualueList[i]);
              } else if (vualueList[i].schoolTestId == "12") {
                vualueList[i].resultValue = vualueList[i].resultValue + "kg";
                this.weightList.push(vualueList[i]);
              }
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    //返回
    pageToClassList() {
      this.$router.go(-1);
    },
    saveStudentTestInfo(schoolTestId) {
      let value = "";
      if (schoolTestId == "1") {
        value = this.height;
        this.height = "";
      } else if (schoolTestId == "2") {
        value = this.vitalCapacityValue;
        this.vitalCapacityValue = "";
      } else if (schoolTestId == "3") {
        value = this.runFiftyValue;
        this.runFiftyValue = "";
      } else if (schoolTestId == "4") {
        value = this.sitAndReachValue;
        this.sitAndReachValue = "";
      } else if (schoolTestId == "5") {
        value = this.oneMinuteRopeSkippingValue;
        this.oneMinuteRopeSkippingValue = "";
      } else if (schoolTestId == "6") {
        value = this.oneMinuteSitUpValue;
        this.oneMinuteSitUpValue = "";
      } else if (schoolTestId == "7") {
        let tempValue = [];
        let tvalue = this.runFiftyEightValue;
        if (tvalue.indexOf("'") != -1) {
          tempValue = tvalue.split("'");
        } else if (tvalue.indexOf("′") != -1) {
          tempValue = tvalue.split("′");
        } else {
          tempValue = [tvalue];
        }
        if (
          tempValue.length > 1 &&
          tempValue[1] != null &&
          tempValue[1] != ""
        ) {
          if (parseInt(tempValue[1]) > 60) {
            this.$Message.info("秒不能大于60！");
            return false;
          }
          value = parseInt(tempValue[0]) * 60 + parseInt(tempValue[1]);
        } else {
          value = parseInt(tempValue[0]) * 60;
        }
        this.runFiftyEightValue = "";
      } else if (schoolTestId == "8") {
        value = this.standingJumpValue;
        this.standingJumpValue = "";
      } else if (schoolTestId == "9") {
        value = this.pullUpsValue;
        this.pullUpsValue = "";
      } else if (schoolTestId == "10") {
        let tempValue = [];
        let tvalue = this.runThousandValue;
        if (tvalue.indexOf("'") != -1) {
          tempValue = tvalue.split("'");
        } else if (tvalue.indexOf("′") != -1) {
          tempValue = tvalue.split("′");
        } else {
          tempValue = [tvalue];
        }
        if (
          tempValue.length > 1 &&
          tempValue[1] != null &&
          tempValue[1] != ""
        ) {
          if (parseInt(tempValue[1]) > 60) {
            this.$Message.info("秒不能大于60！");
            return false;
          }
          value = parseInt(tempValue[0]) * 60 + parseInt(tempValue[1]);
        } else {
          value = parseInt(tempValue[0]) * 60;
        }
        this.runThousandValue = "";
      } else if (schoolTestId == "11") {
        let tempValue = [];
        let tvalue = this.runEightHundredValue;
        if (tvalue.indexOf("'") != -1) {
          tempValue = tvalue.split("'");
        } else if (tvalue.indexOf("′") != -1) {
          tempValue = tvalue.split("′");
        } else {
          tempValue = [tvalue];
        }
        if (
          tempValue.length > 1 &&
          tempValue[1] != null &&
          tempValue[1] != ""
        ) {
          if (parseInt(tempValue[1]) > 60) {
            this.$Message.info("秒不能大于60！");
            return false;
          }
          value = parseInt(tempValue[0]) * 60 + parseInt(tempValue[1]);
        } else {
          value = parseInt(tempValue[0]) * 60;
        }
        this.runEightHundredValue = "";
      } else if (schoolTestId == "12") {
        value = this.weight;
        this.weight = "";
      }
      if (value == "") {
        this.$Message.info("测试值不能为空！");
        return false;
      }
      let paramData = {
        schoolId: this.schoolId,
        yearSemester: this.yearSemester,
        schoolTestId: schoolTestId,
        classId: this.classId,
        studentId: this.studentId,
        resultValue: value,
        teacherId: sessionStorage.getItem("teacherId")
      };
      this.loadingInfo = "1";
      this.$axios.post("/v1/test/edit/saveStudentTestValue", paramData).then(res => {
              this.loadingInfo = "0";
              if (res.data.code == 10000) {
                this.$Message.info("保存成功！");
                this.queryStudentTestInfo();
              } else {
                if (res.data.code > 39999) {
                  this.$Message.info(res.data.msg);
                }
              }
            });
    }
  },
  mounted() {
    if (this.schoolType == "2" || this.schoolType == "4") {
      this.resultColumns = this.resultColumns3;
    }
    const queryData = this.$route.params;
    console.log('queryData',queryData)
    this.activityId = queryData.activityId || '';
    this.studentId = queryData.studentId;
    this.studentName = queryData.studentName;
    this.startSchool = queryData.startSchool;
    this.gradeName = queryData.gradeName;
    this.gender = queryData.gender;
    this.registerCode = queryData.registerCode;
    this.isEdit = queryData.isEdit;
    this.semesterStatus = queryData.semesterStatus;
    this.yearSemester = queryData.yearSemester;
    this.schoolId = sessionStorage.getItem("schoolId");
    this.queryStudentTestInfo();
  }
};
</script>
