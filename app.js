//Set a variable for the fetch request through the API URL that convrets to JSON
//userEntry variable is associated to output of search bar text, get 
//submit button variable
var userEntry = document.getElementById('search').value;
let submitButton = document.getElementById('submit');
let data;
let recommendText = document.getElementById('recommend');
    let animeDisplay = document.getElementById('anime-container');
    let webBody = document.body
    let url = `https://api.jikan.moe/v4/anime?q=${userEntry}`
function fetchAnime(url){
    data = fetch(url)
        .then((res) => res.json())
        .then((data) =>{ 
        console.log(data); 
        updatePage(data);
    })
}
    
    //On page load, the webpage is populated by a fetch with a null value
    //instead of user entry, the api returns a populated object for
    //this case
    fetch('https://api.jikan.moe/v4/anime?q=' + "")
    .then((res) => res.json())
    .then((data) =>{ 
        updatePage(data)});
//Event listener adds search functionality with enter on keypress
document.addEventListener('keyup', (event) =>{
    if(event.keyCode === 13){
        while(animeDisplay.hasChildNodes()){
            animeDisplay.removeChild(animeDisplay.firstChild);
        }
        userEntry = document.getElementById('search').value.replaceAll(' ', '%20');
        url = `https://api.jikan.moe/v4/anime?q=${userEntry}`
        fetchAnime(url);
    }
});    
//Now lets add an event listener to the submit button to search
submitButton.addEventListener('click', () =>{
    while(animeDisplay.hasChildNodes()){
        animeDisplay.removeChild(animeDisplay.firstChild);
    };
    userEntry = document.getElementById('search').value.replaceAll(' ', '%20');
    url = `https://api.jikan.moe/v4/anime?q=${userEntry}`;
    fetchAnime(url);
});

function updatePage(res){
    let animeInfo = res.data;
    let titleBox, text, imageBox, image, genreBox, genre, urlButton, url, statusBox, status, summBox, summ;
    for(let i = 0; i < animeInfo.length; i++){
        let genreArray = [];
        titleBox = document.createElement('h3');
        titleBox.setAttribute('id', 'title');
        text = document.createTextNode(`${animeInfo[i].title}`);
        titleBox.appendChild(text);
            animeDisplay.appendChild(titleBox);
        statusBox = document.createElement('div');
        statusBox.setAttribute('id', 'status');
        status = document.createTextNode(`Airing Status: ${animeInfo[i].status}`);
        statusBox.appendChild(status);
            animeDisplay.appendChild(statusBox);
        imageBox = document.createElement('img');
        imageBox.setAttribute('id', 'image');
        image = `${animeInfo[i].images.jpg.image_url}`;
        imageBox.src = image;
            animeDisplay.appendChild(imageBox);
        genreBox = document.createElement('h4');
        for(let j = 0; j < animeInfo[i].genres.length; j++){
            indGenre = animeInfo[i].genres[j].name
            genreArray.push(indGenre);
        }
        genreArray.join(' ');
        genre = document.createTextNode(`${genreArray}`);
        genreBox.appendChild(genre);
            animeDisplay.appendChild(genreBox);
        summBox = document.createElement('div');
        summBox.setAttribute('id', 'summary');
        if(animeInfo[i].synopsis == null){
            summ = document.createTextNode('No Summary Available');
            summBox.appendChild(summ);
            animeDisplay.appendChild(summBox);
        }else{
        summ = document.createTextNode(`${animeInfo[i].synopsis}`);
        summBox.appendChild(summ);
            animeDisplay.appendChild(summBox);
        }
        urlButton = document.createElement('a');
        urlButton.setAttribute('id', 'url')
        url = `${animeInfo[i].url}`;
        let clickMe = document.createTextNode('Click Here For More!');
        urlButton.appendChild(clickMe);
        urlButton.setAttribute('href', url);
        animeDisplay.appendChild(urlButton);
    }
}
