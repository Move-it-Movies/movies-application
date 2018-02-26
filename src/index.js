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
    //Make this a promise vs setTimeout
    setTimeout( () =>
        $('.slider-nav').slick({
            dots: true,
            arrows: true,
            accessibility: true
<<<<<<< HEAD
        }) ,1220);
=======
        }) , 4000);
>>>>>>> 3d76e2990a21e95f0e17ac08fcc50ab959390d39

});

$('#term').focus(function(){
    var full = $("#poster").has("img").length ? true : false;
    if(full == false){
        $('#poster').empty();
    }
});

var getPoster = function(){

    var film = $('#term').val();

    if(film == ''){

        $('#poster').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

    } else {

        $('#poster').html('<div class="alert"><strong>Loading...</strong></div>');

        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=a44ae2bee8614564f3f36bf1aa247b1b&query=" + film + "&callback=?", function(json) {
            if (json != "Nothing found."){
                console.log(json);
                $('#poster').html('<p>Your search found: <strong>' + json.results[0].title + '</strong></p><img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
            } else {
                $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=1a44ae2bee8614564f3f36bf1aa247b1b&query=goonies&callback=?", function(json) {

                    console.log(json);
                    $('#poster').html('<div class="alert"><p>We\'re afraid nothing was found for that search.</p></div><p>Perhaps you were looking for The Goonies?</p><img id="thePoster" src="http://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />');
                });
            }
        });

    }

    return false;
};

$('#search').click(getPoster);
$('#term').keyup(function(event){
    if(event.keyCode == 13){
        getPoster();
    }
});