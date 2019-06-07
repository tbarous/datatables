<template>
	<div>
		<div id="tree">
			<TreeMenu :name="'aa'" :children="pages.children" :depth="0"></TreeMenu>
		</div>
	</div>
</template>

<script>
	import TreeMenu from './../components/Navigation/TreeMenu'

	export default {
		components: { TreeMenu },
		computed: {
			pages: {
				get(){
					let p = Object.assign({}, this.$store.getters['pages/GET_PAGES'])
					p = {name:'root'}
					p.children = this.$store.getters['pages/GET_PAGES']
					console.log(p)
					return p
				},
				set(pages){
					this.$store.commit('pages/SET_DATA', pages)
				}				
			}
		}
	}
</script>