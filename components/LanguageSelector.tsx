"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface LanguageSelectorProps {
  colors?: any
  variant?: 'header' | 'footer' | 'floating'
}

export function LanguageSelector({ colors, variant = 'header' }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const selectLanguage = (langCode: 'en' | 'es') => {
    setLanguage(langCode)
    setIsOpen(false)
    
    // Mostrar notificación opcional
    if (typeof window !== 'undefined') {
      const message = langCode === 'es' 
        ? 'Idioma cambiado a Español' 
        : 'Language changed to English'
      
      // Opcional: Mostrar toast o notificación
      console.log(message)
    }
  }

  // Floating variant (fixed position)
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDropdown}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
            style={{ 
              backgroundColor: colors?.primary || '#a855f7',
              color: colors?.background || '#ffffff'
            }}
          >
            <Globe className="w-6 h-6" />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border overflow-hidden min-w-[150px]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code as 'en' | 'es')}
                    className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                      language === lang.code ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900">{lang.nativeName}</div>
                      <div className="text-sm text-gray-500">{lang.name}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // Header/Footer variant (inline)
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          variant === 'header' 
            ? 'hover:bg-gray-100 text-gray-700 hover:text-gray-900' 
            : 'hover:bg-white/10 text-gray-300 hover:text-white'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.nativeName}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border overflow-hidden min-w-[160px] z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code as 'en' | 'es')}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                  language === lang.code ? 'bg-gray-100' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}