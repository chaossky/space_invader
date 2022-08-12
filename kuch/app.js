const grid=document.querySelector('.grid');
let currentShooterIndex=202;
let width=15;
let direction=1;
let invadersID;
let goingRight=true;
let alienRemoved=[];

//225조각으로 나눈다.
for (let i=0; i<255; i++)
{
    const square=document.createElement('div');
    grid.appendChild(square);
}


const squares=Array.from(document.querySelectorAll('.grid div'));

//인베이더 일련번호 매기기
const alienInvaders=
[
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw()
{   //인베이더를추가한다.
    for(let i=0; i<alienInvaders.length; i++)
    {   if(!alienRemoved.includes(i))
        {
            squares[alienInvaders[i]].classList.add('invader'); 
        }
    }
}

function remove()
{   //인베이더를 제거하고 
    for(let i=0; i<alienInvaders.length; i++)
    {
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

//그린다.
draw();

//슈터를 더한다.
squares[currentShooterIndex].classList.add('shooter');

//키 입력에 따라서 슈터를 이동시킨다.
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterIndex % width !==0)
             {
               // console.log('currentShooterIndex', currentShooterIndex);
                currentShooterIndex--;
            }
            break;
        case 'ArrowRight':
            if(currentShooterIndex%width !==width-1) 
            {
                //console.log('currentShooterIndex', currentShooterIndex)
                currentShooterIndex++;
            }
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown',moveShooter); 
function moveInvaders(){
    const leftEdge=alienInvaders[0]%width===0;
    const rightEdge=alienInvaders[alienInvaders.length-1]%width===width-1;

    remove();

    if (rightEdge && goingRight)
    {
        for (let i=0; i<alienInvaders.length; i++)
        {
            alienInvaders[i]+=width+1;
            direction=-1;
            goingRight=false;
        }
    }

    if (leftEdge && !goingRight){
        for (let i=0; i<alienInvaders.length; i++)
        {
            alienInvaders[i]+=width-1;
            direction=1;
            goingRight=true;
        }
    }
    for(let i=0; i<alienInvaders.length; i++){
        alienInvaders[i]+=direction;
    }

    draw();

    if (squares[currentShooterIndex].classList.contains('invader'))
    {
        squares[currentShooterIndex].classList.remove('shooter');
        clearInterval(invadersID);
        alert('Game Over');
    }
}

invadersID=setInterval (moveInvaders, 500);

function shoot(e){
    let laserID;
    let currentLaserIndex=currentShooterIndex;
    function moveLaser()
    {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex-=width;
        squares[currentLaserIndex].classList.add('laser');
    }

    if (squares[currentLaserIndex].classList.contains('invader'))
    {
        squares[currentLaserIndex].classList.remove('laser');
        squares[currentLaserIndex].classList.remove('invader');
        squares[currentLaserIndex].classList.add('boom');

        setTimeout(()=>squares[currentLaserIndex].classList.remove('boom'), 300);
        clearInterval(laserID);

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
        alienRemoved.push(alienRemoved);
        console.log(alienRemoved);
    }
    switch(e.key){
        case 'ArrowUp':
            laserID=setInterval(moveLaser, 100);
            break;
    }

}

document.addEventListener('keydown',shoot);
