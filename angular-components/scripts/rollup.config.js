import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'es2015/core.js',
  output: {
    file: 'dist/fesm2015.js',
    format: 'es'
  },
  inlineDynamicImports: true,
  external: (id) => {
    // inline @ionic/core deps
    if (id === '@ionic/core') {
      return false;
    }
    // anything else is external
    // Windows: C:\xxxxxx\xxx
    const colonPosition = 1;
    return !(id.startsWith('.') || id.startsWith('/') || id.charAt(colonPosition) === ':');
  },
  plugins: [
    // resolve({
    //   module: true,
    // })
  ]
};
