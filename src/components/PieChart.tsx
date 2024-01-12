import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import { LoanTypeRow } from '../utilities';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .pie-chart {
        align :center
    }`;
function PieChart(props: any){
    const data1 = props.data.filter((row: any) => {return row.name!=='Total' && row.outstanding>0}).map((row: LoanTypeRow) => {
        return {
            x: row.name,
            y: (row.outstanding/props.data[props.data.length-1].outstanding*100).toFixed(2),
            text: `${row.name}: $${row.outstanding.toFixed(2)} (${(row.outstanding/props.data[props.data.length-1].outstanding*100).toFixed(2)}%)`
        }
    })
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <AccumulationChartComponent id='pie-chart' title={props.title} legendSettings={{ visible: false }} enableSmartLabels={true} enableAnimation={false} center={{ x: '50%', y: '50%' }} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Loan Type: <b>${point.y}%</b>',header:""  }} height='60%'>
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data1} name='Loan Type' xName='x' yName='y' explode={true} explodeOffset='10%' explodeIndex={0} startAngle = {Browser.isDevice ? 55 : 35 } dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle:{ length : '20px' ,type: 'Curve'} }} radius= {Browser.isDevice ? '40%' : '70%'} />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
        </div>
    )
}
export default PieChart;