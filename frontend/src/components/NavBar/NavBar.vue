<template>
  <nav>
    <!-- TODO add animation to transition -->
    <form v-if="showSearchBar" @submit.prevent="reRoute">
      <input type="text" placeholder="Search..." v-model="searchInput" />
    </form>
    <div class="search-icon-container" @click="showSearchBar = !showSearchBar">
      <img src="../../assets/search.png" />
    </div>
    <button @click="logOut">Log out</button>
    
  </nav>
</template>

<script>
import { auth } from '../../services/firebase';

export default {
  data() {
    return {
      searchInput: '',
      showSearchBar: false
    }
  },
  methods: {
    logOut() {
      auth.signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    },
    reRoute() {
      this.$router.push(`/search?q=${this.searchInput}`)
    }
  }
};
</script>

<style src="./NavBar.css" scoped />