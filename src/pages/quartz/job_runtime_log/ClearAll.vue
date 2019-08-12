<template>
  <div>
    <a-button @click="clearAll">清空</a-button>
  </div>
</template>

<script>
    import {jobRuntimeLogClearAll} from '../../../api/quartz.js'
    import {basicNotification} from '../../../common/index.js'

    export default {
        name: 'ClearAll',
        methods: {
            clearAll() {
                this.$confirm({
                    title: '确定操作',
                    content: '确定删除吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        jobRuntimeLogClearAll().then((data) => {
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
