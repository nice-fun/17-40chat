<template>
    <div class="test">
        <div class="header">
            <div class="header-left">AI工具</div>
            <div class="header-right"><span style="margin-right: 50px;"><img style="width: 40px;height: 40px;"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=""></span><span
                    style="  color: black;">username</span>
            </div>
        </div>
        <div class="body">
            <div class="left box">
                <div class="left-body">
                    <div class="left-card">
                        <div>今日</div>
                        <div>今天晚上吃什么</div>
                    </div>
                    <div class="left-card">
                        <div>今日</div>
                        <div>今天晚上吃什么</div>
                    </div>
                    <div class="left-card">
                        <div>今日</div>
                        <div>今天晚上吃什么</div>
                    </div>
                    <div class="left-card">
                        <div>今日</div>
                        <div>今天晚上吃什么</div>
                    </div>
                    <div class="left-card">
                        <div>今日</div>
                        <div>今天晚上吃什么</div>
                    </div>

                </div>


            </div>
            <div class="center box"><el-input v-model="message" style="width: 100%;height: 450px;" type="textarea"
                    placeholder="Please input" />
                <el-button class="btn" type="primary" @click="handleSendMessage">发送</el-button>
            </div>
            <div class="right box">
                <div class="right-body"> <el-input v-model="message" style="width: 100%;height: 500px;" type="textarea"
                        placeholder="总结内容" /></div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { login } from '@renderer/api/login';
const message = ref('')
const handleSendMessage = async () => {
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
    console.log(res.data)
}
</script>

<style lang="scss" scoped>
.test {
    width: 100vw;
    margin: 50px;
    box-sizing: border-box;


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

                .left-card {
                    line-height: 40px;
                    margin: 5px 0;
                    border-radius: 10% 10% 10% 10%;

                    background-color: rgb(255, 252, 248);
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