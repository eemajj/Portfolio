#!/bin/bash

# Portfolio Deployment Script for Vercel
# Author: Claude Code AI
# Date: August 10, 2025

set -e  # Exit on any error

echo "🚀 Starting Portfolio Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check if required files exist
echo -e "${BLUE}📋 Step 1: Checking required files...${NC}"

required_files=("package.json" "public/profile-image.jpg" "public/about-image.jpeg" "public/certificates")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -e "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo -e "${RED}❌ Missing required files:${NC}"
    printf '%s\n' "${missing_files[@]}"
    echo -e "${YELLOW}Please add these files before deployment.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ All required files present${NC}"
fi

# Step 2: Install dependencies
echo -e "${BLUE}📦 Step 2: Installing dependencies...${NC}"
npm ci

# Step 3: Run build
echo -e "${BLUE}🔨 Step 3: Building production bundle...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Step 4: Check build size
echo -e "${BLUE}📊 Step 4: Analyzing build size...${NC}"
build_size=$(du -sh build | cut -f1)
echo -e "${GREEN}📁 Build size: $build_size${NC}"

# Step 5: Test build locally (optional)
echo -e "${BLUE}🧪 Step 5: Would you like to test locally first? (y/n)${NC}"
read -r test_local

if [ "$test_local" = "y" ] || [ "$test_local" = "Y" ]; then
    echo -e "${YELLOW}🌐 Starting local server... (Press Ctrl+C to stop)${NC}"
    echo -e "${YELLOW}Open http://localhost:3000 to test${NC}"
    npx serve -s build -l 3000
fi

# Step 6: Ready for Vercel deployment
echo -e "${GREEN}🎉 Project ready for Vercel deployment!${NC}"
echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Go to https://vercel.com and sign up/login"
echo "2. Click 'New Project'"
echo "3. Import this folder or connect your GitHub repo"
echo "4. Vercel will auto-detect React and deploy!"
echo ""
echo -e "${BLUE}⚙️  Build settings (if needed):${NC}"
echo "• Framework Preset: Create React App"
echo "• Build Command: npm run build"
echo "• Output Directory: build"
echo "• Install Command: npm ci"
echo ""
echo -e "${GREEN}🌐 Your optimized portfolio is ready to go live!${NC}"