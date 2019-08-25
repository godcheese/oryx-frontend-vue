<template>
  <div>
    <a-button @click="api">API 管理</a-button>
    <a-modal title="API 管理" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true" :width="1200" style="height: 300px">
      <a-row>
        <a-col :span="12">
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => 'API 分类'" :rowKey="(record) => record.id" @change="apiCategoryTableOnChange" :columns="apiCategoryTableColumns" size="middle" :pagination="false" :dataSource="apiCategoryTableDataSource" :loading="apiCategoryTableLoading" :customRow="apiCategoryTableCustomRow" :rowSelection="{selectedRowKeys: apiCategoryTableSelectedRowKeys, onChange: apiCategoryTableOnSelectChange}" :scroll="{ x: 1000, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="table-operations">
            <ApiGrantAll v-has-any-authority="['/COMPONENT/USER/ROLE/API/API_GRANT_ALL']" :tableSelectedRowKeys="apiTableSelectedRowKeys" :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadApiTable()}"/>
            <ApiRevokeAll v-has-any-authority="['/COMPONENT/USER/ROLE/API/API_REVOKE_ALL']" :tableSelectedRowKeys="apiTableSelectedRowKeys" :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadApiTable()}"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => 'API'" :rowKey="(record) => record.id" @change="apiTableOnChange" :columns="apiTableColumns" size="middle" :pagination="apiTablePagination" :dataSource="apiTableDataSource" :loading="apiTableLoading" :customRow="apiTableCustomRow" :rowSelection="{selectedRowKeys: apiTableSelectedRowKeys, onChange: apiTableOnSelectChange}" :scroll="{ x: 2000, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-button key="cancel" @click="onCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
    import {dictionaryFormatter, dictionaryListAllByKey} from '../../../../api/dictionary.js'
    import {basicNotification} from '../../../../common/index.js'
    import {apiCategoryListAllAsAntdTableByRoleId} from '../../../../api/apiCategory.js'
    import {apiPageAllAsAntdTableByRoleIdAndApiCategoryIdList} from '../../../../api/api.js'

    import ApiGrantAll from './GrantAll.vue'
    import ApiRevokeAll from './RevokeAll.vue'

    export default {
    name: 'PageAll',
    components: {ApiGrantAll, ApiRevokeAll,},
    props: {
      tableSelectedRowKeys: {type: Array, required: true}
    },
    data() {
      return {
        isOrNot: [],
        apiCategoryTableDataSource: [],
        apiCategoryTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 100
          }, {
            title: '分类名称',
            dataIndex: 'name',
            sorter: true,
          }, {
            title: '排序',
            dataIndex: 'sort',
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
        apiCategoryTableSelectedRowKeys: [],
        apiCategoryTableLoading: false,
        apiCategoryTablePagination: this.$store.state.antd.table.pagination,
        apiTableDataSource: [],
        apiTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 50
          }, {
            title: '是否已授权',
            dataIndex: 'isGranted',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
          }, {
            title: 'API 名称',
            dataIndex: 'name',
            sorter: true,
          }, {
            title: '请求地址（url）',
            dataIndex: 'url',
            sorter: true,
          }, {
            title: '权限（authority）',
            dataIndex: 'authority',
            sorter: true,
          }, {
            title: '排序',
            dataIndex: 'sort',
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
        apiTableSelectedRowKeys: [],
        apiTableLoading: false,
        apiTablePagination: this.$store.state.antd.table.pagination,
        visible: false,
        roleId: undefined,
      }
    },
    created() {
      dictionaryListAllByKey('IS_OR_NOT').then((data) => {
        this.isOrNot = data;
      }).catch((error) => {
        console.log(error)
      })
    },
    mounted() {
      this.getApiCategoryTableDataSource()
    },
    methods: {
      api() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
          basicNotification.warning({message: '必须勾选一项'})
          return
        }
        this.visible = true
        this.roleId = tableSelectedRowKeys[0]
        this.apiCategoryTableDataSource = []
        this.apiCategoryTableSelectedRowKeys = []
        this.apiTableDataSource = []
        this.apiTableSelectedRowKeys = []
        this.getApiCategoryTableDataSource()
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.visible = false
        this.$emit('onOk')
      },
      apiCategoryTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.apiCategoryTableSelectedRowKeys = []
              this.apiCategoryTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      apiCategoryTableOnSelectChange (selectedRowKeys) {
        this.apiCategoryTableSelectedRowKeys = selectedRowKeys
      },
      apiCategoryTableOnChange(pagination, filters, sorter) {
        this.getApiCategoryTableDataSource({
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getApiCategoryTableDataSource(params = {}) {
        let tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length > 0 && this.visible) {
          this.apiCategoryTableLoading = true
          apiCategoryListAllAsAntdTableByRoleId({roleId: tableSelectedRowKeys[0],...params}).then((data) => {
            this.apiCategoryTableLoading = false
            this.apiCategoryTableDataSource = data
          }).catch((error) => {
            console.log(error)
            this.apiCategoryTableLoading = false
          })
        }
      },
      apiTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.apiTableSelectedRowKeys = []
              this.apiTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      apiTableOnSelectChange (selectedRowKeys) {
        this.apiTableSelectedRowKeys = selectedRowKeys
      },
      apiTableOnChange(pagination, filters, sorter) {
          this.apiTablePagination = pagination;
          this.getApiTableDataSource({
            page: pagination.current,
            rows: pagination.pageSize,
            sortField: sorter.field,
            sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
            ...this.queryParams,
          })
      },
      getApiTableDataSource(params = {}) {
        let tableSelectedRowKeys = this.tableSelectedRowKeys;
        let apiCategoryTableSelectedRowKeys = this.apiCategoryTableSelectedRowKeys
        if (apiCategoryTableSelectedRowKeys && apiCategoryTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
          this.apiTableLoading = true
          const pagination = {...this.apiTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          apiPageAllAsAntdTableByRoleIdAndApiCategoryIdList({
            page: page, rows: rows, ...params,
            roleId: tableSelectedRowKeys[0],
            apiCategoryIdList: apiCategoryTableSelectedRowKeys,
          }).then((data) => {
            this.apiTableLoading = false
            this.apiTableDataSource = data.rows
            pagination.total = data.total
            this.apiTablePagination = pagination
          }).catch((error) => {
            console.log(error)
            this.apiTableLoading = false
          })
        }
      },
      reloadTable() {
        this.getApiCategoryTableDataSource()
        this.apiCategoryTableSelectedRowKeys = []
        this.apiTableDataSource = []
        this.apiTableSelectedRowKeys = []
      },
      reloadApiTable() {
        this.apiTableSelectedRowKeys = []
        this.apiTableDataSource = []
        this.getApiTableDataSource()
      }
    },
    watch: {
      apiCategoryTableSelectedRowKeys() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        let apiCategoryTableSelectedRowKeys = this.apiCategoryTableSelectedRowKeys
        if(apiCategoryTableSelectedRowKeys && apiCategoryTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
          this.getApiTableDataSource({
            roleId: tableSelectedRowKeys[0],
            apiCategoryIdList: apiCategoryTableSelectedRowKeys
          })
        } else {
          this.apiTableDataSource = []
          this.apiTableSelectedRowKeys = []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/styles/common.less";
</style>
