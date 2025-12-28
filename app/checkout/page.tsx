'use client'

import { useState } from 'react'
import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address')
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  })

  const subtotal = 249.98
  const shipping = 10
  const tax = 24.998
  const total = subtotal + shipping + tax

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('review')
  }

  const handlePlaceOrder = () => {
    // Handle order placement
    console.log('Order placed!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <IoChevronBackOutline className="w-5 h-5 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'address' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-24 h-1 ${step !== 'address' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-primary-600 text-white' : step === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-24 h-1 ${step === 'review' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600 mr-16">Address</span>
            <span className="text-sm text-gray-600 mr-16">Payment</span>
            <span className="text-sm text-gray-600">Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'address' && (
              <Card>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <CardContent className="p-6">
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <Input
                      label="Full Name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      required
                    />
                    <Input
                      label="Address Line 1"
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      required
                    />
                    <Input
                      label="Address Line 2"
                      value={address.addressLine2}
                      onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                      />
                      <Input
                        label="State"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Zip Code"
                        value={address.zipCode}
                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        required
                      />
                      <Select
                        label="Country"
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </Select>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                </div>
                <CardContent className="p-6">
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cod">Cash on Delivery</option>
                      </Select>
                    </div>

                    {paymentMethod === 'card' && (
                      <>
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          required
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiry Date"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                            required
                          />
                          <Input
                            label="CVV"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            required
                          />
                        </div>
                        <Input
                          label="Cardholder Name"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          required
                        />
                      </>
                    )}

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={() => setStep('address')}>
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="flex-1">
                        Continue to Review
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 'review' && (
              <Card>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Review Order</h2>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-600">{address.name}</p>
                    <p className="text-gray-600">{address.addressLine1}</p>
                    <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600 capitalize">{paymentMethod}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep('address')}>
                      Edit Address
                    </Button>
                    <Button variant="outline" onClick={() => setStep('payment')}>
                      Edit Payment
                    </Button>
                  </div>
                  <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


