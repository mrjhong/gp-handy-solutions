"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface LanguageSelectorProps {
  colors?: any
  variant?: 'header' | 'footer' | 'floating'
}

export function LanguageSelector({ colors, variant = 'header' }: LanguageSelectorProps) {
  const { language, setLanguage, isLoading } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const toggleDropdown = () => {
    if (!isChanging) {
      setIsOpen(!isOpen)
    }
  }

  const selectLanguage = async (langCode: 'en' | 'es') => {
    if (isChanging || langCode === language) {
      setIsOpen(false)
      return
    }

    try {
      setIsChanging(true)
      setIsOpen(false)
      
      // Feedback visual inmediato
      const message = langCode === 'es' 
        ? 'Cambiando a Español...' 
        : 'Changing to English...'
      
      console.log('🌍', message)
      
      // Cambiar idioma
      setLanguage(langCode)
      
      // Simular pequeño delay para mejor UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
    } catch (error) {
      console.error('Error changing language:', error)
    } finally {
      setIsChanging(false)
    }
  }

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-language-selector]')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  // Escuchar cambios de idioma para mostrar notificaciones
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      console.log('🎉 Language changed:', event.detail)
      // Aquí podrías mostrar un toast o notificación
    }

    window.addEventListener('language-changed', handleLanguageChange as EventListener)
    return () => window.removeEventListener('language-changed', handleLanguageChange as EventListener)
  }, [])

  // Floating variant (fixed position)
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50" data-language-selector>
        <div className="relative">
          <motion.button
            whileHover={{ scale: isChanging ? 1 : 1.05 }}
            whileTap={{ scale: isChanging ? 1 : 0.95 }}
            onClick={toggleDropdown}
            disabled={isChanging || isLoading}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
              isChanging || isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
            style={{ 
              backgroundColor: colors?.primary || '#a855f7',
              color: colors?.background || '#ffffff'
            }}
          >
            {isChanging || isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
            ) : (
              <Globe className="w-6 h-6" />
            )}
          </motion.button>

          <AnimatePresence>
            {isOpen && !isChanging && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border overflow-hidden min-w-[160px]"
              >
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code as 'en' | 'es')}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors relative ${
                      language === lang.code ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{lang.nativeName}</div>
                      <div className="text-sm text-gray-500">{lang.name}</div>
                    </div>
                    {language === lang.code && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de idioma actual */}
          {currentLanguage && !isOpen && (
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <span className="text-xs">{currentLanguage.flag}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Header/Footer variant (inline)
  return (
    <div className="relative" data-language-selector>
      <button
        onClick={toggleDropdown}
        disabled={isChanging || isLoading}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          isChanging || isLoading ? 'opacity-70 cursor-not-allowed' : ''
        } ${
          variant === 'header' 
            ? 'hover:bg-gray-100 text-gray-700 hover:text-gray-900' 
            : 'hover:bg-white/10 text-gray-300 hover:text-white'
        }`}
      >
        {isChanging || isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
        
        <span className="text-sm font-medium">
          {currentLanguage ? (
            <>
              {currentLanguage.flag} {currentLanguage.nativeName}
            </>
          ) : (
            'Loading...'
          )}
        </span>
        
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && !isChanging && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border overflow-hidden min-w-[160px] z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => selectLanguage(lang.code as 'en' | 'es')}
                whileHover={{ backgroundColor: '#f9fafb' }}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors relative ${
                  language === lang.code ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}