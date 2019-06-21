<template>
  <div>
    <a-button @click="userRole">角色分配</a-button>
    <a-modal title="角色分配" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true" :width="1200" style="height: 300px">
      <div class="table-operations">
        <GrantAll :tableSelectedRowKeys="roleTableSelectedRowKeys" :userId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadRoleTable()}"/>
        <RevokeAll :tableSelectedRowKeys="roleTableSelectedRowKeys" :userId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadRoleTable()}"/>
      </div>
      <a-table :rowKey="(record) => record.id" @change="roleTableOnChange" :columns="roleTableColumns" size="middle" :pagination="roleTablePagination" :dataSource="roleTableDataSource" :loading="roleTableLoading" :customRow="roleTableCustomRow" :rowSelection="{selectedRowKeys: roleTableSelectedRowKeys, onChange: roleTableOnSelectChange}" :scroll="{ x: 1000, y: 0}" bordered>
      </a-table>
      <template slot="footer">
        <a-button key="cancel" @click="onCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { dictionaryListAllByKey, dictionaryFormatter } from '../../../api/dictionary.js'
  import { basicNotification } from '../../../common/index.js';

  import GrantAll from './GrantAll.vue';
  import RevokeAll from './RevokeAll.vue';
  import {rolePageAllAsAntdTableByUserId} from "../../../api/role.js";

  export default {
    name: 'PageAll',
    components: {GrantAll, RevokeAll,},
    props: {
      tableSelectedRowKeys: {type: Array, required: true}
    },
    data() {
      return {
        roleTableDataSource: [],
        roleTableColumns: [
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
            title: '角色名称',
            dataIndex: 'name',
            sorter: true,
          }, {
            title: '角色值',
            dataIndex: 'value',
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
        roleTableSelectedRowKeys: [],
        roleTableLoading: false,
        roleTablePagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30', '40'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `当前显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        },
        isOrNot: [],
        userId: undefined,
        visible: false,
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
      this.getRoleTableDataSource()
    },
    methods: {
      userRole() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
          basicNotification.warning({message: '必须勾选一项'})
          return
        }
        this.visible = true
        this.userId = tableSelectedRowKeys[0]
        this.roleTableDataSource = []
        this.roleTableSelectedRowKeys = []
        this.getRoleTableDataSource()
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.visible = false
        this.$emit('onOk')
      },
      roleTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.roleTableSelectedRowKeys = []
              this.roleTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      roleTableOnSelectChange (selectedRowKeys) {
        this.roleTableSelectedRowKeys = selectedRowKeys
      },
      roleTableOnChange(pagination, filters, sorter) {
        this.roleTablePagination = pagination;
        this.getRoleTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getRoleTableDataSource(params = {}) {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
        this.roleTableLoading = true
        const pagination = {...this.roleTablePagination}
        let page = pagination.current || pagination.defaultCurrent
        let rows = pagination.pageSize || pagination.defaultPageSize
          params.userId = tableSelectedRowKeys[0]
          rolePageAllAsAntdTableByUserId({page: page, rows: rows, ...params}).then((data) => {
          this.roleTableLoading = false
          this.roleTableDataSource = data.rows
          pagination.total = data.total
          this.roleTablePagination = pagination
        }).catch((error) => {
          console.log(error)
          this.roleTableLoading = false
        })
          }
      },
      reloadRoleTable() {
        this.getRoleTableDataSource()
        this.roleTableSelectedRowKeys = []
      },
    },
  }
</script>

<style lang="less">
  @import "../../../../static/less/common.less";
</style>
