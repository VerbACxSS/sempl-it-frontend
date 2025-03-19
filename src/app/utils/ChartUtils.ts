import {EChartsOption} from "echarts";
import * as echarts from "echarts/core";
import {BarChart, GaugeChart} from "echarts/charts";
import {GridComponent, LegendComponent, TooltipComponent} from "echarts/components";
import {CanvasRenderer} from "echarts/renderers";
echarts.use([BarChart, GaugeChart, LegendComponent, TooltipComponent, GridComponent, CanvasRenderer])


export class ChartUtils {
  static defaultPosChart(): EChartsOption {
    return {
      responsive: true,
      maintainAspectRatio: false,
      xAxis: {
        type: 'category',
        data: ['Nomi', 'Verbi', 'Aggettivi', 'Pronomi', 'Articoli', 'Avverbi', 'Prep.', 'Cong.', 'Altro']
      },
      yAxis: {
        type: 'value'
      },
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
    };
  }

  static defaultGulpeaseChart(): EChartsOption {
    const gulpeaseColors = [
      [0.35, '#FF0000'],
      [0.50, '#FF5500'],
      [0.60, '#FFAA00'],
      [0.80, '#80FF00'],
      [1.00, '#00FF00']
    ];
    return ChartUtils.defaultGaugeChart(gulpeaseColors);
  }

  static defaultFleschChart(): EChartsOption {
    const fleschColors = [
      [0.3, '#FF0000'],
      [0.4, '#FF3900'],
      [0.6, '#FF7100'],
      [0.7, '#FFAA00'],
      [0.8, '#AAFF00'],
      [0.9, '#55FF00'],
      [1.00, '#00FF00']
    ];
    return ChartUtils.defaultGaugeChart(fleschColors);
  }

  static defaultGaugeChart(colors: any[]): EChartsOption {
    return {
      series: [
        {
          type: 'gauge',
          radius: '100%',
          min: 0,
          max: 100,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              width: 30,
              color: colors
            }
          },
          pointer: {
            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
            length: '70%',
            width: 8,
            offsetCenter: [0, '8%'],
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },
          axisLabel: {
            color: 'inherit',
            distance: 40,
            fontSize: 20
          },
          title: {
            color: '#fff',
            padding: 5,
            borderRadius: 10,
          },
          detail: {
            valueAnimation: true,
            fontSize: 15,
            color: '#fff',
            backgroundColor: 'inherit',
            borderRadius: 10,
            padding: 0,
          }
        }
      ]
    };
  }
}
