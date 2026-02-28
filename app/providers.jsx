'use client';

import '../src/i18n';
import { AdminAuthProvider } from '../src/features/admin/contexts/AdminAuthContext';
import { ProjectDataProvider } from '../src/features/portfolio/contexts/ProjectDataContext';

export function Providers({ children }) {
  return (
    <AdminAuthProvider>
      <ProjectDataProvider>{children}</ProjectDataProvider>
    </AdminAuthProvider>
  );
}
