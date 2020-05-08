<template>
  <C4Container>
    <h1>Vue App</h1>

    <p>
      This Vue app is using a Vue wrapper around our
      <code>c4-color-swatches</code>
      custom element. This wrapper allows us to use Vue style event and data
      binding.
    </p>

    <h2>Color Swatches</h2>

    <p>
      Selected Color:
      <em>
        {{ selectedColor }}
      </em>
    </p>

    <C4ColorSwatches
      radio-name='colors'
      :colors='colors'
      @colorChanged='changeColor'
    ></C4ColorSwatches>
  </C4Container>
</template>

<script>
import C4Container from './components/C4Container';
import C4ColorSwatches from './components/C4ColorSwatches';

export default {
  name: 'App',
  components: {
    C4ColorSwatches,
    C4Container,
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
