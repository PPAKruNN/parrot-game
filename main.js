function virarCarta(el) {
    const frente = el.childNodes[0]
    const atras = el.childNodes[1]

    if(atras.style.transform == "rotateY(0deg)"){
        virarParaFrente(frente, atras)
    } else {
        virarParaTras(frente,atras)
    }
}

function virarParaTras(frente, atras) {
    frente.style.transform = "rotateY(-180deg)"    
    atras.style.transform = "rotateY(0deg)"
}

function virarParaFrente(frente, atras) {
    frente.style.transform = "rotateY(0deg)"    
    atras.style.transform = "rotateY(180deg)"
}

// Função para gerar os HTMLs dos pássaros e adicioná-los ao DOM.
// Função para embaralhar o DOM.
// Função para descobrir qual o parrot selecionado quando clicar na carta.
// Criar lógica para ganhar pontos ao acertar os pares ou desvirar as cartas se errado. 

function startGame() {
    //Limpar cards-box
    const cardsbox = document.querySelector(".cards-box");
    while (cardsbox.firstChild) {
        cardsbox.removeChild(cardsbox.lastChild);
    }

    while (true) {
        qtdCartas = prompt("Com quantas cartas você quer jogar?: ")
        if(qtdCartas % 2 == 0 && qtdCartas >= 4 && qtdCartas <= 14) {
            break;
        }
    }

    cartasRestantes = qtdCartas

    // Repopula o array "parrotsLeft" usando o array parrotsTypes
    parrotsLeft = Array.from(parrotsTypes);
    
    while (qtdCartas != 0) {
        generateCardPair()
        qtdCartas -= 2;
    }

    // Embaralha as cartas.
    const nodes = Array.from(cardsbox.childNodes);
    nodes.sort(comparador)
    
    nodes.forEach(node => {
       cardsbox.appendChild(node); 
    });

    // reseta o número de jogadas, cartas selecionadas e relógio;
    jogadas = 0;
    selectedCards = []
    minutos = 0;
    segundos = 0;

    //Inicia relógio e reseta contadores
    clockInstance = setInterval(() => {
        segundos++
        document.querySelector(".clock").innerHTML = segundos.toString()
    }, 1000);
}

function comparador() { 
	return Math.random() - 0.5; 
}


function createCard(parrotType) {
    const el = document.createElement('template');
    el.innerHTML = element

    // Essa linha muda a source da imagem da parte de trás
    el.content.children[0].childNodes[1].childNodes[0].src = `src/${parrotType}.gif`
    document.querySelector('.cards-box').appendChild(el.content.children[0])
}

function generateCardPair() {
    // Sorteia um tipo de carta, cria um par e remove a opção do array parrotsLeft (onde estão as tipos de parrots disponiveis). 
    const index = Math.floor(Math.random() * parrotsLeft.length);
    createCard(parrotsLeft[index]);
    createCard(parrotsLeft[index]);

    parrotsLeft.splice(index, 1)
}

function chooseCard(el) {
    if(selectedCards.length  == 2) return; // Caso já existam duas cartas selecionadas, faça nada.

    if(selectedCards[0] == el) {
        return;
    }

    virarCarta(el);
    selectedCards.push(el)
    jogadas++;


    if(selectedCards.length == 2) { // Caso, depois de selecionar a carta nova, tenha 2 cartas selecionadas, faça os cálculos lógicos:
        const cardSrc1 = selectedCards[0].childNodes[1].childNodes[0].src
        const cardSrc2 = selectedCards[1].childNodes[1].childNodes[0].src

        if(cardSrc1 == cardSrc2) 
        {
            if(selectedCards[1] != selectedCards[0]) { // Apenas remove os listeners se o jogador clicou em 2 cartas distintas (Resolve o bug de clicar na mesma carta 2 vezes.)
                selectedCards[0].removeAttribute("onclick");
                selectedCards[1].removeAttribute("onclick");
                cartasRestantes -= 2;

                setTimeout(cardsLogic, 500);
            }
            selectedCards = []

        } else {
            setTimeout( () => {
                virarCarta(selectedCards[0])
                virarCarta(selectedCards[1])
                selectedCards = [];
            }, 1000)
        }
    }
}

function cardsLogic() {
    if(cartasRestantes == 0)
    {
        clearInterval(clockInstance);
        alert(`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${segundos} segundos!`)
        while(true) {
            const res = prompt("Você gostaria de reiniciar a partida? (sim ou não)")
            if(res == "sim") {
                startGame();
                break;
            }
            if(res == "não") {
                break;
            }

        }
    }
}

// Project variables
let selectedCards = [];
let jogadas = 0;
let qtdCartas = 0;
let cartasRestantes = 0;
let segundos = 0;

let clockInstance; 

const parrotsTypes = ["unicornparrot", "tripletsparrot", "revertitparrot", "metalparrot", "fiestaparrot", "explodyparrot", "bobrossparrot"]
let parrotsLeft = []

const element = '<div class="card" data-test="card" onclick="chooseCard(this)"><div class="frente face"><img data-test="face-down-image" src="src/parrot.png" alt="parrot"></div><div class="atras face"><img data-test="face-up-image" src="src/metalparrot.gif" alt="metalparrot""></div></div>'

startGame();