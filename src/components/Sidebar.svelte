<script>
    import NavLink from "../components/NavLink.svelte";
    export let open = false;
    export let url = ""
	const clickHandler = () => {
		console.log('here')
	open = false;
	};
</script>

<aside class="absolute w-full h-full bg-gray-200 border-r-2 shadow-lg" class:open>
	<nav class="p-12 text-xl">
		<NavLink to={"/"} on:click={clickHandler}>Home</NavLink>
		<NavLink to={"Users"}>Users</NavLink>
		<NavLink to={"Profile"}>Profile</NavLink>
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