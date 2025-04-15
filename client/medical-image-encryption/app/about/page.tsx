"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  School,
  Users,
  Calendar,
  Github,
  Mail,
  Award,
  ChevronRight,
  Cpu,
  Shield,
  Database,
  BrainCircuit,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0);

  // Auto-rotate through sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSectionClick = (index: number) => {
    setActiveSection(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-binary-pattern"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>

        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Application
            </Button>
          </Link>

          <div className="flex items-center">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-cyan-200">
                Foundations of Machine Learning (IT352)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-3 py-1 text-sm font-medium mb-4">
                Course Project
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-200 text-transparent bg-clip-text">
                Medical Image Encryption
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-xl">
                A secure system for encrypting and decrypting medical images
                using latent vector transformation, ensuring HIPAA compliance
                and protecting sensitive patient data.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <School className="h-5 w-5 text-cyan-300 mr-2" />
                  <h2 className="text-xl font-semibold text-cyan-100">
                    Institution
                  </h2>
                </div>
                <div className="pl-7 mb-6">
                  <h3 className="text-lg font-medium">
                    Department of Information Technology
                  </h3>
                  <p className="text-blue-200">
                    National Institute of Technology Karnataka, Surathkal-575025
                  </p>
                </div>

                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-cyan-300 mr-2" />
                  <h2 className="text-xl font-semibold text-cyan-100">
                    Academic Period
                  </h2>
                </div>
                <div className="pl-7">
                  <p className="text-blue-200">January - April 2025</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-cyan-300 mr-3" />
                  <h2 className="text-2xl font-bold text-white">
                    Project Team
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold">
                    SG
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Shashank Gupta</h3>
                    <p className="text-cyan-200 mb-2">Student ID: 221IT061</p>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Github
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Kailash Venkat</h3>
                    <p className="text-cyan-200 mb-2">Student ID: 221IT056</p>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Github
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-xl font-bold">
                    KV
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Balaji Anirudh</h3>
                    <p className="text-cyan-200 mb-2">Student ID: 221IT026</p>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Github
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Dilip Sagar M</h3>
                    <p className="text-cyan-200 mb-2">Student ID: 221IT024</p>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs bg-white/5 hover:bg-white/10 text-cyan-100"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Github
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center mb-3">
                    <Award className="h-5 w-5 text-cyan-300 mr-2" />
                    <h3 className="text-lg font-medium">Project Guidance</h3>
                  </div>
                  <div className="pl-7">
                    <p className="text-blue-200">
                      Under the guidance of{" "}
                      <a
                        href="https://infotech.nitk.ac.in/faculty/ram-mohana-reddy-guddeti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 font-medium underline underline-offset-2"
                      >
                        Prof. Ram Mohana Reddy Guddeti
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://infotech.nitk.ac.in/content/palla-parasuram-yadav"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 font-medium underline underline-offset-2"
                      >
                        Dr. Palla Parasuram Yadav
                      </a>
                    </p>
                    <p className="text-blue-300 text-sm mt-1">
                      Department of Information Technology, NITK Surathkal
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Project Overview
          </h2>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              "Project Scope",
              "Technology",
              "Security Features",
              "Implementation",
            ].map((title, index) => (
              <button
                key={index}
                className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeSection === index
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    : "bg-white/5 text-blue-200 hover:bg-white/10"
                }`}
                onClick={() => handleSectionClick(index)}
              >
                {title}
              </button>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 min-h-[300px]">
            {activeSection === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <BookOpen className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Project Scope
                    </h3>
                    <p className="text-blue-200">
                      This project focuses on developing a secure system for
                      encrypting and decrypting medical images using latent
                      vector transformation. The system is designed to protect
                      sensitive medical data while maintaining the diagnostic
                      quality of the images.
                    </p>
                  </div>
                </div>

                <div className="pl-12 mt-4 space-y-2">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-cyan-400 mr-2" />
                    <p className="text-blue-200">
                      Secure transmission of sensitive medical images
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-cyan-400 mr-2" />
                    <p className="text-blue-200">
                      HIPAA-compliant encryption and decryption processes
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-cyan-400 mr-2" />
                    <p className="text-blue-200">
                      Preservation of image quality for diagnostic purposes
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-cyan-400 mr-2" />
                    <p className="text-blue-200">
                      User-friendly interface for healthcare professionals
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-start">
                  <div className="bg-cyan-500/20 p-2 rounded-lg mr-4">
                    <Cpu className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Technology Stack
                    </h3>
                    <p className="text-blue-200">
                      The project utilizes cutting-edge technologies for image
                      processing, encryption, and user interface development.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-12 mt-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-cyan-200 mb-2">Frontend</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-blue-200">Next.js & React</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-blue-200">Tailwind CSS</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-blue-200">TypeScript</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-cyan-200 mb-2">Backend</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                        <span className="text-blue-200">Python</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                        <span className="text-blue-200">
                          TensorFlow/PyTorch
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                        <span className="text-blue-200">
                          Django REST Framework
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-start">
                  <div className="bg-teal-500/20 p-2 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Security Features
                    </h3>
                    <p className="text-blue-200">
                      The system implements multiple layers of security to
                      ensure the confidentiality and integrity of medical
                      images.
                    </p>
                  </div>
                </div>

                <div className="pl-12 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-white/5">
                    <h4 className="font-medium text-cyan-200 mb-2 flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-cyan-400" />
                      End-to-End Encryption
                    </h4>
                    <p className="text-blue-200 text-sm">
                      All data is encrypted during transmission and storage
                      using AES-256 encryption.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-white/5">
                    <h4 className="font-medium text-cyan-200 mb-2 flex items-center">
                      <Database className="h-4 w-4 mr-2 text-cyan-400" />
                      Secure Key Management
                    </h4>
                    <p className="text-blue-200 text-sm">
                      Cryptographic keys are securely generated and managed to
                      prevent unauthorized access.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-white/5">
                    <h4 className="font-medium text-cyan-200 mb-2 flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-cyan-400" />
                      HIPAA Compliance
                    </h4>
                    <p className="text-blue-200 text-sm">
                      The system adheres to HIPAA regulations for protecting
                      sensitive patient information.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-white/5">
                    <h4 className="font-medium text-cyan-200 mb-2 flex items-center">
                      <BrainCircuit className="h-4 w-4 mr-2 text-cyan-400" />
                      Latent Vector Transformation
                    </h4>
                    <p className="text-blue-200 text-sm">
                      Advanced neural network techniques for secure image
                      transformation and reconstruction.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <Cpu className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Implementation Details
                    </h3>
                    <p className="text-blue-200">
                      The project implements a comprehensive workflow for secure
                      medical image processing.
                    </p>
                  </div>
                </div>

                <div className="pl-12 mt-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500"></div>

                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        1
                      </div>
                      <h4 className="text-lg font-medium text-blue-200">
                        Image Upload
                      </h4>
                      <p className="text-blue-300 mt-1">
                        Secure upload of medical images with validation and
                        preprocessing.
                      </p>
                    </div>

                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                        2
                      </div>
                      <h4 className="text-lg font-medium text-blue-200">
                        Latent Vector Generation
                      </h4>
                      <p className="text-blue-300 mt-1">
                        Conversion of images to latent vectors using neural
                        networks.
                      </p>
                    </div>

                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                        3
                      </div>
                      <h4 className="text-lg font-medium text-blue-200">
                        Encryption/Decryption
                      </h4>
                      <p className="text-blue-300 mt-1">
                        Secure encryption and decryption of latent vectors.
                      </p>
                    </div>

                    <div className="relative pl-12">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        4
                      </div>
                      <h4 className="text-lg font-medium text-blue-200">
                        Image Reconstruction
                      </h4>
                      <p className="text-blue-300 mt-1">
                        Reconstruction of original images from decrypted latent
                        vectors.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <footer className="mt-20 text-center text-blue-300 text-sm">
          <p>© 2025 - Foundations of Machine Learning (IT464) Course Project</p>
          <p className="mt-1">
            National Institute of Technology Karnataka, Surathkal
          </p>
        </footer>
      </div>
    </div>
  );
}
