
let pulando = false;
let score = 0;
let position = 0;
let scoreInterval;
let end = document.getElementById('end');
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
	scoreInterval = setInterval(calcscore,100);

}
function calcscore(){
	score++;
	document.querySelector(".value").innerHTML = `Score: ${score}`
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
		if (position >= 150){
			clearInterval(upInterval)
			let downInterval = setInterval(() => {
			position -= 20;
			dino.style.bottom = position + 'px';
			if (position <= 20){
				clearInterval(downInterval)
				pulando = false;
			}
			}, 20)

		}
		else{
		position +=12;
		dino.style.bottom = position + 'px';
		}
	}, 20)
}

function createCacto() {
	const cacto = document.createElement('div');
	let randomTime = Math.random() * 3000;
	let cactopos = 800;
	cacto.style.left = 800 + 'px';
	cacto.classList.add('cacto');
	bg.appendChild(cacto);

	let leftInterval = setInterval(() => {
			if(cactopos < -0){
				clearInterval(leftInterval);
				bg.removeChild(cacto);

			}else if(cactopos > 0 && cactopos < 60 && position < 60 && cactopos){
				//game over
				//debugger
				clearInterval(leftInterval);
				clearInterval(makeCacto);
				gameOver();
				console.log(cactopos)
			}else{
				cactopos -=12;
				cacto.style.left = cactopos + 'px';
			}
	}, 20)
		makeCacto =	setTimeout(createCacto, randomTime);
}




function gameOver(){
	clearInterval(scoreInterval);
	dino.remove()
	document.querySelector(".value").innerHTML = ""
	end.style.display = "block";
	scr.style.display = "block"
	scr.innerHTML = `A sua pontuação foi ${score}`
	bg.remove()
}
