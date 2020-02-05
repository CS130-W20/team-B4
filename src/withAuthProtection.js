import React from "react";
import { fireAuth } from "./fireApi";

const withAuthProtection = redirectRoute => WrappedComponent => {
  class WithAuthProtection extends React.Component {
    componentDidMount() {
      const { history } = this.props;
      if (!fireAuth.currentUser) {
        return history.push(redirectRoute);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { me, history } = this.props;
      const { me: nextMe } = nextProps;
      if (me && !nextMe) {
        return history.push(redirectRoute);
      }
    }

    render() {
      const { me } = this.props;
      if (!me) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthProtection;
};

export default withAuthProtection;
