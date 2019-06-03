<template>
    <v-dialog :value="dialog" width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Columns
            </v-card-title>
            <v-card-text class="d-flex" style="flex-flow: wrap;">
                <v-checkbox class="d-inline-block ml-3" 
                    v-for="(column,key) in columns" 
                    :key="column.title" 
                    v-model="activeColumns[column.title]" 
                    :label="column.title | columnLow" 
                    @change="changeActiveColumns"
                    color="black">
                </v-checkbox>
            </v-card-text>
            
            <close-dialog></close-dialog>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    import CloseDialog from './../UI/CloseDialog'

    export default {
        components: {CloseDialog},
        computed: {
            ...mapGetters("ui", {
                dialog: 'getViewDialog',
            }),
            ...mapGetters("datatable", {
                columns: 'getColumns',
                activeColumns: 'getActiveColumns'
            }),
        },

        methods: {
            close(){
                this.$store.commit('ui/toggleDialog')
            },

            changeActiveColumns(){
                this.$store.commit('datatable/changeActiveColumns')
            }
        }
    }
</script>