'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Layout, 
  Settings, 
  Save, 
  Eye, 
  Edit3,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Camera,
  Video,
  Music,
  FileText,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ContentBlock {
  id: string
  type: 'text' | 'heading' | 'image' | 'video' | 'banner' | 'hero' | 'section' | 'button' | 'list'
  content: any
  styles?: any
  order: number
  page: string
  section: string
}

interface ContentEditorProps {
  page: string
  section?: string
  previewMode?: boolean
  onSave?: (blocks: ContentBlock[]) => void
}

export default function ContentEditor({ 
  page, 
  section = 'main', 
  previewMode = false,
  onSave 
}: ContentEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'settings'>('content')
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const supabase = createClient()

  useEffect(() => {
    loadContent()
  }, [page, section])

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page', page)
        .eq('section', section)
        .order('order', { ascending: true })

      if (error) throw error
      setBlocks(data || [])
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert(
          blocks.map(block => ({
            ...block,
            updated_at: new Date().toISOString()
          })),
          { onConflict: 'id' }
        )

      if (error) throw error
      
      setSaved(true)
      onSave?.(blocks)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: blocks.length,
      page,
      section
    }
    setBlocks([...blocks, newBlock])
    setSelectedBlock(newBlock.id)
  }

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id))
    if (selectedBlock === id) setSelectedBlock(null)
  }

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) return

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    
    newBlocks.forEach((block, i) => {
      block.order = i
    })
    
    setBlocks(newBlocks)
  }

  const getDefaultContent = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text':
        return 'Digite seu texto aqui...'
      case 'heading':
        return 'Título da Seção'
      case 'image':
        return { url: '', alt: '', caption: '' }
      case 'video':
        return { url: '', thumbnail: '', title: '' }
      case 'banner':
        return { 
          title: 'Banner Principal', 
          subtitle: 'Subtítulo do banner',
          image: '',
          cta: { text: 'Saiba Mais', url: '#' }
        }
      case 'hero':
        return {
          title: 'Bem-vindo ao DelirioSpa',
          subtitle: 'Experiências únicas de relaxamento e prazer',
          background: '',
          ctas: [
            { text: 'Agendar Agora', url: '#booking' },
            { text: 'Conhecer Serviços', url: '#services' }
          ]
        }
      case 'button':
        return { text: 'Clique Aqui', url: '#', style: 'primary' }
      case 'list':
        return { items: ['Item 1', 'Item 2', 'Item 3'], style: 'bullet' }
      default:
        return ''
    }
  }

  const renderBlockEditor = (block: ContentBlock) => {
    const isSelected = selectedBlock === block.id

    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg">
              <button className="p-1 hover:bg-slate-700 rounded">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-slate-700 rounded">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-slate-700 rounded">
                <Underline className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-600" />
              <button className="p-1 hover:bg-slate-700 rounded">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-slate-700 rounded">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-slate-700 rounded">
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white resize-none"
              rows={6}
              placeholder="Digite seu texto aqui..."
            />
          </div>
        )

      case 'heading':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-700 rounded">
                <Heading1 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-700 rounded">
                <Heading2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-700 rounded">
                <Heading3 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white text-2xl font-bold"
              placeholder="Título da seção..."
            />
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <input
                type="url"
                value={block.content.url || ''}
                onChange={(e) => updateBlock(block.id, { 
                  content: { ...block.content, url: e.target.value }
                })}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white mb-2"
                placeholder="URL da imagem"
              />
              <input
                type="text"
                value={block.content.alt || ''}
                onChange={(e) => updateBlock(block.id, { 
                  content: { ...block.content, alt: e.target.value }
                })}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
                placeholder="Texto alternativo"
              />
            </div>
          </div>
        )

      case 'banner':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateBlock(block.id, { 
                content: { ...block.content, title: e.target.value }
              })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white text-xl font-bold"
              placeholder="Título do banner"
            />
            <input
              type="text"
              value={block.content.subtitle || ''}
              onChange={(e) => updateBlock(block.id, { 
                content: { ...block.content, subtitle: e.target.value }
              })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white"
              placeholder="Subtítulo do banner"
            />
            <input
              type="url"
              value={block.content.image || ''}
              onChange={(e) => updateBlock(block.id, { 
                content: { ...block.content, image: e.target.value }
              })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white"
              placeholder="URL da imagem do banner"
            />
          </div>
        )

      default:
        return (
          <div className="p-4 bg-slate-800 rounded-lg">
            <p className="text-slate-400">Editor para {block.type} em desenvolvimento...</p>
          </div>
        )
    }
  }

  const renderPreview = () => {
    const deviceWidths = {
      desktop: '100%',
      tablet: '768px',
      mobile: '375px'
    }

    return (
      <div className="bg-white rounded-lg overflow-hidden" style={{ maxWidth: deviceWidths[devicePreview] }}>
        {blocks.map((block) => (
          <div key={block.id} className="p-4 border-b border-gray-200">
            {block.type === 'heading' && (
              <h1 className="text-3xl font-bold text-gray-900">{block.content}</h1>
            )}
            {block.type === 'text' && (
              <p className="text-gray-700 whitespace-pre-wrap">{block.content}</p>
            )}
            {block.type === 'image' && block.content.url && (
              <img 
                src={block.content.url} 
                alt={block.content.alt || ''}
                className="w-full rounded-lg"
              />
            )}
            {block.type === 'banner' && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-2">{block.content.title}</h2>
                <p className="text-lg opacity-90">{block.content.subtitle}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (previewMode) {
    return renderPreview()
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Editor de Conteúdo</h1>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {page} / {section}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Device Preview */}
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setDevicePreview('desktop')}
                className={cn(
                  "p-2 rounded",
                  devicePreview === 'desktop' ? "bg-purple-500 text-white" : "text-slate-400"
                )}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('tablet')}
                className={cn(
                  "p-2 rounded",
                  devicePreview === 'tablet' ? "bg-purple-500 text-white" : "text-slate-400"
                )}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('mobile')}
                className={cn(
                  "p-2 rounded",
                  devicePreview === 'mobile' ? "bg-purple-500 text-white" : "text-slate-400"
                )}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                isEditing 
                  ? "bg-green-500 text-white" 
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              )}
            >
              {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? 'Visualizar' : 'Editar'}
            </button>

            <button
              onClick={saveContent}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Salvando...' : 'Salvar'}
            </button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-400 font-medium"
              >
                Salvo com sucesso!
              </motion.span>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-80 bg-slate-900 border-r border-slate-800 p-6">
          {/* Add Block */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Adicionar Bloco
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addBlock('heading')}
                className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
              >
                <Heading1 className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-slate-300">Título</span>
              </button>
              <button
                onClick={() => addBlock('text')}
                className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
              >
                <Type className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-slate-300">Texto</span>
              </button>
              <button
                onClick={() => addBlock('image')}
                className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
              >
                <ImageIcon className="w-5 h-5 text-green-400" />
                <span className="text-xs text-slate-300">Imagem</span>
              </button>
              <button
                onClick={() => addBlock('video')}
                className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
              >
                <Video className="w-5 h-5 text-red-400" />
                <span className="text-xs text-slate-300">Vídeo</span>
              </button>
              <button
                onClick={() => addBlock('banner')}
                className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
              >
                <Layout className="w-5 h-5 text-amber-400" />
                <span className="text-xs text-slate-300">Banner</span>
              </button>
              <button
                onClick={() => addBlock('button')}
                className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
              >
                <Globe className="w-5 h-5 text-pink-400" />
                <span className="text-xs text-slate-300">Botão</span>
              </button>
            </div>
          </div>

          {/* Block List */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Blocos de Conteúdo
            </h3>
            <div className="space-y-2">
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                    selectedBlock === block.id
                      ? "bg-purple-500/20 border border-purple-500/30"
                      : "bg-slate-800 hover:bg-slate-700"
                  )}
                  onClick={() => setSelectedBlock(block.id)}
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, 'up')
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-slate-600 rounded disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, 'down')
                      }}
                      disabled={index === blocks.length - 1}
                      className="p-1 hover:bg-slate-600 rounded disabled:opacity-50"
                    >
                      ↓
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getBlockIcon(block.type)}
                      <span className="text-sm text-white capitalize">{block.type}</span>
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {getBlockPreview(block)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteBlock(block.id)
                    }}
                    className="p-1 hover:bg-red-500/20 rounded text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Editor */}
            <div className="flex-1 p-6">
              {selectedBlock ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 rounded-xl border border-slate-800 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white capitalize">
                      Editar {selectedBlock ? blocks.find(b => b.id === selectedBlock)?.type : ''}
                    </h2>
                  </div>
                  {renderBlockEditor(blocks.find(b => b.id === selectedBlock)!)}
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center">
                      <Edit3 className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Selecione um bloco para editar
                    </h3>
                    <p className="text-slate-400">
                      Ou adicione um novo bloco usando o painel lateral
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="w-1/2 bg-slate-800 p-6 border-l border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-6">Visualização</h3>
              <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-full">
                {renderPreview()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function getBlockIcon(type: string) {
  const icons = {
    heading: <Heading1 className="w-4 h-4 text-purple-400" />,
    text: <Type className="w-4 h-4 text-blue-400" />,
    image: <ImageIcon className="w-4 h-4 text-green-400" />,
    video: <Video className="w-4 h-4 text-red-400" />,
    banner: <Layout className="w-4 h-4 text-amber-400" />,
    button: <Globe className="w-4 h-4 text-pink-400" />,
    hero: <Layout className="w-4 h-4 text-indigo-400" />,
    section: <Layout className="w-4 h-4 text-cyan-400" />,
    list: <List className="w-4 h-4 text-orange-400" />
  }
  return icons[type as keyof typeof icons] || <FileText className="w-4 h-4 text-slate-400" />
}

function getBlockPreview(block: ContentBlock): string {
  switch (block.type) {
    case 'text':
      return block.content.substring(0, 50) + '...'
    case 'heading':
      return block.content
    case 'image':
      return block.content.url ? 'Imagem carregada' : 'Sem imagem'
    case 'video':
      return block.content.url ? 'Vídeo carregado' : 'Sem vídeo'
    case 'banner':
      return block.content.title || 'Banner sem título'
    case 'button':
      return block.content.text || 'Botão sem texto'
    default:
      return 'Bloco sem conteúdo'
  }
}
