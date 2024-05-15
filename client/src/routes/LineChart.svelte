<script>
  import * as d3 from "d3";
  import { tick } from "svelte";
  import { scaleTime } from 'd3';

  // Receive plot data as prop.
  //export let data;
  let data = [{"Date":"2023-01-05","IncidentID":1},
    {"Date":"2023-04-20","IncidentID":2},
    {"Date":"2023-09-15","IncidentID":5},
    {"Date":"2024-01-25","IncidentID":8},
    {"Date":"2024-03-15","IncidentID":10},];
  let data1 = [{"Date":"2023-01-01","IncidentID":3},
    {"Date":"2023-01-15","IncidentID":6},
    {"Date":"2023-02-10","IncidentID":10},
    {"Date":"2023-03-05","IncidentID":14},
    {"Date":"2023-03-20","IncidentID":17},
    {"Date":"2023-05-01","IncidentID":21},
    {"Date":"2023-06-10","IncidentID":25},
    {"Date":"2023-07-01","IncidentID":30},
    {"Date":"2023-08-15","IncidentID":35},
    {"Date":"2023-10-01","IncidentID":40},
    {"Date":"2023-11-20","IncidentID":45},
    {"Date":"2024-01-01","IncidentID":50},
    {"Date":"2024-02-10","IncidentID":55},
    {"Date":"2024-03-20","IncidentID":60},];
  let data2 = [{"Date":"2023-02-01","IncidentID":2},
    {"Date":"2023-05-15","IncidentID":4},
    {"Date":"2023-08-20","IncidentID":6},
    {"Date":"2023-11-25","IncidentID":8},
    {"Date":"2024-02-28","IncidentID":10},];
  let data3 = [{"Date":"2023-01-10","IncidentID":5},
    {"Date":"2023-02-01","IncidentID":12},
    {"Date":"2023-03-01","IncidentID":18},
    {"Date":"2023-04-01","IncidentID":25},
    {"Date":"2023-05-01","IncidentID":30},
    {"Date":"2023-06-01","IncidentID":35},
    {"Date":"2023-07-01","IncidentID":40},
    {"Date":"2023-08-01","IncidentID":45},
    {"Date":"2023-09-01","IncidentID":50},
    {"Date":"2023-10-01","IncidentID":55},
    {"Date":"2023-11-01","IncidentID":60},
    {"Date":"2023-12-01","IncidentID":65},
    {"Date":"2024-01-01","IncidentID":70},
    {"Date":"2024-02-01","IncidentID":75},
    {"Date":"2024-03-01","IncidentID":80},];
  let data4 = [{"Date":"2023-01-15","IncidentID":3},
    {"Date":"2023-05-20","IncidentID":6},
    {"Date":"2023-09-25","IncidentID":9},
    {"Date":"2024-01-10","IncidentID":12},
    {"Date":"2024-03-05","IncidentID":15},];
  let data5 = [{"Date":"2023-01-01","IncidentID":1},
    {"Date":"2023-02-05","IncidentID":7},
    {"Date":"2023-03-10","IncidentID":15},
    {"Date":"2023-04-15","IncidentID":22},
    {"Date":"2023-05-20","IncidentID":30},
    {"Date":"2023-06-25","IncidentID":40},
    {"Date":"2023-07-30","IncidentID":50},
    {"Date":"2023-09-04","IncidentID":60},
    {"Date":"2023-10-09","IncidentID":70},
    {"Date":"2023-11-14","IncidentID":80},
    {"Date":"2023-12-19","IncidentID":90},
    {"Date":"2024-01-24","IncidentID":100},
    {"Date":"2024-03-01","IncidentID":110},];
  let data6 = [{"Date":"2023-03-01","IncidentID":4},
    {"Date":"2023-06-15","IncidentID":8},
    {"Date":"2023-09-20","IncidentID":12},
    {"Date":"2023-12-25","IncidentID":16},
    {"Date":"2024-03-10","IncidentID":20},];
  let data7 = [{"Date":"2023-01-01","IncidentID":5},
    {"Date":"2023-01-20","IncidentID":10},
    {"Date":"2023-02-10","IncidentID":18},
    {"Date":"2023-03-01","IncidentID":25},
    {"Date":"2023-03-20","IncidentID":35},
    {"Date":"2023-04-15","IncidentID":45},
    {"Date":"2023-05-10","IncidentID":55},
    {"Date":"2023-06-05","IncidentID":65},
    {"Date":"2023-07-01","IncidentID":75},
    {"Date":"2023-08-01","IncidentID":85},
    {"Date":"2023-09-01","IncidentID":95},
    {"Date":"2023-10-01","IncidentID":105},
    {"Date":"2023-11-01","IncidentID":115},
    {"Date":"2023-12-01","IncidentID":125},
    {"Date":"2024-01-01","IncidentID":135},
    {"Date":"2024-02-01","IncidentID":145},
    {"Date":"2024-03-01","IncidentID":155}];

  // The chart dimensions and margins as optional props.
  export let width = 1000;
  export let height = 600;
  export let marginTop = 50;
  export let marginRight = 30;
  export let marginBottom = 30;
  export let marginLeft = 40;

  // Create the x (horizontal position) scale.

  const startDate = new Date('2023-01-01');
  const endDate = new Date('2024-04-20');

  const xRange = [marginLeft, width - marginRight];
  const yRange = [height - marginBottom, marginTop * 2];

  const xScale = scaleTime()
    .domain([startDate, endDate])
    .range(xRange);
  /*
  const xScale = d3.scaleUtc(
    d3.extent(data, (d) => new Date(d.Date)),
    [marginLeft, width - marginRight]
  );

  */

  // Create the y (vertical position) scale.
  const yScale = d3.scaleLinear(
    [0, d3.max(data7, (d) => d.IncidentID)],
    //[0, 25],
    [height - marginBottom, marginTop]
  );

  // Create the line generator.
  const line = d3
    .line()
    .x((d) => xScale(new Date(d.Date)))
    .y((d) => yScale(d.IncidentID));


  let mouseX = 10;
  let hoverData = null;

  // Function to handle mouse movement
  function handleMouseMove(event) {
    mouseX = event.clientX - 450;
    const date = xScale.invert(mouseX - marginLeft);

    const yValue = yScale.invert(event.clientY - marginTop);


    hoverData = {date: date};
  }
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:width="100%"
  style:margin-left="15%"
  style:height="auto"
  on:mousemove={handleMouseMove}
  role="img"
