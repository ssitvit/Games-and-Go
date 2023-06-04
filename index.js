var randomNumber1= Math.floor(Math.random()*6)+1;

var imageChange1= "dice"+randomNumber1+".png";

document.querySelectorAll("img")[0].setAttribute("src", imageChange1);

var randomNumber2= Math.floor(Math.random()*6)+1;

var imageChange2= "images/dice"+randomNumber2+".png";

document.querySelectorAll("img")[1].style.background;

if(randomNumber1>randomNumber2)
{
    document.querySelector("h1").innerHTML="🚩Player 1 Wins!";
}

else if(randomNumber1<randomNumber2)
{
    document.querySelector("h1").innerHTML="Player 2 Wins!🚩";   
}

else
{
    document.querySelector("h1").innerHTML="Draw!";
}
