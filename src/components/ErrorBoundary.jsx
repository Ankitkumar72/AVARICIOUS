import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '40px',
                    background: '#000',
                    color: '#ff0055',
                    height: '100vh',
                    fontFamily: 'monospace',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>SYSTEM_CRITICAL_FAILURE</h1>
                    <p style={{ color: '#fff', marginBottom: '20px' }}>The application has encountered an unrecoverable error.</p>
                    <pre style={{
                        background: '#111',
                        padding: '20px',
                        borderRadius: '5px',
                        color: '#ff0055',
                        maxWidth: '800px',
                        overflow: 'auto',
                        textAlign: 'left',
                        border: '1px solid #333'
                    }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{
                            marginTop: '40px',
                            background: 'transparent',
                            border: '1px solid #00f0ff',
                            color: '#00f0ff',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontSize: '1.2em'
                        }}
                    >
                        PURGE_DATA_&_REBOOT
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
