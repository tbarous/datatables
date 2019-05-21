<template>
    <div class="loader" :class="{nopacity: !loading}">
        <v-progress-linear class="mb-0" :indeterminate="true">
        </v-progress-linear>
    </div>
</template>

<script>
export default {
	props: {
		loading: {
			type: Boolean,
			required: true
		}
	}
}

</script>
