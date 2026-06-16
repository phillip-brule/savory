# Savory Sips & Bites — Fases 2 y 3

Referencia para implementación futura. La Fase 1 es solo exhibición del menú.

---

## Fase 2 — Carrito y checkout por WhatsApp

**Objetivo:** El cliente puede seleccionar ítems del menú, armar un carrito y enviar el pedido completo por WhatsApp.

### Flujo de usuario

1. Cliente toca un ítem del menú → modal o detalle con foto grande
2. "Añadir al carrito" → actualiza carrito (badge flotante estilo Bonno)
3. Carrito lateral: cantidades, subtotal, vaciar
4. Checkout: formulario con validación
5. Al confirmar → genera mensaje estructurado → abre `wa.me` con texto prellenado
6. Modal de éxito: "Pedido enviado"

### Formulario de checkout (campos)

| Campo | Requerido | Notas |
|-------|-----------|-------|
| Nombre completo | Sí | |
| Teléfono | Sí | |
| Tipo de entrega | Sí | Pick-up / Delivery (definir zonas) |
| Fecha | Sí | Mínimo de anticipación por definir |
| Hora preferida | Opcional | Rangos horarios |
| Método de pago | Sí | Efectivo, transferencia, tarjeta |
| Notas del pedido | Opcional | Alergias, instrucciones |

### Mensaje WhatsApp (plantilla)

```
🛒 *Pedido Savory #0042*

*Cliente:* Juan Pérez
*Tel:* 809-555-1234
*Entrega:* Pick-up — 18/06/2026, 3:00 PM
*Pago:* Transferencia bancaria

*Pedido:*
• 12× Empanadita de pollo — RD$300
• 6× Bolita de queso — RD$180
• 1× Empaque grupal — RD$___

*Subtotal:* RD$___
*Total:* RD$___

*Notas:* Sin picante en las empanaditas.
```

**Número:** `18492666066` (849-266-6066 en formato internacional)

### Stack técnico Fase 2

- **Estado:** Zustand + `localStorage` para persistir carrito
- **Componentes nuevos:**
  - `ProductCard` (con botón añadir)
  - `CartDrawer` / carrito flotante
  - `CheckoutForm`
  - `OrderSuccessModal`
- **Utilidades:** `buildWhatsAppUrl(phone, message)`, `formatCurrency(RD$)`, generador de `#pedido`

### Estimación

1–2 semanas sobre la base de Fase 1.

---

## Fase 3 — Google Sheets y pagos

### 3A — Registro en Google Sheets

Al completar checkout:

1. Cliente envía pedido (WhatsApp se abre como hoy)
2. En paralelo, API serverless escribe fila en Google Sheet
3. Hoja `Pedidos` con columnas: ID, fecha, cliente, teléfono, ítems, total, método de pago, estado, notas

**Implementación sugerida:**

- Google Apps Script **o** Vercel Serverless Function con cuenta de servicio
- Hojas opcionales: `Clientes`, `Inventario`
- Estado inicial: `Pendiente` → `Confirmado` → `Listo` → `Entregado`
- Notificación por email al negocio (opcional)

### 3B — Pagos

| Opción | Complejidad | Cuándo usar |
|--------|-------------|-------------|
| Transferencia + comprobante por WhatsApp | Baja | Primera iteración |
| Link de pago Azul manual | Baja | Pedidos grandes |
| Azul / CardNET integrado | Alta | Volumen alto, contrato comercial |
| Stripe | Media | Si aplica al negocio |

**Recomendación:** Empezar con transferencia y confirmación manual; pasarela cuando el volumen lo justifique.

### 3C — Extras opcionales

- Panel admin para editar menú desde Sheets
- Cupones / descuentos por evento
- WhatsApp Business API (cuenta verificada)
- Historial de pedidos para clientes recurrentes

### Estimación Fase 3

- Google Sheets: ~1 semana
- Pagos básicos (transferencia + comprobante): ~1 semana
- Pasarela completa: 2–4 semanas + trámites bancarios

---

## Referencia de calidad

Sitio de referencia: [bonnord.com.do](https://bonnord.com.do/)

- Carrito flotante con subtotal
- Checkout en pasos con modal
- Mensaje WhatsApp prellenado al confirmar
- Modal de éxito con número de pedido
