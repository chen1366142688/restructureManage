<style lang="less" scoped>
    @import "../public.less";
</style>
<style lang="less" scoped>
    .labelV{
        float:left;
        width:200px;
    }
    .itemL{
       float:left;
       width:75px;
       text-align:right; 
    }
    .itemLabel{
        float:left;
        width:100px;
        padding-top:4px;
        text-align:right;
    }
</style>
<template>
    <div id="app" class='padingL10' v-if="studentInfo">
        <h2 class='titleLocation'>学生:{{studentInfo.studentName}}</h2>
        <Card>
            <div class="top-search">
                <div class="left-input" style="align-items:center">
                    <div class="searchItem">
                        <span>班级：</span>
                        <span>{{gradeClass()}}</span>
                    </div>
                    <div class="searchItem">
                        <span>学籍号：</span>
                        <span>{{studentInfo.registerCode}}</span>
                    </div>
                    <div class="searchItem">
                        <span>性别：</span>
                        <span>{{studentInfo.gender === '1' ? '男' : '女'}}</span>
                    </div>
                </div>
                <div class="right-btns">
                    <Button type="success" @click="goBack">返回</Button>
                </div>
            </div>
        </Card>
        <Card style="margin-top:30px;">
            <!-- 2021年之前的展示方式，包括串镜和屈光不正等 -->
            <div v-if="yearSemester < 20212">
                <Row style="margin-bottom:20px;">
                    <Col span="12" style="padding-top:5px;">
                        <div class="itemL">裸眼视力：</div>
                        <div class="labelV">左眼：{{studentInfo.visionVO.leftVision == null?"--":studentInfo.visionVO.leftVision}}</div>
                        <div class="labelV">右眼：{{studentInfo.visionVO.rightVision == null?"--":studentInfo.visionVO.rightVision}}</div>
                    </Col>
                    <Col span="12">
                        <div class="itemLabel">裸眼视力：</div>
                        <div>
                            <span style="margin-left:3px;">左眼：</span>
                            <Input
                                style="width:120px"
                                v-model="detailVisionDataOld.leftVision"
                                placeholder="请输入测量值"
                                :maxlength="11"
                            />
                            <span style="margin-left:10px;">右眼：</span>
                            <Input
                                style="width:120px"
                                v-model="detailVisionDataOld.rightVision"
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
                        <div class="itemL">串镜：</div>
                        <div class="labelV"
                        >左眼：{{this.catgoryMirror('L')}}</div>
                        <div class="labelV"
                        >右眼：{{this.catgoryMirror('R')}}</div>
                    </Col>
                    <Col span="12">
                        <div class="itemLabel">串镜：</div>
                        <div>
                            <span style="margin-left:3px;">左眼：</span>
                            <Select v-model="detailVisionDataOld.leftMirror" style="width:120px;" v-if="detailVisionDataOld.leftMirror !='0'">
                                <Option
                                    v-for="item in mirrorList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.name }}</Option>
                            </Select>
                            <span v-if="detailVisionDataOld.leftMirror =='0'" style="line-height:30px;">
                                <Input disabled style="width:120px" value="不需使用串镜检查" />
                            </span>
                            <span style="margin-left:10px;">右眼：</span>
                            <span v-if="detailVisionDataOld.rightMirror =='0'" style="line-height:30px;">
                                <Input style="width:120px" disabled value="不需使用串镜检查" />
                            </span>
                            <Select v-model="detailVisionDataOld.rightMirror" style="width:120px" v-if="detailVisionDataOld.rightMirror !='0'">
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
                        <div class="itemL">屈光不正：</div>
                        <div class="labelV">左眼：{{this.catgoryLight('L')}}</div>
                        <div class="labelV">右眼：{{this.catgoryLight('R')}}</div>
                    </Col>
                    <Col span="12">
                        <div class="itemLabel">屈光不正：</div>
                        <div>
                            <span style="margin-left:3px;">左眼：</span>
                            <Select :disabled="true" v-model="detailVisionDataOld.leftLight" style="width:120px">
                                <Option
                                    :disabled="true"
                                    v-for="item in lightList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.name }}</Option>
                            </Select>
                            <span style="margin-left:10px;">右眼：</span>
                            <Select :disabled="true" v-model="detailVisionDataOld.rightLight" style="width:120px;">
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
                        >左眼：{{studentInfo.visionVO.leftVision == null?"--":studentInfo.visionVO.leftVision}}</div>
                        <div
                            style="float:left;width:200px;"
                        >右眼：{{studentInfo.visionVO.rightVision == null?"--":studentInfo.visionVO.rightVision}}</div>
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
                            :disabled="!(studentInfo.visionHistory && studentInfo.visionHistory.length>0 )"
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
                        >左眼：{{studentInfo.visionVO.leftBall ? studentInfo.visionVO.leftBall : "--"}}</div>
                        <div
                            style="float:left;width:200px;"
                        >右眼：{{studentInfo.visionVO.rightBall ? studentInfo.visionVO.rightBall : "--"}}</div>
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
                        >左眼：{{studentInfo.visionVO.leftColumn ? studentInfo.visionVO.leftColumn : "--"}}</div>
                        <div
                            style="float:left;width:200px;"
                        >右眼：{{studentInfo.visionVO.rightColumn ? studentInfo.visionVO.rightColumn : "--"}}</div>
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
                        >左眼：{{studentInfo.visionVO.leftAxis ? studentInfo.visionVO.leftAxis : "--"}}</div>
                        <div
                            style="float:left;width:200px;"
                        >右眼：{{studentInfo.visionVO.rightAxis ? studentInfo.visionVO.rightAxis : "--"}}</div>
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
                        <div style="float:left;width:50px;">{{studentInfo.visionVO.glassesWearer == '1' ? '是' : studentInfo.visionVO.glassesWearer == '0' ?'否':'未测试'}}</div>
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
                    <Table border :columns="yearSemester < 20212 ? visionHistoryColumnsOld : visionHistoryColumns" :data="studentInfo.visionHistory"></Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script type="text/javascript">
