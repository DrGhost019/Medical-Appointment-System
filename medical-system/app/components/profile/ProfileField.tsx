// src/components/profile/ProfileField.tsx
import React from 'react';

interface ProfileFieldProps {
  label: string;
  placeholder: string;
}

const ProfileField = ({ label, placeholder }: ProfileFieldProps) => {
  return (
    <div
      className="flex flex-col"
      style={{
        width: '344px',
        height: '84px',
        gap: '4px',
      }}
    >
      {/* Label */}
      <label className="font-vazirmatn font-medium text-sm text-[#2E2E2E]">
        {label}
      </label>

      {/* Value / Input */}
      <div className="font-vazirmatn font-normal text-sm text-[#2E2E2E] py-2">
        {placeholder}
      </div>
    </div>
  );
};

export default ProfileField;