import http from 'axios'
import {roleManage, common, schoolManage, physicalHealth, comprehenSive} from './baseUrl'

const api = {
  getStudentInfoList: (params) => http.post(roleManage['STUDENT_INFO_LIST'], params),
  querySensitiveWord: (params) => http.post(common['QUERY_SENSITIVE_WORD'], params), //  通过输入字段获取匹配的关键词
  /**学校管理**/
  getSchoolAllYearSemester: (params) => http.get(common['GET_SCHOOL_ALL_YEAR_SEMESTER'], params), //获取所有学期
  getKunmingPrimarySportsClass: (params) => http.post(schoolManage['GET_KUNMING_PRIMARY_SPORTS_CLASS'], params), //获取列表数据
  getKunmingPrimarySportsClassNum: (params) => http.post(schoolManage['GET_KUNMING_PRIMARY_SPORTS_CLASS_NUM'], params), //获取列表数据数量
  upsertKunmingTeacher: (params) => http.post(schoolManage['UPSERT_KUNMING_TEACHER'], params), //保存昆明老师配置
  getSchoolTeacherForManage: (schoolId) => http.get(`${common['GET_SCHOOL_TEACHER_FORMANAGE']}?schoolId=${schoolId}`), //获取所有老师
  getKunmingTeacher: (studentClassId,grade) => http.get(`${schoolManage['GET_KUNMING_TEACHER']}?studentClassId=${studentClassId}&grade=${grade}`), //获取所有老师
  
  /**免试管理**/
  getExemptList: (params) => http.post(schoolManage['GET_EXEMPT_LIST'], params), //获取免试管理学生列表
  countExemptList: (params) => http.post(schoolManage['COUNT_EXEMPT_LIST'], params), //获取免试管理学生列表数量
  upsertExemptInfo: (params) => http.post(schoolManage['UPSERT_EXEMPT_INFO'], params), //保存免试状态
  getExemptInfById: (studentId) => http.get(`${schoolManage['GET_EXEMPT_INF_BYID']}?studentId=${studentId}`), //获取免试详情

  /**综合评价**/
  queryStudentScoreByStudentIdKM: (studentId,schoolYear) => http.get(`${comprehenSive['QUERY_STUDENT_SCORE_BY_STUDENTID_KM']}?studentId=${studentId}&schoolYear=${schoolYear}`), //综合评价查询学生体育成绩
  queryStudentSemesterCompetionDetail: (studentId,schoolYear) => http.get(`${comprehenSive['QUERY_STUDENT_SEMESTER_COMPETION_DETAIL']}?studentId=${studentId}&schoolYear=${schoolYear}`), //查询昆明学生学年体育竞赛加分
  queryStudentSemesterSportsScoreKmBodyMonitor: (studentId,schoolYear) => http.get(`${comprehenSive['QUERY_STUDENT_SEMESTER_SPORTS_SCORE_KM_BODY_MONITOR']}?studentId=${studentId}&schoolYear=${schoolYear}`), //查询学生学年体质健康数据
  queryStudentSemesterSportsScoreKmMiddleExamination: (studentId, schoolYear) => http.get(`${comprehenSive['QUERY_STUDENT_SEMESTER_SPORTS_SCORE_KM_MIDDLE_EXAMINATION']}?studentId=${studentId}&schoolYear=${schoolYear}`), //查询学生学期中考体能技能情况
  batchDisposeMiddleExamination: () => http.post(`${comprehenSive['BATCH_DISPOSE_MIDDLE_EXAMINATION']}`), //学生学期中考技能体能项目成绩
  batchDisposeStudentScore: () => http.post(`${comprehenSive['BATCH_DISPOSE_STUDENT_SCORE']}`), //批量计算学生成绩
  competitionAddScoreStatistics: () => http.post(`${comprehenSive['COMPETITION_ADD_SCORE_STATISTICS']}`), //重新计算竞赛得分
  synchronizationStudentBodyMonitorToScore: () => http.post(`${comprehenSive['SYNCHRONIZA_TION_STUDENT_BODY_MONITOR_TO_SCORE']}`), //批量计算体质健康监测得分
  
  /**体质健康监测**/
  getBodyMonitorList: (params) => http.post(physicalHealth['GET_BODY_MONITOR_LIST'], params), //获取体质健康列表数据
  countBodyMonitorList: (params) => http.post(physicalHealth['COUNT_BODY_MONITOR_LIST'], params), //获取体质健康列表数据
  synchronizationbodyMonitor: () => http.get(physicalHealth['SYNCHRONI_ZATION_BODY_MONITOR']), //同步体测成绩
  selectComplateNumAndTotalNum: (params) => http.get(`${physicalHealth['SELECT_COMPLATE_NUM_AND_TOTAL_NUM']}?taskId=${params}`), //同步体测成绩
  bodyMonitorExport: (params) => http.post(physicalHealth['BODY_MONITOR_EXPORT'], params), //获取体质健康列表数据
  /**公共接口**/
  getOssFileUploadToken: () => http.get(common['GET_OSS_FILE_UPLOAD_TOKEN']), //获取上传oss令牌
  getYearSemester: () => http.get(common['GET_YEAR_SEMESTER']), //获取学年
}
export default api