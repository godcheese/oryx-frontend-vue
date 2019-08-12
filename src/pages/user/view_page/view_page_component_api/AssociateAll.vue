<template>
  <div>
    <a-button @click="associateAll">关联</a-button>
  </div>
</template>

<script>
    import {basicNotification} from '../../../../common/index.js'
    import {viewPageComponentApiAssociateAllByPageComponentIdAndApiIdList} from "../../../../api/viewPageComponentApi.js"

    export default {
    name: 'AssociateAll',
    props: {
      TableSelectedRowKeys: {type: Array, required: true},
      viewPageComponentId: {type: Number, required: true}
    },
    methods: {
      associateAll() {
        const TableSelectedRowKeys = this.TableSelectedRowKeys
        if(TableSelectedRowKeys.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'})
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定关联吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            viewPageComponentApiAssociateAllByPageComponentIdAndApiIdList(this.TableSelectedRowKeys, this.viewPageComponentId).then((data) => {
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
