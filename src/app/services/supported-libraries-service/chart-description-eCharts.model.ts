import {Query, ChartInfo} from '../../chart-creator/chart-query.model';
import type { EChartOption, ECharts, EChartTitleOption } from 'echarts';
import { EChartsSeriesType } from 'echarts/lib/echarts';
import { analyzeAndValidateNgModules } from '@angular/compiler';

export class EChartsChart {
    library: string;
    orderBy: string;
    chartDescription: EChartsDescription;

    constructor() {
        this.library = 'eCharts';
        this.orderBy = 'xaxis';
        this.chartDescription = new EChartsDescription();
    }
}

class EChartsDescription {
    
    title?: EChartTitleOption;
    xAxis?: EChartOption.XAxis;
    yAxis?: EChartOption.YAxis;
    series: EChartOption.Series[];
    backgroundColor?: EChartOption.Color;
    tooltip?: EChartOption.Tooltip;
    dataZoom?: EChartOption.DataZoom[];
    color: string[];

    // not Echarts fields
    toolbox: ECToolbox;
    legend: ECLegend;
    

    queries: Array<ChartInfo> = [];

    constructor() {

        this.title = {} as EChartTitleOption;
        this.yAxis = {} as EChartOption.YAxis;
        this.xAxis = {} as EChartOption.XAxis;
        this.toolbox = new ECToolbox();
        this.legend = new ECLegend();
        this.tooltip = {} as EChartOption.Tooltip;
        this.dataZoom = [
            // Xaxis Zoom options
            { show: false },
            // Yaxis Zoom options
            { show:false, yAxisIndex:0}
        ];
        this.series = [];
    }
}
export class ECToolbox {
    show: boolean;
    right: string | number = 'auto';
    left: string | number = 'auto';
    top: string | number = 'auto';
    bottom: string | number = 'auto';
    feature: ECToolboxFeature;
    constructor() {
        this.show = false;
        this.feature = new ECToolboxFeature();
    }
}

export class ECToolboxFeature {
    saveAsImage: ECToolboxFeatureItem;
    dataView: ECToolboxFeatureItem;
    constructor() {
        this.saveAsImage = new ECToolboxFeatureItem('Save as image');
        this.dataView = new ECToolboxFeatureItem('Data view');
    }
}

export class ECToolboxFeatureItem {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}

export class ECLegend {
    show: boolean = true;
    orient: 'horizontal' | 'vertical' = 'horizontal';
    right: string | number = 'auto';
    left: string | number = 'auto';
    top: string | number = 'auto';
    bottom: string | number = 'auto';
}

