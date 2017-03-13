import React, { Component } from 'react';
import './App.css';
import { FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      formPlaceholderInfo: 'Wpisz wykonawce', // placeholder w Searchbar
      titleHeader: "Spotifajowe radio"
    }
  }


  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=PL&`
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(artistTracks => {
        const { tracks } = artistTracks;
        this.setState({tracks});
      })
    });
  }

  render() {
    return (
      <div className="container">
        <div className="mainApp">
          <div className="searchBar">
            <span className="spotifyLogo"></span>
            <span className="titleHeader">{this.state.titleHeader}</span>
          </div>

          <div className="formGroup">

            <InputGroup className="inputGroup input-group-lg">
              <FormControl
                type="text"
                placeholder={this.state.formPlaceholderInfo}
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.search()
                  }
                }}
              />
              <InputGroup.Addon
                className="glyphIconMusic"
                onClick={() => this.search()}>
                <Glyphicon glyph="music"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </div>
          {
            this.state.artist !== null
            ?
              <div>
                <Profile artist={this.state.artist}/>
                <Gallery tracks={this.state.tracks}/>
              </div>
            : <div></div>
          }
        </div>
      </div>
    )
  }
}

export default App;
