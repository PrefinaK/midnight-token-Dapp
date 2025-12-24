# Installation Guide – Midnight Development Environment

Quick reference guide for setting up your Midnight blockchain development environment with Compact compiler v0.26.

---

## Quick Checklist

- [ ] Node.js v18.x or v20.x installed
- [ ] npm v9.x+ installed
- [ ] Compact Compiler v0.26.x installed
- [ ] Git v2.x+ installed
- [ ] Environment verified

---

## Quick Start (5 Minutes)

```bash
# 1. Install Node.js (using NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 2. Install Compact Compiler
npm install -g @midnight-ntwrk/compact-compiler@0.26

# 3. Verify
compactc --version  # Should show 0.26.x
node --version      # Should show v20.x.x
