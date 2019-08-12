<template>
  <BasicPage>
    <div slot="container">
      <a-row>
        <a-col :span="8">
          <div class="table-operations">
            <ViewPageCategoryAddOne v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_CATEGORY_ADD_ONE']" :TableSelectedRowKeys="viewPageCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
            <ViewPageCategoryEditOne v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_CATEGORY_EDIT_ONE']" :TableSelectedRowKeys="viewPageCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
            <ViewPageCategoryDeleteAll v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_CATEGORY_DELETE_ALL']" :TableSelectedRowKeys="viewPageCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => '视图页面分类'" :rowKey="(record) => record.id" @change="viewPageCategoryTableOnChange" :columns="viewPageCategoryTableColumns" size="middle" :pagination="false" :dataSource="viewPageCategoryTableDataSource" :loading="viewPageCategoryTableLoading" :customRow="viewPageCategoryTableCustomRow" :rowSelection="{selectedRowKeys: viewPageCategoryTableSelectedRowKeys, onChange: viewPageCategoryTableOnSelectChange}" :scroll="{ x: 800, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="table-operations">
            <ViewPageAddOne v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_ADD_ONE']" :TableSelectedRowKeys="viewPageTableSelectedRowKeys" @onOk="() => {this.reloadViewPageTable()}"/>
            <ViewPageEditOne v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_EDIT_ONE']" :TableSelectedRowKeys="viewPageTableSelectedRowKeys" @onOk="() => {this.reloadViewPageTable()}"/>
            <ViewPageDeleteAll v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_DELETE_ALL']" :TableSelectedRowKeys="viewPageTableSelectedRowKeys" @onOk="() => {this.reloadViewPageTable()}"/>
            <ViewPageApiPageAll v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_API_PAGE_ALL']" :TableSelectedRowKeys="viewPageTableSelectedRowKeys"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => '视图页面'" :rowKey="(record) => record.id" @change="viewPageTableOnChange" :columns="viewPageTableColumns" size="middle" :pagination="viewPageTablePagination" :dataSource="viewPageTableDataSource" :loading="viewPageTableLoading" :customRow="viewPageTableCustomRow" :rowSelection="{selectedRowKeys: viewPageTableSelectedRowKeys, onChange: viewPageTableOnSelectChange}" :scroll="{ x: 1600, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="table-operations">
            <ViewPageComponentAddOne v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_COMPONENT_ADD_ONE']" :TableSelectedRowKeys="viewPageComponentTableSelectedRowKeys" @onOk="() => {this.reloadViewPageComponentTable()}"/>
            <ViewPageComponentEditOne v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_COMPONENT_EDIT_ONE']" :TableSelectedRowKeys="viewPageComponentTableSelectedRowKeys" @onOk="() => {this.reloadViewPageComponentTable()}"/>
            <ViewPageComponentDeleteAll v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_COMPONENT_DELETE_ALL']" :TableSelectedRowKeys="viewPageComponentTableSelectedRowKeys" @onOk="() => {this.reloadViewPageComponentTable()}"/>
            <ViewPageComponentApiPageAll v-has-any-authority="['/COMPONENT/USER/VIEW_PAGE/VIEW_PAGE_COMPONENT_API_PAGE_ALL']" :TableSelectedRowKeys="viewPageComponentTableSelectedRowKeys"/>
          </div>
          <div style="overflow: scroll;height: 300px">
            <a-table :title="() => '视图页面组件'" :rowKey="(record) => record.id" @change="viewPageComponentTableOnChange" :columns="viewPageComponentTableColumns" size="middle" :pagination="viewPageComponentTablePagination" :dataSource="viewPageComponentTableDataSource" :loading="viewPageComponentTableLoading" :customRow="viewPageComponentTableCustomRow" :rowSelection="{selectedRowKeys: viewPageComponentTableSelectedRowKeys, onChange: viewPageComponentTableOnSelectChange}" :scroll="{ x: 1800, y: 0}" :indentSize="5" bordered>
            </a-table>
          </div>
        </a-col>
      </a-row>
    </div>
  </BasicPage>
</template>

