<template>
  <div class="member___container">
    <div class="member__header">
      <h3 class="mr-5">회원 관리</h3>
      <span class="header__count grey--text">
        총 {{ memberList.length }} 명
        <v-btn class="mx-2" fab dark x-small color="primary" @click="toggleDialog(true)">
          <v-icon dark>fas fa-plus</v-icon>
        </v-btn>
      </span>
    </div>
    <div class="member__content">
      <search-table-filter class="content__table--search" label="이름으로 검색" @setSearchQuery="setSearchQuery" />
      <data-table-member
        :tableLoading="loading"
        :searchQuery="searchQuery"
        :headers="headers"
        :items="memberList"
        :accountType="accountType"
        @openEditDialog="toggleDialog"
        @clickedDeleteMember="remove"
      />
    </div>

    <dialog-member
      :dialog="dialogProps.value"
      :clickedInfo="dialogProps.item"
      :memberList="memberList"
      @toggleDialog="toggleDialog"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchTableFilter from "@/components/search/TableFilter.vue";
import DataTableMember from "@/components/member/TableList.vue";
import DialogFormMember from "@/components/dialog/member/AddAndEditForm.vue";

export default {
  components: {
    "search-table-filter": SearchTableFilter,
    "data-table-member": DataTableMember,
    "dialog-member": DialogFormMember
  },
  data: () => ({
    searchQuery: "",
    searchResult: [],
    loading: false,
    headers: [
      {
        text: "이름",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "입단일", value: "join_date", align: "center" },
      { text: "유니폼", value: "uniform_number", align: "center" },
      { text: "탈퇴일", value: "withdraw_date", align: "center" },
      { text: "", value: "actions", sortable: false, align: "center" }
    ],
    dialogProps: {
      value: false,
      item: {}
    }
  }),
  computed: {
    ...mapGetters("account", ["accountType"]),
    ...mapGetters("member", ["memberList"])
  },
  created() {
    this.loadMembers();
  },
  methods: {
    ...mapActions("member", ["getAllMemberList", "removeMember"]),
    async loadMembers() {
      this.loading = true;
      await this.getAllMemberList();
      this.loading = false;
    },
    setSearchQuery(value) {
      this.searchQuery = value;
    },
    toggleDialog(item) {
      this.dialogProps = {
        value: item ? true : false,
        item
      };
    },
    async remove(member_id) {
      const formData = { member_id: member_id };
      if (confirm("정말로 삭제하시겠습니까??")) {
        await this.removeMember(formData);
      }
    }
  }
};
</script>

<style lang="scss" scoped src="@/assets/scss/views/nav/member/memberAdmin.scss" />
