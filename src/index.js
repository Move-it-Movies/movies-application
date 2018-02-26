/**
 * es6 modules and imports
 */

const $ = require('jquery');
const slick = require('slick-carousel');


const getMovies = () => {
        return fetch('/api/movies')
            .then(response => response.json());
};

$('#add-button').click(function() {
    // $('body').slickAdd("<body></body>");
    let movie = {title: $('#input-add-field').val()};
    postMovie(movie).then(window.location.reload());
});


// $('#edit-button').click(function(){
//     prompt ('Please Edit Name');
//     let this.movie = {title: $('#input-add-field').val()};
//     postMovie(movie);
// });

//



 $('#delete-button').click(function(){
     confirm ('Are you sure you want to Delete');
    var $currentSlide = $(".slick-slide.slick-current.slick-active");
     var currentSlide = $('#movieScrollBar').slick('slickCurrentSlide');
     var currentMovieId = ($currentSlide.find("input").val());
     return fetch(`/api/movies/${currentMovieId}`, {
         method: 'delete',
         headers: {
             'content-type': 'application/json'
         }
     })
         .then(response => response.json())
         .then(data => {
             console.log(data);
             updateMovies().then(() => window.location.reload());
         });
 });

const postMovie = (obj) => {
    return fetch('/api/movies', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(data => console.log(data));
};


const updateMovies = () => {
    return getMovies().then((movies) => {
        let carousel = $('.slider-nav');
        carousel.html(null);
        movies.forEach(({title, rating, id}) => {

            let html = '';
            html += `<div>
            <h3>${title}</h3>
            <input type="hidden" value="${id}">
            </div>`;
            carousel.append( html );
            carousel.removeClass('loading');

            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log('----------------------------');
        console.log(error);
        console.log('----------------------------');
    });
};

$(document).ready(function() {

    updateMovies().then(() => {
        $('.slider-nav').slick({
            dots: true,
            arrows: true,
            accessibility: true
        })
    });

});

// $('#term').focus(function(){
//     var full = $("#poster").has("img").length ? true : false;
//     if(full == false){
//         $('#poster').empty();
//     }
// });

// var getPoster = function(){
//
//     var film = $('#term').val();
//
//     if(film == ''){
//
//         $('#poster').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');
//
//     } else {
//
//         $('#poster').html('<div class="alert"><strong>Loading...</strong></div>');
//
//         $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=a44ae2bee8614564f3f36bf1aa247b1b&query=" + film + "&callback=?", function(json) {
//             if (json != "Nothing found."){
//                 // console.log(json);
//                 $('#poster').html('<p>Your search found: <strong>' + json.results[0].title + '</strong></p><img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
//             } else {
//                 $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=1a44ae2bee8614564f3f36bf1aa247b1b&query=goonies&callback=?", function(json) {
//
//                     // console.log(json);
//                     $('#poster').html('<div class="alert"><p>We\'re afraid nothing was found for that search.</p></div><p>Perhaps you were looking for The Goonies?</p><img id="thePoster" src="http://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />');
//                 });
//             }
//         });
//
//     }
//
//     return false;
// };
//
// $('#search').click(getPoster);
// $('#term').keyup(function(event){
//     if(event.keyCode == 13){
//         getPoster();
//     }
// });




