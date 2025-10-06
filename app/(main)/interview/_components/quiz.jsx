"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner";
import QuizResult from "./quiz-result";


const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);


const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data:resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

console.log(resultData);



  // ✅ All hooks are called before any return
  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

const handleAnswer = (answer)=>{
  const newAnswers = [...answers];
  newAnswers[currentQuestion]=answer;
  setAnswers(newAnswers);
}


const handleNext = ()=>{
if(currentQuestion<quizData.length-1){
  setCurrentQuestion(currentQuestion+1);
  setShowExplanation(false)
}
else{
  finishQuiz()
}
}

const calculateScore = ()=>{
  let correct=0;
  answers.forEach((answer,index)=>{
    if(answer === quizData[index].correctAnswer){
      correct++;
    }
  })
  return (correct/quizData.length)*100;
}

const finishQuiz = async ()=>{
const score=calculateScore();
try {
  await saveQuizResultFn(quizData,answers,score)
  toast.success("Quiz Completed!")
} catch (error) {
  toast.error(error.message || "Failed to save quiz results")
}
}

const startNewQuiz =  ()=>{
  setCurrentQuestion(0);
  setAnswers([]);
  setShowExplanation(false);
  generateQuizFn();
  setResultData(null);
}


  // ✅ Loading State (safe to return here)
  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }


if(resultData){
  return(
    <div className="mx-2">
      <QuizResult 
      result={resultData}
      onStartNew={startNewQuiz}
      />
    </div>
  )
}


  // ✅ No quiz yet — show intro card
  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your Knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You will find 10 questions in this quiz, all relevant to your
            industry and skills. Please consider each question thoughtfully and
            select the optimal answer.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="cursor-pointer text-sm md:text-base whitespace-nowrap"
            onClick={generateQuizFn}
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // ✅ Main quiz display
  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{question?.question}</p>
        {/* Add answer options here */}

        <RadioGroup
        onValueChange={handleAnswer}
        className="space-y-2"
       value={answers[currentQuestion]}
       >{
            question.options.map((option,index)=>{
  return(
    <div 
     key={index}
    className="flex items-center space-x-2">
    <RadioGroupItem
    value={option} id={`option-${index}`} />
    <Label htmlFor={`option-${index}`} >{option}</Label>
  </div>
  )
})}
</RadioGroup>


{showExplanation && (<div className="mt-4 p-4 bg-muted rounded-lg">
    <p className="font-medium">Explanation:</p>
    <p className="text-muted-foreground">{question.explanation}</p>
  </div>)}
      </CardContent>
      <CardFooter>
        {!showExplanation &&(
          <Button
          className="cursor-pointer "
          variant="outline"
          disabled={!answers[currentQuestion]}
          onClick={() => setShowExplanation(true)}
        >
          Show Explanation
        </Button>
        )}

 <Button
         disabled={!answers[currentQuestion] || savingResult}
         variant="outline"
          onClick={(handleNext)}
          className="ml-auto"
        >

          {
            savingResult && (
              <BarLoader className="mt-4" width={"100%"} color="gray" />
            )
          }

          {
            currentQuestion < quizData.length-1
            ? "Next Question" 
            : "Finish Quiz"
          }
        </Button>
        
      </CardFooter>
    </Card>
  );
};

export default Quiz;

