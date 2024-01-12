import { Inject } from "@syncfusion/ej2-react-navigations"
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Sort, ColumnMenu, Resize, Filter, Reorder, Aggregate, AggregateColumnsDirective, AggregateDirective, AggregatesDirective, AggregateColumnDirective } from "@syncfusion/ej2-react-treegrid"
function MainTable(props: any) {
  console.log(props);
  const footerSum = (props: any) => {
    return <span>{(props.Sum/2).toFixed(2)}</span>
  }
  const footerPercentage = (props: any) => {
    return <span>{parseInt(props.Sum).toFixed(2)}</span>
  }
  const footerCurrency = (props: any) => {
    return '$' + (props.Sum/2).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  const footerAverage = (props: any) => {
    return <span>{parseInt(props.Average).toFixed(2)}</span>
  }
  return <TreeGridComponent
      dataSource={props.data} 
      childMapping='children' 
      allowSorting={true} 
      showColumnMenu={true} 
      enableCollapseAll={true} 
      allowFiltering={true}
      filterSettings={{type: 'Menu', hierarchyMode: 'Parent'}}
      allowReordering={true}>
        <ColumnsDirective>
          <ColumnDirective width="195" field='name' headerText='Loan Category'/>
          <ColumnDirective width="195" field='count' headerText='# of Loans'/>
          <ColumnDirective width="195" field='principal' format="C2" headerText='Principal Amount'/>
          <ColumnDirective width="195" field='outstanding' format="C2" headerText='Outstanding amount' />
          <ColumnDirective width="195" field='upb' format="N2" headerText='% of UPB'/>
          <ColumnDirective width="195" field='weightedApr' format="N2" headerText='Weighted Average APR'/>
          <ColumnDirective width="195" field='stdDevApr' headerText='StdDev APR'/>
          <ColumnDirective width="195" field='weightedTerm' headerText='Weighted Average Term (Months)'/>
          <ColumnDirective width="195" field='stdDevTerm' headerText='StdDev Term (Months)'/>
          <ColumnDirective width="195" field='yearsInBusiness' format="N2" headerText='Avg Years in Business'/>
        </ColumnsDirective>
        <AggregatesDirective>
          <AggregateDirective showChildSummary={false}>
            <AggregateColumnsDirective>
              <AggregateColumnDirective field='count' columnName='count' type='Sum' footerTemplate={footerSum}/>
              <AggregateColumnDirective field='principal' columnName='principal' type='Sum' footerTemplate={footerCurrency}/>
              <AggregateColumnDirective field='outstanding' columnName='outstanding' type='Sum' footerTemplate={footerCurrency}/>
              <AggregateColumnDirective field='upb' columnName='upb' type='Sum' footerTemplate={footerPercentage}/>
              <AggregateColumnDirective field='weightedApr' columnName='weightedApr' type='Average' footerTemplate={footerAverage}/>
              <AggregateColumnDirective field='yearsInBusiness' columnName='yearsInBusiness' type='Average' footerTemplate={footerAverage}/>
            </AggregateColumnsDirective>
          </AggregateDirective>
        </AggregatesDirective>
        <Inject services={[Sort, ColumnMenu, Resize, Filter, Reorder, Aggregate]}/>
    </TreeGridComponent>
}
export default MainTable;