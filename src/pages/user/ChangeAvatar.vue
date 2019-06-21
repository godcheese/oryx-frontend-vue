<template>
  <div>
    <!--    <a-button @click="addOne">新增</a-button>-->
    <a-button size="small" style="margin-left: 10px;vertical-align: middle" @click="changeAvatar">更换头像</a-button>
    <a-modal title="更换头像" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true" :width="800" style="height: 350px">
      <div class="table-operations">
        <UploadAvatar @onCancel="uploadAvatarOnCancel"/>
      </div>
      <div style="overflow: scroll;height: 350px">
        <a-table :rowKey="(record) => record.id" @change="attachmentTableOnChange" :columns="attachmentTableColumns" size="middle" :pagination="attachmentTablePagination" :dataSource="attachmentTableDataSource" :loading="attachmentTableLoading" :customRow="attachmentTableCustomRow" :rowSelection="{selectedRowKeys: attachmentTableSelectedRowKeys, onChange: attachmentTableOnSelectChange}" :scroll="{ x: 2500, y: 0}" bordered>
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
  import { basicNotification } from '../../common/index.js';
  import { attachmentPageAllImage } from '../../api/attachment.js';
  import {downloadUrlFormatter} from '../../api/attachment.js';
  import UploadAvatar from './UploadAvatar.vue'

  export default {
    name: 'ChangeAvatar',
    components: {UploadAvatar},
    data() {
      return {
        attachmentTableDataSource: [],
        attachmentTableColumns: [
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
        attachmentTableSelectedRowKeys: [],
        attachmentTableSelectedRows: [],
        attachmentTableLoading: false,
        attachmentTablePagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `当前显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        },
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
        this.attachmentTableSelectedRowKeys = []
        this.attachmentTableSelectedRows = []
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        const tableSelectedRowKeys = this.attachmentTableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
          this.onCancel()
          console.log(this.attachmentTableSelectedRows)
          this.$emit('onOk', this.attachmentTableSelectedRows[0])
        } else {
          basicNotification.warning({message: '必须勾选一项'})
          return
        }
      },
      attachmentTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.attachmentTableSelectedRowKeys = []
              this.attachmentTableSelectedRowKeys.push(record.id)
              this.attachmentTableSelectedRows = []
              this.attachmentTableSelectedRows.push(record)
            },
          },
        };
      },
      attachmentTableOnSelectChange (selectedRowKeys, selectedRows) {
        this.attachmentTableSelectedRowKeys = selectedRowKeys
        this.attachmentTableSelectedRows = selectedRows;
        console.log(this.attachmentTableSelectedRows);
      },
      attachmentTableOnChange(pagination, filters, sorter) {
        this.attachmentTablePagination = pagination;
        this.getAttachmentTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getAttachmentTableDataSource(params = {}) {
        this.attachmentTableLoading = true
        const pagination = {...this.attachmentTablePagination}
        let page = pagination.current || pagination.defaultCurrent
        let rows = pagination.pageSize || pagination.defaultPageSize
        attachmentPageAllImage({
          page: page, rows: rows, ...params,
        }).then((data) => {
          this.attachmentTableLoading = false
          this.attachmentTableDataSource = data.rows
          pagination.total = data.total
          this.attachmentTablePagination = pagination
        }).catch((error) => {
          console.log(error)
          this.attachmentTableLoading = false
        })
      },
      reloadTable() {
        this.attachmentTableSelectedRowKeys = []
        this.attachmentTableSelectedRows = []
        this.attachmentTableDataSource = []
        this.getAttachmentTableDataSource()
      }
    },
  }
</script>

<style lang="less">
  @import "../../../static/less/common.less";
</style>
