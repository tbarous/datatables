<template>
	<v-dialog :value="dialog" persistent width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>
            <v-card-text>
                <v-form method="post" @submit.prevent="update">
                    <div v-for="(column, key) in columns" :key="column.title" >

                        <!-- v-if="column.type == 'text'"  -->
                        <v-text-field 
                            class="mt-3"
                            :label="column.title" 
                            solo 
                            type="text" 
                            v-model="editingRow[column.title]" 
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
            findError(title) {
                return this.$store.getters['datatable/GET_ERROR'](title)
            },
            ...mapMutations("ui", {
                close: 'CLOSE_UPDATE_DIALOG',
            }),
            ...mapActions("datatable", {
                update: 'UPDATE',
            }),
            update(){
                this.$store.commit('ui/START_LOADING')
                this.$store.dispatch('datatable/UPDATE', {vm: this})
                    .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
                    .then(() => this.$store.commit('ui/STOP_LOADING'))
            }
        },
	}
</script>