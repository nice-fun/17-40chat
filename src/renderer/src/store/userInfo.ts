import { defineStore } from 'pinia';
export const userInfo = defineStore('userInfo', {
    state: () => {
        return [
            {
                name: '张三',
                id: 0,
                list: [
                    {
                        time: "2024/5/2 17:50:44",
                        id: "NRE-CdnXcy",
                        content: "小浪告诉记者，之所以会从酒店带走洗发水护发素沐浴露小样，是因为该酒店称小样产品都是“潘海利根”品牌原装进口，该品牌产品价格比较贵，500ml的沐浴露要530元。"
                    },
                    {
                        time: "2024/5/1 17:50:33",
                        id: "XeKGHPuw3S",
                        content: "“只要是不要钱的都拿走!”一个月前，家住广东的小浪(化名)从澳门某五星级酒店退房时，行李箱里堆满了从酒店“薅来的”护肤品小样、牙膏、汽水、辣条、方便面。"
                    },
                    {
                        time: "2024/5/1 17:50:19",
                        id: "HoI3qUUMu2",
                        content: "从丽思卡尔顿酒店退房时，可鱼(化名)看着被固定在墙上的大瓶装洗护用品陷入了沉思。以往住酒店，她都会将酒店的洗护用品小样装进行李箱带走，而这次要薅酒店羊毛却没那么容易。"
                    },
                    {
                        time: "2024/5/1 17:50:05",
                        id: "IXJbLIajvK",
                        content: "资料显示，曲水亭街位于山东省济南市历下区大明湖街道，北靠济南天下第一泉风景区大明湖、南接西更道、东望德王府北门，西邻济南府学文庙。"
                    },
                    {
                        time: "2024/5/1 17:49:52",
                        id: "tkuxrrHUtG",
                        content: "日前，网友拍摄的一段山东济南曲水亭街一家茶水铺的视频在网上引起热议。"
                    },
                    {
                        time: "2024/4/30 17:49:38",
                        id: "YcNC4Cnrc2",
                        content: "新华社快讯：记者从在广东梅州举行的新闻发布会上了解到，广东梅大高速茶阳路段塌方灾害已致48人死亡。"
                    }

                ]
            },
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