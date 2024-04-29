export const AppRoutes = [
        // {
        //     path: "/",
        //     name: "登录",
        //     component: () => import("../views/login/index.vue")
        // },
           {
            path: "/",
            name: "首页",
            component: () => import("@views/Login/index.vue")
        },
              {
            path: "/about",
            name: "关于我们",
            component: () => import("@views/About/index.vue")
        },
    ]