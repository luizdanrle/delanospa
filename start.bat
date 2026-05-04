@echo off
echo ==========================================
echo  DelirioSpa - Iniciando Servidor
echo ==========================================
echo.

:: Verificar se node_modules existe
if not exist "node_modules\next" (
    echo Instalando dependencias pela primeira vez...
    echo Isso pode demorar 2-3 minutos...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERRO: Falha ao instalar dependencias
        pause
        exit /b 1
    )
)

echo.
echo Iniciando servidor na porta 3001...
echo Acesse: http://localhost:3001
echo.
echo Para parar, pressione Ctrl+C
echo.

node node_modules\next\dist\bin\next dev -p 3001

pause
