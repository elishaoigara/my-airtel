@echo off
echo === Airtel Clone - EAS Build Setup ===
echo.
echo Step 1: Initialize git and commit everything
git init
git add -f assets/
git add App.js app.json eas.json package.json package-lock.json src/ .gitignore
git commit -m "initial commit with all assets"
echo.
echo Step 2: Login to EAS (use your leo333 account)
eas login
echo.
echo Step 3: Link to new EAS project
eas init
echo.
echo Step 4: Build APK
eas build --platform android --profile preview
