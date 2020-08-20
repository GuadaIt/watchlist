<template>
  <div class="home">
    <NavBar />
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar/NavBar";

export default {
  name: "Base",
  components: {
    NavBar
  }  
};
</script>

<style src="./Base.css" scoped />