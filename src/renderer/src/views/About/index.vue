<template>
    <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" :options="config">
    </vue-particles>
    <div class="test">
        <div class="header">
            <div class="box flex" style="width: 100%;justify-content: space-between; padding: 0 1rem;">
                <div class="header-left flex">AI工具</div>
                <div class="header-right flex">
                    <span class="flex" style="margin-right: 2rem;"><img style="width: 3rem;height: 3rem;"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt=""></span>
                    <span>
                        <el-button style="width: 5rem;height: 2.5rem;" plain @click="dialogVisible = true"
                            :disabled="isCopy">
                            {{ nowUser.name }}
                        </el-button>
                        <el-dialog v-model="dialogVisible" title="更改用户" width="500" :before-close="handleClose">
                            <span>
                                <el-radio-group v-model="radio1" size="large" class="radio-group">
                                    <el-radio-button v-for="item in store.userInfo.$state" :value=item.id>{{ item.name
                                        }}</el-radio-button>
                                    <div class="flex"
                                        style="width: 100%; margin-top: 1.5rem;justify-content: space-around;">
                                        <el-input v-model="newUserInput" style="width: 15rem;"
                                            placeholder="Please input" />
                                        <el-button type="primary" @click="addUser">新增</el-button>
                                    </div>
                                </el-radio-group>
                            </span>
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
        </div>
        <div class="main">
            <div class="left flex">
                <div class="box">
                    <el-scrollbar style="width: 100%;" height="100%">
                        <div v-for="(item, index) in userDataList" :key="item.id" class="scrollbar-demo-item">
                            <div>
                                <div>{{ isToday(item.title) ? '今天' : item.title }}</div>
                                <div class="flex" v-for="(children, index) in item.list" :key="children.id">
                                    <div class="dataText">提问: &nbsp {{
                                        children.content }}
                                    </div>
                                    <div>
                                        <el-button style="width: 2rem;height: 2rem;" type="danger" :icon="Delete"
                                            @click="handleDel(children.id)" circle />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="center flex">
                <div class="box flex box-common">
                    <el-input :disabled="isCopy" v-model="message" style="width: 100%;height: 90%;" type="textarea"
                        placeholder="Please input" />
                    <el-button :disabled="isCopy" class="btn" type="primary" @click="handleSendMessage">发送</el-button>
                </div>
            </div>
            <div class="right flex">
                <div class="box flex box-common">
                    <el-input v-loading="loading" class="inputTextArea" id="inputText" style="width: 100%;height: 90%;"
                        type="textarea" placeholder="总结内容" />
                    <el-button :disabled="isCopy" v-if="!isCopy" class="btn" type="primary"
                        @click="copyToClipboard">一键复制</el-button>
                    <el-button :disabled="loading" v-if="isCopy" class="btn" type="primary"
                        @click="stopInterval">终止生成</el-button>
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
import { config } from "@utils/config.js";
import { nanoid } from 'nanoid';

const dialogVisible = ref(false)
const loading = ref(false)
const store = useStore()
const nowUser = ref(store.userInfo.$state[store.userInfo.$state.length - 1])
const userDataList = reactive([])
const message = ref('')
const isDisabled = ref(false)
const radio1 = ref(store.userInfo.$state.length - 1)
const i = ref(0)
let messageText = ''
const isCopy = ref(false)
let timer: NodeJS.Timeout;
const isUneditable = ref(false)
const newUserInput = ref('')

onMounted(() => {
    dataListPuls(nowUser)
})

watch(nowUser, (newValue, oldValue) => {
    console.log(`Message changed from ${oldValue.id} to ${newValue.id}`);
    dataListPuls(nowUser)
});

const idConfig = () => {
    const id = nanoid(10)
    return id
}

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

const dataListPuls = (nowUser) => {
    userDataList.splice(0, userDataList.length)
    nowUser.value.list.forEach(element => {
        const date = new Date(element.time);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if (userDataList.indexOf(key) === -1) { userDataList.push(key) }
    });
    for (var i = 0; i < userDataList.length; i++) {
        userDataList[i] = { title: userDataList[i], list: [] }
        for (var j = 0; j < nowUser.value.list.length; j++) {
            const date = new Date(nowUser.value.list[j].time);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            if (key == userDataList[i].title) {
                userDataList[i].list.push(nowUser.value.list[j])
            }
        }
    }
    console.log("userDataList", userDataList);
}

