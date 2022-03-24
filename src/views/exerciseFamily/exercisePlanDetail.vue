<style>
    .class-photo-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .class-photo-list img{
        width: 100%;
        height: 100%;      
    }
    .class-photo-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .class-photo-list:hover .class-photo-list-cover{
        display: block;
    }
    .class-photo-list-cover i{
        color: #fff;
        font-size: 25px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">计划详情</h2>
    </div>
              <Card style="height:750px;overflow-y:scroll">
                  <Form ref="planData" :model="planData" :label-width="120">
                        <FormItem label="计划名称">
                          <Row> 
                             <Col span="24"> 
                             <Input :disabled="disabledTf"  v-model="planData.planName" :maxlength="255" style="width: 300px" placeholder="请输入计划名称"/>
                             </Col>  
                          </Row> 
                        </FormItem>
                        <FormItem label="适用范围">
                          <Row>
                            <Col> 
                            <Select :disabled="disabledTf"  v-model="planData.sex" style="width:150px" placeholder="性别">
                                <Option :disabled="disabledTf"  v-for="item in sexList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                            </Select>
                            <Label > 年龄：</Label>
                            <Select :disabled="disabledTf"  v-model="planData.ageStart" style="width:100px" placeholder="年龄开始">
                                <Option :disabled="disabledTf"  v-for="item in ageList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Label > 至</Label>
                            <Select :disabled="disabledTf"  v-model="planData.ageEnd" style="width:100px" placeholder="年龄结束">
                                <Option :disabled="disabledTf"  v-for="item in ageList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Label > 岁</Label>
                            </Col>
                          </Row>                            
                        </FormItem>
                        <FormItem label="训练类型">
                          <Row> 
                             <Col span="4"> 
                                <Select :disabled="disabledTf" v-model="planData.itemOrientationCode" placeholder="请选择训练类型" style="width: 150px" clearable>
                                <Option v-for="item in orientationList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                                </Select>
                             </Col>   
                          </Row> 
                        </FormItem>
                        <FormItem label="训练难度">
                          <Row> 
                             <Col span="4"> 
                                <Select :disabled="disabledTf" v-model="planData.itemLevelCode" placeholder="请选择训练难度" style="width: 150px" clearable>
                                <Option v-for="item in levelList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                                </Select>
                             </Col>   
                          </Row> 
                        </FormItem> 
                        <FormItem label="训练器械">
                          <Row> 
                             <Col span="10"> 
                                <Select :disabled="disabledTf" v-model="toolTypeId" placeholder="请选择训练类型" style="width: 150px">
                                <Option v-for="item in toolTypeList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                                </Select>
                                <Select :disabled="disabledTf"  v-model="toolId" v-if="toolTypeId!=1" placeholder="请选择训练器械" clearable style="width: 150px">
                                <Option v-for="item in toolList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                                </Select>
                             </Col>   
                          </Row> 
                        </FormItem>
                        <FormItem label="训练时长">
                          <Row> 
                             <Col span="24"> 
                               <Input :disabled="disabledTf"  v-model="planData.planDuration" :maxlength="255" style="width: 150px" placeholder="请输入训练时长" /> （分钟）
                             </Col>   
                          </Row> 
                        </FormItem>
                        <FormItem label="单组时间">
                          <Row> 
                             <Col span="24"> 
                               <Input :disabled="disabledTf"  v-model="planData.playGifTime" :maxlength="255" style="width: 150px" placeholder="GIF单次播放时长" /> 秒（GIF单次播放时长）
                             </Col>   
                          </Row> 
                        </FormItem>    
                        <FormItem label="单组数量">
                          <Row> 
                             <Col span="24"> 
                               <Input :disabled="disabledTf" v-model="planData.eachGroupNum" :maxlength="255" style="width: 150px" placeholder="单组数量" /> 
                               <Select :disabled="disabledTf" placeholder="请选择单位" v-model="planData.eachGroupNumUnit" style="width:200px">
                                    <Option
                                    v-for="item in unitList"
                                    :value="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</Option>
                                </Select>
                             </Col>   
                          </Row> 
                        </FormItem>                     
                        <FormItem label="播放节点">
                            <Row> 
                                <Col span="4" offset="2"> 
                                <!-- <Button class="add-button" v-on:click="addPlaySpot()" type="success" icon="plus" style="background-color:#00c693;width: 300px;margin-top: 10px;"  >添加节点</Button> -->
                                </Col>
                            </Row> 
                           <Row v-for="(item,index) in planData.planPlaySpot" :key="index" style="height:250px;">                            
                               <Row v-if="index==0" style="margin-top: 5px;"> 
                                  <Col span="2"> 
                                   <Label>节点时间：</Label>
                                  </Col>
                                  <Col span="4"> 
                                   <Label>初始节点</Label>
                                  </Col>                                                              
                                </Row>
                                <Row v-else style="margin-top: 5px;"> 
                                  <Col span="2"> 
                                   <Label>节点时间</Label>
                                  </Col>                                 
                                  <Col span="4"> 
                                    第 <Input :disabled="disabledTf"  v-model="item.playTime" style="width: 150px" placeholder="节点开始时间" :maxlength="100"/> 秒开始
                                  </Col>
                                  <Col span="5"> 
                                   <!-- <Button :disabled="disabledTf"   v-on:click="delPlaySpot(index)" type="success" size="small"  style="background-color:#00c693;">删除节点</Button> -->
                                  </Col>                              
                                </Row>                               
                                <Row style="margin-top: 5px;"> 
                                  <Col span="2"> 
                                   <Label>节点音频</Label>
                                  </Col>                                
                                <Col span="6"> 
                                  <Select :disabled="disabledTf"  v-model="item.musicId" style="width:300px" @on-change="musicChange" placeholder="请选择音频">
                                     <Option  :disabled="disabledTf"  v-for="item in musicMaterialList" :value="item.materialId"  :key="item.materialId">{{ item.materialName }}</Option>
                                  </Select>
                                </Col>
                                 <Col span="6" offset="1"> 
                                 <audio :src="item.musicUrl" v-if="item.musicUrl!=''" style="width: 300px;" controls="controls"></audio>
                                 </Col>
                               </Row> 
                                <Row style="margin-top: 5px;"> 
                                  <Col span="2"> 
                                   <Label>节点GIF</Label>
                                  </Col>                                
                                <Col span="6"> 
                                  <Select :disabled="disabledTf"  v-model="item.gifId" style="width:300px"  @on-change="gifChange" placeholder="请选择GIF">
                                     <Option v-for="item in gifMaterialList" :value="item.materialId"  :key="item.materialId">{{ item.materialName }}</Option>
                                  </Select>                                
                                </Col>
                                <Col span="6" offset="1"> 
                                 <img :src="item.gifUrl" v-if="item.gifUrl!=''" style="width: 200px;height:100px"/> 
                                </Col>
                               </Row>                                                         
                          </Row>
                        </FormItem>
                        <FormItem label="一句话简介">
                          <Row> 
                             <Col span="24"> 
                               <Input :disabled="disabledTf"  v-model="planData.detailIntroduction" :maxlength="255" style="width: 600px" placeholder="请输入一句话简介"/>
                             </Col>   
                          </Row> 
                        </FormItem>
                         <FormItem label="计划简介">
                          <Row> 
                             <Col span="24"> 
                              <Input  :disabled="disabledTf" v-model="planData.detailPresentation" placeholder="请输入计划简介" style="width: 600px" type="textarea" :maxlength="500" />
                             </Col>
                          </Row> 
                        </FormItem>  
                         <FormItem label="适用人群">
                          <Row> 
                             <Col span="24"> 
                              <Input :disabled="disabledTf" v-model="planData.detailFitThrong" placeholder="请输入适用人群" style="width: 600px" type="textarea" :maxlength="500" />
                             </Col>
                          </Row> 
                        </FormItem> 
                         <FormItem label="禁忌人群">
                          <Row> 
                             <Col span="24"> 
                              <Input :disabled="disabledTf" v-model="planData.detailTabooThrong" placeholder="禁忌人群" style="width: 600px" type="textarea" :maxlength="500" />
                             </Col>
                          </Row> 
                        </FormItem>                                                                       
                         <FormItem label="练前准备">
                          <Row> 
                             <Col span="24"> 
                              <Input :disabled="disabledTf" v-model="planData.detailPrepare" placeholder="请输入练前准备" style="width: 600px" type="textarea" :maxlength="500" />
                             </Col>
                          </Row> 
                        </FormItem>  
                        <FormItem label="训练视频">
                          <Row> 
                             <Col span="10"> 
                              <video :src="planData.teachingVideo" v-if="planData.teachingVideo!=''" style="width: 500px" controls="controls" />
                             </Col>
                          </Row>                                                 
                        </FormItem>
                        <FormItem label="训练步骤">                      
                            <Row v-for="(item,index) in planData.planStepList" :key="index" style="margin-top: 5px;"> 
                                <Col span="1" style="text-align:right;">
                                    <Label > 步骤{{index+1}}：</Label>                                
                                </Col>
                                <Col span="14"> 
                                    <Input :disabled="disabledTf" v-model="item.stepDetail" style="width: 800px" placeholder="请输入步骤内容" :maxlength="500"/>
                                </Col>
                                <Col span="2">
                                    <!-- <Button  v-on:click="delPlanStep(index)" type="success" size="small"  style="background-color:#00c693;">删除</Button> -->
                                </Col>
                            </Row>
                            <Row> 
                                <Col span="24"> 
                                <!-- <Button class="add-button" v-on:click="addPlanStep()" type="success" icon="plus" style="background-color:#00c693;width: 300px;margin-top: 10px;"  >添加步骤</Button> -->
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="训练原理">
                        <Row> 
                            <Col span="22"> 
                                <div>
                                    <Card shadow>
                                        <textarea :disabled="disabledTf" class='tinymce-textarea' id="tinymceEditer" v-model="planData.theoryDetail" placeholder="这里输入文字..........."></textarea>
                                    </Card>
                                    <Spin fix v-if="spinShow">
                                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>加载组件中...</div>
                                    </Spin>
                                </div>
                            </Col>
                        </Row> 
                        </FormItem>                          
                </Form>
             </Card>
             <div style="margin:10px auto;text-align:center">
                <Button @click="pageToExercisePlanList" style="width:100px" type="success">返回</Button>
                <!-- <Button  style="width:100px" :loading="saveLoading" @click="saveOrUpdateExercisePlan"  type="success">提交结果</Button> -->
             </div>          
</div>
</div>
</template>
<script>
import "../tinymce/js/tinymce/langs/zh_CN.js";
import tinymce from 'tinymce';
export default {
    name: 'exercisePlanDetail'
    ,data(){
        return {
                    disabledTf:true,
                    pageTitle:"计划新增",
                    uploadMusicTitle:"上传音频",
                    uploadVideoTitle:"上传视频",
                    uploadGifTitle:"上传GIF",
                    planData:{
                                planId:'',
                                planName:'',                                 
                                planPhoto:'',
                                planListPhoto:'',
                                planDuration:'',
                                itemLevelCode:'',
                                itemToolCode:'',
                                itemOrientationCode:'',
                                ageStart:'',
                                ageEnd:'',
                                ageScope:'',
                                sex:'',
                                defaultPlan:'0',
                                openStatus:'1',
                                detailIntroduction:'',
                                detailPresentation:'',
                                teachingVideo:'',
                                teachingVideoPhoto:'',
                                detailPrepare:'',
                                detailFitThrong:'',
                                detailTabooThrong:'',
                                theoryDetail:'',
                                planStepList:[],
                                planToolList:[],
                                playMusicUrl:'',
                                playGifTime:'',
                                playGifUrl:'',
                                videoMaterialId:'',
                                eachGroupNum:'',
                                eachGroupNumUnit:'',
                                planPlaySpot:[{playTime:0,musicId:'',musicUrl:'',gifId:'',gifUrl:''}]
                            },
                    sexList:[
                                {
                                    itemCode:'1',
                                    itemName:'男'
                                },                  
                                {
                                    itemCode:'2',
                                    itemName:'女'
                                },
                             ],
              openStatusList:[
                                {
                                    itemCode:'1',
                                    itemName:'开启'
                                },                  
                                {
                                    itemCode:'0',
                                    itemName:'关闭'
                                },
                             ],                       
           defaultStatusList:[
                                {
                                    itemCode:'1',
                                    itemName:'默认'
                                },                  
                                {
                                    itemCode:'0',
                                    itemName:'非默认'
                                },
                             ],                            
                   ageList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],  
                 levelList:[],
              toolTypeList:[],
                toolTypeId:1,
           orientationList:[],
                  toolList:[],
                    toolId:'',
                 updateUrl:'',
              cdnUpdateUrl:'',
                previewUrl:'',
                prePlayGifUrl:'',
            previewGifStatus:false,
             previewStatus:false,
                  spinShow: true,
               saveLoading:false,
               planListPhoto:'',
               testUploadList:[],
               visibles:false,
       videoMaterialList:[],//视频素材
       musicMaterialList:[],//音频素材
         gifMaterialList:[],//GIF素材
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
        // {
        //   value: "99",
        //   label: "无计算标准-人工打分值"
        // },
        {
          value: "kg",
          label: "kg"
        }
      ],
        }
    }
    ,methods:{
///////////////////////////////////////////////////////////////////////////

            delPlaySpot(index){//删除播放节点
             this.planData.planPlaySpot.splice(index,1);
            }
            ,addPlaySpot(){//添加播放节点
            var playTime='';
            if(this.planData.planPlaySpot.length==0){
                playTime=0;
            }
            this.planData.planPlaySpot.push({
                                    playTime:playTime,
                                    musicId:'',
                                    musicUrl:'',
                                    gifId:'',
                                    gifUrl:''
                                 });
            }
            ,musicChange(value){
              for(var material  of this.musicMaterialList){
                  if(value==material.materialId){
                      let musicUrl=material.materialUrl;
                   for(let music of this.planData.planPlaySpot){
                     if(music.musicId==value){
                        music.musicUrl=musicUrl;
                     }
                   }
                  return;
                  }
              }
            }
            ,gifChange(value){
             for(var material  of this.gifMaterialList){
                  if(value==material.materialId){
                      let gifUrl=material.materialUrl;
                   for(let gif of this.planData.planPlaySpot){
                     if(gif.gifId==value){
                        gif.gifUrl=gifUrl;
                     }
                   }
                  return;
                  }
              }
            }
             ,getVideoChange(value){
              for(var material  of this.videoMaterialList){
                  if(value==material.materialId){
                 this.planData.teachingVideo=material.materialUrl;
                 return;
                  }
              }
             }
             ,getVideoMaterialList(){
               this.$axios.get("/v1/material/getMaterialListByType?addType=01&materialType=02").then(res => {
                       if(res.data.code==10000){
                          this.videoMaterialList=res.data.response;
                       }
               });
             }
             ,getMusicMaterialList(){
               this.$axios.get("/v1/material/getMaterialListByType?addType=01&materialType=01").then(res => {
                       if(res.data.code==10000){
                           this.musicMaterialList=res.data.response;
                       }
               });
             }
             ,getGifMaterialList(){
               this.$axios.get("/v1/material/getMaterialListByType?addType=01&materialType=03").then(res => {
                       if(res.data.code==10000){
                           this.gifMaterialList=res.data.response;
                       }
               });
             }
 ///////////////////////////////////////////////////////////////////////////////            
            ,getPlanData(planId){//编辑时获取计划信息
               this.pageTitle="计划详情";
               this.$axios.get("/v1/exercise/family/getExercisePlanDetailForMange?planId="+planId).then(res => {
                        if(res.data.code==10000){
                            let data=res.data.response;
                            this.planData=data; 
                            this.planListPhoto=data.planListPhoto;
                            let planListPhotoObj = {
                                url: data.planListPhoto ? data.planListPhoto : "",
                                status: "finished"
                            };
                            this.testUploadList.push(planListPhotoObj);
                            this.toolTypeId= data.itemToolCode;
                            if(this.toolTypeId!='' && this.toolTypeId!='1'){
                                this.toolId=data.planToolList[0].toolId;
                            }
                            tinymce.get('tinymceEditer').setContent(data.theoryDetail);
                            //
                            for(let play of this.planData.planPlaySpot){
                                  play.playTime=play.playTime/1000;
                             }
                        }else{
                            this.$Message.info(res.data.msg);
                        }                          
                   });
            }
            ,getLevelList(){ //获取等级信息        
                    this.$axios.get("/v1/exercise/family/getExerciseConfigByItemType?itemType=plan_level").then(res => {
                        this.levelList=res.data.response;
                        });
            }
            ,getToolTypeList(){ //根据器械信息
                    this.$axios.get("/v1/exercise/family/getExerciseConfigByItemType?itemType=plan_tool").then(res => {
                        this.toolTypeList=res.data.response;
                        });
            } 
            ,getOrientationList(){ //根据类型信息
                    this.$axios.get("/v1/exercise/family/getExerciseConfigByItemType?itemType=plan_orientation").then(res => {
                        this.orientationList=res.data.response;
                        });
            }
            ,getToolListByType(toolTypeId){ //根据器械类型获取器械列表信息
                    if(toolTypeId==1){
                        this.toolList=[];
                        this.toolId='';
                        return;
                    }
                    this.$axios.get("/v1/exercise/family/getPlanListByToolType?itemToolCode="+toolTypeId).then(res => {
                        this.toolList=res.data.response;
                        });
            }
            // ,uploadFileSuccessGif(response, file, fileList){//上传图片
            //  this.planData.playGifUrl  = response.response[0];
            //  this.uploadGifTitle="上传GIF";
            // }
            // ,uploadFileSuccessMusic(response, file, fileList){//上传图片
            //  this.planData.playMusicUrl  = response.response[0];
            //  this.uploadMusicTitle="上传音频";
            // }
            // ,uploadFileSuccessVideo(response, file, fileList){//上传图片
            //  this.planData.teachingVideo  = response.response[0];
            //  this.uploadVideoTitle="上传视频";
            // }
            // ,handleUploadmusic(file){
            //      this.uploadMusicTitle="上传中。。。";
            // }
            // ,handleUploadvideo(file){
            //      this.uploadVideoTitle="上传中。。。";
            // }
            // ,handleUploadgif(file){
            //     this.uploadGifTitle="上传中。。。";
            // }
            ,uploadFileSuccess(response, file, fileList){//上传图片
             this.planData.planPhoto  = response.response[0];
            }
            ,uploadVideoPhotoSuccess(response, file, fileList){//视频首页图片
             this.planData.teachingVideoPhoto  = response.response[0];
            }
            ,handleView (url) { //预览图片
                        this.previewUrl = url;
                        this.previewStatus = true;
            }
            ,handleViewGif (url) { //预览图片
                        this.prePlayGifUrl = url;
                        this.previewGifStatus = true;
            }
            ,delPlanStep(index){//删除项目
            this.planData.planStepList.splice(index,1);
            }
            ,addPlanStep(){//添加项目
            this.planData.planStepList.push({stepDetail:''});
            }
            ,pageToExercisePlanList(){ //返回
                sessionStorage.setItem('isExercisePlanDetailBack',"true");
                this.$router.go(-1);  
            } 
            ,saveOrUpdateExercisePlan(){//保存处理 
                  this.saveLoading=true;                                
                  var paramData=JSON.parse(JSON.stringify(this.planData));
                  if(paramData.planPhoto==''||paramData.planPhoto==null){
                      this.$Message.error("请上传计划详情图片！");
                      this.saveLoading=false;
                      return false;
                  } 
                  if(paramData.planListPhoto==''||paramData.planListPhoto==null){
                      this.$Message.error("请上传计划列表图片！");
                      this.saveLoading=false;
                      return false;
                  } 
                  if(paramData.planName==''){
                      this.$Message.error("请输入计划名称！");
                      this.saveLoading=false;
                      return false;
                  } 
                  if(paramData.sex==''){
                      this.$Message.error("请选择适用性别！");
                      this.saveLoading=false;
                      return false;
                  } 
                  if(paramData.ageStart==''){
                      this.$Message.error("请选择适用年龄开始！");                     
                      this.saveLoading=false;
                      return false;
                  } 
                  if(paramData.ageEnd==''){
                      this.$Message.error("请选择适用年龄结束！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.ageStart>paramData.ageEnd){
                      this.$Message.error("适用年龄开始不能大于年龄结束！");
                      this.saveLoading=false;
                      return false;
                  }                 
                  if(paramData.itemOrientationCode==''){
                      this.$Message.error("请选择训练类型！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.itemLevelCode==''){
                      this.$Message.error("请选择训练难度！");
                      this.saveLoading=false;
                      return false;
                  }                  
                  if(paramData.planDuration==''){
                      this.$Message.error("请选择训练时长！");
                      this.saveLoading=false;
                      return false;
                  }
                 let testCourseCount=/^[1-9][0-9]*$/;
                 if(!testCourseCount.test(paramData.planDuration)){
                      this.$Message.info('训练时长需为正整数！');
                      this.saveLoading=false;
                      return;
                 }
                 if(!testCourseCount.test(paramData.playGifTime)){
                      this.$Message.info('GIF单次播放时长为正整数！');
                      this.saveLoading=false;
                      return;
                 }
                 //播放节点
                 let planPlaySpot=paramData.planPlaySpot;
                 if(planPlaySpot.length==0){
                    this.$Message.info('请添加播放节点！');
                    this.saveLoading=false;
                    return;
                 }
                 for(let i=0; i<planPlaySpot.length;i++){
                     if(i==0){//初始节点，GIF必须
                         if(planPlaySpot[i].gifId==''){
                            this.$Message.info('初始节点GIF动图不能为空！');
                            this.saveLoading=false;
                            return;
                         }
                     }else{
                         if(planPlaySpot[i].playTime==''){
                            this.$Message.info('节点开始时间不能为空！');
                            this.saveLoading=false;
                            return;
                         }
                        let testPlayTime=/^[0-9]+(.[0-9]{1,2})?$/;
                        if(!testPlayTime.test(planPlaySpot[i].playTime)){
                            this.$Message.info('节点开始时间不正确！');
                            this.saveLoading=false;
                            return;
                         }
                         planPlaySpot[i].playTime=planPlaySpot[i].playTime*1000;
                        if(planPlaySpot[i].gifId=='' && planPlaySpot[i].musicId==''){
                            this.$Message.info('播放节点音频和GIF至少填一个');
                            this.saveLoading=false;
                            return;
                        }
                    }
                 }
                  if(paramData.detailIntroduction==''){
                      this.$Message.error("请输入一句话简介！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.detailPresentation==''){
                      this.$Message.error("请输入计划简介！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.detailFitThrong==''){
                      this.$Message.error("请输入适用人群！");
                      this.saveLoading=false;
                      return false;
                  }

                  if(paramData.detailIntroduction==''){
                      this.$Message.error("请输入禁忌人群！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.detailPrepare==''){
                      this.$Message.error("请输入练前准备！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.teachingVideoPhoto==''||paramData.teachingVideoPhoto==null){
                      this.$Message.error("请上传视频首页图片！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.videoMaterialId==''||paramData.videoMaterialId==null){
                      this.$Message.error("请选择训练视频！");
                      this.saveLoading=false;
                      return false;
                  }
                  if(paramData.planStepList.length==0){
                      this.$Message.error("请添加训练步骤！");
                      this.saveLoading=false;
                      return false;
                  }else{
                      for(let step of paramData.planStepList){
                         if(step.stepDetail==''){
                            this.$Message.error("训练步骤不能为空！");
                            this.saveLoading=false;
                            return false;
                         }
                      }
                  }
                var tinymceEditer = tinymce.get('tinymceEditer').getContent();
                if(tinymceEditer==''){
                        this.$Message.error("请输入训练原理！");
                        this.saveLoading=false;
                        return false;
                }
                 paramData.theoryDetail=tinymceEditer;
                if(paramData.ageStart==paramData.ageEnd){
                 paramData.ageScope=paramData.ageStart;
                }else{
                 paramData.ageScope=paramData.ageStart+"-"+paramData.ageEnd;
                }
                 paramData.itemToolCode=this.toolTypeId;
                if(this.toolId!=''){
                  paramData.planToolList=[];   
                 paramData.planToolList.push({"toolId":this.toolId});
                }
                console.log(JSON.stringify(paramData));
                //this.saveLoading=false;
               //return;
                //保存
               this.$axios.post("/v1/exercise/family/saveOrUpdateExercisePlan",paramData).then(res => { 
                        if(res.data.code==10000){ 
                            this.$Message.info("提交成功！");
                            this.saveLoading=false;                  
                            sessionStorage.setItem('isExercisePlanDetailBack',"true");//返回列表
                            this.$router.go(-1);    
                        }else{
                            this.saveLoading=false;
                            this.$Message.info(res.data.msg);
                        }
                });
         
            },
            videohandleView(name) {
      this.imgName = name;
      this.visibles = true;
    },
    videohandleRemove(tindex) {
      this.testUploadList.splice(tindex, 1);
      this.planListPhoto = "";
    },
    videohandleBeforeUpload(file) {
      this.testUploadList = [];
      this.planListPhoto = "";
      return true;
    },
    videohandleSuccess(response, file) {
      console.log(file);
      file.url = response.response[0];
      this.planListPhoto = response.response[0];
      if ((response.code = 10000)) {
        this.testUploadList.push(file);
        this.planData.planListPhoto=response.response[0];
      } else {
        this.$Message.info(response.msg);
      }
      console.log(this.uploadList);
    },
                     
    }    
    ,mounted(){
        var vm = this;
        tinymce.init({//富文本编辑器初始化
                selector:'#tinymceEditer',
                mode: "textareas",
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                    'searchreplace visualblocks visualchars code fullpage',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                ],
                toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                autosave_interval: '20s',
                image_advtab: true,
                height: 600,
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
                },
                setup: function(editors) {
                    editors.on('init', function(e) {
                        vm.spinShow = false;               
                    });
                },
                // 图片上传
                images_upload_handler: function (blobInfo, success, failure) {
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open('POST', vm.$axios.defaults.baseURL+"/v1/file/upload?type=manage_img");
                    xhr.onload = function() {
                        var json;
                        if (xhr.status != 200) {
                        failure("上传失败！");
                        return;
                        }
                        json = JSON.parse(xhr.responseText);
                        if (!json || json.response.length==0) {
                        failure("上传失败！");
                        return;
                        }
                        setTimeout(function() {
                          success(json.response[0]);
                        }, 1000);   
                    };
                    formData = new FormData();
                    formData.append('muFiles', blobInfo.blob());
                    xhr.send(formData);
                }

            });

         vm.getVideoMaterialList();//视频素材
         vm.getMusicMaterialList();//音频素材
         vm.getGifMaterialList();//GIF素材

         vm.getLevelList();
         vm.getToolTypeList();
         vm.getOrientationList();
         vm.updateUrl=vm.$axios.defaults.baseURL+"/v1/file/upload?type=manage_img"; 
         vm.cdnUpdateUrl = vm.$axios.defaults.baseURL+"/v1/file/upload/cdn"; 
        if(sessionStorage.getItem('exercisePlanList-exercisePlanDetail-planId')!= null){
                vm.getPlanData(sessionStorage.getItem('exercisePlanList-exercisePlanDetail-planId'));//编辑时获取场馆数据
        }         
        vm.uploadMusicTitle="上传音频";
        vm.uploadVideoTitle="上传视频";
        vm.uploadGifTitle="上传GIF";

    }
    ,watch: {
              toolTypeId:'getToolListByType'
    }
    ,destroyed() {
       tinymce.get('tinymceEditer').destroy();
    }


};
</script>