<script>
  import {
    signInWithRedirect,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
  } from "firebase/auth";
  import { Router, Route } from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import UserBar from "./components/UserBar.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./routes/Home.svelte";
  import Header from "./components/Header.svelte";
  import Users from "./routes/Users.svelte";
  import User from "./routes/User.svelte";
  import Post from "./routes/Post.svelte";
  import Profile from "./routes/Profile.svelte";
  import { auth, googleProvider } from "./firebase";
  import advert from "./routes/advert.svelte";

  let open = false;

  export let url = "";


  let isLoggedIn = false;
  let loggedInUser;
  let uid;



  // --AUTH STATE LISTENER
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedInUser = auth.currentUser;
      isLoggedIn = true;
      uid = user.uid;
    }
  });

  // -- LOGIN FUNCTIONS

  function googleLogin() {
    signInWithRedirect(auth, googleProvider)
    .then((result) => {
      loggedInUser = result.user;
      console.log(loggedInUser, "user in google sign in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      console.log(errorCode, errorMsg, "errors in google catch block");
    });
  }

  function signInAnon() {
    signInAnonymously(auth)
      .then(() => {
        console.log("signed in anon");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log("errors in sign in anon", errorCode, errorMsg);
      });
  }

  // --LOG OUT FUNCTION
  function logOut() {
    signOut(auth);
    console.log("clicked");
    console.log(loggedInUser);
    isLoggedIn = false;
  }
</script>

<Router {url}>
  <Sidebar bind:open />
  <Navbar bind:sidebar={open} />
  <main>
    <Header />
    {#if isLoggedIn}
      <div>
        <button on:click={logOut}> Click To Log Out</button>
        <UserBar {loggedInUser} {uid} />
      </div>
    {:else}
      <div class="login-form">
        <button on:click={googleLogin}>
          <i class="fa fa-google" />
          Sign-In With Google
        </button>

        <button on:click={signInAnon}>
          <i class="fa fa-google" />
          Sign-In As Guest
        </button>
      </div>
    {/if}
  </main>
  <div>
    <Route path="Post" component="{Post}" />
    <Route path="Profile" component="{Profile}" />
    <Route path="Users" component="{Users}" />
    <Route path="/" component="{Home}" />
    <Route path="/advert/:id" component="{advert}" />
    <Route path="/User/:user_id" component="{User}" />
  </div>
</Router>

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

  .login-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
    padding: 5px;
    max-width: 90vw;
    margin: auto;
    justify-content: center;
  }
</style>
