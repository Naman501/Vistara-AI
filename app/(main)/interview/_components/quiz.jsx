"use client"

import { generateQuiz } from '@/actions/interview';
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useFetch from '@/hooks/use-fetch';
import { Button } from '@/components/ui/button';
import { BarLoader } from 'react-spinners';

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false)


      const {
        loading:generatingQuiz,
        fn:generateQuizFn,
        data:quizData
      }=useFetch(generateQuiz)


      if(generatingQuiz){
        return <BarLoader  className="mt-4" width={"100%"} color="gray" />;
      }
      

      useEffect(()=>{
        if(quizData){
            setAnswers(new Array(quizData.length).fill(null))
        }
      },[quizData])
if(!quizData){
    return(
       <div>
        <Card className="mx-2">
  <CardHeader>
    <CardTitle>Ready to test your Knowledge?</CardTitle>
  </CardHeader>
  <CardContent>
    <p
   className='text-muted-foreground' 
    >This quiz contains 10 questions specific to your industry and skills.Take your time and choose the best answer for each question.</p>
  </CardContent>
  <CardFooter>
     <Button className="cursor-pointer text-sm md:text-base whitespace-nowrap" onClick={generateQuizFn} >Start Quiz</Button>
  </CardFooter>
</Card>
       </div>
    )
}

      

  return (
    <div>Quiz</div>
  )
}

export default Quiz