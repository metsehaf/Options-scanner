import React, { Component, ReactNode } from 'react';
import { ErrorContext, ErrorContextType } from './contexts/errorContext.tsx';
 
interface Props {
    children: ReactNode;
}
 
interface State {
    hasError: boolean;
}
 
class ErrorBoundary extends Component<Props, State> {
    static contextType = ErrorContext;
    declare context: React.ContextType<typeof ErrorContext>;
 
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }
 
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }
 
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (this.context) {
            const { showError } = this.context as ErrorContextType;
            showError(`An unexpected error occurred: ${error.message}`);
        }
    }
 
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
 
        return this.props.children;
    }
}
 
export default ErrorBoundary;