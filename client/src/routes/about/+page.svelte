about


<script lang="ts">
    let dataBasePromptText = "return the race of all students with more than 10 absences"
    let whatGraphYouWant = "dounut chart"



    const APIKEY = "AIzaSyB5RcABqORxMeiTvbt4IETFLPM9hEqQNvQ"
    import {GoogleGenerativeAI} from '@google/generative-ai';

    import BarChart from './BarChart.svelte';
    import PieChart from './PieChart.svelte';
    import BubbleChart from './BubbleChart.svelte';
    import DonutChart from './DonutChart.svelte'
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(APIKEY);

    const project = 'stuvis';

    let message = "HII"

    let pie = false;
    let bar = false;
    let bubble = false;
    let line = false;
    let scatter = false;
    let dounut = false;

    let responseText;

    const getData = async () => {
        message = "222";
        console.log("HIII");
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

  
        
        let prompt = "Given a database with a table named Student with the following columns, ALL OF WHICH SHOULD BE ESCAPED WITH SQUARE BRACKETS, DO NOT MAKE UP YOUR OWN columns, return ONLY a SQLITE query that is all on one line to " + dataBasePromptText + " in a way where the data can be directly put in a " + whatGraphYouWant + " SchoolYear StudentID LastName FirstName EnrollmentStatus SchoolCode GradeLevel CurrentProgramTypeCode CalculatedRace EthnicityPrimaryCode EthnicityPrimary EthnicityStateCodes RaceCodesAsString RaceHispanic RaceAmericanIndian RaceAsian RaceBlack RacePacific RaceWhite FreeOrReducedLunch EconomicallyDisadvantaged GiftedTalented BasicSkillProgramCodesAsString ELL:IsActive ELL:LEPCode ELL:FormerELL ELL:ParentRefused ELL:LEPStartDate ELL:LEPExitDate SE:HasActiveIEP SE:HasActiveIEPOrRelatedService SE:HasActiveRelatedService SE:SpecialEdFlag SE:SelfContained SE:SpecEdStatus SE:SpecEdStatusCode SE:HasReferralInProcess Residential:Area/Neighborhood Residential:StreetName Activity:ParticipatedinSport Activity:ParticipatedinClub Conduct:HasDetentions Conduct:HasSuspensions Conduct:HasISSSuspensions Conduct:HasOSSSuspensions Conduct:HasOtherActions Grades:OnD/FList(FG) Att:Has09DayAbsLtr Att:Has15DayAbsLtr Att:Has04DayUxAbsLtr Att:Has08DayUxAbsLtr Att:Has10DayUxAbsLtr (Most of the previous were stored at 'Y' or 'N')";
        if(line || scatter)
        {
            prompt = "Given a database with a table named Incidents with the following columns, ALL OF WHICH SHOULD BE ESCAPED WITH SQUARE BRACKETS, DO NOT MAKE UP YOUR OWN columns, SchoolName TeacherName StudentName IncidentName Severity IncidentID Date... return ONLY a SQLITE query that is all on one line to " + dataBasePromptText + " in a way where the data can be directly put in a " + whatGraphYouWant + ". In a line or scatter plot, the value of each data point must be an integer representing the order";
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();


        text = text.replace("sql", "");
        text = text.replaceAll("```", "");
        text = text.replaceAll("`", "");
        text = text.replaceAll("\n", "");
        console.log(text);

        text = text.replaceAll(' ', '+');   

        console.log("http://127.0.0.1:3000/api?call=" + text);
        const response1 = (await fetch('http://127.0.0.1:3000/api?call=' + text));
        const items = await response1.json();
        
        console.log(items);


        const model1 = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});

        const prompt1 = "Format the following JSON object so it can be directly put in a D3.js " + whatGraphYouWant +". Return ONLY a JSON Object : " + JSON.stringify(items);
        const result1 = await model1.generateContent(prompt1);
        const response2 = await result1.response;
        text = response2.text();
        text = text.split('[').pop().split(']')[0];
        text = '[' + text + ']';
        console.log(JSON.parse(text));
        let dataF = JSON.parse(text);

        console.log("FINAL DATA FILLED WITH " + JSON.stringify(dataF));

        responseText = dataF;


    }




</script>

<button on:click={getData}>Get Data</button>
<input bind:value={dataBasePromptText} placeholder="enter your prompt" />
<p>Hello {dataBasePromptText || 'Enter Prompt Please'}!</p>

<input bind:value={whatGraphYouWant} placeholder="enter the graph you want" />
<p>Hello {whatGraphYouWant || 'Enter Graph Please'}!</p>

<label>
	<input type="checkbox" bind:checked={pie} />
	Pie Chart
</label>

<label>
	<input type="checkbox" bind:checked={bar} />
	Bar Chart
</label>

<label>
	<input type="checkbox" bind:checked={bubble} />
	Bubble Chart
</label>

<label>
	<input type="checkbox" bind:checked={dounut} />
	Donut Chart
</label>

<label>
	<input type="checkbox" bind:checked={line} />
	Line Chart
</label>

<label>
	<input type="checkbox" bind:checked={scatter} />
	Scatter Chart
</label>


<p>{message}</p>
<p>{JSON.stringify(responseText)}</p>


{#if responseText}
    {#if bar}
        <BarChart data={responseText}></BarChart>
    {/if}
    {#if pie}
        <PieChart data={responseText}></PieChart>
    {/if}
    {#if bubble}
        <BubbleChart data={responseText}></BubbleChart>
    {/if}
    {#if dounut}
        <DonutChart data={responseText}></DonutChart>
    {/if}
    <!--
    {#if line}
        <BubbleChart data={responseText}></BubbleChart>
    {/if}
    {#if scatter}
        <BubbleChart data={responseText}></BubbleChart>
    {/if}
    -->
    
{:else}
    <p>Loading Graph</p>
{/if}


<!--
{#key responseText}
    <BarChart data={responseText}></BarChart>
{/key}
-->


