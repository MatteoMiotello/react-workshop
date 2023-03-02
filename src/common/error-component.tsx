import { Component, PropsWithChildren, ReactNode } from "react";

export interface ErrorBoundaryProps extends PropsWithChildren {
    fallback: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, any> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, info: any) {
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      console.log( "error" ) 
    }


    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return this.props.fallback;
      }
  
      return this.props.children;
    }
  }