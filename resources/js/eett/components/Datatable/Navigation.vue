<template>
	<nav v-if="pagination && tableData.length > 0" class="text-center ml-auto mr-auto d-flex align-center justify-content-center">
        <ul class="pagination justify-content-center m-0">
            <li :class="{'disabled' : currentPage === 1}">
                <v-btn :disabled="currentPage === 1" dark fab small class="page-link d-flex" 
                    href="#" @click.prevent="changePage(1)">
                    <v-icon>fast_rewind</v-icon>
                </v-btn>
            </li>
            <li :class="{'disabled' : currentPage === 1}">
                <v-btn 
                    :disabled="currentPage === 1"
                    dark
                    fab 
                    small
                    class="page-link d-flex" 
                    href="#" 
                    @click.prevent="changePage(currentPage - 1)">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </li>

            <li 
                v-for="page in pagesNumber" 
                class="page-item" 
                :class="{'active': page == currentPage}">
                <!-- :class="{'active': page == pagination.meta.current_page}" -->
                <v-btn fab small
                    href="javascript:void(0)" 
                    @click.prevent="changePage(page)" 
                    class="page-link d-flex">
                    {{ page }}
                </v-btn>
            </li>

            <li 
                :class="{'disabled': currentPage === pagination.meta.last_page }">
                <v-btn
                    :disabled="currentPage === pagination.meta.last_page"
                    dark
                    fab
                    small
                    class="page-link d-flex" 
                    href="#" 
                    @click.prevent="changePage(currentPage + 1)">
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </li>
            <li 
                :class="{'disabled': currentPage === pagination.meta.last_page }">
                <v-btn
                    :disabled="currentPage === pagination.meta.last_page"
                    dark
                    fab
                    small
                    class="page-link d-flex" 
                    href="#" 
                    @click.prevent="changePage(pagination.meta.last_page)">
                    <v-icon>fast_forward</v-icon>
                </v-btn>
            </li>
        </ul>
    </nav>
</template>

<script>
	export default{
		
	}
</script>