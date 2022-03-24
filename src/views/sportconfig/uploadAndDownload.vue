<template>
  <div>
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">文件传输管理</h2>
    </div>
    <Card style="margin-top:20px;">
      <div class="top-search" @keydown.enter="querySearch">
        <div class="left-input">
          <div style="margin:5px 10px;">
            <span>文件名：</span>
            <Input placeholder="请输入文件名" type="text" v-model="informationName" style="width:240px;"></Input>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="querySearch">查询</Button>
          <Button type="success" @click="showUpLoadModal = true">上传文件</Button>
        </div>
      </div>
    </Card>
    <Card style="margin-top:20px;">
      <Table border :data="dataList" :columns="columns" max-height="800"></Table>
      <div style="text-align:right;margin-top:12px;">
        <Page 
          :total="total"
          :current="pageNO" :page-size="pageSize"
          @on-change='pageNumChange'
          @on-page-size-change='pageSizechange'
          show-total show-sizer>
        </Page>
      </div>
    </Card>
    <!-- 上传文件 -->
    <Modal v-model="showUpLoadModal" width="800" :mask-closable="false">
      <p slot="header" style="text-align:center">
        <span>上传文件</span>
      </p>
      <div>
        <div style="margin-bottom:16px;">
          <span style="display:inline-block;width:64px;text-align:right">文件名称：</span>
          <Input type="text" placeholder="请输入文件名称" v-model="params.informationName" style="width:600px" :maxlength="100"></Input>
        </div>
        <div style="margin-bottom:16px;">
          <span style="display:inline-block;width:64px;text-align:right">备注：</span>
          <Input type="textarea" placeholder="请输入备注" v-model="params.remark" style="width:600px" :maxlength="200"></Input>
        </div>
        <div style="margin-bottom:16px;">
          <div style="display:flex;align-items:flex-start;">
            <span style="display:inline-block;width:64px;text-align:right;margin-top:6px">附件：</span>
            <div class="oss_file">
              <Button type="success">上传文件</Button>
              <input type="file" :id="id" @change="upLoad"  multiple="multiple" />
              <span style="color:red;">（文件最大不超过10M）</span>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in params.files" :key="index" style="margin:4px 0 4px 68px;">
          <span>{{item.fileName}}</span>
          <span>{{item.size}}kb</span>
           <span style="color:#19be6b;margin-left:24px;" v-if="item.percentage < 100.00">{{item.percentage}}%</span>
          <span v-if="item.percentage == 100.00" style="color:#19be6b;margin-left:24px;">上传成功</span>
          <span style="margin-left:12px;color:red;cursor: pointer;" @click="deleteFile(index)">删除</span>
        </div>
      </div>
      <div slot="footer" style="width:100%;text-align:center;">
        <Button type="success" @click="submitUpLoad">提交</Button>
        <Button @click="cancelUploadModal">取消</Button>
      </div>
    </Modal>
    <!-- 下载文件-选择文件 -->
    <Modal v-model="showDownLondModal" width="400" :mask-closable="false">
      <p slot="header" style="text-align:center">
        <span>选择文件</span>
      </p>
      <div>
        <div v-for="(item, index) in fileList" :key="index" style="display:flex;align-items:center;justify-content:space-between;margin:6px 0;">
          <div>{{item.fileName}}</div>
          <Button type="success" size="small" style="margin-left:16px;" @click="exportFile(item.informationDetailId)">下载</Button>
        </div>
      </div>
      <div slot="footer" style="width:100%;text-align:center;">
        <Button @click="showDownLondModal = false" type="success">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import OSS from 'ali-oss'
