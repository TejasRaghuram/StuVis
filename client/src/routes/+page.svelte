<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<script>    


import data2 from "./components/data.json";
import dataPie from "./components/dataPie.json"
import lineChartData from "./components/lcd.json"
import data3 from "./components/IncidentSchoolName.json"
import LineChart from "./components/LineChart.svelte";
import BarChart from "./components/BarChart.svelte";


var barChartData = data2;


async function fetchData() {
	try {
		const response = await fetch('http://localhost:3000/api?call=SELECT+SchoolName,+IncidentID+From+Incidents');
		const items = await response.json();
		console.log(items);
		return items;
	} catch (error) {
		
	}
	

}

//$: barChartData = fetchData();




//$: barChartData = fetchData();


</script>





<LineChart data = {lineChartData}/>
<BarChart data={barChartData} />


