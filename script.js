
// Fetches random art via API and displays it
async function randomArtButtonAction(){

    const randomArt = await getRandomArt();

    document.getElementsByClassName("random-art-display")[0].getElementsByTagName("h3")[0].textContent = randomArt.title;
    document.getElementsByClassName("random-art-display")[0].getElementsByTagName("p")[0].innerHTML = randomArt.description;
    document.getElementsByClassName("random-art-display")[0].getElementsByTagName("img")[0].setAttribute("src",randomArt.image_url);

}

// shows the random art button and random art
function displayRandomArtBlock(){
    // display random art div and hide search art div
    document.getElementById("random-art-div").style.display = "inline";
    document.getElementById("art-finder-div").style.display = "none";
}

// fetches random art and it's info via API
async function getRandomArt(){
    
    // pick a random art ID from pre-selected art
    const randNum = Math.floor(Math.random() * randomArtIds.length);
    const id = randomArtIds[randNum];
    const art = getArtById(id);
    return art;
}

// hides random art and displays search button + div
function displayArtFinderBlock(){

    document.getElementById("random-art-div").style.display = "none"; 
    document.getElementById("art-finder-div").style.display = "inline-block";

}

// Searches for art using input text, and either displays result or error message if none found
async function searchArtButtonAction(){
    // hide random art div + display art-finder div
    document.getElementById("random-art-div").style.display = "none";
    document.getElementById("art-finder-div").style.display = "inline-block";

    // get text from text field
    let inputText = document.getElementById("search-field").value;

    // parse text, display error if incorrect or missing
    if(inputText.length < 1){
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("h3")[0].textContent = "Please enter a search term";
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("p")[0].innerHTML = "";
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("img")[0].style.display = "none";
        return;
    }


    // api call via search
    const request = `https://api.artic.edu/api/v1/artworks/search?q=${inputText}`;
    const response = await fetch(request);
    const json = await response.json();
    console.log(json.data);

    // display art if result was found, else display warning message
    if(json.data[0]){
        // fetch art info/img
        let id = json.data[0].id;
        let artData = await getArtById(id);
    
        // display art
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("h3")[0].textContent = artData.title;
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("p")[0].innerHTML = artData.description;
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("img")[0].setAttribute("src",artData.image_url);
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("img")[0].style.display = "inline";

    }
    else{
        // display warning and hide art
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("h3")[0].textContent = "No artwork found for that search";
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("p")[0].innerHTML = "";
        document.getElementsByClassName("art-finder-display")[0].getElementsByTagName("img")[0].style.display = "none";
    }

}

// returns Art Image URL, Description, and Title
/**
 * 
 * @param {Number} id - ID of the art as used by ARTIC
 * @returns {Object} art - contains art data
 */
async function getArtById(id){

    let response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,description`);
    const json = await response.json();

    // get art info
    let art = {};
    art.title = json.data.title;
    art.description = json.data.description;
    art.image_url = `${json.config.iiif_url}/${json.data.image_id}/full/843,/0/default.jpg`; 
    return art;

}

// function to gather a list of random art that contains a description, name and image. Used to pre-populate the random art list
async function getListOfArt(){
    let artList = [];
    let count = 0;
    for(let i = 0; i < 500; i++){
        const random = Math.floor(Math.random() * 60000) + 100;
        // get random art
        let response = await fetch(`https://api.artic.edu/api/v1/artworks/${random}?fields=id,title,image_id,description`);

        if(response.status == 200){
            const json = await response.json();
            if(json.data.image_id && json.data.description){
                artList.push(json.data.id);
                console.log(++count);
                console.log(json.data.image_id)
            }
        }

    }
    console.log(artList);
}


// pre-selected "random" art IDs because picking purely random Ids isn't guaranteed to return art w/ a description
const randomArtIds = [
    23112, 58423, 38148,
    56115, 17968, 23080,
    30275, 55098,  8027,
    12578,  9013,58850,
    9402, 4267, 47578,
    54840,30227, 39170, 
    23968, 22037,35723, 
     6005,  9781, 42898, 
     58785,  4433,  8969, 48844,
    57791, 25983, 51195, 44059,
    49928, 44240, 13454, 16797,54467,15542 ]
