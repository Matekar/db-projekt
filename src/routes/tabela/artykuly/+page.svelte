<script>
	// @ts-nocheck
	import { invalidateAll } from '$app/navigation';

	export let data;

	/**
	 * @param {any} event
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
</script>

<h1>Artykuły</h1>
<section>
	<table>
		<tr>
			{#each Object.keys(data.props.data[0]) as header}
				<th>{header}</th>
			{/each}
		</tr>
		{#each data.props.data as data}
			<tr>
				<td>{data.ID}</td>
				<td>{data.Tytuł}</td>
				<td>{data['Data utworzenia']}</td>
				<td><a href="/tabela/artykuly/{data.ID}">Szczegóły&nbsp;→</a></td>
			</tr>
		{/each}
	</table>
	<div>
		<form on:submit|preventDefault={insert} action="/tabela/artykuly">
			<h2>Dodaj Artykuł</h2>
			<label for="tytul">Tytul:</label>
			<input type="text" name="tytul" id="tytul" required />
			<label for="podtytul">Podtytuł:</label>
			<input type="text" name="podtytul" id="podtytul" required />
			<label for="autor">Autor:</label>
			<select name="autor" id="autor">
				{#each data.props.authors as author}
					<option value={author.id_author}>{author.nazwa}</option>
				{/each}
			</select>
			<input type="submit" value="Dodaj" />
		</form>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}
</style>
