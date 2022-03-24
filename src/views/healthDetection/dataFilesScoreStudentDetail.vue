<template>
  <div style="padding-left:10px;">
      <h2 style="margin-top:15px;margin-bottom:13px;"> {{studentName}}</h2>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input" style="align-items:center">
                <div style="margin:5px 20px;">
                    <span style="margin-left:0px;">学籍号：</span>{{registerCode}}
                </div>
                <div style="margin:5px 20px;">
                    <span style="margin-left:40px;">班级：</span>{{gradeName}}{{studentClass}}班
                </div>
                <div style="margin:5px 20px;">
                    <span style="margin-left:40px;">性别：</span>{{gender=="1"?"男":"女"}}
                </div>
                <div style="margin:5px 20px;">
                    <span style="margin-left:40px;">当前学期：</span>{{semesterName}}
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="goback">返回</Button>
            </div>
        </div>
      </Card>
      <br>
      <Card>
        <Tabs type="card" value="testScore">
            <TabPane name="testScore" :label="testPercentName">
                <div v-if="testInfoStatus">
                    <div style="margin-left:20px;float:left;width:160px;" >得分：{{testExemptType != null && testExemptType == '1'?'70分（免试）':'80分（免试）'}}</div>
                    <div style="margin-left:60px;float:left;width:160px;" >等级：{{testExemptType != null && testExemptType == '1'?'及格':'良好'}} </div>
                </div>
                <div style="margin-top:0px;"  v-if="!testInfoStatus">
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="height" placeholder="请输入测量值(cm)" :maxlength="11" style="width:180px"/>
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <!--                            <Button style="margin-left:10px;" :disabled="!(heightList && heightList.length>0 && heightList[0].teacherId==teacherId)" @click="saveStudentTestInfo('1')" type="success">保存</Button>-->
                                    <Button
                                            style="margin-left:10px;"
                                            @click="saveStudentTestInfo('1')"
                                            type="success"
                                    >保存</Button>
                                </Col>
                            </Row>
                            <Row style="margin-top:20px;">
                                <Col span="24">
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="weight" placeholder="请输入测量值(kg)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="vitalCapacityValue" placeholder="请输入测量值(ml)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                    >50米跑：{{userData.runFiftyValue == null?"--":userData.runFiftyValue+" s"}}</div>
                                    <div
                                            style="float:left;width:160px;"
                                    >得分：{{userData.runFiftyScore!=null?userData.runFiftyScore:"--"}}</div>
                                    <div
                                            style="float:left;width:160px;"
                                    >等级：{{userData.runFiftyLevel=="1"?"优秀":userData.runFiftyLevel=="2"?"良好":userData.runFiftyLevel=="3"?"及格":userData.runFiftyLevel=="4"?"不及格":"--"}}</div>
                                </Col>
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="runFiftyValue" placeholder="请输入测量值(秒)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
                                            @click="saveStudentTestInfo('3')"
                                            type="success"
                                    >保存</Button>
                                </Col>
                            </Row>
                            <Row style="margin-top:20px;">
                                <Col>
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="standingJumpValue" placeholder="请输入测量值(cm)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="sitAndReachValue" placeholder="请输入测量值(cm)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="runEightHundredValue" placeholder="请输入测量值(分'秒“)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
                                            @click="saveStudentTestInfo('11')"
                                            type="success"
                                    >保存</Button>
                                </Col>
                            </Row>
                            <Row style="margin-top:20px;">
                                <Col>
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="runThousandValue" placeholder="请输入测量值(分'秒“)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="oneMinuteRopeSkippingValue" placeholder="请输入测量值(次)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="oneMinuteSitUpValue" placeholder="请输入测量值(次)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="3">
                                    <Input v-model="runFiftyEightValue" placeholder="请输入测量值(分'秒)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="5">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="oneMinuteSitUpValue" placeholder="请输入测量值(次)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                                <Col v-show="editStatus" span="5">
                                    <Input v-model="pullUpsValue" placeholder="请输入测量值(次)" :maxlength="11" />
                                </Col>
                                <Col v-show="editStatus" span="2">
                                    <Button
                                            style="margin-left:10px;"
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
                    </Form>
                </div>
            </TabPane>
            <TabPane name="visionTest" :label="visionPercentName">
                <Card>
                    <!-- 2021年之前的展示方式，包括串镜和屈光不正等 -->
                    <div v-if="yearSemester < 20212">
                        <Row style="margin-bottom:20px;">
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:75px;text-align:right;">裸眼视力：</div>
                                <div
                                        style="float:left;width:200px;"
                                >左眼：{{testVision.leftVision == null?"--":testVision.leftVision}}</div>
                                <div
                                        style="float:left;width:200px;"
                                >右眼：{{testVision.rightVision == null?"--":testVision.rightVision}}</div>
                            </Col>
                            <Col v-show="editStatus" span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">裸眼视力：</div>
                                <div>
                                    <font style="margin-left:3px;">左眼：</font>
                                    <Input
                                            style="width:120px"
                                            v-model="leftVision"
                                            placeholder="请输入测量值"
                                            :maxlength="11"
                                    />
                                    <font style="margin-left:10px;">右眼：</font>
                                    <Input
                                            style="width:120px"
                                            v-model="rightVision"
                                            placeholder="请输入测量值"
                                            :maxlength="11"
                                    />
                                    <Button
                                            @click="newSaveStudentVision('old')"
                                            type="success"
                                    >保存</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row style="margin-bottom:20px;">
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:75px;text-align:right;">串镜：</div>
                                <div
                                        style="float:left;width:200px;"
                                >左眼：{{testVision.leftMirror=="0"?"正常":testVision.leftMirror=="1"?"正片上升、负片下降":testVision.leftMirror=="-1"?"正片下降、负片上升":testVision.leftMirror=="2"?"其他":testVision.leftMirror=="9"?"未测试":"--"}}</div>
                                <div
                                        style="float:left;width:200px;"
                                >右眼：{{testVision.rightMirror=="0"?"正常":testVision.rightMirror=="1"?"正片上升、负片下降":testVision.rightMirror=="-1"?"正片下降、负片上升":testVision.rightMirror=="2"?"其他":testVision.rightMirror=="9"?"未测试":"--"}}</div>
                            </Col>
                            <Col v-show="editStatus" span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">串镜：</div>
                                <div>
                                    <font style="margin-left:3px;">左眼：</font>
                                    <Select v-model="leftMirror" style="width:120px;" v-if="leftMirror !='0'">
                                        <Option
                                                v-for="item in mirrorList"
                                                :value="item.value"
                                                :key="item.value"
                                        >{{ item.name }}</Option>
                                    </Select>
                                    <span v-if="leftMirror =='0'" style="line-height:30px;">
                                        <Input disabled style="width:120px" value="不需使用串镜检查" />
                                    </span>
                                    <font style="margin-left:10px;">右眼：</font>
                                    <span v-if="rightMirror =='0'" style="line-height:30px;">
                                        <Input style="width:120px" disabled value="不需使用串镜检查" />
                                    </span>
                                    <Select v-model="rightMirror" style="width:120px" v-if="rightMirror !='0'">
                                        <Option
                                                v-for="item in mirrorList"
                                                :value="item.value"
                                                :key="item.value"
                                        >{{ item.name }}</Option>
                                    </Select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:75px;text-align:right;">屈光不正：</div>
                                <div
                                        style="float:left;width:200px;"
                                >左眼：{{testVision.leftLight=="0"?"正常":testVision.leftLight=="1"?"近视":testVision.leftLight=="2"?"远视":testVision.leftLight=="3"?"其他":"--"}}</div>
                                <div
                                        style="float:left;width:200px;"
                                >右眼：{{testVision.rightLight=="0"?"正常":testVision.rightLight=="1"?"近视":testVision.rightLight=="2"?"远视":testVision.rightLight=="3"?"其他":"--"}}</div>
                            </Col>
                            <Col v-show="editStatus" span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">屈光不正：</div>
                                <div>
                                    <font style="margin-left:3px;">左眼：</font>
                                    <Select :disabled="true" v-model="leftLight" style="width:120px">
                                        <Option
                                                :disabled="true"
                                                v-for="item in lightList"
                                                :value="item.value"
                                                :key="item.value"
                                        >{{ item.name }}</Option>
                                    </Select>
                                    <font style="margin-left:10px;">右眼：</font>
                                    <Select :disabled="true" v-model="rightLight" style="width:120px;">
                                        <Option
                                                :disabled="true"
                                                v-for="item in lightList"
                                                :value="item.value"
                                                :key="item.value"
                                        >{{ item.name }}</Option>
                                    </Select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <!-- 2021年之后的展示方式，不包括串镜和屈光不正等 -->
                    <div v-else>
                        <!-- 裸眼视力 -->
                        <Row style="margin-bottom:20px;">
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:100px;text-align:right;">裸眼视力：</div>
                                <div
                                    style="float:left;width:200px;"
                                >左眼：{{testVision.leftVision == null?"--":testVision.leftVision}}</div>
                                <div
                                    style="float:left;width:200px;"
                                >右眼：{{testVision.rightVision == null?"--":testVision.rightVision}}</div>
                            </Col>
                            <Col span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">裸眼视力：</div>
                                <div>
                                    <span style="margin-left:3px;">左眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.leftVision"
                                    placeholder="请输入测量值"
                                    :maxlength="11"
                                    />
                                    <span style="margin-left:10px;">右眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.rightVision"
                                    placeholder="请输入测量值"
                                    :maxlength="11"
                                    />
                                    <Button
                                    style="margin-left:10px;"
                                    @click="newSaveStudentVision('new')"
                                    type="success"
                                    >保存</Button>
                                </div>
                            </Col>
                        </Row>
                        <!-- 屈光球镜 -->
                        <Row style="margin-bottom:20px;">
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:100px;text-align:right;">屈光球镜S：</div>
                                <div
                                    style="float:left;width:200px;"
                                >左眼：{{testVision.leftBall ? testVision.leftBall : "--"}}</div>
                                <div
                                    style="float:left;width:200px;"
                                >右眼：{{testVision.rightBall ? testVision.rightBall : "--"}}</div>
                            </Col>
                            <Col span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">屈光球镜S：</div>
                                <div>
                                    <span style="margin-left:3px;">左眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.leftBall"
                                    placeholder="请输入测量值"
                                    />
                                    <span style="margin-left:10px;">右眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.rightBall"
                                    placeholder="请输入测量值"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row style="margin-bottom:20px;">
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:100px;text-align:right;">屈光柱镜C：</div>
                                <div
                                    style="float:left;width:200px;"
                                >左眼：{{testVision.leftColumn ? testVision.leftColumn : "--"}}</div>
                                <div
                                    style="float:left;width:200px;"
                                >右眼：{{testVision.rightColumn ? testVision.rightColumn : "--"}}</div>
                            </Col>
                            <Col span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">屈光柱镜C：</div>
                                <div>
                                    <span style="margin-left:3px;">左眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.leftColumn"
                                    placeholder="请输入测量值"
                                    />
                                    <span style="margin-left:10px;">右眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.rightColumn"
                                    placeholder="请输入测量值"
                                    />
                                    
                                </div>
                            </Col>
                        </Row>
                        <Row style="margin-bottom:20px;">
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;width:100px;text-align:right;">屈光轴位A：</div>
                                <div
                                    style="float:left;width:200px;"
                                >左眼：{{testVision.leftAxis ? testVision.leftAxis : "--"}}</div>
                                <div
                                    style="float:left;width:200px;"
                                >右眼：{{testVision.rightAxis ? testVision.rightAxis : "--"}}</div>
                            </Col>
                            <Col span="12">
                                <div style="float:left;width:100px;padding-top:4px;text-align:right;">屈光轴位A：</div>
                                <div>
                                    <span style="margin-left:3px;">左眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.leftAxis"
                                    placeholder="请输入测量值"
                                    type="number"
                                    />
                                    <span style="margin-left:10px;">右眼：</span>
                                    <Input
                                    style="width:120px"
                                    v-model="detailVisionData.rightAxis"
                                    placeholder="请输入测量值"
                                    type="number"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12" style="padding-top:5px;">
                                <div style="float:left;text-align:right;">是否为角膜塑形镜（OK镜）佩戴者：</div>
                                <div style="float:left;width:50px;">{{testVision.glassesWearer == '1' ? '是' : testVision.glassesWearer == '0' ?'否':'未测试'}}</div>
                            </Col>
                            <Col span="12">
                            <div style="float:left;padding-top:4px;text-align:right;">是否为角膜塑形镜（OK镜）佩戴者：</div>
                            <Select v-model="detailVisionData.glassesWearer" style="width:120px;">
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                            </Col>
                        </Row>
                    </div>
                    <Row style="margin-top:30px;">
                        <Col>
                            <Table border :columns="yearSemester < 20212 ? visionHistoryColumnsOld : visionHistoryColumns" :data="historyVision"></Table>
                        </Col>
                    </Row>
                </Card>
            </TabPane>
            <TabPane name="learnScore" :label="learnPercentName">
                <div style="margin-top:0px;" >
                    <div>
                        <div style="margin-left:20px;float:left;width:160px;" >
                            得分：{{firstYearSemesterScore ==null?"--":(firstYearSemesterScore.learnScore/100).toFixed(1)+"分"}}{{firstYearSemesterScore != null && firstYearSemesterScore.classChoose == 1?'（免试）':""}}

                        </div>
                        <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null?"--":firstYearSemesterScore.learnScoreLevel}} </div>
                        <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null?"--":firstYearSemesterScore.learnScoreScore+'分'}}</div>
                    </div>
                    <div style="clear:both" >
                        <Row v-if="firstYearSemesterScore!=null&& 1 != firstYearSemesterScore.classChoose">
                        <div style >
                            <Table border max-height="270" :loading="loading" :columns="learnColumns" :data="learnResultDataFirst"></Table>
                        </div>
                        </Row>
                    </div>
                </div>
            </TabPane>
            <TabPane name="healthScore" :label="healthPercentName">
                <div  style="margin-top:0px;" >
                    <div>
                        <div style="margin-left:20px;float:left;width:160px;" >得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.healthOver != '1' ?"--":(firstYearSemesterScore.healthScore/100).toFixed(1)+"分"}}{{firstYearSemesterScore != null && firstYearSemesterScore.healthChoose == 1?'（免试）':""}}</div>
                        <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null || firstYearSemesterScore.healthOver != '1' ?"--":firstYearSemesterScore.healthScoreLevel}} </div>
                        <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.healthOver != '1' ?"--":firstYearSemesterScore.healthScoreScore+'分'}}</div>
                    </div>
                    <div  style="clear:both">
                        <Row v-if="firstYearSemesterScore!=null&& 1 != firstYearSemesterScore.healthChoose">
                            <Table border max-height="270" :loading="loading" :columns="healthColumns" :data="healthResultDataFirst"></Table>
                        </Row>
                    </div>
                </div>

            </TabPane>
            <TabPane  name="actionScore" :label="actionPercentName">
                <div  style="margin-top:0px;" >
                    <div>
                        <div style="margin-left:20px;float:left;width:100px;" >得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.actionOver != '1' ?"--":(firstYearSemesterScore.actionScore/100).toFixed(1)+"分"}} </div>
                        <div style="margin-left:60px;float:left;width:100px;" >等级：{{firstYearSemesterScore ==null || firstYearSemesterScore.actionOver != '1' ?"--":firstYearSemesterScore.actionScoreLevel}} </div>
                        <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.actionOver != '1' ?"--":firstYearSemesterScore.actionScoreScore+'分'}}</div>
                    </div>
                    <div  style="clear:both">
                        <Row>
                        <div style>
                            <Table border max-height="550" :loading="loading" :columns="resultColumnsAction" :data="actionList">
                                <template slot-scope="{ row, index }" slot="action">
                                    <div v-for="(item,i) in row.examList" :style="row.examList.length>1&&row.examList.length-1 != i ?{borderBottom:'1px #DFD9DE solid'}:''" style="width:100%;height:30px;line-height:30px;" >
                                        <Button type="success" size="small" :disabled="((item.exemptStatus==1)|| (!subjectEditStatus))"  @click="saveShowType(row,i)">编辑</Button>
                                    </div>
                                </template>
                            </Table>
                        </div>
                        </Row>
                    </div>
                </div>
            </TabPane>
            <TabPane  name="staminaScore" v-if="staminaPercentName" :label="staminaPercentName">
                <div  style="margin-top:0px;" >
                    <div>
                        <div style="margin-left:20px;float:left;width:100px;" >得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.staminaOver != '1' ?"--":(firstYearSemesterScore.staminaScore/100).toFixed(1)+"分"}} </div>
                        <div style="margin-left:60px;float:left;width:100px;" >等级：{{firstYearSemesterScore ==null || firstYearSemesterScore.staminaOver != '1' ?"--":firstYearSemesterScore.staminaScoreLevel}} </div>
                        <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.staminaOver != '1' ?"--":firstYearSemesterScore.staminaScoreScore+'分'}}</div>
                    </div>
                    <div  style="clear:both">
                        <Row>
                        <div style>
                            <Table border max-height="550" :loading="loading" :columns="resultColumnsAction" :data="staminaList">
                                <template slot-scope="{ row, index }" slot="action">
                                    <div v-for="(item,i) in row.examList" :style="row.examList.length>1&&row.examList.length-1 != i ?{borderBottom:'1px #DFD9DE solid'}:''" style="width:100%;height:30px;line-height:30px;" >
                                        <Button type="success" size="small" :disabled="(item.exemptStatus==1)|| (!subjectEditStatus)"  @click="saveShowType(row,i)">编辑</Button>
                                    </div>
                                </template>
                            </Table>
                        </div>
                        </Row>
                    </div>
                </div>
            </TabPane>
            <TabPane name="homeworkScore" :label="homeworkPercentName">
                <div style="margin-top:0px;" >
                    <div>
                        <div style="margin-left:20px;float:left;width:160px;" >得分：{{firstYearSemesterScore ==null ?"--":(firstYearSemesterScore.homeworkScore/100).toFixed(1)+"分"}}{{firstYearSemesterScore != null && firstYearSemesterScore.afterClassChoose == 1?'（免试）':""}} </div>
                        <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null ?"--":firstYearSemesterScore.homeworkScoreLevel}} </div>
                        <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null ?"--":firstYearSemesterScore.homeworkScoreScore+'分'}}</div>
                    </div>
                    <div  style="clear:both">
                        <Row  v-if="firstYearSemesterScore!=null&&1 != firstYearSemesterScore.afterClassChoose">
                        <div style>
                            <Table border max-height="270" :loading="loading" :columns="homeworkColumns" :data="homeworkResultDataFirst"></Table>
                        </div>
                        </Row>
                    </div>
                </div>
            </TabPane>
        </Tabs>
      </Card>
    </div>
      <Modal
              v-model="modalhealth"
              title="编辑得分"
              @on-ok="modalHealthOk"
              ok-text="保存">
          <div >
                  <span  >得分：</span>
                  <Input v-model="editHealthScore"  style="width: 220px;" />
          </div>
          <div slot="footer">
              <Button type="success" @click="modalHealthOk">保存</Button>
              <Button type="success" @click="madalHealthCancel">取消</Button>
          </div>
      </Modal>
      <Modal v-model="showModel11" title="修改成绩" @on-ok="submit" >
          <p v-if="examItemType==1">
        <span>
          成绩：
          <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
        </span>
              <span style="margin-left:20px;">得分：{{score}}</span>
              <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
          </p>
          <p v-if="examItemType==2">
        <span>
          得分：
          <Input v-model="teacherScore" size="small" style="width:180px;" placeholder="得分"></Input>
        </span>
              <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
          </p>
          <div v-if="examItemType==4">
              <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
                  <span style="margin-left:20px;">得分范围：{{scoreStart}}--{{scoreEnd}}</span>
                  <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
              </p>
              <p style="margin-top:20px;">
                  请老师选择得分：
              </p>
              <div style="height:24px;width:18px;display: inline-table;background-color: #E9E9E9;margin-left:20px;" @click="chosse1(idindex,item.value)" class="fwdf" :id="'div1'+idindex" v-for="item,idindex in scoreList">
                  <p style="text-align:center">{{item.name}}</p>
              </div>
          </div>
          <div v-if="examItemType==3">
              <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
                  <span style="margin-left:20px;">得分：{{score}}</span>
                  <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
              </p>
              <p style="margin-top:20px;">
                  请老师选择技评分数：
              </p>
              <br/>
              <div style="height:43px;width:89px;display: inline-table;background-color: #E9E9E9;margin-left:20px;" @click="chosse(idindex,item.testScore)" class="jpdf" :id="'div'+idindex" v-for="item,idindex in scoreRemarkList">
                  <p style="text-align:center">{{item.scoreRemark}}</p>
                  <p style="text-align:center">{{parseInt(item.testScore*(100-examItemPercent)/100)}}</p>
              </div>
          </div>
          <div v-if="examItemType==5">
              <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
                  <span style="margin-left:20px;">得分：{{score}}</span>
                  <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
              </p>
              <p style="margin-top:20px;">
                  请老师填写技评得分：<Input v-model="teacherScore" size="small" style="width:180px;" placeholder="技评得分"></Input>
              </p>

          </div>

      </Modal>
  </div>
