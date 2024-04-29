<template>
    <div class="test">
        <div class="header">
            <div class="header-left">AI工具</div>
            <div class="header-right"><span style="margin-right: 50px;"><img style="width: 40px;height: 40px;"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=""></span><span
                    style="  color: black;">{{ store.zhangsanData.username }}</span>
            </div>
        </div>
        <div class="body">
            <div class="left box">
                <div class="left-body">

                    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                        <li v-for="(item, index) in store.zhangsanData.list" :key="index" class="infinite-list-item">

                            <div class="card-body">
                                <div class="time">{{ item.time }}</div>

                                <div class="dataText">提问:{{ item.data.slice(0, 10) }}</div>


                            </div>

                        </li>
                    </ul>

                </div>
            </div>
            <div class="center box"><el-input v-model="message" style="width: 100%;height: 450px;" type="textarea"
                    placeholder="Please input" />
                <el-button class="btn" type="primary" @click="handleSendMessage">发送</el-button>
            </div>
            <div class="right box">
                <div class="right-body"> <el-input v-model="result" style="width: 100%;height: 500px;" type="textarea"
                        placeholder="总结内容" /></div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { login } from '@renderer/api/login';
import { useStore } from "@store";
const count = ref(0)
const load = () => {
    count.value += 2
}
const store = useStore()
const message = ref('')
const result = ref([])
const isDisabled = ref(false)

const handleSendMessage = async () => {
    isDisabled.value = true
    if (message.value !== '') {
        const res = await login({
            messages: [
                {
                    role: "user",
                    content: message.value
                }
            ],
            model: "model-6b",
            stream: true
        })
        if (res.status === 200) {
            const str = res.data;
            const results = matchAllBetweenSingleQuotes(str);
            console.log(results);
            result.value = results;
            store.zhangsanData.list.push({
                time: new Date().toLocaleString(),
                data: message.value,
                require: results
            })


        } else {
            return
        }

    } else {
        window.alert('禁止为空')
    }






}

const matchAllBetweenSingleQuotes = (str) => {
    const regex = /content='([^']*)'/g;
    let match;
    const matches = [];
    while ((match = regex.exec(str))) {
        matches.push(match[1]);
    }
    return matches;
}




</script>

<style lang="scss" scoped>
.test {
    width: 100vw;
    margin: 50px;


    .header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: aliceblue;




        .header-left {
            width: calc(100% / 5);
            height: 100%;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .header-right {
            width: calc(100% / 5);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .body {
        margin-top: 50px;
        width: 100%;
        height: 500px;
        display: flex;
        justify-content: space-between;

        .left {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            .left-body {
                background-color: white;
                height: 100%;
                width: 90%;

                .infinite-list {
                    width: 100%;
                    height: 500px;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }

                .infinite-list .infinite-list-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100px;

                    background: var(--el-color-primary-light-9);
                    margin: 10px;
                    color: var(--el-color-primary);
                }

                .infinite-list .infinite-list-item+.list-item {
                    margin-top: 10px;
                }

                .infinite-list-item {
                    ::v-deep(.el-card__body) {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                    }

                    .card-body {
                        width: 100%;
                        height: 100%;



                        .time {
                            width: 100%;
                            line-height: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: left;
                        }

                        .dataText {
                            width: 100%;


                        }
                    }

                }


            }
        }

        .center {
            flex-grow: 1;

            ::v-deep(.el-textarea__inner) {
                height: 100%;
            }

            .btn {
                width: 100%;
                height: 40px;
                margin: 10px 0 0 0;
            }
        }

        .right {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            .right-body {
                background-color: white;
                height: 100%;
                width: 90%;

                ::v-deep(.el-textarea__inner) {
                    height: 100%;
                }
            }
        }
    }

}
</style>