<h1 id="greeting">Hello, Admin!</h1>
<div id="messages-card">
    {#if chat.length > 0}
        <div id="messages-content">
            {#each chat as message}
                {#if message.from === "user" || message.content === "ERROR:  Try Again"}
                    <div class="message-container">
                        <p class={message.from + " message"}>{message.content}</p>
                    </div>
                {:else}
                    {#if message.content !== "ERROR"}
                        <div class="bot-message">
                            <BarChart data={message.content.graph}></BarChart>
                        </div>  
                        <div class="message-container">
                            <p class={message.from + " message"}>{message.content.text}</p>
                        </div>     
                    {:else}
                        <div class="message-container">
                            <p class={message.from + " message"}>Error: Please Try Again.</p>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
    {:else}
        <div id="prompt-starters">
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Return the races of students with 10 absences";
            }}>Return the races of students with 10 absences</button>
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Return the grade level of all students that have ISS suspensions";
            }}>Return the grade level of all students that have ISS suspensions</button>
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Return the race of people who played a sport";
            }}>Return the race of people who played a sport</button>
            <button class="prompt-starter" on:click={() => {
                document.getElementById("prompt").value = "Who has cut class the most at ...";
            }}>Who has cut class the most at ...</button>
        </div>
    {/if}
</div>
<form id="send" on:submit={ async () => {
    const message = document.getElementById("prompt").value;
    document.getElementById("prompt").value = "";
    chat.push({
        from: "user",
        content: message
    });
    chat = chat;
    // Get Response
    const response = await getData(message);
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

    let responseText;

    const APIKEY = "AIzaSyB5RcABqORxMeiTvbt4IETFLPM9hEqQNvQ"
    import {GoogleGenerativeAI} from '@google/generative-ai';

    
    import BarChart from './graphs/BarChart.svelte';
    import PieChart from './graphs/PieChart.svelte';
    import BubbleChart from './graphs/BubbleChart.svelte';
    import DonutChart from './graphs/DonutChart.svelte'
    import Percentgauge from './graphs/PercentGauge.svelte';
    
    const genAI = new GoogleGenerativeAI(APIKEY);



    const getData = async (query) => {

        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});
        
        const prompt = "Given a database with a table named Student with the following columns, ALL OF WHICH SHOULD BE ESCAPED WITH SQUARE BRACKETS, DO NOT MAKE UP YOUR OWN columns, return ONLY a SQLITE query that is all on one line to " + query + " in a way where the data can be directly put in a donut chart SchoolYear StudentID LastName FirstName EnrollmentStatus SchoolCode GradeLevel CurrentProgramTypeCode CalculatedRace EthnicityPrimaryCode EthnicityPrimary EthnicityStateCodes RaceCodesAsString RaceHispanic RaceAmericanIndian RaceAsian RaceBlack RacePacific RaceWhite FreeOrReducedLunch EconomicallyDisadvantaged GiftedTalented BasicSkillProgramCodesAsString ELL:IsActive ELL:LEPCode ELL:FormerELL ELL:ParentRefused ELL:LEPStartDate ELL:LEPExitDate SE:HasActiveIEP SE:HasActiveIEPOrRelatedService SE:HasActiveRelatedService SE:SpecialEdFlag SE:SelfContained SE:SpecEdStatus SE:SpecEdStatusCode SE:HasReferralInProcess Residential:Area/Neighborhood Residential:StreetName Activity:ParticipatedinSport Activity:ParticipatedinClub Conduct:HasDetentions Conduct:HasSuspensions Conduct:HasISSSuspensions Conduct:HasOSSSuspensions Conduct:HasOtherActions Grades:OnD/FList(FG) Att:Has09DayAbsLtr Att:Has15DayAbsLtr Att:Has04DayUxAbsLtr Att:Has08DayUxAbsLtr Att:Has10DayUxAbsLtr (Most of the previous were stored at 'Y' or 'N')";
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        console.log(prompt);
        console.log(text);


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
        
        if(items.length == 0)
        {
            return "ERROR";
        }


        const model1 = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});

        const prompt1 = "Format the following JSON object so it can be directly put in a D3.js donut chart. Return ONLY a JSON Object with: " + JSON.stringify(items);
        const result1 = await model1.generateContent(prompt1);
        const response2 = await result1.response;
        text = response2.text();
        
        text = text.replace("sql", "");
        text = text.replace("json", "");
        text = text.replaceAll("```", "");
        text = text.replaceAll("`", "");
        text = text.replaceAll("\n", "");

        console.log(text);

        text = text.split('[').pop().split(']')[0];
        text = '[' + text + ']';
        console.log(JSON.parse(text));
        let dataF = JSON.parse(text);

        console.log("FINAL DATA FILLED WITH " + JSON.stringify(dataF));

        responseText = dataF;

        const prompt2 = "Given the query " + query + " that returned the following data from the South Brunswick School District in New Jearsy: " + JSON.stringify(dataF) + ", write a paragraph to a South Brunswick School District admin explaining a possible reason for the trend within a local context."
        const result2 = await model1.generateContent(prompt2);
        const response3 = await result2.response;
        let rText = response3.text();

        rText = rText.replaceAll("*", "");
        console.log(rText);

        return {
            graph: responseText,
            text: rText
        };
    }
    

</script>
