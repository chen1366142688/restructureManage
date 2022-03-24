<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">基础数据报送</h2>
    </div>
    <div>
      <Card style="margin-top:20px;">
        <div style="font-size:18px;height:40px;">学校基础数据</div>
          <Form :label-width="50">
               <FormItem>
                <RadioGroup v-model="baseInfo.sportsClassStatus" style="width:100%">
                  <Row>
                    <Col span="3" style="text-align:right">
                      <Label>体育课是否开足：</Label>
                    </Col>
                    <Col span="1">
                      <Radio label="1">
                          <span>是</span>
                      </Radio>
                    </Col>
                    <Col span="1">
                      <Radio label="0">
                          <span>否</span>
                      </Radio>
                    </Col>
                  </Row>
                </RadioGroup>
              </FormItem>
               <FormItem>
                <RadioGroup v-model="baseInfo.sportsClassOneTime" style="width:100%">
                  <Row>
                    <Col span="3" style="text-align:right">
                      <Label>是否落实每天1小时体育课：</Label>
                    </Col>
                    <Col span="1">
                      <Radio label="1">
                          <span>是</span>
                      </Radio>
                    </Col>
                    <Col span="1">
                      <Radio label="0">
                          <span>否</span>
                      </Radio>
                    </Col>
                  </Row>
                </RadioGroup>
              </FormItem>
               <FormItem>
                <RadioGroup v-model="baseInfo.sportsBigClass" style="width:100%">
                  <Row>
                    <Col span="3" style="text-align:right">
                      <Label>是否组织大课间体育活动：</Label>
                    </Col>
                    <Col span="1">
                      <Radio label="1">
                          <span>是</span>
                      </Radio>
                    </Col>
                    <Col span="1">
                      <Radio label="0">
                          <span>否</span>
                      </Radio>
                    </Col>
                  </Row>
                </RadioGroup>
              </FormItem>
            </Form>
       
      </Card>
      <Card style="margin-top:20px;">
        <div style="font-size:18px;height:40px;">体育教师数据</div>
         <Form :label-width="50">
            <FormItem>
                <Row >
                  <Col span="3" style="text-align:right">
                    <Label >体育教师总数：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.teacherNum" placeholder="体育教师总数" :maxlength="20" style="width:200px"/>
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>专职体育教师数：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.fullTimeTeacherNum" placeholder="专职体育教师数" :maxlength="20" style="width:200px"/>
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>兼职体育教师数：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.partTimeTeacherNum" placeholder="兼职体育教师数" :maxlength="20" style="width:200px"/>
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>体育教师缺额数：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.lackTeacherNum" placeholder="体育教师缺额数" :maxlength="20" style="width:200px"/>
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>受训体育教师数：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.traineesTeacherNum" placeholder="受训体育教师数" :maxlength="20" style="width:200px"/>
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>受县级以上表彰体育教师数：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.praiseTeacherNum" placeholder="受县级以上表彰体育教师数" :maxlength="20" style="width:200px"/>
                  </Col>
                </Row>
            </FormItem>
        </Form>
      </Card>
       <Card style="margin-top:20px;">
        <div style="font-size:18px;height:40px;">学校场地数据</div>
        <Form :label-width="50">
          <FormItem>
              <Row>
                <Col span="3" style="text-align:right">
                  <Label>田径场数量：</Label>
                </Col>
              </Row>
              <Row >
                <Col span="3" style="text-align:right">
                  <Label>200米以下：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.athleticsNumTwo" placeholder="200米以下" :maxlength="20" style="width:200px"/>&nbsp;块
                </Col>
                  <Col span="3" style="text-align:right">
                  <Label>300米：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.athleticsNumThree" placeholder="300米" :maxlength="20" style="width:200px"/>&nbsp;块
                </Col>
              </Row>
              <Row >
                <Col span="3" style="text-align:right">
                  <Label>300米~400米：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.athleticsNumThreeFour" placeholder="300米~400米" :maxlength="20" style="width:200px"/>&nbsp;块
                </Col>
                  <Col span="3" style="text-align:right">
                  <Label>400米：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.athleticsNumFour" placeholder="400米" :maxlength="20" style="width:200px"/>&nbsp;块
                </Col>
              </Row>
          </FormItem>

          <FormItem>
              <Row>
                <Col span="3" style="text-align:right">
                  <Label>球场数量：</Label>
                </Col>
              </Row>
              <Row >
                <Col span="3" style="text-align:right">
                  <Label>篮球场：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.basketballNum" placeholder="篮球场" :maxlength="20" style="width:200px"/>&nbsp;块
                </Col>
                  <Col span="3" style="text-align:right">
                  <Label>排球场：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.volleyballNum" placeholder="排球场" :maxlength="20" style="width:200px"/>&nbsp;块
                </Col>
              </Row>
          </FormItem>

           <FormItem>
              <Row>
                <Col span="3" style="text-align:right">
                  <Label>体育馆：</Label>
                </Col>
              </Row>
              <Row >
                <Col span="3" style="text-align:right">
                  <Label>个数：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.gymNum" placeholder="个数" :maxlength="20" style="width:200px"/>&nbsp;个
                </Col>
                  <Col span="3" style="text-align:right">
                  <Label>面积：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.gymArea" placeholder="面积" :maxlength="20" style="width:200px"/>&nbsp;㎡
                </Col>
              </Row>
          </FormItem>

           <FormItem>
              <Row>
                <Col span="3" style="text-align:right">
                  <Label>游泳馆：</Label>
                </Col>
              </Row>
              <Row >
                <Col span="3" style="text-align:right">
                  <Label>个数：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.natatoriumNum" placeholder="个数" :maxlength="20" style="width:200px"/>&nbsp;个
                </Col>
                  <Col span="3" style="text-align:right">
                  <Label>面积：</Label>
                </Col>
                <Col span="4">
                    <Input v-model="baseInfo.natatoriumArea" placeholder="面积" :maxlength="20" style="width:200px"/>&nbsp;㎡
                </Col>
              </Row>
          </FormItem>

          <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>器械体操/游戏区域面积：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.gameArea" placeholder="器械体操/游戏区域面积" :maxlength="20" style="width:200px"/>&nbsp;㎡
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                  <Col span="3" style="text-align:right">
                    <Label>学生体质测试教室：</Label>
                  </Col>
                  <Col span="10">
                      <Input v-model="baseInfo.studentTestClassNum" placeholder="学生体质测试教室" :maxlength="20" style="width:200px"/>&nbsp;个
                  </Col>
                </Row>
            </FormItem>
              <FormItem>
                <RadioGroup v-model="baseInfo.sportsEquipment" style="width:100%">
                  <Row>
                    <Col span="3" style="text-align:right">
                      <Label>体育器材是否达标：</Label>
                    </Col>
                    <Col span="1">
                      <Radio label="1">
                          <span>是</span>
                      </Radio>
                    </Col>
                    <Col span="1">
                      <Radio label="0">
                          <span>否</span>
                      </Radio>
                    </Col>
                  </Row>
                </RadioGroup>
              </FormItem>
         </Form>
      </Card>
       
    </div>
    <Row type="flex" justify="center" style="padding:50px 0">
         <Button
                @click="addSemesterReportedBaseInfo"
                style=" margin-right:16px;"
                type="success"
        >报送</Button>
        <Button @click="pageToList" type="success">取消</Button>
      </Row>
  </div>
