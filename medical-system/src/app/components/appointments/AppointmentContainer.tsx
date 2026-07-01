// src/components/appointment/AppointmentContainer.tsx
import React from 'react';
import AppointmentList from './AppointmentList';

const AppointmentContainer = () => {
  return (
    <div
      className="bg-white rounded-xl border border-[#E7E7E7] mx-auto"
      style={{
        width: '882px',
        minHeight: '353px',
        padding: '16px 24px',
      }}
    >
      <AppointmentList />
    </div>
  );
};

export default AppointmentContainer;