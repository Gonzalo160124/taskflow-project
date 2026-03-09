# Comparación de Herramientas de IA

## ¿Qué voy a documentar aquí?
En este documento compararé las diferentes herramientas de inteligencia artificial que he utilizado durante el desarrollo del proyecto TaskFlow, como ChatGPT y Claude. Analizaré sus puntos fuerte y sus debilidades.
-------------------------------------------------------------------

1. Explicación de conceptos técnicos

# Conceptos evaluados
- Closure
- Event Loop
- Hoisting

# Prompts utilizados
- "¿Qué es un closure en JavaScript?"
- "¿Qué es el event loop en JavaScript?"
- "¿Qué es el hoisting en JavaScript?"

# Resultados
Ambos asistentes explicaron los tres conceptos de forma clara y con ejemplos de código. No se encontraron diferencias significativas en cuanto a claridad o profundidad.

# Conclusión
Tanto ChatGPT como Claude son igualmente capaces de explicar conceptos técnicos sencillos de JavaScript de forma comprensible.

-------------------------------------------------------------------------

2. Detección de bugs

# Funciones con errores utilizadas // Obviamente no he indicado donde estan los errores a ambas IAS//

// Función 1 — Error: resta en lugar de suma
function suma(a, b) {
  return a - b;
}

// Función 2 — Error: variable mal escrita (Nombre en lugar de nombre)
function saludar(nombre) {
  console.log("Hola " + Nombre);
}

// Función 3 — Error: condición i <= numeros.length accede a índice inexistente
const numeros = [1, 2, 3];
for (let i = 0; i <= numeros.length; i++) {
  console.log(numeros[i]);
}


# Resultados
Ambos asistentes detectaron los tres errores correctamente y los explicaron de forma detallada, indicando cuál era el problema y cómo solucionarlo.

# Conclusión
ChatGPT y Claude demostraron la misma capacidad para identificar y explicar errores sencillos o despistes en código JavaScript.

--------------------------------------------------------------------------------------

3. Generación de código

# Funciones solicitadas
- Una función que calcule el factorial de un número
- Una función que compruebe si una palabra es un palíndromo
- Una función que elimine elementos duplicados de un array

# Resultados
Ambos asistentes generaron el código correctamente. Sin embargo, Claude añadió una explicación detallada del funcionamiento de cada función, lo que facilita la comprensión del código generado.

# Conclusión
Claude destacó en este apartado por ofrecer no solo el código sino también una explicación de su uso, lo que resulta más útil en un contexto de aprendizaje.

-----------------------------------------------------------------------------------------------

# Conclusión general

| Respuesta | ChatGPT | Claude |
|-----------|---------|--------|
| Explicación de conceptos | ✅ Buena | ✅ Buena |
| Detección de errores | ✅ Buena | ✅ Buena |
| Generación de código | ✅ Correcta | ✅ Correcta + explicación |

Ambas herramientas son útiles y capaces. Desde mi punto de vista, Claude destacó ligeramente en la generación de código al incluir explicaciones adicionales, lo que lo hace más adecuado para aprender mientras se desarrolla, además también es muy fiable a la hora de generar código mas Complicado.

# opinión personal
Hemos llegado a tal punto donde la IA puede hacer casi todo lo relacionado con programación, cuando recibimos un resultado no satisfactorio tendemos a culpar a la propia IA, sin embargo también tenemos que considerar que es necesario que nosotros mismos aprendamos a utilizar estos asistentes correctamente. 