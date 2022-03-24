<template>
    <div style="padding-left:10px;">
        <div>
            <card>
                <div class="top-search">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>姓名：XX</span>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>学籍号：XX</span>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>年级：XX</span>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>班级：XX</span>
                        </div>
                        <div style="margin:5px 20px;">
                            <span >分数：</span>
                            <Input v-model="countNum"  placeholder="分数" style="width: 120px;"/>
                        </div>
                    </div>
                    <div class="right-btns">
                        <Button type="success" @click="saveStudentScore">保存</Button>
                        <Button type="success" @click="back">返回</Button>
                    </div>
                </div>
            </card>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'paperClassStudentResults',
        methods: {
            saveStudentScore(){
            },
            back(){
                this.$router.go(-1);
            },
        }
    };
</script>

