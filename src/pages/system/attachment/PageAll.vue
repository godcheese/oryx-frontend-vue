
<template>
  <BasicPage>
    <div slot="header">
    </div>
    <div slot="container">
      <div class="table-operations">
        <UploadOne :tableSelectedRowKeys="attachmentTableSelectedRowKeys" @onCancel="onCancel"/>
        <EditOne :tableSelectedRowKeys="attachmentTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
        <DeleteAll :tableSelectedRowKeys="attachmentTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
      </div>
      <div style="overflow: scroll;height: 450px">
        <a-table :rowKey="(record) => record.id" @change="attachmentTableOnChange" :columns="attachmentTableColumns" size="middle" :pagination="attachmentTablePagination" :dataSource="attachmentTableDataSource" :loading="attachmentTableLoading" :customRow="attachmentTableCustomRow" :rowSelection="{selectedRowKeys: attachmentTableSelectedRowKeys, onChange: attachmentTableOnSelectChange}" :scroll="{ x: 1800, y: 0}" bordered>
        </a-table>
      </div>
    </div>
  </BasicPage>
</template>

<script type="text/jsx">
  import BasicPage from "../../../components/BasicPage";
  import { basicNotification } from '../../../common/index.js'
  import {attachmentPageAll, downloadUrlFormatter} from '../../../api/attachment.js'

  import DeleteAll from './DeleteAll.vue'
  import EditOne from './EditOne.vue'
  import UploadOne from './UploadOne.vue'

  export default {
    name: 'PageAll',
    components: {BasicPage, DeleteAll, EditOne, UploadOne},
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
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
        this.reloadTable()
      },
      attachmentTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.attachmentTableSelectedRowKeys = []
              this.attachmentTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      attachmentTableOnSelectChange (selectedRowKeys) {
        this.attachmentTableSelectedRowKeys = selectedRowKeys
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
          attachmentPageAll({
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
        this.attachmentTableDataSource = []
        this.getAttachmentTableDataSource()
      }
    },
  }
</script>

<style lang="less">
  @import "../../../../static/less/common.less";
</style>
