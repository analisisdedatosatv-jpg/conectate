/**
 * AEROPUERTO DEL CARIÑO - SISTEMA DE REGISTRO (VERSIÓN CORREGIDA)
 * Google Apps Script para manejar el backend del sistema
 */

const SHEET_NAME = 'Pasajeros';

/**
 * Inicializar la hoja de cálculo
 */
function inicializarSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // CORRECCIÓN: 'Menú' debe estar entre comillas
  const headers = ['Timestamp', 'Nombre Completo', 'Sede', 'No. Asiento', 'Teléfono', 'Servicio Bus', 'Menú'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#10069F')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 100);
  
  sheet.setFrozenRows(1);
  
  Logger.log('✓ Hoja inicializada correctamente');
}

/**
 * Manejo de GET requests
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    Logger.log('GET recibido - Action: ' + action);
    
    if (action === 'getAll') {
      return getAllPassengers();
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'API del Aeropuerto del Cariño funcionando correctamente'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Manejo de POST requests - VERSIÓN MEJORADA
 */
function doPost(e) {
  try {
    // Log de depuración
    Logger.log('=== POST RECIBIDO ===');
    Logger.log('Content-Type: ' + e.postData.type);
    Logger.log('Raw content: ' + e.postData.contents);
    
    // Parsear JSON
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log('❌ Error al parsear JSON: ' + parseError.message);
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: 'Error al procesar JSON: ' + parseError.message
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log('Datos recibidos: ' + JSON.stringify(data));
    
    // Validar campos requeridos
    const requiredFields = ['nombre', 'sede', 'asiento', 'telefono', 'bus', 'snack'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      const error = 'Faltan campos: ' + missingFields.join(', ');
      Logger.log('❌ ' + error);
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: error
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validar formato de asiento
    const asientoPattern = /^\d{2,3}[A-Z]$/;
    
    if (!asientoPattern.test(data.asiento)) {
      Logger.log('❌ Formato de asiento inválido: ' + data.asiento);
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: 'Formato de asiento inválido. Use: 001A, 025B, 67C'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Validar opción de bus
    if (data.bus !== 'SI' && data.bus !== 'NO') {
      Logger.log('❌ Opción de bus inválida: ' + data.bus);
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: 'Opción de bus inválida. Use: SI o NO'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Verificar si el asiento ya existe
    if (asientoExists(data.asiento)) {
      Logger.log('❌ Asiento duplicado: ' + data.asiento);
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: 'Este asiento ya está registrado'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Guardar el pasajero
    const result = savePassenger(data);
    Logger.log('✓ Pasajero guardado: ' + data.nombre);
    
    return ContentService.createTextOutput(
      JSON.stringify(result)
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('❌ Error en doPost: ' + error.message);
    return handleError(error);
  }
}

/**
 * Guardar un nuevo pasajero
 */
function savePassenger(data) {
  const sheet = getOrCreateSheet();
  
  const timestamp = new Date();
  const rowData = [
    timestamp,
    data.nombre,
    data.sede,
    data.asiento.toUpperCase(),
    data.telefono,
    data.bus,
    data.snack
  ];
  
  sheet.appendRow(rowData);
  const lastRow = sheet.getLastRow();
  
  // Formato alternado - CORRECCIÓN: ahora son 7 columnas
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, 7).setBackground('#F5F5F5');
  }
  
  // Formato para asiento
  sheet.getRange(lastRow, 4)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setFontColor('#10069F');
  
  // Formato para bus
  const busCell = sheet.getRange(lastRow, 6);
  if (data.bus === 'SI') {
    busCell.setBackground('#97D700').setFontColor('#10069F').setFontWeight('bold');
  } else {
    busCell.setBackground('#FFEBEE').setFontColor('#C62828');
  }
  
  return {
    success: true,
    message: 'Pasajero registrado exitosamente',
    data: {
      asiento: data.asiento.toUpperCase(),
      nombre: data.nombre,
      bus: data.bus,
      snack: data.snack
    }
  };
}

/**
 * Obtener todos los pasajeros
 */
function getAllPassengers() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        passengers: []
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // CORRECCIÓN: ahora son 7 columnas
  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  const passengers = data.map(row => ({
    timestamp: row[0],
    nombre: row[1],
    sede: row[2],
    asiento: row[3],
    telefono: row[4],
    bus: row[5],
    snack: row[6]
  }));
  
  Logger.log('✓ Retornando ' + passengers.length + ' pasajeros');
  
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      passengers: passengers
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Verificar si un asiento ya existe
 */
function asientoExists(asiento) {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return false;
  }
  
  const asientos = sheet.getRange(2, 4, lastRow - 1, 1).getValues();
  const existe = asientos.some(row => row[0] === asiento.toUpperCase());
  
  if (existe) {
    Logger.log('⚠️ Asiento existe: ' + asiento);
  }
  
  return existe;
}

/**
 * Obtener o crear la hoja
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    inicializarSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }
  
  return sheet;
}

/**
 * Manejo de errores
 */
function handleError(error) {
  Logger.log('❌ Error capturado: ' + error.message + ' | Stack: ' + error.stack);
  
  return ContentService.createTextOutput(
    JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Obtener estadísticas
 */
function obtenerEstadisticas() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log('No hay datos registrados');
    return;
  }
  
  // CORRECCIÓN: ahora son 7 columnas
  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  const sedes = {};
  const menus = {};
  let busCount = 0;
  let noBusCount = 0;
  
  data.forEach(row => {
    const sede = row[2];
    const bus = row[5];
    const snack = row[6];
    
    sedes[sede] = (sedes[sede] || 0) + 1;
    menus[snack] = (menus[snack] || 0) + 1;
    
    if (bus === 'SI') {
      busCount++;
    } else {
      noBusCount++;
    }
  });
  
  Logger.log('=== ESTADÍSTICAS DEL AEROPUERTO DEL CARIÑO ===');
  Logger.log('Total de pasajeros: ' + (lastRow - 1));
  Logger.log('\n--- Distribución por Sedes ---');
  for (const [sede, count] of Object.entries(sedes)) {
    Logger.log('  ' + sede + ': ' + count);
  }
  Logger.log('\n--- Servicio de Bus ---');
  Logger.log('  Necesitan transporte: ' + busCount);
  Logger.log('  Transporte propio: ' + noBusCount);
  Logger.log('  % que necesita bus: ' + ((busCount / (lastRow - 1)) * 100).toFixed(1) + '%');
  Logger.log('\n--- Preferencias de Menú ---');
  for (const [menu, count] of Object.entries(menus)) {
    Logger.log('  ' + menu + ': ' + count);
  }
}

/**
 * Obtener lista de personas que necesitan bus
 */
function obtenerListaBus() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log('No hay datos registrados');
    return;
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  Logger.log('=== PASAJEROS QUE NECESITAN SERVICIO DE BUS ===\n');
  
  let count = 0;
  data.forEach((row, index) => {
    if (row[5] === 'SI') {
      count++;
      Logger.log(count + '. ' + row[1] + ' - ' + row[2] + ' - Tel: ' + row[4]);
    }
  });
  
  Logger.log('\nTotal de pasajeros que necesitan bus: ' + count);
}

/**
 * Obtener resumen de menús
 */
function obtenerResumenMenus() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log('No hay datos registrados');
    return;
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  const menus = {};
  data.forEach(row => {
    const snack = row[6];
    if (!menus[snack]) {
      menus[snack] = [];
    }
    menus[snack].push(row[1]); // nombre
  });
  
  Logger.log('=== RESUMEN DE MENÚS ===\n');
  for (const [menu, personas] of Object.entries(menus)) {
    Logger.log('--- ' + menu + ' (' + personas.length + ' personas) ---');
    personas.forEach((nombre, index) => {
      Logger.log('  ' + (index + 1) + '. ' + nombre);
    });
    Logger.log('');
  }
}

/**
 * Función de prueba
 */
function probarSistema() {
  Logger.log('=== PRUEBA DEL SISTEMA ===');
  
  const sheet = getOrCreateSheet();
  Logger.log('✓ Hoja encontrada: ' + sheet.getName());
  
  const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
  Logger.log('✓ Encabezados: ' + headers.join(', '));
  
  const lastRow = sheet.getLastRow();
  Logger.log('✓ Total registros: ' + (lastRow - 1));
  
  Logger.log('\n¡Sistema funcionando correctamente! ✈️');
}

/**
 * Limpiar datos (con precaución)
 */
function limpiarDatos() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
    Logger.log('✓ Todos los datos han sido eliminados');
  } else {
    Logger.log('No hay datos para eliminar');
  }
}