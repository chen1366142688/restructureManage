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
                            <div style="margin:5px 20px;">
                                <span>年<span style="visibility:hidden">空空</span>级：</span>
                                <Select disabled   v-model="FormData.grade" style="width:120px" @on-change="selectClass">
                                  <Option
                                    v-for="(item,i) in schoolGradeLs"
                                    :value="item.grade"
                                    :key="item.grade+i"
                                  >{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div style="margin:5px 20px;">
                                <span>班<span style="visibility:hidden">空空</span>级：</span>
                                <Select v-model="FormData.studentClass" style="width:120px">
                                  <Option
                                    v-for="(item,index) in classAll"
                                    :value="item.value"
                                    :key="item.value+index"
                                  >{{ item.label }}</Option>
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
import api from '@/api/studentApi.js'
import allClass from '@/libs/classList.js'
import gradeData from '@/libs/grade'
export default {
    props: ['addChildDisable','middleItemId','schoolGradeList','gradeId'],
    data() {
        return {
          schoolGradeLs:[],
            classAll:[],
            loading: false,
            changeLoading: false,
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
                      return h('div',`${row.gradeName}${row.studentClass?row.studentClass +'班':''}`)
                    }
                },
            ],
            resultData:[
            ],
            addDisable: this.addChildDisable,
            studentIdALL:[],
            FormData: {
                studentName:'',
                registerCode: '',
                studentClass:'',
                grade:this.gradeId,
            }
        }
    },
    mounted() {
      let schoolType = sessionStorage.getItem('schoolType');
      this.schoolGradeLs = gradeData.inOf(schoolType);
      this.selectClass(this.gradeId);
    },
    methods: {
      //查询学生列表
        queryStudentList() {
          const data = this.FormData;
          const {studentClass, grade} = this.FormData;
          const params = {
              middleItemId:this.middleItemId,
              ...data,
              studentClass:studentClass,
              grade:grade == '9999'?'':grade

          };
          api.studentInfo(params).then((res)=>{
              const { response } = res.data;
              this.resultData = response;
          })
        },
        filterData(arr) { // 筛选已选学生
            let arrList = arr.map((item)=>{
                return item.studentId
            })
            return arrList;
        },
        querySearch() { //搜索查询
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
        async update(data) {
          await api.addStudent(data).then((res)=>{
            this.$emit('addAccomplish',false)
            this.$Message.info(res.data.response.msg);
            this.changeLoading = false
          })
        },
        async changeGroup() { //提交
            this.changeLoading = true
            const params = {
                grade:this.FormData.grade,
                middleItemId: this.middleItemId,
                students: this.studentIdALL
            };
            if(this.studentIdALL.length) {
              await this.update(params);
              this.$emit('update:addChildDisable',false);
            }else {
             this.changeLoading = false
              this.$Message.error('请选择学生添加')
            }
        },
        selectClass(val) { //筛选班级
            var vm = this;
            this.$axios
                .get('/v1/middleManage/queryGradeClass?gradeId='+ val)
                .then(res => {
                    let list = [];
                    for(let i =0;i < res.data.response.length; i++){
                        let newClass = {label:`${res.data.response[i].studentClass}班`,value:res.data.response[i].studentClass};
                        list.push(newClass);
                    }
                    vm.classAll = list;
                    vm.FormData.studentClass = vm.classAll[0].value;
                    this.queryStudentList();
                })
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