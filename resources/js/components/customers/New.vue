<template>
    <div class="customer-new">
        <form @submit.prevent="add">
            <table class="table">
                <tr>
                   <th>Name</th>
                   <td>
                       <input type="text" class="form-control" v-model="customer.name" placeholder="Customer name">
                    </td> 
                </tr>
                <tr>
                   <th>Email</th>
                   <td>
                       <input type="text" class="form-control" v-model="customer.email" placeholder="Customer Email">
                    </td> 
                </tr>
                <tr>
                   <th>Phone</th>
                   <td>
                       <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer phone">
                    </td> 
                </tr>
                <tr>
                   <th>Website</th>
                   <td>
                       <input type="text" class="form-control" v-model="customer.website" placeholder="Customer website">
                    </td> 
                </tr>
                <tr>
                    <td>
                        <router-link to="/customers" class="btn btn-link">Cancel</router-link>
                    </td>
                    <td class="text-right">
                        <input type="submit" value="Create" class="btn btn-primary">
                    </td>
                </tr>
            </table>
        </form>

        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldError, fieldName) in errors" :key="fieldName">
                    <!-- <strong>{{ fieldName }}</strong>{{ fieldError.join('\n') }} -->
                    <strong>{{ fieldError.join('\n') }}</strong>

                </li>
            </ul>
        </div>
    </div>
</template>


<script>
    import validate from 'validate.js';

    export default {
        name: 'name',
        data(){
            return {
                customer: {
                    name: '',
                    email: '',
                    phone: '',
                    website: '',
                },
                errors: null
            }
        },
        computed: {
            currentUser(){
                return this.$store.getters.currentUser
            }
        },
        methods: {
            add(){
                this.error = null;
                const constraints = this.getConstraints();

                const errors = validate(this.$data.customer, constraints);

                if(errors){
                    this.errors = errors;
                    //if we have errors, we need to return
                    return;
                }

                //send the customer detail to the BE api
                axios.post('/api/customers/new', this.$data.customer)
                    .then((response) => {
                    this.$router.push('/customers');
                })
            },
            getConstraints(){
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 character long'
                        }
                    },
                     email: {
                        presence: true,
                        email: true
                    },
                     phone: {
                        presence: true,
                        numericality: true,
                        length: {
                            minimum: 10,
                            message: 'Must be at least 10 character long'
                        }
                     },
                     website: {
                         presence: true,
                         url: true
                     }
                }
            }
        }
    }
</script>

<style>
    .errors{
        background: lightcoral;
        border-radius: 5px;
        padding: 21px 0 2px 0;
    }
</style>
