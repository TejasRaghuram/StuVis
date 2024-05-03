<nav bind:clientWidth={width}>
    <img id="logo" src={logo} alt=""/>
    <div id="links" class={width <= 768 ? (open ? "open":"closed"):""}>
        {#key current}
            <a class={"link" + (current === "" ? " selected":" unselected")} 
                on:click={() => {
                    current = "";
                    open = false;
                }} 
                href="/">
                Home
            </a>
            <a class={"link" + (current === "trends" ? " selected":" unselected")} 
                on:click={() => {
                    current = "trends";
                    open = false;
                }} 
                href="/trends">
                Trends
            </a>
            <a class={"link" + (current === "search" ? " selected":" unselected")} 
                on:click={() => {
                    current = "search";
                    open = false;
                }} 
                href="/search">
                Search
            </a>
            <a class={"link" + (current === "about" ? " selected":" unselected")} 
                on:click={() => {
                    current = "about";
                    open = false;
                }} 
                href="/about">
                About
            </a>
        {/key}
    </div>
    {#if width > 768}
        <div id="divider"/>
        <button id="logout">Log Out</button>
    {:else}
        <button id="hamburger" on:click={() => {open = !open}}>
            <div id={open ? "hamburger-top-open":"hamburger-top-closed"} class="hamburger-bar"/>
            <div id={open ? "hamburger-middle-open":"hamburger-middle-closed"} class="hamburger-bar"/>
            <div id={open ? "hamburger-bottom-open":"hamburger-bottom-closed"} class="hamburger-bar"/>
        </button>
        <button id="logout">
            <img id="logout-icon" src={logout} alt=""/>
        </button>
    {/if}
</nav>
<div id="spacing"/>

<slot />

<script>

    import { page } from '$app/stores';
    import logo from '$lib/images/logo.png';
    import logout from '$lib/images/logout.png';
    import './layout.css';

    let current = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/') + 1);
    let width;
    let open = true;

</script>