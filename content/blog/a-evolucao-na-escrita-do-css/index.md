---
title: A evolução na escrita do CSS.
slug: /a-evolucao-na-escrita-do-css
description: Como o CSS saiu da tag style, seguiu metodologias, criou pré-processadores e chegou ao javascript
date: '2019-05-28'
tags:
  - CSS
---

O CSS é uma linguagem para descrever como será apresentado um documento escrito em _HTML_, acho que você conhece, né? 🙃

A forma mais básica de se estilizar uma página é abrir uma tag `<style>` e jogar o _CSS_ lá dentro.

```html
<style>
  div {
    border: 1px solid #ccc;
  }

  div p {
    text-indent: 1ch;
  }
</style>
```

Definir os estilos "livremente" pode ser suficiente se você está desenvolvendo uma aplicação simples ou apenas para testar algumas coisas, porém, para aplicações mais robustas e complexas é importante tomar alguns cuidados.

Para manter a sanidade mental e conseguir dar manutenção mais tranquilamente no futuro, é necessário cautela na hora de estruturar seus arquivos, escrever _CSS_ sem seguir alguma forma padronizada pode acarretar em alguns problemas, conforme seu codebase vai evoluindo algumas tretas vão aparecendo, como por exemplo, estilos que afetam elementos indesejáveis, estilos não utilizados sendo baixados pelo browser, problemas com especificidades, código duplicado, etc.

Podemos demonstrar alguns pontos de atenção através de um exemplo do nosso dia a dia, imagine que você dará manutenção em um projeto existente e precisa alterar alguma coisa no layout do botão, por exemplo:

```html
<style>
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .btn.btn-primary {
    color: #fff;
    background-color: #0062cc;
    border-color: #005cbf;
  }

  .btn-primary:hover,
  .btn-primary.active {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }
</style>
```

Batendo o olho algumas perguntas podem surgir:

- Onde esse estilo está sendo usado, será que só em botões mesmo?
- Posso apagar?
- Se eu editar, vai zoar tudo?
- De onde vieram essas cores?

Pra tentar organizar um pouco as coisas surgiram as metodologias CSS.

## Metodologias de escrita de CSS

> Metodologia é um sistema de métodos. Método é uma forma simples, e sistematica de se fazer algo, de uma maneira pré definida para atingir um resultado esperado.

Para solucionar alguns dos problemas acima, surgiram algumas convenções de estruturação do CSS, como por exemplo:

