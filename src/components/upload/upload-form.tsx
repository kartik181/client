"use client";
import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generateSummary,
  storedPdfSummaryAction,
} from "../../../actions/upload-action";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 16 * 1024 * 1024,
      "File size must be less than 16"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("✅ PDF uploaded successfully! 🎉");
    },
    onUploadError: (err) => {
      toast.error("❌ Upload error");
    },
    onUploadBegin({ file }) {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        setIsLoading(false);
        return;
      }
      const loadingToast = toast.loading("📄 Uploading your PDF...");

      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("❌ Something went wrong. Please use a different file.");
        setIsLoading(false);
        return;
      }
      toast.success(
        "✨ Processing PDF... Hang tight! AI is analyzing your document."
      );
      toast.dismiss(loadingToast);

      const result = await generateSummary(resp);

      const { data = null, message = null } = result || {};
      if (data) {
        let storeResult: any;
        toast.success(
          "📄 Saving PDF... Hang tight! We are saving your summary! ✨"
        );
        if (data.summary) {
          storeResult = await storedPdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });
          toast.success("✨ Summary Generated! Your summary has been saved!");
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
