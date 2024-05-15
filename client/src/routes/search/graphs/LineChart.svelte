<script>
  import * as d3 from "d3";
  import { tick } from "svelte";
  import { scaleTime } from 'd3';

  // Receive plot data as prop.
  export let data;
  
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
