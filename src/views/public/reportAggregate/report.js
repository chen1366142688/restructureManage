import dataReportApi from '@/api/dataReport'
const mixins = {
    data() { 
        return {
            //报送弹窗相关
            reoprtSchoolModal: false,
            reportNotAllFinishModal: false,
            reportSureModal: false,
            reportLoading: false,
            reportSchoolList: [],
            selectedSchoolIds:[]
        }
    },
    methods: {
        //顶部公共报送
        commonReport(){
            this.reoprtSchoolModal = true;
        },
        commonCancel() {
            this.reoprtSchoolModal = false;
            this.reportNotAllFinishModal = false;
            this.reportSureModal = false;
        },
        //获取该教师管理的学校列表
        getTeacherSchoolList(){
            const params = { //这个参数是参照系统之前的参数，固定写法
                schoolId: 1,
                menuType:'1'
            }
            dataReportApi.getTeacherSchoolList(params).then(res => {
                if(res.data.code === 10000){
                    this.reportSchoolList = res.data.response;
                }else{
                    this.$Message.info(res.data.msg)
                }
            })
        },
        //选择学校后报送
        selectedReport() {
            let { selectedSchoolIds, currentData } = this;
            if (selectedSchoolIds.length < 1) {
                this.$Message.info("请选择报送学校！");
                return;
            }
            for (let i = 0; i < selectedSchoolIds.length; i++) {
                for (let j = 0; j < currentData.length; j++) {
                    if (this.distinguishReportType(selectedSchoolIds[i], currentData[j])) { 
                        this.reportNotAllFinishModal = true;
                        return;
                    }
                }
            }
            this.reportSureModal = true;
        },
        // 区分报送类型，体质测试/学科评价/视力测试/需要根据不同的字段判断是否完成所有学生测试方可报送，否则弹窗提示
        distinguishReportType(schoolId, currItem) { 
            const { reportType } = this.reportData;
            let privateDistingStatus = false;
            if (schoolId == currItem.schoolId) {
                if (reportType === '1') { //体测
                    if (currItem.finishStudent < (currItem.reportStudentNum - currItem.exemptStudent)) {//报送人数-免试人数
                        privateDistingStatus = true;
                    }
                } else if (reportType === '2') {//视力
                    if (currItem.visionFinishStudent < currItem.visionTotalStudent) {
                        privateDistingStatus = true;
                    }
                } else {//学科评价
                    if (currItem.subjectFinishStudent < currItem.subjectTotalStudent ) {
                        privateDistingStatus = true;
                    }
                }
            }
            return privateDistingStatus;
        },
        //确认报送 需要分类调用不同的上报接口
        suerReport() {
            const { reportData, selectedSchoolIds } = this;
            let reportRequestName = '';
            this.reportLoading = true;
            const params = {
                yearSemester: reportData.yearSemester,
                schoolIds:  selectedSchoolIds
            }
            if (reportData.reportType === '1') { //体测
                reportRequestName = 'reportTestToEducation'
            } else if (reportData.reportType === '2') {//视力
                reportRequestName = 'visionReport';
            } else {//学科评价
                reportRequestName = 'subjectReportToEducation';
            }
            dataReportApi[reportRequestName](params).then(res => { 
                this.reportLoading = false;
                this.commonCancel();
                if (res.data.code === 10000) {
                    this.$Message.info("上报成功");
                    this.commonCreated();
                } else { 
                    this.$Message.info(res.data.msg)
                }
            })
        },

    },
    mounted() { 

    }
}

export default mixins;