import { defineStore } from 'pinia';
export const userInfo = defineStore('userInfo', {
    state: () => {
        return [
            {
                name: '张三',
                id: 0,
                list: [{
                    time: '2024年5月1日22:51:49', content: '今天晚上吃什么'
                }]
            }, {
                name: '张四',
                id: 1,
                list: [{
                    time: '2024年5月1日22:51:49', content: '今天晚上吃什么'
                }]
            }, {
                name: '张五',
                id: 2,
                list: [{
                    time: '2024年5月1日22:56:46', content: '今天晚上吃什么'
                }]
            }, {
                name: '张六',
                id: 3,
                list: [{
                    time: '2024年5月1日22:56:52', content: '今天晚上吃什么'
                }]
            }, {
                name: '张七',
                id: 4,
                list: [{
                    time: '2024年5月1日22:56:55', content: '今天晚上吃什么'
                }]
            }, {
                name: '张八',
                id: 5,
                list: [{
                    time: '2024年5月1日22:56:59', content: '今天晚上吃什么'
                }]
            }
        ]

    },
    getters: {

    },
    actions: {

    },
    persist: {
        // 持久化
        enabled: true,
        strategies: [
            {

                storage: localStorage
            }
        ]
    }
})