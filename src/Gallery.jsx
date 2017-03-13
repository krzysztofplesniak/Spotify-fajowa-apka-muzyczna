import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    audio.play();
  }

  render() {
    const { tracks } = this.props;
    return (
      <div>
        {
          tracks.map((track, k) => {
            const trackImg = track.album.images[0].url;
            if (k < 8) {
              return (
              <div key={k} className="track" onClick={() => this.playAudio(track.preview_url)}>
                <img src={trackImg} className="track-img"/>
                <div className="track-play">
                  <div className="track-play-inner">
                    {
                      this.state.playingUrl === track.preview_url
                        ? <span>| |</span>
                        : <span>&#9654;</span>
                    }
                  </div>
                </div>
                <p className="track-text">{track.name}</p>
              </div>
            )}
          }
        )}
      </div>
    )
  }
}

export default Gallery;
