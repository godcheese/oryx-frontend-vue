<template>
  <div>
    <a-button @click="editOne">编辑</a-button>
    <a-modal title="编辑部门" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col>
            <a-form-item>
              <a-input v-decorator="['id']" type="hidden"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="部门名称" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['name',{rules: [{required: true, message: '必填',}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="父级部门" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-tree-select
                :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                :treeData="department"
                treeDefaultExpandAll
                allowClear
                v-decorator="['parentId',{rules: [{required: true,message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="备注" :labelCol="{span: 4}" :wrapperCol="{span: 20, offset: 0}">
              <a-textarea v-decorator="['remark',{rules: [{required: false}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
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
    import {departmentGetOneByDepartmentId, departmentListAllAsAntdTreeNode, departmentSaveOne} from '../../../api/department.js'
    import {basicNotification} from "../../../common/index.js"

    export default {
    name: 'EditOne',
    props: {
      tableSelectedRowKeys: {type: Array, required: true}
    },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        department: [],
      }
    },
    methods: {
      editOne() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys && tableSelectedRowKeys.length !== 1) {
          basicNotification.warning({message: '必须勾选一项'})
          return
        }
        departmentListAllAsAntdTreeNode().then((data) => {
          this.department = data
        }).catch((error) => {
          console.log(error)
        })
        this.departmentGetOneByDepartmentId(tableSelectedRowKeys[0]);
        this.visible = true
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.form.validateFieldsAndScroll((error, values) => {
          if (!error) {
            departmentSaveOne(values).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.visible = false
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          }
        });
      },
      departmentGetOneByDepartmentId(id) {
        departmentGetOneByDepartmentId(id).then((data) => {
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
