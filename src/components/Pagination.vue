<template>
  <section v-if="maxPages > 1" class="list">
    <Button
      :type="'info'"
      :disabled="currentPage === 1"
      @click="$emit('choose-page', currentPage - 1)"
    >
      Prev
    </Button>
    <Button
      v-for="(page, index) in pager.pages"
      :key="index"
      :type="'info'"
      :active="currentPage === page"
      @click="currentPage !== page ? $emit('choose-page', page) : null"
    >
      {{ page }}
    </Button>
    <Button
      :type="'info'"
      :disabled="currentPage === maxPages"
      @click="$emit('choose-page', currentPage + 1)"
    >
      Next
    </Button>
  </section>
</template>

<script>
import Button from "@/components/Button.vue";

const maxElem = 5;
const middlePos = 3;

export default {
  name: "Pagination",
  components: { Button },
  props: {
    maxPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    pager() {
      const startNum = this.currentPage - 2;
      return {
        pages:
          this.currentPage < middlePos
            ? Array.from(Array(maxElem), (v, i) => i + 1)
            : Array.from(Array(maxElem), (v, i) => startNum + i)
      };
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

button {
  margin-bottom: 0.5rem;
  margin-right: 0.1rem;
}
</style>
