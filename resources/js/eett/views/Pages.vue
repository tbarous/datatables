<template>
	<div>
		<div id="tree">
			<TreeMenu :name="pages.name" :children="pages.children" :depth="0"></TreeMenu>
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
					return {name:'root', children:this.$store.getters['pages/GET_PAGES']}
				},
				set(pages){
					this.$store.commit('pages/SET_DATA', pages)
				}				
			}
		}
	}
</script>