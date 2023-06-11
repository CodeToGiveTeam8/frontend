import { createRoot } from 'react-dom/client';
import '../TeamLead/teamlead.css';
import * as React from 'react';
import { updateSampleSection } from './sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
export let data1 = 
    [{ 'x': 'Abandon', y: 76, text: 'Abandon: 43.4%' },
        { 'x': 'Surrender', y: 65, text: 'Surrender: 37.14%' },
        { 'x': 'Admitted', y: 34, text: 'Admitted: 19.42%' },
       ] 
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
         .pie-chart {
             align :center
         }`;
function Pie() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let pie;
    let slider;
    return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <AccumulationChartComponent id='pie-chart' ref={pie => pie = pie} title='Percent per category' load={load.bind(this)} legendSettings={{ visible: false }} enableSmartLabels={true} enableAnimation={false} center={{ x: '50%', y: '50%' }} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Count <b>${point.y}</b>', header: "" }} loaded={onChartLoad.bind(this)}>
                        <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]}/>
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y' explode={true} explodeOffset='10%' explodeIndex={0} startAngle={Browser.isDevice ? 55 : 35} dataLabel={{
            visible: true,
            position: 'Outside', name: 'text',
            font: {
                fontWeight: '600'
            },
            connectorStyle: { length: '20px', type: 'Curve' }
        }} radius={Browser.isDevice ? '40%' : '70%'}>
                            </AccumulationSeriesDirective>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
            </div>);
    function pieangle(e) {
        let angle = document.getElementById('pieangle').value;
        pie.series[0].startAngle = parseFloat(angle);
        pie.series[0].endAngle = parseFloat(angle);
        pie.series[0].animation.enable = false;
        document.getElementById('anglevalue').innerHTML = angle;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    ;
    function pieradius(e) {
        let radius = document.getElementById('pieradius').value;
        pie.series[0].radius = radius + '%';
        document.getElementById('radius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    ;
    function pieexploderadius(e) {
        let radius = document.getElementById('pieexploderadius').value;
        pie.visibleSeries[0].explodeOffset = radius + '%';
        document.getElementById('exploderadius').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    ;
    function pieexplodeindex(e) {
        let index = +document.getElementById('pieexplodeindex').value;
        pie.visibleSeries[0].explodeIndex = index;
        document.getElementById('explodeindex').innerHTML = index.toString();
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    ;
    function piecenterx(e) {
        let x = document.getElementById('x').value;
        pie.center.x = x + '%';
        document.getElementById('xvalue').innerHTML = x + '%';
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    ;
    function piecentery(e) {
        let y = document.getElementById('y').value;
        pie.center.y = y + '%';
        document.getElementById('yvalue').innerHTML = y + '%';
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    ;
    function onChartLoad(args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    }
    ;
    function load(args) {
        let selectedTheme = window.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
    }
    ;
}
export default Pie;