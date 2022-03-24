<style>
.demo-upload-list {
  display: inline-block;
  width: 160px;
  height: 160px;
  text-align: center;
  line-height: 160px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <div style="margin-left:15px;">
    <Tabs type="card">
      <TabPane :label="topTitle">
        <Card :dis-hover="true">
          <Form :label-width="80" class="baseInfo" style="margin-top:20px;">
            <FormItem label class="baseInfoitem">
              <span style="color:red">*请谨慎修改已在使用的项目</span>
            </FormItem>
            <FormItem label="是否启用" class="baseInfoitem">
              <RadioGroup :disabled="disabled" v-model="enableStatus">
                <Radio :disabled="disabled" label="1">开启</Radio>
                <Radio :disabled="disabled" label="0">关闭</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="项目名称" class="baseInfoitem">
              <Input :disabled="disabled" v-model="classTestName" placeholder="请输入项目名称" />
            </FormItem>
            <FormItem label="排序序号" class="baseInfoitem">
              <Input :disabled="disabled" v-model="orderIndex" />
            </FormItem>

            <FormItem label="考试类型">
              <Select :disabled="disabled" v-model="classTestType" style="width:200px">
                <Option
                  v-for="item in examTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="项目类型">
              <Select :disabled="disabled" v-model="itemId" style="width:200px">
                <Option
                
                  v-for="item in itemList"
                  :value="item.itemId"
                  :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="年级（男）" class="address">
              <CheckboxGroup v-model="manGrades">
                <Checkbox :label="1" :disabled="disabled">一年级</Checkbox>
                <Checkbox :label="2" :disabled="disabled">二年级</Checkbox>
                <Checkbox :label="3" :disabled="disabled">三年级</Checkbox>
                <Checkbox :label="4" :disabled="disabled">四年级</Checkbox>
                <Checkbox :label="5" :disabled="disabled">五年级</Checkbox>
                <Checkbox :label="6" :disabled="disabled">六年级</Checkbox>
                <Checkbox :label="7" :disabled="disabled">七年级</Checkbox>
                <Checkbox :label="8" :disabled="disabled">八年级</Checkbox>
                <Checkbox :label="9" :disabled="disabled">九年级</Checkbox>
                <Checkbox :label="10" :disabled="disabled">高一</Checkbox>
                <Checkbox :label="11" :disabled="disabled">高二</Checkbox>
                <Checkbox :label="12" :disabled="disabled">高三</Checkbox>
                <Checkbox :label="13" :disabled="disabled">大学</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="年级（女）" class="baseInfoitem">
              <CheckboxGroup v-model="womanGrades">
                <Checkbox :label="1" :disabled="disabled">一年级</Checkbox>
                <Checkbox :label="2" :disabled="disabled">二年级</Checkbox>
                <Checkbox :label="3" :disabled="disabled">三年级</Checkbox>
                <Checkbox :label="4" :disabled="disabled">四年级</Checkbox>
                <Checkbox :label="5" :disabled="disabled">五年级</Checkbox>
                <Checkbox :label="6" :disabled="disabled">六年级</Checkbox>
                <Checkbox :label="7" :disabled="disabled">七年级</Checkbox>
                <Checkbox :label="8" :disabled="disabled">八年级</Checkbox>
                <Checkbox :label="9" :disabled="disabled">九年级</Checkbox>
                <Checkbox :label="10" :disabled="disabled">高一</Checkbox>
                <Checkbox :label="11" :disabled="disabled">高二</Checkbox>
                <Checkbox :label="12" :disabled="disabled">高三</Checkbox>
                <Checkbox :label="13" :disabled="disabled">大学</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
        </Card>
        <Card style="margin-top:30px;" :dis-hover="true">
          <span style="font-weight:bold;font-size:17px;">考核内容</span>
          <Form
            :label-width="80"
            class="baseInfo"
            style="margin-top:30px;"
            v-for="(item,index) in examList"
            :key="index"
          >
            <FormItem :label="'考核内容'+(index+1)">
              <Input style="width:170px;" v-model="item.examItemName" placeholder="请输入项目名称" />
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['xls','xlsx']"
                :max-size="20480"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :multiple="false"
                name="muFiles"
                type="select"
                :action="updateUrl+item.examItemId"
                style="display: inline-block;float:right;margin-right:100px;"
              >
                <Button type="success">上传标准</Button>
              </Upload>
            </FormItem>
            <FormItem label="考核标准">
              <div>
                <Row>
                  <div style>
                    <Table border :loading="loading" :columns="resultColumns" :data="item.standardVOS"></Table>
                  </div>
                </Row>
              </div>
            </FormItem>
            <div style="border-bottom:solid;border-color:gray"></div>
          </Form>
        </Card>
        <div style="margin-top:20px;padding-right:20px">
          <Button type="success" @click="goback" style="float:right;margin-right:100px">返回</Button>
        </div>
      </TabPane>
    </Tabs>
    <Modal title="View Image" v-model="visible">
        <img :src="viewUrl" v-if="visible" style="width: 100%">
    </Modal>
    <Modal v-model="exportStatus" :mask-closable="false" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <span style>导入中，请稍等</span>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "test",
  data() {
    return {
      topTitle: "考试项目标准",
      exportStatus:false,
      loading:false,
      visible:false,
      viewUrl:'',
      classTestId: "",
      enableStatus: "1",
      classTestName: "",
      orderIndex: "",
      classTestType: "",
      examTypeList: [
        {
          name: "健康知识",
          value: "1"
        },
        {
          name: "运动技能",
          value: "2"
        }
      ],
      itemId: "",
      itemList: [],
      unitList: [
        {
          value: "分.秒",
          label: "分.秒"
        },
        {
          value: "秒",
          label: "秒"
        },
        {
          value: "次",
          label: "次"
        },
        {
          value: "次/分钟",
          label: "次/分钟"
        },
        {
          value: "个",
          label: "个"
        },
        {
          value: "分米",
          label: "分米"
        },
        {
          value: "厘米",
          label: "厘米"
        },
        {
          value: "99",
          label: "无计算标准-人工打分值"
        },
        {
          value: "kg",
          label: "kg"
        }
      ],
      manGrades: [],
      womanGrades: [],
      disabled: true,
      updateUrl: "",
      resultData: {
        classTestId: 0,
        classTestName: "string",
        classTestType: "string",
        enableStatus: "string",
        examItemNum: 0,
        itemId: 0,
        manGrades: [0],
        orderIndex: 0,
        womanGrades: [0]
      },
      examList: [],
      aIndex:'',
      bIndex:'',
      methodList:[],
      requreList:[],
      resultColumns: [
        {
          title: "得分等级",
          key: "standardName",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "一年级男",
          key: "x1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "一年级女",
          key: "x1g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "二年级男",
          key: "x2b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "二年级女",
          key: "x2g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "三年级男",
          key: "x3b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "三年级女",
          key: "x3g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "四年级男",
          key: "x4b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "四年级女",
          key: "x4g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "五年级男",
          key: "x5b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "五年级女",
          key: "x5g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "六年级男",
          key: "x6b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "六年级女",
          key: "x6g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "七年级男",
          key: "c1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "七年级女",
          key: "c1g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "八年级男",
          key: "c2b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "八年级女",
          key: "c2g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "九年级男",
          key: "c3b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "九年级女",
          key: "c3g",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "高一男",
          key: "g1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "高一女",
          key: "g1g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "高二男",
          key: "g2b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "高二女",
          key: "g2g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "高三男",
          key: "g3b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "高三女",
          key: "g3g",
          align: "center",
          width: 140,
          type: "html"
        },
        {
          title: "大学男",
          key: "d1b",
          align: "center",
          width: 140,
          type: "html"
        },

        {
          title: "大学女",
          key: "d1g",
          align: "center",
          width: 140,
          type: "html"
        },
      ],
    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    getClassTestStandardInfo(classTestId) {
      var vm = this;
      this.$axios
        .get("/v1/examtest/getClassTestStandardInfo?classTestId=" + classTestId)
        .then(function(response) {
          console.log(response);
          let detailInfo = response.data.response;
          vm.enableStatus = detailInfo.enableStatus;
          vm.classTestName = detailInfo.classTestName;
          vm.orderIndex = detailInfo.orderIndex;
          vm.classTestType = detailInfo.classTestType;
          vm.itemId = detailInfo.itemId;
          vm.manGrades = detailInfo.manGrades ? detailInfo.manGrades : [];
          vm.womanGrades = detailInfo.womanGrades
            ? detailInfo.womanGrades
            : [];
            vm.examList=detailInfo.examList?detailInfo.examList:[]
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getExamItemList() {
      var vm = this;
      this.$axios
        .get("/v1/examtest/getExamItemList")
        .then(function(response) {
          // console.log(response);
          vm.itemList = response.data.response;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    handleSuccess(res, file) {
      var vm = this;
      // console.log(res)
      vm.exportStatus = false;
      if (res.code == 10000) {
        if (res.response == 1) {
          vm.$Message.info("导入成功");
          vm.exportStatus = false;
          vm.getClassTestStandardInfo(vm.classTestId);
        } else {
          vm.$Message.info("数据有误，导入失败");
        }
      } else {
        vm.$Message.info("导入失败，请稍后再试");
      }
    },
    handleFormatError(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "格式错误",
        desc: "该文件格式错误，请检查后重试"
      });
    },
    handleMaxSize(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "文件超大",
        desc: "该文件超大了"
      });
    },
    handleBeforeUpload(file) {
      var vm = this;
      vm.exportStatus = true;
      return true;
    }
  },
  mounted() {
    var vm = this;
    vm.updateUrl =this.$axios.defaults.baseURL + "/v1/exam/file/upload/addTaskInfo?token=" +sessionStorage.getItem("token")+"&examItemId=";
    let height = (document.body.offsetHeight - 300) / 2;
    vm.classTestId = sessionStorage.getItem(
      "examItemManage-examStandardDetail-classTestId"
    );
    if (sessionStorage.getItem("examItemManage-examStandardDetail-classTestId")) {
      vm.getClassTestStandardInfo(sessionStorage.getItem("examItemManage-examStandardDetail-classTestId"));
    }
    vm.getExamItemList();
  },
  destroyed() {
    var vm = this;
  }
};
</script>