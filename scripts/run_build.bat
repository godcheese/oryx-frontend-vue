CHCP 65001
@echo off
echo.author godcheese
set "CURRENT_DIR=%~dp0"
cd %CURRENT_DIR%
cd ..
call npm run build
cd %CURRENT_DIR%
