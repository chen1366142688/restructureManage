
## 文件结构
### 例如公共导出commonExport --- 文件命名规则---common(公共)  名称-如 Export  (请采用驼峰命名法)
#### 文件名称对应管理模块：基础配置-体质测试-视力测试-技能/体能-健康知识-课堂监控-课后作业-综合评价-数据档案-数据报送-心理评测
```shell
.
├── api 请求地址统一管理文件夹   所有请求根据系统顶部topMenu组件渲染的业务板块为一个请求js文件
    └── visionTest    视力测试 
       └── studentVisionManage 学生视力接口管理
            ├── visionManage.js 视力管理
    └── baseApi.js 公共接口管理，学校管理，免试管理， 综合评价， 体质健康监测几个板块构成。 和baseUrl.js 遥相辉映
    └── baseUrl.js 请求接口地址管理，同上组合完成
    └── contestBonus.js 赛事相关
    └── dataReport.js 数据报送相关
    └── exerciseManage.js 课后作业相关
    └── studentApi.js 机构端学生信息/学生数据管理/年级数据管理/班级数据管理相关
    └── testProject.js 技能体能模拟考相关
    
```
