<template>
  <c4-container :is-dark.prop='isDark' :is-prose.prop='isProse' :is-tall.prop='isTall'>
    <slot />
  </c4-container>
</template>

<script>
export default {
  props: ['isDark', 'isTall', 'isProse'],
};
</script>
