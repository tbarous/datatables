<template>
	<div>
		<div v-for="page in pages" :key="page.title">
			<v-list-group prepend-icon="fas fa-tools" :value="false" dark v-if="page.children">
		        <template v-slot:activator>
		            <v-list-tile>
		                <v-list-tile-title>{{page.title}}</v-list-tile-title>
		            </v-list-tile>
		        </template>

		        <!-- <div v-for="(child, index) in page.children" :key="index"> -->
	        	<Page :pages="page.children"></Page>
		        <!-- </div> -->

		        <!-- <v-list-tile v-if="page.children" :to="child.slug" >
		            <v-list-tile-action>
		                <v-icon v-text="child.icon"></v-icon>
		            </v-list-tile-action>
		            <v-list-tile-content>
		                <v-list-tile-title v-text="child.title"></v-list-tile-title>
		            </v-list-tile-content>
		        </v-list-tile> -->
		    </v-list-group>

		    <v-list-tile v-if="!page.children" :to="page.slug">
	            <v-list-tile-action>
	                <v-icon v-text="page.icon"></v-icon>
	            </v-list-tile-action>
	            <v-list-tile-content>
	                <v-list-tile-title v-text="page.title"></v-list-tile-title>
	            </v-list-tile-content>
	        </v-list-tile>
	    	<v-divider class="mt-0 mb-0"></v-divider>
		</div>
	</div>
</template>

<script>
	import Page from './Page'

	export default {
		name: 'Page',

		props: ['pages'],
		components: {
			Page
		}
	}
</script>