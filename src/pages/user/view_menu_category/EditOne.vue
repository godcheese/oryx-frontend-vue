<template>
    <div>
        <a-button @click="editOne">编辑</a-button>
        <a-modal title="编辑视图菜单分类" v-model="visible" :maskClosable="false" wrapClassName="form-modal"
                 :destroyOnClose="true">
            <a-form :form="form" :hideRequiredMark="false">
                <a-row>
                    <a-col>
                        <a-form-item>
                            <a-input v-decorator="['id']" type="hidden"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="分类名称" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-input v-decorator="['name',{rules: [{required: true, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="图标（icon）" :labelCol="{span: 11}" :wrapperCol="{span: 13, offset: 0}">
                            <a-input v-decorator="['icon',{rules: [{required: false, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="排序" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
                            <a-input-number style="width:100%"
                                            v-decorator="['sort',{rules: [{required: false, message: '必填',}],initialValue: 0}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="父级分类" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-tree-select
                                    :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                                    :treeData="viewMenuCategory"
                                    treeDefaultExpandAll
                                    allowClear
                                    v-decorator="['parentId',{rules: [{required: false,message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="24" :sm="24">
                        <a-form-item label="备注" :labelCol="{span: 4}" :wrapperCol="{span: 20, offset: 0}">
                            <a-textarea v-decorator="['remark',{rules: [{required: false}],}]"
                                        :autosize="{ minRows: 2, maxRows: 10 }"/>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <template slot="footer">
                <a-button key="cancel" @click="onCancel">取消</a-button>
                <a-button key="ok" type="primary" @click="onOk">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import {basicNotification} from '../../../common/index.js'
    import {
        viewMenuCategoryGetOneByViewMenuCategoryId,
        viewMenuCategoryListAllAsAntdTreeNode,
        viewMenuCategorySaveOne
    } from "../../../api/viewMenuCategory.js"

    export default {
        name: 'EditOne',
        props: {
            tableSelectedRowKeys: {type: Array, required: true}
        },
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
                viewMenuCategory: [],
            }
        },
        methods: {
            editOne() {
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                if (tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
                    basicNotification.warning({message: '必须勾选一项'})
                    return
                }
                viewMenuCategoryListAllAsAntdTreeNode().then((data) => {
                    this.viewMenuCategory = data
                }).catch((error) => {
                    console.log(error)
                })
                this.viewMenuCategoryGetOneByViewMenuCategoryId(tableSelectedRowKeys[0]);
                this.visible = true
            },
            onCancel() {
                this.visible = false
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                this.form.validateFieldsAndScroll((error, values) => {
                    if (!error) {
                        viewMenuCategorySaveOne(values).then((data) => {
                            basicNotification.success({message: '操作成功'})
                            this.visible = false
                            this.$emit('onOk', data)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                });
            },
            viewMenuCategoryGetOneByViewMenuCategoryId(id) {
                viewMenuCategoryGetOneByViewMenuCategoryId(id).then((data) => {
                    data.parentId = data.parentId !== undefined && data.parentId !== null ? data.parentId + '' : ''
                    this.form.setFieldsValue(data)
                }).catch((error) => {
                    console.log(error)
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/common.less";
</style>