</template>

<script>
import mixins from './dataFilesScoreStudentDetailMixins'
import api from '@/api/visionTest/studentVisionManage/visionManage'
export default {
  name: "schoolList",
  mixins: [ mixins ],
  data() {
    return {
        testExemptType: '',
        testInfoStatus: false,
        testApplyStatus: '',
        subjectApplyStatus: '',
        testReportingStatus: '',
        subjectReportingStatus: '',
        actionList: [],
        staminaList: [],
        standardList:[],
        baseStandard:[
            {
                start:10,
                end:59,
                level:"4"
            },
            {
                start:60,
                end:74,
                level:"3"
            },
            {
                start:75,
                end:89,
                level:"2"
            },
            {
                start:90,
                end:100,
                level:"1"
            },
        ],
        scoreList:[],
        scoreRemarkList:[],
        classId: '',
        classTestType: "",
        resultValue: "",
        resultValueShow:"",
        score: "",
        scoreLevelNew: "",
        baseScore: "",
        teacherScore: "",
        examItemType: "",
        scoreStart:'',
        scoreEnd:'',
        showModel11: false,
        studentScoreId: '',
        paperId: '',
        modalhealth: false,
        editHealthScore: '',
        schoolId: '',
        signatureList:[],
        selectTabName:"",
        loading: false,
        studentId:"",
        studentName:"",
        registerCode:"",
        gender:"",
        grade:"",
        startSchool:"",
        studentClass:"",
        schoolType:"",
        firstYearSemester:"",
        secondYearSemester:"",
        gradeName:"",
        firstYearSemesterScore:null,
        secondYearSemesterScore:null,
        haveFirst:"0",
        haveSecond:"0",
        testPercentName:"体质测试",
        actionPercentName:"运动技能",
        healthPercentName:"健康教育知识",
        staminaPercentName:"体能",
        learnPercentName:"学习态度",
        homeworkPercentName:"体育课后作业",
        athleticContestTopScoreName:"体育竞赛",
        visionPercentName:'视力测试',
        testResultDataFirst:[],
        testResultDataSecond:[],
        actionResultDataFirst:[],
        actionResultDataSecond:[],
        healthResultDataFirst:[],
        healthResultDataSecond:[],
        staminaResultDataFirst:[],
        staminaResultDataSecond:[],
        learnResultDataFirst:[],
        learnResultDataSecond:[],
        homeworkResultDataFirst:[],
        homeworkResultDataSecond:[],

      athleticColumns: [
        {
          title: "活动日期",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "活动名称",
          key: "studentName",
          align: "center",
          minWidth:100,
        },
        {
          title: "活动类型",
          key: "registerC12ode",
          align: "center",
          minWidth:100,
        },
        {
          title: "加分",
          key: "registerCo12de",
          align: "center",
          width:250,
        },
      ],
      testColumns: [
        {
          title: "测试时间",
          key: "testTime",
          align: "center",
          minWidth:100
        },
        {
          title: "项目名称",
          key: "examItemName",
          align: "center",
          minWidth:100
        },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          width:500,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.visionType == '1'){
                  text+="<div style='float:left;border-right:1px #BFC9CE solid;width:25%;padding-top:5px;'><div>裸眼视力</div><div style='text-align:center;'>左眼："+row.leftVision+"</div>"
                  text+='<div style="text-align:center;">右眼：'+row.rightVision+"</div></div>"
                  text+="<div  style='float:left;border-right:1px #BFC9CE solid;width:50%;padding-top:5px;'><div>串镜</div><div style='text-align:left;'>&nbsp;&nbsp;&nbsp;&nbsp;左眼："+(row.leftMirror=="0"?"正常":row.leftMirror=="1"?"正片上升、负片下降":row.leftMirror=="-1"?"正片下降、负片上升":row.leftMirror=="2"?"其他":row.leftMirror=="9"?"未测试":"--")+"</div>"
                  text+='<div style="text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;右眼：'+(row.rightMirror=="0"?"正常":row.rightMirror=="1"?"正片上升、负片下降":row.rightMirror=="-1"?"正片下降、负片上升":row.rightMirror=="2"?"其他":row.rightMirror=="9"?"未测试":"--")+"</div></div>"
                  text+="<div  style='float:left;width:25%;padding-top:5px;padding-bottom:5px;'><div>屈光不正</div><div style='text-align:center;' >左眼："+(row.leftLight=="0"?"正常":row.leftLight=="1"?"近视":row.leftLight=="2"?"远视":row.leftLight=="3"?"其他":"未测试")+"</div>"
                  text+='<div  style="text-align:center;">右眼：'+(row.rightLight=="0"?"正常":row.rightLight=="1"?"近视":row.rightLight=="2"?"远视":row.rightLight=="3"?"其他":"未测试")+"</div></div>"
            }else{
              text = row.examResult;
            }
            return h("div", {
                domProps: {
                  innerHTML: text
                }
              });
          }
        },
        {
          title: "得分",
          key: "score",
          align: "center",
          minWidth:100
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.scoreLevel == "1" ? "优秀" :params.row.scoreLevel == "2" ? "良好" :params.row.scoreLevel == "3" ? "及格" :params.row.scoreLevel == "4"?"不及格":"-")
            ]);
          }
        },
      ],
      healthColumns: [
        {
          title: "考核时间",
          key: "createTime",
          align: "center",
          minWidth:100,
            render: (h, params) => {
                const text = `${params.row.createTime != null? params.row.createTime :'未考核' }`
                return h('div', text)
            }
        },
        {
          title: "考核老师",
          key: "teacherName",
          align: "center",
          minWidth:100,
            render: (h, params) => {
                const text = `${params.row.teacherName != null? params.row.teacherName :'-' }`
                return h('div', text)
            }
        },
        {
          title: "得分",
          key: "teacherScore",
          align: "center",
          minWidth:100,
            render: (h, params) => {
                const text = `${params.row.teacherScore != null? (params.row.teacherScore/100).toFixed(2) :'0' }`
                return h('div', text)
            }
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("font", params.row.teacherScore >= 9000 ? "优秀" :params.row.teacherScore >= 8000 ? "良好" :params.row.teacherScore >= 6000 ? "及格" : "不及格");
          }
        },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                        disabled: !this.subjectEditStatus
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.editHealthDetail(params.row)
                      }
                    }
                  },
                  "编辑"
                )
              ])
            }
          }
      ],
      examColumns: [
        {
          title: "考核时间",
          key: "testTime",
          align: "center",
          minWidth:100,
        },
        {
          title: "项目名称",
          key: "classTestName",
          align: "center",
          minWidth:100,
        },
        {
          title: "考核内容",
          key: "examItemName",
          align: "center",
          minWidth:100,
        },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          minWidth:100,
        },
        {
          title: "得分",
          key: "score",
          align: "center",
          minWidth:100,
            render: (h, params) => {
                return h("font", params.row.score == null ? "0" :params.row.score);
            }
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("font", params.row.scoreLevel == "1" ? "优秀" :params.row.scoreLevel == "2" ? "良好" :params.row.scoreLevel == "3" ? "及格" : "不及格");
          }
        },
          {
              title: '操作',
              key: 'action',
              align: 'center',
              width: 120,
              render: (h, params) => {
                  return h('div', [
                      h(
                          'Button',
                          {
                              props: {
                                  type: 'success',
                              },
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.saveShowType(params.row);
                                  }
                              }
                          },
                          "编辑"
                      )
                  ])
              }
          }

      ],
        resultColumnsAction: [
            {
                title: "考核时间",
                key: "showTeacherScore",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if( j+1==classTest.examList.length){
                            text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                            text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        }

                        text+="<p>"+((null==data.createTime)?'-':(data.createTime))+"</p></div>"

                    }

                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "考核老师",
                key: "showTeacherScore",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if( j+1==classTest.examList.length){
                            text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                            text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        }

                        text+="<p>"+((null==data.teacherName)?'-':(data.teacherName))+"</p></div>"

                    }

                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "项目名称",
                key: "showItemTest",
                align: "center",
                minWidth :250,
                render: (h, params) => {
                    let row=params.row;
                    var text="";
                    let data=row;
                    let itemLength=data.examList.length;
                    text+="<div style='width:100%;height:"+30*itemLength+"px;line-height:"+30*itemLength+"px;' >"
                    text+="<p>"+data.classTestName+"</p></div>"
                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "考核内容",
                key: "showItemName",
                align: "center",
                minWidth :250,
                render: (h, params) => {
                    let row=params.row;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if( j+1==classTest.examList.length){
                            text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                            text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        }
                        text+="<p>"+data.examItemName+"</p></div>"
                    }
                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "成绩",
                key: "showItemValue",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        let showData=null;
                        if(data.resultValue){
                            if(data.examUnit && data.examUnit == "分.秒"){
                                showData=Number(data.resultValue)%60>0?(Math.floor(Number(data.resultValue)/60)+'\''+(Number(data.resultValue)%60)+'\"'):Number(data.resultValue)/60+'\'';
                            }else{
                                showData=data.examUnit != '99' ? data.resultValue +"("+data.examUnit+")" : data.resultValue;
                            }
                            if(j+1==classTest.examList.length){
                                text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                            }else{
                                text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                            }
                            if(!data.exemptType){
                                text+="<p>"+(showData?showData:"--")+"</p></div>"
                            }else{
                                text+="<p>免试</p></div>"
                            }
                        }else{
                            if(!data.exemptType){
                                // text+="<p>"+(showData?showData:"--")+"</p></div>"
                                if( j+1==classTest.examList.length){
                                    text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                                }else{
                                    text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                                }
                                text+="<p>未完成</p></div>"
                            }else{
                                if( j+1==classTest.examList.length){
                                    text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                                }else{
                                    text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                                }
                                text+="<p>免试</p></div>"
                            }
                        }
                    }

                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "成绩得分",
                key: "showBaseScore",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if(j+1==classTest.examList.length){
                            text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                            text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                            if(!data.exemptType){
                                text+="<p>"+(data.baseScore?data.baseScore:"--")+"</p></div>"
                            }else{
                                text+="<p>--</p></div>"
                            }
                        }else{
                            if(data.exemptType){
                                text+="<p>--</p></div>"
                            }else{
                                text+="<p>0</p></div>"
                            }
                        }


                    }

                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "技评得分",
                key: "showTeacherScore",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if( j+1==classTest.examList.length){
                            text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                            text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                            if(!data.exemptType){
                                text+="<p>"+(data.teacherScore?data.teacherScore:"--")+"</p></div>"
                            }else{
                                text+="<p>--</p></div>"
                            }
                        }else{
                            if(data.exemptType){
                                text+="<p>--</p></div>"
                            }else{
                                text+="<p>0</p></div>"
                            }
                        }
                    }

                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "总得分",
                key: "learnAttitudeScore",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row.list;
                    var text="";
                    let classTest=row
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if(j+1==classTest.examList.length){
                            text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                            text+="<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                            if(data.exemptStatus == '0'){
                                text+="<p>"+(data.score!=null?data.score:"--")+"</p></div>"
                            }else{
                                if(data.exemptType=="1"){
                                    text+="<p>70</p></div>"
                                }else{
                                    text+="<p>80</p></div>"
                                }
                            }
                        }else{
                            if(data.exemptStatus == '0'){
                                text+="<p>0</p></div>"
                            }else{
                                if(data.exemptType=="1"){
                                    text+="<p>70</p></div>"
                                }else{
                                    text+="<p>80</p></div>"
                                }
                            }
                        }


                    }

                    return h("div", {
                        domProps: {
                            innerHTML: text
                        }
                    });
                }
            },
            {
                title: "等级",
                key: "homeworkScore",
                align: "center",
                minWidth :100,
                render: (h, params) => {
                    let row=params.row;
                    let list=row;
                    var text="";
                    let classTest=row
                    let totalScore=0;
                    for(let j=0;j<classTest.examList.length;j++){
                        let data=classTest.examList[j];
                        if(data.exemptStatus == '1'){
                            if('1'==data.exemptType){
                                data.score = 70
                            }else if('2'==data.exemptType){
                                data.score = 80
                            }
                        }else{
                            if(!data.score){
                                data.score=0;
                            }
                        }
                        totalScore+=(data.score*data.scorePercent)/10000
                    }
                    text=(totalScore>=90)?"优秀":(totalScore>=80)?"良好":(totalScore>=60)?"及格":"不及格";
                    // if(classTest.examList.length>1){
                    //     text=text+"("+totalScore+")"
                    // }
                    return h("div", {
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
                minWidth :120,
                slot: 'action',
                //   render: (h, params) => {
                //       let row=params.row;
                //       let list=row;
                //       var text="";
                //           let classTest=row
                //           for(let j=0;j<classTest.examList.length;j++){
                //               let data=classTest.examList[j];
                //               if( j+1==classTest.examList.length){
                //                   text+="<div style='width:100%;height:30px;line-height:30px;' >"+
                //                   "<button   onclick='editResult()'>编辑</button></div>"
                //                 }else{
                //                   text+="<div style='width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >"+
                //                   "<button  onclick='editResult()'>编辑</button></div>"
                //                 }
                //           }
                //       return h("div", {
                //         domProps: {
                //             innerHTML: text
                //         }
                //       });
                //   }
            }
        ],
        learnColumns: [
            {
            title: '旷课',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.truancyCount == null){
                    row.truancyCount=0;
                }
                return h('div', row.truancyCount)
            }
            },
            {
            title: '病假',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.sickCount == null){
                    row.sickCount=0;
                }
                return h('div', row.sickCount)
            }
            },
            {
            title: '事假',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.thingCount == null){
                    row.thingCount=0;
                }
                return h('div', row.thingCount)
            }
            },
            {
            title: '迟到',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.lateCount == null){
                    row.lateCount=0;
                }
                return h('div', row.lateCount)
            }
            },
            {
            title: '早退',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.earlyCount == null){
                    row.earlyCount=0;
                }
                return h('div', row.earlyCount)
            }
            },
            {
            title: '违反纪律',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.violateDisciplineCount == null){
                    row.violateDisciplineCount=0;
                }
                return h('div', row.violateDisciplineCount)
            }
            },
            {
            title: '运动着装不符',
            key: 'studentClass',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.notAccordClothing == null){
                    row.notAccordClothing=0;
                }
                return h('div', row.notAccordClothing)
            }
            },
            {
            title: '扣分总次数',
            key: 'sumCount',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                const row = params.row;
                if(row.sumCount == null){
                    row.sumCount=0;
                }
                return h('div', row.sumCount)
            }
            },
            // {
            //   title: '操作',
            //   key: 'action',
            //   align: 'center',
            //   width: 120,
            //   render: (h, params) => {
            //     return h('div', [
            //       h(
            //         'Button',
            //         {
            //           props: {
            //             type: 'success',
            //             disabled: (params.row.sumCount != null && params.row.sumCount > 0 )?false:true
            //           },
            //           style: {
            //             marginRight: '5px'
            //           },
            //           on: {
            //             click: () => {
            //               this.toLearnDetail(params.row.yearSemester)
            //             }
            //           }
            //         },
            //         "详情"
            //       )
            //     ])
            //   }
            // }
        ],
      homeworkColumns: [
        {
          title: "有效完成/考核总次数",
          key: "studentClass",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            let needCount =
              row.needExerciseCount == null ? 0 : row.needExerciseCount;
            const text = haveCount + "/" + needCount;
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", text);
          }
        },
        {
          title: "累计锻炼总时长(分钟)",
          key: "comboTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.homeworkType == '1'){
              return h("div", "-");
            }
            let comboTime = row.comboTime == null ? 0 : row.comboTime;
            comboTime = comboTime/1000/60;
            comboTime = comboTime.toFixed(2);
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", comboTime);
          }
        },
          {
            title: "得分",
            key: "semesterName",
            align: "center",
          minWidth:100,
              render: (h, params) => {
                  return h("font", (this.firstYearSemesterScore.homeworkScore/100).toFixed(1)+"分");
              }
          },
          {
            title: "等级",
            key: "semesterName",
            align: "center",
          minWidth:100,
              render: (h, params) => {
                  return h("font", this.firstYearSemesterScore.homeworkScoreLevel);
              }
          }
      ],
      resultDataFirst:[],
        selectYear: '',
        yearSemester: '',
        reportingStatus: '',
        semesterName: '',
        editStatus: true,
        subjectEditStatus: true,
        gradeId: '',

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
        oneMinuteRopeSkippingValue: "",
        runFiftyEightValue: "",
        resultColumns: [
            {
                title: "测试值",
                key: "resultValue",
                align: "center",
          minWidth:100
            },
            {
                title: "录入时间",
                key: "createTime",
                align: "center",
          minWidth:100
            },
            {
                title: "考核老师",
                key: "name",
                align: "center",
          minWidth:100
            },
            {
                title: "参与老师",
                key: "joinTeacherName",
                align: "center",
          minWidth:100
            },
            {
                title: "考核类型",
                key: "supplementStatus",
                align: "center",
          minWidth:100,
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
                align: "center",
          minWidth:100
            },
            {
                title: "录入时间",
                key: "createTime",
                align: "center",
          minWidth:100
            },
            {
                title: "考核老师",
                key: "name",
                align: "center",
          minWidth:100
            },
            {
                title: "考核类型",
                key: "supplementStatus",
                align: "center",
          minWidth:100,
                render: (h, params) => {
                    let text = "正常";
                    if (params.row.supplementStatus == "2") {
                        text = "补测";
                    }
                    return h("div", text);
                }
            }
        ],
        
        testVision: {},
        historyVision: [],
        rightVision: "",
        leftVision: "",
        mirrorList: [
            {
                name: "正片上升、负片下降",
                value: "1"
            },
            {
                name: "正片下降、负片上升",
                value: "-1"
            },
            {
                name: "其他情况",
                value: "2"
            },
            {
                name: "未测试",
                value: "9"
            }
        ],
        rightMirror: "0",
        leftMirror: "0",
        lightList: [
            {
                name: "正常",
                value: "0"
            },
            {
                name: "近视",
                value: "1"
            },
            {
                name: "远视",
                value: "2"
            },
            {
                name: "其他",
                value: "3"
            },
            {
                name: "未测试",
                value: "9"
            }
        ],
        rightLight: "0",
        leftLight: "0"
    };
  },
  methods: {
      resultValueChange(){
          var vm=this;
          let type=vm.examItemType;
          let standList=vm.standardList;
          let examItemPercent=vm.examItemPercent;
          if(type=="2"){
              return;
          }
          if(!vm.teacherScore || !vm.score){
              vm.score='';
              vm.scoreLevelNew="5";
              vm.baseScore='';
          }

          if(type==1){
              for(var i=0;i<standList.length;i++){
                  if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
                      vm.score=standList[i].score;
                      vm.scoreLevelNew=standList[i].scoreLevel;
                  }
              }
          }else if(type==3){
              for(var i=0;i<standList.length;i++){
                  if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
                      vm.baseScore=standList[i].score;
                  }
              }
              if(!vm.baseScore){
                  vm.baseScore=0
              }
              let mScore=vm.baseScore*examItemPercent/100;
              vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
              if(vm.score<10){
                  vm.score=10;
              }
              for(var i=0;i<vm.baseStandard.length;i++){
                  if(vm.score>=vm.baseStandard[i].start && vm.score<=vm.baseStandard[i].end ){
                      vm.scoreLevelNew=vm.baseStandard[i].level;
                  }
              }
          }else if(type==4){
              vm.scoreList=[];
              let scoreOne=0;
              let scoreTwo=0;
              let scoreThree=0;
              let scoreFour=0;
              vm.scoreStart=0;
              vm.scoreEnd=0;
              for(var i=0;i<standList.length;i++){
                  if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
                      vm.scoreLevelNew=standList[i].scoreLevel;
                  }
                  if(standList[i].scoreLevel==1){
                      scoreOne=standList[i].score;
                  }
                  if(standList[i].scoreLevel==2){
                      scoreTwo=standList[i].score;
                  }
                  if(standList[i].scoreLevel==3){
                      scoreThree=standList[i].score;
                  }
                  if(standList[i].scoreLevel==4){
                      scoreFour=standList[i].score;
                  }
              }
              if(vm.scoreLevelNew==1){
                  vm.scoreStart=scoreOne;
                  vm.scoreEnd=100;
              }
              if(vm.scoreLevelNew==2){
                  vm.scoreStart=scoreTwo;
                  vm.scoreEnd=scoreOne-1;
              }
              if(vm.scoreLevelNew==3){
                  vm.scoreStart=scoreThree;
                  vm.scoreEnd=scoreTwo-1;
              }
              if(vm.scoreLevelNew==4){
                  vm.scoreStart=scoreFour;
                  vm.scoreEnd=scoreThree-1;
              }
              if(!vm.scoreLevelNew){
                  vm.scoreLevelNew=4;
              }
              let length=vm.scoreEnd-vm.scoreStart+1;
              for(var j=0;j<length;j++){
                  let num=Number(vm.scoreStart)+Number(j)
                  let data={
                      name:num,
                      value:num
                  }
                  vm.scoreList.push(data)
              }
          }else if(type==5){
              for(var i=0;i<standList.length;i++){
                  if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
                      vm.baseScore=standList[i].score;
                  }
              }
              if(!vm.baseScore){
                  vm.baseScore=0
              }
              let mScore=vm.baseScore*examItemPercent/100;
              vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
              if(vm.score<10){
                  vm.score=10;
              }
              for(var i=0;i<vm.baseStandard.length;i++){
                  if(vm.score>=vm.baseStandard[i].start && vm.score<=vm.baseStandard[i].end ){
                      vm.scoreLevelNew=vm.baseStandard[i].level;
                  }
              }
          }
      },

      chosse(idindex,testScore){
          var vm=this;
          document.getElementById("div"+idindex).style.background = "#00C693"
          for(var i=0;i<vm.scoreRemarkList.length;i++){
              if(i!=idindex){
                  document.getElementById("div"+i).style.background = "#E9E9E9"
              }
          };
          vm.teacherScore=testScore
      },
      chosse1(idindex,item){
          var vm=this;
          document.getElementById("div1"+idindex).style.background = "#00C693"
          for(var i=0;i<vm.scoreList.length;i++){
              if(i!=idindex){
                  document.getElementById("div1"+i).style.background = "#E9E9E9"
              }
          };
          vm.score=item
      },
      getTestUpdateRule(examItemId) {
          var vm = this;
          vm.examItemId = examItemId;
          vm.standardList=[]
          this.$axios
              .get(
                  "/v1/datafiles/getTestRule?grade=" +
                  vm.grade +
                  "&gender=" +
                  vm.gender +
                  "&classId=" +
                  vm.classId +
                  "&schoolType=" +
                  vm.schoolType +
                  "&examItemId=" +
                  examItemId +
                "&yearSemester=" +
                  vm.yearSemester
              )
              .then(res => {
                  if (res.data.code == 10000) {
                      let data = res.data.response;
                      vm.examItemType=data.examItemType2
                      vm.examUnit=data.examUnit;
                      vm.examItemPercent=data.examItemPercent;
                      vm.scoreRemarkList=data.scoreRemarkList;

                      if(data.standardVOS){
                          for(let i=0;i<data.standardVOS.length;i++){
                              if(vm.gender==data.standardVOS[i].gender){
                                  vm.standardList.push(data.standardVOS[i]);
                              }
                          }
                      }
                      // vm.standardList=data.standardVOS;
                  } else {
                      if (res.data.code > 39999) {
                          // this.$Message.info(res.data.msg);
                      }
                  }
              });
      },
      submit() {
          var vm = this;
          if(!vm.scoreLevelNew){
              vm.$Message.info("数据有误，请核对后提交");
              return false;
          }
          this.$axios
              .get(
                  "/v1/datafiles/saveTestResult?grade=" +
                  vm.gradeId +
                  "&studentId=" +
                  vm.studentId +
                  "&examItemId=" +
                  vm.examItemId +
                  "&resultValue=" +
                  vm.resultValue +
                  "&schoolType=" +
                  vm.schoolType +
                  "&score=" +
                  vm.score +
                  "&examItemType=" +
                  vm.examItemType +
                  "&scoreLevel=" +
                  vm.scoreLevelNew +
                  "&baseScore=" +
                  vm.baseScore +
                  "&teacherScore=" +
                  (vm.examItemType==2?"":vm.teacherScore) +
                  "&yearSemester=" +
                  vm.yearSemester
              )
              .then(function(res) {
                  if (res.data.code == 10000) {
                      if (res.data.response.code == 1) {
                          vm.$Message.info("操作成功！");
                          vm.getActionStaminaStudentInfo(vm.studentId, vm.yearSemester);

                      } else {
                          vm.$Message.info(res.data.response.msg);
                      }
                  } else {
                      if (res.data.code > 39999) {
                          vm.$Message.info(res.data.msg);
                      }
                  }
              })
              .catch(function(response) {
                  console.log(response);
              });
      },
      saveShowType(item,index) {
          var vm = this;
          var list1=document.getElementsByClassName("jpdf")
          var list2=document.getElementsByClassName("fwdf")

          if(list1){
              for(let i=0;i<list1.length;i++){
                  list1[i].style.background = "#E9E9E9"
              }
          }
          if(list2){
              for(let i=0;i<list2.length;i++){
                  list2[i].style.background = "#E9E9E9"
              }
          }
          vm.resultValue="";
          vm.resultValueShow="";
          vm.scoreStart='';
          vm.scoreEnd="";
          vm.scoreList=[];
          vm.score='';
          vm.scoreLevelNew="5"
          vm.baseScore='';
          vm.teacherScore='';
          vm.showModel11 = true;

          vm.classTestType = item.examList[index].classTestType;
          vm.examItemType = item.examList[index].examItemType;
          this.getTestUpdateRule(item.examList[index].examItemId)
      },
      modalHealthOk(){
          this.saveAllStudentHealthScore();
          this.modalhealth = false;
      },
      saveAllStudentHealthScore() {
          var vm = this
          let healthDataInfo = {
              studentId: vm.studentId,
              studentScoreId: vm.studentScoreId,
              registerCode: vm.registerCode,
              paperId: vm.paperId,
              teacherScore: vm.editHealthScore,
              studentName: vm.studentName
          }
          let list=[];
          list.push(healthDataInfo)

          let data=list
          var reg=/^\d{0,3}.[0-9]?$/;
          for(let i=0;i<data.length;i++){
              if(data[i].teacherScore){
                  if (!reg.test(data[i].teacherScore)) {
                      vm.$Message.info(data[i].studentName+"的分值输入有误！")
                      return false;
                  }
              }
          }
          this.$axios
              .post(
                  '/v1/datafiles/bathUpsertScore',data
              )
              .then(function(response) {
                  console.log(response)
                  if(response.data.response.code=='1'){
                      vm.$Message.info("提交成功")
                      vm.getStudentHealthList(vm.yearSemester);
                  }
              })
              .catch(function(response) {
                  //   console.log(response)
                  vm.$Message.info("提交失败")
              })
      },
      madalHealthCancel(){
        this.modalhealth = false;
      },
     selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-selectTabName',this.selectTabName);
     },
     goback(){ //返回
        this.$router.go(-1);
     },
    queryStudentScoreByStudentId() {
      var vm = this;
      this.$axios.get("/v1/datafiles/queryStudentHisScoreByStudentId?studentId="+vm.studentId+"&yearSemester="+vm.yearSemester).then(res => {
        if (res.data.code == 10000) {
          if(res.data.response != null && res.data.response.length > 0){
              if(res.data.response.length >= 1 ){
                  vm.firstYearSemesterScore = res.data.response[0];
                  vm.haveFirst='1';
                  if(this.yearSemester%2 == 0){
                      this.setShowLableName(res.data.response[0]);
                  }else {
                      this.setShowLableNameNotTest(res.data.response[0]);
                  }
              }
          }
          if(vm.firstYearSemesterScore != null){
              //一学期免试计算
              if(1 == vm.firstYearSemesterScore.testChoose && 1 ==vm.firstYearSemesterScore.testExemptType){
                vm.firstYearSemesterScore.testScore = 7000
             }else if(1 == vm.firstYearSemesterScore.testChoose && 2 ==vm.firstYearSemesterScore.testExemptType){
                vm.firstYearSemesterScore.testScore = 8000
             }
              if(1 == vm.firstYearSemesterScore.classChoose && 1 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.learnScore = 7000
             }else if(1 == vm.firstYearSemesterScore.classChoose && 2 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.learnScore = 8000
             }
             if(1 == vm.firstYearSemesterScore.healthChoose && 1 ==vm.firstYearSemesterScore.exemptType){
               vm.firstYearSemesterScore.healthOver = '1';
                vm.firstYearSemesterScore.healthScore = 7000
             }else if(1 == vm.firstYearSemesterScore.healthChoose && 2 ==vm.firstYearSemesterScore.exemptType){
               vm.firstYearSemesterScore.healthOver = '1';
                vm.firstYearSemesterScore.healthScore = 8000
             }
             if(1 == vm.firstYearSemesterScore.afterClassChoose && 1 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.homeworkScore = 7000
             }else if(1 == vm.firstYearSemesterScore.afterClassChoose && 2 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.homeworkScore = 8000
             }
          }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.testScore > -1){
                // this.getStudentTestList(vm.firstYearSemesterScore.yearSemester);
                if(vm.firstYearSemesterScore.testScore >= 9000){
                  vm.firstYearSemesterScore.testScoreLevel='优秀';
                }else if(vm.firstYearSemesterScore.testScore >= 8000){
                  vm.firstYearSemesterScore.testScoreLevel='良好';
                }else if(vm.firstYearSemesterScore.testScore >= 6000){
                  vm.firstYearSemesterScore.testScoreLevel='及格';
                }else if(vm.firstYearSemesterScore.testScore >= 0){
                  vm.firstYearSemesterScore.testScoreLevel='不及格';
                }else{
                  vm.firstYearSemesterScore.testScoreLevel='--';
                }
            }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.healthScore > -1){
              if(vm.firstYearSemesterScore.healthScore >= 9000){
                 vm.firstYearSemesterScore.healthScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.healthScore >= 8000){
                 vm.firstYearSemesterScore.healthScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.healthScore >= 6000){
                 vm.firstYearSemesterScore.healthScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.healthScore >= 0){
                 vm.firstYearSemesterScore.healthScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.healthScoreLevel='--';
              }
              vm.firstYearSemesterScore.healthScoreScore = (vm.firstYearSemesterScore.healthScore*vm.firstYearSemesterScore.healthPercent/10000).toFixed(1);
              if(vm.firstYearSemesterScore.healthOver && vm.firstYearSemesterScore.healthOver != '1'){
                  vm.firstYearSemesterScore.healthScoreLevel='--';
                  vm.firstYearSemesterScore.healthScoreScore='--';
              }
          }


          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.actionScore > -1){
              if(vm.firstYearSemesterScore.actionScore >= 9000){
                 vm.firstYearSemesterScore.actionScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.actionScore >= 8000){
                 vm.firstYearSemesterScore.actionScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.actionScore >= 6000){
                 vm.firstYearSemesterScore.actionScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.actionScore >= 0){
                 vm.firstYearSemesterScore.actionScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.actionScoreLevel='--';
              }
              vm.firstYearSemesterScore.actionScoreScore = (vm.firstYearSemesterScore.actionScore*vm.firstYearSemesterScore.actionPercent/10000).toFixed(1);

              if(vm.firstYearSemesterScore.actionOver && vm.firstYearSemesterScore.actionOver != '1'){
                  vm.firstYearSemesterScore.actionScoreLevel='--';
                  vm.firstYearSemesterScore.actionScoreScore='--';
              }
          }


          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.staminaScore > -1){
              if(vm.firstYearSemesterScore.staminaScore >= 9000){
                 vm.firstYearSemesterScore.staminaScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.staminaScore >= 8000){
                 vm.firstYearSemesterScore.staminaScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.staminaScore >= 6000){
                 vm.firstYearSemesterScore.staminaScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.staminaScore >= 0){
                 vm.firstYearSemesterScore.staminaScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.staminaScoreLevel='--';
              }
              vm.firstYearSemesterScore.staminaScoreScore = (vm.firstYearSemesterScore.staminaScore*vm.firstYearSemesterScore.staminaPercent/10000).toFixed(1);
              if(vm.firstYearSemesterScore.staminaOver && vm.firstYearSemesterScore.staminaOver != '1'){
                  vm.firstYearSemesterScore.staminaScoreLevel='--';
                  vm.firstYearSemesterScore.staminaScoreScore='--';
              }
          }


          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.learnScore > -1){
              if(vm.firstYearSemesterScore.learnScore >= 9000){
                 vm.firstYearSemesterScore.learnScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.learnScore >= 8000){
                 vm.firstYearSemesterScore.learnScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.learnScore >= 6000){
                 vm.firstYearSemesterScore.learnScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.learnScore >= 0){
                 vm.firstYearSemesterScore.learnScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.learnScoreLevel='--';
              }
              vm.firstYearSemesterScore.learnScoreScore = (vm.firstYearSemesterScore.learnScore*vm.firstYearSemesterScore.learnPercent/10000).toFixed(1);
              this.getStudentLearnList(vm.firstYearSemesterScore.yearSemester);
          }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.homeworkScore > -1){
              if(vm.firstYearSemesterScore.homeworkScore >= 9000){
                 vm.firstYearSemesterScore.homeworkScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.homeworkScore >= 8000){
                 vm.firstYearSemesterScore.homeworkScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.homeworkScore >= 6000){
                 vm.firstYearSemesterScore.homeworkScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.homeworkScore >= 0){
                 vm.firstYearSemesterScore.homeworkScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.homeworkScoreLevel='--';
              }
              vm.firstYearSemesterScore.homeworkScoreScore = (vm.firstYearSemesterScore.homeworkScore*vm.firstYearSemesterScore.homeworkPercent/10000).toFixed(1);
              this.getStudentFamilyOver(vm.firstYearSemesterScore.yearSemester);
          }


        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    setShowLableName(showSemesterScore){
      this.testPercentName="体质测试";
      this.actionPercentName=showSemesterScore.actionPercent>0?"运动技能 ("+showSemesterScore.actionPercent+"%)":"";
      this.staminaPercentName=showSemesterScore.staminaPercent>0?"体能 ("+showSemesterScore.staminaPercent+"%)":"";
      this.healthPercentName=showSemesterScore.healthPercent>0?"健康教育知识 ("+showSemesterScore.healthPercent+"%)":"";
      this.learnPercentName=showSemesterScore.learnPercent>0?"学习态度 ("+showSemesterScore.learnPercent+"%)":"";
      this.homeworkPercentName=showSemesterScore.homeworkPercent>0?"体育课后作业 ("+showSemesterScore.homeworkPercent+"%)":"";
      this.athleticContestTopScoreName=showSemesterScore.athleticContestTopScore>0?"体育竞赛 (最多"+showSemesterScore.athleticContestTopScore+"分)":"";
    },
      setShowLableNameNotTest(showSemesterScore){
          this.actionPercentName=showSemesterScore.actionPercent>0?"运动技能 ("+showSemesterScore.actionPercent+"%)":"";
          this.staminaPercentName=showSemesterScore.staminaPercent>0?"体能 ("+showSemesterScore.staminaPercent+"%)":"";
          this.healthPercentName=showSemesterScore.healthPercent>0?"健康教育知识 ("+showSemesterScore.healthPercent+"%)":"";
          this.learnPercentName=showSemesterScore.learnPercent>0?"学习态度 ("+showSemesterScore.learnPercent+"%)":"";
          this.homeworkPercentName=showSemesterScore.homeworkPercent>0?"体育课后作业 ("+showSemesterScore.homeworkPercent+"%)":"";
          this.athleticContestTopScoreName=showSemesterScore.athleticContestTopScore>0?"体育竞赛 (最多"+showSemesterScore.athleticContestTopScore+"分)":"";
      },
    editHealthDetail(row) {
      var vm = this
        this.modalhealth = true;
      this.studentScoreId = row.studentScoreId;
      this.paperId = row.paperId;
    },
    s_to_hs(s) {
      var h;
      h = Math.floor(s / 60);
      s = s % 60;
      h += '';
      s += '';
      h = (h.length == 1) ? '0' + h : h;
      s = (s.length == 1) ? '0' + s : s;
      return h + '\'' + s;
    },
    getStudentTestList(yearSemester) {
      var vm = this
      let data = {
        "pageNo":1,
        "pageSize":99,
        "studentId": vm.studentId,
        "yearSemester":yearSemester,
      }
      this.$axios.post('/v1/exam/getStudentTestListV2', data).then(res => {
        if (res.data.code == 10000) {
          let result = res.data.response.list;
          for(let i=0;i<result.length;i++){
            if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"
                || result[i].examItemName == "800米跑"){
              result[i].examResult = vm.s_to_hs(result[i].examResult)
            }else{
              result[i].examResult += result[i].valueUnit
            }
            if(result[i].examItemName == "BMI" && result[i].valueUnit == "kg"){
              result[i].examItemName = "体重";
              result[i].score="-";
              result[i].scoreLevel="-";
            }
            if(result[i].examItemName == "BMI" && result[i].valueUnit == "cm"){
              result[i].examItemName = "身高"
              result[i].score="-";
              result[i].scoreLevel="-";
            }
          }
          let vision = res.data.response.vision;
          if(vision){
              vision.score='-';
              vision.scoreLevel='-';
              vision.examItemName='视力';
              vision.testTime=vision.createTime;
              vision.visionType='1';
              result.push(vision);
          }
          vm.testResultDataFirst = result
        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    getStudentLearnList(yearSemester){
        var vm = this
        this.$axios.get('/v1/sports/learn/queryStudentSemesterLearnInfo?studentId='+vm.studentId+"&yearSemester="+yearSemester ).then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(result == null){
                result = {};
                result.yearSemester = yearSemester;
            }
              vm.learnResultDataFirst=[];
              vm.learnResultDataFirst.push(result);
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
      getStudentHealthList(yearSemester){
          var vm = this
          this.$axios.get('/v1/datafiles/queryStudentSemesterHealthInfo?studentId='+vm.studentId+"&yearSemester="+yearSemester+"&grade="+this.grade).then(res => {
              if (res.data.code == 10000) {
                  let result = res.data.response;
                  if(result == null){
                      result = {};
                      result.yearSemester = yearSemester;
                  }
                  vm.healthResultDataFirst=[];
                  vm.healthResultDataFirst.push(result);

              } else {
                  if (res.data.code > 39999) {
                      vm.$Message.info(res.data.msg)
                  }
              }
          })
      },
    getStudentFamilyIn(yearSemester){
        var vm = this
        // this.$axios.get('/v1/familyexerciseanalyze/queryStudentYearSemesterExercise?studentId='+vm.studentId+"&yearSemester="+yearSemester+"&semesterOver=1").then(res => {
        this.$axios.get('/v1/datafiles/queryStudentYearSemesterExercise?studentId='+vm.studentId+"&yearSemester="+yearSemester+"&semesterOver=1").then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(result == null){
                result={
                   haveDate:"0"
                };
            }else{
               result.haveDate="1";
            }
            if(yearSemester%2 == 0){
               result.semesterName = "第一学期";
               vm.homeworkResultDataFirst.push(result);
            }else{
               result.semesterName = "第二学期";
               vm.homeworkResultDataFirst.push(result);
            }
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getStudentFamilyOver(yearSemester){
      this.getStudentFamilyIn(yearSemester);
      return ;


        var vm = this
        let overSemester = 0
        if(yearSemester%2==0){
            overSemester = yearSemester - 1;
        }else{
            overSemester = yearSemester - 10 + 1 ;
        }
        this.$axios.get('/v1/familyexerciseanalyze/queryStudentYearSemesterExercise?studentId='+vm.studentId+"&yearSemester="+overSemester+"&semesterOver=0").then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(result == null){
                result={
                   haveDate:"0"
                };
            }else{
               result.haveDate="1";
            }
            if(yearSemester%2 == 0){
               vm.homeworkResultDataFirst=[];
               result.semesterName = (yearSemester/10).toFixed(0)+"年暑假";
               vm.homeworkResultDataFirst.push(result);
            }else{
               vm.homeworkResultDataSecond=[];
               result.semesterName = ((yearSemester - 10)/10).toFixed(0)+"年寒假";
               vm.homeworkResultDataSecond.push(result);
            }
            this.getStudentFamilyIn(yearSemester);
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },

      queryStudentTestInfo() {
          this.loadingInfo = "1";
          //编辑时获取场馆数据
          this.$axios
              .get(
                  "/v1/datafiles/queryStudentTestResult?studentId=" +
                  this.studentId +
                  "&yearSemester=" +
                  this.yearSemester +
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
                      //体测是否面试
                      let testActivityExempt= res.data.response.activityExemptDO
                      if(null==testActivityExempt){
                          this.testInfoStatus = false;
                      }else {
                          this.testInfoStatus = true;
                          this.testExemptType = testActivityExempt.exemptType;
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
                      
                      for (let i = 0; i < vualueList.length; i++) {
                          if (vualueList[i].sign == 1) {
                              this.notsign = false;
                              this.signatureAddr = vualueList[i].signatureAddr;
                              //下学期不能取消签名
                              if (this.yearSemester % 2 == 1) {
                                  this.signatureYearSemester = "";
                              } else {
                                  this.signatureYearSemester = "1";
                              }
                          } else {
                              this.notsign = true;
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
            } else if (tvalue.indexOf("‘") != -1) {
                tempValue = tvalue.split("‘");
            } else if (tvalue.indexOf("’") != -1) {
                tempValue = tvalue.split("’");
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
                } else if (tvalue.indexOf("‘") != -1) {
                    tempValue = tvalue.split("‘");
                } else if (tvalue.indexOf("’") != -1) {
                    tempValue = tvalue.split("’");
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
                } else if (tvalue.indexOf("‘") != -1) {
                    tempValue = tvalue.split("‘");
                } else if (tvalue.indexOf("’") != -1) {
                    tempValue = tvalue.split("’");
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
              activityId: this.activityId,
              schoolTestId: schoolTestId,
              classId: this.classId,
              studentId: this.studentId,
              resultValue: value,
              yearSemester:this.yearSemester,
              teacherId: sessionStorage.getItem("teacherId")
          };
          this.$axios.post("/v1/test/edit/saveStudentTestValue", paramData).then(res => {
              if (res.data.code == 10000) {
                  this.$Message.info("保存成功！");
                  this.queryStudentTestInfo();
              } else {
                  if (res.data.code > 39999) {
                      this.$Message.info(res.data.msg);
                  }
              }
          });
      },
      getActionStaminaStudentInfo(studentId,yearSemester) {
          var vm = this;
          vm.actionList=[];
          vm.staminaList=[]
          this.$axios
              .get(
                  "/v1/actionStamina/getActionStaminaStudentInfo?studentId=" +
                  studentId +
                  "&yearSemester=" +
                  yearSemester
              )
              .then(res => {
                  if (res.data.code == 10000) {
                      let data = res.data.response;
                      data.list=[];
                      if(data.examList && data.examList.length>0){
                          let examList=data.examList;
                          for(let j=0;j<examList.length;j++){
                              let classItem=examList[j];
                              let classTest={
                                  classTestName:classItem.classTestName,
                                  classTestType:classItem.classTestType,
                                  examList:[]
                              }
                              classTest.examList.push(classItem)
                              for(let k=j+1;k<examList.length;k++){
                                  let otherClassItem=examList[k];
                                  if(otherClassItem.classTestName==classItem.classTestName){
                                      classTest.examList.push(otherClassItem);
                                      examList.splice(k,1)
                                      k--
                                  }
                              }
                              data.list.push(classTest)
                          }
                      }
                      vm.studentInfo=data;
                      let studentInfo=data;
                      vm.studentName=studentInfo.studentName;
                      vm.registerCode=studentInfo.registerCode;
                      vm.className=(studentInfo.grade==1?"一年级":studentInfo.grade==2?"二年级":studentInfo.grade==3?"三年级":
                          studentInfo.grade==4?"四年级":studentInfo.grade==5?"五年级":studentInfo.grade==6?"六年级":studentInfo.grade==7?"七年级":
                              studentInfo.grade==8?"八年级":studentInfo.grade==9?"九年级":"")+studentInfo.studentClass+"班"
                      vm.classId=studentInfo.classId;
                      vm.gradeId=studentInfo.grade;
                      vm.studentId=studentInfo.studentId

                      let list=studentInfo.list;
                      if(list && list.length>0){
                          for(let i=0;i<list.length;i++){
                              let classTest=list[i];
                              if(classTest.classTestType=="2"){
                                  vm.actionList.push(classTest);
                              }else{
                                  vm.staminaList.push(classTest);
                              }
                          }
                      }
                      if(vm.actionList && vm.actionList.length>0){
                          for(let i=0;i<vm.actionList.length;i++){
                              let classTest=vm.actionList[i];
                              let examList=classTest.examList;
                              let totalScore=0;
                              if(examList && examList.length>0){
                                  for(let j=0;j<examList.length;j++){
                                      let data=examList[j];
                                      totalScore+=data.score*data.scorePercent/10000
                                  }
                              }
                              classTest.totalScore=totalScore;
                          }
                      }
                      if(vm.staminaList && vm.staminaList.length>0){
                          // debugger
                          for(let i=0;i<vm.staminaList.length;i++){
                              let classTest=vm.staminaList[i];
                              let examList=classTest.examList;
                              let totalScore=0;
                              if(examList && examList.length>0){
                                  for(let j=0;j<examList.length;j++){
                                      let data=examList[j];
                                      totalScore+=data.score*data.scorePercent/10000
                                  }
                              }
                              classTest.totalScore=totalScore;

                          }
                      }
                      if(vm.actionList && vm.actionList.length>0){
                          let actionScore=0;
                          for(let i=0;i<vm.actionList.length;i++){
                              let classTest=vm.actionList[i];

                              actionScore+=classTest.totalScore
                          }
                          studentInfo.actionScore=actionScore;
                      }
                      if(vm.staminaList && vm.staminaList.length>0){
                          let staminaScore=0;
                          for(let i=0;i<vm.staminaList.length;i++){
                              let classTest=vm.staminaList[i];
                              staminaScore+=classTest.totalScore;
                          }
                          studentInfo.staminaScore=staminaScore;
                      }
                      console.log(vm.actionList)
                      if(studentInfo.actionScore){
                          vm.actionScore=studentInfo.actionScore
                          vm.actionLevel=vm.actionScore>=90?"优秀":vm.actionScore>=80?"良好":vm.actionScore>=60?"及格":"不及格"
                      }else{
                          vm.actionScore="--";
                          vm.actionLevel="--";
                      }
                      if(studentInfo.staminaScore){
                          vm.staminaScore=studentInfo.staminaScore
                          vm.staminaLevel=vm.staminaScore>=90?"优秀":vm.staminaScore>=80?"良好":vm.staminaScore>=60?"及格":"不及格"
                      }else{
                          vm.staminaScore="--";
                          vm.staminaLevel="--";
                      }


                  }
                  if (res.data.code > 39999) {
                      // this.$Message.info(res.data.msg);
                  }
              });
      },

    //查询指定学生的视力测试情况
    queryStudentVision(){
        const params = {
            studentId:this.studentId,
            schoolId: this.schoolId,
            yearSemester: this.yearSemester
        }
        api.queryStudentVision(params).then(res => {
            if(res.data.code === 10000) {
                let {visionVO, visionHistory} = res.data.response
                this.testVision = visionVO;
                this.historyVision = visionHistory;
            }else{
                this.$Message.info(res.data.msg)
            }
        })
    },
    //保存新版（2021）视力
    async newSaveStudentVision(edition) {
        let {leftVision, rightVision, leftBall, rightBall, leftColumn, rightColumn, leftAxis, rightAxis, glassesWearer} = this.detailVisionData
        let {visionId, teacherId} = this.testVision
        rightVision =  edition === 'old' ? this.rightVision : rightVision;
        leftVision =  edition === 'old' ? this.leftVision : leftVision;
        //右眼裸眼判断
        if (rightVision) {//右眼裸眼有效值
            if (rightVision > 5.3 || rightVision < 3) {//裸眼范围值
                this.$Message.info("右眼裸眼输入数字不正确，没有对应的考核结果");
                return false;
            }else{//查看小数点位数只能1位
                rightVision = rightVision.toString()
                if(rightVision.indexOf('.')>=0){
                        if(rightVision.split('.')[1].length>1){
                        this.$Message.info("右眼裸眼只能输入一位小数");
                        return false;
                    }
                }
            }
        }else{//右眼裸眼无效值
            this.$Message.info("右眼裸眼不能为空");
            return false;
        }
        //左眼裸眼判断
        if (leftVision) {//左眼裸眼有效值
            if (leftVision > 5.3 || leftVision < 3) {//裸眼范围值
            this.$Message.info("左眼裸眼不正确，没有对应的考核结果");
            return false;
            }else{//查看小数点位数只能1位
            leftVision = leftVision.toString()
            if(leftVision.indexOf('.')>=0){
                if(leftVision.split('.')[1].length>1){
                this.$Message.info("左眼裸眼只能输入一位小数");
                return false;
                }
            }
            }
        }else{//左眼裸眼无效值
            this.$Message.info("左眼裸眼不能为空");
            return false;
        }
        //旧版视力没有柱镜，轴位等
        if(edition === 'new'){
            //屈光球镜两位小数,球镜范围：-30.00~30.00
            //右眼球镜
            if (rightBall) {//球镜有效值
                if (rightBall > 30 || rightBall < -30) {//球镜范围值
                this.$Message.info("右眼球镜只能输入-30.00~30.00的范围");
                return false;
                }else{//查看小数点位数只能2位
                rightBall = rightBall.toString()
                if(rightBall.indexOf('.')>=0){
                    if(rightBall.split('.')[1].length>2){
                    this.$Message.info("右眼球镜只能输入两位小数");
                    return false;
                    }
                }
                }
            }else{//右眼球镜无效值
                this.$Message.info("右眼球镜值不能为空");
                return false;
            }
            //左眼球镜
            if (leftBall) {//球镜有效值
                if (leftBall > 30 || leftBall < -30) {//球镜范围值
                this.$Message.info("左眼球镜只能输入-30.00~30.00的范围");
                return false;
                }else{//查看小数点位数只能2位
                leftBall = leftBall.toString()
                if(leftBall.indexOf('.')>=0){
                    if(leftBall.split('.')[1].length>2){
                    this.$Message.info("左眼球镜只能输入两位小数");
                    return false;
                    }
                }
                }
            }else{//左眼球镜无效值
                this.$Message.info("左眼球镜值不能为空");
                return false;
            }
            

            //屈光柱镜两位小数,柱镜范围：-15.00~15.00
            //右眼柱镜
            if (rightColumn) {//柱镜有效值
                if (rightColumn > 15 || rightColumn < -15) {//柱镜范围值
                this.$Message.info("右眼柱镜只能输入-15.00~15.00的范围");
                return false;
                }else{//查看小数点位数只能2位
                rightColumn = rightColumn.toString()
                if(rightColumn.indexOf('.')>=0){
                    if(rightColumn.split('.')[1].length>2){
                    this.$Message.info("右眼柱镜只能输入两位小数");
                    return false;
                    }
                }
                }
            }else{//右眼柱镜无效值
                this.$Message.info("右眼柱镜值不能为空");
                return false;
            }
            //左眼柱镜
            if (leftColumn) {//柱镜有效值
                if (leftColumn > 15 || leftColumn < -15) {//柱镜范围值
                this.$Message.info("左眼柱镜只能输入-15.00~15.00的范围");
                return false;
                }else{//查看小数点位数只能2位
                leftColumn = leftColumn.toString()
                if(leftColumn.indexOf('.')>=0){
                    if(leftColumn.split('.')[1].length>2){
                    this.$Message.info("左眼柱镜只能输入两位小数");
                    return false;
                    }
                }
                }
            }else{//左眼柱镜无效值
                this.$Message.info("左眼柱镜值不能为空");
                return false;
            }
            

            //屈光轴位可输入0~360之间的正整数
            //右眼屈光轴位
            if(rightAxis || rightAxis === '0'){
                if(rightAxis.indexOf('.')>=0){
                this.$Message.info("右眼屈光轴位只能输入正整数");
                return false;
                }else{
                if(rightAxis>180 || rightAxis < 0){
                    this.$Message.info("右眼屈光轴位只能输入0~180之间的正整数");
                    return false;
                }
                }
            }else{
                this.$Message.info("右眼屈光轴位测试值不能为空");
                return false;
            }
            //左眼屈光轴位
            if(leftAxis || leftAxis === '0'){
                if(leftAxis.indexOf('.')>=0){
                this.$Message.info("左眼屈光轴位只能输入正整数");
                return false;
                }else{
                if(leftAxis>180 || leftAxis < 0){
                    this.$Message.info("左眼屈光轴位只能输入0~180之间的正整数");
                    return false;
                }
                }
            }else{
                this.$Message.info("左眼屈光轴位测试值不能为空");
                return false;
            }
        }
        let paramData ={
            "glassesWearer": edition === 'old' ? '' : glassesWearer,
            "leftAxis": edition === 'old' ? '' : leftAxis,
            "leftBall": edition === 'old' ? '' : leftBall,
            "leftColumn": edition === 'old' ? '' : leftColumn,
            "rightAxis": edition === 'old' ? '' : rightAxis,
            "rightBall": edition === 'old' ? '' : rightBall,
            "rightColumn": edition === 'old' ? '' : rightColumn,
            "rightLight": edition === 'old' ? this.rightLight : '',
            "rightMirror": edition === 'old' ? this.rightMirror : '',
            "rightVision": edition === 'old' ? this.rightVision : rightVision,
            "leftLight": edition === 'old' ? this.leftLight : '',
            "leftMirror": edition === 'old' ? this.leftMirror : '',
            "leftVision": edition === 'old' ? this.leftVision : leftVision,
            "schoolId": this.schoolId,
            "studentId": this.studentId,
            "teacherId": teacherId,
            "visionId": visionId,
            "yearSemester": this.yearSemester
        }
        this.loadingInfo = true;
        let res = await api.querySchoolReportedStatus({dataType:3});
        if(res.data.code === 10000) {
            let {editStatus} = res.data.response
            if (editStatus === '1') { // 可编辑
                api.addVisionResult(paramData).then(resVision => {
                    this.loadingInfo = false;
                    if (resVision.data.code == 10000) {
                        this.$Message.info("保存成功！");
                        this.detailVisionData.leftVision = ''
                        this.detailVisionData.rightVision = ''
                        this.detailVisionData.leftBall = ''
                        this.detailVisionData.rightBall = ''
                        this.detailVisionData.leftColumn = ''
                        this.detailVisionData.rightColumn = ''
                        this.detailVisionData.leftAxis = ''
                        this.detailVisionData.rightAxis = ''
                        //旧版复原
                        this.rightVision = ''
                        this.leftVision = ''
                        this.rightLight = '0'
                        this.rightMirror = '0'
                        this.leftLight = '0'
                        this.leftMirror = '0'
                        this.queryStudentVision();
                    } else {
                        this.$Message.info(resVision.data.msg);
                    }
                })
            }else{
                this.$Modal.info({
                    title: '提醒',
                    okText: '知道了',
                    closable: false,
                    content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
                });
            }
        }
    }

  },
  watch: {
      resultValueShow:function(){
          let vm = this;
          if(vm.resultValueShow==null || vm.resultValueShow == ""){
              return;
          }
          let data = vm.resultValueShow;
          if(vm.examUnit && vm.examUnit == "分.秒"){
              data = data.replace("\"","");
              data = data.replace("\“","");
              data = data.replace("\”","");

              let seconds = data.split("′");
              if (seconds.length == 1) {
                  seconds = data.split("'");
              }
              if (seconds.length == 1) {
                  seconds = data.split("’");
              }
              if (seconds.length == 1) {
                  seconds = data.split("‘");
              }
              let totalTime = 0;
              if (seconds.length > 1) {
                  totalTime = Number(seconds[0]) * 60 + Number(seconds[1]);
              } else {
                  totalTime = Number(seconds[0]) * 60;
              }
              data=totalTime;
          }
          vm.resultValue = data;
          vm.resultValueChange();
      },
      teacherScore:function(){
          var vm=this;
          if(vm.teacherScore==null || vm.teacherScore == ""){
              return;
          }
          let standList=vm.standardList;
          if(vm.examItemType==2){
              for(var i=0;i<standList.length;i++){
                  if(Number(vm.teacherScore)>=Number(standList[i].scoringCriteriaStart) && Number(vm.teacherScore)<=Number(standList[i].scoringCriteriaEnd) ){
                      vm.resultValue=vm.teacherScore
                      vm.score=standList[i].score;
                      vm.scoreLevelNew=standList[i].scoreLevel;
                  }
              }
          }else{
              let examItemPercent=vm.examItemPercent;
              let mScore=vm.baseScore*examItemPercent/100;
              vm.score=mScore+parseInt((vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100)
              if(vm.score<10){
                  vm.score=10;
              }
              for(var i=0;i<vm.baseStandard.length;i++){
                  if(vm.score>=vm.baseStandard[i].start && vm.score<=vm.baseStandard[i].end ){
                      vm.scoreLevelNew=vm.baseStandard[i].level;
                  }
              }
          }
      },
  },
  created() {},
  mounted() {
    let vm = this;

    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = Number(schoolId)
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;

    vm.studentId = this.$route.query.studentId
    vm.studentName = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-studentName')
    vm.registerCode = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-registerCode')
    vm.gender = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-gender')
    vm.grade = Number(sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-grade'))
    vm.gradeId = Number(sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-grade'))
    vm.classId = Number(sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-classId'))
    vm.startSchool = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-startSchool')
    vm.studentClass = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-studentClass')
    vm.firstYearSemester = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-firstYearSemester')
    vm.secondYearSemester = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-secondYearSemester')

    vm.yearSemester = Number(sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-yearSemester'));
    vm.reportingStatus = sessionStorage.getItem('dataFiles-sportsScoreStudentDetail-reportingStatus');
    vm.semesterName =  sessionStorage.getItem("dataFiles-sportsScoreStudentDetail-semesterName");


    vm.testApplyStatus =  sessionStorage.getItem("dataFilsManage-testApplyStatus");
    vm.subjectApplyStatus = sessionStorage.getItem("dataFilsManage-subjectApplyStatus");
    vm.testReportingStatus =  sessionStorage.getItem("dataFilsManage-testReportingStatus");
    vm.subjectReportingStatus =  sessionStorage.getItem("dataFilsManage-subjectReportingStatus");

    vm.editStatus = ((vm.testApplyStatus == '0')&&(vm.testReportingStatus == '1'))?false:true;
    vm.subjectEditStatus = ((vm.subjectApplyStatus == '0')&&(vm.subjectReportingStatus == '1'))?false:true;

    vm.gradeName = vm.grade == "1" ?'一年级':vm.grade == "2" ?'二年级':vm.grade == "3" ?'三年级':vm.grade == "4" ?'四年级':vm.grade == "5" ?'五年级':vm.grade == "6" ?'六年级':vm.grade == "7" ?'七年级':vm.grade == "8" ?'八年级':vm.grade == "9" ?'九年级':vm.grade == "10" ?'高一':vm.grade == "11" ?'高二':vm.grade == "12" ?'高三':'';
      this.queryStudentScoreByStudentId();
      this.queryStudentTestInfo();
      this.getStudentHealthList(vm.yearSemester);
      this.getActionStaminaStudentInfo(vm.studentId,vm.yearSemester);
    this.queryStudentVision()

  }
};
</script>
