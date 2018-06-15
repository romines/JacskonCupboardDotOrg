import React, { Component } from 'react';
import Headroom from 'react-headroom';
import Waypoint from 'react-waypoint';
import axios from 'axios';
import Loading from './components/Loading.jsx'
import Navigation from './components/Navigation.jsx'
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
    const filteredPages = this.state.pageData.filter(page => page.id !== 2)

    const pages = filteredPages.map((data) => {
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
              <Navigation
                activePage={this.state.activePage}
                pages={filteredPages}
              />
            </Headroom>
            { pages }
          </div>
        </div>
      );

    }
  }
}

export default App;
