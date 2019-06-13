<template>
	<div>
		<v-btn flat fab dark small color="info" @click="setEditingRow(data)">
	        <v-icon dark>edit</v-icon>
	    </v-btn>
	    
	    <v-btn flat fab dark small color="red" @click="destroy(data)">
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
            destroy(row){
                let message = {title: 'Are you sure?', body: 'You are about to delete ' + row.username};
                this.$dialog.confirm(message)
                    .then(dialog => {
                        this.$store.commit('ui/START_LOADING')
                        this.$store.dispatch('datatable/DESTROY', {row:row, vm: this})
	                        .then(() => this.$store.dispatch('datatable/FETCH_DATA'))
	                        .then(() => this.$store.commit('ui/STOP_LOADING'))
                    }).catch(function() {
                    	//
                    });
            }
		}
	}
</script>