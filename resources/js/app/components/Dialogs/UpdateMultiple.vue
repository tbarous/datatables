<template>
    <div style="display: inline-block">
        <v-btn 
            color="info" 
            class="ml-0" 
            @click="open">
            update multiple
            <v-icon class="ml-2" small>fas fa-plus</v-icon>
        </v-btn>

    	<v-dialog :value="dialog" persistent width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Update Multiple
                </v-card-title>
                <v-card-text>
                    <v-form method="post" @submit.prevent="update">
                        <v-text-field :label="column.title" solo 
                            v-for="(column, key) in columns" 
                            :key="column.title" 
                            v-if="column.editable" 
                            type="text" 
                            v-model="editingMultipleRow[column.title]" class="mt-3">
                        </v-text-field>
                        <v-btn class="ml-0 w-100" color="primary" type="submit">edit</v-btn>
                    </v-form>
                    
                    <errors></errors>
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
            ...mapGetters("datatable", {
                columns: 'GET_COLUMNS',
                editingMultipleRow: 'GET_EDITING_MULTIPLE_ROW'
            }),
            ...mapGetters("ui", {
                dialog: 'GET_UPDATE_MULTIPLE_DIALOG'
            }),
        },
		methods: {
            ...mapMutations("ui", {
                close: 'CLOSE_UPDATE_MULTIPLE_DIALOG',
                open: 'OPEN_UPDATE_MULTIPLE_DIALOG'
            }),
            update(){
                this.$store.commit('ui/START_LOADING')
                this.$store.dispatch('datatable/UPDATE_MULTIPLE', {vm: this})
                    .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
                    .then(() => this.$store.commit('ui/STOP_LOADING'))
            }
        }
	}
</script>