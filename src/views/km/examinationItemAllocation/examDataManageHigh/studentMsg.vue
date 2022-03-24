<template>
  <div class="student-msg">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{titleMsg.studentName}}</h2>
    </div>
    <div style="margin-top:10px">
      <Card>
        <div class="basics-msg">
          <span>性别：{{titleMsg.gender == '1'?'男':'女'}}</span>
          <span>学号：{{titleMsg.registerCode}}</span>
          <span>班级：{{titleMsg.gradeName}}{{titleMsg.studentClass?`${titleMsg.studentClass}班`: ''}}</span>
          <span>基础体能得分：{{titleMsg.physicalScore}}分</span>
          <span>专项技能得分：{{titleMsg.skillScore}}分</span>
          <Button @click="goBack" type="success">返回</Button>
        </div>
      </Card>
    </div>
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">考核详情</h2>
    </div>
    <div>
      <Card>
        <div class="assessTitle flex"
             style="font-size: 18px;font-weight: bold;"><span style="padding-right:10px;">基础体能</span><span v-if="!calculateBacise">总得分：{{titleMsg.physicalScore}}分</span></div>
        <div v-for="(item,index) in titleMsg.physicalDetailVOS"
             :key='index+item.maxAchievementValue'>
          <title-msg :titleMsg="item"
                     :testStatus='titleMsg.testStatus'></title-msg>
          <project-table v-if='titleMsg.physicalDetailVOS.length' :table="item.physicalScoreVOS" :changeReportDisable.sync="changeReportDisable" :submitObj.sync="submitObj" :scoringMethod="item.scoringMethod" :smallCode="item.smallCode"></project-table>
        </div>
      </Card>
    </div>
    <div style="margin-top:16px;">
      <Card>
        <div class="assessTitle flex"
             style="font-size: 18px;font-weight: bold;"><span style="padding-right:10px">专项技能</span><span v-if="!calculateSpecial">总得分：{{titleMsg.skillScore}}分</span></div>
        <div v-for="(itemSkill,SkillIndex) in titleMsg.skillDetailVOS"
             :key='SkillIndex'>
          <div class="flex"
               style="margin-top:15px">
            <span v-if="itemSkill.skillVOS.length "
                  style="padding-right:5px">{{itemSkill.middleItemName}}</span>
            <div class="exam-status">{{itemSkill.testType == 1?'选考':'必考'}}</div>
            <p v-if="itemSkill.skillVOS.length ">项目最终得分：{{itemSkill.maxScore|| 0}}分</p>
            <p v-if="itemSkill.skillVOS.length <= 0 && testStatus == 1">免考</p>
          </div>
          <div v-for="(child,childIndex) in itemSkill.skillVOS"
               :key="childIndex"
               style="width:100%;margin-top:20px;">
            <Table border
                   max-height="650"
                   :loading="loading"
                   :columns="resultColumns"
                   :data="child"></Table>
          </div>
        </div>
      </Card>
    </div>
    <Modal v-model="changeReportDisable"
            width="560"
            @on-cancel="cancel"
            @on-ok="dateScore"
            ok-text="保存"
           title="修改成绩">
      <div class="driver-project">
        
          <my-radio v-if="submitObj.scoringMethod == '2'" :arrData="submitObj.smallScoreVOS" :scoreValue="submitObj.score" @changeScore="changeScore">

          </my-radio>
        <div class="project_content" v-if="submitObj.scoringMethod == '1'">
          <span style="margin-right:21px">成绩({{submitObj.unit == '分.秒'?'秒':submitObj.unit}}):</span>
          <Input type="number" @on-change="coreInput" v-model="submitObj.achievementValue" placeholder="输入成绩" style="width:120px"></Input>
          <span style="margin-left:41px">得分：<span style="color:#00C693;font-size:24px">{{submitObj.score}}</span></span>
        </div>
      </div>

    </Modal>
  </div>
