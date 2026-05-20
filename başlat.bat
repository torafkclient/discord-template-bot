@echo off
REM Set working directory to the folder where this batch file is located
cd /d "%~dp0"

echo ==================================================
echo   Discord Bot Test and Diagnostic Start Script
echo ==================================================
echo.
echo Step 1: Diagnostic starting... If you see this, press any key to continue.
pause
echo.

echo Step 2: Working directory locked to: %cd%
pause
echo.

echo Step 3: Checking Node.js installation...
node -v
if %errorlevel% neq 0 goto :node_missing
echo Node.js is verified!
pause
echo.

echo Step 4: Checking dependencies (node_modules)...
if exist node_modules goto :modules_exist

echo [INFO] node_modules not found. Running npm install...
echo Please wait, this may take a moment...
call npm install
if %errorlevel% neq 0 goto :install_failed
echo [SUCCESS] Dependencies installed successfully!
goto :modules_done

:install_failed
echo [ERROR] npm install failed!
pause
exit /b

:modules_exist
echo dependencies (node_modules) are present!

:modules_done
pause
echo.

echo Step 5: Starting the Discord Bot...
echo.
call npm run dev
if %errorlevel% neq 0 (
    echo.
    echo [INFO] Bot exited or crashed.
    pause
)
exit /b

:node_missing
echo.
echo [ERROR] Node.js is not installed or not in PATH!
echo Please install Node.js from https://nodejs.org/
pause
exit /b
