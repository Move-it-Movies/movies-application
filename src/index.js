/**
 * es6 modules and imports
 */
const $ = require('jquery');
const slick = require('slick-carousel');

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const updateMovies = () => {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        let carousel = $('.slider-nav');
        carousel.html(null);
        movies.forEach(({title, rating, id}) => {

            let html = '';
            html += `<div><h3>${title}</h3></div>`;
            carousel.append( html );
            carousel.removeClass('loading');

            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};

$(document).ready(function() {

    updateMovies();

    setTimeout( () =>
        $('.slider-nav').slick({
            dots: true,
            arrows: true,
            accessibility: true
        }) , 3000);

});