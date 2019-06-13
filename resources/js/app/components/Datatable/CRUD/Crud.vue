<template>
	<div>
		<v-btn flat fab dark small color="info" @click="setEditingRow(data)">
	        <v-icon dark>edit</v-icon>
	    </v-btn>
	    
	    <v-btn flat fab dark small color="red" @click="destroy(data.id)">
	        <v-icon dark>delete</v-icon>
	    </v-btn>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		methods: {
			setEditingRow(editingRow){
                this.$store.commit('datatable/SET_EDITING_ROW', editingRow)
                this.$store.commit('ui/OPEN_UPDATE_DIALOG')
            },
            destroy(id){
                this.$dialog.confirm()
                    .then(dialog => {
                    	this.$store.dispatch('datatable/DESTROY', id)
		                    .then(() => this.$notify({type: 'success', text: '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;Item has been deleted'}))
		                    .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
		                    .catch(error => this.$notify({type: 'error', text: `<i class="fa fa-warning" aria-hidden="true"></i> &nbsp ${error.response.data.message} `}))
		                    .finally(() => this.$store.commit('ui/STOP_LOADING'))
                    })
                    .catch(e => null)
            }
		}
	}
</script>