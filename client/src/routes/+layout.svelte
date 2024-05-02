<nav>
    <img id="logo" src={logo} alt=""/>
    <div id="divider"/>
    <div id="links">
        {#key current}
            <a class={"link" + (current === "" ? " selected":" unselected")} 
                on:click={() => {current=""}} 
                href="/">
                Home
            </a>
            <a class={"link" + (current === "trends" ? " selected":" unselected")} 
                on:click={() => {current="trends"}} 
                href="/trends">
                Trends
            </a>
            <a class={"link" + (current === "search" ? " selected":" unselected")} 
                on:click={() => {current="search"}} 
                href="/search">
                Search
            </a>
            <a class={"link" + (current === "about" ? " selected":" unselected")} 
                on:click={() => {current="about"}} 
                href="/about">
                About
            </a>
        {/key}
    </div>
    <button id="logout">Log Out</button>
</nav>
<div id="spacing"/>

<slot />

<script>

    import { page } from '$app/stores';
    import logo from '$lib/images/logo.png';
    import './layout.css';

    let current = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/') + 1);

</script>