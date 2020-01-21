---
title: Abertura do StarWars em CSS.
slug: /abertura-do-starwars-em-css
date: '2016-07-25'
---

Hoje vamos aprender a fazer a **introdução do Starwars** (o logo
diminuindo e as letrinhas amarelas subindo)
**utilizando apenas HTML e CSS**, com direito a musiquinha!

## O que vamos utilizar?

Vamos utilizar os seguintes arquivos: o <a href="/starwars.svg">
logo do starwars</a> e a <a href="/starwars.mp3">trilha sonora</a> da nossa
abertura. (para baixar o mp3, clique com o botão direito e selecione Salvar
link como...).

E também utilizaremos as **seguintes técnicas**:

- box-shadow
- transform:
  - translate
  - scale
  - rotate
  - perspective
- animation
- keyframes

Se você quiser saber mais sobre o transform, tem um post explicando algumas
coisas sobre ele aqui:
<a href="/transform-css3" title="Transform do CSS3 - O que é possivel fazer?">
Transform do CSS3 - O que é possivel fazer?</a>

## Começando com o HTML

A estrutura do nosso **HTML** será bem básica, vamos começar com
uma `div` vazia que será a base para uma sombra
no topo de nossa pagina, para quando o texto atingir o topo de nossa página,
ele não desapareça bruscamente. Vamos aproveitar e já linkar nosso futuro CSS
com a tag `link`, vamos importar nosso logo,
criar uma `div` que será nosso container, uma
`div` que conterá todos nossos títulos e
parágrafos e por fim, nossa tag `audio` que
importaremos nossa música.

Nosso HTML fica assim:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Starwars Intro</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="shadow"></div>
    <img src="starwars.svg" class="logo" />
    <div class="container">
      <div class="texto">
        <h1 class="titulo">Episode VII</h1>
        <h2 class="subtitulo">The force awakens</h2>
        <p>
          It is a time of hope for the restored Republic. The last Imperial
          loyalists have been pushed back to the Outer Rim Territories.
        </p>
        <p>
          Chased across the galaxy by the Republic, the last remnants of the
          Galactic Empire have started raiding outposts in the outlying systems,
          desperate to replenish their dwindling supplies.
        </p>
        <p>
          With a large Republic fleet closing in on their position, the
          Imperials gather above the Outer Rim world of Tatooine, ready to make
          their last stand...
        </p>
      </div>
    </div>
    <audio autoplay>
      <source src="starwars.mp3" type="audio/mpeg" />
    </audio>
  </body>
</html>
```

## Começando com o CSS!

Vamos começar estilizando nosso `.container`,
dando a ele uma **largura máxima** de 1000px, centralizando na
página e um `position: relative` que servirá
para alinharmos nosso logo futuramente.

Agora vamos estilizar o `body` adicionando a cor
preta ao fundo, colocar um
`overflow: hidden` para sumir com as scrollbars
e no meu caso, vou utilizar a fonte Helvetica em todos os textos e com a cor
amarela (<abbr title="Hexadecimal de uma cor com tom amarelado">#F2CB06</abbr>).
Até agora, nosso css está assim:

```css
* {
  /* Vamos fazer um reset do padding e margin. */
  padding: 0;
  margin: 0;
}
body {
  background: #000;
  color: #f2cb06;
  font-family: 'Helvetica-neue', 'Helvetica', sans-serif;
  overflow: hidden;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}
