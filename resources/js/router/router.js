import Requests from "../views/requests";
import Settings from "../views/settings";
import AllRequests from "../views/allRequests";
import Employees from "../views/employees";
import AddBulkEmployees from "../views/addBulkEmployees";
import Employee from "../views/employee";
import ResolveUsers from "../views/resolveUsers";
import NotFound from "../views/notFound";


export const AdminRouter=[
    {
        id:0,
        path:'/armaturenbrett',
        name:'home',
        component:<Requests/>
    },
    // {
    //     id:1,
    //     path:'/settings',
    //     name:'settings',
    //     component:<Settings/>
    // },
    {
        id:2,
        path:'/armaturenbrett/:slug',
        name:'filtered-requests',
        component:<AllRequests/>
    },
    {
        id:3,
        path:'/mitarbeite',
        name:'mitarbeite',
        component:<Employees/>
    },
    {
        id:4,
        path:'/mitarbeite/add-bulk',
        name:'add-bulk',
        component:<AddBulkEmployees/>
    },
    {
        id:5,
        path:'/mitarbeite/:id',
        name:'employee',
        component:<Employee/>
    },
    {
        id:6,
        path:'/benutzer-lösen',
        name:'resolve',
        component:<ResolveUsers/>
    },
    {
        id:7,
        path:'*',
        name:'not-found',
        component:<NotFound/>
    },
]