const isToday = (time: string): boolean => {
    const now = new Date();
    const inputTime = new Date(time);
    return now.getFullYear() === inputTime.getFullYear() &&
        now.getMonth() === inputTime.getMonth() &&
        now.getDate() === inputTime.getDate();
}

const handleSendMessage = async () => {
    // nowUser.value.list.unshift({
    //     time: new Date().toLocaleString(),
    //     id: idConfig(),
    //     content: message.value,

    // })
    // dataListPuls(nowUser)
    isDisabled.value = true
    isUneditable.value = true
    messageText = ''
    document.getElementById('inputText').innerHTML = messageText;
    if (message.value !== '') {
        isCopy.value = true
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
            const userDataList: Array<never> = matchAllBetweenSingleQuotes(str);
            const strin = userDataList.join('');
            console.log("strin", strin.length);
            console.log(userDataList);
            console.log(userDataList.length);
            timer = setInterval(() => {
                console.log("11111")
                if (strin.length > 0) {
                    i.value++
                    const element = strin.charAt(i.value) as never;
                    messageText += element;
                    document.getElementById('inputText').innerHTML = messageText;
                    if (i.value === strin.length - 1) {
                        clearInterval(timer);
                        isCopy.value = false;
                        i.value = 0
                    }
                } else {
                    clearInterval(timer);
                    isCopy.value = false;
                    i.value = 0
                }
            }, 100);
            nowUser.value.list.unshift({
                time: new Date().toLocaleString(),
                id: idConfig(),
                content: message.value,
            })
            dataListPuls(nowUser)
        } else {
            return
        }
    } else {
        window.alert('禁止为空')
    }
}

const stopInterval = () => {
    clearInterval(timer);
    isCopy.value = false;
    i.value = 0
}

const copyToClipboard = () => {
    const textToCopy = messageText
    navigator.clipboard.writeText(textToCopy).then(
        function () {
            console.log("复制成功！");
        },
        function () {
            console.log("复制失败！");
        }
    );
}

const matchAllBetweenSingleQuotes = (str) => {
    const regex = /content='([^']*)'/g;
    let match;
    const matches: Array = [];
    while ((match = regex.exec(str))) {
        matches.push(match[1].replace(/\\n/g, '\n').replace(/\n/g, ' ').replace(/-/g, '\n'))
    }
    return matches;
}

const handleDel = (id) => {
    nowUser.value.list.forEach((element, index) => {
        if (element.id == id) {
            console.log("11111", element)
            nowUser.value.list.splice(index, 1);
        }

    });
    dataListPuls(nowUser)
    console.log('1222', id)
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

const changeUser = (id) => {
    nowUser.value = store.userInfo.$state[id]
    console.log(id)
}

const addUser = () => {
    console.log("newUserInput.value", newUserInput.value)
    if (newUserInput.value) {
        store.userInfo.$state.push({
            name: newUserInput.value,
            id: store.userInfo.$state.length,
            list: []
        })
        newUserInput.value = ''

        window.location.reload()
    }
    else {
        window.alert('禁止为空')
    }
}
</script>
<style scoped>
::v-deep(.el-textarea__inner) {
    width: 100%;
    height: 100%;
}

::v-deep(.radio-group) {
    display: flex;
    align-items: center;
    justify-content: left;
}

.btn {
    width: 100%;
    height: 3rem;
    margin: 1rem 0 0 0;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    width: 90%;
    height: 100%;
    color: black;
    background-color: rgb(255, 255, 255);
}

.box-common {
    justify-content: space-between;
    flex-direction: column;
    background-color: transparent;
}

.test {
    position: absolute;
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 999;

    .header {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;

        .header-left {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .header-right {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .main {
        width: 100%;
        height: 85%;
        display: flex;

        .left {
            width: calc(100% / 4);

            .scrollbar-demo-item {
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: auto;
                margin: 1rem;
                padding: 1rem;
                text-align: center;
                border-radius: 3rem;
                background: var(--el-color-primary-light-9);
                color: var(--el-color-primary);

                .dataText {
                    width: 100%;
                    height: 100%;

                    padding: 0.125rem 1rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .center {
            width: calc(100% / 2);
        }

        .right {
            width: calc(100% / 4);
        }
    }
}
</style>