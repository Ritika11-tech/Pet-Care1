import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';

const DonateModal = ({ isOpen, onClose, ngo }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationResult, setDonationResult] = useState(null);

  const quickAmounts = [100, 500, 1000];

  // Reset form to initial state
  const resetForm = () => {
    setDonationAmount('');
    setDonorName('');
    setBankAccount('');
    setOtp(['', '', '', '']);
    setOtpSent(false);
    setIsProcessing(false);
    setShowSuccess(false);
    setDonationResult(null);
  };

  // Reset form when modal opens with new NGO
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, ngo]);

  const handleQuickAmount = (amount) => {
    setDonationAmount(amount.toString());
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSendOtp = () => {
    // Simulate OTP generation and auto-fill (exactly 4 digits)
    setOtp(['1', '2', '3', '4']);
    setOtpSent(true);
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(donationAmount);
    const enteredOtp = otp.join('');
    
    if (!amount || amount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    if (!bankAccount) {
      alert('Please enter bank account number.');
      return;
    }

    if (enteredOtp !== '1234') {
      alert('Please enter correct OTP (demo: 1234)');
      return;
    }

    setIsProcessing(true);

    try {
      // Mock API delay (2-3 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Generate transaction ID
      const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Store in localStorage
      const donation = {
        id: Date.now(),
        transactionId,
        ngoId: ngo.id,
        ngoName: ngo.name,
        amount: amount,
        donorName: donorName || 'Anonymous',
        timestamp: new Date().toISOString(),
        status: 'completed'
      };

      const donations = JSON.parse(localStorage.getItem('donations') || '[]');
      donations.push(donation);
      localStorage.setItem('donations', JSON.stringify(donations));
      
      setDonationResult({
        success: true,
        transactionId,
        ...donation
      });
      
      setShowSuccess(true);
      
      // Reset form
      setDonationAmount('');
      setDonorName('');
      
    } catch (error) {
      alert('Failed to process donation. Please try again.');
      console.error('Donation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Confetti isActive={showSuccess} />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        
        {!showSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{"\ud83e\udd1d"}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Support {ngo.name}
              </h2>
              <p className="text-gray-600 text-sm">
                Your donation helps rescue and care for dogs in need
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Donor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name 
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Bank Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="Enter bank account number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* OTP Verification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Verification <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 justify-center mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-lg font-semibold"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                >
                  Send OTP / Done
                </button>
                {otpSent && (
                  <p className="text-xs text-green-600 mt-2 text-center">
                    OTP sent successfully
                  </p>
                )}
              </div>

              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount ({"\u20b9"}) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg">
                    {"\u20b9"}
                  </span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-lg"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Quick amounts:</p>
                <div className="flex gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className="flex-1 py-2 px-3 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    >
                      {"\u20b9"}{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Proceed to Donate'
                )}
              </button>
            </form>

            {/* Cancel Button */}
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="w-full mt-3 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center">
            {/* Success Animation */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-4xl">{"\ud83c\udf89"}</span>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Thank You for Your Donation!
              </h2>
              <p className="text-gray-600">
                Your generosity makes a real difference
              </p>
            </div>

            {/* Donation Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3">Donation Details:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-gray-800">{donationResult?.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donor:</span>
                  <span className="font-medium text-gray-800">{donationResult?.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-green-600">{"\u20b9"}{donationResult?.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NGO:</span>
                  <span className="font-medium text-gray-800">{donationResult?.ngoName}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default DonateModal;
