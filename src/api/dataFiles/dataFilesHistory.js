/**
 * @数据档案大项下的历史数据模块管理模块接口统一定义
 * **/
 import http from 'axios'
import util from '@/libs/util';
 
 
 //数据报送相关
 const GET_ALL_SCHOOL_TEST_INFO_REPORT = '/v1/test/report/getAllSchoolTestInfoForReport';
const GET_EDUCATION_TEST_REPORT_HIS_LIST = '/v1/test/report/getEducationTestReportHisList';
 //成都学科评价数据报送相关
 const GET_EDUCATION_REPORT_SUBJECT_HIS_LIST = '/v1/cd/subject/report/getEducationReportSubjectHisList';
 const GET_EDUCATION_SUBJECT_REPORT_INFO = '/v1/cd/subject/report/getEducationSubjectReportInfo';
const api = {
    getAllSchoolTestInfoForReport: (params) => http.get(util.createURL(GET_ALL_SCHOOL_TEST_INFO_REPORT, params)), // 教育局-获取当前账号下各个学校制定学期 体测情况
    getEducationTestReportHisList: (params) => http.get(util.createURL(GET_EDUCATION_TEST_REPORT_HIS_LIST, params)), // 教育局-获取教育局报送历史记录
    getEducationReportSubjectHisList: (params) => http.get(util.createURL(GET_EDUCATION_REPORT_SUBJECT_HIS_LIST, params)), // 学科评价上报-获取教育局报送历史记录
    getEducationSubjectReportInfo: (params) => http.get(util.createURL(GET_EDUCATION_SUBJECT_REPORT_INFO, params)), // 学科评价上报-获取该校当前体测和学科评价信息
    
 };
export default api;