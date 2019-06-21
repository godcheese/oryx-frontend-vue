<template>
  <div>
    <a-button @click="editOne">编辑</a-button>
    <a-modal title="编辑用户" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col>
            <a-form-item>
              <a-input v-decorator="['id']" type="hidden"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item>
              <a-avatar :size="64" :src="avatarSrc" style="vertical-align: middle"/>
              <a-input v-decorator="['avatar']" type="hidden"/>
              <ChangeAvatar @onOk="changeAvatarOnOk"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="用户名" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
              <a-input v-decorator="['username',{rules: [{required: true, message: '必填',}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="密码" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
              <a-input v-decorator="['password',{rules: [{required: false,message: '必填',}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="电子邮箱" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['email',{rules: [{required: true, message: '必填',}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="电子邮箱是否验证" :labelCol="{span: 15}" :wrapperCol="{span: 9, offset: 0}">
              <a-select v-decorator="['emailIsVerified',{rules: [{required: true, message: '必填',}]}]" :defaultActiveFirstOption="true">
                <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="所在部门" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-tree-select
                :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                :treeData="department"
                treeDefaultExpandAll
                allowClear
                v-decorator="['departmentId',{rules: [{required: true,message: '必填',}]}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="是否启用" :labelCol="{span: 9}" :wrapperCol="{span: 15, offset: 0}">
              <a-select v-decorator="['enabled',{rules: [{required: true,message: '必填',}]}]" :defaultActiveFirstOption="true">
                <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="备注" :labelCol="{span: 4}" :wrapperCol="{span: 20, offset: 0}">
              <a-textarea v-decorator="['remark',{rules: [{required: false}]}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
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
  import { dictionaryListAllByKey } from '../../api/dictionary.js'
  import { departmentListAllAsAntdTreeNode } from '../../api/department.js'
  import { userSaveOne, userGetOneByUserId } from '../../api/user.js'
  import { basicNotification } from '../../common/index.js';
  import { userAvatar } from '../../api/user.js';
  import ChangeAvatar from './ChangeAvatar.vue';

  export default {
    name: 'EditOne',
    props: {
      tableSelectedRowKeys: {type: Array, required: true}
    },
    components: {ChangeAvatar},
    data() {
      return {
        visible: false,
        form: undefined,
        isOrNot: [],
        department: [],
        avatarSrc: undefined,
      }
    },
    created() {
      this.form = this.$form.createForm(this, {
        onValuesChange: (props, fields) => {
          this.avatarSrc = userAvatar(fields.avatar)
        }
      })
    },
    methods: {
      changeAvatarOnOk(data) {
        this.form.setFieldsValue({'avatar': data.guid})
      },
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
        dictionaryListAllByKey('IS_OR_NOT').then((data) => {
          this.isOrNot = data;
        }).catch((error) => {
          console.log(error)
        })
        this.userGetOneByUserId(tableSelectedRowKeys[0]);
        this.avatarSrc = undefined
        this.visible = true
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.form.validateFieldsAndScroll((error, values) => {
          if (!error) {
            userSaveOne(values).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.visible = false
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          }
        });
      },
      userGetOneByUserId(id) {
        userGetOneByUserId(id).then((data) => {
          data.enabled = data.enabled !== undefined && data.enabled !== null ? data.enabled + '' : ''
          data.emailIsVerified = data.emailIsVerified !== undefined && data.emailIsVerified !== null ? data.emailIsVerified + '' : ''
          data.departmentId = data.departmentId !== undefined && data.departmentId !== null ? data.departmentId + '' : ''
          this.form.setFieldsValue(data)
        }).catch((error) => {
          console.log(error)
        })
      },
    },
  }
</script>

<style lang="less">
  @import "../../../static/less/common.less";
</style>
