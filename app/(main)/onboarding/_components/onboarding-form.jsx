"use client"
import { onboardingSchema } from "@/app/lib/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OnboardingForm = ({industries}) => {
  
  
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router=useRouter();
  
  const {
    loading:updaateLoading,
    fn:updateUserFn,
    data:updateResult
  }=useFetch(updateUser)
  
 useEffect(() => {
  if (updateResult?.success && !updaateLoading) {
    toast.success("Profile Completed Successfully!");
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1200); // wait 1.2s before redirect
  }
}, [updaateLoading, updateResult, router]);


  const {register,handleSubmit,formState:{errors},setValue,watch,
} =useForm({
  resolver : zodResolver(onboardingSchema)
})

const watchIndustry=watch("industry")

const onSubmit=async (values)=>{
  
  try {
    // console.log(values);
    const formattedIndustry =`${values.industry}-${values.subIndustry
    .toLowerCase()
    .replace(/ /g,"-")}`;

    await updateUserFn({
      ...values,
      industry:formattedIndustry,
    })
} catch (error) {
  console.error(error)
}


// useEffect(() => {

// if(updateResult?.success && !updaateLoading){
//   toast.success("Profile Completed Successfully!")
//   router.push("/dashboard");
//   router.refresh();
// }

// }, [updaateLoading,updateResult])


}

  return (
    <>
    <div className="flex items-center justify-center bg-background">
    <Card className="w-full max-w-lg mt-10 mx-2">
  <CardHeader>
    <CardTitle 
    className="gradient-title text-4xl"
    >Complete Your Profile</CardTitle>
    <CardDescription>
      Select your industry to get personalized career insights and recommendations.
      </CardDescription>
   
  </CardHeader>
  <CardContent>
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2" >
<Label  htmlFor="industry">Industry</Label>
<Select 
{...register("industry")}
onValueChange={(value)=>{
  setValue("industry",value);
  setSelectedIndustry(
    industries.find((ins)=>ins.id === value)
  );
  setValue("subIndustry","")
}}
>
  <SelectTrigger id="industry">
    <SelectValue  placeholder="Select an Industry" />
  </SelectTrigger>
  <SelectContent>

      {industries.map((ins)=>{
             return   <SelectItem value={ins.id} key={ins.id}>
              {ins.name}
      </SelectItem>
      })}
    
  </SelectContent>
</Select>
{
  errors.industry && (
    <p className="text-sm text-red-500">{errors.industry.message}</p>
  )
}
      </div>

{ 
 watchIndustry &&
 <div className="space-y-2" >
<Label  htmlFor="subIndustry">Specialization</Label>
<Select 
{...register("subIndustry")}
onValueChange={(value)=>{
  setValue("subIndustry",value);
}}
>
  <SelectTrigger id="subIndustry">
    <SelectValue  placeholder="Select an sub-Industry" />
  </SelectTrigger>
  <SelectContent>

      {selectedIndustry?.subIndustries.map((ins)=>{
             return   <SelectItem value={ins} key={ins}>
              {ins}
      </SelectItem>
      })}
    
  </SelectContent>
</Select>
{
  errors.subIndustry && (
    <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
  )}

   </div>
}
<div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>


            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

 <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={updaateLoading}>
              {updaateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
    </form>
  </CardContent>
</Card>
    </div>
    </>

  )
}

export default OnboardingForm