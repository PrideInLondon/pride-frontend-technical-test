import { Component, ErrorInfo } from 'react';
import { StyledComponentProps, withStyles } from '@material-ui/core/styles';

const styles = {
  errorMessage: {
    justifyContent: 'center',
  },
};

type Props = StyledComponentProps
type State = {
  hasError: boolean
  errorMessage?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    this.setState({ hasError: true, errorMessage: error });
    // eslint-disable-next-line no-console
    console.error(errorInfo, error);
  }

  render() {
    const { errorMessage, hasError } = this.state;
    const { children, classes } = this.props;
    if (hasError) {
      return (
        <h1 className={classes?.errorMessage}>
          {errorMessage}
        </h1>
      );
    }
    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