- [BEM](http://getbem.com/introduction/ 'Metodologia BEM')
- [OOCS](http://oocss.org/ 'Metodologia OOCS')
- [SMACSS](http://smacss.com/ 'Metodologia SMACSS')
- [ITCSS](https://itcss.io/ 'Metodologia ITCSS')

## BEM

Criada pelos desenvolvedores da _Yandex_ em 2009 os conceitos chaves são identificar os **B**locos, **E**lementos e **M**odificadores e nomeá-los corretamente.

Blocos, elementos e modificadores, daí a sigla **BEM**, se referem a elementos ou comportamentos.

| <span style="color: #76b24f;">Blocos</span>                                                             | <span style="color: #4f91b2;">Elementos</span>                                                                                            | <span style="color: #d5635d;">Modificadores</span>                                    |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Entidade autossuficiente e autoexplicativa. Exemplo: `header`, `container`, `menu`, `checkbox`, `input` | Parte de um bloco que não tem significado quando usado sozinho, está atrelado ao bloco. Exemplo: `menu item`, `list item`, `header title` | Uma flag em um elemento ou bloco, Usado para alterar a aparência ou um comportamento. |

No próprio site da metodologia _BEM_ existe um exemplo utilizando o site do github como exemplo:

![Exemplo do BEM sendo aplicado no site do GitHub](/github_captions.jpg)
_Imagem retirada de [BEM - Block Element Modifier](http://getbem.com/introduction/)_

Um outro exemplo, temos um botão padrão `.button`, precisamos de um botão com o estado de _danger_, o _BEM_ nos indica que a classe desse elemento deve seguir o padrão `block--modifier`, então, podemos aplicar uma classe parecida com essa `.button--danger`.

```css
<style>
  .button { /* ... */ }
  .button--danger { /* ... */ }
</style>
```

```html
<button class="button">Normal Button</button>
<button class="button button--danger">Danger Button</button>
```

### Benefícios

Modularidade, **blocos** nunca dependem de outros elementos na página, com isso não teremos o problema de estilos de outros blocos influenciando em outros.

Compartilhamento de código, compor blocos de maneiras diferentes e reusá-los com inteligência reduz a quantidade de _CSS_ que você tem que manter.

Estrutura, a metodologia _BEM_ dá ao seu _CSS_ uma estrutura de nomenclaturas sólida, de fácil leitura e manutenção.

## SMACSS

Desenvolvido em 2011 por [Jonathan Snook](https://snook.ca/ 'Jonathan Snook') o **SMACSS** não determina a forma que você escreve suas classes, mas sim a estrutura de diretórios, com ele, você é orientado a criar as seguintes pastas:

- **\_\_base** - arquivos bases (reset e plugins);
- **\_\_ layout** - parte da estrutura do projeto, ex: header, footer;
- **\_\_ module** - componentes menores como, formulários, botões, tipografia, cores, etc;
- **\_\_ state** - estados como: hover, disabled, active, etc;
- **\_\_ theme** - reservado para criação de temas.

### Benefícios

Além de ter uma estrutura com a nomenclatura das suas classes _CSS_, agora você tem uma estrutura de arquivos bem definida, com isso, novos desenvolvedores conseguem se localizar mais rapidamente dentro do codebase, se seguido corretamente.

Se combinados, **BEM** e **SMACSS** podem deixar muito mais claro e fácil a manutenção dos estilos de seu sistema.

A ideia das metodologias é deixar seu _CSS_ mais legível, fácil de dar manutenção, bem estruturado e organizado. Ao invés de sair adicionando _CSS_ em qualquer lugar e estilizando elementos através de ids, aumentando a especifidade para conseguir estilizar o elemento desejado, agora você segue alguns padrões estabelecidos pela comunidade e todos os desenvolvedores conseguem falar a mesma lingua!

Você pode conferir mais detalhadamente a proposta de cada metodologia nos links acima.

## Pré-processadores

Um pré-processador _CSS_ é um programa que permite você gerar _CSS_ através da própria sintaxe do pré-processador. Existem muitos para se escolher, contudo, a maioria adicionará algumas funcionalidades que não existem no _CSS_ puro. Visam dar mais legibilidade e facilitar a manutenção através de funcionalidades como:

- [Nesting](https://sass-lang.com/documentation/style-rules#nesting 'Nesting')
- [Criação de variáveis](https://sass-lang.com/documentation/variables 'Criação de variáveis')\*
- [Condicionais](https://sass-lang.com/documentation/at-rules/control 'Condicionais')
- [Loops](https://sass-lang.com/documentation/at-rules/control/for 'Loops')
- [Imports](https://sass-lang.com/documentation/at-rules/import 'Imports')
- [Funções](https://sass-lang.com/documentation/at-rules/function 'Funções')
- [_mixins_](https://sass-lang.com/documentation/at-rules/mixin 'mixins')
- [_extends_](https://sass-lang.com/documentation/at-rules/extend 'extends')

\*Já disponível nativamente: [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties 'Using CSS custom properties')

Alguns pré-processadores:

- [Sass](https://sass-lang.com/ 'Sass')
- [LESS](http://lesscss.org/ 'LESS')
- [Stylus](http://stylus-lang.com/ 'Stylus')

Agora, além de ter nomenclaturas de classe que fazem sentido e uma estrutura de arquivos bem definida você também pode contar com novas funcionalidades, os pré-processadores vão te ajudar muito na legibilidade e compartilhamento de código através do _nesting_ e das inúmeras funções disponíveis, sem contar que você pode criar as suas próprias!

Será possível centralizar a paleta de cores, definir o tamanho padrão de `border-radius`, espaçamentos, etc.

Você pode seguir os links para estudar como é a implementação de todas essas funcionalidades (estão apontando para documentação do _Sass_, porém, a maioria dos pré-processadores possuem essas features).

Atualmente já é possível criar variáveis sem a necessidade de um pré-processador.

Variáveis com **CSS "Puro"**:

```css
<style>
  :root {
    --main-bg-color: red;
  }

  .header {
    background-color: var(--main-bg-color);
  }
</style>
```

### PostCSS

Outro cara que a comunidade desenvolveu foi o **PostCSS**, uma ferramenta para transformar o _CSS_ através do _JavaScript_, ele é baseado em _plugins_ e necessita de algum _task runner_ ou ferramenta de _bundling_ para conseguir manipular o seu _CSS_, como por exemplo: [Gulp](https://gulpjs.com/ 'Gulp'), [Grunt](https://gruntjs.com/ 'Grunt'), [Webpack](https://webpack.js.org/ 'Webpack'), [Rollup](https://rollupjs.org/guide/en 'Rollup').

Com ele é possível instalar alguns plugins como o _autoprefixer_ que adiciona prefixos como `-webkit-` `-moz-` e `-ms-` ao seus estilos automaticamente.

## CSS-in-JS

Com o surgimento das bibliotecas para construção de interfaces, como [React](https://reactjs.org/ 'React'), [Angular](https://angular.io/ 'Angular'), [Vue.js](https://vuejs.org/ 'Vue.js'), etc, o conceito de componentes visuais começou a ser difundido, passamos a quebrar o desenvolvimento de interfaces em componentes, pensamos primeiro em pontos isolados, como botões, tooltips, cards, inputs para depois em como compor em um bloco maior, como forms, modal, tabs, etc, e assim formar uma página completa.

O _CSS-in-JS_ não é uma biblioteca especifica, ele se refere a um grupo de ideias para resolver problemas complexos do _CSS_, geralmente levando em conta o conceito de componentes.

Existem diferentes bibliotecas que resolvem diferentes grupos de problemas com diversas abordagens, porém, todas utilizam o _JavaScript_ para manipular e aplicar os estilos:

- [CSS Modules](https://glenmaddern.com/articles/css-modules 'CSS Modules')
- [JSS](https://cssinjs.org/?v=v10.0.0-alpha.16 'JSS')
- [Radium](https://github.com/FormidableLabs/radium 'Radium')
- [Styled Components](https://www.styled-components.com/ 'Styled Components')

### De onde surgiu o conceito CSS-in-JS?

Provavelmente a primeira vez que o termo **CSS-in-JS** surgiu foi através de uma palestra de um engenheiro que trabalha no Facebook, [React: CSS in your JS by Christopher Chedeau](https://vimeo.com/116209150 'React: CSS in your JS by Christopher Chedeau') com o intuito de resolver alguns problemas:

- Escopo Global
- Dependências
- Dead Code Elimination (Código não utilizado)
- Minificação

Entre outros...

### Escopo global

Nós sabemos que o _CSS_ possui váriaveis globais, por exemplo, uma classe pode ser adicionada à qualquer elemento, um seletor de tag pode selecionar qualquer tag no documento, o _CSS_ foi inicialmente criado para estilizar documentos, não foi levado em conta o conceito de componentes, a página inteira é estilizada em um grande bloco de código.

Sites modernos são complexos, necessitam de vários desenvolvedores trabalhando simultaneamente em partes diferentes do sistema, com isso, o escopo global do _CSS_ pode ser um problema, estilos destinados a certos componentes podem influenciar em outros, esse foi um dos motivos para as metodologias _CSS_ que vimos acima serem criadas, porém, elas nao blindam completamente esse problema de ocorrer, os desenvolvedores precisam seguir a risca os conjuntos de regras estipuladas.

Uma biblioteca que resolve esse problema é o _styled-components_, a abordagem que ele segue é de gerar um hash único para cada componente, um estilo nunca influenciará outro.

```javascript
const Button = styled.button`
  background-color: blue;
  padding: 10px;
`;

// ...

render() {
  return <Button>Hello</Button>
}
```

Este exemplo renderizará uma classe aleatória baseada no conteúdo _CSS_ que foi escrito dentro da `template string` e adicionará a classe ao elemento do _DOM_:

```html
<style>
  .sc-bwzfXH jmtBes {
    background-color: blue;
    padding: 10px;
  }
</style>

<button class="sc-bwzfXH jmtBes">Hello</button>
```

Percebeu que o elemento recebeu **duas** classes aleatórias? `.sc-bwzfXH` e `.jmtBes`.

Cada elemento terá duas classes conectadas a ele, uma é **estática** por componente, cada `Button` terá essa classe que não liga a nenhum estilo. Ela é usada para identificar rapidamente qual elemento do _DOM_ se referência aquele _styled-component_. Essa classe estática sempre começa com `.-sc-...`.

A segunda classe é **dinâmica**, ela é baseada no resultado da interpolação, ou seja, o conteúdo _CSS_ que foi escrito na `template string`. Ao mudar o estilo desse componente a classe estática permanece a mesma, porém, a dinâmica é alterada, pois o estilo foi alterado.

Por exemplo, o _styled-component_ `<Button />` será renderizado sempre com a mesma classe estática, se os estilos forem alterados através de props, por exemplo, `<Button primary />`, então, teremos uma classe **dinâmica diferente**, enquanto a **estática permanece a mesma**. Não importa quantos componentes `<Button />` serão renderizados no _DOM_, sempre terão a mesma classe estática, mesmo que com estados diferentes.

### Dependências

Para um elemento receber um estilo específico ele vai **depender** da estrutura do arquivo, de uma classe, ID, de sua tag, algum tipo de dependência ele terá com o seletor _CSS_ que o estiliza. Fora isso, também é possível que esse seletor afete outros componentes indesejavelmente, as vezes você precisa criar um seletor muito específico para atingir um elemento sem afetar outros, gerando uma dependência muito grande entre a regra _CSS_ e o elemento do _HTML_.

Com o **CSS-in-JS** esse problema é solucionado, geralmente o estilo estará à nivel do componente, "imbutido" no componente, não dependerá de nenhuma nomenclatura especifica, não afeta nenhum outro elemento que não seja do componente, ou seja, todos os problemas de estilos afetando lugares indesejaveis estão solucionados!

### Dead Code Elimination (Código não utilizado)

Como o estilo está atrelado diretamente com o componente, o estilo só estará no browser, **só sera baixado pelo navegador caso o componente esteja sendo usado**. Se você remove o código do componente você também está **automaticamente removendo o código CSS**. Não é mais necessário percorrer todo o seu codebase procurando onde estão declaradas as regras _CSS_ que você não precisa mais.

### Minificação

É bem comum as bibliotecas de _CSS-in-JS_ tratar a minificação de seu _CSS_.

### Autoprefixer

Assim como a minificação o `autoprefixer` vem de graça na maioria das libs, os prefixos `-webkit-`, `-moz-`, etc, são adicionados automaticamente quando necessário, um detalhe a menos para se preocupar.

### Estilo baseado em props

Bom, eu não sou um conhecedor de todas as libs que aplicam _CSS-in-JS_, porém, no **styled-components** é possível adicionar estilos baseado nas `props` que o componente recebe.

Por exemplo:

```javascript
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render() {
  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  );
};
```

Essa forma aprimora muito a legibilidade do _JSX_. Batendo o olho você consegue ver que um botão é `normal` e o outro é `primary`, não precisamos de classes como `.btn .btn-primary` para estilizar nossos elementos.

## Conclusão

Precisamos ter o máximo de certeza que nossos estilos não afetarão outros elementos no futuro, que não estamos quebrando estilos existentes ou sobrescrevendo regras já estabelecidas.

Você pode atingir esse objetivo com qualquer uma das abordagens que vimos, as metodologias nos obrigam a seguir um conjunto de regras, é nececssário que todos os desenvolvedores conheçam sobre a metodologia e a apliquem corretamente, pode-se quebrar facilmente a estrutura caso saia do padrão estabelecido e com isso todas as dores de cabeças que estavamos tentando evitar voltam a tona.

Com o **CSS-in-JS** ficamos obrigados a utilizar alguma ferramenta específica, dependendo da ferramenta também ficaremos presos a um _framework_ específico, porém, temos alguns benefícios a mais do que com as metodologias, dead-code elemination, todas as _features_ do _javascript_ são aplicáveis no css, etc...

No final das contas, todas essas abordagens que vimos até aqui visam solucionar algum tipo de problema, particularmente eu prefiro **CSS-in-JS**, ultimamente estou trabalhando com _React_, e essa abordagem nos permite utilizar todo o poder do _JavaScript_ na organização do _CSS_. Atualmente a grande maioria dos meus projetos estão utilizando **styled-components**.
