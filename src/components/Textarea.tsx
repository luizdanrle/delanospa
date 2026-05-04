'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  helperText?: string
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helperText, resize = 'vertical', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex w-full rounded-xl border bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors min-h-[100px]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            !error && 'border-slate-800 hover:border-slate-700',
            resize === 'none' && 'resize-none',
            resize === 'horizontal' && 'resize-x',
            resize === 'vertical' && 'resize-y',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
export default Textarea
