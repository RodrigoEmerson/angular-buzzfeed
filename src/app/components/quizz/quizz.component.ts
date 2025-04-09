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
  answersSelected:string = ''

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
    console.log(this.answers)
  }
  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      this.finished = true
    }
  }
}
