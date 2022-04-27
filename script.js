
let pulando = false;
let score = 0;
let position = 0;
let scoreInterval;
let end = document.getElementById('elearnd');
let scr = document.querySelector(".score")
let makeCacto;

function start(){
	//Inicia o Jogo
	score = 0;
	end.style.display = "none";
	scr.style.display = "none";
	game = document.querySelector('.game');
	bg = document.createElement('div');
	bg.classList.add('background')
	game.appendChild(bg);
	dino = document.createElement('div')
	dino.classList.add('dino');
	bg.appendChild(dino);
	document.addEventListener('keypress', pular);
	document.querySelector('#btn').style.display = "none"
	createCacto();
	scoreInterval = setInterval(calcscore,1000);
}
function calcscore(){
	score++;
	console.log(score);
}


function pular(event){
	if (event.keyCode === 32){
		if(!pulando){
			jump();
		}

	}
}

function jump() {
	pulando = true;
	let upInterval = setInterval(() =>{
		if(position >= 150){
			clearInterval(upInterval)
			let downInterval = setInterval(() => {
			position -= 12;
			dino.style.bottom = position + 'px';
			if (position <= 20){
				clearInterval(downInterval)
				pulando = false;
			}
			}, 20)

		}
		else{
		position +=20;
		dino.style.bottom = position + 'px';
		}
	}, 20)
}

function createCacto() {
	const cacto = document.createElement('div');
	let cactopos = 1000;
	let randomTime = Math.random() * 3000;

	cacto.style.left = cactopos + 'px';
	cacto.classList.add('cacto');
	bg.appendChild(cacto);

	let leftInterval = setInterval(() => {
			if(cactopos < -60){
				bg.removeChild(cacto);
				clearInterval(leftInterval);
			}else if(cactopos > 0 && cactopos < 60 && position < 60){
				//game over
				//debugger
				gameOver();
				clearInterval(leftInterval);
				clearInterval(makeCacto);
			}else{
				cactopos -=10;
				cacto.style.left = cactopos + 'px';
			}
	}, 20)
		makeCacto =	setTimeout(createCacto, randomTime);
}




function gameOver(){
	dino.remove()
	end.style.display = "block";
	scr.style.display = "block"
	scr.innerHTML = `A sua pontuação foi ${score}`
	bg.remove()
	clearInterval(scoreInterval);
}
