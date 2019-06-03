<template>
	<v-dialog :value="dialog" persistent width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>
            <v-card-text>
                <v-form method="post" @submit.prevent="update">
                    <v-text-field :label="column.title" 
                        solo 
                        v-for="(column, key) in columns" 
                        :key="column.title" 
                        v-if="column.type == 'text'" 
                        type="text" 
                        v-model="editingRow[column.title]" class="mt-3"
                    >
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
</template>

<script>
	import Errors from './../Form/Errors'
    import CloseDialog from './../UI/CloseDialog'
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'

	export default {
        components: {CloseDialog},
        computed: {
            ...mapGetters("datatable", {
                columns: 'getColumns',
                editingRow: 'getEditingRow'
            }),
            ...mapGetters("ui", {
                dialog: 'getUpdateDialog',
            }),
        },
        methods: {
            ...mapMutations("ui", {
                close: 'closeUpdateDialog',
            }),
            ...mapActions("datatable", {
                update: 'update',
            }),

            update(){
                this.$store.commit('ui/startLoading')
                this.$store.dispatch('datatable/update').then(() => this.$store.commit('ui/stopLoading'))
            }
        },
	}
</script>