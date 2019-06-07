<template>
	<div class="tree-menu">

    <div :style="indent" @click="handleEvent" :class="{ folders: children, items: !children }">
      <span v-if="children&&!showChildren">&#9654;</span>
      <span v-else-if="children&&showChildren">&#9660;</span>
      {{ name }}
    </div>

    <TreeMenu v-if="showChildren" v-for="node in children" :key="node.id"
        :children="node.children" :name="node.name" :depth="depth+1"></TreeMenu>
  	</div>
</template>

<script>
	import TreeMenu from './TreeMenu'
	export default{
		name: 'TreeMenu',
		components: { TreeMenu },
		props: ["name", "children", "depth"],
	  	data: function() {
	    	return {
	      		showChildren: false
	    	};
	  	},
	  	computed: {
	    	indent: function() {
	      		return { transform: `translate(${this.depth * 20}px)` };
	    	}
	 	},
	  	methods: {
	    	handleEvent: function(ev) {
	      		if(ev.currentTarget.className === "items") {
	        		alert("The item selected is " + ev.currentTarget.innerText);
	      		} else if(ev.currentTarget.className === "folders") {
	        		this.showChildren = !this.showChildren;
	      		}
	    	},
	  	}
	}
</script>