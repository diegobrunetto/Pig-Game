let scores, roundScore, activePlayer, diceDOM, gamePlaying;

init();

diceDOM = document.querySelector('.dice');

// Function to start the game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

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

}

function changePlayerTurn() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

// 'Roll dice' button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Random number for the dice
        var dice = Math.floor(Math.random() * 6) + 1;

        diceDOM.style.display = 'block';

        // Change dice image
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            // Add points to the current score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            changePlayerTurn();
        }
    }
});

// 'Hold' button
document.querySelector('.btn-hold').addEventListener('click',
    function () {
        if (gamePlaying) {
            // Add current score to total score
            scores[activePlayer] += roundScore;

            // Update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // Check if one player won the game
            if (scores[activePlayer] >= 50) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                diceDOM.style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

                gamePlaying = false;
            } else {
                changePlayerTurn();
            }
        }

    })

// 'New game button
document.querySelector('.btn-new').addEventListener('click', init);