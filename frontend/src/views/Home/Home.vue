<template>
  <section v-if="movies">
    <ItemsList :items="watchlist" title="Watchlist"/>
    <ItemsList :items="movies" title="Trending Movies"/>
    <ItemsList :items="tv" title="Trending Tv Shows"/>      
  </section>
  <Spinner v-else/>
</template>

<script>
import ItemsList from "../../components/ItemsList/ItemsList.vue";

import client from "../../services/axios";
import { auth } from "../../services/firebase";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {
    ItemsList
  },
  data() {
    return {
      response: ""
    };
  },
  created() {
    console.log(this.$router.currentRoute)
    if (auth.currentUser) {
        auth.currentUser.getIdToken(true)
        .then((idToken) => {
          client({
            method: "GET",
            url: "/",
            headers: {
            authToken: idToken,
            },
          })
            .then((res) => {
              this.response = res.statusText;
            })
            .catch((err) => {
              this.response = err;
            });
        })
        .catch((error) => {
          console.log(error);
          this.response = "Error getting auth token";
        });
    } else {
      this.$router.redirect('/')
    }
  },
  computed: mapState(['movies', 'tv', 'watchlist'])
}
</script>

<style src="./Home.css" scoped />