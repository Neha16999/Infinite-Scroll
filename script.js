const imageConatiner = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'egiYlPeFtNrI97qgHmd7Re_ewb4p4HoGVjJIrARdpgI';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Check is all images are loaded
function imageLoaded()
{
    imagesLoaded++ ;
    //console.log(imagesLoaded);
    if (imagesLoaded === totalImages)
    {
        ready = true;
        loader.hidden = true;
        //console.log('ready = ',ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttribute(element, attributes)
{
    for (const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}

//Create element for links and photos and add them to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //console.log("totalImages = ", totalImages);
    //Running the function for each object in photosArray
    photosArray.forEach((photo) => {
        //creating <a> link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href : photo.links.html,
            target: '_blank',
        });

        //creating img for photo
        const img = document.createElement('img');    
        setAttribute(img,{
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put the <img> inside anchor element <a> and then putting both in the image conatiner
        item.appendChild(img);
        imageConatiner.appendChild(item);

    });
}


//Get Photos
async function getPhotos()
{
    try 
    {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error)
    {
       console.log(error);
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    //console.log("Scrolled !");
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready = false;
        getPhotos();
        //console.log("Load More !")
    }
});


//onload
getPhotos();