import http from 'axios'
function createURL(url, param) {
    var urlLink = '';
    $.each(param, function(item, key) {
        var link = '&' + item + "=" + key;
        urlLink += link;
    })
    urlLink = url + "?" + urlLink.substr(1);
    return urlLink.replace(' ', '');
};
//技能体能模拟考配置接口
const GET_EXAM_ITEM_ACTIVITY_ITEM = '/v1/examItemConfig/getExamItemActivityItem';
const GET_EXAM_ITEM_ACTIVITY = "/v1/examItemConfig/getExamItemActivity";
const GET_EXAM_ITEM_ACTIVITY_DETAIL = "/v1/examItemConfig/getExamItemActivityDetail";
const INSERT_UPDATE_EXAM_ITEM = "/v1/examItemConfig/insertUpdateExamItem";
const QUERY_GRADE_CLASS="/v1/examItemConfig/queryGradeClass";
const GET_EXAM_ITEM_BY_CLASS_TEST_ID = "/v1/examtest/getExamItemsByClassTestId";
const DELETE_ACTIVITY_STUDENT = '/v1/examItemConfig/deleteActivityStudent';
const GET_EXAM_ITEM_ACTIVITY_ADD_STUDENT = '/v1/examItemConfig/getExamItemActivityAddStudent';
const INSERT_ACTIVITY_STUDENT = '/v1/examItemConfig/insertActivityStudent';
const QUERY_ACTIVITY_GRADE_CLASS = '/v1/examItemConfig/queryActivityGradeClass';
const GET_ACTIVITY_DROP_DOWN_BOX_LIST = '/v1/exam/getActivityDropDownBoxList';
const GET_DATA_DETAIL_LIST = '/v1/exam/getDataDetailsList';
const GET_DATA_SUMMARY = '/v1/exam/getDataSummary';
const GET_TEST_DATA_EXAMINE_BY_STUDENT_LIST ='/v1/exam/getTestDataExamineByStudentList';
const GET_EXAM_ITEM_ACTIVITY_STUDENT = '/v1/examItemConfig/getExamItemActivityStudent';
const GET_EXAM_ITEM_LIST = '/v1/examtest/getExamItemList';
const GET_TEST_DATA_EXAMINE_BY_ITEM = '/v1/exam/getTestDataExamineByItem';
const GET_TEST_DATA_EXAMINE_BY_ITEM_DETAILS = "/v1/exam/getTestDataExamineByItemDetails";
const GET_TEST_DATA_EXAMINE_BY_STUDENT_DETAILS = '/v1/exam/getTestDataExamineByStudentDetails'
const GET_EXERCISE_CONFIG_LIST = '/v1/exam/getExerciseConfigList';
const api = {
  getExamItemActivityItem: (params) => http.get(createURL(GET_EXAM_ITEM_ACTIVITY_ITEM, params)), // 自定义测试查询年级对应类型项目
  getExamItemActivity: (params) => http.get(createURL(GET_EXAM_ITEM_ACTIVITY, params)), // 查询自定义测试/中考模拟活动详情
  getExamItemActivityDetail:(params) => http.post(GET_EXAM_ITEM_ACTIVITY_DETAIL,params),//查询项目学生管理数据
  insertUpdateExamItem:(params) => http.post(INSERT_UPDATE_EXAM_ITEM,params),//新增或修改自定义测试/中考模拟
  queryGradeClass:(params) => http.get(createURL(QUERY_GRADE_CLASS,params)), // 查询学校所有年级班级列表
  getExamItemsByClassTestId:(params) => http.get(createURL(GET_EXAM_ITEM_BY_CLASS_TEST_ID,params)), // 获取该测试的所有项目
  deleteActivityStudent:(params) => http.post(DELETE_ACTIVITY_STUDENT,params), // 移除学生
  getExamItemActivityAddStudent:(params) => http.post(GET_EXAM_ITEM_ACTIVITY_ADD_STUDENT,params), // 查询项目学生管理添加学生数据
  insertActivityStudent:(params) => http.post(INSERT_ACTIVITY_STUDENT,params), // 添加测试活动学生
  queryActivityGradeClass:(params) => http.get(createURL(QUERY_ACTIVITY_GRADE_CLASS,params)), // 查询活动所有年级班级列表
  getActivityDropDownBoxList:(params) => http.get(createURL(GET_ACTIVITY_DROP_DOWN_BOX_LIST,params)), // 获取下拉框活动列表
  getDataDetailsList:(params) => http.get(createURL(GET_DATA_DETAIL_LIST,params)), // 数据明细
  getDataSummary:(params) => http.get(createURL(GET_DATA_SUMMARY,params)), // 数据概括
  getTestDataExamineByStudentList:(params) => http.get(createURL(GET_TEST_DATA_EXAMINE_BY_STUDENT_LIST,params)), // 测试数据查看，按学生查询
  getExamItemActivityStudent:(params) => http.post(GET_EXAM_ITEM_ACTIVITY_STUDENT,params), // 添加测试活动学生
  getExamItemList:(params) => http.get(createURL(GET_EXAM_ITEM_LIST,params)), // 查看所有项目
  getTestDataExamineByItem:(params) => http.get(createURL(GET_TEST_DATA_EXAMINE_BY_ITEM,params)), // 测试数据查看按项目查询
  getTestDataExamineByItemDetails:(params) => http.get(createURL(GET_TEST_DATA_EXAMINE_BY_ITEM_DETAILS,params)), // 测试数据查看按项目查询详情
  getTestDataExamineByStudentDetails:(params) => http.get(createURL(GET_TEST_DATA_EXAMINE_BY_STUDENT_DETAILS,params)), // 测试数据查看，按学生查询
  getExerciseConfigList:(params) => http.get(createURL(GET_EXERCISE_CONFIG_LIST,params)), //获取活动项目类型

};
export default api;