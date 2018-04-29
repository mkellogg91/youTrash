import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';

  
    const yUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=253124237581-mjnl8jd7bdrvc57sendkadmvqkgr1r9q.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/yt-analytics.readonly&state=state_parameter_passthrough_value'
    const verUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='


    class App extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                token: '',
                likesId: ''
            }

            let locationParams = window.location.hash ?  window.location.hash.split('&') : [];
            let tokenVal = '';

            // loop through url parameters and grab token if it exists
            if(locationParams){
                for(let x = 0; x < locationParams.length; x++){
                    let current = locationParams[x];
                    if(current.indexOf('access_token') !== -1){
                        tokenVal = current.substring(current.indexOf('=')+1);
                    }
                }
               this.state.token = tokenVal;
            }

            // token verifier
            if(this.state.token ){
                // check if token is valid. if it fails redirect to authorization page
                fetch(verUrl + this.state.token)
                    .then(response =>{
                        
                        if(!response.ok){
                            window.location.replace(yUrl);
                        }
                    })
            }   
            // redirect back to authorize page
            else{
                window.location.replace(yUrl);
            }
            
        }

        componentDidMount(){

            let getChannelIdUrl = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=' + this.state.token;
            let getLikeChannelInfoUrl;

            // gets the likes channel id and calls getPlaylistItems function
            fetch(getChannelIdUrl)
            .then(results =>{
                results.json().then(jsonResults => {
                    this.setState({token: this.state.token, likesId: jsonResults.items[0].contentDetails.relatedPlaylists.likes})
                    getLikeChannelInfoUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails, id, snippet, status&maxResults=50&playlistId=' + this.state.likesId +  '&access_token=' + this.state.token;
                    this.getPlaylistItems(getLikeChannelInfoUrl);
                })
            })
        }

        render() {
            
            // display
            return (
                <div>
                    <div className="jumbotron text-center shadow-lg">
                        <h1>Welcome To YouTrash</h1>
                        <div>a tool for viewing recent video likes on YouTube</div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10" align="center">
                            <StatTable tableData={this.state.playlistItems} />
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <div className="jumbotron text-center">
                        <h5>Thanks For Visiting, Do Come Again!</h5>
                    </div>
                </div>
                
            );
        }

        // gets info on the videos in the liked playlist
        getPlaylistItems(getPlayListItemsUrl){
            fetch(getPlayListItemsUrl)
            .then(results => {
                results.json()
                .then(jsonResults =>{
                    let mappedResults = jsonResults.items.map(item =>{
                        return {
                            title: item.snippet && item.snippet.title ? item.snippet.title : '',
                            videoId: item.contentDetails && item.contentDetails.videoId ? item.contentDetails.videoId : '',
                            videoPublishedDate: item.contentDetails && item.contentDetails.videoPublishedAt ? item.contentDetails.videoPublishedAt : '' ,
                            channelTitle: item.snippet && item.snippet.channelTitle ? item.snippet.channelTitle : '',
                            description: item.snippet && item.snippet.description ? item.snippet.description : '',
                            likedOnDate: item.snippet && item.snippet.publishedAt ? item.snippet.publishedAt : '',
                            thumbnailUrl: item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url : '',
                            status: item.status && item.status.privacyStatus ? item.status.privacyStatus : '',
                            channelId: item.snippet && item.snippet.channelId ? item.snippet.channelId : '',
                            playListId: item.snippet && item.snippet.playlistId ? item.snippet.playlistId : '',
                        };
                    });
                    
                    this.setState({token: this.state.token, likesId: this.state.likesId, playlistItems: mappedResults});
                  
                })
            })
        }
       

    }

    class StatTable extends React.Component{
        
        imgClickHandler(item){
            if(item.playListId && item.videoId){
                window.open('https://www.youtube.com/watch?v=' + item.videoId + '&list=' + item.playListId);
            }
           
        }
        
        render(){

            // logic here
            var tableData = this.props.tableData || [];
           
           

            // display
            return(
               
                <div>
                    <table className="table-bordered table-striped">
                        <thead>
                            <tr className="text-center">
                                <th>Title</th>
                                <th>Status</th>
                                <th>Liked On</th>
                                <th>Published On</th>
                                <th>Video ID</th>
                                <th>Channel ID</th>
                                <th>Thumbnail</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            tableData.map((el, i) => 
                            <tr key={i}>
                                <td className="p-2"> {el.title ? el.title : ''} </td>
                                <td className="p-2"> {el.status? el.status : ''} </td>
                                <td className="p-2"> {el.likedOnDate ? Moment(el.likedOnDate).format('DD/MM/YYYY') : ''} </td>
                                <td className="p-2"> {el.videoPublishedDate ? Moment(el.videoPublishedDate).format('DD/MM/YYYY') : ''} </td>
                                <td className="p-2"> {el.videoId ? el.videoId : ''} </td>
                                <td className="p-2"> {el.channelId ? el.channelId : ''} </td>
                                <td className="p-2">
                                    <img src={el.thumbnailUrl ? el.thumbnailUrl: ''} className="rounded"  alt="thumbnail" onClick={()=>this.imgClickHandler(el)} />
                                </td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <br/><br/><br />
                </div>
            );
           
        }
    }
  
  
    // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  