var splide = new Splide( '.splide', {
    perPage: 6,
    type   : 'loop',
    gap    : '2rem',
    padding: '5rem',
    breakpoints: {
      640: {
        perPage: 2,
        gap    : '.7rem',
        height : '6rem',
      },
      480: {
        perPage: 1,
        gap    : '.7rem',
        height : '6rem',
      },
    },
  } );
  
  splide.mount();