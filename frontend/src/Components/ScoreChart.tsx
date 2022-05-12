import React, { Component } from "react";
import Chart from "react-apexcharts";

class ScoreChart extends Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
        optionsRadial: {
            plotOptions: {
            radialBar: { 
                startAngle: 0,
                endAngle: 360,
                hollow: { // 원 내 디자인
                margin: 0,
                size: "80%",
                background: "#fff",
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                }
                },
                track: {    // 원 테두리
                background: "#fff",
                strokeWidth: "87%",
                margin: 0, // margin is in pixels
                dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.5
                }
                },
                dataLabels: { // 데이터 라벨 (점수 이름, 점수)
                showOn: "always",
                name: { // 점수 이름
                    offsetY: -20,
                    show: true,
                    color: "#888",
                    fontSize: "15px"
                },
                value: { // 점수
                    formatter: function (val : any) {
                    return val;
                    },
                    color: "#111",
                    fontSize: "35px",
                    show: true
                }
                }
            }
            },
            fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#ABE5a1"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
            },
            stroke: {
            lineCap: "round"
            },
            labels: ["Score"]
        },
        seriesRadial: [76]
        };
    }
    render() {
      return (
            <div className="app">
                <div className="row">
                    <div className="col radial-chart">
                    <Chart
                        options={this.state.optionsRadial}
                        series={this.state.seriesRadial}
                        type="radialBar"
                        width="280"
                    />
                    </div>
                </div>
            </div>
      );
    }
}
export default ScoreChart;
