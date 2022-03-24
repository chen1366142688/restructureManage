import grade from '@/libs/grade.js'
import allClass from '@/libs/classList.js'
import api from '@/api/studentApi'
const mixins = {
    data() {
      return {
        itemList:[],//所有项目
        classList:[],//所有班级
        gradeList:[], //所有年级
        examStatus:[
          {name:'全部',id:0},
          {name:'未考核',id:1},
          {name:'已考核',id:2},
        ]
      }
    },
    mounted () {
      this.gradeList = grade.inOf( sessionStorage.getItem('schoolType'))
      this.classList = allClass
      this.queryProject() // 获取赛事等级
    },
    methods: {
      //查询所有项目
      queryProject() { //dadad
        api.getExamItem().then((res)=>{
          const { response } = res.data;
          this.itemList = response;
        })
      },
    }
}
export default mixins