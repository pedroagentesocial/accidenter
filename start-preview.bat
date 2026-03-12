@echo off
setlocal
cd /d "%~dp0"
call npm.cmd run build
if errorlevel 1 (
  echo Build fallo.
  pause
  exit /b 1
)
set PORT=4500
start "AccidentER Preview Server" cmd /k "cd /d %~dp0 && npm.cmd run preview -- --host 127.0.0.1 --port %PORT%"
timeout /t 4 /nobreak >nul
start "" http://localhost:%PORT%/
