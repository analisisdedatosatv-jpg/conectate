# ✈️ Aeropuerto del Cariño - Sistema de Registro e Intercambio de Regalos

Sistema completo de registro con temática de aeropuerto para el intercambio de regalos del Día del Cariño, con rueda de la fortuna interactiva.

## 🎯 Características

- ✈️ **Formulario de Check-in**: Registro de participantes con temática aeroportuaria
- 💺 **Pase de Abordaje**: Cada participante recibe un número de asiento único
- 🚌 **Servicio de Bus**: Campo para indicar si necesita transporte
- 🏢 **Dirección de Atención al Vecino**: Incluida en las opciones de sede
- 🎡 **Rueda del Cariño**: Ruleta interactiva para sortear ganadores
- 📊 **Panel Administrativo**: Gestión y visualización de todos los registros
- 🎨 **Diseño Personalizado**: Colores corporativos #10069F (azul) y #97D700 (verde lima)
- 📸 **Imágenes Corporativas**: Header y footer personalizables
- 💾 **Base de Datos Gratuita**: Usando Google Sheets

## 📁 Archivos del Sistema

1. **index.html** - Página principal de registro (Check-in)
2. **admin.html** - Panel de administración
3. **roulette.html** - Rueda del Cariño para sorteos
4. **Code.gs** - Código de Google Apps Script (backend)

## 🚀 Instalación Paso a Paso

### Paso 1: Configurar Google Sheets

