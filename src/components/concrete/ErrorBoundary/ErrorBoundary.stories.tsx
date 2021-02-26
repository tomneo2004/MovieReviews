
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

export default {
  title: "Error Boundary",
};

const ThrowError = ()=>{
    throw Error('This is error')
    return (<div></div>);
}

export const Default = ()=>{
    return (
        <ErrorBoundary fallback='Error has been catched'>
            <ThrowError />
        </ErrorBoundary>
    )
}