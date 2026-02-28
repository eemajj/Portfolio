'use client';

import ProtectedRoute from '../../src/features/admin/components/ProtectedRoute';
import AdminPanel from '../../src/features/admin/components/AdminPanel';

export default function AdminPanelPage() {
  return (
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  );
}
