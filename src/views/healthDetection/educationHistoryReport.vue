<template>
    <div class="paL10">
        <CommonReport :reportData="reportData" :isNeedBack="true"></CommonReport>
    </div>
</template>

<script>
import CommonReport from '@/views/public/reportAggregate/index.vue'
export default {
    components: {
        CommonReport
    },
    data() {
        return {
            reportData:{
                yearSemester: '',
                reportType: '1'
            },
        }
    },
    methods: {
        
    },
    created() {
        const {yearSemester, reportType} = this.$route.query
        this.reportData.yearSemester = yearSemester
        this.reportData.reportType = reportType
    },
    mounted() {
        
    }
}
</script>
<style lang="less" scoped>
.paL10{padding-left:10px}
</style>
