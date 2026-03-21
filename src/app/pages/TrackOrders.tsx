import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Home, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const statusConfig = {
  processing: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", text: "Processing" },
  shipped: { icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10", text: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", text: "Delivered" },
  cancelled: { icon: Package, color: "text-red-500", bg: "bg-red-500/10", text: "Cancelled" }
};

export default function TrackOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API based on user ID
    // For now, show empty state to encourage first purchase
    if (user) {
      setOrders([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-white/60">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
          <h1 className="text-3xl font-bold mb-2">Track Orders</h1>
          <p className="text-white/60">Monitor your order status and delivery updates</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-white/60 mb-6">Ready to start your DripTown journey? Browse our collection and place your first order!</p>
            <Link
              to="/"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-white/60 text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded border-2 border-black object-cover"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 rounded border-2 border-black bg-white/10 flex items-center justify-center text-xs font-semibold">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                        <p className="text-white/60 text-sm">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>

                    {order.trackingNumber && (
                      <div className="text-right">
                        <p className="text-sm text-white/60">Tracking</p>
                        <p className="font-mono text-sm">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>

                  {order.estimatedDelivery && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-white/60">{order.estimatedDelivery}</p>
                    </div>
                  )}

                  {selectedOrder?.id === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-white/10"
                    >
                      <h4 className="font-semibold mb-4">Order Details</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium">{item.name}</h5>
                              <p className="text-white/60 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Need Help with an Order?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Call Support</p>
                <p className="text-white/60 text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-white/60 text-sm">support@driptown.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Store Locator</p>
                <p className="text-white/60 text-sm">Find nearest store</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}