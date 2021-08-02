import { Component, ErrorInfo, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // if (this.state.hasError) {
    //   return <h1>Sorry.. there was an error</h1>;
    // }

    return this.props.children;
  }
}

const Wrapper = () => {
  const render = useRef(0);
  render.current += 1;

  console.log(`Wrapper is rendering ${render.current} times`);
  // return <ErrorBoundary></ErrorBoundary>;
  return null;
};

export default Wrapper;
