<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import client from "./services/axios";
import { auth, db } from "./services/firebase";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      response: "",
    };
  },
  created() {
    client({
      method: "GET",
      url: "/api"
    })
      .then((res) => {
        this.addTrending(res.data);
        this.response = res.statusText;
      })
      .catch((err) => {
        this.response = err;
      });
  },
  methods: {
    ...mapActions(["addTrending", "addToWatchlist", "removeFromWatchlist"]),
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      
      if (user) {
        const userDb = db.collection('users').doc(user.uid).collection('watchlist');

        // listen to changes in db and modify state accordingly
        userDb.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              this.addToWatchlist(change.doc.data());
            }
            if (change.type === 'removed') {
              this.removeFromWatchlist(change.doc.data());
            }
          });
        });
      }
      
    });
  }
};
</script>

<style src="./App.css" />