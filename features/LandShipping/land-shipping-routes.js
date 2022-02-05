export default [
    {
        path:'/shipping/cars',
        name: 'CarList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/CarList.vue')
    },
    
    {
        path:'/shipping/barCode',
        name: 'barCode',
        // meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/barCode.vue')
    },
    {

        path:'/shipping/driverReportPrint',
        name: 'driverReportPrint',
        // meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/driverReport.vue')

    },
    
    {
        path:'/shipping/tripPrint',
        name: 'tripPrint',
        // meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/tripPrint.vue')
    },

    {
        path:'/shipping/salesMenPrint',
        name: 'salesMenPrint',
        // meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/SalesMenPrint.vue')
    },

    
    {
        path:'/shipping/distribution-cars',
        name: 'DistributionCars',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/DistributionCars.vue')
    },
    {
        path:'/shipping/distributors',
        name: 'distributors',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/Distributors.vue')
    },
    {
        path:'/shipping/shipment',
        name: 'shipment',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/Shipment.vue'),
    },
    {
        path:'/shipping/branchPolisa',
        name: 'branchpolisa',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "branchpolisa" */ './views/branchPolisa.vue'),
    },
    {
        path:'/shipping/clientPolisa',
        name: 'clientPolisa',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "Clientpolisa" */ './views/ClientPolisa.vue'),
    },
    {
        path:'/shipping/search',
        name: 'search',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/search.vue'),
    },
   
    {
        path:'/shipping/Drivers',
        name: 'DriverList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "DriverList" */ './views/DriverList.vue')
    },
    {
        path:'/shipping/Merchandises',
        name: 'MerchandiseList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "MerchandiseList" */ './views/MerchandiseList.vue')
    },
    {
        path:'/shipping/Lines',
        name: 'LineList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "LineList" */ './views/LineList.vue')
    },
    {
        path:'/shipping/trips',
        name: 'TripsList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "TripsList" */ './views/TripsList.vue')
    },
    {
        path:'/shipping/salesmen',
        name: 'SalesMen',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "SalesMen" */ './views/SalesMen.vue')
    },
    {
        path:'/shipping/clients',
        name: 'clients',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "clients" */ './views/Clients.vue')
    },
    {
        path:'/shipping/external-shippers',
        name: 'ExternalShippersList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "ExternalShippers" */ './views/ExternalShippersList.vue')
    },
    {
        path:'/shipping/books',
        name: 'books',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "books" */ './views/BookList.vue')
    },
    
    
]