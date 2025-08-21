import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Oops ! Une erreur s'est produite
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Quelque chose s'est mal passé. Veuillez rafraîchir la page ou réessayer plus tard.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Rafraîchir la page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="w-full"
                >
                  Réessayer
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <summary className="cursor-pointer font-medium mb-2">
                    Détails de l'erreur (dev)
                  </summary>
                  <pre className="whitespace-pre-wrap break-words">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState(null);

  const resetError = () => setError(null);

  const handleError = React.useCallback((error) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error);
  }, []);

  if (error) {
    throw error; // This will be caught by the nearest ErrorBoundary
  }

  return { handleError, resetError };
};

// Simple error display component
export const ErrorMessage = ({ error, onRetry, className = '' }) => (
  <Card className={`border-red-200 dark:border-red-800 ${className}`}>
    <CardContent className="p-6 text-center space-y-4">
      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
      <div>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
          Erreur de chargement
        </h3>
        <p className="text-red-600 dark:text-red-300 text-sm">
          {error?.message || 'Une erreur inattendue s\'est produite'}
        </p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      )}
    </CardContent>
  </Card>
);

export default ErrorBoundary;