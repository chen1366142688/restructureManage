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
const GET_MIDDLE_MANAGE_LIST = '/v1/middleManage/getMiddleManageList'; // 获取中考考试列表
const GET_ACTIONS_TANMA_STUDENT_LIST = '/v1/actionStamina/getActionStaminaStudentList'; // 获取学生详情列表
const GET_EXAM_CONFIG = '/v1/middleManage/getExamConfig'; // 查询考试相关配置
const GET_SCHOOL_TEACHER_LIST = '/v1/sports/class/getSchoolTeacherList'; //
const ADD_EXAM_CONFIG = '/v1/middleManage/addExamConfig'; // 增加考试相关配置
const STUDENT_INFO = '/v1/middleManage/studentInfo';// 查询学生列表
const ADD_STUDENT = '/v1/middleManage/addStudent';// 添加学生
const GET_EXAM_ITEM = '/v1/middleManage/getExamItem';// 查询项目名称
const GET_MIDDLE_EXAM_MAG = '/v1/middleManage/getMiddleExamManageDetail'; //查询考试详情
const UPDATA_ITEM_STATUS = '/v1/middleManage/updateItemStatus'; //更改状态
const REMOVE_STUDENT = '/v1/middleManage/removeStudent'; //移除学生
const EXPORT_ERROR_CHOOSE_EXPORT = '/v1/middleManage/exportErrorChooseExport'; //导出学生选考错误数据
const GET_ECAM_CONFIG_BY_ITEM_NAME = '/v1/middleManage/getExamConfigByItemName';//查询考试相关配置根据项目名称
//学生数据管理
const GET_STUDENT_DATA = '/v1/middleData/getStudentData'; //查询学生数据
const GET_STUDENT_DATA_DETAIL = '/v1/middleData/getStudentDataDetail'; //查询学生数据详情
const EXAM_CONFIG_EXPORT = '/v1/middleManage/file/upload/examConfigExport';//学生选考数据的导入
const GET_TASK_LIST = '/v1/middleManage/getTaskList';//获取任务列表
const COUNT_TASK_LIST_NUM = '/v1/middleManage/countTaskListNum';//查询任务数量
const EXPORT_MIDDLE_ITEM_DATA = '/v1/middleManage/exportMiddleItemData';//考试设置项目导出
const UPDATE_STUDENT_SCORE = '/v1/middleData/updateStudentScore';//修改学生成绩
const QUERY_STUDENT_SCORE = '/v1/middleData/queryStudentScore';//实时计算成绩得分

//班级数据管理
const GET_DATA_ANALYSE = '/v1/kmStudentClass/getDataAnalyse';//班级数据分析
const GET_DATA_DETAILS = '/v1/kmStudentClass/getDataDetails';//数据明细
const GET_DATA_SUMMARY="/v1/kmStudentClass/getDataSummary";//数据概览
const GET_STUDENT_CLASS_BASICS_AVG = "/v1/kmStudentClass/getStudentClassBasicsAvg";//获取指定年级各个班级的基础体能平均分
const GET_STUDENT_CLASS_SPECIAL_AVG = "/v1/kmStudentClass/getStudentClassSpecialAvg";//获取指定年级各个班级的专项技能平均分
//年级数据管理
const GET_GRADE_DATA = "/v1/middleData/getGradeData";//查询年级数据
const GET_ITEM = '/v1/middleData/getItem';//项目数据查询所有项目
const GET_ITEM_DATA = '/v1/middleData/getItemData';//项目数据查询

