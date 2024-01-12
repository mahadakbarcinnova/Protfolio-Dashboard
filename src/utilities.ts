export interface LoanTypeRow{
    name: string;
    count: number;
    principal: number;
    outstanding: number;
    balance: number;
    upb: number;
    weightedApr: number;
    stdDevApr: number;
    weightedTerm: number;
    stdDevTerm: number;
    yearsInBusiness: number;
    children?: LoanTypeRow[];
    industry?: string;
    state?: string
  }

export const dataByLoanType = (data: any[], setTitle: React.Dispatch<React.SetStateAction<string>>): LoanTypeRow[] => {
    let rawData: LoanTypeRow[] = [{
      name: "Amortizing",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "Non-Amortizing",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "Total",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0
    }];
    for(let d of data){
      const index = d['Facility Structure'] === "Amortizing" ? 0 : 1;
      rawData[index].count++;
      rawData[index].principal += d['Maximum Principal'];
      rawData[index].outstanding += d['Outstanding Principal'];
      rawData[index].weightedApr += d['APR'];
      rawData[index].yearsInBusiness += d['Years in business'];
      rawData[rawData.length-1].count++;
      rawData[rawData.length-1].principal += d['Maximum Principal'];
      rawData[rawData.length-1].outstanding += d['Outstanding Principal'];
      rawData[rawData.length-1].balance = rawData[rawData.length-1].principal - rawData[rawData.length-1].outstanding;
      rawData[rawData.length-1].weightedApr += d['APR'];
      rawData[rawData.length-1].yearsInBusiness += d['Years in business'];
      rawData[index].children?.push({
        name: d['Loan Name'],
        count: 1,
        principal: d['Maximum Principal'],
        outstanding: d['Outstanding Principal'],
        balance: d['Maximum Principal'] - d['Outstanding Principal'],
        upb: 0,
        weightedApr: d['APR'],
        stdDevApr: 0,
        weightedTerm: 0,
        stdDevTerm: 0,
        yearsInBusiness: d['Years in business']
      })
    }
    setTitle('Outstanding Balance by Loan Type');
    for(let row of rawData){
      row.upb = row.principal/rawData[rawData.length-1].principal * 100
      row.weightedApr = row.weightedApr/(row.children?.length ?? 1)
      row.yearsInBusiness = row.yearsInBusiness/(row.children?.length ?? 1)
    }
    return rawData.filter(row => {return row.name !== 'Total'});
  }

