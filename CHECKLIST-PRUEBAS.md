# ✅ Checklist de Pruebas - Aeropuerto del Cariño

## 🎯 Antes de Lanzar el Sistema

Usa esta lista para verificar que todo funciona perfectamente.

---

## 📋 FASE 1: Configuración de Google Sheets

- [ ] **Hoja creada** en Google Sheets
- [ ] **Apps Script** abierto (Extensiones > Apps Script)
- [ ] **Code.gs** copiado y pegado
- [ ] **Proyecto guardado** con nombre "Aeropuerto del Cariño API"
- [ ] **Función inicializarSheet()** ejecutada
- [ ] **Permisos autorizados** cuando se solicitaron
- [ ] **Hoja "Pasajeros"** creada automáticamente
- [ ] **6 columnas visibles**: Timestamp, Nombre Completo, Sede, No. Asiento, Teléfono, Servicio Bus
- [ ] **Encabezados con fondo azul** (#10069F) y texto blanco

### ✍️ Prueba manual en Google Sheets:
Agrega una fila de prueba manualmente:
```
Timestamp: 2025-02-14 10:00:00
Nombre: Test Usuario
Sede: Terminal Central
Asiento: Z-999
Teléfono: +502 1234-5678
Bus: SI
```

- [ ] **Fila de prueba agregada** correctamente
- [ ] **Formato automático aplicado** (color de fondo si es par)

---

## 📋 FASE 2: Despliegue de Web App

- [ ] **Implementar > Nueva implementación** seleccionado
- [ ] **Tipo: Aplicación web** elegido
- [ ] **Ejecutar como: Yo** configurado
- [ ] **Quién tiene acceso: Cualquier persona** seleccionado
- [ ] **URL de implementación copiada** (debe empezar con https://script.google.com/macros/s/...)

### ✍️ Anota tu URL aquí:
```
URL del Script: _______________________________________________
```

- [ ] **URL probada** en navegador (debe mostrar un JSON con "success: true")

---

## 📋 FASE 3: Configuración de Archivos HTML

### index.html
- [ ] **Archivo descargado** de los outputs
- [ ] **Buscada la línea** con `const SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';`
- [ ] **URL reemplazada** con la URL real del script
- [ ] **Archivo guardado**

### admin.html
- [ ] **Archivo descargado** de los outputs
- [ ] **URL del script actualizada**
- [ ] **Archivo guardado**

### roulette.html
- [ ] **Archivo descargado** de los outputs
- [ ] **URL del script actualizada**
- [ ] **Archivo guardado**

---

## 📋 FASE 4: Configuración de Imágenes

### Descargar imágenes
- [ ] **Header image** descargada de Google Drive
- [ ] **Footer image** descargada de Google Drive

### Subir a hosting
- [ ] **Hosting elegido**: ☐ Imgur  ☐ GitHub  ☐ Google Drive  ☐ Otro: _______
- [ ] **Header image subida**
- [ ] **Footer image subida**
- [ ] **URLs de imágenes copiadas**

### ✍️ Anota las URLs aquí:
```
Header Image URL: _______________________________________________

Footer Image URL: _______________________________________________
```

### Actualizar index.html
- [ ] **Línea ~470 encontrada**: `<img src="" class="header-image"`
- [ ] **URL del header agregada** en src=""
- [ ] **Línea ~585 encontrada**: `<img src="" class="footer-image"`
- [ ] **URL del footer agregada** en src=""
- [ ] **Archivo guardado**

---

## 📋 FASE 5: Subir a Servidor Web

- [ ] **Hosting elegido**: ☐ GitHub Pages  ☐ Netlify  ☐ Vercel  ☐ Otro: _______
- [ ] **3 archivos HTML subidos** (index.html, admin.html, roulette.html)
- [ ] **Sitio desplegado** y funcionando

### ✍️ Anota tu URL del sitio aquí:
```
URL del Sitio: _______________________________________________
```

---

## 📋 FASE 6: Pruebas Funcionales

### Prueba 1: Registro de Pasajero
- [ ] **Página index.html abierta** en navegador
- [ ] **Imágenes del header y footer visibles** (sin placeholders)
- [ ] **Formulario completo visible**
- [ ] **Campos llenados**:
  - Nombre: Test Usuario
  - Sede: Dirección de Atención al Vecino
  - Asiento: T-001
  - Teléfono: +502 1111-1111
  - Bus: SÍ
- [ ] **Botón "Confirmar Check-in" presionado**
- [ ] **Mensaje de éxito mostrado** con el número de asiento
- [ ] **Formulario se resetea** después de 5 segundos

### Verificar en Google Sheets
- [ ] **Nueva fila aparece** en Google Sheets
- [ ] **Datos correctos** guardados
- [ ] **Columna "Servicio Bus"** muestra "SI"
- [ ] **Formato verde aplicado** a la celda del bus (SI)

### Prueba 2: Asiento Duplicado
- [ ] **Intentar registrar** el mismo asiento (T-001)
- [ ] **Sistema rechaza** el registro
- [ ] **Mensaje de error** aparece

### Prueba 3: Múltiples Registros
Registrar al menos 5 personas con diferentes combinaciones:
- [ ] **Persona 1**: Bus = SÍ, Sede diferente
- [ ] **Persona 2**: Bus = NO, Sede diferente
- [ ] **Persona 3**: Bus = SÍ, Dirección de Atención al Vecino
- [ ] **Persona 4**: Bus = NO, cualquier sede
- [ ] **Persona 5**: Bus = SÍ, cualquier sede

- [ ] **Todas registradas** correctamente en Google Sheets

---

## 📋 FASE 7: Panel de Administración

- [ ] **admin.html abierto**
- [ ] **Estadísticas visibles**:
  - Total Pasajeros: (debe mostrar el número correcto)
  - Asientos Asignados: (igual que total)
  - Sedes Activas: (número de sedes diferentes)
  - Necesitan Bus: (debe contar solo los SÍ)
- [ ] **Tabla de pasajeros** muestra todos los registros
- [ ] **Columna "Bus"** visible con badges de color:
  - Verde con "🚌 SÍ" para quienes necesitan bus
  - Rojo con "🚗 NO" para quienes no necesitan
- [ ] **Datos se actualizan** al recargar la página

---

## 📋 FASE 8: Rueda del Cariño

- [ ] **roulette.html abierto**
- [ ] **Rueda visible** con todos los números de asiento
- [ ] **Botón "Girar Rueda" activo**
- [ ] **Al girar**:
  - Rueda gira suavemente
  - Se detiene en un ganador
  - Confetti aparece
  - Ganador se muestra en el sidebar
- [ ] **Ganador removido** de la rueda
- [ ] **Segunda vuelta funciona** con menos participantes
- [ ] **Historial de ganadores** se mantiene visible

---

## 📋 FASE 9: Pruebas en Diferentes Dispositivos

### Desktop
- [ ] **Chrome** - Todo funciona
- [ ] **Firefox** - Todo funciona
- [ ] **Safari** (Mac) - Todo funciona
- [ ] **Edge** - Todo funciona

### Móvil
- [ ] **iPhone/iOS** - Formulario responsive
- [ ] **Android** - Formulario responsive
- [ ] **Tablet** - Todo se ve bien

---

## 📋 FASE 10: Funciones Apps Script

Ejecutar estas funciones en Apps Script y verificar resultados:

### probarSistema()
- [ ] **Función ejecutada**
- [ ] **Muestra**: ✓ Hoja de cálculo encontrada
- [ ] **Muestra**: ✓ Encabezados correctos
- [ ] **Muestra**: ✓ Total de registros
- [ ] **Sin errores**

### obtenerEstadisticas()
- [ ] **Función ejecutada**
- [ ] **Muestra**: Total de pasajeros
- [ ] **Muestra**: Distribución por sedes
- [ ] **Muestra**: Cuántos necesitan bus
- [ ] **Muestra**: % que necesita bus

### obtenerListaBus()
- [ ] **Función ejecutada**
- [ ] **Lista solo pasajeros** con Bus = SÍ
- [ ] **Muestra**: Nombre, Sede, Teléfono
- [ ] **Conteo correcto** al final

---

## 📋 FASE 11: Validaciones

### Formato de Asiento
- [ ] **Asiento correcto** (A-001) - Se acepta ✅
- [ ] **Sin guion** (A001) - Se rechaza ❌
- [ ] **Minúsculas** (a-001) - Se convierte a A-001 ✅
- [ ] **Formato largo** (A-0001) - Se rechaza ❌

### Campos Requeridos
- [ ] **Sin nombre** - Se rechaza ❌
- [ ] **Sin sede** - Se rechaza ❌
- [ ] **Sin teléfono** - Se rechaza ❌
- [ ] **Sin selección de bus** - Se rechaza ❌

---

## 📋 FASE 12: Prueba de Carga

- [ ] **10 registros** - Sistema estable
- [ ] **25 registros** - Todo funciona
- [ ] **50+ registros** - Sin problemas
- [ ] **Panel admin** carga en menos de 3 segundos
- [ ] **Rueda** funciona con 50+ participantes

---

## 🎯 PRUEBA FINAL: Simulacro Completo

Simula el flujo completo del evento:

1. **5 personas se registran**
   - [ ] Registros exitosos
   - [ ] 3 con bus, 2 sin bus

2. **Administrador revisa**
   - [ ] Panel muestra 5 pasajeros
   - [ ] Estadística de bus correcta (3)

3. **Coordinador obtiene lista de bus**
   - [ ] Ejecuta `obtenerListaBus()`
   - [ ] Lista correcta de 3 personas

4. **Durante evento - Sorteo**
   - [ ] Rueda carga con 5 participantes
   - [ ] Primer ganador sorteado
   - [ ] Segundo ganador (4 quedan en rueda)
   - [ ] Tercer ganador (3 quedan en rueda)
   - [ ] Historial muestra 3 ganadores

5. **Post-evento - Respaldo**
   - [ ] `exportarCSV()` funciona
   - [ ] Datos exportados correctamente

---

## ✅ RESULTADO FINAL

- [ ] **TODAS las pruebas pasaron**
- [ ] **Sistema listo para producción**
- [ ] **Documentación revisada**
- [ ] **Equipo capacitado** en uso del sistema

---

## 🚨 Si algo NO funciona:

1. **Revisa la consola** del navegador (F12)
2. **Revisa los logs** de Apps Script
3. **Verifica URLs** de script e imágenes
4. **Ejecuta** `probarSistema()` en Apps Script
5. **Consulta** README.md sección "Solución de Problemas"

---

## 📝 Notas del Testing

Espacio para anotar cualquier problema encontrado o mejora sugerida:

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## ✨ ¡Sistema Verificado y Listo!

Cuando todas las casillas estén marcadas, ¡tu sistema está 100% funcional! ✈️❤️

**Fecha de verificación**: _______________

**Verificado por**: _______________

**Firma**: _______________
