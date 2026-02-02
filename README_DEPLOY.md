# Deploy automático a Hostinger con GitHub Actions

## Pasos
1. Crea un repositorio en GitHub y sube este proyecto.
2. En Settings → Secrets and variables → Actions, agrega:
   - HOSTINGER_SSH_KEY: clave privada SSH
   - HOSTINGER_HOST: host del servidor (ej. ssh.hostinger.com o IP)
   - HOSTINGER_USERNAME: usuario SSH
   - HOSTINGER_PATH: ruta destino (ej. /home/usuario/domains/tu-dominio/public_html)
3. Asegúrate que la rama principal se llame `main`.
4. Cada push a `main` ejecutará build y deploy al servidor.

## Requisitos en Hostinger
- SSH habilitado
- Ruta de publicación válida

## Alternativa FTP
Si prefieres FTP, puedo cambiar el workflow a `SamKirkland/FTP-Deploy-Action` usando:
- FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_PROTOCOL, FTP_PATH
