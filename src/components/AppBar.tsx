import { AppBarComponent, MenuComponent, MenuItemModel } from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as React from "react";

export default function ButtonAppBar(props: any) {
  const companyMenuItems: MenuItemModel[] = [
    {
      text: 'Loan',
      items: [
        { text: 'Loan Type' },
        { text: 'APR Group' }
      ]
    }
  ];
  const productMenuItems: MenuItemModel[] = [
    {
      text: 'KPI',
      items: [
        { text: 'Principal Group' },
        { text: 'Balance Group' }
      ]
    }
  ];
  const aboutMenuItems: MenuItemModel[] = [
    {
      text: 'Industry'
    }
  ];
  const carrerMenuItems: MenuItemModel[] = [
    {
      text: 'State'
    }
  ];
  const onSelect = (args: any) => {
    props.onSelection(args.item.text)
  }
  return (
    <div className='control-container'>
      <AppBarComponent colorMode="Primary">
      <ButtonComponent cssClass="e-inherit">React Dashboard</ButtonComponent>
        <div className="e-appbar-spacer"></div>
        <MenuComponent cssClass="e-inherit" items={companyMenuItems} select={onSelect}></MenuComponent>
        <MenuComponent cssClass="e-inherit" items={productMenuItems} select={onSelect}></MenuComponent>
        <MenuComponent cssClass="e-inherit" items={aboutMenuItems} select={onSelect}></MenuComponent>
        <MenuComponent cssClass="e-inherit" items={carrerMenuItems} select={onSelect}></MenuComponent>
      </AppBarComponent>
    </div>
  );
}