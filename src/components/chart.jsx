// import ReactDOM from 'react-dom'
import React from 'react'
// import { mean } from 'lodash'
import * as d3 from 'd3'
import { Spring, animated, config } from 'react-spring'
import './chartStyles.css'

const BASE_WIDTH = 800
const BASE_HEIGHT = 800
const NUM_BARS = 8
const BAR_ANGLE = (2 * Math.PI) / NUM_BARS
const INNER_RADIUS = 150
const MAX_RADIUS = BASE_WIDTH / 2
const DOMAIN = [0.0, 1.0]

export default class Chart extends React.Component {
  state = { flipped: false };

  click = () => {
    this.setState(state => ({ flipped: !state.flipped }));
  }

  calculateTextPosition(index, radius) {
    // Here you need to calculate the position based on the angle and radius
    // This is a placeholder calculation
    let angle = index / NUM_BARS * 2 * Math.PI - 45.15; // Distribute text evenly around the circle
    // console.log(angle);
    // let angle = ((360 / NUM_BARS) * (index - 1));
    const x = Math.cos(angle) * BASE_WIDTH / 2.5;
    const y = Math.sin(angle) * BASE_WIDTH / 2.5;
    return { x, y };
  }

  UNSAFE_componentWillMount() {
    // first build a "layout", which in a d3 context means:
    // a function that takes in some data and gives us
    // drawing instructions - here, in the form of an SVG path
    // commands string
    this.layout = d3
      .arc()
      .startAngle(d => d.i * BAR_ANGLE)
      .endAngle(d => (d.i + 1) * BAR_ANGLE)
      .innerRadius(INNER_RADIUS)

    // we'll use a scale to match values from the domain
    // to a certain range (expressed in pixels)
    this.scale = d3
      .scaleLinear()
      .domain(DOMAIN)
      .range([INNER_RADIUS, MAX_RADIUS])

    //Color Scle to use for values of each bar
    this.colorScale = d3
      .scaleLinear()
      .domain([0, .25, .50, .75, 1.00])
      .range(['#ff3535', '#ff4197', '#d04cff', '#8e37ff', '#800080'])

  }

  componentDidMount() {
    // Delay data flip 
    const DELAY = 400;
    setTimeout(() => {
      this.setState({ flipped: true });
    }, DELAY);
  }

  biggerOrSmaller(originalVal, newVal) {
    if (newVal > originalVal && this.state.flipped) {
      return ' ↑';
    } else if (newVal < originalVal && this.state.flipped) {
      return ' ↓';
    }
    return '';
  }

  wrapText(text, maxCharsPerLine) {
    const words = text.split(/\s+/);  // Split by any whitespace
    const lines = [];
    let currentLine = words[0] || '';

    words.slice(1).forEach(word => {
      if ((currentLine + ' ' + word).length > maxCharsPerLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += ' ' + word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  render() {
    const { flipped } = this.state;
    const dataset = flipped === true ? this.props.dataset2.data : this.props.dataset1.data;
    const labels = flipped === true ? this.props.dataset2.labels : this.props.dataset1.labels;
    // const overallScore = mean(dataset)
    const overallScore = "Attributes";

    return (
      <div>
        <svg onClick={this.click} style={{ width: BASE_WIDTH, height: BASE_HEIGHT }}>
          <g style={{ transform: `translate(${BASE_WIDTH / 2}px, ${BASE_HEIGHT / 2}px)` }}>
            {dataset.map((d, i) => {
              // Compute the outer radius of each bar using the pre-generated scale
              // We must make sure our path always has the same number of points,
              // or else Spring's interpolator will fail - we do that by avoiding
              // having "zero" values render to a bar, ie this radius must always
              // be > to innerRadius.
              const outerRadius = Math.max(INNER_RADIUS + 0.1, this.scale(d))

              // Send the current index as the data, as well
              // as the calculated outerRadius, which is a method of d3.arc
              const path = this.layout({ i, outerRadius })

              // Generate a color for each frame of the animation using the color scale
              const color = this.colorScale(d)

              const targetStyle = {
                path,
                color
              }

              return (
                // Here we use the actual Spring component, which is uses a render prop -see
                // https://reactjs.org/docs/render-props.html
                // Here, we have Spring calculate each property of targetStyle, for each
                // frame of the animation - frameStyle is the resulting "temporary" object,
                // mimicking the properties present in targetStyle.
                // Note the delay argument which we use to stagger the animation of the bars.
                <Spring key={i} native delay={i * 200} to={targetStyle} config={config.slow}>
                  {frameStyle => (
                    <g>
                      <animated.path d={frameStyle.path} fill={frameStyle.color} />
                      <animated.text
                        x={this.calculateTextPosition(i, outerRadius).x}
                        y={this.calculateTextPosition(i, outerRadius).y}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style={{ fontSize: `14px` }}
                      >
                        {this.wrapText(labels[i] + this.biggerOrSmaller(this.props.dataset1.data[i], this.props.dataset2.data[i]), 35).map((line, index) => (
                          <tspan x={this.calculateTextPosition(i, outerRadius).x } dy={index * 16 + (index === 0 ? 0 : 16)} key={index}>
                            {line}
                          </tspan>
                        ))}
                      </animated.text>
                    </g>
                  )}
                </Spring>
              )
            })}
            <circle r={this.scale(1.00)} />
            <circle r={this.scale(.75)} />
            <circle r={this.scale(.50)} />
            <circle r={this.scale(.25)} />
            <text>
              <Spring key="text" to={{ overallScore }}>
                {frameStyle =>
                  // Did I mention Spring can also interpolate text nodes?
                  // overallScore
                  (Math.round(dataset.reduce((partialSum, a) => partialSum + a / (NUM_BARS * DOMAIN[1]), 0) * 100)) + ' / 100'

                }
              </Spring>
            </text>
          </g>
        </svg>
      </div>
    )
  }
}

// const dataset1 = [1, 94, 92, 95, 40, 78, 77, 99, 90, 50, 10, 88, 82, 15, 20, 40, 10, 41, 15, 28, 38, 87, 90, 98, 66]
// const dataset2 = [100, 95, 90, 80, 70, 60, 60, 65, 98, 40, 30, 35, 80, 25, 55, 66, 92, 67, 10, 37, 59, 88, 80, 90, 76]

// ReactDOM.render(<Chart dataset1={dataset1} dataset2={dataset2} />, document.getElementById('root'))
