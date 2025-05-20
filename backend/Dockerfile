# Python ベースイメージ
FROM python:3.11

# 作業ディレクトリ
WORKDIR /app

# 依存ファイルのインストール
COPY requirements.txt .
RUN pip install -r requirements.txt

# アプリのコードをコピー
COPY . .

# サーバ起動（例：FastAPI）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
