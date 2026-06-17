# Savory Sips & Bites — Sitio Web

Sitio web en español para Savory Sips & Bites (Santiago de los Caballeros). **Fase 1:** menú y marca, sin pedidos en línea.

## Desarrollo

```bash
cd savory-web
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Estructura

- `src/data/menu.ts` — ítems del menú y precios
- `src/data/site.ts` — contacto, WhatsApp, enlaces de Maps
- `src/components/` — secciones del sitio

## Actualizar el menú

Edita `src/data/menu.ts`. Cada ítem tiene nombre, descripción, precio (o `null` para cotización) y categoría.

## Fases futuras

Ver `FASE-3.md` en la raíz del repositorio para el plan de Google Sheets, pagos con tarjeta en RD y fases futuras.
