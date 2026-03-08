import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useShoes } from "@/contexts/ShoeContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Shoe } from "@/types";

const emptyShoe = { name: "", price: 0, image: "", description: "", category: "", sizes: [7, 8, 9, 10, 11], inStock: true };

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { shoes, orders, addShoe, updateShoe, deleteShoe } = useShoes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Shoe, "_id">>(emptyShoe);
  const [showForm, setShowForm] = useState(false);

  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/shop" />;

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    if (editingId) {
      const ok = await updateShoe(editingId, form);
      if (!ok) return toast.error("Failed to update shoe");
      toast.success("Shoe updated!");
    } else {
      const ok = await addShoe(form);
      if (!ok) return toast.error("Failed to add shoe");
      toast.success("Shoe added!");
    }
    setForm(emptyShoe);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (shoe: Shoe) => {
    setForm({ name: shoe.name, price: shoe.price, image: shoe.image, description: shoe.description, category: shoe.category, sizes: shoe.sizes, inStock: shoe.inStock });
    setEditingId(shoe._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteShoe(id);
    if (!ok) return toast.error("Failed to delete shoe");
    toast.success("Shoe deleted");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl font-bold">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyShoe); }}>
              <Plus className="mr-1 h-4 w-4" /> Add Shoe
            </Button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="mt-6 animate-scale-in rounded-lg border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold">{editingId ? "Edit Shoe" : "Add New Shoe"}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Shoe name" />
                </div>
                <div>
                  <Label>Price (₹)</Label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Running, Casual..." />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>
                <div className="sm:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Shoe description" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Sizes (comma-separated)</Label>
                  <Input
                    value={form.sizes.join(", ")}
                    onChange={(e) => setForm({ ...form, sizes: e.target.value.split(",").map((s) => Number(s.trim())).filter(Boolean) })}
                    placeholder="7, 8, 9, 10, 11"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button onClick={handleSave} className="shadow-button">{editingId ? "Update" : "Add"} Shoe</Button>
                <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="products" className="mt-8">
            <TabsList>
              <TabsTrigger value="products"><Package className="mr-1 h-4 w-4" /> Products ({shoes.length})</TabsTrigger>
              <TabsTrigger value="orders"><ShoppingBag className="mr-1 h-4 w-4" /> Orders ({orders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="mt-4 space-y-3">
                {shoes.map((shoe) => (
                  <div key={shoe._id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-card">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                      <img src={shoe.image} alt={shoe.name} className="h-full w-full object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold">{shoe.name}</h3>
                      <p className="text-sm text-muted-foreground">{shoe.category} — ${shoe.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(shoe)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(shoe._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="mt-4 space-y-3">
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No orders yet.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="rounded-lg border border-border bg-card p-4 shadow-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-semibold">{order.userName}</h3>
                          <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-display font-bold text-gradient">${order.total.toFixed(2)}</span>
                          <p className="text-xs text-muted-foreground capitalize">{order.paymentMethod} — {order.status}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-sm text-muted-foreground">
                            {item.shoe.name} x{item.quantity} (Size {item.size})
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
