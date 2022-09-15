//Set a variable for the fetch request through the API URL that convrets to JSON
    //userEntry variable is associated to output of search bar text, get 
    //submit button variable
    var userEntry = document.getElementById('search').value;
    let submitButton = document.getElementById('submit');
    let data;
    let animeDisplay = document.getElementById('anime-container');
    let webBody = document.body
    //Now lets add an event listener to the submit button to search
    submitButton.addEventListener('click', () =>{
        while(animeDisplay.hasChildNodes()){
            animeDisplay.removeChild(animeDisplay.firstChild);
        }
        userEntry = document.getElementById('search').value.replaceAll(' ', '%20');
        let url = `https://api.jikan.moe/v4/anime?q=${userEntry}`
    data = fetch(url)
    .then((res) => res.json())
    .then((data) =>{ 
        console.log(data); 
        updatePage(data);
    })
        console.log(userEntry);
    });

function updatePage(res){
    let animeInfo = res.data;
    let titleBox, text, imageBox, image, genreBox, genre, urlBox, url, statusBox, status, summBox, summ;
    for(let i = 0; i < animeInfo.length; i++){
        let genreArray = [];
        titleBox = document.createElement('h2');
        text = document.createTextNode(`${animeInfo[i].title}`);
        titleBox.appendChild(text);
            animeDisplay.appendChild(titleBox);
        statusBox = document.createElement('div');
        status = document.createTextNode(`Airing Status: ${animeInfo[i].status}`);
        statusBox.appendChild(status);
            animeDisplay.appendChild(statusBox);
        imageBox = document.createElement('img');
        image = `${animeInfo[i].images.jpg.image_url}`;
        imageBox.src = image;
            animeDisplay.appendChild(imageBox);
        genreBox = document.createElement('h3');
        for(let j = 0; j < animeInfo[i].genres.length; j++){
            indGenre = animeInfo[i].genres[j].name
            genreArray.push(indGenre);
        }
        genreArray.join(' ');
        genre = document.createTextNode(`${genreArray}`);
        genreBox.appendChild(genre);
            animeDisplay.appendChild(genreBox);
        summBox = document.createElement('div');
        if(animeInfo[i].synopsis == null){
            summ = document.createTextNode('No Summary Available');
            summBox.appendChild(summ);
            animeDisplay.appendChild(summBox);
        }else{
        summ = document.createTextNode(`${animeInfo[i].synopsis}`);
        summBox.appendChild(summ);
            animeDisplay.appendChild(summBox);
        }

    }
}
