<script>
    import {db, auth} from "../firebase.js";
    import {collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp} from "firebase/firestore";
    export let id;
    let uid;
    let message;



    const setMessage = (e) => {
        message = e.target.value;
        console.log(message)
    };


    // auth.operations.then(() => {
    // uid = auth.currentUser.uid;}

    const addMessage = (e) => {
        e.preventDefault();
        addDoc(doc(db, "Chats"),
        {
            text: message,
            timestamp: serverTimestamp(),
        }
        )
        }
</script>

<p>{id}</p>

<form on:submit={addMessage}>
<input type="text" on:change={setMessage}/>
<button type="submit">Send Message</button>
</form>

<style>
    input {
        color:black;
    }
</style>