>
  <!-- Vertical Line -->
  <line
    stroke="red"
    stroke-width="1"
    x1={mouseX}
    y1={marginTop}
    x2={mouseX}
    y2={height - marginBottom}
  />

  {#if hoverData !== null}
    <g transform="translate({mouseX + 10}, {marginTop + 10})">
      <text fill="black">Date: {hoverData.date.toLocaleDateString()}</text>
    </g>
  {/if}

  <!-- X-Axis -->
  <g transform="translate(0,{height - marginBottom})">
    <line stroke="currentColor" x1={marginLeft - 6} x2={width} />

    {#each xScale.ticks() as tick}
      <!-- X-Axis Ticks -->
      <line
        stroke="currentColor"
        x1={xScale(tick)}
        x2={xScale(tick)}
        y1={0}
        y2={6}
      />

      <!-- X-Axis Tick Labels -->
      <text fill="currentColor" text-anchor="middle" x={xScale(tick)} y={22}>
        {tick.getMonth() + "-" + tick.getFullYear()}
      </text>
    {/each}
  </g>

  <!-- Y-Axis and Grid Lines -->
  <g transform="translate({marginLeft},0)">
    {#each yScale.ticks() as tick}
      {#if tick !== 0}
        <!-- 
          Grid Lines. 
          Note: First line is skipped since the x-axis is already present at 0. 
        -->
        <line
          stroke="currentColor"
          stroke-opacity="0.1"
          x1={0}
          x2={width - marginLeft}
          y1={yScale(tick)}
          y2={yScale(tick)}
        />

        <!-- 
          Y-Axis Ticks. 
          Note: First tick is skipped since the x-axis already acts as a tick. 
        -->
        <line
          stroke="currentColor"
          x1={0}
          x2={-6}
          y1={yScale(tick)}
          y2={yScale(tick)}
        />


      {/if}

      <!-- Y-Axis Tick Labels -->
      <text
        fill="currentColor"
        text-anchor="end"
        dominant-baseline="middle"
        x={-9}
        y={yScale(tick)}
      >
        {tick}
      </text>
    {/each}

    <!-- Y-Axis Label -->
    <text fill="currentColor" text-anchor="start" x={-marginLeft} y={marginTop-15}>
      ↑ Incidents
    </text>
  </g>

  <path fill="none" stroke="green" stroke-width="1.5" d={line(data)} />
  <path fill="none" stroke="red" stroke-width="1.5" d={line(data1)} />
  <path fill="none" stroke="orange" stroke-width="1.5" d={line(data2)} />
  <path fill="none" stroke="pink" stroke-width="1.5" d={line(data3)} />
  <path fill="none" stroke="pink" stroke-width="1.5" d={line(data4)} />
  <path fill="none" stroke="pink" stroke-width="1.5" d={line(data5)} />
  <path fill="none" stroke="pink" stroke-width="1.5" d={line(data6)} />
  <path fill="none" stroke="pink" stroke-width="1.5" d={line(data7)} />
</svg>
