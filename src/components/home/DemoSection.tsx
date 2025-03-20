import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import { SummaryViewer } from "../summaries/summary-viwer";

const DEMO_SUMMARY = `# What is Sommaria?
Sommaria is an AI-powered tool that transforms PDFs into concise summaries within seconds. Whether it's research papers, reports, or lengthy documents, Sommaria extracts the key insights so you can focus on what matters.

# Key Features
✅ Instant Summaries – Upload a PDF and get a structured, AI-generated summary.
✅ AI-Powered Insights – Extract important highlights and action points.
✅ Reader-Friendly Visuals – Receive beautifully formatted summaries for quick understanding.
✅ Time-Saving – Skip long documents and get to the core information fast.



# Why Use Sommaria?
🔹 Saves time by eliminating the need to read long documents.
🔹 Perfect for students, professionals, and researchers.
🔹 Provides quick, accurate, and easy-to-read summaries.

# Try Sommaria Now!
📍 Start Summarizing and make reading easier!

`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] 
            -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 
            to-cyan-500 opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 7%, 72.5% 53.5%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 52.5% 76.7%, 9.1% 90.6%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Sommaire transform{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{" "}
              into an easy-to-read summary!
            </MotionH3>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            {/* {Summay viewer} */}
            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SummaryViewer summary={DEMO_SUMMARY} />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
