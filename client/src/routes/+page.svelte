<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<script>    
  import data from "./components/data.json";
  import icsd from "./components/IncidentSchoolName.json"
  import LineChart from "./components/LineChart.svelte";
  import BarChart from "./components/BarChart.svelte";
</script>





<LineChart {data} />
<BarChart {data} />