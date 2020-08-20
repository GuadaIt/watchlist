<template>
  <section>
    <h2>SEARCH RESULTS</h2>
    <br/>
    <h2>{{ $route.query.q }}</h2>
   <Item v-for="result in results" :key="result.id" :info="result"/>
  </section>
</template>

<script>
import Item from '../../components/Item/Item.vue';
import client from '../../services/axios';

export default {
  components: {
    Item
  },
  data() {
    return {
      results: [],
      currentPage: 1,
      totalPages: 0
    }
  },
  created() {
    client({
      method: 'GET',
      url: `/search/${this.$route.query.q}/${this.currentPage}`
    }) .then(res => {
      this.results = res.data.results;
      this.totalPages = res.data.total_pages;
      })
       .catch(err => console.log(err))
  },
  beforeUpdate() {
    client({
      method: 'GET',
      url: `/search/${this.$route.query.q}/${this.currentPage}`
    }) .then(res => {
      this.results = res.data.results;
      this.totalPages = res.data.total_pages;
      })
       .catch(err => console.log(err))
  }   
}
</script>

<style src="./SearchResults.css" scoped />