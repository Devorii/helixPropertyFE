const env = (typeof window !== 'undefined' && window._env_) ? window._env_ : {};

export const API_BASE = env.REACT_APP_HELIX_API || process.env.REACT_APP_HELIX_API || '';
export const OWNER_ACC = env.REACT_APP_OWNER_ACC || process.env.REACT_APP_OWNER_ACC || '';
export const TENANT_ACC = env.REACT_APP_TENANT_ACC || process.env.REACT_APP_TENANT_ACC || '';
