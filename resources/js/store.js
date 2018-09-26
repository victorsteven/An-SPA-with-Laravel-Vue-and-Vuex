import {getLocalUser} from "./helpers/auth";
//lets check that no user is signed first
const user = getLocalUser();

export default {

    state: {
        currentUser: user,
        isLoggedIn: !!user, //we are casting to boolean
        loading: false,
        authError: null,
        customers: []
    },

    getters: {
        // welcome(state){
        //     return state.welcomeMessage;
        // }
        isLoading(state){
            return state.loading;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        currentUser(state){
            return state.currentUser
        },
        authError(state){
            return state.authError;
        },
        customers(state){
            return state.customers;
        }
    },

    mutations: {
        login(state){
            state.loading = true;
            state.authError = null;
        },
        loginSuccess(state, payload){
            state.authError = null;
            state.isLoggedIn = true;
            state.loading = false;
            //an object with a user, inside the user we will have the token
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },

        loginFailed(state, payload){
            state.loading = false;
            state.authError = payload.error;
        },

        logout(state){
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },

        //our payload is the list of customers
        updateCustomers(state, payload){
            state.customers = payload;
        }
    },
    
    actions: {
        login(context){
            context.commit("login");
        },

        getCustomers(context){
            axios.get('/api/customers')
                .then((response) => {
                context.commit('updateCustomers', response.data.customers)
            })
        }
    },
    
}