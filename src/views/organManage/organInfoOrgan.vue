<style>
    
</style>

<template>
<div>
    <div>
        <h1>机构首页</h1>
    </div>
    <div style="margin-top:15px;">
            <Card>
                <Form ref="schoolData" :model="schoolData" :label-width="120">
                    <FormItem label="机构名称：">
                        <Row> 
                            <Col span="6"> 
                            <Label>{{schoolData.name}}</Label>
                            </Col> 
                        </Row> 
                    </FormItem>  
                    <FormItem label="机构类型：">
                        <Row> 
                            <Col span="12"> 
                            <Label>{{schoolData.schoolTypeName}}</Label>
                            </Col>
                        </Row> 
                    </FormItem>                                                                         
                    <FormItem label="机构地址：">
                        <Row>
                        <Col> 
                        <Select v-model="addrProvinceId" style="width:150px">
                            <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                        </Select>
                        <Select v-model="addrCityId" style="width:150px">
                            <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                        </Select>
                        <Select v-model="addrCountryId" style="width:150px">
                            <Option v-for="item in countyList" :value="item.countyId" :key="item.countyId">{{ item.countyName }}</Option>
                        </Select>
                        <Input v-model="schoolData.addrDetail" placeholder="请输入详细地址"  style="width:400px" :maxlength="255" /> 
                        </Col>
                        </Row>                            
                    </FormItem>
                    <FormItem label="联 系 人：">
                        <Row> 
                             <Col span="3"> 
                            <Input style="width:150px;" v-model="schoolData.dataCharge"  :maxlength="20" />
                            </Col>                              
                        </Row> 
                    </FormItem>  
                    <FormItem label="联系电话：">
                        <Row> 
                             <Col span="3"> 
                            <Input style="width:150px;" v-model="schoolData.phone"  :maxlength="20" />
                            </Col>                              
                        </Row> 
                    </FormItem>  
                    <FormItem label="联系邮箱：">
                        <Row> 
                             <Col span="3"> 
                            <Input style="width:150px;" v-model="schoolData.mail"  :maxlength="20" />
                            </Col>                              
                        </Row> 
                    </FormItem> 
                    <Row>
                        <div style="margin-top:10px;padding-left:46%">
                            <Button  style="float:left;width:100px" @click="saveOrUpdateSchool"  type="success">保存</Button>
                        </div>    
                    </Row>                                                                                                        
            </Form>
        </Card>
    </div>
</div>
</template>

<script>

import md5 from 'js-md5';

export default {
    name: 'organInfo'
    ,data(){
        return {           
                  schoolData:{
                             schoolId:'',
                       experimentType:'',                      
                           schoolType:'',
                        schoolTypeName:'',
                                 name:'',                                
                           schoolCode:'',
                           postalCode:'',
                            principal:'',
                        vicePrincipal:'',
                       dataDepartment:'',
                           dataCharge:'',
                                phone:'',
                                 mail:''
                            },
              provinceList:[],
                  cityList:[],
                countyList:[],
            addrProvinceId:'',
                addrCityId:'',
             addrCountryId:'',
  /***************** 管理员选择查询-start*************************/ 
          showAdminModel:false,
          modelAdminButOk:true,
        modelAdminLoading:true,
                teacherId:'',
              oldPassWord:'',
              newPassWord:'',
           newResPassWord:'',
        }
    }
    ,methods:{
      /*************** 管理员选择-start********************/
       showCollegeInfo(collegeId,collegeName){
           this.showAdminModel=true;
           this.collegeName=collegeName;
           if(collegeId != null && collegeId != 'undefined' && collegeId > 0){
                this.collegeId=collegeId;
           }else{
               this.collegeId="";
           }
       },
       /*************** 管理员选择-end********************/  
            getSchoolData(schoolId){//
               this.$axios.get("/v1/school/getSchoolDetail?schoolId="+schoolId).then(res => {
                        if(res.data.code==10000){
                            let data=res.data.response;
                            this.schoolData=data; 
                            if(this.schoolData.schoolType==1){
                                this.schoolData.schoolTypeName="幼儿园";
                            }else if(this.schoolData.schoolType==2){
                                this.schoolData.schoolTypeName="小学";
                            }else if(this.schoolData.schoolType==3){
                                this.schoolData.schoolTypeName="初中";
                            }else if(this.schoolData.schoolType==4){
                                this.schoolData.schoolTypeName="高中";
                            }else if(this.schoolData.schoolType==5){
                                this.schoolData.schoolTypeName="大学";
                            }else if(this.schoolData.schoolType==6){
                                this.schoolData.schoolTypeName="科研院";
                            }
                            this.addrProvinceId=data.addrProvinceId;
                            this.addrCityId=data.addrCityId;
                            this.addrCountryId= data.addrCountryId;      
                        }else{
                            if (res.data.code > 39999) {
                            this.$Message.info(res.data.msg);
                            }
                        }                          
                   });
            }
            ,getCollegeList(){ //获取学院信息        
                this.$axios.get("/v1/school/getCollegeForManage?schoolId="+sessionStorage.getItem('schoolId')).then(res => {
                    this.resultData=res.data.response;
                 });
            }
            ,getProvinceList(){ //获取省信息        
                this.$axios.get("/v1/region/get/allProvinceInfo").then(res => {
                    this.provinceList=res.data.response;
                 });
            }
            ,getCityList(newVal,oldVal){ //根据省iD获取市信息
                if(newVal !=oldVal){
                    if(newVal==''){
                        this.cityList=[];
                    }else{
                        this.$axios.get("/v1/region/get/allCityInfoByProvinceId?provinceId="+newVal).then(res => {
                          this.cityList=res.data.response;
                        });
                    }               
                }
            } 
            ,getCountyList(newVal,oldVal){ //根据市iD获取区/县信息
                if(newVal !=oldVal){
                    if(newVal==''){
                        this.countyList=[];
                    }else{
                       this.$axios.get("/v1/region/get/allCountyInfoByCityId?cityId="+newVal).then(res => {
                          this.countyList=res.data.response;
                       });
                    }               
                }
            }
            ,saveOrUpdateSchool(){//保存处理                
                  var paramData=this.schoolData;               
                  if(this.addrProvinceId==''){
                      this.$Message.error("学校所属省不能为空！");
                      return false;
                  }
                  if(this.addrCityId==''){
                      this.$Message.error("学校所属市不能为空！");
                      return false;
                  }                  
                  if(this.addrCountryId==''){
                      this.$Message.error("学校所属区不能为空！");
                      return false;
                  }
                  if(paramData.addrDetail==''){
                      this.$Message.error("学校详细地址不能为空！");
                      return false;
                  }
                  paramData.addrProvinceId=this.addrProvinceId;
                  paramData.addrCityId=this.addrCityId;
                  paramData.addrCountryId=this.addrCountryId;
                //保存
               this.$axios.post("/v1/school/saveOrUpdateSchoolInfo",paramData).then(res => { 
                        if(res.data.code==10000){ 
                            this.$Message.info("保存成功！");     
                        }else{
                              this.$Message.info(res.data.msg);
                        }
                });
         
            }
                     
    }    
    ,mounted(){
         this.getProvinceList();
         this.getSchoolData(sessionStorage.getItem('schoolId'));
         this.teacherId=sessionStorage.getItem('teacherId');
    }
    ,watch: {
          addrProvinceId:'getCityList',
              addrCityId:'getCountyList'
    }   
};
</script>