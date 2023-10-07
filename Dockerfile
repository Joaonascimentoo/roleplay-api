# Use a imagem oficial do Node.js 14.21
FROM node:14.21 as build

# # Defina o diretório de trabalho
WORKDIR /app

# Copie o restante dos arquivos da aplicação
COPY . .

# Instale os pacotes do Node.js, incluindo o Adonis.js
RUN npm install

# Use a imagem oficial do Node.js para a fase de execução
FROM node:14.21 as runtime

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de construção
COPY --from=build /app .

# Inicie o aplicativo
CMD [ "npm", "run", "dev" ]
