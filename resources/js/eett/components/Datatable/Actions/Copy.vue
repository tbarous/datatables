<template>
	<v-flex xs2>
        <v-btn id="export-btn" data-clipboard-target="#resultsTable">
            Export <v-icon small>fas fa-file-export</v-icon>
        </v-btn>
    </v-flex>
</template>

<script>
	export default{
		mounted(){
        	var clipboard = new Clipboard('#export-btn');
		}
	}
</script>