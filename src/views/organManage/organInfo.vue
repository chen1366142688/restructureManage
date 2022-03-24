<style scoped>
.organInfo .ivu-form .ivu-form-item-label {
  font-size: 15px;
}
.organInfo .ivu-radio-wrapper {
  font-size: 15px;
}
.organInfo .ivu-form-item-content {
  font-size: 15px;
}
.organInfo .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size: 15px;
}
.organInfo .ivu-input {
  font-size: 15px;
}
.ivu-form-item{
  margin-bottom:16px !important;
}
</style>

<style>
.class-photo-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 115px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.class-photo-list img {
  width: 100%;
  height: 100%;
}
.class-photo-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.class-photo-list:hover .class-photo-list-cover {
  display: block;
}
.class-photo-list-cover i {
  color: #fff;
  font-size: 25px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

<template>
  <div class="organInfo" style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">学校信息</h2>
    </div>
    <div>
      <Form ref="schoolData" :model="schoolData">
        <Card>
          <FormItem label="学校名称：">
            <Row>
              <Col span="6">
                <Label>{{ schoolData.name }}</Label>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="学段类型：">
            <Row>
              <Col span="12">
                <Label>{{ schoolData.schoolTypeName }}</Label>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="学校类型：">
            <Row>
              <Col span="12">
                <Label>{{ schoolData.schoolTypeBaseName }}</Label>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="学校地址：">
            <Row>
              <Col :lg="{ span: 4 }">
                <Select v-model="addrProvinceId">
                  <Option
                    v-for="item in provinceList"
                    :value="item.provinceId"
                    :key="item.provinceId"
                    >{{ item.provinceName }}</Option
                  >
                </Select>
              </Col>
              <Col :lg="{ span: 4, offset: 1 }">
                <Select v-model="addrCityId">
                  <Option
                    v-for="item in cityList"
                    :value="item.cityId"
                    :key="item.cityId"
                    >{{ item.cityName }}</Option
                  >
                </Select>
              </Col>
              <Col :lg="{ span: 4, offset: 1 }">
                <Select v-model="addrCountryId">
                  <Option
                    v-for="item in countyList"
                    :value="item.countyId"
                    :key="item.countyId"
                    >{{ item.countyName }}</Option
                  >
                </Select>
              </Col>
              <Col :lg="{ span: 4, offset: 1 }">
                <Input
                  v-model="schoolData.addrDetail"
                  placeholder="请输入详细地址"
                  :maxlength="255"
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem label="联 系 人：">
            <Row type="flex">
              <Col :lg="{ span: 4 }">
                <Input v-model="schoolData.dataCharge" :maxlength="20" />
              </Col>
              <Col
                :lg="{ span: 8, offset: 1 }"
                :xl="{ span: 8, offset: 1 }"
                :xxl="{ span: 4, offset: 1 }"
              >
                <Row>
                  <Col span="8">
                    <span>联系电话：</span>
                  </Col>
                  <Col span="16">
                    <Input v-model="schoolData.phone" :maxlength="20" />
                  </Col>
                </Row>
              </Col>
              <Col
                :lg="{ span: 8, offset: 1 }"
                :xl="{ span: 8, offset: 1 }"
                :xxl="{ span: 4, offset: 1 }"
              >
                <Row>
                  <Col span="8">
                    <span>联系邮箱：</span>
                  </Col>
                  <Col span="16">
                    <Input v-model="schoolData.mail" :maxlength="20" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="校长签名：">
            <Row>
              <div
                class="class-photo-list"
                v-if="imgUrl != ''"
                :style="imgStyle"
              >
                <img style="width: 120px; height: 120px" :src="imgUrl" />
                <div class="class-photo-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView(imgUrl)"
                  ></Icon>
                </div>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="uploadFileSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="80048"
                :action="updateUrl"
                name="muFiles"
                type="drag"
                style="display: inline-block; width: 100px"
              >
                <div style="width: 100px; height: 100px; line-height: 115px">
                  <Icon type="ios-cloud-upload-outline" size="35"></Icon
                  >上传图片
                </div>
              </Upload>
            </Row>
          </FormItem>
          <!-- 不是幼儿园并且不是昆明 -->
          <div
            v-for="(item, index) in campusList"
            :key="index"
            v-if="campusList && schoolType != '1' && schoolDistrict != '2000'"
            style="margin-top: 30px; font-size: 15px"
          >
            <Row>
              <Col span="3">校区序号：&nbsp;&nbsp;{{ item.campusCode }}</Col>
              <Col span="16">校区名称：{{ item.campusName }}</Col>
            </Row>
            <Row style="margin-top: 15px">
              <Col span="6">
                <Row>
                  <Col span="10">
                    <span style="font-size: 15px">学校地址：</span>
                  </Col>
                  <Col span="14">
                    <Input
                      v-model="item.provinceName"
                      disabled
                      :maxlength="20"
                    />
                  </Col>
                </Row>
              </Col>
              <Col span="3" offset="1">
                <Input v-model="item.cityName" disabled :maxlength="20" />
              </Col>
              <Col span="3" offset="1">
                <Input v-model="item.countyName" disabled :maxlength="20" />
              </Col>
              <Col span="4" offset="1">
                <Input v-model="item.addrDetail" disabled :maxlength="20" />
              </Col>
              <Col span="4" offset="1">
                <Button
                  @click="updateCampusPre(index)"
                  type="success"
                  >编辑</Button
                >
              </Col>
            </Row>
          </div>
        </Card>
        <Row type="flex" justify="center">
          <Col span="3" v-if="schoolType != '1' && schoolDistrict != '2000'">
            <Button
              @click="addCampusPre"
              icon="plus"
              type="success"
              class="m30"
              >添加校区</Button
            >
          </Col>
          <Col span="3">
            <Button
              @click="saveOrUpdateSchool"
              type="success"
              class="m30"
              >保存</Button
            >
          </Col>
        </Row>
      </Form>
    </div>
    <Modal
      v-model="showCampusAdd"
      title="新增/修改校区"
      @on-ok="campusAdd"
      @on-cancel="campusCancle"
      :mask-closable="false"
      :loading="campusLoading"
      width="550px"
    >
      <div style="margin-top: 10px">
        <Row>
          <Col span="4">
            <span>校区名称：</span>
          </Col>
          <Col span="18">
            <Input
              v-model="campusName"
              placeholder="校区名称"
              :maxlength="50"
            />
          </Col>
        </Row>
        <br />
        <Row :gutter="16">
          <Col span="4">
            <span>校区地址：</span>
          </Col>
          <Col span="6">
            <Select v-model="addrProvinceId1">
              <Option
                v-for="item in provinceList1"
                :value="item.provinceId"
                :key="item.provinceId"
                >{{ item.provinceName }}</Option
              >
            </Select>
          </Col>
          <Col span="6">
            <Select v-model="addrCityId1">
              <Option
                v-for="item in cityList1"
                :value="item.cityId"
                :key="item.cityId"
                >{{ item.cityName }}</Option
              >
            </Select>
          </Col>
          <Col span="6">
            <Select v-model="addrCountryId1">
              <Option
                v-for="item in countyList1"
                :value="item.countyId"
                :key="item.countyId"
                >{{ item.countyName }}</Option
              >
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="4">
            <span>详细地址：</span>
          </Col>
          <Col span="18">
            <Input
              v-model="campusAddr"
              placeholder="请输入详细地址"
              :maxlength="50"
            />
          </Col>
        </Row>
      </div>
    </Modal>
    <Modal title="预览图片" cancel-text="" v-model="previewStatus">
      <img
        :src="previewUrl"
        v-if="previewStatus"
        style="width: 490px; height: 400px"
      />
    </Modal>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  name: "organInfo",
  data() {
    return {
      schoolType: "",
      updateUrl: "",
      imgUrl: "",
      previewUrl: "",
      previewStatus: false,
      imgStyle: {
        width: "120px",
        height: "120px",
      },
      schoolData: {
        schoolId: "",
        experimentType: "",
        schoolType: "",
        schoolTypeName: "",
        schoolBaseType: "",
        schoolTypeBaseName: "",
        name: "",
        schoolCode: "",
        postalCode: "",
        principal: "",
        vicePrincipal: "",
        dataDepartment: "",
        dataCharge: "",
        phone: "",
        mail: "",
      },
      provinceList: [],
      cityList: [],
      countyList: [],
      addrProvinceId: "",
      addrCityId: "",
      addrCountryId: "",
      /***************** 管理员选择查询-start*************************/

      showAdminModel: false,
      modelAdminButOk: true,
      modelAdminLoading: true,
      teacherId: "",
      oldPassWord: "",
      newPassWord: "",
      newResPassWord: "",

      showCampusAdd: false,
      campusName: "",
      campusAddr: "",
      campusLong: "",
      campusLat: "",
      campusCode: "",
      campusLoading: false,
      addOrUpdate: "1",
      campusId: "",
      campusIndex: "",
      provinceList1: [],
      cityList1: [],
      countyList1: [],
      addrProvinceId1: "",
      addrCityId1: "",
      addrCountryId1: "",
      campusList: [],
      /**************昆明学校区分***************/
      schoolDistrict: "",
    };
  },
  methods: {
    uploadFileSuccess(response, file, fileList) {
      //上传图片
      this.imgUrl = response.response[0];
    },
    handleView(url) {
      //预览图片
      this.previewUrl = url;
      this.previewStatus = true;
    },
    /*************** 管理员选择-start********************/
    showCollegeInfo(collegeId, collegeName) {
      this.showAdminModel = true;
      this.collegeName = collegeName;
      if (collegeId != null && collegeId != "undefined" && collegeId > 0) {
        this.collegeId = collegeId;
      } else {
        this.collegeId = "";
      }
    },
    /*************** 管理员选择-end********************/
    campusAdd() {
      var vm = this;
      if (!vm.campusName) {
        this.$Message.error("请填写校区名称");
        return false;
      }
      if (!vm.addrProvinceId1) {
        this.$Message.error("请选择校区省份");
        return false;
      }
      if (!vm.addrCityId1) {
        this.$Message.error("请选择校区城市");
        return false;
      }
      if (!vm.addrCountryId1) {
        this.$Message.error("请选择校区区县");
        return false;
      }
      if (vm.campusAddr) {
        console.log("请填写校区详细地址");
        this.$Message.error("请填写校区详细地址");
        return false;
      } else {
        console.log("vm.campusAddr", !vm.campusAddr);
        console.log("居然是OK请填写校区详细地址");
      }
      return;
      vm.showCampusAdd = false;

      let provinceName = "";
      let cityName = "";
      let countyName = "";

      for (var i = 0; i < vm.provinceList1.length; i++) {
        if (vm.addrProvinceId1 == vm.provinceList1[i].provinceId) {
          provinceName = vm.provinceList1[i].provinceName;
        }
      }
      for (var i = 0; i < vm.cityList1.length; i++) {
        if (vm.addrCityId1 == vm.cityList1[i].cityId) {
          cityName = vm.cityList1[i].cityName;
        }
      }
      for (var i = 0; i < vm.countyList1.length; i++) {
        if (vm.addrCountryId1 == vm.countyList1[i].countyId) {
          countyName = vm.countyList1[i].countyName;
        }
      }

      if (vm.addOrUpdate == "1") {
        let campus = {
          addrDetail: vm.campusAddr,
          campusName: vm.campusName,
          cityId: vm.addrCityId1,
          cityName: cityName,
          countyId: vm.addrCountryId1,
          countyName: countyName,
          latitude: vm.campusLat,
          longitude: vm.campusLong,
          provinceName: provinceName,
          provinceId: vm.addrProvinceId1,
          schoolId: vm.schoolId,
          campusCode: "",
          campusId: "",
        };
        vm.campusList.push(campus);
      } else {
        let older = vm.campusList[vm.campusIndex];
        let campus = {
          addrDetail: vm.campusAddr,
          campusName: vm.campusName,
          cityId: vm.addrCityId1,
          cityName: cityName,
          countyId: vm.addrCountryId1,
          countyName: countyName,
          latitude: vm.campusLat,
          longitude: vm.campusLong,
          provinceName: provinceName,
          provinceId: vm.addrProvinceId1,
          schoolId: vm.schoolId,
          campusCode: older.campusCode ? older.campusCode : "",
          campusId: older.campusId ? older.campusId : "",
        };

        this.$set(vm.campusList, vm.campusIndex, campus);
        // this.$forceUpdate();
      }
    },
    campusCancle() {
      var vm = this;
    },
    addCampusPre() {
      this.addOrUpdate = "1";
      this.campusId = "";
      this.campusCode = "";
      this.showCampusAdd = true;
      this.campusName = "";
      this.addrProvinceId1 = "";
      this.addrCityId1 = "";
      this.addrCountryId1 = "";
      this.campusAddr = "";
    },
    updateCampusPre(index) {
      var vm = this;
      vm.addOrUpdate = "0";
      vm.campusIndex = index;
      if (vm.campusList.length > 0) {
        let older = vm.campusList[index];
        vm.campusAddr = older.addrDetail;
        vm.campusName = older.campusName;
        vm.addrCityId1 = older.cityId;
        vm.addrCountryId1 = older.countyId;
        vm.campusLat = older.latitude;
        vm.campusLong = older.longitude;
        vm.addrProvinceId1 = older.provinceId;
        vm.schoolId = older.schoolId;
        vm.campusCode = older.campusCode;
        vm.campusId = older.campusId;
      }

      vm.showCampusAdd = true;
    },

    getSchoolData(schoolId) {
      //
      this.$axios
        .get("/v1/school/getSchoolDetail?schoolId=" + schoolId)
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.schoolData = data;
            if (this.schoolData.schoolType == 1) {
              this.schoolData.schoolTypeName = "幼儿园";
            } else if (this.schoolData.schoolType == 2) {
              this.schoolData.schoolTypeName = "小学";
            } else if (this.schoolData.schoolType == 3) {
              this.schoolData.schoolTypeName = "初中";
            } else if (this.schoolData.schoolType == 4) {
              this.schoolData.schoolTypeName = "高中";
            } else if (this.schoolData.schoolType == 5) {
              this.schoolData.schoolTypeName = "大学";
            }
            if (this.schoolData.schoolBaseType == 1) {
              this.schoolData.schoolTypeBaseName = "幼儿园";
            } else if (this.schoolData.schoolBaseType == 2) {
              this.schoolData.schoolTypeBaseName = "小学";
            } else if (this.schoolData.schoolBaseType == 3) {
              this.schoolData.schoolTypeBaseName = "初中";
            } else if (this.schoolData.schoolBaseType == 4) {
              this.schoolData.schoolTypeBaseName = "高中";
            } else if (this.schoolData.schoolBaseType == 5) {
              this.schoolData.schoolTypeBaseName = "大学";
            } else if (this.schoolData.schoolBaseType == 6) {
              this.schoolData.schoolTypeBaseName = "九年一贯制";
            } else if (this.schoolData.schoolBaseType == 7) {
              this.schoolData.schoolTypeBaseName = "十二年一贯制";
            } else if (this.schoolData.schoolBaseType == 8) {
              this.schoolData.schoolTypeBaseName = "完全中学";
            } else if (this.schoolData.schoolBaseType == 9) {
              this.schoolData.schoolTypeBaseName = "中职";
            }

            this.addrProvinceId = data.addrProvinceId;
            this.addrCityId = data.addrCityId;
            this.addrCountryId = data.addrCountryId;
            this.imgUrl = data.headmasterSignature
              ? data.headmasterSignature
              : "";
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getCollegeList() {
      //获取学院信息
      this.$axios
        .get(
          "/v1/school/getCollegeForManage?schoolId=" +
            sessionStorage.getItem("schoolId")
        )
        .then((res) => {
          this.resultData = res.data.response;
        });
    },
    getProvinceList() {
      //获取省信息
      this.$axios.get("/v1/region/get/allProvinceInfo").then((res) => {
        this.provinceList = res.data.response;
        this.provinceList1 = res.data.response;
      });
    },
    getCityList(newVal, oldVal) {
      //根据省iD获取市信息
      if (newVal != oldVal) {
        if (newVal == "") {
          this.cityList = [];
        } else {
          this.$axios
            .get("/v1/region/get/allCityInfoByProvinceId?provinceId=" + newVal)
            .then((res) => {
              this.cityList = res.data.response;
            });
        }
      }
    },
    getCountyList(newVal, oldVal) {
      //根据市iD获取区/县信息
      if (newVal != oldVal) {
        if (newVal == "") {
          this.countyList = [];
        } else {
          this.$axios
            .get("/v1/region/get/allCountyInfoByCityId?cityId=" + newVal)
            .then((res) => {
              this.countyList = res.data.response;
            });
        }
      }
    },
    getCityList1(newVal, oldVal) {
      //根据省iD获取市信息
      if (newVal != oldVal) {
        if (newVal == "") {
          this.cityList1 = [];
        } else {
          this.$axios
            .get("/v1/region/get/allCityInfoByProvinceId?provinceId=" + newVal)
            .then((res) => {
              this.cityList1 = res.data.response;
            });
        }
      }
    },
    getCountyList1(newVal, oldVal) {
      //根据市iD获取区/县信息
      if (newVal != oldVal) {
        if (newVal == "") {
          this.countyList1 = [];
        } else {
          this.$axios
            .get("/v1/region/get/allCountyInfoByCityId?cityId=" + newVal)
            .then((res) => {
              this.countyList1 = res.data.response;
            });
        }
      }
    },
    saveOrUpdateSchool() {
      //保存处理
      var paramData = this.schoolData;
      if (this.addrProvinceId == "") {
        this.$Message.error("学校所属省不能为空！");
        return false;
      }
      if (this.addrCityId == "") {
        this.$Message.error("学校所属市不能为空！");
        return false;
      }
      if (this.addrCountryId == "") {
        this.$Message.error("学校所属区不能为空！");
        return false;
      }
      if (paramData.addrDetail == "") {
        this.$Message.error("学校详细地址不能为空！");
        return false;
      }
      if (!this.imgUrl) {
        this.$Message.error("请上传校长签名！");
        return false;
      }
      paramData.addrProvinceId = this.addrProvinceId;
      paramData.addrCityId = this.addrCityId;
      paramData.addrCountryId = this.addrCountryId;
      paramData.headmasterSignature = this.imgUrl;
      //保存
      let data = {
        schoolDO: paramData,
        campusVOS: this.campusList,
      };
      this.$axios.post("/v1/school/upsertSchoolInfo", data).then((res) => {
        if (res.data.code == 10000) {
          this.$Message.info("保存成功！");
          this.getSchoolData(sessionStorage.getItem("schoolId"));
          this.getSchoolAllCampus(sessionStorage.getItem("schoolId"));
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    getSchoolAllCampus(schoolId) {
      var vm = this;
      this.$axios
        .get("/v1/sports/class/getSchoolAllCampus?schoolId=" + schoolId)
        .then(function (response) {
          vm.campusList = response.data.response;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
  mounted() {
    var vm = this;
    vm.schoolType = sessionStorage.getItem("schoolType");
    vm.updateUrl =
      this.$axios.defaults.baseURL + "/v1/file/upload?type=manage_img";
    vm.schoolDistrict = sessionStorage.getItem("schoolDistrict");
    this.getProvinceList();
    this.getSchoolData(sessionStorage.getItem("schoolId"));
    this.teacherId = sessionStorage.getItem("teacherId");
    this.getSchoolAllCampus(sessionStorage.getItem("schoolId"));
  },
  watch: {
    addrProvinceId: "getCityList",
    addrCityId: "getCountyList",
    addrProvinceId1: "getCityList1",
    addrCityId1: "getCountyList1",
  },
};
</script>
