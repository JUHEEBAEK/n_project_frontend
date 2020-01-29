<template>
<v-card class="mx-auto" style="margin-top: -64px;">
     <v-toolbar flat>
        <v-toolbar-title class="grey--text">총 {{ searchResult.length }} 명 </v-toolbar-title>
        <v-spacer />

        <v-text-field
            v-model="search"
            hide-details
            prepend-icon="fas fa-search"
            single-line
        />
        <router-link to="/memberAdd">
            <v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark>fas fa-plus</v-icon>
            </v-btn>
        </router-link>
    </v-toolbar>
</v-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("member");

export default {
  data: () => ({
        model: null,
        search: null,
        isLoading: false,
    }),
    computed: {
        ...mapState(["memberList", "searchResult"]),
    },
    watch: {
        search (val) {
            console.log('search?/???');
            this.searchList(val);
        },
    },
    methods: {
        ...mapMutations( ["SET_SEARCH_RESULT"]),
        searchList(val) {
            if (val !== "" && val.length !== 0) {
                const result = this.memberList.filter(item => {
                    return   item.name.indexOf(val) > -1 ||
                        item.uniform_number.indexOf(val)> -1;
                });
                this.SET_SEARCH_RESULT(result);
            }else {
                this.SET_SEARCH_RESULT(this.memberList);
            }
        }
    }
}
</script>
