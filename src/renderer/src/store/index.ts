import { defineStore } from 'pinia';
import { zhangsanData } from "./useZhangSanData";
import { lisiData } from "./useLiSiData";

export const useStore = defineStore('store', {
    state: () => {
       return {
           zhangsanData: zhangsanData(),
           lisiData: lisiData()
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