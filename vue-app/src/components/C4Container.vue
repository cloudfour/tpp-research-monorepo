<template>
  <c4-container
    :container-class.prop='containerClass'
    :content-class.prop='contentClass'
  >
    <slot />
  </c4-container>
</template>

<script>
export default {
  props: ['contentClass', 'containerClass'],
};
</script>
