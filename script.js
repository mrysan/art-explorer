async function randomButtonAction(){
    const randomArt = await getRandomArt();

    document.getElementById("art-img").setAttribute("src",randomArt.image_url);
    document.getElementById("art-title").textContent = randomArt.title;
    document.getElementById("art-description").innerHTML = randomArt.description;

}

async function getRandomArt(){
    
    // get random art
    let art = {};
    let randNum = Math.floor(Math.random() * randomArtIds.length);
    let response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomArtIds[randNum]}?fields=id,title,image_id,description`);
    const json = await response.json();

    // get art info and image url
    art.title = json.data.title;
    art.description = json.data.description;
    art.image_url = `${json.config.iiif_url}/${json.data.image_id}/full/843,/0/default.jpg`; 
    return art;
}

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

    // Start the page with a random art! 
randomButtonAction()