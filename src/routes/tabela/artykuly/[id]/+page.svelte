<script>
	// @ts-nocheck
	export let data;
</script>

<section>
	<table>
		{#each Object.keys(data.props.data) as key}
			<tr>
				<td>{key}</td>
				<td>{data.props.data[key]}</td>
			</tr>
		{/each}
	</table>
	<div />
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
