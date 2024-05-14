<h1 id="trends">Trends</h1>
<h3 class="trends-prompt">Enter Primary Variable</h3>
<button id="primary-dropdown" class="dropdown-selector" on:click={() => {
    primaryDropdown = !primaryDropdown;
}}>{primary}</button>
{#if primaryDropdown}
    <div class="dropdown">
        {#each primaryOptions as option}
            <button class="dropdown-option" on:click={() => {
                primary = option;
            }}>{option}</button>
        {/each}
    </div>
{/if}
<h3 class="trends-prompt">Enter Secondary Variable</h3>
<button id="secondary-dropdown" class="dropdown-selector" on:click={() => {
    secondaryDropdown = !secondaryDropdown;
}}>{secondary}</button>
{#if secondaryDropdown}
    <div class="dropdown">
    {#each secondaryOptions as option}
        <button class="dropdown-option" on:click={() => {
            secondary = option;
        }}>{option}</button>
    {/each}
</div>
{/if}
<div id="trends-graph" />

<script>

    import './page.css';

    let primaryDropdown = false;
    let secondaryDropdown = false;
    let primaryOptions = [
        'Number of Cheating Incidents',
        'Number of Cutting Incidents',
        'Number of Fighting Incidents',
        'GPA'
    ];
    let secondaryOptions = [
        'Race',
        'Family Income',
        'Neighborhood',
        'GPA'
    ];
    let primary = 'Select';
    let secondary = 'Select';

    window.addEventListener('click', function(e) {   
        if (!document.getElementById('primary-dropdown').contains(e.target) && primaryDropdown){
            primaryDropdown = false;
        }
        if (!document.getElementById('secondary-dropdown').contains(e.target) && secondaryDropdown){
            secondaryDropdown = false;
        }
    });

</script>