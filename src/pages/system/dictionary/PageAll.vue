<template>
    <BasicPage>
        <div slot="container">
            <a-row>
                <a-col :span="12">
                    <div class="table-operations">
                        <DictionaryCategoryAddOne
                                v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_CATEGORY_ADD_ONE']"
                                :tableSelectedRowKeys="dictionaryCategoryTableSelectedRowKeys"
                                @onOk="reloadDictionaryCategoryTable"/>
                        <DictionaryCategoryEditOne
                                v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_CATEGORY_EDIT_ONE']"
                                :tableSelectedRowKeys="dictionaryCategoryTableSelectedRowKeys"
                                @onOk="reloadDictionaryCategoryTable"/>
                        <DictionaryCategoryDeleteAll
                                v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_CATEGORY_DELETE_ALL']"
                                :tableSelectedRowKeys="dictionaryCategoryTableSelectedRowKeys"
                                @onOk="reloadDictionaryCategoryTable"/>
                    </div>
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '数据字典分类'" :rowKey="(record) => record.id"
                                 @change="dictionaryCategoryTableOnChange" :columns="dictionaryCategoryTableColumns"
                                 size="middle" :pagination="false" :dataSource="dictionaryCategoryTableDataSource"
                                 :loading="dictionaryCategoryTableLoading" :customRow="dictionaryCategoryTableCustomRow"
                                 :rowSelection="{selectedRowKeys: dictionaryCategoryTableSelectedRowKeys, onChange: dictionaryCategoryTableOnSelectChange}"
                                 :scroll="{ x: 1000, y: 0}" :indentSize="5" bordered>
                        </a-table>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="table-operations">
                        <DictionaryAddOne v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_ADD_ONE']"
                                          :tableSelectedRowKeys="dictionaryTableSelectedRowKeys"
                                          @onOk="() => {this.getDictionaryTableDataSource()}"/>
                        <DictionaryEditOne v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_EDIT_ONE']"
                                           :tableSelectedRowKeys="dictionaryTableSelectedRowKeys"
                                           @onOk="() => {this.reloadDictionaryTable()}"/>
                        <DictionaryDeleteAll
                                v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_DELETE_ALL']"
                                :tableSelectedRowKeys="dictionaryTableSelectedRowKeys"
                                @onOk="() => {this.reloadDictionaryTable()}"/>
                        <DictionarySyncToMemory
                                v-has-any-authority="['/COMPONENT/SYSTEM/DICTIONARY/DICTIONARY_SYNC_TO_MEMORY']"
                                @onOk="() => {this.reloadDictionaryTable()}"/>
                    </div>
                    <div style="overflow: scroll;height: 300px">
                        <a-table :title="() => '数据字典'" :rowKey="(record) => record.id" @change="dictionaryTableOnChange"
                                 :columns="dictionaryTableColumns" size="middle" :pagination="dictionaryTablePagination"
                                 :dataSource="dictionaryTableDataSource" :loading="dictionaryTableLoading"
                                 :customRow="dictionaryTableCustomRow"
                                 :rowSelection="{selectedRowKeys: dictionaryTableSelectedRowKeys, onChange: dictionaryTableOnSelectChange}"
                                 :scroll="{ x: 2000, y: 0}" :indentSize="5" bordered>
                        </a-table>
                    </div>
                </a-col>
            </a-row>
        </div>
    </BasicPage>
</template>

