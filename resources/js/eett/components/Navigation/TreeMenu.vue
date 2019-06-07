<template>
	<div class="tree-menu">
	    <div :style="indent" :class="{ folders: children, items: !children }">
	      	<v-btn fab small v-if="children&&!showChildren" @click="handleEvent">&#9654;</v-btn>
	      	<v-btn fab small v-else-if="children&&showChildren" @click="handleEvent">&#9660;</v-btn>
	      	<v-text-field :disabled="name=='root'" class="d-inline-block" solo style="width: 150px" name="name" :label="name" id="id"></v-text-field>
	    </div>
	    <TreeMenu v-if="showChildren" v-for="node in children" :key="node.id" :children="node.children" :name="node.name" :depth="depth+1"></TreeMenu>
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
	      		if(ev.currentTarget.parentElement.className === "items") {
	        		alert("The item selected is " + ev.currentTarget.innerText);
	      		} else if(ev.currentTarget.parentElement.className === "folders") {
	        		this.showChildren = !this.showChildren;
	      		}
	    	},
	  	}
	}
</script>