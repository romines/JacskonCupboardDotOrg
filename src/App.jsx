import React, { Component } from 'react';
import Headroom from 'react-headroom';
import Waypoint from 'react-waypoint';
import axios from 'axios';
import Loading from './Loading.jsx'
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageData: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('http://www.jacksoncupboard.org/wp-json/wp/v2/pages')
      .then(response => {
          this.setState({
            pageData: response.data,
            loading: false,
            activePage: 48
          })
        })
  }

  render() {
    const navLinks = this.state.pageData.filter(page => page.id !== 2).map((data) => {
      return (
        <li className={`link ${data.id === this.state.activePage ? 'active' : ''}`} key={data.id}>
          { data.title.rendered }
        </li>
      );
    });

    const pages = this.state.pageData.filter(page => page.id !== 2).map((data) => {
      return (
        <div className="page" key={data.id}>
          <Waypoint
            onEnter={() => { this.setState({ activePage: data.id }) } }
            bottomOffset="20px"
            topOffset="-20px"
          />
          <div dangerouslySetInnerHTML={{__html: data.content.rendered}} className="contents" />
        </div>
      );
    })

    if (this.state.loading) {
      return <Loading />;
    } else {

      return (
        <div className="App">
          <div className="loaded">
            <Headroom>
              <div className="nav-container">
                <ul className="link-list">
                  { navLinks }
                </ul>
              </div>
            </Headroom>
            { pages }
          </div>
        </div>
      );

    }
  }
}

export default App;
