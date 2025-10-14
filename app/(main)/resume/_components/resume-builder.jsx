"use client"
import { Button } from '@/components/ui/button'
import { Download, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/app/lib/schema'
import { saveResume } from '@/actions/resume'
import useFetch from '@/hooks/use-fetch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import EntryForm from './entry-form'


const ResumeBuilder = ({initialContent}) => {

const [activetab,setActiveTab]=useState("edit");


const {
    control,
    register,
    handleSubmit,
    watch,
    formState:{errors},
}
=useForm({
    resolver:zodResolver(resumeSchema),
    defaultValues: {
contactInfo :{},
summary: "",
skills: "",
experience: [],
education: [],
projects: [],
},
})


const {
loading: isSaving,
fn: saveResumeFn,
data: saveResult,
error: saveError,
} = useFetch(saveResume);

const formValues=watch();

useEffect(() => {
if (initialContent) setActiveTab("preview");
}, [initialContent]);

const onsubmit= async (data)=>{

}

  return (
    <div className='space-y-4'>
        <div
        className='flex felx-col md:flex-row justify-between items-center gap-2'
        >
            <h1
            className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#999FA8] text-5xl md:text-6xl'
            >Resume Builder</h1>

            <div className='space-x-2'>
                <Button variant="destructive">
                    <Save className='h-4 w-4'/>
                    Save</Button>
                     <Button variant="outline">
                    <Download className='h-4 w-4'/>
                    Download PDF</Button>
            </div>
        </div>

            <Tabs
            value={activetab}
            onValueChange={setActiveTab}
            >
  <TabsList>
    <TabsTrigger value="edit">Form</TabsTrigger>
    <TabsTrigger value="preview">Markdown</TabsTrigger>
  </TabsList>
  <TabsContent value="edit">
    <form className='space-y-6' onSubmit={handleSubmit(onsubmit)}>
        <div className='space-y-2'>
            <h3 className='text-lg mt-3 font-medium'>
                Contact Information
            </h3>
            <div className='grid mt-3 grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50'>
            <div className='space-y-2.5'>
                <label className='text-sm font-medium'>Email</label>
                <Input 
                {...register("contactInfo.email")}
                type="email"
                placeholder="your@email.com"
                error={errors.contactInfo?.email}
                />

        {errors.contactInfo?.email && (
          <p className="text-sm text-red-500">
{errors.contactInfo.email.message}
</p>
)}

            </div>



 <div className='space-y-2.5'>
                <label className='text-sm font-medium'>Mobile Number</label>
                <Input 
                {...register("contactInfo.mobile")}
                type="tel"
                placeholder="+91 95825 20055"
                />

        {errors.contactInfo?.mobile && (
          <p className="text-sm text-red-500">
{errors.contactInfo.mobile.message}
</p>
)}

            </div>






             <div className='space-y-2.5'>
                <label className='text-sm font-medium'>LinkedIn URL</label>
                <Input 
                {...register("contactInfo.email")}
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                />

        {errors.contactInfo?.linkedin && (
          <p className="text-sm text-red-500">
{errors.contactInfo.linkedin.message}
</p>
)}

            </div>







             <div className='space-y-2.5'>
                <label className='text-sm font-medium'>Twitter/X Profile</label>
                <Input 
                {...register("contactInfo.twitter")}
                type="url"
                placeholder="https://x.com/your-handle"
                />

        {errors.contactInfo?.twitter && (
          <p className="text-sm text-red-500">
        {errors.contactInfo.twitter.message}
</p>
)}

            </div>
</div>
        </div>



 <div className='space-y-4 mt-3'>
                <h3 className='text-lg mb-2 font-medium'>Professional Summary</h3>
                <Controller 
                name="summary"
                control={control}
                render={
                  ({field})=>(
                    <Textarea 
                    {...field}
                    className='h-32'
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                    />
  )}
                />
        {errors.summary && (
          <p className="text-sm text-red-500">
{errors.summary.message}
</p>
)}
</div>


 <div className='space-y-4 mt-3'>
                <h3 className='text-lg mb-2 font-medium'>Skills </h3>
                <Controller 
                name="skilld"
                control={control}
                render={
                  ({field})=>(
                    <Textarea 
                    {...field}
                    className='h-32'
                    placeholder="List your key skills..."
                    error={errors.skills}
                    />
  )}
                />
        {errors.skills && (
          <p className="text-sm text-red-500">
{errors.skills.message}
</p>
)}
</div>




 <div className='space-y-4 mt-3'>
                <h3 className='text-lg mb-2 font-medium'>Work Experience</h3>
                <Controller 
                name="experience"
                control={control}
                render={
                  ({field})=>(
                  <EntryForm 
                  type="Experience"
                  entries={field.value}
                  onChange={field.onChange}
                  />
  )}
                />
        {errors.experience && (
          <p className="text-sm text-red-500">
{errors.experience.message}
</p>
)}
</div>



 <div className='space-y-4 mt-3'>
                <h3 className='text-lg mb-2 font-medium'>Education</h3>
                <Controller 
                name="education"
                control={control}
                render={
                  ({field})=>(
                   <EntryForm 
                  type="education"
                  entries={field.value}
                  onChange={field.onChange}
                  />
  )}
                />
        {errors.education && (
          <p className="text-sm text-red-500">
{errors.education.message}
</p>
)}
</div>




 <div className='space-y-4 mt-3'>
                <h3 className='text-lg mb-2 font-medium'>Projects</h3>
                <Controller 
                name="projects"
                control={control}
                render={
                  ({field})=>(
                   <EntryForm 
                  type="projects"
                  entries={field.value}
                  onChange={field.onChange}
                  />
  )}
                />
        {errors.projects && (
          <p className="text-sm text-red-500">
{errors.projects.message}
</p>
)}
</div>



    </form>
  </TabsContent>
  <TabsContent value="preview">Change your password here.</TabsContent>
</Tabs>
       
    </div>
  )
}

export default ResumeBuilder