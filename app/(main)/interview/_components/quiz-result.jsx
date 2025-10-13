// "use client"

// import { Button } from '@/components/ui/button';
// import { CardContent, CardFooter } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
// import React from 'react'

// const QuizResult = (
//   {result,hideStartNew = false,onStartNew}
// ) => {
//   if(!result){
//     return null;
//   }
//   return (
//     <div className='mx-auto'>
//       <h1 className='flex items-center gap-2 text-3xl'>
//         <Trophy className='h-6 w-6 text-yellow-500' />
//         QuizResult
//       </h1>


// <CardContent className='space-y-6'>
//   {/* score overview */}
//   <div className='text-center space-y-2'>
//     <h3 className='text-2xl font-bold'>
// {result.quizScore.toFixed(1)}%
//     </h3>
//     <Progress value={result.QuizScore} className='w-full'/>
//   </div>

// {/* Improvement Tip */}
// {
//   result.improvementTip && (
//     <div className='bg-muted p-4 rounded-lg'>
//       <p className='font-medium'>
//       Improvement Tip:
//       </p>
//       <p className='text-muted-foreground'>
//         {result.improvementTip}
//       </p>
//     </div>
//   )
// }

// {/* <div className='space-y-4'>
//   <h3 className='font-medium'>Question Review</h3>
//   {
//     result.questions.map((q,index)=>{
//       <div  key={index} className='border rounded-lg p-4 space-y-2'>
//         <div className='flex items-start justify-between gap-2'>
        
//           <p className='font-medium'>{q.question}</p>
//           {q.isCorrect ? (
//             <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0'/>
//           ) : (
//             <XCircle className='h-5 w-5 text-red-500 flex-shrink-0'/>
//           )
//         }
//         </div>


// <div className='text-sm text-muted-foreground'>
//   <p>
//     Your Answer: {q.userAnswer}
//   </p>
// {!q.isCorrect && <p>Correct Answer:{q.answer} </p> }
// </div>
    
//     <div className='text-sm bg-muted p-2 rounded'>
//       <p className='font-medium'>
// Explanation: 
//       </p>
//       <p>
//         {q.explanation}
//       </p>
//     </div>
//       </div>
    
//     })}
// </div> */}
// <div className='space-y-4'>
//   <h3 className='font-medium'>Question Review</h3>
//   {result.questions.map((q, index) => (
//     <div key={index} className='border rounded-lg p-4 space-y-2'>
//       <div className='flex items-start justify-between gap-2'>
//         <p className='font-medium'>{q.question}</p>
//         {q.isCorrect ? (
//           <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0' />
//         ) : (
//           <XCircle className='h-5 w-5 text-red-500 flex-shrink-0' />
//         )}
//       </div>

//       <div className='text-sm text-muted-foreground'>
//         <p>Your Answer: {q.userAnswer}</p>
//         {!q.isCorrect && <p>Correct Answer: {q.answer}</p>}
//       </div>

//       <div className='text-sm bg-muted p-2 rounded'>
//         <p className='font-medium'>Explanation:</p>
//         <p>{q.explanation}</p>
//       </div>
//     </div>
//   ))}
// </div>

// </CardContent>

// {
// !hideStartNew && (
// <CardFooter>
//   <Button onClick={onStartNew} className='w-full'>
// Start New Quiz
//   </Button>
// </CardFooter>
// )  
// }


//     </div>
//   )
// }

// export default QuizResult

"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import React from 'react';

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
  if (!result) return null;

  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg border border-border/60 rounded-2xl bg-gradient-to-b from-background to-muted/40">
      <CardContent className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-3xl font-semibold text-center">
          <Trophy className="h-7 w-7 text-yellow-500" />
          <h1>Quiz Result</h1>
        </div>

        {/* Score Overview */}
        <div className="text-center space-y-3">
          <h3 className="text-4xl font-bold text-primary">
            {Number(result.quizScore || 0).toFixed(1)}%
          </h3>
          <Progress
            value={result.quizScore}
            className="w-full h-3 rounded-full bg-muted"
          />
          <p className="text-muted-foreground text-sm">
            Great effort! Here’s how you performed.
          </p>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-muted/70 p-4 rounded-xl border border-border/40">
            <p className="font-semibold text-foreground mb-1">Improvement Tip 💡</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.improvementTip}
            </p>
          </div>
        )}

        {/* Question Review */}
        <div className="space-y-5">
          <h3 className="font-semibold text-lg">Question Review</h3>

          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-border/60 rounded-xl p-4 space-y-3 bg-background/60 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-foreground">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium text-foreground">Your Answer:</span>{' '}
                  {q.userAnswer}
                </p>
                {!q.isCorrect && (
                  <p>
                    <span className="font-medium text-foreground">
                      Correct Answer:
                    </span>{' '}
                    {q.answer}
                  </p>
                )}
              </div>

              <div className="text-sm bg-muted/50 p-3 rounded-lg border border-border/30">
                <p className="font-semibold text-foreground mb-1">Explanation:</p>
                <p className="leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="pt-0">
          <Button
            onClick={onStartNew}
            className="w-full text-base font-medium py-2.5 rounded-xl"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuizResult;
