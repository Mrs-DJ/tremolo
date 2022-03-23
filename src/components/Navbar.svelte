<script>
	import Hamburger from "./Hamburger.svelte";
	import Menu from "./Menu.svelte";
	export let sidebar = false;
</script>

<header>
	<nav class="flex">
		<Hamburger bind:open={sidebar}/>
	</nav>
    
	<Menu/>
</header>