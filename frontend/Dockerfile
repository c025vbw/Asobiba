# Node.js イメージ
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# 依存ファイルコピー＆インストール
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# アプリのコードをコピー
COPY . .

CMD ["npm", "run", "dev"]