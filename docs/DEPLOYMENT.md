# Deployment and recovery

GitHub `main` is the source of truth. CI installs from the lockfile, checks types and lint, tests, builds, and validates links. Successful CI on `main` or a manual dispatch triggers `deploy-production.yml`; it rebuilds and sends only `dist/` to the guarded remote document root over SSH/rsync.

Required secrets are `HOSTING_HOST`, `HOSTING_PORT`, `HOSTING_USERNAME`, `HOSTING_SSH_KEY`, and `HOSTING_REMOTE_PATH`. Public site and analytics values should be repository environment variables, not secrets in source.

Editing production directly is discouraged. If emergency changes are made on the host, run the manual snapshot workflow before the next deployment and manually reconcile them into source. The workflow stores generated host files as a short-lived artifact; it never pretends generated HTML is maintainable source, creates no automatic merge, and does not copy host changes into `main`.
