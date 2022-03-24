<style>
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">考试项目</h2>
    </div>
    <div>
      <Form ref="unirunInfo"  :label-width="180">
        <Card>
          <div>
            <h4 style="margin-left:20px;margin-top:20px;">健康知识：</h4>
            <p style="margin-left:20px;margin-top:20px;">
              <span>男生：</span>
              <span
                style="margin-left:20px;"
                v-for="item in testClassList"
                v-if="item.gender == 1 && item.classTestType==1"
              >{{item.classTestName}}</span>
            </p>
            <p style="margin-left:20px;margin-top:20px;">
              <span>女生：</span>
              <span
                style="margin-left:20px;"
                v-for="item in testClassList"
                v-if="item.gender == 2 && item.classTestType==1"
              >{{item.classTestName}}</span>
            </p>
          </div>
        </Card>

        <Card style="margin-top:20px;">
          <div>
            <h4 style="margin-left:20px;">运动技能：</h4>
            <p style="margin-left:20px;margin-top:20px;">
              <span>男生：</span>
              <span
                style="margin-left:20px;"
                v-for="item in testClassList"
                v-if="item.gender == 1 && item.classTestType==2"
              >{{item.classTestName}}</span>
            </p>
            <p style="margin-left:20px;margin-top:20px;">
              <span>女生：</span>
              <span
                style="margin-left:20px;"
                v-for="item in testClassList"
                v-if="item.gender == 2 && item.classTestType==2"
              >{{item.classTestName}}</span>
            </p>
          </div>
        </Card>
        <Row>
          <div style="margin-top:10px;padding-left:46%">
            <Button style="float:left;width:100px" @click="goback" type="success">返回</Button>
          </div>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  name: "organInfo",
  data() {
    return {
      testClassList: [],
      classId: ""
    };
  },
  methods: {
    getClassTestClassInfo(classId) {
      var vm = this;
      this.$axios
        .get("/v1/examtest/getClassTestClassInfo?classId=" + classId)
        .then(function(response) {
          let detailInfo = response.data.response;
          vm.testClassList = detailInfo ? detailInfo : [];
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.classId = sessionStorage.getItem("sportsClass-classTestInfo-classId");
    vm.getClassTestClassInfo(
      sessionStorage.getItem("sportsClass-classTestInfo-classId")
    );
  }
};
</script>