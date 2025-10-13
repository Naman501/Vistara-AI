"use client";

import { format } from 'date-fns';

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {LineChart,CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PerformanceChart = ({assessments}) => {
    const [chartData, setChartData] = useState([])
    useEffect(()=>{
        if(assessments){
            const formattedData = assessments.map((assessment)=>(
                {
                    date: format(new Date(assessment.createdAt),"MMM dd"),
                    score: assessment.quizScore,
                }
            ));
            setChartData(formattedData)
        }
    },[assessments])
  return (
<Card>
  <CardHeader>
    <CardTitle className='text-3xl md:text-4xl'>Performance Trend</CardTitle>
    <CardDescription>Your Quiz Scores Over Time</CardDescription>
  </CardHeader>
  <CardContent>
    <div className='h-[300px]'>
<ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0,100]} />
        <Tooltip content={({active,payload})=>{
            if(active && payload?.length){
                return(
                    <div className='bg-background border rounded-lg p-2 shadow-md'>
                        <p className='text-sm font-medium'>
                            Score: {payload[0].value}%
                        </p>
                        <p className='text-xs text-muted-foreground'>
                        {payload[0].payload.date}
                        </p>
                    </div> 
                )
            }
        }}/>
{/*        
           <Line
                type="monotone"
                dataKey="score"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: "hsl(var(--primary))" }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              /> */}
                  <Line
                type="monotone"
                dataKey="score"
                stroke="#ffffff"           // White line
                strokeWidth={2}
                dot={{ r: 5, fill: "#ffffff" }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: "#ffffff", fill: "#ffffff" }}
                fill="url(#scoreGradient)" // Gradient fill under the line
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
      </LineChart>
    </ResponsiveContainer>
    </div>
  </CardContent>
</Card>
)
}

export default PerformanceChart