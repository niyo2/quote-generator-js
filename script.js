
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let errorCounter = parseInt(0);

//  Loading Spinner Show
 function showLoadingSpinnner (){
     loader.hidden = false;
     quoteContainer.hidden = true;
 }

 //Remove Loading Spinner
 function removeLoadingSpinner(){
     if (!loader.hidden){
         quoteContainer.hidden = false;
         loader.hidden = true;
     }

 }
 // Get Quote from API 
 
async function getQuote() {
    if (errorCounter >= 5){
       authorText.innerText = " ";
       quoteText.innerText = "please try again unable to process!";
    }else{
    showLoadingSpinnner();
    const proxyUrl = "https://protected-eyrie-95956.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
         
        // Check If Author is blank, repalce it with "Unkown"
    
        if (data.quoteAuthor === " "){
            authorText.innerText = "Unknown";
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        //Dynamically Reduce font size for long quotes

        if (data.quoteText.length > 130 ) {
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }
    
       quoteText.innerText = data.quoteText;

       // Stop Loader , Show Quote
       removeLoadingSpinner();

    }catch(error){
        errorEncouter +=1;
        getQuote();
      }
         
    }

}
 
// Twitter Quote
function tweetQuote (){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}
// Event listeners 
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();

