import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import SectionHeader from "./SectionHeader";

export default {
  title: "Section Header",
};

export const Default = () => {
  return (
    <SectionHeader
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box bgcolor="#fff">THIS IS HEADER</Box>
        </Typography>
      }
    />
  );
};

export const HeaderCenter = () => {
  return (
    <SectionHeader
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box bgcolor="#fff">THIS IS HEADER</Box>
        </Typography>
      }
      headerAlign="center"
    />
  );
};

export const HeaderRigth = () => {
  return (
    <SectionHeader
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box bgcolor="#fff">THIS IS HEADER</Box>
        </Typography>
      }
      headerAlign="right"
    />
  );
};

export const Padding = () => {
  return (
    <SectionHeader
      px={2}
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box px={1} bgcolor="#fff">
            THIS IS HEADER
          </Box>
        </Typography>
      }
      items={[]}
    />
  );
};

export const PaddingCenter = () => {
  return (
    <SectionHeader
      px={2}
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box px={1} bgcolor="#fff">
            THIS IS HEADER
          </Box>
        </Typography>
      }
      headerAlign="center"
      items={[]}
    />
  );
};

export const PaddingRight = () => {
  return (
    <SectionHeader
      px={2}
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box px={1} bgcolor="#fff">
            THIS IS HEADER
          </Box>
        </Typography>
      }
      headerAlign="right"
      items={[]}
    />
  );
};

export const ItemsRight = () => {
  return (
    <SectionHeader
      px={2}
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box px={1} bgcolor="#fff">
            THIS IS HEADER
          </Box>
        </Typography>
      }
      headerAlign="left"
      items={[
        <Button variant="contained" key="1">
          Button 1
        </Button>,
        <Button key="2">Button 2</Button>,
        <Button key="3">Button 3</Button>,
      ]}
    />
  );
};

export const ItemsLeft = () => {
  return (
    <SectionHeader
      px={2}
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box px={1} bgcolor="#fff">
            THIS IS HEADER
          </Box>
        </Typography>
      }
      headerAlign="right"
      items={[
        <Button variant="contained" key="1">
          Button 1
        </Button>,
        <Button key="2">Button 2</Button>,
        <Button key="3">Button 3</Button>,
      ]}
    />
  );
};

export const ItemsCenter = () => {
  return (
    <SectionHeader
      px={2}
      bgcolor="lightblue"
      header={
        <Typography variant="h4" component="div">
          <Box px={1} bgcolor="#fff">
            THIS IS HEADER
          </Box>
        </Typography>
      }
      headerAlign="center"
      items={[
        <Button variant="contained" key="1">
          Button 1
        </Button>,
        <Button key="2">Button 2</Button>,
        <Button key="3">Button 3</Button>,
      ]}
    />
  );
};
