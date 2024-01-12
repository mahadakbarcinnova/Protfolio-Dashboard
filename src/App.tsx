import './App.css';
import { read, utils } from 'xlsx';
import AppBar from './components/AppBar';
import { useEffect, useState } from 'react';
import PieChart from './components/PieChart';
import MainTable from './components/MainTable';
import FilterBar from './components/filterBar';
import { dataByAPRGroup, dataByBalanceGroup, dataByIndustry, dataByLoanType, dataByPrincipalGroup, dataByState } from './utilities';

function App() {
  const readExcelFile = async () => {
    const f = await fetch("http://sundarsharif.com/data.xlsx");
    const ab = await f.arrayBuffer();
    const wb = read(ab);
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const data: any[] = utils.sheet_to_json(ws); // generate objects
    setRawData(data as any);
    const rawData = dataByLoanType([...data], setTitle);
    setData(rawData as any);
  }
  useEffect(() => {
    readExcelFile();
  },[]);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [rawData, setRawData] = useState([]);
  const getDataByType = (type: string) => {
    let data: any;
    if(type==='Loan Type' || type==='Loan'){
      data = dataByLoanType([...rawData], setTitle)
    }else if(type==='APR Group'){
      data = dataByAPRGroup([...rawData], setTitle)
    }else if(type==='Industry'){
      data = dataByIndustry([...rawData], setTitle)
    }else if(type==='State'){
      data = dataByState([...rawData], setTitle)
    }else if(type==='Principal Group' || type==='KPI'){
      data = dataByPrincipalGroup([...rawData], setTitle)
    }else if(type==='Balance Group'){
      data = dataByBalanceGroup([...rawData], setTitle)
    }
    setData(data);
  }
  return (
    <div className="App">
      <header className="App-header">
      <AppBar onSelection={getDataByType}/>
      </header>
      {/* <div style={{width: '100vw', display: 'inline-flex'}}>
        <div style={{width: '60vw', maxHeight: '40%'}}><MainTable data={data}/></div>
        <div style={{width: '40vw', float: 'right'}}><PieChart data={data} title={title}/></div>
      </div> */}

      <div style={{width: '100vw', display: 'inline-flex'}}>
        <div style={{width: '40vw', maxHeight: '40%'}}>
          <FilterBar />
        </div>
      
        <div style={{width: '60vw', float: 'right'}}><PieChart data={data} title={title}/></div>
      </div>
      {/* <PieChart  data={data} title={title}/> */}
      <MainTable data={data}/>
    </div>
  );
}

export default App;
