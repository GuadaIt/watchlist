<template>
  <div>
    <h1>ITEM DETAILS</h1>
    
  </div>
</template>

<script>
import client from "../../services/axios";

export default {
  data() {
    return {
      info: null,
      response: "",
    };
  },
  created() {
    client({
      method: "GET",
      url: `/${this.$route.params.mediaType}/${this.$route.params.id}`,
    })
      .then((res) => {
        console.log(res.data);
        this.info = res.data
      })
      .catch((err) => this.response = err)
    },
  mounted() {
    console.log(this.$route)
  }  
};
</script>

<style src="./ItemDetails.css" scoped />