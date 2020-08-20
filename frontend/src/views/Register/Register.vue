<template>
  <div class="background-container">
    <div class="form-container">
      <h2>Create account</h2>
      <form @submit.prevent="register">
        <label>Email</label>
        <input type="email" v-model="user.email" />
        <label>Password</label>
        <span v-if="error">{{ error }}</span>
        <input type="password" v-model="user.password" />
        <label>Confirm password</label>
        <input type="password" v-model="user.confirmPassword" />
        <button type="submit">Register</button>
      </form>

      <router-link to="/">Or Log In</router-link>

    </div>
    <div class="background-overlay" />
  </div>
</template>

<script>
import { auth, db } from "../../services/firebase";

export default {
  data() {
    return {
      user: {},
      error: ''
    };
  },
  methods: {
    register() {
      const { email, password, confirmPassword } = this.user;
            
      if (password === confirmPassword) {
        // creates user through firebase authentication
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          // adds user to users collection in firestore
          const userId = auth.currentUser.uid;
          const userCollection = db.collection('users').doc(userId);
          userCollection.set({
            id: userId
          });

          // redirects to home view
          this.$router.replace({ name: 'Home' })
        })
        .catch(err => {
          this.error = err;
        })
      } else {
        this.error = "Passwords don't match. Please try again.";
      }
    },
  },
};
</script>

<style src="./Register.css" scoped />