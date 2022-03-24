<style scoped>
  .mar-r40{margin-right:40px;}
  .width120{width:120px;}
  @media screen and (max-width: 1650px) {
    .mar-r40{margin-right:15px;}
    .width120{width:100px;}
  }
</style>
<template>
    <div style="padding-left:10px;">
        <div>
            <h2 style="margin-top:15px;margin-bottom:13px;">学生成绩详情</h2>
        </div>
        <div>
            <div>
                <Card>
                    <Row>
                      <Col span="15">
                        <span>年级：</span>
                        <Select v-model="grade" class="width120">
                            <Option
                                    v-for="item in schoolGradeList"
                                    :value="item.grade"
                                    :key="item.grade"
                            >{{ item.label }}
                            </Option>
                        </Select>
                        <span style="margin-left:20px;">班级：</span>
                        <Select v-model="studentClass" class="width120">
                            <Option
                                    v-for="item in classList"
                                    :value="item.value"
                                    :key="item.value"
                            >{{ item.label }}
                            </Option>
                        </Select>
                        <span style="margin-left:20px;">性别：</span>
                        <Select v-model="gender" class="width120">
                            <Option
                                    v-for="item in genderType"
                                    :value="item.typeId"
                                    :key="item.typeId"
                            >{{ item.typeName }}
                            </Option>
                        </Select>
                        </Col>
                        <Col span="9">
                        <div>
                            <Button
                                    class="mar-r20"
                                    v-on:click="searchInfo()"
                                    type="success"
                            >查询
                            </Button>
                            <Button
                                    class="mar-r20"
                                    v-on:click="restore()"
                                    type="success"
                            >重置查询条件
                            </Button>
                            <Button
                  class="add-button"
                  v-on:click="pageToList"
                  type="success"
              >返回</Button>
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin-top:20px">
                        <span>姓名：</span>
                        <Input v-model="studentName" placeholder="学生姓名" class="width120"/>
                        <span style="margin-left:20px;">学籍号：</span>
                        <Input v-model="registerCode" placeholder="学生学籍号" class="width120"/>
                        <span style="margin-left:20px;">状态：</span>
                        <Select v-model="studentStatus" class="width120">
                            <Option
                                    v-for="item in studentStatusType"
                                    :value="item.typeId"
                                    :key="item.typeId"
                            >{{ item.typeName }}
                            </Option>
                        </Select>
                    </Row>
                </Card>
            </div>
            <Card style="margin-top:20px;">
                <div style="font-size:18px;height:40px;">
                    数据明细
                </div>
                <div>
                    <Row>
                        <div>
                            <Table border width="100%" max-height="570"  :columns="resultColumns" :data="resultData"></Table>
                        </div>
                        <br>
                        <div style="float: right;">
                            <Page
                                    :total="total"
                                    :current="pageNum"
                                    :page-size="pageSize"
                                    @on-change="pageNumChange"
                                    @on-page-size-change="pageSizechange"
                                    show-total
                                    show-sizer
                            ></Page>
                        </div>
                    </Row>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'teacherList',
        data () {
            return {
                yearSemester:'',
                schoolId: '',
                gender: '',
                registerCode: '',
                studentName: '',
                grade: '',
                schoolGradeList: [],
                studentClass: '',
                classList: [
                    {
                        value: 999,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '1班'
                    },
                    {
                        value: 2,
                        label: '2班'
                    },
                    {
                        value: 3,
                        label: '3班'
                    },
                    {
                        value: 4,
                        label: '4班'
                    },
                    {
                        value: 5,
                        label: '5班'
                    },
                    {
                        value: 6,
                        label: '6班'
                    },
                    {
                        value: 7,
                        label: '7班'
                    },
                    {
                        value: 8,
                        label: '8班'
                    },
                    {
                        value: 9,
                        label: '9班'
                    },
                    {
                        value: 10,
                        label: '10班'
                    },
                    {
                        value: 11,
                        label: '11班'
                    },
                    {
                        value: 12,
                        label: '12班'
                    },
                    {
                        value: 13,
                        label: '13班'
                    },
                    {
                        value: 14,
                        label: '14班'
                    },
                    {
                        value: 15,
                        label: '15班'
                    },
                    {
                        value: 16,
                        label: '16班'
                    },
                    {
                        value: 17,
                        label: '17班'
                    },
                    {
                        value: 18,
                        label: '18班'
                    },
                    {
                        value: 19,
                        label: '19班'
                    },
                    {
                        value: 20,
                        label: '20班'
                    },
                    {
                        value: 21,
                        label: '21班'
                    },
                    {
                        value: 22,
                        label: '22班'
                    },
                    {
                        value: 23,
                        label: '23班'
                    },
                    {
                        value: 24,
                        label: '24班'
                    },
                    {
                        value: 25,
                        label: '25班'
                    },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
                ],
                primaryList: [
                    {grade: 999, label: '全部'},
                    {grade: 1, label: '一年级'},
                    {grade: 2, label: '二年级'},
                    {grade: 3, label: '三年级'},
                    {grade: 4, label: '四年级'},
                    {grade: 5, label: '五年级'},
                    {grade: 6, label: '六年级'},
                ],
                middleList: [
                    {grade: 999, label: '全部'},
                    {grade: 7, label: '七年级'},
                    {grade: 8, label: '八年级'},
                    {grade: 9, label: '九年级'},
                ],
                genderType: [
                    {
                        typeId: '999',
                        typeName: '全部'
                    },
                    {
                        typeId: '1',
                        typeName: '男生'
                    },
                    {
                        typeId: '2',
                        typeName: '女生'
                    }
                ],
                first:[
                    {
                        title: '姓名',
                        key: 'studentName',
                        align: 'center',
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.gender == '1' ? '男' : '女')
                            ]);
                        }
                    },
                    {
                        title: '学籍号',
                        key: 'registerCode',
                        align: 'center',
                    },
                    {
                        title: '体质测试得分',
                        key: 'height',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.testExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(row.testOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.testScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '体质测试等级',
                        key: 'weight',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.testExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>良好</span>"
                                }else{
                                    text="<span>及格</span>"
                                }
                            }else{
                                if(row.testOver=="0"){
                                    text="<span>--</span>"
                                }else{
                                    let aa=row.testLevel=="1"?"优秀":row.testLevel=="2"?"良好":row.testLevel=="3"?"及格":row.testLevel=="4"?"不及格":"--"
                                    text="<span>"+aa+"</span>";
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '学习态度',
                        key: 'vitalCapacityValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.learnExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(row.learnScore==null){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.learnScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '健康教育知识',
                        key: 'runFiftyValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.healthExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(!row.healthOver==null || row.healthOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.healthScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '运动技能',
                        key: 'sitAndReachValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.actionExempt=="1"){
                                if(!row.actionOver || row.actionOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.actionScore/100).toFixed(2)+"(部分免试)</span>"
                                }
                            }else if(row.actionExempt=="2"){
                               if(!row.actionOver || row.actionOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.actionScore/100).toFixed(2)+"(免试)</span>"
                                }
                            }else{
                                if(!row.actionOver || row.actionOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.actionScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '体能',
                        key: 'oneMinuteSitUpValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.staminaExempt=="1"){
                                if(!row.staminaOver || row.staminaOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.staminaScore/100).toFixed(2)+"(部分免试)</span>"
                                }
                            }else if(row.staminaExempt=="2"){
                               if(!row.staminaOver || row.staminaOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.staminaScore/100).toFixed(2)+"(免试)</span>"
                                }
                            }else{
                                if(!row.staminaOver || row.staminaOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.staminaScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '课后作业',
                        key: 'oneMinuteSitUpValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.homeworkExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(row.homeworkScore ==null){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.homeworkScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '学科评价得分',
                        key: 'oneMinuteSitUpValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";

                                if(!row.subjectScore){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.subjectScore/100).toFixed(2)+"</span>"
                                }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '学科评价等级',
                        key: 'resultValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(!row.subjectScore){
                                    text="<span>--</span>"
                                }else{
                                    let aa=row.subjectLevel=="1"?"优秀":row.subjectLevel=="2"?"良好":row.subjectLevel=="3"?"及格":row.subjectLevel=="4"?"不及格":"--"
                                    text="<span>"+aa+"</span>";
                                }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '状态',
                        key: 'createTime',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.innerSchool=="1"){
                                text=row.finishStatus=="1"?"已完成":"未完成"
                            }else{
                                text="不在校"
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                ],
                second:[
                    {
                        title: '姓名',
                        key: 'studentName',
                        align: 'center',
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.gender == '1' ? '男' : '女')
                            ]);
                        }
                    },
                    {
                        title: '学籍号',
                        key: 'registerCode',
                        align: 'center',
                    },
                    {
                        title: '学习态度',
                        key: 'vitalCapacityValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.learnExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(row.learnScore ==null){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.learnScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '健康教育知识',
                        key: 'runFiftyValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.healthExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(!row.healthOver || row.healthOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.healthScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '运动技能',
                        key: 'sitAndReachValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.actionExempt=="1"){
                                if(!row.actionOver || row.actionOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.actionScore/100).toFixed(2)+"(部分免试)</span>"
                                }
                            }else if(row.actionExempt=="2"){
                               if(!row.actionOver || row.actionOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.actionScore/100).toFixed(2)+"(免试)</span>"
                                }
                            }else{
                                if(!row.actionOver || row.actionOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.actionScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '体能',
                        key: 'oneMinuteSitUpValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.staminaExempt=="1"){
                                if(!row.staminaOver || row.staminaOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.staminaScore/100).toFixed(2)+"(部分免试)</span>"
                                }
                            }else if(row.staminaExempt=="2"){
                               if(!row.staminaOver || row.staminaOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.staminaScore/100).toFixed(2)+"(免试)</span>"
                                }
                            }else{
                                if(!row.staminaOver || row.staminaOver=="0"){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.staminaScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '课后作业',
                        key: 'oneMinuteSitUpValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.homeworkExempt=="1"){
                                if(row.exemptType=="2"){
                                    text="<span>80(免试)</span>"
                                }else{
                                    text="<span>70(免试)</span>"
                                }
                            }else{
                                if(row.homeworkScore ==null ){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.homeworkScore/100).toFixed(2)+"</span>"
                                }
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '学科评价得分',
                        key: 'oneMinuteSitUpValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";

                                if(row.subjectScore ==null){
                                    text="<span style=''>未完成</span>"
                                }else{
                                    text="<span>"+(row.subjectScore/100).toFixed(2)+"</span>"
                                }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '学科评价等级',
                        key: 'resultValue',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.subjectScore ==null){
                                    text="<span>--</span>"
                                }else{
                                    let aa=row.subjectLevel=="1"?"优秀":row.subjectLevel=="2"?"良好":row.subjectLevel=="3"?"及格":row.subjectLevel=="4"?"不及格":"--"
                                    text="<span>"+aa+"</span>";
                                }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                    {
                        title: '状态',
                        key: 'createTime',
                        align: 'center',
                        render: (h, params) => {
                            let row=params.row;
                            let text="";
                            if(row.innerSchool=="1"){
                                text=row.finishStatus=="1"?"已完成":"未完成"
                            }else{
                                text="不在校"
                            }
                            return h('div', {
                                domProps: {
                                    innerHTML:  text
                                }
                            });
                        }
                    },
                ],
                resultColumns: [],
                resultData: [],
                studentStatus: '',
                studentStatusType: [
                    {
                        typeId: '999',
                        typeName: '全部'
                    },
                    {
                        typeId: '1',
                        typeName: '未完成'
                    },
                    {
                        typeId: '2',
                        typeName: '已完成'
                    },
                    {
                        typeId: '3',
                        typeName: '不在校'
                    },
                ],
                pageNum: 1,
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            pageToList() {
            //返回
            this.$router.go(-1)
            },
            restore () {
                var vm = this;
                    vm.grade = 999;
                vm.pageNum = 1;
                vm.pageSize = 10;
                vm.registerCode = '';
                vm.studentClass = 999;
                vm.gender = '';
                vm.studentName = '';
                vm.studentStatus = '999';
                vm.search(vm.yearSemester);
            },
            pageNumChange (value) {
                //页码改变方法处理
                if (this.pageNum != value) {
                    this.pageNum = value;
                    this.search(this.yearSemester);
                }
            },
            pageSizechange (value) {
                //页面大小改变方法处理
                if (this.pageSize != value) {
                    this.pageSize = value;
                    this.pageNum = 1;
                    this.search(this.yearSemester);
                }
            },

            searchInfo(){
                this.pageNum=1;
                this.search(this.yearSemester);
            },

            search (yearSemester) {
                var vm = this;
                sessionStorage.setItem('studentSubjectReportDetail-grade', vm.grade);
                sessionStorage.setItem('studentSubjectReportDetail-studentClass', vm.studentClass);
                sessionStorage.setItem('studentSubjectReportDetail-gender', vm.gender);
                sessionStorage.setItem('studentSubjectReportDetail-studentStatus', vm.studentStatus);
                sessionStorage.setItem('studentSubjectReportDetail-registerCode', vm.registerCode);
                sessionStorage.setItem('studentSubjectReportDetail-studentName', vm.studentName);
                sessionStorage.setItem('studentSubjectReportDetail-pageNum', vm.pageNum);
                sessionStorage.setItem('studentSubjectReportDetail-pageSize', vm.pageSize);
                vm.getEducationReportStudentDetailList(yearSemester);
                vm.countEducationReportStudentDetail(yearSemester);
            },
            // sessionStorage.getItem('educationReport-studentSubjectReportDetail-schoolId')
            getEducationReportStudentDetailList (yearSemester) {
                this.$axios
                    .get(
                        '/v1/dataReport/getEducationReportStudentDetailList?gender=' +
                        (this.gender=="999"?"":this.gender) +
                        '&registerCode=' +
                        this.registerCode +
                        '&studentStatus=' +
                       ( this.studentStatus=="999"?"":this.studentStatus) +
                        '&grade=' +
                        (this.grade=="999"?"":this.grade)+
                        '&pageNo=' +
                        this.pageNum +
                        '&pageSize=' +
                        this.pageSize +
                        '&studentClass=' +
                        (this.studentClass=="999"?"":this.studentClass) +
                        '&studentName=' +
                        this.studentName +
                        '&schoolId=' +
                        sessionStorage.getItem('educationReport-studentSubjectReportDetail-schoolId') +
                        '&yearSemester=' +
                        yearSemester
                    )
                    .then(res => {
                        if (res.data.code == 10000) {
                            this.resultData = res.data.response;
                        } else {
                            if (res.data.code > 39999) {
                                this.$Message.info(res.data.msg);
                            }
                        }
                    });
            },
            countEducationReportStudentDetail (yearSemester) {
                this.$axios
                    .get(
                        '/v1/dataReport/countEducationReportStudentDetail?gender=' +
                        (this.gender=="999"?"":this.gender) +
                        '&registerCode=' +
                        this.registerCode +
                        '&studentStatus=' +
                       ( this.studentStatus=="999"?"":this.studentStatus) +
                        '&grade=' +
                        (this.grade=="999"?"":this.grade)+
                        '&studentClass=' +
                        (this.studentClass=="999"?"":this.studentClass) +
                        '&studentName=' +
                        this.studentName +
                        '&schoolId=' +
                        sessionStorage.getItem('educationReport-studentSubjectReportDetail-schoolId') +
                         '&yearSemester=' +
                        yearSemester
                    )
                    .then(res => {
                        if (res.data.code == 10000) {
                            this.total = res.data.response;
                        } else {
                            if (res.data.code > 39999) {
                                this.$Message.info(res.data.msg);
                            }
                        }
                    });
            },
        },
        watch: {
            //   provinceId:'getCityList',
        },
        created () {
            //  this.getProvinceList();
        },
        mounted () {
            var vm = this;
            let schoolType = sessionStorage.getItem('educationReport-studentSubjectReportDetail-schoolType');
            let schoolDistrict = sessionStorage.getItem('schoolDistrict');

            let yearSemester=sessionStorage.getItem('educationReport-studentSubjectReportDetail-yearSemester');
            if( Number(sessionStorage.getItem('educationReport-studentSubjectReportDetail-yearSemester'))%2==1){
                vm.resultColumns=vm.second
            }else{
                vm.resultColumns=vm.first
            }

            if (schoolType) {
                if ('0' == schoolType) {
                    vm.schoolGradeList = vm.schoolGradeList
                        .concat(vm.primaryList)
                        .concat(vm.middleList)
                        .concat(vm.highList);
                }
                if ('2' == schoolType) {
                    vm.schoolGradeList = vm.primaryList;
                }
                if ('3' == schoolType) {
                    vm.schoolGradeList = vm.middleList;
                }
                if ('4' == schoolType) {
                    vm.schoolGradeList = vm.highList;
                }
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-grade')) {
                this.grade = Number(sessionStorage.getItem('studentSubjectReportDetail-grade'));
            } else {
                vm.grade = vm.schoolGradeList[0].grade;
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-studentClass')) {
                vm.studentClass = isNaN(Number(sessionStorage.getItem('studentSubjectReportDetail-studentClass')))?'':Number(sessionStorage.getItem('studentSubjectReportDetail-studentClass'));
            } else {
                vm.studentClass = vm.classList[0].value;
            }


            if (sessionStorage.getItem('studentSubjectReportDetail-gender')) {
                this.gender = sessionStorage.getItem('studentSubjectReportDetail-gender');
            }else{
                this.gender ="999"
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-studentStatus')) {
                this.studentStatus = sessionStorage.getItem('studentSubjectReportDetail-studentStatus');
            }else{
                this.studentStatus ="999"
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-registerCode')) {
                this.registerCode = sessionStorage.getItem('studentSubjectReportDetail-registerCode');
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-studentName')) {
                this.studentName = sessionStorage.getItem('studentSubjectReportDetail-studentName');
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-pageNum')) {
                this.pageNum = Number(sessionStorage.getItem('studentSubjectReportDetail-pageNum'));
            }

            if (sessionStorage.getItem('studentSubjectReportDetail-pageSize')) {
                this.pageSize = Number(sessionStorage.getItem('studentSubjectReportDetail-pageSize'));
            }

            this.schoolId = sessionStorage.getItem('educationReport-studentSubjectReportDetail-schoolId');
            this.search(sessionStorage.getItem('educationReport-studentSubjectReportDetail-yearSemester'));
        }
    };

</script>
