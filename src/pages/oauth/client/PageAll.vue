<template>
    <BasicPage>
        <div slot="container">
            <div class="table-operations">
                <AddOne v-has-any-authority="['/COMPONENT/OAUTH/CLIENT/ADD_ONE']" @onOk="reloadTable"/>
                <EditOne v-has-any-authority="['/COMPONENT/OAUTH/CLIENT/EDIT_ONE']" :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
                <DeleteAll v-has-any-authority="['/COMPONENT/OAUTH/CLIENT/DELETE_ALL']" :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
            </div>
            <a-table :rowKey="(record) => record.clientId" @change="tableOnChange" :columns="tableColumns" size="middle" :pagination="tablePagination" :dataSource="tableDataSource" :loading="tableLoading" :customRow="tableCustomRow" :rowSelection="{selectedRowKeys: tableSelectedRowKeys, onChange: tableOnSelectChange}" :scroll="{ x: 2500, y: 0}" bordered>
            </a-table>
        </div>
    </BasicPage>
</template>

<script type="text/jsx">
    import BasicPage from '../../../components/BasicPage.vue'
    import AddOne from './AddOne.vue'
    import EditOne from './EditOne.vue'
    import DeleteAll from './DeleteAll.vue'
    import {clientPageAll} from '../../../api/oauth.js'

    export default {
        name: 'PageAll',
        components: {BasicPage, AddOne, EditOne, DeleteAll},
        data() {
            return {
                tableDataSource: [],
                tableColumns: [
                    {
                        title: 'Client Id',
                        dataIndex: 'clientId',
                        sorter: true,
                        fixed: 'left',
                        width: 100
                    }, {
                        title: 'Client Secret',
                        dataIndex: 'clientSecret',
                        sorter: true,
                    }, {
                        title: 'Resource Ids',
                        dataIndex: 'resourceIds',
                        sorter: true,
                    }, {
                        title: 'Scope',
                        dataIndex:'scope',
                        sorter: true,
                    }, {
                        title: 'Authorized Grant Types',
                        dataIndex:'authorizedGrantTypes',
                        sorter: true,
                    }, {
                        title: 'Web Server Redirect Uri',
                        dataIndex:'webServerRedirectUri',
                        sorter: true,
                    }, {
                        title: 'authorities',
                        dataIndex:'authorities',
                        sorter: true,
                    }, {
                        title: 'Access Token Validity',
                        dataIndex:'accessTokenValidity',
                        sorter: true,
                    }, {
                        title: 'Refresh Token Validity',
                        dataIndex:'refreshTokenValidity',
                        sorter: true,
                    }, {
                        title: 'Additional Information',
                        dataIndex:'additionalInformation',
                        sorter: true,
                    }, {
                        title: 'Autoapprove',
                        dataIndex:'autoapprove',
                        sorter: true,
                    },
                ],
                tableSelectedRowKeys: [],
                tableLoading: false,
                tablePagination: this.$store.state.antd.table.pagination,
            }
        },
        mounted() {
            this.getTableDataSource()
        },
        methods: {
            tableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.tableSelectedRowKeys = [];
                            this.tableSelectedRowKeys.push(record.clientId);
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
                this.tableLoading = true;
                const pagination = {...this.tablePagination};
                let page = pagination.current || pagination.defaultCurrent;
                let rows = pagination.pageSize || pagination.defaultPageSize;
                clientPageAll({page: page, rows: rows, ...params}).then((data) => {
                    this.tableLoading = false;
                    this.tableDataSource = data.rows;
                    pagination.total = data.total;
                    this.tablePagination = pagination;
                }).catch((error) => {
                    console.log(error);
                    this.tableLoading = false;
                })
            },
            reloadTable() {
                this.getTableDataSource();
                this.tableSelectedRowKeys = [];
            },
        },
    }
</script>
