"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  Lock,
  Unlock,
  ImageIcon,
  CheckCircle2,
  ShieldCheck,
  HeartPulseIcon as Heartbeat,
  Hospital,
  FileImage,
  Scan,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ImageUploader from "@/components/image-uploader"
import LatentVectorDisplay from "@/components/latent-vector-display"
import StepIndicator from "@/components/step-indicator"
import MedicalHeader from "@/components/medical-header"
import EncryptionVisual from "@/components/encryption-visual"
import SecurityBadge from "@/components/security-badge"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [latentVector, setLatentVector] = useState<number[] | null>(null)
  const [ImageData, setImageData] = useState<number[] | null>(null)
  const [encryptedData, setEncryptedData] = useState<{
    encrypted_latent_vector: string
    key: string
    iv: string
  } | null>(null)
  const [decryptedVector, setDecryptedVector] = useState<number[] | null>(null)
  const [reconstructedImage, setReconstructedImage] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    setIsLoading(true); // Start loading
    try {
      // Create a preview of the original image
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
  
      const formData = new FormData();
      formData.append("image", file);
  
      // Call the Django backend to encrypt the image
      const response = await fetch('http://localhost:8000/encrypt/', {
        method: 'POST',
        body: formData,
      });
  
      // Parse the response
      const result = await response.json();
  
      // Check if the response contains the latent vector
      if (result.latent_vector) {
        setImageData(result.image_data);
        setLatentVector(result.latent_vector); // Set the latent vector
        setCurrentStep(2); // Move to the next step
      } else {
        console.error("Error uploading image:", result.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false); // Stop loading (runs whether the try block succeeds or fails)
    }
  };

  const handleEncrypt = async () => {
    if (!latentVector) return;
  
    setIsLoading(true);
    try {
      // Convert the latent vector to a comma-separated string
      const latentVectorStr = latentVector.join(',');
  
      // Send the latent vector to the Django backend for encryption
      const encryptResponse = await fetch('http://localhost:8000/encrypt-latent-vector/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          latent_vector: latentVectorStr,
        }),
      });
  
      // Parse the response
      const encryptResult = await encryptResponse.json();
  
      // Check if the response contains encrypted data
      if (encryptResult.encrypted_latent_vector && encryptResult.key && encryptResult.iv) {
        setEncryptedData(encryptResult); // Store the encrypted data
        setCurrentStep(3); // Move to the next step
      } else {
        console.error('Error encrypting latent vector:', encryptResult.error);
      }
    } catch (error) {
      console.error('Error encrypting latent vector:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedData) return;
  
    setIsLoading(true);
    try {
      // Send the encrypted data to the Django backend for decryption
      const decryptResponse = await fetch('http://localhost:8000/decrypt-latent-vector/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          encrypted_latent_vector: encryptedData.encrypted_latent_vector,
          key: encryptedData.key,
          iv: encryptedData.iv,
        }),
      });
  
      // Parse the response
      const decryptResult = await decryptResponse.json();
  
      // Check if the response contains the decrypted latent vector
      if (decryptResult.decrypted_latent_vector) {
        setDecryptedVector(decryptResult.decrypted_latent_vector); // Store the decrypted vector
        setCurrentStep(4); // Move to the next step
      } else {
        console.error('Error decrypting latent vector:', decryptResult.error);
      }
    } catch (error) {
      console.error('Error decrypting latent vector:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleReconstruct = async () => {
    if (!decryptedVector) return;
  
    setIsLoading(true);
    try {
      // Send the decrypted latent vector to the Django backend for reconstruction
      const reconstructResponse = await fetch('http://localhost:8000/reconstruct-image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          image_data: JSON.stringify(ImageData),
        }),
      });
  
      // Parse the response
      const reconstructResult = await reconstructResponse.json();
  
      // Check if the response contains the reconstructed image
      if (reconstructResult.reconstructed_image) {
        setReconstructedImage(`data:image/png;base64,${reconstructResult.reconstructed_image}`); // Store the reconstructed image
        setCurrentStep(5); // Move to the next step
      } else {
        console.error('Error reconstructing image:', reconstructResult.error);
      }
    } catch (error) {
      console.error('Error reconstructing image:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const resetProcess = () => {
    setCurrentStep(1)
    setIsLoading(false)
    setOriginalImage(null)
    setLatentVector(null)
    setEncryptedData(null)
    setDecryptedVector(null)
    setReconstructedImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-sky-300 to-sky-100">
      <div className="absolute inset-0 bg-medical-pattern opacity-5 pointer-events-none"></div>
      <main className="container mx-auto py-12 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>

        <MedicalHeader />

        <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm mt-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full filter blur-3xl opacity-10 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

          <CardHeader className="text-center border-b bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-encryption-pattern opacity-10"></div>
            <div className="flex justify-center mb-2">
              <div className="bg-white/20 p-3 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Medical Image Encryption</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Securely encrypt and decrypt medical images using latent vector transformation and AES
            </CardDescription>
            <div className="flex justify-center mt-3 space-x-2">
              <SecurityBadge icon={<ShieldCheck className="h-4 w-4" />} text="HIPAA Compliant" />
              <SecurityBadge icon={<Lock className="h-4 w-4" />} text="End-to-End Encryption" />
              <SecurityBadge icon={<Scan className="h-4 w-4" />} text="Medical Imaging" />
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="mb-10">
              <StepIndicator currentStep={currentStep} />
            </div>

            <div className="space-y-10">
              {/* Step 1: Upload Image */}
              <div
                className={cn(
                  "transition-all duration-500 transform",
                  currentStep !== 1 ? "opacity-50 scale-98" : "scale-100",
                )}
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-700">
                  <div className="p-2 rounded-full bg-cyan-100">
                    <Scan className="h-5 w-5 text-cyan-600" />
                  </div>
                  Step 1: Upload Medical Image
                </h2>
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4 flex items-center">
                  <Hospital className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <p className="text-blue-700 text-sm">
                    Upload medical images such as X-rays, MRIs, CT scans, or ultrasounds for secure encryption.
                  </p>
                </div>
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  isLoading={isLoading && currentStep === 1}
                  disabled={currentStep !== 1}
                  previewUrl={originalImage}
                />
              </div>

              {/* Step 2: Encrypt Latent Vector */}
              {latentVector && (
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    currentStep !== 2 ? "opacity-50 scale-98" : "scale-100",
                  )}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Lock className="h-5 w-5 text-blue-600" />
                    </div>
                    Step 2: Encrypt Latent Vector
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <LatentVectorDisplay
                      title="Original Latent Vector"
                      vector={latentVector}
                      maxDisplay={10}
                      colorScheme="blue"
                    />
                    <EncryptionVisual isEncrypting={true} />
                  </div>

                  <Button
                    onClick={handleEncrypt}
                    disabled={isLoading || currentStep !== 2}
                    className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    {isLoading && currentStep === 2 ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Encrypting...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Encrypt Latent Vector
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Step 3: Decrypt Latent Vector */}
              {encryptedData && (
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    currentStep !== 3 ? "opacity-50 scale-98" : "scale-100",
                  )}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-700">
                    <div className="p-2 rounded-full bg-cyan-100">
                      <Unlock className="h-5 w-5 text-cyan-600" />
                    </div>
                    Step 3: Decrypt Latent Vector
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Tabs defaultValue="encrypted" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-cyan-100 p-1">
                          <TabsTrigger
                            value="encrypted"
                            className="data-[state=active]:bg-white data-[state=active]:text-cyan-700"
                          >
                            Encrypted Vector
                          </TabsTrigger>
                          <TabsTrigger
                            value="key"
                            className="data-[state=active]:bg-white data-[state=active]:text-cyan-700"
                          >
                            Key
                          </TabsTrigger>
                          <TabsTrigger
                            value="iv"
                            className="data-[state=active]:bg-white data-[state=active]:text-cyan-700"
                          >
                            IV
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="encrypted" className="space-y-4 mt-4">
                          <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md overflow-x-auto border border-cyan-100 shadow-sm">
                            <code className="text-xs break-all whitespace-pre-wrap text-cyan-900">
                              {encryptedData.encrypted_latent_vector}
                            </code>
                          </div>
                        </TabsContent>
                        <TabsContent value="key" className="mt-4">
                          <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border border-cyan-100 shadow-sm">
                            <code className="text-sm text-cyan-900">{encryptedData.key}</code>
                          </div>
                        </TabsContent>
                        <TabsContent value="iv" className="mt-4">
                          <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border border-cyan-100 shadow-sm">
                            <code className="text-sm text-cyan-900">{encryptedData.iv}</code>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    <EncryptionVisual isEncrypting={false} />
                  </div>

                  <Button
                    onClick={handleDecrypt}
                    disabled={isLoading || currentStep !== 3}
                    className="mt-6 bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-600/40 transition-all duration-300"
                  >
                    {isLoading && currentStep === 3 ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Decrypting...
                      </>
                    ) : (
                      <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Decrypt Latent Vector
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Step 4: Reconstruct Image */}
              {decryptedVector && (
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    currentStep !== 4 ? "opacity-50 scale-98" : "scale-100",
                  )}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-teal-700">
                    <div className="p-2 rounded-full bg-teal-100">
                      <ImageIcon className="h-5 w-5 text-teal-600" />
                    </div>
                    Step 4: Reconstruct Image
                  </h2>

                  <div className="bg-teal-50/50 p-4 rounded-lg border border-teal-100 mb-6 flex items-center">
                    <Heartbeat className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0" />
                    <p className="text-teal-700 text-sm">
                      The decrypted latent vector will be used to reconstruct the original medical image. This process
                      maintains the diagnostic quality of the image while ensuring data security.
                    </p>
                  </div>

                  <LatentVectorDisplay
                    title="Decrypted Latent Vector"
                    vector={decryptedVector}
                    maxDisplay={10}
                    colorScheme="teal"
                  />
                  <Button
                    onClick={handleReconstruct}
                    disabled={isLoading || currentStep !== 4}
                    className="mt-6 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-600/40 transition-all duration-300"
                  >
                    {isLoading && currentStep === 4 ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Reconstructing...
                      </>
                    ) : (
                      <>
                        <Scan className="mr-2 h-4 w-4" />
                        Reconstruct Image
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Step 5: Result */}
              {reconstructedImage && (
                <div className={cn("transition-all duration-500 transform")}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
                    <div className="p-2 rounded-full bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    Step 5: Reconstruction Complete
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl shadow-lg">
                      <h3 className="text-lg font-medium mb-3 text-blue-700 flex items-center">
                        <FileImage className="h-5 w-5 mr-2 text-blue-500" />
                        Original Medical Image
                      </h3>
                      <div className="border-2 border-blue-200 rounded-md overflow-hidden shadow-sm">
                        {originalImage && (
                          <img
                            src={originalImage || "/placeholder.svg"}
                            alt="Original medical image"
                            className="w-full h-auto"
                          />
                        )}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-green-50 p-5 rounded-xl shadow-lg">
                      <h3 className="text-lg font-medium mb-3 text-teal-700 flex items-center">
                        <Scan className="h-5 w-5 mr-2 text-teal-500" />
                        Reconstructed Medical Image
                      </h3>
                      <div className="border-2 border-teal-200 rounded-md overflow-hidden shadow-sm">
                        <img
                          src={reconstructedImage || "/placeholder.svg"}
                          alt="Reconstructed medical image"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <ShieldCheck className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700 mb-1">Secure Medical Image Processing Complete</h4>
                        <p className="text-blue-600 text-sm">
                          Your medical image has been successfully encrypted, transmitted, and reconstructed using
                          secure latent vector transformation. This process ensures HIPAA compliance and protects
                          patient data while maintaining diagnostic quality.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <Button
                      onClick={resetProcess}
                      variant="outline"
                      className="bg-white border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 shadow-md"
                    >
                      Process Another Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

