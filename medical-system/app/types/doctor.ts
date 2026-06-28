export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  experience?: number;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  doctorCount: number;
}

export interface Testimonial {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
  doctorName: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime?: string;
}