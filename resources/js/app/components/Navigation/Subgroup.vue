<template>
	<div>
		<v-list-group no-action sub-group :value="false" v-for="page in pages" :key="page.id" v-if="page.children.length && Boolean(page.menu)">
	      	<template v-slot:activator>
	        	<v-list-tile> 
	          		<v-list-tile-title>{{page.name}}</v-list-tile-title>
	        	</v-list-tile>
	      	</template>
	      	<Subgroup :pages="page.children"></Subgroup>
	    </v-list-group>
		
		<div v-for="(page, i) in pages" :key="i" class="children" v-if="Boolean(page.menu)">
			<v-list-tile :to="page.slug" v-if="!page.children.length">
		        <v-list-tile-title v-text="page.name"></v-list-tile-title>
	     	</v-list-tile>
		</div>
    </div>
</template>

<script>
	import Subgroup from './Subgroup'
	export default {
		props: {
			pages: {
				type: Array,
				required: true
			}
		},
		components: { 
			Subgroup 
		},
		name: 'Subgroup'
	}
</script>