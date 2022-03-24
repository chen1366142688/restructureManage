<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生详情</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input" style="align-items: center">
                <div style="margin:5px 20px;">
                    <span style>姓名：{{studentName}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span >性别：{{gender}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span >学籍号：{{registerCode}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span >班级：{{className}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span >学期：{{title}}</span>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="pageToList">返回</Button>
            </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">
            运动技能得分：{{actionScore}}&nbsp;&nbsp;&nbsp;&nbsp;等级：{{actionLevel}}
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumns" :data="actionList">
                <template slot-scope="{ row, index }" slot="action">
                    <div v-for="(item,i) in row.examList" :key="i" :style="row.examList.length>1&&row.examList.length-1 != i ?{borderBottom:'1px #e8eaec solid'}:''" style="width:100%;height:30px;line-height:30px;" >
                            <Button type="success" size="small" :disabled="item.disabled"   @click="updateResult(row,i)">设为无效</Button> <Button type="success" size="small" :disabled="item.disabled"   @click="editResult(row,i)">编辑</Button>
                    </div>
                </template>
            </Table>
          </div>
        </Row>
     </Card>
     <br />
     <Card>
        <div style="font-size:18px;height:40px;">
            体能得分：{{staminaScore}}&nbsp;&nbsp;&nbsp;&nbsp;等级：{{staminaLevel}}
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumns" :data="staminaList">
                <template slot-scope="{ row, index }" slot="action">
                    <div v-for="(item,i) in row.examList" :key="i" :style="row.examList.length>1&&row.examList.length-1 != i ?{borderBottom:'1px #e8eaec solid'}:''" style="width:100%;height:30px;line-height:30px;" >
                            <Button type="success" size="small" :disabled="item.disabled"   @click="updateResult(row,i)">设为无效</Button> <Button type="success" size="small" :disabled="item.disabled"  @click="editResult(row,i)">编辑</Button>
                    </div>
                </template>
            </Table>
          </div>
        </Row>
     </Card>
     <Card  style="margin-top:20px;" :dis-hover="true">
      <Form :label-width="100" class="function">
        <FormItem label="学生签名：">
          <div style="width:351px;min-height:100px;display:flex;justify-content:center;align-items:center; border:1px solid #d3d3d3">
            <img v-if="pictureAddr" :src="pictureAddr" style="width: 100%;height:auto" />
            <span v-else>暂无学生签名数据</span>
          </div>
        </FormItem>
      </Form>
    </Card>
    </div>
    <Modal v-model="showModel11" title="修改成绩" >
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
          <div style="height:24px;width:18px;display: inline-table;background-color: #E9E9E9;margin-left:20px;" @click="chosse1(idindex,item.value)" class="fwdf" :id="'div1'+idindex" v-for="item,idindex in scoreList" :key="idindex">
             <p style="text-align:center">{{item.name}}</p>
          </div>
          <!-- <Tag type="border" color="default" v-for="item in scoreList">{{item.name}}</Tag> -->
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
          <div style="height:43px;width:89px;display: inline-table;background-color: #E9E9E9;margin-left:20px;margin-top:10px" @click="chosse(idindex,item.testScore)" class="jpdf" :id="'div'+idindex" v-for="item,idindex in scoreRemarkList" :key="idindex">
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
      <div slot="footer">
          <Button type="success"  @click="submit">提交</Button>
          <Button type="success" @click="cancle">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
        title:'',
        yearSemester:'',
        studentName:'',
        gender:'',
        registerCode:'',
        pictureAddr:'',//学生签名
        className:'',
        studentInfo:{},
        actionList:[],
        staminaList:[],
        actionScore:'',
        actionLevel:'',
        staminaScore:'',
        staminaLevel:'',
      loading: false,
      schoolId: "",
      schoolType: "",
      studentName: "",
      resultColumns: [
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
          title: "考核项目",
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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(!data.exemptType){
                          text+="<p>"+(showData?showData:"--")+"</p></div>"
                        }else{
                          text+="<p>免试</p></div>"
                        }
                      }else{
                          if( j+1==classTest.examList.length){
                          text+="<div style=';width:100%;height:30px;line-height:30px;' >"
                        }else{
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                          if(!data.exemptType){
                          text+="<p>未完成</p></div>"
                        }else{
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
          title: "基础得分",
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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
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
          title: "项目最终得分",
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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }
                        if(data.resultValue){
                           if(!data.exemptType){
                            text+="<p>"+(data.score!=null?data.score:"--")+"</p></div>"
                            }else{
                                if(data.exemptType=="1"){
                                    text+="<p>70</p></div>"
                                }else{
                                    text+="<p>80</p></div>"
                                }
                            }
                        }else{
                            if(!data.exemptType){
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
                        totalScore+=data.score*data.scorePercent/10000
                  }
                  text=totalScore>=90?"优秀":totalScore>=80?"良好":totalScore>=60?"及格":"不及格";
                  if(classTest.examList.length>1){
                      text=text+"("+totalScore+")"
                  }
              return h("div", {
                domProps: {
                    innerHTML: text
                }
              });
          }
        },
        {
          title: "录入时间",
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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }

                            text+="<p>"+(data.createTime?data.createTime:"")+"</p></div>"

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
                          text+="<div style=';width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"
                        }

                            text+="<p>"+(data.teacherName?data.teacherName:"")+"</p></div>"

                  }

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
        //                   text+="<div style='width:100%;border-bottom:1px #e8eaec solid;height:30px;line-height:30px;' >"+
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
      scoreList:[],
      scoreRemarkList:[],
      examUnit:'',
      examItemPercent:'',
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
      examItemExempt:'',
      examItemExemptType:'',
      examItemId: "",
      showModel11: false,
      gender1:'',
      gradeId:'',
      classId:'',
        studentId:'',
        maxStandardMan:{},//最优秀的规则
      minStandardMan:{},
      maxStandardWoMan:{},//最优秀的规则
      minStandardWoMan:{},
      disabled:true,
    };
  },
  methods: {
      pageToList() {
      this.$router.go(-1)
    },
    cancle(){
      this.showModel11=false
    },
    updateResult(item,index) {
      if(item.examList[index].examResultId == null){
        this.$Message.success('当前项目没有成绩！')
        return false;
      }
      let vm = this;
      this.$axios.get(`/v1/studentexam/updateStudentTestDetailInfo?examResultId=${item.examList[index].examResultId}`).then(res =>{
        if (res.data.code === 10000) {
          this.$Message.success('操作成功')
          vm.paramsCheck();
        }
      })
    },

    editResult(item,index){
        var vm=this;
        vm.examItemId=item.examList[index].examItemId
        console.log(item.examList[index])
        vm.resultData = [];
        vm.totalScore = "";
        vm.scoreLevel = "";
        vm.baseScore="";
        vm.score="";
        vm.testScore="";
        vm.teacherScore=""
        vm.scoreLevelNew="";
        vm.resultValue="";
        vm.resultValueShow=""

                vm.examItemName = item.examList[index].examItemName;
                vm.examItemExempt=item.examList[index].exemptStatus;
                vm.examItemExemptType=item.examList[index].exemptType;

      vm.getTestUpdateRule(vm.examItemId);
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
      // console.log(item)

      document.getElementById("div1"+idindex).style.background = "#00C693"
      for(var i=0;i<vm.scoreList.length;i++){
        if(i!=idindex){
          document.getElementById("div1"+i).style.background = "#E9E9E9"
        }
      };
      vm.score=item
      // console.log(vm.score)
    },
     getTestUpdateRule(examItemId) {
      var vm = this;
      vm.standardList=[]
      this.$axios
        .get(
          "/v1/studentexam/getTestUpdateRule?grade=" +
            vm.gradeId +
            "&gender=" +
            vm.gender +
            "&classId=" +
            vm.classId +
            "&schoolType=" +
            vm.schoolType +
            "&examItemId=" +
            examItemId
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
                if(vm.gender1==data.standardVOS[i].gender){
                  vm.standardList.push(data.standardVOS[i]);
                }
                if("1"== data.standardVOS[i].gender){
                  if(vm.maxStandardMan && vm.maxStandardMan.score){
                    if(vm.maxStandardMan.score<data.standardVOS[i].score){
                      vm.maxStandardMan=data.standardVOS[i]
                    }
                  }else{
                    vm.maxStandardMan=data.standardVOS[i]
                  }
                  if(vm.minStandardMan && vm.minStandardMan.score){
                    if(vm.minStandardMan.score>data.standardVOS[i].score){
                      vm.minStandardMan=data.standardVOS[i]
                    }
                  }else{
                    vm.minStandardMan=data.standardVOS[i]
                  }
                }else{
                  if(vm.maxStandardWoMan && vm.maxStandardWoMan.score){
                    if(vm.maxStandardWoMan.score<data.standardVOS[i].score){
                      vm.maxStandardWoMan=data.standardVOS[i]
                    }
                  }else{
                    vm.maxStandardWoMan=data.standardVOS[i]
                  }
                  if(vm.minStandardWoMan && vm.minStandardWoMan.score){
                    if(vm.minStandardWoMan.score>data.standardVOS[i].score){
                      vm.minStandardWoMan=data.standardVOS[i]
                    }
                  }else{
                    vm.minStandardWoMan=data.standardVOS[i]
                  }
                }
              }
            }
            vm.showModel11=true
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
        vm.$Message.info("录入成绩有误或尚未完成录入，请核对后提交");
        return false;
      }
      if(vm.resultValue==null || vm.resultValue == ""){
        this.$Message.info("请输入成绩！");
        return;
      }
      if(isNaN(vm.resultValue)){
        this.$Message.info("请输入正确的成绩!");
        return;
      }
      if(isNaN(vm.score)){
        this.$Message.info("请输入正确的成绩!");
        return;
      }
      if(vm.examItemType == 4 && vm.score == ''){
          this.$Message.info("请选择成绩!");
          return;
      }
      this.$axios
        .get(
          "/v1/actionStamina/saveTestResult?grade=" +
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
           (vm.examItemType==2?"":vm.teacherScore)+
           "&yearSemester=" +
            vm.yearSemester
        )
        .then(function(res) {
          if (res.data.code == 10000) {
            if (res.data.response.code == 1) {
              vm.$Message.info("操作成功！");
              vm.showModel11=false
              vm.paramsCheck();
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
    resultValueChange(){
      var vm=this;
      let type=vm.examItemType;
      let standList=vm.standardList;
      let examItemPercent=vm.examItemPercent;
      let scoreRemarkList=vm.scoreRemarkList;
      if(type=="2"){
        return;
      }
      // if(!vm.teacherScore || !vm.score){
      //   vm.score='';
      //   vm.scoreLevelNew="5";
      //   vm.baseScore='';
      // }
      console.log(type)
      if(type==1){
        vm.score="";
        vm.scoreLevelNew="";
        let numberResult=Number(vm.resultValue);
        if(vm.gender1=="1"){
          if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
              vm.score=vm.maxStandardMan.score
              vm.scoreLevelNew=vm.maxStandardMan.scoreLevel
          }
          if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
              vm.score=vm.minStandardMan.score
              vm.scoreLevelNew=vm.minStandardMan.scoreLevel
          }
        }else{
          if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
              vm.score=vm.maxStandardWoMan.score
              vm.scoreLevelNew=vm.maxStandardWoMan.scoreLevel
          }
          if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
              vm.score=vm.minStandardWoMan.score
              vm.scoreLevelNew=vm.minStandardWoMan.scoreLevel
          }
        }
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.score=standList[i].score;
            vm.scoreLevelNew=standList[i].scoreLevel;
          }
        }
      }else if(type==3){
        vm.baseScore="";
        vm.scoreLevelNew="";
        vm.score="";
        let numberResult=Number(vm.resultValue);
        if(vm.gender1=="1"){
          if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
              vm.baseScore=vm.maxStandardMan.score
          }
          if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
              vm.baseScore=vm.minStandardMan.score
          }
        }else{
          if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
              vm.scbaseScoreore=vm.maxStandardWoMan.score
          }
          if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
              vm.baseScore=vm.minStandardWoMan.score
          }
        }
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.baseScore=standList[i].score;
          }
        }
        if(vm.baseScore == "" || vm.baseScore==null){
          return
        }
        if(vm.teacherScore == "" || vm.teacherScore==null){
          return
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
        vm.scoreLevelNew="";

        let numberResult=Number(vm.resultValue);
        if(vm.gender1=="1"){
          if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
              vm.scoreLevelNew=vm.maxStandardMan.scoreLevel
          }
          if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
              vm.scoreLevelNew=vm.minStandardMan.scoreLevel
          }
        }else{
          if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
              vm.scoreLevelNew=vm.maxStandardWoMan.scoreLevel
          }
          if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
              vm.scoreLevelNew=vm.minStandardWoMan.scoreLevel
          }
        }
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
            // if(!vm.scoreLevelNew){
            //   vm.scoreLevelNew=4;
            // }
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
        // console.log(standList)
        vm.baseScore="";
        vm.score="";
        vm.scoreLevelNew="";
        let numberResult=Number(vm.resultValue);
        if(vm.gender1=="1"){
          if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
              vm.baseScore=vm.maxStandardMan.score
          }
          if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
              vm.baseScore=vm.minStandardMan.score
          }
        }else{
          if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
              vm.baseScore=vm.maxStandardWoMan.score
          }
          if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
              vm.baseScore=vm.minStandardWoMan.score
          }
        }

        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.baseScore=standList[i].score;
          }
        }
        if(vm.baseScore== null || vm.baseScore == ""){
          return
        }
        if(vm.teacherScore== null || vm.teacherScore == ""){
          return
        }
        let mScore=vm.baseScore*examItemPercent/100;
        console.log(mScore)
        console.log((vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100)
        vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
        console.log(vm.score)
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
        vm.gender=studentInfo.gender=="1"?"男":"女";
        vm.registerCode=studentInfo.registerCode;
        vm.pictureAddr = studentInfo.pictureAddr
        vm.className=(studentInfo.grade==1?"一年级":studentInfo.grade==2?"二年级":studentInfo.grade==3?"三年级":
                studentInfo.grade==4?"四年级":studentInfo.grade==5?"五年级":studentInfo.grade==6?"六年级":studentInfo.grade==7?"七年级":
                studentInfo.grade==8?"八年级":studentInfo.grade==9?"九年级":"")+studentInfo.studentClass+"班"
        console.log(studentInfo)
        vm.gender1=studentInfo.gender;
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
                      if(vm.disabled==true){
                        data.disabled=true
                      }
                      if(data.exemptStatus==1){
                        data.disabled=true
                        if(data.exemptType==1){
                          data.score=70
                        }else{
                          data.score=80
                        }
                      }
                      console.log(data.score)
                        totalScore+=data.score*(data.scorePercent?data.scorePercent:10000)/10000
                        console.log(totalScore)
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
                      if(vm.disabled==true){
                        data.disabled=true
                      }
                      if(data.exemptStatus==1){
                        data.disabled=true
                        if(data.exemptType==1){
                          data.score=70
                        }else{
                          data.score=80
                        }
                      }
                        totalScore+=data.score*(data.scorePercent?data.scorePercent:10000)/10000
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
            studentInfo.actionScore=(actionScore/vm.actionList.length).toFixed(2);
        }
        if(vm.staminaList && vm.staminaList.length>0){
            let staminaScore=0;
            for(let i=0;i<vm.staminaList.length;i++){
                let classTest=vm.staminaList[i];
                staminaScore+=classTest.totalScore;
            }
            studentInfo.staminaScore=(staminaScore/vm.staminaList.length).toFixed(2);
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
    querySchoolReportedStatus(){
      var vm = this;
      this.$axios
              .get("/v1/actionStamina/querySchoolReportedStatus?dataType=2&yearSemester="+vm.yearSemester)
              .then(function(response) {
                if(response.data.code==10000){
                    if(response.data.response.editStatus==1){
                        vm.disabled=false;
                    }
                }
                vm.paramsCheck();
              })
              .catch(function(response) {
                console.log(response);
              });
    },
    paramsCheck(){
        var vm=this;
        let schoolId = sessionStorage.getItem("schoolId");
        vm.schoolId = schoolId;
        let schoolType = sessionStorage.getItem("schoolType");
        vm.schoolType = schoolType;
        let yearSemester=Number(sessionStorage.getItem("actionStaminaStudentList-actionStaminaStudentDetail-yearSemester"));
        let studentInfo=JSON.parse(sessionStorage.getItem("actionStaminaStudentList-actionStaminaStudentDetail-studentInfo"));
        vm.yearSemester=yearSemester;
        if(vm.yearSemester%2==1){
            vm.title=(vm.yearSemester-9+"").substring(0,4)+"学年第二学期"
        }else{
            vm.title=(vm.yearSemester+"").substring(0,4)+"学年第一学期"
        }
        vm.getActionStaminaStudentInfo(studentInfo.studentId,yearSemester);
        console.log(vm.disabled)

        // vm.search();
    },
  },
  watch: {
    resultValueShow:function(){
      let vm = this;
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
      console.log(standList)
      if(vm.examItemType==2){
         vm.resultValue="";
         vm.score="";
        vm.scoreLevelNew="";
        let numberResult=Number(vm.teacherScore);
        if(vm.gender1=="1"){
          if(numberResult>Number(vm.maxStandardMan.scoringCriteriaEnd)){
              vm.resultValue=vm.teacherScore
              vm.score=vm.maxStandardMan.score
              vm.scoreLevelNew=vm.maxStandardMan.scoreLevel
          }
          if(numberResult<Number(vm.minStandardMan.scoringCriteriaStart)){
              vm.resultValue=vm.teacherScore
              vm.score=vm.minStandardMan.score
              vm.scoreLevelNew=vm.minStandardMan.scoreLevel
          }
        }else{
          if(numberResult>Number(vm.maxStandardWoMan.scoringCriteriaEnd)){
              vm.resultValue=vm.teacherScore
              vm.score=vm.maxStandardWoMan.score
              vm.scoreLevelNew=vm.maxStandardWoMan.scoreLevel
          }
          if(numberResult<Number(vm.minStandardWoMan.scoringCriteriaStart)){
              vm.resultValue=vm.teacherScore
              vm.score=vm.minStandardWoMan.score
              vm.scoreLevelNew=vm.minStandardWoMan.scoreLevel
          }
        }
        for(var i=0;i<standList.length;i++){
          if(Number(vm.teacherScore)>=Number(standList[i].scoringCriteriaStart) && Number(vm.teacherScore)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.resultValue=vm.teacherScore
            vm.score=standList[i].score;
            vm.scoreLevelNew=standList[i].scoreLevel;
          }
        }
      }else{
        vm.score="";
        vm.scoreLevelNew="";
        if(vm.baseScore== null || vm.baseScore == ""){
          return;
        }
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
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    vm.querySchoolReportedStatus();
  }
};
</script>
