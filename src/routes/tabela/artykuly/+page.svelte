<script>
	// @ts-nocheck

	export let data;
</script>

<h1>Artykuły</h1>
<section>
	<table>
		{#each data.props.data as data}
			<tr>
				<td>{data.id_artykul}</td>
				<td>{data.tytul}</td>
				<td>{data.data_utworzenia}</td>
				<td><a href="./artykuly/{data.id_artykul}">Szczegóły&nbsp;→</a></td>
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
		grid-template-columns: 2fr 1fr;
	}
</style>