export const dataByAPRGroup = (data: any[], setTitle: React.Dispatch<React.SetStateAction<string>>): LoanTypeRow[] => {
    let rawData: LoanTypeRow[] = [{
      name: "<10%",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "10%-12%",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "16%-18%",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },
    {
      name: ">25%",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "Total",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0
    }];
    for(let d of data){
      let index = 0;
      if(d['APR'] < 10){
        index = 0
      }else if(d['APR']>= 10 && d['APR'] <= 12){
        index = 1
      }else if(d['APR']>= 16 && d['APR'] <= 18){
        index = 2
      }else if(d['APR']> 25){
        index = 3
      }
      rawData[index].count++;
      rawData[index].principal += d['Maximum Principal'];
      rawData[index].outstanding += d['Outstanding Principal'];
      rawData[index].weightedApr += d['APR'];
      rawData[index].yearsInBusiness += d['Years in business'];
      rawData[rawData.length-1].count++;
      rawData[rawData.length-1].principal += d['Maximum Principal'];
      rawData[rawData.length-1].outstanding += d['Outstanding Principal'];
      rawData[rawData.length-1].balance = rawData[rawData.length-1].principal - rawData[rawData.length-1].outstanding;
      rawData[rawData.length-1].weightedApr += d['APR'];
      rawData[rawData.length-1].yearsInBusiness += d['Years in business'];
      rawData[index].children?.push({
        name: d['Loan Name'],
        count: 1,
        principal: d['Maximum Principal'],
        outstanding: d['Outstanding Principal'],
        balance: d['Maximum Principal'] - d['Outstanding Principal'],
        upb: 0,
        weightedApr: d['APR'],
        stdDevApr: 0,
        weightedTerm: 0,
        stdDevTerm: 0,
        yearsInBusiness: d['Years in business']
      })
    }
    setTitle('Outstanding Balance by APR Group');
    for(let row of rawData){
      row.upb = row.principal/rawData[rawData.length-1].principal * 100
      row.weightedApr = row.weightedApr/(row.children?.length ?? 1)
      row.yearsInBusiness = row.yearsInBusiness/(row.children?.length ?? 1)
    }
    return rawData.filter(row => {return row.name !== 'Total'});
  }

  export const dataByPrincipalGroup = (data: any[], setTitle: React.Dispatch<React.SetStateAction<string>>): LoanTypeRow[] => {
    let rawData: LoanTypeRow[] = [{
      name: "<$500k",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$500k - $1m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$1m - $2m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$2m - $3m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "3m - $4m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$4m - $5m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$5m - $6m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: ">$10m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "Total",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0
    }];
    for(let d of data){
      let index = 0;
      if(d['Maximum Principal'] < 500000){
        index = 0
      }else if(d['Maximum Principal']>= 500000 && d['Maximum Principal'] < 1000000){
        index = 1
      }else if(d['Maximum Principal']>= 1000000 && d['Maximum Principal'] < 2000000){
        index = 2
      }else if(d['Maximum Principal']>= 2000000 && d['Maximum Principal'] < 3000000){
        index = 3
      }else if(d['Maximum Principal']>= 3000000 && d['Maximum Principal'] < 4000000){
        index = 4
      }else if(d['Maximum Principal']>= 4000000 && d['Maximum Principal'] < 5000000){
        index = 5
      }else if(d['Maximum Principal']>= 5000000 && d['Maximum Principal'] < 6000000){
        index = 6
      }else if(d['Maximum Principal']> 10000000){
        index = 7
      }
      rawData[index].count++;
      rawData[index].principal += d['Maximum Principal'];
      rawData[index].outstanding += d['Outstanding Principal'];
      rawData[index].weightedApr += d['APR'];
      rawData[index].yearsInBusiness += d['Years in business'];
      rawData[rawData.length-1].count++;
      rawData[rawData.length-1].principal += d['Maximum Principal'];
      rawData[rawData.length-1].outstanding += d['Outstanding Principal'];
      rawData[rawData.length-1].balance = rawData[rawData.length-1].principal - rawData[rawData.length-1].outstanding;
      rawData[rawData.length-1].weightedApr += d['APR'];
      rawData[rawData.length-1].yearsInBusiness += d['Years in business'];
      rawData[index].children?.push({
        name: d['Loan Name'],
        count: 1,
        principal: d['Maximum Principal'],
        outstanding: d['Outstanding Principal'],
        balance: d['Maximum Principal'] - d['Outstanding Principal'],
        upb: 0,
        weightedApr: d['APR'],
        stdDevApr: 0,
        weightedTerm: 0,
        stdDevTerm: 0,
        yearsInBusiness: d['Years in business']
      })
    }
    setTitle('Outstanding Balance by Principal Group');
    for(let row of rawData){
      row.upb = row.principal/rawData[rawData.length-1].principal * 100
      row.weightedApr = row.weightedApr/(row.children?.length ?? 1)
      row.yearsInBusiness = row.yearsInBusiness/(row.children?.length ?? 1)
    }
    return rawData.filter(row => {return row.name !== 'Total'});
  }

  export const dataByBalanceGroup = (data: any[], setTitle: React.Dispatch<React.SetStateAction<string>>): LoanTypeRow[] => {
    let rawData: LoanTypeRow[] = [{
      name: "<$500k",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$500k - $1m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$1m - $2m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$2m - $3m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "3m - $4m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$4m - $5m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "$5m - $6m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: ">$10m",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0,
      children: []
    },{
      name: "Total",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0
    }];
    for(let d of data){
      let index = 0;
      if(d['Maximum Principal'] - d['Outstanding Principal'] < 500000){
        index = 0
      }else if(d['Maximum Principal'] - d['Outstanding Principal']>= 500000 && d['Maximum Principal'] - d['Outstanding Principal'] < 1000000){
        index = 1
      }else if(d['Maximum Principal'] - d['Outstanding Principal']>= 1000000 && d['Maximum Principal'] - d['Outstanding Principal'] < 2000000){
        index = 2
      }else if(d['Maximum Principal'] - d['Outstanding Principal']>= 2000000 && d['Maximum Principal'] - d['Outstanding Principal'] < 3000000){
        index = 3
      }else if(d['Maximum Principal'] - d['Outstanding Principal']>= 3000000 && d['Maximum Principal'] - d['Outstanding Principal'] < 4000000){
        index = 4
      }else if(d['Maximum Principal'] - d['Outstanding Principal']>= 4000000 && d['Maximum Principal'] - d['Outstanding Principal'] < 5000000){
        index = 5
      }else if(d['Maximum Principal'] - d['Outstanding Principal']>= 5000000 && d['Maximum Principal'] - d['Outstanding Principal'] < 6000000){
        index = 6
      }else if(d['Maximum Principal'] - d['Outstanding Principal']> 10000000){
        index = 7
      }
      rawData[index].count++;
      rawData[index].principal += d['Maximum Principal'];
      rawData[index].outstanding += d['Outstanding Principal'];
      rawData[index].weightedApr += d['APR'];
      rawData[index].yearsInBusiness += d['Years in business'];
      rawData[rawData.length-1].count++;
      rawData[rawData.length-1].principal += d['Maximum Principal'];
      rawData[rawData.length-1].outstanding += d['Outstanding Principal'];
      rawData[rawData.length-1].balance = rawData[rawData.length-1].principal - rawData[rawData.length-1].outstanding;
      rawData[rawData.length-1].weightedApr += d['APR'];
      rawData[rawData.length-1].yearsInBusiness += d['Years in business'];
      rawData[index].children?.push({
        name: d['Loan Name'],
        count: 1,
        principal: d['Maximum Principal'],
        outstanding: d['Outstanding Principal'],
        balance: d['Maximum Principal'] - d['Outstanding Principal'],
        upb: 0,
        weightedApr: d['APR'],
        stdDevApr: 0,
        weightedTerm: 0,
        stdDevTerm: 0,
        yearsInBusiness: d['Years in business']
      })
    }
    setTitle('Outstanding Balance by Principal Group');
    for(let row of rawData){
      row.upb = row.principal/rawData[rawData.length-1].principal * 100
      row.weightedApr = row.weightedApr/(row.children?.length ?? 1)
      row.yearsInBusiness = row.yearsInBusiness/(row.children?.length ?? 1)
    }
    return rawData.filter(row => {return row.name !== 'Total'});
  }

  export const dataByIndustry = (data: any[], setTitle: React.Dispatch<React.SetStateAction<string>>): LoanTypeRow[] => {
    let rawData: LoanTypeRow[] = [{
      name: "Total",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0
    }];
    for(let d of data){
      if(!d['Industry']){
        d['Industry'] = '-';
      }
      let index = rawData.map(row => {return row.industry}).indexOf(d['Industry']);
      if(index > -1){
        rawData[index].count++;
        rawData[index].principal += d['Maximum Principal'];
        rawData[index].outstanding += d['Outstanding Principal'];
        rawData[index].weightedApr += d['APR'];
        rawData[index].yearsInBusiness += d['Years in business'];
      }
      else{
        rawData.push({
          name: d['Industry'],
          count: 1,
          principal: d['Maximum Principal'],
          outstanding: d['Outstanding Principal'],
          upb: 0,
          weightedApr: d['APR'],
          balance: 0,
          stdDevApr: 0,
          weightedTerm: 0,
          stdDevTerm: 0,
          yearsInBusiness: d['Years in business'],
          children: [],
          industry: d['Industry']
        })
        index = rawData.length-1;
      }
      rawData[index].children?.push({
        name: d['Loan Name'],
        count: 1,
        principal: d['Maximum Principal'],
        outstanding: d['Outstanding Principal'],
        balance: d['Maximum Principal'] - d['Outstanding Principal'],
        upb: 0,
        weightedApr: d['APR'],
        stdDevApr: 0,
        weightedTerm: 0,
        stdDevTerm: 0,
        yearsInBusiness: d['Years in business']
      })
      rawData[0].count++;
      rawData[0].principal += d['Maximum Principal'];
      rawData[0].outstanding += d['Outstanding Principal'];
      rawData[0].weightedApr += d['APR'];
      rawData[0].yearsInBusiness += d['Years in business'];
    }
    const totalRow = rawData.splice(0,1);
    rawData.sort((a,b) => {return a.name.localeCompare(b.name)});
    rawData.push(totalRow[0])
    setTitle('Outstanding Balance by Industry');
    for(let row of rawData){
      row.upb = row.principal/rawData[rawData.length-1].principal * 100
      row.weightedApr = row.weightedApr/(row.children?.length ?? 1)
      row.yearsInBusiness = row.yearsInBusiness/(row.children?.length ?? 1)
    }
    return rawData.filter(row => {return row.name !== 'Total'});
  }

  export const dataByState = (data: any[], setTitle: React.Dispatch<React.SetStateAction<string>>): LoanTypeRow[] => {
    let rawData: LoanTypeRow[] = [{
      name: "Total",
      count: 0,
      principal: 0,
      outstanding: 0,
      upb: 0,
      weightedApr: 0,
      balance: 0,
      stdDevApr: 0,
      weightedTerm: 0,
      stdDevTerm: 0,
      yearsInBusiness: 0
    }];
    for(let d of data){
      if(!d['State']){
        d['State'] = '-';
      }
      let index = rawData.map(row => {return row.state}).indexOf(d['State']);
      if(index > -1){
        rawData[index].count++;
        rawData[index].principal += d['Maximum Principal'];
        rawData[index].outstanding += d['Outstanding Principal'];
        rawData[index].weightedApr += d['APR'];
        rawData[index].yearsInBusiness += d['Years in business'];
      }
      else{
        rawData.push({
          name: d['State'],
          count: 1,
          principal: d['Maximum Principal'],
          outstanding: d['Outstanding Principal'],
          upb: 0,
          weightedApr: d['APR'],
          balance: 0,
          stdDevApr: 0,
          weightedTerm: 0,
          stdDevTerm: 0,
          yearsInBusiness: d['Years in business'],
          children: [],
          state: d['State']
        })
        index = rawData.length-1;
      }
      rawData[index].children?.push({
        name: d['Loan Name'],
        count: 1,
        principal: d['Maximum Principal'],
        outstanding: d['Outstanding Principal'],
        balance: d['Maximum Principal'] - d['Outstanding Principal'],
        upb: 0,
        weightedApr: d['APR'],
        stdDevApr: 0,
        weightedTerm: 0,
        stdDevTerm: 0,
        yearsInBusiness: d['Years in business']
      })
      rawData[0].count++;
      rawData[0].principal += d['Maximum Principal'];
      rawData[0].outstanding += d['Outstanding Principal'];
      rawData[0].weightedApr += d['APR'];
      rawData[0].yearsInBusiness += d['Years in business'];
    }
    const totalRow = rawData.splice(0,1);
    rawData.sort((a,b) => {return a.name.localeCompare(b.name)});
    rawData.push(totalRow[0])
    setTitle('Outstanding Balance by State');
    for(let row of rawData){
      row.upb = row.principal/rawData[rawData.length-1].principal * 100
      row.weightedApr = row.weightedApr/(row.children?.length ?? 1)
      row.yearsInBusiness = row.yearsInBusiness/(row.children?.length ?? 1)
    }
    return rawData.filter(row => {return row.name !== 'Total'});
  }