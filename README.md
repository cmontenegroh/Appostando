# 🏆 APPostando

**APPostando** es una aplicación móvil desarrollada con **React Native** y **Expo**, diseñada para ayudar a los usuarios a tomar decisiones más inteligentes al momento de apostar.  
Permite comparar las cuotas de las casas de apuestas con las probabilidades estimadas por el propio usuario, calculando el **valor esperado (EV)** y el **margen del bookmaker**.

---

## 🚀 Características principales

- 📱 Interfaz intuitiva con diseño limpio y moderno.  
- 🧮 Calculadora de probabilidades ajustadas y valor esperado.  
- 📊 Análisis de cuotas ingresadas por el usuario y por la casa.  
- 💡 Muestra resultados formateados (por ejemplo, `+13%` de valor esperado).  
- ⚙️ Desarrollada con Expo Router, React Navigation y componentes reutilizables.

---

## 🧩 Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/docs)
- [React Navigation](https://reactnavigation.org/)
- [JavaScript / TypeScript (según la versión del proyecto)]

---

## 🧠 Cómo funciona la calculadora

1. El usuario ingresa las **cuotas ofrecidas por la casa**.  
2. También puede ingresar sus **propias estimaciones de probabilidad** (porcentaje de confianza en cada resultado).  
3. El sistema calcula:
   - **Probabilidad implícita** según la cuota.
   - **Margen de la casa** (bookmaker margin).
   - **Valor esperado (EV)** para cada opción.

👉 Si el valor esperado es positivo (+%), la apuesta tiene **valor** según la estimación del usuario.

---

## 🛠️ Instalación y ejecución

Clona este repositorio y ejecuta los siguientes comandos:

```bash
# Clonar el proyecto
git clone https://github.com/cmontenegroh/Appostando.git

# Entrar al directorio
cd Appostando

# Instalar dependencias
npm install

# Ejecutar la app
npx expo start


📱 Próximas mejoras
Guardar histórico de cálculos.
Compartir análisis con amigos.
Crear versión APK para testers (Android).
Implementar modo oscuro.
Integrar autenticación de usuarios.