<script>
    import BasicPage from '../../../components/BasicPage.vue'
    import {
        dictionaryFormatter,
        dictionaryListAllByKey,
        dictionaryPageAllByDictionaryCategoryIdList
    } from '../../../api/dictionary.js'
    import {dictionaryCategoryListAllAsAntdTable} from '../../../api/dictionaryCategory.js'

    import DictionaryCategoryAddOne from '../dictionary_category/AddOne.vue'
    import DictionaryCategoryEditOne from '../dictionary_category/EditOne.vue'
    import DictionaryCategoryDeleteAll from '../dictionary_category/DeleteAll.vue'

    import DictionaryAddOne from './AddOne.vue'
    import DictionaryEditOne from './EditOne.vue'
    import DictionaryDeleteAll from './DeleteAll.vue'
    import DictionarySyncToMemory from './SyncToMemory.vue'

    export default {
        name: 'PageAll',
        components: {
            BasicPage,
            DictionaryCategoryAddOne,
            DictionaryCategoryEditOne,
            DictionaryCategoryDeleteAll,
            DictionaryAddOne,
            DictionaryEditOne,
            DictionaryDeleteAll,
            DictionarySyncToMemory
        },
        data() {
            return {
                isOrNot: [],
                dictionaryCategoryTableDataSource: [],
                dictionaryCategoryTableColumns: [
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
                dictionaryCategoryTableSelectedRowKeys: [],
                dictionaryCategoryTableLoading: false,
                dictionaryTableDataSource: [],
                dictionaryTableColumns: [
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        sorter: true,
                        fixed: 'left',
                        width: 50
                    }, {
                        title: '字典键名',
                        dataIndex: 'keyName',
                        sorter: true,
                    }, {
                        title: '字典键',
                        dataIndex: 'key',
                        sorter: true,
                    }, {
                        title: '字典值名',
                        dataIndex: 'valueName',
                        sorter: true,
                    }, {
                        title: '字典值别名',
                        dataIndex: 'valueSlug',
                        sorter: true,
                    }, {
                        title: '字典值',
                        dataIndex: 'value',
                        sorter: true,
                    }, {
                        title: '是否启用',
                        dataIndex: 'enabled',
                        sorter: true,
                        customRender: (text, row, index) => dictionaryFormatter(text, this.isOrNot)
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
                dictionaryTableSelectedRowKeys: [],
                dictionaryTableLoading: false,
                dictionaryTablePagination: this.$store.state.antd.table.pagination,
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
            this.getDictionaryCategoryTableDataSource()
        },
        methods: {
            onCancel() {
                this.visible = false;
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                this.visible = false;
                this.$emit('onOk')
            },
            dictionaryCategoryTableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.dictionaryTableSelectedRowKeys = [];
                            this.dictionaryTableDataSource = [];
                            this.dictionaryCategoryTableSelectedRowKeys = [];
                            this.dictionaryCategoryTableSelectedRowKeys.push(record.id)
                        },
                    },
                };
            },
            dictionaryCategoryTableOnSelectChange(selectedRowKeys) {
                this.dictionaryCategoryTableSelectedRowKeys = selectedRowKeys
            },
            dictionaryCategoryTableOnChange(pagination, filters, sorter) {
                this.getDictionaryCategoryTableDataSource({
                    sortField: sorter.field,
                    sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
                    ...this.queryParams,
                })
            },
            getDictionaryCategoryTableDataSource(params = {}) {
                this.dictionaryCategoryTableLoading = true;
                dictionaryCategoryListAllAsAntdTable({...params}).then((data) => {
                    this.dictionaryCategoryTableLoading = false;
                    this.dictionaryCategoryTableDataSource = data
                }).catch((error) => {
                    this.dictionaryCategoryTableLoading = false;
                    console.log(error)
                })
            },
            dictionaryTableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.dictionaryTableSelectedRowKeys = [];
                            this.dictionaryTableSelectedRowKeys.push(record.id)
                        },
                    },
                };
            },
            dictionaryTableOnSelectChange(selectedRowKeys, selectedRows) {
                this.dictionaryTableSelectedRowKeys = selectedRowKeys
            },
            dictionaryTableOnChange(pagination, filters, sorter) {
                this.dictionaryTablePagination = pagination;
                this.getDictionaryTableDataSource({
                    page: pagination.current,
                    rows: pagination.pageSize,
                    sortField: sorter.field,
                    sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
                    ...this.queryParams,
                })
            },
            getDictionaryTableDataSource(params = {}) {
                let dictionaryCategoryTableSelectedRowKeys = this.dictionaryCategoryTableSelectedRowKeys;
                if (dictionaryCategoryTableSelectedRowKeys && dictionaryCategoryTableSelectedRowKeys.length > 0) {
                    this.dictionaryTableLoading = true;
                    const pagination = {...this.dictionaryTablePagination};
                    let page = pagination.current || pagination.defaultCurrent;
                    let rows = pagination.pageSize || pagination.defaultPageSize;
                    dictionaryPageAllByDictionaryCategoryIdList({
                        page: page, rows: rows, ...params,
                        dictionaryCategoryIdList: dictionaryCategoryTableSelectedRowKeys,
                    }).then((data) => {
                        this.dictionaryTableLoading = false;
                        this.dictionaryTableDataSource = data.rows;
                        pagination.total = data.total;
                        this.dictionaryTablePagination = pagination
                    }).catch((error) => {
                        console.log(error)
                        this.dictionaryTableLoading = false
                    })
                }
            },
            reloadDictionaryCategoryTable() {
                this.getDictionaryCategoryTableDataSource();
                this.dictionaryCategoryTableSelectedRowKeys = [];
                this.dictionaryTableDataSource = [];
                this.dictionaryTableSelectedRowKeys = []
            },
            reloadDictionaryTable() {
                this.dictionaryTableSelectedRowKeys = [];
                this.dictionaryTableDataSource = [];
                this.getDictionaryTableDataSource()
            }
        },
        watch: {
            dictionaryCategoryTableSelectedRowKeys() {
                let dictionaryCategoryTableSelectedRowKeys = this.dictionaryCategoryTableSelectedRowKeys;
                // console.log(dictionaryCategoryTableSelectedRowKeys);
                if (dictionaryCategoryTableSelectedRowKeys && dictionaryCategoryTableSelectedRowKeys.length > 0) {
                    this.getDictionaryTableDataSource({
                        dictionaryCategoryIdList: dictionaryCategoryTableSelectedRowKeys
                    })
                } else {
                    this.dictionaryTableDataSource = [];
                    this.dictionaryTableSelectedRowKeys = []
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/common.less";
</style>
