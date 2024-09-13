# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# pnpmをインストール
RUN npm install -g pnpm

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN pnpm run build

# ポート3000を開放
EXPOSE 3000

# アプリケーションを起動
CMD ["pnpm", "start"]