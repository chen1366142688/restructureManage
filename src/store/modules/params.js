
const pageParams = {
    namespaced: true,
    state: {
      isShowExportBtn: false, // 是否显示数据档案-历史数据-上报学生导入、按学生生成的按钮
      listPagePars: new Map() //存储每个路由对应的搜索条件进行筛选项的回显
    },
    mutations: {
      SAVE_LIST_PAGE_PARS: (state, { name, pars }) => {
        state.listPagePars.set(name,pars);
      },
      REMOVE_LIST_PAGE_PARS: (state, { name, pars }) => {
        state.listPagePars.set(name,pars);
      },
      SET_EXPORT_BTN: (state, paylod) => {
        state.isShowExportBtn = paylod
      }
    },
    actions: {
      saveListPagePars: ({ commit },{name,pars}) => {
        commit('SAVE_LIST_PAGE_PARS',{ name,pars });
      },
      removeListPagePars: ({ commit },{name,pars}) => {
        commit('REMOVE_LIST_PAGE_PARS',{ name,pars });
      },
      setExportBtn: ({ commit }, paylod) => {
        commit('SET_EXPORT_BTN', paylod)
      }
    }
};

export default pageParams;
