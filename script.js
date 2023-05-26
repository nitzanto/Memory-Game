$(document).ready(function() {
    
    var timerElement = $('#timer');
    var startTime = new Date().getTime();

    function updateTimer() {
      var currentTime = new Date().getTime();
      var elapsedTime = currentTime - startTime;
      var seconds = Math.floor(elapsedTime / 1000);
      var minutes = Math.floor(seconds / 60);
      seconds %= 60;

      // Format the time values
      var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

      // Update the timer element
      timerElement.text(formattedTime);
    }

    // Call the updateTimer function every second (1000 milliseconds)
    setInterval(updateTimer, 1000);

    var $cards = $('.card');
    var openedCards = [];
  
    // Function to handle card click event
    function handleCardClick() {
      
      var $card = $(this);
  
      if ($card.hasClass('matched') || $card.hasClass('opened')) {
        return; // Ignore clicks on already matched or opened cards
      }
  
      $card.addClass('opened');
      openedCards.push($card);
  
      if (openedCards.length === 2) {
        // Two cards opened, check for a match
        var card1 = openedCards[0].text();
        var card2 = openedCards[1].text();
  
        if (card1 === card2) {
          // Match found
          openedCards.forEach(function(card) {
            card.addClass('matched');
          });
        } else {
          // No match, flip back the cards after a delay
          setTimeout(function() {
            openedCards.forEach(function(card) {
              card.removeClass('opened');
            });
          }, 1000);
        }
  
        openedCards = []; // Reset the opened cards array
      }
    }
  
    // Attach click event handler to cards
    $cards.on('click', handleCardClick);
  
    // Function to handle restart button click event
    function handleRestartButtonClick() {
      $cards.removeClass('matched opened');
      openedCards = [];
    }
  
    // Attach click event handler to restart button
    $('#restart-button').on('click', handleRestartButtonClick);
  });