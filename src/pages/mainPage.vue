<script>
import {mapActions, mapState} from "vuex"
import SectionComponent from "components/SectionComponent/SectionComponent.vue"
import HeaderComponent from "components/Header/HeaderComponent.vue"

export default {
  components: {HeaderComponent, SectionComponent},
  methods: {
    ...mapActions({
      fetchPosts: 'fetchPosts',
      getType: 'getType'
    }),
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.getPost.posts,
    })
  }
}
</script>

<template>
  <div class="container">
<!--    {{$store.state.getPost.inputValue}}-->
    <header-component />
    <div class="mapBlock">
      <section-component
        v-for="(item, index) in posts"
        :idOfItem="index"
        :item="item"
        :key="item.id"
        :filterValue="filterValue"
        :filterSelect="filterSelect"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './style';
</style>





<!--<template>-->
<!--  <div>-->
<!--    <p v-for="(item) in $store.state.getPost.posts" :key="item.id">-->
<!--      {{ item.name }}-->
<!--    </p>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapActions, mapState} from "vuex"-->

<!--export default {-->
<!--  methods: {-->
<!--    ...mapActions({-->
<!--      fetchPosts: 'fetchPosts'-->
<!--    })-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState({-->
<!--      str: state => state.getPost.str,-->
<!--    }),-->

<!--  },-->
<!--  mounted() {-->
<!--    this.fetchPosts()-->
<!--    console.log(this.$store.state.getPost.posts)-->
<!--  },-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->


<!--</style>-->
