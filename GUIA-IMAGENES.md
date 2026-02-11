# 📸 Guía Rápida: Cómo Agregar las Imágenes

## 🎯 Objetivo
Agregar el arte de invitación (header) y el pie de página (footer) al formulario de registro.

---

## 📋 Paso a Paso

### 1️⃣ Descargar las Imágenes de Google Drive

**Imagen del Header (Arte de Invitación):**
- URL: https://drive.google.com/file/d/1cIYBLMCnNeDF9coVE_GUDv_F3sZUXIen/view?usp=sharing
- Hacer clic derecho > Descargar
- Guardar como: `invitacion-header.png`

**Imagen del Footer (Pie de Página):**
- URL: https://drive.google.com/file/d/1wPpz-OZL_Sffz86dJyy-CabIQnk1jlfk/view?usp=sharing
- Hacer clic derecho > Descargar
- Guardar como: `footer.png`

---

### 2️⃣ Subir las Imágenes a un Hosting

Elige UNA de estas opciones:

#### 🅰️ OPCIÓN A: Imgur (Más Fácil - Recomendado)

1. Ve a https://imgur.com
2. Haz clic en "New post"
3. Arrastra `invitacion-header.png`
4. Una vez subida, haz clic derecho en la imagen
5. Selecciona "Copiar dirección de imagen"
6. Guarda esta URL (ejemplo: `https://i.imgur.com/ABC123.png`)
7. Repite con `footer.png`

#### 🅱️ OPCIÓN B: GitHub (Si ya tienes el proyecto en GitHub)

1. Ve a tu repositorio en GitHub
2. Crea una carpeta `images`
3. Haz clic en "Add file" > "Upload files"
4. Arrastra ambas imágenes
5. Commit los cambios
6. Haz clic en cada imagen
7. Haz clic en "Raw" o "Download"
8. Copia la URL (debe verse como: `https://raw.githubusercontent.com/usuario/repo/main/images/invitacion-header.png`)

#### 🅾️ OPCIÓN C: Google Drive (Público)

1. Sube ambas imágenes a tu Google Drive
2. Haz clic derecho en cada imagen > "Compartir"
3. Cambia a "Cualquiera con el enlace"
4. Copia el ID del archivo (la parte entre `/d/` y `/view`)
   - Ejemplo: En `https://drive.google.com/file/d/ABC123XYZ/view`
   - El ID es: `ABC123XYZ`
5. Usa este formato de URL:
   ```
   https://drive.google.com/uc?export=view&id=ABC123XYZ
   ```

---

### 3️⃣ Actualizar el Archivo index.html

#### Ubicar las líneas a modificar:

Abre `index.html` y busca estas líneas (están cerca del inicio del body):

**LÍNEA ~470 (Header Image):**
```html
<!-- Busca esta línea: -->
<img src="" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">

<!-- Cámbiala a: -->
<img src="URL_DE_TU_IMAGEN_HEADER_AQUÍ" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
```

**LÍNEA ~585 (Footer Image):**
```html
<!-- Busca esta línea: -->
<img src="" class="footer-image" alt="Pie de página" id="footerImage">

<!-- Cámbiala a: -->
<img src="URL_DE_TU_IMAGEN_FOOTER_AQUÍ" class="footer-image" alt="Pie de página" id="footerImage">
```

#### Ejemplo completo:

**ANTES:**
```html
<img src="" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
```

**DESPUÉS (ejemplo con Imgur):**
```html
<img src="https://i.imgur.com/ABC123.png" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
```

**DESPUÉS (ejemplo con GitHub):**
```html
<img src="https://raw.githubusercontent.com/miusuario/aeropuerto-carino/main/images/invitacion-header.png" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
```

**DESPUÉS (ejemplo con Google Drive):**
```html
<img src="https://drive.google.com/uc?export=view&id=1cIYBLMCnNeDF9coVE_GUDv_F3sZUXIen" class="header-image" alt="Invitación Aeropuerto del Cariño" id="headerImage">
```

---

### 4️⃣ Verificar que Funciona

1. Guarda el archivo `index.html`
2. Abre el archivo en tu navegador
3. Las imágenes deberían aparecer arriba y abajo del formulario
4. Los placeholders azules con bordes punteados deberían desaparecer

**Si las imágenes NO aparecen:**
- Verifica que las URLs sean públicas (ábrelas en navegador incógnito)
- Revisa que no haya espacios en las URLs
- Asegúrate de haber cerrado las comillas correctamente

---

## 🎨 Customización Adicional

### Ajustar el tamaño de las imágenes:

Si las imágenes se ven muy grandes o pequeñas, puedes agregar este estilo en el `<head>` del HTML:

```css
<style>
  .header-image {
    max-width: 700px !important;  /* Ajusta este valor */
  }
  
  .footer-image {
    max-width: 700px !important;  /* Ajusta este valor */
  }
</style>
```

### Cambiar el borde redondeado:

En el CSS, busca `.header-image, .footer-image` y modifica:
```css
border-radius: 20px;  /* Cambia el valor para más o menos redondeo */
```

---

## ✅ Checklist Final

- [ ] Imágenes descargadas de Google Drive
- [ ] Imágenes subidas a hosting (Imgur/GitHub/Drive)
- [ ] URLs copiadas correctamente
- [ ] index.html actualizado con URL del header
- [ ] index.html actualizado con URL del footer
- [ ] Archivo guardado
- [ ] Probado en navegador
- [ ] Imágenes se ven correctamente
- [ ] Placeholders desaparecieron

---

## 🆘 Ayuda Rápida

**Problema:** Las imágenes no cargan
- ✅ Abre las URLs en incógnito para verificar que sean públicas
- ✅ Revisa la consola del navegador (F12) para ver errores

**Problema:** Las imágenes se ven pixeladas
- ✅ Asegúrate de usar imágenes en alta resolución
- ✅ Verifica que la URL apunte a la imagen original, no a una miniatura

**Problema:** Solo aparecen los placeholders
- ✅ Verifica que hayas guardado el archivo HTML
- ✅ Recarga la página con Ctrl+F5 (o Cmd+Shift+R en Mac)

---

## 📝 Notas Importantes

1. **Las URLs deben ser HTTPS** (no HTTP) para seguridad
2. **Verifica que las imágenes sean públicas** antes de implementar
3. **Haz una copia de respaldo** del HTML antes de modificar
4. **Los placeholders se ocultarán automáticamente** cuando las imágenes carguen

---

## 🎯 Resultado Final

Cuando todo esté configurado correctamente, verás:

```
┌─────────────────────────────────────┐
│  [IMAGEN DE INVITACIÓN - HEADER]    │
└─────────────────────────────────────┘
        
        ✈️ AEROPUERTO DEL CARIÑO
        
┌─────────────────────────────────────┐
│      FORMULARIO DE CHECK-IN         │
│      (Pase de Abordaje)             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    [IMAGEN DE PIE DE PÁGINA]        │
└─────────────────────────────────────┘
```

---

¡Listo! Ahora tu sistema tiene las imágenes corporativas integradas. ✨
