// src/app/components/profile/ProfileField.tsx
import React from 'react';

interface ProfileFieldProps {
  label: string;
  name?: string;
  value: string;
  isEditing: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileField = ({ label, name, value, isEditing, onChange }: ProfileFieldProps) => {
  return (
    <div className="text-right w-full">
      <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
        {label}
      </label>
      {isEditing ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-[#E7E7E7] rounded-lg focus:ring-2 focus:ring-[#4179F0] focus:border-transparent outline-none transition font-vazirmatn text-sm text-[#2E2E2E] placeholder:text-[#999999] bg-white"
        />
      ) : (
        <div className="w-full px-3 py-2 text-[#2E2E2E] border-b border-gray-100 font-vazirmatn text-sm font-medium">
          {value || '—'}
        </div>
      )}
    </div>
  );
};

export default ProfileField;