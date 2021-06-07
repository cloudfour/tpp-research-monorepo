<template>
  <div>
    <C4Container isProse="true" isStaggered="true">
      <C4Heading>Truly Portable Patterns | Vue</C4Heading>

      <p>
        This is a Vue app built using Stencil web components. The components
        have been wrapped in Vue components.
      </p>

      <C4Heading tag="h2">Buttons</C4Heading>

      <p>Here are some buttons:</p>

      <C4Button>I'm a c4-button!</C4Button>

      <C4Button buttonClass="secondary">I'm a secondary c4-button!</C4Button>

      <C4Button buttonClass="tertiary">I'm a tertiary c4-button!</C4Button>

      <C4Button disabled="true">I'm a disabled c4-button!</C4Button>

      <C4Button tag="a">I'm actually a link!</C4Button>

      <div>
        <C4Heading tag="h2">Star Rating</C4Heading>

        <C4StarRating rating="4.6" style="font-size: 3em"></C4StarRating>
      </div>

      <C4Heading tag="h2">Color Swatches</C4Heading>

      <p>
        Selected Color:
        <em>{{ selectedColor }}</em>
      </p>

      <C4ColorSwatches
        radioName="colors"
        :colorsData="colors"
        @colorChanged="changeColor"
      ></C4ColorSwatches>

      <p>
        The color swatches emit an event when the color is changed. This page is
        using Vue event binding.
      </p>
    </C4Container>
    <C4Container isProse="true" isTall="true" isDark="true" isStaggered="true">
      <C4Heading tag="h1">Dark Theme</C4Heading>
      <p>
        This container has the dark theme. The dark theme updates custom
        properties to change colors.
      </p>
    </C4Container>
  </div>
</template>

<script>
import {
  C4Container,
  C4Heading,
  C4Button,
  C4StarRating,
  C4ColorSwatches,
} from '../../vue-components';

export default {
  name: 'App',
  components: {
    C4Container,
    C4Heading,
    C4Button,
    C4StarRating,
    C4ColorSwatches,
  },
  data() {
    return {
      selectedColor: 'Cloud Blue',
      colors: [
        { hex: '#215cca', name: 'Cloud Blue', id: '123' },
        { hex: '#158466', name: 'PNW Green', id: '124' },
        { hex: '#d9118f', name: 'PWA Pink', id: '125' },
        { hex: '#f27041', name: 'Cloud Fourange', id: '126' },
        { hex: '#485968', name: 'Grey', id: '127' },
      ],
    };
  },
  methods: {
    changeColor({ name }) {
      this.selectedColor = name;
    },
  },
};
</script>
