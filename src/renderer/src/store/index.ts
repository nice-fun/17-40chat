import { defineStore } from 'pinia';
import { userZhangSan } from "./useZhangSanData";
import { userLiSi } from "./useLiSiData";

export const useStore = defineStore('store', {
    state: () => {
       return {
           zhangsanData: userZhangSan(),
           lisiData: userLiSi()
       }
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