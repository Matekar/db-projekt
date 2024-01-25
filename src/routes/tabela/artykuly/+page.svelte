<script>
	// @ts-nocheck

	export let data;
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
				<td><a href="./artykuly/{data.ID}">Szczegóły&nbsp;→</a></td>
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
