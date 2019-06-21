<template>
  <BasicPage>
    <div slot="container">
          <div class="table-operations">
            <OperationLogDeleteAll :tableSelectedRowKeys="operationLogTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
          </div>
          <div style="overflow: scroll;height: 450px">
            <a-table :rowKey="(record) => record.id" @change="operationLogTableOnChange" :columns="operationLogTableColumns" size="middle" :pagination="operationLogTablePagination" :dataSource="operationLogTableDataSource" :loading="operationLogTableLoading" :customRow="operationLogTableCustomRow" :rowSelection="{selectedRowKeys: operationLogTableSelectedRowKeys, onChange: operationLogTableOnSelectChange}" :scroll="{ x: 6000, y: 0}" bordered>
            </a-table>
          </div>
  </div>
  </BasicPage>
</template>

<script>
  import BasicPage from '../../../components/BasicPage.vue'
  import { dictionaryListAllByKey } from '../../../api/dictionary.js'
  import { basicNotification } from '../../../common/index.js';
  import {operationLogPageAll} from '../../../api/operationLog.js';

  import OperationLogDeleteAll from './DeleteAll.vue';
  import {dictionaryFormatter} from "../../../api/dictionary";

  export default {
    name: 'PageAll',
    components: {BasicPage, OperationLogDeleteAll},
    data() {
      return {
        operationType: [],
        operationLogTableDataSource: [],
        operationLogTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 50
          }, {
            title: '访问用户',
            dataIndex: 'userName',
            sorter: true,
          }, {
            title: '用户 IP',
            dataIndex: 'ipAddress',
            sorter: true,
          }, {
            title: '操作类型',
            dataIndex: 'operationType',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.operationType)
          }, {
            title: '操作说明',
            dataIndex: 'operation',
            sorter: true,
          }, {
            title: '请求耗时（毫秒）',
            dataIndex:'requestTime',
            sorter: true,
          }, {
            title: '请求地址',
            dataIndex:'requestUrl',
            sorter: true,
          }, {
            title: '请求方法',
            dataIndex:'requestMethod',
            sorter: true,
          }, {
            title: '请求参数',
            dataIndex:'requestParameter',
            sorter: true,
          }, {
            title: '请求语言',
            dataIndex:'acceptLanguage',
            sorter: true,
          }, {
            title: '请求来源',
            dataIndex:'referer',
            sorter: true,
          }, {
            title: '用户代理',
            dataIndex:'userAgent',
            sorter: true,
          }, {
            title: 'Handler',
            dataIndex:'handler',
            sorter: true,
          }, {
            title: 'Session ID',
            dataIndex:'sessionId',
            sorter: true,
          }, {
            title: 'Cookie',
            dataIndex:'cookie',
            sorter: true,
          }, {
            title: '响应文本类型',
            dataIndex:'contentType',
            sorter: true,
          }, {
            title: '响应状态码',
            dataIndex:'status',
            sorter: true,
          }, {
            title: '创建时间',
            dataIndex:'gmtCreated',
            sorter: true,
          },
        ],
        operationLogTableSelectedRowKeys: [],
        operationLogTableLoading: false,
        operationLogTablePagination: {
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
    created() {
      dictionaryListAllByKey('OPERATION_TYPE').then((data) => {
        this.operationType = data;
      }).catch((error) => {
        console.log(error)
      })
    },
    mounted() {
      this.getOperationLogTableDataSource()
    },
    methods: {
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.visible = false
        this.$emit('onOk')
      },
      operationLogTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.operationLogTableSelectedRowKeys = []
              this.operationLogTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      operationLogTableOnSelectChange (selectedRowKeys) {
        this.operationLogTableSelectedRowKeys = selectedRowKeys
      },
      operationLogTableOnChange(pagination, filters, sorter) {
        this.operationLogTablePagination = pagination;
        this.getOperationLogTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getOperationLogTableDataSource(params = {}) {
          this.operationLogTableLoading = true
          const pagination = {...this.operationLogTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          operationLogPageAll({
            page: page, rows: rows, ...params,
          }).then((data) => {
            this.operationLogTableLoading = false
            this.operationLogTableDataSource = data.rows
            pagination.total = data.total
            this.operationLogTablePagination = pagination
          }).catch((error) => {
            console.log(error)
            this.operationLogTableLoading = false
          })
      },
      reloadTable() {
        this.operationLogTableSelectedRowKeys = []
        this.operationLogTableDataSource = []
        this.getOperationLogTableDataSource()
      }
    },
  }
</script>

<style lang="less">
  @import "../../../../static/less/common.less";
</style>
