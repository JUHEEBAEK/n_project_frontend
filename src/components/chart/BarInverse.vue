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
          fill="url(#mainGradient)"
          :key="index"
          :height="bar.height"
          :width="bar.width"
          :x="bar.x"
          :y="bar.y"
          @mouseenter="enterEvent(bar)"
          @mouseout="outEvent"
          @click="enterEvent(bar)"
        ></rect>
      </g>
    </g>
    <text ref="tooltip" fill="currentColor" x="-100" y="-100" dx="1.5em" dy="1em"> {{ tooltipContent }}</text>
    <defs>
      <linearGradient id='mainGradient'>
        <stop class='stop-left' offset='0'> </stop>
        <stop class='stop-right' offset='1'> </stop>
      </linearGradient> 
      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="yellow"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "BarChart",
  props: {
    height: { default: 500 },
    width: { default: 500 },
    dataSet: { default: [] },
    marginLeft: { default: 60 },
    marginTop: { default: 40 },
    marginBottom: { default: 40 },
    marginRight: { default: 60 },
    tickCount: { default: 5 },
    barPadding: { default: 0.3 }
  },
  data() {
    return {
      tooltipContent: "툴팁 내용 (마우스 오른쪽 위)",
    }
  },
  computed: {
    xTicks() {
      return this.x.ticks(this.tickCount);
    },
    
    x() {
      let values = this.dataSet.map(e => e[1]);
      return d3.scaleLinear()
        .range([0, this.width])
        .domain([0, Math.max(...values)]);
    },
    y() {
      return d3.scaleBand()
        .range([0, this.height])
        .padding(this.barPadding)
        .domain(this.dataSet.map(e => e[0]));
    },
    bars() {
      let bars = this.dataSet.map(d => {
        return {
          xLabel: d[0],
          value: d[1],
          y: this.y(d[0]),
          x: 0,
          width: this.x(d[1]),
          height: this.y.bandwidth()
        };
      });

      return bars;
    }
  },
  methods: {
    enterEvent(bar){
      let tooltip = d3.select(this.$refs.tooltip)
      tooltip.attr('x', bar.x + bar.width)
      tooltip.attr('y', bar.y)
      tooltip.text(bar.value)
    },
    outEvent(){
      console.log('outEvent')
      let tooltip = d3.select(this.$refs.tooltip)
      tooltip.text('')
    }
  },

};
</script>

<style>
.stop-left {
    stop-color: #3f51b5;  /* Indigo */
}

.stop-right {
    stop-color: #009688;  /* Teal */
}
</style>
