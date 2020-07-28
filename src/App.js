import React, { Component } from 'react'
import Main from './components/Main';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			focus: 'Campaigns'
		};
	}

	onClickNav = (e) => {
		this.setState({
			main: e.target.id,
		});
	}

	render() {
		const { focus } = this.state;
		return (
			<div className="App">
				<nav className="nav">
					<div className="logo">Postscript</div>
				</nav>
				<div className="container">
					<div className="side-nav">
						<ul className="side-nav-list">
							<li id="Dashboard" onClick={this.onClickNav}>Dashboard</li>
							<li id="Campaigns"onClick={this.onClickNav}> Campaigns</li>
							<li id="Segments"onClick={this.onClickNav}>Segments</li>
						</ul>
					</div>
					<Main focus={focus} />
				</div>
			</div>
		);
  	}
}

export default App;