1. Abre [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Aeropuerto del Cariño - Registro"
4. Ve a **Extensiones > Apps Script**

### Paso 2: Configurar Apps Script

1. Elimina el código por defecto
2. Copia todo el contenido del archivo **Code.gs**
3. Pégalo en el editor
4. Haz clic en 💾 **Guardar**
5. Nombra el proyecto: "Aeropuerto del Cariño API"

### Paso 3: Inicializar la Hoja

1. En el editor de Apps Script, selecciona la función `inicializarSheet` en el dropdown
2. Haz clic en ▶️ **Ejecutar**
3. Autoriza los permisos cuando se soliciten
4. Verifica que se creó la hoja "Pasajeros" con los encabezados:
   - Timestamp
   - Nombre Completo
   - Sede
   - No. Asiento
   - Teléfono
   - **Servicio Bus** (¡NUEVO!)

### Paso 4: Desplegar como Web App

1. En Apps Script, haz clic en **Implementar > Nueva implementación**
2. Selecciona el tipo: **Aplicación web**
3. Configura:
   - **Descripción**: Sistema de Registro
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. **IMPORTANTE**: Copia la URL de la aplicación web que aparece

### Paso 5: Configurar los Archivos HTML

En **CADA UNO** de los 3 archivos HTML (index.html, admin.html, roulette.html), busca esta línea:

```javascript
const SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
```

Y reemplázala con la URL que copiaste en el paso 4. Por ejemplo:

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
```

### Paso 6: Agregar las Imágenes del Header y Footer

#### Para agregar las imágenes:

1. **Descarga las imágenes** de los Google Drive compartidos:
   - Arte de invitación (header)
   - Pie de página (footer)

2. **Sube las imágenes a un hosting**. Opciones recomendadas:
   
   **Opción A - Imgur (Más fácil):**
   - Ve a [Imgur](https://imgur.com)
   - Sube ambas imágenes
   - Haz clic derecho > "Copiar dirección de imagen"
   
   **Opción B - GitHub:**
   - Sube las imágenes a tu repositorio
   - Usa la URL raw de GitHub
   
   **Opción C - Google Drive (público):**
   - Sube a Drive
   - Comparte como "Cualquiera con el enlace"
   - Usa el formato: `https://drive.google.com/uc?export=view&id=ID_DEL_ARCHIVO`

3. **Edita el archivo index.html**:
   
   Busca la línea 470 (aproximadamente):
   ```html
   <img src="" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
   ```
   
   Cambia a:
   ```html
   <img src="URL_DE_TU_IMAGEN_HEADER" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
   ```

   Busca la línea 585 (aproximadamente):
   ```html
   <img src="" class="footer-image" alt="Pie de página" id="footerImage">
   ```
   
   Cambia a:
   ```html
   <img src="URL_DE_TU_IMAGEN_FOOTER" class="footer-image" alt="Pie de página" id="footerImage">
   ```

### Paso 7: Subir los Archivos a un Servidor Web

Tienes varias opciones gratuitas:

#### Opción A: GitHub Pages (Recomendado)
1. Crea una cuenta en [GitHub](https://github.com)
2. Crea un nuevo repositorio público
3. Sube los 3 archivos HTML
4. Ve a Settings > Pages
5. Activa GitHub Pages
6. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo/`

#### Opción B: Netlify
1. Ve a [Netlify](https://www.netlify.com)
2. Arrastra la carpeta con los archivos HTML
3. Tu sitio estará listo en minutos

#### Opción C: Vercel
1. Ve a [Vercel](https://vercel.com)
2. Importa tu proyecto desde GitHub
3. Deploy automático

## 🎮 Uso del Sistema

### Para Participantes

1. Abrir **index.html** (página de Check-in)
2. Completar el formulario:
   - Nombre completo
   - Sede/Terminal (seleccionar de las 9 disponibles, incluye **Dirección de Atención al Vecino**)
   - Número de asiento (formato: A-001, B-025, etc.)
   - Teléfono de contacto
   - **¿Necesitas servicio de bus?** (SÍ/NO) - ¡NUEVO!
3. Hacer clic en "Confirmar Check-in"
4. ¡Listo! Guardar el número de asiento para el sorteo

### Para Administradores

**Panel de Control (admin.html):**
- Ver lista completa de participantes
- Estadísticas en tiempo real:
  - Total de pasajeros
  - Asientos asignados
  - Sedes activas
  - **Cuántos necesitan bus** - ¡NUEVO!
- Ver quién necesita transporte en la columna "Bus"
- Acceso directo a la Rueda del Cariño

**Rueda del Cariño (roulette.html):**
1. La rueda carga automáticamente todos los participantes
2. Hacer clic en "🎯 Girar Rueda"
3. La rueda girará y seleccionará un ganador
4. El ganador se mostrará con su asiento y nombre
5. El ganador se guarda en el historial
6. ¡Se puede seguir girando para más ganadores!

## 📊 Estructura de Datos (Actualizada)

La hoja de Google Sheets almacena:

| Timestamp | Nombre Completo | Sede | No. Asiento | Teléfono | Servicio Bus |
|-----------|----------------|------|-------------|----------|--------------|
| 2025-02-14 10:30 | María García | Dirección de Atención al Vecino | A-001 | +502 1234-5678 | SÍ |
| 2025-02-14 10:45 | Juan Pérez | Terminal Central | B-025 | +502 8765-4321 | NO |

**Formato visual:**
- Las filas con "SÍ" en bus tendrán fondo verde (#97D700)
- Las filas con "NO" en bus tendrán fondo rojo claro

## 🔧 Funciones Útiles en Apps Script

En el editor de Apps Script puedes ejecutar:

- `probarSistema()` - Verificar que todo esté configurado correctamente
- `obtenerEstadisticas()` - Ver estadísticas detalladas incluyendo % de personas que necesitan bus
- `obtenerListaBus()` - Listar solo las personas que necesitan transporte
- `limpiarDatos()` - Borrar todos los registros (¡CUIDADO!)
- `exportarCSV()` - Exportar datos a CSV

## ⚠️ Solución de Problemas

### "Error al procesar el check-in"
- Verifica que la URL del Apps Script esté correctamente configurada en los 3 HTML
- Asegúrate de haber ejecutado `inicializarSheet()`
- Revisa que el deployment esté configurado con acceso "Cualquier persona"

### "No se cargan los participantes"
- Verifica la consola del navegador (F12)
- Confirma que hay registros en Google Sheets
- Revisa que la URL del script sea la correcta

### Las imágenes no se muestran
- Verifica que las URLs de las imágenes sean públicas
- Prueba abrir las URLs en una ventana de incógnito
- Asegúrate de no tener bloqueadores de contenido
- Si usas Google Drive, verifica el formato de URL correcto

### La columna de bus no aparece
- Ejecuta `inicializarSheet()` nuevamente en Apps Script
- Si ya tienes datos, agrega manualmente la columna "Servicio Bus" en la hoja

### La rueda no gira
- Asegúrate de que haya participantes registrados
- Recarga la página
- Verifica la conexión a internet

## 🎨 Personalización

### Colores Corporativos
Los colores están definidos en las variables CSS:
- **Azul**: `#10069F` (--blue)
- **Verde Lima**: `#97D700` (--lime)

Para cambiarlos, busca en cada archivo HTML la sección `:root` y modifica:

```css
:root {
  --blue: #10069F;    /* Tu color azul */
  --lime: #97D700;    /* Tu color verde */
}
```

### Sedes/Terminales
Para agregar o modificar sedes, edita el `<select>` en **index.html** (línea ~520):

```html
<option value="Sede Nueva">Terminal Nueva</option>
```

Actualmente incluye:
- Terminal Central
- Terminal Norte
- Terminal Sur
- Terminal Este
- Terminal Oeste
- Terminal Metropolitana
- Terminal Regional
- Terminal Internacional
- **Dirección de Atención al Vecino** ⭐ NUEVO

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles (responsive)
- ✅ Tablets y escritorio
- ✅ Funciona sin internet después de cargar (PWA-ready)

## 🎁 Flujo Completo del Sistema

1. **Registro**: Participantes se registran en index.html indicando si necesitan bus
2. **Almacenamiento**: Datos se guardan automáticamente en Google Sheets
3. **Verificación**: Administrador revisa registros y coordina transporte si es necesario
4. **Sorteo**: Durante el evento, usar roulette.html para girar la rueda
5. **Ganadores**: Cada ganador se marca y no vuelve a aparecer
6. **Historial**: Se mantiene registro de todos los ganadores

## 🌟 Características Especiales

- 🎨 Diseño futurista con tema aeroportuario
- 📸 Soporte para imágenes corporativas (header y footer)
- 🚌 **Control de servicio de transporte** - ¡NUEVO!
- 🏢 **9 sedes disponibles** incluyendo Dirección de Atención al Vecino - ¡NUEVO!
- 🎯 Validación automática de número de asiento
- 🔒 Prevención de asientos duplicados
- 📱 Totalmente responsive
- ⚡ Actualizaciones en tiempo real
- 🎊 Efectos de confetti al ganar
- 🎡 Animación suave de la rueda
- 💾 Persistencia de datos en Google Sheets
- 📊 Estadísticas de transporte en tiempo real

## 📋 Checklist de Instalación

- [ ] Google Sheet creada
- [ ] Apps Script configurado
- [ ] Función `inicializarSheet()` ejecutada
- [ ] Web App desplegada
- [ ] URL del script copiada
- [ ] URLs actualizadas en los 3 archivos HTML
- [ ] Imágenes descargadas de Google Drive
- [ ] Imágenes subidas a hosting
- [ ] URLs de imágenes actualizadas en index.html
- [ ] Archivos HTML subidos a servidor web
- [ ] Sistema probado con registro de prueba
- [ ] Verificado que las estadísticas de bus funcionan

## 💡 Tips Adicionales

### Para coordinar el transporte:
1. Usa la función `obtenerListaBus()` en Apps Script
2. Esto te dará una lista completa de quienes necesitan bus
3. Exporta a CSV si necesitas la lista en Excel

### Para imprimir pases de abordaje:
1. Exporta los datos desde Google Sheets
2. Usa mail merge en Word o Google Docs
3. El número de asiento debe ser prominente

### Para backup de datos:
1. Google Sheets se guarda automáticamente
2. Puedes hacer una copia del sheet antes del evento
3. Usa `exportarCSV()` para respaldo adicional

## 📞 Soporte

Para modificaciones o problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs en Apps Script (Ver > Registros)
3. Asegúrate de que todas las URLs estén correctamente configuradas
4. Ejecuta `probarSistema()` en Apps Script para diagnóstico

## 🆕 Changelog - Versión 2.0

**Nuevas características:**
- ✅ Campo "¿Necesitas Servicio de Bus?" agregado
- ✅ "Dirección de Atención al Vecino" añadida a las sedes
- ✅ Estadística de cuántos pasajeros necesitan bus
- ✅ Función `obtenerListaBus()` para coordinación de transporte
- ✅ Código de colores para campo de bus (verde/rojo)
- ✅ Soporte para imágenes corporativas (header/footer)
- ✅ Placeholders visuales para facilitar configuración de imágenes
- ✅ Documentación mejorada con instrucciones de imágenes
- ✅ Función `probarSistema()` para diagnóstico

## 📄 Licencia

Sistema desarrollado para uso interno. Personaliza según tus necesidades.

---

**¡Disfruta del Aeropuerto del Cariño! ✈️❤️🚌**

**Versión 2.0** - Ahora con servicio de transporte y más sedes
#   C o n e c t a - c o n - t u - p r o p - s i t o  
 #   C o n e c t a - c o n - t u - p r o p - s i t o  
 