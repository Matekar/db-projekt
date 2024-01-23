<script>
	// @ts-nocheck

	export let data;
</script>

<section>
	<table>
		{#each data.props.data as data}
			<tr>
				<td>{data.id_redaktor}</td>
				<td>{data.imie_redaktor}</td>
				<td>{data.nazwisko_redaktor}</td>
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
