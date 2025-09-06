import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const Onboarding =async () => {

  // check if the user is already onboarded or not
  const {isOnbarded}=await getUserOnboardingStatus()

  if(isOnbarded){
    redirect('/dashboard')
  }

  return (
    <main>
      <OnboardingForm  industries={industries}/>
    </main>
  )
}

export default Onboarding