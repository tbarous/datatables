<template>
	<div>
		{{opco.name}}
	</div>
</template>

<script>
	import Opco from './../../core/Opco'
	import Service from './../../core/Service'

	export default {
		data(){
			return {
				opco: new Opco('Vodafone')
			}
		},
		created(){

		}
	}
</script>