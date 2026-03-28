import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateReservation } from "../hooks/useQueries";

const TIME_SLOTS = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export default function ReservationSection() {
  const createReservation = useCreateReservation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    notes: "",
  });

  const updateForm = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.guests) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await createReservation.mutateAsync({
        id: BigInt(0),
        customerName: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
        guestCount: BigInt(
          form.guests === "8+" ? 8 : Number.parseInt(form.guests),
        ),
        notes: form.notes,
        status: "pending",
      });
      toast.success("Reservation confirmed! We'll be in touch shortly.");
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        notes: "",
      });
    } catch {
      toast.error("Failed to make reservation. Please try again.");
    }
  };

  return (
    <section
      id="reservations"
      className="py-20 bg-maroon relative overflow-hidden"
    >
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            Join Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F7F2E8]">
            Reserve Your Table
          </h2>
          <p className="text-cream/70 mt-4 max-w-md mx-auto">
            Book your table in advance and ensure a perfect dining experience.
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          data-ocid="reservation.form"
          className="max-w-2xl mx-auto bg-card/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="res-name" className="text-cream/90 text-sm">
                Full Name *
              </Label>
              <Input
                id="res-name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                data-ocid="reservation.name.input"
                className="bg-card/10 border-gold/30 text-cream placeholder:text-cream/40 focus:border-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="res-phone" className="text-cream/90 text-sm">
                Phone Number *
              </Label>
              <Input
                id="res-phone"
                placeholder="+880 1700-000000"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                data-ocid="reservation.phone.input"
                className="bg-card/10 border-gold/30 text-cream placeholder:text-cream/40 focus:border-gold"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="res-date" className="text-cream/90 text-sm">
                Date *
              </Label>
              <Input
                id="res-date"
                type="date"
                value={form.date}
                onChange={(e) => updateForm("date", e.target.value)}
                data-ocid="reservation.date.input"
                min={new Date().toISOString().split("T")[0]}
                className="bg-card/10 border-gold/30 text-cream focus:border-gold"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cream/90 text-sm">Time *</Label>
              <Select
                onValueChange={(v) => updateForm("time", v)}
                value={form.time}
              >
                <SelectTrigger
                  data-ocid="reservation.time.select"
                  className="bg-card/10 border-gold/30 text-cream focus:border-gold"
                >
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-cream/90 text-sm">Number of Guests *</Label>
            <Select
              onValueChange={(v) => updateForm("guests", v)}
              value={form.guests}
            >
              <SelectTrigger
                data-ocid="reservation.guests.select"
                className="bg-card/10 border-gold/30 text-cream focus:border-gold"
              >
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                {GUEST_OPTIONS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g} {g === "1" ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="res-notes" className="text-cream/90 text-sm">
              Special Requests (optional)
            </Label>
            <Textarea
              id="res-notes"
              placeholder="Dietary requirements, special occasions, seating preferences..."
              value={form.notes}
              onChange={(e) => updateForm("notes", e.target.value)}
              data-ocid="reservation.notes.textarea"
              className="bg-card/10 border-gold/30 text-cream placeholder:text-cream/40 focus:border-gold min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            disabled={createReservation.isPending}
            data-ocid="reservation.submit_button"
            className="w-full bg-gold hover:bg-gold-dark text-brown font-bold py-6 text-base shadow-gold transition-all"
          >
            {createReservation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <CalendarCheck className="mr-2 h-4 w-4" />
                Confirm Reservation
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
