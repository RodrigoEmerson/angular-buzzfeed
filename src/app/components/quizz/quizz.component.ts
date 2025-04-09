import { Component, OnInit } from '@angular/core';
import quizz_question from "../../../assets/data/quizz_questions.json"
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-quizz',
  imports: [CommonModule ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  
  title:string = ''

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  
  constructor( ) { }

  ngOnInit(): void {
    if(quizz_question){
      this.finished = false
      this.title = quizz_question.title

      this.questions = quizz_question.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
      
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    
  }
  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_question.results[finalAnswer as keyof typeof quizz_question.results]

      console.log(this.answers)
    }
  }

  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i , arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
        }else{
          return current
        }
  })
    return result

    }
}

