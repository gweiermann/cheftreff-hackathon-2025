"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

interface VerificationResultProps {
  images: {
    id: string
    file: File | null
    preview: string
    comment: string
  }[]
  imageFormDatas: FormData[]
  expectedPanelCount: number
  onRetake: () => void
  onConfirm: () => void
  onContinueAnyway: () => void
}

export default function VerificationResult({
  images,
  onRetake,
  expectedPanelCount,
}: VerificationResultProps) {
  const { data, error, isLoading } = useSWR(
    ['/api/verify-image', images],
    async () => Promise.all(images.map(image => fetch('/api/verify-image', {
        method: 'POST',
        body: image.preview,
        headers: {
          'Content-Type': 'text/plain',
        }
    }).then(res => res.json()).then(res => res.count)
  )))

  const result = useMemo(() => {
    if (data) {
      const panelCount = data.reduce((acc, curr) => acc + curr, 0)
      console.log(panelCount)
      if (typeof panelCount !== 'number') {
        return
      }
      if (panelCount === expectedPanelCount) {
        return {
          success: true,
          message: "You're all set! Thank you for your service.",
          details: "All panels were successfully verified.",
          panelsFound: panelCount,
        }
      } else {
        return {
          success: false,
          message: "Attention required!",
          details: `You were contracted to install ${expectedPanelCount} solar panels, but we could only find ${panelCount} on your provided picture.`,
          panelsFound: panelCount,
        }
      }
    }
  }, [data, expectedPanelCount])

  if (isLoading || !result || !data) {
    return (
      <div className="flex flex-col min-h-full">
        <header className="p-4 border-b">
          <h1 className="text-lg font-semibold">Finishing up: Step 2/3</h1>
          <p className="text-sm text-gray-500">Verifying your work</p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Loader2 className="w-12 h-12 animate-spin text-gray-500 mb-4" />
          <p className="text-lg font-medium">Verifying your work...</p>
          <p className="text-sm text-gray-500">This may take a moment</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-full">
        <header className="p-4 border-b">
          <h1 className="text-lg font-semibold">Finishing up: Step 2/3</h1>
          <p className="text-sm text-gray-500">Verifying your work</p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-medium">Verification failed</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="p-4 border-b">
        <h1 className="text-lg font-semibold">Finishing up: Step 3/3</h1>
        <p className="text-sm text-gray-500">Verification results</p>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${result.success ? "bg-green-50" : "bg-red-50"}`}>
            <div className="flex items-start">
              {result.success ? (
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
              )}

              <div>
                <h2 className={`text-lg font-semibold ${result.success ? "text-green-700" : "text-red-700"}`}>
                  {result.message}
                </h2>
                <p className={`text-sm ${result.success ? "text-green-600" : "text-red-600"}`}>{result.details} You can close this page now.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Uploaded Images</h3>

            {images.map((image, index) => (
              <div key={image.id} className="border rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <Image src={image.preview || "/placeholder.svg"} alt="Uploaded work" fill className="object-cover" />
                </div>

                <div className="p-3">
                  <div className={`text-sm font-medium ${result.success ? "text-green-600" : "text-red-600"}`}>
                    Detected {data[index]} panels on this picture
                  </div>

                  {image.comment && <div className="mt-1 text-sm text-gray-500">Comment: {image.comment}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t space-y-2">
        {!result.success && (
          <>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/return-panels">
                I will return the rest
              </Link>
            </Button>

            <Button onClick={onRetake} variant="outline" className="w-full">
              Retake bad pictures
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/continue-anyway">
                Continue anyway
              </Link>
            </Button>
          </>
        )}

        {result.success && (
          <Button className="w-full" asChild>
            <Link href="/complete-job">
              Complete job
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
