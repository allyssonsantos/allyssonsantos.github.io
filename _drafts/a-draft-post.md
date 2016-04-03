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



{% highlight html linenos %}

<div>
	<p>Lorem ipsum.</p>
	<blockquote>
		<p>Lorem ipsum.</p>
	</blockquote>
	<p>Lorem ipsum.</p>
</div>
{% endhighlight %}
