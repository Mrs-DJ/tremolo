<script>
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./routes/Home.svelte";
  import Users from "./routes/Users.svelte";
  import Profile from "./routes/Profile.svelte";
  
  let open = false;
  
  export let url = "";
</script>


<Router url="{url}">
<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>
  <main>
    <Header />
  </main>
  <div>
    <Route path="Profile" component="{Profile}" />
    <Route path="Users" component="{Users}" />
    <Route path="/" component="{Home}" />
  </div>
</Router>




<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
</svelte:head>


<style>
  main {
    text-align: center;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>


