'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, CreditCard, Truck, User, MapPin, Phone, Mail, Package, Loader2, Shield } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatPrice } from '@/data/products';
import { trackPurchase } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/Toast';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [transferCode, setTransferCode] = useState<string>('');
  const { items, getTotal, clearCart } = useCartStore();
  const { user, profile } = useAuthStore();
  
  const rawTotal = getTotal();
  const titleCount = profile?.badges?.length || 0;
  let discountPercent = 0;
  if (titleCount >= 3) discountPercent = 20;
  else if (titleCount === 2) discountPercent = 15;
  else if (titleCount === 1) discountPercent = 10;
  const discountAmount = Math.floor(rawTotal * discountPercent / 100);
  const finalTotal = rawTotal - discountAmount;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'visa'>('visa');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: ''
  });

  useEffect(() => {
    setMounted(true);
    // Generate transfer code on client side only
    setTransferCode(`MUT3MIEN_${Date.now().toString().slice(-6)}`);
  }, []);

  useEffect(() => {
    // Pre-fill email from user profile
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
    // Pre-fill name from profile if available
    if (profile?.name) {
      setFormData(prev => ({ ...prev, name: profile.name || '' }));

    }

  }, [user, profile]);

  // Handle redirect in useEffect to avoid setState during render
  useEffect(() => {
    if (mounted && items.length === 0 && step !== 3) {
      router.push('/gio-hang');
    }
  }, [mounted, items.length, step, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show loading while redirecting
  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    
    // Simple formatting for card number
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    // Simple formatting for expiry date (MM/YY)
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
    }
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    // Uppercase for cardholder name
    if (name === 'cardName') {
      value = value.toUpperCase();
    }

    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = async () => {
    if (paymentMethod === 'visa') {
      handleVisaPayment();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderItems = items.map(item => {
        let name = language === 'vi' ? item.product.name : item.product.nameEn;
        if (item.isPack10) name += ` (${t.packOf10})`;
        if (item.selectedSelections && item.selectedSelections.length > 0) {
          name += ` [${language === 'vi' ? 'Chọn' : 'Selected'}: ${item.selectedSelections.join(', ')}]`;
        }
        return {
          id: item.id,
          name: name,
          price: item.isPack10 ? 450000 : item.product.price,
          quantity: item.quantity
        };
      });

      // Save order to database
      const { data: orderData, error } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          items: orderItems,
          total: finalTotal,
          status: 'pending',
          shipping_info: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            note: formData.note
          },
          payment_method: 'transfer',
          payment_status: 'unpaid'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving order:', error);
        const localOrderId = `LOCAL_${Date.now()}`;
        setOrderId(localOrderId);
        const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
        trackPurchase(localOrderId, finalTotal, itemCount, user?.id);
        setStep(3);
        showToast('success', t.orderSuccess);
        return;
      }

      const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
      trackPurchase(orderData.id, finalTotal, itemCount, user?.id);
      
      setOrderId(orderData.id);
      setStep(3);
      showToast('success', t.orderSuccess);
    } catch (error) {
      console.error('Error:', error);
      setStep(3);
      showToast('success', t.orderSuccess);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVisaPayment = async () => {
    setIsSubmitting(true);
    try {
      const orderItems = items.map(item => {
        let name = language === 'vi' ? item.product.name : item.product.nameEn;
        if (item.isPack10) name += ` (${t.packOf10})`;
        if (item.selectedSelections && item.selectedSelections.length > 0) {
          name += ` [${language === 'vi' ? 'Chọn' : 'Selected'}: ${item.selectedSelections.join(', ')}]`;
        }
        return {
          id: item.id,
          name: name,
          price: item.isPack10 ? 450000 : item.product.price,
          quantity: item.quantity
        };
      });

      // Simulate successful payment by creating order with 'confirmed' status
      const { data: orderData, error } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          items: orderItems,
          total: finalTotal,
          status: 'pending',
          shipping_info: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            note: formData.note
          },
          payment_method: 'visa',
          payment_status: 'paid'
        })
        .select()
        .single();

      if (error) throw error;

      const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
      trackPurchase(orderData.id, finalTotal, itemCount, user?.id);
      
      setOrderId(orderData.id);
      setStep(3);
      showToast('success', t.visaSuccess);
    } catch (error) {
      console.error('Simulated VISA error:', error);
      showToast('error', t.errorOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = () => {
    clearCart();
    router.push('/');
  };

  const handleViewOrders = () => {
    clearCart();
    router.push('/don-hang');
  };

  return (
    <div className="min-h-screen pattern-bg py-6 md:py-12">
      <div className="section max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1 },
            { num: 2 },
            { num: 3 }
          ].map((s, i) => {

            const label = i === 0 ? t.stepInfo : i === 1 ? t.stepPayment : t.stepComplete;
            return (
              <div key={s.num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s.num 
                    ? 'gradient-gold text-white' 
                    : 'bg-white text-[var(--color-brown)]/50'
                }`}>
                  {step > s.num ? <Check size={20} /> : s.num}
                </div>
                <span className={`ml-2 hidden sm:block ${
                  step >= s.num ? 'text-[var(--color-brown)]' : 'text-[var(--color-brown)]/50'
                }`}>
                  {label}
                </span>
                {i < 2 && (
                  <div className={`w-12 h-1 mx-4 rounded ${
                    step > s.num ? 'bg-[var(--color-gold)]' : 'bg-white'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Shipping Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6 flex items-center gap-2">
              <Truck size={24} />
              {t.shippingInfoTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <User size={16} className="inline mr-1" /> {t.fullName} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder={t.fullNamePlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <Phone size={16} className="inline mr-1" /> {t.phoneNumber} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder={t.phonePlaceholder}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <Mail size={16} className="inline mr-1" /> {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  <MapPin size={16} className="inline mr-1" /> {t.address} *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder={t.addressPlaceholder}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                  {t.note}
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
                  placeholder={t.notePlaceholder}
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.phone || !formData.address}
              className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.continueToPayment}
            </button>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6 flex items-center gap-2">
              <CreditCard size={24} />
              {t.stepPayment}
            </h2>

            {/* Order Summary */}
            <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-[var(--color-brown)] mb-4">{t.orderSummary}</h3>
              {items.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b border-[var(--border)] last:border-0">
                  <span className="text-[var(--color-brown)]/80">
                    {language === 'vi' ? item.product.name : item.product.nameEn} {item.isPack10 ? `(${t.packOf10})` : ''} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatPrice((item.isPack10 ? 450000 : item.product.price) * item.quantity)}</span>
                </div>
              ))}
              
              {discountPercent > 0 && (
                <div className="flex justify-between py-2 border-b border-[var(--border)]">
                  <span className="text-green-600 font-medium">{t.membershipDiscount} ({discountPercent}%)</span>
                  <span className="font-medium text-green-600">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between pt-4 mt-2 border-t-2 border-[var(--color-gold)]">
                <span className="font-bold text-[var(--color-brown)]">{t.total}</span>
                <span className="font-bold text-xl text-[var(--color-gold)]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod('visa')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                  paymentMethod === 'visa' 
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5 ring-4 ring-[var(--color-gold)]/10' 
                    : 'border-[var(--border)] hover:border-[var(--color-gold)]/30 bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="font-bold text-blue-600 text-lg italic">VISA</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-[var(--color-brown)]">{t.visaCard}</span>
                  <span className="text-[10px] text-[var(--color-brown)]/50 uppercase tracking-wider">{t.autoConfirm}</span>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                  paymentMethod === 'transfer' 
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5 ring-4 ring-[var(--color-gold)]/10' 
                    : 'border-[var(--border)] hover:border-[var(--color-gold)]/30 bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shadow-sm">
                  <CreditCard className="text-amber-600" size={24} />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-[var(--color-brown)]">{t.bankTransfer}</span>
                  <span className="text-[10px] text-[var(--color-brown)]/50 uppercase tracking-wider">{t.manualConfirm}</span>
                </div>
              </button>
            </div>

            {/* Payment Details Content */}
            <div className="mb-10">
              {paymentMethod === 'visa' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-[var(--color-brown)]">{t.visaInfo}</h3>
                    <div className="flex gap-2">
                      <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">VISA</div>
                      <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">MC</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-brown)]/50 uppercase mb-2">{t.cardHolder}</label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-blue-500 focus:outline-none transition-colors font-medium"
                        placeholder="NGUYEN VAN A"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--color-brown)]/50 uppercase mb-2">{t.cardNumberLabel}</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardData.cardNumber}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-blue-500 focus:outline-none transition-colors font-mono text-lg"
                          placeholder="0000 0000 0000 0000"
                        />
                        <CreditCard size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-brown)]/50 uppercase mb-2">{t.expiryDateLabel}</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-brown)]/50 uppercase mb-2">{t.cvvLabel}</label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="***"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--color-brown)]/50 uppercase mb-2">{t.billingAddressLabel}</label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={cardData.billingAddress}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder={t.addressPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-2xl flex items-start gap-3">
                    <Shield size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-blue-600/80 leading-relaxed italic">
                      {t.securityNote}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--color-cream)] rounded-3xl p-8 border border-[var(--color-gold)]/20"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-gold)]/20 to-transparent rounded-[2rem] blur-xl opacity-50" />
                      <div className="relative p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center">
                        <img 
                          src="/qr-codes/qr-chuyen-khoan.jpg" 
                          alt="QR Chuyển Khoản" 
                          className="w-44 h-auto rounded-lg mb-2"
                        />
                        <p className="text-[10px] font-bold text-[var(--color-brown)]/40 uppercase tracking-tighter">VietCharm Official QR</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xs space-y-4">
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-[var(--color-brown)] text-lg mb-1">{t.scanToPay}</h3>
                        <p className="text-sm text-[var(--color-brown)]/60">{t.transferNote}</p>
                      </div>
                      
                      {transferCode && (
                        <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-[var(--color-gold)]/30 text-center md:text-left">
                          <p className="text-[10px] font-bold text-[var(--color-brown)]/40 uppercase mb-1">{t.transferContentLabel}</p>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono font-black text-xl text-[var(--color-gold)] tracking-wider">
                              {transferCode}
                            </span>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(transferCode);
                                showToast('success', t.copyCodeSuccess);
                              }}
                              className="p-2 hover:bg-[var(--color-cream)] rounded-lg transition-colors text-[var(--color-gold)]"
                              title={language === 'vi' ? 'Sao chép' : 'Copy'}
                            >
                              <Package size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--border)]">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex-1 py-4"
              >
                {t.back}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (paymentMethod === 'visa' && (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardName))}
                className="btn-primary flex-1 py-4 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {t.confirmPayment}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6">
              <Check size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-4">
              {t.orderSuccess}
            </h2>
            {orderId && (
                <p className="text-sm text-[var(--color-brown)]/60 mb-2">
                {t.orderId}: <span className="font-mono font-bold">#{orderId.slice(0, 8).toUpperCase()}</span>
              </p>

            )}
            <p className="text-[var(--color-brown)]/70 mb-8 whitespace-pre-line">
              {t.orderSuccessDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user && (
                <button 
                  onClick={handleViewOrders} 
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Package size={18} />
                  {t.viewOrders}
                </button>
              )}
              <button onClick={handleComplete} className="btn-primary">
                {t.backHome}
              </button>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
