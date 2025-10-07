import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// テスト開始前にMSWサーバーを起動
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

// 各テスト後にハンドラーをリセット
afterEach(() => server.resetHandlers());

// すべてのテスト終了後にサーバーをクローズ
afterAll(() => {
  server.close();
});
