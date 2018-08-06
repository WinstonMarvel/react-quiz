import React, { Component } from 'react';
import questionList from './questionList';

class App extends Component {
  constructor(props){
    super(props);

    this.questionList = questionList;

    this.state = {
      score: 0,
      currentQuestion: 0,
      currentAnswer : "",
      wrongAnswers: [],
      lastQuestion: this.questionList.length - 1,
      results: false
    }
  }

  checkAnswer = ()=>{
   if((this.questionList[this.state.currentQuestion].a).toLowerCase() == this.state.currentAnswer)
      this.setState({ score: this.state.score+1});
   else{
      var wrongAnswers = [...this.state.wrongAnswers];
      wrongAnswers.push(this.state.currentQuestion);
      this.setState({ wrongAnswers:  wrongAnswers});
   }
   if(this.state.currentQuestion == this.state.lastQuestion){
      this.setState({results:true});
      return false;
   }
   this.setState({ currentQuestion:  this.state.currentQuestion+1, currentAnswer: "" });
  }

  ListWrongAnswers = (ele,i)=>{
    return (
      <li>Q: {this.questionList[this.state.wrongAnswers[i]].q} <br/>
      A: {this.questionList[this.state.wrongAnswers[i]].a} </li>
    )
  }


  render() {
    if(this.state.results){
      return (
        <div id="results" className="mt-2">
        <h2>Total Score = {this.state.score}</h2>
          <h2>Wrong Answers:</h2>
          <ul>
            {this.state.wrongAnswers.map(this.ListWrongAnswers)}
          </ul>
        </div>
      )
    }
    else
      return (
        <div className="App">
            <div className="row">
              <div className="col-md-12 mb-2 mt-5">
                <h2 id="question">{this.questionList[this.state.currentQuestion].q}</h2>
              </div>
            </div>  
            <div className="row">
              <div className="input-group col-md-4">
                <input id="answer" className="form-control" type="text" placeholder="Type Answer" value={this.state.currentAnswer} onChange={ (e)=> {
                    this.setState({currentAnswer: (e.target.value).toLowerCase()})
                }} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                <button id="next" className="btn-primary btn" onClick={
                  this.checkAnswer
                }>
                  Next</button>
              </div>
            </div>
        </div>
      );
  }
}

export default App;
