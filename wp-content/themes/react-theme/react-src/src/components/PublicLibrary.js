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

    parseContentStopId(content) {
        let res = content.match(/<li>\d+<\/li>/gm);
        let stops = res ? res.map(item => {
            let idStr = item.slice(4, -5)
            return parseInt(idStr);
        }) : [];
        return stops;
    }

    getStopInfo = (id) => {
        let time =  new Date().getTime();
        return fetch('/wp-json/wp/v2/stop/' + id +'?timestamp=' + time)
            .then(res => res.json())
            .then(data => { 
                // console.log(entry);
                const { id, thumbnail_url, title } = data;
                const e = {
                    id,
                    thumbnail_url,
                    name: title.rendered,
                };
                return e;
            });
    };

    componentDidMount() {
        let time =  new Date().getTime();
        fetch('/wp-json/wp/v2/tour?timestamp=' + time)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            let tourInfo = data.map((tour) => {
                const {id, title, content} = tour;

                return {id, name: title.rendered, entries: this.parseContentStopId(content.rendered)};
            });
            // console.log(playlistInfo);
            return tourInfo;
        })
        .then((tourInfo) => {
            // get stop per tour

            let stopDic = {};
            tourInfo.map(tour => 
            {
                const { entries } = tour;
                entries.map(stop => {
                    if (!stopDic[stop])
                    {
                        stopDic[stop] = {};
                    }
                });    
            });           
            const allRequests = [];
            for (var stopId in stopDic)
            {

                allRequests.push(this.getStopInfo(stopId));
            }

            // wait for all requests to finish
            return Promise.all(allRequests).then((stopData) => {
                    stopData.map(stop => {
                        const { id }  = stop;
                        stopDic[id] = stop;
                    });
                    return tourInfo.map(tour => 
                    {
                        const { id, name, entries } = tour;
                        let newStopInfo = entries.map(stopId => {
                            return stopDic[stopId];
                        });
                        return {id, name, entries: newStopInfo};    
                    }); 
                });
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