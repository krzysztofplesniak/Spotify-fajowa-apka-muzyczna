import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
    artist = this.props.artist;

    return (
      <div className="profile">
        <img className="profile-img" src={artist.images[0].url}/>
        <div className="profile-info">

          <div className="profile-name">Wykonawca:  {artist.name}</div>
          <div className="profile-followers">Liczba słuchaczy:  {artist.followers.total}</div>
          <div className="profile-genres">Rodzaj muzyki: {
                artist.genres.map((genre, k) => {
                return (
                  <span key={k}>{genre}, </span>
                )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
