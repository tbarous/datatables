<template>
    <v-layout>
        <v-flex xs2>
            <v-btn color="blue" dark @click="fetch">
                Reload 
                <v-icon small>fas fa-sync</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs2>
            <v-btn color="yellow" @click="clearFilters">
                Clear 
                <v-icon small>fas fa-eraser</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs2>
            <v-btn color="secondary" dark @click="openView">
                Columns 
                <v-icon small>fas fa-columns</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs2>
            <v-btn :disabled="selected.length<2" dark @click="openUpdate">
                Update 
                <v-icon small>fas fa-edit</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
	export default{
		computed: {
            selected(){
                return this.$store.getters['datatable/selected']
            }
        },

        methods: {
            openUpdate(){
                this.$store.dispatch('ui/openUpdateDialog')
            },
            openView(){
                this.$store.dispatch('ui/openViewDialog')
            },
            clearFilters(){
                this.$store.dispatch('datatable/clearFilters')
            },
            fetch(){
                this.$store.dispatch('datatable/fetch')
            }
        }
	}
</script>