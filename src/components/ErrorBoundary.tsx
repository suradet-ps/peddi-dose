import { Component } from 'react';
import type { PropsWithChildren, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <h2 className="error-boundary__title">เกิดข้อผิดพลาด</h2>
          <p className="error-boundary__message">กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่</p>
          <button className="error-boundary__button" type="button" onClick={this.handleReset}>
            ลองใหม่
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
