---
title: Criando uma lib de componentes React - Parte 1
layout: post
category: Javascript
meta: Nessa primeira parte iremos criar o repositório no github, instalar as dependências,
  instalar, configurar e entender o storybook.
excerpt: Nessa primeira parte iremos criar o repositório no github, instalar as dependências,
  instalar, configurar e entender o storybook.
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
Primeiramente iremos criar nosso `package.json`, pra isso, abra o terminal e vá até a pasta do seu projeto que você clonou, rode `npm init`, responda as perguntas, o `test command` pode ficar em branco mesmo, no meu caso ficou assim:

![Imagem CLI do npm init](/assets/images/npm-init.png "Imagem CLI do npm init")
Isso irá gerar nosso `package.json`.

Agora vamos instalar nossas primeiras dependências para criação de nossa biblioteca, primeiramente vamos instalar o `react` e o `react-dom`.

{% highlight shell linenos %}
npm install react react-dom
{% endhighlight %}

Após a instalação, as duas dependências serão adicionadas no `package.json`:

![Imagem do package.json mostrando o react e react-dom como dependências](/assets/images/react-reactdom-dependencies.png "Imagem do package.json mostrando o react e react-dom como dependências")

Mais pra frente veremos que o `react` e o `react-dom` não devem ficar nesse nó de _dependencies_ no `package.json`.

## Storybook

