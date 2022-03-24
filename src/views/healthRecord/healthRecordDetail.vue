<style lang="less" scoped>
@import "./healthRecordDetail.less";
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">健康档案</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input" style="align-items:center">
                <div style="margin:5px 20px;">
                    <span >姓名：</span>{{studentName}}
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>{{registerCode}}
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>{{gradeName}}{{studentClass}}班
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：</span>{{gender=="1"?"男":"女"}}
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  v-show="selectTabName == 'healthReport' && schoolId==3778"  @click="downpdf">导出报告</Button>
                <Button type="success"  @click="goback">返回</Button>
            </div>
        </div>
      </Card>
      <br>
     <!-- 其他学校-->
    <div  v-show="schoolId != 2996">
         <Card> 
       <div style="font-size:20px;height:40px;">
            档案明细
        </div>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs" :style="selectTabName == 'healthReport'?tabsClass:''">
        <TabPane name="testScore" label="个人信息">
            <div style="margin-left:18px;margin-top:10px;">
                <div style="text-align:center;width:107px;line-height:142px;float:left;margin-right:20px;border:1px #EEEEEE solid " >
                    照片
                </div>
                <div style="text-align:right;width:250px;float:left;line-height:46px;" >
                    <div>姓名： <Input style="width:160px;" v-model="studentName" disabled ></Input></div>
                    <div>出生日期： <Input style="width:160px;" v-model="birthday" disabled ></Input></div>
                    <div>证件号码： <Input style="width:160px;" v-model="idCardNo" disabled ></Input></div>
                </div>
                <div style="text-align:right;width:250px;float:left;line-height:46px;" >
                    <div>性别： <Input style="width:160px;" v-model="genderName" disabled ></Input></div>
                    <div>民族编码： <Input style="width:160px;" v-model="nationCode" disabled ></Input></div>
                </div>
            </div>
       </TabPane>
       <TabPane name="actionScore" label="教育信息">
          <div style="margin-left:18px;margin-top:10px;">
            <div style="height:28px;line-height:28px;margin-bottom:10px;">
                <div style="border:2px #00C693 solid;width:3px;height:28px;float:left;border-radius:3px;margin-right:20px;"></div>
                <div style="float:left;font-size:20px;" ><font style="color:#00C693;margin-right:16px;">在读</font><font style="color:#333333">{{schoolName}}</font></div>
            </div>
            <div>
                <div style="text-align:right;width:250px;float:left;line-height:50px;" >
                    <div>学籍号： <Input style="width:160px;" v-model="registerCode" disabled ></Input></div>
                    <div>入学时间： <Input style="width:160px;" v-model="startSchool" disabled ></Input></div>
                </div>
                <div style="text-align:right;width:250px;float:left;line-height:50px;" >
                    <div>年级： <Input style="width:160px;" v-model="gradeName" disabled ></Input></div>
                </div>
                <div style="text-align:right;width:250px;float:left;line-height:50px;" >
                    <div>班级： <Input style="width:160px;" v-model="studentClassName" disabled ></Input></div>
                </div>
            </div>
         </div>
       </TabPane>
       <TabPane name="test" label="身体素质">
            <div style="margin-top:10px;" v-for="item in testColumnsData" v-show="item.testList.length > 0" >
              <div v-if="item.testList.length > 0" >
                  {{item.testList[0].schoolYear}}学年体测
              </div>
              <div>
                <Row>
                  <div>
                    <Table border max-height="270" :loading="loading" :columns="testColumns" :data="item.testList"></Table>
                  </div>
                </Row>
              </div>
          </div>
          <div v-if="testColumnsData.length <= 0" style="width:100%;text-align:center;line-height:600px;">
                暂无数据
            </div>
       </TabPane>
      <TabPane name="action" label="技能/体能">
        <div style="margin-top:10px;" v-for="item in actionColumnsData" v-show="item.length > 0" >
            <div v-if="item.length > 0" >
                {{item[0].yearSemester%2==0?((item[0].yearSemester/10).toFixed(0))+"学年第一学期":((item[0].yearSemester/10).toFixed(0) -1)+"学年第二学期"}}
            </div>
            <div>
            <Row>
                <div>
                <Table border max-height="270" :loading="loading" :columns="examColumns" :data="item"></Table>
                </div>
            </Row>
            </div>
        </div>
        <div v-if="actionColumnsData.length <= 0" style="width:100%;text-align:center;line-height:600px;">
            暂无数据
        </div>
       </TabPane>
       <TabPane name="health" label="健康知识">
        <div style="margin-top:10px;" v-for="item in healthColumnsData1" v-show="item.length > 0" >
            <div v-if="item.length > 0" >
                {{item[0].yearSemester%2==0?((item[0].yearSemester/10).toFixed(0))+"学年第一学期":((item[0].yearSemester/10).toFixed(0) -1)+"学年第二学期"}}
            </div>
            <div>
            <Row>
                <div>
