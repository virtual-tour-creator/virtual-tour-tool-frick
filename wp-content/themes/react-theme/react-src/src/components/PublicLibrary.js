import React from 'react';
import Navbar from './Navbar/Navbar';
import Jumbotron from './Jumbotron/Jumbotron';
import Playlist from './Playlist/Playlist';
import CreateTour from './Button/CreateTour';

class PublicLibrary extends React.Component {
    constructor() {
        super();
        this.state = {
            playlists: []
          };
    }

    componentDidMount() {
        let time =  new Date().getTime();
        fetch('/wp-json/wp/v2/categories?timestamp=' + time)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            let playlistInfo = data.map((playlist) => {
                const {id, count, name} = playlist;
                return {id, count, name, entries: []};
            });
            // console.log(playlistInfo);
            return playlistInfo;
        })
        .then((playlistInfo) => {
            // get entry per playlist
            const allRequests = playlistInfo.map(playlist => 
                {
                    const { id, name } = playlist;     
                    return fetch('/wp-json/wp/v2/stop?categories=' + id +'&timestamp=' + time)
                            .then(res => res.json())
                            .then(data => { 
                                const entries = data.map( (entry) => {
                                    // console.log(entry);
                                    const { id, thumbnail_url, title } = entry;
                                    const e = {
                                        id,
                                        thumbnail_url,
                                        name: title.rendered,
                                    };
                                    return e;
                                });
                                return { id, name, entries};
                            });
                }            
            );
            // wait for all requests to finish
            return Promise.all(allRequests);
        })
        .then((finalInfo) => {
            console.log(finalInfo);
            this.setState({ playlists: finalInfo });
        })
        .catch(console.log);

        
    }

    render() {    
        return (
            <div className="public-library">
                <Navbar />
                <Jumbotron />
                <CreateTour />
                <Playlist playlists={this.state.playlists} />
            </div>
        )
    }
}

export default PublicLibrary;