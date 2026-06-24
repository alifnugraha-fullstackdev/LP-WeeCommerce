import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in landing page rendering context:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#181d26] text-white flex flex-col justify-center items-center p-6 text-center font-sans">
          <div className="max-w-md border border-[#2a2d35] rounded-xl p-8 bg-[#1d1f25] shadow-lg">
            <h1 className="text-xl font-bold text-[#e54a22] mb-3">Sistem Mengalami Kendala</h1>
            <p className="text-sm text-[#9297a0] mb-6 leading-relaxed">
              We encountered a client-side rendering issue. Please reload the tab or check your network.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-[#e54a22] hover:bg-[#aa2d00] transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e54a22] focus:ring-offset-2"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
