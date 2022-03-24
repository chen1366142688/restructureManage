# TopSearch Component

## 使用

```JavaScript
`import TopSearch from '@/components/TopSearch/index'`

components: {
  TopSearch
},
```

```JavaScript
// template
<top-search :data="searchData" ref="topSearch" @on-submit="submit">
</top-search>
```

## 实现功能

- 集成所有的查询数据，点击“查询”按钮时，统一返回查询数据；
- 样式统一处理，不再重复编写CSS样式，另外左边输入框和右边操作按钮宽度自适应，以及卡片高度自适应同时适配小屏幕、大屏幕；
- 对有“全部”操作选项的下拉框做了统一处理，传入 `value`为 999或者 9999即该下拉框有“全部”操作，点击“查询”按钮时，对选中“全部”的下拉框做统一处理，将 999 替换为空字符串；
- 分别对 label 为两个字、三个字、四个字做了处理，实现对 label 的统一对齐方式；

## data

使用组件需要传入`data`属性（必传，默认为空数组）该属性数据结构如下：

|  属性   | 说明  | 类型 |
|  ----  |  ----  | --- |  :----:  |
| label  | 表单项label | String |
| props  | 表单项`v-model`绑定的数据字段，最后查询按钮返回该字段用于查询 | String |
| value  | 表单项默认绑定的值，如果默认选中“全部”则需要传入 999 | String\Number  |
| type   | 表单项的类型，可选值为`input`、`select`、`date`、`daterange` |String|
| selectData | 下拉框的数据，`type`如果为 `select`的话需要传入该属性</br> 拿到后台数据后需要重构为 {name: '', value: ''}形式 | Array |

```JavaScript
// 参考
searchData: [
  {label: '年级', props: 'grade', value: '9999', type: 'select', selectData: []},
  {label: '班级', props: 'studentClass', value: '9999', type: 'select', selectData: []},
  {label: '赛事级别', props: 'levelId', value: '9999', type: 'select', selectData: []},
  {label: '审核状态', props: 'auditStatus', value: '9999', type: 'select', selectData: []},
  {
    label: '姓名',
    props: 'studentName',
    value: '',
    type: 'input',
  },
  {
    label: '学籍号',
    props: 'registerCode',
    value: '',
    type: 'input',
  }
],
```


## Event

|  事件名   | 说明  | 返回值 |
|  ----  |  ----  | :---: |
| on-search  | 点击“查询”按钮时触发 | 返回构建好的查询数据，例如 {name: 'xxx', itemId: 'xxx'} |


## Slot

|  名称   | 说明  |
|  ----  |  ----  |
| rightBtn  | 右边操作按钮 |
