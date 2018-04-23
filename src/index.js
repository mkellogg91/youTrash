import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
    const yUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=253124237581-mjnl8jd7bdrvc57sendkadmvqkgr1r9q.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/yt-analytics.readonly&state=state_parameter_passthrough_value'
    const verUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='


    class App extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                token: '',
                favoritesId: ''
            }

            let locationParams = window.location.hash ?  window.location.hash.split('&') : [];
            let tokenVal = '';

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
                        console.log('went into the token validator then, response: ', response);
                        if(!response.ok){
                            window.location.replace(yUrl);
                        }
                    })
            }   
            else{
                window.location.replace(yUrl);
            }
            
        }

        componentDidMount(){
            console.log('right before api call');
            console.log('props available ', this.state);

            let getChannelIdUrl = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=' + this.state.token;

            fetch(getChannelIdUrl)
            .then(results =>{
                results.json().then(jsonResults => {
                    console.log('here is my json ', jsonResults);
                    this.setState({token: this.state.token, favoritesId: jsonResults.items[0].contentDetails.relatedPlaylists.favorites})
                    console.log('the state ', this.state);
                })
            })
        }

        render() {
            
            // Project entry for code here:
            console.log('1st to run after constructor');

            
            

            // display
            return (
                <div>
                    <div className="header">
                        <h1>Welcome To YouTrash</h1>
                        <div>a tool for viewing YouTube statistics</div>
                    </div>
                    <div>
                        {/* table? */}
                    </div>
                </div>
                
            );
        }

       

    }

  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  