<h1 id="welcome">Welcome, {user}</h1>
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
        <div id="graph"/>
    </div>
</div>
<div id="incidents-card" class="card">
    <h2>Recent Incidents</h2>
    <table id="incidents-header">
        <tr class="row">
            <h3 class="incidents-subtitle incidents-date">Date</h3>
            <h3 id="incidents-type-header" class="incidents-subtitle">Type</h3>
            <h3 class="incidents-subtitle incidents-school">School</h3>
            <h3 class="incidents-subtitle incidents-students ">Students</h3>
        </tr>
    </table>
    <div id="incidents-table" class="table">
        {#each incidents as incident, i}
            <div class={"row" + (i % 2 === 0 ? " row-dark":" row-light")}>
                <p class="incidents-date">{incident.date}</p>
                <h4 class={"incidents-type incident-type " + incident.type.toLowerCase()} 
                    style={!["Cheating", "Cutting", "Fighting"].includes(incident.type) ? "background-color: rgb(255, 0, 255)":""}>
                    {incident.type}
                </h4>
                <p class="incidents-school">{incident.school}</p>
                <p class="incidents-students">{incident.students}</p>
            </div>
        {/each} 
    </div>
</div>

<script>

    import './page.css';
    
    let user = '[User]';

    let schools = [
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        },
        {
            name: '[School]',
            cheating: '[X]',
            cutting: '[X]',
            fighting: '[X]'
        }
    ];

    let incidents = [
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        },
        {
            date: '[Date]',
            type: '[Type]',
            school: '[School]',
            students: '[Students]'
        }
    ];

</script>