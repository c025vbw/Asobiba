docker ビルド
Asobiba ディレクトリでコマンドを打つ。(docker-compose.yml があるディレクトリ)

```bash
docker compose up -d --build
```

フロントエンドのコンテナにはいる

```bash
cd frontend
docker exec -it asobiba-frontend bash
```

```bash
cd backend
docker exec -it asobiba-backend bash
```
