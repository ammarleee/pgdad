export default [
    {
        path:"/finances/CatchReceipt",
        name: 'CatchReceipt',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "CatchReceipt" */ './views/CatchReceipt.vue')
    },
    {
        path:"/finances/Receipt",
        name: 'Receipt',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "Receipt" */ './views/Receipt.vue')
    },
    {
        path:"/finances/Expenses",
        name: 'Expenses',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "Expenses" */ './views/Expenses.vue')
    },
]