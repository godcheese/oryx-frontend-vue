<template>
    <div>
        <a-button @click="syncToMemory">同步到内存</a-button>
    </div>
</template>

<script>
    import {basicNotification} from '../../../common/index.js'
    import {dictionarySyncToMemory} from "../../../api/dictionary.js"

    export default {
        name: 'SyncToMemory',

        methods: {
            syncToMemory() {
                this.$confirm({
                    title: '确定操作',
                    content: '确定同步到内存吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        dictionarySyncToMemory().then((data) => {
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
