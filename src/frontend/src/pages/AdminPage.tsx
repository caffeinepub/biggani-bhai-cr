import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MenuItem } from "../backend.d";
import { MENU_CATEGORIES } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddMenuItem,
  useDeleteMenuItem,
  useIsAdmin,
  useMenuItems,
  useReservations,
  useRestaurantInfo,
  useUpdateMenuItem,
  useUpdateReservationStatus,
  useUpdateRestaurantInfo,
} from "../hooks/useQueries";

const SKELETON_IDS = ["s1", "s2", "s3", "s4", "s5"];

const EMPTY_ITEM: Omit<MenuItem, "id"> = {
  name: "",
  category: "Combo Meals",
  description: "",
  price: 0,
  imageUrl: "",
  isAvailable: true,
};

function MenuManager() {
  const { data: items, isLoading } = useMenuItems();
  const addItem = useAddMenuItem();
  const updateItem = useUpdateMenuItem();
  const deleteItem = useDeleteMenuItem();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, "id">>(EMPTY_ITEM);

  const openAdd = () => {
    setEditingItem(null);
    setForm(EMPTY_ITEM);
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required.");
      return;
    }
    try {
      if (editingItem) {
        await updateItem.mutateAsync({
          id: editingItem.id,
          item: { ...form, id: editingItem.id },
        });
        toast.success("Menu item updated.");
      } else {
        await addItem.mutateAsync({ ...form, id: BigInt(0) });
        toast.success("Menu item added.");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save item.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteItem.mutateAsync(id);
      toast.success("Item deleted.");
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-brown">Menu Items</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              onClick={openAdd}
              data-ocid="admin.menu.open_modal_button"
              className="bg-gold hover:bg-gold-dark text-brown font-semibold"
            >
              <Plus size={16} className="mr-2" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin.menu.dialog">
            <DialogHeader>
              <DialogTitle className="font-serif text-brown">
                {editingItem ? "Edit Menu Item" : "Add New Item"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-1">
                <Label>Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="admin.menu.name.input"
                  placeholder="Dish name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, category: v }))
                    }
                  >
                    <SelectTrigger data-ocid="admin.menu.category.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MENU_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Price (৳) *</Label>
                  <Input
                    type="number"
                    value={form.price || ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        price: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    data-ocid="admin.menu.price.input"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  data-ocid="admin.menu.description.textarea"
                  placeholder="Short description"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-1">
                <Label>Image URL</Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, imageUrl: e.target.value }))
                  }
                  data-ocid="admin.menu.image_url.input"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isAvailable}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, isAvailable: v }))
                  }
                  data-ocid="admin.menu.available.switch"
                />
                <Label>Available</Label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={addItem.isPending || updateItem.isPending}
                  data-ocid="admin.menu.save_button"
                  className="flex-1 bg-gold hover:bg-gold-dark text-brown font-semibold"
                >
                  {addItem.isPending || updateItem.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  data-ocid="admin.menu.cancel_button"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div data-ocid="admin.menu.loading_state" className="space-y-3">
          {SKELETON_IDS.map((id) => (
            <Skeleton key={id} className="h-12" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table data-ocid="admin.menu.table">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(items ?? []).length === 0 ? (
                <TableRow data-ocid="admin.menu.empty_state">
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No menu items yet. Add your first dish!
                  </TableCell>
                </TableRow>
              ) : (
                (items ?? []).map((item, i) => (
                  <TableRow
                    key={Number(item.id)}
                    data-ocid={`admin.menu.row.${i + 1}`}
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>৳{item.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.isAvailable ? "default" : "secondary"}
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(item)}
                          data-ocid={`admin.menu.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleteItem.isPending}
                          data-ocid={`admin.menu.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ReservationsManager() {
  const { data: reservations, isLoading } = useReservations();
  const updateStatus = useUpdateReservationStatus();

  const statusColors: Record<string, string> = {
    pending: "secondary",
    confirmed: "default",
    cancelled: "destructive",
    completed: "outline",
  };

  return (
    <div>
      <h3 className="font-serif text-2xl font-bold text-brown mb-6">
        Reservations
      </h3>
      {isLoading ? (
        <div data-ocid="admin.reservations.loading_state" className="space-y-3">
          {SKELETON_IDS.map((id) => (
            <Skeleton key={id} className="h-12" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table data-ocid="admin.reservations.table">
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date &amp; Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(reservations ?? []).length === 0 ? (
                <TableRow data-ocid="admin.reservations.empty_state">
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No reservations yet.
                  </TableCell>
                </TableRow>
              ) : (
                (reservations ?? []).map((res, i) => (
                  <TableRow
                    key={Number(res.id)}
                    data-ocid={`admin.reservations.row.${i + 1}`}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{res.customerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {res.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>{res.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {res.time}
                      </p>
                    </TableCell>
                    <TableCell>{Number(res.guestCount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          (statusColors[res.status] ?? "secondary") as any
                        }
                      >
                        {res.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={res.status}
                        onValueChange={async (v) => {
                          try {
                            await updateStatus.mutateAsync({
                              id: res.id,
                              status: v,
                            });
                            toast.success("Status updated.");
                          } catch {
                            toast.error("Failed to update status.");
                          }
                        }}
                      >
                        <SelectTrigger
                          data-ocid={`admin.reservations.status.select.${i + 1}`}
                          className="h-8 text-xs w-32"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "pending",
                            "confirmed",
                            "cancelled",
                            "completed",
                          ].map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function RestaurantInfoManager() {
  const { data: info } = useRestaurantInfo();
  const updateInfo = useUpdateRestaurantInfo();
  const [form, setForm] = useState({
    name: info?.name ?? "Biggani Bhai C&R",
    email: info?.email ?? "",
    address: info?.address ?? "বৈরাগী বাজার খশির, আব্দুল্লাহপুর, Bangladesh",
    openingHours: info?.openingHours ?? "",
    phone: info?.phone ?? "01730564953",
  });

  const handleSave = async () => {
    try {
      await updateInfo.mutateAsync(form);
      toast.success("Restaurant info updated.");
    } catch {
      toast.error("Failed to update info.");
    }
  };

  return (
    <div className="max-w-lg">
      <h3 className="font-serif text-2xl font-bold text-brown mb-6">
        Restaurant Info
      </h3>
      <div className="space-y-4">
        {[
          { key: "name", label: "Restaurant Name" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "address", label: "Address" },
          { key: "openingHours", label: "Opening Hours" },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-1">
            <Label>{label}</Label>
            <Input
              value={(form as any)[key]}
              onChange={(e) =>
                setForm((p) => ({ ...p, [key]: e.target.value }))
              }
              data-ocid={`admin.info.${key}.input`}
              placeholder={label}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={handleSave}
          disabled={updateInfo.isPending}
          data-ocid="admin.info.save_button"
          className="bg-gold hover:bg-gold-dark text-brown font-semibold"
        >
          {updateInfo.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { login, clear, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const isLoggedIn = !!identity;

  if (isInitializing || isAdminLoading) {
    return (
      <div
        className="min-h-screen bg-cream flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-10 shadow-card max-w-sm w-full text-center"
          data-ocid="admin.login.panel"
        >
          <div className="font-serif text-3xl font-bold text-gold mb-2">
            Biggani Bhai C&amp;R
          </div>
          <p className="text-brown-mid text-sm mb-8">Admin Panel</p>
          <Button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin.login.primary_button"
            className="w-full bg-maroon hover:bg-maroon-light text-cream font-semibold py-5"
          >
            {isLoggingIn ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Login to Continue
          </Button>
          <p className="text-brown-mid/60 text-xs mt-3">
            প্রথমবার লগইন করলে আপনি অটোমেটিক অ্যাডমিন হবেন।
          </p>
          <Link
            to="/"
            data-ocid="admin.back.link"
            className="mt-4 inline-flex items-center gap-1 text-brown-mid hover:text-gold text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Back to Website
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
        <div
          className="bg-card border border-border rounded-2xl p-10 shadow-card max-w-sm w-full text-center"
          data-ocid="admin.unauthorized.panel"
        >
          <p className="text-brown font-serif text-xl mb-4">Access Denied</p>
          <p className="text-brown-mid text-sm mb-6">
            You don&apos;t have admin privileges.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={clear}
            data-ocid="admin.logout.button"
          >
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-maroon text-cream px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <span className="font-serif text-xl font-bold text-gold">
              Biggani Bhai C&amp;R
            </span>
            <span className="text-cream/60 text-sm ml-3">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cream/60 text-sm hidden sm:block">
              {identity?.getPrincipal().toString().slice(0, 12)}...
            </span>
            <Link to="/" data-ocid="admin.view_site.link">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-cream/30 text-cream hover:bg-cream/10"
              >
                View Site
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clear}
              data-ocid="admin.logout.button"
              className="border-cream/30 text-cream hover:bg-cream/10"
            >
              <LogOut size={14} className="mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList data-ocid="admin.tabs" className="mb-8">
            <TabsTrigger value="menu" data-ocid="admin.menu.tab">
              Menu
            </TabsTrigger>
            <TabsTrigger
              value="reservations"
              data-ocid="admin.reservations.tab"
            >
              Reservations
            </TabsTrigger>
            <TabsTrigger value="info" data-ocid="admin.info.tab">
              Restaurant Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <MenuManager />
          </TabsContent>
          <TabsContent value="reservations">
            <ReservationsManager />
          </TabsContent>
          <TabsContent value="info">
            <RestaurantInfoManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
