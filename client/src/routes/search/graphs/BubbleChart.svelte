<script>
    import { InternSet, hierarchy, pack, range, scaleOrdinal, schemeTableau10 } from 'd3';
    export let data;
    
    const width = 1079;
    const padding = 3;
    const margin = 1;
    const textColor = 'black';
    const fill = '#ccc';
    const fillOpacity = 0.9;
    const strokeColor = 'none';
    const strokeWidth = 1;
    const strokeOpacity = 1;
    const height = width;
    const marginLeft = margin;
    const marginRight = margin;
    const marginTop = margin;
    const marginBottom = margin;


    const x = Object.keys(data[0])[0];
    const y = Object.keys(data[0])[1];
    // Compute the values.
    const dVals = data.map((el) => el);
    const vVals = data.map((el) => el[y]);
    const gVals = data.map((el) => el[x]);
    const iVals = range(vVals.length).filter(i => vVals[i] > 0);

    let groups = iVals.map(i => gVals[i]);
    groups = new InternSet(groups);

    const colorScale = scaleOrdinal(groups, schemeTableau10);  

    // Compute labels.
    const lVals = data.map((el) => `${el[x]}\n${el[y].toLocaleString('en')}`);
    const tVals = data.map((el) => `${el[x]}\n${el[y].toLocaleString('en')}`);

    const uid = `O-${Math.random().toString(16).slice(2)}`;

    const root = pack()
        .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
        .padding(padding)
        (hierarchy({children: iVals})
            .sum(i => vVals[i]));
</script>
  
<svg {width} {height} viewBox="{-marginLeft} {-marginTop} {width} {height}" fill={textColor}>
    {#each root.leaves() as leaf, i}
        <g class='node' transform="translate({(leaf.x)},{(leaf.y)})">
            <circle id="node-{i}"
                stroke={strokeColor} stroke-width={strokeWidth} stroke-opacity={strokeOpacity}
                fill={gVals ? colorScale(gVals[leaf.data]) : fill == null ? 'none' : fill}
                fill-opacity={fillOpacity}
                r={leaf.r}
            >
                <title>{tVals[i]}</title>
            </circle>
            <clipPath id={`${uid}-clip-${leaf.data}`}>
                <circle r={leaf.r}></circle>
            </clipPath>
            <text clip-path={`url(${new URL(`#${uid}-clip-${leaf.data}`, location)})`}>
                {#each `${lVals[leaf.data]}`.split(/\n/g) as subtext, j}
                    <tspan 
                        x='0'  
                        y={`${j - `${lVals[leaf.data]}`.split(/\n/g).length / 2 + 0.85}em`}
                        fill-opacity={j === `${lVals[leaf.data]}`.split(/\n/g).length - 1 ? 0.7 : null}
                        font-size={leaf.r * 0.3}
                    >
                        {subtext}
                    </tspan>
                {/each}
            </text>
        </g>
    {/each}
</svg>
  
<style>
    svg {
        max-width: 100%;
        height: auto;
        height: intrinsic;
        font-size: 10;
        font-family: sans-serif;
        text-anchor: middle;
    }

    .node {
        cursor: pointer;
    }

    .node:hover text {
        font-weight: 700;
    }
</style>
