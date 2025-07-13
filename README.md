## 開発環境構築

１．docker ビルドする

Asobiba ディレクトリでコマンドを打つ。(docker-compose.yml があるディレクトリ)

```bash
docker compose up -d --build
```

２．ブラウザで `localhost:3000` に接続

## shell からコンテナに環境に入る

フロントエンド

```bash
cd frontend
docker exec -it asobiba-frontend bash
```

バックエンド

```bash
cd backend
docker exec -it asobiba-backend bash
```
