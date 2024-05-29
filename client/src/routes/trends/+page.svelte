trendss

<script>


let data3 = [{"name":"Asian","value":9},{"name":"White","value":3},{"name":"Black","value":2}];
let chartData = [];
const dataBasePromptText = "return the race of all students with more than 10 absences"
const whatGraphYouWant = "dounut chart"

const APIKEY = "AIzaSyB5RcABqORxMeiTvbt4IETFLPM9hEqQNvQ"
import {GoogleGenerativeAI} from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(APIKEY);



const project = 'stuvis';
//const location = '/Users/aryan/Documents/GitHub/StuVis';
import aiplatform from '@google-cloud/aiplatform';

import { SystemDeleteTransaction, TokenCreateTransaction } from '@hashgraph/sdk';

import data2 from "/Users/aryan/Documents/GitHub/StuVis/client/src/routes/components/data.json";
let data;

//chartData = data2;


//import BarChart from "/Users/aryan/Documents/GitHub/StuVis/client/src/routes/components/BarChart.svelte";
import PieChart from './PieChart.svelte';
let barChartComponent;

let finalData

import 'svelte';

import { beforeUpdate, onMount } from 'svelte';


let responseText = "NO RESPONSE YET";
let toCleanText = [];


async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

  
  const prompt = "Given a database with a table named Student with the following columns, ALL OF WHICH SHOULD BE ESCAPED WITH SQUARE BRACKETS, DO NOT MAKE UP YOUR OWN columns, return ONLY a SQLITE query that is all on one line to " + dataBasePromptText + " in a way where the data can be directly put in a " + whatGraphYouWant + " SchoolYear StudentID LastName FirstName EnrollmentStatus SchoolCode GradeLevel CurrentProgramTypeCode CalculatedRace EthnicityPrimaryCode EthnicityPrimary EthnicityStateCodes RaceCodesAsString RaceHispanic RaceAmericanIndian RaceAsian RaceBlack RacePacific RaceWhite FreeOrReducedLunch EconomicallyDisadvantaged GiftedTalented BasicSkillProgramCodesAsString ELL:IsActive ELL:LEPCode ELL:FormerELL ELL:ParentRefused ELL:LEPStartDate ELL:LEPExitDate SE:HasActiveIEP SE:HasActiveIEPOrRelatedService SE:HasActiveRelatedService SE:SpecialEdFlag SE:SelfContained SE:SpecEdStatus SE:SpecEdStatusCode SE:HasReferralInProcess Residential:Area/Neighborhood Residential:StreetName Activity:ParticipatedinSport Activity:ParticipatedinClub Conduct:HasDetentions Conduct:HasSuspensions Conduct:HasISSSuspensions Conduct:HasOSSSuspensions Conduct:HasOtherActions Grades:OnD/FList(FG) Att:Has09DayAbsLtr Att:Has15DayAbsLtr Att:Has04DayUxAbsLtr Att:Has08DayUxAbsLtr Att:Has10DayUxAbsLtr (Most of the previous were stored at 'Y' or 'N')";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  /*
  const properlyFormat = await model.generateContent("Properly format the following SQL query so that I can call an API with it : " + text);
  const properlyFormatResponse = await properlyFormat.response;
  text = properlyFormatResponse.text();
  console.log(text);
  */

  text = text.replace("sql", "");
  text = text.replaceAll("```", "");
  text = text.replaceAll("`", "");
  text = text.replaceAll("\n", "");
  responseText = text;
  console.log(text);
}


async function cleanUp()
{
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});

  const prompt = "Format the following JSON object so it can be directly put in a D3.js " + whatGraphYouWant +". Return ONLY a JSON Object : " + JSON.stringify(toCleanText);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  text = text.split('[').pop().split(']')[0];
  text = '[' + text + ']';
  console.log(JSON.parse(text));
  data = JSON.parse(text);
  chartData = data;
  finalData = data

  console.log("FINAL DATA FILLED WITH " + finalData);
  
  //CREATE COMPONENT HERE

  
  
}

async function myAPICall()
{
    responseText = responseText.replaceAll(' ', '+');   
    console.log("http://127.0.0.1:3000/api?call=" + responseText);
    const response = (await fetch('http://127.0.0.1:3000/api?call=' + responseText));
    const items = await response.json();
    
    console.log(items);
    toCleanText = items;
}


//let data3 = [{"name":"Asian","value":9},{"name":"White","value":3},{"name":"Black","value":2}];
let inty = 0;

async function fetchData() {
	try {

    chartData = data3;
    inty++;
    await run().then(async () => {
      inty++;
      await myAPICall().then(async () => 
      {
        inty++;
        await cleanUp();
        console.log("HERE REACHED" + chartData);
        inty++;
        

      });
    }
    );

    inty++;
    console.log("THIS IS INTY'S VALUE " + inty);

    
    
    
    //await cleanUp(items);

    console.log("END REACHED" + chartData);

    /*
    $once(() => {
      const chart = new BarChart({
        target: window.document.body,
        props: {
          data: chartData
        }
      });
    });

    */
    return;
    //chartData = items;    
    //return chartData;
    
		
	} catch (error) {
		console.log(error);
	}

  


}

//fetchData();



fetchData();

beforeUpdate(() =>
{
  console.log("Starting wait")
  setTimeout(10000);
  console.log("DID THIS WORK??")
});


/* 
fetchData().then(onMount(() =>
{
  new BarChart({
    target: document.body,
    props:
    {
      data:chartData
    }
  })
}));

*/





/*
onMount(async() => {
  console.log("HIIII");
  await await await await await await await await await await await await await await await await await await await await await await await await await await await await await await await await fetchData();

  setTimeout(() => {
    const chart = new BarChart({
    target: window.document.body,
    props:{
      data:chartData
    }
    })
  }, 10000);
  
});

*/


//onMount(fetchData());
//fetchData();

/*
let showChart = false;
setTimeout(() =>
{
  chartData = data;
  console.log("ChartData is + \n: " + JSON.stringify(data))
  showChart = true;
  console.log("NOW SHOWING");

}, 15000)
*/


/*
fetchData().then(() => {
  const chart = new BarChart({
    target: window.document.body,
    props:{
      data:chartData
    }
    })
  }, 10000);

  */


  import BarChart from "/Users/aryan/Documents/GitHub/StuVis/client/src/routes/components/BarChart.svelte";
    import { randomUniform } from 'd3';
    import { ConsoleMessage } from 'puppeteer';
  //fetchData();
  let showChart = false;

  function updateChart()
  {
    inty+=100;
    showChart = true;
  }


</script>




<button on:click={() => updateChart()}>Update Chart</button>

{#if showChart}
  <p>HIIIII</p>
  <p>{inty}</p>
  <!--
  <BarChart data={finalData}></BarChart>
  -->
{/if}


<!--
{#if inty == 5}
	<p>Success</p>
{:else}
	<p>{inty} is between 0 and 5</p>
{/if}

-->

<!--

{#await fetchData()}
  <p>Hiii???</p>
  <BarChart data={chartData}></BarChart>
{/await}

-->



<div>
  <p>Shit Should Follow</p>
</div>





