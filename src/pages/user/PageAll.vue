<template>
  <BasicPage>
    <div slot="container">
      <div class="search-form">
        <SearchForm @onSubmit="searchFormOnSubmit" @onReset="searchFormOnReset"/>
      </div>
      <div class="table-operations">
        <AddOne v-has-any-authority="['/COMPONENT/USER/ADD_ONE']" @onOk="reloadTable"/>
        <EditOne v-has-any-authority="['/COMPONENT/USER/EDIT_ONE']" :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
        <FakeDeleteAll v-has-any-authority="['/COMPONENT/USER/FAKE_DELETE_ALL']" :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
        <RevokeFakeDeleteAll v-has-any-authority="['/COMPONENT/USER/REVOKE_FAKE_DELETE_ALL']"  :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
        <DeleteAll v-has-any-authority="['/COMPONENT/USER/DELETE_ALL']" :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
        <UserRolePageAll v-has-any-authority="['/COMPONENT/USER/USER_ROLE']" :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
      </div>
      <a-table :rowKey="(record) => record.id" @change="tableOnChange" :columns="tableColumns" size="middle" :pagination="tablePagination" :dataSource="tableDataSource" :loading="tableLoading" :customRow="tableCustomRow" :rowSelection="{selectedRowKeys: tableSelectedRowKeys, onChange: tableOnSelectChange}" :scroll="{ x: 1800, y: 0}" bordered>
      </a-table>
    </div>
  </BasicPage>
</template>

<script type="text/jsx">
    import BasicPage from '../../components/BasicPage.vue'
    import {userAvatar, userPageAll} from '../../api/user.js'
    import {dictionaryFormatter, dictionaryListAllByKey} from '../../api/dictionary.js'
    import AddOne from './AddOne.vue'
    import EditOne from './EditOne.vue'
    import FakeDeleteAll from './FakeDeleteAll.vue'
    import RevokeFakeDeleteAll from './RevokeFakeDeleteAll.vue'
    import DeleteAll from './DeleteAll.vue'
    import SearchForm from './SearchForm.vue'
    import UserRolePageAll from './user_role/PageAll.vue'
    import moment from 'moment'

    export default {
    name: 'PageAll',
    components: {BasicPage, SearchForm, AddOne, EditOne, FakeDeleteAll, RevokeFakeDeleteAll, DeleteAll, UserRolePageAll, },
    data() {
      return {
        tableDataSource: [],
        tableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 100
          }, {
            title: '头像',
            dataIndex: 'avatar',
            customRender: (text, row, index) => {
              return <a-avatar src={userAvatar(text)} />
            }
          }, {
            title: '用户名',
            dataIndex: 'username',
            sorter: true,
          }, {
            title: '电子邮箱',
            dataIndex: 'email',
            sorter: true,
          }, {
            title: '电子邮箱是否验证',
            dataIndex: 'emailIsVerified',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
          }, {
            title: '所在部门',
            dataIndex: 'departmentId',
            sorter: true,
            customRender: (text, row, index) => {
              let data = row.department
              let departmentName = [];
              for (let i = 0; i < data.length; i++) {
                departmentName.push(data[i].name);
              }
              text = departmentName.join('\\')
              return text
            }
          }, {
            title: '是否启用',
            dataIndex:'enabled',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
          }, {
            title: '备注',
            dataIndex:'remark',
            sorter: true,
          }, {
            title: '删除时间',
            dataIndex:'gmtDeleted',
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
        tableSelectedRowKeys: [],
        tableLoading: false,
        tablePagination: this.$store.state.antd.table.pagination,
        isOrNot: [],
      }
    },
    mounted() {
      this.getTableDataSource()
    },
    created() {
      dictionaryListAllByKey('IS_OR_NOT').then((data) => {
        this.isOrNot = data;
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      searchFormOnSubmit(form) {
        form.validateFieldsAndScroll((error, values) => {
          console.log(values)
          if(!error) {
            let gmtCreated = values.gmtCreated;
            if(gmtCreated && gmtCreated.length > 0 ) {
              values.gmtCreatedStart = moment(gmtCreated[0]).format('YYYY-MM-DD HH:mm:ss')
              values.gmtCreatedEnd = moment(gmtCreated[1]).format('YYYY-MM-DD HH:mm:ss')
            }

            let gmtDeleted = values.gmtDeleted;
            if(gmtDeleted && gmtDeleted.length > 0 ) {
              values.gmtDeletedStart = moment(gmtDeleted[0]).format('YYYY-MM-DD HH:mm:ss')
              values.gmtDeletedEnd = moment(gmtDeleted[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            console.log(values)

            this.getTableDataSource(values)
            this.tableSelectedRowKeys = []
          }
        })
      },
      searchFormOnReset(form) {
        form.resetFields();
        this.reloadTable()
      },
      tableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.tableSelectedRowKeys = []
              this.tableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      tableOnSelectChange (selectedRowKeys) {
        this.tableSelectedRowKeys = selectedRowKeys
      },
      tableOnChange(pagination, filters, sorter) {
        this.tablePagination = pagination;
        this.getTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getTableDataSource(params = {}) {
        this.tableLoading = true
        const pagination = {...this.tablePagination}
        let page = pagination.current || pagination.defaultCurrent
        let rows = pagination.pageSize || pagination.defaultPageSize

        userPageAll({page: page, rows: rows, ...params}).then((data) => {
          this.tableLoading = false
          this.tableDataSource = data.rows
          pagination.total = data.total
          this.tablePagination = pagination
        }).catch((error) => {
          console.log(error)
          this.tableLoading = false
        })
      },
      reloadTable() {
        this.getTableDataSource()
        this.tableSelectedRowKeys = []
      },
    },
  }

</script>

