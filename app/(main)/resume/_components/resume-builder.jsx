"use client"
import { Button } from '@/components/ui/button'
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from 'lucide-react'
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
import { entriesToMarkdown } from '@/app/lib/helper'
import { useUser } from '@clerk/nextjs'
import MDEditor, { issue } from "@uiw/react-md-editor";
import { toast } from 'sonner'
// import html2pdf from 'html2pdf.js'
// import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
// import html2pdfMin from 'html2pdf.js/dist/html2pdf.min.js'
import jsPDF from "jspdf";
import "jspdf-autotable";


const ResumeBuilder = ({initialContent}) => {

const [activetab,setActiveTab]=useState("edit");
const [resumeMode,setResumeMode]=useState("preview");
const [previewContent,setPreviewContent]=useState(initialContent);

const {user}=useUser();

const [isGenerating,setIsGenerating]=useState(false); 

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

  useEffect(() => {
    if (activetab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activetab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);


const getContactMarkdown=()=>{
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };


const getCombinedContent=()=>{
  const {summary,skills,experience,education,projects}= formValues;
  return [
 getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
  ].filter(Boolean)
      .join("\n\n");
}

const onsubmit= async (data)=>{
    // console.log(data);
     try {
            const formattedContent = previewContent
                .replace(/\n/g, "\n")
                .replace(/\n\s*\n/g, "\n\n")
                .trim();

            console.log(previewContent, formattedContent);
            await saveResumeFn(previewContent);
        } catch (error) {
            console.error("Save error:", error);
        }
    
}

const generatePDF = ()=>{
  setIsGenerating(true);

  try {
    const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text(formValues?.name || '', 105, 20, { align: "center" });

            let contactDetails = [];
            if (formValues.contactInfo.mobile)
                contactDetails.push(`Ph: ${formValues.contactInfo.mobile}`);
            if (formValues.contactInfo.email)
                contactDetails.push(`Email: ${formValues.contactInfo.email}`);
            if (formValues.contactInfo.linkedin)
                contactDetails.push(`LinkedIn: ${formValues.contactInfo.linkedin}`);

            if (contactDetails.length) {
                doc.setFontSize(12);
                doc.text(contactDetails.join(" | "), 105, 27, { align: "center" });
            }

            let y = 40;
            const lineHeight = 6;
            const sectionTitleFontSize = 14;
            const baseFontSize = 12;
            const descriptionFontSize = 10;


            if (formValues.summary) {
                doc.setFontSize(sectionTitleFontSize);
                doc.setFont(undefined, 'bold');
                doc.text("Professional Summary:", 10, y);
                y += lineHeight;
                doc.setFontSize(baseFontSize);
                doc.setFont(undefined, 'normal');
                const splitText = doc.splitTextToSize(formValues.summary, 180);
                splitText.forEach(line => {
                    doc.text(line, 10, y);
                    y += lineHeight;
                });
                // y += lineHeight;
                y += 2; // Reduce space before line
                doc.line(10, y, 200, y);
                // doc.line(12, y+10, 202, y+2);
                y += lineHeight;
            }

            if (formValues.skills) {
                doc.setFontSize(sectionTitleFontSize);
                doc.setFont(undefined, 'bold');
                y+=2;
                doc.text("Skills:", 10, y);
                y += lineHeight;
                doc.setFontSize(baseFontSize);
                doc.setFont(undefined, 'normal');
                const splitText = doc.splitTextToSize(formValues.skills, 180);
                splitText.forEach(line => {
                    doc.text(line, 10, y);
                    y += lineHeight;
                });
                // y += lineHeight;
                y += 2; // Reduce space before line
                doc.line(10, y, 200, y);
                y += lineHeight;
            }

            const addSection = (title, data) => {
                if (data && data.length) {
                    doc.setFontSize(sectionTitleFontSize);
                    doc.setFont(undefined, 'bold');
                    y+=2;
                    doc.text(title, 10, y);
                    y += lineHeight;
                    doc.setFontSize(baseFontSize);
                    doc.setFont(undefined, 'normal');
                    data.forEach((item, index) => {
                        const endDate = item.current ? "Present" : item.endDate;
                        const text = `${item.title} @ ${item.organization} (${item.startDate} - ${endDate})`;
                        const description = `${item.description}`;
                        const splitText = doc.splitTextToSize(text, 180);
                        splitText.forEach(line => {
                            doc.text(line, 10, y);

                            y += lineHeight;
                            // if (description) {
                            //     doc.text(`${description}`, 10, y);
                            //     y += lineHeight;
                            // }
                        });
                        doc.setFontSize(descriptionFontSize);
                        const splitDescription = doc.splitTextToSize(item.description, 180);
                        splitDescription.forEach(line => {
                            doc.text(line, 10, y);
                                y += lineHeight;
                            });
                        doc.setFontSize(baseFontSize)
                    });
                    // y += lineHeight;
                    y += 2; // Reduce space before line
                    doc.line(10, y, 200, y);
                    y += lineHeight;
                }
            };

            addSection("Experience:", formValues.experience);
            addSection("Education:", formValues.education);
            addSection("Projects:", formValues.projects);

            doc.save("resume.pdf");
  } catch (error) {
    console.error("PDF generation error",error);
  } finally{
    setIsGenerating(false);
  }
}


  return (
    <div className='space-y-4'>
        <div
        className='flex flex-col md:flex-row justify-between items-center gap-2'
        >
            <h1
            className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#999FA8] text-5xl md:text-6xl'
            >Resume Builder</h1>

            <div className='space-x-2'>
                <Button variant="destructive"
                onClick={onsubmit}
                disabled={isSaving}
                className="cursor-pointer"
                >
                  {
                    isSaving ? (
                      <>
                      <Loader2  className='mr-2 h-4 w-4 animate-spin'/>
                      Saving...
                      </>
                    ) :(
                      <>
                        <Save className='h-4 w-4'/>
                    Save
                      </>
                    )
                  }
                    </Button>
                     <Button onClick={generatePDF}  disabled={isGenerating}>
                    {
                      isGenerating ? (
                        <>
                       <Loader2 className='h-4 w-4 animate-spin' /> 
                       Generating PDF...
                        </>
                      ) : (
                        <>
                        <Download className='h-4 w-4'/>
                    Download PDF
                        </>
                      )
                    }
                    
                    </Button>
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
    <form className='space-y-6'>
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
                {...register("contactInfo.linkedin")}
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
                name="skills"
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
  <TabsContent value="preview">
    <Button variant="link" type='button' className="mb-2" 
    onClick={()=>{
      setResumeMode(resumeMode==="preview" ? "edit" : "preview")
    }}
    >

      {
        resumeMode==="preview" ? (
          <>
          <Edit className='h-4 w-4' />
      Edit Resume
          </>
        ) : (
          <>
          <Monitor 
          className='h-4 w-4'
          />
          Show Preview
          </>
        )
      }
      
    </Button>

    {
      resumeMode !== "preview" &&(
        <div className='flex p-3 gap-2 items-center border-2 border-yellow-600
        text-yellow-600 rounded mb-2
        '>
          <AlertTriangle className='h-5 w-5' />
          <span className='text-sm'>
            You will lose edited markdown if you update the form data.
          </span>
        </div>
      )
    }

<div className='border rounded-lg'>
<MDEditor value={previewContent} onChange={setPreviewContent}
height={800} preview={resumeMode}
/>
</div>

  <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
            </div>
  </TabsContent>
</Tabs>
       
    </div>
  )
}

export default ResumeBuilder