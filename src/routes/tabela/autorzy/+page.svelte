<script>
	// @ts-nocheck

	import { invalidateAll } from '$app/navigation';

	export let data;

	/**
	 * Insert new author
	 *
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

<h1>Autorzy</h1>
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
				<td>{data.Imie}</td>
				<td>{data.Nazwisko}</td>
			</tr>
		{/each}
	</table>
	<div>
		<form on:submit|preventDefault={insert} action="/tabela/autorzy">
			<h2>Dodaj Autora</h2>
			<label for="imie">Imie:</label>
			<input type="text" name="imie" id="imie" required />
			<label for="nazwisko">Nazwisko:</label>
			<input type="text" name="nazwisko" id="nazwisko" required />
			<input type="submit" value="Dodaj" />
		</form>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
