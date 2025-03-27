import { BookOpen, School, Users, Calendar } from "lucide-react"

export default function ProjectInfo() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-xl overflow-hidden mb-8">
      <div className="absolute inset-0 bg-encryption-pattern opacity-10 pointer-events-none"></div>

      <div className="px-6 py-5 text-white relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <School className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-xl font-bold">Department of Information Technology</h2>
              <p className="text-blue-100">National Institute of Technology Karnataka, Surathkal-575025</p>
            </div>
          </div>

          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <BookOpen className="h-5 w-5 mr-2 text-cyan-100" />
            <span className="font-medium">Information Assurance and Security (IT352) Course Project</span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-blue-200/30 via-white/40 to-cyan-200/30 my-4"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 mr-2 text-cyan-100" />
              <h3 className="font-medium">Carried out by:</h3>
            </div>
            <ul className="list-disc list-inside ml-7 text-blue-100">
              <li className="mb-1">
                <span className="font-medium text-white">Shashank Gupta</span> (221IT061)
              </li>
              <li>
                <span className="font-medium text-white">Kailash Venkat</span> (221IT056)
              </li>
            </ul>
          </div>

          <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
            <Calendar className="h-5 w-5 mr-2 text-cyan-100" />
            <div>
              <span className="text-sm text-blue-100">During Academic Year:</span>
              <p className="font-medium">January - April 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400"></div>
    </div>
  )
}

