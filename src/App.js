import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentDidMount() {
		// Initialize Firebase
		const config = {
			apiKey: 'AIzaSyBeAeL04RyLGk7U6l5txZBlCWC7jpTB5jY',
			authDomain: 'scheduler-prototype-5f79a.firebaseapp.com',
			databaseURL: 'https://scheduler-prototype-5f79a.firebaseio.com',
			projectId: 'scheduler-prototype-5f79a',
			storageBucket: 'scheduler-prototype-5f79a.appspot.com',
			messagingSenderId: '774743799764'
		};
		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, applyMiddleware(ReduxThunk));
		return (
			// The provider makes the Redux store available to the connect() calls in the component hierarchy below.
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}
export default App;
