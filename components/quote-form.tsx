"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface QuoteFormProps {
  colors: any
  fixedProperties?: any
}

export function QuoteForm({ colors , fixedProperties}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aquí enviarías los datos a tu API para enviar el email
      // const response = await fetch('/api/send-quote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulación de envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Quote request sent!",
        description: "We'll get back to you within 24 hours.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        description: "",
        budget: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePayPal = () => {
    // Integración con PayPal
    window.open("https://paypal.me/gphandysolutions", "_blank")
  }

  return (
    <section id="quote-form" className="py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
            {fixedProperties?.title || "Get Your Free Quote"}
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.text }}>
            {fixedProperties?.subtitle || "ell us about your project and we'll provide a detailed estimate"}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: colors.secondary }}>{fixedProperties.formText}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{fixedProperties.formFields?.name}</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{fixedProperties.formFields?.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{fixedProperties.formFields?.phone}</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="service">Service Needed</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">{fixedProperties.formFields?.serviceOptions?.residential}</SelectItem>
                            <SelectItem value="cleaning">{fixedProperties.formFields?.serviceOptions?.cleaning}</SelectItem>
                            <SelectItem value="commercial">{fixedProperties.formFields?.serviceOptions?.commercial}</SelectItem>
                            <SelectItem value="other">{fixedProperties.formFields?.serviceOptions?.other}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                 

                    <div>
                      <Label htmlFor="description">{fixedProperties.formFields?.description}</Label>
                      <Textarea
                        id="description"
                        placeholder={fixedProperties.formFields?.descriptionPlaceholder || "Describe your project in detail..."}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.background,
                      }}
                    >
                      {isSubmitting ? fixedProperties.formFields?.buttonQuoteSending : fixedProperties.formFields?.buttonQuote}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: colors.secondary }}>{fixedProperties.paysection?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4" style={{ color: colors.text }}>
                   {fixedProperties.paysection?.subtitle}
                  </p>
                  <Button
                    onClick={handlePayPal}
                    className="w-full"
                    style={{
                      backgroundColor: "#0070ba",
                      color: "white",
                    }}
                  >
                    {fixedProperties.paysection?.buttonText || "Pay with PayPal"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ color: colors.secondary }}> {fixedProperties.whychooseUs?.title}</CardTitle>
                  <CardDescription style={{ color: colors.text }}> {fixedProperties.whychooseUs?.subtitle}</CardDescription>
                </CardHeader>


                <CardContent>
                  <ul className="space-y-3">
                    {fixedProperties.whychooseUs?.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                        <span style={{ color: colors.text }}>{feature}</span>
                      </li>
                    ))}
                   
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
