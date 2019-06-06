<template>
	<div>
		<Page :pages="pages"></Page>
	</div>
</template>

<script>
	import Page from './../components/Pages/Page'

	export default {
		components: { Page },

		computed: {
			pages: {
				get(){
					return this.$store.getters['pages/GET_PAGES']
				},
				set(pages){
					this.$store.commit('pages/SET_DATA', pages)
				}				
			}
		},

		created(){
			this.pages.forEach(item => {
				item.showChildren = false
				item.children.forEach(item2 => {
					item2.showChildren = false
					item2.children.forEach(item3 => {
						item3.showChildren = false
					})
				})
			})
		},

		methods: {}
	}
</script>