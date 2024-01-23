<script>
	// @ts-nocheck

	export let data;
</script>

<section>
	<table>
		{#each data.props.data as data}
			<tr>
				<td>{data.id_author}</td>
				<td>{data.imie}</td>
				<td>{data.nazwisko}</td>
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
