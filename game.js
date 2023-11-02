let difficulty;
let counter;
let solution;
let one_visible=false;
let secondCard;
let turn_counter=0;
let lock=false;
function game_start(x){
    one_visible=false;
    let names;
    difficulty=x;
    let board=document.querySelector('.board');
    document.querySelector('.menu').style.display="none";
    document.querySelector('.game').style.display="block";

    document.querySelector('.win').innerHTML='';
    board.innerHTML='';
    turn_counter=0
    switch(x){
        case 'Easy':{
            names=['Luz','Hunter','Luz','Amity','Amity','Willow','Camila','Gus','Camila','Willow','Gus','Hunter','Vee','Masha','Masha','Vee'];
            board.style.width="600px";
            counter=8;
            
        } break;
        case 'Medium':{
            names=['Stringbean','Flapjack','Stringbean','Ghost','Ghost','Clover','Mark','Clover','Mark','Flapjack',
            'Eda','Eda','King','King','Surge','Surge','Ed','Em','Ed','Em','Lilith','Lilith','Hooty','Hooty'];
            board.style.width="900px";
            counter=12;


        } break;
        case 'This mama is ready for trauma':{
            names=['TitanLuz','TitanLuz','Amity','Amity','Belos','Golden','Belos','Jerbo','Jerbo','Barcus','Raine','Barcus','Raine','Golden','Viney','Skara','Bump','Skara','Bump','Viney','Leo','Leo',
            'Steve','Steve','Bosha','Bosha','Surge','Surge','Manny','Alador','Manny','Alador','Collector','Collector','Hooty','Hooty','Darius','Darius','Titan','Titan'];
            board.style.width="1150px";
            counter=20;
        
        } break;
    }
    document.querySelector('.difficulty').innerHTML=x;
    for(let i=0;i<counter*2;i++) board.innerHTML+='<div class="card" onclick="revealcard('+i+')" id="c'+i+'"></div>'; 
    board.innerHTML+='<div class="score">Turn Counter: 0</div>';
    solution=new Array();
    for(i=counter*2;i>0;i--){
        let rand=Math.floor(Math.random()*i);
        solution.push(names[rand]);
        names[rand]=names[i-1];
    }
}
function revealcard(nr){
    if(lock==false&&nr!=secondCard){
        let image='url("img/'+solution[nr]+'.jpg")';
        document.getElementById('c'+nr).setAttribute("class","cardVisible");
        document.getElementById('c'+nr).style.backgroundImage=image;
        if(one_visible==false){
            one_visible=true;
            secondCard=nr;
        } else{
            lock=true;
            if(solution[nr]==solution[secondCard]) setTimeout(()=>{remove_two(nr)},750);
            else setTimeout(()=>{hide_two(nr)},1000);
            turn_counter++;
            one_visible=false;
            document.querySelector('.score').innerHTML='Turn Counter: '+turn_counter;
        }
    }
}
function remove_two(nr){
    counter--;
    document.getElementById('c'+nr).style.opacity=0;
    document.getElementById('c'+secondCard).style.opacity=0;  
    document.getElementById('c'+nr).setAttribute("onclick",";");
    document.getElementById('c'+secondCard).setAttribute("onclick",";");
    secondCard=-1;
    lock=false;
    if(counter<1){
        document.querySelector('.board').innerHTML='';
        document.querySelector('.win').innerHTML='<h1>You win!</h1> <p>Done in '+turn_counter+
        ' turns</p><p onclick="game_start(\''+difficulty+'\')" class="reset">One more round?</p>'
    }
}
function hide_two(nr){
    document.getElementById('c'+nr).setAttribute("class","card");
    document.getElementById('c'+secondCard).setAttribute("class","card");
    document.getElementById('c'+nr).style.backgroundImage='url(img/card.jpg)';
    document.getElementById('c'+secondCard).style.backgroundImage='url(img/card.jpg)';
    secondCard=-1;
    lock=false;
}
function menu_back(){
    document.querySelector('.game').style.display="none";
    document.querySelector('.win').innerHTML='';
    document.querySelector('.menu').style.display="block";
}
function credits(){
    document.querySelector('.menu').style.display='none';
    document.querySelector('.credits').style.display='block';
}
function credits_back(){
    document.querySelector('.menu').style.display='block';
    document.querySelector('.credits').style.display='none'
}
