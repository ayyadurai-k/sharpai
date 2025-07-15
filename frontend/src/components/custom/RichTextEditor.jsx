import React, { useContext, useState } from 'react'
import { Button } from '../ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { ResumeInformationContext } from '@/context/ResumeContext';

function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const { Resumedata, setResumedata } = useContext(ResumeInformationContext);
    const [loading,setLoading]=useState(false);
  return (
    <div>
    <div className='flex justify-between my-2'>
      <label className='text-xs'>Summary</label>
      <Button variant="outline" size="sm" 
      disabled={loading}
      className="border-black hover:border-transparent hover:bg-blue-700 hover:text-white text-black flex gap-2">
        {loading?
        <LoaderCircle className='animate-spin'/>:  
        <>
         <Brain className='h-4 w-4'/> Generate from AI 
         </>
      }
       </Button>
    </div>
  <EditorProvider>
    <Editor value={value} onChange={(e)=>{
      setValue(e.target.value);
      onRichTextEditorChange(e)
    }}>
       <Toolbar>
        <BtnBold />
        <BtnItalic />
        <BtnUnderline />
        <BtnStrikeThrough />
        <Separator />
        <BtnBulletList />
        <Separator />
        <BtnLink />
      </Toolbar>
    </Editor>
    </EditorProvider>
  </div>
  )
}

export default RichTextEditor