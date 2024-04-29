import {beforeEach,afterEach} from "./guards"
import { createRouter, createWebHashHistory } from "vue-router";
import {AppRoutes} from "@router/routes";
const router= createRouter({
    history: createWebHashHistory(),
    routes: AppRoutes
});
router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router;