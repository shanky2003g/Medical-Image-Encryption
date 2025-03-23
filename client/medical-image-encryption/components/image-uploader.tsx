"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, Scan, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  isLoading: boolean
  disabled?: boolean
  previewUrl: string | null
}

export default function ImageUploader({ onImageUpload, isLoading, disabled = false, previewUrl }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled || isLoading) return

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        onImageUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageUpload(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled || isLoading}
      />

      <div
        className={cn(
          "border-2 rounded-xl p-6 transition-all duration-300 relative",
          isDragging
            ? "border-cyan-400 bg-cyan-50 shadow-lg shadow-cyan-200"
            : "border-dashed border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50/50",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          "text-center",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={disabled ? undefined : handleButtonClick}
      >
        {/* Medical scan lines background */}
        <div className="absolute inset-0 bg-scan-lines opacity-5 rounded-xl pointer-events-none"></div>

        {previewUrl ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mx-auto mb-4 rounded-md overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 bg-grid-blue opacity-10 pointer-events-none"></div>
              <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                <Scan className="h-3 w-3 mr-1" />
                Medical Image
              </div>
              <img src={previewUrl || "/placeholder.svg"} alt="Uploaded medical image" className="w-full h-auto" />
            </div>
            {!disabled && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleButtonClick}
                disabled={isLoading}
                className="bg-white border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              >
                <X className="h-4 w-4 mr-1" />
                Change Image
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            {isLoading ? (
              <>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center mb-4 shadow-lg shadow-cyan-200/50">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
                <p className="text-cyan-700 font-medium">Processing medical image...</p>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full p-4 mb-5 shadow-lg shadow-cyan-200/50">
                  <Scan className="h-10 w-10 text-white" />
                </div>
                <p className="text-xl font-medium mb-3 text-cyan-800">Drag and drop your medical image here</p>
                <p className="text-cyan-600 mb-5">Support for X-rays only</p>
                <Button
                  disabled={disabled}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-600/40 transition-all duration-300"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Medical Image
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

