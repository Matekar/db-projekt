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

<h1>Redaktorzy</h1>
<section>
	<table>
		<tr>
			{#each Object.keys(data.props.data[0]) as header}
				<th>{header}</th>
			{/each}
			<th>Redaguje</th>
		</tr>
		{#each data.props.data as name, index}
			<tr>
				<td>{name.ID}</td>
				<td>{name.Imie}</td>
				<td>{name.Nazwisko}</td>
				<td>{data.props.articleCount[index].count}</td>
			</tr>
		{/each}
	</table>
	<div>
		<form on:submit|preventDefault={insert} action="/tabela/redaktorzy">
			<h2>Dodaj Redaktora</h2>
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
