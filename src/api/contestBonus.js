import http from 'axios'
function createURL(url, param) {
  var urlLink = '';
  $.each(param, function(item, key) {
      var link = '&' + item + "=" + key;
      urlLink += link;
  })
  
  urlLink = url + "?" + urlLink.substr(1);
  return urlLink.replace(' ', '');
}

const GET_COMPETITIONS = '/v1/competitionAudit/getCompetitions' // 按赛事查询-查询表格数据
const GET_STUDENT_COMPETITION_LIST = '/v1/studentCompetition/getStudentCompetitionList' // 按学生查询
const COMPETITION_AUDIT = '/v1/competitionAudit/competitionAudit' // 赛事审核
const REVOCATION_AUDIT = '/v1/competitionAudit/revocationAudit' // 撤销赛事审核
const SAVE_COMPETITION = '/v1/competition/saveCompetition' // 新增赛事
const COMPETITION_LEVEL = '/v1/competition/competitionLevel' // 获取赛事等级
const GET_ITEMTYPES = '/v1/competition/getItemTypeConfig' // 获取赛事项目类型
const GET_ITEM_CONFIG = '/v1/competition/itemConfig' // 获取赛事配置
const LEVEL_ADD_SCORE = '/v1/competition/levelAddScore' // 获取赛事等级-竞赛加分
const GET_COMPETITION_STUDENTS = '/v1/competition/getCompetitionStudents' // 新增赛事学生列表
const GET_PARTICIPATION_PEOPLES = '/v1/competition/getParticipationPeoples' // 添加学生竞赛加分模块-参赛学生列表
const GET_COMPETITION_INFO  = '/v1/competition/selectById' // 获取赛事详情
const GET_COMPETITION_AUDITS = '/v1/studentCompetition/getCompetitionAudits' // 获取赛事审核记录
const GET_COMPETITION_POVES = '/v1/studentCompetition/getCompetitionPoves' // 获取赛事成绩凭证
const SAVE_ALON_COMPETITION = '/v1/competition/saveIndividualCompetition' // 保存参赛学生-个人赛
const SAVE_TEAM_COMPETITION = '/v1/competition/saveTeamCompetition' // 保存参赛学生-团队赛
const GET_PERSONAL_DETAIL = '/v1/competition/getIndividualCompetitionDetails' // 获取个人赛详情
const GET_TEAM_DETAIL = '/v1/competition/getTeamCompetitionDetails' // 获取团队赛详情
const DELETE_COMPETITION_ITEM_STUDENT = '/v1/competition/deleteCompetitionItemStudent' // 删除指定项目下指定的学生
const DELETE_COMPETITION = '/v1/competition/deleteCompetition' // 删除赛事
const SUBMIT_AUDIT = '/v1/competitionAudit/submitCompetitionAudit' // 提交赛事审核
const ADD_COMPETITION_ITEM = '/v1/competition/addCompetitionItem' // 新增参赛项目
const api = {
  createURL,
  getCompetitions: (params) => http.get(createURL(GET_COMPETITIONS, params)), // 按赛事查询-查询表格数据
  getStudentCompetitionList: (params) => http.get(createURL(GET_STUDENT_COMPETITION_LIST, params)), // 按学生查询赛事
  getCompetitionLevel: () => http.get(COMPETITION_LEVEL), // 获取赛事等级
  saveCompetition: (params) => http.post(SAVE_COMPETITION, params), // 新增赛事
  competitionAudit: (params) => http.post(COMPETITION_AUDIT, params), // 赛事审核
  revocationAudit: (params) => http.post(REVOCATION_AUDIT, params), // 撤销赛事审核
  getItemTypes: () => http.get(GET_ITEMTYPES), // 获取赛事项目类型
  getItemConfig: (parentId) => http.get(`${GET_ITEM_CONFIG}?parentId=${parentId}`), // 获取项目
  getLevelAddScore: (levelId) => http.get(`${LEVEL_ADD_SCORE}?levelId=${levelId}`), // 获取赛事等级-竞赛加分
  getAllStudentList: (params) => http.get(createURL(GET_COMPETITION_STUDENTS, params)), // 新增赛事学生列表
  getCompetitionInfo: (competitionId) => http.get(`${GET_COMPETITION_INFO}?competitionId=${competitionId}`), // 获取赛事详情
  getParticipationPeoples: (params) => http.get(createURL(GET_PARTICIPATION_PEOPLES, params)), // 添加学生竞赛加分模块-参赛学生列表
  getCompetitionAudits: (id) => http.get(`${GET_COMPETITION_AUDITS}?competitionId=${id}`), // 获取赛事审核记录
  getCompetitionPoves: (params) => http.get(createURL(GET_COMPETITION_POVES, params)), // 获取赛事成绩凭证
  saveAlonCompetition: (params) => http.post(SAVE_ALON_COMPETITION, params), // 保存赛事学生-个人赛
  saveTeamCompetition: (params) => http.post(SAVE_TEAM_COMPETITION, params), // 保存赛事学生-团体赛
  getPersonalDetail: (params) => http.get(createURL(GET_PERSONAL_DETAIL, params)), // 获取个人赛详情
  getTeamDetail: (params) => http.get(createURL(GET_TEAM_DETAIL, params)), // 获取团队赛详情
  deleteItemStudent: (params) => http.post(DELETE_COMPETITION_ITEM_STUDENT, params), // 删除指定项目下指定的学生
  deleteCompetition: (params) => http.post(DELETE_COMPETITION, params), // 删除赛事
  submitAudit: (params) => http.post(SUBMIT_AUDIT, params), // 提交审核
  addCompetitionItem: (params) => http.post(ADD_COMPETITION_ITEM, params), // 新增参赛项目
}
export default api