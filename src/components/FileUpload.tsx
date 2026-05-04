'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, File, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onUpload?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  className?: string
}

export default function FileUpload({
  onUpload,
  accept = '*',
  multiple = false,
  maxSize = 5,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    validateAndSetFiles(droppedFiles)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    validateAndSetFiles(selectedFiles)
  }, [])

  const validateAndSetFiles = (newFiles: File[]) => {
    setError(null)

    const oversizedFiles = newFiles.filter(file => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setError(`Arquivos devem ter no máximo ${maxSize}MB`)
      return
    }

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
    setFiles(updatedFiles)
    onUpload?.(updatedFiles)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onUpload?.(updatedFiles)
  }

  return (
    <div className={className}>
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer',
          isDragging
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-slate-500" />
        <p className="text-white font-medium mb-1">
          Arraste arquivos ou clique para selecionar
        </p>
        <p className="text-slate-500 text-sm">
          Máximo {maxSize}MB • {accept === '*' ? 'Qualquer formato' : accept}
        </p>
      </motion.div>

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800"
            >
              <File className="w-5 h-5 text-purple-400" />
              <span className="flex-1 text-sm text-white truncate">{file.name}</span>
              <span className="text-xs text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <button
                onClick={() => removeFile(index)}
                className="p-1 rounded hover:bg-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
