import React from "react";
import VerticalList from "./VerticalList";

export default {
  title: "Veritcal List",
};

const getItems = () => {
  const bulk = [];
  for (let i = 0; i < 1000; i++) {
    bulk.push(` item${i} `);
  }
  return bulk;
};

const images = [
  "https://images.unsplash.com/photo-1614432279322-73a2f6fee37a?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1614423234685-544477464e15?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1614357235247-99fabbee67f9?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612831200091-c08595b18e6b?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1614373371549-c7d2e4885f17?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1614366765963-d6bcba6612aa?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1614348645043-d60d352a0c9b?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1614348531618-82d0648c5f16?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
];

export const Default = () => {
  const items = getItems();

  return (
    <VerticalList itemCount={items.length}>
      {({ index }) => {
        return <span>{items[index]}</span>;
      }}
    </VerticalList>
  );
};

export const FixedWidth = () => {
  const items = getItems();

  return (
    <VerticalList itemCount={items.length} width="300px">
      {({ index }) => {
        return <span>{items[index]}</span>;
      }}
    </VerticalList>
  );
};

export const Indicator = () => {
  const items = getItems();

  return (
    <VerticalList itemCount={items.length}>
      {({ index, isVisible, isScrolling }) => {
        if (isVisible && isScrolling)
          return <span>scrolling..............</span>;

        return <span>{items[index]}</span>;
      }}
    </VerticalList>
  );
};

export const Images = () => {
  return (
    <VerticalList itemCount={images.length}>
      {({ index, measure }) => {
        return <img src={images[index]} onLoad={measure} />;
      }}
    </VerticalList>
  );
};
