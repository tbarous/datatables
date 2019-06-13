<template>
	<div class="d-inline-block">
	    <v-btn 
	    	class="ml-0" 
	    	color="green" 
	    	dark 
	    	:href="url">
	        {{title}} 
	        <!-- <v-icon small>far fa-file-excel</v-icon> -->
	    </v-btn>
	</div>
</template>

<script>
	export default{
		props: {
			title: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			} 
		}
	}
</script>