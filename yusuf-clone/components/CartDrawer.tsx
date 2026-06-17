'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    totalPrice,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // 1. Format order details
    const orderItemsText = cart.map((item, idx) => {
      return `${idx + 1}. *${item.name}* (${item.type === 'perfume' ? 'Perfume' : 'Perfume Oil'} - ${item.size})\n   Qty: ${item.quantity} x ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.quantity)}`;
    }).join('\n\n');

    // 2. Compile message
    const message = `🛍️ *NEW ORDER - NURA BY BIN SADHIK*
---------------------------------------
*👤 CUSTOMER DETAILS:*
• *Name:* ${formData.name.trim()}
• *Phone:* ${formData.phone.trim()}
• *Address:* ${formData.address.trim()}
• *City:* ${formData.city.trim()}
• *Pincode:* ${formData.pincode.trim()}
${formData.notes.trim() ? `• *Notes:* ${formData.notes.trim()}\n` : ''}
---------------------------------------
*📦 ORDER ITEMS:*
${orderItemsText}

---------------------------------------
💰 *TOTAL AMOUNT:* ${formatCurrency(totalPrice)}
---------------------------------------
_Thank you for ordering with NURA. Please confirm our payment details to proceed!_`;

    // 3. Build WhatsApp URL
    const whatsappNumber = '919003954228'; // Target WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // 4. Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // 5. Clear Cart & Close Drawer
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.drawer} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>YOUR CART</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Your cart is empty</p>
            <button className={styles.continueBtn} onClick={() => setIsCartOpen(false)}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.itemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemImageContainer}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemNameRow}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <button 
                        className={styles.removeIconBtn} 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <p className={styles.itemSpec}>
                      {item.type === 'perfume' ? 'Perfume' : 'Perfume Oil'} — {item.size}
                    </p>
                    <div className={styles.itemFooter}>
                      <div className={styles.quantitySelector}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <span className={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summarySection}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span className={styles.totalPrice}>{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.checkoutForm}>
              <h3 className={styles.formTitle}>DELIVERY DETAILS</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Kumar"
                  className={errors.name ? styles.inputError : ''}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 9003954228"
                  className={errors.phone ? styles.inputError : ''}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Delivery Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address, apartment, suite"
                  className={errors.address ? styles.inputError : ''}
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Chennai"
                    className={errors.city ? styles.inputError : ''}
                  />
                  {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit PIN"
                    maxLength={6}
                    className={errors.pincode ? styles.inputError : ''}
                  />
                  {errors.pincode && <span className={styles.errorText}>{errors.pincode}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="notes">Special Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Delivery instructions or specific requests"
                  rows={2}
                />
              </div>

              <button type="submit" className={styles.checkoutBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.waIcon}>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.488 1.98 14.029.957 11.397.957 5.962.957 1.536 5.327 1.532 10.758c-.001 1.639.433 3.24 1.256 4.654l-.993 3.626 3.734-.972c1.436.786 2.87 1.196 4.528 1.192zm11.233-7.79c-.31-.154-1.82-.898-2.101-.997-.282-.1-.487-.15-.693.155-.205.305-.796.997-.975 1.197-.18.204-.36.229-.67.075-.31-.155-1.314-.483-2.505-1.543-.926-.823-1.551-1.84-1.733-2.148-.182-.31-.02-.477.135-.63.14-.137.31-.36.465-.54.155-.18.206-.31.31-.515.102-.204.05-.38-.025-.536-.077-.154-.693-1.666-.948-2.28-.25-.596-.5-.515-.693-.526-.18-.009-.385-.01-.59-.01-.205 0-.54.076-.822.38-.282.305-1.077 1.05-1.077 2.56 0 1.51 1.1 2.97 1.254 3.17.154.205 2.164 3.292 5.242 4.613.733.314 1.306.502 1.752.643.736.233 1.407.199 1.936.12.59-.089 1.82-.743 2.076-1.46.256-.718.256-1.334.18-1.46-.077-.128-.282-.204-.593-.36z"/>
                </svg>
                CHECKOUT VIA WHATSAPP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
