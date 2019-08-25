<template>
  <div>
    <a-button @click="viewMenu">视图菜单管理</a-button>
    <a-modal title="视图菜单管理" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true" :width="1200" style="height: 300px">
      <a-row>
        <a-col :span="12">
          <div class="table-operations">
            <ViewMenuCategoryGrantAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_MENU/VIEW_MENU_CATEGORY_GRANT_ALL']" :tableSelectedRowKeys="viewMenuCategoryTableSelectedRowKeys" :roleId="tableSelectedRowKeys[0]" @onOk="reloadTable"/>
            <ViewMenuCategoryRevokeAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_MENU/VIEW_MENU_CATEGORY_REVOKE_ALL']" :tableSelectedRowKeys="viewMenuCategoryTableSelectedRowKeys" :roleId="tableSelectedRowKeys[0]" @onOk="reloadTable"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => '视图菜单分类'" :rowKey="(record) => record.id" @change="viewMenuCategoryTableOnChange" :columns="viewMenuCategoryTableColumns" size="middle" :pagination="false" :dataSource="viewMenuCategoryTableDataSource" :loading="viewMenuCategoryTableLoading" :customRow="viewMenuCategoryTableCustomRow" :rowSelection="{selectedRowKeys: viewMenuCategoryTableSelectedRowKeys, onChange: viewMenuCategoryTableOnSelectChange}" :scroll="{ x: 1000, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="table-operations">
            <ViewMenuGrantAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_MENU/VIEW_MENU_GRANT_ALL']" :tableSelectedRowKeys="viewMenuTableSelectedRowKeys" :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadViewMenuTable()}"/>
            <ViewMenuRevokeAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_MENU/VIEW_MENU_REVOKE_ALL']" :tableSelectedRowKeys="viewMenuTableSelectedRowKeys" :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadViewMenuTable()}"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => '视图菜单'" :rowKey="(record) => record.id" @change="viewMenuTableOnChange" :columns="viewMenuTableColumns" size="middle" :pagination="viewMenuTablePagination" :dataSource="viewMenuTableDataSource" :loading="viewMenuTableLoading" :customRow="viewMenuTableCustomRow" :rowSelection="{selectedRowKeys: viewMenuTableSelectedRowKeys, onChange: viewMenuTableOnSelectChange}" :scroll="{ x: 1200, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-button key="cancel" @click="onCancel">关闭</a-button>
<!--        <a-button key="ok" type="primary" @click="onOk">确定</a-button>-->
      </template>
    </a-modal>
  </div>
</template>

