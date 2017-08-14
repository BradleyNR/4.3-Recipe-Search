let $ = require('jquery');
let handlebars = require('handlebars');


var searchTerm = '';//'search-term'
var searchUrl = 'https://recipepuppyproxy.herokuapp.com/api/' + '?i=' + searchTerm;

fetch(searchUrl).then(function(res){
  return res.json();
}).then(run);


//submit form
$('.search').on('submit', function(e){
  let newSearchTerms = encodeURI(document.getElementById("search").value);
  console.log(newSearchTerms);
  searchUrl = 'https://recipepuppyproxy.herokuapp.com/api/'
  newRecipes(newSearchTerms);
});

//click button
$('#search-button').on('click', function(e){
  e.preventDefault();
  let newSearchTerms = encodeURI(document.getElementById("search").value);
  console.log(newSearchTerms);
  searchUrl = 'https://recipepuppyproxy.herokuapp.com/api/'
  newRecipes(newSearchTerms);
});


function newRecipes(newSearchTerms){
  $('#recipe-template-area').empty();
  fetch(searchUrl + '?i=' + newSearchTerms).then(function(res){
    return res.json();
  }).then(run);
}

function run(result){
  console.log(result);
  let recipes = result.results;
  recipes.splice(8);
  console.log(recipes);

  displayRecipes(recipes);

};

function displayRecipes(recipes){
  let $appendTo = $('#recipe-template-area')
  let $source = $('#recipe-template').html();
  let template = handlebars.compile($source);

  recipes.forEach(function(recipe){
    let recipeInfo = template(recipe);
    $appendTo.append(recipeInfo);
  });

};
