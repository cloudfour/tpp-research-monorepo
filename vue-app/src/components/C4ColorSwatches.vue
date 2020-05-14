<template>
  <c4-color-swatches
    :radio-name.prop='radioName'
    :colors-data.prop='colors'
    @colorChanged='emitEvent'
  ></c4-color-swatches>
</template>

<script>
export default {
  props: ['radioName', 'colors'],
  methods: {
    emitEvent(event) {
      this.$emit('colorChanged', event.detail);
    },
  },
};
</script>
