
<template>
  <BasicPage>
    <div slot="header">
    </div>
    <div slot="container">
      <div class="table-operations">
        <UploadOne v-has-any-authority="['/COMPONENT/SYSTEM/FILE/UPLOAD_ONE']" :tableSelectedRowKeys="fileTableSelectedRowKeys" @onCancel="onCancel"/>
        <EditOne v-has-any-authority="['/COMPONENT/SYSTEM/FILE/EDIT_ONE']" :tableSelectedRowKeys="fileTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
        <DeleteAll v-has-any-authority="['/COMPONENT/SYSTEM/FILE/DELETE_ALL']" :tableSelectedRowKeys="fileTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
      </div>
      <div style="overflow: scroll;height: 450px">
        <a-table :rowKey="(record) => record.id" @change="fileTableOnChange" :columns="fileTableColumns" size="middle" :pagination="fileTablePagination" :dataSource="fileTableDataSource" :loading="fileTableLoading" :customRow="fileTableCustomRow" :rowSelection="{selectedRowKeys: fileTableSelectedRowKeys, onChange: fileTableOnSelectChange}" :scroll="{ x: 1800, y: 0}" bordered>
        </a-table>
      </div>
    </div>
  </BasicPage>
</template>

<script type="text/jsx">
    import BasicPage from "../../../components/BasicPage"
    import {filePageAll, downloadUrlFormatter} from '../../../api/file.js'
    import DeleteAll from './DeleteAll.vue'
    import EditOne from './EditOne.vue'
    import UploadOne from './UploadOne.vue'

    export default {
    name: 'PageAll',
    components: {BasicPage, DeleteAll, EditOne, UploadOne},
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
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
        this.reloadTable()
      },
      fileTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.fileTableSelectedRowKeys = []
              this.fileTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      fileTableOnSelectChange (selectedRowKeys) {
        this.fileTableSelectedRowKeys = selectedRowKeys
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
          filePageAll({
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
        this.fileTableDataSource = []
        this.getAttachmentTableDataSource()
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/styles/common.less";
</style>
