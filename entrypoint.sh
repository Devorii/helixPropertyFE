#!/bin/sh
set -e

# Populate runtime environment variables into build/env.js
cat <<'EOF' > /app/build/env.js
window._env_ = {
  REACT_APP_HELIX_API: "${REACT_APP_HELIX_API:-}",
  REACT_APP_OWNER_ACC: "${REACT_APP_OWNER_ACC:-}",
  REACT_APP_TENANT_ACC: "${REACT_APP_TENANT_ACC:-}"
};
EOF

exec "$@"