<!--                <Table border :height="270" :loading="loading" :columns="examColumns" :data="item"></Table>-->
                <Table border max-height="270" :loading="loading" :columns="healthyColumns" :data="item"></Table>
                </div>
            </Row>
            </div>
        </div>
        <div v-if="!healthColumnsData1 || healthColumnsData1.length <= 0" style="width:100%;text-align:center;line-height:600px;">
            暂无数据
        </div>
       </TabPane>
       <TabPane name="homeworkScore" label="综合评价">
            <div style="margin-top:10px;" v-for="item in studentScoreColumnsData"  >
                <div>
                    {{item.yearSemester%2==0?((item.yearSemester/10).toFixed(0))+"学年第一学期":((item.yearSemester/10).toFixed(0) -1)+"学年第二学期"}}
                </div>
                <div>
                <Row>
                    <div>
                    <Table border max-height="90" :loading="loading" :columns="scoreColumns" :data="[item]"></Table>
                    </div>
                </Row>
                </div>
            </div>
            <div v-if="studentScoreColumnsData.length <= 0" style="width:100%;text-align:center;line-height:600px;">
                暂无数据
            </div>
       </TabPane>
        <!-- <TabPane name="athleticContestScore" label="健康报告">
            <div style="margin-left:18px;margin-top:10px;color:#333333;font-size:20px;" v-for="item in testColumnsData" >
                <div style="height:40px;line-height:40px;margin-bottom:10px;">
                    <div style="border:2px #00C693 solid;width:3px;height:28px;float:left;border-radius:3px;margin-right:20px;"></div>
                    <div style="float:left;font-size:20px;" >{{item.schoolYear}}学年健康报告</div>
                </div>
                <div style="height:40px;line-height:40px;margin-bottom:10px;">
                    <div style="float:left;margin-left:25px;" >健康报告</div>
                    <div style="float:left;border-radius:3px;border:3px #00C693 solid;height:1px;width:1px;margin-top:16px;margin-left:20px;" ></div>
                    <div style="float:left;margin-left:10px;color:#00C693">{{item.level=='1'?"优秀":item.level=='2'?"良好":item.level=='3'?"及格":item.level=='4'?"不及格":"未完成体测"}}</div>
                    <Button style="margin-left: 20px" type="success"  @click="editDiagnosis(item)">编辑</Button>
                </div>
                <div style="padding:25px 25px 25px 25px;background:rgba(248,248,249,1);width:950px;" >
                    {{item.diagnosis}}
                </div>
            </div>
            <div v-if="testColumnsData.length <= 0" style="width:100%;text-align:center;line-height:600px;">
                暂无数据
            </div>
       </TabPane> -->
        <TabPane name="healthReport" label="健康报告"></TabPane>
      </Tabs>
      </Card>
      <!-- 未完成体质测试 -->
      <div class="healthReportBox" v-show="!isOkTest">
          <Card style="height:100px;margin-top:-17px;border:1px solid rgb(255,255,255)" :dis-hover="true">
              <div style="font-size:20px;">未完成体质测试</div>
          </Card>
      </div>
      <!-- 已完成体质测试 -->
      <div id="healthReportBox" v-show="isOkTest">
            <!-- 健康报告1 Mike-->
            <Card v-show="selectTabName == 'healthReport'" style="border:1px solid #fff;margin-top:-16px;" :dis-hover="true">
                <!--不免试-->
                <Row type="flex" justify="start" align="middle" style="height:32px" v-if="ageResultData.testExempt != '1'">
                    <Col :lg="{span:6}" :xl="{span:7}" :xxl="{span:5}">
                        <span class="m-title">国家体质健康测试成绩：  </span>
                    </Col>
                    <Col :lg="{span:6}" :xl="{span:5}" :xxl="{span:4}">
                        <span class="m-score">得分：{{ageResultData.currentTestScore}}分</span>
                        <span v-if="ageResultData.lastTestScore">
                            <span class="m-up" v-if="ageResultData.currentTestScore-ageResultData.lastTestScore>=0">{{ageResultData.currentTestScore-ageResultData.lastTestScore>0?"↑":"↓"}} {{(ageResultData.currentTestScore-ageResultData.lastTestScore)<0?(ageResultData.currentTestScore-ageResultData.lastTestScore)*-1:ageResultData.currentTestScore-ageResultData.lastTestScore}}分</span>
                            <span class="m-up" style="color:green" v-if="ageResultData.currentTestScore-ageResultData.lastTestScore<0">{{ageResultData.currentTestScore-ageResultData.lastTestScore>0?"↑":"↓"}} {{(ageResultData.currentTestScore-ageResultData.lastTestScore)<0?(ageResultData.currentTestScore-ageResultData.lastTestScore)*-1:ageResultData.currentTestScore-ageResultData.lastTestScore}}分</span>
                        </span>
                    </Col>
                    <Col :lg="{span:6}" :xl="{span:5}" :xxl="{span:4}" class="m-score">等级：{{ageResultData.level == '1'?'优秀': ageResultData.level == '2'?'良好':ageResultData.level == '3'?'及格':ageResultData.level == '4'?'不及格':'--'}}</Col>
                    <Col :lg="{span:6}" :xl="{span:5}" :xxl="{span:4}" class="m-score">年级排名：{{ageResultData.orderInfo?ageResultData.orderInfo.testOrder : '--'}}</Col>
                </Row>
                <!-- 免试 -->
                <Row type="flex" justify="start" align="middle" style="height:32px" v-if="ageResultData.testExempt == '1'">
                    <Col :lg="{span:6}" :xl="{span:7}" :xxl="{span:5}">
                        <span class="m-title">国家体质健康测试成绩：  </span>
                    </Col>
                    <Col :lg="{span:6}" :xl="{span:5}" :xxl="{span:4}">
                        <span class="m-score">得分：{{ageResultData.exemptType == '1'?70:80}}分（免试）</span>
                    </Col>
                </Row>
            </Card>
            <!-- 健康报告2 免试就不展示 Mike-->
            <div v-show="ageResultData.testExempt != '1'&&selectTabName == 'healthReport'">
                <div style="height:25px;background:#F1EFF2"></div>
                <Card>
                    <div class="m-analysisTitle">
                        <span class="scoreAnaly">成绩分析</span>
                        <Button type="success" @click="handleRender" v-show="isShowEdit">编辑</Button>
                    </div>
                    <div class="m-analysisBox">
                        <div id="myCharts" :style="{width: '360px', height: '250px'}"></div>
                        <div class="m-content">{{diagnosisContent}}</div>
                    </div>
                </Card>
                <!-- 健康报告3 Mike-->
                <div style="height:25px;background:#F1EFF2"></div>
                <Card>
                    <div class="m-analysisTitle">
                        <span class="scoreAnaly">各项成绩情况</span>
                    </div>
                    <!-- BMI -->
                    <div v-for="(ageRes,index) in ageResultDataCopy" key="age" v-if="ageRes.schoolItemId == 1">
                        <div class="m-head">
                                <div class="m-headL">
                                    <img src="../../images/index.png" alt="">
                                    <span class="headItem">BMI</span>
                                </div>
                                <div class="m-headR">
                                    <Button type="success" @click="commonedit(ageRes)" v-show="isShowEdit">编辑</Button>
                                </div>
                            </div>
                            <div class="m-section">
                                <div class="m-sectionL">
                                    <div class="m-secL-top">
                                        <span>成绩：{{ageRes.resultValue}}</span>
                                        <span>得分：{{ageRes.score}}分</span>
                                        <span>身高：{{ageRes.height}}cm</span>
                                        <span>体重：{{ageRes.weight}}kg</span>
                                    </div>
                                    <div class="m-secL-bottom">
                                        <div class="gradechang">
                                            <div class="line line1"></div>
                                            <div class="line line2"></div>
                                            <div class="line line3"></div>
                                            <img class="scoreLocation" src="../../images/scoreLocation.png" :style="{left:`${ageRes.location}px`}"></img>
                                            <div class="level level1">低体重</div>
                                            <div class="level level2">正常</div>
                                            <div class="level level3">超重</div>
                                            <div class="level level4">肥胖</div>
                                            <div class="text" :class="'text'+(i+1)" v-for="(item,i) in ageRes.data">{{item}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-sectionR">
                                    <div class="m-secRAside">
                                        <img src="../../images/analysis.png" alt="">
                                        <span>分析：</span>
                                    </div>
                                    <div class="analysisContent" style="line-height:22px;">{{ageRes.diagnosisContent || ''}}</div>
                                    <div class="m-secRAside">
                                        <img src="../../images/proposal.png" alt="">
                                        <span>建议：</span>
                                    </div>
                                    <div class="analysisContent">{{ageRes.adviseContent || ''}}</div>
                                </div>
                            </div>
                    </div>
                    <!-- 单个项目 除开BMI和整体-->
                    <div v-for="(ageBit,index) in ageResultDataCopy" :key="ageBit.schoolItemId"  v-if="ageBit.schoolItemId != 1&&ageBit.schoolItemId != 13">
                        <div class="m-head">
                                <div class="m-headL">
                                    <img src="../../images/index.png" alt="">
                                    <span class="headItem">{{ageBit.itemName}}</span>
                                </div>
                                <div class="m-headR">
                                    <Button type="success" @click="commonedit(ageBit)" v-show="isShowEdit">编辑</Button>
                                </div>
                            </div>
                            <div class="m-section">
                                <div class="m-sectionL">
                                    <div class="m-secL-top">
                                        <span>成绩：{{ageBit.schoolItemId == 7 ? run508 : ageBit.schoolItemId == 10 ? run1000 : ageBit.schoolItemId == 11 ? run800 : (ageBit.resultValue || '')}}{{ageBit.schoolItemId == 7||ageBit.schoolItemId == 10||ageBit.schoolItemId == 11?'':ageBit.unit}}</span>
                                        <span>得分：{{ageBit.score || 0}}分</span>
                                        <span>年级排名：{{ageBit.gradeOrderCount || '--'}}</span>
                                    </div>
                                    <div class="m-secL-bottom">
                                        <div class="gradechang1">
                                            <div class="line line1"></div>
                                            <div class="line line2"></div>
                                            <div class="line line3"></div>
                                            <div class="line line4"></div>
                                            <img class="scoreLocation" src="../../images/scoreLocation.png" :style="{left:`${ageBit.location}px`}"></img>
                                            <div class="level level1">不及格</div>
                                            <div class="level level2">及格</div>
                                            <div class="level level3">良好</div>
                                            <div class="level level4">优秀</div>
                                            <div class="level level5">满分</div>
                                            <div class="text" :class="'text'+(i+1)" v-for="(item,i) in ageBit.data">{{ageBit.schoolItemId == 7||ageBit.schoolItemId == 10||ageBit.schoolItemId == 11?s_to_hs(item):item}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-sectionR">
                                    <div class="m-secRAside">
                                        <img src="../../images/analysis.png" alt="">
                                        <span>分析：</span>
                                    </div>
                                    <div class="analysisContent" style="line-height:22px;">{{ageBit.diagnosisContent || ''}}</div>
                                    <div class="m-secRAside">
                                        <img src="../../images/proposal.png" alt="">
                                        <span>建议：</span>
                                    </div>
                                    <div class="analysisContent">{{ageBit.adviseContent || ''}}</div>
                                </div>
                            </div>
                    </div>
                    <!-- 视力 -->
                    <div  v-for="(ageBit,index) in ageResultDataCopy" :key="ageBit.schoolItemId"  v-if="ageBit.schoolItemId == 1333">
                        <div class="m-head">
                                <div class="m-headL">
                                    <img src="../../images/index.png" alt="">
                                    <span class="headItem">{{ageBit.itemName}}</span>
                                </div>
                                <div class="m-headR">
                                    <Button type="success" @click="commonedit(ageBit)" v-show="isShowEdit">编辑</Button>
                                </div>
                            </div>
                            <div class="m-section">
                                <div class="m-sectionL">
                                    <div class="m-sectionL-top">
                                        <span>左眼视力：{{ageResultData.schoolTestVision.leftVision }}</span>
                                        <span>左眼串镜：{{ageResultData.schoolTestVision.leftMirror == '0'?'正常': ageResultData.schoolTestVision.leftMirror == '1'?'正片上升、负片下降' : ageResultData.schoolTestVision.leftMirror == '-1'?'正片下降、负片上升':ageResultData.schoolTestVision.leftMirror == '2'?'其他':'未测试'}}</span>
                                        <span>左眼屈光不正：{{ageResultData.schoolTestVision.leftLight == '0' ? '正常':ageResultData.schoolTestVision.leftLight == '1' ? '近视':ageResultData.schoolTestVision.leftLight == '2' ? '远视':ageResultData.schoolTestVision.leftLight == '3' ? '其他':'未测试'}}</span>
                                    </div>
                                    <div class="m-sectionL-bottom">
                                        <span>右眼视力：{{ageResultData.schoolTestVision.rightVision }}</span>
                                        <span>右眼串镜：{{ageResultData.schoolTestVision.rightMirror == '0'?'正常': ageResultData.schoolTestVision.rightMirror == '1'?'正片上升、负片下降' : ageResultData.schoolTestVision.rightMirror == '-1'?'正片下降、负片上升':ageResultData.schoolTestVision.rightMirror == '2'?'其他':'未测试'}}</span>
                                        <span>右眼屈光不正：{{ageResultData.schoolTestVision.rightLight == '0' ? '正常':ageResultData.schoolTestVision.rightLight == '1' ? '近视':ageResultData.schoolTestVision.rightLight == '2' ? '远视':ageResultData.schoolTestVision.rightLight == '3' ? '其他':'未测试'}}</span>
                                    </div>
                                </div>
                                <div class="m-sectionR">
                                    <div class="m-secRAside">
                                        <img src="../../images/analysis.png" alt="">
                                        <span>分析：</span>
                                    </div>
                                    <div class="analysisContent" style="line-height:22px;">{{ageBit.diagnosisContent || ''}}</div>
                                    <div class="m-secRAside">
                                        <img src="../../images/proposal.png" alt="">
                                        <span>建议：</span>
                                    </div>
                                    <div class="analysisContent">{{ageBit.adviseContent || ''}}</div>
                                </div>
                            </div>
                    </div>
                </Card>
            </div>
      </div>
       <Modal
              v-model="modal"
              :closable="false"
              title="编辑健康报告"
              @on-ok="modalOk"
              ok-text="保存"
             >
          <div>
              <Input v-model="nowDiagnosis" :maxlength="400" type="textarea"  :rows="14" style="width: 480px;height: 330px;" />
              <div style="float:right;margin-right: 10px"> {{nowDiagnosis==null?0:nowDiagnosis.length}}/400</div>
          </div>
          <div slot="footer">
              <Button type="success" @click="modalOk">保存</Button>
          </div>
      </Modal>
      <!-- 成绩分析编辑器 -->
      <Modal
              v-model="BMIMOdal"
              :closable="false"
              title="成绩分析编辑"
              @on-cancel="cancel"
              cancel-text="取消"
              @on-ok="saveScore"
              ok-text="保存"
             >
          <div>
              <Input v-model="diagnosisContent" :maxlength="400" type="textarea"  :rows="10" style="width: 480px;height: 236px;" />
              <div style="text-align:right;margin-right: 10px"> {{diagnosisContent==null?0:diagnosisContent.length}}/400</div>
          </div>
          <div slot="footer">
              <Button type="success" @click="saveScore">保存</Button>
              <Button type="text" @click="cancel">取消</Button>
          </div>
      </Modal>
      <!-- 分析建议编辑器 -->
      <Modal
              v-model="commonModal"
              :closable="false"
              :title="activeDiagnog.itemName+'分析建议编辑'"
              @on-cancel="cancel"
              cancel-text="取消"
              @on-ok="savecommonModalScore"
              ok-text="保存"
             >
          <div>
              <div>分析</div>
              <Input v-model="activeDiagnog.diagnosisContent" :maxlength="400" type="textarea"  :rows="10" style="width: 480px;height: 236px;" />
              <div style="text-align:right;padding-right:10px"> {{activeDiagnog.diagnosisContent==null?0:activeDiagnog.diagnosisContent.length}}/400</div>
          </div>
          <div>
              <div>建议</div>
              <Input v-model="activeDiagnog.adviseContent" :maxlength="400" type="textarea"  :rows="10" style="width: 480px;height: 236px;" />
              <div style="text-align:right;padding-right:10px"> {{activeDiagnog.adviseContent==null?0:activeDiagnog.adviseContent.length}}/400</div>
          </div>
          <div slot="footer">
              <Button type="success" @click="savecommonModalScore">保存</Button>
              <Button type="text" @click="cancel">取消</Button>
          </div>
      </Modal>
    </div>
    <!-- 成都温江去学校 -->
    <div class="school" v-show="schoolId == 2996">
        <img src="../../images/yanshi/student/1.png" width="100%" alt="">
        <img src="../../images/yanshi/student/2.png" width="100%" alt="">
        <div class="projects">
            <img src="../../images/yanshi/student/projects/1.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/2.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/3.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/4.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/5.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/6.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/7.png" width="100%" alt="">
            <img src="../../images/yanshi/student/projects/8.png" width="100%" alt="">
        </div>
         <div class="imgsmall">
             <img src="../../images/yanshi/student/4.png" width="100%" alt="">
         </div>
        <img src="../../images/yanshi/student/5.png" width="100%" alt="">
        <div class="inner">
            <div>
                <img src="../../images/yanshi/student/6.png" width="100%" alt="">
            </div>
            <div class="item">
                <img class="right" src="../../images/yanshi/student/7.png" width="100%" alt="">
            </div>
        </div>
        <img src="../../images/yanshi/student/8.png" alt="">
      
      
         
    </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      schoolId: "",
      nowItem: "",
      modal: false,
      nowDiagnosis: "",
      selectTabName: "",
      loading: false,
      stuntId: "",
      studentName: "",
      registerCode: "",
      gender: "",
      grade: "",
      startSchool: "",
      studentClass: "",
      schoolName: "",
      genderName: "",
      gradeName: "",
      nationCode: "",
      birthday: "",
      addrDetail: "",
      idCardNo: "",
      studentClassName: "",
      testColumnsData: [],
      actionColumnsData: [],
      healthColumnsData: [],
      healthColumnsData1: [],
      studentScoreColumnsData: [],
      athleticColumns: [
        {
          title: "活动日期",
          key: "registerCode",
          align: "center",
        },
        {
          title: "活动名称",
          key: "studentName",
          align: "center",
        },
        {
          title: "活动类型",
          key: "registerC12ode",
          align: "center",
        },
        {
          title: "加分",
          key: "registerCo12de",
          align: "center",
          width: 250,
        },
      ],
      testColumns: [
        {
          title: "测试时间",
          key: "testTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "项目名称",
          key: "examItemName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "测试结果",
          key: "examResult",
          align: "center",
          width: 500,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.visionType == "1") {
              text +=
                "<div style='float:left;border-right:1px #BFC9CE solid;width:25%;padding-top:5px;'><div>裸眼视力</div><div style='text-align:center;'>左眼：" +
                row.leftVision +
                "</div>";
              text +=
                '<div style="text-align:center;">右眼：' +
                row.rightVision +
                "</div></div>";
              text +=
                "<div  style='float:left;border-right:1px #BFC9CE solid;width:50%;padding-top:5px;'><div>串镜</div><div style='text-align:left;'>&nbsp;&nbsp;&nbsp;&nbsp;左眼：" +
                (row.leftMirror == "0"
                  ? "正常"
                  : row.leftMirror == "1"
                  ? "正片上升、负片下降"
                  : row.leftMirror == "-1"
                  ? "正片下降、负片上升"
                  : row.leftMirror == "2"
                  ? "其他"
                  : row.leftMirror == "9"
                  ? "未测试"
                  : "--") +
                "</div>";
              text +=
                '<div style="text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;右眼：' +
                (row.rightMirror == "0"
                  ? "正常"
                  : row.rightMirror == "1"
                  ? "正片上升、负片下降"
                  : row.rightMirror == "-1"
                  ? "正片下降、负片上升"
                  : row.rightMirror == "2"
                  ? "其他"
                  : row.rightMirror == "9"
                  ? "未测试"
                  : "--") +
                "</div></div>";
              text +=
                "<div  style='float:left;width:25%;padding-top:5px;padding-bottom:5px;'><div>屈光不正</div><div style='text-align:center;' >左眼：" +
                (row.leftLight == "0"
                  ? "正常"
                  : row.leftLight == "1"
                  ? "近视"
                  : row.leftLight == "2"
                  ? "远视"
                  : row.leftLight == "3"
                  ? "其他"
                  : "未测试") +
                "</div>";
              text +=
                '<div  style="text-align:center;">右眼：' +
                (row.rightLight == "0"
                  ? "正常"
                  : row.rightLight == "1"
                  ? "近视"
                  : row.rightLight == "2"
                  ? "远视"
                  : row.rightLight == "3"
                  ? "其他"
                  : "未测试") +
                "</div></div>";
            } else {
              text = row.examResult;
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "测试得分",
          key: "score",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (
              params.row.examItemName == "体重" ||
              params.row.examItemName == "身高"
            ) {
              return h("div", "--");
            } else {
              return h("div", params.row.score);
            }
          },
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            if (
              params.row.examItemName == "体重" ||
              params.row.examItemName == "身高"
            ) {
              return h("div", "--");
            } else {
              return h("div", [
                h(
                  "span",
                  params.row.scoreLevel == "1"
                    ? "优秀"
                    : params.row.scoreLevel == "2"
                    ? "良好"
                    : params.row.scoreLevel == "3"
                    ? "及格"
                    : params.row.scoreLevel == "4"
                    ? "不及格"
                    : "-"
                ),
              ]);
            }
          },
        },
      ],
      examColumns: [
        {
          title: "考核时间",
          key: "testTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "项目名称",
          key: "classTestName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "考核内容",
          key: "examItemName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "考核结果",
          key: "examResult",
          align: "center",
          minWidth: 100,
        },
        {
          title: "考核得分",
          key: "score",
          align: "center",
          minWidth: 100,
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h(
              "font",
              params.row.scoreLevel == "1"
                ? "优秀"
                : params.row.scoreLevel == "2"
                ? "良好"
                : params.row.scoreLevel == "3"
                ? "及格"
                : "不及格"
            );
          },
        },
      ],
      healthyColumns: [
        {
          title: "考核时间",
          key: "createTime",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("font", params.row.createTime.slice(0, -2));
          },
        },
        {
          title: "考核得分",
          key: "teacherScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "span",
              params.row.teacherScore
                ? (params.row.teacherScore / 100).toFixed(1)
                : 0
            );
          },
        },
        {
          title: "等级",
          key: "teacherScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "font",
              params.row.teacherScore >= 90
                ? "优秀"
                : params.row.teacherScore >= 80 && params.row.teacherScore < 90
                ? "良好"
                : params.row.teacherScore >= 60 && params.row.teacherScore < 80
                ? "及格"
                : "不及格"
            );
          },
        },
      ],
      scoreColumns: [
        {
          title: "体测得分",
          key: "finishCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "运动技能得分",
          key: "actionScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore / 100;
            if (row.actionScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "健康知识得分",
          key: "healthScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore / 100;
            if (row.healthScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学习态度得分",
          key: "learnScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore / 100;
            if (row.learnScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "课后作业得分",
          key: "homeworkScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore / 100;
            if (row.homeworkScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学期总成绩得分",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore / 100;
            text = text.toFixed(1);
            if (text <= 0) {
              text = 0.0;
            }
            return h("span", text);
          },
        },
        {
          title: "等级",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            console.log(row);
            let text="";
            if(row.semesterLevel=='1'){
              text = "优秀";
            } else if (row.semesterLevel=='2') {
              text = "良好";
            } else if (row.semesterLevel=='3') {
              text = "及格";
            } else {
              text = "不及格";
            }
            return h("span", text);
          },
        },
      ],
      /*Mike*/
      isOkTest: false, //是否完成体质测试
      htmlTitle: "健康报告",
      tabsClass: {
        //特殊健康报告时tabpane的高度
        height: "33px",
      },
      BMIMOdal: false, //是否显示成绩分析编辑器
      commonModal: false, //多个公用的建议分析编辑器
      commonTitle: "", //公共的标题
      diagnosisContent: "", //整体分析文案
      activeDiagnog: {
        /*当前选择编辑的对象*/ adviseContent: "",
        diagnosisContent: "",
        itemName: "",
      },
      diagnosisData: [] /*项目列表*/,
      ageResultData: {
        /*档案详情，主要是用视力*/
        schoolTestVision: {
          leftVision: 0,
          leftMirror: 0,
          leftLight: 0,
          rightVision: 0,
          rightMirror: 0,
          rightLight: 0,
        },
        lastTestScore: 0,
        currentTestScore: 0,
        orderInfo: { testOrder: "" },
      },
      ageResultDataCopy: [{ schoolItemId: 1 }] /*项目列表总数据*/,
      levelList: ["不及格", "及格", "良好", "优秀", "满分"],
      isShowEdit: true, //是否展示编辑按钮
      run508: 0, //50米*8跑 id=7
      run1000: 0, //1000米跑 id=10
      run800: 0, //800米跑 id=11
    };
  },
  computed: {},
  methods: {
    modalOk() {
      var vm = this;
      if (null == this.nowDiagnosis || "" == this.nowDiagnosis) {
        vm.$Message.info("内容不能为空");
        return;
      }
      let data = {
        diagnosisId: this.nowItem.diagnosisId,
        schoolYear: this.nowItem.schoolYear,
        diagnosisContent: this.nowDiagnosis,
        grade: this.nowItem.grade,
        schoolId: this.nowItem.schoolId,
        studentId: vm.studentId,
      };
      this.$axios.post("/v1/exam/addOrUpdateDiagnosis", data).then((res) => {
        if (res.data.code == 10000) {
          vm.$Message.info("保存成功");
          this.getStudentTestListByStudent();
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
      this.BMIMOdal = false;
    },
    /*保存整体分析*/
    saveScore() {
      let vm = this;
      if (null == this.diagnosisContent || "" == this.diagnosisContent) {
        vm.$Message.info("内容不能为空");
        return;
      }
      let newArr = vm.diagnosisData.filter((val, index, arr) => {
        return val.schoolItemId == 12;
      });
      let data = {
        adviseContent: this.diagnosisContent,
        diagnosisContent: this.diagnosisContent,
        itemName: newArr[0].itemName,
        schoolItemId: 12,
        studentId: this.studentId,
        teacherEditer: newArr[0].teacherEditer,
      };
      this.$axios
        .post("/v1/schoolteststudent/saveTestItemDiagnosis", data)
        .then((res) => {
          if (res.data.code == 10000) {
            vm.$Message.info("保存成功");
            this.queryTestItemDiagnosis();
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
      this.BMIMOdal = false;
    },
    /*保存某个项目*/
    savecommonModalScore() {
      let vm = this;
      if (
        null == this.activeDiagnog.diagnosisContent ||
        "" == this.activeDiagnog.diagnosisContent
      ) {
        vm.$Message.info("分析内容不能为空");
        return;
      }
      if (
        null == this.activeDiagnog.adviseContent ||
        "" == this.activeDiagnog.adviseContent
      ) {
        vm.$Message.info("建议内容不能为空");
        return;
      }

      let data = {
        adviseContent: this.activeDiagnog.adviseContent,
        diagnosisContent: this.activeDiagnog.diagnosisContent,
        itemName: this.activeDiagnog.itemName,
        schoolItemId: this.activeDiagnog.schoolItemId,
        studentId: this.studentId,
        teacherEditer: this.activeDiagnog.teacherEditer,
      };
      this.$axios
        .post("/v1/schoolteststudent/saveTestItemDiagnosis", data)
        .then((res) => {
          if (res.data.code == 10000) {
            vm.$Message.info("保存成功");
            this.queryTestItemDiagnosis();
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
      this.commonModal = false;
    },
    editDiagnosis(item) {
      this.$axios
        .get("/v1/subjectReport/querySchoolReportedStatus?dataType=2")
        .then((res) => {
          if (res.data.code === 10000) {
            let { editStatus } = res.data.response;
            if (editStatus === "1") {
              this.modal = true;
              this.nowDiagnosis = item.diagnosis;
              this.nowItem = item;
            } else {
              this.$Modal.info({
                title: "提醒",
                okText: "知道了",
                closable: false,
                content:
                  "<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>",
              });
            }
          }
        });
    },
    getStudentHealthyByStudent() {
      var vm = this;
      this.$axios
        .get(
          "/v1/healthyKnowledge/getScoreBystudentId?studentId=" + vm.studentId
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let healthColumnsData1 = res.data.response;
            for (let j = 0; j < healthColumnsData1.length; j++) {
              let healthColumnsData2 = [];
              healthColumnsData2.push(healthColumnsData1[j]);
              vm.healthColumnsData1.push(healthColumnsData2);
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    selectTabs(name) {
      let vm = this;
      this.selectTabName = name;
      console.log("name", name);
      sessionStorage.setItem(
        "healthRecordStudent-healthRecordDetail-selectTabName",
        this.selectTabName
      );
    },
    goback() {
      //返回
      this.$router.go(-1);
    },
    getStudentBaseInfoByStudentId() {
      var that = this;
      this.$axios
        .get(
          "/v1/studentinfo/getStudentBaseInfoByStudentId?studentId=" +
            this.studentId
        )
        .then(function (response) {
          let data = response.data.response;
          that.studentId = data.studentId ? data.studentId : "";
          that.registerCode = data.registerCode ? data.registerCode : "";
          that.studentName = data.studentName ? data.studentName : "";
          that.gradeName = data.startSchool + "级";
          that.grade = data.grade ? data.grade : "";
          that.studentClass = data.studentClass ? data.studentClass : "";
          that.gender = data.gender ? data.gender : "";
          that.schoolName = data.schoolName ? data.schoolName : "";
          that.nationCode = data.nationCode ? data.nationCode : "";
          that.birthday = data.birthday ? data.birthday : "";
          that.addrDetail = data.addrDetail ? data.addrDetail : "";
          that.idCardNo = data.idCardNo ? data.idCardNo : "";
        })
        .catch(function (response) {});
    },
    getStudentTestListByStudent() {
      var vm = this;
      this.$axios
        .get(
          "/v1/exam/getStudentDiagnosisByStudent?studentId=" +
            vm.studentId +
            "&grade=" +
            vm.grade +
            "&gender=" +
            vm.gender +
            "&startSchool=" +
            vm.startSchool
        )
        .then((res) => {
          // this.$axios.get('/v1/exam/getStudentTestListByStudent?studentId='+vm.studentId+'&grade='+vm.grade+'&gender='+vm.gender+'&startSchool='+vm.startSchool).then(res => {
          if (res.data.code == 10000) {
            let resultList = res.data.response;
            // for(let j=0;j<resultList.length;j++){
            //    let result = resultList[j].testList;
            //     for(let i=0;i<result.length;i++){
            //         if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"){
            //             result[i].examResult = vm.s_to_hs(result[i].examResult)+result[i].valueUnit
            //         }else{
            //             result[i].examResult += result[i].valueUnit
            //         }
            //         if(result[i].examItemName == "BMI" && result[i].valueUnit == "kg"){
            //             result[i].examItemName = "体重";
            //             result[i].score="-";
            //             result[i].scoreLevel="-";
            //         }
            //         if(result[i].examItemName == "BMI" && result[i].valueUnit == "cm"){
            //             result[i].examItemName = "身高"
            //             result[i].score="-";
            //             result[i].scoreLevel="-";
            //         }
            //     }
            //     let vision = resultList[j].vision;
            //     if(vision){
            //         vision.score='-';
            //         vision.scoreLevel='-';
            //         vision.examItemName='视力';
            //         vision.testTime=vision.createTime;
            //         vision.visionType='1';
            //         result.push(vision);
            //     }
            // }
            vm.testColumnsData = resultList;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },

    getStudentExamListByStudent() {
      var vm = this;
      this.$axios
        .get("/v1/exam/getStudentExamListByStudent?studentId=" + vm.studentId)
        .then((res) => {
          if (res.data.code == 10000) {
            let resultList = res.data.response;
            let actionTemp = [];
            let healthTemp = [];
            for (let j = 0; j < resultList.length; j++) {
              let result = resultList[j];
              let semesterActionTemp = [];
              let semesterHealthTemp = [];
              if (result != null && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                  if (
                    result[i].examItemName == "50米X8往返跑" ||
                    result[i].examItemName == "1000米跑"
                  ) {
                    result[i].examResult = vm.s_to_hs(result[i].examResult);
                  } else if (result[i].examUnit == "99") {
                    result[i].examResult += "分";
                  } else if (result[i].examUnit == "个数") {
                    result[i].examResult += "个";
                  } else if (result[i].examUnit == "分.秒") {
                    result[i].examResult = vm.s_to_hs(result[i].examResult);
                  } else {
                    result[i].examResult += result[i].examUnit;
                  }
                  if (result[i].examItemType == "1") {
                    semesterHealthTemp.push(result[i]);
                  } else {
                    semesterActionTemp.push(result[i]);
                  }
                }
              }
              if (semesterActionTemp.length > 0) {
                actionTemp.push(semesterActionTemp);
              }
              if (semesterHealthTemp.length > 0) {
                healthTemp.push(semesterHealthTemp);
              }
            }
            vm.actionColumnsData = actionTemp;
            vm.healthColumnsData = healthTemp;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    queryStudentScoreByStudentId() {
      var vm = this;
      this.$axios
        .get(
          "/v1/semesterScore/queryStudentScoreByStudentId?studentId=" +
            vm.studentId
        )
        .then((res) => {
          if (res.data.code == 10000) {
            vm.studentScoreColumnsData = res.data.response;
            if (
              vm.studentScoreColumnsData != null &&
              vm.studentScoreColumnsData.length > 0
            ) {
              for (let i = 0; i < vm.studentScoreColumnsData.length; i++) {
                let actionPercent =
                  vm.studentScoreColumnsData[i].actionScore == null ||
                  vm.studentScoreColumnsData[i].actionScore >= 0
                    ? vm.studentScoreColumnsData[i].actionPercent
                    : 0;
                let healthPercent =
                  vm.studentScoreColumnsData[i].healthScore == null ||
                  vm.studentScoreColumnsData[i].healthScore >= 0
                    ? vm.studentScoreColumnsData[i].healthPercent
                    : 0;
                let homeworkPercent =
                  vm.studentScoreColumnsData[i].homeworkScore == null ||
                  vm.studentScoreColumnsData[i].homeworkScore >= 0
                    ? vm.studentScoreColumnsData[i].homeworkPercent
                    : 0;
                let learnPercent =
                  vm.studentScoreColumnsData[i].learnScore == null ||
                  vm.studentScoreColumnsData[i].learnScore >= 0
                    ? vm.studentScoreColumnsData[i].learnPercent
                    : 0;
                let testPercent =
                  vm.studentScoreColumnsData[i].testScore == null ||
                  vm.studentScoreColumnsData[i].testScore >= 0
                    ? vm.studentScoreColumnsData[i].testPercent
                    : 0;
                vm.studentScoreColumnsData[i].semesterPercent =
                  actionPercent +
                  healthPercent +
                  homeworkPercent +
                  learnPercent +
                  testPercent;
              }
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    /*雷达图*/
    drawGen(indicator, seriesValue) {
      console.log("indicator", indicator);
      console.log("seriesValue", seriesValue);
      let vm = this;
      vm.myCharts.setOption({
        backgroundColor: "#fff",
        radar: [
          {
            indicator: indicator,
            center: ["50%", "50%"],
            radius: "80%",
            startAngle: 60,
            splitNumber: 10,
            max: 100,
            shape: "circle",
            name: {
              textStyle: {
                color: "#666",
                fontSize: 14,
                lineHeight: 18,
              },
              //指示器文字换行 start
              formatter: function (text) {
                var strlength = text.length;
                if (strlength > 2) {
                  var match = text.split("-");
                  return match[0] + "\n" + match[1];
                }
                return text;
              },
            },
            splitArea: {
              areaStyle: {
                color: ["rgba(0, 0, 0, 0)"],
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,0,0,0)", //竖线
              },
            },
            splitLine: {
              lineStyle: {
                color: "#E6E6E6",
              },
            },
          },
        ],
        series: [
          {
            name: "体质统计",
            type: "radar",
            data: [
              {
                value: seriesValue,
                name: "图1",
                symbol: "circle",
                symbolSize: 1,
                itemStyle: {
                  color: "#00C693",
                },
                lineStyle: {
                  width: 1,
                  color: "#00C693",
                },
                label: {
                  show: false,
                  color: "#00C693",
                  fontSize: 15,
                  position: ["80%", "80%"],
                  distance: 15,
                  rich: {
                    a: {
                      color: "#FFFFFF",
                    },
                  },
                },
                areaStyle: {
                  normal: {
                    color: "#00C693",
                    opacity: 0.25,
                  },
                },
              },
            ],
          },
        ],
      });
    },
    /*编辑BMI*/
    handleRender() {
      this.BMIMOdal = true;
    },
    /*某个项目的编辑设置title*/
    commonedit(value) {
      this.commonTitle = `${value.itemName}分析编辑器`;
      this.activeDiagnog = value;
      this.commonModal = true;
    },
    downpdf() {
      let vm = this;
      vm.isShowEdit = false;
      this.$Message.loading({
        content: "PDF生成中...",
        duration: 0,
      });
      setTimeout(function () {
        vm.$Message.destroy();
        vm.getPdf("healthReportBox", "健康报告");
        vm.isShowEdit = true;
      }, 1000);
    },
    cancel() {
      this.BMIMOdal = false;
      this.commonModal = false;
    },
    /*查询健康分析和建议*/
    queryTestItemDiagnosis() {
      let vm = this;
      this.$axios
        .get(
          "/v1/schoolteststudent/queryTestItemDiagnosis?studentId=" +
            vm.studentId
        )
        .then((res) => {
          if (res.data.code == 10000) {
            vm.diagnosisData = res.data.response;
            let result = vm.diagnosisData.filter((val, index, arr) => {
              return val.schoolItemId == 12;
            });
            vm.getTestAgeResultStudent();
          }
        });
    },
    /*查询学校健康档案详情*/
    getTestAgeResultStudent() {
      let vm = this;
      this.$axios
        .get(
          "/v1/test/query/getTestAgeResultStudent?studentId=" +
            vm.studentId
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let ageResultData = res.data.response;
            /*是否完成体质测试 --待接口添加字段*/
            vm.isOkTest = ageResultData.testOverStatus == 1 ? true : false;
            if (!vm.isOkTest) {
              return;
            }
            let diagnosisData = vm.diagnosisData;
            vm.ageResultData = ageResultData;
            /*从另外一个接口匹配整体分析的文案*/
            let diagnosisContentList = vm.testColumnsData.filter(
              (val, index, arr) => {
                return val.schoolYear == ageResultData.schoolYear;
              }
            );
            ageResultData.standardList.unshift({
              schoolItemName: "BMI",
              schoolTestId: 1,
              scoringCriteriaEnd: "",
              scoringCriteriaStart: "",
              valueUnit: "",
            });
            console.log("初始返回值", vm.ageResultData);
            /*雷达图*/
            let indicArr = [
              {
                text: "力量",
                score: ageResultData.strengthValue,
                max: 100,
              },
              {
                text: "速度",
                score: ageResultData.speedValue,
                max: 100,
              },
              {
                text: "灵敏",
                score: ageResultData.sensitiveValue,
                max: 100,
              },
              {
                text: "柔韧",
                score: ageResultData.pliableValue,
                max: 100,
              },
              {
                text: "协调",
                score: ageResultData.harmonizeValue,
                max: 100,
              },

              {
                text: "耐力",
                score: ageResultData.enduranceValue,
                max: 100,
              },
            ];
            for (let val of diagnosisData) {
              if (val.schoolItemId == 12 && val.teacherEditer == 1) {
                vm.diagnosisContent = val.diagnosisContent;
                break;
              } else {
                let levelTemp =
                  ageResultData.level == "1"
                    ? "优秀"
                    : ageResultData.level == "2"
                    ? "良好"
                    : ageResultData.level == "3"
                    ? "及格"
                    : "不及格";

                let strengthLevel =
                  ageResultData.strengthValue >= 9000
                    ? "优秀"
                    : ageResultData.strengthValue >= 8000
                    ? "良好"
                    : ageResultData.strengthValue >= 6000
                    ? "一般"
                    : "较差";
                let speedLevel =
                  ageResultData.speedValue >= 9000
                    ? "优秀"
                    : ageResultData.speedValue >= 8000
                    ? "良好"
                    : ageResultData.speedValue >= 6000
                    ? "一般"
                    : "较差";
                let pliablelevel =
                  ageResultData.pliableValue >= 9000
                    ? "优秀"
                    : ageResultData.pliableValue >= 8000
                    ? "良好"
                    : ageResultData.pliableValue >= 6000
                    ? "一般"
                    : "较差";
                let enduranceLevel =
                  ageResultData.enduranceValue >= 9000
                    ? "优秀"
                    : ageResultData.enduranceValue >= 8000
                    ? "良好"
                    : ageResultData.enduranceValue >= 6000
                    ? "一般"
                    : "较差";
                let sensitiveLevel =
                  ageResultData.sensitiveValue >= 9000
                    ? "优秀"
                    : ageResultData.sensitiveValue >= 8000
                    ? "良好"
                    : ageResultData.sensitiveValue >= 6000
                    ? "一般"
                    : "较差";
                let harmonizeLevel =
                  ageResultData.harmonizeValue >= 9000
                    ? "优秀"
                    : ageResultData.harmonizeValue >= 8000
                    ? "良好"
                    : ageResultData.harmonizeValue >= 6000
                    ? "一般"
                    : "较差";

                let total = this.calculation(ageResultData.currentTestScore);
                let descInfo = "";
                let deacItem = "";
                let itemDesc = "";
                if (ageResultData.strengthValue > 0) {
                  if (ageResultData.strengthValue < 9000) {
                    deacItem = "力量";
                    descInfo =
                      "你可以通过俯卧撑、跳起抱膝、仰卧悬垂臂屈伸、深蹲等运动提升力量素质；";
                  }
                  itemDesc =
                    itemDesc +
                    `力量素质${strengthLevel}，得分为${
                      ageResultData.strengthValue / 100 > 100
                        ? 100
                        : ageResultData.strengthValue / 100
                    }分；`;
                }
                if (ageResultData.speedValue > 0) {
                  if (ageResultData.speedValue < 9000) {
                    deacItem = deacItem == "" ? "速度" : deacItem + "、速度";
                    descInfo =
                      descInfo +
                      "你可以通过跳绳、负重弓箭步交换跳、踢腿、负重纵跳等运动提升速度素质；";
                  }
                  itemDesc =
                    itemDesc +
                    `速度素质${speedLevel}，得分为${
                      ageResultData.speedValue / 100 > 100
                        ? 100
                        : ageResultData.speedValue / 100
                    }分；`;
                }
                if (ageResultData.pliableValue > 0) {
                  if (ageResultData.pliableValue < 9000) {
                    deacItem = deacItem == "" ? "柔韧" : deacItem + "、柔韧";
                    descInfo =
                      descInfo +
                      "你可以通过体前屈、把杆拉腿、肋木体前后快速屈伸、快速的蹲立等运动提升柔韧素质；";
                  }
                  itemDesc =
                    itemDesc +
                    `柔韧素质${pliablelevel}，得分为${
                      ageResultData.pliableValue / 100 > 100
                        ? 100
                        : ageResultData.pliableValue / 100
                    }分；`;
                }
                if (ageResultData.enduranceValue > 0) {
                  if (ageResultData.enduranceValue < 9000) {
                    deacItem = deacItem == "" ? "耐力" : deacItem + "、耐力";
                    descInfo =
                      descInfo +
                      "你可以通过冲刺折返跑、匀速长跑、高抬腿跑等运动提升耐力素质；";
                  }
                  itemDesc =
                    itemDesc +
                    `耐力素质${enduranceLevel}，得分为${
                      ageResultData.enduranceValue / 100 > 100
                        ? 100
                        : ageResultData.enduranceValue / 100
                    }分；`;
                }
                if (ageResultData.sensitiveValue > 0) {
                  if (ageResultData.sensitiveValue < 9000) {
                    deacItem = deacItem == "" ? "灵敏" : deacItem + "、灵敏";
                    descInfo =
                      descInfo +
                      "你可以通过障碍跑、颠球、打沙包等运动提升灵敏素质；";
                  }
                  itemDesc =
                    itemDesc +
                    `灵敏素质${sensitiveLevel}，得分为${
                      ageResultData.sensitiveValue / 100 > 100
                        ? 100
                        : ageResultData.sensitiveValue / 100
                    }分；`;
                }
                if (ageResultData.harmonizeValue > 0) {
                  if (ageResultData.harmonizeValue < 9000) {
                    deacItem = deacItem == "" ? "协调" : deacItem + "、协调";
                    descInfo =
                      descInfo +
                      "你可以通过跳绳、拍球、踢毽子等运动提升协调素质；";
                  }
                  itemDesc =
                    itemDesc +
                    `协调素质${harmonizeLevel}，得分为${
                      ageResultData.harmonizeValue / 100 > 100
                        ? 100
                        : ageResultData.harmonizeValue / 100
                    }分；`;
                }
                if (deacItem != "") {
                  deacItem = "你需要加强" + deacItem + "的训练。";
                  descInfo = "在今后的体育锻炼中，" + descInfo;
                  descInfo = descInfo.substring(0, descInfo.length - 1) + "。";
                }
                vm.diagnosisContent =
                  `本年度体质健康测试成绩为${
                    ageResultData.currentTestScore
                  }分，等级为${levelTemp}，成绩优于${total}%的同龄人，年级排位${
                    ageResultData.orderInfo
                      ? ageResultData.orderInfo.testOrder
                      : "--"
                  }。` +
                  `各测试项目分别反映了人体身体素质，其中` +
                  `${itemDesc}${deacItem}${descInfo}`;
              }
            }
            let indicatorData = indicArr.filter((val) => {
              return val.score;
            });
            let indicator = indicatorData.map((val) => {
              let json = {};
              json.text = val.text;
              json.max = 100;
              return json;
            });
            let seriesValue = indicatorData.map((val) => {
              return Math.round((val.score / 100) * 10) / 10 > 100
                ? 100
                : Math.round((val.score / 100) * 10) / 10;
            });
            for (let [key, val] of indicator.entries()) {
              val.text = val.text + "-" + seriesValue[key];
            }
            /*画图*/
            vm.drawGen(indicator, seriesValue);
            /*取出除了整体评价的数据*/
            let newArr = diagnosisData.filter((val, index, arr) => {
              return val.schoolItemId != 12;
            });
            /*规定循环的数据格式*/
            let newArrData = newArr.map((val, index, arr) => {
              let json = {};
              json.adviseContent = val.adviseContent;
              json.diagnosisContent = val.diagnosisContent;
              json.itemName = val.itemName;
              json.schoolItemId = val.schoolItemId;
              json.studentId = val.studentId;
              json.teacherEditer = val.teacherEditer;
              json.resultValue = "";
              json.score = "";
              json.height = ageResultData.studentTestInfo.height;
              json.weight = ageResultData.studentTestInfo.weight;
              json.data = [];
              return json;
            });
            /*取出标准中的数值并且排序（时间类的降序，其他的升序）*/
            for (let val of ageResultData.standardList) {
              val.scoringCriteriaEnd = val.scoringCriteriaEnd.split(",");
              val.scoringCriteriaEnd = val.scoringCriteriaEnd.map(
                (val, index, arr) => {
                  let json = {};
                  json.score = val.split("|")[0];
                  json.resultValue = val.split("|")[1];
                  return json;
                }
              );
              val.scoringCriteriaEnd = val.scoringCriteriaEnd.sort(
                vm.compare1("resultValue")
              );
              val.scoringCriteriaStart = val.scoringCriteriaStart.split(",");
              val.scoringCriteriaStart = val.scoringCriteriaStart.map(
                (val, index, arr) => {
                  let json = {};
                  json.score = val.split("|")[0];
                  json.resultValue = val.split("|")[1];
                  return json;
                }
              );
              val.scoringCriteriaStart = val.scoringCriteriaStart.sort(
                vm.compare("resultValue")
              );
            }
            /*取出对应的成绩和分数*/
            let bmiValue = ageResultData.studentTestInfo.bmiValue; //BMI值
            let bmiScore = ageResultData.studentTestInfo.bmiScore; //BMI值
            let oneMinuteRopeSkippingValue =
              ageResultData.studentTestInfo.oneMinuteRopeSkippingValue; //一分钟跳绳值
            let oneMinuteRopeSkippingScore =
              ageResultData.studentTestInfo.oneMinuteRopeSkippingScore; //一分钟跳绳值
            let oneMinuteSitUpValue =
              ageResultData.studentTestInfo.oneMinuteSitUpValue; //一分钟仰卧起坐值
            let oneMinuteSitUpScore =
              ageResultData.studentTestInfo.oneMinuteSitUpScore; //一分钟仰卧起坐值
            let pullUpsValue = ageResultData.studentTestInfo.pullUpsValue; //引体向上
            let pullUpsScore = ageResultData.studentTestInfo.pullUpsScore; //引体向上
            let runEightHundredValue =
              ageResultData.studentTestInfo.runEightHundredValue; //跑步800米
            let runEightHundredScore =
              ageResultData.studentTestInfo.runEightHundredScore; //跑步800米
            let runFiftyEightValue =
              ageResultData.studentTestInfo.runFiftyEightValue; //跑步50*8
            let runFiftyEightScore =
              ageResultData.studentTestInfo.runFiftyEightScore; //跑步50*8
            let runFiftyValue = ageResultData.studentTestInfo.runFiftyValue; //50米跑
            let runFiftyScore = ageResultData.studentTestInfo.runFiftyScore; //50米跑
            let runThousandValue =
              ageResultData.studentTestInfo.runThousandValue; //1000米跑
            let runThousandScore =
              ageResultData.studentTestInfo.runThousandScore; //1000米跑
            let sitAndReachValue =
              ageResultData.studentTestInfo.sitAndReachValue; //坐位体前屈
            let sitAndReachScore =
              ageResultData.studentTestInfo.sitAndReachScore; //坐位体前屈
            let standingJumpValue =
              ageResultData.studentTestInfo.standingJumpValue; //立定跳远
            let standingJumpScore =
              ageResultData.studentTestInfo.standingJumpScore; //立定跳远
            let vitalCapacityValue =
              ageResultData.studentTestInfo.vitalCapacityValue; //肺活量
            let vitalCapacityScore =
              ageResultData.studentTestInfo.vitalCapacityScore; //肺活量
            /*根据不同的项目匹配对应的底部展示数字和排名*/
            for (let val of newArrData) {
              for (let vals of ageResultData.standardList) {
                if (val.schoolItemId == vals.schoolTestId) {
                  val.unit = vals.valueUnit;
                  val.gradeOrderCount = 0;
                  if (val.schoolItemId == 1) {
                    //BMI
                    val.resultValue = bmiValue;
                    val.score = bmiScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.bmiOrder
                      : 0;
                    val.data = [];
                  } else if (val.schoolItemId == 2) {
                    //肺活量
                    val.resultValue = vitalCapacityValue;
                    val.score = vitalCapacityScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.vitalCapacityOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 3) {
                    //50米跑
                    val.resultValue = runFiftyValue;
                    val.score = runFiftyScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.runFiftyOrder
                      : 0;
                    val.data = vals.scoringCriteriaEnd.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 4) {
                    //坐位体前屈
                    val.resultValue = sitAndReachValue;
                    val.score = sitAndReachScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.sitAndReachOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 5) {
                    //一分钟跳绳值
                    val.resultValue = oneMinuteRopeSkippingValue;
                    val.score = oneMinuteRopeSkippingScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.oneMinuteRopeSkippingOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 6) {
                    //一分钟仰卧起坐
                    val.resultValue = oneMinuteSitUpValue;
                    val.score = oneMinuteSitUpScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.oneMinuteSitUpOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 7) {
                    //跑步50*8
                    val.resultValue = runFiftyEightValue;
                    vm.run508 = vm.s_to_hs(runFiftyEightValue);
                    val.score = runFiftyEightScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.runFiftyEightOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 8) {
                    //立定跳远
                    val.resultValue = standingJumpValue;
                    val.score = standingJumpScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.standingJumpOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 9) {
                    //引体向上
                    val.resultValue = pullUpsValue;
                    val.score = pullUpsScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.pullUpsOrder
                      : 0;
                    val.data = vals.scoringCriteriaStart.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 10) {
                    //1000米跑
                    val.resultValue = runThousandValue;
                    vm.run1000 = vm.s_to_hs(runThousandValue);
                    val.score = runThousandScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.runThousandOrder
                      : 0;
                    val.data = vals.scoringCriteriaEnd.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  } else if (val.schoolItemId == 11) {
                    //跑步800米
                    val.resultValue = runEightHundredValue;
                    vm.run800 = vm.s_to_hs(runEightHundredValue);
                    val.score = runEightHundredScore;
                    val.gradeOrderCount = ageResultData.orderInfo
                      ? ageResultData.orderInfo.runEightHundredOrder
                      : 0;
                    val.data = vals.scoringCriteriaEnd.map((val) => {
                      return val.resultValue / 10 < 100 &&
                        val.resultValue / 10 > 0
                        ? (val.resultValue / 10).toFixed(1)
                        : val.resultValue / 10;
                    });
                  }
                }
              }
            }
            /*整合BMI的数据
                    type字段对应 
                    1低体重
                    2正常
                    3超重
                    4肥胖
                */
            let gender = vm.gender;
            let grade = vm.grade;
            let bmiStand = [
              { gender: "1", type: "1", grade: 1, start: 0, end: 13.4 },
              { gender: "1", type: "2", grade: 1, start: 13.5, end: 18.1 },
              { gender: "1", type: "3", grade: 1, start: 18.2, end: 20.3 },
              { gender: "1", type: "4", grade: 1, start: 20.4, end: 100 },
              { gender: "1", type: "1", grade: 2, start: 0, end: 13.6 },
              { gender: "1", type: "2", grade: 2, start: 13.7, end: 18.4 },
              { gender: "1", type: "3", grade: 2, start: 18.5, end: 20.4 },
              { gender: "1", type: "4", grade: 2, start: 20.5, end: 100 },
              { gender: "1", type: "1", grade: 3, start: 0, end: 13.8 },
              { gender: "1", type: "2", grade: 3, start: 13.9, end: 19.4 },
              { gender: "1", type: "3", grade: 3, start: 19.5, end: 22.1 },
              { gender: "1", type: "4", grade: 3, start: 22.2, end: 100 },
              { gender: "1", type: "1", grade: 4, start: 0, end: 14.1 },
              { gender: "1", type: "2", grade: 4, start: 14.2, end: 20.1 },
              { gender: "1", type: "3", grade: 4, start: 20.2, end: 22.6 },
              { gender: "1", type: "4", grade: 4, start: 22.7, end: 100 },
              { gender: "1", type: "1", grade: 5, start: 0, end: 14.3 },
              { gender: "1", type: "2", grade: 5, start: 14.4, end: 21.4 },
              { gender: "1", type: "3", grade: 5, start: 21.5, end: 24.1 },
              { gender: "1", type: "4", grade: 5, start: 24.2, end: 100 },
              { gender: "1", type: "1", grade: 6, start: 0, end: 14.6 },
              { gender: "1", type: "2", grade: 6, start: 14.7, end: 21.8 },
              { gender: "1", type: "3", grade: 6, start: 21.9, end: 24.5 },
              { gender: "1", type: "4", grade: 6, start: 24.6, end: 100 },
              { gender: "1", type: "1", grade: 7, start: 0, end: 15.4 },
              { gender: "1", type: "2", grade: 7, start: 15.5, end: 22.1 },
              { gender: "1", type: "3", grade: 7, start: 22.2, end: 24.9 },
              { gender: "1", type: "4", grade: 7, start: 25.0, end: 100 },
              { gender: "1", type: "1", grade: 8, start: 0, end: 15.6 },
              { gender: "1", type: "2", grade: 8, start: 15.7, end: 22.5 },
              { gender: "1", type: "3", grade: 8, start: 22.6, end: 25.2 },
              { gender: "1", type: "4", grade: 8, start: 25.3, end: 100 },
              { gender: "1", type: "1", grade: 9, start: 0, end: 15.7 },
              { gender: "1", type: "2", grade: 9, start: 15.8, end: 22.8 },
              { gender: "1", type: "3", grade: 9, start: 22.9, end: 26.0 },
              { gender: "1", type: "4", grade: 9, start: 26.1, end: 100 },
              { gender: "1", type: "1", grade: 10, start: 0, end: 16.4 },
              { gender: "1", type: "2", grade: 10, start: 16.5, end: 23.2 },
              { gender: "1", type: "3", grade: 10, start: 23.3, end: 26.3 },
              { gender: "1", type: "4", grade: 10, start: 26.4, end: 100 },
              { gender: "1", type: "1", grade: 11, start: 0, end: 16.7 },
              { gender: "1", type: "2", grade: 11, start: 16.8, end: 23.7 },
              { gender: "1", type: "3", grade: 11, start: 23.8, end: 26.5 },
              { gender: "1", type: "4", grade: 11, start: 26.6, end: 100 },
              { gender: "1", type: "1", grade: 12, start: 0, end: 17.2 },
              { gender: "1", type: "2", grade: 12, start: 17.3, end: 23.8 },
              { gender: "1", type: "3", grade: 12, start: 23.9, end: 27.3 },
              { gender: "1", type: "4", grade: 12, start: 27.4, end: 100 },
              { gender: "2", type: "1", grade: 1, start: 0, end: 13.2 },
              { gender: "2", type: "2", grade: 1, start: 13.3, end: 17.3 },
              { gender: "2", type: "3", grade: 1, start: 17.4, end: 19.2 },
              { gender: "2", type: "4", grade: 1, start: 19.3, end: 100 },
              { gender: "2", type: "1", grade: 2, start: 0, end: 13.4 },
              { gender: "2", type: "2", grade: 2, start: 13.5, end: 17.8 },
              { gender: "2", type: "3", grade: 2, start: 17.9, end: 20.2 },
              { gender: "2", type: "4", grade: 2, start: 20.3, end: 100 },
              { gender: "2", type: "1", grade: 3, start: 0, end: 13.5 },
              { gender: "2", type: "2", grade: 3, start: 13.6, end: 18.6 },
              { gender: "2", type: "3", grade: 3, start: 18.7, end: 21.1 },
              { gender: "2", type: "4", grade: 3, start: 21.2, end: 100 },
              { gender: "2", type: "1", grade: 4, start: 0, end: 13.6 },
              { gender: "2", type: "2", grade: 4, start: 13.7, end: 19.4 },
              { gender: "2", type: "3", grade: 4, start: 19.5, end: 22.0 },
              { gender: "2", type: "4", grade: 4, start: 22.1, end: 100 },
              { gender: "2", type: "1", grade: 5, start: 0, end: 13.7 },
              { gender: "2", type: "2", grade: 5, start: 13.8, end: 20.5 },
              { gender: "2", type: "3", grade: 5, start: 20.6, end: 22.9 },
              { gender: "2", type: "4", grade: 5, start: 23.0, end: 100 },
              { gender: "2", type: "1", grade: 6, start: 0, end: 14.1 },
              { gender: "2", type: "2", grade: 6, start: 14.2, end: 20.8 },
              { gender: "2", type: "3", grade: 6, start: 20.9, end: 23.6 },
              { gender: "2", type: "4", grade: 6, start: 23.7, end: 100 },
              { gender: "2", type: "1", grade: 7, start: 0, end: 14.7 },
              { gender: "2", type: "2", grade: 7, start: 14.8, end: 21.7 },
              { gender: "2", type: "3", grade: 7, start: 21.8, end: 24.4 },
              { gender: "2", type: "4", grade: 7, start: 24.5, end: 100 },
              { gender: "2", type: "1", grade: 8, start: 0, end: 15.2 },
              { gender: "2", type: "2", grade: 8, start: 15.3, end: 22.2 },
              { gender: "2", type: "3", grade: 8, start: 22.3, end: 24.8 },
              { gender: "2", type: "4", grade: 8, start: 24.9, end: 100 },
              { gender: "2", type: "1", grade: 9, start: 0, end: 15.9 },
              { gender: "2", type: "2", grade: 9, start: 16.0, end: 22.6 },
              { gender: "2", type: "3", grade: 9, start: 22.7, end: 25.1 },
              { gender: "2", type: "4", grade: 9, start: 25.2, end: 100 },
              { gender: "2", type: "1", grade: 10, start: 0, end: 16.4 },
              { gender: "2", type: "2", grade: 10, start: 16.5, end: 22.7 },
              { gender: "2", type: "3", grade: 10, start: 22.8, end: 25.2 },
              { gender: "2", type: "4", grade: 10, start: 25.3, end: 100 },
              { gender: "2", type: "1", grade: 11, start: 0, end: 16.8 },
              { gender: "2", type: "2", grade: 11, start: 16.9, end: 23.2 },
              { gender: "2", type: "3", grade: 11, start: 23.3, end: 25.4 },
              { gender: "2", type: "4", grade: 11, start: 25.5, end: 100 },
              { gender: "2", type: "1", grade: 12, start: 0, end: 17.0 },
              { gender: "2", type: "2", grade: 12, start: 17.1, end: 23.3 },
              { gender: "2", type: "3", grade: 12, start: 23.4, end: 25.7 },
              { gender: "2", type: "4", grade: 12, start: 25.8, end: 100 },
            ];
            let bmiStandArr = bmiStand.filter((val, index, arr) => {
              return grade == val.grade && gender == val.gender;
            });
            bmiStandArr = bmiStandArr.map((val, index, arr) => {
              return val.end;
            });
            bmiStandArr = bmiStandArr.filter((val, index, arr) => {
              return val < 100;
            });

            console.log("bmiStandArr", bmiStandArr);
            console.log("newArrData", newArrData);
            newArrData[0].data = [...bmiStandArr];
            /*计算成绩的当前位置1取出临界值*/
            for (let val of newArrData) {
              val.locationStart = 0;
              val.locationEnd = 0;
              val.locationIndex = 0;
              for (let [key, vals] of val.data.entries()) {
                if (
                  val.schoolItemId == 3 ||
                  val.schoolItemId == 10 ||
                  val.schoolItemId == 11
                ) {
                  //跑步的项目
                  if (parseFloat(val.resultValue) < parseFloat(vals)) {
                    val.locationEnd =
                      vals == val.data[val.data.length - 1] ? 0 : vals;
                  }
                  if (parseFloat(val.resultValue) > parseFloat(vals)) {
                    if (val.locationStart > 0) {
                      continue;
                    }
                    val.locationStart = vals;
                    val.locationIndex = key;
                  }
                } else {
                  if (parseFloat(val.resultValue) > parseFloat(vals)) {
                    val.locationStart = vals;
                  }
                  if (parseFloat(val.resultValue) < parseFloat(vals)) {
                    if (val.locationEnd > 0) {
                      continue;
                    }
                    val.locationEnd = vals;
                    val.locationIndex = key;
                  }
                }
              }
            }
            /*计算成绩的当前位置2计算位置*/
            for (let val of newArrData) {
              if (val.schoolItemId == 1) {
                //BMI
                /*判断大于最大值的情况，直接写死*/
                if (val.locationEnd == 0 && val.locationIndex == 0) {
                  //肥胖
                  val.location = 495;
                  if (val.teacherEditer == 0) {
                    val.diagnosisContent = `当前BMI值为${val.resultValue}，处于肥胖状态。肥胖状态对小孩身体健康有着不良影响，可能会引发呼吸道疾病、心脏功能降低、高血压、高血脂、高血糖等疾病，同时对心理健康也有着不良影响。可通过以下建议减轻体重。`;
                    val.adviseContent =
                      "1.适量增加运动量。每天运动40至60分钟，每周运动5天。需选择有全身肌肉参加的有氧运动，如减肥操、跑步、游泳、爬楼梯、跳绳、踢毽子等。  2.控制进食量。可采取逐渐减少的方式，每餐先减少1/3，待适应后，再减少到1/2。养成细嚼慢咽、饭前喝汤的习惯。  3.食物多样化。选择谷类、蔬菜、水果、鱼虾肉蛋奶类、豆类、坚果等食物配合交替食用。";
                  }
                  /*判断小于最小值的情况，直接写死*/
                } else if (val.locationStart == 0 && val.locationIndex == 0) {
                  //低体重
                  val.location = 55;
                  if (val.teacherEditer == 0) {
                    val.diagnosisContent = `当前BMI值为${val.resultValue}，处于低体重状态。低体重状态对小孩身体健康有着不良影响，可以会导致身体抵抗力降低，耐寒抗病能力弱、体力差等，也易患多种疾病。可通过以下建议增加体重。`;
                    val.adviseContent =
                      "1.规律饮食、合理增加进食量。主食要以易吸收的碳水化合物为主，如米饭。逐渐增加进食量，每餐先增加1/4，待适应后再到1/3。餐前及餐中尽量不要喝水。 2.早餐要营养、足量。可食用一杯全脂牛奶，一块奶油蛋糕或者3片甜面包。  3.以海产品、瘦肉、肝脏、奶、豆类等食物配合交替食用。  4.多吃蔬菜、水果。  5.以核桃、花生、牛肉干等作为零食。";
                  }
                } else {
                  val.location =
                    (1 -
                      (val.locationEnd - val.resultValue) /
                        (val.locationEnd - val.locationStart)) *
                      (val.locationIndex == 0 || val.locationIndex > 2
                        ? 110
                        : 165) +
                    (val.locationIndex == 1 ? 110 : 110 + 165);
                  if (val.teacherEditer == 0) {
                    if (
                      val.resultValue > val.data[0] &&
                      val.resultValue < val.data[1]
                    ) {
                      //正常
                      val.diagnosisContent = `当前BMI值为${val.resultValue}，处于正常状态。可通过以下建议保持BMI正常。`;
                      val.adviseContent =
                        "1.保持良好的饮食习惯，按时吃好三餐。可选择谷类、蔬菜、水果、鱼、禽、肉、蛋、奶类、豆类等食物配合交替食用。   2.进行适量的运动锻炼。每天运动40至60分钟，每周运动3-5天。可选择有全身肌肉参加的有氧运动，如减肥操、跑步、游泳、爬楼梯、跳绳、踢毽子等。   3.保持每天8-10小时的睡眠时间。";
                    } else {
                      //超重
                      val.diagnosisContent = `当前BMI值为${val.resultValue}，处于超重状态。超重状态对小孩身体健康有着不良影响，可能会引发呼吸道疾病、心脏功能降低、高血压、高血脂、高血糖等疾病，同时对心理健康也有着不良影响。可通过以下建议减轻体重。`;
                      val.adviseContent =
                        "1.适量增加运动量。每天运动40至60分钟，每周运动5天。需选择有全身肌肉参加的有氧运动，如减肥操、跑步、游泳、爬楼梯、跳绳、踢毽子等。   2.控制进食量。可采取逐渐减少的方式，每餐先减少1/3，待适应后，再减少到1/2。养成细嚼慢咽、饭前喝汤的习惯。   3.食物多样化。选择谷类、蔬菜、水果、鱼虾肉蛋奶类、豆类、坚果等食物配合交替食用。   4.远离油炸食品，少喝甜饮料、碳酸饮料   5.以蔬菜、水果、酸奶作为零食   6.早餐要营养、足量。以蛋白质为主。建议一杯牛奶，两三片面包或者一个煮鸡蛋。";
                    }
                  }
                }
              } else {
                /*判断大于最大值的情况，直接写死*/
                if (val.locationEnd == 0 && val.locationIndex == 0) {
                  val.location = 495;
                } else if (val.locationStart == 0 && val.locationIndex == 0) {
                  /*判断小于最小值的情况，直接写死*/
                  val.location = 55;
                } else {
                  if (
                    val.schoolItemId == 3 ||
                    val.schoolItemId == 7 ||
                    val.schoolItemId == 10 ||
                    val.schoolItemId == 11
                  ) {
                    //跑步的项目倒过来计算
                    val.location =
                      ((val.locationEnd - val.resultValue) /
                        (val.locationEnd - val.locationStart)) *
                        110 +
                      val.locationIndex * 110;
                  } else {
                    val.location =
                      (1 -
                        (val.locationEnd - val.resultValue) /
                          (val.locationEnd - val.locationStart)) *
                        110 +
                      val.locationIndex * 110;
                  }
                }
                /*增加项目的默认分析和建议*/
                if (val.teacherEditer == 0 && val.schoolItemId == 2) {
                  //肺活量
                  let levelPercent = vm.calculation(val.score);
                  if (val.score > 90) {
                    //肺活量90分以上
                    val.diagnosisContent = `肺活量成绩为${val.resultValue}${
                      val.unit || ""
                    }，得分${val.score}分，${
                      val.locationEnd == 0 && val.locationIndex == 0
                        ? "满分"
                        : val.locationEnd == 0 && val.locationIndex == 0
                        ? "不及格"
                        : vm.levelList[val.locationIndex]
                    }。成绩优于${levelPercent}%的同龄人，年级排位${
                      val.gradeOrderCount || "--"
                    }。   当前孩子肺活量检测数值较高，心肺功能较好，身体机能优秀。可通过以下建议提高肺活量。`;
                    val.adviseContent =
                      "1.坚持参加适当的体育锻炼，每天运动40至60分钟，每周运动3-5天。可选择游泳、健美操、篮球、跑步、骑自行车、乒乓球、羽毛球等项目。   2.多吃富含维生素的蔬菜水果   3.防止烟雾损害肺部";
                  } else {
                    //肺活量90分以下
                    val.diagnosisContent = `肺活量成绩为${val.resultValue}${
                      val.unit || ""
                    }，得分${val.score}分，${
                      val.locationEnd == 0 && val.locationIndex == 0
                        ? "满分"
                        : val.locationEnd == 0 && val.locationIndex == 0
                        ? "不及格"
                        : vm.levelList[val.locationIndex]
                    }。成绩优于${levelPercent}%的同龄人，年级排位${
                      val.gradeOrderCount || "--"
                    }。   当前孩子肺活量检测数值偏低，机体摄氧能力和排出废气的能力较差，人体内部的供氧不充裕，机体的一些工作可能不正常。一旦机体需要大量消耗氧的情况（如长时间学习、工作、剧烈运动时）就会出现供氧的严重不足，从而导致诸如头痛、头晕、胸闷、精神萎靡、注意力不集中、记忆力下降、失眠等不良反应，这不仅仅会影响了学习，而且会给身体健康造成许多无法挽回的损失。从而需要提高肺活量来保证身体健康。可通过以下建议提高肺活量。`;
                    val.adviseContent =
                      "1.坚持抬头挺胸直腰的正确姿势   2.坚持参加适当的体育锻炼。每天运动40至60分钟，每周运动3-5天。可选择游泳、健美操、篮球、跑步、骑自行车、乒乓球、羽毛球等项目。   3.坚持每天做50-100次扩胸动作，刚开始锻炼时可先做50个，适应后慢慢增加到100个。   4.防止烟雾损害肺部";
                  }
                } else if (val.teacherEditer == 0 && val.schoolItemId == 3) {
                  //50米跑
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `50米跑成绩为${val.resultValue}${
                    val.unit || ""
                  }，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   50米跑成绩可综合反映神经过程的灵活性、身体的协调性、关节和肌肉的柔韧性以及肌肉的力量和耐力。它既能部分地反映身体运动的综合素质，也是人从事体育活动、学习运动技能所必须具备的身体基本素质。可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.摆臂采用前后摆臂姿势，大小臂在跑步过程中，弯曲的角度在90-120度之间。   2.跑步过程中，脚底需要采用前脚掌着地的方式来跑，平时可以通过多练习小步跑来纠正错误着地方式。   3.通过俯卧撑来练习上肢力量；通过平板支撑，侧平板支撑，臀桥等动作来加强腰腹力量。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 4) {
                  //坐位体前屈
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `坐位体前屈成绩为${val.resultValue}${
                    val.unit || ""
                  }，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   坐位体前屈反应躯干、腰、髋等关节的活动幅度，韧带和肌肉的伸展性和弹性及身体柔韧素质的发展水平。测试值较高时，反应出身体协调能力优秀。在体育运动中，运动创伤的可能性较低。测试值较低时，会影响力量、速度等素质的协调。容易引起运动创伤。可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.站位体前屈：两腿并立，以膝伸直，上体前屈，两手掌触地，上体与腿尽量贴近，复原姿势后连续再做。   2.横叉：两手在体前扶地，两腿左右分开成直线，上体俯卧或侧倾。   3.正踢腿：直立，两臂平举，左脚向前迈出一小步，右腿绷脚面伸直，起腿要轻，急速有力地向上踢腿，高度要高，落腿要稳。两腿交替练习。   4. 原地跳志体前屈：两腿分立，两膝弯曲，两臂后摆，成半蹲式，向上纵跳，同时两腿分腿向体前前踢，上体前屈，两臂前伸触脚。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 5) {
                  //一分钟跳绳值
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `一分钟跳绳成绩为${val.resultValue}${
                    val.unit || ""
                  }，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   一分钟跳绳反应心肺功能和肌肉耐力，也反应身体的灵活性和协调性。可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.调整好跳绳长度：单脚踩住绳，两端拉到胸口位置。   2.掌握握绳的方法：握在绳柄中后端。   3.手上技术要点：两手上臂贴近身体，手腕用力。减少绳运行周长。   4.腿部技术要点：脚尖和前脚掌起跳落地，起跳高度不能太高以刚能过绳子最好，落地时膝盖微屈做缓冲。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 6) {
                  //一分钟仰卧起坐
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `一分钟仰卧起坐成绩为${
                    val.resultValue
                  }${val.unit || ""}，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。一分钟仰卧起坐是反应躯干、腰、髋等部位关节、韧带和肌肉的伸展性和弹性的项目。可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.起始姿势要标准：平躺并且双膝弯曲小腿抬起，在这个过程中双手抱头。   2.动作过程要标准：仰卧起坐的过程中需要腰腹部用力来带动上半身离开地面，并且这个过程中小腿是不能放下的，同时上半身要尽量向前卷缩。   3.呼吸节奏要把握：向前卷缩时吸气，而回落时就应该呼气。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 7) {
                  //跑步50*8
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `50米X8往返跑成绩为${val.resultValue}${
                    val.unit || ""
                  }，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   50米X8往返跑是体现爆发力的项目。可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.跑到标志杆时，向前跨一步的同时降低重心，减缓冲力，然后再向前迈一步身体倒转，脚尖稍向内转，用前脚掌内侧蹬地，同时作转身动作。   2.以从杆右侧起跑为例，一是向左内折转绕杆，二是向右后折转绕杆。当跑到标志杆时，   如左脚先踏过终点线，右脚向前一步制动，则做左内折转并提左腿绕杆迅速蹬地返回跑；   如右脚先踏过终点线，左脚向前一步制动，则做右后折转并提右腿绕杆迅速返回跑。   3.快跑急停重心稳，转胯转身起动快。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 8) {
                  //立定跳远
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `立定跳远成绩为${val.resultValue}${
                    val.unit || ""
                  }，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   立定跳远成绩受爆发力、腰部、臀部、双腿力量、身体平衡等因素的影响。可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.预摆技术练习：将预摆技术分解1-2两个节奏，双臂上摆展腹为1，双臂下摆屈蹲为2，进行重复练习即可。要注意的是在进行这项练习时，关注肩关节是否放松，摆臂与身体重心下移是否统一协调，还需要关注上身前屈的角度及下蹲的深度。   2.起跳腾空技术：主要练习方法为颠跳、轻跳、纵跳，斜摸跳、扶墙跳、斜坡跳。要注意的是在进行这些练习时，关注发力的方法和角度。腾空时，要注意抬腿的高度，上下身贴近的距离。   3.落地和协调练习：落地技术我们主要练摆腿跳练习、超越远度跳练习、单腿摆腿跳练习，仰卧摆腿、斜坡下跳练习。还有关协调性的问题，主要有先天因素的影响，还有后天各关节韧带及肌肉柔韧等因素的影响等方面，只有通过长期的重复技术练习及柔韧练习才能改善。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 9) {
                  //引体向上
                  let levelPercent = vm.calculation(val.score);
                  val.diagnosisContent = `引体向上成绩为${val.resultValue}${
                    val.unit || ""
                  }，得分${val.score}分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   引体向上是集手臂抓握力、上肢力量、背部力量和腰腹肌力量的项目，可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.每天定量的俯卧撑，增强臂力。   2.手提负重跑步，增强臂力和五指抓力、耐力。   3.摆动技巧：双脚自然并拢，双手自然下垂，双膝轻微弯曲，同时轻轻越起双手抓杠，然后双腿夹紧双脚并拢脚点尽力垂直，双腿用力。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 10) {
                  //1000米跑${val.unit|| ''}
                  let levelPercent = vm.calculation(val.score);
                  let factoryValue = vm.s_to_hs(val.resultValue);
                  val.diagnosisContent = `1000米跑成绩为${factoryValue}，得分${
                    val.score
                  }分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   1000米跑是个集耐力和爆发力的项目，可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.姿势：中长跑的姿势要保持于比较平衡，跑步的时候身体稍微向前倾，与地面的角度大概是80°到85°左右，跑步的过程中要注意抬头收腹，双手自然配合脚步运动，减少身体左右晃动。   2.步频和步长：保持步长，提高步频，或是保持步频，提高步长。   3.着地缓冲的技术： 落地要让脚跟先落地，但注意脚面不能和地面形成大的夹角（少于10°）或者整个脚落地，在着地缓冲时，要尽量减小阻力，迅速过渡到前蹬动作。   4.呼吸：呼吸节奏与步伐配合，每跑两步或三步一吸气，每跑两步或三步一呼气，吸气时要用口鼻同时吸气，呼气时用口呼气即可。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 11) {
                  //跑步800米${val.unit|| ''}
                  let levelPercent = vm.calculation(val.score);
                  let factoryValue = vm.s_to_hs(val.resultValue);
                  val.diagnosisContent = `800米跑成绩为${factoryValue}，得分${
                    val.score
                  }分，${
                    val.locationEnd == 0 && val.locationIndex == 0
                      ? "满分"
                      : val.locationEnd == 0 && val.locationIndex == 0
                      ? "不及格"
                      : vm.levelList[val.locationIndex]
                  }。成绩优于${levelPercent}%的同龄人，年级排位${
                    val.gradeOrderCount || "--"
                  }。   800米跑是个集耐力和爆发力的项目，可通过以下建议提高成绩。`;
                  val.adviseContent =
                    "1.姿势：中长跑的姿势要保持于比较平衡，跑步的时候身体稍微向前倾，与地面的角度大概是80°到85°左右，跑步的过程中要注意抬头收腹，双手自然配合脚步运动，减少身体左右晃动。   2.步频和步长：保持步长，提高步频，或是保持步频，提高步长。   3.着地缓冲的技术： 落地要让脚跟先落地，但注意脚面不能和地面形成大的夹角（少于10°）或者整个脚落地，在着地缓冲时，要尽量减小阻力，迅速过渡到前蹬动作。   4.呼吸：呼吸节奏与步伐配合，每跑两步或三步一吸气，每跑两步或三步一呼气，吸气时要用口鼻同时吸气，呼气时用口呼气即可。";
                } else if (val.teacherEditer == 0 && val.schoolItemId == 13) {
                  //视力
                  /*判断视力是否正常，目前只判断了左右眼屈光不正都为0就正常，否则判断左右眼其中一个近视就显示近视，其中一个远视就显示远视，否则显示空*/
                  val.diagnosisContent = `左眼裸眼视力${
                    vm.ageResultData.schoolTestVision.leftVision
                  }，右眼裸眼视力${
                    vm.ageResultData.schoolTestVision.rightVision
                  }${
                    vm.ageResultData.schoolTestVision.leftLight == "0" &&
                    vm.ageResultData.schoolTestVision.rightLight == "0"
                      ? "，正常"
                      : vm.ageResultData.schoolTestVision.leftLight == "1" ||
                        vm.ageResultData.schoolTestVision.rightLight == "1"
                      ? "，近视"
                      : vm.ageResultData.schoolTestVision.leftLight == "2" ||
                        vm.ageResultData.schoolTestVision.rightLight == "2"
                      ? "，远视"
                      : ""
                  }。保持视力正常对日后的学习生活尤为重要，可通过以下建议保护视力。`;
                  val.adviseContent =
                    "1.在读书或者写字时，眼睛与书本至少保持30厘米的距离。   2.保证用眼时光线充足，不可在昏暗的光线下读书、写字。   3.控制使用电子产品的时间，每天使用时间不超过2小时。每使用30分钟后，至少休息5分钟再继续使用。   4.	坚持每天做1-2次眼保健操。   5.避免开灯睡觉。";
                }
              }
              val.location -= 8; /*减去坐标一半的宽度*/
            }
            console.log("最终整合的数据结构", newArrData);
            vm.ageResultDataCopy = newArrData;
          }
        });
    },
    /*根据对象属性升序排列*/
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    /*根据对象属性降序排列*/
    compare1(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    },
    /*计算占比*/
    calculation(score) {
      /*分数包含的人数除以总人数*/
      let percentList = [
        { score: 10, studentCount: 30717 },
        { score: 20, studentCount: 22114 },
        { score: 30, studentCount: 35938 },
        { score: 40, studentCount: 43267 },
        { score: 50, studentCount: 57018 },
        { score: 60, studentCount: 80997 },
        { score: 62, studentCount: 79632 },
        { score: 64, studentCount: 107529 },
        { score: 66, studentCount: 126837 },
        { score: 68, studentCount: 148407 },
        { score: 70, studentCount: 163787 },
        { score: 72, studentCount: 193075 },
        { score: 74, studentCount: 199433 },
        { score: 76, studentCount: 210414 },
        { score: 78, studentCount: 198008 },
        { score: 80, studentCount: 284614 },
        { score: 85, studentCount: 227578 },
        { score: 90, studentCount: 146391 },
        { score: 95, studentCount: 109898 },
        { score: 100, studentCount: 285361 },
      ];
      let levelTotal = 0,
        countTotal = 0,
        levelPercent = 0;
      for (let percent of percentList) {
        if (score >= percent.score) {
          levelTotal += percent.studentCount;
        }
        countTotal += percent.studentCount;
      }
      levelPercent = parseInt((levelTotal / countTotal) * 100);
      return levelPercent;
    },
    /*秒转换成分秒*/
    s_to_hs(s) {
      //计算分钟
      //算法：将秒数除以60，然后下舍入，既得到分钟数
      let h;
      h = Math.floor(s / 60);
      //计算秒
      //算法：取得秒%60的余数，既得到秒数
      s = s % 60;
      //将变量转换为字符串
      h += "";
      s += "";
      //如果只有一位数，前面增加一个0
      h = h.length == 1 ? "0" + h : h;
      s = s.length == 1 ? "0" + s : s;
      return h + "′" + s + "′′";
    },
  },
  watch: {},
  created() {},
  mounted() {
    let vm = this;
    vm.myCharts = vm.$echarts.init(document.getElementById("myCharts"));
    vm.studentId = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-studentId"
    );
    vm.studentName = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-studentName"
    );
    vm.registerCode = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-registerCode"
    );
    vm.gender = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-gender"
    );
    vm.grade = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-grade"
    );
    vm.startSchool = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-startSchool"
    );
    vm.studentClass = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-studentClass"
    );
    vm.firstYearSemester = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-firstYearSemester"
    );
    vm.secondYearSemester = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-secondYearSemester"
    );
    let schoolId = sessionStorage.getItem("schoolId") || "";
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.gradeName =
      vm.grade == "1"
        ? "一年级"
        : vm.grade == "2"
        ? "二年级"
        : vm.grade == "3"
        ? "三年级"
        : vm.grade == "4"
        ? "四年级"
        : vm.grade == "5"
        ? "五年级"
        : vm.grade == "6"
        ? "六年级"
        : vm.grade == "7"
        ? "七年级"
        : vm.grade == "8"
        ? "八年级"
        : vm.grade == "9"
        ? "九年级"
        : vm.grade == "10"
        ? "高一"
        : vm.grade == "11"
        ? "高二"
        : vm.grade == "12"
        ? "高三"
        : "";
    vm.genderName = vm.gender == "1" ? "男" : "女";
    vm.studentClassName = vm.studentClass + "班";
    vm.selectTabName = sessionStorage.getItem(
      "healthRecordStudent-healthRecordDetail-selectTabName"
    );
    vm.schoolName = sessionStorage.getItem("schoolName");
    this.getStudentTestListByStudent();
    this.getStudentBaseInfoByStudentId();
    this.getStudentExamListByStudent();
    this.queryStudentScoreByStudentId();
    this.getStudentHealthyByStudent();
    this.queryTestItemDiagnosis();
  },
};
</script>
