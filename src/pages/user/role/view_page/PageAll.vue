<template>
    <div>
        <a-button @click="viewPage">视图页面管理</a-button>
        <a-modal title="视图页面管理" v-model="visible" :maskClosable="false" wrapClassName="form-modal"
                 :destroyOnClose="true" :width="1200" style="height: 300px">
            <a-row>
                <a-col :span="8">
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '视图页面分类'" :rowKey="(record) => record.id"
                                 @change="viewPageCategoryTableOnChange" :columns="viewPageCategoryTableColumns"
                                 size="middle" :pagination="false" :dataSource="viewPageCategoryTableDataSource"
                                 :loading="viewPageCategoryTableLoading" :customRow="viewPageCategoryTableCustomRow"
                                 :rowSelection="{selectedRowKeys: viewPageCategoryTableSelectedRowKeys, onChange: viewPageCategoryTableOnSelectChange}"
                                 :scroll="{ x: 800, y: 0}" :indentSize="5" bordered>
                        </a-table>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="table-operations">
                        <ViewPageGrantAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_PAGE/VIEW_PAGE_GRANT_ALL']"
                                          :tableSelectedRowKeys="viewPageTableSelectedRowKeys"
                                          :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadViewPageTable()}"/>
                        <ViewPageRevokeAll v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_PAGE/VIEW_PAGE_REVOKE_ALL']"
                                           :tableSelectedRowKeys="viewPageTableSelectedRowKeys"
                                           :roleId="tableSelectedRowKeys[0]"
                                           @onOk="() => {this.reloadViewPageTable()}"/>
                    </div>
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '视图页面'" :rowKey="(record) => record.id" @change="viewPageTableOnChange"
                                 :columns="viewPageTableColumns" size="middle" :pagination="viewPageTablePagination"
                                 :dataSource="viewPageTableDataSource" :loading="viewPageTableLoading"
                                 :customRow="viewPageTableCustomRow"
                                 :rowSelection="{selectedRowKeys: viewPageTableSelectedRowKeys, onChange: viewPageTableOnSelectChange}"
                                 :scroll="{ x: 1600, y: 0}" :indentSize="5" bordered>
                        </a-table>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="table-operations">
                        <ViewPageComponentGrantAll
                                v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_PAGE/VIEW_PAGE_COMPONENT_GRANT_ALL']"
                                :tableSelectedRowKeys="viewPageComponentTableSelectedRowKeys"
                                :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadViewPageComponentTable()}"/>
                        <ViewPageComponentRevokeAll
                                v-has-any-authority="['/COMPONENT/USER/ROLE/VIEW_PAGE/VIEW_PAGE_COMPONENT_REVOKE_ALL']"
                                :tableSelectedRowKeys="viewPageComponentTableSelectedRowKeys"
                                :roleId="tableSelectedRowKeys[0]" @onOk="() => {this.reloadViewPageComponentTable()}"/>
                    </div>
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '视图页面组件'" :rowKey="(record) => record.id"
                                 @change="viewPageComponentTableOnChange" :columns="viewPageComponentTableColumns"
                                 size="middle" :pagination="viewPageComponentTablePagination"
                                 :dataSource="viewPageComponentTableDataSource" :loading="viewPageComponentTableLoading"
                                 :customRow="viewPageComponentTableCustomRow"
                                 :rowSelection="{selectedRowKeys: viewPageComponentTableSelectedRowKeys, onChange: viewPageComponentTableOnSelectChange}"
                                 :scroll="{ x: 1800, y: 0}" :indentSize="5" bordered>
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
    import {viewPageCategoryListAllAsAntdTableByRoleId} from '../../../../api/viewPageCategory.js'
    import {viewPagePageAllAsAntdTableByRoleIdAndViewPageCategoryIdList} from '../../../../api/viewPage.js'
    import {viewPageComponentPageAllAsAntdTableByRoleIdAndViewPageIdList} from '../../../../api/viewPageComponent.js'

    import ViewPageGrantAll from './GrantAll.vue'
    import ViewPageRevokeAll from './RevokeAll.vue'

    import ViewPageComponentGrantAll from '../view_page_component/GrantAll.vue'
    import ViewPageComponentRevokeAll from '../view_page_component/RevokeAll.vue'

    export default {
        name: 'PageAll',
        components: {ViewPageGrantAll, ViewPageRevokeAll, ViewPageComponentGrantAll, ViewPageComponentRevokeAll,},
        props: {
            tableSelectedRowKeys: {type: Array, required: true}
        },
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
                        title: '是否已授权',
                        dataIndex: 'isGranted',
                        sorter: true,
                        customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
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
                viewPageTableSelectedRowKeys: [],
                viewPageTableLoading: false,
                viewPageTablePagination: this.$store.state.antd.table.pagination,
                viewPageComponentTableDataSource: [],
                viewPageComponentTableColumns: [
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
                viewPageComponentTableSelectedRowKeys: [],
                viewPageComponentTableLoading: false,
                viewPageComponentTablePagination: this.$store.state.antd.table.pagination,
                visible: false,
                roleId: undefined,
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
            viewPage() {
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                if (tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
                    basicNotification.warning({message: '必须勾选一项'})
                    return
                }
                this.visible = true
                this.roleId = tableSelectedRowKeys[0]
                this.viewPageCategoryTableDataSource = []
                this.viewPageCategoryTableSelectedRowKeys = []
                this.viewPageTableDataSource = []
                this.viewPageTableSelectedRowKeys = []
                this.getViewPageCategoryTableDataSource()
            },
            onCancel() {
                this.visible = false
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                // this.form.validateFieldsAndScroll((error, values) => {
                //   if (!error) {
                //     roleSaveOne(values).then((data) => {
                //       basicNotification.success({message: '操作成功'})
                this.visible = false
                // this.$emit('onOk', data)
                this.$emit('onOk')
                //     }).catch((error) => {
                //       console.log(error)
                //     })
                //   }
                // });
            },
            viewPageCategoryTableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.viewPageCategoryTableSelectedRowKeys = []
                            this.viewPageCategoryTableSelectedRowKeys.push(record.id)
                        },
                    },
                };
            },
            viewPageCategoryTableOnSelectChange(selectedRowKeys) {
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
                let tableSelectedRowKeys = this.tableSelectedRowKeys
                if (tableSelectedRowKeys && tableSelectedRowKeys.length > 0 && this.visible) {
                    this.viewPageCategoryTableLoading = true
                    viewPageCategoryListAllAsAntdTableByRoleId({roleId: tableSelectedRowKeys[0], ...params}).then((data) => {
                        this.viewPageCategoryTableLoading = false
                        this.viewPageCategoryTableDataSource = data
                    }).catch((error) => {
                        console.log(error)
                        this.viewPageCategoryTableLoading = false
                    })
                }
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
            viewPageTableOnSelectChange(selectedRowKeys) {
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
                let tableSelectedRowKeys = this.tableSelectedRowKeys;
                let viewPageCategoryTableSelectedRowKeys = this.viewPageCategoryTableSelectedRowKeys
                if (viewPageCategoryTableSelectedRowKeys && viewPageCategoryTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
                    this.viewPageTableLoading = true
                    const pagination = {...this.viewPageTablePagination}
                    let page = pagination.current || pagination.defaultCurrent
                    let rows = pagination.pageSize || pagination.defaultPageSize
                    viewPagePageAllAsAntdTableByRoleIdAndViewPageCategoryIdList({
                        page: page, rows: rows, ...params,
                        roleId: tableSelectedRowKeys[0],
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
            viewPageComponentTableOnSelectChange(selectedRowKeys) {
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
                let tableSelectedRowKeys = this.tableSelectedRowKeys;
                let viewPageTableSelectedRowKeys = this.viewPageTableSelectedRowKeys
                if (viewPageTableSelectedRowKeys && viewPageTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
                    this.viewPageComponentTableLoading = true
                    const pagination = {...this.viewPageComponentTablePagination}
                    let page = pagination.current || pagination.defaultCurrent
                    let rows = pagination.pageSize || pagination.defaultPageSize
                    viewPageComponentPageAllAsAntdTableByRoleIdAndViewPageIdList({
                        page: page, rows: rows, ...params,
                        roleId: tableSelectedRowKeys[0],
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
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                let viewPageCategoryTableSelectedRowKeys = this.viewPageCategoryTableSelectedRowKeys
                if (viewPageCategoryTableSelectedRowKeys && viewPageCategoryTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
                    this.getViewPageTableDataSource({
                        roleId: tableSelectedRowKeys[0],
                        viewPageCategoryIdList: viewPageCategoryTableSelectedRowKeys
                    })
                } else {
                    this.viewPageTableDataSource = []
                    this.viewPageTableSelectedRowKeys = []
                }
            },
            viewPageTableSelectedRowKeys() {
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                let viewPageTableSelectedRowKeys = this.viewPageTableSelectedRowKeys
                console.log(tableSelectedRowKeys)
                console.log(viewPageTableSelectedRowKeys)
                if (viewPageTableSelectedRowKeys && viewPageTableSelectedRowKeys.length > 0 && tableSelectedRowKeys && tableSelectedRowKeys.length === 1) {
                    this.getViewPageComponentTableDataSource({
                        roleId: tableSelectedRowKeys[0],
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
    @import "../../../../assets/styles/common.less";
</style>
