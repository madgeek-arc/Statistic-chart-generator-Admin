import { Query, ChartInfo } from '../../chart-creator/chart-query.model';

export class HighChartsChart {
    library: string;
    orderBy: string;
    chartDescription: HighChartsDescription;

    constructor() {
        this.library = 'HighCharts';
        this.orderBy = 'xaxis';
        this.chartDescription = new HighChartsDescription();
    }
}

class HighChartsDescription {
    chart: HCchart;
    title: HCtitle;
    subtitle: HCsubtitle;
    yAxis: HCaxis;
    xAxis: HCaxis;
    queries: Array<ChartInfo> = [];
    lang: HCLang;
    exporting: HCExporting;
    plotOptions: HCPlotOptions;
    legend: HCLegend;
    credits: HCCredits;
    colors: string[] = ['#7cb5ec'];

    constructor() {
        this.chart = new HCchart();
        this.title = new HCtitle();
        this.subtitle = new HCsubtitle();
        this.yAxis = new HCaxis();
        this.xAxis = new HCaxis();
        this.lang = new HCLang();
        this.exporting = new HCExporting();
        this.plotOptions = new HCPlotOptions();
        this.legend = new HCLegend();
        this.credits = new HCCredits();
    }
}

class HCchart {
    /* In TypeScript this option has no effect in sense of typing and instead the type option must always be set in the series. 
     https://api.highcharts.com/highcharts/chart.type */
    type: string = 'line';
    backgroundColor: string = '#ffffff';
    borderColor: string = '#335cad';
    borderRadius: number = 0;
    borderWidth: number = 0;

    plotBackgroundImage: string | undefined;
    plotBackgroundColor: string | undefined;
    plotBorderColor: string = '#cccccc';
    plotBorderWidth: number = 0;
}
export class HCsubtitle {
    text: string | undefined;
}
export class HCtitle {
    text: string | undefined;
}
class HCaxis {
    title: HCtitle;

    constructor() {
        this.title = new HCtitle();
    }
}
class HCLang {
    noData = 'No Data available for the Query';
}

export class HCExporting {
    enabled: boolean;
    constructor() {
        this.enabled = false;
    }
}

export class HCLegend {
    enabled: boolean | undefined;
    layout: 'horizontal'|'vertical'|'proximate' = 'horizontal';
    align: 'left' | 'center' | 'right' = 'center';
    verticalAlign: 'bottom' | 'top' | 'middle' = 'bottom';
}

class HCPlotOptions {
    series: HCPlotOptionsSeries;
    constructor() {
        this.series = new HCPlotOptionsSeries();
    }
}

class HCPlotOptionsSeries {
    dataLabels: HCDataLabels;
    stacking: undefined | 'normal' | 'percent' | 'stream' | 'overlap';
    constructor() {
        this.dataLabels = new HCDataLabels();
        this.stacking = undefined;
    }
}

export class HCDataLabels {
    enabled: boolean = false;
    format: string | undefined = undefined;
}

export class HCCredits {
    enabled: boolean = true;
    text: string | null = null;
    href: string | null = null;
}
