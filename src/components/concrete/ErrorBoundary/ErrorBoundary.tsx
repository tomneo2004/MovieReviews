import React, { Component } from "react";

type ErrorBoundaryProps = React.ComponentProps<typeof Component> & {
  fallback: React.ReactNode;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    const { fallback } = this.props;

    if (this.state.error) {
      return fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
