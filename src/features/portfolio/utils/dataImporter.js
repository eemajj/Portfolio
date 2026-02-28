import { importSimpleData } from './dataImporterSimple';

/**
 * Legacy compatibility helper to align with older admin tooling that expected
 * a richer data importer. Currently delegates to the simplified importer so
 * existing UI flows keep working even if the advanced importer is unavailable.
 */
export const importDataToLocalStorage = () => importSimpleData();
