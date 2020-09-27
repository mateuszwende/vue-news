<template>
  <header>
    <div class="header-inner">
      <div class="icon">
        <router-link to="/">
          <Logo :color="'#fff'" />
        </router-link>
      </div>
      <div class="nav">
        <router-link to="/news" active-class="active">News</router-link>
        <router-link to="/saved-news" active-class="active">
          Saved news
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "@/components/Logo";

export default {
  name: "Header",
  components: { Logo }
};
</script>

<style lang="scss">
header {
  width: 100%;
  background: $accent-color;

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: $max-width;
    width: calc(100% - 3rem);
    padding: 1rem 1.5rem;
    margin: 0 auto;
  }

  .icon {
    width: 8rem;
  }

  .nav {
    a {
      font-weight: bold;
      color: $primary-text-color;
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      text-decoration: none;

      &.router-link-exact-active {
        color: $primary-color;
      }

      &.active {
        color: $primary-color;
      }
    }
  }
}
</style>
