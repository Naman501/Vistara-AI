import { industries } from '@/data/industries'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const Onboarding =async () => {

  // check if the user is already onboarded or not
  const {isOnboarded}=await getUserOnboardingStatus()

  if(isOnboarded){
    redirect('/dashboard')
  }

  return (
    <main>
      <OnboardingForm  industries={industries}/>
    </main>
  )
}

export default Onboarding