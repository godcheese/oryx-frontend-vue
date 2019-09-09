<template>
    <BasicPage>
        <div slot="container">
            <div class="table-operations">
                <AddOne v-has-any-authority="['/COMPONENT/USER/DEPARTMENT/ADD_ONE']" @onOk="reloadTable"/>
                <EditOne v-has-any-authority="['/COMPONENT/USER/DEPARTMENT/EDIT_ONE']"
                         :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
                <DeleteAll v-has-any-authority="['/COMPONENT/USER/DEPARTMENT/DELETE_ALL']"
                           :tableSelectedRowKeys="tableSelectedRowKeys" @onOk="reloadTable"/>
            </div>
            <div style="overflow: scroll;height: 300px">
                <a-table :rowKey="(record) => record.id" @change="tableOnChange" :columns="tableColumns" size="middle"
                         :pagination="false" :dataSource="tableDataSource" :loading="tableLoading"
                         :customRow="tableCustomRow"
                         :rowSelection="{selectedRowKeys: tableSelectedRowKeys, onChange: tableOnSelectChange}"
                         :scroll="{ x: 1000, y: 0}" :indentSize="5" bordered>
                </a-table>
            </div>
        </div>
    </BasicPage>
</template>

<script type="text/jsx">
    import BasicPage from '../../../components/BasicPage.vue'
    import {departmentListAllAsAntdTable} from '../../../api/department.js'
    import AddOne from './AddOne.vue'
    import EditOne from "./EditOne.vue"
    import DeleteAll from "./DeleteAll.vue"

    export default {
        name: "ListAll",
        components: {BasicPage, AddOne, EditOne, DeleteAll},
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
                        title: '部门名称',
                        dataIndex: 'name',
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
                this.getTableDataSource({
                    sortField: sorter.field,
                    sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
                    ...this.queryParams,
                })
            },
            getTableDataSource(params = {}) {
                this.tableLoading = true
                departmentListAllAsAntdTable({...params}).then((data) => {
                    this.tableLoading = false
                    this.tableDataSource = data
                    // console.log(data)
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

