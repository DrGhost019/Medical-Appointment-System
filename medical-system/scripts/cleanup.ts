// scripts/cleanup.ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import connectDB from '../src/app/lib/db';
import Doctor from '../src/app/models/Doctor';
import Slot from '../src/app/models/Slot';

async function cleanup() {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();

    console.log('🧹 Cleaning up doctors...');
    const doctors = await Doctor.find({});
    
    for (const doctor of doctors) {
      const updates: any = {};
      
      // حذف فاصله‌های اضافی از همه فیلدهای متنی
      if (doctor.name && typeof doctor.name === 'string') {
        updates.name = doctor.name.trim();
      }
      if (doctor.image && typeof doctor.image === 'string') {
        updates.image = doctor.image.trim();
      }
      if (doctor.specialty && typeof doctor.specialty === 'string') {
        updates.specialty = doctor.specialty.trim();
      }
      if (doctor.address && typeof doctor.address === 'string') {
        updates.address = doctor.address.trim();
      }
      if (doctor.phone && typeof doctor.phone === 'string') {
        updates.phone = doctor.phone.trim();
      }
      if (doctor.medicalCode && typeof doctor.medicalCode === 'string') {
        updates.medicalCode = doctor.medicalCode.trim();
      }
      if (doctor.about && typeof doctor.about === 'string') {
        updates.about = doctor.about.trim();
      }
      if (doctor.website && typeof doctor.website === 'string') {
        updates.website = doctor.website.trim();
      }
      if (doctor.instagram && typeof doctor.instagram === 'string') {
        updates.instagram = doctor.instagram.trim();
      }
      if (doctor.firstAvailable && typeof doctor.firstAvailable === 'string') {
        updates.firstAvailable = doctor.firstAvailable.trim();
      }

      if (Object.keys(updates).length > 0) {
        await Doctor.updateOne({ _id: doctor._id }, { $set: updates });
        console.log(`✅ Updated: ${updates.name || doctor._id}`);
      }
    }

    console.log('🧹 Cleaning up slots...');
    const slots = await Slot.find({});
    
    for (const slot of slots) {
      const updates: any = {};
      
      if (slot.time && typeof slot.time === 'string') {
        updates.time = slot.time.trim();
      }
      if (slot.date && typeof slot.date === 'string') {
        updates.date = slot.date.trim();
      }

      if (Object.keys(updates).length > 0) {
        await Slot.updateOne({ _id: slot._id }, { $set: updates });
      }
    }

    console.log('✅ Cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
}

cleanup();