'use server'

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType{
    userId?:string;
     fileUrl:string;
      summary:string;
       title:string;
       fileName:string;
    }

export async function generatePdfText({
    fileUrl,
}:{
    fileUrl:string;
}){
    if(!fileUrl){
        return{
            success: false,
            message: 'File upload failed',
            data:null
        }
    }
    try {
        const pdfText = await fetchAndExtractPdfText(fileUrl)
        console.log({pdfText})

        if(!pdfText){
            return{
                success: false,
                message: 'Failed to fetch and extract Pdf',
                data:null
            }
        }
        return {
            success: true,
            message: "pDf text generated successfully",
            data:{
                pdfText
            }
        }
    } catch (error) {
        return{
            success: false,
            message: "failed  to extract pdf",
            data:null
        }
    }
}

export async function generateSummary( {
    pdfText,
    fileName
}:{
    pdfText:string;
    fileName:string;
}){
 try {
    let summary 
    try {
        summary = await generateSummaryFromOpenAI(pdfText)
        console.log(summary)
    } catch (error) {
        console.log(error)
        //call gemeni
        if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
            try {
                 summary = await  generateSummaryFromGemini(pdfText)
            } catch (geminiError) {
                console.error("Gemini API failed after OpenAI quote exceeded",geminiError)
            }
        }
    }
    if(!summary){
        return {
            success: false,
            message: "Failed to generate summary",
            data:null,
        }
    }
    return{
        success: true,
        message: "Summary generated successfully",
        data:{
            title: fileName,
            summary,
        }
    }
 } catch (error) {
    return {
        success: false,
        message: "Failed to generate summary",
        data:null,
    }
 }
}


async function savedPdfSummary({ userId,fileUrl, summary, title, fileName}: PdfSummaryType){
    try {
        const sql = await getDbConnection()
      const [savedSummary] =  await sql`INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name) VALUES(${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id, summary_text`
      return savedSummary
    } catch (error) {
        console.log("Error saving PDF summary", error)
        throw error
    }
}

export async function storedPdfSummaryAction({
    fileUrl,summary, title, fileName
}: PdfSummaryType){
    let savedSummary: any
    try {
        const {userId} = await auth()
        if(!userId){
            return{
                success: false,
                message: "User not found"
            }
        }
        savedSummary = await savedPdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        })
        if(!savedSummary){
            return{
                success: false,
                message: 'Faile to save PDF summary, please try again...'
            }
        }
    }
    

    catch (error) {
        return{
            success: false,
            message: error instanceof Error ? error.message : "Error saving PDF summary"
        }
    }
    revalidatePath(`/summaries/${savedSummary.id}`)
    return {
        success: true,
        message: "PDF summary saved successfully",
        data:{
            id:savedSummary.id,
        }
    }
}