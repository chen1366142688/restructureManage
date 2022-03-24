const roleManage = { // 人员管理模块
  STUDENT_INFO_LIST: '/v1/studentinfo/getStudentInfoList'
}
const schoolManage = { // 学校管理
  GET_KUNMING_PRIMARY_SPORTS_CLASS:'/v1/primarysportsclass/getKunmingPrimarySportsClass',
  GET_KUNMING_PRIMARY_SPORTS_CLASS_NUM:'/v1/primarysportsclass/getKunmingPrimarySportsClassNum',
  UPSERT_KUNMING_TEACHER:'/v1/sports/class/upsertKunmingTeacher',
  GET_KUNMING_TEACHER:'/v1/primarysportsclass/getKunmingTeacher',
  GET_EXEMPT_LIST:'/v1/studentsemesterexemptkuming/getExemptList',//免试列表
  COUNT_EXEMPT_LIST:'/v1/studentsemesterexemptkuming/countExemptList',//免试数量
  UPSERT_EXEMPT_INFO:'/v1/studentsemesterexemptkuming/upsertExemptInfo',//免试保存
  GET_EXEMPT_INF_BYID:'/v1/studentsemesterexemptkuming/getExemptInfById',//获取免试详情
}
const physicalHealth = { //体质健康监测 
  GET_BODY_MONITOR_LIST:'/v1/bodymonitorstudent/getBodyMonitorList',//获取体质健康监测列表
  COUNT_BODY_MONITOR_LIST:'/v1/bodymonitorstudent/countBodyMonitorList',//获取体质健康监测列表数量
  SYNCHRONI_ZATION_BODY_MONITOR:'/v1/bodymonitorstudent/synchronizationbodyMonitor',//同步学生体测成绩
  BODY_MONITOR_EXPORT:'/v1/bodymonitorstudent/bodyMonitorExport',//导入体质健康监测数据
  SELECT_COMPLATE_NUM_AND_TOTAL_NUM:'/v1/bodymonitorstudent/selectComplateNumAndTotalNum',//同步相关
}

const comprehenSive = { //综合评价
  QUERY_STUDENT_SCORE_BY_STUDENTID_KM:'/v1/semesterScore/km/queryStudentScoreByStudentIdKM',//昆明-综合评价查询学生体育成绩
  QUERY_STUDENT_SEMESTER_COMPETION_DETAIL:'/v1/semesterScore/km/queryStudentSemesterCompetionDetail',//昆明-查询昆明学生学年体育竞赛加分
  QUERY_STUDENT_SEMESTER_SPORTS_SCORE_KM_BODY_MONITOR:'/v1/semesterScore/km/queryStudentSemesterSportsScoreKmBodyMonitor',//昆明-查询学生学年体质健康数据
  QUERY_STUDENT_SEMESTER_SPORTS_SCORE_KM_MIDDLE_EXAMINATION:'/v1/semesterScore/km/queryStudentSemesterSportsScoreKmMiddleExamination',//昆明-查询学生学期中考体能技能情况
  BATCH_DISPOSE_MIDDLE_EXAMINATION: '/v1/semesterScore/km/batchDisposeMiddleExamination',//昆明-学生学期中考技能体能项目成绩
  BATCH_DISPOSE_STUDENT_SCORE: '/v1/semesterScore/km/batchDisposeStudentScore',//昆明-批量计算学生成绩
  COMPETITION_ADD_SCORE_STATISTICS: '/v1/semesterScore/km/competitionAddScoreStatistics',//昆明-重新计算竞赛得分
  SYNCHRONIZA_TION_STUDENT_BODY_MONITOR_TO_SCORE:'/v1/semesterScore/km/synchronizationStudentBodyMonitorToScore',//昆明-批量计算体质健康监测得分
}

const common = { // 公用方法
  QUERY_SENSITIVE_WORD: '/v1/common/querySensitiveWord', // 通过输入字段获取匹配的关键词
  GET_SCHOOL_ALL_YEAR_SEMESTER: '/v1/sports/class/getSchoolAllYearSemester',//获取所有学期
  GET_SCHOOL_TEACHER_FORMANAGE: '/v1/school/getSchoolTeacherForManage',//获取所有老师
  GET_OSS_FILE_UPLOAD_TOKEN: '/v1/file/getOssFileUploadToken',//获取所有学期
  GET_YEAR_SEMESTER: '/v1/schoolsemesternotice/getYearSemester',//获取所有学期
}
module.exports = {
  roleManage,
  schoolManage,
  physicalHealth,
  comprehenSive,
  common
}