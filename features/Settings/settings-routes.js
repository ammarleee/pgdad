export default[
    {
        path:'/settings/countries',
        name: 'CountyList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "CountyList" */ 
        './views/Locations/CountryList.vue')
    },
    {
        path:'/settings/cities/:id',
        name: 'CityList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "CityList" */ './views/Locations/CityList.vue')
    },{
        path:'/settings/units/',
        name: 'UnitsList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "UnitsList" */ './views/UnitsList.vue')
    },{
        path:'/settings/ServiceTypes/',
        name: 'ServiceTypesList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "ServiceTypesList" */ './views/ServiceTypesList.vue')
    },
   
    {
        path:'/settings/branches/',
        name: 'BranchesList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "BranchesList" */ './views/Locations/BranchesList.vue')
    },
    {
        path:'/settings/carTypes/',
        name: 'CarTypesList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "CarTypesList" */ './views/CarTypesList.vue')
    },
    {
        path:'/settings/employees/',
        name: 'Employees',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "Employees" */ './views/Employees.vue')
    }
]