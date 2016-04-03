---
layout: page
title: Draft Post
permalink: /draft-post/
---

Descrição:

Existem vários seletores no css, hoje veremos alguns que não são tão fáceis de ler e entender o que fazem, porém, muito úteis em algumas situações específicas.

O seletor "~"

O "~" no css serve para selecionar elementos depois de outros elementos, podemos traduzir o "~" para: "quero pegar todos elementos depois desse elemento" por exemplo, temos a seguinte marcação HTML:

{% highlight html linenos %}

<ul>
	<li>Primeiro Item</li>
	<li>Segundo Item</li>
	<li>Terceiro Item</li>
	<li>Quarto Item</li>
</ul>

{% endhighlight %}

Queremos que a partir do segundo item, ele e todos os outros <li> tenham uma margin-top de 10px. poderiamos fazer da seguinte maneira:

{% highlight css linenos %}
li ~ li {
	margin-top: 10px;
}
{% endhighlight %}

Dessa forma, o primeiro elemento não teria a margin-top, mas o segundo e todos os outros possuiriam a propriedade margin-top.

Outra forma de ler esse seletor: "Quero pegar todos <li> que tenha outro <li> antes dele", que no nosso caso, não pegaria o primeiro <li>, pois não há nenhum <li> que o precede.

Lembre-se bem, o "~" seleciona TODOS os elementos depois de outro.

Agora, um outro caso, temos o seguinte HTML:

{% highlight html linenos %}

<img src="imagem.jpg">
<div>
	<p>Lorem ipsum dolor sit amet.</p>
	<p>Lorem ipsum dolor sit amet.</p>
	<p>Lorem ipsum dolor sit amet.</p>
</div>

{% endhighlight %}

E queremos pegar todos os paragrafos depois da imagem. Poderíamos selecioná-lo da seguinte maneira?

{% highlight css linenos %}
img ~ p
{% endhighlight %}

O nosso seletor de "~" iria funcionar nesse caso? A resposta é: não, esse seletor não iria funcionar, pois quem está depois da imagem é a <div> e dentro da <div> é que estão os paragrafos, nosso seletor "~" funciona apenas para selecionar elementos irmãos, e não elementos filhos...

<hr>

O seletor "+"

No css, temos o seletor "+" nos permite selecionar um elemento IMEDIATAMENTE depois de outro elemento, por exemplo, temos o seguinte HTML:

{% highlight html linenos %}

<img src="imagem.jpg">
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, incidunt.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, blanditiis.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, pariatur?</p>

{% endhighlight %}

Queremos que apenas o primeiro paragrafo seja em negrito. Podemos então selecioná-lo da seguinte maneira:

{% highlight css linenos %}
img + p {
	font-weight: bold;
}
{% endhighlight %}

Lembre-se, o "+" pega o elemento IMEDIATAMENTE após, então ele não funcionaria em um caso como esse, onde queremos selecionar o primeiro paragrafo após a imagem:

{% highlight html linenos %}
<img src="imagem.jpg">
<div>
	<p>Lorem ipsum dolor sit amet, consectetur.</p>
	<p>Lorem ipsum dolor sit amet, consectetur.</p>
</div>
{% endhighlight %}

<hr>

O seletor ">"

Esse seletor nos permite selecionar elementos PAI e FILHOS, não seleciona elementos que estejam mais pra dentro da marcação, por exemplo, temos o seguinte HTML:

{% highlight html linenos %}

<div>
	<p>Lorem ipsum.</p> <!-- filho de div -->
	<blockquote>
		<p>Lorem ipsum.</p> <!-- neto de div -->
	</blockquote>
	<p>Lorem ipsum.</p> <!-- filho de div -->
</div>
{% endhighlight %}


Queremos pegar os <p> que são filhos da <div> e não netos, como é o caso do <p> que está dentro do <blockquote>. Para pegar esses paragrafos que são filhos da <div> e aplicarmos um estilo de text-decoration: underline; podemos selecioná-los da seguinte forma:

{% highlight css linenos %}
div > p {
	text-decoration: underline;
}
{% endhighlight %}

Dessa maneira, todos os <p> que são filhos da <div> receberão o estilo.

Conclusão

Os seletores de elementos que vimos hoje nos dão bastante poder, pois podemos combiná-los para pegar elementos específicos, como por exemplo, .noticias > h1 + p esse seletor seleciona exatamente todos os paragrafos que estão imediatamente depois de todos os <h1> que são filho de .noticias.

Bastante útil quando não podemos alterar nada no HTML ou temos acesso apenas aos arquivos de CSS.

Porém, sua compreensão é bastante difícil, não conseguimos bater o olho nesse seletor e já saber o que ele está selecionando. Outro ponto negativo é a sua performance, o navegador lê os atributos da direita para esquerda, então ele teria um trabalho relativamente grande para capturar esses elementos, pois teria que achar todos os <p> da página, depois selecionar apenas os que estão imediatamente depois de um <h1> e depois ainda selecionar todos os <h1> mas pegar apenas os que são filhos de .noticias, ou seja, muito custoso para o navegador.

Mas o ponto que mais me incomoda, é que caso esse <h1> venha a ser <h2> nosso código CSS não funcionará mais. Nosso CSS é dependente da estrutura atual do HTML, caso ela mude, nosso CSS quebra.

Então, use com cuidado!