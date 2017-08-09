let $ = require('jquery');
let handlebars = require('handlebars');


var searchTerm = '';//'search-term'
var searchUrl = 'http://recipepuppyproxy.herokuapp.com/api/' + '?q=' + searchTerm;

fetch(searchUrl).then(function(res){
  return res.json();
}).then(run);

//click
$('#search-button').on('click', function(e){
  e.preventDefault();
  let newSearchTerms = document.getElementById("search").value;
  searchUrl = 'http://recipepuppyproxy.herokuapp.com/api/'
  console.log(newSearchTerms);
  console.log(searchUrl + "?q=" + newSearchTerms);
  newRecipes(newSearchTerms);
});


function newRecipes(newSearchTerms){
  $('#recipe-template-area').empty();
  fetch(searchUrl + '?q=' + newSearchTerms).then(function(res){
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
