<template>
	<div>
		<!-- {{page.showChildren}} -->
		<div 
			v-if="show" 
			style="margin-left: 50px;margin-top:20px;" 
			v-for="(child, index2) in page.children" 
			:key="child.id">
			<span>{{index2+1}}) </span>
			<v-text-field style="display: inline-block;" solo :value="child.name"></v-text-field>
			<v-icon @click="child.showChildren=!child.showChildren;refresh();" v-if="child.children.length">fa fa-chevron-down</v-icon>
		
			<div v-if="child.children.length">
				{{child.showChildren}}
				<Page :page="child" :show="child.showChildren"></Page>
			</div>
		</div>	
	</div>
</template>

<script>
	import Page from './Page'
	export default {
		props: ['page', 'show'],
		created(){console.log(this.show)},
		methods: {
			refresh(){
				alert(2)
				this.$store.commit('pages/REFRESH')
			}
		},
		name: 'Page',
	}
</script>