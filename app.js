/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activPlayer;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice !== 1) {
        //add score
        roundScores += dice;
        document.querySelector('#current-' + activPlayer).textContent = roundScores;

    } else {
        //next player
        nextPlayer();
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //add current score to global
    scores[activPlayer] += roundScores;

    //update the ui
    document.querySelector('#score-' + activPlayer).textContent = scores[activPlayer];
    //check if player won
    if (scores[activPlayer] >= 20) {
        document.querySelector('#name-' + activPlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activPlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activPlayer + '-panel').classList.remove('active');
    } else {
        nextPlayer();
    }
});

function nextPlayer() {
    activPlayer === 0 ? activPlayer = 1 : activPlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activPlayer = 0;
    roundScores = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1!';
    document.getElementById('name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}