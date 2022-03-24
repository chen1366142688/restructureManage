<template>
  <div class="test-table">
    <div style="margin-top: 20px">
      <Card>
        <div>
          <div style="margin-bottom: 16px; font-size: 18px">{{formList.pageName}}</div>
        </div>
        <div>
          <Row>
            <div style>
              <Table
                border
                max-height="650"
                :loading="loading"
                :columns="DataSummaryResultData"
                :data="generalize"
              ></Table>
            </div>
          </Row>
        </div>
      </Card>
    </div>
    <div style="margin-top: 20px">
      <Card>
        <div>
          <div style="margin-bottom: 16px; font-size: 18px">数据明细</div>
        </div>
        <div>
          <Row>
            <div style>
              <Table
                border
                max-height="650"
                :loading="loading"
                :columns="DataDetailsResultData"
                :data="dataDetail"
              ></Table>
            </div>
            <br />
            <div style="float: right;">
                <Page
                :total="total"
                :current="formList.pageNum"
                :page-size="formList.pageSize"
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
import util from '@/libs/util.js'
export default {
  props:{
    weirdTitle: {
      type:String,
      default:'测试内容编辑'
    },
    formList: {
      type:Object,
      default: () => {}
    },
    routerName: {
      type:Object,
      default: () => {}
    },
    generalize: {
      type: Array,
      default: () => []
    },
    dataDetail: {
      type: Array,
      default: () => []
    },
    dataDetailTotal: {
      type: Number,
      default: () => 0
    },
  },
  data () {
    return {
      loading: false,
      tablFormList: {
        total:0,
        // pageNo:1,
        // pageSize:10,
        ...this.formList,
        activityId:'9999'
      },
      DataSummaryResultData: [ //数据概括table
        {
          title: '名称',
          key: 'activityName',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '完成人数/考核总人数',
          key: 'basicsNumber',
          align: 'center',
          minWidth: 100,
          render:(h,params) =>{
            let {row} = params;
            return h('div',`${row.finishNumber}/${row.testCountNumber}`)
          }
        },
        {
          title: '平均得分',
          key: 'avgScore',
          align: 'center',
          minWidth: 100,
        },
        {
            title: "优秀率（人数）",
            key: "excellentNumber",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.excellentProbability*100).toFixed(2)}% (${params.row.excellentNumber?params.row.excellentNumber:0}人)`)
            }
          },
          {
            title: "良好率（人数）",
            key: "fineProbability",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.fineProbability*100).toFixed(2)}% (${params.row.fineNumber?params.row.fineNumber:0}人)`)
            }
          },
          {
            title: "及格率（人数）",
            key: "createTime",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.marginalProbability*100).toFixed(2)}% (${params.row.marginalNumber?params.row.marginalNumber:0}人)`)
            }
          },
          {
            title: "不及格率（人数）",
            key: "createTime",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.notMarginalProbability*100).toFixed(2)}% (${params.row.notMarginalNumber?params.row.notMarginalNumber:0}人)`)
            }
          },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          minWidth: 100,
          render: (h,parmas) => {
            let row = parmas.row,text="";
            row.status == 1? text = '测试中' : text = "已完成";
            return h('div',text);
          }
        },
        {
        title: "操作",
        key: "action",
        align: "center",
        minWidth: 300,
        render: (h, params) => {
            const row = params.row;
            return h("div", {

                style:{
                    display: "flex",
                    justifyContent: "space-around",
                }
                },[
                h(
                    "Button",
                    {
                    props: {
                        type: "success",
                        disabled:row.status!=1?true:false,
                    },
                    style: {
                        // marginRight: "10px",
                    },
                    on: {
                        click: () => {
                        this.contentCompile(row);
                        },
                    },
                    },
                    this.weirdTitle
                ),
                h(
                    "Button",
                    {
                    props: {
                        type: "success",
                        disabled:row.status!=1?true:false,
                    },
                    style: {
                        // marginRight: "10px",
                    },
                    on: {
                        click: () => {
                        this.studentManagement(row);
                        },
                    },
                    },
                    "项目学生管理"
                ),
                h(
                    "Button",
                    {
                    props: {
                        type: "success",
                        disabled: false,
                    },
                    style: {
                        // marginRight: "10px",
                    },
                    on: {
                        click: () => {
                        this.examine(row);
                        },
                    },
                    },
                    "测试数据查看"
                ),
                ]);
            },
        },
      ],
      DataDetailsResultData: [ //数据概括table
        {
          title: '考核班级',
          key: 'className',
          align: 'center',
          minWidth: 100,
          render:(h,parmas) =>{
            return h('div',`${this.transitionCn(parmas.row.className.substring(0,1))}年级${parmas.row.className.slice(3)}`)
          }
        },
        {
          title: '完成人数/考核总人数',
          key: 'basicsNumber',
          align: 'center',
          minWidth: 100,
          render:(h,params) =>{
            let {row} = params;
            return h('div',`${row.finishNumber}/${row.assessNumber}`)
          }
        },
        {
          title: '平均得分',
          key: 'avgScore',
          align: 'center',
          minWidth: 100,
        },
        {
            title: "优秀率（人数）",
            key: "excellentNumber",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.excellentProbability*100).toFixed(2)}% (${params.row.excellentNumber?params.row.excellentNumber:0}人)`)
            }
          },
          {
            title: "良好率（人数）",
            key: "fineProbability",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.fineProbability*100).toFixed(2)}% (${params.row.fineNumber?params.row.fineNumber:0}人)`)
            }
          },
          {
            title: "及格率（人数）",
            key: "createTime",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.marginalProbability*100).toFixed(2)}% (${params.row.marginalNumber?params.row.marginalNumber:0}人)`)
            }
          },
          {
            title: "不及格率（人数）",
            key: "createTime",
            align: "center",
            minWidth: 100,
            render:(h,params) =>{
              return h('div',`${(params.row.notMarginalProbability*100).toFixed(2)}% (${params.row.notMarginalNumber?params.row.notMarginalNumber:0}人)`)
            }
          },
      ],
    }
  },
  computed: {
    detailData() {
      let dataArray = JSON.parse(JSON.stringify(this.DataSummaryResultData)); 
      return dataArray.slice(0,dataArray.length-2);
    },
    total() {
      return this.dataDetailTotal;
    }
  },
  created() {
    let params = util.hasParams(this.$store, this.$route);
    if(params) this.tablFormList = params;
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    contentCompile(row) { //测试内容编辑
      this.$router.push({name:this.routerName.addTest,query:{activityId:this.formList.activityId,title:'编辑'}});
    },
    studentManagement() { //项目学生管理
      this.$router.push({name:this.routerName.studentMsg,query:{ activityId:this.formList.activityId,grade:this.formList.grade}});
    },
    examine() {//测试数据查看
      this.$router.push({name:this.routerName.dataExamine,query:{ activityId:this.formList.activityId}});
    },
    pageNumChange(val) {//页数变化回调
      this.tablFormList.pageNum = val;
      this.$emit('getDataDetail',this.tablFormList);
    },
    pageSizechange(val) { //条数变化回调
      this.tablFormList.pageSize = val;
      this.$emit('getDataDetail',this.tablFormList);
  }
  }
  
}
</script>