const grid = document.querySelector('.grid')
const cartas = document.querySelectorAll('.carta')
const cartasViradas = document.querySelectorAll('.cartaVirada')
const listaImagens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Representa o nome de cada imagem das cartas

let primeiraCarta = ''  // Variável para guardar a primeira carta virada
let segundaCarta = ''  // Variável para guardar a segunda carta virada

/**
 * CRIAR ELEMENTO:
 * 
 * Cria elemento dinamicamente e adiciona uma classe.
 * 
 * Sintaxe: 
 * criarElemento('div', 'carta')
 * 
 * Retorno:
 * Retorna o novo elemento criado.
*/
const criarElemento = (tag, classe) => {

    // Criar tag
    const novoElemento = document.createElement(tag)

    // Adicionar classe
    novoElemento.className = classe

    // Retornar elemento criado
    return novoElemento
}

/**
 * FIM DO JOGO:
 * 
 * Verifica se acertou todos os pares e informar que venceu.
*/
const fimDoJogo = () => {

    // Selecionar as cartas desabilitadas
    const cartasDesabilitadas = document.querySelectorAll('.cartaDesabilitada')
    
    // Verificar se tem 20 cartas desabilitadas
    if(cartasDesabilitadas.length === 20){
        alert('Parabéns! Vencedor!')
        console.log('Parabéns! Vencedor!')
    }
}

/**
 * VERIFICAR PARES:
 * 
 * Verificar se acertou os pares ou se errou.
 * 
 * Verificar se as duas cartas viradas são iguais.
 * Criar um atribudo data-listaImagens no HTML para comparar as cartas.
*/
const verificarPares = () => {

    // Pegar o atributo data-listaImagens das duas cartas viradas
    const primeiraImagem = primeiraCarta.getAttribute('data-listaImagens')
    const segundaImagem = segundaCarta.getAttribute('data-listaImagens')

    // verificar se as duas cartas são iguais. se acertou
    if (primeiraImagem === segundaImagem) {

        // Incluir a class cartaDesabilitada no primeiro elemento filho
        // Os elementos primeiraCarta e segundaCarta se referem ao elemento carta
        // Queremos adicionar a classe no filho do elemento carta
        primeiraCarta.firstChild.classList.add('cartaDesabilitada')
        segundaCarta.firstChild.classList.add('cartaDesabilitada')
        
        // Limpar as variáveis para poder virar outras cartas
        primeiraCarta = ''  
        segundaCarta = '' 

        // Verificar se acertou todos os pares
        fimDoJogo()

    } 
    // Se errou
    else {

        // Adicionar um delay para poder ver as duas cartas viradas
        setTimeout(() => {

            // Desvirar as duas cartas
            primeiraCarta.classList.remove('cartaVirada')
            segundaCarta.classList.remove('cartaVirada')

            // Limpar as variáveis para guardar as cartas viradas, para poder virar novas outras cartas
            primeiraCarta = ''  
            segundaCarta = ''  

        }, 500)
    }
}

/**
 * VIRAR CARTA:
 * 
 * Permite virar duas cartas por vez e verifica se as cartas formam um par.
 * 
 * O parâmetro {target} representa o elemento faceCostas.
 * Devemos acessar o elemento pai (carta) de {target} com a propriedade parentNode.
 * 
 * Verificar se o elemento carta possui a classe cartaVirada.
 * 
 * Verificar se os elementos primeiraCarta e segundaCarta estão vazias. 
 * Adicionar a class cartaVirada para virar a carta.
 * Guardar as cartas viradas.
 * Verificar se as cartas clicadas são iguais com a função verificarPares().
 * 
*/
const virarCarta = ({ target }) => {

    // Acessar o elemento pai de {target}
    const carta = target.parentNode

    // Verificar se a carta está virada.
    if (carta.className.includes('cartaVirada')) {
        return
    }

    // Verificar se a primeira carta ainda não foi clicada.
    if (primeiraCarta === '') {

        // Virar a carta
        carta.classList.add('cartaVirada')

        // Guardar a primeira carta virada
        primeiraCarta = carta
    }
    // Verificar se a segundaCarta está vazia. Ainda não foi clicada.
    else if (segundaCarta === '') {

        // Adiciono a class cartaVirada para virar a carta
        carta.classList.add('cartaVirada')

        // Guardar a segunda carta virada
        segundaCarta = carta

        // Verificar se as cartas clicadas são iguais
        verificarPares()
    }
}

/**
 * CRIAR CARTAS:
 * 
 * Cria cartas com a função criarElemento().
 * Define um bacground-image para frente de cada carta
 * Insere os elementos faceFrente e faceCostas no elemento carta no HTML.
 * Criar evento de clique para virar a carta.
 * Insere o atributo data-listaImagens no elemento carta para comparar as duas cartas viradas.
 * Retorna o elemento carta.
*/
const criarCartas = (imagem) => {

    // Criar novos elementos e adicionar classes
    const carta = criarElemento('div', 'carta')
    const faceFrente = criarElemento('div', 'face faceFrente')
    const faceCostas = criarElemento('div', 'face faceCostas')

    // Definir bacground-image da frente de cada carta
    faceFrente.style.backgroundImage = `url("./images/${imagem}.gif")`

    // Inserir elementos no HTML
    carta.appendChild(faceFrente)
    carta.appendChild(faceCostas)

    // Virar a carta no clique
    carta.addEventListener('click', virarCarta)

    // Inserir um atribudo data-listaImagens no HTML para comparar as duas cartas viradas
    carta.setAttribute('data-listaImagens', imagem)

    return carta
}

/**
 * CARREGAR JOGO:
 * 
 * Duplica o número de cartas, embaralha as cartas e adiciona no tabuleiro.
 * 
 * Espalha o array listaImagens duas vezes em um novo array.
 * Embaralha o novo array ordenando os elementos com o método sort() com índices aleatórios.
 * Percorre o novo array para criar as cartas com a função criarCartas().
 * E adicionar as cartas criadas no elemento grid (tabuleiro).
*/
const carregarJogo = () => {

    // Duplicar as imagens das cartas
    const listaImagensDuplicadas = [...listaImagens, ...listaImagens]

    // Embaralhar cartas (ordena o array conforme o número aleatório gerado)
    const listaImagensEmbaralhadas = listaImagensDuplicadas.sort(() => gerarNumeroAleatorio(-0.9, 0.1))

    // Percorrer a lista de imagens
    listaImagensDuplicadas.forEach((imagem) => {

        // Criar cartas
        const carta = criarCartas(imagem)

        // Adicionar carta no grid
        grid.appendChild(carta)
    })
}

/**
 * GERAR NÚMERO ALEATÓRIO:
 * 
 * Função para gerar número aleatório
*/
const gerarNumeroAleatorio = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

// CARREGANDO O JOGO
carregarJogo()