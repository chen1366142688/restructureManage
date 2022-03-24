/**
 * @学生视力管理模块接口统一定义
 * **/
 import http from 'axios'
 import util from '@/libs/util';
 //视力数据查询相关
 const GET_STUDENT_VISION_LIST = '/v1/vision/getStudentVisionList';
 const GET_STUDENT_VISION_COUNT = '/v1/vision/getStudentVisionCount';
 const QUERY_SCHOOL_REPORTED_STATUS = '/v1/subjectReport/querySchoolReportedStatus';
 const QUERY_CLASS_ACTIVITY_EYES_PROJECT_LIST = '/v1/vision/queryClassActivityEyesProjectList';
 const QUERY_GRADE_ACTIVITY_EYES_PROJECT_LIST = '/v1/vision/queryGradeActivityEyesProjectList';
 const GET_BATH_ADD_VISION_STUDENT_LIST = '/v1/vision/getBathAddVisionStudentList';
 const QUERY_STUDENT_VISION = '/v1/vision/queryStudentVision';
 //视力数据编辑-导入-导出相关
 const ADD_VISION_RESULT = '/v1/visionEdit/addVisionResult';
 //视力历史数据查询
 const QUERY_HIS_YEAR_VISION_CLASS_LIST = '/v1/vision/query/his/queryHisYearVisionClassList';
 const GET_HIS_STUDENT_VISION_LIST = '/v1/vision/query/his/getHisStudentVisionList';
 const GET_HIS_STUDENT_VISION_LIST_COUNT = '/v1/vision/query/his/getHisStudentVisionListCount';
 //视力 数据报送相关
 const GET_EDUCATION_NOW_VISION_INFO = '/v1/vision/report/getEducationNowVisionInfo';
 const GET_EDUCATION_VISION_INFO = '/v1/vision/report/getEducationVisionInfo';
 const GET_EDUCATION_VISION_HIS_INFO = '/v1/vision/report/getEducationVisionHisList';
 const api = {
    getStudentVisionList: (params) => http.get(util.createURL(GET_STUDENT_VISION_LIST, params)), // 视力 - 通过学生查询学生列表
    getStudentVisionCount: (params) => http.get(util.createURL(GET_STUDENT_VISION_COUNT, params)), // 视力 - 通过学生查询学生列表数量
    addVisionResult: (params) => http.post(ADD_VISION_RESULT, params), // 添加视力成绩
    querySchoolReportedStatus: (params) => http.get(util.createURL(QUERY_SCHOOL_REPORTED_STATUS, params)), // 查看是否报送给教育局
    queryClassActivityEyesProjectList: (params) => http.get(util.createURL(QUERY_CLASS_ACTIVITY_EYES_PROJECT_LIST, params)), // 历史数据查询 数据明细
    queryGradeActivityEyesProjectList: (params) => http.get(util.createURL(QUERY_GRADE_ACTIVITY_EYES_PROJECT_LIST, params)), // 历史数据查询 数据总览
    getBathAddVisionStudentList: (params) => http.get(util.createURL(GET_BATH_ADD_VISION_STUDENT_LIST, params)), // 视力数据录入列表
    queryStudentVision: (params) => http.get(util.createURL(QUERY_STUDENT_VISION, params)), // 查询指定学生的视力测试情况
    queryHisYearVisionClassList: (params) => http.get(util.createURL(QUERY_HIS_YEAR_VISION_CLASS_LIST, params)), // 历史数据-详情-视力管理-查询历史学年年级明细列表
    getHisStudentVisionList: (params) => http.get(util.createURL(GET_HIS_STUDENT_VISION_LIST, params)), // 历史数据-详情-视力管理-查询年级学生列表
    getHisStudentVisionListCount: (params) => http.get(util.createURL(GET_HIS_STUDENT_VISION_LIST_COUNT, params)), // 历史数据-详情-视力管理-查询年级学生列表数量
    getEducationNowVisionInfo: (params) => http.get(util.createURL(GET_EDUCATION_NOW_VISION_INFO, params)), // 获取该校当前视力信息
    getEducationVisionInfo: (params) => http.get(util.createURL(GET_EDUCATION_VISION_INFO, params)), // 历史数据-获取该校当前视力信息
    getEducationVisionHisList: (params) => http.get(util.createURL(GET_EDUCATION_VISION_HIS_INFO, params)), // 获取教育局报送视力历史记录
 };
 export default api;