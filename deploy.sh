#!/bin/bash
# Deployment script for GrooveTunes

# Build the project
npm run build

# Deploy to Vercel
vercel --prod
