<template>
	<v-content>
        <v-container fluid pt-0>
            <h3 class="text-dark">{{$route.name}}</h3>
            <v-divider color="white"></v-divider>
            <v-layout>
                <v-flex>
                    <router-view></router-view>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
	export default {}
</script>