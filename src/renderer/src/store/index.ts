import { defineStore } from 'pinia';
import { zhangsanData } from "./useZhangSanData";
import { lisiData } from "./useLiSiData";
import { userInfo } from "./userInfo";

export const useStore = defineStore('store', {
    state: () => {
       return {
           zhangsanData: zhangsanData(),
           lisiData: lisiData(),
           userInfo:userInfo()
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