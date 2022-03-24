/**
 * @课后作业相关接口
* **/
import http from 'axios';
import util from '../libs/util';
const QUERY_STUDENT_YEARSEMESTER_EXERCISE = '/v1/familyexerciseanalyze/queryStudentYearSemesterExercise';
const api = {
    getStudentExercise: (params) => http.get(util.createURL(QUERY_STUDENT_YEARSEMESTER_EXERCISE, params)), // 教育局体测上报学科评价数据报送判断基础数据是否报送
};
export default api;