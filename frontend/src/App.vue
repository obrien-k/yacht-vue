<template>
  <div id="app">
    <b-container fluid>
      <b-row no-gutters> 
        <b-col cols="1" >
          <Sidebar v-if="isAuthenticated"></Sidebar>
        </b-col>
        <b-col>
          <router-view id="content" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script type="text/javascript">
// import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/nav/Sidebar";
export default {
  components: {
    Sidebar: Sidebar,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  created() {
  }
};
</script>

<style lang="scss">

  @import "assets/_custom.scss";
  @import "~bootstrap/scss/bootstrap.scss";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  #app {
    text-align: center;
    color: #2c3e50;
  }
</style>
