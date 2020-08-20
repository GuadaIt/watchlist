<template>
  <section>
    <h2>{{ title }}</h2>
    <!-- <agile v-if="items" :options="options">
      <div class="slide" v-for="(item, index) in items" :key="index">
        <Item :info="item" />
      </div>
    </agile> -->
    <!-- <carousel :per-page="5" 
              :pagination-size="12" 
              :navigationEnabled="true"
              paginationActiveColor="#FFFFFF"
              paginationColor="#666666" >
      <slide v-for="(item, index) in items" :key="index">
        <Item :info="item" />
      </slide>
    </carousel> -->
    <swiper ref="mySwiper" :options="options">
      <swiper-slide v-for="(item, index) in items" :key="index">
        <Item :info="item" />   
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>  
    </swiper>
  </section>
</template>

<script>
import Item from "../Item/Item.vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Item,
  },
  data() {
    return {
      options: {
        spaceBetween: 15,
        slidesPerView: 5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
  // data() {
  //   return {
  //     options: {
  //      dots: false,
  //      slidesToShow: 5,
  //      slidesToScroll: 5,
  //      infinite: false
  //     }
  //   }
  // }
};
</script>

<style src="./ItemsList.css" scoped />