import mixins from './studentVisionDetailTable'
import api from '@/api/visionTest/studentVisionManage/visionManage'
export default {
    name: "app",
    mixins: [ mixins ],
    data() {
        return {
            loadingInfo:false,
            studentId:'',
            schoolId: sessionStorage.getItem('schoolId'),
            yearSemester: '',
            studentInfo:null,
        }
    },
    methods: {
        //构建年级班级显示
        gradeClass(){
            const gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三']
            return `${gradeList[this.studentInfo.grade-1]}${this.studentInfo.studentClass}班`
        },
        //返回
        goBack(){
            this.$router.go(-1)
        },
        //查询指定学生的视力情况
        queryStudentVision(){
            const params = {
                studentId:this.studentId,
                schoolId:this.schoolId,
                yearSemester:this.yearSemester
            }
            api.queryStudentVision(params).then(res => {
                if(res.data.code === 10000) {
                    this.studentInfo = res.data.response
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //保存新版视力
        async newSaveStudentVision(edition) {
            let {leftVision, rightVision, leftBall, rightBall, leftColumn, rightColumn, leftAxis, rightAxis, glassesWearer} = this.detailVisionData
            let {visionId, teacherId} = this.studentInfo.visionVO
            rightVision =  edition === 'old' ? this.detailVisionDataOld.rightVision : rightVision;
            leftVision =  edition === 'old' ? this.detailVisionDataOld.leftVision : leftVision;
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
                "rightLight": edition === 'old' ? this.detailVisionDataOld.rightLight : '',
                "rightMirror": edition === 'old' ? this.detailVisionDataOld.rightMirror : '',
                "rightVision": edition === 'old' ? this.detailVisionDataOld.rightVision : rightVision,
                "leftLight": edition === 'old' ? this.detailVisionDataOld.leftLight : '',
                "leftMirror": edition === 'old' ? this.detailVisionDataOld.leftMirror : '',
                "leftVision": edition === 'old' ? this.detailVisionDataOld.leftVision : leftVision,
                "schoolId": this.schoolId,
                "studentId": this.studentId,
                "teacherId": teacherId,
                "visionId": visionId,
                "yearSemester": this.yearSemester
            }
            this.loadingInfo = true;
            let res = await api.querySchoolReportedStatus({dataType:3});
            if(res.data.code === 10000) {
                if(res.data.response.editStatus === '1'){// 可编辑
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
                            this.detailVisionDataOld.leftVision = ''
                            this.detailVisionDataOld.rightVision = ''
                            this.detailVisionDataOld.leftMirror = ''
                            this.detailVisionDataOld.rightMirror = ''
                            this.detailVisionDataOld.leftLight = ''
                            this.detailVisionDataOld.rightLight = ''
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
            }else{
                this.$Message.info(res.data.msg);
            }
        },
        //屈光不正构建函数
        catgoryLight(direction){
            let {leftLight, rightLight} = this.studentInfo.visionVO;
            let visionValue = direction === 'L' ? leftLight : rightLight, text = '';
            if (visionValue == '0') {
                text = '正常'
            } else if (visionValue == '1') {
                text = '近视'
            } else if (visionValue == '2') {
                text = '远视'
            } else if (visionValue == '3') {
                text = '其他'
            } else { 
                text = '--'
            }
            return text;
        },
        //串镜构建函数
        catgoryMirror(direction){
            let {leftMirror, rightMirror} = this.studentInfo.visionVO;
            let visionValue = direction === 'L' ? leftMirror : rightMirror, text = '';
            if (visionValue == '0') {
                text = '正常'
            } else if (visionValue == '1') {
                text = '正片上升、负片下降'
            } else if (visionValue == '-1') {
                text = '正片下降、负片上升'
            } else if (visionValue == '2') {
                text = '其他'
            } else if (visionValue == '9') {
                text = '未测试'
            }else { 
                text = '--'
            }
            return text;
        },
    },
    mounted() {
        let {studentId, yearSemester} = this.$route.query;
        this.studentId = studentId
        this.yearSemester = yearSemester || sessionStorage.getItem('yearSemester');
        this.queryStudentVision()
    },
    watch: {
        'detailVisionDataOld.rightVision': function() {
            if (
                this.detailVisionDataOld.rightVision >= 5.3 ||
                this.detailVisionDataOld.rightVision == null ||
                this.detailVisionDataOld.rightVision == ""
            ) {
                this.detailVisionDataOld.rightMirror = "0";
            } else {
                this.detailVisionDataOld.rightMirror = "1";
            }
        },
        'detailVisionDataOld.leftVision': function() {
            if (this.detailVisionDataOld.leftVision >= 5.3 || this.detailVisionDataOld.leftVision == null || this.detailVisionDataOld.leftVision == "") {
                this.detailVisionDataOld.leftMirror = "0";
            } else {
                this.detailVisionDataOld.leftMirror = "1";
            }
        },
        'detailVisionDataOld.rightMirror': function() {
            if (this.detailVisionDataOld.rightMirror == "0") {
                this.detailVisionDataOld.rightLight = "0";
            } else if (this.rightMirror == "1") {
                this.detailVisionDataOld.rightLight = "2";
            } else if (this.rightMirror == "-1") {
                this.detailVisionDataOld.rightLight = "1";
            } else if (this.rightMirror == "2") {
                this.detailVisionDataOld.rightLight = "3";
            } else {
                this.detailVisionDataOld.rightLight = "9";
            }
        },
        'detailVisionDataOld.leftMirror': function() {
            if (this.detailVisionDataOld.leftMirror == "0") {
                this.detailVisionDataOld.leftLight = "0";
            } else if (this.leftMirror == "1") {
                this.detailVisionDataOld.leftLight = "2";
            } else if (this.leftMirror == "-1") {
                this.detailVisionDataOld.leftLight = "1";
            } else if (this.leftMirror == "2") {
                this.detailVisionDataOld.leftLight = "3";
            } else {
                this.detailVisionDataOld.leftLight = "9";
            }
        }
  }
}
</script>
