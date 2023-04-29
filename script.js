const score=document.querySelector('.score');
const popup=document.querySelector('.popup');
const road=document.querySelector('.road');


popup.addEventListener('click',start);
let player={speed : 5, score : 0};
let p={ ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false }
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);


function keyDown(e){
    e.preventDefault();
    p[e.key]=true;
  // console.log(e.key);
  // console.log(p);

   }
   
function keyUp(e){
    e.preventDefault();
    p[e.key]=false;
    //console.log(e.key);
    //console.log(p);
}


function isCollide(a,b){
        aRect=a.getBoundingClientRect();
        bRect=b.getBoundingClientRect();
        
        return !((aRect.bottom < bRect.top) ||(aRect.top > bRect.bottom) ||  (aRect.right < bRect.left) || (aRect.left > bRect.right))
    }


function moveLines(){
        let lines=document.querySelectorAll('.lines');

        lines.forEach(function(item){


            if(item.y>=700){            
                item.y-=700;
            }


            item.y += player.speed;
            item.style.top=item.y + "px";

        })   
     }
function endGame(){
        player.start=false;
        //popup.classList.remove('hide');
        confirm("game is finsh");
     }

function moveEnemy(car){
        let enemy=document.querySelectorAll('.enemy');

        enemy.forEach(function(item){
            if(isCollide(car, item)){
                console.log("collide occur");
                    endGame();
            }

            if(item.y>= 700){            
                item.y= -300;

                item.style.left=Math.floor(Math.random() *350)+"px";
            }


            item.y += player.speed;
            item.style.top=item.y + "px";

                          })
            }




function gamPlay(){

    let car=document.querySelector('.car');
   let redd=road.getBoundingClientRect();           ////road ki iinformastion  ki ye left se ryt se bottum se eveything 
    //console.log(redd);
  
    if(player.start){
            moveLines();
            moveEnemy(car);                                                                        /////car   
 
        if(p.ArrowUp &&   player.y>(redd.top+70))          {player.y-=player.speed}    //////////    player.speed define uppr h=5
        if(p.ArrowDown && player.y < (redd.bottom-50 ))    {player.y+=player.speed}
        if(p.ArrowLeft && player.x>0)                       {player.x-=player.speed}               ////// 50 car ki khud ki bi height h
        if(p.ArrowRight && player.x<(redd.width -50))        {player.x+=player.speed}

        car.style.top=player.y + "px";                        ///css use krre h     
        car.style.left=player.x + "px";
    
        window.requestAnimationFrame(gamPlay);

   
    player.score++;
        score.innerText="score is:"+player.score;


}
}

function start(){
        road.classList.remove('hide');  ///////////////jo hmne  ROAD class hide ki thi usko remove kr deg
        popup.classList.add('hide'); ///////////////////but popup ko hide krna h
    
        player.start=true;
            player.score=0;
       
        window.requestAnimationFrame(gamPlay);
            
      
        for(x=0; x<5; x++){                                                                    /////looop for multiple  road line
            let roadLine=document.createElement('div');
            roadLine.setAttribute('class','lines');                                    // continus div bnte rhte h
            roadLine.y=(x*150);                             /// line from top ki position                0*150
            roadLine.style.top=roadLine.y +"px";  //// 
            road.appendChild(roadLine);           /////??????????????????????????????????????
    
        }

        let car =document.createElement('div');                ////////////pure js se elememt create kiya div  
        car.setAttribute('class','car');                                ///class name is car    class ko atttribute bolte h
        road.appendChild(car);                                         //////////////ek or div in this div

        player.x=car.offsetLeft;                                                 ///object   

        player.y=car.offsetTop;

        //console.log("top position"+ car.offsetTop);               ///////////////tell the position top nd left
       // console.log("left"+ car.offsetLeft);
    

    for(x=0; x<3; x++){
        let enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y=((x+1)*350)*-1;
        enemycar.style.top=enemycar.y +"px";
        
        enemycar.style.left=Math.floor(Math.random() *350)+"px";
        road.appendChild(enemycar);
    }
}
    