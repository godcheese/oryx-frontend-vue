<template>
  <div>
    <!--    <a-button @click="addOne">新增</a-button>-->
    <a-button size="small" style="margin-left: 10px;vertical-align: middle" @click="changeAvatar">更换头像</a-button>
    <a-modal title="更换头像" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true" :width="800" style="height: 350px">
      <div class="table-operations">
        <UploadAvatar @onCancel="uploadAvatarOnCancel"/>
      </div>
      <div style="overflow: scroll;height: 350px">
        <a-table :rowKey="(record) => record.id" @change="fileTableOnChange" :columns="fileTableColumns" size="middle" :pagination="fileTablePagination" :dataSource="fileTableDataSource" :loading="fileTableLoading" :customRow="fileTableCustomRow" :rowSelection="{selectedRowKeys: fileTableSelectedRowKeys, onChange: fileTableOnSelectChange}" :scroll="{ x: 2500, y: 0}" bordered>
        </a-table>
      </div>
      <template slot="footer">
        <a-button key="cancel" @click="onCancel">取消</a-button>
        <a-button key="ok" type="primary" @click="onOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script type="text/jsx">
    import {basicNotification} from '../../common/index.js'
    import {filePageAllImage, downloadUrlFormatter} from '../../api/file.js'
    import UploadAvatar from './UploadAvatar.vue'

    export default {
    name: 'ChangeAvatar',
    components: {UploadAvatar},
    data() {
      return {
        fileTableDataSource: [],
        fileTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 50
          }, {
            title: '文件名',
            dataIndex: 'name',
            sorter: true,
            customRender: (text, row, index) => {
              return <a target="_blank" href={downloadUrlFormatter(row.guid)}>{text}</a>
            }
          }, {
            title: '预览',
            dataIndex: 'preview',
            sorter: true,
            customRender: (text, row, index) => {
              return<img style="width:60px;height:60px" alt={text} src={downloadUrlFormatter(row.guid)}/>
            }
          }, {
            title: '文件大小',
            dataIndex: 'prettySize',
            sorter: true,
          }, {
            title: 'MIME 类型',
            dataIndex: 'mimeType',
            sorter: true,
          }, {
            title: '文件路径',
            dataIndex:'path',
            sorter: true,
          }, {
            title: '唯一标识符',
            dataIndex:'guid',
            sorter: true,
          }, {
            title: '备注',
            dataIndex:'remark',
            sorter: true,
          }, {
            title: '修改时间',
            dataIndex:'gmtModified',
            sorter: true,
          }, {
            title: '创建时间',
            dataIndex:'gmtCreated',
            sorter: true,
          },
        ],
        fileTableSelectedRowKeys: [],
        fileTableLoading: false,
        fileTablePagination: this.$store.state.antd.table.pagination,
        visible: false,
      }
    },
    mounted() {
      this.getAttachmentTableDataSource()
    },
    methods: {
      uploadAvatarOnCancel() {
        this.reloadTable()
      },
      changeAvatar() {
        this.visible = true
        this.fileTableSelectedRowKeys = []
        this.fileTableSelectedRowKeys = []
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        const tableSelectedRowKeys = this.fileTableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
          this.onCancel()
          // console.log(this.fileTableSelectedRowKeys)
          this.$emit('onOk', this.fileTableSelectedRowKeys[0])
        } else {
          basicNotification.warning({message: '必须勾选一项'})
          return
        }
      },
      fileTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.fileTableSelectedRowKeys = []
              this.fileTableSelectedRowKeys.push(record.id)
              this.fileTableSelectedRowKeys = []
              this.fileTableSelectedRowKeys.push(record)
            },
          },
        };
      },
      fileTableOnSelectChange (selectedRowKeys, selectedRows) {
        this.fileTableSelectedRowKeys = selectedRowKeys
        this.fileTableSelectedRowKeys = selectedRows;
        console.log(this.fileTableSelectedRowKeys);
      },
      fileTableOnChange(pagination, filters, sorter) {
        this.fileTablePagination = pagination;
        this.getAttachmentTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getAttachmentTableDataSource(params = {}) {
        this.fileTableLoading = true
        const pagination = {...this.fileTablePagination}
        let page = pagination.current || pagination.defaultCurrent
        let rows = pagination.pageSize || pagination.defaultPageSize
        filePageAllImage({
          page: page, rows: rows, ...params,
        }).then((data) => {
          this.fileTableLoading = false
          this.fileTableDataSource = data.rows
          pagination.total = data.total
          this.fileTablePagination = pagination
        }).catch((error) => {
          console.log(error)
          this.fileTableLoading = false
        })
      },
      reloadTable() {
        this.fileTableSelectedRowKeys = []
        this.fileTableSelectedRowKeys = []
        this.fileTableDataSource = []
        this.getAttachmentTableDataSource()
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common.less";
</style>
