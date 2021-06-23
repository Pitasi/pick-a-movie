import filters from 'windicss/plugin/filters';

export default {
  attributify: true,
  theme: {
    extend: {
      blur: {
        xs: '2px',
      }
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(20px)',
    },
  },
  plugins: [
    filters
  ],
}

