<script>
	// @ts-nocheck
	import { page } from '$app/stores';

	export let data;

	/**
	 * @param event
	 */
	async function insertAuthor(event) {
		const formElement = event.target;
	}

	/**
	 * @param event
	 */
	async function insertRedactor(event) {
		const formElement = event.target;
	}

	/**
	 * @param event
	 */
	async function insertCite(event) {
		const formElement = event.target;
	}
</script>

<h1><a href="/tabela/artykuly">←</a> {data.props.data.tytul}</h1>
<section>
	<table>
		{#each Object.keys(data.props.data) as key}
			{#if data.props.data[key] != ''}
				<tr>
					<td>{key}</td>
					<td>
						{#if key == 'autorzy'}
							<ul>
								{#each data.props.data[key] as autor}
									<li>{autor.imie} {autor.nazwisko}</li>
								{/each}
							</ul>
						{:else if key == 'redaktorzy'}
							<ul>
								{#each data.props.data[key] as redaktor}
									<li>{redaktor.imie_redaktor} {redaktor.nazwisko_redaktor}: {redaktor.rola}</li>
								{/each}
							</ul>
						{:else if key == 'cytuje'}
							<ul>
								{#each data.props.data[key] as cyt}
									<li>{cyt.tytul}</li>
								{/each}
							</ul>
						{:else}
							{data.props.data[key]}
						{/if}
					</td>
				</tr>
			{/if}
		{/each}
	</table>
	<div>
		<form on:submit|preventDefault={insertAuthor} action="/tabela/artykuly/{$page}">
			<h2>Dodaj Autora:</h2>
			<label for="autor">Autor:</label>
			<select name="autor" id="autor">
				{#each data.props.formOptions.availableAuthors as aa}
					<option value={aa.id_author}>{aa.imie} {aa.nazwisko}</option>
				{/each}
			</select>
			<input type="submit" value="Dodaj" />
		</form>

		<form on:submit|preventDefault={insertRedactor} action="/tabela/artykuly/{$page}">
			<h2>Dodaj Redaktora:</h2>
			<label for="autor">Redaktor:</label>
			<select name="autor" id="autor" required>
				{#each data.props.formOptions.availableRedactors as ar}
					<option value={ar.id_redaktor}>{ar.imie_redaktor} {ar.nazwisko_redaktor}</option>
				{/each}
			</select>
			<label for="rola">Rola:</label>
			<select name="rola" id="rola" required>
				{#if data.props.data['redaktorzy'] == ''}
					<option value="NACZELNY">NACZELNY</option>
				{/if}
				<option value="REDAKTOR">REDAKTOR</option>
				<option value="KOREKTOR">KOREKTOR</option>
			</select>
			<input type="submit" value="Dodaj" />
		</form>

		<form on:submit|preventDefault={insertCite} action="/tabela/artykuly/{$page}">
			<h2>Dodaj cytowanie:</h2>
			<label for="cytowany">Zacytowany artykuł:</label>
			<select name="cytowany" id="cytowany">
				{#each data.props.formOptions.availableToCite as atc}
					<option value={atc.id_artykul}>{atc.id_artykul}. {atc.tytul}</option>
				{/each}
			</select>
			<input type="submit" value="Dodaj" />
		</form>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	table {
		height: fit-content;
	}
</style>
