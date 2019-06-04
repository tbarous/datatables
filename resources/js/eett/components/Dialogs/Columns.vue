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
            
            <v-btn @click="close" class="close-window" flat icon>
                <v-icon small>fa fa-times</v-icon>
            </v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'

    export default {
        computed: {
            ...mapGetters("ui", {
                dialog: 'GET_VIEW_DIALOG',
            }),
            ...mapGetters("datatable", {
                columns: 'GET_COLUMNS',
                activeColumns: 'GET_ACTIVE_COLUMNS'
            }),
        },
        methods: {
            ...mapMutations("ui", {
                close: 'CLOSE_VIEW_DIALOG',
            }),
            ...mapMutations("datatable", {
                changeActiveColumns: 'CHANGE_ACTIVE_COLUMNS',
            })
        }
    }
</script>