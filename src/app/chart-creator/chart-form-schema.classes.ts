// Classes derived from the chart-form-schema.model

export interface SCGAFormSchema {
    view: ViewFormSchema;
    category: CategoryFormSchema;
    dataseries: DataseriesFormSchema[];
    appearance: AppearanceFormSchema;
}
export interface ViewFormSchema {
    profile: string;
}
export interface CategoryFormSchema {
    categoryType: string;
}
export interface DataseriesFormSchema {
    data: DataFormSchema;
    chartProperties: ChartPropertiesFormSchema;
}
export interface DataFormSchema {
    yaxisData: YaxisDataFormSchema;
    xaxisData: XaxisDataFormSchema[];
    filters: FilterFormSchema[];
}
export interface YaxisDataFormSchema {
    entity: string;
    yaxisAggregate: string;
    yaxisEntityField?: EntityFieldFormSchema;
}
export interface XaxisDataFormSchema {
    xaxisEntityField: EntityFieldFormSchema;
}
export interface FilterFormSchema {
    groupFilters: FilterGroupSchema[];
    op: string;
}
export interface FilterGroupSchema {
    field: EntityFieldFormSchema;
    type: string;
    values: string[];
}
export interface EntityFieldFormSchema {
    name: string;
    type?: string;
}
export interface ChartPropertiesFormSchema {
    chartType?: string;
    dataseriesColor?: string;
    dataseriesName?: string;
}
export interface TitlesOptionsFormSchema {
    title ?: string;
    subtitle ?: string;
}
export interface AxisNamesFormSchema {
    yaxisName ?: string;
    xaxisName ?: string;
}
export interface AppearanceFormSchema {
    tableAppearance: TableAppearanceFormSchema;
    chartAppearance: ChartAppearanceFormSchema;
}
export interface HighchartsOptionsFormSchema {
    titles ?: TitlesOptionsFormSchema;
    axisNames ?: AxisNamesFormSchema;
    dataSeriesColorArray ?: Array<string>;
    hcChartArea ?: HCChartAreaOptionsFormSchema;
    hcPlotArea ?: HCPlotAreaOptionsFormSchema;
    hcCredits ?: HCCreditsOptionsFormSchema;
    hcLegend ?: HCLegendOptionsFormSchema;
    hcMiscOptions ?: HCMiscOptionsFormSchema;
    stackedChart ?: string;
}
export interface HighmapsOptionsFormSchema {
    titles ?: TitlesOptionsFormSchema;
    hmCredits ?: HMCreditsOptionsFormSchema;
    hmLegend ?: HMLegendOptionsFormSchema;
    hmMiscOptions ?: HMMiscOptionsFormSchema;
    hmColorAxis ?: HMColorAxisOptionsFormSchema;
}
export interface HMColorAxisOptionsFormSchema {
    hmColorAxisMin ?: number;
    hmColorAxisMax ?: number;
    hmColorAxisType ?: string;
    hmColorAxisMinColor ?: string;
    hmColorAxisMaxColor ?: string;
}
export interface HMLegendOptionsFormSchema {
    hmEnableLegend ?: boolean;
    hmLegendTitle ?: string;
}
export interface HMCreditsOptionsFormSchema {
    hmEnableCredits ?: boolean;
    hmCreditsText ?: string;
}
export interface HMMiscOptionsFormSchema {
    exporting ?: boolean;
    hmEnableDataLabels ?: boolean;
    hmEnableMapNavigation ?: boolean;
}
export interface HCChartAreaOptionsFormSchema {
    hcCABackGroundColor ?: string;
    hcCABorderWidth ?: number;
    hcCABorderCornerRadius ?: number;
    hcCABorderColor ?: string;
}
export interface HCPlotAreaOptionsFormSchema {
    hcPABackgroundColor ?: string;
    hcPABackgroundImageURL ?: string;
    hcPABorderWidth ?: number;
    hcPABorderColor ?: string;
}
export interface HCCreditsOptionsFormSchema {
    hcEnableCredits ?: boolean;
    hcCreditsText ?: string;
}
export interface HCLegendOptionsFormSchema {
    hcEnableLegend ?: boolean;
    hcLegendLayout ?: string;
    hcLegendHorizontalAlignment ?: string;
    hcLegendVerticalAlignment ?: string;
}
export interface HCMiscOptionsFormSchema {
    exporting ?: boolean;
    hcEnableDataLabels ?: boolean;
    stackedChart ?: string;
}
export interface GooglechartsOptionsFormSchema {

    titles ?: TitlesOptionsFormSchema;
    axisNames ?: AxisNamesFormSchema;
    exporting ?: boolean;
    stackedChart ?: string;
    gcCABackGroundColor ?: string;
    gcPABackgroundColor ?: string;
}
export interface ChartAppearanceFormSchema {
    generalOptions: AppearanceGeneralOptionsFormSchema;

    highchartsAppearanceOptions ?: HighchartsOptionsFormSchema;
    googlechartsAppearanceOptions ?: GooglechartsOptionsFormSchema;
    highmapsAppearanceOptions ?: HighmapsOptionsFormSchema;
}
export interface AppearanceGeneralOptionsFormSchema {
    library: string;
    resultsLimit: number;
    orderByAxis ?: string;
}
export interface TableAppearanceFormSchema {
    paginationSize ?: number;
}