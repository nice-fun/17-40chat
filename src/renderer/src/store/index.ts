import { defineStore } from 'pinia';
import { useUser } from "./useUserStore";

export const useStore = defineStore('store', {
    state: () => {
       return {
           user: useUser()
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