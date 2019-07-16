---
title: Criando uma biblioteca de componentes React - Parte 1
layout: post
category: Javascript
meta: Nessa primeira parte iremos criar o repositório no github e começar o desenvolvimento
  da biblioteca.
excerpt: Aprenda como criar uma biblioteca de componentes escrita em React.
preview-img: react.svg
comments: true
author: Allysson dos Santos
---

Nessa série de posts iremos criar uma biblioteca de componentes bem completa! Iremos desde o repositório no github até a publicação automatizada no NPM via TravisCI.

Iremos abordar assuntos como:
* Tematização;
* Tree-shaking;
* Versionamento;
* Estrutura;
* CSS-in-JS;
* Linter;
* Testes;
* Deploy;
* CI/CD;
* Padronização de commits
* etc...

Também conheceremos algumas ferramentas para nos ajudar com o desenvolvimento, build e deploy, como por exemplo:
* [Webpack](https://webpack.js.org/ "Webpack");
* [Rollup.js](https://rollupjs.org/guide/en/ "Rollup.js");
* [Semantic Release](https://semantic-release.gitbook.io/semantic-release/ "Semantic Release");
* [Commitizen](http://commitizen.github.io/cz-cli/ "Commitizen");
* [Eslint](https://eslint.org/ "Eslint");
* [TravisCI](https://travis-ci.org/ "TravisCI");
* [Storybook](https://storybook.js.org/ "Storybook");
* [Styled Components](https://www.styled-components.com/ "Styled Components")
* etc...

## Criando repositório no GitHub
Por mais simples que seja, precisamos começar criando o repositório de nossa biblioteca no github. Primeiramente você precisa ter um usuário no [github](https://github.com), se ainda não tiver, vá criar agora! *(https://github.com/join)*.

Após logado, crie um [novo repositório](https://github.com/new "Link para criar um novo repositório no github"), escolha o nome da sua biblioteca, no meu caso, será "frigobar". Coloque também uma descrição para o projeto, escolha se é privado ou público (é claro que será público, né? você usa trocentos projetos open-source, porque sua biblioteca não seria??). É bom já iniciar com um `README.md`, um `.gitignore` e adicionar uma licença, e é claro que será **MIT**.

![Imagem do formulário de novo projeto do github preenchido](/assets/images/create-repository.png "Formulário do github preenchido")
_Formulário do github preenchido_

Após criado, clone seu projeto!

![Imagem do pop-over para clonar o projeto do github](/assets/images/clone-repository.png "Pop-over do github para clonar projeto")
_Pop-over do github para clonar projeto_
{% highlight shell %}
git clone git@github.com:SEU-USUARIO/SEU-PROJETO.git
{% endhighlight %}

Percebeu que ele veio com o `.gitignore`, `README.md` e `LICENSE`? Foi porque selecionamos no formulário do github.
O `.gitignore` já vem preenchido com alguns arquivos comumente ignorados para a stack de node, ele já contempla todos os arquivos que precisaremos ignorar, como por exemplo, `node_modules`, `yarn-error`, etc.

Pronto! já temos nosso repositório criado e clonado em nossa máquina.

## Iniciando o desenvolvimento
Primeiramente iremos criar nosso `package.json`, pra isso, rode no seu terminal `npm init` e responda as perguntas, o `test command` pode ficar em branco mesmo, no meu caso ficou assim:

![Imagem CLI do npm init](/assets/images/npm-init.png "Imagem CLI do npm init")
Isso irá gerar nosso `package.json`.

Agora vamos instalar nossas primeiras dependências para criação de nossa biblioteca, primeiramente vamos instalar o `react` e o `react-dom`.

{% highlight shell linenos %}
npm install react react-dom
{% endhighlight %}

Após a instalação o será adicionado no `package.json` as duas dependências:

![Imagem do package.json mostrando o react e react-dom como dependências](/assets/images/react-reactdom-dependencies.png "Imagem do package.json mostrando o react e react-dom como dependências")

Mais pra frente veremos que o `react` e o `react-dom` não devem ficar nesse nó de _dependencies_ no `package.json`.

Agora pra gente não precisar criar uma aplicação pra conseguir visualizar os componentes que iremos criar e também pra dar um certo tipo de documentação pra quem quiser visualizar quais componentes nossa lib disponibiliza, iremos utilizar o [Storybook](https://storybook.js.org/ "Storybook"), ele é uma ferramenta para desenvolver componentes visuais em React, Vue e Angular, ele mantem a visualização de seus componentes organizada e eficiente.

### Storybook

A cara do storybook é essa:
![Imagem da interface do storybook](/assets/images/storybook.png "Imagem da interface do storybook")
Pra gente instalar ele, basta rodar:

{% highlight shell linenos %}
npx -p @storybook/cli sb init
{% endhighlight %}

A instalação do **Storybook** vai detectar que estamos utilizando **React** e vai instala-lo para o mesmo. Após o término da instalação vamos rodar:

{% highlight shell linenos %}
npm run storybook
{% endhighlight %}

E se tudo der certo vamos ver a mensagem para acessar nosso storybook local:

![Imagem da mensagem de que o storybook esta rodando](/assets/images/local-storybook.png "Imagem da mensagem de que o storybook esta rodando")

Acessando https://localhost:6006/ veremos o nosso próprio storybook!

![Imagem do storybook local](/assets/images/storybook-installed.png "Imagem do storybook local")

Perceba que o storybook criou alguns arquivos no root do projeto:

{% highlight shell linenos %}
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── stories
│   └── index.stories.js
└── .storybook
    ├── addons.js
    └── config.js
{% endhighlight %}

A pasta `stories` é a pasta _default_ onde o storybook procura suas histórias. Uma história geralmente é a representação de um estado de um componente, perceba também que já temos duas histórias no `index.stories.js`, vamos analisar o conteúdo do `index.stories.js`.

Primeiramente vamos ver o que é importado no arquivo:

{% highlight javascript linenos %}
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
{% endhighlight %}

#### storiesOf

Função que inicia a criação da história, ela recebe dois parâmetros, o primeiro é o nome do conjunto de histórias que será exibido no painel esquerdo, chamado de `kind`. O segundo parâmetro é o `module`, o storybook precisa dessa variável global que o próprio storybook declara, ele usa essa variável para criar uma referência ao arquivo que sua história está, essa referência serve para habilitar o hot-module-replacement, sem esse `module` você teria que dar um refresh na página toda vez que editasse sua história.

#### storiesOf().add()

O `add(name, functionalComponent)` recebe dois parâmetros também, o primeiro é o nome da história em questão, chamado de `story`, o segundo é uma função que retorne o componente _React_ que será exibido quando essa história for selecionada. Podem existir inúmeros `.add()` encadeados no mesmo `storiesOf`.

#### action & linkTo
Como você pode perceber, o `action` e o `linkTo` estão sendo importados de plugins, o storybook possui vários plugins para dar algumas funcionalidades a mais à sua história, você pode conferir alguns no [próprio site do storybook](https://storybook.js.org/addons/ "próprio site do storybook").

#### Button & Welcome
São componentes _React_ comuns, estão ali apenas para popular as histórias que vem por default.

#### Estrutura de uma história
Bom, para criar uma história basta seguir como no exemplo da história do `Button`. Vamos editar essa história e ver os efeitos que são aplicados no _storybook_:

{% highlight jsx linenos %}
storiesOf('História do Button', module)
  .add('Com um texto de Hello Button', () => (
    <Button onClick={action('HelloButton clicked')}>Hello Button</Button>
  ))
  .add('Com alguns emojis', () => (
    <Button onClick={action('EmojiButton clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
{% endhighlight %}

Esse trecho de código irá adicionar duas _stories_ do _kind_ "História do Button" como podemos ver no gif a seguir:

![Gif das histórias editadas](/assets/images/edited-stories.gif "Gif das histórias editadas")