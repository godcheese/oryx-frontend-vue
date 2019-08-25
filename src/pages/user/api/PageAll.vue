<template>
  <BasicPage>
    <div slot="container">
      <a-row>
        <a-col :span="12">
          <div class="table-operations">
            <ApiCategoryAddOne v-has-any-authority="['/COMPONENT/USER/API_CATEGORY_ADD_ONE']" :tableSelectedRowKeys="apiCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
            <ApiCategoryEditOne v-has-any-authority="['/COMPONENT/USER/API_CATEGORY_EDIT_ONE']" :tableSelectedRowKeys="apiCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
            <ApiCategoryDeleteAll v-has-any-authority="['/COMPONENT/USER/API_CATEGORY_DELETE_ALL']" :tableSelectedRowKeys="apiCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => 'API 分类'" :rowKey="(record) => record.id" @change="apiCategoryTableOnChange" :columns="apiCategoryTableColumns" size="middle" :pagination="false" :dataSource="apiCategoryTableDataSource" :loading="apiCategoryTableLoading" :customRow="apiCategoryTableCustomRow" :rowSelection="{selectedRowKeys: apiCategoryTableSelectedRowKeys, onChange: apiCategoryTableOnSelectChange}" :scroll="{ x: 1000, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="table-operations">
            <ApiAddOne v-has-any-authority="['/COMPONENT/USER/API_ADD_ONE']" :tableSelectedRowKeys="apiTableSelectedRowKeys" @onOk="() => {this.getApiTableDataSource()}"/>
            <ApiEditOne v-has-any-authority="['/COMPONENT/USER/API_EDIT_ONE']" :tableSelectedRowKeys="apiTableSelectedRowKeys" @onOk="() => {this.reloadApiTable()}"/>
            <ApiDeleteAll v-has-any-authority="['/COMPONENT/USER/API_DELETE_ALL']" :tableSelectedRowKeys="apiTableSelectedRowKeys" @onOk="() => {this.reloadApiTable()}"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => 'API'" :rowKey="(record) => record.id" @change="apiTableOnChange" :columns="apiTableColumns" size="middle" :pagination="apiTablePagination" :dataSource="apiTableDataSource" :loading="apiTableLoading" :customRow="apiTableCustomRow" :rowSelection="{selectedRowKeys: apiTableSelectedRowKeys, onChange: apiTableOnSelectChange}" :scroll="{ x: 2000, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
      </a-row>
    </div>
  </BasicPage>
</template>

<script>
    import BasicPage from '../../../components/BasicPage.vue'
    import {apiCategoryListAllAsAntdTable} from '../../../api/apiCategory.js'
    import {apiPageAllAsAntdTableByApiCategoryIdList} from '../../../api/api.js'
    import ApiCategoryAddOne from '../api_category/AddOne.vue'
    import ApiCategoryEditOne from '../api_category/EditOne.vue'
    import ApiCategoryDeleteAll from '../api_category/DeleteAll.vue'
    import ApiAddOne from './AddOne.vue'
    import ApiEditOne from './EditOne.vue'
    import ApiDeleteAll from './DeleteAll.vue'

    export default {
    name: 'PageAll',
    components: {BasicPage, ApiCategoryAddOne, ApiCategoryEditOne, ApiCategoryDeleteAll, ApiAddOne, ApiEditOne, ApiDeleteAll},
    data() {
      return {
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
        apiTablePagination: {
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
      this.getApiCategoryTableDataSource()
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
      apiCategoryTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.apitableSelectedRowKeys = []
              this.apiTableDataSource = []
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
          this.apiCategoryTableLoading = true
          apiCategoryListAllAsAntdTable({...params}).then((data) => {
            this.apiCategoryTableLoading = false
            this.apiCategoryTableDataSource = data
          }).catch((error) => {
            console.log(error)
            this.apiCategoryTableLoading = false
          })
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
        let apiCategoryTableSelectedRowKeys = this.apiCategoryTableSelectedRowKeys
        if (apiCategoryTableSelectedRowKeys && apiCategoryTableSelectedRowKeys.length > 0) {
          this.apiTableLoading = true
          const pagination = {...this.apiTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          apiPageAllAsAntdTableByApiCategoryIdList({
            page: page, rows: rows, ...params,
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
        let apiCategoryTableSelectedRowKeys = this.apiCategoryTableSelectedRowKeys
        if(apiCategoryTableSelectedRowKeys && apiCategoryTableSelectedRowKeys.length > 0) {
          this.getApiTableDataSource({
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
  @import "../../../assets/styles/common.less";
</style>
