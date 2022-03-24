const mixins = {
    data () {
        return {
            eyesResultColumns: [
                {
                    title: "体测项目",
                    key: "studentTotalCount",
                    align: "center",
                    minWidth: 100,
                    render: (h, params) => {
                        return "视力";
                    },
                },
                {
                    title: "已完成/测试总人数",
                    key: "overTestCount",
                    align: "center",
                    minWidth: 100,
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.overTestCount + "/" + params.row.needJoinTestCount
                        );
                    },
                },
                {
                    title: "平均左眼裸眼视力",
                    key: "averageLeft",
                    align: "center",
                    minWidth: 100,
                    render: (h, params) => {
                    return h("div", params.row.averageLeft / 100);
                    },
                },
                {
                    title: "平均右眼裸眼视力",
                    key: "averageRight",
                    align: "center",
                    minWidth: 100,
                    render: (h, params) => {
                    return h("div", params.row.averageRight / 100);
                    },
                }
            ],
            eyesOverViewColumns: []
        };
    },
    methods: {
        drawGenSLineEyes() {
            this.myChartEyes = this.$echarts.init(
                document.getElementById("myChartEyes")
            );
            this.optionEyes = {
                title: {
                    text: "视力情况图形分布",
                    subtext: "",
                    x: "center",
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {d}%",
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["完成人数", "未参加人数", "已参加未完成人数"],
                },
                series: [
                    {
                        name: "占比",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                        { value: this.eyesResultData[0].overTestCount, name: "完成人数" },
                        {
                            value: this.eyesResultData[0].needJoinTestCount - this.eyesResultData[0].joinTestCount,
                            name: "未参加人数",
                        },
                        {
                            value: this.eyesResultData[0].joinTestCount - this.eyesResultData[0].overTestCount,
                            name: "已参加未完成人数",
                        },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        normal: {
                            color: function (params) {
                                const colorList = ["#f1d776", "#e99954", "#e58467"];
                                return colorList[params.dataIndex];
                            },
                        },
                        },
                        label: {
                            show: true,
                            formatter: "{b} : ({d}%)",
                        },
                    }
                ]
            };
            this.myChartEyes.setOption(this.optionEyes);
        },
    },
    created() { 
        //构建第二个table 表头就差别一个列，复用第一个table且添加班级列
        let eyesResultColumns = [...this.eyesResultColumns]
        eyesResultColumns.splice(1,0, {
            title: "班级",
            key: "className",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
                let { gradeName, studentClass} = params.row
                return `${gradeName}${studentClass}班`;
            },
        })
        this.eyesOverViewColumns = eyesResultColumns
    },
    mounted () {
        
    }
};
export default mixins;