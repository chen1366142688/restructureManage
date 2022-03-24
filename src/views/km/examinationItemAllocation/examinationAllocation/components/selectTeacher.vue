<template>
    <div class="select-teacher">
        <div style="margin:10px 20px;" v-for="(item, indexCh) in teacherMsgList" :key="indexCh">
            <span style="margin-right:15px;">考核教师：</span>
            <Select @on-change="changeSelect($event,indexCh)" v-model="item.teacherId" style="width:120px;margin-right:20px">
                <Option
                v-for="(items,i) in teacherAll"
                :value="items.teacherId"
                :key="items.teacherId+i"
                >{{ items.name }}</Option>
            </Select>
            <Button type="success"  @click="deleteTeacher(indexCh)">删除考核教师</Button>
        </div>
    </div>
</template>
<script>
import api from '@/api/studentApi'
export default {
    props:[
        'teacherMsgList',
        'index'
    ],
    data() {
        return {
            teacherAll:[], //所有体育老师
            changeList:this.teacherMsgList || [],

        }
    },
    mounted() {
        this.queryAllTeacher();
    },
    methods:{
        //查询所有学生
        queryAllTeacher() {
            api.getSchoolTeacherList().then((res)=>{
                this.teacherAll = res.data.response;
            })
        },
        // 删除教师教师索引
        deleteTeacher(indexCh) { 
            this.$emit('deleteTeacher',this.index, indexCh);
        },
        //遍历教师返回新数组
        mapTeacher(val) {
            const _this = this;
            let newArr = [];
            const allTeacher = _this.teacherAll;
                allTeacher.map((child)=>{
                    // debugger;
                    if(val == child.teacherId) {
                        newArr = {
                            name:child.name,
                            teacherId: child.teacherId,
                        }
                    }
                })
            return newArr
        },
        //判断是否重复
        repetion(arr) {
          var hash = {};
          var newArr = arr.reduce(function(item, next) { hash[next.teacherId] ? '' : hash[next.teacherId] = true && item.push(next); return item }, []);
          if(newArr.length!=arr.length) {
            return false
          }else {
            return true
          }
        },
        //选择教师时value值发生变化的回调函数
        changeSelect(e,index) {
            const test = this.mapTeacher(e);
            const list = this.changeList;
            list.splice(index, 1, test);
            let juge = this.repetion(this.teacherMsgList);
            if(juge) this.changeList.splice(index, 1, test);
            else {
              this.$Message.error("一个项目不能添加相同的教师")
              this.deleteTeacher(index)
            };
            this.changeList.splice(index, 1, test);
        }
    }
}
</script>
<style lang="less" scoped>
    .select-teacher{
        width: 100%;
        height: 100%;
    }
    // Button{
    //     // font-size: 14px;
    //     font-family: PingFang SC;
    //     font-weight: bold;
    //     color: #FFFFFF;
    // }
</style>