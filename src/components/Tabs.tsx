'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'default' | 'pills' | 'underline'
  onChange?: (tabId: string) => void
  className?: string
}

export default function Tabs({
  tabs,
  defaultTab,
  variant = 'default',
  onChange,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const variants = {
    default: 'bg-slate-800/50 p-1 rounded-xl',
    pills: 'gap-2',
    underline: 'border-b border-slate-800 rounded-none',
  }

  const tabVariants = {
    default: (isActive: boolean) =>
      cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
        isActive
          ? 'bg-slate-700 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      ),
    pills: (isActive: boolean) =>
      cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all',
        isActive
          ? 'bg-purple-500 text-white'
          : 'bg-slate-800 text-slate-400 hover:text-white'
      ),
    underline: (isActive: boolean) =>
      cn(
        'px-4 py-3 text-sm font-medium transition-all border-b-2',
        isActive
          ? 'text-purple-400 border-purple-500'
          : 'text-slate-400 border-transparent hover:text-white'
      ),
  }

  return (
    <div className={className}>
      {/* Tab List */}
      <div className={cn('flex', variants[variant])}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                tabVariants[variant](isActive),
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
              {isActive && variant === 'underline' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={false}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              display: activeTab === tab.id ? 'block' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
