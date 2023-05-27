$(document).ready(function () {
  var timerElement = $("#timer");
  var startTime = new Date().getTime();
  var score = 0;
  var flippedCards = [];
  var matchedCards = [];
  var timerFlag = true;

  function updateTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var seconds = Math.floor(elapsedTime / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // Format the time values
    var formattedTime =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    // Update the timer element
    if(timerFlag)
    timerElement.text(formattedTime);
  }

  // Call the updateTimer function every second (1000 milliseconds)
  if(timerFlag)
  setInterval(updateTimer, 1000);

  // Retrieve the number of pairs from localStorage
  var pairsRequested = localStorage.getItem("pairsRequested");

  // Define an array of card image sources
  var cardImages = [
    "cards/artist.png",
    "cards/fireworks.png",
    "cards/dolls.png",
    "cards/joystick.png",
    "cards/joker.png",
    "cards/videogame.png",
    "cards/basketball.png",
    "cards/bear.png",
    "cards/cat.png",
  ];

  // Shuffle the cardImages array
  shuffle(cardImages);

  // Create a new array of card images based on the pairsRequested value
  var selectedImages = cardImages.slice(0, pairsRequested);

  // Duplicate the selectedImages array to create pairs
  var cardImagesPairs = selectedImages.concat(selectedImages);

  // Shuffle the cardImagesPairs array
  shuffle(cardImagesPairs);

  // Generate the HTML for the card images
  var cardHTML = "";
  for (var i = 0; i < cardImagesPairs.length; i++) {
    cardHTML += `
        <div class="col mb-3">
        <div class="card mb-3 border border-secondary square-card" data-index="${i}">
  <div class="card-body d-flex align-items-center justify-content-center">
    <img src="${cardImagesPairs[i]}" class="img-fluid hidden square-image" data-index="${i}" alt="Card ${i}" />
  </div>
</div>

          </div>
        </div>
      `;
  }

  // Append the card HTML to the card container
  $("#cardContainer").html(cardHTML);

  // Add click event handlers to the cards
  $(".card").on("click", function () {
    var cardIndex = $(this).data("index");
    if (
      flippedCards.length < 2 &&
      !matchedCards.includes(cardIndex) &&
      !flippedCards.includes(cardIndex)
    ) {
      flipCard($(this), cardIndex);
      flippedCards.push(cardIndex);

      if (flippedCards.length === 2) {
        var card1Index = flippedCards[0];
        var card2Index = flippedCards[1];

        var card1Image = $(`.card[data-index="${card1Index}"] img`);
        var card2Image = $(`.card[data-index="${card2Index}"] img`);

        if (cardImagesPairs[card1Index] === cardImagesPairs[card2Index]) {
          // Matched cards
          matchedCards.push(card1Index, card2Index);
          score++;
          $(".score span").text(score);

          if (matchedCards.length === cardImagesPairs.length) {
            // All cards are matched, game over
            timerFlag = false;
            alert(`Congratulations! You've won the game! With Time: ${timerElement.text()}`);
            var buttonHTML= `<button type="button" class="btn btn-primary d-block mt-5 mx-auto" id="startgameBtn">Restart Game</button>` + `<button type="button" class="btn btn-primary d-block mx-auto mt-5" id="homeBtn">Home</button>`;
            $("#postGameBtn").html(buttonHTML);
            $("#TimerClass").addClass(`text-success`);

            $("#startgameBtn").click(function () {
              location.reload();
            });

            $("#homeBtn").click(function () {
              window.location.href="index.html";
            });
          }
        } else {
          // Unflip cards after a delay
          setTimeout(function () {
            flipCardBack(card1Image);
            flipCardBack(card2Image);
          }, 1000);
        }

        flippedCards = [];
      }
    }
  });

  // Flip a card and reveal the image
  function flipCard(card, cardIndex) {
    card.addClass("flipped");
    card.find("img").removeClass("hidden");
    card.find("img").addClass("visible");
  }

  // Flip a card back and hide the image
  function flipCardBack(cardImage) {
    cardImage.removeClass("visible");
    cardImage.addClass("hidden");
    cardImage.closest(".card").removeClass("flipped");
  }
});

// Shuffle function
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
