
## 文件结构
```shell
.
├── public 公共文件夹-存放公共页面
    └── commonImport 导入公共文件    --- 文件命名规则---common(公共)  名称-如 Export  (请采用驼峰命名法)
       ├── visionIndex.vue  视力导入
       ├── testIndex  （举例测试导入） --文件命名规则---需要导入的模块名称+Index(请采用驼峰命名法)
    └── reportAggregate 报送公共一级组件(合并了体质测试-视力测试-学科评价)
        ├── index.vue  公共展示 (类型说明：reportData.reportType   1体测 2视力 3学科评价)
        ├── physicalTestTable.js  体质测试列表相关
        ├── subjectTable.js  学科评价列表相关
        ├── visionTestTable.js  视力测试列表相关
```