//机构端学生信息
const DELETE_STUDENTE_AND_SAVE = '/v1/studentinfo/deleteStudentAndSave';
const QUERY_STUDENTE_INSERT_INFO = '/v1/studentinfo/queryStudentInsertInfo';
const REPEATER_STUDENTE = '/v1/studentinfo/repeaterStudent';
const QUERY_STUDENT_CLASS_GRADE = '/v1/examschool/queryStudentClassByGrade';
const UPDATE_STUDENT_STATUS = '/v1/studentinfo/updateStudentStatus';
const GET_HISTORY_SCHOOL_GRADE_LIST = '/v1/studentinfo/getHistorySchoolGradeList';
const GET_HISTOTY_SCHOOL_CLASS_LIST = '/v1/studentinfo/getHistoryClassList';
const api = {
    getActionStaminaStudentList: (params) => http.get(createURL(GET_ACTIONS_TANMA_STUDENT_LIST, params)), // 按赛事查询-查询表格数据
    getMiddleManageList: (params) => http.post(GET_MIDDLE_MANAGE_LIST, params), // 获取中考考试列表
    getExamConfig: (params) => http.get(createURL(GET_EXAM_CONFIG, params)), // 查询考试相关配置
    getSchoolTeacherList: (params) => http.get(createURL(GET_SCHOOL_TEACHER_LIST, params)), // 查询教师
    addExamConfig:(params) => http.post(ADD_EXAM_CONFIG,params), //增加考试相关配置
    studentInfo: (params) => http.post(STUDENT_INFO,params),//获取学生列表
    addStudent: (params) => http.post(ADD_STUDENT, params),//添加学生
    getExamItem: (params) => http.get(createURL(GET_EXAM_ITEM,params)), // 查询项目名称
    getMiddleExamManageDetail: (params) => http.post(GET_MIDDLE_EXAM_MAG,params),// 查询考试详情
    updateItemStatus: (params) => http.get(createURL(UPDATA_ITEM_STATUS,params)), // 查询项目名称
    getStudentData: (params) => http.post(GET_STUDENT_DATA, params), //查询学生数据
    exportMiddleItemData: (params) => http.get(createURL(EXPORT_MIDDLE_ITEM_DATA,params)),//考试设置项目导出
    getStudentDataDetail: (params) => http.get(createURL(GET_STUDENT_DATA_DETAIL,params)), //查询学生详情
    removeStudent: (params) => http.get(createURL(REMOVE_STUDENT,params)), //移除学生
    exportErrorChooseExport: (params) => http.get(createURL(EXPORT_ERROR_CHOOSE_EXPORT,params)),//导出学生选考错误数据
    examConfigExport: (params) => http.post(EXAM_CONFIG_EXPORT,params),//学生选考数据导入
    updateStudentScore:(params) => http.post(UPDATE_STUDENT_SCORE,params),//修改学生成绩
    getTaskList: (params) => http.post(GET_TASK_LIST,params), // 获取任务列表
    countTaskListNum:(params) => http.post(COUNT_TASK_LIST_NUM,params),//查询任务数量
    getExamConfigByItemName: (params) => http.get(createURL(GET_ECAM_CONFIG_BY_ITEM_NAME,params)), //查询考试相关配置根据项目名称
    queryStudentScore:(params) => http.get(createURL(QUERY_STUDENT_SCORE,params)),//实时计算学生成绩得分
    //运动技能数据管理班级数据管理
    getDataAnalyse: (params) => http.get(createURL(GET_DATA_ANALYSE,params)),//班级数据分析
    getDataDetails: (params) => http.get(createURL(GET_DATA_DETAILS,params)),//数据明细
    getDataSummary: (params) => http.get(createURL(GET_DATA_SUMMARY,params)),//数据概览
    getStudentClassBasicsAvg: (params) => http.get(createURL(GET_STUDENT_CLASS_BASICS_AVG,params)),//获取指定年级各个班级的基础体能平均分
    getStudentClassSpecialAvg: (params) => http.get(createURL(GET_STUDENT_CLASS_SPECIAL_AVG,params)),//获取指定年级各个班级的专项技能平均分
    //运动技能数据管理年级数据管理
    getGradeData:(params) => http.get(createURL(GET_GRADE_DATA,params)),//查询年级数据管理
    getItem:(params) => http.get(createURL(GET_ITEM,params)),//项目数据查询所有项目
    getItemData: (params) => http.get(createURL(GET_ITEM_DATA, params)),//项目数据查询所有项目
    //机构端学生信息
    deleteStudentAndSave: (params) => http.get(createURL(DELETE_STUDENTE_AND_SAVE, params)), // 删除学生
    queryStudentInsertInfo: (params) => http.get(createURL(QUERY_STUDENTE_INSERT_INFO, params)), // 通过学籍号查询学生信息
    queryStudentClassByGrade: (params) => http.get(createURL(QUERY_STUDENT_CLASS_GRADE, params)),// 查询班级列表
    repeaterStudent: (params) => http.get(createURL(REPEATER_STUDENTE, params)), // 学生留级
    updateStudentStatus: (params) => http.get(createURL(UPDATE_STUDENT_STATUS, params)), // 学生停用启用
    getHistorySchoolGradeList: (params) => http.get(createURL(GET_HISTORY_SCHOOL_GRADE_LIST, params)), //历史数据新增获取年级列表
    getHistoryClassList: (params) => http.get(createURL(GET_HISTOTY_SCHOOL_CLASS_LIST, params)), // 历史数据新增获取班级列表

};
export default api;
