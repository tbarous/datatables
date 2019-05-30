<template>
	<v-content>
        <v-container fluid pt-0>
            <h3>{{$route.name}}</h3>
            <v-divider color="white"></v-divider>
            <v-layout>
                <v-flex>
                    <transition name="fade">
                        <!-- <keep-alive> -->
                        <router-view></router-view>
                        <!-- </keep-alive> -->
                    </transition>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
	export default {
		
	}
</script>