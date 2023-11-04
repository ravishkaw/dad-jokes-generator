const quoteContainer = document.getElementById("divContainer");
const jokeText = document.getElementById("joke");
const replyText = document.getElementById("reply");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("divLoader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://dad-jokes.p.rapidapi.com/random/joke";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "50da085a3amsh259f2c9986aaf81p1c61b4jsn164acff9d8be",
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    jokeText.innerText = data.body[0].setup;
    replyText.innerText = data.body[0].punchline;
    removeLoadingSpinner();
  } catch (error) {
    //getQuote();
  }
}

//Tweet quote
function tweetQuote() {
  const quote = jokeText.innerText;
  const author = replyText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//eventlisteners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
