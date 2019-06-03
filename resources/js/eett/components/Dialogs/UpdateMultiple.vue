<template>
	<v-dialog :value="dialog" persistent width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Edit fields</v-card-title>
            <v-card-text>
                <v-form method="post" @submit.prevent="updateMultiple(editingMultipleRow)">
                    <v-text-field :label="column.title" solo 
                        v-for="(column, key) in columns" 
                        :key="column.title" 
                        v-if="column.type == 'text'" 
                        type="text" 
                        v-model="editingMultipleRow[column.title]" class="mt-3">
                    </v-text-field>
                    <v-btn class="ml-0 w-100" color="primary" type="submit">edit</v-btn>
                </v-form>
                
                <errors></errors>
                <close-dialog></close-dialog>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import CloseDialog from './../UI/CloseDialog'
    import { mapGetters } from 'vuex'

	export default {
        components: {CloseDialog},
        computed: {
            ...mapGetters("datatable", {
                columns: 'getColumns'
            }),
            ...mapGetters("ui", {
                dialog: 'getUpdateMultipleDialog',
            }),
        },
		methods: {
            close() {
                this.$store.commit('ui/toggleDialog')
            }
        }
	}
</script>