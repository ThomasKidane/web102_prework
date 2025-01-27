/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    let c=0;
    // console.log(games);
    for(let i=0;i<games.length;i++){
        let game=games[i];
        const divElement = document.createElement('div');
        divElement.classList.add('game-card');
        divElement.innerHTML=`<img src="${game.img}" class="game-img" alt="${game.backers}" style="width: 150px; height: 150px;"> <p>${game.name} ${game.pledged}</p>`;
        const targetElement= document.getElementById('button-container');
        // console.log(targetElement);
        gamesContainer.appendChild(divElement);
        // targetElement.appendchild(divElement);
    }
        
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
let totalContribution=0;
// console.log(totalContribution)
totalContribution=GAMES_JSON.reduce((acc,obj)=> {return acc+obj.backers},0);
contributionsCard.innerText=totalContribution.toLocaleString('en-US');

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalMoney=0;
// console.log(totalMoney)
totalMoney=GAMES_JSON.reduce((acc,obj)=> {return acc+obj.pledged},0);
// console.log(totalMoney)
raisedCard.innerText=`${totalMoney.toLocaleString('en-US')}$`
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalgames=GAMES_JSON.length
gamesCard.innerText=`${totalgames}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let v=GAMES_JSON.filter( (game)=>{return game.pledged<game.goal})
    addGamesToPage(v)
    // console.log(GAMES_JSON.filter( (game)=>{return game.pledged<game.backers}).length)

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}
// console.log(GAMES_JSON.filter((game)=>{return game.pledged>=game.backers}).length)
// filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON.filter( (game)=>{return game.pledged>=game.goal}))

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
unfundedBtn.addEventListener('click',filterUnfundedOnly)
fundedBtn.addEventListener('click',filterFundedOnly)
allBtn.addEventListener('click',showAllGames)


// 011FLANNELclick

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// one game is unfunded
let unfundedCount=GAMES_JSON.filter( (game)=>{return game.pledged<game.goal}).length;
let displayStr = `A total of $${totalMoney.toLocaleString('en-US')} has been raised for ${unfundedCount} games. Currently, ${GAMES_JSON.length-unfundedCount} game remains unfunded. We need your help to fund these amazing games!`
const desc=document.createElement("p");
desc.innerText=displayStr
descriptionContainer.appendChild(desc)


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

let [, first, second]=sortedGames;
let firstname=first.name;
let firstelem=document.createElement("p")
let secondname=second.name;
let secondelem=document.createElement("p")
secondGameContainer.appendChild(secondelem)




// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item