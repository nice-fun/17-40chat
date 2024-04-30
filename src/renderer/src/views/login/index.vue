<template>
    <div class="test">
        <div class="header">
            <div class="header-left">AI工具</div>
            <div class="header-right">
                <span style="margin-right: 50px;"><img style="width: 40px;height: 40px;"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=""></span>
                <span style="  color: black;">
                    <el-button plain @click="dialogVisible = true">
                        {{ nowUser.username }}
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="更改用户" width="500" :before-close="handleClose">
                        <span> <el-radio-group v-model="radio1" size="large">
                                <el-radio-button v-for="item in store.$state" :label="`${item.username}`"
                                    :value="`${item.$id}`" />

                            </el-radio-group></span>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="dialogVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogVisible = false, changeUser(radio1)">
                                    Confirm
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>

                </span>
            </div>
        </div>
        <div class="body">
            <div class="left box">
                <div class="left-body">
                    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                        <li v-for="(item, index) in nowUser.list" :key="index" class="infinite-list-item">
                            <div class="card-body">
                                <div class="time">{{ item.time }}</div>
                                <div class="dataText">提问:{{ item.data.slice(0, 10) }}</div>
                                <div>
                                    <el-button style="float: right; margin-right: 10px" type="danger" :icon="Delete"
                                        @click="handleDel(index)" circle />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="center box">
                <el-input :disabled="loading" v-model="message" style="width: 100%;height: 450px;" type="textarea"
                    placeholder="Please input" />
                <el-button :disabled="loading" class="btn" type="primary" @click="handleSendMessage">发送</el-button>
            </div>
            <div class="right box">
                <div class="right-body">
                    <el-input v-loading="loading" class="inputTextArea" id="inputText"
                        style="width: 100%;height: 500px;" type="textarea" placeholder="总结内容" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { login } from '@renderer/api/login';
import { useStore } from "@store";
import {
    Delete,
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
onMounted(() => {
    console.log(nowUser)
})
const loading = ref(false)
const store = useStore()
const nowUser = ref(store.zhangsanData)
const count = ref(0)
const load = () => {
    count.value += 2
}
const message = ref('')
const isDisabled = ref(false)
const radio1 = ref('zhangsanData')
const i = ref(0)
/**

const intervalId = setInterval((results) => {
    if (results.length > 0) {
        var element = results.shift(); // 从源数组中取出第一个元素
        result.value.push(element as never); // 将元素添加到目标数组中
    } else {
        clearInterval(intervalId); // 如果源数组为空，则停止定时器
    }
}, 100); // 每隔1000毫秒执行一次
 */

const handleSendMessage = async () => {
    isDisabled.value = true

    if (message.value !== '') {
        loading.value = true
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
            loading.value = false
            const str = res.data;
            const results: Array<never> = matchAllBetweenSingleQuotes(str);
            const strin = results.join('');
            console.log("strin", strin.length);
            console.log(results);

            console.log(results.length);


            const intervalId = setInterval(() => {

                if (strin.length > 0) {
                    i.value++

                    const element = strin.charAt(i.value) as never; // 从源数组中取出第一个元素，并将其转换为 never 类型的数组元素
                    document.getElementById("inputText")?.append(element);


                    if (i.value === strin.length - 1) {
                        clearInterval(intervalId); // 如果源数组为空，则停止定时器

                    }

                } else {
                    clearInterval(intervalId); // 如果源数组为空，则停止定时器
                }
            }, 100);


            nowUser.value.list.unshift({
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
    const matches: Array = [];
    while ((match = regex.exec(str))) {

        matches.push(match[1].replace(/\\n/g, '\n').replace(/\n/g, '\n').replace(/-/g, '\n'))

    }
    return matches;
}
const handleDel = (index) => {
    nowUser.value.list.splice(index, 1)
}
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
const changeUser = (user) => {
    if (user === 'zhangsanData') {
        nowUser.value = store.zhangsanData
    } else if (user === 'lisiData') {
        nowUser.value = store.lisiData
    } else if (user === 'wangwuData') {
        nowUser.value = store.wangwuData
    } else {
        return
    }
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
            flex-grow: 3;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

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