<template>
  <div style="padding-left:10px;">
      <div>
        <h2 style="margin-top:15px;margin-bottom:13px;">教育局端数据报送</h2>
        </div>
      <Card style="margin-top:20px;" :dis-hover="true">
         <Row  type="flex" justify="end" align="middle">
                  <Button
                  class="add-button"
                  style="margin:0 20px"
                  v-on:click="toSemesterReportedBaseDetail"
                  type="success"
                >基础数据报送</Button>
                <Button
                  class="add-button"
                  style="margin:0 20px"
                  v-on:click="testReportPre"
                  :disabled="testDisabled"
                  type="success"
                >体质测试数据报送</Button>
                 <Button
                  class="add-button"
                  style="margin:0 20px"
                  v-on:click="subjectReportPre"
                  type="success"
                  :disabled="subjectDisabled"
                >学科评价数据报送</Button>
        </Row>
     </Card>
        <Card style="margin-top:20px;" :dis-hover="true">
          <div >
              <div style="font-size:18px;height:40px;">当前数据</div>
              <div>
                  <Row>
                      <div>
                          <Table  border :columns="resultColumns" :data="resultData"></Table>
                      </div>
                  </Row>
              </div>
          </div>
        </Card>
        <Card style="margin-top:20px;" :dis-hover="true">
          <div >
              <div style="font-size:18px;height:40px;">历史报送记录</div>
              <div>
                  <Row>
                      <div>
                          <Table  border :columns="resultColumnsHis" :data="resultDataHis"></Table>
                      </div>
                  </Row>
              </div>
          </div>
        </Card>
        <Card style="margin-top:20px;" :dis-hover="true">
          <div >
              <div style="font-size:18px;height:40px;">基础数据</div>
              <div>
                  <Row>
                      <div>
                          <Table  border :columns="resultColumnsBase" :data="resultDataBase"></Table>
                      </div>
                  </Row>
              </div>
          </div>
        </Card>
         <Modal
              v-model="testNotice"
              title="体质测试数据报送"
      >
        <div>
            <p>体质测试数据报送给教育局端后，系统数据将被锁定，无法更改，若需更改，需教育局端开启编辑权限，是否确定报送。</p>
        </div>
        <div slot="footer">
            <Button type="text" size="large" :loading="loading" @click="testReport">提交</Button>
          <Button type="text" size="large"  @click="cancel">取消</Button>
        </div>
      </Modal>
      <Modal
              v-model="testNotice1"
              title="体质测试数据报送"
      >
        <div>
            <p>请完成所有报送学生的体测成绩。</p>
        </div>
        <div slot="footer">
          <Button type="text" size="large"  @click="cancel">知道了</Button>
        </div>
      </Modal>
      <Modal
              v-model="subjectNotice"
              title="学科评价数据报送"
      >
        <div>
            <p>学科评价数据报送给教育局端后，系统数据将被锁定，无法更改，若需更改，需教育局端开启编辑权限，是否确定报送。</p>
        </div>
        <div slot="footer">
            <Button type="text" size="large" :loading="loading" @click="batchScore">提交</Button>
          <Button type="text" size="large" @click="cancel">取消</Button>
        </div>
      </Modal>
       <Modal v-model="exportStatusOne" :mask-closable="false">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>选择报送学校</span>
          </p>
          <div style="text-align:center">
            <CheckboxGroup v-model="schoolIds" >
              <Checkbox
                :label="school.schoolId"
                v-for="(school,index) in testSchoolList" :key="index"
              >{{school.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div slot="footer">
            <Button class="add-button" v-on:click="testReportSe" type="success">报送</Button>
            <Button class="add-button" v-on:click="cancel" type="success">取消</Button>
          </div>
      </Modal>
      <Modal v-model="exportStatusTwo" :mask-closable="false">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>选择报送学校</span>
          </p>
          <div style="text-align:center">
            <CheckboxGroup v-model="schoolIds">
              <Checkbox
                :label="school.schoolId"
                v-for="(school,index) in schoolList" :key="index"
              >{{school.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div slot="footer">
            <Button class="add-button" v-on:click="subjectReportSe" type="success">报送</Button>
            <Button class="add-button" v-on:click="cancel" type="success">取消</Button>
          </div>
      </Modal>
      <Modal v-model="baseReport" :mask-closable="false">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提醒</span>
          </p>
          <div style="text-align:center">您还未完成学校基础数据报送，请先报送学校基础数据。</div>
          <div slot="footer">
            <Button @click="toSemesterReportedBaseDetail" type="success">报送基础数据</Button>
            <Button @click="baseReportCancel" type="success">取消</Button>
          </div>
      </Modal>
    </div>
</template>

<script>
Number.prototype.toFixedProportion = function (n){
    n = n ? n : 0;  //保留的小数位数
    var num = this+"";
    var sign = '';
    //去符号
    if(num>=100){return 100}
    if(num<=0){return 0}
    if(num.indexOf("-")>-1 || num.indexOf("+")>-1){
        sign = num.substr(0,1);  //符号
        num = num.substr(1,num.length-1);
    }
    num = num*Math.pow(10,n)+'';
    //小数点后面的数字是否大于等于5，是 进1
    var i = num.indexOf(".");
    if(i>-1){
        if(num.substr(i+1,1)>=5){
            num = 1+num*1; //转为数字运算 否则会进行字符串运算
        }
    }
    num = Math.floor(num);
    var result = sign+num / Math.pow(10,n);
    result +=''+ new Array(n+1).join("0");  //位数不够的 补0
    var dot_index = result.indexOf(".");
    var int_part = result.substr(0,dot_index);
    var dot_part = result.substr(dot_index+1,n);
    return int_part?`${int_part}.${dot_part}`:dot_part;
}
import api from '@/api/dataReport.js'
export default {
  name: 'teacherList',
  data() {
    return {
      baseReport:false,
      exportStatusOne:false,
      exportStatusTwo:false,
      typeScore: 0,
      createSemesterScore: false,
      schoolId:"",
      testSchoolList:[],
      schoolIds:[],
      schoolList:[],
      loading:false,
      testNotice:false,
      testNotice1:false,
      subjectNotice:false,
      testDisabled:false,
      subjectDisabled:false,

      statiscalFirst:[
        {
          title: '报送学期',
          key: 'exemptStudent',
          align: 'center',
          render: (h, params) => {
             let row=params.row;
             let text="";
             if(row.yearSemester%2==0){
                 text=row.schoolYear+"第一学期"
             }else{
                 text=row.schoolYear+"第二学期"
             }
            return h('div', text)
          }
        },
        {
          title: '学校名称',
          key: 'schoolName',
          align: 'center',
        },
        {
          title: '系统无学籍学生',
          key: 'notSchoolStudent',
          align: 'center',
          render: (h, params) => {
            return h('div', [h('span', params.row.notSchoolStudent?params.row.notSchoolStudent:0)])
          }
        },
        {
          title: '学校总人数',
          key: 'totalStudent',
          align: 'center',
        },
         {
          title: '体测免试人数',
          key: 'testExemptStudent',
          align: 'center',
        },
        {
          title: '体测完成人数/体测总人数',
          key: 'testFinishStudent',
          align: 'center',
          render: (h, params) => {
               const row = params.row;
            let text = "";
            if(row.schoolType=="4"){
              if(row.testTotalStudentHigh){
                text=row.testFinishStudentHigh+"/"+(row.testTotalStudentHigh<0?0:row.testTotalStudentHigh);
              }else{
                text= "--"
              }
            }else{
              if(row.testTotalStudent){
                text=row.testFinishStudent+"/"+(row.testTotalStudent<0?0:row.testTotalStudent);
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
        {
          title: '视力完成人数/测试总人数',
          key: 'testFinishStudent',
          align: 'center',
          render: (h, params) => {
               const row = params.row;
            let text = "";
            if(row.schoolType=="4"){
              if(row.testTotalStudentHigh){
                text=row.visionFinishStudent +"/"+(row.testTotalStudentHigh || 0);
              }else{
                text= "--"
              }
            }else{
              if(row.testTotalStudent){
                text=row.visionFinishStudent+"/"+(row.testTotalStudent || 0);
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
         {
          title: '体测平均分',
          key: 'showType',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if(row.schoolType=="4"){
              if(row.testFinishStudentHigh){
                text=(row.testTotalScoreHigh/row.testFinishStudentHigh/100).toFixedProportion(2);
              }else{
                text= "--"
              }
            }else{
              if(row.testFinishStudent){
                text=(row.testTotalScore/row.testFinishStudent/100).toFixedProportion(2);
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
        {
          title: '体测优良率（人数）',
          key: 'goodStudent',
          align: 'center',
          render: (h, params) => {
           const row = params.row;
            let text = "";
            if(row.schoolType=="4"){
              if(row.testFinishStudentHigh){
                let all = ((row.testExcellentStudentHigh+row.testGoodStudentHigh)  /row.testFinishStudentHigh*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.testExcellentStudentHigh+row.testGoodStudentHigh) + '人）';
              }else{
                text= "--"
              }
            }else{
              if(row.testFinishStudent){
                let all = ((row.testExcellentStudent+row.testGoodStudent)  /row.testFinishStudent*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.testExcellentStudent+row.testGoodStudent) + '人）';
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
         {
          title: '体测合格率（人数）',
          key: 'showType',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if(row.schoolType=="4"){
              if(row.testFinishStudentHigh){
                let all = ((row.testExcellentStudentHigh+row.testGoodStudentHigh+row.testPassStudentHigh)  /row.testFinishStudentHigh*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.testExcellentStudentHigh+row.testGoodStudentHigh+row.testPassStudentHigh) + '人）';
              }else{
                text= "--"
              }
            }else{
              if(row.testFinishStudent){
                let all = ((row.testExcellentStudent+row.testGoodStudent+row.testPassStudent)  /row.testFinishStudent*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.testExcellentStudent+row.testGoodStudent+row.testPassStudent) + '人）';
              }else{
                text= "--"
              }
            }

            return h('div', text)
          }
        },
        {
          title: '学科评价完成/考核总人数',
          key: 'passStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
              if(row.subjectTotalStudent){
                text=row.subjectFinishStudent+"/"+row.subjectTotalStudent;
              }else{
                text= "--"
              }
            }

            return h('div', text)
          }
        },
         {
          title: '学科评价平均分',
          key: 'showType',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
              if(row.subjectFinishStudent){
                  text=(row.subjectTotalScore/row.subjectFinishStudent/100).toFixedProportion(2);
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率（人数）',
          key: 'notPassStudent',
          align: 'center',
          render: (h, params) => {
           const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
              if(row.subjectFinishStudent){
                let all = ((row.subjectExcellentStudent+row.subjectGoodStudent)  /row.subjectFinishStudent*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.subjectExcellentStudent+row.subjectGoodStudent) + '人）'
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
         {
          title: '学科评价合格率（人数）',
          key: 'showType',
          align: 'center',
          render: (h, params) => {
           const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
              if(row.subjectFinishStudent){
                let all = ((row.subjectExcellentStudent+row.subjectGoodStudent+row.subjectPassStudent)  /row.subjectFinishStudent*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.subjectExcellentStudent+row.subjectGoodStudent+row.subjectPassStudent) + '人）'
              }else{
                text= "--"
              }
            }
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      disabled:row.schoolType==4?true:false
                    },
                    style: {
                      padding:'5px',
                      marginRight:0
                    },
                    on: {
                      click: () => {
                          this.toDetailInfo(params.row);
                      }
                    }
                  },
                  '查看详情'
                )
              ])
          }
        }
      ],
      statiscalSecond:[
        {
          title: '报送学期',
          key: 'exemptStudent',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let text="";
             if(row.yearSemester%2==0){
                 text=row.schoolYear+"第一学期"
             }else{
                 text=row.schoolYear+"第二学期"
             }
            return h('div', text)
          }
        },
        {
          title: '学校名称',
          key: 'schoolName',
          align: 'center',
        },
        {
          title: '系统无学籍学生',
          key: 'notSchoolStudent',
          align: 'center',
          render: (h, params) => {
            return h('div', [h('span', params.row.notSchoolStudent?params.row.notSchoolStudent:0)])
          }
        },
        {
          title: '学校总人数',
          key: 'totalStudent',
          align: 'center',
        },
        {
          title: '学科评价完成/考核总人数',
          key: 'passStudent',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
            if(row.subjectTotalStudent){
                text=row.subjectFinishStudent+"/"+row.subjectTotalStudent;
            }else{
               text= "--"
            }}
            return h('div', text)
          }
        },
         {
          title: '学科评价平均分',
          key: 'showType',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
            if(row.subjectFinishStudent){
                text=(row.subjectTotalScore/row.subjectFinishStudent/100).toFixedProportion(2);
            }else{
               text= "--"
            }}
            return h('div', text)
          }
        },
        {
          title: '学科评价优良率（人数）',
          key: 'notPassStudent',
          align: 'center',
          render: (h, params) => {
           const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
            if(row.subjectFinishStudent){
                let all = ((row.subjectExcellentStudent+row.subjectGoodStudent)  /row.subjectFinishStudent*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.subjectExcellentStudent+row.subjectGoodStudent) + '人）'
            }else{
               text= "--"
            }}
            return h('div', text)
          }
        },
         {
          title: '学科评价合格率（人数）',
          key: 'showType',
          align: 'center',
          render: (h, params) => {
           const row = params.row;
            let text = "";
            if(row.schoolType==4){
              text= "--"
            }else{
            if(row.subjectFinishStudent){
                let all = ((row.subjectExcellentStudent+row.subjectGoodStudent+row.subjectPassStudent)  /row.subjectFinishStudent*100).toFixedProportion(2);
                text=all+"%" + ' （' + (row.subjectExcellentStudent+row.subjectGoodStudent+row.subjectPassStudent) + '人）'
            }else{
               text= "--"
            }}
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      disabled:row.schoolType==4?true:false
                    },
                    style: {
                      padding:'5px',
                      marginRight:0
                    },
                    on: {
                      click: () => {
                          this.toDetailInfo(params.row);
                      }
                    }
                  },
                  '查看详情'
                )
              ])
          }
        }
      ],
      resultColumns: [],
      resultData: [],
      resultColumnsHis: [
        {
          title: '报送学期',
          key: 'exemptStudent',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let text="";
             if(row.yearSemester%2==0){
                 text=row.schoolYear+"第一学期"
             }else{
                 text=row.schoolYear+"第二学期"
             }
            return h('div', text)
          }
        },
        {
          title: '报送项目',
          key: 'reportType',
          align: 'center',
          render: (h, params) => {
               const row = params.row;
            let text = "";
           text=row.reportType=="1"?"体质测试":"学科评价"
            return h('div', text)
          }
        },
        {
          title: '学校',
          key: 'reportType',
          align: 'center',
          width:400,
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                if(i==0 && (i+1)!=list.length){
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      10 * itemLength +
                      "px;' >";
                }else if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                let schoolName=data.schoolName
                let nameList=schoolName.split(",");
                let heightS = itemLength*30/nameList.length;
                for(let j=0;j<nameList.length;j++){
                  if(j==nameList.length-1){
                    text += "<span style='height:"+heightS+"px;line-height:"+heightS+"px'>" + nameList[j]+ "</span>";
                  }else{
                    text += "<span style='height:"+heightS+"px;line-height:"+heightS+"px'>" + nameList[j]+ "</span></br>";
                  }
                }
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
         {
          title: '报送学生',
          key: 'reportStudentNum',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                text += "<p>" + data.reportStudentNum+ "</p>";
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },

         {
          title: '完成人数/总人数',
          key: 'activityExplain',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                  if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                text += "<p>" + (data.finishStudent+"/"+data.reportStudentNum)+ "</p>";
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '平均分',
          key: 'activityExplain',
          align: 'center',
            render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                  if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                text += "<p>" + data.averageScore+ "</p>";
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '优良率（人数）',
          key: 'activityExplain',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                  if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                let count1 = (data.excellentStudent + data.goodStudent);
                if(!data.finishStudent){
                    text += "<p>0% （" + count1 + "人）</p>";
                }else{
                    let all = ((data.excellentStudent + data.goodStudent)  / data.finishStudent *100).toFixedProportion(2);
                    let pass = all + "% （" + count1 + "人）";
                  text += "<p>" + pass+ "</p>";
                }
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '合格率（人数）',
          key: 'activityExplain',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                 if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                let count1 = (data.excellentStudent + data.goodStudent + data.passStudent);
                if(!data.finishStudent){
                    text += "<p>0% （" + count1 + "人）</p>";
                }else{
                  let all = ((data.excellentStudent + data.goodStudent+data.passStudent)  / data.finishStudent *100).toFixedProportion(2);
                  let aa = all + "% （" + count1 + "人）";
                  text += "<p>" + aa+ "</p>";
                }
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '报送时间',
          key: 'reportTime',
          align: 'center',
          width:200,
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                 if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                let schoolName=data.schoolName
                let nameList=schoolName.split(",");
                if(nameList.length>1){
                  text += "<p>--</p>";
                }else{
                  text += "<p>" + data.reportTime+ "</p>";
                }
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '报送人',
          key: 'teacherName',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                 if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                let schoolName=data.schoolName
                let nameList=schoolName.split(",");
                if(nameList.length>1){
                  text += "<p>--</p>";
                }else{
                  let aa=data.teacherStatus=="1"?data.teacherName:(data.teacherName+"(已删除)")
                  text += "<p>" + data.teacherName+ "</p>";
                }
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '状态',
          key: 'reportStatus',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.showList;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                  if(i+1==list.length){
                  text+= "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }else{
                  text+= "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                }
                let data = list[i];
                let schoolName=data.schoolName
                let nameList=schoolName.split(",");
                if(nameList.length>1){
                  text += "<p>--</p>";
                }else{
                  text += "<p>" + "报送成功"+ "</p>";
                }
                text +="</div>";
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
      ],
      resultDataHis: [],
      resultColumnsBase:[
        {
          title: '报送学期',
          key: 'yearSemester',
          align: 'center',
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let text= row.schoolYear+"学年";
            return h('div', text)
          }
        },
        {
          title: '学校名称',
          key: 'yearSemester',
          align: 'center',
          width:150,
          render: (h, params) => {
             var vm=this;
             let row=params.row;
             let list=row.list;
             let text = "";
             if(list && list.length>0){
              let itemLength=list.length;
              for(let i=0;i<list.length;i++){
                let data = list[i].name;
                let heightS = 30;
                if(i==itemLength-1){
                  text += "<span style='height:"+heightS+"px;line-height:"+heightS+"px'>" + data+ "</span>";
                }else{
                  text += "<span style='height:"+heightS+"px;line-height:"+heightS+"px'>" + data+ "</span></br>";
                }
              }
            }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
          }
        },
        {
          title: '教师人数',
          key: 'teacherNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.teacherNum == null?0:row.teacherNum);
          }
        },
        {
          title: '学生人数',
          key: 'studentNum',
          align: 'center'
        },
        {
          title: '田径场个数',
          key: 'athleticsNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", (row.athleticsNumTwo == null?0:row.athleticsNumTwo)+(row.athleticsNumThree == null?0:row.athleticsNumThree)+(row.athleticsNumThreeFour == null?0:row.athleticsNumThreeFour)+(row.athleticsNumFour == null?0:row.athleticsNumFour));
          }
        },
        {
          title: '球场个数',
          key: 'ballNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", (row.basketballNum == null?0:row.basketballNum)+(row.volleyballNum == null?0:row.volleyballNum));
          }
        },
        {
          title: '体育馆个数',
          key: 'gymNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.gymNum == null?0:row.gymNum);
          }
        },
        {
          title: '游泳馆个数',
          key: 'natatoriumNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.natatoriumNum == null?0:row.natatoriumNum);
          }
        },
         {
          title: '器械体操/游戏区面积',
          key: 'gameArea',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.gameArea == null?0:row.gameArea);
          }
        },
        {
          title: '学生体质测试教室',
          key: 'studentTestClassNum',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.studentTestClassNum == null?0:row.studentTestClassNum);
          }
        },
         {
          title: '体育器材是否达标',
          key: 'sportsEquipment',
          align: 'center',
          render: (h, params) => {
            var vm=this;
            let row=params.row;
            return h("div", row.sportsEquipment == '1'?"是":row.sportsEquipment == '0'?"否":"");
          }
        },
        {
          title: '报送时间',
          key: 'createTime',
          align: 'center',

        },
        {
          title: '报送人',
          key: 'teacherName',
          align: 'center',
           render: (h, params) => {
            var vm=this;
            let row=params.row;
            let teacherName = row.teacherName
            if(teacherName == null){
              return h("div", "");
            }
            if(row.schoolId != row.nowSchoolId){
              teacherName = teacherName +'('+row.schoolName+')'
            }
            return h("div", teacherName);
          }
        },
        {
          title: '状态',
          key: 'yearSemester',
          align: 'center',
          width:150,
          render: (h, params) => {
            const row = params.row;

              return h('div',[
                h(
                  'Button',
                  {
                    props: {
                      type: 'default',
                    },
                    style: {
                       marginRight: '10px',
                      padding:'5px',
                      display: row.baseId!=null?'inline-block':'none'
                    },
                    on: {

                    }
                  },
                  '报送成功'
                ),
                 h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      disabled:row.schoolType==4?true:false
                    },
                    style: {
                      padding:'5px',
                      marginRight:0
                    },
                    on: {
                      click: () => {
                          this.toSemesterReportedBaseDetail();
                      }
                    }
                  },
                  '详情'
                )
              ])
          }
        },
      ],
      resultDataBase:[]

    }
  },
  methods: {
    /**体质测试数据报送**/
    async testReportPre(){
      /**教育局体测上报学科评价数据报送判断基础数据是否报送**/
      let res = await api.judgeReport({});
      //默认为已经上报过基础数据了
        res.data.response.code='1';
      if(res.data.response.code === '1'){
        this.schoolIds=[];
        this.exportStatusOne=true;
      }else{
        this.baseReport = true;
      }
    },
    /**学科评价数据报送**/
    async subjectReportPre(){
      /**教育局体测上报学科评价数据报送判断基础数据是否报送**/
      let res = await api.judgeReport({});
      //默认为已经上报过基础数据了
        res.data.response.code='1';
      if(res.data.response.code === '1'){
        this.schoolIds=[];
        this.exportStatusTwo=true;
      }else{
        this.baseReport = true;
      }
    },
    baseReportCancel(){this.baseReport = false},
    testReportSe(){
      var vm=this;
         if(vm.schoolIds.length<1){
           vm.$Message.info("请选择报送学校！");
           return
         }
         for(let i=0;i<vm.schoolIds.length;i++){
           let schoolId=vm.schoolIds[i];
           for(let j=0;j<vm.resultData.length;j++){
             let row=vm.resultData[j]
             if(schoolId==row.schoolId){
               if(vm.resultData[j].schoolType=="4"){
                 if(row.testFinishStudentHigh<row.testTotalStudentHigh){
                   vm.testNotice1=true
                   return
                 }
               }else{
                 if(row.testFinishStudent<row.testTotalStudent){
                   vm.testNotice1=true
                   return
                 }
               }
             }
           }
         }
      vm.testNotice=true;
    },
    subjectReportSe(){
      var vm=this;
         if(vm.schoolIds.length<1){
           vm.$Message.info("请选择报送学校！");
           return
         }
      vm.subjectNotice=true;
    },
    cancel(){
      var vm=this;
      vm.testNotice=false;
      vm.subjectNotice=false;
      vm.exportStatusOne=false;
      vm.exportStatusTwo=false;
      vm.testNotice1=false;
    },
    toDetailInfo(detail){
      sessionStorage.setItem('educationReport-studentSubjectReportDetail-yearSemester',detail.yearSemester)
      sessionStorage.setItem('educationReport-studentSubjectReportDetail-schoolId',detail.schoolId)
      sessionStorage.setItem('educationReport-studentSubjectReportDetail-schoolType',detail.schoolType)
      this.$router.push({ name: 'studentSubjectReportDetail' })
    },
    pageToList() {
      //返回
      this.$router.go(-1)
    },
    toSemesterReportedBaseDetail(){
        this.baseReport = false
        this.$router.push({ name: 'semesterReportedBaseDetail' })
    },
    getSemesterReportedBaseInfo(){
       var vm=this;
      this.$axios.get('/v1/dataReport/getSemesterReportedBaseInfo?yearSemester='+sessionStorage.getItem("yearSemester")).then(res => {
        if (res.data.code == 10000) {
          vm.resultDataBase = res.data.response;

        }
      })

    },
    getEducationNowStatiscalInfo(){
      var vm=this;
      vm.resultData=[]
        this.$axios.get('/v1/dataReport/getEducationNowStatiscalInfo2?yearSemester='+sessionStorage.getItem("yearSemester")).then(res => {
            if (res.data.code == 10000) {
              let data=res.data.response;
                if(data[0].yearSemester%2==0){
                    vm.testDisabled=false;
                }else{
                    vm.testDisabled=true;
                }
                let testTotalStudent=0;
                let subjectTotalStudent=0;
                for(let i=0;i<data.length;i++){
                  testTotalStudent+=data[i].testTotalStudent
                  subjectTotalStudent+=data[i].subjectTotalStudent
                }
                if(testTotalStudent==0){
                     vm.testDisabled=true;
                }
                if(subjectTotalStudent==0){
                    vm.subjectDisabled=true;
                }else{
                    vm.subjectDisabled=false;
                }
                vm.resultData=data;
            }
        })
    },
    getEducationReportHisList(){
      var vm = this;
      vm.resultDataHis=[];
      this.$axios
        .get("/v1/dataReport/getEducationReportHisList2?yearSemester="+sessionStorage.getItem("yearSemester"))
        .then(function(response) {
          if (response.data.code == 10000) {
            vm.dealHisData(response.data.response)
          } else {
            vm.$Message.info(response.data.msg);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    dealHisData(list){
      var vm=this;
      if(list && list.length>0){
        let testList={
          yearSemester:'',
          schoolYear:'',
          reportType:'1',
          list:[],
          showList:[]
        };
        let subjectList={
          yearSemester:'',
          schoolYear:'',
          reportType:'2',
          list:[],
          showList:[]
        };

        for(let i=0;i<list.length;i++){
          let params=list[i];
          params.averageScore=0
            if(params.finishStudent>0){
              params.averageScore=(params.totalScore/params.finishStudent/100).toFixedProportion(2);
            }
          if(params.reportType=="1"){
            testList.list.push(params)
          }else{
            subjectList.list.push(params)
          }
        }

        if(testList.list.length>0){
          testList.yearSemester=testList.list[0].yearSemester;
          testList.schoolYear=testList.list[0].schoolYear;
          if(testList.list.length==1){
            testList.showList=testList.list
            vm.resultDataHis.push(testList);
          }else{
            let union={
              "excellentStudent": 0,
              "exemptStudent": 0,
              "finishStudent": 0,
              "goodStudent": 0,
              "notPassStudent": 0,
              "passStudent": 0,
              "reportStudentNum": 0,
              "reportTime": "--",
              "schoolName": "",
              "teacherName": "--",
              "totalScore": 0,
              averageScore:0
            }
            for(let i=0;i<testList.list.length;i++){
              let data=testList.list[i];
              union.excellentStudent+=Number(data.excellentStudent);
              union.exemptStudent+=Number(data.exemptStudent);
              union.finishStudent+=Number(data.finishStudent);
              union.goodStudent+=Number(data.goodStudent);
              union.notPassStudent+=Number(data.notPassStudent);
              union.passStudent+=Number(data.passStudent);
              union.notSchoolStudent+=Number(data.notSchoolStudent);
              union.totalScore+=Number(data.totalScore);
              union.reportStudentNum+=Number(data.reportStudentNum);

              if(data.finishStudent){
                union.averageScore+=Number((data.totalScore/data.finishStudent/100))
              }
              if(i==0){
                union.schoolName=data.schoolName;
              }else{
                union.schoolName+=(","+data.schoolName);
              }
            }
            union.averageScore=Number((union.averageScore/testList.list.length)).toFixedProportion(2);
            testList.showList.push(union);
            testList.showList=testList.showList.concat(testList.list);
            vm.resultDataHis.push(testList)
          }
        }

        if(subjectList.list.length>0){
          subjectList.yearSemester=subjectList.list[0].yearSemester;
          subjectList.schoolYear=subjectList.list[0].schoolYear;
          if(subjectList.list.length==1){
            console.log("11111111111")
            subjectList.showList=subjectList.list
            vm.resultDataHis.push(subjectList);
          }else{
            console.log("2222222222")
            let union={
              "excellentStudent": 0,
              "exemptStudent": 0,
              "finishStudent": 0,
              "goodStudent": 0,
              "notPassStudent": 0,
              "passStudent": 0,
              "reportStudentNum": 0,
              "reportTime": "--",
              "schoolName": "",
              "teacherName": "--",
              "totalScore": 0,
              averageScore:0
            }
            for(let i=0;i<subjectList.list.length;i++){
              let data=subjectList.list[i];
              union.excellentStudent+=Number(data.excellentStudent);
              union.exemptStudent+=Number(data.exemptStudent);
              union.finishStudent+=Number(data.finishStudent);
              union.goodStudent+=Number(data.goodStudent);
              union.notPassStudent+=Number(data.notPassStudent);
              union.passStudent+=Number(data.passStudent);
              union.notSchoolStudent+=Number(data.notSchoolStudent);
              union.totalScore+=Number(data.totalScore);
              union.reportStudentNum+=Number(data.reportStudentNum);

              if(data.finishStudent){
                union.averageScore+=Number((data.totalScore/data.finishStudent/100))
              }
              if(i==0){
                union.schoolName=data.schoolName;
              }else{
                union.schoolName+=(","+data.schoolName);
              }
            }
            union.averageScore=(union.averageScore/subjectList.list.length).toFixedProportion(2);
            subjectList.showList.push(union);
            subjectList.showList=subjectList.showList.concat(subjectList.list);
            vm.resultDataHis.push(subjectList)
          }
        }
      }else{
        vm.resultDataHis=[];
      }
      console.log(vm.resultDataHis)
    },

    testReport(){
      var vm=this;
      vm.loading=true;
        this.$axios.get('/v1/dataReport/testReport2?yearSemester='+sessionStorage.getItem("yearSemester")+'&schoolIds='+vm.schoolIds).then(res => {
          vm.loading=false;
          vm.cancel()
            if (res.data.code == 10000) {
                if(res.data.response.code=="1"){
                    vm.$Message.info("上报成功");
                    vm.getEducationNowStatiscalInfo()
       vm.getEducationReportHisList();
                }else{
                    vm.$Message.info(res.data.response.msg);
                }
            }else{
                vm.$Message.info("上报失败");
            }
        })
    },
    subjectReport(){
      var vm=this;
      vm.loading=true;
        this.$axios.get('/v1/dataReport/subjectReport2?yearSemester='+sessionStorage.getItem("yearSemester")+'&schoolIds='+vm.schoolIds).then(res => {
          vm.loading=false;
                vm.cancel()
            if (res.data.code == 10000) {
              if(res.data.response.code=="1"){
                    vm.$Message.info("上报成功");
                    vm.getEducationNowStatiscalInfo()
       vm.getEducationReportHisList();
                }else{
                    vm.$Message.info(res.data.response.msg);
                }
            }else{
                vm.$Message.info("上报失败");
            }
        })
    },

   getTeacherSchoolList(){
      var vm = this
      this.$axios
              .get('/v1/dataReport/getTeacherSchoolList?schoolId=1&menuType=1')
              .then(res => {
                if (res.data.code == 10000) {
                  let data=res.data.response;
                  vm.testSchoolList=data;
                  for(let i=0;i<data.length;i++){
                    if(data[i].schoolType != "4"){
                      vm.schoolList.push(data[i])
                    }
                  }
                } else {
                  if (res.data.code > 39999) {
                    vm.$Message.info(res.data.msg)
                  }
                }
              })
    },


   batchScore(){
      this.typeScore=0;
      this.createSemesterScore = true;
      this.$axios.get("/v1/datafiles/insertNewStudent?yearSemester="+sessionStorage.getItem("yearSemester")).then(res => {
        if (res.data.code == 10000) {
          this.batchScore1();
          this.typeScore = 20;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore1(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsExamScore?yearSemester="+sessionStorage.getItem("yearSemester")).then(res => {
        if (res.data.code == 10000) {
          this.batchScore2();
          this.typeScore = 40;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore2(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsHomeworkScore?yearSemester="+sessionStorage.getItem("yearSemester")).then(res => {
        if (res.data.code == 10000) {
          this.batchScore3();
          this.typeScore = 60;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore3(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsLearnScore?yearSemester="+sessionStorage.getItem("yearSemester")).then(res => {
        if (res.data.code == 10000) {
          this.batchScore4();
          this.typeScore = 80;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    batchScore4(){
      this.$axios.get("/v1/datafiles/batchInsertStudentSemesterSportsScore?yearSemester="+sessionStorage.getItem("yearSemester")).then(res => {
        if (res.data.code == 10000) {
            this.typeScore = 100;
            this.createSemesterScore = false;
            this.subjectReport()
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
  },
  created() {
  },
  mounted() {
      var vm=this;
      vm.getTeacherSchoolList();
       vm.testDisabled=true;
       vm.subjectDisabled=true;
       vm.schoolId=sessionStorage.getItem('schoolId');
       if(Number(sessionStorage.getItem("yearSemester"))%2==0){
           vm.resultColumns=vm.statiscalFirst;
       }else{
           vm.resultColumns=vm.statiscalSecond;
       }
       vm.getEducationNowStatiscalInfo()
       vm.getEducationReportHisList();
       vm.getSemesterReportedBaseInfo();
  }
}
</script>
