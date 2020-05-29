 import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import spotify_logo from './img/Spotify_logo.png'; // with import
import connect from './img/connect.png'
import corbeille from './img/corbeille.png'
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {

  constructor(){
    super();
    const intervalID = 0;
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      me:{ name: 'Login', profilpic:connect, userid:''},
      tracks: [],
      insertTracks: {},
      serverData: {},
      loggedIn: token ? true : false,
      nowPlaying: { name: '', albumArt: '',popularity:' '},
    }


  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
              albumName : response.item.album.name,
              albumReleaseDate : response.item.album.release_date,
              popularity : response.item.popularity,
              artist : response.item.artists[0].name,
              preview : response.item.preview_url,

            }
        });
      })
      .catch((error) => {
          alert('connectez vous ou lancez une musique')
      })
  }

  getMe(){
    spotifyApi.getMe()
    .then((response) => {
      this.setState({
        me: {
          name:response.display_name,
          profilpic: response.images[0].url,
          userid: response.id
      }
});
})
}

   // FETCH USERS FROM DATABASE
getTrackInfo(){
   Axios.get('http://localhost:8080/spotitrack/api/get_track_info.php')
       .then(res => {
           const data = res.data
           console.log(data);
           const tracks = data.track.map(u =>
                        <tr>
                          <td>{u.id_track}</td>
                          <td>{u.name_track}</td>
                          <td>{u.name_album}</td>
                          <td>{u.name_artist}</td>
                          <td>{u.date_album}</td>
                          <td>{u.popularity_track}</td>
                          <td>
                            <audio controls="controls">
                                <source src={u.preview_track} type="audio/mpeg"/>
                            </audio>
                          </td>
                          <td>
                            <img className="icon" alt="cover de l'album" src={u.album_pic}/>
                          </td>
                          <td><button id={u.id_track} onClick={this.deleteTrackInDatabase.bind(this, u.id_track)}><img src={corbeille}/></button></td>
                        </tr>

                        )

                        this.setState({
                            tracks
                        })

       })
       .catch((error) => {
           console.log(error)
       })
}

addTrackInDatabase(){

  const name_track = this.state.nowPlaying.name;
  const name_artist= this.state.nowPlaying.artist;
  const cover_album =this.state.nowPlaying.albumArt;
  const name_album=this.state.nowPlaying.albumName;
  const release_date_album =this.state.nowPlaying.albumReleaseDate;
  const popularity_song =this.state.nowPlaying.popularity;
  const preview_song  =this.state.nowPlaying.preview;
  const user_id = this.state.me.userid;

  Axios.post('http://localhost:8080/spotitrack/api/add_track_info.php', {
    name_track,
    name_artist,
    cover_album,
    name_album,
    release_date_album,
    popularity_song,
    preview_song,
    user_id
   })
   .then(res => {
        console.log(res);
        console.log(res.data);
      })
}

deleteTrackInDatabase(idtodelete, event){
  alert("Vous venez de retirer cette musique de votre historique");
  Axios.post('http://localhost:8080/spotitrack/api/delete_track_info.php', {idtodelete})
  .then(res => {
      this.getTrackInfo();
       console.log(res);
       console.log(res.data);
     })
}


componentDidMount(){
        this.getMe()
        this.getTrackInfo()

    }


  render() {
    return(
      <Router>
      <div className="App">
        <nav className="navbar sticky-top navbar-expand-md bg-dark navbar-dark">
          <img src={spotify_logo} alt="logo spotify"/>

          <a className="navbar-brand" href="localhost:8080">SpotiTrack</a>

          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbar" className="navbar-collapse collapse hide">
            <ul className="navbar-nav">

              <li className="nav-item">
                <NavLink  to="/" exact className="nav-link">En ecoute</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/history" className="nav-link">Historique</NavLink>
              </li>
            </ul>

            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">

                <a className="nav-link" href='http://localhost:8888/login'> <img src={this.state.me.profilpic} alt="logo spotify"/> {this.state.me.name} </a>
              </li>
            </ul>
          </div>
        </nav>
         </div>

        <Route path="/" exact strict render={
          () => {

           return(
             <div>
             <table className="table table-hover table-bordered table-striped">
              <tbody>
                <tr>
                  <td> <b>Titre :</b></td>
                  <td onChange={this.addTrackInDatabase()}>{ this.state.nowPlaying.name } </td>
                </tr>
                <tr>
                  <td> <b>Artiste :</b></td>
                  <td>{ this.state.nowPlaying.artist } </td>
                </tr>
                <tr>
                  <td><b>Nom de l'album : </b></td>
                  <td>{ this.state.nowPlaying.albumName } </td>
               </tr>
               <tr>
                 <td><b>Date de sortie de l'album : </b></td>
                 <td>{ this.state.nowPlaying.albumReleaseDate} </td>
              </tr>
               <tr>
                 <td><b>Popularité du son : </b></td>
                 <td>{ this.state.nowPlaying.popularity} </td>
              </tr>
              <tr>
                <td><b>Extrait : </b></td>
                <td>
                <audio controls="controls">
                  <source src={this.state.nowPlaying.preview} type="audio/mpeg"/>
                </audio>
                </td>
             </tr>
               </tbody>
             </table>
               <div>
                 <img className="center" src={this.state.nowPlaying.albumArt} style={{ height: 500, width:500 }} alt=" "/>
               </div>

               <button className="btn btn-success btn-lg btn-block center" onClick={() => { this.getNowPlaying(); }}> Information sur le son du moment </button>

            </div>
             );
              }
          }/>

          <Route path="/history" exact strict render={
            () => {
             return(
               <div className="database_tracks">
                  <table className="table table-hover table-bordered table-striped">
                   <thead className="table-success">
                     <tr>
                       <td><b> # </b></td>
                       <td><b> Intitulé </b></td>
                       <td><b> Album </b></td>
                       <td><b> Artiste </b></td>
                       <td><b> Date de sortie </b></td>
                       <td><b> Popularité  </b></td>
                       <td><b> Extrait </b></td>
                       <td><b>Cover </b></td>
                       <td><b> </b></td>
                     </tr>
                   </thead>
                   <tbody>
                   {this.state.tracks}
                   </tbody>
                  </table>
                </div>
             );
       }
     }/>
    </Router>
  );

  }

}


export default App;
