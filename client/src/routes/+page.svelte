<h1 id="welcome">Welcome, Admin</h1>
<div id="small-cards">
    <div id="ratings-card" class="card">
        <h2>School Severity Ratings</h2>
        <div id="ratings-key">
            <h4 class="incident-type cheating">Cheating</h4>
            <h4 class="incident-type cutting">Cutting</h4>
            <h4 class="incident-type fighting">Fighting</h4>
        </div>
        <div id="ratings-table" class="table">
            {#each schools as school, i}
                <div class={"row" + (i % 2 === 0 ? " row-dark":" row-light")}>
                    <h4 class="ratings-name">{school.name}</h4>
                    <div id="ratings">
                        <h4 class="rating cheating">{school.cheating}</h4>
                        <h4 class="rating cutting">{school.cutting}</h4>
                        <h4 class="rating fighting">{school.fighting}</h4>
                    </div>
                </div>
            {/each} 
            </div>
    </div>
    <div id="graph-card" class="card">
        <h2>Incidents Graph</h2>
        
        <div id="graph">
            <LineChart></LineChart>
        </div>
        
    </div>
</div>
<div id="incidents-card" class="card" bind:clientWidth={width}>
    <h2>Recent Incidents</h2>
    <div id="incidents-header">
        <div class="row">
            
            {#if width > 1024}
                <h3 class="incidents-subtitle-small incidents-small">Date</h3>
                <h3 class="incidents-subtitle-small incidents-small">Type</h3>
                <h3 class="incidents-subtitle-large incidents-large">School</h3> 
                <h3 class="incidents-subtitle-large incidents-large">Students</h3>
            {:else}
                <h3 class="incidents-subtitle-large incidents-large">Date</h3>
                <h3 class="incidents-subtitle-large incidents-large">School</h3> 
            {/if}
        </div>
    </div>
    <div id="incidents-table" class="table">
        {#each incidents as incident, i}
            <div class={"row" + (i % 2 === 0 ? " row-dark":" row-light")}>
                {#if width > 1024}
                    <p class="incidents-small">{incident.date}</p>
                    <div class="incidents-small">
                        <h4 class={"incidents-type incident-type " + incident.type.toLowerCase()} 
                            style={!["Cheating", "Cutting", "Fighting"].includes(incident.type) ? "background-color: rgb(255, 0, 255)":""}>
                            {incident.type}
                        </h4>
                    </div>
                    <p class="incidents-large">{incident.school}</p>
                    <p class="incidents-large">{incident.students}</p>
                {:else}
                    <div class="incidents-small">
                        <p class={"incidents-type incident-type " + incident.type.toLowerCase()}
                            style={!["Cheating", "Cutting", "Fighting"].includes(incident.type) ? "background-color: rgb(255, 0, 255)":""}>
                            {incident.date}
                        </p>
                    </div>
                    <p class="incidents-large">{incident.school}</p>
                {/if}
            </div>
        {/each} 
    </div>
</div>

<script>

    import './page.css';
    import LineChart from './LineChart.svelte';

    let width;
    
    let user = '[User]';

    let schools = [
        {
            name: 'South Brunswick High School',
            cheating: '76',
            cutting: '98',
            fighting: '43'
        },
        {
            name: 'Crossroads North Middle School',
            cheating: '56',
            cutting: '43',
            fighting: '67'
        },
        {
            name: 'Crossroads South Middle School',
            cheating: '43',
            cutting: '34',
            fighting: '71'
        },
        {
            name: 'Greenbrook Elementary School',
            cheating: '12',
            cutting: '60',
            fighting: '32'
        },
        {
            name: 'Brunswick Acres Elementary School',
            cheating: '21',
            cutting: '65',
            fighting: '28'
        },
        {
            name: 'Brooks Crossing Elementary School',
            cheating: '9',
            cutting: '71',
            fighting: '21'
        },
        {
            name: 'Monmouth Junction Elementary School',
            cheating: '8',
            cutting: '58',
            fighting: '20'
        },
        {
            name: 'Constable Elementary School',
            cheating: '2',
            cutting: '51',
            fighting: '17'
        }
    ];

    let incidents = [
        {
            date: '2024-05-08',
            type: 'Cheating',
            school: 'Indian Fields and Dayton',
            students: 'Michael White, Nancy Black'
        },
        {
            date: '2024-05-07',
            type: 'Fighting',
            school: 'Greenbrook',
            students: 'Karl Orange, Laura Brown'
        },
        {
            date: '2024-05-06',
            type: 'Cutting',
            school: 'Constable',
            students: 'Ian Red, Jessica Violet'
        },
        {
            date: '2024-05-05',
            type: 'Cheating',
            school: 'Cambridge',
            students: 'George Blue, Hannah Pink'
        },
        {
            date: '2024-05-04',
            type: 'Fighting',
            school: 'Brooks Crossing and Deans',
            students: 'David Grey, Fiona Yellow'
        },
        {
            date: '2024-05-03',
            type: 'Cutting',
            school: 'Brunswick Acres',
            students: 'Charlie Black, Eve Green'
        },
        {
            date: '2024-05-02',
            type: 'Cheating',
            school: 'Crossroads Middle School',
            students: 'Alice Brown, Bob White'
        },
        {
            date: '2024-05-01',
            type: 'Fighting',
            school: 'South Brunswick High School',
            students: 'John Doe, Jane Smith'
        }
    ];

</script>