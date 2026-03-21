import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { CreditCard, Plus, Edit, Trash2, Check, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SavedCard {
  id: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'rupay';
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
  maskedNumber: string;
}

export default function SavedCards() {
  const { user } = useAuth();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [showCardNumbers, setShowCardNumbers] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    isDefault: false
  });

  useEffect(() => {
    // In a real app, this would fetch from an API based on user ID
    // For now, show empty state - cards would be saved during checkout
    if (user) {
      setCards([]);
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      isDefault: false
    });
  };

  const handleAddCard = () => {
    setShowAddForm(true);
    setEditingCard(null);
    resetForm();
  };

  const handleEditCard = (card: SavedCard) => {
    setEditingCard(card);
    setShowAddForm(true);
    // Note: In a real app, you wouldn't pre-fill sensitive data like card numbers
    setFormData({
      cardNumber: '',
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: '',
      cardholderName: card.cardholderName,
      isDefault: card.isDefault
    });
  };

  const handleSaveCard = () => {
    // Basic validation
    if (!formData.cardNumber || !formData.expiryMonth || !formData.expiryYear || !formData.cardholderName) {
      alert('Please fill in all required fields');
      return;
    }

    const cardType = getCardType(formData.cardNumber);
    const lastFour = formData.cardNumber.slice(-4);
    const maskedNumber = `**** **** **** ${lastFour}`;

    if (editingCard) {
      // Update existing card
      setCards(prev => prev.map(card =>
        card.id === editingCard.id
          ? {
              ...card,
              cardType,
              lastFour,
              expiryMonth: formData.expiryMonth,
              expiryYear: formData.expiryYear,
              cardholderName: formData.cardholderName,
              maskedNumber,
              isDefault: formData.isDefault
            }
          : formData.isDefault ? { ...card, isDefault: false } : card
      ));
    } else {
      // Add new card
      const newCard: SavedCard = {
        id: Date.now().toString(),
        cardType,
        lastFour,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cardholderName: formData.cardholderName,
        maskedNumber,
        isDefault: formData.isDefault
      };
      setCards(prev => {
        const updated = formData.isDefault
          ? prev.map(card => ({ ...card, isDefault: false }))
          : prev;
        return [...updated, newCard];
      });
    }

    setShowAddForm(false);
    setEditingCard(null);
    resetForm();
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId: string) => {
    setCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const toggleCardVisibility = (cardId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getCardType = (cardNumber: string): SavedCard['cardType'] => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'rupay'; // Default for Indian cards
  };

  const getCardTypeColor = (cardType: SavedCard['cardType']) => {
    switch (cardType) {
      case 'visa': return 'text-blue-400';
      case 'mastercard': return 'text-red-400';
      case 'amex': return 'text-green-400';
      case 'rupay': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-white/60">You need to be logged in to manage your cards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Saved Cards</h1>
          <p className="text-white/60">Manage your payment methods for faster checkout</p>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400">Secure Storage</h3>
              <p className="text-white/60 text-sm">Your card details are encrypted and stored securely. We never store full card numbers.</p>
            </div>
          </div>
        </motion.div>

        {/* Add Card Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <button
            onClick={handleAddCard}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        </motion.div>

        {/* Card Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6">
              {editingCard ? 'Edit Card' : 'Add New Card'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Month</label>
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryMonth: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return <option key={month} value={month}>{month}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Year</label>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryYear: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString();
                      return <option key={year} value={year.slice(-2)}>{year}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Enter cardholder name"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isDefault" className="text-sm">Set as default payment method</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSaveCard}
                  className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/90 transition-colors"
                >
                  {editingCard ? 'Update Card' : 'Save Card'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCard(null);
                    resetForm();
                  }}
                  className="bg-white/10 text-white px-6 py-2 rounded hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Card List */}
        <div className="space-y-4">
          {cards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
            >
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-white/20" />
              <h2 className="text-xl font-semibold mb-2">No Cards Saved</h2>
              <p className="text-white/60 mb-6">Add your first payment method to speed up checkout.</p>
              <button
                onClick={handleAddCard}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Add Card
              </button>
            </motion.div>
          ) : (
            cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl ${getCardTypeColor(card.cardType)}`}>
                      {card.cardType === 'visa' && '💳'}
                      {card.cardType === 'mastercard' && '💳'}
                      {card.cardType === 'amex' && '💳'}
                      {card.cardType === 'rupay' && '💳'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold capitalize">{card.cardType}</span>
                        {card.isDefault && (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white/80">
                          {showCardNumbers[card.id] ? `**** **** **** ${card.lastFour}` : card.maskedNumber}
                        </span>
                        <button
                          onClick={() => toggleCardVisibility(card.id)}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {showCardNumbers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditCard(card)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Expires {card.expiryMonth}/{card.expiryYear}</p>
                    <p className="text-white/80">{card.cardholderName}</p>
                  </div>

                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Set as Default
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}