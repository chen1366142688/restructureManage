<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">作业标准配置</h2>
    </div>
    <Card style="width:1590px;">
      <h4 style="margin-left:10px;">
        当前年级：{{gradeId=="1"?"一年级":gradeId=="2"?"二年级":gradeId=="3"?"三年级":gradeId=="4"?"四年级":
        gradeId=="5"?"五年级":gradeId=="6"?"六年级":gradeId=="7"?"七年级":gradeId=="8"?"八年级":gradeId=="9"?"九年级":
        gradeId=="10"?"高一":gradeId=="11"?"高二":"高三"}}
      </h4>
      <div style="margin-left:10px;width:1580px;margin-top:20px;" >
            <Row>
              <Col style="margin-top:5px;" span="25" v-if="strengthTf">
                <Label>力量训练：</Label>
                <CheckboxGroup style="margin-top:10px;" @on-change="changeChoose" v-model="strengthList">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==7&&item.planSource == '1')||(item.itemOrientationCode==7&&item.shareStatus=='1' && item.schoolId != schoolId)"
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div  style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input :maxlength="2"  v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
              <Col style="margin-top:5px;" span="25" v-if="speedTf">
                <Label>速度训练：</Label>
                <CheckboxGroup style="margin-top:10px;" @on-change="changeChoose"   v-model="strengthList">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==8&&item.planSource == '1')||(item.itemOrientationCode==8&&item.shareStatus=='1' && item.schoolId != schoolId)"
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input  :maxlength="2"  v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
              <Col style="margin-top:5px;" span="25" v-if="flexibleTf">
                <Label>柔韧训练：</Label>
                <CheckboxGroup v-model="strengthList" @on-change="changeChoose"  style="margin-top:10px;">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==9&&item.planSource == '1')||(item.itemOrientationCode==9&&item.shareStatus=='1' && item.schoolId != schoolId)"
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input  :maxlength="2"  v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
              <Col style="margin-top:5px;" span="25" v-if="enduranceTf">
                <Label>耐力训练：</Label>
                <CheckboxGroup v-model="strengthList" @on-change="changeChoose"  style="margin-top:10px;">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==10&&item.planSource == '1')||(item.itemOrientationCode==10&&item.shareStatus=='1' && item.schoolId != schoolId) "
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input  :maxlength="2" v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
              <Col style="margin-top:5px;" span="25" v-if="agileTft">
                <Label>敏捷训练：</Label>
                <CheckboxGroup v-model="strengthList" @on-change="changeChoose"  style="margin-top:10px;">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==11&&item.planSource == '1')||(item.itemOrientationCode==11&&item.shareStatus=='1' && item.schoolId != schoolId)"
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input  :maxlength="2" v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
<!--              <Col span="22">-->
<!--                <div style="border-bottom:1px #EEEEEE solid;height:1px;margin-top:50px;"></div>-->
<!--              </Col>-->
              <Col style="margin-top:5px;" span="25" v-if="harmonizeTf">
                <Label>协调训练：</Label>
                <CheckboxGroup v-model="strengthList" @on-change="changeChoose"  style="margin-top:10px;">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==12&&item.planSource == '1')||(item.itemOrientationCode==12&&item.shareStatus=='1' && item.schoolId != schoolId)"
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input  :maxlength="2" v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
              <Col style="margin-top:5px;" span="25" v-if="uniteTf">
                <Label>组合训练：</Label>
                <CheckboxGroup v-model="strengthList" @on-change="changeChoose"  style="margin-top:10px;">
                  <Checkbox style="height:30px;"
                    :label="item.planId"
                    v-if="(item.itemOrientationCode==13&&item.planSource == '1')||(item.itemOrientationCode==13&&item.shareStatus=='1' && item.schoolId != schoolId)"
                    v-for="(item,index) in planList"
                    :key="index"
                  >
                  <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                       <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                          <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                       </div>
                       <div style="float:left;width:180px;line-height:20px;height:30px;">
                          （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                       </div>
                       <div style="line-height:20px;height:30px;">
                        <Input  :maxlength="2" v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                        <font v-if="item.allTime && item.allTime > 0"  >
                            预估
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                            <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                            <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                        </font>
                       </div>
                  </div>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
                <Col style="margin-top:5px;" span="25" v-if="customTf">
                    <Label>自定义训练：</Label>
                    <CheckboxGroup style="margin-top:10px;" @on-change="changeChoose" v-model="strengthList">
                        <Checkbox style="height:30px;"
                                  :label="item.planId"
                                  v-if="item.planSource !='1'  && item.schoolId == schoolId"
                                  v-for="(item,index) in planList"
                                  :key="index"
                        >
                            <div style="margin-left:3px;float:right;width:680px;line-height:20px;height:30px;">
                                <div style="float:left;width:240px;line-height:20px;height:30px;overflow:hidden; white-space:nowrap;text-overflow:ellipsis;">
                                    <font>&nbsp;{{item.gender=="1"?"男":"女"}}&nbsp;&nbsp;{{item.planName}}</font>
                                </div>
                                <div style="float:left;width:180px;line-height:20px;height:30px;">
                                    （单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}}）&nbsp;&nbsp;
                                </div>
                                <div style="line-height:20px;height:30px;">
                                    <Input  :maxlength="2" v-model="item.groupNum" @input="changeGroupNumTime(item)" size="small" style="width: 40px;"/>&nbsp;组&nbsp;
                                    <font v-if="item.allTime && item.allTime > 0"  >
                                        预估
                                        <font style="color:#00C693">{{Math.floor(Number(item.allTime)/60000)}}</font>&nbsp;分
                                        <font style="color:#00C693">{{Math.floor(Number(item.allTime)%60000/1000)}}</font>&nbsp;秒
                                        <font style="color:#00C693">，{{item.allCount}}{{item.eachGroupNumUnit}}</font>
                                    </font>
                                </div>
                            </div>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>

                <Col span="25">
                    <div style="border-bottom:1px #EEEEEE solid;height:1px;margin-top:50px;"></div>
                </Col>
                <Col>
                  <div style="float:left;width:500px;border:1px #BFC9CE solid;height:255px;margin-left:0px;margin-top:50px;" >
                      <div style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;background-color:#F0F0F0">男生标准</div>
                      <div>
                          <div style="height:150px;overflow-y:scroll;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;" v-if="manviewlist && manviewlist.length>5" >

                              <div style="line-height:26px;height:26px;" v-for="item in manviewlist" v-if="item.gender=='1'">
                                <div style="float:left;width:140px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                                    {{item.planName}}
                                </div>
                                <div
                                  style="float:left;"
                                > (单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                    <p><span style="margin-right:20px;">{{item.planGroupNum}}组</span>
                                  <span style="">排序序号：<Input style="width:40px;" size="small"  v-model="item.sortIndex"  :maxlength="20" />
                                    </span
                                  ></p>
                                </div>
                              </div>

                          </div>
                          <div style="height:150px;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;" v-if="manviewlist && manviewlist.length<=5" >

                              <div style="line-height:26px;height:26px;" v-for="item in manviewlist" v-if="item.gender=='1'">
                                <div style="float:left;width:140px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                                    {{item.planName}}
                                </div>
                                <div
                                  style="float:left;"
                                > (单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                  <p><span style="margin-right:20px;">{{item.planGroupNum}}组</span>
                                  <span style="">排序序号：<Input style="width:40px;" size="small"   v-model="item.sortIndex"  :maxlength="20" />
                                    </span
                                  ></p>
                                  </div>
                              </div>

                          </div>
                          <div style="padding-left:25px;color:#2E2E2E;font-size:10px;font-weight:bold;margin-top:20px;" >预估总时长：<font style="color:#00C693;margin-left:10px;" >{{Number(combo.mantotalTime)%60000>0?Math.floor(Number(combo.mantotalTime)/60000)+'分'+(Number(combo.mantotalTime)%60000)/1000+'秒':Number(combo.mantotalTime)/60000+'分'}}</font>&nbsp; </div>
                      </div>
                  </div>
                  <div style="float:left;width:500px;border:1px #BFC9CE solid;height:255px;margin-left:160px;margin-top:50px;" >
                      <div style="border-bottom:1px #BFC9CE solid;height:51px;line-height:51px;text-align:center;background-color:#F0F0F0">女生标准</div>
                      <div>
                          <div style="height:150px;overflow-y:scroll;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;" v-if="womanviewlist && womanviewlist.length>5" >
                               <div style="line-height:26px;height:26px;" v-for="item in womanviewlist" v-if="item.gender=='2'">
                                <div style="float:left;width:140px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                                    {{item.planName}}
                                </div>
                                <div
                                  style="float:left;"
                                > (单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;">
                                    <p><span style="margin-right:20px;">{{item.planGroupNum}}组</span>
                                  <span style="">排序序号：<Input style="width:40px;" size="small"  v-model="item.sortIndex"  :maxlength="20" />
                                    </span
                                  ></p>
                                </div>
                              </div>
                          </div>
                          <div style="height:150px;font-size:13px;overflow-x: hidden;padding:10px 25px 10px 25px;line-height:26px;" v-if="womanviewlist && womanviewlist.length<=5" >
                               <div style="line-height:26px;height:26px;" v-for="item in womanviewlist" v-if="item.gender=='2'">
                                <div style="float:left;width:140px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                                    {{item.planName}}
                                </div>
                                <div
                                  style="float:left;"
                                > (单组{{item.eachGroupNum}}{{item.eachGroupNumUnit}}，{{Number(item.playGifTime)%60000>0?Math.floor(Number(item.playGifTime)/60000)+'分'+(Number(item.playGifTime)%60000)/1000+'秒':Number(item.playGifTime)/60000+'分'}})</div>
                                <div style="font-size:12px;float:right;"> 
                                   <p><span style="margin-right:20px;">{{item.planGroupNum}}组</span>
                                  <span style="">排序序号：<Input style="width:40px;" size="small"   v-model="item.sortIndex"  :maxlength="20" />
                                    </span
                                  ></p></div>
                              </div>
                          </div>
                          <div style="padding-left:25px;color:#2E2E2E;font-size:10px;font-weight:bold;margin-top:20px;" >预估总时长：<font style="color:#00C693;margin-left:10px;" >{{Number(combo.womantotalTime)%60000>0?Math.floor(Number(combo.womantotalTime)/60000)+'分'+(Number(combo.womantotalTime)%60000)/1000+'秒':Number(combo.womantotalTime)/60000+'分'}}</font>&nbsp; </div>
                      </div>
                  </div>
              </Col>
              <Col style="margin-top:20px;" span="20" >
                  <Label>适用班级：</Label>
                    <CheckboxGroup style="margin-top:10px;" v-model="onlyClassIds">
                    <Checkbox
                      :label="item.classId"
                      v-for="(item,index) in classIds"
                      :key="index+item"
                    >{{item.studentClassName}}</Checkbox>
                  </CheckboxGroup>
              </Col>
              <Col style="margin-top:20px;" span="20" >
                  <Label>描述：</Label>
                  <div>
                    <textarea
                                    class="tinymce-textarea"
                                    v-model="combo.comboDescribe"
                                    id="remark"
                                    placeholder="这里输入描述(最多不超过200个字)..........."
                                    style="width:1200px;height:100px;margin-top:10px;line-height:18px;"
                                    maxlength="200"
                                    ></textarea>
                  </div>
              </Col>
            </Row>
      </div>
    </Card>
    <Row>
      <div style="margin-top:20px;padding-left:40%;padding-bottom:20px">
        <Button style="float:left;width:120px;margin-right:30px;" @click="toListPage" type="success">返回</Button>
        <Button style="float:left;width:120px" @click="baseSubmit" :loading="submitTf" type="success">保存</Button>
      </div>
    </Row>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "test",
  data() {
    return {
      submitTf:false,
      gradeId: "",
      planList: [],
      planListTrue: [],
      comboPlanList: [],
      strengthList: [],
      speedList: [],
      flexibleList: [],
      enduranceList: [],
      agileList: [],
      harmonizeList:[],
      uniteList:[],
      uniteTf:false,
      strengthTf: false,
      speedTf: false,
      flexibleTf: false,
      enduranceTf: false,
      agileTft:false,
      harmonizeTf:false,
      customTf:false,
      combo: "",
      classIds:[],
      onlyClassIds:[],
      viewlist:[],
      manviewlist:[],
      womanviewlist:[],
      schoolId:"",
      semesterOver:"",
    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    changeGroupNumTime(item){
      var vm=this;
        if(item.groupNum > 0){
            item.allTime = item.groupNum*item.playGifTime;
            item.allCount = item.groupNum*item.eachGroupNum;
        }else{
            item.allTime = 0;
            item.allCount = 0;
        }
        // console.log(item)
        // console.log(vm.planList)
        vm.combo.mantotalTime=0;
      vm.combo.womantotalTime=0;
      for (var i = 0; i < vm.combo.list.length; i++) {
        for (var j = 0; j < vm.planList.length; j++) {
          if (vm.combo.list[i].planId == vm.planList[j].planId) {
            vm.combo.list[i].planName = vm.planList[j].planName;
            vm.combo.list[i].itemName = vm.planList[j].itemName;
            vm.combo.list[i].itemOrientationCode = vm.planList[j].itemOrientationCode;
            vm.combo.list[i].planDuration = vm.planList[j].planDuration;
            vm.combo.list[i].gender = vm.planList[j].gender;

            vm.combo.list[i].eachGroupNum = vm.planList[j].eachGroupNum;
            vm.combo.list[i].eachGroupNumUnit = vm.planList[j].eachGroupNumUnit;
            vm.combo.list[i].playGifTime = vm.planList[j].playGifTime;
            vm.combo.list[i].planGroupNum = vm.planList[j].groupNum;
            if(vm.planList[j].allTime){
                if( vm.planList[j].gender=='1'){
                  // console.log(vm.planList[j])
                    vm.combo.mantotalTime=(vm.combo.mantotalTime?vm.combo.mantotalTime:0)+ Number(vm.planList[j].allTime);
                }else{
                  vm.combo.womantotalTime=(vm.combo.womantotalTime?vm.combo.womantotalTime:0)+ Number(vm.planList[j].allTime);
                }
            }
          }
        }
      }
      if(vm.combo.list.length>0){
        // vm.viewlist=[];
        vm.manviewlist=[];
        vm.womanviewlist=[];
        for(var i=0;i<vm.combo.list.length;i++){
          if(vm.combo.list[i].gender=='1'){
            vm.combo.list[i].sortIndex=vm.manviewlist.length+1
            vm.manviewlist.push(vm.combo.list[i])
          }else{
            vm.combo.list[i].sortIndex=vm.womanviewlist.length+1
            vm.womanviewlist.push(vm.combo.list[i])
          }
            // vm.viewlist.push(vm.combo.list[i])
        }
      }

    },
    addCombo() {
      var vm = this;
      let data = {
        gradeId: vm.gradeId,
        list: [],
        totalTime:0,
        classIds:vm.onlyClassIds
      };
      vm.comboList.push(data);
    },
    toListPage(){ //返回
        this.$router.go(-1);
    },
    addPlan(index) {
      var vm = this;
      vm.strengthList = [];
      vm.speedList = [];
      vm.enduranceList = [];
      vm.flexibleList = [];
      vm.agileList = [];
      vm.harmonizeList=[];
      vm.uniteList=[];
      vm.combo = "";

      for (var i = 0; i < vm.comboList.length; i++) {
        if (i == index) {
          vm.combo = vm.comboList[i];
          // console.log(vm.combo)
          // if (vm.combo.comboId) {
          //   vm.getExerciseComboInfo(vm.combo.comboId);
          // }
        }
      }
      // console.log(vm.combo)
      if (vm.combo && vm.combo.list.length > 0) {
        for (var i = 0; i < vm.combo.list.length; i++) {
          if (vm.combo.list[i].itemOrientationCode == 7) {
            vm.strengthList.push(vm.combo.list[i].planId);
          }
          if (vm.combo.list[i].itemOrientationCode == 8) {
            vm.speedList.push(vm.combo.list[i].planId);
          }
          if (vm.combo.list[i].itemOrientationCode == 9) {
            vm.flexibleList.push(vm.combo.list[i].planId);
          }
          if (vm.combo.list[i].itemOrientationCode == 10) {
            vm.enduranceList.push(vm.combo.list[i].planId);
          }
          if (vm.combo.list[i].itemOrientationCode == 11) {
            vm.agileList.push(vm.combo.list[i].planId);
          }
          if (vm.combo.list[i].itemOrientationCode == 12) {
            vm.harmonizeList.push(vm.combo.list[i].planId);
          }
          if (vm.combo.list[i].itemOrientationCode == 13) {
            vm.uniteList.push(vm.combo.list[i].planId);
          }
        }
      }
      vm.modal1 = true;
    },
    changeChoose(e) {
      var vm = this;
      // return
      vm.combo.list = [];
      if (e && e.length>0) {
        for (var i = 0; i < e.length; i++) {
          let data = {
              planId: e[i]
            };
            vm.combo.list.push(data)
        }
      }else{
        vm.strengthList=[];
        vm.viewlist=[]
      }
      vm.combo.mantotalTime=0;
      vm.combo.womantotalTime=0;
        for (let i = 0; i < vm.planList.length; i++) {
            vm.planList[i].allTime = 0
            // vm.planList[i].groupNum = null
        }
      if(vm.combo.list.length>0){
          for (var i = 0; i < vm.combo.list.length; i++) {
            for (var j = 0; j < vm.planList.length; j++) {
              if (vm.combo.list[i].planId == vm.planList[j].planId) {

                vm.planList[j].groupNum=vm.planList[j].groupNum?vm.planList[j].groupNum:1;
                vm.planList[j].allTime=vm.planList[j].groupNum*vm.planList[j].playGifTime;
                vm.planList[j].allCount=vm.planList[j].groupNum*vm.planList[j].eachGroupNum;

                vm.combo.list[i].planName = vm.planList[j].planName;
                vm.combo.list[i].itemName = vm.planList[j].itemName;
                vm.combo.list[i].itemOrientationCode = vm.planList[j].itemOrientationCode;
                vm.combo.list[i].planDuration = vm.planList[j].planDuration;
                vm.combo.list[i].gender = vm.planList[j].gender;

                vm.combo.list[i].eachGroupNum = vm.planList[j].eachGroupNum;
                vm.combo.list[i].eachGroupNumUnit = vm.planList[j].eachGroupNumUnit;
                vm.combo.list[i].playGifTime = vm.planList[j].playGifTime;
                vm.combo.list[i].planGroupNum = vm.planList[j].groupNum;

                if(vm.planList[j].allTime){
                    if( vm.planList[j].gender=='1'){
                      // console.log(vm.planList[j])
                        vm.combo.mantotalTime=(vm.combo.mantotalTime?vm.combo.mantotalTime:0)+ Number(vm.planList[j].allTime);
                    }else{
                      vm.combo.womantotalTime=(vm.combo.womantotalTime?vm.combo.womantotalTime:0)+ Number(vm.planList[j].allTime);
                    }
                }
              }
            }
          }

        vm.manviewlist=[];
        vm.womanviewlist=[];
        for(var i=0;i<vm.combo.list.length;i++){
          if(vm.combo.list[i].gender=='1'){
            vm.combo.list[i].sortIndex=vm.manviewlist.length+1
            vm.manviewlist.push(vm.combo.list[i])
          }else{
            vm.combo.list[i].sortIndex=vm.womanviewlist.length+1
            vm.womanviewlist.push(vm.combo.list[i])
          }
        }
        //   vm.viewlist=[];
        // for(var i=0;i<vm.combo.list.length;i++){
        //     vm.viewlist.push(vm.combo.list[i])
        // }
      }else {
          vm.manviewlist=[];
          vm.womanviewlist=[];
      }
        for (let i = 0; i < vm.planList.length; i++) {
            if(vm.planList[i].allTime == 0||vm.planList[i].allTime == ''){
                vm.planList[i].groupNum = null
            }
        }
      // console.log(vm.viewlist)
      // this.$forceUpdate();
      // vm.baseSubmit();
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
    },
    getAllExercisePlan(gradeId) {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/getAllExercisePlan?gradeId=" + gradeId)
        .then(function(response) {
          // console.log(response);
          let data = response.data.response;

          if(sessionStorage.getItem("exerciseComboList-exerciseComboDetail-comboId")){
              vm.getExerciseComboInfo(sessionStorage.getItem("exerciseComboList-exerciseComboDetail-comboId"));
              vm.planListTrue = data;
            }else{
              vm.planList = data;
              vm.combo={
                mantotalTime:0,
                womantotalTime:0
              }
            }
          if(data){

            for(var i=0;i<data.length;i++){
              vm.groupNum="";
              vm.allCount="";
              vm.allTime=0;
              if(data[i].itemOrientationCode==7){
                vm.strengthTf=true;
              }
              if(data[i].itemOrientationCode==8){
                vm.speedTf=true;
              }
              if(data[i].itemOrientationCode==9){
                vm.flexibleTf=true;
              }
              if(data[i].itemOrientationCode==10){
                vm.enduranceTf=true;
              }
              if(data[i].itemOrientationCode==11){
                vm.agileTft=true;
              }
              if(data[i].itemOrientationCode==12){
                vm.harmonizeTf=true;
              }
              if(data[i].itemOrientationCode==13){
                vm.uniteTf=true;
              }
              if(data[i].planSource !='1'  && data[i].schoolId == vm.schoolId){
                    vm.customTf=true;
              }
            }


          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getExerciseComboInfo(comboId) {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/getExerciseComboInfo?comboId=" + comboId)
        .then(function(response) {
          let data = response.data.response;
          vm.combo = data ? data : "";
          if(data){
            if(data.classIds){
              for(var i=0;i<data.classIds.length;i++){
              vm.onlyClassIds.push(data.classIds[i])
              }
            }
            if(data.list){
              for(var i=0;i<vm.planListTrue.length;i++){

                for(var j=0;j<data.list.length;j++){
                  if(vm.planListTrue[i].planId==data.list[j].planId){
                    vm.planListTrue[i].groupNum=Number(data.list[j].planGroupNum)
                    if(data.list[j].planGroupNum > 0){
                        vm.planListTrue[i].allTime = vm.planListTrue[i].groupNum*vm.planListTrue[i].playGifTime;
                        vm.planListTrue[i].allCount = vm.planListTrue[i].groupNum*vm.planListTrue[i].eachGroupNum;
                    }else{
                        vm.planListTrue[i].allTime = 0;
                        vm.planplanListTrueList[i].allCount = 0;
                    }
                    // console.log(vm.combo.list[j])
                    if ( vm.combo.list[j]) {
                      vm.strengthList.push(vm.combo.list[j].planId);
                    }

                  }
                }
                vm.planList.push(vm.planListTrue[i]);
              }
            }
          }

          vm.combo.mantotalTime=0;
      vm.combo.womantotalTime=0;
      for (var i = 0; i < vm.combo.list.length; i++) {
        for (var j = 0; j < vm.planList.length; j++) {
          if (vm.combo.list[i].planId == vm.planList[j].planId) {
            vm.combo.list[i].planName = vm.planList[j].planName;
            vm.combo.list[i].itemName = vm.planList[j].itemName;
            vm.combo.list[i].itemOrientationCode = vm.planList[j].itemOrientationCode;
            vm.combo.list[i].planDuration = vm.planList[j].planDuration;
            vm.combo.list[i].gender = vm.planList[j].gender;

            vm.combo.list[i].eachGroupNum = vm.planList[j].eachGroupNum;
            vm.combo.list[i].eachGroupNumUnit = vm.planList[j].eachGroupNumUnit;
            vm.combo.list[i].playGifTime = vm.planList[j].playGifTime;
            vm.combo.list[i].planGroupNum = vm.planList[j].groupNum;
            if(vm.planList[j].allTime){
                if( vm.planList[j].gender=='1'){
                  // console.log(vm.planList[j])
                    vm.combo.mantotalTime=(vm.combo.mantotalTime?vm.combo.mantotalTime:0)+ Number(vm.planList[j].allTime);
                }else{
                  vm.combo.womantotalTime=(vm.combo.womantotalTime?vm.combo.womantotalTime:0)+ Number(vm.planList[j].allTime);
                }
            }
          }
        }
      }
      if(vm.combo.list.length>0){

        vm.manviewlist=[];
        vm.womanviewlist=[];
        for(var i=0;i<vm.combo.list.length;i++){
          if(vm.combo.list[i].gender=='1'){
            vm.manviewlist.push(vm.combo.list[i])
          }else{
            vm.womanviewlist.push(vm.combo.list[i])
          }
        }

        // vm.viewlist=[];
        // for(var i=0;i<vm.combo.list.length;i++){
        //     vm.viewlist.push(vm.combo.list[i])
        // }
      }

          // console.log(vm.planList)
        })
        .catch(function(response) {
          console.log(response);
        });
    },
     getGradeClassSingleInfo(gradeId) {
      var vm = this;
      this.$axios
        .get("/v1/exercisecombo/getGradeClassSingleInfo?gradeId=" + gradeId)
        .then(function(response) {
          // console.log(response);
          let data = response.data.response;
          vm.classIds = data ? data : [];
          vm.classIds=vm.sort(vm.classIds)
          if(data){
            if((sessionStorage.getItem("exerciseComboList-exerciseComboDetail-comboId"))){

            }else{
              for(var i=0;i<data.length;i++){
              vm.onlyClassIds.push(data[i].classId)
            }
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },

    baseSubmit() {
      var vm = this;
      vm.submitTf=true

      if(!vm.combo.list || vm.combo.list<1){
        this.$Message.error("请添加计划");
        vm.submitTf=false;
        return false;
      }
      var re = /^[1-9]+[0-9]*]*$/; 
      for(var i=0;i<vm.combo.list.length;i++){
          if(!vm.combo.list[i].planGroupNum || vm.combo.list[i].planGroupNum<1){
            this.$Message.error("请添加计划的训练组数");
            vm.submitTf=false;
            return false;
          }
          // console.log(vm.combo.list[i].sortIndex)
          // console.log(re.test(vm.combo.list[i].sortIndex))
          if(!vm.combo.list[i].sortIndex || !re.test(vm.combo.list[i].sortIndex)){
            this.$Message.error("请检验排序数字的正确性！");
            vm.submitTf=false;
            return false;
          }
      }
      if(!vm.onlyClassIds || vm.combo.onlyClassIds<1){
        this.$Message.error("请选择班级");
        vm.submitTf=false;
        return false;
      }

      vm.combo.classIds=vm.onlyClassIds;
      vm.combo.gradeId=vm.gradeId
      if(vm.semesterOver && vm.semesterOver=='0'){
          vm.combo.semesterOver='0'
      }

      let data = vm.combo;
      // console.log(data);
      // return;
      this.$axios
        .post("/v1/exercisecombo/upsertExerciseCombo", data)
        .then(function(response) {
          vm.submitTf=false;
          if (response.data.code == 10000) {
            let numCode = response.data.response.code;
            if (numCode == "1") {
              vm.$Message.info("保存成功！");
              vm.$router.go(-1);
            } else {
              vm.$Message.error(response.data.response.msg);
            }
          } else {
            vm.$Message.info("保存失败！");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    sort(arr){
      for(let classes of arr){
        classes.studentClass=Number(classes.studentClassName.substr(0,classes.studentClassName.length-1));
      }
      console.log(arr)
          for(var j=0;j<arr.length-1;j++){
          //两两比较，如果前一个比后一个大，则交换位置。
            for(var i=0;i<arr.length-1-j;i++){
                  if(arr[i].studentClass>arr[i+1].studentClass){
                      var temp = arr[i];
                      arr[i] = arr[i+1];
                      arr[i+1] = temp;
                  }
              } 
      }
      return arr;
    }
  },
  mounted() {
    var vm = this;
    vm.schoolId = sessionStorage.getItem('schoolId');
    vm.semesterOver = sessionStorage.getItem("exerciseComboList-exerciseComboDetail-semesterOver");
    vm.gradeId = sessionStorage.getItem(
      "exerciseComboList-exerciseComboDetail-gradeId"
    );
    vm.getAllExercisePlan(
      sessionStorage.getItem("exerciseComboList-exerciseComboDetail-gradeId")
    );
    vm.getGradeClassSingleInfo(
      sessionStorage.getItem("exerciseComboList-exerciseComboDetail-gradeId")
    );
  },
  destroyed() {
    var vm = this;
  }
};
</script>
