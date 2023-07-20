# Usa una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo de dependencias e instálalas
COPY . . 
RUN npm install

# Copia el código fuente de la aplicación

# Expón el puerto 3000, que es el puerto que usa Express por defecto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
