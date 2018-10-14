import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts/lib/ngx-echarts.directive';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() myGraph;
  public optionAsso: any;
  public optionDT: any;
  public optionAssoBar: any;
  public optionDTBar: any;
  private graphDT;
  private graphASSO;

  public showPie: boolean;
  public showBar: boolean;

  constructor() {

  }
  ngOnInit() {
    this.openPie();

    console.log('Graph Data', this.myGraph);
    this.graphDT = this.myGraph.graphDT;
    this.graphASSO = this.myGraph.graphASSO;

    this.createOptionDT();
    this.createOptionASSO();
    this.createOptionAssoBar();
    this.createOptionDTBar();
  }

  openPie() {
    this.showPie = true;
    this.showBar = false;
  }

  openBar() {
    this.showPie = false;
    this.showBar = true;
  }
  createOptionDT() {
    this.optionAsso = {
      color: ['#b700e5', '#411fba', '#008bcc', '#00cc6c', '#61ea00', '#eaab00', '#ea6900', '#ea2300', '#a34900', '#f2e200', '#9e9e9e'],
      tooltip: {
        trigger: 'item',
        formatter: 'Grade {b} : {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'left',
        data: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'U', 'S', 'N/A'],
        textStyle: {
          color: '#a30000',
        },
      },
      series: [
        {
          name: 'Grade',
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: [
            { value: this.graphASSO[7], name: 'A' },
            { value: this.graphASSO[6], name: 'B+' },
            { value: this.graphASSO[5], name: 'B' },
            { value: this.graphASSO[4], name: 'C+' },
            { value: this.graphASSO[3], name: 'C' },
            { value: this.graphASSO[2], name: 'D+' },
            { value: this.graphASSO[1], name: 'D' },
            { value: this.graphASSO[0], name: 'F' },
            { value: this.graphASSO[9], name: 'U' },
            { value: this.graphASSO[10], name: 'S' },
            { value: this.graphASSO[8], name: 'N/A' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: '#353535'
            },
          },
          label: {
            normal: {
              textStyle: {
                color: '#9e9e9e',
              },
            },
          },
        },
      ],
    };
  }

  createOptionASSO() {
    this.optionDT = {
      color: ['#b700e5', '#411fba', '#008bcc', '#00cc6c', '#61ea00', '#eaab00', '#ea6900', '#ea2300', '#a34900', '#f2e200', '#9e9e9e'],
      tooltip: {
        trigger: 'item',
        formatter: 'Grade {b} : {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'left',
        data: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'U', 'S', 'N/A'],
        textStyle: {
          color: '#a30000',
        },
      },
      series: [
        {
          name: 'Grade',
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: [
            { value: this.graphDT[7], name: 'A' },
            { value: this.graphDT[6], name: 'B+' },
            { value: this.graphDT[5], name: 'B' },
            { value: this.graphDT[4], name: 'C+' },
            { value: this.graphDT[3], name: 'C' },
            { value: this.graphDT[2], name: 'D+' },
            { value: this.graphDT[1], name: 'D' },
            { value: this.graphDT[0], name: 'F' },
            { value: this.graphDT[9], name: 'U' },
            { value: this.graphDT[10], name: 'S' },
            { value: this.graphDT[8], name: 'N/A' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: '#353535'
            },
          },
          label: {
            normal: {
              textStyle: {
                color: '#9e9e9e',
              },
            },
          },
        },
      ],
    };
  }

  createOptionAssoBar() {
    this.optionAssoBar = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'U', 'S', 'N/A'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            textStyle: {
              color: '#9e9e9e',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#6b6b6b',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#ededed',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#4d338e',
            },
          },
        },
      ],
      series: [
        {
          name: 'Person',
          type: 'bar',
          barWidth: '50%',
          data: [
            { value: this.graphASSO[7], itemStyle: { color: '#b700e5' } },
            { value: this.graphASSO[6], itemStyle: { color: '#411fba' } },
            { value: this.graphASSO[5], itemStyle: { color: '#008bcc' } },
            { value: this.graphASSO[4], itemStyle: { color: '#00cc6c' } },
            { value: this.graphASSO[3], itemStyle: { color: '#61ea00' } },
            { value: this.graphASSO[2], itemStyle: { color: '#eaab00' } },
            { value: this.graphASSO[1], itemStyle: { color: '#ea6900' } },
            { value: this.graphASSO[0], itemStyle: { color: '#ea2300' } },
            { value: this.graphASSO[9], itemStyle: { color: '#a34900' } },
            { value: this.graphASSO[10], itemStyle: { color: '#f2e200' } },
            { value: this.graphASSO[8], itemStyle: { color: '#9e9e9e' } },
          ],
        },
      ],



    };
  }

  createOptionDTBar() {
    this.optionDTBar = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'U', 'S', 'N/A'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            textStyle: {
              color: '#9e9e9e',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#6b6b6b',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#ededed',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#4d338e',
            },
          },
        },
      ],
      series: [
        {
          name: 'Person',
          type: 'bar',
          barWidth: '50%',
          data: [
            { value: this.graphDT[7], itemStyle: { color: '#b700e5' } },
            { value: this.graphDT[6], itemStyle: { color: '#411fba' } },
            { value: this.graphDT[5], itemStyle: { color: '#008bcc' } },
            { value: this.graphDT[4], itemStyle: { color: '#00cc6c' } },
            { value: this.graphDT[3], itemStyle: { color: '#61ea00' } },
            { value: this.graphDT[2], itemStyle: { color: '#eaab00' } },
            { value: this.graphDT[1], itemStyle: { color: '#ea6900' } },
            { value: this.graphDT[0], itemStyle: { color: '#ea2300' } },
            { value: this.graphDT[9], itemStyle: { color: '#a34900' } },
            { value: this.graphDT[10], itemStyle: { color: '#f2e200' } },
            { value: this.graphDT[8], itemStyle: { color: '#9e9e9e' } },
          ],
        },
      ],



    };
  }
}
