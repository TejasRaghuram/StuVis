<h1 id="greeting">Hello, [User]!</h1>
<div id="messages-card">
    {#if chat.length > 0}
        <div id="messages-content">
            {#each chat as message}
                <div class="message-container">
                    <p class={message.from + " message"}>{message.content}</p>
                </div>
            {/each}
        </div>
    {:else}
        <div id="prompt-starters">
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Get me information on student...";
            }}>Get me information on student ...</button>
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "What was the last cheating incident at ...";
            }}>What was the last cheating incident at ...</button>
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Which school has had the most fighting issues over the past 3 months?";
            }}>Which school has had the most fighting issues over the past 3 months?</button>
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Who has cut class the most at ...";
            }}>Who has cut class the most at ...</button>
        </div>
    {/if}
</div>
<form id="send" on:submit={() => {
    const message = document.getElementById("prompt").value;
    document.getElementById("prompt").value = "";
    chat.push({
        from: "user",
        content: message
    });
    chat = chat;
    // Get Response
    const response = "[Response]";
    chat.push({
        from: "bot",
        content: response
    })
    chat = chat;
}}>
    <input id="prompt" type="text" placeholder="How can I help you today?" autocomplete="off" autofocus="autofocus">
    <input id="submit" type="submit" value="Send">
</form>

<script>

    import './page.css';

    let chat = [];

</script>