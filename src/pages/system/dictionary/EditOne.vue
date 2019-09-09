<template>
    <div>
        <a-button @click="editOne">编辑</a-button>
        <a-modal title="编辑数据字典" v-model="visible" :maskClosable="false" wrapClassName="form-modal"
                 :destroyOnClose="true">
            <a-form :form="form" :hideRequiredMark="false">
                <a-row>
                    <a-col>
                        <a-form-item>
                            <a-input v-decorator="['id']" type="hidden"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="字典键名" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-input v-decorator="['keyName',{rules: [{required: true, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="字典键" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-input v-decorator="['key',{rules: [{required: true, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="字典值名" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-input v-decorator="['valueName',{rules: [{required: true, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="字典值别名" :labelCol="{span: 10}" :wrapperCol="{span: 14, offset: 0}">
                            <a-input v-decorator="['valueSlug',{rules: [{required: true, message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="24" :sm="24">
                        <a-form-item label="字典值" :labelCol="{span: 6}" :wrapperCol="{span: 18, offset: 0}">
                            <a-textarea v-decorator="['value',{rules: [{required: true, message: '必填',}],}]"
                                        :autosize="{ minRows: 2, maxRows: 10 }"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="字典分类" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
                            <a-tree-select
                                    :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                                    :treeData="dictionaryCategory"
                                    treeDefaultExpandAll
                                    allowClear
                                    v-decorator="['dictionaryCategoryId',{rules: [{required: true,message: '必填',}],}]"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="12" :sm="24">
                        <a-form-item label="是否启用" :labelCol="{span: 15}" :wrapperCol="{span: 9, offset: 0}">
                            <a-select v-decorator="['enabled',{rules: [{required: true,message: '必填',}],}]"
                                      :defaultActiveFirstOption="true">
                                <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}
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
    import {dictionaryCategoryListAllAsAntdTreeNode} from "../../../api/dictionaryCategory.js"
    import {dictionaryGetOneByDictionaryId, dictionaryListAllByKey, dictionarySaveOne} from "../../../api/dictionary.js"

    export default {
        name: 'EditOne',
        props: {
            tableSelectedRowKeys: {type: Array, required: true}
        },
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
                dictionaryCategory: [],
                isOrNot: [],
            }
        },
        methods: {
            editOne() {
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                if (tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
                    basicNotification.warning({message: '必须勾选一项'})
                    return
                }
                dictionaryCategoryListAllAsAntdTreeNode().then((data) => {
                    this.dictionaryCategory = data
                }).catch((error) => {
                    console.log(error)
                })
                dictionaryListAllByKey('IS_OR_NOT').then((data) => {
                    this.isOrNot = data;
                }).catch((error) => {
                    console.log(error)
                })
                this.dictionaryGetOneByDictionaryId(tableSelectedRowKeys[0]);
                this.visible = true
            },
            onCancel() {
                this.visible = false
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                this.form.validateFieldsAndScroll((error, values) => {
                    if (!error) {
                        dictionarySaveOne(values).then((data) => {
                            basicNotification.success({message: '操作成功'})
                            this.visible = false
                            this.$emit('onOk', data)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                });
            },
            dictionaryGetOneByDictionaryId(id) {
                dictionaryGetOneByDictionaryId(id).then((data) => {
                    data.dictionaryCategoryId = data.dictionaryCategoryId !== undefined && data.dictionaryCategoryId !== null ? data.dictionaryCategoryId + '' : ''
                    data.enabled = data.enabled !== undefined && data.enabled !== null ? data.enabled + '' : ''
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
