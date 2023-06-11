import { createRoot } from 'react-dom/client';
import '../TeamLead/teamlead.css';
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from './sample-base';
export let data1 = [{ x: 'GBR', y: 27, toolTipMappingName: 'Good kids rising' }, { x: 'SOS', y: 26, toolTipMappingName: 'Childrens Villages of India' }, { x: 'BDSBS', y: 8, toolTipMappingName: 'Don Bosco Sneha Bhavan Society' }, { x: 'AA', y: 19, toolTipMappingName: 'Ashray Akruti' }, { x: 'SM', y: 17, toolTipMappingName: 'Shishu Mandir' }, { x: 'UFT', y: 2, toolTipMappingName: 'Umang Foundation Trust' }];

export let data2 = [{ x: 'GBR', y: 23, toolTipMappingName: 'Good kids rising' }, { x: 'SOS', y: 18, toolTipMappingName: 'Childrens Villages of India' }, { x: 'BDSBS', y: 11, toolTipMappingName: 'Don Bosco Sneha Bhavan Society' }, { x: 'AA', y: 17, toolTipMappingName: 'Ashray Akruti' }, { x: 'SM', y: 10, toolTipMappingName: 'Shishu Mandir' }, { x: 'UFT', y: 5, toolTipMappingName: 'Umang Foundation Trust' }];

export let data3 = [{ x: 'GBR', y: 17, toolTipMappingName: 'Good kids rising' }, { x: 'SOS', y: 26, toolTipMappingName: 'Childrens Villages of India' }, { x: 'BDSBS', y: 10, toolTipMappingName: 'Don Bosco Sneha Bhavan Society' }, { x: 'AA', y: 20, toolTipMappingName: 'Ashray Akruti' }, { x: 'SM', y: 15, toolTipMappingName: 'Shishu Mandir' }, { x: 'UFT', y: 24, toolTipMappingName: 'Umang Foundation Trust' }];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function Graph() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} primaryYAxis={{
            title: 'Children Count',
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, maximum: 50, interval: 10,
        }} chartArea={{ border: { width: 0 } }} load={load.bind(this)} tooltip={{ enable: true, header: "<b>${point.tooltip}</b>", shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Orphanage and category wise count' loaded={loaded.bind(this)}>
    <Inject 
  services={[
    ColumnSeries, 
    Legend,  
    Tooltip,        
    Category,         
    DataLabel,
    Highlight  
  ]}  
/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} yName='y' name='Abandon' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} yName='y' name='Surrender' type='Column'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} yName='y' name='Admitted' type='Column'>
                            </SeriesDirective>

                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>);
    function loaded(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    function load(args) {
        let selectedTheme = window.location.hash.split('/')[1];

        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.font.color = '#000000';
            args.chart.series[1].marker.dataLabel.font.color = '#000000';
            args.chart.series[2].marker.dataLabel.font.color = '#000000';
        }
    }
    ;
}
export default Graph;