Agora, pra gente não precisar criar uma aplicação pra conseguir visualizar os componentes que iremos criar, e também pra dar um certo tipo de documentação pra quem quiser visualizar quais componentes nossa lib disponibiliza, iremos utilizar o _[Storybook](https://storybook.js.org/ "Storybook")_. Ele é uma ferramenta para desenvolver componentes visuais em _React_, _Vue_ e _Angular_, ele mantém a visualização de seus componentes organizada e eficiente.

Essa é a cara do _storybook_:
![Imagem da interface do storybook](/assets/images/storybook.png "Imagem da interface do storybook")
Pra gente instalar, basta rodar:

{% highlight shell linenos %}
npx -p @storybook/cli sb init
{% endhighlight %}

A instalação do _**Storybook**_ vai detectar que estamos utilizando _**React**_ e vai instalar a versão pro _framework_ correto. Após o término da instalação vamos rodar:

{% highlight shell linenos %}
npm run storybook
{% endhighlight %}

E se tudo der certo vamos ver a mensagem para acessar nosso _storybook_ local:

![Imagem da mensagem de que o storybook esta rodando](/assets/images/local-storybook.png "Imagem da mensagem de que o storybook esta rodando")

Acessando https://localhost:6006/ veremos o nosso próprio _storybook_!

![Imagem do storybook local](/assets/images/storybook-installed.png "Imagem do storybook local")

Perceba que o _storybook_ criou alguns arquivos no _root_ do projeto:

{% highlight shell linenos %}
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── stories /* Essa*/
│   └── index.stories.js
└── .storybook /* E essa */
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

Função que inicia a criação da história, ela recebe dois parâmetros, o primeiro é o nome do conjunto de histórias que será exibido no painel esquerdo, chamado de `kind`. O segundo parâmetro é o `module`, o _storybook_ precisa dessa variável global que o próprio _storybook_ declara, ele usa essa variável para criar uma referência ao arquivo que sua história está, essa referência serve para habilitar o _[hot-module-replacement](https://webpack.js.org/concepts/hot-module-replacement/ "Hot module replacement")_, sem esse `module` você teria que dar um _refresh_ na página toda vez que editasse sua história.

#### storiesOf().add()

O `add(name, functionalComponent)` recebe dois parâmetros também, o primeiro é o nome da história em questão, chamado de `story`, o segundo é uma função que retorne o componente _React_ que será exibido quando essa história for selecionada. Podem existir inúmeros `.add()` encadeados no mesmo `storiesOf`.

#### action & linkTo
Como você pode perceber, o `action` e o `linkTo` estão sendo importados de plugins, o storybook possui vários plugins para dar algumas funcionalidades a mais à sua história, você pode conferir alguns no [próprio site do storybook](https://storybook.js.org/addons/ "próprio site do storybook").

#### Button & Welcome
São componentes _React_ comuns, estão ali apenas para popular as histórias que vem por padrão.

#### Estrutura de uma história
Bom, para criar uma história basta seguir como no exemplo da história do `Button`. Edite a história que vem por _default_ para ver os efeitos que são aplicados no _storybook_. O código editado deve ficar assim:

{% highlight jsx linenos %}
storiesOf('História do Button', module) /*  alterado para "História do Button"*/
  .add('Com um texto de Hello Button', () => ( /*  alterado para "Com um texto de Hello Button"*/
    <Button onClick={action('HelloButton clicked')}>Hello Button</Button>
  ))
  .add('Com alguns emojis', () => ( /*  alterado para "Com alguns emojis"*/
    <Button onClick={action('EmojiButton clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
{% endhighlight %}

Esse trecho de código editou as duas  _stories_ do _kind_ "História do Button" como podemos ver no gif a seguir:

![Gif das histórias editadas](/assets/images/edited-stories.gif "Gif das histórias editadas")

### A pasta .storybook

Você também deve ter percebido que surgiu uma pasta _.storybook_ no seu projeto, as configurações de carregamento das _stories_, _addons_ e _webpack_ ficam nessa pasta, o _storybook_ possuí um _webpack_ por baixo dos panos, caso você queira editar alguma configuração, basta criar um arquivo `webpack.config.js` nessa pasta e sobrescrever o que necessita ser alterado, você pode ver melhor aqui: https://storybook.js.org/docs/configurations/custom-webpack-config/.

O arquivo `config.js` está basicamente importando todos os arquivos que terminam com `.stories.js` do diretório `/stories/` e carregando todas as _stories_ que esses arquivos contêm.
Atualmente o arquivo `addons.js` está registrando dois _addons_, o _actions_ e _links_, vamos ver o que esses _addons_ fazem.

#### actions

O _addon actions_ está sendo usado na _story_ que vem por _default_, do _kind_ `Button` na  _story_ _"Com um texto de Hello Button"_ o _action_ está sendo usado no _onClick_ do `Button`, como você pode ver a seguir:
![Addon action](/assets/images/addon_action.png "Addon action")

Ao abrir a _story "Com um texto de Hello Button"_ perceba que há um painel chamado **Actions** na parte inferior da página, ao clicar no botão que está sendo exibido na _story_ ,serão logados as informações do evento de _click_ na aba de **Actions**:
![Actions onClick log](/assets/images/actions-log.png "Actions onClick log")

O _addon_ **actions** deve ser usado para exibir os dados recebidos por _event-handlers_ no _storybook_, como `onClick`, `onKeyDown`, etc. Se você quiser saber mais sobre o funcionamento desse addon, [veja o github do projeto](https://github.com/storybookjs/storybook/tree/next/addons/actions "veja o github do projeto").

#### links

Como o próprio nome diz, o _addon links_ serve para linkar _stories_ entre sí, veja a _story_ do componente `<Welcome />` que vem por _default_, ele tem um link que deveria linkar para a `story` chamada _"Button"_, porém, se a gente clicar nesse link veremos que vai dar pau, se liga:

![Problema na história do Button](/assets/images/button-story-problem.png "Problema na história do Button")

Ao clicar no link _stories_ vemos essa mensagem meio bugada _"**No Preview**"_, isso acontece porque o _addon link_ recebe como primeiro parâmetro o nome do _kind_ e a _story_ como segundo parâmetro. Como mudamos o nome do _kind_ para _"História do Button"_ esse link não irá mais funcionar.

Vamos renomear o _kind_ de `História do Button` para apenas _"Botao"_ e alterar o parâmetro da função `linkTo` da prop `showApp` do componente `<Welcome />` para também ficar _"Botao"_, assim:

##### index.stories.js

{% highlight jsx linenos %}
storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Botao')} /> /* alteramos aqui */
));

storiesOf('Botao', module) /* alteramos aqui */
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

Agora, ao clicar no link `stories` do _kind_ **"Welcome"** da _story_ **"to Storybook"** veremos que irá linkar para a primeira _story_ do _kind_ **Botão**:
![Gif do link stories funcionando](/assets/images/stories-to.gif "Gif do link stories funcionando")

O segundo parâmetro da função `linkTo` não é obrigatório, porém, se presente, deve ser o nome de algum _story_ do _kind_ especificado. Caso a gente edite novamente a prop `showApp` do componente _Welcome_ passando um segundo parâmetro para função `linkTo` como _"Com alguns emojis"_ veremos que ao clicar no link `stories` ele nos levará à segunda _story_, e não mais a primeira:

{% highlight jsx linenos %}
storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Botao', 'Com alguns emojis')} /> /* adicionamos segundo parâmetro */
));
{% endhighlight %}

![Gif do link stories funcionando com segundo parâmetro](/assets/images/stories-to-second.gif "Gif do link stories funcionando com segundo parâmetro")
## Conclusão

Até agora nós criamos o repositório no github, instalamos o **React** e o **ReactDOM**, configuramos e editamos o _**Storybook**_.

Vimos todos os arquivos que a instalação do _storybook_ criou e também vimos as funções e plugins desses arquivos.

No próximo post vamos começar a desenvolver alguns componentes, configurar e adicionar testes unitários e criar novas _stories_ no _storybook_.