import React from 'react';

class UserInterface extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            "analyze-text": "",
            "analyze-result": "",
            "location-text": "",
            "location-result": ""
        }

        this.onAnalyzeTextChange = this.onAnalyzeTextChange.bind(this);
        this.onLocationTextChange = this.onLocationTextChange.bind(this);
        this.postConcordance = this.postConcordance.bind(this);
        this.postLocation = this.postLocation.bind(this);
    }

    //State change methods

    onAnalyzeTextChange(event){
        this.setState({
            "analyze-text": event.target.value
        }, function(){
            console.log(event.target.value)
        })
    }

    onLocationTextChange(event){
        this.setState({
            "location-text": event.target.value
        }, function(){
            console.log(event.target.value)
        })
    }

    //Posting methods

    postConcordance(){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(this.state["analyze-text"])
        };
        
        fetch('mscs721/concordance/1.0.0/analyze', requestOptions)
          .then(response => {
            this.setState({
                "analyze-result": JSON.stringify(response)
            })

            console.log(response);
          });
      }
      
    postLocation(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(this.state["location-text"])
        };
    
        fetch('mscs721/concordance/1.0.0/locate', requestOptions)
            .then(response => {
                this.setState({
                    "location-result": JSON.stringify(response)
                })
                console.log(response);
        });
    }

    render() {
        const locationResult = this.state["location-result"];
        const analysisResult = this.state["analyze-result"];

        return (
            <div>
                <div>
                  <h1>Concordance</h1>
                  <label for="concordance">Input:</label>
                  <br></br>
                  <input type="text" id="concordance" name="concordance" onChange={this.onAnalyzeTextChange}/>
                  <input type="button" value="Submit" onClick={this.postConcordance}/>
                  
                  <br></br>
                  <br></br>

                  <label for="concordance">Result:</label>
                  <br></br>
                    <p id="concordance-result">{analysisResult}</p>
                </div>
        
                <div>
                  <h1>Locator</h1>
                  <label for="locator">Input:</label>
                  <br></br>
                  <input type="text" id="locator" name="locator" onChange={this.onLocationTextChange}/>
                  <input type="button" value="Submit" onClick={this.postLocation}/>
                  
                  <br></br>
                  <br></br>

                  <label for="locator">Result:</label>
                  <br></br>
                    <p id="locator-result">{locationResult}</p>
                </div>
            </div>
          );
    }
}

export default UserInterface;