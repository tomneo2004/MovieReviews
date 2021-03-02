import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import React from "react";
import { tabsStyles, tabItemStyles } from "./FancyTabStyle";

interface ITabData {
  id: string;
  value: any;
  label: React.ReactNode;
}

type FancyTabProps = React.ComponentProps<typeof Box> & {
  tabData: ITabData[];
  /**
   * callback on tab index change
   */
  onChange?: (value: any) => void;
  /**
   * which index of tab should be selectd as default
   *
   * default 0
   */
  defaultIndex?: number;
};

const FancyTab: React.FC<FancyTabProps> = (props: FancyTabProps) => {
  const { tabData, onChange = null, defaultIndex = 0, ...rest } = props;

  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(defaultIndex);
  const tabClasses = makeStyles(tabsStyles)({ theme, borderRadius: 50 });
  const tabItemClasses = makeStyles(tabItemStyles)({ theme });

  const handleTabCange = (_e: React.ChangeEvent<{}>, index: number) => {
    setTabIndex(index);
    if (onChange) onChange(tabData[index].value);
  };

  return (
    <Box {...rest}>
      <Tabs
        {...rest}
        classes={tabClasses}
        value={tabIndex}
        onChange={handleTabCange}
      >
        {tabData.map((data) => {
          return (
            <Tab
              key={data.id}
              classes={tabItemClasses}
              label={
                <Typography component="div">
                  <Box>{data.label}</Box>
                </Typography>
              }
              disableRipple
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default FancyTab;
