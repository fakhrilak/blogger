import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateAdminRoute = ({
	component: Component,
	auth: { isAuthenticated, user, loading },
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated === null || loading ? (
					<Redirect to="/" />
				) : isAuthenticated && user.role == 1 ? (
					<Component {...props} />
				) : isAuthenticated && user.role == 2 ? (
					<Redirect to="/" />
				) : (
					<Redirect to="/" />
				)}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {})(PrivateAdminRoute);