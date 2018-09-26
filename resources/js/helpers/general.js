export function initialize(store, router){

    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;
    
        if(requiresAuth && !currentUser){
            next('/login');
        //but if the user is loggedIn, dont take him to login page, take him to home page
        }else if(to.path == '/login' && currentUser){
            next('/')
        }else{
            next()
        }
    })
    
    axios.interceptors.response.use(null, (error) => {
        if(error.response.status == 401){
            store.commit('logout');
            router.push('/login');
        }

        //now we can return the error and use it anywhere axios is used
        return Promise.reject(error);
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.currentUser.token}`
}