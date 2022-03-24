<style scoped>
.width120 {
  width: 120px;
}

@media screen and (max-width: 1650px) {
  .width120 {
    width: 100px;
  }
}
</style>
<template>
<div style="padding-left:10px;">
  <div>
    <h2 style="margin-top:15px;margin-bottom:13px;">学生管理</h2>
  </div>
  <div>
    <Card>
      <div class="top-search" @keydown.enter="querySearch">
        <div class="left-input">
          <div style="margin:5px 20px;">
            <span>年<span style="visibility:hidden">空</span>级：</span>
            <Select v-model="grade" class="width120">
              <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>班<span style="visibility:hidden">空</span>级：</span>
            <Select v-model="studentClass" class="width120">
              <Option v-for="(item,index) in classList" :value="item.value" :key="item.value + index">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>姓<span style="visibility:hidden">空</span>名：</span>
            <Input v-model="studentName" placeholder="学生姓名" class="width120" />
          </div>
          <div style="margin:5px 20px;">
            <span>学籍号：</span>
            <Input v-model="registerCode" placeholder="学生学籍号" class="width120" />
          </div>
          <div style="margin:5px 20px;">
            <span>状<span style="visibility:hidden">空</span>态：</span>
            <Select v-model="transferStatus" class="width120">
              <Option v-for="item in transferList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>是否绑定家长：</span>
            <Select v-model="hasParent" class="width120">
              <Option v-for="item in hasParentList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="querySearch">查询</Button>
          <Button type="success" @click="restore">重置查询条件</Button>
          <Button type="success" @click="addStudent">新增学生</Button>
          <Button type="success" @click="inputStudent">学生信息导入</Button>
          <Button type="success" @click="inputNumberReplace">学生学籍号替换</Button>
          <Button type="success" @click="exportStudentQCPdf">导出学生二维码</Button>
          <Button type="success" @click="detectRegisterCodeRepeat">学籍号重复检测</Button>
        </div>
      </div>
    </Card>
    <br>
    <div>
      <Card>
        <div style="font-size:18px;height:40px;">
          数据明细
        </div>
        <Row>
          <div>
            <Table max-height="520" border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br>
          <div style="float: right;">
            <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
          </div>
        </Row>
      </Card>
    </div>
    <Modal v-model="modal1" title="提  醒" @on-cancel="blockCancel">
     <p>学生停用后，将不参与接下来所有学期的考核，但会保留其历史数据，是否确认停用？</p>
      <div slot="footer">
        <Button type="success" size="large" @click="blockStatus(nowStudentId,2)">{{blockUpName}}</Button>
        <Button type="success" size="large" @click="blockCancel">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal3" title="提  醒">
      <p style="color: red;font-size: 18px">该家长已经存在，姓名为{{oldName}}，是否更改姓名为{{patriarchNew.nickName}}？</p>
      <div slot="footer">
        <Button type="success" size="large" @click="changeName">更改</Button>
        <Button type="success" size="large" @click="notChangeName">延用原姓名</Button>
      </div>
    </Modal>
    <Modal v-model="modal4" title="提  醒" @on-ok="ok">
      <p style="color: red;font-size: 18px">是否确定删除该家长和学生的绑定关系？</p>
      <div slot="footer">
        <Button type="success" size="large" @click="modal4Fb">确定</Button>
        <Button type="success" size="large" @click="modal4FbN">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" title="家长信息" width="800px" @on-cancel="cancel">
      <Row v-for="(item,index) in patriarchList" style="margin-top: 10px;" :key="index">
        <Col span="6">
        <span style="margin-left: 10px;">家长姓名:</span>
        <Label style="margin-left: 5px;">{{item.nickName}}</Label>
        <!--            <Input-->
        <!--              v-model="item.nickName"-->
        <!--               :maxlength="5"-->
        <!--               placeholder="请输入姓名"-->
        <!--               style="width: 100px"-->
        <!--                />-->
        </col>
        <Col span="6">
        <span style="margin-left: 0px;">家长身份:</span>
        <Label style="margin-left: 5px;">{{item.relation}}</Label>
        </col>
        <Col span="7">
        <span style="margin-left: 0px;">电话号码:</span>
        <Label style="margin-left: 5px;">{{item.phoneNum}}</Label>
        </col>
        <Col span="3">
        <Button v-on:click="delPatriarch(index)" type="success" style="background-color:#00c693;margin-left: 15px;">删除</Button>
        </col>
      </Row>
      <Row v-if="addparentStates" style="margin-top: 10px;">
        <Col span="6">
        <span style="margin-left: 10px;">家长姓名:</span>
        <Input v-model="patriarchNew.nickName" :maxlength="5" placeholder="请输入姓名" style="width: 100px" />
        </col>
        <Col span="6">
        <span style="margin-left: 0px;">家长身份:</span>
        <Select v-model="patriarchNew.relation" class="width120">
          <Option v-for="(item,index) in relationList" :value="item.value" :key="item.value + index">{{ item.label }}</Option>
        </Select>
        </col>
        <Col span="7">
        <span style="margin-left: 0px;">电话号码:</span>
        <Input v-model="patriarchNew.phoneNum" placeholder="请输入电话号码" style="width: 150px" />
        </col>
        <Col span="3">
        <Button v-on:click="savePatriarch('')" type="success" style="background-color:#00c693;margin-left: 15px;">保存</Button>
        </col>
      </Row>
      <Row style="margin-top: 25px">
        <span v-if="patriarchList.length==0" style="margin-left:10px;margin-top: 25px">暂无家长数据</span>
        <Button v-on:click="addParent()" type="success" style="background-color:#00c693;margin-left: 15px;">新增家长</Button>
      </Row>
      <div slot="footer">
        <Button type="text" size="large" @click="submitFP">取消</Button>
      </div>
    </Modal>
    <Modal v-model="inputStudentModel" title="提  醒">
      <p>学校当前已经有学生数据，导入时您可需要覆盖当前学生，或在当前学生基础上添加。</p>
      <div slot="footer">
        <Button type="success" size="large" @click="coverStudent">覆盖所有学生</Button>
        <Button type="success" size="large" @click="addNewStudent">添加新学生</Button>
      </div>
    </Modal>
  </div>
  <item-modal :modal="modal" @cancel="onCancel" @save="emitWrap">
      <div v-if="remind.disable">
        {{remind.title}}
      </div>
      <Form
        v-if="!remind.disable"
        :model="formList"
      >
        <Form-item
          label="学籍号："
          prop="id"
        >
          <Input v-model="formList.registerCode" placeholder="请输入学生学籍号" style="width:60%;"></Input>
        </Form-item>
        <Form-item
          v-if="failDisable"
          label="年级："
          prop="id"
        >
          <Select v-model="formList.grade" disabled style="width:60%">
              <Option v-for="(item,index) in myGradeList" :value="item.grade" :key="index">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item
          v-if="failDisable"
          label="班级："
          prop="id"
        >
           <Select v-model="formList.classId" style="width:60%">
              <Option v-for="(item,index) in myClassList" :value="item.classId" :key="index">{{ `${item.studentClass}班` }}</Option>
          </Select>
        </Form-item>
      </Form>
    </item-modal>
