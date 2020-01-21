---
title: Transform do CSS3 - O que é possivel fazer?
slug: /transform-css3
date: '2016-04-01'
---

O **transform** é uma propriedade do **CSS3** que permite adicionar efeitos 2D e 3D em algum elemento, desde que o mesmo tenha um display **diferente** de "inline"

Existem diversos métodos do transform para aplicar efeitos 2D, que são os:

## Transforms 2D

- translate
- rotate
- scale
- skew
- matrix

### O método translate

O translate permite que você **desloque um elemento** para qualquer lado de sua posição inicial, de acordo com os parâmetros passados para o eixo X e o eixo Y. Ex: `transform: translate(x,y);`
No exemplo abaixo, movemos o elemento para 50px a direita e 50px para baixo, (coloque o cursor em cima para ver o efeito!)

<div class="transform translate">Coloque o mouse aqui!</div>

```css
.translate {
  width: 100px;
  height: 100px;
  background-color: yellow;
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px;
  transition: transform 1s;
}
.translate:hover {
  transform: translate(
    50px,
    50px
  ); // arrasta o elemento 50px para direita e 50px para baixo
}
```

Também existem os métodos **translateX** e **translateY**, que recebem apenas um parâmetro, o do seu respectivo eixo. em: `transform: translateX(10px);` irá mover o elemento 10px para direita, `transform: translateY(10px);` irá mover o 10px para baixo.

### O método rotate

Como o próprio nome diz, o método rotate serve para você rotacionar um objeto em X graus, no eixo X você pode rotacionar no sentido horário ou anti-horário, no eixo Y você pode rotacionar e virar o elemento do lado ao contrário.

Para rotacionar no **sentido horário**, basta passar o parâmetro com um numero **positivo**, ex: `transform: rotateX(20deg);` o "deg" é de **degree** que significa "grau" em português.
Para rotacionar no **sentido anti-horario**, basta passar um valor **negativo**, ex `(-20deg)`.

Se você declarar apenas um parâmetro `transform: rotate(25deg);` o efeito será aplicado apenas no eixo X, caso queira aplicar o efeito no eixo Y é necessário passar: `transform: rotateY(25deg);`.

No exemplo abaixo, rotacionaremos o primeiro elemento em 25 graus no **sentido horário** e o segundo elemento 25 graus no **sentido anti-horário**, os dois ultimos elementos são rotações no eixo Y.

<div class="transform rotate">Sentido horário</div>
<div class="transform rotate-anti-horario">Sentido anti-horário</div>
<div class="transform rotateY">Eixo Y</div>
<div class="transform rotateY-negativo">Eixo Y com valor negativo</div>

```css
.rotate:hover {
  transform: rotateX(
    25deg
  ); // rotaciona o elemento em 25 graus no sentido horário
}

.rotate-anti-horario:hover {
  transform: rotateX(
    -25deg
  ); // rotaciona o elemento em 25 graus no sentido anti-horário
}

.rotateY:hover {
  transform: rotateY(180deg); // rotaciona o elemento 180 graus no eixo Y;
}

.rotateY-negativo:hover {
  transform: rotateY(
    -160deg
  ); // rotaciona o elemento 160 graus no eixo Y no sentido contrário;
}
```

### O método scale

O **scale** serve justamente para alterar a escala do elemento, você pode **aumentar** ou **diminuir** o tamanho do elemento selecionado, como se estivesse alterando o **width** e o **height** do mesmo, utilizando `transform: scale(width, height)`, por exemplo:

```css
.scale {
  transform: scale(2); // aumenta 2x o width e 2x o height do elemento
}
.scale {
  transform: scale(2, 5); // aumenta o width em 2x e o height em 5x;
}
```

Porém, se você declarar um `scale(1)` o elemento não sofrerá **nenhuma alteração**, pois esse é o valor padrão que o **scale** possui, caso você declare `transform: scale(2)`, o elemento ficará com o **dobro de seu tamanho**, `scale(1.5)`, ele aumentará 50%, e assim por diante, exceto o `scale(0)` pois faz com que o elemento **não fique visível**...
Caso você utilize um valor negativo, o elemento diminui e ~~estranhamente~~ também aumenta de tamanho, porém ele ficará de **cabeça para baixo!** por exemplo:

```css
.scale {
  transform: scale(
    -1
  ); // O elemento continuará com o mesmo tamanho, mas ficará de cabeça para baixo.
}
```

No exemplo abaixo, deixaremos um elemento com o dobro de seu tamanho, outro com o 2x o tamanho de seu width e 4x o tamanho de seu height e o outro que está com o valor negativo, adivinha? de **cabeça para baixo!**.

<div class="transform scale">Coloque o mouse aqui!</div>
<div class="transform scale-torto">Coloque o mouse aqui!</div>
<div class="transform scale-negativo">Coloque o mouse aqui!</div>

