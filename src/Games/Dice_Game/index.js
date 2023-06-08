var randomDiceNo1 = Math.floor(Math.random()*6+1);
var randomDiceImg1src = "dice"+randomDiceNo1+".png";
var image1 = document.querySelectorAll("img")[0].setAttribute("src",randomDiceImg1src);


var randomDiceNo2 = Math.floor(Math.random()*6+1);
var randomDiceImg2src = "dice"+randomDiceNo2+".png";
var image2 = document.querySelectorAll("img")[1].setAttribute("src",randomDiceImg2src);

 



if( randomDiceNo1 > randomDiceNo2 ) {
    document.querySelector("h1").innerHTML = "Player 1 wins";
}
else if( randomDiceNo2 > randomDiceNo1 ) {
    document.querySelector("h1").innerHTML = "Player 2 wins";
}
else {
    document.querySelector("h1").innerHTML = "It's a draw!";
}