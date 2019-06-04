<template>
	<v-layout>
        <v-flex xs3 offset-xs9>
            <v-text-field 
                class="generalSearch" 
                @input="fetchData(true)" 
                v-model="generalSearch" 
                solo 
                prepend-inner-icon="search" 
                autocomplete="off" 
                clearable 
                label="Search">
            </v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

	export default{
		computed: {
            generalSearch: {
                get() {
                    return this.$store.getters['datatable/GET_GENERAL_SEARCH']
                },
                set(generalSearch){
                    this.$store.commit('datatable/SET_GENERAL_SEARCH', generalSearch)
                }
            }
        },
        methods: {
            ...mapActions("datatable", {
                fetchData: 'FETCH_DATA'
            })
        }
	}
</script>