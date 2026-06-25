import { create } from 'zustand';

interface Slot {
  _id: string;
  doctorId: string;
  date: string;
  time: string;
  isReserved: boolean;
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  avatar?: string;
}

interface BookingState {
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedSlot: Slot | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedSlot: (slot: Slot | null) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedDoctor: null,
  selectedDate: null,
  selectedSlot: null,
  
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor, selectedDate: null, selectedSlot: null }),
  setSelectedDate: (date) => set({ selectedDate: date, selectedSlot: null }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  
  clearBooking: () => set({ selectedDoctor: null, selectedDate: null, selectedSlot: null }),
}));