</template>
<script>
import TitleMsg from '@/views/km/examinationItemAllocation/examDataManageHigh/components/title.vue'
import ProjectTable from '@/views/km/examinationItemAllocation/examDataManageHigh/components/projectTable.vue'
import SpecialsTable from '@/views/km/examinationItemAllocation/examDataManageHigh/components/specialsTable.vue'
import myRadio from './components/myRadio.vue'
import api from '@/api/studentApi.js';
import comon from './components/comon.js'
export default {
  minxs: [comon],
  components: {
    TitleMsg,
    ProjectTable,
    SpecialsTable,
    myRadio,
  },
  data () {
    return {
      specialDisable:false,//专项体能是否考完
      basicsDisable:false,//基础技能是否考完
      submitObj:{ //修改成绩提交参数
        unit:'',
        achievementValue:'',
        score:0,
        studentScoreId:'',
        scoringMethod:'1',// 确定哪种方式修改 1：直接输入 2：打分
        smallScoreVOS:[],
        smallCode:'',//项目编号
        schoolConfigId:'',//时间配置id
      },
      fruit: '',
      changeReportDisable: false,//修改成绩弹窗显示
      titleMsg: {},
      studentId: '',
      resultData: [],
      resultColumns: [
        {
          title: '考核项目',
          key: 'smallItemName',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '考试时间',
          key: 'middleItemName',
          align: 'center',
          minWidth: 200,
          render: (h, params) => {
            const { row } = params;
            let text = '';
            let {testStatus} = this.titleMsg;
            if(testStatus == 1&&!row.skillScoreVOS.length) {
              return h('div',text = '免考');
            }
            return h('div', [
              h('ul', row.skillScoreVOS.map((item, index) => {
                let length = row.skillScoreVOS.length;
                text = `${item.startTime}~${item.endTime}`;
                return h('li', {
                  attrs: {
                    class: 'test'
                  },
                  style: {
                    padding: '3px 0',
                    height: '35px',
                    borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
                  }
                }, `${item.startTime}~${item.endTime}`)
              }))
            ]);
          }
        },
        {
          title: '成绩',
          key: 'middleItemName',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const { row } = params;
            let text = '';
            let {testStatus} = this.titleMsg;
            if(testStatus == 1&&!row.skillScoreVOS.length) {
              return h('div',text = '免考');
            };
            return h('div', [
              h('ul', row.skillScoreVOS.map((item, index) => {
                let length = row.skillScoreVOS.length;
                let text,mine,sconed;
                if(item.unit == "分.秒") {
                  if(!item.achievementValue && typeof(item.achievementValue)!='undefined' && item.achievementValue!=0) {
                    text = ' ';
                  }else {
                    mine = parseInt(Number(items.achievementValue)/60);
                    sconed = items.achievementValue%60;
                    text = `${mine}'${sconed}"`
                  }
                }else {
                  text = `${item.achievementValue}${item.unit}`
                }
                if(testStatus == 1&&!item.achievementValue) {
                  text = '免考'
                }
                return h('li', {
                  attrs: {
                    class: 'test'
                  },
                  style: {
                    padding: '3px 0',
                    height: '35px',
                    borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
                  }
                }, text)
              }))
            ]);
          }
        },
        {
          title: '得分',
          key: 'middleItemName',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const { row } = params;
            let text = '';
            let {testStatus} = this.titleMsg;
            if(testStatus == 1&&!row.skillScoreVOS.length) {
              return h('div',text = '免考');
            };
            return h('div', [
              h('ul', row.skillScoreVOS.map((item, index) => {
                let length = row.skillScoreVOS.length;
                return h('li', {
                  attrs: {
                    class: 'test'
                  },
                  style: {
                    padding: '3px 0',
                    height: '35px',
                    borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
                  }
                }, `${item.score || 0}`)
              }))
            ]);
          }
        },
        {
          title: '录入教师',
          key: 'middleItemName',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const { row } = params;
            let text = '';
            let {testStatus} = this.titleMsg;
            if(testStatus == 1&&!row.skillScoreVOS.length) {
              return h('div',text = '免考');
            };
            return h('div', [
              h('ul', row.skillScoreVOS.map((item, index) => {
                let length = row.skillScoreVOS.length;
                return h('li', {
                  attrs: {
                    class: 'test'
                  },
                  style: {
                    padding: '3px 0',
                    height: '35px',
                    borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
                  }
                }, `${item.teacherName}`)
              }))
            ]);
          }
        },
        {
          title: '录入时间',
          key: 'middleItemName',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const { row } = params;
            let text = '';
            let {testStatus} = this.titleMsg;
            if(testStatus == 1&&!row.skillScoreVOS.length) {
              return h('div',text = '免考');
            };
            return h('div', [
              h('ul', row.skillScoreVOS.map((item, index) => {
                let length = row.skillScoreVOS.length;
                return h('li', {
                  attrs: {
                    class: 'test'
                  },
                  style: {
                    padding: '3px 0',
                    height: '35px',
                    borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
                  }
                }, `${item.createTime}`)
              }))
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            const { row } = params;
            let text = '';
            let {testStatus} = this.titleMsg;
            if(testStatus == 1&&!row.skillScoreVOS.length) {
              return h('div',text = '免考');
            };
            return h('div', [
              h('ul', row.skillScoreVOS.map((item, index) => {
                let length = row.skillScoreVOS.length;
                return h('li', {
                  attrs: {
                    class: 'test'
                  },
                  style: {
                    padding: '3px 0',
                    height: '35px',
                    borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
                  }
                }, [
                  h(
                    "Button",
                    {
                      props: {
                        type: "success",
                        disabled: false,
                      },
                      style: {
                        // margin: "10px 10px",
                        padding: '3px 15px'
                      },
                      on: {
                        click: () => {
                          this.toDetail(row,item);
                        },
                      },
                    },
                    "修改"
                  )
                ])
              }))
            ]);
          }
        },
        // {
        //   title: '备注',
        //   key: 'projectName',
        //   align: 'center',
        //   minWidth: 100,
        //   render: (h, params) => {
        //     const { row } = params;
        //     return h('div', [
        //       h('ul', row.skillScoreVOS.map((item, index) => {
        //         let length = row.skillScoreVOS.length;
        //         return h('li', {
        //           attrs: {
        //             class: 'test'
        //           },
        //           style: {
        //             padding: '3px 0',
        //             height: '35px',
        //             borderBottom: `${index != length - 1 ? '1px solid #e8eaec' : ''}`,
        //           }
        //         }, `${item.createTime}`)
        //       }))
        //     ]);
        //   }
        // },
      ],
      loading: false,
      skillScoreVOSDATA: [],
    }
  },
  mounted () {
    this.studentId = this.$route.params.studentId;
    this.queyStudentMsg();

  },
  computed:{
    calculateBacise() {
      return this.basicsDisable&&this.titleMsg.testStatus
    },
    calculateSpecial() {
      return this.specialDisable&&this.titleMsg.testStatus
    }
  },
  methods: {
    goBack(){this.$router.go(-1)},
    //计算是否全部考完
    dateTest(arr) {
      let judgeBoolean = false;
      try {
        arr.forEach((item) => {
          let skillVOS = item.skillVOS;
          try {
            skillVOS.forEach((child)=>{
                let skillScoreVOS = child.skillScoreVOS;
                if(!skillScoreVOS.length) {
                  judgeBoolean = true;
                  throw "终止"
                }
                try {
                  skillScoreVOS.forEach((skillItem)=>{
                    if(!skillItem.score && typeof(skillItem.score)!='undefined' && skillItem.score!=0) {
                      judgeBoolean = true;
                      throw "终止"
                    }
                  })
                } catch (error) {
                  
                }
              if(judgeBoolean) throw "终止";
            })
          } catch (error) {
            
          }
          if(judgeBoolean) throw "终止";
        });
      } catch (e) {}
      return judgeBoolean;
    },
    //计算基础体能免考情况下是否全部完成
    deteBacsie(arr) {
      let basicsDis = false;
      try {
        arr.forEach((item)=>{
          let physicalScoreVOS = item.physicalScoreVOS;
          if(!physicalScoreVOS.length) {
            basicsDis = true;
            throw "终止"
          }
          try {
            physicalScoreVOS.forEach((child)=>{
              if(!child.score && typeof(child.score)!='undefined' && child.score!=0){
                basicsDis = true;
                throw "终止"
              }
            })
          } catch (error) {
            
          };
          if(basicsDis) throw "终止"
        })
      } catch (error) {
        
      };
      return basicsDis;
    },
    //获取学生数据详情
    async queyStudentMsg () {
      const parmas = {
        studentId: this.studentId
      };
      let res = await api.getStudentDataDetail(parmas);
      if (res.data.code == 10000) {
        this.titleMsg = res.data.response;
        let disableVal = this.dateTest(this.titleMsg.skillDetailVOS);
        this.specialDisable = disableVal;
        let basicsDisable = this.deteBacsie(this.titleMsg.physicalDetailVOS);
        this.basicsDisable = basicsDisable;
        this.filterStudentMsg(this.titleMsg.skillDetailVOS)
      }
    },
    //重组学生详情信息列表
    filterStudentMsg (arr = []) {
      arr.forEach((item, index) => {
        let { skillVOS } = item;
        let newSkill = skillVOS.map((child) => {
          return [child]
        });
        item.skillVOS = newSkill
      });
    },
    //修改成绩弹窗
    toDetail (row,item) {
      let value = this.changeReportDisable;
      let {smallScoreVOS,scoringMethod} = row;
      this.changeReportDisable = !value;
      this.submitObj.unit = item.unit;
      this.submitObj.studentScoreId = item.studentScoreId;
      this.submitObj.scoringMethod = scoringMethod;
      this.submitObj.achievementValue = item.achievementValue;
      this.submitObj.score = item.score;
      this.submitObj.smallCode = row.smallCode;
      this.submitObj.schoolConfigId = item.schoolConfigId;
      if(scoringMethod == '2') {
        this.submitObj.smallScoreVOS = smallScoreVOS.filter((item)=>{
          return this.titleMsg.gender == item.gender
        })[0].scoreDetailVOS;
      }else {
        this.calculateCore(this.submitObj);
      }
    },
    //修改成绩
    async dateScore() {
      let {studentScoreId,achievementValue,schoolConfigId,smallCode  } = this.submitObj
      if(achievementValue) {
        let parmas = {
          studentId:Number(this.studentId),
          achievementValue,
          schoolConfigId,
          smallCode
        };
        let res = await api.updateStudentScore(parmas);
        if(res.data.code == 10000 ) await this.queyStudentMsg();
        else this.$Message.error(res.data.msg);
      }else {
        this.$Message.error('成绩不能为空');
      }
    },
    //打分回调函数 
    changeScore(val) {
      this.submitObj.achievementValue = val;
    },
    //成绩值变化回调
    coreInput() {
      let {achievementValue} = this.submitObj;
      if(achievementValue) this.calculateCore(this.submitObj);
      else {
        this.$Message.error('成绩值不能为空');
      }
    },
    //计算得分
    async calculateCore(data) {
      let {studentScoreId,achievementValue} = data; 
      let params = {studentScoreId,achievementValue}
      let res = await api.queryStudentScore(params);
      if(res.data.code == 10000) {
        if(res.data.response.code == '1') this.submitObj.score = res.data.response.data;
        else {this.$Message.error(res.data.response.msg)};
      }else {
        this.$Message.error(res.data.msg);
      }
    },
    //弹窗消失回调
    cancel() {
      this.changeReportDisable = false;
    }
  }
}
</script>
<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
}
.basics-msg {
  width: 100%;
  display: flex;
  align-items: center;
  span {
    padding-right: 40px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #515a6e;
  }
  .assessTitle {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
}
.footer_msg {
  margin: 30px 0 43px 0;
}
.enter {
  width: 50px;
  height: 18px;
  margin: 0 20px 0 10px;
  text-align: center;
  background: #00c693;
  border-radius: 3px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.flex {
  width: 100%;
  display: flex;
  align-items: center;
}
.exam-status {
  width: 50px;
  height: 18px;
  margin-right: 10px;
  background: #00c693;
  border-radius: 3px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.subCol > ul > li {
  margin: 0 -18px;
  list-style: none;
  text-align: center;
  border-bottom: 1px solid #e8eaec;
  overflow-x: hidden;
}
.subCol > ul > li:last-child {
  border-bottom: none;
}
.project_content{
  display:flex;
  justify-content:center;
  align-items:center;
  span,span>span{
    text-align:center;
    line-height:36px;
  }
}
</style>