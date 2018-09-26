<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/customers/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!customers.length">
                    <tr>
                        <td colspan="4" class="text-center">No Customers Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.email }}</td>
                        <td>{{ customer.phone }}</td>
                        <td>
                            <router-link :to="`/customers/${customer.id}`">View</router-link>
                        </td>

                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'list',

        mounted(){
            //if we already have customers, do nothing
            if(this.customers.length){
                return;
            }
            //otherwise fetch it through the api
            this.$store.dispatch('getCustomers')
        },

        computed: {
            customers(){
                return this.$store.getters.customers
            }
        }
    }
</script>

<style scoped>
    .btn-wrapper {
        text-align: right;
        margin-bottom: 20px;
    }
</style>

