<template>
  <div>
    <a-button @click="revokeAssociateAll">撤销关联</a-button>
  </div>
</template>

<script>
    import {basicNotification} from '../../../../common/index.js'
    import {viewPageApiRevokeAssociateAllByPageIdAndApiIdList} from "../../../../api/viewPageApi.js"

    export default {
    name: 'RevokeAssociateAll',
    props: {
      tableSelectedRows: {type: Array, required: true},
    },
    methods: {
      revokeAssociateAll() {
        const tableSelectedRows = this.tableSelectedRows;
        if(tableSelectedRows.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'});
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定撤销关联吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            viewPageApiRevokeAssociateAllByPageIdAndApiIdList(this.tableSelectedRows[0].id, this.tableSelectedRows[0].viewPageId).then((data) => {
              basicNotification.success({message: '操作成功'});
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
