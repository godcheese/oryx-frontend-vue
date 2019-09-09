<template>
    <div>
        <a-button @click="editOne">编辑</a-button>
        <a-modal title="编辑视图页面组件" v-model="visible" :maskClosable="false" wrapClassName="form-modal"
                 :destroyOnClose="true">
            <a-form :form="form" :hideRequiredMark="false">
                <a-row>
                    <a-col>
                        <a-form-item>
                            <a-input v-decorator="['id']" type="hidden"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="组件名称" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-input v-decorator="['name',{rules: [{required: true, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="组件类型" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-select
                                    v-decorator="['viewPageComponentType',{rules: [{required: true,message: '必填',}],}]"
                                    :defaultActiveFirstOption="true">
                                <a-select-option v-for="item in viewPageComponentType" :key="item.value">
                                    {{item.valueName}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="排序" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
                            <a-input-number style="width:100%"
                                            v-decorator="['sort',{rules: [{required: false, message: '必填',}],initialValue: 0}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="视图页面分类" :labelCol="{span: 11}" :wrapperCol="{span: 13, offset: 0}">
                            <a-tree-select
                                    :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                                    :treeData="viewPageCategory"
                                    treeDefaultExpandAll
                                    @change="viewPageCategoryOnChange"
                                    v-decorator="['viewPageCategoryId',{rules: [{required: true,message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="视图页面" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-select v-decorator="['viewPageId',{rules: [{required: true,message: '必填',}],}]"
                                      :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                            >
                                <a-select-option v-for="item in viewPage" :key="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="24" :sm="24">
                        <a-form-item label="权限（authority）" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
                            <a-textarea v-decorator="['authority',{rules: [{required: true, message: '必填',}],}]"
                                        :autosize="{ minRows: 2, maxRows: 10 }"/>
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
        viewPageCategoryGetOneByViewPageId,
        viewPageCategoryListAllAsAntdTreeNode
    } from "../../../api/viewPageCategory.js"
    import {dictionaryListAllByKey} from "../../../api/dictionary.js"
    import {
        viewPageComponentGetOneByViewPageComponentId,
        viewPageComponentSaveOne
    } from "../../../api/viewPageComponent.js"
    import {viewPageListAllByViewPageCategoryId} from "../../../api/viewPage.js"

    export default {
        name: 'EditOne',
        props: {
            tableSelectedRowKeys: {type: Array, required: true}
        },
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
                viewPageCategory: [],
                viewPage: [],
                viewPageComponentType: [],
            }
        },
        methods: {
            editOne() {
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                if (tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
                    basicNotification.warning({message: '必须勾选一项'})
                    return
                }
                viewPageCategoryListAllAsAntdTreeNode().then((data) => {
                    this.viewPageCategory = data
                }).catch((error) => {
                    console.log(error)
                })
                dictionaryListAllByKey('VIEW_PAGE_COMPONENT_TYPE').then((data) => {
                    this.viewPageComponentType = data;
                }).catch((error) => {
                    console.log(error)
                })
                this.viewPageComponentGetOneByViewPageComponentId(tableSelectedRowKeys[0]);
                this.visible = true
            },
            onCancel() {
                this.visible = false
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                this.form.validateFieldsAndScroll((error, values) => {
                    if (!error) {
                        viewPageComponentSaveOne(values).then((data) => {
                            basicNotification.success({message: '操作成功'})
                            this.visible = false
                            this.$emit('onOk', data)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                });
            },
            viewPageComponentGetOneByViewPageComponentId(id) {
                viewPageComponentGetOneByViewPageComponentId(id).then((data) => {
                    data.viewPageComponentType = data.viewPageComponentType !== undefined && data.viewPageComponentType !== null ? data.viewPageComponentType + '' : ''
                    viewPageCategoryGetOneByViewPageId(data.viewPageId).then((viewPageCategory) => {
                        data.viewPageCategoryId = data.viewPageCategoryId !== undefined && data.viewPageCategoryId !== null ? data.viewPageCategoryId + '' : ''
                        this.viewPageCategoryOnChange(data.viewPageCategoryId)
                        this.form.setFieldsValue(data)
                    })
                }).catch((error) => {
                    console.log(error)
                })
            },
            viewPageCategoryOnChange(value) {
                this.form.resetFields('viewPageId')
                viewPageListAllByViewPageCategoryId(value).then((data) => {
                    this.viewPage = data
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/common.less";
</style>