</div>
</template>

<script>
import gradeData from '@/libs/grade'//年级
import classList from '@/libs/classList'//班级
import api from '@/api/baseApi'
import Util from '@/libs/util.js'
import failApi from '@/api/studentApi.js'
import itemModal from '@/components/Modal/index.vue'
export default {
  components:{
    itemModal
  },
  name: 'schoolList',
  data() {
    return {
      formList:{
        registerCode:'',
        grade:'',
        classId:'',
        studentId:'',
        status:1,
      },
      failDisable:false,//留级是否出现
      remind: {
        disable:true,
        title:'系统检测到该学生已经存在，且按时间推算，当前学期为八年级，是否继续添加该学生？'
      },
      modal: {
        visable: false,
        title: '提醒',
        affirmName:'删除',
        onclickName:'pageToList',
        cancelDsiable:true,
      },
      myGradeList:[],//单独需要的年级列表
      myClassList:[],//单独需要的班级
      studentMsg:{},//根据学籍号查出的学生信息
      hasParent:'',
      hasParentList:[
        {
          name:'全部',
          value:"999"
        },
        {
          name:'是',
          value:"1"
        },
        {
          name:'否',
          value:"2"
        },
      ],
      blockUpName:'停用',//停用启用状态按钮文字
      nowIndex: '',
      modal3: false,
      modal4: false,
      inputStudentModel:false,//昆明系统提示框
      oldName: '',
      patriarchNew: {
        nickName: '',
        relation: '',
        phoneNum: ''
      },
      relationList: [{
          value: '02',
          label: '母亲'
        },
        {
          value: '03',
          label: '父亲'
        },
        {
          value: '04',
          label: '祖父'
        },
        {
          value: '05',
          label: '祖母'
        },
        {
          value: '06',
          label: '外祖父'
        },
        {
          value: '07',
          label: '外祖母'
        }
      ],
      addparentStates: false,
      patriarchList: [],
      modal2: false,
      loading: false,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '',
      primaryList: [{
          grade: "",
          label: '全部'
        },
        {
          grade: 1,
          label: '一年级'
        },
        {
          grade: 2,
          label: '二年级'
        },
        {
          grade: 3,
          label: '三年级'
        },
        {
          grade: 4,
          label: '四年级'
        },
        {
          grade: 5,
          label: '五年级'
        },
        {
          grade: 6,
          label: '六年级'
        }
      ],
      middleList: [{
          grade: "",
          label: '全部'
        },
        {
          grade: 7,
          label: '七年级'
        },
        {
          grade: 8,
          label: '八年级'
        },
        {
          grade: 9,
          label: '九年级'
        }
      ],
      highList: [{
          grade: "",
          label: '全部'
        },
        {
          grade: 10,
          label: '高一'
        },
        {
          grade: 11,
          label: '高二'
        },
        {
          grade: 12,
          label: '高三'
        }
      ],
      collegeList: [{
          grade: "",
          label: '全部'
        },
        {
          grade: 13,
          label: '大一'
        },
        {
          grade: 14,
          label: '大二'
        },
        {
          grade: 15,
          label: '大三'
        },
        {
          grade: 16,
          label: '大四'
        }
      ],
      transferStatus: "9999",
      transferList: [{
          name: "全部",
          value: "9999"
        },
        {
          name: "正常",
          value: "0"
        },
        // {
        //   name:"已转学",
        //   value:"1"
        // },
        // {
        //   name:"非学籍",
        //   value:"2"
        // },
        {
          name: "已停用",
          value: "3"
        },
        {
          name: "留级",
          value: "4"
        },
      ],
      schoolGradeList: [],
      studentClass: '',
      classList: classList,
      registerCode: '',
      studentName: '',
      resultColumns: [],
      normal: [{
          title: '学生姓名',
          key: 'studentName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth: 100
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '年级',
          key: 'gradeName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.studentClass + '班'
            return h('div', text)
          }
        },
        {
          title: '状态',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "正常";
            if (row.transferSchoolStatus == '1') {
              text = "已转学";
            } else if (row.transferSchoolStatus == '2') {
              text = "非学籍";
            } else if (row.transferSchoolStatus == '3'|| row.transferSchoolStatus == '5') {
              text = "已停用";
            }else if (row.transferSchoolStatus == '4') {
              text = "留级";
            }
            return h('div', text)
          }
        },
        {
          title: '是否绑定家长',
          key: 'parentNum',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text =row.parentNum>0?"是":"否";
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(
                'Button', {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button', {
                  props: {
                    type: 'success',
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.blockMethod(params.row.transferSchoolStatus,params.row.studentId)
                    }
                  }
                },`${(params.row.transferSchoolStatus!='3'&&params.row.transferSchoolStatus!='5')?'停用':'启用'}`
              )
            ])
          }
        }
      ],
      collegeColumns: [{
          title: '学生姓名',
          key: 'studentName',
          align: 'center'
          //   minWidth: 250
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center'
          //   width: 150
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '学院',
          key: 'collegeName',
          align: 'center'
          //   width: 150
        },
        {
          title: '专业',
          key: 'majorName',
          align: 'center'
          //   width: 150
        },
        {
          title: '学级',
          key: 'startSchool',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.startSchool + '级'
            return h('div', text)
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.studentClass + '班'
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          //   width: 400,
          render: (h, params) => {
            return h('div', [
              h(
                'Button', {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      resultData: [],
      isCollege: false,
      college: '',
      collegesList: [],
      major: '',
      majorList: [],
      chooseCollege: true,
      collegeName: '',
      pageNo: 1,
      pageSize: 10,
      total: 0,
      nowStudentId: '',
      modal1: false,
      parentStatus: '',
      schoolDistrict:''//2000是昆明1000是成都
    }
  },
  methods: {
    // 检测学籍号号是否重复
    detectRegisterCodeRepeat() {
      this.$router.push({name: 'detectRegisterCodeRepeat'})
    },
    blockMethod(status,studnetId) {//停用启用方法
      if(status!='3'&&status!='5') {
        this.modal1 = true;
        this.nowStudentId = studnetId;
        this.blockUpName = '停用'
      }else {
        this.blockStatus(studnetId);
        this.blockUpName = '启用'
      }
    },
    async blockStatus(studnetId,status) { //停用启用状态切换
      let res = await failApi.updateStudentStatus({studentId:studnetId});
      console.log(res,'停用启用成功');
      if(res.data.code == 10000) {
        this.$Message.info('操作成功');
        this.modal1 = false;
        this.getStudentInfoList();
      }
    },
    blockCancel() {//取消
      this.modal1 = false;
    },
    onCancel() {//取消弹窗清除所有数据
      this.modal.visable = false;
      let inital = this.$options.data();
      this.formList = inital.formList;
      this.modal = inital.modal;
      this.remind = inital.remind;
      this.failDisable = false;
    },
    async queryClassList(gradeId,classId) {//查询班级列表
      let params = {
        grade:gradeId,
        schoolId:sessionStorage.getItem('schoolId'),
      };
      let res = await failApi.queryStudentClassByGrade(params);
      if(res.data.code == 10000) {
        this.myClassList = res.data.response;
        this.seleteActiveClass(this.myClassList,classId);
      }
    },
    seleteActiveClass(arr,classId) {//筛选留级是否有相同班级
      arr.forEach(element => {
        if(element.studentClass == classId) this.formList.classId = element.classId
      });
      if(!this.formList.classId) this.formList.classId = arr[0].classId;
    },
    deleteClick(data) {//删除学生方法
    },
    emitWrap(eventList) {//保存触发的方法
      let clilckList = {addMethod:'addMethod',movePage:'movePage',failMthod:'failMthod',onCancel:'onCancel',saveFail:'saveFail'};
      const d = this[clilckList[eventList.name]];
      d&&d(eventList.data);
    },
    async addMethod() {//弹窗新增回调函数
    let yearSemester = sessionStorage.getItem('yearSemester'); 
      if(!this.formList.registerCode) {
        this.$Message.error('请输入学生学籍号');
        return false;
      };
      let res =  await failApi.queryStudentInsertInfo({registerCode:this.formList.registerCode,yearSemester});
      if(res.data.code == 10000) {
        let data = res.data.response,studentCode = res.data.response.statusCode;
        this.studentMsg = data;
        if(studentCode == '3') this.movePage();
        if(studentCode == '0') {
          this.remind = {
            disable:true,
            title:'该学生已经存在，请验证后重新添加'
          };
          this.modal.cancelDsiable = false;
          this.modal.affirmName = '知道了'
          this.modal.onclickName = 'onCancel'
        }
        if(studentCode == '1') {
          this.modal.title="提醒"
          this.remind.disable = true;
          this.remind.title = `系统检测到该学生已经存在，且按时间推算，当前学期年级为${Util.NumberToChinese(Number(this.studentMsg.grade))}年级，是否继续添加该学生？`
          this.modal.affirmName = '继续添加'
          this.modal.onclickName = 'movePage'
        }
        if(studentCode == '2') {
          this.remind = {
            disable:true,
            title:'该学生已经毕业，是否留级？'
          };
          this.modal.affirmName = '留级'
          this.modal.onclickName = 'failMthod'
        }
      }
    },
    failMthod() {//留级回调函数
      this.remind = {
        disable:false,
        title:'该学生已经毕业，是否留级？'
      };
      this.failDisable = true;
      this.formList.grade = this.studentMsg.grade - 1;
      this.formList.studentId = this.studentMsg.studentId;
      this.queryClassList(this.formList.grade,this.studentMsg.studentClass);
      this.modal.onclickName = 'saveFail';
    },
    async saveFail() {//保存留级操作
      this.modal.loading = true;
      let res = await failApi.repeaterStudent(this.formList);
      if(res.data.code == 10000) {
        this.modal.loading = false;
        this.onCancel();
      }
      else this.$Message.error(res.data.msg);
    },
    movePage() { //跳转到新增页面
      sessionStorage.removeItem('studentInfoManage-studentInfoDetail-studentId')
      this.$router.push({
        name: 'studentInfoDetail',
        query:{
          registerCode:this.formList.registerCode,
          yearSemester:sessionStorage.getItem('yearSemester'),
          whetherData:this.studentMsg.studentId?true:false,
        }
      })
    },
    addStudent() {//新增学生
      this.modal.visable = true;
      this.modal.title="新增学生"
      this.modal.affirmName = '新增'
      this.remind.disable = false;
      this.modal.onclickName = 'addMethod'
    },
    successStudent() {//确认弹窗

    },
    cancelStudent() {//取消弹窗
      this.modal.visable = false;
    },
    goBack() {
      this.$router.go(-1)
    },
    cancel() {
      this.addparentStates = false;
    },
    modal4Fb() {
      var vm = this
      this.$axios
        .get('/v1/studentinfo/deleteChildAndParentInfo?patriarchChildrenId=' + this.patriarchList[vm.nowIndex].patriarchChildrenId)
        .then(res => {
          if (res.data.code == 10000) {
            this.modal4 = false;
            this.getChildAndParentInfo();
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    modal4FbN() {
      this.modal4 = false
    },
    delPatriarch(index) {
      this.nowIndex = index;
      this.modal4 = true;
    },
    changeName() {
      this.savePatriarch('1');
    },
    notChangeName() {
      this.savePatriarch('2');

    },
    savePatriarch(parentStatus) {
      var vm = this
      if (!vm.patriarchNew.nickName) {
        vm.$Message.info("请输入家长姓名！")
        return;
      }
      if (!vm.patriarchNew.relation) {
        vm.$Message.info("请选择家长身份")
        return;
      }
      if (!vm.patriarchNew.phoneNum) {
        vm.$Message.info("请输入家长电话！")
        return;
      }

      let data = {
        schoolId: vm.schoolId,
        studentId: vm.nowStudentId,
        nickName: vm.patriarchNew.nickName,
        relation: vm.patriarchNew.relation,
        phoneNum: vm.patriarchNew.phoneNum,
        parentStatus: parentStatus
      }

      this.$axios.post('/v1/studentinfo/saveChildAndParentInfo', data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          if (res.data.response.code == '50003') {
            vm.oldName = res.data.response.msg;
            vm.modal3 = true;
          } else {
            vm.patriarchNew = {};
            this.addparentStates = false
            this.getChildAndParentInfo();
            vm.modal3 = false;
          }

        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    submitFP() {
      this.modal2 = false;
      this.addparentStates = false;
    },
    addParent() {
      this.addparentStates = true;
    },
    getChildAndParentInfo() {
      var vm = this
      this.$axios
        .get('/v1/studentinfo/getChildAndParentInfo?studentId=' + this.nowStudentId)
        .then(res => {
          if (res.data.code == 10000) {
            this.patriarchList = res.data.response
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    ok() {
      this.deleteStudent(this.nowStudentId);
    },
    async getStudentInfoList(schoolId) {
      var vm = this
      vm.loading = true;
      let data = {
        grade: vm.grade === '9999' ? '' : vm.grade,
        pageNo: vm.pageNo,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass === '9999' ? '' : vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        transferSchoolStatus: vm.transferStatus == '9999'?'':vm.transferStatus,
        hasParent:vm.hasParent=="999"?"":vm.hasParent
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: data});
      const result = await api.getStudentInfoList(data)
      if (result.data.code === 10000) {
        vm.loading = false
        vm.resultData = result.data.response
      } else {
        if (result.data.code > 39999) {
          vm.$Message.info(result.data.msg)
        }
      }
    },
    inputStudent(){
      this.$router.push({ name: 'exportTaskManage', query: {
          taskType: '1',
          yearSemester: ''
      }})
    },
    //覆盖所有学生
    coverStudent(){
      this.$router.push({ name: 'exportTaskManage', query: {
          taskType: '',
          yearSemester: ''
      }})
    },
    //添加新学生
    addNewStudent(){
      this.$router.push({ name: 'exportTaskManage', query: {
          taskType: '',
          yearSemester: ''
      }})
    },
    inputNumberReplace(){
      sessionStorage.setItem('studentInfoManage-exportTaskReplaceManage-taskType',"1")
      this.$router.push({ name: 'exportTaskReplaceManage' })
    },
    exportStudentQCPdf(){
      var vm = this;
      let data={
        grade: vm.grade=="9999"?"":vm.grade,
        registerCode: vm.registerCode,
        studentClass: vm.studentClass=="9999"?"":vm.studentClass,
        studentName: vm.studentName,
        transferSchoolStatus: vm.transferStatus == '9999' ? '' :vm.transferStatus,
        hasParent:vm.hasParent=="999"?"":vm.hasParent
      }
      let url =this.$axios.defaults.baseURL +"/v1/studentinfo/exportStudentQCPdf?"
                +"grade=" +data.grade 
                +"&registerCode=" +data.registerCode 
                +"&studentClass=" +data.studentClass 
                +"&studentName=" +data.studentName 
                +"&transferSchoolStatus=" +data.transferSchoolStatus 
                +"&hasParent=" +data.hasParent 
                +"&token=" +sessionStorage.getItem("token");
      window.open(url);
    },
    querySearch(){
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this
      let schoolId = vm.schoolId
      vm.getStudentInfoList(schoolId)
      vm.countStudentList(schoolId)
    },
    restore() {
      var vm = this
      vm.grade = ''
      vm.pageNo = 1
      vm.pageSize = 10
      vm.registerCode = ''
      vm.studentClass = ''
      vm.studentName = ''
      vm.college = ''
      vm.major = ''
      vm.transferStatus='9999'
      vm.hasParent = ''

      let schoolId = vm.schoolId
      vm.getStudentInfoList(schoolId)
      vm.countStudentList(schoolId)
    },

    countStudentList(schoolId) {
      var vm = this
      let data = {
        grade: vm.grade=="9999"?"":vm.grade,
        pageNo: vm.pageNo,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass=="9999"?"":vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        transferSchoolStatus: vm.transferStatus == '9999' ? '' :vm.transferStatus,
         hasParent:vm.hasParent=="999"?"":vm.hasParent
      }
      this.$axios.post('/v1/studentinfo/countStudentList', data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(studentId) {
      var vm = this
      sessionStorage.setItem(
        'studentInfoManage-studentInfoDetail-studentId',
        studentId
      )
      this.$router.push({
        name: 'studentInfoDetail',
        query:{
          modification:true,
          registerCode:this.formList.registerCode,
          yearSemester:sessionStorage.getItem('yearSemester'),
          whetherData:this.studentMsg.studentId?true:false,
        }
      })
    },
    deleteStudent() {
      var vm = this
      this.$axios
        .get('/v1/studentinfo/deleteStudentByStudentId?studentId=' + this.nowStudentId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.$Message.info(res.data.msg);
            vm.querySearch();
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getSchoolData(schoolId) {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios
        .get('/v1/school/getSchoolDetail?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            console.log(res)
            let data = res.data.response
            this.schoolData = data
            this.schoolName = data.name
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg)
            }
          }
        })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNo = 1;
        this.search()
      }
    },

    getSchoolCollegeBySchoolId(schoolId) {
      var vm = this
      this.$axios
        .get('/v1/student/getSchoolCollegeBySchoolId?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.collegesList = res.data.response
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getSchoolMajorBySchoolId(schoolId, collegeCode) {
      var vm = this
      this.$axios
        .get(
          '/v1/student/getSchoolMajorBySchoolId?schoolId=' +
          schoolId +
          '&collegeCode=' +
          collegeCode
        )
        .then(res => {
          if (res.data.code == 10000) {
            vm.majorList = res.data.response
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg)
            }
          }
        })
    },

  },
  watch: {
    college: function () {
      var vm = this
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college)
    },
  },
  created() {
    let params = Util.hasParams(this.$store, this.$route);
    if (params) {
        this.grade =  params.grade || '9999'
        this.pageNo = params.pageNo
        this.pageSize = params.pageSize
        this.registerCode = params.registerCode
        this.schoolId = params.schoolId,
        this.studentClass = params.studentClass || '9999'
        this.studentName = params.studentName
        this.collegeCode = params.college
        this.majorCode = params.major
        this.transferSchoolStatus = params.transferStatus
        this.hasParent = params.hasParent || "999"
    }
  },
  mounted() {
    this.myGradeList = gradeData.inOf(sessionStorage.getItem('schoolType'));
    const vm = this
    vm.schoolId = sessionStorage.getItem('schoolId')
    vm.schoolDistrict = sessionStorage.getItem('schoolDistrict')
    vm.schoolType = sessionStorage.getItem('schoolType')
    if (vm.schoolType) {
      vm.schoolGradeList = gradeData.inOf(vm.schoolType)
      vm.resultColumns = vm.normal
      vm.grade = vm.$route.query.grade ? Number(vm.$route.query.grade) : '9999'
      vm.studentClass = vm.$route.query.studentClass ? Number(vm.$route.query.studentClass) : '9999'
      if ('5' == vm.schoolType) {
        vm.isCollege = true
        vm.resultColumns = vm.collegeColumns
        var date = new Date;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        vm.collegeList = [{
            grade: 13,
            label: (month > 9 ? year : year - 1) + '级'
          },
          {
            grade: 14,
            label: (month > 9 ? year - 1 : year - 2) + '级'
          },
          {
            grade: 15,
            label: (month > 9 ? year - 2 : year - 3) + '级'
          },
          {
            grade: 16,
            label: (month > 9 ? year - 3 : year - 4) + '级'
          }
        ]
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.collegeList)
        vm.getSchoolCollegeBySchoolId(vm.schoolId)
      }
    }
    vm.search()
  }
}
</script>
