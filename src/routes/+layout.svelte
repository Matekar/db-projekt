<script>
	import './global.css';
</script>

<div class="app">
	<header>
		<div>
			<h1>Baza danych - Redakcja</h1>
		</div>
		<nav>
			<h2>Tabele</h2>
			<ul>
				<li><a href="/tabela/autorzy">Autorzy</a></li>
				<li><a href="/tabela/redaktorzy">Redaktorzy</a></li>
				<li><a href="/tabela/artykuly">Artykuly</a></li>
				<!-- <li><a href="/tabela/cytowania">Cytowania</a></li>
				<li><a href="/tabela/raa">Relacje Autor-Artykul</a></li>
				<li><a href="/tabela/rra">Relacje Redaktor-Artykul</a></li> -->
			</ul>
		</nav>
		<!-- <nav>
			<h2>Widoki</h2>
			<ul>
				<li>
					<a href="/widok/autorzy_artykuly">Autorzy i artykuły</a><a
						href="/widok/redaktorzy_przypisania">Przypisania redaktorów</a
					><a href="/widok/sfinalizowane_artykuly">Artykuły sfinalizowane</a>
				</li>
			</ul>
		</nav> -->
	</header>
	<main>
		<slot />
	</main>
	<footer>Marcin Kiżewski</footer>
</div>
