<template>
    <div>
        <Modal
            @on-cancel="cancle"
            v-model="driverModal"
            title="导出设置"
        >
            <div class="driver-project">
                    <p>导出项目：</p>
                    <div class="project-content">
                        <CheckboxGroup v-model="fruit"  class="checkbox">
                            <span v-for="item in itemList" :key="item.middleItemId">
                                <Checkbox
                                    :label="item.middleItemName"
                                    >{{item.middleItemName}}
                                </Checkbox>
                            </span>
                        </CheckboxGroup>
                    </div>
                </div>
                <div class="driver-project">
                    <p>导出年级：</p>
                    <div class="project-content">
                        <CheckboxGroup v-model="fruitTwo" class="checkbox">
                            <span v-for="item in itemListNew" :key="item.grade">
                                <Checkbox
                                    :label="item.grade"
                                    >{{item.label}}
                                </Checkbox>
                            </span>
                        </CheckboxGroup>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="success"  @click="cancle" >取消</Button>
                    <Button type="success"   :loading="changeLoading" @click="changeGroup">提交</Button>
                </div>
        </Modal>
    </div>
</template>
<script>
import gradeData from '@/libs/grade.js'
import comon from '@/views/km/examinationItemAllocation/examinationAllocation/components/comon.js'
export default {
    mixins:[comon],
    props: [
        "driverdisable"
    ],
    data() {
        return {
            fruit: [],
            fruitTwo: [],
            driverModal: this.driverdisable,
            changeLoading: false,
            itemListNew:[],//所有项目
            projectList:[
                {name:'一分钟跳绳',id:1},
                {name:'一分钟跳绳',id:2},
                {name:'一分钟跳绳',id:3},
                {name:'一分钟跳绳dada',id:4},
                {name:'一分钟跳绳',id:5},
                {name:'一分钟跳绳dadadd',id:6},
                {name:'一分钟跳绳',id:7},
                {name:'一分钟跳绳',id:8},
            ]
        }
    },
    mounted() {
      const list = this.gradeList;
      this.itemListNew = list.filter((item)=>{
        return item.grade !='9999'  
      })
    },
    methods: {
        exportChange() {

        },
        //清除
        cancle() {
            this.driverModal = false;
            this.$emit('update:dreiveDisable',false);
        },
        //提交
        changeGroup() {
            this.$emit('update:dreiveDisable',false)
            this.$emit('accomplish',this.fruitTwo,this.fruit)
        }
    }
}
</script>
<style lang="less" scoped>
    .driver-project{
        margin:15px 18px;
        p{
            width: 50px;
            font-size: 8px;
            white-space: nowrap;
            margin-right: 10px;
        }
        display: flex;
        .checkbox{
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-around;
            // align-items: ;
            label{
                margin:0 15.5px 14.5px 0;
            }
        }
        
    }
</style>