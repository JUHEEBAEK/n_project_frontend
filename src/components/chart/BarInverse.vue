<template>
  <svg class="barchart" :width="width + marginLeft / 2" :height="height + marginTop">
    <g :transform="`translate(${marginLeft / 2}, ${marginTop / 2})`">
      <g class="x-axis" fill="none" :transform="`translate(0, ${height})`" style="color: #888">
        <path class="domain" stroke="currentColor" :d="`M0.5,6V0.5H${width}.5V6`"></path>
        <g
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="end"
          v-for="(tick, index) in xTicks"
          :key="index"
          :transform="`translate(${x(tick) + 0.5}, 0)`"
        >
          <line stroke="currentColor" y2="-6"></line>
          <text fill="currentColor" y="9" dy="0.71em">{{ tick }}</text>
        </g>
      </g>
      <g class="y-axis" fill="none" :transform="`translate(0, 0)`" style="color: #888">

        <path class="domain" stroke="currentColor" :d="`M0.5,${height}.5H0.5V0.5H-6`"></path>
        <g
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="middle"
          v-for="(bar, index) in bars"
          :key="index"
          :transform="`translate(0, ${bar.y + bar.height / 2})`"
        >
          <line stroke="currentColor" x2="-6"></line>
          <text fill="currentColor" x="-24" dy="0.32em">{{ bar.xLabel }}</text>
        </g>
        
      </g>
      <g class="bars" fill="none">
        <rect
          v-for="(bar, index) in bars"
          fill="#2196f3"
          :key="index"
          :height="bar.height"
          :width="bar.width"
          :x="bar.x"
          :y="bar.y"
        ></rect>
      </g>
    </g>
  </svg>
</template>

<script>
import { scaleLinear, scaleBand } from "d3-scale";

export default {
  name: "BarChart",
  props: {
    height: { default: 500 },
    width: { default: 500 },
    dataSet: { default: [] },
    marginLeft: { default: 40 },
    marginTop: { default: 40 },
    marginBottom: { default: 40 },
    marginRight: { default: 40 },
    tickCount: { default: 5 },
    barPadding: { default: 0.3 }
  },

  computed: {
    xTicks() {
      return this.x.ticks(this.tickCount);
    },
    
    x() {
      let values = this.dataSet.map(e => e[1]);
      return scaleLinear()
        .range([0, this.width])
        .domain([0, Math.max(...values)]);
    },
    y() {
      return scaleBand()
        .range([0, this.height])
        .padding(this.barPadding)
        .domain(this.dataSet.map(e => e[0]));
    },
    bars() {
      let bars = this.dataSet.map(d => {
        return {
          xLabel: d[0],
          y: this.y(d[0]),
          x: 0,
          width: this.x(d[1]),
          height: this.y.bandwidth()
        };
      });

      return bars;
    }
  }
};
</script>

<style></style>