```

Hora de estilizar a nossa `div` que será a base
para nossa **sombra**. vamos dar uma altura de 100<abbr title="pixels">px</abbr>
, a cor da div e da sombra será a mesma cor do fundo, vamos dar um position
relative para poder setar um z-index maior para que todos os elementos passem
por de baixo de nossa sombra.

```css
.shadow {
  height: 100px;
  background-color: #000;
  box-shadow: 0px 10px 20px #000;
  position: relative;
  z-index: 100;
}
```

O motivo de colocarmos essa sombra, é pra dar um efeito legal, veja o exemplo:

<figure>
  <img src="/exemplo.png" alt="Exemplo da sombra" />
  <figcaption>
    1. Exemplo da sombra sendo aplicada, e nosso texto sumindo suavemente.
  </figcaption>
</figure>

### Animando o logo!

Agora sim começa a mágica, vamos **adicionar nossas animações**.
Primeiro precisamos adicionar o estilo do nosso logo, precisamos definir um
`transform: scale(0)` para que quando a animação
termine, ele continue com o tamanho 0, e assim, não fique visível. E também o
`translate(-50%, -50%)` e um
`position: absolute;` para alinhar-mos o logo no
centro da página.

```css
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(0) translate(-50%, -50%);
}
```

Agora vamos **dar um nome para a nossa animação** do logo
utilizando a propriedade
`animation-name: logo;` vamos determinar a
duração da nossa animação, ela terá 15 segundos
`animation-duration: 15s;` e determinar que ela
será **linear**, ou seja, terá a mesma velocidade do começo ao
fim. `animation-timing-function: linear;`

Podemos adicionar os prefixos `-webkit-` e
`-moz-` por questões de compatibilidade entre os
navegadores.

Nosso css está assim:

```css
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: scale(0) translate(-50%, -50%);
  -moz-transform: scale(0) translate(-50%, -50%);
  transform: scale(0) translate(-50%, -50%);
  -webkit-animation-name: logo;
  -webkit-animation-duration: 15s;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: logo;
  -moz-animation-duration: 15s;
  -moz-animation-timing-function: linear;
  animation-name: logo;
  animation-duration: 15s;
  animation-timing-function: linear;
}
```

Até agora, nada acontece, precisamos adicionar nossos
**keyframes!** a sintaxe é a seguinte,
`@keyframes nome_da_animação` que foi definido
no `animation-name`

Vamos utilizar as
**propriedades** `from` e
`to` que serão declaradas dentro de nosso keyframe, onde determinamos quais
propriedades e valores que começam no segundo 0 (from) de nossa animação, e como
essas propriedades e valores **irão estar no término da nossa animação**, no
caso, no segundo 15 (to).

Vamos estilizar dentro do nosso `from {`, ou
seja, as propriedades definidas dentro dele, serão as propriedades iniciais de
nossa animação. Vamos começar com nosso logo tendo 2x o seu tamanho original,
ou seja, um `scale(2)`.

Agora o estilo dentro do `to {` que serão as
propriedades finais de nossa animação, ou seja, como nosso logo estará no
final. O tamanho dele será 0, ou seja, ele vai diminuir até sumir!
`scale(0);`.

Nosso keyframe no CSS, ficará assim (utilize os prefixos para compatibilidade,
não utilizarei para poupar código):

```css
@keyframes logo {
  from {
    transform: translate(-50%, -50%) scale(2); /* Precisamos repetir o
    translate, pois o keyframe subscreve os valores da propriedade */
  }
  to {
    transform: translate(-50%, -50%) scale(0);
  }
}
```

Veja um exemplo de como está nossa animação até agora:
<a href="/starwars/starwars-exemplo-1" title="Exemplo da animação do logo" >Exemplo</a>

### Animando o texto

Primeiramente precisamos dar **estilo para o nosso texto**,
começamos adicionando o básico, alinhamos todo nosso texto ao centro,
alteramos os nossos parágrafos para fonte de 70<abbr title="pixels">px</abbr>,
negrito, e uma margin-top de 70<abbr title="pixels">px</abbr> para distanciar
de nosso título. Para nosso título vamos apenas aumentar a fonte para 85<abbr title="pixels">px</abbr>
e para nosso subtítulo vamos deixar ele com o peso da fonte "normal", alterar a altura das linhas e deixar tudo em caixa alta.

```css
.texto {
  text-align: center;
}
.texto p {
  font-size: 70px;
  font-weight: bold;
  text-shadow: 0px 0px 10px #000;
  margin-top: 70px;
  line-height: 1.4;
}
.titulo {
  font-size: 85px;
}
.subtitulo {
  font-weight: normal;
  text-transform: uppercase;
}
```

Agora começamos com a **nossa animação**, primeira novidade,
vamos adicionar uma **perspectiva** ao nosso texto! ou seja,
vamos "distanciar" nosso parágrafo 800<abbr title="pixels">px</abbr> da tela!
assim podemos dar uma **sensação de profundidade** ao nosso
elemento. Vamos também rotacionar nosso elemento no eixo X em 25 graus. O
estilo do nosso texto fica assim:

```css
.texto {
  text-align: center;
  transform: perspective(800px) rotateX(25deg);
}
```

<figure>
  <img src="/exemplo2.png" alt="Exemplo de texto rotacionado" />
  <figcaption>
    2. Exemplo do texto com profundidade e rotacionado 25 graus no eixo X.
  </figcaption>
</figure>

Porém, no começo da nossa animação
**apenas o logo deve estar visível**, nosso texto só começará a
ser exibido quando o logo estiver quase sumido completamente, para isso, temos
que **esconder nosso texto**, podemos desloca-lo utilizando o
**translateY()**, isso fará nosso texto deslocar para baixo e
ficar fora da página, para depois subir dando aquele efeito legal!

```css
.texto {
  text-align: center;
  transform: perspective(800px) rotateX(25deg) translateY(40%);
}
```

Vamos começar com nossas animações, começamos adicionando nosso
`animation-name: subir;`,
`animation-duration: 60s;`,
`animation-timing-function: linear;`, até aqui,
nada de novo, nossa animação se chama "subir" (vamos utilizar esse nome no
keyframe), terá 60 segundos de duração e sua velocidade será linear, ou seja,
a mesma velocidade durante a animação inteira. (Adicione os prefixos para
compatibilidade nos browsers).

```css
.texto {
  text-align: center;
  transform: perspective(800px) rotateX(25deg) translateY(40%);
  animation-name: subir;
  animation-duration: 60s;
  animation-timing-function: linear;
}
```

Agora vamos ao nosso **keyframe**, ao invés de utilizar o
`from {` e o
`to {`, vamos utilizar
**porcentagens**, vamos iniciar nossa animação apenas quando a
animação do logo estiver quase terminando, ou seja, vamos esperar um tempo
para nossa animação do texto começar. Vamos iniciar em 15% e vamos até 100%,
vamos esperar cerca de 9 segundos (15% de 60s) para iniciar a animação do
texto. Nesse keyframe vamos alterar apenas o translateY(), passando um valor
negativo para nosso texto subir!

```css
@keyframes subir {
  15% {
    transform: perspective(800px) rotateX(25deg) translateY(40%); /* Precisamos repertir a
perspective e o rotate para manter a perspectiva e rotação. */
  }
  100% {
    transform: perspective(800px) rotateX(25deg) translateY(-220%); /* O translate
-220% serve para deslocar o texto para cima! dando a sensação de que o texto
está subindo. */
  }
}
```

E está pronto nosso starwars!

<a href="/starwars/starwars-exemplo-2.html" title="Exemplo da animação final">
Exemplo da animação final</a>.

Caso você queira colocar um outro texto, alterar tamanho da fonte, é bem
provável que você tenha que fazer alterações no rotate ou na perspectiva, fique
atento!

E segue o desafio de alguém adaptar para funcionar bacana no mobile!
