<template>
    <div>
        <span>Show</span>
        <v-select 
            class="show-how-many"
            :items="itemsShow" 
            label="Show" 
            solo 
            v-model="perPage" 
            @change="fetchData">
        </v-select>
        <span>entries</span>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters("datatable", {
                itemsShow: 'GET_ITEMS_SHOW'
            }),
            perPage: {
                get(){
                    return this.$store.getters['datatable/GET_PER_PAGE']
                },
                set(perPage){
                    this.$store.dispatch('datatable/SET_PER_PAGE', perPage)
                }
            }
        },
        methods: {
            fetchData() {
                this.$store.dispatch('datatable/FETCH_DATA', true)
            }
        }
    }
</script>
