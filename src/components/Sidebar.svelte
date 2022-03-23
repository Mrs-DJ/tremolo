<script>
    import NavLink from "../components/NavLink.svelte";
    export let open = false;
    export let url = "";
</script>

<aside class="absolute w-full h-full bg-gray-200 border-r-2 shadow-lg" class:open>
	<nav class="p-12 text-xl">
		<NavLink to={"/"} bind:open={open}>Home</NavLink>
		<NavLink to={"Users"} bind:open={open}>Users</NavLink>
		<NavLink to={"Profile"} bind:open={open}>Profile</NavLink>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out
	}
	
	.open {
		left: 0
	}
</style>