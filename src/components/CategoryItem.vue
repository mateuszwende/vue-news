<template>
  <Button :type="'accent'" :active="active">
    {{ category }}
  </Button>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "CategoryItem",
  components: { Button },
  props: {
    category: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  }
};
</script>
