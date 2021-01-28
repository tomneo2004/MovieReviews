import { makeStyles, useTheme } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import {tabsStyles, tabItemStyles} from './fancyTabStyle';

interface ITabData{
    id: string;
    value: any;
    label: React.ReactNode;
}

interface IProps {
    tabData: ITabData[];
    onChange?: (value:any)=>void;
    /**
     * which index of tab should be selectd as default
     * 
     * default 0
     */
    defaultIndex?: number;
}

const FancyTab = (props:IProps) => {
    const {
        tabData,
        onChange = null,
        defaultIndex = 0,
    } = props;

    const theme = useTheme();
    const [tabIndex, setTabIndex] = React.useState(defaultIndex);
    const tabClasses = makeStyles(tabsStyles)({theme, borderRadius:50});
    const tabItemClasses = makeStyles(tabItemStyles)({theme});

    const handleTabCange= (_e:React.ChangeEvent<{}>, index:number)=>{
        setTabIndex(index);
        if(onChange) onChange(tabData[index].value);
    }
    
    return (
        <Tabs
        classes={tabClasses}
        value={tabIndex}
        onChange={handleTabCange}
        >
        {
            tabData.map(data=>{
                return (
                    <Tab key={data.id} classes={tabItemClasses} label={data.label} disableRipple />
                )
            })
        }
        </Tabs>
    );
};

export default FancyTab;