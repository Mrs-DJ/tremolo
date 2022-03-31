<script>
  import NavLink from "../components/NavLink.svelte";

  export let open = false;
</script>

<aside class="absolute w-full h-20 bg-gray-200 border-r-2 shadow-lg" class:open>
  <nav class="p-12 text-2xl space-x-8 text-center">
    <NavLink class="cursor-pointer" to={"/"} bind:open>Home</NavLink>
    <NavLink to={"Users"} bind:open>Users</NavLink>
    <NavLink to={"Profile"} bind:open>Profile</NavLink>
  </nav>
</aside>

<style>
  aside {
    left: -100%;
    transition: left 0.3s ease-in-out;
  }
  nav {
    display: flex;
    justify-content: space-between;
  }
  .open {
    left: 0;
  }
</style>

