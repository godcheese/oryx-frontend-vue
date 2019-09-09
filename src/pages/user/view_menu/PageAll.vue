<template>
    <BasicPage>
        <div slot="container">
            <a-row>
                <a-col :span="12">
                    <div class="table-operations">
                        <ViewMenuCategoryAddOne
                                v-has-any-authority="['/COMPONENT/USER/VIEW_MENU/VIEW_MENU_CATEGORY_ADD_ONE']"
                                :tableSelectedRowKeys="viewMenuCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
                        <ViewMenuCategoryEditOne
                                v-has-any-authority="['/COMPONENT/USER/VIEW_MENU/VIEW_MENU_CATEGORY_EDIT_ONE']"
                                :tableSelectedRowKeys="viewMenuCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
                        <ViewMenuCategoryDeleteAll
                                v-has-any-authority="['/COMPONENT/USER/VIEW_MENU/VIEW_MENU_CATEGORY_DELETE_ALL']"
                                :tableSelectedRowKeys="viewMenuCategoryTableSelectedRowKeys" @onOk="reloadTable"/>
                    </div>
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '视图菜单分类'" :rowKey="(record) => record.id"
                                 @change="viewMenuCategoryTableOnChange" :columns="viewMenuCategoryTableColumns"
                                 size="middle" :pagination="false" :dataSource="viewMenuCategoryTableDataSource"
                                 :loading="viewMenuCategoryTableLoading" :customRow="viewMenuCategoryTableCustomRow"
                                 :rowSelection="{selectedRowKeys: viewMenuCategoryTableSelectedRowKeys, onChange: viewMenuCategoryTableOnSelectChange}"
                                 :scroll="{ x: 1000, y: 0}" :indentSize="5" bordered>
                        </a-table>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="table-operations">
                        <ViewMenuAddOne v-has-any-authority="['/COMPONENT/USER/VIEW_MENU/VIEW_MENU_ADD_ONE']"
                                        :tableSelectedRowKeys="viewMenuTableSelectedRowKeys" @onOk="() => {
            this.viewMenuTableSelectedRowKeys = []
            this.viewMenuTableDataSource = []
            this.getViewMenuTableDataSource()}"/>
                        <ViewMenuEditOne v-has-any-authority="['/COMPONENT/USER/VIEW_MENU/VIEW_MENU_EDIT_ONE']"
                                         :tableSelectedRowKeys="viewMenuTableSelectedRowKeys"
                                         @onOk="() => {this.reloadViewMenuTable()}"/>
                        <ViewMenuDeleteAll v-has-any-authority="['/COMPONENT/USER/VIEW_MENU/VIEW_MENU_DELETE_ALL']"
                                           :tableSelectedRowKeys="viewMenuTableSelectedRowKeys"
                                           @onOk="() => {this.reloadViewMenuTable()}"/>
                    </div>
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '视图菜单'" :rowKey="(record) => record.id" @change="viewMenuTableOnChange"
                                 :columns="viewMenuTableColumns" size="middle" :pagination="viewMenuTablePagination"
                                 :dataSource="viewMenuTableDataSource" :loading="viewMenuTableLoading"
                                 :customRow="viewMenuTableCustomRow"
                                 :rowSelection="{selectedRowKeys: viewMenuTableSelectedRowKeys, onChange: viewMenuTableOnSelectChange}"
                                 :scroll="{ x: 1200, y: 0}" :indentSize="5" bordered>
                        </a-table>
                    </div>
                </a-col>
            </a-row>
        </div>
    </BasicPage>
</template>

<script>
    import BasicPage from '../../../components/BasicPage.vue'
    import {dictionaryListAllByKey} from '../../../api/dictionary.js'
    import {viewMenuCategoryListAllAsAntdTable} from '../../../api/viewMenuCategory.js'
    import {viewMenuPageAllAsAntdTableByViewMenuCategoryIdList} from '../../../api/viewMenu.js'
    import ViewMenuCategoryAddOne from '../view_menu_category/AddOne.vue'
    import ViewMenuCategoryEditOne from '../view_menu_category/EditOne.vue'
    import ViewMenuCategoryDeleteAll from '../view_menu_category/DeleteAll.vue'
    import ViewMenuAddOne from './AddOne.vue'
    import ViewMenuEditOne from './EditOne.vue'
    import ViewMenuDeleteAll from './DeleteAll.vue'

    export default {
        name: 'PageAll',
        components: {
            BasicPage,
            ViewMenuCategoryAddOne,
            ViewMenuCategoryEditOne,
            ViewMenuCategoryDeleteAll,
            ViewMenuAddOne,
            ViewMenuEditOne,
            ViewMenuDeleteAll,
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
                viewMenuTableSelectedRowKeys: [],
                viewMenuTableLoading: false,
                viewMenuTablePagination: this.$store.state.antd.table.pagination,
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
            this.getViewMenuCategoryTableDataSource()
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
            viewMenuCategoryTableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.viewMenuTableSelectedRowKeys = []
                            this.viewMenuTableDataSource = []
                            this.viewMenuCategoryTableSelectedRowKeys = []
                            this.viewMenuCategoryTableSelectedRowKeys.push(record.id)
                        },
                    },
                };
            },
            viewMenuCategoryTableOnSelectChange(selectedRowKeys) {
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
                this.viewMenuCategoryTableLoading = true
                viewMenuCategoryListAllAsAntdTable({...params}).then((data) => {
                    this.viewMenuCategoryTableLoading = false
                    this.viewMenuCategoryTableDataSource = data
                }).catch((error) => {
                    console.log(error)
                    this.viewMenuCategoryTableLoading = false
                })
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
            viewMenuTableOnSelectChange(selectedRowKeys) {
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
                let viewMenuCategoryTableSelectedRowKeys = this.viewMenuCategoryTableSelectedRowKeys
                if (viewMenuCategoryTableSelectedRowKeys && viewMenuCategoryTableSelectedRowKeys.length > 0) {
                    this.viewMenuTableLoading = true
                    const pagination = {...this.viewMenuTablePagination}
                    let page = pagination.current || pagination.defaultCurrent
                    let rows = pagination.pageSize || pagination.defaultPageSize
                    viewMenuPageAllAsAntdTableByViewMenuCategoryIdList({
                        page: page, rows: rows, ...params,
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
                let viewMenuCategoryTableSelectedRowKeys = this.viewMenuCategoryTableSelectedRowKeys
                if (viewMenuCategoryTableSelectedRowKeys && viewMenuCategoryTableSelectedRowKeys.length > 0) {
                    this.getViewMenuTableDataSource({
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
    @import "../../../assets/styles/common.less";
</style>
