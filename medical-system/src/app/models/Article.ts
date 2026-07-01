// src/models/Article.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  excerpt: string;
  description?: string;
  image?: string;
  avatar?: string;
  date: string;
  readTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'عنوان مقاله الزامی است'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'خلاصه مقاله الزامی است'],
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '/assets/logo.png',
    },
    avatar: {
      type: String,
      default: '/assets/logo.png',
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('fa-IR'),
    },
    readTime: {
      type: String,
      default: '۵ دقیقه',
    },
  },
  {
    timestamps: true,
  }
);

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;