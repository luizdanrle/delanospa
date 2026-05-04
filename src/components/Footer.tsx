'use client'

import { motion } from 'framer-motion'
import { Sparkles, Phone, Mail, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                DelirioSpa
              </span>
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Massagens premium em ambiente discreto e sofisticado. 
              Experiências únicas de relaxamento e prazer.
            </p>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {['Massagens', 'Terapias', 'Massagistas', 'Locais', 'Contactos'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-3">
              {['Massagem Tântrica', 'Body to Body', 'Massagem Nuru', 'Para Casais', 'Relaxamento'].map((item) => (
                <li key={item}>
                  <a
                    href="#massagens"
                    className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-purple-400" />
                +351 912 345 678
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                info@deliriospa.pt
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>Avenida da República, 15<br />Lisboa, Portugal</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} DelirioSpa. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>em Portugal</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors">
              Política de Privacidade
            </a>
            <a href="/admin/login" className="text-slate-500 hover:text-purple-400 transition-colors">
              Admin
            </a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 pt-8 border-t border-slate-800/50">
          <p className="text-slate-600 text-xs text-center max-w-3xl mx-auto">
            Advertência: As nossas massagens não têm um teor ou propósito sexual. 
            São serviços de bem-estar e relaxamento profissionais. 
            Em caso de litígio o consumidor pode recorrer ao Centro Nacional de Informação e Arbitragem de Conflitos de Consumo.
          </p>
        </div>
      </div>
    </footer>
  )
}
