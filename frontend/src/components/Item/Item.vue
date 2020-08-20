<template>
  <article>
    <div class="poster-container">
      <router-link :to="path">
        <!-- TODO add default img  -->
        <img :src="img" :alt="info.title" class="poster" />
      </router-link>
      <button v-if="!inWatchlist" class="icon add-icon" @click="addToWatchlist">
        <img src="../../assets/add.png" alt="add to watchlist" />
      </button>
      <button v-else class="icon check-icon" @click="removeFromWatchlist">
        <img src="../../assets/check.png" alt="is in watchlist" />
      </button>
    </div>
  </article>
</template>

<script>
import { auth, db } from "../../services/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      
    }
  },
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['watchlist']),
    img() {
      return `https://image.tmdb.org/t/p/w500${this.info.poster_path}`;
    },
    path() {
      //if (!this.info.poster_path) return ``
      return `/${this.info.media_type}/${this.info.id}`;
    },
    inWatchlist() {
      const exists = this.watchlist.some(el => el.id === this.info.id);
      return exists
    }
  },
  methods: {
    addToWatchlist() {
      const info = this.info;
      const userId = auth.currentUser.uid;
      const userRef = db.collection('users').doc(userId);

      userRef.collection('watchlist').doc((info.id).toString()).set(info);
    }, 
    removeFromWatchlist() {
      const userId = auth.currentUser.uid;
      const userRef = db.collection('users').doc(userId);
      userRef.collection('watchlist').doc((this.info.id).toString()).delete()
        .then(() => {
          console.log("Document successfully deleted!");
        }).catch(err => {
            console.error("Error removing document: ", err);
         });
    }
  }
};
</script>

<style src="./Item.css" scoped />