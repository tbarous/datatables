<template>
	<div class="d-inline-block">
	    <v-btn class="ml-0" color="indigo" dark id="export-btn" data-clipboard-target="#table">
	        Export 
	        <v-icon small class="ml-2">fas fa-file-export</v-icon>
	    </v-btn>
	</div>
</template>

<script>
	export default{
		mounted(){
        	var clipboard = new Clipboard('#export-btn');
		}
	}
</script>