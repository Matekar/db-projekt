<script>
	// @ts-nocheck
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	/**
	 * @param event
	 */
	async function insert(event) {
		const formElement = event.target;
		const formData = new FormData(formElement);

		const res = await fetch(formElement.action, {
			method: 'POST',
			body: formData
		});

		await invalidateAll();

		formElement.reset();
	}

	async function finalize(event) {
		const formElement = event.target;
		const formData = new FormData();
		formData.append('finalize', 'true');

		const res = await fetch(formElement.action, {
			method: 'POST',
			body: formData
		});

		await invalidateAll();
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
		<form on:submit|preventDefault={insert} action="/tabela/artykuly/{$page.params.id}">
			<h2>Dodaj Autora:</h2>
			<label for="autor">Autor:</label>
			<select name="autor" id="autor">
				{#each data.props.formOptions.availableAuthors as aa}
					<option value={aa.id_author}>{aa.imie} {aa.nazwisko}</option>
				{/each}
			</select>
			<input type="submit" value="Dodaj" />
		</form>

		<form on:submit|preventDefault={insert} action="/tabela/artykuly/{$page.params.id}">
			<h2>Dodaj Redaktora:</h2>
			<label for="redaktor">Redaktor:</label>
			<select name="redaktor" id="redaktor" required>
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

		<form on:submit|preventDefault={insert} action="/tabela/artykuly/{$page.params.id}">
			<h2>Dodaj cytowanie:</h2>
			<label for="cytowany">Zacytowany artykuł:</label>
			<select name="cytowany" id="cytowany">
				{#each data.props.formOptions.availableToCite as atc}
					<option value={atc.id_artykul}>{atc.id_artykul}. {atc.tytul}</option>
				{/each}
			</select>
			<input type="submit" value="Dodaj" />
		</form>

		<br />

		{#if data.props.data['status'] != 'FINALIZACJA'}
			<form on:submit|preventDefault={finalize} action="/tabela/artykuly/{$page.params.id}">
				<input type="submit" value="Finalizuj" />
			</form>
		{/if}
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
