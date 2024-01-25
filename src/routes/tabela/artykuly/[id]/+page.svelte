<script>
	// @ts-nocheck
	export let data;
</script>

<h1><a href="../artykuly">←</a> {data.props.data.tytul}</h1>
<section>
	<table>
		{#each Object.keys(data.props.data) as key}
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
