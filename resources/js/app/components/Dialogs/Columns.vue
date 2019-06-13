<template>
    <div style="display: inline-block">
        <v-btn 
            color="info" 
            class="ml-0" 
            @click="open">
            columns
            <v-icon class="ml-2" small>fas fa-dashboard</v-icon>
        </v-btn>

        <v-dialog :value="dialog" persistent width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Columns
                </v-card-title>
                <v-card-text class="d-flex" style="flex-flow: wrap;">
                    <v-checkbox class="d-inline-block ml-3" 
                        v-for="(column,key) in columns" 
                        :key="column.title" 
                        v-model="column.active" 
                        :label="column.title | columnLow"
                        color="black">
                    </v-checkbox>
                    <!-- @change="changeActiveColumns" -->

                    <v-btn @click="close" class="close-window" flat icon>
                        <v-icon small>fa fa-times</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
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
            })
        },
        methods: {
            ...mapMutations("ui", {
                close: 'CLOSE_VIEW_DIALOG',
                open: 'OPEN_VIEW_DIALOG'
            })
        }
    }
</script>