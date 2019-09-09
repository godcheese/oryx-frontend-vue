<template>
    <BasicPage>
        <div slot="container">
            <div class="search-form">
                <SearchForm @onSubmit="searchFormOnSubmit" @onReset="searchFormOnReset"/>
            </div>
            <div class="table-operations">
                <AddOne v-has-any-authority="['/COMPONENT/USER/ROLE/ADD_ONE']" @onOk="reloadTable"/>
                <EditOne v-has-any-authority="['/COMPONENT/USER/ROLE/EDIT_ONE']"
                         :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
                <DeleteAll v-has-any-authority="['/COMPONENT/USER/ROLE/DELETE_ALL']"
                           :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
                <ViewMenuPageAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_MENU_PAGE_ALL']"
                                 :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
                <ViewPagePageAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_PAGE_PAGE_ALL']"
                                 :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
                <ApiPageAll v-has-any-authority="['/COMPONENT/USER/ROLE/API_PAGE_ALL']"
                            :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
            </div>
            <a-table :rowKey="(record) => record.id" @change="tableOnChange" :columns="tableColumns" size="middle"
                     :pagination="tablePagination" :dataSource="tableDataSource" :loading="tableLoading"
                     :customRow="tableCustomRow"
                     :rowSelection="{selectedRowKeys: tableSelectedRowKeys, onChange: tableOnSelectChange}"
                     :scroll="{ x: 1000, y: 0}" bordered>
            </a-table>
        </div>
    </BasicPage>
</template>

<script type="text/jsx">
    import BasicPage from '../../../components/BasicPage.vue'
    import AddOne from './AddOne.vue'
    import EditOne from './EditOne.vue'
    import DeleteAll from './DeleteAll.vue'
    import SearchForm from './SearchForm.vue'
    import moment from 'moment'
    import {rolePageAll} from '../../../api/role.js'
    import ViewMenuPageAll from "../role/view_menu/PageAll.vue"
    import ViewPagePageAll from "../role/view_page/PageAll.vue"
    import ApiPageAll from "../role/api/PageAll.vue"

    export default {
        name: 'PageAll',
        components: {
            BasicPage, SearchForm, AddOne, EditOne, DeleteAll, ViewMenuPageAll, ViewPagePageAll, ApiPageAll,
        },
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
                        title: '角色名称',
                        dataIndex: 'name',
                        sorter: true,
                    }, {
                        title: '角色值',
                        dataIndex: 'value',
                        sorter: true,
                    }, {
                        title: '备注',
                        dataIndex: 'remark',
                        sorter: true,
                    }, {
                        title: '修改时间',
                        dataIndex: 'gmtModified',
                        sorter: true,
                    }, {
                        title: '创建时间',
                        dataIndex: 'gmtCreated',
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
        methods: {
            searchFormOnSubmit(form) {
                form.validateFieldsAndScroll((error, values) => {
                    // console.log(values)
                    if (!error) {
                        let gmtCreated = values.gmtCreated;
                        if (gmtCreated && gmtCreated.length > 0) {
                            values.gmtCreatedStart = moment(gmtCreated[0]).format('YYYY-MM-DD HH:mm:ss')
                            values.gmtCreatedEnd = moment(gmtCreated[1]).format('YYYY-MM-DD HH:mm:ss')
                        }

                        let gmtDeleted = values.gmtDeleted;
                        if (gmtDeleted && gmtDeleted.length > 0) {
                            values.gmtDeletedStart = moment(gmtDeleted[0]).format('YYYY-MM-DD HH:mm:ss')
                            values.gmtDeletedEnd = moment(gmtDeleted[1]).format('YYYY-MM-DD HH:mm:ss')
                        }
                        // console.log(values)

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
            tableOnSelectChange(selectedRowKeys) {
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
                rolePageAll({page: page, rows: rows, ...params}).then((data) => {
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

