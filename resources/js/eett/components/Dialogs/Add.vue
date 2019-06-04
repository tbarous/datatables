<template>
	<v-dialog v-model="dialog.edit" persistent width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>
            <v-card-text>
                <v-form method="post" @submit.prevent="update">
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

	export default {
        components: {CloseDialog},
	}
</script>