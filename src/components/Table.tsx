'use client'

import { cn } from '@/lib/utils'

interface TableProps {
  children: React.ReactNode
  className?: string
}

export default function Table({ children, className }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full text-sm', className)}>
        {children}
      </table>
    </div>
  )
}

// Table Header
export function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <thead className={cn('bg-slate-900', className)}>
      {children}
    </thead>
  )
}

// Table Body
export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <tbody className={className}>{children}</tbody>
}

// Table Row
export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <tr className={cn('border-b border-slate-800 hover:bg-slate-900/50 transition-colors', className)}>
      {children}
    </tr>
  )
}

// Table Head
export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <th className={cn('px-4 py-3 text-left font-medium text-slate-400', className)}>
      {children}
    </th>
  )
}

// Table Cell
export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <td className={cn('px-4 py-3 text-slate-300', className)}>
      {children}
    </td>
  )
}
