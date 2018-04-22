import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
    const yUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=253124237581-mjnl8jd7bdrvc57sendkadmvqkgr1r9q.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/yt-analytics.readonly&state=state_parameter_passthrough_value'

    class App extends React.Component{
        constructor(props){
            super(props);

            console.log('in constructor');
            console.log(this.props);

            this.state = {
                token: ''
            }

            if(window.location.href.indexOf('access_token') > 0 || this.state.token ){

            }
            else{
                window.location.replace(yUrl);
            }
            

           
        }

        componentDidMount(){
            console.log('right before api call');
            console.log('props available ', this.props);

            fetch(yUrl)
            .then(results =>{
                console.log('within the api-call-then');
                console.log('results: ', results);
            })
        }

        render() {
            
            // Project entry for code here:
            console.log('test');

            
            

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
  