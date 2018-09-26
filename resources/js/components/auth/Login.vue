<template>
    <div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <form @submit.prevent="authenticate">
                        <div class="form-group row">
                            <label for="email">email:</label>
                            <input type="email" v-model="form.email" class="form-control" placeholder="email address">
                        </div>
                        <div class="form-group row">
                            <label for="email">password:</label>
                            <input type="password" v-model="form.password" class="form-control" placeholder="password">
                        </div>
                        <div class="form-group row">
                            <input type="submit" class="form-control" value="Login">
                        </div>

                        <div class="form-group row" v-if="authError">
                            <p class="error">
                                {{ authError }}
                            </p>
                        </div>
                    <!-- </div> -->
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import {login} from '../../helpers/auth';
    export default {
        name: "login",
        data(){
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: null
            };
        },

        methods: {
            authenticate(){
                this.$store.dispatch('login');

                login(this.$data.form)
                    .then((res) => {
                        this.$store.commit("loginSuccess",res);
                        this.$router.push({path: '/'});
                    })
                    .catch((error) => {
                        this.$store.commit("loginFailed", {error});
                    });
                    
            }
        },
        computed: {
            authError(){
                return this.$store.getters.authError;
            }
        }
    }
</script>


<style scoped>
.error{
    text-align: center;
    color: red;
}
</style>
