/**
 * @数据报送管理模块接口统一定义
 * **/
 import http from 'axios'
import util from '@/libs/util';
 
 
 //数据报送相关GET 
 const JUDGE_REPORT = '/v1/dataReport/judgeReport';
 const GET_TEACHER_SCHOOL_LIST = '/v1/dataReport/getTeacherSchoolList';
 const VISION_REPORT = '/v1/vision/report/visionReport';
 const REPORT_TEST_TO_EDUCATION = '/v1/test/report/reportTestToEducation';
 const GET_STUDENT_VISION_LIST = '/v1/vision/report/getStudentVisionList';
 const GET_STUDENT_VISION_COUNT = '/v1/vision/report/countStudentVisionList';
 const GET_STUDENT_TEST_RESULT_LIST = '/v1/test/report/getStudentTestResultList'
const GET_STUDENT_TEST_RESULT_COUNT = '/v1/test/report/countStudentTestResultListReport'
const SUBJECT_REPORT_TO_EDUCATION = '/v1/cd/subject/report/subjectReportToEducation';
 const GET_STUDENT_SUBJECT_STUDENT_LIST = '/v1/cd/subject/report/getEducationReportStudentDetailList'
 const GET_SEUDENT_SUBJECT_STUDENT_LIST_COUNT = '/v1/cd/subject/report/countEducationReportStudentDetail'

const api = {
    judgeReport: (params) => http.get(util.createURL(JUDGE_REPORT, params)), // 教育局体测上报学科评价数据报送判断基础数据是否报送
    getTeacherSchoolList: (params) => http.get(util.createURL(GET_TEACHER_SCHOOL_LIST, params)), // 获取该教师管理的学校列表
    visionReport: (params) => http.get(util.createURL(VISION_REPORT, params)), // 教育局视力上报
    reportTestToEducation: (params) => http.get(util.createURL(REPORT_TEST_TO_EDUCATION, params)), // 教育局-体测上报
    getStudentVisionList: (params) => http.get(util.createURL(GET_STUDENT_VISION_LIST, params)), // 视力 - 通过学生查询学生列表
    getStudentVisionCount: (params) => http.get(util.createURL(GET_STUDENT_VISION_COUNT, params)), // 视力 - 通过学生查询学生列表数量
    getStudentTestResultList: (params) => http.get(util.createURL(GET_STUDENT_TEST_RESULT_LIST, params)), // 体质测试-获取学生列表
    countStudentTestResultListReport: (params) => http.get(util.createURL(GET_STUDENT_TEST_RESULT_COUNT, params)), // 体质测试-获取学生列表数量
    subjectReportToEducation: (params) => http.get(util.createURL(SUBJECT_REPORT_TO_EDUCATION, params)), // 教育局学科评价上报 - 学科评价上报
    getSubjectStudentList: (params) => http.get(util.createURL(GET_STUDENT_SUBJECT_STUDENT_LIST, params)), // 学科评价-教育局报送-获取学科评价学生列表
    getSubjectStudentListCount: (params) => http.get(util.createURL(GET_SEUDENT_SUBJECT_STUDENT_LIST_COUNT, params)), // 学科评价-教育局报送-获取学科评价学生列表数量

    
 };
export default api;