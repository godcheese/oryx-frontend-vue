<template>
  <BasicPage>
    <div slot="container">
          <div class="table-operations">
            <SendOne v-has-any-authority="['/COMPONENT/MAIL/SEND_ONE']" :tableSelectedRowKeys="mailTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
            <DeleteAll v-has-any-authority="['/COMPONENT/MAIL/DELETE_ALL']" :tableSelectedRowKeys="mailTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
            <a-button v-has-any-authority="['/COMPONENT/MAIL/REFRESH']" @click="() => {this.reloadTable()}">刷新</a-button>
          </div>
          <div style="overflow: scroll;height: 450px">
            <a-table :rowKey="(record) => record.id" @change="mailTableOnChange" :columns="mailTableColumns" size="middle" :pagination="mailTablePagination" :dataSource="mailTableDataSource" :loading="mailTableLoading" :customRow="mailTableCustomRow" :rowSelection="{selectedRowKeys: mailTableSelectedRowKeys, onChange: mailTableOnSelectChange}" :scroll="{ x: 3000, y: 0}" bordered>
            </a-table>
          </div>
    </div>
  </BasicPage>
</template>

<script>
    import BasicPage from '../../components/BasicPage.vue'
    import {mailPageAll} from '../../api/mail.js'

    import SendOne from './SendOne.vue'
    import DeleteAll from './DeleteAll.vue'
    import {dictionaryFormatter, dictionaryListAllByKey} from "../../api/dictionary.js"

    export default {
    name: 'PageAll',
    components: {BasicPage, SendOne, DeleteAll},
    data() {
      return {
        smsStatus: [],
        isOrNot: [],
        mailTableDataSource: [],
        mailTableColumns: [
          {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            fixed: 'left',
            width: 50
          }, {
            title: '状态',
            dataIndex: 'status',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.smsStatus)
          }, {
            title: '发件人',
            dataIndex: 'from',
            sorter: true,
          }, {
            title: '收件人',
            dataIndex: 'to',
            sorter: true,
          }, {
            title: '主题',
            dataIndex: 'subject',
            sorter: true,
          }, {
            title: '内容',
            dataIndex: 'text',
            sorter: true,
          }, {
            title: '是否为 HTML',
            dataIndex:'html',
            sorter: true,
            customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
          }, {
            title: '发信报错',
            dataIndex:'error',
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
        mailTableSelectedRowKeys: [],
        mailTableLoading: false,
        mailTablePagination: this.$store.state.antd.table.pagination,
        visible: false,
      }
    },
    created() {
      dictionaryListAllByKey('SMS_STATUS').then((data) => {
        this.smsStatus = data;
      }).catch((error) => {
        console.log(error)
      })
      dictionaryListAllByKey('IS_OR_NOT').then((data) => {
        this.isOrNot = data;
      }).catch((error) => {
        console.log(error)
      })
    },
    mounted() {
      this.getMailTableDataSource()
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
      mailTableCustomRow(record, index) {
        return {
          on: {
            click: () => {
              this.mailTableSelectedRowKeys = []
              this.mailTableSelectedRowKeys.push(record.id)
            },
          },
        };
      },
      mailTableOnSelectChange (selectedRowKeys) {
        this.mailTableSelectedRowKeys = selectedRowKeys
      },
      mailTableOnChange(pagination, filters, sorter) {
        this.mailTablePagination = pagination;
        this.getMailTableDataSource({
          page: pagination.current,
          rows: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
          ...this.queryParams,
        })
      },
      getMailTableDataSource(params = {}) {
          this.mailTableLoading = true
          const pagination = {...this.mailTablePagination}
          let page = pagination.current || pagination.defaultCurrent
          let rows = pagination.pageSize || pagination.defaultPageSize
          mailPageAll({
            page: page, rows: rows, ...params,
          }).then((data) => {
            this.mailTableLoading = false
            this.mailTableDataSource = data.rows
            pagination.total = data.total
            this.mailTablePagination = pagination
          }).catch((error) => {
            console.log(error)
            this.mailTableLoading = false
          })
      },
      reloadTable() {
        this.mailTableSelectedRowKeys = []
        this.mailTableDataSource = []
        this.getMailTableDataSource()
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common.less";
  @import "../../assets/styles/page.less";
</style>
