---
title: 'Criando uma lib de componentes React, Parte 1'
slug: /criando-uma-lib-de-componentes-react-parte-1
description: Introdução ao projeto, criação do repositório no github e a instação e configuração do storybook
date: '2020-06-02'
tags:
  - React
  - Design System
  - styled-components
img: github_captions.jpg
published: false
---

Nessa série de posts iremos criar uma biblioteca de componentes bem completa!
Criaremos desde o repositório no github até a publicação automatizada no NPM
via TravisCI.

Iremos abordar assuntos como:

- Tematização;
- Tree-shaking;
- Versionamento;
- Estrutura;
- CSS-in-JS;
- Linter;
- Testes;
- Deploy;
- CI/CD;
- Padronização de commits
- etc...

Também conheceremos algumas ferramentas para nos ajudar com o desenvolvimento,
build e deploy. Como por exemplo:

- [Webpack](https://webpack.js.org/ 'Webpack');
- [Rollup.js](https://rollupjs.org/guide/en/ 'Rollup.js');
- [Semantic Release](https://semantic-release.gitbook.io/semantic-release/ 'Semantic Release');
- [Commitizen](http://commitizen.github.io/cz-cli/ 'Commitizen');
- [Eslint](https://eslint.org/ 'Eslint');
- [TravisCI](https://travis-ci.org/ 'TravisCI');
- [Storybook](https://storybook.js.org/ 'Storybook');
- [Styled Components](https://www.styled-components.com/ 'Styled Components')
- etc...

## Criando repositório no GitHub

Por mais simples que seja, precisamos começar criando o repositório de nossa
biblioteca no github. Primeiramente você precisa ter um usuário no
[github](https://github.com), se ainda não tiver, vá criar agora!
_(https://github.com/join)_.

Após logado, crie um
[novo repositório](https://github.com/new 'Link para criar um novo repositório no github'),
escolha o nome da sua biblioteca, no meu caso, será "frigobar". Coloque também
uma descrição para o projeto, escolha se é privado ou público (é claro que será
público, né? você usa trocentos projetos open-source, porque sua biblioteca não
seria??). É bom já iniciar com um `README.md`, um `.gitignore` e adicionar uma
licença, e é claro que será **MIT**.

![Imagem do formulário de novo projeto do github preenchido](/create-repository.png 'Formulário do github preenchido')

Após criado, clone seu projeto!

![Imagem do pop-over para clonar o projeto do github](/clone-repository.png 'Pop-over do github para clonar projeto')

```shell
git clone git@github.com:SEU-USUARIO/SEU-PROJETO.git
```

Percebeu que ele veio com o `.gitignore`, `README.md` e `LICENSE`? Foi porque
selecionamos no formulário do github.
O `.gitignore` já vem preenchido com alguns arquivos comumente ignorados para a
stack de node, ele já contempla todos os arquivos que precisaremos ignorar, como
por exemplo, `node_modules`, `yarn-error`, etc.

Pronto! já temos nosso repositório criado e clonado em nossa máquina.

## Iniciando o desenvolvimento

Primeiramente, iremos criar nosso `package.json`. Para isso, abra o terminal e
vá até a pasta do seu projeto que você clonou. Rode `npm init`, responda as
perguntas, (o `test command` pode ficar em branco mesmo). No meu caso ficou
assim:

![Imagem CLI do npm init](/npm-init.png 'Imagem CLI do npm init')
Isso irá gerar nosso `package.json`.

Agora vamos instalar nossas primeiras dependências para criação de nossa
biblioteca. Primeiramente, vamos instalar o `react` e o `react-dom`.

```shell
npm install react react-dom
```

Após a instalação, as duas dependências serão adicionadas no `package.json`:

![Imagem do package.json mostrando o react e react-dom como dependências](/react-reactdom-dependencies.png 'Imagem do package.json mostrando o react e react-dom como dependências')

Mais pra frente veremos que o `react` e o `react-dom` não devem ficar nesse nó
de _dependencies_ no `package.json`.

## Storybook

Agora, pra gente não precisar criar uma aplicação pra conseguir visualizar os
componentes que iremos criar, e também pra dar um certo tipo de documentação pra
quem quiser visualizar quais componentes nossa lib disponibiliza, iremos
utilizar o _[Storybook](https://storybook.js.org/ 'Storybook')_. Ele é uma
ferramenta para desenvolver componentes visuais em _React_, _Vue_ e _Angular_,
ele mantém a visualização de seus componentes organizada e eficiente.

Essa é a cara do _storybook_:

![Imagem da interface do storybook](/storybook.png 'Imagem da interface do storybook')

Pra gente instalar, basta rodar:

```shell
npx -p @storybook/cli sb init
```

A instalação do _**Storybook**_ vai detectar que estamos utilizando _**React**_
e vai instalar a versão pro _framework/lib_ correto. Após o término da instalação
vamos rodar:

```shell
npm run storybook
```

E se tudo der certo vamos ver a mensagem para acessar nosso _storybook_ local:

![Imagem da mensagem de que o storybook esta rodando](/local-storybook.png 'Imagem da mensagem de que o storybook esta rodando')

Acessando https://localhost:6006/ veremos o nosso próprio _storybook_!

![Imagem do storybook local](/storybook-installed.png 'Imagem do storybook local')

Perceba que o _storybook_ criou alguns arquivos no _root_ do projeto:

```shell
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── stories /* Essa*/
│   ├── 0-Welcome.stories.js
│   └── 1-Button.stories.js
└── .storybook /* E essa */
    └── main.js
```

A pasta `stories` é a pasta _default_ onde o storybook procura suas histórias.
Uma história geralmente é a representação de um estado de um componente, perceba
também que já temos duas histórias nesta pasta, vamos analisar o
conteúdo do `0-Welcome.stories.js`.

Vamos dar uma olhada no que é importado dentro do arquivo:

```js
/* 0-Welcome.stories.js */
import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
```

### linkTo

Como você pode perceber, o `linkTo` está sendo importado como
addon, o storybook possui vários addons para dar algumas funcionalidades a
mais à sua história, você pode conferir alguns no [próprio site do storybook](https://storybook.js.org/addons/ 'próprio site do storybook').

### Welcome

É um componente _React_ comum, está ali apenas para popular a história que vem
por padrão.

Agora vamos analisar o código que está gerando o que vemos na tela:

```jsx
export default {
  title: 'Welcome',
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'to Storybook',
};
```

Essa é a forma que se escreve as histórias do storybook, o nome desse formato se
chama _Component Story Format (CSF)_ é a forma recomendada pelo storybook de
se escrever _stories_.

No _CSF_ as _stories_ e os componentes são definidos como _ES Modules_, cada
arquivo de _story_ necessita ter um `export default` e um ou mais
_named exports_, no caso acima, nosso _named export_ é a `const` `ToStorybook`
que estamos exportando.

### Export default

O `export default` define dados sobre o seu componente, incluindo o componente
em sí, e também o título do grupo das histórias que será exibido no menu lateral do
storybook.

Não é obrigatório definir o componente, porém, é recomendado que faça. Essa
propriedade `component` do `export default` pode ser usada em addons para exibir
informações do componente, como por exemplo, uma tabela de props.

O título é exibido no grupo de histórias na barra lateral do storybook. Ele deve
ser único. Esse grupo de histórias também é comumente chamado de _kind_.

Repare também que estamos adicionando uma propriedade que é um objeto chamado
`story` ao nosso `ToStorybook`. Essa propriedade é um objeto que contém `name`.
Esse nome é o nome da história do componente `ToStorybook`.

Não necessáriamente precisamos dessa propriedade `name`. Por padrão o storybook
nomeia suas histórias baseadas no `named export`, ou seja, se retirarmos o
`name` do `ToStorybook.story`, por exemplo:

```jsx
export default {
  title: 'Welcome',
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

// ToStorybook.story = {
//   name: 'to Storybook',
// };
```

O nome de nossa história será "To Storybook" (pois está pegando o nome do
_export_) e não mais "to Storybook" (com "t" minúsculo), como quando utilizavamos a propriedade
`name`.

![Imagem da história com titulo alterado](/ToStorybook.png 'Imagem da história com titulo alterado')

Como você pode perceber, a nossa váriavel esta em
[PascalCase](https://wiki.c2.com/?PascalCase) mas no storybook há um espaço
separando as palavras, isso ocorre porque o `storybook` altera o nome antes de
enviar para o menu, veja alguns exemplos:

```
name -> 'Name'
someName -> 'Some Name'
someNAME -> 'Some NAME'
some_custom_NAME -> 'Some Custom NAME'
someName1234 -> 'Some Name 1234'
someName1_2_3_4 -> 'Some Name 1 2 3 4'
```

Você pode utilizar o `story.name` quando quiser que o título contenha alguma
palavra reservada do javascript, como por exemplo `default`, ou se quiser
utilizar emojis.

### Estrutura de uma história

Bom, para criar uma história basta seguir como no exemplo da história do
`Welcome`. Edite a história que vem por _default_ para ver os efeitos que são
aplicados no _storybook_. O código editado deve ficar assim:

```jsx
import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Bem vindo',
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'ao Storybook',
};
```

Esse trecho de código editou o título do grupo de histórias do componente
_Welcome_ e o titulo da história _ToStorybook_.

### A pasta .storybook

Você também deve ter percebido que surgiu uma pasta _.storybook_ no seu projeto.
As configurações de carregamento das _stories_, _addons_ e _webpack_ ficam aqui.
O _storybook_ possuí um _webpack_ por baixo dos panos, caso você queira editar
alguma configuração, basta editar o arquivo `main.js` dessa pasta e sobrescrever
o que necessita ser alterado. Você pode ver melhor aqui:
https://storybook.js.org/docs/configurations/custom-webpack-config/.

Atualmente a propriedade _addons_ está registrando dois _addons_, o _actions_ e
_links_, vamos ver o que esses _addons_ fazem.

#### actions

O _addon actions_ está sendo usado nas _stories_ do `Button`, ele está sendo
usado no `onClick` do componente `Button`.

Ao abrir a _story_ _Button > Text_ perceba que há um painel chamado **Actions**
na parte inferior da página, ao clicar no botão que está sendo exibido na
_story_, serão logados as informações do evento de _click_ na aba de
**Actions**.

O _addon_ **actions** pode ser usado para exibir os dados recebidos por
_event-handlers_ no _storybook_, como `onClick`, `onKeyDown`, etc. Ou qualquer
outro tipo de dado que você queira logar no painel de _Actions_.

Se você quiser saber mais sobre o funcionamento desse addon,
[veja o github do projeto](https://github.com/storybookjs/storybook/tree/next/addons/actions 'veja o github do projeto').

#### links

Como o próprio nome diz, o _addon links_ serve para linkar _stories_ entre sí.
Na _story_ do componente `<Welcome />` que vem por _default_, há um link para a
`story` chamada _"Button"_.

Esse link é feito através do `linkTo` que está sendo usado na prop `showApp` do
componente `Welcome`.

```jsx
export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;
```

Ao clicar no link _stories_, vamos parar na primeira história do _kind_
Button.

Se você quiser ir para uma _story_ específica (não mais a primeira), você pode
passar um segundo parâmetro, que é o nome da _story_.

Vamos alterar o `linkTo` para linkar para _story_ _Emoji_:

##### 0-Welcome.stories.js

```jsx
import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Bem vindo',
  component: Welcome,
};

export const ToStorybook = () => (
  <Welcome showApp={linkTo('Button', 'Emoji')} />
);

ToStorybook.story = {
  name: 'ao Storybook',
};
```

Agora ao clicar no link _stories_ estamos indo para _story_ _Emoji_ e não mais a
_Text_.

![Gif do link stories funcionando com segundo parâmetro](/stories-to-second.gif 'Gif do link stories funcionando com segundo parâmetro')

## Conclusão

Até agora nós criamos o repositório no github, instalamos o **React** e o
**ReactDOM**, configuramos e editamos o _**Storybook**_.

Vimos todos os arquivos que a instalação do _storybook_ criou e também vimos as
funções e plugins desses arquivos.

No próximo post vamos começar a configurar ferramentas, como o
`commitizen`, `eslint` e algumas outras.
