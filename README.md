# Tramites Municipales Automaticos - Frontend

Aplicacion web desarrollada para automatizar y simplificar los tramites municipales mediante una interfaz moderna y accesible. Este proyecto es la capa frontend de una solucion integral que utiliza inteligencia artificial para mejorar la experiencia del usuario.

## Descripcion General

Este repositorio contiene el código del frontend de la plataforma de tramites municipales automaticos. La aplicacion proporciona una interfaz intuitiva para que los ciudadanos puedan realizar tramites municipales de forma eficiente y segura, integrada con servicios de inteligencia artificial.

Sitio en produccion: https://grupo03-tramitesmunicipalesautomaticos-1kxg.onrender.com

## Tecnologias Utilizadas

La aplicacion esta construida con las siguientes tecnologias:

- **Angular 21**: Framework principal para el desarrollo del frontend
- **TypeScript**: Lenguaje de programacion utilizado en el 40.6% del codigo
- **HTML**: Estructura de la aplicacion (30.3%)
- **CSS**: Estilos y diseño responsivo (29.1%)
- **RxJS**: Programacion reactiva y manejo de flujos de datos
- **Canvas Confetti**: Efectos visuales para celebraciones y confirmaciones

## Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- Node.js (version 18 o superior)
- npm 11.13.0 o superior
- Angular CLI 21.2.8 o superior

## Instalacion

Sigue estos pasos para configurar el proyecto en tu ambiente local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Aylin-28/Grupo03_TramitesMunicipalesAutomaticos_Frontend.git
   cd Grupo03_TramitesMunicipalesAutomaticos_Frontend
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Verifica que todas las dependencias se hayan instalado correctamente:
   ```bash
   npm list
   ```

## Ejecucion

Para ejecutar la aplicacion en modo desarrollo:

```bash
npm start
```

La aplicacion estara disponible en `http://localhost:4200/`

El servidor se recargara automaticamente cuando realices cambios en los archivos fuente.

## Scripts Disponibles

El proyecto incluye los siguientes scripts npm:

- `npm start` - Inicia el servidor de desarrollo (equivalente a `ng serve`)
- `npm run build` - Construye la aplicacion para produccion
- `npm run watch` - Construye la aplicacion en modo observacion para desarrollo continuo
- `npm test` - Ejecuta las pruebas unitarias
- `npm run ng` - Comando generico para ejecutar comandos de Angular CLI

## Estructura del Proyecto

El proyecto sigue la estructura estandar de una aplicacion Angular:

```
src/
  app/                 # Codigo de la aplicacion
  assets/             # Recursos estaticos (imagenes, etc.)
  styles/             # Estilos globales
  index.html          # Archivo HTML principal
  main.ts             # Punto de entrada de la aplicacion
```

## Dependencias Principales

### Dependencias de Runtime

- `@angular/common` (21.2.10) - Modulos comunes de Angular
- `@angular/compiler` (21.2.10) - Compilador de Angular
- `@angular/core` (21.2.10) - Nucleo de Angular
- `@angular/forms` (21.2.10) - Modulo de formularios
- `@angular/platform-browser` (21.2.10) - Plataforma de navegador
- `@angular/router` (21.2.10) - Sistema de enrutamiento
- `rxjs` (7.8.2) - Libreria de programacion reactiva
- `tslib` (2.8.1) - Libreria de utilidades de TypeScript
- `canvas-confetti` (1.9.4) - Efectos visuales de confeti

### Dependencias de Desarrollo

- `@angular/build` (21.2.8) - Constructor de Angular
- `@angular/cli` (21.2.8) - Herramienta de linea de comandos de Angular
- `@angular/compiler-cli` (21.2.10) - Compilador CLI de Angular
- `@types/canvas-confetti` (1.9.0) - Tipos de TypeScript para canvas-confetti
- `jsdom` (29.0.2) - Implementacion JavaScript del DOM
- `prettier` (3.8.3) - Formateador de codigo
- `typescript` (5.9.3) - Compilador de TypeScript
- `vitest` (4.1.5) - Framework de pruebas unitarias

## Desarrollo

### Formateo de Codigo

El proyecto utiliza Prettier para mantener consistencia en el codigo. Para formatear todos los archivos:

```bash
npx prettier --write "src/**/*.ts" "src/**/*.html" "src/**/*.css"
```

### Pruebas

Ejecuta las pruebas unitarias con:

```bash
npm test
```

Las pruebas se ejecutan con Vitest y jsdom para proporcionar un ambiente de pruebas completo.

## Construccion para Produccion

Para crear una version optimizada para produccion:

```bash
npm run build
```

El resultado se generara en el directorio `dist/` y estara listo para ser desplegado.

## Despliegue

La aplicacion esta actualmente desplegada en Render en la siguiente URL:

https://grupo03-tramitesmunicipalesautomaticos-1kxg.onrender.com

Para desplegar cambios:

1. Realiza un push a la rama principal
2. El pipeline de CI/CD en Render se activara automaticamente
3. La aplicacion se reconstruira y desplegara

## Contribucion

Este proyecto es parte de un trabajo academico del Grupo 03. Las contribuciones estan limitadas a los miembros autorizados del proyecto.

Si deseas reportar un problema o sugerir una mejora, por favor:

1. Abre un issue describiendo el problema o sugerencia
2. Proporciona toda la informacion relevante y contexto
3. Espera la revision del equipo del proyecto

## Licencia

Este proyecto no tiene una licencia especificada. Todos los derechos estan reservados por el grupo de desarrollo.

## Informacion Adicional

- **Creado**: 26 de marzo de 2026
- **Ultima actualizacion**: 16 de julio de 2026
- **Estado**: Activo y en produccion
- **Propietario**: Aylin-28

## Soporte

Para consultas o problemas relacionados con el desarrollo, contacta a los miembros del Grupo 03 a traves de los issues del repositorio.

## Roadmap Futuro

Mejoras planeadas para futuras versiones:

- Optimizacion del rendimiento
- Mejora de la accesibilidad
- Expansion de funcionalidades
- Integracion de nuevos servicios municipales
- Mejora de la experiencia del usuario basada en feedback

---

Desarrollado por Grupo 03 - Proyecto de Tramites Municipales Automaticos
