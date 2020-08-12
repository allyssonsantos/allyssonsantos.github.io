---
title: Arrow Functions
slug: /arrow-functions
description: Qual a diferença de arrow function para uma function "padrão"?
date: '2016-12-18'
tags:
  - Javascript
---

## Introdução

Arrow function é uma nova forma de se escrever **funções anonimas**, vamos
entender sua sintaxe e como funciona o seu valor de `this`.

### Sintaxe

Uma função anonima no ES5 era assim:

```js
const countries = ['Germany', 'United States'];

const go = countries.map(function(country) {
  return 'One day I will go to ' + country;
});

console.log(go);

> ["One day I will go to Germany", "One day I will go to United States"]
```

Com as arrows functions, podemos simplifica-las das seguintes formas:

```js
const contries = ['Germany', 'United States'];
const go = countries.map(country => {
  return 'One day I will go to ' + country;
}); // Podemos tirar a palavra function e adicionar uma => a frente dos () dos parametros.
```

```js
const go = countries.map(country => {
  return 'One day I will go to ' + country;
}); // Caso a função tenha apenas um parâmetro, podemos retirar o seus parênteses.
```

```js
const go = countries.map(country => 'One day I will go to ' + country);
/* Caso a função tenha apenas um parâmetro e retorne logo na primeira linha,
podemos escrever sem as chaves e sem a palavra return */

/* Podemos usar também as template strings, ficando assim: */

const go = countries.map(country => `One day I will go to ${country}`);
```

Recapitulando:

- Podemos tirar a palavra function e adicionar uma seta `=>` em frente os
  parênteses dos parâmetros.
- Se a sua função anonima tiver apenas um parâmetro, pode **retirar** seus
  parênteses.
- Se a função não tiver parâmetros, podemos deixar `()` vazio mesmo.
- Se a função der um `return` na primeira linha, podemos escrever apenas em uma
  linha, sem chaves e sem a palavra `return`.

### Objeto this

O **this** dentro de uma **arrow function** se comporta de uma maneira
diferente da que estamos acostumados, primeiro, vamos analisar um código
js **sem uso de arrow functions**.

Imagine que temos o seguinte HTML e JS:

```html
<html>
  <body>
    <button id="btn">Click!</button>
  </body>
  <script>
    const btn = document.getElementById('btn');

    btn.addEventListener('click', function() {
      console.log(this);
    });
  </script>
</html>
```

Na função acima, ao clicar no botão com `id='btn'` iremos logar o valor de
**this**, que nesse caso é o próprio botão. Teremos como saída essa resposta:

```html
<button id="btn">Click</button>
```

Se esse mesmo código for escrito com **arrow function** o resultado não será o
mesmo, pois o valor de `this` não está referenciado ao botão que está
acontecendo a ação, ele está referenciado a **todo o contexto** que a função
está inserida, no nosso caso, o contexto é a **window**.

Ao clicar no botão com uma **arrow function**, teremos o seguinte retorno:

```html
<html>
  <body>
    <button id="btn">Click!</button>
  </body>
  <script>
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
      // mudança aqui /\
      console.log(this);
    });
  </script>
</html>
```

```
> Window {speechSynthesis: SpeechSynthesis, caches: CacheStorage, localStorage: Storage
> sessionStorage: Storage, webkitStorageInfo: DeprecatedStorageInfo…}
```

Agora um outro exemplo para tentar fixar melhor, temos a seguinte estrutura sem
o uso de arrow functions ainda:

```html
<html>
  <body>
    <button id="btn">Click!</button>
  </body>
  <script>
    const pessoa = {
      nome: 'Allysson',
      idade: '22',

      apresentar: function() {
        return `Meu nome e ${this.nome} e eu tenho ${this.idade} anos`;
      },

      falar: function() {
        const self = this;
        window.setTimeout(function() {
          console.log(self.apresentar());
        }, 500);
      },
    };

    const btn = document.getElementById('btn');

    btn.addEventListener('click', function() {
      pessoa.falar();
    });
  </script>
</html>
```

Repare que na linha 15 precisamos **guardar o valor de this** na variável `self`
**(nesse moemento o valor de this é o próprio objeto pessoa)**, se usássemos
diretamente o `this` dentro do `console.log` que está no `setTimeout`
acabaríamos nos referênciando a **window**, e dentro da **window** não possuímos
a função falar, ela está dentro de `pessoa`.

Executando esse JS temos o seguinte log no console:

```
> Meu nome e Allysson e eu tenho 22 anos
```

#### Usando arrow functions

Agora se nós mudarmos a função anonima que está dentro do `setTimeout` para
utilizar **arrow function**, **não precisaremos guardar o valor de this** dentro
de `self`, pois como é uma **arrow function**, o contexto de this já é o objeto
pessoa, **o escopo se mantém o mesmo**!

```html
<html>
  <body>
    <button id="btn">Click!</button>
  </body>
  <script>
    const pessoa = {
      nome: 'Allysson',
      idade: '22',

      apresentar: function() {
        return `Meu nome e ${this.nome} e eu tenho ${this.idade} anos`;
      },

      falar: function() {
        window.setTimeout(() => {
          console.log(this.apresentar());
        }, 500);
      },
    };

    const btn = document.getElementById('btn');

    btn.addEventListener('click', function() {
      pessoa.falar();
    });
  </script>
</html>
```

Temos como retorno o mesmo que na função anterior, mas agora **sem precisar do
self**!

```
> Meu nome e Allysson e eu tenho 22 anos
```

## Conclusão

O valor de this com arrow functions pode gerar grandes dores de cabeça, esteja
atento, faça testes, pratique criando funções anonimas convencionais e logue o
valor de this, faça essa mesma função utilizando arrow functions e compare o
valor de this, **saiba que o escopo se mantem o mesmo de onde a arrow function
foi criada**!

Ela é muito boa para ocasiões como no objeto pessoa, mas não parece ser muito
interessante quando queremos adicionar um event listener em algum elemento, pois
estariamos alterando o escopo, o contexto. Nosso event listener não teria o
efeito desejado.
