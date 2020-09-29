<template>
  <div class="item">
    <div class="category">
      <p class="">{{ item.sectionName }}</p>
    </div>
    <div class="content">
      <a :href="item.webUrl" :title="item.webTitle" target="_blank">
        <h3>{{ item.webTitle }}</h3>
      </a>
    </div>

    <Button
      @click="item.isSaved ? $emit('unsave') : $emit('save')"
      :type="'primary'"
      :active="item.isSaved"
    >
      {{ isSavedText }}
    </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "NewsItem",
  components: { Button },
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    isSavedText() {
      return this.item.isSaved ? "Remove from saved" : "Save for later";
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  display: block;
  padding: 1rem;
  box-sizing: border-box;

  text-align: left;
  background: #fff;
}

.content {
  width: 100%;
  height: 3.2rem;
  padding: 0.5rem 0;
}

.category {
  display: inline-block;
  width: min-content;
  padding: 0.2rem 0.5rem;
  background: $accent-color;
  color: $primary-text-color;
  white-space: nowrap;
}

p {
  margin: 0;
  font-size: 0.8rem;
}

h3 {
  margin: 0;
  color: #000;
  text-decoration: none;
  @include text-overflow(2);
}

a {
  color: $primary-color;
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
}

button {
  float: right;
}
</style>
