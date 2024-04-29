import { defineStore } from 'pinia';
export const useUser = defineStore('userInfo', {
    state: () => {
       return {
           username: "张三",
           age: 18,
       }
    },
    getters: {
        
    },
    actions: {
        
    }
})