import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
            Ready to Save Hours of Reading Time?
          </h2>
          <p className="text-gray-500 mx-auto max-w-[90%] sm:max-w-[80%] lg:max-w-[700px] text-base sm:text-lg md:text-xl lg:text-2xl dark:text-gray-400">
            Transform lengthy documents into clear, actionable insights with our
            AI-powered summarizer.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button
              variant="link"
              size="lg"
              className=" inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300 px-6 py-3 rounded-full hover:no-underline"
            >
              <Link href="#pricing" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
