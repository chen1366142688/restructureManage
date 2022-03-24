<template>
    <div>
        <Modal
            width="1300"
            v-model="addDisable"
            title="添加学生"
            @on-cancel="cancle"
        >
            <div style="padding:4px 0 20px 0">
              <div class="top-search addClass" @keydown.enter="querySearch">
                        <div class="left-input" id="add-input-left">
                            <div style="margin:5px 20px;">
                                <span>学生姓名：</span>
                                <Input v-model="FormData.studentName" placeholder="学生姓名" style="width:120px;"></Input>
                            </div>
                            <div style="margin:5px 20px;">
                                <span>学籍号：</span>
                                <Input v-model="FormData.registerCode" placeholder="学籍号" style="width:120px;"></Input>
                            </div>
                            <div style="margin:5px 20px;" v-if="!disabled">
                                <span>年<span style="visibility:hidden">空空</span>级：</span>
                                <Select v-model="FormData.grade" :disabled="disabled" style="width:120px" @on-change="selectClass">
                                  <Option
                                    v-for="(item,index) in gradeList"
                                    :value="item.value"
                                    :key="item.value+index"
                                  >{{ item.name }}</Option>
                                </Select>
                            </div>
                            <div style="margin:5px 20px;">
                                <span>班<span style="visibility:hidden">空空</span>级：</span>
                                <Select v-model="FormData.classId" style="width:120px">
                                  <Option
                                    v-for="(item,index) in classList"
                                    :value="item.value"
                                    :key="item.value+index"
                                  >{{ item.name }}</Option>
                                </Select>
                            </div>
                        </div>
                        <div  class="right-btns addClass">
                            <Button type="success" @click="querySearch">查询</Button>
                        </div>
                    </div>
            </div>
            <div>
                <Row>
                    <div>
                        <Table
                            border
                            :loading="loading"
                           max-height="500"
                            @on-selection-change="selectionChange"
                            :columns="resultColumns"
                            :data="resultData"
                        ></Table>
                    </div>
                    <br />
                    <div style="float: right;">
                        <Page
                        :total="FormData.total"
                        :current="FormData.pageNo"
                        :page-size="FormData.pageSize"
                        @on-change="pageNumChange"
                        @on-page-size-change="pageSizechange"
                        show-total
                        show-sizer
                        ></Page>
                    </div>
                </Row>  
            </div>
            <div slot="footer" class="footer">
              <Button type="success"   :loading="changeLoading" @click="changeGroup">添加</Button>
              <Button type="success"  @click="cancle" >取消</Button> 
            </div>
        </Modal>
    </div>
</template>
<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
import allClass from '@/libs/classList.js'
import gradeData from '@/libs/grade'
export default {
    props: ['addChildDisable','middleItemId','schoolGradeList','gradeId','activityId','disabled'],
    data() {
        return {
          schoolGradeLs:[],
            classAll:[],
            loading: false,
            changeLoading: false,
            gradeList:[],//年级
            gradeOldList:[],//旧的数据
            resultColumns: [
                {
                    type: 'selection',
                    title: '全部',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'studentName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '性别',
                    key: 'gender',
                    align: 'center',
                    minWidth: 100,
                    render:(h,params) => {
                      const  { row } = params;
                      let text = row.gender == '1'? '男':(row.gender == '2'?'女':'--');
                        return h( 'div', text)
                    }
                },
                {
                    title: '学籍号',
                    key: 'registerCode',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '班级',
                    key: 'className',
                    align: 'center',
                    minWidth: 100,
                    render: (h,params) => {
                      const {row} = params;
                      return h('div',`${this.transitionCn(row.grade)}年级${row.studentClass?row.studentClass +'班':''}`)
                    }
                },
            ],
            resultData:[
            ],
            classList:[{name:'全部班级',value:'9999'}],
            // addDisable: this.addChildDisable,
            studentIdALL:[],
            FormData: {
                pageNo:1,
                pageSize:10,
                total:0,
                studentName:'',
                registerCode: '',
                classId:'9999',
                grade:this.gradeId,
                activityId:this.$route.query.activityId,
                classTestId:this.$route.query.classTestId
            }
        }
    },
    computed: {
      addDisable() {
        return this.addChildDisable;
      }
    },
    created() {
      this.queryStudentList();
      this.queryGradeList();
    },
    methods: {
      transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
      async queryGradeList() {//查询学校所有年级
      let res = await api.queryActivityGradeClass({activityId:this.$route.query.activityId});
      if(res.data.code == 10000) {
        let resData = res.data.response,newGrade;
        this.gradeOldList = resData;
        newGrade = resData.map((item)=>{
          return {
            name:`${this.transitionCn(item.grade)}年级`,
            value:item.grade,
          }
        });
        newGrade.unshift({
          name:'全部年级',  
          value:'9999'
        })
        this.gradeList = newGrade;
        if(!this.disabled) this.FormData.grade = newGrade[0].value;
        this.selectClass(this.FormData.grade);
        this.queryStudentList();
      }
    },
      selectClass(val) { //筛选班级
        let list = [],gradeList = this.gradeOldList;
        gradeList.forEach(element => {
          if(element.grade == val) {
            let newClass = element.classVOS.map((child) => {
              return {name:`${child.studentClass}班`,value:child.classId}
            });
            list = newClass
          }
        });
        list.unshift({name:'全部班级',value:'9999'});
        this.classList = list;
        this.FormData.classId = this.classList[0].value;
      },
      pageNumChange(val) {
        this.FormData.pageNo = val;
        this.queryStudentList();
      },
      pageSizechange(val) {
        this.FormData.pageSize = val;
        this.FormData.pageNo = 1;
        this.queryStudentList();
      },
      //查询学生列表
        async queryStudentList() {
          const data = this.FormData;
          const {classId, grade} = this.FormData;
          const params = {
              ...data,
              classId:classId == '9999'?'':classId,
              grade:grade == '9999'?'':grade

          };
          let res = await api.getExamItemActivityAddStudent(params);
          if(res.data.code == 10000) {
            this.resultData = res.data.response.result;
            this.FormData.total = res.data.response.total;
          }
        },
        filterData(arr) { // 筛选已选学生
            let arrList = arr.map((item)=>{
                return item.studentId
            })
            return arrList;
        },
        querySearch() { //搜索查询
        this.FormData.pageNo = 1;
          this.queryStudentList();
        },
        selectionChange(data) { //列表已选项
            this.studentIdALL = this.filterData(data)
        },
        cancle() { //取消
             this.driverModal = false;
              this.$emit('update:addChildDisable',false);
              // this.$emit('addAccomplish',false)
        },
        //添加学生
        // async update(data) {
        //   await api.getExamItemActivityStudent(data).then((res)=>{
        //     this.$emit('addAccomplish',false)
        //     this.$Message.info(res.data.response.msg);
        //   })
        // },
        async changeGroup() { //提交
            const params = {
                activityId:Number(this.FormData.activityId),
                classTestId: this.FormData.classTestId ,
                studentIds: this.studentIdALL
            };
            if(this.studentIdALL.length) {
              let res = await api.insertActivityStudent(params);
              if(res.data.code == 10000) {
                this.$emit('updataData');
                this.$emit('update:addChildDisable',false);
              }else {
                this.$Message.error(res.data.msg)
              }
            }else {
              this.$Message.error('请选择学生添加')
            }
        }

    }
}
</script>
<style lang="less" scoped>
  .footer{
    display:flex;
    justify-content:center;
    button{
      width:90px;
      height:33px;
      margin-right: 50px;
    }
  }
  #add-input-left{
    width:90%;
  }
</style>