</template>
<script>
    export default {
        name: 'teacherList',
        data () {
            return {
              baseInfo:[],
              animal:null
            };
        },
        methods: {
            pageToList() {
            //返回
            this.$router.go(-1)
            },
            getSemesterReportedBaseInfo(){
              var vm=this;
              this.$axios.get('/v1/dataReport/getSemesterReportedBaseInfo?yearSemester='+sessionStorage.getItem("yearSemester")).then(res => {
                if (res.data.code == 10000) {
                  vm.baseInfo = res.data.response[0];
                  console.log(vm.baseInfo)
                }
              })

            },
            addSemesterReportedBaseInfo(){
              var str = /^(0|\+?[1-9][0-9]*)$/;;
              if(!str.test(this.baseInfo.teacherNum)){
                this.$Message.info("体育教师总数请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.fullTimeTeacherNum)){
                this.$Message.info("专职体育教师数请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.partTimeTeacherNum)){
                this.$Message.info("兼职体育教师数请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.lackTeacherNum)){
                this.$Message.info("体育教师缺额数请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.traineesTeacherNum)){
                this.$Message.info("受训体育教师数请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.praiseTeacherNum)){
                this.$Message.info("受县级以上表彰体育教师数请输入零或正整数！");
                return;
              }

              if(!str.test(this.baseInfo.athleticsNumTwo)){
                this.$Message.info("200米以下的田径场数量请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.athleticsNumThree)){
                this.$Message.info("300米的田径场数量请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.athleticsNumFour)){
                this.$Message.info("400米的田径场数量请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.athleticsNumThreeFour)){
                this.$Message.info("300米~400米的田径场数量请输入零或正整数！");
                return;
              }

               if(!str.test(this.baseInfo.basketballNum)){
                this.$Message.info("篮球场数量请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.volleyballNum)){
                this.$Message.info("排球场数量请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.gymNum)){
                this.$Message.info("体育馆数量请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.gymArea)){
                this.$Message.info("体育馆面积请输入零或正整数！");
                return;
              }

              if(!str.test(this.baseInfo.natatoriumNum)){
                this.$Message.info("游泳馆个数请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.natatoriumArea)){
                this.$Message.info("游泳馆面积请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.gameArea)){
                this.$Message.info("器械体操/游戏区域面积请输入零或正整数！");
                return;
              }
              if(!str.test(this.baseInfo.studentTestClassNum)){
                this.$Message.info("学生体质测试教室请输入零或正整数！");
                return;
              }


              var vm=this;
               this.$axios
                .post("/v1/dataReport/addSemesterReportedBaseInfo", this.baseInfo)
                .then(res => {
                  if (res.data.code == 10000) {
                    this.$Message.info("上报成功！");
                    vm.pageToList() ;
                  } else {
                    if (res.data.code > 39999) {
                      this.$Message.info(res.data.msg);
                    }
                  }
                });
            },

        },
        watch: {
        },
        created () {
        },
        mounted () {
            var vm = this;
            vm. getSemesterReportedBaseInfo();
           
           
        }
    };

</script>
