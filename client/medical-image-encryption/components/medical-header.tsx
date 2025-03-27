import { HeartPulseIcon as Heartbeat, Hospital, ShieldCheck, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MedicalHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full mr-4">
          <Hospital className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-800">MediSecure</h1>
          <p className="text-blue-600">Advanced Medical Image Encryption System</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex space-x-4 mr-2">
          <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
            <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-blue-700 text-sm font-medium">HIPAA Compliant</span>
          </div>
          <div className="hidden md:flex items-center bg-cyan-50 px-3 py-2 rounded-lg">
            <Heartbeat className="h-5 w-5 text-cyan-500 mr-2" />
            <span className="text-cyan-700 text-sm font-medium">Medical Grade</span>
          </div>
        </div>

        <Link href="/about">
          <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            <Info className="h-4 w-4 mr-2" />
            Project Info
          </Button>
        </Link>
      </div>
    </div>
  )
}

