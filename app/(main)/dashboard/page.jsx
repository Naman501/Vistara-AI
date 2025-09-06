import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const IndustryInsightsPage =async () => {

  const {isOnbarded}=await getUserOnboardingStatus();
  
    if(!isOnbarded){
      redirect('/onboarding')
    }

  return (
    <div>IndustryInsightsPage</div>
  )
}

export default IndustryInsightsPage