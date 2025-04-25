"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import ContractDetails from "@/components/contract-details"
import ImageUpload from "@/components/image-upload"
import VerificationResult from "@/components/verification-result"

export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<
    Array<{
      id: string
      file: File | null
      preview: string
      comment: string
    }>
  >([])

  const imageFormDatas = useMemo(() => images.map((image) => {const fd = new FormData(); fd.append("file", image.file as Blob); return fd}), [images])

  const expectedPanels = 12

  const handleFinish = () => {
    setStep(2)
  }

  const handleVerify = () => {
    setStep(3)
  }

  const handleRetake = () => {
    setStep(2)
  }

  const onConfirm = () => {
    alert("Connecting to support...")
  }

  const handleContinueAnyway = () => {
    alert("Work marked as completed with exceptions")
    router.push("/dashboard")
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 shadow-lg md:py-12">
      <div className="w-full md:max-w-md bg-white md:shadow-lg md:rounded-lg min-h-full">
        {step === 1 && <ContractDetails onFinish={handleFinish} />}

        {step === 2 && <ImageUpload images={images} setImages={setImages} onVerify={handleVerify} />}

        {step === 3 && (
          <VerificationResult
            images={images}
            imageFormDatas={imageFormDatas}
            onRetake={handleRetake}
            onConfirm={onConfirm}
            onContinueAnyway={handleContinueAnyway}
            expectedPanelCount={expectedPanels}
          />
        )}
      </div>
    </div>
  )
}
