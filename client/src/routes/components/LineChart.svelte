<script>
  import * as d3 from "d3";
  import { tick } from "svelte";
  import { scaleTime } from 'd3';

  // Receive plot data as prop.
  export let data;
  let data2 = [{"Date":"2023-01-10","IncidentID":1},{"Date":"2023-03-23","IncidentID":2},{"Date":"2023-05-27","IncidentID":2},{"Date":"2023-06-21","IncidentID":3},{"Date":"2023-06-25","IncidentID":4},{"Date":"2023-07-02","IncidentID":5},{"Date":"2023-07-22","IncidentID":6},{"Date":"2023-08-07","IncidentID":7},{"Date":"2023-08-22","IncidentID":8},{"Date":"2023-09-12","IncidentID":9},{"Date":"2023-09-30","IncidentID":10},{"Date":"2023-10-13","IncidentID":11},{"Date":"2023-10-31","IncidentID":12},{"Date":"2023-11-17","IncidentID":13},{"Date":"2023-12-05","IncidentID":14},{"Date":"2023-12-26","IncidentID":15},{"Date":"2024-01-08","IncidentID":16},{"Date":"2024-01-25","IncidentID":17},{"Date":"2024-02-08","IncidentID":18},{"Date":"2024-02-29","IncidentID":19},{"Date":"2024-03-16","IncidentID":20},{"Date":"2024-04-01","IncidentID":21},{"Date":"2024-04-20","IncidentID":22}];
  let data3 = [{"Date":"2023-04-23","IncidentID":1},{"Date":"2023-05-24","IncidentID":2},{"Date":"2023-06-05","IncidentID":3},{"Date":"2023-06-15","IncidentID":4},{"Date":"2023-07-08","IncidentID":5},{"Date":"2023-07-18","IncidentID":6},{"Date":"2023-07-27","IncidentID":7},{"Date":"2023-08-03","IncidentID":8},{"Date":"2023-08-12","IncidentID":9},{"Date":"2023-09-02","IncidentID":10},{"Date":"2023-09-22","IncidentID":11},{"Date":"2023-10-06","IncidentID":12},{"Date":"2023-10-23","IncidentID":13},{"Date":"2023-11-10","IncidentID":14},{"Date":"2023-11-27","IncidentID":15},{"Date":"2023-12-15","IncidentID":16},{"Date":"2024-01-01","IncidentID":17},{"Date":"2024-01-18","IncidentID":18},{"Date":"2024-02-01","IncidentID":19},{"Date":"2024-02-18","IncidentID":20},{"Date":"2024-03-09","IncidentID":21},{"Date":"2024-03-25","IncidentID":22},{"Date":"2024-04-10","IncidentID":23},{"Date":"2024-04-29","IncidentID":24}];
  let data4 = [{"Date":"2023-04-10","IncidentID":1},{"Date":"2023-05-23","IncidentID":2}];
  let data5 = [{"Date":"2023-06-01","IncidentID":1},{"Date":"2023-06-30","IncidentID":2},{"Date":"2023-08-19","IncidentID":3},{"Date":"2023-09-05","IncidentID":4}];

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
    [0, d3.max(data, (d) => d.IncidentID)],
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
    mouseX = event.clientX;
    const date = xScale.invert(mouseX - marginLeft);

    const yValue = yScale.invert(event.clientY - marginTop);


    hoverData = {date: date};
  }
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
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

  <path fill="none" stroke="steelblue" stroke-width="1.5" d={line(data)}/>
  <path fill="none" stroke="green" stroke-width="1.5" d={line(data2)} />
  <path fill="none" stroke="red" stroke-width="1.5" d={line(data3)} />
  <path fill="none" stroke="orange" stroke-width="1.5" d={line(data4)} />
  <path fill="none" stroke="pink" stroke-width="1.5" d={line(data5)} />
</svg>