<script>
    import {dictionaryFormatter, dictionaryListAllByKey} from '../../../../api/dictionary.js'
    import {basicNotification} from '../../../../common/index.js'
    import {viewMenuCategoryListAllAsAntdTableByRoleId} from '../../../../api/viewMenuCategory.js'
    import {viewMenuPageAllAsAntdTableByRoleIdAndViewMenuCategoryIdList} from '../../../../api/viewMenu.js'

    import ViewMenuCategoryGrantAll from '../../role/view_menu_category/GrantAll.vue'
    import ViewMenuCategoryRevokeAll from '../../role/view_menu_category/RevokeAll.vue'

    import ViewMenuGrantAll from './GrantAll.vue'
    import ViewMenuRevokeAll from './RevokeAll.vue'

    export default {
    name: 'PageAll',
    components: {ViewMenuCategoryGrantAll, ViewMenuCategoryRevokeAll, ViewMenuGrantAll, ViewMenuRevokeAll,},
    props: {
      tableSelectedRowKeys: {type: Array, required: true}
    },
    data() {
      return {
        isOrNot: [],
        viewMenuCategoryTableDataSource: [],
        viewMenuCategoryTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 100
          }, {
            title: '是否已授权',
            dataIndex: 'isGranted',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
          }, {
            title: '分类名称',
            dataIndex: 'name',
            sorter: true,
          }, {
            title: '图标（icon）',
            dataIndex: 'icon',
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
        viewMenuCategoryTableSelectedRowKeys: [],
        viewMenuCategoryTableLoading: false,
        viewMenuCategoryTablePagination: this.$store.state.antd.table.pagination,
        viewMenuTableDataSource: [],
        viewMenuTableColumns: [
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
            title: '菜单名称',
            dataIndex: 'name',
            sorter: true,
          }, {
            title: '图标（icon）',
            dataIndex: 'icon',
            sorter: true,
          }, {
            title: '请求地址（url）',
            dataIndex: 'url',
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
        viewMenuTableSelectedRowKeys: [],
        viewMenuTableLoading: false,
        viewMenuTablePagination: this.$store.state.antd.table.pagination,
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
      this.getViewMenuCategoryTableDataSource()
    },
    methods: {
      viewMenu() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
          basicNotification.warning({message: '必须勾选一项'})
          return
        }
        this.visible = true
        this.roleId = tableSelectedRowKeys[0]
        this.viewMenuCategoryTableDataSource = []
        this.viewMenuCategoryTableSelectedRowKeys = []
        this.viewMenuTableDataSource = []
        this.viewMenutableSelectedRowKeys = []
        this.getViewMenuCategoryTableDataSource()
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.visible = false
        this.$emit('onOk')
      },
      viewMenuCategoryTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.viewMenuCategoryTableSelectedRowKeys = []
              this.viewMenuCategoryTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      viewMenuCategoryTableOnSelectChange (selectedRowKeys) {
        this.viewMenuCategoryTableSelectedRowKeys = selectedRowKeys
      },
      viewMenuCategoryTableOnChange(pagination, filters, sorter) {
        this.getViewMenuCategoryTableDataSource({
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getViewMenuCategoryTableDataSource(params = {}) {
        let tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length > 0 && this.visible) {
          this.viewMenuCategoryTableLoading = true
          viewMenuCategoryListAllAsAntdTableByRoleId({roleId: tableSelectedRowKeys[0],...params}).then((data) => {
            this.viewMenuCategoryTableLoading = false
            this.viewMenuCategoryTableDataSource = data
          }).catch((error) => {
            console.log(error)
            this.viewMenuCategoryTableLoading = false
          })
        }
      },
      viewMenuTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.viewMenuTableSelectedRowKeys = []
              this.viewMenuTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      viewMenuTableOnSelectChange (selectedRowKeys) {
        this.viewMenuTableSelectedRowKeys = selectedRowKeys
      },
      viewMenuTableOnChange(pagination, filters, sorter) {
          this.viewMenuTablePagination = pagination;
          this.getViewMenuTableDataSource({
            page: pagination.current,
            rows: pagination.pageSize,
            sortField: sorter.field,
            sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
            ...this.queryParams,
          })
      },
      getViewMenuTableDataSource(params = {}) {
        let tableSelectedRowKeys = this.tableSelectedRowKeys;
        let viewMenuCategoryTableSelectedRowKeys = this.viewMenuCategoryTableSelectedRowKeys
        if (viewMenuCategoryTableSelectedRowKeys && viewMenuCategoryTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
          this.viewMenuTableLoading = true
          const pagination = {...this.viewMenuTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          viewMenuPageAllAsAntdTableByRoleIdAndViewMenuCategoryIdList({
            page: page, rows: rows, ...params,
            roleId: tableSelectedRowKeys[0],
            viewMenuCategoryIdList: viewMenuCategoryTableSelectedRowKeys,
          }).then((data) => {
            this.viewMenuTableLoading = false
            this.viewMenuTableDataSource = data.rows
            pagination.total = data.total
            this.viewMenuTablePagination = pagination
          }).catch((error) => {
            console.log(error)
            this.viewMenuTableLoading = false
          })
        }
      },
      reloadTable() {
        this.getViewMenuCategoryTableDataSource()
        this.viewMenuCategoryTableSelectedRowKeys = []
        this.viewMenuTableDataSource = []
        this.viewMenuTableSelectedRowKeys = []
      },
      reloadViewMenuTable() {
        this.viewMenuTableSelectedRowKeys = []
        this.viewMenuTableDataSource = []
        this.getViewMenuTableDataSource()
      }
    },
    watch: {
      viewMenuCategoryTableSelectedRowKeys() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        let viewMenuCategoryTableSelectedRowKeys = this.viewMenuCategoryTableSelectedRowKeys
        if(viewMenuCategoryTableSelectedRowKeys && viewMenuCategoryTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
          this.getViewMenuTableDataSource({
            roleId: tableSelectedRowKeys[0],
            viewMenuCategoryIdList: viewMenuCategoryTableSelectedRowKeys
          })
        } else {
          this.viewMenuTableDataSource = []
          this.viewMenuTableSelectedRowKeys = []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/styles/common.less";
</style>
