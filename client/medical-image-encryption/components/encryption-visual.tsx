"use client"

import { useEffect, useState } from "react"
import { Lock, Unlock, ShieldCheck } from "lucide-react"

interface EncryptionVisualProps {
  isEncrypting: boolean
}

export default function EncryptionVisual({ isEncrypting }: EncryptionVisualProps) {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200 shadow-md flex flex-col items-center justify-center h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-encryption-pattern opacity-10"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full mb-4 shadow-lg">
          {isEncrypting ? <Lock className="h-8 w-8 text-white" /> : <Unlock className="h-8 w-8 text-white" />}
        </div>

        <h3 className="text-lg font-medium text-blue-700 mb-4">
          {isEncrypting ? "Encryption Process" : "Decryption Process"}
        </h3>

        <div className="w-full max-w-xs bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-blue-700">Medical Data</span>
            </div>
            <ShieldCheck className="h-4 w-4 text-blue-500" />
          </div>

          <div className="relative h-16 mb-3">
            {/* Binary data visualization */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className={`transition-opacity duration-500 ${animationStep === 0 ? "opacity-100" : "opacity-0"}`}>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? "bg-blue-500" : "bg-cyan-300"}`}
                    ></div>
                  ))}
                </div>
              </div>

              <div
                className={`transition-opacity duration-500 absolute inset-0 flex items-center justify-center ${animationStep === 1 ? "opacity-100" : "opacity-0"}`}
              >
                <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              </div>

              <div
                className={`transition-opacity duration-500 absolute inset-0 flex items-center justify-center ${animationStep === 2 ? "opacity-100" : "opacity-0"}`}
              >
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${isEncrypting ? "bg-cyan-700" : "bg-blue-500"}`}></div>
                  ))}
                </div>
              </div>

              <div
                className={`transition-opacity duration-500 absolute inset-0 flex items-center justify-center ${animationStep === 3 ? "opacity-100" : "opacity-0"}`}
              >
                {isEncrypting ? (
                  <div className="flex items-center justify-center bg-cyan-100 rounded-md px-3 py-1">
                    <Lock className="h-4 w-4 text-cyan-700 mr-1" />
                    <span className="text-xs font-mono text-cyan-700">Encrypted</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-blue-100 rounded-md px-3 py-1">
                    <Unlock className="h-4 w-4 text-blue-700 mr-1" />
                    <span className="text-xs font-mono text-blue-700">Decrypted</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-blue-600">
            <span>Input</span>
            <span>Processing</span>
            <span>Output</span>
          </div>
        </div>
      </div>
    </div>
  )
}

