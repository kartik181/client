"use client";
import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfText,
  generateSummary,
  storedPdfSummaryAction,
} from "../../../actions/upload-action";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "./loading-skeleton";
import { formatFileNameAsTitle } from "@/utils/format-utils";

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
      toast.error(
        `Error occurred while uploading: ${err.message || "Unknown error"}`
      );
    },
    onUploadBegin(data) {
      console.log("upload has begun for", data);
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
        setIsLoading(false);
        return;
      }

      const loadingToast = toast.loading("📄 Uploading your PDF...");

      console.log("Starting upload...");
      const Uploadresp = await startUpload([file]);

      // ✅ Move toast dismiss above the error check
      toast.dismiss(loadingToast);

      if (!Uploadresp) {
        toast.error("❌ Something went wrong. Please use a different file.");
        setIsLoading(false);
        return;
      }

      toast.success(
        "✨ Processing PDF... Hang tight! AI is analyzing your document."
      );

      let storeResult: any;

      const FormattedFileName = formatFileNameAsTitle(file.name);

      const result = await generatePdfText({
        fileUrl: Uploadresp[0].serverData.fileUrl,
      });
      toast.success("📄 Generateing PDF Summary.");
      const Summaryresult = await generateSummary({
        pdfText: result?.data?.pdfText ?? "",
        fileName: FormattedFileName,
      });
      toast.success(
        "📄 Saving PDF... Hang tight! We are saving your summary! ✨"
      );
      const { data = null, message = null } = Summaryresult || {};

      if (data?.summary) {
        storeResult = await storedPdfSummaryAction({
          summary: data.summary,
          fileUrl: Uploadresp[0].serverData.fileUrl,
          title: FormattedFileName,
          fileName: file.name,
        });
        toast.success("✨ Summary Generated! Your summary has been saved!");
        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      }
    } catch (error) {
      console.error("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>

      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
