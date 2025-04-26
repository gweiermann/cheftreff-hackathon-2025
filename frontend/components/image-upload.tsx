"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Camera, Loader2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface ImageUploadProps {
  images: Array<{
    id: string
    file: File | null
    preview: string
    comment: string
  }>
  setImages: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: string
        file: File | null
        preview: string
        comment: string
      }>
    >
  >
  onVerify: () => void
}

export default function ImageUpload({ images, setImages, onVerify }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      const file = e.target.files[0]

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = {
          id: uuidv4(),
          file: file,
          preview: reader.result as string,
          comment: "",
        }

        setImages((prev) => [...prev, newImage])
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCommentChange = (id: string, comment: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, comment } : img)))
  }

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="p-4 border-b">
        <h1 className="text-lg font-semibold">Finishing up: Step 1/2</h1>
        <p className="text-sm text-gray-500">Upload images of your completed work</p>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {images.length === 0 && !isUploading && (
            <div className="text-center py-8 text-gray-500 h-full">
              <p>No images uploaded yet</p>
              <p className="text-sm">Please take photos of your completed work</p>
            </div>
          )}

          {isUploading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Uploading image...</span>
            </div>
          )}

          {images.map((image) => (
            <div key={image.id} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-gray-100">
                <Image src={image.preview || "/placeholder.svg"} alt="Uploaded work" fill className="object-cover" />
              </div>

              <div className="p-3 space-y-2">
                <Textarea
                  placeholder="Add a comment about this image..."
                  value={image.comment}
                  onChange={(e) => handleCommentChange(image.id, e.target.value)}
                  className="w-full text-sm"
                  rows={2}
                />

                <div className="flex justify-end space-x-2">
                  <Button variant="outlineDestructive" size="sm" onClick={() => handleDelete(image.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t space-y-3">
        <div className="flex justify-center">
          <label className="cursor-pointer">
            <Input type="file" accept="image/*;capture=camera" className="hidden" onChange={handleFileChange} />
            <div className="flex items-center justify-center gap-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-full">
              <Camera className="w-4 h-4" />
              Take a picture
            </div>
          </label>
        </div>

        <Button onClick={onVerify} className="w-full" disabled={images.length === 0}>
          Verify now
        </Button>
      </div>
    </div>
  )
}
