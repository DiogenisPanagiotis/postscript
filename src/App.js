import React from 'react'
import Main from './components/Main';
import './App.css';

const App = () => {
	return (
		<div className="App">
			<nav className="nav">
				<div className="logo">Postscript</div>
			</nav>
			<div className="container">
				<div className="side-nav">
					<ul className="side-nav-list">
						<li id="Dashboard">Dashboard</li>
						<li id="Campaigns"> Campaigns</li>
						<li id="Segments">Segments</li>
					</ul>
				</div>
				<Main />
			</div>
		</div>
	);
}

export default App;