export default {
  props: {},
  data() {
    return {
      id: 'upload',
      percentage:'', // 上传进度
      informationName: '', // 文件名
      showUpLoadModal: false, // 上传文件Modal
      showDownLondModal: false, // 下载文件Modal
      fileNameList: [], // 已上传的文件名
      fileIndex: '', //
      pageNO: 1,
      pageSize: 10,
      params: {
        informationName: '', // 文件名称
        remark: '', // 备注
        files: []
      },
      exportStatus: false,
      fileList: [
        // {name: '探马学生信息名单.xlsx'},
        // {name: '探马学生信息名塑料袋你过来拿大龄单.xlsx'}
      ],
      total: 0,
      dataList: [
        {
          informationName: '测试文件',
          createTime: '2020-09-23 09:34:58',
          teacherName: '王老师',
          remark: '123',
          fileList: [
            {informationDetailId: 1, fileName: '测试文件1', filePatch: ''},
            {informationDetailId: 2, fileName: '测试文件2', filePatch: ''},
          ]
        },
        {
          informationName: '测试文件1111111',
          createTime: '2020-09-23 09:34:58',
          teacherName: '赵老师',
          remark: '123',
          fileList: [
            {informationDetailId: 1, fileName: '测试文件3', filePatch: ''},
            {informationDetailId: 2, fileName: '测试文件4', filePatch: ''},
          ]
        }
      ], // 表格数据
      columns: [
        {title: '名称', key: 'informationName', align:'center'},
        {title: '上传时间', key: 'createTime', align:'center'},
        {title: '上传教师', key: 'teacherName', align:'center', render: (h, params) => {
          let sendType = params.row.sendType
          let text = sendType == 2 ? '平台' : params.row.teacherName
          return h('div', text)
        }},
        {title: '备注', key: 'remark', align:'center'},
        {title: '附件', key: 'fileList', align:'center', render: (h, params) => {
          let list = params.row.fileList
          return h('div',[
            list.map((item, index) => {
              return h('div', item.fileName)
            })
          ])
        }},
        {title: '操作', key: 'action', align:'center', render:(h, params) => {
          return h('div', [
            h(
              'Button',
              {
                props: {
                  type: 'success'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.downloadFiles(params.index) // 文件下载
                  }
                }
              },
              '下载'
            ),
            h(
              'Button',
              {
                props: {
                  type: 'success'
                },
                style: {
                  marginLeft: '10px',
                  display: params.row.sendType == 2 ? 'none' : ''
                },
                on: {
                  click: () => {
                    this.updateInfomationStatus(params.row)
                  }
                }
              },
              '删除'
            )
          ])
        }},
      ]
    };
  },
  mounted() {
    this.querySearch() // 查询表格数据
  },
  methods: {
    /** 删除表格数据 */
    updateInfomationStatus (item) {
      this.$axios.get(`/v1/school/updateInfomationStatus?informationId=${item.informationId}`).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('删除成功')
          this.querySearch()
        }
      })
    },
    /** 文件下载 */
    downloadFiles (index) {
      this.showDownLondModal = true
      this.fileList = this.dataList[index].fileList
    },
    /** 关闭文件下载弹窗 */
    cancelUploadModal () {
      this.showUpLoadModal = false
      this.params = {
        informationName: '', // 文件名称
        remark: '', // 备注
        files: []
      },
      this.percentage = ''
    },
    querySearch () {
      this.pageNO = 1
      this.getDataList()
      this.getListCount()
    },
    /** 删除已上传的文件 */
    deleteFile (index) {
      this.params.files.splice(index, 1)
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNO != value) {
        this.pageNO = value
        this.getDataList()
        this.getListCount()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNO = 1;
        this.querySearch()
      }
    },
    getListCount () {
      const { informationName } = this
      this.$axios.get(`/v1/school/queryInfomationForSchoolListCount?informationName=${informationName}`).then(res => {
        if (res.data.code === 10000) {
          this.total = res.data.response
        }
      })
    },
     /** 查询表格数据 */
    getDataList () {
      const { informationName, pageNO, pageSize } = this
      this.$axios.get(`/v1/school/queryInfomationForSchoolList?informationName=${informationName}&pageNO=${pageNO}&pageSize=${pageSize}`).then(res => {
        if (res.data.code === 10000) {
          this.dataList = res.data.response || []
        }
      })
    },
    // 随机生成文件名
    random_string(len) {
      len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    /** 文件上传 */
    upLoad (e) {
      const _this = this;
      const urls = [];
      var timestamp = new Date().valueOf();
      //上次请求STS的时间和当前时间的时间差
      let second = parseInt(
        (timestamp - localStorage.getItem("overTimes")) / 1000 / 60
      );
      this.$axios.get("/v1/file/getSchoolOssFileUploadToken").then(result => {
        this.overTimes = result.data.response.overTimes;
        localStorage.setItem("overTimes", result.data.response.overTimes);
        this.bucket = result.data.response.bucket;
        let info = {
          region: result.data.response.region,
          accessKeyId: result.data.response.accessKeyId,
          accessKeySecret: result.data.response.accessKeySecret,
          stsToken: result.data.response.securityToken,
          bucket: result.data.response.bucket,
          secure: true
        };

        let client = new OSS(info);
        _this.percentage = 0;
        const files = document.getElementById(_this.id);
        if (files.files) {
          const fileLen = document.getElementById(_this.id).files;
          let resultUpload = "";
          for (let i = 0; i < fileLen.length; i++) {
            const file = fileLen[i];
            let fileShow = file.name.split(".").pop();
            let size = file.size/(1024*1024) // 文件大小不得超过10M
            if (size > 10) {
              _this.$Message.error(`${file.name}超出了10M大小！`)
              continue;
            }
            // 随机命名
            let random_name = result.data.response.filePath + '/' +
              this.random_string(6) +
              "_" +
              new Date().getTime() +
              "." +
              file.name.split(".").pop();
              _this.params.files.push({ // 已上传文件列表
                fileName: file.name,
                size: (file.size/1024).toFixed(2),
                filePatch: random_name,
              })
            // 上传
            client
              .multipartUpload(random_name, file, {
                  progress: function (percentage, cpt) {
                  // 上传进度
                  let list = _this.params.files.slice(0)
                  list.forEach(item => {
                    if (item.fileName.includes(file.name)) {
                      item.percentage = (percentage*100).toFixed(2)
                    }
                  })
                  _this.params.files = list
                }
              })
              .then(results => {
                e.target.value = ''
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });
    },
    /** 下载文件 */
    exportFile (id) {
      let url =this.$axios.defaults.baseURL +"/v1/file/upload/schoolFileDownload?token=" +sessionStorage.getItem("token")+"&informationDetailId=" + id;
      window.open(url);
    },
    /** 提交 */
    submitUpLoad () {
      let params = this.params
      if (!params.informationName) {
        this.$Message.error('请填写文件名称！')
        return false
      }
      if (params.files.length <= 0) {
        this.$Message.error('请上传附件！')
        return false
      }
      params.files.forEach(item => {
        delete item.size
        delete item.percentage
      })
      this.$axios.post('/v1/school/saveSchoolFileInformation', params).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('提交成功')
          this.showUpLoadModal = false
          this.querySearch()
          this.params = {
            informationName: '', // 文件名称
            remark: '', // 备注
            files: []
          },
          this.percentage = ''
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.oss_file{
  width:100%;
  height:100%;
  position: relative;
  margin-left:12px;
  display:flex;
  align-items:center;
}
.oss_file input{
  position: absolute;
  left:0;
  top:0;
  opacity: 0;
  height:100%;
}
.oss_file img{
  width:200px;
  height:200px;
}
</style>
