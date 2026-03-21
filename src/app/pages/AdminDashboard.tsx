import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Package, TrendingUp, Clock, CheckCircle, Truck, Search, Filter, Edit2, Eye, Printer } from "lucide-react";
import { updateOrderStatusInSheets, type OrderData } from "../utils/sheetsAPI";
import DispatchSlip from "../components/DispatchSlip";
import PrintableOrderLabel from "../components/PrintableOrderLabel";

const statusColors: { [key: string]: { bg: string; text: string; border: string } } = {
  pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/30" },
  confirmed: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
  shipped: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/30" },
  delivered: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" },
  cancelled: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [showDispatchSlip, setShowDispatchSlip] = useState(false);
  const [showPrintableLabel, setShowPrintableLabel] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderData | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editTracking, setEditTracking] = useState("");

  // Check if user is admin - only run once on mount
  useEffect(() => {
    const adminKey = localStorage.getItem("driptownAdminKey");
    setAuthChecked(true);

    if (!adminKey || adminKey !== "ADMIN_DRIPTOWN_2024") {
      // Redirect to home if not admin
      navigate("/", { replace: true });
      return;
    }
  }, [navigate]);

  // Load orders from localStorage only (no network calls)
  useEffect(() => {
    if (!authChecked) return;

    try {
      const localOrders = JSON.parse(localStorage.getItem("driptownOrders") || "[]");
      setOrders(localOrders.sort((a: OrderData, b: OrderData) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error("Error loading orders from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, [authChecked]);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          order.phone.includes(query)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  const handleUpdateOrder = async (order: OrderData) => {
    if (!editStatus) return;

    const success = await updateOrderStatusInSheets(order.id, editStatus, editTracking);

    if (success) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, status: editStatus as any, trackingNumber: editTracking }
            : o
        )
      );
      setEditingOrder(null);
      setEditStatus("");
      setEditTracking("");
    }
  };

  // Don't render if auth check hasn't completed yet
  if (!authChecked) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Manage orders and track shipments</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Package className="w-8 h-8 text-white/40" />
            </div>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-500/80 text-sm mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/40" />
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-500/80 text-sm mb-2">Confirmed</p>
                <p className="text-3xl font-bold text-blue-500">{stats.confirmed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500/40" />
            </div>
          </div>

          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-500/80 text-sm mb-2">Shipped</p>
                <p className="text-3xl font-bold text-purple-500">{stats.shipped}</p>
              </div>
              <Truck className="w-8 h-8 text-purple-500/40" />
            </div>
          </div>

          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-500/80 text-sm mb-2">Delivered</p>
                <p className="text-3xl font-bold text-green-500">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500/40" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-2">Revenue</p>
                <p className="text-2xl font-bold text-white">₹{stats.totalRevenue.toFixed(0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-white/40" />
            </div>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by order ID, name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
              <Filter className="w-5 h-5 text-white/40" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center text-white/60">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-white/60">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white font-mono">{order.id}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="text-white">{order.customerName}</div>
                        <div className="text-white/60 text-xs">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">{order.items.length} items</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            statusColors[order.status].bg
                          } ${statusColors[order.status].text} ${statusColors[order.status].border}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2 flex">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingOrder(order);
                            setEditStatus(order.status);
                            setEditTracking(order.trackingNumber || "");
                          }}
                          className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-white" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 border border-white/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Order #{selectedOrder.id}</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowPrintableLabel(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Printer className="w-4 h-4" />
                    Print Label
                  </button>
                  <button
                    onClick={() => setShowDispatchSlip(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Printer className="w-4 h-4" />
                    Print Dispatch Slip
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Name</p>
                      <p className="text-white font-medium">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white font-medium">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Phone</p>
                      <p className="text-white font-medium">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Order Date</p>
                      <p className="text-white font-medium">
                        {new Date(selectedOrder.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Shipping Address</h3>
                  <p className="text-white">
                    {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state}{" "}
                    {selectedOrder.zipCode}, {selectedOrder.country}
                  </p>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-white">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-white/60 text-sm">
                            Qty: {item.quantity}
                            {item.color && ` | Color: ${item.color}`}
                            {item.size && ` | Size: ${item.size}`}
                          </p>
                        </div>
                        <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-white/60">
                    <p>Subtotal</p>
                    <p>₹{selectedOrder.subtotal.toFixed(2)}</p>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-yellow-500">
                      <p>Discount ({selectedOrder.discount}%)</p>
                      <p>-₹{selectedOrder.discountAmount.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-white text-lg">
                    <p>Total</p>
                    <p>₹{selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Order Status */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-sm mb-2">Status</p>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                      statusColors[selectedOrder.status].bg
                    } ${statusColors[selectedOrder.status].text} ${
                      statusColors[selectedOrder.status].border
                    }`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </p>
                  {selectedOrder.trackingNumber && (
                    <div className="mt-3">
                      <p className="text-white/60 text-sm">Tracking Number</p>
                      <p className="text-white font-mono">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 border border-white/20 rounded-lg max-w-md w-full"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Update Order #{editingOrder.id}</h2>
                <button
                  onClick={() => setEditingOrder(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={editTracking}
                    onChange={(e) => setEditTracking(e.target.value)}
                    placeholder="e.g., 1Z999AA10123456784"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setEditingOrder(null)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateOrder(editingOrder)}
                    className="flex-1 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
                  >
                    Update Order
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dispatch Slip Modal */}
      {showDispatchSlip && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="max-w-3xl w-full my-8">
            <div className="mb-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDispatchSlip(false)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
            <DispatchSlip order={selectedOrder} />
          </div>
        </div>
      )}

      {/* Printable Label Modal */}
      {showPrintableLabel && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="max-w-lg w-full my-8">
            <div className="mb-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPrintableLabel(false)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
            <PrintableOrderLabel order={selectedOrder} />
          </div>
        </div>
      )}
    </div>
  );
}
