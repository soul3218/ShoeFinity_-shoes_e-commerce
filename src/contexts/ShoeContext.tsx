import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from "react";
import type { Shoe, Order } from "@/types";
import { mockShoes, mockOrders } from "@/data/mockData";
import { apiJson } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface ShoeContextType {
  shoes: Shoe[];
  orders: Order[];
  addShoe: (shoe: Omit<Shoe, "_id">) => Promise<boolean>;
  updateShoe: (id: string, shoe: Partial<Shoe>) => Promise<boolean>;
  deleteShoe: (id: string) => Promise<boolean>;
  addOrder: (order: Omit<Order, "_id" | "createdAt">) => Promise<boolean>;
}

const ShoeContext = createContext<ShoeContextType | null>(null);

export function ShoeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [shoes, setShoes] = useState<Shoe[]>(mockShoes);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const token = useMemo(() => user?.token ?? localStorage.getItem("token") ?? undefined, [user?.token]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await apiJson<Shoe[]>("/api/shoes", { method: "GET" });
      if (!cancelled && res.ok && Array.isArray(res.data)) setShoes(res.data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token || !user) {
        setOrders([]);
        return;
      }
      const path = user.role === "admin" ? "/api/orders" : "/api/orders/mine";
      const res = await apiJson<Order[]>(path, { method: "GET", token });
      if (!cancelled && res.ok && Array.isArray(res.data)) setOrders(res.data);
    })();
    return () => {
      cancelled = true;
    };
  }, [token, user]);

  const addShoe = useCallback(
    async (shoe: Omit<Shoe, "_id">) => {
      if (!token) return false;
      const res = await apiJson<Shoe>("/api/shoes", { method: "POST", token, body: JSON.stringify(shoe) });
      if (!res.ok) return false;
      setShoes((prev) => [res.data, ...prev]);
      return true;
    },
    [token]
  );

  const updateShoe = useCallback(
    async (id: string, updates: Partial<Shoe>) => {
      if (!token) return false;
      const res = await apiJson<Shoe>(`/api/shoes/${id}`, { method: "PUT", token, body: JSON.stringify(updates) });
      if (!res.ok) return false;
      setShoes((prev) => prev.map((s) => (s._id === id ? res.data : s)));
      return true;
    },
    [token]
  );

  const deleteShoe = useCallback(
    async (id: string) => {
      if (!token) return false;
      const res = await apiJson<{ message?: string }>("/api/shoes/" + id, { method: "DELETE", token });
      if (!res.ok) return false;
      setShoes((prev) => prev.filter((s) => s._id !== id));
      return true;
    },
    [token]
  );

  const addOrder = useCallback(
    async (order: Omit<Order, "_id" | "createdAt">) => {
      if (!token) return false;
      const res = await apiJson<Order>("/api/orders", { method: "POST", token, body: JSON.stringify(order) });
      if (!res.ok) return false;
      setOrders((prev) => [res.data, ...prev]);
      return true;
    },
    [token]
  );

  return (
    <ShoeContext.Provider value={{ shoes, orders, addShoe, updateShoe, deleteShoe, addOrder }}>
      {children}
    </ShoeContext.Provider>
  );
}

export function useShoes() {
  const ctx = useContext(ShoeContext);
  if (!ctx) throw new Error("useShoes must be used within ShoeProvider");
  return ctx;
}