<script>
    import BasicPage from '../../../components/BasicPage.vue'
    import {dictionaryFormatter, dictionaryListAllByKey} from '../../../api/dictionary.js'
    import {viewPageCategoryListAllAsAntdTable} from '../../../api/viewPageCategory.js'
    import {viewPagePageAllAsAntdTableByViewPageCategoryIdList} from '../../../api/viewPage.js'
    import {viewPageComponentPageAllAsAntdTableByViewPageIdList} from '../../../api/viewPageComponent.js'
    import ViewPageCategoryAddOne from '../view_page_category/AddOne.vue'
    import ViewPageCategoryEditOne from '../view_page_category/EditOne.vue'
    import ViewPageCategoryDeleteAll from '../view_page_category/DeleteAll.vue'
    import ViewPageAddOne from './AddOne.vue'
    import ViewPageEditOne from './EditOne.vue'
    import ViewPageDeleteAll from './DeleteAll.vue'
    import ViewPageApiPageAll from './view_page_api/PageAll.vue'

    import ViewPageComponentAddOne from '../view_page_component/AddOne.vue'
    import ViewPageComponentEditOne from '../view_page_component/EditOne.vue'
    import ViewPageComponentDeleteAll from '../view_page_component/DeleteAll.vue'
    import ViewPageComponentApiPageAll from './view_page_component_api/PageAll.vue'

    export default {
    name: 'PageAll',
    components: {BasicPage, ViewPageCategoryAddOne, ViewPageCategoryEditOne, ViewPageCategoryDeleteAll, ViewPageAddOne, ViewPageEditOne, ViewPageDeleteAll, ViewPageComponentAddOne, ViewPageComponentEditOne, ViewPageComponentDeleteAll,ViewPageApiPageAll, ViewPageComponentApiPageAll},
    data() {
      return {
        isOrNot: [],
        viewPageCategoryTableDataSource: [],
        viewPageCategoryTableColumns: [
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
        viewPageCategoryTableSelectedRowKeys: [],
        viewPageCategoryTableLoading: false,
        viewPageTableDataSource: [],
        viewPageTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 50
          }, {
            title: '页面名称',
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
        viewPageTableSelectedRowKeys: [],
        viewPageTableLoading: false,
        viewPageTablePagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `当前显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        },

        viewPageComponentTableDataSource: [],
        viewPageComponentTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 50
          }, {
            title: '组件类型',
            dataIndex: 'viewPageComponentType',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.viewPageComponentType)
          }, {
            title: '组件名称',
            dataIndex: 'name',
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
        viewPageComponentTableSelectedRowKeys: [],
        viewPageComponentTableLoading: false,
        viewPageComponentTablePagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `当前显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        },
        visible: false,
        viewPageComponentType: []
      }
    },
    created() {
      dictionaryListAllByKey('IS_OR_NOT').then((data) => {
        this.isOrNot = data;
      }).catch((error) => {
        console.log(error)
      })
      dictionaryListAllByKey('VIEW_PAGE_COMPONENT_TYPE').then((data) => {
        this.viewPageComponentType = data;
      }).catch((error) => {
        console.log(error)
      })
    },
    mounted() {
      this.getViewPageCategoryTableDataSource()
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
      viewPageCategoryTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.viewPageTableSelectedRowKeys = []
              this.viewPageTableDataSource = []
              this.viewPageCategoryTableSelectedRowKeys = []
              this.viewPageCategoryTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      viewPageCategoryTableOnSelectChange (selectedRowKeys) {
        this.viewPageCategoryTableSelectedRowKeys = selectedRowKeys
      },
      viewPageCategoryTableOnChange(pagination, filters, sorter) {
        this.getViewPageCategoryTableDataSource({
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getViewPageCategoryTableDataSource(params = {}) {
          this.viewPageCategoryTableLoading = true
          viewPageCategoryListAllAsAntdTable({...params}).then((data) => {
            this.viewPageCategoryTableLoading = false
            this.viewPageCategoryTableDataSource = data
          }).catch((error) => {
            console.log(error)
            this.viewPageCategoryTableLoading = false
          })
      },
      viewPageTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.viewPageTableSelectedRowKeys = []
              this.viewPageTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      viewPageTableOnSelectChange (selectedRowKeys) {
        this.viewPageTableSelectedRowKeys = selectedRowKeys
      },
      viewPageTableOnChange(pagination, filters, sorter) {
        this.viewPageTablePagination = pagination;
        this.getViewPageTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getViewPageTableDataSource(params = {}) {
        let viewPageCategoryTableSelectedRowKeys = this.viewPageCategoryTableSelectedRowKeys
        if (viewPageCategoryTableSelectedRowKeys && viewPageCategoryTableSelectedRowKeys.length > 0) {
          this.viewPageTableLoading = true
          const pagination = {...this.viewPageTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          viewPagePageAllAsAntdTableByViewPageCategoryIdList({
            page: page, rows: rows, ...params,
            viewPageCategoryIdList: viewPageCategoryTableSelectedRowKeys,
          }).then((data) => {
            this.viewPageTableLoading = false
            this.viewPageTableDataSource = data.rows
            pagination.total = data.total
            this.viewPageTablePagination = pagination
          }).catch((error) => {
            console.log(error)
            this.viewPageTableLoading = false
          })
        }
      },
      reloadTable() {
        this.viewPageCategoryTableDataSource = []
        this.viewPageCategoryTableSelectedRowKeys = []
        this.getViewPageCategoryTableDataSource()
        this.viewPageTableDataSource = []
        this.viewPageTableSelectedRowKeys = []
        this.viewPageComponentTableDataSource = []
        this.viewPageComponentTableSelectedRowKeys = []
      },
      viewPageComponentTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.viewPageComponentTableSelectedRowKeys = []
              this.viewPageComponentTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      viewPageComponentTableOnSelectChange (selectedRowKeys) {
        this.viewPageComponentTableSelectedRowKeys = selectedRowKeys
      },
      viewPageComponentTableOnChange(pagination, filters, sorter) {
        this.viewPageComponentTablePagination = pagination;
        this.getViewPageComponentTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getViewPageComponentTableDataSource(params = {}) {
        let viewPageTableSelectedRowKeys = this.viewPageTableSelectedRowKeys
        if (viewPageTableSelectedRowKeys && viewPageTableSelectedRowKeys.length > 0) {
          this.viewPageComponentTableLoading = true
          const pagination = {...this.viewPageComponentTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          viewPageComponentPageAllAsAntdTableByViewPageIdList({
            page: page, rows: rows, ...params,
            viewPageIdList: viewPageTableSelectedRowKeys,
          }).then((data) => {
            this.viewPageComponentTableLoading = false
            this.viewPageComponentTableDataSource = data.rows
            pagination.total = data.total
            this.viewPageComponentTablePagination = pagination
          }).catch((error) => {
            console.log(error)
            this.viewPageComponentTableLoading = false
          })
        }
      },
      reloadViewPageTable() {
        this.viewPageTableSelectedRowKeys = []
        this.viewPageTableDataSource = []
        this.getViewPageTableDataSource()
        this.viewPageComponentTableSelectedRowKeys = []
        this.viewPageComponentTableDataSource = []
      },
      reloadViewPageComponentTable() {
        this.viewPageComponentTableSelectedRowKeys = []
        this.viewPageComponentTableDataSource = []
        this.getViewPageComponentTableDataSource()
      }
    },
    watch: {
      viewPageCategoryTableSelectedRowKeys() {
        let viewPageCategoryTableSelectedRowKeys = this.viewPageCategoryTableSelectedRowKeys
        if(viewPageCategoryTableSelectedRowKeys && viewPageCategoryTableSelectedRowKeys.length > 0) {
          this.getViewPageTableDataSource({
            viewPageCategoryIdList: viewPageCategoryTableSelectedRowKeys
          })
        } else {
          this.viewPageTableDataSource = []
          this.viewPageTableSelectedRowKeys = []
        }
      },
      viewPageTableSelectedRowKeys() {
        let viewPageTableSelectedRowKeys = this.viewPageTableSelectedRowKeys
        console.log(viewPageTableSelectedRowKeys)
        if(viewPageTableSelectedRowKeys && viewPageTableSelectedRowKeys.length > 0) {
          this.getViewPageComponentTableDataSource({
            viewPageIdList: viewPageTableSelectedRowKeys
          })
        } else {
          this.viewPageComponentTableDataSource = []
          this.viewPageComponentTableSelectedRowKeys = []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../static/less/common.less";
</style>