```css
.scale,
.scale-negativo,
scale-torto {
  width: 100px;
  height: 100px;
  transition: transform 1s;
}
.scale:hover {
  transform: scale(2); // aumenta o elemento em 2x
}

.scale-torto:hover {
  transform: scale(2, 4); // aumenta o width em 2x e o height em 4x
}

.scale-negativo:hover {
  transform: scale(
    -2
  ); // aumenta o elemento em 2x, mas deixa ele de ponta cabeça!
}
```

O `scale(-1)` é bom caso você queira inverter um elemento, deixar ele de cabeça para baixo, basta colocar o -1 no scale do elemento.

Como o translate, o scale também possui os seus métodos para alterar apenas um eixo, o **scaleX** e **scaleY**.

### O método skew

O skew serve para ~~entortar~~ **distorcer um elemento** no eixo X ou no eixo Y, dependendo do parâmetro passado, `transform: skew(x,y)`, também como o rotate, os valores são passados em **degrees**.;
No exemplo abaixo distorceremos um elemento 10 graus no eixo X e 5 graus no eixo Y.

<div class="transform skew">Coloque o mouse aqui!</div>

```css
.skew {
  transform: skew(10deg, 5deg);
}
```

Caso você passe **apenas um parâmetro**, como por exemplo: `transform: skew(20deg);` o elemento será distorcido apenas no eixo X.

<div class="transform skew-um-parametro">Coloque o mouse aqui!</div>

```css
.skew {
  transform: skew(20deg);
}
```

Podemos também distorcer apenas um dos eixos separadamente, para isso, existem o **skewX** e o **skewY**.

#### SkewX

Serve para distorcer apenas o eixo X, `transform: skewX(15deg)`, irá distorcer 15 graus no eixo X.

<div class="transform skewX">Coloque o mouse aqui!</div>

```css
.skewX {
  transform: skewX(15deg);
}
```

#### SkewY

Serve para distorcer apenas o eixo Y, `transform: skewY(15deg)`, irá distorcer 15 graus no eixo Y.

<div class="transform skewY">Coloque o mouse aqui!</div>

```css
.skewY {
  transform: skewY(15deg);
}
```

### O método matrix

Calma, calma, esse método não irá fazer chover caracteres verdes num fundo preto...

O **matrix** é a junção de métodos 2D do transform, ele é bem complexo em relação aos outros, você precisa passar 6 parâmetros que são métodos anteriores, um exemplo seria esse: `transform: matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())`.

Se quiser ter um exemplo de uso do matrix no mundo real, de uma olhada nesse site: <a href="https://onlycoin.com/" target="_blank" rel="nofollow" title="OnlyCoin">Coin</a> (no computador, não em mobile) Todo o efeito dos cartões são gerados através do matrix.

Para entender melhor como funciona o matrix, que envolve ~~calculos malucos~~ matemática, sugiro esse artigo **<a href="https://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/" target="_blank" rel="nofollow">aqui</a>**

E também tem esse matrix generator que você pode dar uma brincada: <a href="https://ds-overdesign.com/transform/matrix3d.html" target="_blank" rel="nofollow">matrix3d</a>

Aqui temos um exemplo utilizando o matrix:

<div class="transform matrix">Coloque o mouse aqui!</div>

```css
.matrix {
  transform: matrix(2, 1, 1, 2, 200, 200);
}
```

O matrix vai se comportar da seguinte maneira, irá aumentar o scale no eixo X em 2x, vai distorcer o eixo Y e o eixo X em 1 grau, vai aumentar o scale no eixo Y em 2x, irá mover o elemento 200px para a direita e 200px para baixo.
Traduzindo os parâmetros do matrix para os outros métodos, ficaria assim: `transform: matrix(scaleX(2), skewY(1), skewX(1), scaleY(2), translateX(200), translateY(200));`

## E o suporte dos navegadores?

Os navegadores atuais não possuem problema algum em renderizar o transform, mas é aconselhavel utilizar os prefixos -webkit-, -moz- e -ms-, caso você queira dar suporte a versões realmente antigas do Chrome e do Firefox, o IE suporta apenas a partir do 9 (com o prefixo) o 10 pra cima já não precisa de prefixo.

Existe esse site bem bacaninha para você checar o suporte do transform e de qualquer outra regra, <a href="https://caniuse.com/#search=transform" rel="nofollow" target="_blank">CanIUse?</a>.

## Conclusão:

O transform do CSS3 juntamente com o transition permite criar animações muito bem elaboradas, basta usar sua criatividade, o translate também é muito usado para centralizar objetos na tela, como um modal, por exemplo. Uma técnica muito usada é a seguinte:

```css
.modal {
  width: 100px;
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

Onde você coloca 50% de distância do topo e da esqueda da janela do navegador, e acerta a centralização com o translate. Mas isso é assunto pra um próximo artigo.
Também existem os efeitos 3D que logo, logo também estarei criando um artigo sobre eles.
