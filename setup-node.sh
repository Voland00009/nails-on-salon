#!/bin/bash
# Setup script for Node.js PATH configuration
# Usage: source ./setup-node.sh

# Add Node.js to PATH if not already present
if [[ ":$PATH:" != *":/c/Program Files/nodejs:"* ]]; then
  export PATH="/c/Program Files/nodejs:$PATH"
  echo "✓ Node.js added to PATH"
else
  echo "✓ Node.js already in PATH"
fi

# Verify node and npm are available
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  NPM_VERSION=$(npm --version)
  echo "✓ Node.js: $NODE_VERSION"
  echo "✓ npm: $NPM_VERSION"
else
  echo "✗ Node.js not found. Please install Node.js from https://nodejs.org/"
  return 1
fi

# Quick build test (optional)
if [ "$1" == "--test-build" ]; then
  echo ""
  echo "Testing build..."
  npm run build
fi
