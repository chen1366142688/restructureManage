<template>
    <div class="project-table">
        <div>
            <Row>
                <div style>
                    <Table
                    border
                    max-height="650"
                    :loading="loading"
                    :columns="resultColumns"
                    :data="resultData"
                    ></Table>
                </div>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            resultColumns: [
                {
                    title: '考试时间',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 300,
                },
                {
                    title: '成绩',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '得分',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '录入教师',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    title: '录入时间',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                },
                {
                title: "操作",
                key: "action",
                align: "center",
                minWidth: 200,
                render: (h, params) => {
                    const row = params.row;
                    return h("div", {

                        style:{
                            display: "flex",
                            justifyContent: "space-around",
                        }
                        },[
                        h(
                            "Button",
                            {
                            props: {
                                type: "success",
                                disabled: false,
                            },
                            style: {
                                marginRight: "10px",
                            },
                            on: {
                                click: () => {
                                this.toDetail(row.classTestId);
                                },
                            },
                            },
                            "修改"
                        )
                        ]);
                    },
                },
                {
                    title: '备注',
                    key: 'projectName',
                    align: 'center',
                    minWidth: 100,
                },
            ],
            resultData: [{
                name:1
            }],

        }
    },
    methods: {
        toDetail(){

        }
    }
}
</script>
<style lang="less" scoped>
    .project-table {
        width: 100%;
        height:100%;
    }
</style>