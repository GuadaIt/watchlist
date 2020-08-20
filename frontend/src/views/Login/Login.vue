<template>
  <div class="background-container">
    <div class="form-container">
      <h2>Login</h2>
      <div class="error-msg-container">
        <p>{{ authStatus }}</p>
      </div>  
      <form @submit.prevent="login">
        <label>Email</label>
        <input type="email" v-model="user.email" />
        <label>Password</label>
        <input type="password" v-model="user.password" />
        <!-- TODO add change password functionality -->
        <router-link to="/reset-password">Forgot your password?</router-link>
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?
        <router-link to="/register">Sign-up</router-link>
      </p>
    </div>
    <div class="background-overlay" />
  </div>
</template>

<script>
import { auth } from "../../services/firebase";

export default {
  data() {
    return {
      user: {},
      authStatus: ""
    };
  },
  methods: {
    login() {
        auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.authStatus = "Authorized";
          this.$router.replace({name: 'Home'});
        })
        .catch((err) => {
          this.authStatus = err;
        });
    },
  },
};
</script>

<style src="./Login.css" scoped />