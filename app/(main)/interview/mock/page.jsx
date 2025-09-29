// import Link from 'next/link'
// import React from 'react'
// import { ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Quiz from '../_components/quiz';

// const MockInterviewPage = () => {
//   return (
//     <div className='container mx-auto space-y-4 py-6'>
//       <div className=' flex flex-col space-y-2 mx-2'>
// <Link href={'/interview'}>
// <Button variant="link" className="  gap-2 pl-0">
//   <ArrowLeft className='cursor-pointer h-4 w-4' />
//     Back to Interview Preparetion
// </Button>
// </Link>

// <div>
//   <h1 className='text-6xl  font-bold'>
// Mock Interview
//   </h1>
//   <p className='text-muted-foreground'>
// Test Your Knowledge with industry-specefic questions
//   </p>
// </div>
//       </div>
//       <Quiz />
//     </div>
//   )
// }

// export default MockInterviewPage

import Link from 'next/link';
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from '../_components/quiz';

const MockInterviewPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:space-y-6">
        {/* Back Button */}
        <Link href="/interview" className="self-start">
          <Button variant="link" className="flex items-center gap-2 p-0 text-sm md:text-base">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        {/* Title & Description */}
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Mock Interview
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Test your knowledge with industry-specific questions.
          </p>
        </div>
      </div>

      {/* Quiz Component */}
      <div className="mt-6">
        <Quiz />
      </div>
    </div>
  );
};

export default MockInterviewPage;
