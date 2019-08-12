<template>
  <div>
    <a-button @click="revokeAll">撤销授权</a-button>
  </div>
</template>

<script>
    import {basicNotification} from '../../../common/index.js'
    import {roleRevokeAllByUserIdAndRoleIdList} from "../../../api/role.js"

    export default {
    name: 'RevokeAll',
    props: {
      TableSelectedRowKeys: {type: Array, required: true},
      userId: {type: Number, required: true}
    },
    methods: {
      revokeAll() {
        const TableSelectedRowKeys = this.TableSelectedRowKeys
        if(TableSelectedRowKeys.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'})
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定撤销授权吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            roleRevokeAllByUserIdAndRoleIdList(this.TableSelectedRowKeys, this.userId).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          },
          onCancel: () => {
            this.$emit('onCancel')
          }
        });
      },
    }
  }
</script>
