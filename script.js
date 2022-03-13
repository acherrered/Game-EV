var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() { // anonymous function - no name so cannot be called outside of this expression (created at runtime)
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;

      document.getElementById('dice-1').src = 'image/dice-' + dice1 + '.png';
      document.getElementById('dice-1').style.display = 'block';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1) {
            //Add score
            roundScore += dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
          //
          show();
          hide();
          nextPlayer();
        }

    }
      
});

// manage losing (show losing message & dice-1 for 3 sec and hide roll dice button for 3 sec)
function show() {
  setTimeout(function(){
    document.getElementById('losing').style.display = 'block';
    document.getElementById('dice-1').src = 'image/dice-1.png';
    document.getElementById('dice-1').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'none';
  })
}

// manage after losing 
function hide() {
  setTimeout(function(){
    document.getElementById('losing').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
  },3000)
}


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

                                                     
function nextPlayer() {
  document.getElementById('losing').style.display = 'none';
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
 }


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('losing').style.display = 'none';
}