<template>
    <div>home</div>
    <button @click="handleClick">click</button>
    <h1>{{ store.user.username }}</h1>
    <h1>{{ store.user.age }}</h1>
    <button @click="handleChangeUserName">click</button>
    <el-button type="success">Success</el-button>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "@store";
import { login } from '@api/login';
const router = useRouter()
const route = useRoute()
const store = useStore()


console.log(store.user.username)
console.log(store.user.age)




const handleClick = () => {
    console.log('click')
    router.push('/about')
    console.log(route.path)
}
const handleChangeUserName = async () => {
    store.user.username = '李四'
    console.log(store.user)
    const res = await login({ username: '123', password: '123' })
    console.log(res)
}

</script>

<style scoped></style>