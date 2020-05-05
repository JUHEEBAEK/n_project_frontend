<template>
    <div>
        <v-simple-table>
            <tbody>
                <tr v-for="(item, index) in tableData" :key="item.name">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.score }}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>


<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: null
        },
    },
    data () {
      return {
      }
    },
    mounted() {
    },
}
</script>


<style scoped>
</style>

