import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/stats-cards';
import PerformanceChart from './_components/PerformanceChart';
import QuizList from './_components/QuizList';

const InterviewPage =async () => {

  const assessments=await getAssessments();

  return (
    <div>
        <h1 className='text-6xl font-bold
         mb-5
         bg-gradient-to-b from-gray-100 to-gray-400 
               bg-clip-text text-transparent
        '>Interview Page</h1>
        <div className='space-y-6'>
          <StatsCards assessments={assessments}/>
          <PerformanceChart assessments={assessments}/>
          <QuizList assessments={assessments}/>
        </div>
      </div>
   
  )
}

export default InterviewPage