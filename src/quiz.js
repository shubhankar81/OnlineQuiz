import { Component } from "react";


const  operators = ['+','-','*','/']

class Quiz extends Component {
    render(){
        return(<div className="jumbotron row quiz">
            <div className="col-sm-6">
                <FirstQuiz />
            </div>
            <div className="col-sm-6">
                <SecondQuiz />
            </div>
        </div>)
    }
}
class FirstQuiz extends Component {
    constructor(props){
        super(props)
        this.state={
            startflag : 0,
            question : [],
            qselected : 1,
            answerText : ""
        }
        
    }
    getRandom(n){
        return Math.floor(Math.random()*n+1)
    }
    changeStartFlag = () => {
        let {startflag, question} = this.state
        let q={}
        for(let i=0; i<5; i++){
            q={}
            q.qid=i+1
            q.questionText=this.getRandom(9)+operators[this.getRandom(3)]+this.getRandom(9)
            q.answer = eval(q.questionText).toFixed(1)
            question.push(q)
        }

        this.setState({
            startflag : 1,
            question
        })
    }
    handleChange = (event) =>{
        let { answerText } = this.state
        this.setState({
            answerText : event.target.value
        })
    }
    nextQuestion = () => {
        let { answerText, qselected, question, startflag } = this.state
        question.map(_q => {
            if(_q.qid == qselected){
                _q.submittedAnswer = answerText
                _q.result = Number(_q.answer) == Number(answerText) ? true : false
                answerText=""
            }
        })
        if(qselected+1 > question.length){
           startflag = 2
        }else{            
            ++qselected
        }
        
        this.setState({
            startflag,
         qselected,
         question,
         answerText
        })
    }
    resetQuiz = () => {
        this.setState({
            startflag : 0,
            question : [],
            qselected : 1,
            answerText : ""
        })
    }
    render(){
        let { startflag, question, qselected, answerText } =this.state
        let printQuestion = question.filter(_r => _r.qid == qselected)
        let score = question.filter(_r=> _r.result == true)
        return(<div>
            { startflag == 0 ? 
                    <center> <button className="btn btn-primary" onClick={this.changeStartFlag}>Start Quiz</button></center> :
            <div>
                <div><button className="btn btn-danger" onClick={this.resetQuiz}>Reset</button></div>
                { startflag == 2 ? <center>Your Final Score is : {score.length}</center>
            : 
                    <div className="row">
                        <div><h3>{printQuestion[0].questionText}</h3></div>
                        <div><input value={answerText} type="text" className="form-control" onChange={this.handleChange} /></div>
                        <div><button className="btn btn-secondary" onClick={this.nextQuestion}>Next</button></div>
                        <div>Your Score : {score.length}</div>
                    </div>
            }</div>
        }
        </div>)
    }
}
class SecondQuiz extends Component {
    render(){
        return(<div>
            This is Second Quiz
        </div>)
    }
}
export default Quiz
