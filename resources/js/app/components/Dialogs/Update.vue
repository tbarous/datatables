<template>
	<v-dialog :value="dialog" persistent width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Edit
            </v-card-title>
            <v-card-text>
                <v-form method="post" @submit.prevent="update">
                    <div v-for="(column, key) in columns" :key="column.title">
                        <v-text-field 
                            class="mt-3"
                            :label="column.title" 
                            v-if="column.editable"
                            solo 
                            type="text" 
                            v-model="editingRow[column.title]" 
                            @input="clearError(column.title)">
                        </v-text-field>
                        <errors :item="column.title"></errors>
                    </div>
                   
                    <v-btn class="ml-0 w-100" color="primary" type="submit">edit</v-btn>
                </v-form>

                <v-btn @click="close" class="close-window" flat icon>
                    <v-icon small>fa fa-times</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'

	export default {
        computed: {
            ...mapGetters("datatable", {
                columns: 'GET_COLUMNS',
                editingRow: 'GET_EDITING_ROW'
            }),
            ...mapGetters("ui", {
                dialog: 'GET_UPDATE_DIALOG',
            }),
        },
        methods: {
            clearError(title){
                this.$store.commit('datatable/CLEAR_ERROR', title)
            },
            ...mapMutations("ui", {
                close: 'CLOSE_UPDATE_DIALOG',
            }),
            update(){
                this.$store.commit('ui/START_LOADING')
                // this.$store.dispatch('datatable/MAKE_FORM')
                this.$store.dispatch('datatable/UPDATE')
                    .then(() => this.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been updated'}))
                    .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
                    .catch(error => this.$notify({type: 'error', text: `<i class="fa fa-warning" aria-hidden="true"></i> &nbsp ${error.response.data.message} `}))
                    .finally(() => this.$store.commit('ui/STOP_LOADING'))
            }
        },
	}
</script>