<template>
    <div style="display: inline-block">
        <v-btn 
            color="info" 
            class="ml-0" 
            @click="open">
            add
            <v-icon class="ml-2" small>fas fa-plus</v-icon>
        </v-btn>

        <v-dialog :value="dialog" persistent width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Add</v-card-title>
                <v-card-text>
                    <v-form method="post" @submit.prevent="add">
                        <div v-for="(column, key) in columns" :key="column.title">

                            <!-- v-if="column.type == 'text'"  -->
                            <v-text-field 
                                class="mt-3"
                                :label="column.title" 
                                v-if="column.editable"
                                solo 
                                type="text" 
                                v-model="addingRow[column.title]" 
                                @input="clearError(column.title)">
                            </v-text-field>

                            <p class="text-danger mt-3" v-for="error in findError(column.title)">
                                {{error}}
                            </p>
                        </div>
                       
                        <v-btn class="ml-0 w-100" color="primary" type="submit">edit</v-btn>
                    </v-form>

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
    import { mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters("datatable", {
                columns: 'GET_COLUMNS',
                addingRow: 'GET_ADDING_ROW'
            }),
            ...mapGetters("ui", {
                dialog: 'GET_ADD_DIALOG'
            }),
        },
        methods: {
            clearError(title){
                this.$store.commit('datatable/CLEAR_ERROR', title)
            },
            findError(title) {
                return this.$store.getters['datatable/GET_ERROR'](title)
            },
            ...mapMutations("ui", {
                close: 'CLOSE_ADD_DIALOG',
                open:  'OPEN_ADD_DIALOG'
            }),
            add(){
                this.$store.commit('ui/START_LOADING')
                this.$store.dispatch('datatable/ADD')
                    .then(() => this.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been added'}))
                    .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
                    .catch(error => this.$notify({type: 'error', text: `<i class="fa fa-warning" aria-hidden="true"></i> &nbsp ${error.response.data.message} `}))
                    .finally(() => this.$store.commit('ui/STOP_LOADING'))
            }
        },
    }
</script>