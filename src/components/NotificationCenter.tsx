'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  timestamp: string
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onDismiss?: (id: string) => void
  className?: string
}

const typeIcons = {
  info: { icon: Clock, color: 'text-sky-400 bg-sky-500/10' },
  success: { icon: Check, color: 'text-green-400 bg-green-500/10' },
  warning: { icon: Clock, color: 'text-amber-400 bg-amber-500/10' },
  error: { icon: X, color: 'text-red-400 bg-red-500/10' },
}

export default function NotificationCenter({
  notifications,
  onMarkAsRead,
  onDismiss,
  className,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className={cn('relative', className)}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-800 transition-colors"
      >
        <Bell className="w-6 h-6 text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <h3 className="font-semibold text-white">Notificações</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Sem notificações</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const { icon: Icon, color } = typeIcons[notification.type]
                  return (
                    <div
                      key={notification.id}
                      onClick={() => onMarkAsRead?.(notification.id)}
                      className={cn(
                        'flex gap-3 p-4 border-b border-slate-800/50 cursor-pointer transition-colors',
                        notification.read ? 'opacity-60' : 'bg-slate-800/30'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm">{notification.title}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{notification.message}</p>
                        <p className="text-slate-600 text-xs mt-1">{notification.timestamp}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDismiss?.(notification.id)
                        }}
                        className="flex-shrink-0 p-1 rounded hover:bg-slate-800 text-slate-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
