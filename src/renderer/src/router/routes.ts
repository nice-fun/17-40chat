export const AppRoutes = [
        // {
        //     path: "/",
        //     name: "登录",
        //     component: () => import("../views/login/index.vue")
        // },
           {
            path: "/Login",
            name: "Login",
            component: () => import("@views/Login/index.vue")
        },
              {
            path: "/",
            name: "About",
            component: () => import("@views/About/index.vue")
    },
              {
            path: "/Home",
            name: "Home",
            component: () => import("@views/Home/index.vue")
        },
    ]