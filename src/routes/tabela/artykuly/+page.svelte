<script>
	// @ts-nocheck

	export let data;
</script>

<section>
	<table>
		{#each data.props.data as data}
			<tr>
				<td>{data.id_artykul}</td>
				<td>{data.tytul}</td>
				<td>{data.data_utworzenia}</td>
				<td><a href="./artykuly/{data.id_artykul}">Szczegóły</a></td>
			</tr>
		{/each}
	</table>
	<div>
		<form>
			<input type="text" />
		</form>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
