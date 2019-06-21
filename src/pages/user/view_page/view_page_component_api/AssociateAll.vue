<template>
  <div>
    <a-button @click="associateAll">关联</a-button>
  </div>
</template>

<script>
  import { basicNotification } from '../../../../common/index.js';
  import { viewPageComponentApiAssociateAllByPageComponentIdAndApiIdList } from "../../../../api/viewPageComponentApi.js";

  export default {
    name: 'AssociateAll',
    props: {
      tableSelectedRowKeys: {type: Array, required: true},
      pageComponentId: {type: Number, required: true}
    },
    methods: {
      associateAll() {
        const tableSelectedRowKeys = this.tableSelectedRowKeys
        if(tableSelectedRowKeys.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'})
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定关联吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            viewPageComponentApiAssociateAllByPageComponentIdAndApiIdList(this.tableSelectedRowKeys, this.pageComponentId).then((data) => {
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
