import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Trophy } from 'lucide-react';
import React from 'react'

const StatsCards = ({assessments}) => {

const getAverageScore =()=>{
    if(!assessments?.length) return 0;
    const total=assessments.reduce(
        (sum,assessment)=> sum + assessment.quizScore,0
    );
    return (total/assessments.length).toFixed(1);
}

const getLatestAssessment = ()=>{
    if(!assessments?.length) return null;
    return assessments[0];
}

const getTotalQuestions=()=>{
    if(!assessments?.length) return 0;
    return assessments.reduce(
        (sum,assessment)=> sum + assessment.questions.length,0
    );
    
}

  return (
    <div className='grid gap-4 md:grid-cols-3 sm:grid-cols-3'>
  <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score </CardTitle>
            <Trophy className={`h-5 w-5 text-muted-foreground`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {getAverageScore()}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across All Assessments
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Questions Practiced </CardTitle>
            <Brain className={`h-5 w-5 text-muted-foreground`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {getTotalQuestions()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
             Total Questions
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Latest Score </CardTitle>
            <Target className={`h-5 w-5 text-muted-foreground`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Most Recent Quiz
            </p>
          </CardContent>
        </Card>
    </div>
  )
}

export default StatsCards