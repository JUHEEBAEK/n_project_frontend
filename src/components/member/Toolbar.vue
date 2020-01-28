<template>
    <v-card class="mx-auto"
            style="margin-top: -64px;"
    >
        <v-toolbar flat>
            <v-toolbar-title class="grey--text">총 30 명 </v-toolbar-title>

            <v-spacer />

            <v-text-field hide-details
                prepend-icon="fas fa-search"
                single-line />

            <router-link to="/memberAdd">
                <v-btn class="mx-2" fab dark small color="primary">
                    <v-icon dark>fas fa-plus</v-icon>
                </v-btn>
            </router-link>
        </v-toolbar>

    </v-card>

</template>

<script>
    export default {
        name: "toolbar"
    }
</script>

<style scoped>

</style>