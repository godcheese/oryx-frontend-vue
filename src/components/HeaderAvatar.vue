<template>
    <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial;">
    <span style="cursor: pointer">
<!--      <a-avatar class="avatar" size="small" shape="circle" :src="(!currentUser.avatar ||  currentUser.avatar ==='') ? '../../static/img/avatar.png' : currentUser.avatar"/>-->
      <a-avatar class="avatar" size="small" :src="avatarSrc"/>
      <span>{{currentUser.username}}</span>
    </span>
        <a-menu style="width: 150px;" slot="overlay">
            <!--      <a-menu-item>-->
            <!--        <a-icon type="user" />-->
            <!--        <span>个人中心</span>-->
            <!--      </a-menu-item>-->
            <a-menu-item>
                <a-icon type="setting"/>
                <span>个人设置</span>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item @click="logout">
                <!--        <router-link to="/user/logout">-->
                <a-icon type="logout"/>
                <span>退出登录</span>
                <!--        </router-link>-->
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import {userAvatar} from "../api/user.js"

    export default {
        name: 'HeaderAvatar',
        props: {
            currentUser: {type: Object, required: true}
        },
        data() {
            return {
                avatarSrc: undefined
            }
        },
        created() {
            this.avatarSrc = userAvatar(this.currentUser.avatar ? this.currentUser.avatar : undefined)
        },
        methods: {
            logout() {
                this.$store.dispatch('user/logout').then(() => {
                    // this.$router.push('/user/logout')
                    location.reload()
                })
                //   .catch((error) => {
                //   console.log(error)
                // })
            }
        }
    }
</script>

<style lang="less" scoped>
    .avatar {
        margin: 20px 4px 20px 0;
        color: #1890ff;
        background: hsla(0, 0%, 100%, .85);
        vertical-align: middle;
    }
</style>
