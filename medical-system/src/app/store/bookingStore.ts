import { create } from 'zustand';

// ۱. اضافه کردن تمام فیلدهای مورد نیاز کامپوننت‌ها به تایپ داکتر
interface DoctorInfo {
  _id: string;
  name: string;
  specialty: string;
  avatar?: string;
  image?: string;
  medicalCode?: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  firstAvailable?: string;
}

interface TimeSlot {
  _id: string;
  doctorId: string;
  date: string;
  time: string;
  isReserved: boolean;
}

interface PatientInfo {
  name: string;
  phone: string;
  nationalId?: string;
}

interface BookingState {
  selectedDoctor: DoctorInfo | null;
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
  patientInfo: PatientInfo | null;
  // متدها (Actions)
  setSelectedDoctor: (doctor: DoctorInfo) => void;
  setSelectedDate: (date: string) => void;
  setSelectedSlot: (slot: TimeSlot) => void;
  setPatientInfo: (patient: PatientInfo) => void;
  clearBooking: () => void;
}

// ۲. ساخت استور با پشتیبانی از فیلدهای جدید
export const useBookingStore = create<BookingState>((set) => ({
  selectedDoctor: null,
  selectedDate: null,
  selectedSlot: null,
  patientInfo: null,

  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setPatientInfo: (patient) => set({ patientInfo: patient }),
  
  clearBooking: () => set({
    selectedDoctor: null,
    selectedDate: null,
    selectedSlot: null,
    patientInfo: null,
  }),
}));