# Appium — Android mobile web

Esta suíte abre a QAZANDO Shop no Chrome de um dispositivo ou emulador Android. Como o sistema sob teste é web, não existe APK a instalar.

Pré-requisitos: Node.js 20+, JDK, Android SDK, dispositivo visível em `adb devices` e Chrome instalado.

```bash
npm ci
npm run driver:install
npm run doctor
npm run appium
```

Em outro terminal:

```bash
npm test
```

Variáveis disponíveis: `BASE_URL`, `APPIUM_HOST`, `APPIUM_PORT` e `DEVICE_NAME`. Os testes usam diretamente o protocolo W3C WebDriver, reduzindo dependências de cliente.
