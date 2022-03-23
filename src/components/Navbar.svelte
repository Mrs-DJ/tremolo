<script>
	import Hamburger from "./Hamburger.svelte";
	export let sidebar = false;
</script>

<header>
	<nav class="flex">
		<Hamburger bind:open={sidebar}/>
	</nav>

</header>