import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import CustomersMain from './components/customers/Main.vue';
import CustomerList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import Customer from './components/customers/Customer.vue';





export const routes = [
    {
        path: '/', 
        component: Home,
        //the user should not see this if not signed in
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: CustomersMain,
        mata: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: CustomerList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer
            }
        ]
    }
];

//we will export an array of objects
