import { Component } from "react";


const  operators = ['+','-','*','/']
var interval;
class App extends Component {
   constructor(props){
    super(props)
    this.state={
      score1 : 0,
      score2 : 0,
      finalScore : 0
    }
   }
   updateScore1 = (score) => {
    let { score1, score2, finalScore } = this.state
    score1 = score
    this.setState({
      finalScore : score1+score2,
      score1
    })
   }
   updateScore2 = (score) => {
    let { score1, score2, finalScore } = this.state
    score2 = score
    this.setState({
      finalScore : score1+score2,
      score2
    })
   }
    render(){
      let { finalScore } =  this.state
        return(<div className="jumbotron row quiz">
           <div className="col-sm-12"> <center><h4>Your Total Score is : {finalScore}</h4></center></div>
            <div className="col-sm-6">
                <QuizPanel update={this.updateScore1} value={1} />
            </div>
            <div className="col-sm-6">
                <QuizPanel update={this.updateScore2} value={2} />
            </div>
            <div className="note"><i>note* : only one timer is activated at a time of selected quiz.</i></div>
        </div>)
    }
}
class QuizPanel extends Component {
    constructor(props){
        super(props)
        this.state={
            startflag : 0,
            question : [],
            qselected : 1,
            answerText : "",
            qCount : 0,
            seconds : 0,
            randomNo : 0
        }
        
    }
    // genrating random no with in a range n
    getRandom(n){
        return Math.floor(Math.random()*n+1)
    }
    //set timer for 20 seconds
    startTimer(){
      let {seconds, startflag}=this.state;
      seconds = 0
      clearInterval(interval)
      interval = setInterval((e)=>{
        this.setState({
          seconds : ++seconds
        })
      }, 1000) 
    }    
    //after clicking on start quiz button
    changeStartFlag = () => {
        let {startflag, question, qCount, seconds, randomNo} = this.state
        let q={}
        qCount = qCount == 0 ? 20 : qCount;
        randomNo = randomNo == 0 ? 10 : randomNo;
        for(let i=0; i<qCount; i++){
            q={}
            q.qid=i+1
            q.questionText=this.getRandom(randomNo)+operators[this.getRandom(3)]+this.getRandom(randomNo)
            q.answer = eval(q.questionText).toFixed(1)
            question.push(q)
        }
        this.startTimer()
        this.setState({
            startflag : 1,
            question,
            qCount,
            randomNo
        })
    }
    // text input handle change function
    handleChange = (event) =>{
        let { answerText, qCount, randomNo } = this.state
        switch(event.target.name){
          case "noOfQues" :
                    qCount = event.target.value;
                    break;
          case "randomNo" : 
                    randomNo = event.target.value;
                    break;
          default :
                answerText = event.target.value
        }
        this.setState({
            qCount, randomNo, answerText
        })
    }
    // called on next button click or when timer exceeds over 20 sec
    nextQuestion = () => {
        let { answerText, qselected, question, startflag, seconds } = this.state
        clearInterval(interval)
        question.map(_q => {
            if(_q.qid == qselected){
                _q.submittedAnswer = Number(answerText).toFixed(1)
                _q.result = Number(_q.answer) == Number(answerText) ? true : false
                answerText=""
            }
        })
        if(qselected+1 > question.length){
           startflag = 2           
        }else{            
        this.startTimer()
            ++qselected
        }
        this.props.update(question.filter(_r=> _r.result == true).length)
        this.setState({
            seconds : 0,
            startflag,
            qselected,
            question,
            answerText
        })
    }
    // reset button event fire
    resetQuiz = () => {
      clearInterval(interval)
      this.props.update(0)
        this.setState({
            startflag : 0,
            question : [],
            qselected : 1,
            answerText : ""
        })
    }
    // 20 sec time check for timer
    componentDidUpdate(){
      let { seconds } = this.state
      if(seconds>20){
        this.nextQuestion()
      }
    }
    render(){
        let { startflag, question, qselected, answerText, qCount, seconds } =this.state
        let printQuestion = question.filter(_r => _r.qid == qselected)
        let score = question.filter(_r=> _r.result == true)
        return(<div>
            { startflag == 0 ? 
                    <center>
                      <table>
                        <tr><td>No Of Question : </td><td><input type="number" placeholder="by default 20 ques " className="form-control" onChange={this.handleChange} name="noOfQues"></input></td></tr>
                        <tr><td>Max No. to genrate random no : </td><td><input type="number" placeholder="by default max is 10" className="form-control" onChange={this.handleChange} name="randomNo" /></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td><td><button className="btn btn-primary" onClick={this.changeStartFlag}>Start Quiz</button></td></tr>
                      </table></center>
                        :
            <div>
          { startflag == 2 ? 
              <center>Your Final Score of Quiz{this.props.value} is : {score.length}
                <table className="table">
                  <tr><th>Sr. No.</th><th>Question</th><th>SubmittedAnswer</th><th>Correct Answer</th></tr>
                  {
                    question.map(_result=> {
                      return <tr className={_result.result != true ? "wrong" : ""}><td>{_result.qid}</td><td>{_result.questionText}</td><td>{_result.submittedAnswer}</td><td>{_result.answer}</td></tr>
                    })
                  }
                </table>
                </center>
            : 
                    <div className="row">
                        <table className="table">
                          <tbody>
                            <tr><td>Timer : {seconds}</td><td><h4>Quiz {this.props.value}</h4></td><td>Question {qselected} of {qCount}  <button className="btn btn-sm right btn-danger" onClick={this.resetQuiz}>Reset</button></td></tr>
                            <tr><td></td><td><h3>Question : {printQuestion[0].questionText}</h3></td><td></td></tr>
                            <tr><td></td><td><input value={answerText} type="number" className="form-control" placeholder="00.00" onChange={this.handleChange} /></td><td></td></tr>
                            <tr><td></td><td></td><td><button className="btn btn-success" onClick={this.nextQuestion}>Next</button></td></tr>
                            <tr></tr>    
                            <tr><td><b>Your Quiz{this.props.value} Score : {score.length}</b></td><td></td><td></td></tr>
                          </tbody>
                        </table>
                        
                    </div>
            }</div>
        }
        </div>)
    }
}

export default App
